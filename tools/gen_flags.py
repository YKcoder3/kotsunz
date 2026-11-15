# 国旗のSVG（150×100）を作る。国旗はどれも国の公式な図案で、ここでは形を単純化して自作で描いている
import math, json
def star(cx, cy, r, fill, rot=-90, inner=.382):
    pts = []
    for i in range(10):
        a = math.radians(rot + i * 36); rr = r if i % 2 == 0 else r * inner
        pts.append('%.1f,%.1f' % (cx + rr * math.cos(a), cy + rr * math.sin(a)))
    return '<polygon points="%s" fill="%s"/>' % (' '.join(pts), fill)
def rect(x, y, w, h, f): return '<rect x="%s" y="%s" width="%s" height="%s" fill="%s"/>' % (x, y, w, h, f)
def circ(cx, cy, r, f): return '<circle cx="%s" cy="%s" r="%s" fill="%s"/>' % (cx, cy, r, f)
def hs(cols, ws=None):
    ws = ws or [1] * len(cols); t = sum(ws); y = 0; out = ''
    for c, w in zip(cols, ws): h = 100 * w / t; out += rect(0, round(y, 2), 150, round(h + .5, 2), c); y += h
    return out
def vs(cols, ws=None):
    ws = ws or [1] * len(cols); t = sum(ws); x = 0; out = ''
    for c, w in zip(cols, ws): wd = 150 * w / t; out += rect(round(x, 2), 0, round(wd + .5, 2), 100, c); x += wd
    return out
W = '#ffffff'
F = {}
F['ch'] = ('スイス', rect(0, 0, 150, 100, '#DA291C') + rect(66, 18, 18, 64, W) + rect(43, 41, 64, 18, W))
F['cz'] = ('チェコ', hs([W, '#D7141A']) + '<path d="M0 0 L75 50 L0 100Z" fill="#11457E"/>')
F['ph'] = ('フィリピン', hs(['#0038A8', '#CE1126']) + '<path d="M0 0 L86.6 50 L0 100Z" fill="#fff"/>' + circ(26, 50, 9, '#FCD116') + star(9, 11, 5, '#FCD116') + star(9, 89, 5, '#FCD116') + star(70, 50, 5, '#FCD116'))
F['vn'] = ('ベトナム', rect(0, 0, 150, 100, '#DA251D') + star(75, 52, 30, '#FFFF00'))
F['cn'] = ('中国', rect(0, 0, 150, 100, '#DE2910') + star(25, 25, 15, '#FFDE00') + star(50, 10, 5, '#FFDE00', -60) + star(60, 20, 5, '#FFDE00', -80) + star(60, 35, 5, '#FFDE00', -100) + star(50, 45, 5, '#FFDE00', -120))
F['tr'] = ('トルコ', rect(0, 0, 150, 100, '#E30A17') + circ(55, 50, 25, W) + circ(61, 50, 20, '#E30A17') + star(84, 50, 11, W, 180))
F['pk'] = ('パキスタン', rect(0, 0, 150, 100, '#01411C') + rect(0, 0, 37.5, 100, W) + circ(94, 52, 25, W) + circ(101, 46, 22, '#01411C') + star(108, 38, 8, W, -50))
us = ''.join(rect(0, round(i * 100 / 13, 2), 150, round(100 / 13 + .3, 2), '#B22234' if i % 2 == 0 else W) for i in range(13)) + rect(0, 0, 66, 54, '#3C3B6E')
us += ''.join(circ(round(6 + c * 11 + (5.5 if r % 2 else 0), 1), round(6 + r * 5.3, 1), 1.6, W) for r in range(9) for c in range(6 if r % 2 == 0 else 5))
F['us'] = ('アメリカ', us)
F['gb'] = ('イギリス', rect(0, 0, 150, 100, '#012169') + '<path d="M0 0 L150 100 M150 0 L0 100" stroke="#fff" stroke-width="20"/><path d="M0 0 L150 100 M150 0 L0 100" stroke="#C8102E" stroke-width="7"/>' + rect(0, 33, 150, 34, W) + rect(58, 0, 34, 100, W) + rect(0, 40, 150, 20, '#C8102E') + rect(65, 0, 20, 100, '#C8102E'))
gr = ''.join(rect(0, round(i * 100 / 9, 2), 150, round(100 / 9 + .3, 2), '#0D5EAF' if i % 2 == 0 else W) for i in range(9)) + rect(0, 0, 55.6, 55.6, '#0D5EAF') + rect(22.2, 0, 11.1, 55.6, W) + rect(0, 22.2, 55.6, 11.1, W)
F['gr'] = ('ギリシャ', gr)
F['cl'] = ('チリ', hs([W, '#D52B1E']) + rect(0, 0, 50, 50, '#0039A6') + star(25, 25, 10, W))
F['cu'] = ('キューバ', hs(['#002A8F', W, '#002A8F', W, '#002A8F']) + '<path d="M0 0 L86.6 50 L0 100Z" fill="#CF142B"/>' + star(28, 50, 11, W))
kr = rect(0, 0, 150, 100, W) + '<g transform="rotate(33.7 75 50)"><path d="M50 50 A25 25 0 0 1 100 50Z" fill="#CD2E3A"/><path d="M50 50 A25 25 0 0 0 100 50Z" fill="#0047A0"/>' + circ(62.5, 50, 12.5, '#CD2E3A') + circ(87.5, 50, 12.5, '#0047A0') + '</g>'
def tri(cx, cy, ang):
    return '<g transform="rotate(%s %s %s)">' % (ang, cx, cy) + ''.join(rect(cx - 12, cy - 9 + k * 7, 24, 4.5, '#000') for k in range(3)) + '</g>'
kr += tri(25, 22, -56.3) + tri(125, 78, -56.3) + tri(125, 22, 56.3) + tri(25, 78, 56.3)
F['kr'] = ('韓国', kr)
half = [(0, -30), (4, -20), (11, -24), (8, -8), (18, -15), (16, -6), (25, -6), (19, 2), (22, 7), (6, 6), (7, 17), (1, 16), (1, 26)]
pts = [(75 + x, 52 + y) for x, y in half] + [(75 - x, 52 + y) for x, y in reversed(half)]
F['ca'] = ('カナダ', vs(['#D52B1E', W, '#D52B1E'], [1, 2, 1]) + '<polygon points="%s" fill="#D52B1E"/>' % ' '.join('%s,%s' % p for p in pts))
F['br'] = ('ブラジル', rect(0, 0, 150, 100, '#009C3B') + '<polygon points="75,9 140,50 75,91 10,50" fill="#FFDF00"/>' + circ(75, 50, 22, '#002776') + '<path d="M54 46 Q75 38 96 56" stroke="#fff" stroke-width="4" fill="none"/>')
F['ar'] = ('アルゼンチン', hs(['#74ACDF', W, '#74ACDF']) + circ(75, 50, 9, '#F6B40E') + '<circle cx="75" cy="50" r="12" fill="none" stroke="#F6B40E" stroke-width="2" stroke-dasharray="2 2"/>')
F['in'] = ('インド', hs(['#FF9933', W, '#138808']) + '<circle cx="75" cy="50" r="12" fill="none" stroke="#000080" stroke-width="2.5"/>' + circ(75, 50, 2.5, '#000080'))
F['mx'] = ('メキシコ', vs(['#006847', W, '#CE1126']) + circ(75, 50, 10, '#8C5A2B') + '<path d="M65 55 Q75 64 85 55" stroke="#006847" stroke-width="3" fill="none"/>')
F['eg'] = ('エジプト', hs(['#CE1126', W, '#000000']) + '<path d="M70 40 L80 40 L82 52 L75 60 L68 52Z" fill="#C09300"/>')
F['jm'] = ('ジャマイカ', rect(0, 0, 150, 100, '#009B3A') + '<path d="M0 0 L65 50 L0 100Z M150 0 L85 50 L150 100Z" fill="#000"/><path d="M0 0 L150 100 M150 0 L0 100" stroke="#FED100" stroke-width="14"/>')
F['za'] = ('南アフリカ', hs(['#E03C31', '#002395']) + '<path d="M0 0 L50 40 L150 40 L150 60 L50 60 L0 100Z" fill="#fff"/><path d="M0 8 L44 46 L150 46 L150 54 L44 54 L0 92Z" fill="#007A4D"/><path d="M0 18 L38 50 L0 82Z" fill="#FFB612"/><path d="M0 26 L29 50 L0 74Z" fill="#000"/>')
F['co'] = ('コロンビア', hs(['#FCD116', '#003893', '#CE1126'], [2, 1, 1]))
F['la'] = ('ラオス', hs(['#CE1126', '#002868', '#CE1126'], [1, 2, 1]) + circ(75, 50, 20, W))
F['bw'] = ('ボツワナ', hs(['#6DA9D2', W, '#000000', W, '#6DA9D2'], [9, 1, 4, 1, 9]))
F['mu'] = ('モーリシャス', hs(['#EA2839', '#1A206D', '#FFD500', '#00A551']))
F['ae'] = ('アラブ首長国連邦', hs(['#00732F', W, '#000000']) + rect(0, 0, 37.5, 100, '#FF0000'))
F['kw'] = ('クウェート', hs(['#007A3D', W, '#CE1126']) + '<path d="M0 0 L37.5 33.3 L37.5 66.7 L0 100Z" fill="#000"/>')
F['bj'] = ('ベナン', hs(['#FCD116', '#E8112D']) + rect(0, 0, 60, 100, '#008751'))
F['mg'] = ('マダガスカル', hs(['#FC3D32', '#007E3A']) + rect(0, 0, 50, 100, W))
zz = 'M0 0 L40 0' + ''.join(' L%s %s L40 %s' % (52, round(100 / 9 * (2 * k + 1) / 2, 2), round(100 / 9 * (k + 1), 2)) for k in range(9)) + ' L0 100Z'
F['qa'] = ('カタール', rect(0, 0, 150, 100, '#8A1538') + '<path d="%s" fill="#fff"/>' % zz)
F['ma'] = ('モロッコ', rect(0, 0, 150, 100, '#C1272D') + '<polygon points="%s" fill="none" stroke="#006233" stroke-width="3"/>' % ' '.join('%.1f,%.1f' % (75 + 22 * math.cos(math.radians(-90 + k * 144)), 52 + 22 * math.sin(math.radians(-90 + k * 144))) for k in range(5)))
F['so'] = ('ソマリア', rect(0, 0, 150, 100, '#4189DD') + star(75, 52, 22, W))
F['sg'] = ('シンガポール', hs(['#EF3340', W]) + circ(30, 25, 15, W) + circ(36, 25, 14, '#EF3340') + ''.join(star(46 + 7 * math.cos(math.radians(-90 + k * 72)), 25 + 7 * math.sin(math.radians(-90 + k * 72)), 2.8, W) for k in range(5)))
F['gh'] = ('ガーナ', hs(['#CE1126', '#FCD116', '#006B3F']) + star(75, 52, 14, '#000'))
F['sn'] = ('セネガル', vs(['#00853F', '#FDEF42', '#E31B23']) + star(75, 52, 13, '#00853F'))
F['cm'] = ('カメルーン', vs(['#007A5E', '#CE1126', '#FCD116']) + star(75, 52, 13, '#FCD116'))
F['dz'] = ('アルジェリア', vs(['#006233', W]) + circ(72, 50, 22, '#D21034') + circ(78, 50, 18, W) + star(88, 50, 9, '#D21034', 180))
F['tn'] = ('チュニジア', rect(0, 0, 150, 100, '#E70013') + circ(75, 50, 25, W) + circ(71, 50, 17, '#E70013') + circ(76, 50, 14, W) + star(80, 50, 9, '#E70013', 180))
F['pa'] = ('パナマ', rect(0, 0, 75, 50, W) + rect(75, 0, 75, 50, '#DA121A') + rect(0, 50, 75, 50, '#072357') + rect(75, 50, 75, 50, W) + star(37.5, 25, 11, '#072357') + star(112.5, 75, 11, '#DA121A'))
F['dk'] = ('デンマーク', rect(0, 0, 150, 100, '#C8102E') + rect(40, 0, 16, 100, W) + rect(0, 42, 150, 16, W))
F['se'] = ('スウェーデン', rect(0, 0, 150, 100, '#006AA7') + rect(42, 0, 18, 100, '#FECC02') + rect(0, 41, 150, 18, '#FECC02'))
F['fi'] = ('フィンランド', rect(0, 0, 150, 100, W) + rect(40, 0, 22, 100, '#002F6C') + rect(0, 39, 150, 22, '#002F6C'))
F['no'] = ('ノルウェー', rect(0, 0, 150, 100, '#BA0C2F') + rect(38, 0, 26, 100, W) + rect(0, 37, 150, 26, W) + rect(44, 0, 14, 100, '#00205B') + rect(0, 43, 150, 14, '#00205B'))
out = {k: [v[0], 'svg', v[1]] for k, v in F.items()}
open('flags_v8.json', 'w', encoding='utf-8').write(json.dumps(out, ensure_ascii=False))
print(len(out))
