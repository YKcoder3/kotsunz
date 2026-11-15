# 新450キャラのパックから、アプリに埋めこむ軽いマスターを作る
import json, sys, os
PK = sys.argv[1] if len(sys.argv) > 1 else '/home/claude/v450/full/KOTSUNZ_NEW450_CLAUDE_PACK'
D = os.path.join(PK, 'data')
ch = json.load(open(os.path.join(D, 'characters_450.json'), encoding='utf-8'))
sk = {s['characterId']: s for s in json.load(open(os.path.join(D, 'special_skills_450.json'), encoding='utf-8'))}
# マスターの「得意・苦手」の大きな区分 → ゲームのジャンルID
GENRE_MAP = {
  '自然・動物': ['animal', 'plant', 'body'],
  '歴史': ['history', 'sengoku', 'nengo', 'worldhist', 'jphist', 'wdhist'],
  '宇宙・科学': ['space', 'science', 'element', 'invention'],
  '企業・ロゴ': ['brand', 'econ', 'manner', 'money'],
  '食べ物': ['food', 'cooking', 'meibutsu'],
  '地理': ['japan_geo', 'world_geo', 'capital', 'pref', 'w_spots', 'j_spots', 'heritage'],
  '芸能・音楽': ['kpop', 'western', 'jpop', 'classic', 'enka', 'hiphop', 'theme', 'music'],
  'スポーツ': ['soccer', 'baseball', 'basketball', 'football', 'olympic', 'sports', 'tennis', 'golf', 'f1', 'legends', 'fitness'],
  '生活・雑学': ['zatsugaku', 'seasonal', 'retro', 'idiom', 'proverb'],
  'アニメ・漫画': ['anime', 'ghibli'],
  'ゲーム': ['game'],
  '映画・ドラマ': ['movie', 'drama', 'kdrama'],
}
ROLE = {'attack': 'a', 'defense': 'd', 'recover': 'r'}
core, lore = [], {}
for c in ch:
    s = sk[c['characterId']]
    assert s['name'] == c['name'] and s['rarity'] == c['rarity']
    for g in c['preferredGenres'] + c['weakGenres']: assert g in GENRE_MAP, g
    core.append({'id': c['characterId'], 'n': c['name'], 'a': c['attribute'], 'r': c['rarity'], 'sn': c['stageNames'][:3],
                 'p': c['personality'], 'cp': c['catchphrase'], 'fav': c['preferredGenres'], 'weak': c['weakGenres'],
                 'sk': [{'id': k['skillId'], 'n': k['name'], 'r': ROLE[k['role']], 'm': 1 if k['family'] == 'mirror' else 0, 'st': k['unlockedAtStage']} for k in s['skills']]})
    lore[c['characterId']] = {'lore': c['lore'], 'motif': c['motif'], 'q': c['quizFlavor'], 'w': c['weaknessFlavor']}
os.makedirs('data', exist_ok=True)
json.dump(core, open('data/nz_master_450.json', 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
json.dump(lore, open('data/nz_lore_450.json', 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
json.dump(GENRE_MAP, open('data/nz_genre_map.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(core), os.path.getsize('data/nz_master_450.json'), os.path.getsize('data/nz_lore_450.json'))
