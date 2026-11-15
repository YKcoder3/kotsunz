# 切り出し後の全キャラを、暗い背景の上に小さく並べた確認用一覧（白いふち・欠け・はみ出しを見つけるため）
import json, sys
from PIL import Image, ImageDraw, ImageFont
P = '/home/claude/v450/full/KOTSUNZ_NEW450_CLAUDE_PACK/'
chars = json.load(open(P + 'data/characters_450.json', encoding='utf-8'))
src = sys.argv[4]; font = ImageFont.load_default()
S = 84; CW, CH = S * 3 + 6, S + 16
a, b = int(sys.argv[1]), int(sys.argv[2]); cols = 8
sub = chars[a:b]; rows = (len(sub) + cols - 1) // cols
sheet = Image.new('RGB', (cols * CW, rows * CH), (30, 22, 60)); d = ImageDraw.Draw(sheet)
for i, c in enumerate(sub):
    x0, y0 = (i % cols) * CW, (i // cols) * CH
    for s in range(3):
        st = Image.open('%s/%s/stage-%d.webp' % (src, c['characterId'], s + 1)).convert('RGBA'); st.thumbnail((S - 4, S - 4))
        bg = Image.new('RGBA', (S, S), (70, 50, 140, 255) if s % 2 == 0 else (40, 120, 110, 255)); bg.alpha_composite(st, ((S - st.width) // 2, (S - st.height) // 2))
        sheet.paste(bg.convert('RGB'), (x0 + s * S, y0))
    d.text((x0 + 2, y0 + S + 2), c['characterId'], fill=(255, 255, 255), font=font)
sheet.save(sys.argv[3], quality=85)
