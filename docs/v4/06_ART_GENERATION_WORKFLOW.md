# 6. 高品質キャラクター画像の量産フロー

## 非常に重要：完成済みと未完成の区別
- `art/premium_reference/premium_12_character_concept_sheet.png` は**12体の画風見本**。表情・光沢・質感・立体感の品質目標を示す。ただし1体ずつの透明背景完成画像ではない。
- `art/premium_reference/concept_01_not_final.png` などは**見本シートを切り出した画像**。一部はK001〜K008の方向性に近いが、生成画像の一貫性・パーツ整合性はまだ確定していない。
- `art/svg_prototypes/` にある1500枚は**Claudeが即表示できる仮画像**。質感を増やしたコード描画であり、ユーザーが求める完成イラストの品質とは違う。
- **正式な高品質版500体×3ステージ＝1500枚は未完成**。残存未制作枚数を画像生成済みのように見せない。

## 本番用の工程
1. **看板12体のキャラクターDNAを確定**。1体につき正面・斜め・背面、目・耳・体・小道具・影のルールをまとめる。既存の最初のK001〜K008は見本の造形の方向性を優先する。
2. **同一キャラのS1→S2→S3を同じ参照画像から制作**。色・目の位置・耳・特徴小道具を変えない。進化に伴う装飾が本人認識を邪魔しない。
3. **PNGマスター1024×1024／透過背景**。画面上に文字やUIを入れない。余白8〜12%、足・角・装飾を切らない。
4. 採用後はWebP 512x512を `assets/characters/k001/stage-1.webp` 等に保存。表示時は元の寸法比を保ち、WebP未存在ならSVGへフォールバック。
5. グッズ用には別途高解像度／正面・背面／色指定／利用権を確認し、パーツごとの分離素材も準備。
6. 量産時は `data/art_prompts_1500.json` または `art/production_prompts/prompts_1500.jsonl` を1件ずつ投入。**画像生成ツールにアクセスできないClaudeは、画像を作ったと嘘をつかず、生成待ちのタスクを記録する。**
7. 合格判定：48px識別性、別キャラとの非類似、レア度演出、同一キャラ進化整合、差分制作性、知財調査、年齢を問わず可愛く感じる仕草。

## 画風指定（全キャラ共通、英語）
Premium stylized 3D-like 2D collectible mascot art, tactile plush / jelly / soft vinyl material as appropriate, believable ambient occlusion, subtle subsurface scattering, glossy wet-eye reflections, realistic contact light, beautiful specular highlights, dimensional rim light, exquisite soft shadows, gently asymmetrical funny-cute design, unique silhouette and props, expressive understated facial acting, clean art directed linework, kawaii not generic, collectible toy-quality fidelity. Transparent 1:1 PNG master. No words, no watermark, no existing copyrighted IP, no costume copied from Disney or named anime/drama.

## ステータス管理
- `not_rendered`: 未制作
- `concept_preview`: 参考画像のみ
- `candidate`: 画像はできたが未承認
- `approved`: キャラデザイン/権利/画質の承認済み
- `published`: 正式アプリに公開済み

原則 `approved` になった画像だけ `assets/characters/...` に正式登録。
