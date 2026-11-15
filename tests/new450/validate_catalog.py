#!/usr/bin/env python3
"""Run from package root or any directory: python tests/validate_catalog.py"""
import hashlib,json,pathlib,collections,sys
ROOT=pathlib.Path(__file__).resolve().parents[2]   # サイトでは tests/new450/ に置くので2つ上
def load(name):return json.loads((ROOT/'data'/name).read_text(encoding='utf-8'))
chars=load('characters_450.json');forms=load('forms_1350.json');skills=load('special_skills_450.json');manifest=load('asset_manifest_450.json');hashes=load('produced_asset_sha256.json');sheets=load('source_sheets_21.json')
assert len(chars)==len(skills)==len(manifest)==450
assert len({x['publishable'] for x in chars})==1, 'Release flags must be consistent for all 450'
if chars[0]['publishable']:
 assert (ROOT/'qa/release_approval.json').exists(), 'Approval evidence missing' 
assert len(forms)==1350 and len(sheets)==21
assert [x['characterId'] for x in chars]==[f'NZ{i:03d}' for i in range(1,451)]
assert len({x['characterId'] for x in chars})==450
assert len({x['name'] for x in chars})==450
assert len({x['formId'] for x in forms})==1350
assert len({x['skillId'] for x in skills for x in x['skills']})==900
assert {x['characterId'] for x in skills}=={x['characterId'] for x in chars}
assert {x['characterId'] for x in manifest}=={x['characterId'] for x in chars}
assert len(hashes)==1800
for c in chars:
 forms_here=[x for x in forms if x['characterId']==c['characterId']]
 assert sorted(x['stage'] for x in forms_here)==[1,2,3]
 assert all(x['rarity']==c['rarity'] and x['attribute']==c['attribute'] for x in forms_here)
 assert (c['copyrightStatus']=='unverified_rights_review_required' and c['publishable'] is False) or (c['copyrightStatus']=='rights_review_completed' and c['publishable'] is True and c['artReviewStatus']=='approved')
 assert all(x['imageExists'] is True for x in forms_here)
for s in skills:
 assert len(s['skills'])==2 and {x['role'] for x in s['skills']}<={'attack','defense','recover'}
 assert s['skills'][0]['role']!=s['skills'][1]['role']
 assert s['skills'][0]['unlockedAtStage']==1
 assert s['skills'][1]['unlockedAtStage'] in [1,2]
for s in sheets:
 assert s['familyCount']==s['columns']*s['rows']
assert sum(s['familyCount'] for s in sheets)==450
for name,expected in hashes.items():
 p=ROOT/name
 assert p.exists(),f'Missing asset {name}'
 actual=hashlib.sha256(p.read_bytes()).hexdigest()
 assert actual==expected,f'Image changed from manifest: {name}'
for form in forms:
 assert (ROOT/form['imagePath']).exists(),form['imagePath']
 assert (ROOT/form['familyTriptychImage']).exists(),form['familyTriptychImage']
assert sum(1 for d in ('assets/characters','assets/families') for x in (ROOT/d).rglob('*.webp'))==1800   # サイトには画面用の assets/ui もあるので、キャラの絵だけ数える
print('PASS: 21 source sheets, 450 unique characters, 1350 stage forms, 900 skills, 1800 assets, all SHA-256 valid.')
print('NOTICE: This tests file integrity only; image crop completeness and copyright cannot be tested automatically.')
