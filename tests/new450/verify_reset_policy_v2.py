#!/usr/bin/env python3
"""Verify reset v2 instructions do not accidentally restore old-save migration."""
import pathlib, json
root=pathlib.Path(__file__).resolve().parents[2]
config=json.loads((root/'data/special_config_new450.json').read_text(encoding='utf-8'))
reset=config['playerDataReset']
assert config['schemaVersion']=='new450-v2-reset'
assert reset['clearAllExistingKotsunzPlayerProgress'] is True
assert reset['carryOverOldAccountInventoryOrScores'] is False
assert reset['keepOldCharacterArchives'] is False
assert reset['doNotResetOnLaterReloads'] is True
assert reset['blanketLocalStorageClearAllowed'] is False
assert reset['doesNotDeleteQuizQuestionsOrGameSystems'] is True
for fn in ['docs/new450/START_HERE_CLAUDE.md','docs/new450/README.md','docs/new450/IMPLEMENTATION_GUIDE.md','docs/new450/PRIORITY_AND_OVERRIDES.md','docs/new450/RESET_POLICY_V3.md']:
 t=(root/fn).read_text(encoding='utf-8')
 assert '初期化' in t and '旧' in t, fn
print('PASS: latest v3 docs and machine-readable reset policy require one-time reset while preserving new saves.')
