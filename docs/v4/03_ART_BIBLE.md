# KOTSUNZ イラスト制作指針 v2 ― 「クセかわ」×上質な光沢

## なぜ Claude が作った50体は平面的に見えるのか
Claude が直接 HTML/SVG/CSS で描画すると、形・輪郭・ベタ塗り・簡単なハイライトの組合せになりがちです。**Claude が不可能なのではなく、コード描画と高品質イラスト生成は別工程**です。大量の SVG で動くプロトタイプをすばやく作るのに Claude は適任ですが、ぬいぐるみ感・透過表現・ふんわり光・微細な素材・キャラ固有の陰影には画像生成またはイラストレーターによる制作を併用します。

## キャラ独自のDNA（全体に共通）
- 丸く小さく、少し左右非対称。目・耳・口や手足はやや不思議で、かわいいけれど一癖ある。
- 正面シルエットだけで識別。50体の色違いにしない。特に500体は**形、突起、小道具、眼差し、素材、動き**の複合で差をつける。
- レアリティに関わらず低レアも推したくなる。単純なキャラを「手抜き」風にしない。
- 作品ロゴや第三者キャラの服・顔・紋章・特徴的なシルエットを模倣しない。

## プロダクション画像標準
- 正面：正方形 1024×1024マスター推奨、透過PNGを制作。アプリ用に512px WebP/AVIF等を別書き出し。画角・重心と足元を統一。
- 余白：上下左右約8〜12%、小道具とエフェクトを収める。背景や日本語文字をキャラ画像に焼き込まない。
- 本編キャラは厚みのあるゼリー・ぬいぐるみ・マットなソフトビニール素材。ふわっとした環境光、目に明確なキャッチライト、素材ごとの微小な反射。
- スマホ表示の48px/72pxでも顔と固有の目印が区別できるよう、極細装飾や小さな文字で差別化しない。
- UI用は静止S1、対戦用は喜び/泣き/焦り/勝利の最低4表情を後日追加。実装は未制作でも破綻しない。

## レアリティ表現
- おつ：淡い素材感、間の抜けた表情、控えめな影・一粒の効果線。
- 普通：物語が伝わる小道具と、やわらかい輪郭のツヤ。
- レア：反射や浮遊粒子を足すが、キャラを隠さない。
- スーパーレア：属性ごとのエフェクト。ひとつの固有光源や薄い光輪。
- レジェンド：オーラ、奥行き、透ける素材、個別の印象的な光輪。単なるキラキラ増量にしない。

## 進化（同系統の識別）
- S1：そのキャラの基本シルエット。
- S2：S1を3体取得して進化。顔と主要形状は同じ。色やシンボルを残して質感・小道具を少し足す。
- S3：専用ミッションで覚醒。姿は格上げするが、耳と目と中心マークは残す。S3の進化に有料ガチャ必須としない。
- 同一キャラでS1/S2/S3を一つの参照シートにまとめ、人がチェックしてから画像を採用。

## 画像生成時の英語テンプレ
> Create exactly ONE completely original, highly polished, quirky-cute KOTSUNZ collectible mascot. Preserve its approved silhouette and face from the provided reference. Premium 3D-like 2D illustration with tactile plush/gel/soft-vinyl material, realistic shading and contact occlusion, glossy eyes with clear catchlights, layered highlights, clean colored outline, soft bounce light, visually distinctive asymmetric feature, strong readability at 48px. No text, logo, watermark, UI, background scene, third-party character or signature costume. Isolated full-body, transparent background, centered square canvas, no cut off appendages.

`data/art_prompts_500.json` の `promptEn` を追加し、**1体ずつ制作**する。画風を合わせるため最初に承認された1体の参照画像を使い、差分は編集する。モデルによって生成結果は揺れるため、完成品を精査する。

## このパックに入っている見本
`assets/sample_rendered/k001_concept.png`〜`k009_concept.png` は9体のイメージシートを切り出した**背景付き仮画像**。公式設定の最終採用と透明背景加工、S2/S3、表情差分はまだ。量産の参照用であり、本番素材としての完成を意味しない。

## キャラ採用ゲート
1. 32px・72px・256pxのサイズで認識できる。
2. 他のキャラとの色/輪郭/特徴の被りが少ない。
3. 顔がかわいく、表情が作れる。
4. 発売グッズとして製造できる、危険なほど細い突起は避ける。
5. 既存IP・商標・意匠・名称の類似チェックを人がする。
6. 進化形態とコラボスキンを自然に着せられる。

**注:** 名簿500体は企画マスターで、500枚の完成イラストではありません。制作スケジュールは、看板9体→人気30体→全基本500体→進化差分の順で段階公開するのが合理的です。
