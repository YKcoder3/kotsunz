# 追加問題（KOTSUNZ_Combined_2101.json）を、いまのゲームの問題と重ならないように取りこむ
#   入力: 元データJSON、既存の問題の一覧（ゲームから書き出した qdump.json）、写真クイズの一覧（docx から作ったJSON）
#   出力: data/questions_v8.json（正規データ・全項目）、data/questions_v8_rejected.json（重複で入れなかった問題と理由）
#         data/kotsunz_qbank_v8.json（ゲームに埋めこむ軽い形）、data/photo_quiz_v8.json（写真クイズ・素材待ち）
# 使いかた: python3 tools/build_questions.py 元データ.json qdump.json photo.json
import json, sys, re, unicodedata
from collections import Counter, OrderedDict

SRC, DUMP, PHOTO = sys.argv[1], sys.argv[2], sys.argv[3]

# ---- 元データのカテゴリ → ゲームのジャンル（既存のジャンルはそのまま使う） ----
# 値: ジャンルのキー。カテゴリ名で分けたいものは {カテゴリ名: キー}
MAP = {
  'pref_food': 'meibutsu', 'food_origin': 'food', 'cooking_skill': 'cooking', 'animals_plus': 'animal',
  'plants_plus': 'plant', 'seasonal': 'seasonal', 'folktale': 'folktale', 'retro': 'retro', 'common_lang': 'idiom',
  'body_life': 'body', 'english_life': 'english',
  'civic': 'civics', 'economy': 'econ', 'finance': 'kakei', 'work': 'manner', 'world_affairs': 'intl',
  'cyber': {'スマホ・ネット・AI安全': 'netsafe', '科学・IT': 'tech'}, 'data': 'literacy', 'crisis': 'bousai', 'math_plus': 'bizmath',
  'world_landmarks': {'世界の名所と国': 'w_spots', '世界地理': 'world_geo', '世界遺産': 'heritage'},
  'japan_landmarks': {'日本の名所と都道府県': 'j_spots', '日本地理': 'japan_geo'},
  'world_capital_plus': 'capital', 'jp_history_plus': 'jphist', 'world_history_plus': 'wdhist', 'art_books': 'culture', 'inventors': 'invention',
  'movie': 'movie', 'drama': 'drama', 'arashi': {'邦楽': 'jpop', '嵐・J-POP': 'arashi'}, 'western': 'western', 'kpop': 'kpop', 'classic': 'classic',
  'anime_pop': 'anime', 'anime': 'anime', 'ghibli': 'ghibli', 'game_pop': 'game',
  'onepiece': 'onepiece', 'kimetsu': 'kimetsu', 'vivant': 'vivant',
  'soccer': 'soccer', 'soccer_plus': 'soccer', 'baseball_plus': 'baseball', 'basketball': 'basketball', 'tennis_plus': 'tennis', 'golf_plus': 'golf',
  'fitness': 'fitness', 'formula1': 'f1', 'sports_legends': 'legends', 'sports': 'sports',
}
# 新しく作るジャンル（既存にないもの）
NEW_GENRES = OrderedDict([
  ('plant', '植物・花'), ('seasonal', '季節・行事'), ('folktale', '昔話・伝統芸能'), ('retro', '昭和・平成・令和'), ('idiom', '言葉・慣用句'),
  ('civics', '政治・選挙・憲法'), ('econ', '経済ニュース・金利'), ('kakei', '家計・税金・金融'), ('manner', 'ビジネスマナー・仕事'), ('intl', '国際政治・時事'),
  ('netsafe', 'ネット・AI安全'), ('literacy', '情報リテラシー'), ('bousai', '防災・救急'), ('bizmath', '暗算・ビジネス算数'),
  ('w_spots', '世界の名所'), ('j_spots', '日本の名所'), ('jphist', '日本史'), ('wdhist', '世界史'), ('culture', '文学・美術'),
  ('jpop', '邦楽'), ('ghibli', 'ジブリ'), ('onepiece', 'ONE PIECE'), ('kimetsu', '鬼滅の刃'), ('vivant', 'VIVANT'), ('arashi', '嵐'),
  ('tennis', 'テニス'), ('golf', 'ゴルフ'), ('fitness', '筋トレ・フィットネス'), ('f1', 'F1・モータースポーツ'), ('legends', 'スポーツレジェンド'),
])
# 既存のグループ（ランク戦の区分）は変えずに、新しいジャンルを足す。新しいグループは最後に追加
ADD_TO_GROUP = {'地理': ['w_spots', 'j_spots'], '歴史': ['jphist', 'wdhist'], '文化・くらし': ['culture'], '音楽': ['jpop'], 'エンタメ': ['ghibli'],
                'スポーツ': ['tennis', 'golf', 'fitness', 'f1', 'legends']}
NEW_GROUPS = [('みんなで・家族', ['plant', 'seasonal', 'folktale', 'retro', 'idiom']),
              ('社会で役立つ教養', ['civics', 'econ', 'kakei', 'manner', 'intl', 'netsafe', 'literacy', 'bousai', 'bizmath']),
              ('作品ファン向け', ['onepiece', 'kimetsu', 'vivant', 'arashi'])]

PUNCT = re.compile(r'[\s　「」『』（）()\[\]【】〈〉《》、。，．・,.!！?？:：;；"\'“”‘’〜~ー\-－—…]')
def norm(s):
    s = unicodedata.normalize('NFKC', str(s)).lower()
    return PUNCT.sub('', s)

src = json.load(open(SRC, encoding='utf-8'))['questions']
dump = json.load(open(DUMP, encoding='utf-8'))
existing_q = {}
for g, l in dump['bank'].items():
    for q, a in l: existing_q.setdefault(norm(q), (g, q, a, 'BANK'))
for g, l in dump['tables'].items():
    for q, a in l: existing_q.setdefault(norm(q), (g, q, a, 'TABLE'))

REQ = ['id', 'category_id', 'category', 'group', 'difficulty', 'question', 'options', 'correct_index', 'answer', 'explanation', 'media', 'review_status']
accepted, rejected, seen = [], [], {}
for q in src:
    miss = [k for k in REQ if k not in q]
    if miss: rejected.append({'id': q.get('id'), 'reason': 'missing ' + ','.join(miss)}); continue
    opts = q['options']
    if len(opts) != 4 or len(set(norm(o) for o in opts)) != 4: rejected.append({'id': q['id'], 'reason': '選択肢が4つでない／重複'}); continue
    if not (0 <= q['correct_index'] < 4) or opts[q['correct_index']] != q['answer']: rejected.append({'id': q['id'], 'reason': '正解の位置と答えが一致しない'}); continue
    if q['media']: rejected.append({'id': q['id'], 'reason': '画像問題は素材確認前のため除外'}); continue
    m = MAP.get(q['category_id'])
    g = m.get(q['category']) if isinstance(m, dict) else m
    if not g: rejected.append({'id': q['id'], 'reason': 'ジャンル対応なし ' + q['category_id']}); continue
    k = norm(q['question'])
    if k in existing_q:
        e = existing_q[k]; rejected.append({'id': q['id'], 'reason': '既存の問題と重複（%s:%s）' % (e[3], e[0]), 'question': q['question'], 'existing': e[1]}); continue
    if k in seen:
        rejected.append({'id': q['id'], 'reason': '追加データ内で重複（%s）' % seen[k], 'question': q['question']}); continue
    seen[k] = q['id']
    out = {kk: q[kk] for kk in REQ}
    out['genre'] = g
    for kk in ('audience', 'source_url', 'tags'):
        if kk in q: out[kk] = q[kk]
    accepted.append(out)

# 写真クイズ（素材待ち）。ゲームには入れない
photo = json.load(open(PHOTO, encoding='utf-8'))

json.dump({'edition': '2026-11-15', 'note': '正規データ。ゲームへは build.py が kotsunz_qbank_v8.json を埋めこむ', 'count': len(accepted), 'questions': accepted},
          open('data/questions_v8.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
json.dump({'count': len(rejected), 'items': rejected}, open('data/questions_v8_rejected.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
bank = OrderedDict()
for q in accepted:
    right = q['answer']; wrongs = [o for i, o in enumerate(q['options']) if i != q['correct_index']]
    bank.setdefault(q['genre'], []).append([q['question'], right] + wrongs + [q['id'], q['explanation'], q['difficulty']])
groups_add = {k: v for k, v in ADD_TO_GROUP.items()}
json.dump({'genres': NEW_GENRES, 'addToGroup': groups_add, 'newGroups': NEW_GROUPS, 'bank': bank},
          open('data/kotsunz_qbank_v8.json', 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
print('accepted', len(accepted), 'rejected', len(rejected))
print(Counter(r['reason'].split('（')[0] for r in rejected))
print(sorted(Counter(q['genre'] for q in accepted).items(), key=lambda x: -x[1]))
