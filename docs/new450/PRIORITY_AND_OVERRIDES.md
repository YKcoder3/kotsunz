# 仕様の優先順位（v3）

1. 最新の明示的な依頼：**旧キャラを全廃、旧プレイヤーデータを完全初期化、ゲームの根本システム維持、新450キャラを正式導入、権利と品質を調査してクリアしたら一般公開まで進める**。権利確認は「調べて終わり」ではなく公開に到達することが目的。確認不能・問題が残る場合にまで無条件公開する指示ではない。
2. `START_HERE_CLAUDE.md`, `docs/RESET_POLICY_V3.md`, `docs/RIGHTS_AND_RELEASE_CHECKLIST.md`, `docs/BATTLE_SKILLS_V4.md`。
3. 新キャラ `data/characters_450.json`, `data/forms_1350.json`, `data/special_skills_450.json`, `data/special_config_new450.json`, `assets/`。未確認の `publishable:false` はチェック後に true に更新する。
4. `references/LEGACY_*.md` は過去のシステムロジック参照用のみ。旧キャラ名/画像/ID、旧セーブ継承、旧発動条件は採用しない。
5. 現在の実リポジトリのコードとテスト（現状を把握する根拠）。

ソースや画像の権利を示す証拠がなければ外部公開前に明確化し、事実でない権利許諾を捏造しない。
