# 写真・ロゴ・地図クイズ125問（docx）を、素材待ちのJSONにする（画像はない＝公開しない）
import sys, re, json
from docx import Document
ps = [p.text.strip() for p in Document(sys.argv[1]).paragraphs if p.text.strip()]
start = next(i for i, p in enumerate(ps) if p.startswith('写真・ロゴ・地図クイズ企画'))
items, sec = [], ''
i = start + 1
while i < len(ps):
    p = ps[i]
    m = re.match(r'^(KZI\d{4})\s+(.+)$', p)
    if p.startswith('写真｜') or p.startswith('ロゴ｜') or p.startswith('地図｜') or re.match(r'^[^K].*／?\s*/\s*\d+問$', p): sec = p.split(' / ')[0]
    if m:
        opts = [re.sub(r'^[A-D]\.\s*', '', x.strip()) for x in ps[i + 1].split(' / ')]
        ans = re.sub(r'^正解：', '', ps[i + 2].split('|')[0].strip())
        n = len(items) + 1
        items.append({'id': m.group(1), 'category_id': 'photo', 'category': sec, 'group': '写真クイズ', 'difficulty': 'ふつう', 'question': m.group(2),
            'options': opts, 'correct_index': opts.index(ans), 'answer': ans, 'explanation': '',
            'media': {'type': 'image', 'asset_path': None, 'planned_file': 'img-%04d.webp' % n, 'source_page': None, 'author': None, 'license': None,
                      'license_url': None, 'attribution': None, 'alt_text': None, 'status': 'pending_asset_and_license_review'},
            'review_status': 'pending_asset_and_license_review'})
        i += 3; continue
    i += 1
json.dump({'note': '画像・権利確認前。asset_path が null か status が approved でないものはゲームに出さない', 'count': len(items), 'questions': items},
          open(sys.argv[2], 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
from collections import Counter
print(len(items), Counter(x['category'] for x in items))
