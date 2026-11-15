# パックの切り出しを直す（第2版）。描き直しはしない。3連絵の元の画素だけを使う
#  背景：3連絵の背景は白っぽい無地。切り出し範囲のふちにつながる「白っぽい・色の薄い」画素を背景とみなす（魔法の杖の方式）
#        キャラに囲まれた白っぽい所は、背景除去モデル（isnet-anime）も背景と判定した広い所だけ背景にする
#  そのあと：細い線・枠線の切れはし・矢印・下の行のはみ出しを取りのぞく
import sys, os, json
import numpy as np
from PIL import Image
from scipy import ndimage
from rembg import remove, new_session
from skimage.morphology import convex_hull_image
P = '/home/claude/v450/full/KOTSUNZ_NEW450_CLAUDE_PACK/'
OUT = sys.argv[1]; ids = sys.argv[2:]
sess = new_session('isnet-anime')
chars = {c['characterId']: c for c in json.load(open(P + 'data/characters_450.json', encoding='utf-8'))}
PREV = json.load(open('/home/claude/v450/fixed/_fix_NZ001.json')); PREV.update(json.load(open('/home/claude/v450/fixed/_fix_NZ226.json')))
log = {}
for cid in ids:
    Timg = Image.open(P + chars[cid]['familyTriptychImage']).convert('RGB'); T = np.array(Timg).astype(int)
    R = np.array(remove(Timg, session=sess, only_mask=True)).astype(float)
    TH, TW = T.shape[:2]
    mn, mx = T.min(2), T.max(2)
    bglike = (mn > 196) & (mx - mn < 48)
    entry = {}
    for s in (1, 2, 3):
        C = Image.open(P + 'assets/characters/%s/stage-%d.webp' % (cid, s)).convert('RGBA'); w, h = C.size
        ox, oy = PREV[cid][str(s)]['offset']
        # 少し広げる（上が切れていた絵のため）。となりの段の分は、あとで取りのぞく
        m = 5; x0, y0, x1, y1 = max(0, ox - m), max(0, oy - m), min(TW, ox + w + m), min(TH, oy + h + m)
        B = bglike[y0:y1, x0:x1]; Rr = R[y0:y1, x0:x1]; Tr = T[y0:y1, x0:x1]
        lab, n = ndimage.label(B)
        border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
        bg = np.isin(lab, list(border))
        # 囲まれた白っぽい所：モデルも背景と言う、ある程度広い所だけ背景に
        if n:
            sizes = ndimage.sum(B, lab, range(1, n + 1)); rmean = ndimage.mean(Rr, lab, range(1, n + 1))
            for k in range(1, n + 1):
                if k in border: continue
                if sizes[k - 1] >= 30 and rmean[k - 1] < 60: bg |= lab == k
        # 輪かくの小さなすき間を閉じてから、囲まれた所（白い体など）をうめる
        fg = ndimage.binary_fill_holes(ndimage.binary_closing(~bg, structure=np.ones((3, 3)), iterations=3))
        fg = ndimage.binary_fill_holes(fg | (~bg))
        # 輪かくが開いていて白い体が背景とつながった所：キャラの外形（凸包）の内側で、モデルもキャラと判定した所はもどす
        lab0, n0 = ndimage.label(fg)
        if n0:
            sz0 = ndimage.sum(fg, lab0, range(1, n0 + 1)); big = np.isin(lab0, [k + 1 for k in range(n0) if sz0[k] >= sz0.max() * .15])
            hull = convex_hull_image(big) if big.any() else big
            cand = hull & (Rr > 200) & ~fg
            lc, nc = ndimage.label(cand)
            if nc:
                edge_ids = set(np.unique(np.concatenate([lc[0], lc[-1], lc[:, 0], lc[:, -1]]))) - {0}
                fg = fg | (np.isin(lc, [k for k in range(1, nc + 1) if k not in edge_ids]))
            fg = ndimage.binary_fill_holes(fg)
        bg = ~fg
        # ふちを少しなめらかに：背景に接する前景で、白に近いほど薄く
        alpha = np.where(fg, 255.0, 0.0)
        edge = fg & ndimage.binary_dilation(bg)
        whit = (Tr.min(2) - 150).clip(0, 105) / 105.0
        alpha[edge] = 255 * (1 - .6 * whit[edge])
        # 取りのぞく：細い線・ふちに接する小片・矢印・下のはみ出し
        mask = alpha > 40; lab2, n2 = ndimage.label(mask); removed = 0
        hh, ww = mask.shape
        if n2:
            sizes = ndimage.sum(mask, lab2, range(1, n2 + 1)); main = int(np.argmax(sizes)) + 1
            dist = ndimage.distance_transform_edt(mask)
            for k in range(1, n2 + 1):
                if k == main: continue
                comp = lab2 == k; ys, xs = np.where(comp); sz = sizes[k - 1]
                thick = dist[comp].max()
                touch = xs.min() <= 1 or xs.max() >= ww - 2 or ys.max() >= hh - 2 or ys.min() <= 1
                bottom = ys.min() > hh * .8
                col = Tr[comp]; sat = (col.max(1) - col.min(1)).mean(); val = col.max(1).mean()
                arrow = sz < sizes[main - 1] * .08 and sat < 60 and val < 200   # 段のあいだの矢印（灰色・小さい）
                if os.environ.get('DBG') and sz < sizes[main - 1] * .2: print(cid, s, int(sz), round(float(sat)), round(float(val)), xs.min(), xs.max(), ys.min(), ys.max(), ww, hh)
                if arrow or thick <= 2.2 or (touch and sz < sizes[main - 1] * .5) or (bottom and sz < sizes[main - 1] * .25):
                    alpha[comp] = 0; removed += 1
        out = np.dstack([Tr, alpha.clip(0, 255)]).astype(np.uint8)
        img = Image.fromarray(out, 'RGBA'); bb = img.getchannel('A').point(lambda v: 255 if v > 40 else 0).getbbox()
        if bb: img = img.crop(bb)
        pad = max(4, int(max(img.size) * .06)); cv = Image.new('RGBA', (img.width + 2 * pad, img.height + 2 * pad), (0, 0, 0, 0)); cv.paste(img, (pad, pad))
        os.makedirs(os.path.join(OUT, cid), exist_ok=True); cv.save(os.path.join(OUT, cid, 'stage-%d.webp' % s), quality=92, method=6)
        entry[s] = {'region': [int(x0), int(y0), int(x1), int(y1)], 'removedPieces': removed, 'fgRatio': round(float(fg.mean()), 3)}
    log[cid] = entry
json.dump(log, open(os.path.join(OUT, '_fix2_%s.json' % ids[0]), 'w'))
print('done', len(ids))
