# V4パック（500体）から、アプリに埋めこむ軽いマスターを作る
import json, sys, os
PK = sys.argv[1] if len(sys.argv) > 1 else '/home/claude/v4pack/full/KOTSUNZ_FULL_CLAUDE_V4'
D = os.path.join(PK, 'data')
ch = json.load(open(os.path.join(D, 'characters_500_full.json'), encoding='utf-8'))
sk = {s['characterId']: s for s in json.load(open(os.path.join(D, 'special_skills_500.json'), encoding='utf-8'))}
fm = json.load(open(os.path.join(D, 'forms_1500.json'), encoding='utf-8'))
out = []
for c in ch:
    s = sk[c['id']]
    b = c.get('characterBible', {})
    assert s['skillId'] == c['uniqueSkillId'] and s['family'] == c['uniqueSkillFamily']
    out.append({
        'id': c['id'], 'n': c['name'], 'a': c['attribute'], 'r': c['rarity'], 'sn': c['stageNames'][:3],
        'p': c['personality'], 'lore': c.get('lore', ''), 'sig': c.get('visualSignature', ''),
        'cp': b.get('catchphrase', ''), 'realm': b.get('homeRealm', c.get('homeRealm', '')), 'th': c.get('theme', ''),
        'likes': b.get('likes', ''), 'story': b.get('learningStory', ''),
        'fav': c['genreAffinity']['favorite'], 'weak': c['genreAffinity']['weak'],
        'sk': {'id': s['skillId'], 'n': s['skillName'], 'f': s['family'], 'ty': s['type'], 'd': s['description'],
               'fl': s.get('flavorText', ''), 'cast': s['animation'].get('impact', ''), 's2': bool(s.get('stage2StatusUnlock'))},
        'collab': bool(c.get('isCollaboration')),
    })

core = [{'id': c['id'], 'n': c['n'], 'a': c['a'], 'r': c['r'], 'sn': c['sn'], 'p': c['p'], 'cp': c['cp'],
         'fav': c['fav'], 'weak': c['weak'], 'sk': {'id': c['sk']['id'], 'n': c['sk']['n'], 'f': c['sk']['f']}, 'collab': c['collab']} for c in out]
lore = {c['id']: {'lore': c['lore'], 'story': c['story'], 'likes': c['likes'], 'realm': c['realm'], 'th': c['th'], 'sig': c['sig'],
                  'fl': c['sk']['fl'], 'cast': c['sk']['cast']} for c in out}
os.makedirs('data', exist_ok=True)
json.dump(core, open('data/kotsunz_master_500.json', 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
json.dump(lore, open('data/kotsunz_lore_500.json', 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
fam = {}
for c in out: fam[c['sk']['f']] = {'ty': c['sk']['ty'], 'd': c['sk']['d']}
json.dump(fam, open('data/kotsunz_skill_families.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
for f in ['kotsunz_master_500.json', 'kotsunz_lore_500.json']: print(f, os.path.getsize('data/' + f))
