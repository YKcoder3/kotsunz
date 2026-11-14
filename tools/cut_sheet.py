# 3×3（など）のキャラシート画像から1体ずつ切りぬき、背景を透明にして
# assets/characters/kNNN/stage-S.webp（512px）に置く。置いたあと index.html を作り直すと、その絵が出る
# 使いかた: python3 tools/cut_sheet.py シート.png 3 3 1 K010 K011 K012 K013 K014 K015 K016 K017 K018
#   （列数 行数 進化段階 ID…。左上から右へ順に。空きマスは - ）
# シート画像から1体ずつ切りぬいて、透明の背景にする
import sys, numpy as np
from PIL import Image, ImageFilter
from collections import deque
def cutout(cell, hard=8, soft=46, flood=20, grow=4):
    a=np.array(cell.convert('RGB')).astype(int); h,w,_=a.shape
    edge=np.concatenate([a[0],a[-1],a[:,0],a[:,-1]]); bg=np.median(edge,axis=0)
    d=np.sqrt(((a-bg)**2).sum(axis=2))
    reach=np.zeros((h,w),bool); q=deque()
    for x in range(w): q.append((0,x)); q.append((h-1,x))
    for y in range(h): q.append((y,0)); q.append((y,w-1))
    while q:
        y,x=q.popleft()
        if y<0 or y>=h or x<0 or x>=w or reach[y,x] or d[y,x]>=flood: continue
        reach[y,x]=True; q.extend([(y+1,x),(y-1,x),(y,x+1),(y,x-1)])
    alpha=np.full((h,w),255.0)
    rim=np.array(Image.fromarray((reach*255).astype(np.uint8)).filter(ImageFilter.MaxFilter(grow*2+1)))>0
    band=rim
    alpha[band]=np.clip((d[band]-hard)/(soft-hard),0,1)*255
    alpha[reach]=np.minimum(alpha[reach],np.clip((d[reach]-hard)/(soft-hard),0,1)*255)
    al=Image.fromarray(alpha.astype(np.uint8)).filter(ImageFilter.GaussianBlur(.6))
    # 半透明部分は背景色を引いて色を戻す（クリームのにじみを減らす）
    A=np.array(al).astype(float)/255
    rgb=a.astype(float)
    with np.errstate(divide='ignore',invalid='ignore'):
        fg=np.where(A[...,None]>0.02,(rgb-bg*(1-A[...,None]))/np.maximum(A[...,None],0.02),rgb)
    fg=np.clip(fg,0,255).astype(np.uint8)
    out=Image.fromarray(np.dstack([fg,np.array(al)]),'RGBA')
    bb=out.getchannel('A').point(lambda v:255 if v>8 else 0).getbbox()
    out=out.crop(bb)
    s=max(out.size); pad=int(s*0.08); S=s+pad*2
    sq=Image.new('RGBA',(S,S),(0,0,0,0)); sq.paste(out,((S-out.width)//2,(S-out.height)//2),out)
    return sq

if __name__=='__main__':
    import os
    path, cols, rows, stage = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), int(sys.argv[4])
    ids = sys.argv[5:]
    im = Image.open(path); W, H = im.size
    for i, cid in enumerate(ids):
        if cid == '-': continue
        r, c = divmod(i, cols)
        cell = im.crop((W * c // cols, H * r // rows, W * (c + 1) // cols, H * (r + 1) // rows))
        out = cutout(cell).resize((512, 512), Image.LANCZOS)
        d = os.path.join('assets/characters', cid.lower()); os.makedirs(d, exist_ok=True)
        out.save(os.path.join(d, 'stage-%d.webp' % stage), quality=88, method=6)
        print(cid, 'S%d' % stage, 'ok')
