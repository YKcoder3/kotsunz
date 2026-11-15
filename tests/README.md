# 自動テスト
ブラウザ（Playwright）と、ローカルのMQTTブローカー（ws://127.0.0.1:9001）、ローカルのWebサーバー（http://127.0.0.1:8081）を使う。
- `node n450engine.js` 必殺技v4の計算（パックの参考テストと同じ場面＋2技の解放）
- `node n450.js` 旧データの初期化・お知らせ・450体マスター・キャラ詳細・CPU戦の必殺技
- `python3 tests/new450/validate_catalog.py`・`python3 tests/new450/verify_reset_policy_v2.py`・`node --test tests/new450/special_rules.test.mjs` パック付属のテスト
- `node k8q.js` v8の問題データ・全ジャンルの出題・答えの漏えい・写真のノーカウント・CPUの強さ3段階・5/10/15問（31件）
パスは作業環境に合わせて書きかえて使う。
