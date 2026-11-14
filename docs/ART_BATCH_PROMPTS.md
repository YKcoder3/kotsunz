# キャラ絵の量産用プロンプト（S1・9体ずつ）

送ってもらった9体の絵（ぬけもん〜ホコリィ）と同じ画風で、1枚に3×3で9体ずつ作るための指示です。できた画像は `tools/cut_sheet.py` で切りぬいて入れます。

## 毎回つける共通の指示

```
Create ONE image: a 3x3 grid of 9 ORIGINAL cute chubby mascot characters for the quiz game KOTSUNZ, matching this exact style: soft plush / gel / velvet material with fine texture, thick soft colored outline, big glossy eyes with catchlights, pink blush, tiny stubby hands, small comic effect marks (sweat drops, sparkles, motion lines), soft watercolor-like shading, warm cream background (#FCF7F0), each character centered in its own cell with generous empty space between cells, full body, no text, no letters, no logos, no frames. Do NOT resemble any existing commercial character (no Pokemon, Disney, Sanrio, anime characters).
Characters, left to right, top to bottom:
```

## 9体ずつのリスト（S1）

### バッチ 1（K004〜K017）
```
1. K004 (ピピット): 片耳が稲妻の形; body shape 疾走する小うさぎ型; 左右不ぞろいの稲妻耳; signature prop 稲妻型の片耳と大きなヘッドホン; face 目をぎゅっと閉じて笑う; main color #FFA46F; material ソフトシリコン
2. K010 (カンペン): 鉛筆みたいな短い耳; body shape ねじれた雲型; 頭の真ん中の短い触角; signature prop 鉛筆みたいな短い耳; face いつも口が左にずれる; main color #7EA8F4; material 真鍮の光沢
3. K011 (ガチャロン): お腹の透明な窓; body shape 小さな山型; 豆粒みたいな二本角; signature prop お腹の透明な窓; face 眠そうなのに口だけ元気; main color #E7B5A9; material ふわふわ綿
4. K012 (ミテミ): 巨大な片目レンズ; body shape 底が平らなプリン型; 片方だけまばたきする耳; signature prop 巨大な片目レンズ; face びっくり目で無表情; main color #E0A7C2; material クリーム色のプリン質感
5. K013 (ネムリィ): 寝袋のような胴体; body shape たて長まゆ型; うず巻く左右の突起; signature prop 寝袋のような胴体; face 眉が左右で違う; main color #F4ADBF; material 半透明の樹脂
6. K014 (ポコロ): 片足だけローラースケート; body shape 二段重ね型; 透明なちいさな触角; signature prop 片足だけローラースケート; face 片目だけ星型ハイライト; main color #90D6DE; material テカテカのキャンディ
7. K015 (モニョン): 片方だけ長い触角; body shape 片側だけふくらむ豆型; 左だけ長い耳; signature prop 片方だけ長い触角; face うっすらしかめ面; main color #AEC0CE; material マットな木の実
8. K016 (シラベェ): 胸に小さな四角いメモ; body shape 逆さハート型; 片側だけのまる耳; signature prop 胸に小さな四角いメモ; face ジト目と小さな口; main color #DCCDEB; material 澄んだガラスゼリー
9. K017 (オモチュ): 角ばったおもち耳; body shape ぽってり壺型; まるいぷくぷく耳; signature prop 角ばったおもち耳; face 小さな八重歯が見える; main color #C2C3D3; material 星屑のベルベット
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K004 K010 K011 K012 K013 K014 K015 K016 K017`

### バッチ 2（K018〜K026）
```
1. K018 (チカチカ): 片頬に豆電球; body shape しわしわ風船型; 右だけ折れた耳; signature prop 片頬に豆電球; face きりっと眉とぽかん口; main color #D9CCA7; material スピーカーの織り布
2. K019 (ワスレル): 背中に結び目のリボン; body shape かぼちゃ型; 左右の尖った耳; signature prop 背中に結び目のリボン; face 目を閉じて微笑む; main color #C9D878; material とろけたクリーム
3. K020 (モクモク): 頭から細い煙が一本; body shape ころがる小石型; 左の耳だけ下向き; signature prop 頭から細い煙が一本; face 下を向きながら上目づかい; main color #F6A68D; material 透明メカジェル
4. K021 (コロッピ): サイコロのようなほっぺ; body shape 帽子状の円盤型; 左右高さの違う角; signature prop サイコロのようなほっぺ; face 半目でとぼける; main color #A996D7; material マットなラベンダージェル
5. K022 (ハテナコ): 逆さまの？型の耳; body shape 小さな鐘型; ヘアピン状の突起; signature prop 逆さまの？型の耳; face 笑うと片目だけ閉じる; main color #93C5E1; material 紙の繊維
6. K023 (パチパチ): 手がほぼ拍手の形; body shape ひらたいしずく型; 左右に離れた耳; signature prop 手がほぼ拍手の形; face すこし泣きそうな目; main color #B5E0A1; material パールエナメル
7. K024 (ドロリン): 半透明のしずく尾; body shape 水たまり型; 頭の真ん中の短い触角; signature prop 半透明のしずく尾; face 困り眉とひとすじ汗; main color #F6C37A; material ふわっとしたスポンジ
8. K025 (ベンチョ): 口の横に小さなチョーク; body shape しずく型; 豆粒みたいな二本角; signature prop 口の横に小さなチョーク; face 口がほぼ点; main color #F7D16A; material やわらかい苔
9. K026 (コツコツ): 丸い石のような背中; body shape つぶれおもち型; 片方だけまばたきする耳; signature prop 丸い石のような背中; face いつもニヤッとする; main color #C6A5F1; material しっとりした水飴
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K018 K019 K020 K021 K022 K023 K024 K025 K026`

### バッチ 3（K027〜K035）
```
1. K027 (ズバッピ): 横一直線の眉毛; body shape 三角おにぎり型; うず巻く左右の突起; signature prop 横一直線の眉毛; face 赤面して真顔; main color #9BD6C5; material 偏光パール
2. K028 (ユルリカ): 片耳だけ電球状; body shape 丸い洋梨型; 透明なちいさな触角; signature prop 片耳だけ電球状; face 左右で大きさの違う目; main color #C8A384; material ソフトシリコン
3. K029 (マグレオ): 星型に欠けた耳; body shape ふっくらキノコ型; 左だけ長い耳; signature prop 星型に欠けた耳; face きょとんとした丸目; main color #FFE3A1; material 弾むグミ
4. K030 (キオクン): 腹部の小さな引き出し; body shape いびつな星形; 片側だけのまる耳; signature prop 腹部の小さな引き出し; face いつも口が左にずれる; main color #7EA8F4; material すりガラスの外殻
5. K031 (ヒラメェ): 平たい頭と丸い尾; body shape ぷっくり四角型; まるいぷくぷく耳; signature prop 平たい頭と丸い尾; face 眠そうなのに口だけ元気; main color #E7B5A9; material ベルベット
6. K032 (ナゾミン): 左右で本数が違う眉; body shape 横長あんぱん型; 右だけ折れた耳; signature prop 左右で本数が違う眉; face びっくり目で無表情; main color #E0A7C2; material マットな陶器
7. K033 (ダッシュン): 背中の小さな風車; body shape まるい鈴型; 左右の尖った耳; signature prop 背中の小さな風車; face 眉が左右で違う; main color #F4ADBF; material 金箔入りのゼリー
8. K034 (モフタ): 三本だけ飛び出る毛; body shape ねじれた雲型; 左の耳だけ下向き; signature prop 三本だけ飛び出る毛; face 片目だけ星型ハイライト; main color #90D6DE; material ゴムっぽいマット
9. K035 (ピンポン): 頭頂部の押しボタン; body shape 小さな山型; 左右高さの違う角; signature prop 頭頂部の押しボタン; face うっすらしかめ面; main color #AEC0CE; material 葉脈の透けたジェル
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K027 K028 K029 K030 K031 K032 K033 K034 K035`

### バッチ 4（K036〜K044）
```
1. K036 (ギモンヌ): 片方だけ巻いた口ひげ; body shape 底が平らなプリン型; ヘアピン状の突起; signature prop 片方だけ巻いた口ひげ; face ジト目と小さな口; main color #DCCDEB; material 偏光するバブル
2. K037 (ホシポン): 額の小さな穴あき星; body shape たて長まゆ型; 左右に離れた耳; signature prop 額の小さな穴あき星; face 小さな八重歯が見える; main color #C2C3D3; material 銀河ラメ入りグミ
3. K038 (パニモ): 片目だけぐるぐる; body shape 二段重ね型; 頭の真ん中の短い触角; signature prop 片目だけぐるぐる; face きりっと眉とぽかん口; main color #D9CCA7; material 光沢サテン
4. K039 (ペラコ): 背中の一枚ページ; body shape 片側だけふくらむ豆型; 豆粒みたいな二本角; signature prop 背中の一枚ページ; face 目を閉じて微笑む; main color #C9D878; material サクサククッキー
5. K040 (トキメキ): ハート形の耳が片方; body shape 逆さハート型; 片方だけまばたきする耳; signature prop ハート形の耳が片方; face 下を向きながら上目づかい; main color #F6A68D; material 真鍮の光沢
6. K041 (チョッカン): 目元に一本の三日月; body shape ぽってり壺型; うず巻く左右の突起; signature prop 目元に一本の三日月; face 半目でとぼける; main color #A996D7; material ふわふわ綿
7. K042 (プチメモ): 耳に貼りつく小付箋; body shape しわしわ風船型; 透明なちいさな触角; signature prop 耳に貼りつく小付箋; face 笑うと片目だけ閉じる; main color #93C5E1; material クリーム色のプリン質感
8. K043 (ロンロン): 左右逆向きの眉; body shape かぼちゃ型; 左だけ長い耳; signature prop 左右逆向きの眉; face すこし泣きそうな目; main color #B5E0A1; material 半透明の樹脂
9. K044 (カッとん): 片頬の小さな火花; body shape ころがる小石型; 片側だけのまる耳; signature prop 片頬の小さな火花; face 困り眉とひとすじ汗; main color #F6C37A; material テカテカのキャンディ
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K036 K037 K038 K039 K040 K041 K042 K043 K044`

### バッチ 5（K045〜K053）
```
1. K045 (アタルン): お腹の小さな的マーク; body shape 帽子状の円盤型; まるいぷくぷく耳; signature prop お腹の小さな的マーク; face 口がほぼ点; main color #F7D16A; material マットな木の実
2. K046 (ソウゾウ): 頭上の小さな家型突起; body shape 小さな鐘型; 右だけ折れた耳; signature prop 頭上の小さな家型突起; face いつもニヤッとする; main color #C6A5F1; material 澄んだガラスゼリー
3. K047 (クルミン): 殻の渦模様と一文字口; body shape ひらたいしずく型; 左右の尖った耳; signature prop 殻の渦模様と一文字口; face 赤面して真顔; main color #9BD6C5; material 星屑のベルベット
4. K048 (オチツキ): 片足だけ座禅ポーズ; body shape 水たまり型; 左の耳だけ下向き; signature prop 片足だけ座禅ポーズ; face 左右で大きさの違う目; main color #C8A384; material スピーカーの織り布
5. K049 (ハヤオシ): 額の丸い赤いボタン; body shape しずく型; 左右高さの違う角; signature prop 額の丸い赤いボタン; face きょとんとした丸目; main color #FFE3A1; material とろけたクリーム
6. K050 (セイカイ): 片側だけ開いた王冠耳; body shape つぶれおもち型; ヘアピン状の突起; signature prop 片側だけ開いた王冠耳; face いつも口が左にずれる; main color #7EA8F4; material 透明メカジェル
7. K051 (モヤン): 片側だけふくらむ豆型の体、うず巻く左右の突起、折りたたみ枕、端がほつれたケープ; body shape 片側だけふくらむ豆型; うず巻く左右の突起; signature prop 折りたたみ枕; face 眠そうなのに口だけ元気; main color #E7B5A9; material ベルベット
8. K052 (ネミン): 小さな鐘型の体、右だけ折れた耳、ひと粒の夢玉、胸の一点刺繍; body shape 小さな鐘型; 右だけ折れた耳; signature prop ひと粒の夢玉; face 笑うと片目だけ閉じる; main color #F6C37A; material ふわふわ綿
9. K053 (ポヨン): ふっくらキノコ型の体、左右に離れた耳、月型の湯たんぽ、背中のミニポーチ; body shape ふっくらキノコ型; 左右に離れた耳; signature prop 月型の湯たんぽ; face 眉が左右で違う; main color #C2C3D3; material マットなラベンダージェル
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K045 K046 K047 K048 K049 K050 K051 K052 K053`

### バッチ 6（K054〜K062）
```
1. K054 (フワン): 底が平らなプリン型の体、透明なちいさな触角、小さな目覚まし時計、左だけのほっぺそばかす; body shape 底が平らなプリン型; 透明なちいさな触角; signature prop 小さな目覚まし時計; face 困り眉とひとすじ汗; main color #7EA8F4; material ベルベット
2. K055 (ウトロン): かぼちゃ型の体、左右の尖った耳、星柄の寝袋、片頬の小さなばんそうこう; body shape かぼちゃ型; 左右の尖った耳; signature prop 星柄の寝袋; face うっすらしかめ面; main color #B5E0A1; material ふわふわ綿
3. K056 (スヤラン): つぶれおもち型の体、頭の真ん中の短い触角、ねじれたナイトキャップ、頬のまるいペイント; body shape つぶれおもち型; 頭の真ん中の短い触角; signature prop ねじれたナイトキャップ; face いつもニヤッとする; main color #DCCDEB; material マットなラベンダージェル
4. K057 (トロモン): まるい鈴型の体、左だけ長い耳、逆さまの毛布、ぺたんこの足跡模様; body shape まるい鈴型; 左だけ長い耳; signature prop 逆さまの毛布; face 小さな八重歯が見える; main color #FFE3A1; material ベルベット
5. K058 (ユラネン): 逆さハート型の体、左の耳だけ下向き、眠りの鈴、鼻先の小さな光; body shape 逆さハート型; 左の耳だけ下向き; signature prop 眠りの鈴; face 左右で大きさの違う目; main color #93C5E1; material ふわふわ綿
6. K059 (ボケラン): ひらたいしずく型の体、豆粒みたいな二本角、折りたたみ枕、巻きすぎた細いマフラー; body shape ひらたいしずく型; 豆粒みたいな二本角; signature prop 折りたたみ枕; face 目を閉じて微笑む; main color #AEC0CE; material マットなラベンダージェル
7. K060 (ヌクロン): いびつな星形の体、片側だけのまる耳、ひと粒の夢玉、おへその星形ボタン; body shape いびつな星形; 片側だけのまる耳; signature prop ひと粒の夢玉; face いつも口が左にずれる; main color #C8A384; material ベルベット
8. K061 (ヒルネン): たて長まゆ型の体、左右高さの違う角、月型の湯たんぽ、一本だけの短いしっぽ; body shape たて長まゆ型; 左右高さの違う角; signature prop 月型の湯たんぽ; face 半目でとぼける; main color #A996D7; material ふわふわ綿
9. K062 (マドロン): ころがる小石型の体、片方だけまばたきする耳、小さな目覚まし時計、前髪のような模様; body shape ころがる小石型; 片方だけまばたきする耳; signature prop 小さな目覚まし時計; face びっくり目で無表情; main color #90D6DE; material マットなラベンダージェル
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K054 K055 K056 K057 K058 K059 K060 K061 K062`

### バッチ 7（K063〜K071）
```
1. K063 (ルルネン): 三角おにぎり型の体、まるいぷくぷく耳、星柄の寝袋、片側の口元にほくろ; body shape 三角おにぎり型; まるいぷくぷく耳; signature prop 星柄の寝袋; face すこし泣きそうな目; main color #9BD6C5; material ベルベット
2. K064 (ポタネン): ねじれた雲型の体、ヘアピン状の突起、ねじれたナイトキャップ、頭に乗った小さな石; body shape ねじれた雲型; ヘアピン状の突起; signature prop ねじれたナイトキャップ; face 片目だけ星型ハイライト; main color #F6A68D; material ふわふわ綿
3. K065 (ホワネン): ぽってり壺型の体、うず巻く左右の突起、逆さまの毛布、左右違う色の靴; body shape ぽってり壺型; うず巻く左右の突起; signature prop 逆さまの毛布; face 口がほぼ点; main color #F4ADBF; material マットなラベンダージェル
4. K066 (モヤリ): 水たまり型の体、右だけ折れた耳、眠りの鈴、ゆるく結んだネクタイ; body shape 水たまり型; 右だけ折れた耳; signature prop 眠りの鈴; face ジト目と小さな口; main color #C6A5F1; material ベルベット
5. K067 (ネミリ): ぷっくり四角型の体、左右に離れた耳、折りたたみ枕、背中のちいさな羽; body shape ぷっくり四角型; 左右に離れた耳; signature prop 折りたたみ枕; face 赤面して真顔; main color #C9D878; material ふわふわ綿
6. K068 (ポヨリ): 二段重ね型の体、透明なちいさな触角、ひと粒の夢玉、ふちどりだけきらめく模様; body shape 二段重ね型; 透明なちいさな触角; signature prop ひと粒の夢玉; face きりっと眉とぽかん口; main color #E0A7C2; material マットなラベンダージェル
7. K069 (フワリ): 帽子状の円盤型の体、左右の尖った耳、月型の湯たんぽ、端がほつれたケープ; body shape 帽子状の円盤型; 左右の尖った耳; signature prop 月型の湯たんぽ; face きょとんとした丸目; main color #F7D16A; material ベルベット
8. K070 (ウトロリ): 丸い洋梨型の体、頭の真ん中の短い触角、小さな目覚まし時計、胸の一点刺繍; body shape 丸い洋梨型; 頭の真ん中の短い触角; signature prop 小さな目覚まし時計; face 下を向きながら上目づかい; main color #D9CCA7; material ふわふわ綿
9. K071 (スヤラリ): 小さな山型の体、左だけ長い耳、星柄の寝袋、背中のミニポーチ; body shape 小さな山型; 左だけ長い耳; signature prop 星柄の寝袋; face 眠そうなのに口だけ元気; main color #E7B5A9; material マットなラベンダージェル
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K063 K064 K065 K066 K067 K068 K069 K070 K071`

### バッチ 8（K072〜K080）
```
1. K072 (トロモリ): しわしわ風船型の体、左の耳だけ下向き、ねじれたナイトキャップ、左だけのほっぺそばかす; body shape しわしわ風船型; 左の耳だけ下向き; signature prop ねじれたナイトキャップ; face 笑うと片目だけ閉じる; main color #F6C37A; material ベルベット
2. K073 (ユラネリ): しずく型の体、豆粒みたいな二本角、逆さまの毛布、片頬の小さなばんそうこう; body shape しずく型; 豆粒みたいな二本角; signature prop 逆さまの毛布; face 眉が左右で違う; main color #C2C3D3; material ふわふわ綿
3. K074 (ボケラリ): 横長あんぱん型の体、片側だけのまる耳、眠りの鈴、頬のまるいペイント; body shape 横長あんぱん型; 片側だけのまる耳; signature prop 眠りの鈴; face 困り眉とひとすじ汗; main color #7EA8F4; material マットなラベンダージェル
4. K075 (ヌクロリ): 片側だけふくらむ豆型の体、左右高さの違う角、折りたたみ枕、ぺたんこの足跡模様; body shape 片側だけふくらむ豆型; 左右高さの違う角; signature prop 折りたたみ枕; face うっすらしかめ面; main color #B5E0A1; material ベルベット
5. K076 (ヒルネリ): 小さな鐘型の体、片方だけまばたきする耳、ひと粒の夢玉、鼻先の小さな光; body shape 小さな鐘型; 片方だけまばたきする耳; signature prop ひと粒の夢玉; face いつもニヤッとする; main color #DCCDEB; material ふわふわ綿
6. K077 (マドロリ): ふっくらキノコ型の体、まるいぷくぷく耳、月型の湯たんぽ、巻きすぎた細いマフラー; body shape ふっくらキノコ型; まるいぷくぷく耳; signature prop 月型の湯たんぽ; face 小さな八重歯が見える; main color #FFE3A1; material マットなラベンダージェル
7. K078 (ルルネリ): 底が平らなプリン型の体、ヘアピン状の突起、小さな目覚まし時計、おへその星形ボタン; body shape 底が平らなプリン型; ヘアピン状の突起; signature prop 小さな目覚まし時計; face 左右で大きさの違う目; main color #93C5E1; material ベルベット
8. K079 (ポタネリ): かぼちゃ型の体、うず巻く左右の突起、星柄の寝袋、一本だけの短いしっぽ; body shape かぼちゃ型; うず巻く左右の突起; signature prop 星柄の寝袋; face 目を閉じて微笑む; main color #AEC0CE; material ふわふわ綿
9. K080 (ホワネリ): つぶれおもち型の体、右だけ折れた耳、ねじれたナイトキャップ、前髪のような模様; body shape つぶれおもち型; 右だけ折れた耳; signature prop ねじれたナイトキャップ; face いつも口が左にずれる; main color #C8A384; material マットなラベンダージェル
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K072 K073 K074 K075 K076 K077 K078 K079 K080`

### バッチ 9（K081〜K089）
```
1. K081 (モヤム): まるい鈴型の体、左右に離れた耳、逆さまの毛布、片側の口元にほくろ; body shape まるい鈴型; 左右に離れた耳; signature prop 逆さまの毛布; face 半目でとぼける; main color #A996D7; material ベルベット
2. K082 (ネミム): 逆さハート型の体、透明なちいさな触角、眠りの鈴、頭に乗った小さな石; body shape 逆さハート型; 透明なちいさな触角; signature prop 眠りの鈴; face びっくり目で無表情; main color #90D6DE; material ふわふわ綿
3. K083 (ポヨム): ひらたいしずく型の体、左右の尖った耳、折りたたみ枕、左右違う色の靴; body shape ひらたいしずく型; 左右の尖った耳; signature prop 折りたたみ枕; face すこし泣きそうな目; main color #9BD6C5; material マットなラベンダージェル
4. K084 (フワム): いびつな星形の体、頭の真ん中の短い触角、ひと粒の夢玉、ゆるく結んだネクタイ; body shape いびつな星形; 頭の真ん中の短い触角; signature prop ひと粒の夢玉; face 片目だけ星型ハイライト; main color #F6A68D; material ベルベット
5. K085 (ウトロム): たて長まゆ型の体、左だけ長い耳、月型の湯たんぽ、背中のちいさな羽; body shape たて長まゆ型; 左だけ長い耳; signature prop 月型の湯たんぽ; face 口がほぼ点; main color #F4ADBF; material ふわふわ綿
6. K086 (スヤラム): ころがる小石型の体、左の耳だけ下向き、小さな目覚まし時計、ふちどりだけきらめく模様; body shape ころがる小石型; 左の耳だけ下向き; signature prop 小さな目覚まし時計; face ジト目と小さな口; main color #C6A5F1; material マットなラベンダージェル
7. K087 (トロモム): 三角おにぎり型の体、豆粒みたいな二本角、星柄の寝袋、端がほつれたケープ; body shape 三角おにぎり型; 豆粒みたいな二本角; signature prop 星柄の寝袋; face 赤面して真顔; main color #C9D878; material ベルベット
8. K088 (ユラネム): ねじれた雲型の体、片側だけのまる耳、ねじれたナイトキャップ、胸の一点刺繍; body shape ねじれた雲型; 片側だけのまる耳; signature prop ねじれたナイトキャップ; face きりっと眉とぽかん口; main color #E0A7C2; material ふわふわ綿
9. K089 (ボケラム): ぽってり壺型の体、左右高さの違う角、逆さまの毛布、背中のミニポーチ; body shape ぽってり壺型; 左右高さの違う角; signature prop 逆さまの毛布; face きょとんとした丸目; main color #F7D16A; material マットなラベンダージェル
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K081 K082 K083 K084 K085 K086 K087 K088 K089`

### バッチ 10（K090〜K098）
```
1. K090 (ヌクロム): 水たまり型の体、片方だけまばたきする耳、眠りの鈴、左だけのほっぺそばかす; body shape 水たまり型; 片方だけまばたきする耳; signature prop 眠りの鈴; face 下を向きながら上目づかい; main color #D9CCA7; material ベルベット
2. K091 (ヒルネム): ぷっくり四角型の体、まるいぷくぷく耳、折りたたみ枕、片頬の小さなばんそうこう; body shape ぷっくり四角型; まるいぷくぷく耳; signature prop 折りたたみ枕; face 眠そうなのに口だけ元気; main color #E7B5A9; material ふわふわ綿
3. K092 (マドロム): 二段重ね型の体、ヘアピン状の突起、ひと粒の夢玉、頬のまるいペイント; body shape 二段重ね型; ヘアピン状の突起; signature prop ひと粒の夢玉; face 笑うと片目だけ閉じる; main color #F6C37A; material マットなラベンダージェル
4. K093 (ルルネム): 帽子状の円盤型の体、うず巻く左右の突起、月型の湯たんぽ、ぺたんこの足跡模様; body shape 帽子状の円盤型; うず巻く左右の突起; signature prop 月型の湯たんぽ; face 眉が左右で違う; main color #C2C3D3; material ベルベット
5. K094 (ポタネム): 丸い洋梨型の体、右だけ折れた耳、小さな目覚まし時計、鼻先の小さな光; body shape 丸い洋梨型; 右だけ折れた耳; signature prop 小さな目覚まし時計; face 困り眉とひとすじ汗; main color #7EA8F4; material ふわふわ綿
6. K095 (ホワネム): 小さな山型の体、左右に離れた耳、星柄の寝袋、巻きすぎた細いマフラー; body shape 小さな山型; 左右に離れた耳; signature prop 星柄の寝袋; face うっすらしかめ面; main color #B5E0A1; material マットなラベンダージェル
7. K096 (シオラポ): 帽子状の円盤型の体、まるいぷくぷく耳、片耳が本のページ、巻きすぎた細いマフラー; body shape 帽子状の円盤型; まるいぷくぷく耳; signature prop 片耳が本のページ; face 眉が左右で違う; main color #C9D878; material マットな陶器
8. K097 (モジンポ): 丸い洋梨型の体、ヘアピン状の突起、豆粒の辞書、おへその星形ボタン; body shape 丸い洋梨型; ヘアピン状の突起; signature prop 豆粒の辞書; face 困り眉とひとすじ汗; main color #E0A7C2; material クリーム色のプリン質感
9. K098 (ペラモポ): 小さな山型の体、うず巻く左右の突起、ひとりでめくれる本、一本だけの短いしっぽ; body shape 小さな山型; うず巻く左右の突起; signature prop ひとりでめくれる本; face うっすらしかめ面; main color #F7D16A; material 紙の繊維
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K090 K091 K092 K093 K094 K095 K096 K097 K098`

### バッチ 11（K099〜K107）
```
1. K099 (ノトラポ): しわしわ風船型の体、右だけ折れた耳、動く文字のリボン、前髪のような模様; body shape しわしわ風船型; 右だけ折れた耳; signature prop 動く文字のリボン; face いつもニヤッとする; main color #D9CCA7; material マットな陶器
2. K100 (ヨミルポ): しずく型の体、左右に離れた耳、はみ出た付箋、片側の口元にほくろ; body shape しずく型; 左右に離れた耳; signature prop はみ出た付箋; face 小さな八重歯が見える; main color #E7B5A9; material クリーム色のプリン質感
3. K101 (フセリポ): 横長あんぱん型の体、透明なちいさな触角、丸まったしおり、頭に乗った小さな石; body shape 横長あんぱん型; 透明なちいさな触角; signature prop 丸まったしおり; face 左右で大きさの違う目; main color #F6C37A; material 紙の繊維
4. K102 (ジショムポ): 片側だけふくらむ豆型の体、左右の尖った耳、小さな万年筆、左右違う色の靴; body shape 片側だけふくらむ豆型; 左右の尖った耳; signature prop 小さな万年筆; face 目を閉じて微笑む; main color #C2C3D3; material マットな陶器
5. K103 (カナリポ): 小さな鐘型の体、頭の真ん中の短い触角、くしゃくしゃノート、ゆるく結んだネクタイ; body shape 小さな鐘型; 頭の真ん中の短い触角; signature prop くしゃくしゃノート; face いつも口が左にずれる; main color #7EA8F4; material クリーム色のプリン質感
6. K104 (メモラポ): ふっくらキノコ型の体、左だけ長い耳、片耳が本のページ、背中のちいさな羽; body shape ふっくらキノコ型; 左だけ長い耳; signature prop 片耳が本のページ; face 半目でとぼける; main color #B5E0A1; material 紙の繊維
7. K105 (ブンチポ): 底が平らなプリン型の体、左の耳だけ下向き、豆粒の辞書、ふちどりだけきらめく模様; body shape 底が平らなプリン型; 左の耳だけ下向き; signature prop 豆粒の辞書; face びっくり目で無表情; main color #DCCDEB; material マットな陶器
8. K106 (ルビオポ): かぼちゃ型の体、豆粒みたいな二本角、ひとりでめくれる本、端がほつれたケープ; body shape かぼちゃ型; 豆粒みたいな二本角; signature prop ひとりでめくれる本; face すこし泣きそうな目; main color #FFE3A1; material クリーム色のプリン質感
9. K107 (インクルポ): つぶれおもち型の体、片側だけのまる耳、動く文字のリボン、胸の一点刺繍; body shape つぶれおもち型; 片側だけのまる耳; signature prop 動く文字のリボン; face 片目だけ星型ハイライト; main color #93C5E1; material 紙の繊維
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K099 K100 K101 K102 K103 K104 K105 K106 K107`

### バッチ 12（K108〜K116）
```
1. K108 (コトペポ): まるい鈴型の体、左右高さの違う角、はみ出た付箋、背中のミニポーチ; body shape まるい鈴型; 左右高さの違う角; signature prop はみ出た付箋; face 口がほぼ点; main color #AEC0CE; material マットな陶器
2. K109 (サクモポ): 逆さハート型の体、片方だけまばたきする耳、丸まったしおり、左だけのほっぺそばかす; body shape 逆さハート型; 片方だけまばたきする耳; signature prop 丸まったしおり; face ジト目と小さな口; main color #C8A384; material クリーム色のプリン質感
3. K110 (リードンポ): ひらたいしずく型の体、まるいぷくぷく耳、小さな万年筆、片頬の小さなばんそうこう; body shape ひらたいしずく型; まるいぷくぷく耳; signature prop 小さな万年筆; face 赤面して真顔; main color #A996D7; material 紙の繊維
4. K111 (シオラチ): いびつな星形の体、ヘアピン状の突起、くしゃくしゃノート、頬のまるいペイント; body shape いびつな星形; ヘアピン状の突起; signature prop くしゃくしゃノート; face きりっと眉とぽかん口; main color #90D6DE; material マットな陶器
5. K112 (モジンチ): たて長まゆ型の体、うず巻く左右の突起、片耳が本のページ、ぺたんこの足跡模様; body shape たて長まゆ型; うず巻く左右の突起; signature prop 片耳が本のページ; face きょとんとした丸目; main color #9BD6C5; material クリーム色のプリン質感
6. K113 (ペラモチ): ころがる小石型の体、右だけ折れた耳、豆粒の辞書、鼻先の小さな光; body shape ころがる小石型; 右だけ折れた耳; signature prop 豆粒の辞書; face 下を向きながら上目づかい; main color #F6A68D; material 紙の繊維
7. K114 (ノトラチ): 三角おにぎり型の体、左右に離れた耳、ひとりでめくれる本、巻きすぎた細いマフラー; body shape 三角おにぎり型; 左右に離れた耳; signature prop ひとりでめくれる本; face 眠そうなのに口だけ元気; main color #F4ADBF; material マットな陶器
8. K115 (ヨミルチ): ねじれた雲型の体、透明なちいさな触角、動く文字のリボン、おへその星形ボタン; body shape ねじれた雲型; 透明なちいさな触角; signature prop 動く文字のリボン; face 笑うと片目だけ閉じる; main color #C6A5F1; material クリーム色のプリン質感
9. K116 (フセリチ): ぽってり壺型の体、左右の尖った耳、はみ出た付箋、一本だけの短いしっぽ; body shape ぽってり壺型; 左右の尖った耳; signature prop はみ出た付箋; face 眉が左右で違う; main color #C9D878; material 紙の繊維
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K108 K109 K110 K111 K112 K113 K114 K115 K116`

### バッチ 13（K117〜K125）
```
1. K117 (ジショムチ): 水たまり型の体、頭の真ん中の短い触角、丸まったしおり、前髪のような模様; body shape 水たまり型; 頭の真ん中の短い触角; signature prop 丸まったしおり; face 困り眉とひとすじ汗; main color #E0A7C2; material マットな陶器
2. K118 (カナリチ): ぷっくり四角型の体、左だけ長い耳、小さな万年筆、片側の口元にほくろ; body shape ぷっくり四角型; 左だけ長い耳; signature prop 小さな万年筆; face うっすらしかめ面; main color #F7D16A; material クリーム色のプリン質感
3. K119 (メモラチ): 二段重ね型の体、左の耳だけ下向き、くしゃくしゃノート、頭に乗った小さな石; body shape 二段重ね型; 左の耳だけ下向き; signature prop くしゃくしゃノート; face いつもニヤッとする; main color #D9CCA7; material 紙の繊維
4. K120 (ブンチポッ): 帽子状の円盤型の体、豆粒みたいな二本角、片耳が本のページ、左右違う色の靴; body shape 帽子状の円盤型; 豆粒みたいな二本角; signature prop 片耳が本のページ; face 小さな八重歯が見える; main color #E7B5A9; material マットな陶器
5. K121 (ルビオチ): 丸い洋梨型の体、片側だけのまる耳、豆粒の辞書、ゆるく結んだネクタイ; body shape 丸い洋梨型; 片側だけのまる耳; signature prop 豆粒の辞書; face 左右で大きさの違う目; main color #F6C37A; material クリーム色のプリン質感
6. K122 (インクルチ): 小さな山型の体、左右高さの違う角、ひとりでめくれる本、背中のちいさな羽; body shape 小さな山型; 左右高さの違う角; signature prop ひとりでめくれる本; face 目を閉じて微笑む; main color #C2C3D3; material 紙の繊維
7. K123 (コトペチ): しわしわ風船型の体、片方だけまばたきする耳、動く文字のリボン、ふちどりだけきらめく模様; body shape しわしわ風船型; 片方だけまばたきする耳; signature prop 動く文字のリボン; face いつも口が左にずれる; main color #7EA8F4; material マットな陶器
8. K124 (サクモチ): しずく型の体、まるいぷくぷく耳、はみ出た付箋、端がほつれたケープ; body shape しずく型; まるいぷくぷく耳; signature prop はみ出た付箋; face 半目でとぼける; main color #B5E0A1; material クリーム色のプリン質感
9. K125 (リードンチ): 横長あんぱん型の体、ヘアピン状の突起、丸まったしおり、胸の一点刺繍; body shape 横長あんぱん型; ヘアピン状の突起; signature prop 丸まったしおり; face びっくり目で無表情; main color #DCCDEB; material 紙の繊維
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K117 K118 K119 K120 K121 K122 K123 K124 K125`

### バッチ 14（K126〜K134）
```
1. K126 (シオラル): 片側だけふくらむ豆型の体、うず巻く左右の突起、小さな万年筆、背中のミニポーチ; body shape 片側だけふくらむ豆型; うず巻く左右の突起; signature prop 小さな万年筆; face すこし泣きそうな目; main color #FFE3A1; material マットな陶器
2. K127 (モジンル): 小さな鐘型の体、右だけ折れた耳、くしゃくしゃノート、左だけのほっぺそばかす; body shape 小さな鐘型; 右だけ折れた耳; signature prop くしゃくしゃノート; face 片目だけ星型ハイライト; main color #93C5E1; material クリーム色のプリン質感
3. K128 (ペラモル): ふっくらキノコ型の体、左右に離れた耳、片耳が本のページ、片頬の小さなばんそうこう; body shape ふっくらキノコ型; 左右に離れた耳; signature prop 片耳が本のページ; face 口がほぼ点; main color #AEC0CE; material 紙の繊維
4. K129 (ノトラル): 底が平らなプリン型の体、透明なちいさな触角、豆粒の辞書、頬のまるいペイント; body shape 底が平らなプリン型; 透明なちいさな触角; signature prop 豆粒の辞書; face ジト目と小さな口; main color #C8A384; material マットな陶器
5. K130 (ヨミルチッ): かぼちゃ型の体、左右の尖った耳、ひとりでめくれる本、ぺたんこの足跡模様; body shape かぼちゃ型; 左右の尖った耳; signature prop ひとりでめくれる本; face 赤面して真顔; main color #A996D7; material クリーム色のプリン質感
6. K131 (フセリル): つぶれおもち型の体、頭の真ん中の短い触角、動く文字のリボン、鼻先の小さな光; body shape つぶれおもち型; 頭の真ん中の短い触角; signature prop 動く文字のリボン; face きりっと眉とぽかん口; main color #90D6DE; material 紙の繊維
7. K132 (ジショムル): まるい鈴型の体、左だけ長い耳、はみ出た付箋、巻きすぎた細いマフラー; body shape まるい鈴型; 左だけ長い耳; signature prop はみ出た付箋; face きょとんとした丸目; main color #9BD6C5; material マットな陶器
8. K133 (カナリル): 逆さハート型の体、左の耳だけ下向き、丸まったしおり、おへその星形ボタン; body shape 逆さハート型; 左の耳だけ下向き; signature prop 丸まったしおり; face 下を向きながら上目づかい; main color #F6A68D; material クリーム色のプリン質感
9. K134 (メモラル): ひらたいしずく型の体、豆粒みたいな二本角、小さな万年筆、一本だけの短いしっぽ; body shape ひらたいしずく型; 豆粒みたいな二本角; signature prop 小さな万年筆; face 眠そうなのに口だけ元気; main color #F4ADBF; material 紙の繊維
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K126 K127 K128 K129 K130 K131 K132 K133 K134`

### バッチ 15（K135〜K143）
```
1. K135 (ブンチル): いびつな星形の体、片側だけのまる耳、くしゃくしゃノート、前髪のような模様; body shape いびつな星形; 片側だけのまる耳; signature prop くしゃくしゃノート; face 笑うと片目だけ閉じる; main color #C6A5F1; material マットな陶器
2. K136 (ルビオル): たて長まゆ型の体、左右高さの違う角、片耳が本のページ、片側の口元にほくろ; body shape たて長まゆ型; 左右高さの違う角; signature prop 片耳が本のページ; face 眉が左右で違う; main color #C9D878; material クリーム色のプリン質感
3. K137 (インクルチッ): ころがる小石型の体、片方だけまばたきする耳、豆粒の辞書、頭に乗った小さな石; body shape ころがる小石型; 片方だけまばたきする耳; signature prop 豆粒の辞書; face 困り眉とひとすじ汗; main color #E0A7C2; material 紙の繊維
4. K138 (コトペル): 三角おにぎり型の体、まるいぷくぷく耳、ひとりでめくれる本、左右違う色の靴; body shape 三角おにぎり型; まるいぷくぷく耳; signature prop ひとりでめくれる本; face うっすらしかめ面; main color #F7D16A; material マットな陶器
5. K139 (サクモル): ねじれた雲型の体、ヘアピン状の突起、動く文字のリボン、ゆるく結んだネクタイ; body shape ねじれた雲型; ヘアピン状の突起; signature prop 動く文字のリボン; face いつもニヤッとする; main color #D9CCA7; material クリーム色のプリン質感
6. K140 (リードンル): ぽってり壺型の体、うず巻く左右の突起、はみ出た付箋、背中のちいさな羽; body shape ぽってり壺型; うず巻く左右の突起; signature prop はみ出た付箋; face 小さな八重歯が見える; main color #E7B5A9; material 紙の繊維
7. K141 (ピカノン): 三角おにぎり型の体、左右高さの違う角、片側だけ光る角、背中のちいさな羽; body shape 三角おにぎり型; 左右高さの違う角; signature prop 片側だけ光る角; face うっすらしかめ面; main color #9BD6C5; material 金箔入りのゼリー
8. K142 (キラモン): ねじれた雲型の体、片方だけまばたきする耳、額の閃光マーク、ふちどりだけきらめく模様; body shape ねじれた雲型; 片方だけまばたきする耳; signature prop 額の閃光マーク; face いつもニヤッとする; main color #F6A68D; material 半透明の樹脂
9. K143 (ヒラリン): ぽってり壺型の体、まるいぷくぷく耳、ひび割れた電球、端がほつれたケープ; body shape ぽってり壺型; まるいぷくぷく耳; signature prop ひび割れた電球; face 小さな八重歯が見える; main color #F4ADBF; material パールエナメル
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K135 K136 K137 K138 K139 K140 K141 K142 K143`

### バッチ 16（K144〜K152）
```
1. K144 (テルモン): 水たまり型の体、ヘアピン状の突起、コマ型の光輪、胸の一点刺繍; body shape 水たまり型; ヘアピン状の突起; signature prop コマ型の光輪; face 左右で大きさの違う目; main color #C6A5F1; material 金箔入りのゼリー
2. K145 (フラシン): ぷっくり四角型の体、うず巻く左右の突起、まばたきするランタン、背中のミニポーチ; body shape ぷっくり四角型; うず巻く左右の突起; signature prop まばたきするランタン; face 目を閉じて微笑む; main color #C9D878; material 半透明の樹脂
3. K146 (ランプルン): 二段重ね型の体、右だけ折れた耳、きらめく電池、左だけのほっぺそばかす; body shape 二段重ね型; 右だけ折れた耳; signature prop きらめく電池; face いつも口が左にずれる; main color #E0A7C2; material パールエナメル
4. K147 (チカネン): 帽子状の円盤型の体、左右に離れた耳、ガラスの小さな星、片頬の小さなばんそうこう; body shape 帽子状の円盤型; 左右に離れた耳; signature prop ガラスの小さな星; face 半目でとぼける; main color #F7D16A; material 金箔入りのゼリー
5. K148 (ヒカラン): 丸い洋梨型の体、透明なちいさな触角、ころがる虹粒、頬のまるいペイント; body shape 丸い洋梨型; 透明なちいさな触角; signature prop ころがる虹粒; face びっくり目で無表情; main color #D9CCA7; material 半透明の樹脂
6. K149 (ソラメン): 小さな山型の体、左右の尖った耳、片側だけ光る角、ぺたんこの足跡模様; body shape 小さな山型; 左右の尖った耳; signature prop 片側だけ光る角; face すこし泣きそうな目; main color #E7B5A9; material パールエナメル
7. K150 (ビビラン): しわしわ風船型の体、頭の真ん中の短い触角、額の閃光マーク、鼻先の小さな光; body shape しわしわ風船型; 頭の真ん中の短い触角; signature prop 額の閃光マーク; face 片目だけ星型ハイライト; main color #F6C37A; material 金箔入りのゼリー
8. K151 (ピコロン): しずく型の体、左だけ長い耳、ひび割れた電球、巻きすぎた細いマフラー; body shape しずく型; 左だけ長い耳; signature prop ひび割れた電球; face 口がほぼ点; main color #C2C3D3; material 半透明の樹脂
9. K152 (シュリマン): 横長あんぱん型の体、左の耳だけ下向き、コマ型の光輪、おへその星形ボタン; body shape 横長あんぱん型; 左の耳だけ下向き; signature prop コマ型の光輪; face ジト目と小さな口; main color #7EA8F4; material パールエナメル
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K144 K145 K146 K147 K148 K149 K150 K151 K152`

### バッチ 17（K153〜K161）
```
1. K153 (キラナン): 片側だけふくらむ豆型の体、豆粒みたいな二本角、まばたきするランタン、一本だけの短いしっぽ; body shape 片側だけふくらむ豆型; 豆粒みたいな二本角; signature prop まばたきするランタン; face 赤面して真顔; main color #B5E0A1; material 金箔入りのゼリー
2. K154 (トキラン): 小さな鐘型の体、片側だけのまる耳、きらめく電池、前髪のような模様; body shape 小さな鐘型; 片側だけのまる耳; signature prop きらめく電池; face きりっと眉とぽかん口; main color #DCCDEB; material 半透明の樹脂
3. K155 (カガミンポ): ふっくらキノコ型の体、左右高さの違う角、ガラスの小さな星、片側の口元にほくろ; body shape ふっくらキノコ型; 左右高さの違う角; signature prop ガラスの小さな星; face きょとんとした丸目; main color #FFE3A1; material パールエナメル
4. K156 (ピカノル): 底が平らなプリン型の体、片方だけまばたきする耳、ころがる虹粒、頭に乗った小さな石; body shape 底が平らなプリン型; 片方だけまばたきする耳; signature prop ころがる虹粒; face 下を向きながら上目づかい; main color #93C5E1; material 金箔入りのゼリー
5. K157 (キラモル): かぼちゃ型の体、まるいぷくぷく耳、片側だけ光る角、左右違う色の靴; body shape かぼちゃ型; まるいぷくぷく耳; signature prop 片側だけ光る角; face 眠そうなのに口だけ元気; main color #AEC0CE; material 半透明の樹脂
6. K158 (ヒラリル): つぶれおもち型の体、ヘアピン状の突起、額の閃光マーク、ゆるく結んだネクタイ; body shape つぶれおもち型; ヘアピン状の突起; signature prop 額の閃光マーク; face 笑うと片目だけ閉じる; main color #C8A384; material パールエナメル
7. K159 (テルモル): まるい鈴型の体、うず巻く左右の突起、ひび割れた電球、背中のちいさな羽; body shape まるい鈴型; うず巻く左右の突起; signature prop ひび割れた電球; face 眉が左右で違う; main color #A996D7; material 金箔入りのゼリー
8. K160 (フラシル): 逆さハート型の体、右だけ折れた耳、コマ型の光輪、ふちどりだけきらめく模様; body shape 逆さハート型; 右だけ折れた耳; signature prop コマ型の光輪; face 困り眉とひとすじ汗; main color #90D6DE; material 半透明の樹脂
9. K161 (ランプルチ): ひらたいしずく型の体、左右に離れた耳、まばたきするランタン、端がほつれたケープ; body shape ひらたいしずく型; 左右に離れた耳; signature prop まばたきするランタン; face うっすらしかめ面; main color #9BD6C5; material パールエナメル
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K153 K154 K155 K156 K157 K158 K159 K160 K161`

### バッチ 18（K162〜K170）
```
1. K162 (チカネル): いびつな星形の体、透明なちいさな触角、きらめく電池、胸の一点刺繍; body shape いびつな星形; 透明なちいさな触角; signature prop きらめく電池; face いつもニヤッとする; main color #F6A68D; material 金箔入りのゼリー
2. K163 (ヒカラル): たて長まゆ型の体、左右の尖った耳、ガラスの小さな星、背中のミニポーチ; body shape たて長まゆ型; 左右の尖った耳; signature prop ガラスの小さな星; face 小さな八重歯が見える; main color #F4ADBF; material 半透明の樹脂
3. K164 (ソラメル): ころがる小石型の体、頭の真ん中の短い触角、ころがる虹粒、左だけのほっぺそばかす; body shape ころがる小石型; 頭の真ん中の短い触角; signature prop ころがる虹粒; face 左右で大きさの違う目; main color #C6A5F1; material パールエナメル
4. K165 (ビビラル): 三角おにぎり型の体、左だけ長い耳、片側だけ光る角、片頬の小さなばんそうこう; body shape 三角おにぎり型; 左だけ長い耳; signature prop 片側だけ光る角; face 目を閉じて微笑む; main color #C9D878; material 金箔入りのゼリー
5. K166 (ピコロル): ねじれた雲型の体、左の耳だけ下向き、額の閃光マーク、頬のまるいペイント; body shape ねじれた雲型; 左の耳だけ下向き; signature prop 額の閃光マーク; face いつも口が左にずれる; main color #E0A7C2; material 半透明の樹脂
6. K167 (シュリマル): ぽってり壺型の体、豆粒みたいな二本角、ひび割れた電球、ぺたんこの足跡模様; body shape ぽってり壺型; 豆粒みたいな二本角; signature prop ひび割れた電球; face 半目でとぼける; main color #F7D16A; material パールエナメル
7. K168 (キラナル): 水たまり型の体、片側だけのまる耳、コマ型の光輪、鼻先の小さな光; body shape 水たまり型; 片側だけのまる耳; signature prop コマ型の光輪; face びっくり目で無表情; main color #D9CCA7; material 金箔入りのゼリー
8. K169 (トキラル): ぷっくり四角型の体、左右高さの違う角、まばたきするランタン、巻きすぎた細いマフラー; body shape ぷっくり四角型; 左右高さの違う角; signature prop まばたきするランタン; face すこし泣きそうな目; main color #E7B5A9; material 半透明の樹脂
9. K170 (カガミンル): 二段重ね型の体、片方だけまばたきする耳、きらめく電池、おへその星形ボタン; body shape 二段重ね型; 片方だけまばたきする耳; signature prop きらめく電池; face 片目だけ星型ハイライト; main color #F6C37A; material パールエナメル
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K162 K163 K164 K165 K166 K167 K168 K169 K170`

### バッチ 19（K171〜K179）
```
1. K171 (ピカノパ): 帽子状の円盤型の体、まるいぷくぷく耳、ガラスの小さな星、一本だけの短いしっぽ; body shape 帽子状の円盤型; まるいぷくぷく耳; signature prop ガラスの小さな星; face 口がほぼ点; main color #C2C3D3; material 金箔入りのゼリー
2. K172 (キラモパ): 丸い洋梨型の体、ヘアピン状の突起、ころがる虹粒、前髪のような模様; body shape 丸い洋梨型; ヘアピン状の突起; signature prop ころがる虹粒; face ジト目と小さな口; main color #7EA8F4; material 半透明の樹脂
3. K173 (ヒラリパ): 小さな山型の体、うず巻く左右の突起、片側だけ光る角、片側の口元にほくろ; body shape 小さな山型; うず巻く左右の突起; signature prop 片側だけ光る角; face 赤面して真顔; main color #B5E0A1; material パールエナメル
4. K174 (テルモパ): しわしわ風船型の体、右だけ折れた耳、額の閃光マーク、頭に乗った小さな石; body shape しわしわ風船型; 右だけ折れた耳; signature prop 額の閃光マーク; face きりっと眉とぽかん口; main color #DCCDEB; material 金箔入りのゼリー
5. K175 (フラシパ): しずく型の体、左右に離れた耳、ひび割れた電球、左右違う色の靴; body shape しずく型; 左右に離れた耳; signature prop ひび割れた電球; face きょとんとした丸目; main color #FFE3A1; material 半透明の樹脂
6. K176 (ランプルパ): 横長あんぱん型の体、透明なちいさな触角、コマ型の光輪、ゆるく結んだネクタイ; body shape 横長あんぱん型; 透明なちいさな触角; signature prop コマ型の光輪; face 下を向きながら上目づかい; main color #93C5E1; material パールエナメル
7. K177 (チカネパ): 片側だけふくらむ豆型の体、左右の尖った耳、まばたきするランタン、背中のちいさな羽; body shape 片側だけふくらむ豆型; 左右の尖った耳; signature prop まばたきするランタン; face 眠そうなのに口だけ元気; main color #AEC0CE; material 金箔入りのゼリー
8. K178 (ヒカラパ): 小さな鐘型の体、頭の真ん中の短い触角、きらめく電池、ふちどりだけきらめく模様; body shape 小さな鐘型; 頭の真ん中の短い触角; signature prop きらめく電池; face 笑うと片目だけ閉じる; main color #C8A384; material 半透明の樹脂
9. K179 (ソラメパ): ふっくらキノコ型の体、左だけ長い耳、ガラスの小さな星、端がほつれたケープ; body shape ふっくらキノコ型; 左だけ長い耳; signature prop ガラスの小さな星; face 眉が左右で違う; main color #A996D7; material パールエナメル
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K171 K172 K173 K174 K175 K176 K177 K178 K179`

### バッチ 20（K180〜K188）
```
1. K180 (ビビラパ): 底が平らなプリン型の体、左の耳だけ下向き、ころがる虹粒、胸の一点刺繍; body shape 底が平らなプリン型; 左の耳だけ下向き; signature prop ころがる虹粒; face 困り眉とひとすじ汗; main color #90D6DE; material 金箔入りのゼリー
2. K181 (ピコロパ): かぼちゃ型の体、豆粒みたいな二本角、片側だけ光る角、背中のミニポーチ; body shape かぼちゃ型; 豆粒みたいな二本角; signature prop 片側だけ光る角; face うっすらしかめ面; main color #9BD6C5; material 半透明の樹脂
3. K182 (シュリマパ): つぶれおもち型の体、片側だけのまる耳、額の閃光マーク、左だけのほっぺそばかす; body shape つぶれおもち型; 片側だけのまる耳; signature prop 額の閃光マーク; face いつもニヤッとする; main color #F6A68D; material パールエナメル
4. K183 (キラナパ): まるい鈴型の体、左右高さの違う角、ひび割れた電球、片頬の小さなばんそうこう; body shape まるい鈴型; 左右高さの違う角; signature prop ひび割れた電球; face 小さな八重歯が見える; main color #F4ADBF; material 金箔入りのゼリー
5. K184 (トキラパ): 逆さハート型の体、片方だけまばたきする耳、コマ型の光輪、頬のまるいペイント; body shape 逆さハート型; 片方だけまばたきする耳; signature prop コマ型の光輪; face 左右で大きさの違う目; main color #C6A5F1; material 半透明の樹脂
6. K185 (カガミンパ): ひらたいしずく型の体、まるいぷくぷく耳、まばたきするランタン、ぺたんこの足跡模様; body shape ひらたいしずく型; まるいぷくぷく耳; signature prop まばたきするランタン; face 目を閉じて微笑む; main color #C9D878; material パールエナメル
7. K186 (カゼポト): まるい鈴型の体、豆粒みたいな二本角、発光する足跡、ぺたんこの足跡模様; body shape まるい鈴型; 豆粒みたいな二本角; signature prop 発光する足跡; face 小さな八重歯が見える; main color #AEC0CE; material ゴムっぽいマット
8. K187 (ハヤミト): 逆さハート型の体、片側だけのまる耳、浮遊する輪っか、鼻先の小さな光; body shape 逆さハート型; 片側だけのまる耳; signature prop 浮遊する輪っか; face 左右で大きさの違う目; main color #C8A384; material テカテカのキャンディ
9. K188 (ブオラト): ひらたいしずく型の体、左右高さの違う角、片耳の風車、巻きすぎた細いマフラー; body shape ひらたいしずく型; 左右高さの違う角; signature prop 片耳の風車; face 目を閉じて微笑む; main color #A996D7; material ふわっとしたスポンジ
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K180 K181 K182 K183 K184 K185 K186 K187 K188`

### バッチ 21（K189〜K197）
```
1. K189 (シュパルト): いびつな星形の体、片方だけまばたきする耳、渦巻き型の尻尾、おへその星形ボタン; body shape いびつな星形; 片方だけまばたきする耳; signature prop 渦巻き型の尻尾; face いつも口が左にずれる; main color #90D6DE; material ゴムっぽいマット
2. K190 (ピュラト): たて長まゆ型の体、まるいぷくぷく耳、ミニ速度計、一本だけの短いしっぽ; body shape たて長まゆ型; まるいぷくぷく耳; signature prop ミニ速度計; face 半目でとぼける; main color #9BD6C5; material テカテカのキャンディ
3. K191 (ササネト): ころがる小石型の体、ヘアピン状の突起、小さなスニーカー、前髪のような模様; body shape ころがる小石型; ヘアピン状の突起; signature prop 小さなスニーカー; face びっくり目で無表情; main color #F6A68D; material ふわっとしたスポンジ
4. K192 (トビロト): 三角おにぎり型の体、うず巻く左右の突起、風をつかむ帽子、片側の口元にほくろ; body shape 三角おにぎり型; うず巻く左右の突起; signature prop 風をつかむ帽子; face すこし泣きそうな目; main color #F4ADBF; material ゴムっぽいマット
5. K193 (ウズモト): ねじれた雲型の体、右だけ折れた耳、後ろになびく一本リボン、頭に乗った小さな石; body shape ねじれた雲型; 右だけ折れた耳; signature prop 後ろになびく一本リボン; face 片目だけ星型ハイライト; main color #C6A5F1; material テカテカのキャンディ
6. K194 (クルピト): ぽってり壺型の体、左右に離れた耳、発光する足跡、左右違う色の靴; body shape ぽってり壺型; 左右に離れた耳; signature prop 発光する足跡; face 口がほぼ点; main color #C9D878; material ふわっとしたスポンジ
7. K195 (ランネト): 水たまり型の体、透明なちいさな触角、浮遊する輪っか、ゆるく結んだネクタイ; body shape 水たまり型; 透明なちいさな触角; signature prop 浮遊する輪っか; face ジト目と小さな口; main color #E0A7C2; material ゴムっぽいマット
8. K196 (ヒュルト): ぷっくり四角型の体、左右の尖った耳、片耳の風車、背中のちいさな羽; body shape ぷっくり四角型; 左右の尖った耳; signature prop 片耳の風車; face 赤面して真顔; main color #F7D16A; material テカテカのキャンディ
9. K197 (ピョカト): 二段重ね型の体、頭の真ん中の短い触角、渦巻き型の尻尾、ふちどりだけきらめく模様; body shape 二段重ね型; 頭の真ん中の短い触角; signature prop 渦巻き型の尻尾; face きりっと眉とぽかん口; main color #D9CCA7; material ふわっとしたスポンジ
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K189 K190 K191 K192 K193 K194 K195 K196 K197`

### バッチ 22（K198〜K206）
```
1. K198 (フブキルト): 帽子状の円盤型の体、左だけ長い耳、ミニ速度計、端がほつれたケープ; body shape 帽子状の円盤型; 左だけ長い耳; signature prop ミニ速度計; face きょとんとした丸目; main color #E7B5A9; material ゴムっぽいマット
2. K199 (ソクモト): 丸い洋梨型の体、左の耳だけ下向き、小さなスニーカー、胸の一点刺繍; body shape 丸い洋梨型; 左の耳だけ下向き; signature prop 小さなスニーカー; face 下を向きながら上目づかい; main color #F6C37A; material テカテカのキャンディ
3. K200 (トップルト): 小さな山型の体、豆粒みたいな二本角、風をつかむ帽子、背中のミニポーチ; body shape 小さな山型; 豆粒みたいな二本角; signature prop 風をつかむ帽子; face 眠そうなのに口だけ元気; main color #C2C3D3; material ふわっとしたスポンジ
4. K201 (カゼポナ): しわしわ風船型の体、片側だけのまる耳、後ろになびく一本リボン、左だけのほっぺそばかす; body shape しわしわ風船型; 片側だけのまる耳; signature prop 後ろになびく一本リボン; face 笑うと片目だけ閉じる; main color #7EA8F4; material ゴムっぽいマット
5. K202 (ハヤミナ): しずく型の体、左右高さの違う角、発光する足跡、片頬の小さなばんそうこう; body shape しずく型; 左右高さの違う角; signature prop 発光する足跡; face 眉が左右で違う; main color #B5E0A1; material テカテカのキャンディ
6. K203 (ブオラナ): 横長あんぱん型の体、片方だけまばたきする耳、浮遊する輪っか、頬のまるいペイント; body shape 横長あんぱん型; 片方だけまばたきする耳; signature prop 浮遊する輪っか; face 困り眉とひとすじ汗; main color #DCCDEB; material ふわっとしたスポンジ
7. K204 (シュパルナ): 片側だけふくらむ豆型の体、まるいぷくぷく耳、片耳の風車、ぺたんこの足跡模様; body shape 片側だけふくらむ豆型; まるいぷくぷく耳; signature prop 片耳の風車; face うっすらしかめ面; main color #FFE3A1; material ゴムっぽいマット
8. K205 (ピュラナ): 小さな鐘型の体、ヘアピン状の突起、渦巻き型の尻尾、鼻先の小さな光; body shape 小さな鐘型; ヘアピン状の突起; signature prop 渦巻き型の尻尾; face いつもニヤッとする; main color #93C5E1; material テカテカのキャンディ
9. K206 (ササネナ): ふっくらキノコ型の体、うず巻く左右の突起、ミニ速度計、巻きすぎた細いマフラー; body shape ふっくらキノコ型; うず巻く左右の突起; signature prop ミニ速度計; face 小さな八重歯が見える; main color #AEC0CE; material ふわっとしたスポンジ
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K198 K199 K200 K201 K202 K203 K204 K205 K206`

### バッチ 23（K207〜K215）
```
1. K207 (トビロナ): 底が平らなプリン型の体、右だけ折れた耳、小さなスニーカー、おへその星形ボタン; body shape 底が平らなプリン型; 右だけ折れた耳; signature prop 小さなスニーカー; face 左右で大きさの違う目; main color #C8A384; material ゴムっぽいマット
2. K208 (ウズモナ): かぼちゃ型の体、左右に離れた耳、風をつかむ帽子、一本だけの短いしっぽ; body shape かぼちゃ型; 左右に離れた耳; signature prop 風をつかむ帽子; face 目を閉じて微笑む; main color #A996D7; material テカテカのキャンディ
3. K209 (クルピナ): つぶれおもち型の体、透明なちいさな触角、後ろになびく一本リボン、前髪のような模様; body shape つぶれおもち型; 透明なちいさな触角; signature prop 後ろになびく一本リボン; face いつも口が左にずれる; main color #90D6DE; material ふわっとしたスポンジ
4. K210 (ランネナ): まるい鈴型の体、左右の尖った耳、発光する足跡、片側の口元にほくろ; body shape まるい鈴型; 左右の尖った耳; signature prop 発光する足跡; face 半目でとぼける; main color #9BD6C5; material ゴムっぽいマット
5. K211 (ヒュルナ): 逆さハート型の体、頭の真ん中の短い触角、浮遊する輪っか、頭に乗った小さな石; body shape 逆さハート型; 頭の真ん中の短い触角; signature prop 浮遊する輪っか; face びっくり目で無表情; main color #F6A68D; material テカテカのキャンディ
6. K212 (ピョカナ): ひらたいしずく型の体、左だけ長い耳、片耳の風車、左右違う色の靴; body shape ひらたいしずく型; 左だけ長い耳; signature prop 片耳の風車; face すこし泣きそうな目; main color #F4ADBF; material ふわっとしたスポンジ
7. K213 (フブキルナ): いびつな星形の体、左の耳だけ下向き、渦巻き型の尻尾、ゆるく結んだネクタイ; body shape いびつな星形; 左の耳だけ下向き; signature prop 渦巻き型の尻尾; face 片目だけ星型ハイライト; main color #C6A5F1; material ゴムっぽいマット
8. K214 (ソクモナ): たて長まゆ型の体、豆粒みたいな二本角、ミニ速度計、背中のちいさな羽; body shape たて長まゆ型; 豆粒みたいな二本角; signature prop ミニ速度計; face 口がほぼ点; main color #C9D878; material テカテカのキャンディ
9. K215 (トップルナ): ころがる小石型の体、片側だけのまる耳、小さなスニーカー、ふちどりだけきらめく模様; body shape ころがる小石型; 片側だけのまる耳; signature prop 小さなスニーカー; face ジト目と小さな口; main color #E0A7C2; material ふわっとしたスポンジ
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K207 K208 K209 K210 K211 K212 K213 K214 K215`

### バッチ 24（K216〜K224）
```
1. K216 (カゼポン): 三角おにぎり型の体、左右高さの違う角、風をつかむ帽子、端がほつれたケープ; body shape 三角おにぎり型; 左右高さの違う角; signature prop 風をつかむ帽子; face 赤面して真顔; main color #F7D16A; material ゴムっぽいマット
2. K217 (ハヤミン): ねじれた雲型の体、片方だけまばたきする耳、後ろになびく一本リボン、胸の一点刺繍; body shape ねじれた雲型; 片方だけまばたきする耳; signature prop 後ろになびく一本リボン; face きりっと眉とぽかん口; main color #D9CCA7; material テカテカのキャンディ
3. K218 (ブオラン): ぽってり壺型の体、まるいぷくぷく耳、発光する足跡、背中のミニポーチ; body shape ぽってり壺型; まるいぷくぷく耳; signature prop 発光する足跡; face きょとんとした丸目; main color #E7B5A9; material ふわっとしたスポンジ
4. K219 (シュパルン): 水たまり型の体、ヘアピン状の突起、浮遊する輪っか、左だけのほっぺそばかす; body shape 水たまり型; ヘアピン状の突起; signature prop 浮遊する輪っか; face 下を向きながら上目づかい; main color #F6C37A; material ゴムっぽいマット
5. K220 (ピュラン): ぷっくり四角型の体、うず巻く左右の突起、片耳の風車、片頬の小さなばんそうこう; body shape ぷっくり四角型; うず巻く左右の突起; signature prop 片耳の風車; face 眠そうなのに口だけ元気; main color #C2C3D3; material テカテカのキャンディ
6. K221 (ササネン): 二段重ね型の体、右だけ折れた耳、渦巻き型の尻尾、頬のまるいペイント; body shape 二段重ね型; 右だけ折れた耳; signature prop 渦巻き型の尻尾; face 笑うと片目だけ閉じる; main color #7EA8F4; material ふわっとしたスポンジ
7. K222 (トビロン): 帽子状の円盤型の体、左右に離れた耳、ミニ速度計、ぺたんこの足跡模様; body shape 帽子状の円盤型; 左右に離れた耳; signature prop ミニ速度計; face 眉が左右で違う; main color #B5E0A1; material ゴムっぽいマット
8. K223 (ウズモン): 丸い洋梨型の体、透明なちいさな触角、小さなスニーカー、鼻先の小さな光; body shape 丸い洋梨型; 透明なちいさな触角; signature prop 小さなスニーカー; face 困り眉とひとすじ汗; main color #DCCDEB; material テカテカのキャンディ
9. K224 (クルピン): 小さな山型の体、左右の尖った耳、風をつかむ帽子、巻きすぎた細いマフラー; body shape 小さな山型; 左右の尖った耳; signature prop 風をつかむ帽子; face うっすらしかめ面; main color #FFE3A1; material ふわっとしたスポンジ
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K216 K217 K218 K219 K220 K221 K222 K223 K224`

### バッチ 25（K225〜K233）
```
1. K225 (ランネン): しわしわ風船型の体、頭の真ん中の短い触角、後ろになびく一本リボン、おへその星形ボタン; body shape しわしわ風船型; 頭の真ん中の短い触角; signature prop 後ろになびく一本リボン; face いつもニヤッとする; main color #93C5E1; material ゴムっぽいマット
2. K226 (ヒュルン): しずく型の体、左だけ長い耳、発光する足跡、一本だけの短いしっぽ; body shape しずく型; 左だけ長い耳; signature prop 発光する足跡; face 小さな八重歯が見える; main color #AEC0CE; material テカテカのキャンディ
3. K227 (ピョカン): 横長あんぱん型の体、左の耳だけ下向き、浮遊する輪っか、前髪のような模様; body shape 横長あんぱん型; 左の耳だけ下向き; signature prop 浮遊する輪っか; face 左右で大きさの違う目; main color #C8A384; material ふわっとしたスポンジ
4. K228 (フブキルン): 片側だけふくらむ豆型の体、豆粒みたいな二本角、片耳の風車、片側の口元にほくろ; body shape 片側だけふくらむ豆型; 豆粒みたいな二本角; signature prop 片耳の風車; face 目を閉じて微笑む; main color #A996D7; material ゴムっぽいマット
5. K229 (ソクモン): 小さな鐘型の体、片側だけのまる耳、渦巻き型の尻尾、頭に乗った小さな石; body shape 小さな鐘型; 片側だけのまる耳; signature prop 渦巻き型の尻尾; face いつも口が左にずれる; main color #90D6DE; material テカテカのキャンディ
6. K230 (トップルン): ふっくらキノコ型の体、左右高さの違う角、ミニ速度計、左右違う色の靴; body shape ふっくらキノコ型; 左右高さの違う角; signature prop ミニ速度計; face 半目でとぼける; main color #9BD6C5; material ふわっとしたスポンジ
7. K231 (タネモリ): 片側だけふくらむ豆型の体、左だけ長い耳、きのこ型の傘、左右違う色の靴; body shape 片側だけふくらむ豆型; 左だけ長い耳; signature prop きのこ型の傘; face 目を閉じて微笑む; main color #B5E0A1; material 葉脈の透けたジェル
8. K232 (モリピリ): 小さな鐘型の体、左の耳だけ下向き、小さな水差し、ゆるく結んだネクタイ; body shape 小さな鐘型; 左の耳だけ下向き; signature prop 小さな水差し; face いつも口が左にずれる; main color #DCCDEB; material マットな木の実
9. K233 (ナエラリ): ふっくらキノコ型の体、豆粒みたいな二本角、しなった木の実、背中のちいさな羽; body shape ふっくらキノコ型; 豆粒みたいな二本角; signature prop しなった木の実; face 半目でとぼける; main color #FFE3A1; material やわらかい苔
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K225 K226 K227 K228 K229 K230 K231 K232 K233`

### バッチ 26（K234〜K242）
```
1. K234 (コケルリ): 底が平らなプリン型の体、片側だけのまる耳、どんぐりポケット、ふちどりだけきらめく模様; body shape 底が平らなプリン型; 片側だけのまる耳; signature prop どんぐりポケット; face びっくり目で無表情; main color #93C5E1; material 葉脈の透けたジェル
2. K235 (ミドネリ): かぼちゃ型の体、左右高さの違う角、片側だけ伸びた芽、端がほつれたケープ; body shape かぼちゃ型; 左右高さの違う角; signature prop 片側だけ伸びた芽; face すこし泣きそうな目; main color #AEC0CE; material マットな木の実
3. K236 (ハッパルリ): つぶれおもち型の体、片方だけまばたきする耳、葉っぱの襟巻き、胸の一点刺繍; body shape つぶれおもち型; 片方だけまばたきする耳; signature prop 葉っぱの襟巻き; face 片目だけ星型ハイライト; main color #C8A384; material やわらかい苔
4. K237 (クサラリ): まるい鈴型の体、まるいぷくぷく耳、透ける花びら、背中のミニポーチ; body shape まるい鈴型; まるいぷくぷく耳; signature prop 透ける花びら; face 口がほぼ点; main color #A996D7; material 葉脈の透けたジェル
5. K238 (ツボミリ): 逆さハート型の体、ヘアピン状の突起、頭の小さな苔庭、左だけのほっぺそばかす; body shape 逆さハート型; ヘアピン状の突起; signature prop 頭の小さな苔庭; face ジト目と小さな口; main color #90D6DE; material マットな木の実
6. K239 (ツタピリ): ひらたいしずく型の体、うず巻く左右の突起、きのこ型の傘、片頬の小さなばんそうこう; body shape ひらたいしずく型; うず巻く左右の突起; signature prop きのこ型の傘; face 赤面して真顔; main color #9BD6C5; material やわらかい苔
7. K240 (キノネリ): いびつな星形の体、右だけ折れた耳、小さな水差し、頬のまるいペイント; body shape いびつな星形; 右だけ折れた耳; signature prop 小さな水差し; face きりっと眉とぽかん口; main color #F6A68D; material 葉脈の透けたジェル
8. K241 (ポポラリ): たて長まゆ型の体、左右に離れた耳、しなった木の実、ぺたんこの足跡模様; body shape たて長まゆ型; 左右に離れた耳; signature prop しなった木の実; face きょとんとした丸目; main color #F4ADBF; material マットな木の実
9. K242 (フキミリ): ころがる小石型の体、透明なちいさな触角、どんぐりポケット、鼻先の小さな光; body shape ころがる小石型; 透明なちいさな触角; signature prop どんぐりポケット; face 下を向きながら上目づかい; main color #C6A5F1; material やわらかい苔
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K234 K235 K236 K237 K238 K239 K240 K241 K242`

### バッチ 27（K243〜K251）
```
1. K243 (マメルリ): 三角おにぎり型の体、左右の尖った耳、片側だけ伸びた芽、巻きすぎた細いマフラー; body shape 三角おにぎり型; 左右の尖った耳; signature prop 片側だけ伸びた芽; face 眠そうなのに口だけ元気; main color #C9D878; material 葉脈の透けたジェル
2. K244 (スギモリ): ねじれた雲型の体、頭の真ん中の短い触角、葉っぱの襟巻き、おへその星形ボタン; body shape ねじれた雲型; 頭の真ん中の短い触角; signature prop 葉っぱの襟巻き; face 笑うと片目だけ閉じる; main color #E0A7C2; material マットな木の実
3. K245 (ミツバリ): ぽってり壺型の体、左だけ長い耳、透ける花びら、一本だけの短いしっぽ; body shape ぽってり壺型; 左だけ長い耳; signature prop 透ける花びら; face 眉が左右で違う; main color #F7D16A; material やわらかい苔
4. K246 (タネモタ): 水たまり型の体、左の耳だけ下向き、頭の小さな苔庭、前髪のような模様; body shape 水たまり型; 左の耳だけ下向き; signature prop 頭の小さな苔庭; face 困り眉とひとすじ汗; main color #D9CCA7; material 葉脈の透けたジェル
5. K247 (モリピタ): ぷっくり四角型の体、豆粒みたいな二本角、きのこ型の傘、片側の口元にほくろ; body shape ぷっくり四角型; 豆粒みたいな二本角; signature prop きのこ型の傘; face うっすらしかめ面; main color #E7B5A9; material マットな木の実
6. K248 (ナエラタ): 二段重ね型の体、片側だけのまる耳、小さな水差し、頭に乗った小さな石; body shape 二段重ね型; 片側だけのまる耳; signature prop 小さな水差し; face いつもニヤッとする; main color #F6C37A; material やわらかい苔
7. K249 (コケルタ): 帽子状の円盤型の体、左右高さの違う角、しなった木の実、左右違う色の靴; body shape 帽子状の円盤型; 左右高さの違う角; signature prop しなった木の実; face 小さな八重歯が見える; main color #C2C3D3; material 葉脈の透けたジェル
8. K250 (ミドネタ): 丸い洋梨型の体、片方だけまばたきする耳、どんぐりポケット、ゆるく結んだネクタイ; body shape 丸い洋梨型; 片方だけまばたきする耳; signature prop どんぐりポケット; face 左右で大きさの違う目; main color #7EA8F4; material マットな木の実
9. K251 (ハッパルタ): 小さな山型の体、まるいぷくぷく耳、片側だけ伸びた芽、背中のちいさな羽; body shape 小さな山型; まるいぷくぷく耳; signature prop 片側だけ伸びた芽; face 目を閉じて微笑む; main color #B5E0A1; material やわらかい苔
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K243 K244 K245 K246 K247 K248 K249 K250 K251`

### バッチ 28（K252〜K260）
```
1. K252 (クサラタ): しわしわ風船型の体、ヘアピン状の突起、葉っぱの襟巻き、ふちどりだけきらめく模様; body shape しわしわ風船型; ヘアピン状の突起; signature prop 葉っぱの襟巻き; face いつも口が左にずれる; main color #DCCDEB; material 葉脈の透けたジェル
2. K253 (ツボミタ): しずく型の体、うず巻く左右の突起、透ける花びら、端がほつれたケープ; body shape しずく型; うず巻く左右の突起; signature prop 透ける花びら; face 半目でとぼける; main color #FFE3A1; material マットな木の実
3. K254 (ツタピタ): 横長あんぱん型の体、右だけ折れた耳、頭の小さな苔庭、胸の一点刺繍; body shape 横長あんぱん型; 右だけ折れた耳; signature prop 頭の小さな苔庭; face びっくり目で無表情; main color #93C5E1; material やわらかい苔
4. K255 (キノネタ): 片側だけふくらむ豆型の体、左右に離れた耳、きのこ型の傘、背中のミニポーチ; body shape 片側だけふくらむ豆型; 左右に離れた耳; signature prop きのこ型の傘; face すこし泣きそうな目; main color #AEC0CE; material 葉脈の透けたジェル
5. K256 (ポポラタ): 小さな鐘型の体、透明なちいさな触角、小さな水差し、左だけのほっぺそばかす; body shape 小さな鐘型; 透明なちいさな触角; signature prop 小さな水差し; face 片目だけ星型ハイライト; main color #C8A384; material マットな木の実
6. K257 (フキミタ): ふっくらキノコ型の体、左右の尖った耳、しなった木の実、片頬の小さなばんそうこう; body shape ふっくらキノコ型; 左右の尖った耳; signature prop しなった木の実; face 口がほぼ点; main color #A996D7; material やわらかい苔
7. K258 (マメルタ): 底が平らなプリン型の体、頭の真ん中の短い触角、どんぐりポケット、頬のまるいペイント; body shape 底が平らなプリン型; 頭の真ん中の短い触角; signature prop どんぐりポケット; face ジト目と小さな口; main color #90D6DE; material 葉脈の透けたジェル
8. K259 (スギモタ): かぼちゃ型の体、左だけ長い耳、片側だけ伸びた芽、ぺたんこの足跡模様; body shape かぼちゃ型; 左だけ長い耳; signature prop 片側だけ伸びた芽; face 赤面して真顔; main color #9BD6C5; material マットな木の実
9. K260 (ミツバタ): つぶれおもち型の体、左の耳だけ下向き、葉っぱの襟巻き、鼻先の小さな光; body shape つぶれおもち型; 左の耳だけ下向き; signature prop 葉っぱの襟巻き; face きりっと眉とぽかん口; main color #F6A68D; material やわらかい苔
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K252 K253 K254 K255 K256 K257 K258 K259 K260`

### バッチ 29（K261〜K269）
```
1. K261 (タネモン): まるい鈴型の体、豆粒みたいな二本角、透ける花びら、巻きすぎた細いマフラー; body shape まるい鈴型; 豆粒みたいな二本角; signature prop 透ける花びら; face きょとんとした丸目; main color #F4ADBF; material 葉脈の透けたジェル
2. K262 (モリピン): 逆さハート型の体、片側だけのまる耳、頭の小さな苔庭、おへその星形ボタン; body shape 逆さハート型; 片側だけのまる耳; signature prop 頭の小さな苔庭; face 下を向きながら上目づかい; main color #C6A5F1; material マットな木の実
3. K263 (ナエラン): ひらたいしずく型の体、左右高さの違う角、きのこ型の傘、一本だけの短いしっぽ; body shape ひらたいしずく型; 左右高さの違う角; signature prop きのこ型の傘; face 眠そうなのに口だけ元気; main color #C9D878; material やわらかい苔
4. K264 (コケルン): いびつな星形の体、片方だけまばたきする耳、小さな水差し、前髪のような模様; body shape いびつな星形; 片方だけまばたきする耳; signature prop 小さな水差し; face 笑うと片目だけ閉じる; main color #E0A7C2; material 葉脈の透けたジェル
5. K265 (ミドネン): たて長まゆ型の体、まるいぷくぷく耳、しなった木の実、片側の口元にほくろ; body shape たて長まゆ型; まるいぷくぷく耳; signature prop しなった木の実; face 眉が左右で違う; main color #F7D16A; material マットな木の実
6. K266 (ハッパルン): ころがる小石型の体、ヘアピン状の突起、どんぐりポケット、頭に乗った小さな石; body shape ころがる小石型; ヘアピン状の突起; signature prop どんぐりポケット; face 困り眉とひとすじ汗; main color #D9CCA7; material やわらかい苔
7. K267 (クサラン): 三角おにぎり型の体、うず巻く左右の突起、片側だけ伸びた芽、左右違う色の靴; body shape 三角おにぎり型; うず巻く左右の突起; signature prop 片側だけ伸びた芽; face うっすらしかめ面; main color #E7B5A9; material 葉脈の透けたジェル
8. K268 (ツボミン): ねじれた雲型の体、右だけ折れた耳、葉っぱの襟巻き、ゆるく結んだネクタイ; body shape ねじれた雲型; 右だけ折れた耳; signature prop 葉っぱの襟巻き; face いつもニヤッとする; main color #F6C37A; material マットな木の実
9. K269 (ツタピン): ぽってり壺型の体、左右に離れた耳、透ける花びら、背中のちいさな羽; body shape ぽってり壺型; 左右に離れた耳; signature prop 透ける花びら; face 小さな八重歯が見える; main color #C2C3D3; material やわらかい苔
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K261 K262 K263 K264 K265 K266 K267 K268 K269`

### バッチ 30（K270〜K278）
```
1. K270 (キノネン): 水たまり型の体、透明なちいさな触角、頭の小さな苔庭、ふちどりだけきらめく模様; body shape 水たまり型; 透明なちいさな触角; signature prop 頭の小さな苔庭; face 左右で大きさの違う目; main color #7EA8F4; material 葉脈の透けたジェル
2. K271 (ポポラン): ぷっくり四角型の体、左右の尖った耳、きのこ型の傘、端がほつれたケープ; body shape ぷっくり四角型; 左右の尖った耳; signature prop きのこ型の傘; face 目を閉じて微笑む; main color #B5E0A1; material マットな木の実
3. K272 (フキミン): 二段重ね型の体、頭の真ん中の短い触角、小さな水差し、胸の一点刺繍; body shape 二段重ね型; 頭の真ん中の短い触角; signature prop 小さな水差し; face いつも口が左にずれる; main color #DCCDEB; material やわらかい苔
4. K273 (マメルン): 帽子状の円盤型の体、左だけ長い耳、しなった木の実、背中のミニポーチ; body shape 帽子状の円盤型; 左だけ長い耳; signature prop しなった木の実; face 半目でとぼける; main color #FFE3A1; material 葉脈の透けたジェル
5. K274 (スギモン): 丸い洋梨型の体、左の耳だけ下向き、どんぐりポケット、左だけのほっぺそばかす; body shape 丸い洋梨型; 左の耳だけ下向き; signature prop どんぐりポケット; face びっくり目で無表情; main color #93C5E1; material マットな木の実
6. K275 (ミツバン): 小さな山型の体、豆粒みたいな二本角、片側だけ伸びた芽、片頬の小さなばんそうこう; body shape 小さな山型; 豆粒みたいな二本角; signature prop 片側だけ伸びた芽; face すこし泣きそうな目; main color #AEC0CE; material やわらかい苔
7. K276 (アワピル): 帽子状の円盤型の体、左右の尖った耳、魚型の風鈴、片頬の小さなばんそうこう; body shape 帽子状の円盤型; 左右の尖った耳; signature prop 魚型の風鈴; face 半目でとぼける; main color #E7B5A9; material 偏光するバブル
8. K277 (ミズモル): 丸い洋梨型の体、頭の真ん中の短い触角、頭にのった一滴、頬のまるいペイント; body shape 丸い洋梨型; 頭の真ん中の短い触角; signature prop 頭にのった一滴; face びっくり目で無表情; main color #F6C37A; material 澄んだガラスゼリー
9. K278 (シズラル): 小さな山型の体、左だけ長い耳、雫のマフラー、ぺたんこの足跡模様; body shape 小さな山型; 左だけ長い耳; signature prop 雫のマフラー; face すこし泣きそうな目; main color #C2C3D3; material しっとりした水飴
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K270 K271 K272 K273 K274 K275 K276 K277 K278`

### バッチ 31（K279〜K287）
```
1. K279 (ウミルチ): しわしわ風船型の体、左の耳だけ下向き、水面の鏡、鼻先の小さな光; body shape しわしわ風船型; 左の耳だけ下向き; signature prop 水面の鏡; face 片目だけ星型ハイライト; main color #7EA8F4; material 偏光するバブル
2. K280 (ナミネル): しずく型の体、豆粒みたいな二本角、逆さの金魚鉢、巻きすぎた細いマフラー; body shape しずく型; 豆粒みたいな二本角; signature prop 逆さの金魚鉢; face 口がほぼ点; main color #B5E0A1; material 澄んだガラスゼリー
3. K281 (プクナル): 横長あんぱん型の体、片側だけのまる耳、ひとつだけ大きな泡、おへその星形ボタン; body shape 横長あんぱん型; 片側だけのまる耳; signature prop ひとつだけ大きな泡; face ジト目と小さな口; main color #DCCDEB; material しっとりした水飴
4. K282 (バブリル): 片側だけふくらむ豆型の体、左右高さの違う角、貝殻のヘアピン、一本だけの短いしっぽ; body shape 片側だけふくらむ豆型; 左右高さの違う角; signature prop 貝殻のヘアピン; face 赤面して真顔; main color #FFE3A1; material 偏光するバブル
5. K283 (ポチャル): 小さな鐘型の体、片方だけまばたきする耳、泡の触角、前髪のような模様; body shape 小さな鐘型; 片方だけまばたきする耳; signature prop 泡の触角; face きりっと眉とぽかん口; main color #93C5E1; material 澄んだガラスゼリー
6. K284 (トプルチ): ふっくらキノコ型の体、まるいぷくぷく耳、魚型の風鈴、片側の口元にほくろ; body shape ふっくらキノコ型; まるいぷくぷく耳; signature prop 魚型の風鈴; face きょとんとした丸目; main color #AEC0CE; material しっとりした水飴
7. K285 (クラゲンル): 底が平らなプリン型の体、ヘアピン状の突起、頭にのった一滴、頭に乗った小さな石; body shape 底が平らなプリン型; ヘアピン状の突起; signature prop 頭にのった一滴; face 下を向きながら上目づかい; main color #C8A384; material 偏光するバブル
8. K286 (ウルモル): かぼちゃ型の体、うず巻く左右の突起、雫のマフラー、左右違う色の靴; body shape かぼちゃ型; うず巻く左右の突起; signature prop 雫のマフラー; face 眠そうなのに口だけ元気; main color #A996D7; material 澄んだガラスゼリー
9. K287 (ミナラル): つぶれおもち型の体、右だけ折れた耳、水面の鏡、ゆるく結んだネクタイ; body shape つぶれおもち型; 右だけ折れた耳; signature prop 水面の鏡; face 笑うと片目だけ閉じる; main color #90D6DE; material しっとりした水飴
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K279 K280 K281 K282 K283 K284 K285 K286 K287`

### バッチ 32（K288〜K296）
```
1. K288 (シオポル): まるい鈴型の体、左右に離れた耳、逆さの金魚鉢、背中のちいさな羽; body shape まるい鈴型; 左右に離れた耳; signature prop 逆さの金魚鉢; face 眉が左右で違う; main color #9BD6C5; material 偏光するバブル
2. K289 (サンゴルチ): 逆さハート型の体、透明なちいさな触角、ひとつだけ大きな泡、ふちどりだけきらめく模様; body shape 逆さハート型; 透明なちいさな触角; signature prop ひとつだけ大きな泡; face 困り眉とひとすじ汗; main color #F6A68D; material 澄んだガラスゼリー
3. K290 (アメポル): ひらたいしずく型の体、左右の尖った耳、貝殻のヘアピン、端がほつれたケープ; body shape ひらたいしずく型; 左右の尖った耳; signature prop 貝殻のヘアピン; face うっすらしかめ面; main color #F4ADBF; material しっとりした水飴
4. K291 (アワピポ): いびつな星形の体、頭の真ん中の短い触角、泡の触角、胸の一点刺繍; body shape いびつな星形; 頭の真ん中の短い触角; signature prop 泡の触角; face いつもニヤッとする; main color #C6A5F1; material 偏光するバブル
5. K292 (ミズモピ): たて長まゆ型の体、左だけ長い耳、魚型の風鈴、背中のミニポーチ; body shape たて長まゆ型; 左だけ長い耳; signature prop 魚型の風鈴; face 小さな八重歯が見える; main color #C9D878; material 澄んだガラスゼリー
6. K293 (シズラピ): ころがる小石型の体、左の耳だけ下向き、頭にのった一滴、左だけのほっぺそばかす; body shape ころがる小石型; 左の耳だけ下向き; signature prop 頭にのった一滴; face 左右で大きさの違う目; main color #E0A7C2; material しっとりした水飴
7. K294 (ウミルピ): 三角おにぎり型の体、豆粒みたいな二本角、雫のマフラー、片頬の小さなばんそうこう; body shape 三角おにぎり型; 豆粒みたいな二本角; signature prop 雫のマフラー; face 目を閉じて微笑む; main color #F7D16A; material 偏光するバブル
8. K295 (ナミネピ): ねじれた雲型の体、片側だけのまる耳、水面の鏡、頬のまるいペイント; body shape ねじれた雲型; 片側だけのまる耳; signature prop 水面の鏡; face いつも口が左にずれる; main color #D9CCA7; material 澄んだガラスゼリー
9. K296 (プクナピ): ぽってり壺型の体、左右高さの違う角、逆さの金魚鉢、ぺたんこの足跡模様; body shape ぽってり壺型; 左右高さの違う角; signature prop 逆さの金魚鉢; face 半目でとぼける; main color #E7B5A9; material しっとりした水飴
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K288 K289 K290 K291 K292 K293 K294 K295 K296`

### バッチ 33（K297〜K305）
```
1. K297 (バブリピ): 水たまり型の体、片方だけまばたきする耳、ひとつだけ大きな泡、鼻先の小さな光; body shape 水たまり型; 片方だけまばたきする耳; signature prop ひとつだけ大きな泡; face びっくり目で無表情; main color #F6C37A; material 偏光するバブル
2. K298 (ポチャピ): ぷっくり四角型の体、まるいぷくぷく耳、貝殻のヘアピン、巻きすぎた細いマフラー; body shape ぷっくり四角型; まるいぷくぷく耳; signature prop 貝殻のヘアピン; face すこし泣きそうな目; main color #C2C3D3; material 澄んだガラスゼリー
3. K299 (トプルピ): 二段重ね型の体、ヘアピン状の突起、泡の触角、おへその星形ボタン; body shape 二段重ね型; ヘアピン状の突起; signature prop 泡の触角; face 片目だけ星型ハイライト; main color #7EA8F4; material しっとりした水飴
4. K300 (クラゲンピ): 帽子状の円盤型の体、うず巻く左右の突起、魚型の風鈴、一本だけの短いしっぽ; body shape 帽子状の円盤型; うず巻く左右の突起; signature prop 魚型の風鈴; face 口がほぼ点; main color #B5E0A1; material 偏光するバブル
5. K301 (ウルモピ): 丸い洋梨型の体、右だけ折れた耳、頭にのった一滴、前髪のような模様; body shape 丸い洋梨型; 右だけ折れた耳; signature prop 頭にのった一滴; face ジト目と小さな口; main color #DCCDEB; material 澄んだガラスゼリー
6. K302 (ミナラピ): 小さな山型の体、左右に離れた耳、雫のマフラー、片側の口元にほくろ; body shape 小さな山型; 左右に離れた耳; signature prop 雫のマフラー; face 赤面して真顔; main color #FFE3A1; material しっとりした水飴
7. K303 (シオポピ): しわしわ風船型の体、透明なちいさな触角、水面の鏡、頭に乗った小さな石; body shape しわしわ風船型; 透明なちいさな触角; signature prop 水面の鏡; face きりっと眉とぽかん口; main color #93C5E1; material 偏光するバブル
8. K304 (サンゴルピ): しずく型の体、左右の尖った耳、逆さの金魚鉢、左右違う色の靴; body shape しずく型; 左右の尖った耳; signature prop 逆さの金魚鉢; face きょとんとした丸目; main color #AEC0CE; material 澄んだガラスゼリー
9. K305 (アメポピ): 横長あんぱん型の体、頭の真ん中の短い触角、ひとつだけ大きな泡、ゆるく結んだネクタイ; body shape 横長あんぱん型; 頭の真ん中の短い触角; signature prop ひとつだけ大きな泡; face 下を向きながら上目づかい; main color #C8A384; material しっとりした水飴
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K297 K298 K299 K300 K301 K302 K303 K304 K305`

### バッチ 34（K306〜K314）
```
1. K306 (アワピナ): 片側だけふくらむ豆型の体、左だけ長い耳、貝殻のヘアピン、背中のちいさな羽; body shape 片側だけふくらむ豆型; 左だけ長い耳; signature prop 貝殻のヘアピン; face 眠そうなのに口だけ元気; main color #A996D7; material 偏光するバブル
2. K307 (ミズモナ): 小さな鐘型の体、左の耳だけ下向き、泡の触角、ふちどりだけきらめく模様; body shape 小さな鐘型; 左の耳だけ下向き; signature prop 泡の触角; face 笑うと片目だけ閉じる; main color #90D6DE; material 澄んだガラスゼリー
3. K308 (シズラナ): ふっくらキノコ型の体、豆粒みたいな二本角、魚型の風鈴、端がほつれたケープ; body shape ふっくらキノコ型; 豆粒みたいな二本角; signature prop 魚型の風鈴; face 眉が左右で違う; main color #9BD6C5; material しっとりした水飴
4. K309 (ウミルナ): 底が平らなプリン型の体、片側だけのまる耳、頭にのった一滴、胸の一点刺繍; body shape 底が平らなプリン型; 片側だけのまる耳; signature prop 頭にのった一滴; face 困り眉とひとすじ汗; main color #F6A68D; material 偏光するバブル
5. K310 (ナミネナ): かぼちゃ型の体、左右高さの違う角、雫のマフラー、背中のミニポーチ; body shape かぼちゃ型; 左右高さの違う角; signature prop 雫のマフラー; face うっすらしかめ面; main color #F4ADBF; material 澄んだガラスゼリー
6. K311 (プクナポ): つぶれおもち型の体、片方だけまばたきする耳、水面の鏡、左だけのほっぺそばかす; body shape つぶれおもち型; 片方だけまばたきする耳; signature prop 水面の鏡; face いつもニヤッとする; main color #C6A5F1; material しっとりした水飴
7. K312 (バブリナ): まるい鈴型の体、まるいぷくぷく耳、逆さの金魚鉢、片頬の小さなばんそうこう; body shape まるい鈴型; まるいぷくぷく耳; signature prop 逆さの金魚鉢; face 小さな八重歯が見える; main color #C9D878; material 偏光するバブル
8. K313 (ポチャナ): 逆さハート型の体、ヘアピン状の突起、ひとつだけ大きな泡、頬のまるいペイント; body shape 逆さハート型; ヘアピン状の突起; signature prop ひとつだけ大きな泡; face 左右で大きさの違う目; main color #E0A7C2; material 澄んだガラスゼリー
9. K314 (トプルナ): ひらたいしずく型の体、うず巻く左右の突起、貝殻のヘアピン、ぺたんこの足跡模様; body shape ひらたいしずく型; うず巻く左右の突起; signature prop 貝殻のヘアピン; face 目を閉じて微笑む; main color #F7D16A; material しっとりした水飴
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K306 K307 K308 K309 K310 K311 K312 K313 K314`

### バッチ 35（K315〜K323）
```
1. K315 (クラゲンナ): いびつな星形の体、右だけ折れた耳、泡の触角、鼻先の小さな光; body shape いびつな星形; 右だけ折れた耳; signature prop 泡の触角; face いつも口が左にずれる; main color #D9CCA7; material 偏光するバブル
2. K316 (ウルモナ): たて長まゆ型の体、左右に離れた耳、魚型の風鈴、巻きすぎた細いマフラー; body shape たて長まゆ型; 左右に離れた耳; signature prop 魚型の風鈴; face 半目でとぼける; main color #E7B5A9; material 澄んだガラスゼリー
3. K317 (ミナラナ): ころがる小石型の体、透明なちいさな触角、頭にのった一滴、おへその星形ボタン; body shape ころがる小石型; 透明なちいさな触角; signature prop 頭にのった一滴; face びっくり目で無表情; main color #F6C37A; material しっとりした水飴
4. K318 (シオポナ): 三角おにぎり型の体、左右の尖った耳、雫のマフラー、一本だけの短いしっぽ; body shape 三角おにぎり型; 左右の尖った耳; signature prop 雫のマフラー; face すこし泣きそうな目; main color #C2C3D3; material 偏光するバブル
5. K319 (サンゴルナ): ねじれた雲型の体、頭の真ん中の短い触角、水面の鏡、前髪のような模様; body shape ねじれた雲型; 頭の真ん中の短い触角; signature prop 水面の鏡; face 片目だけ星型ハイライト; main color #7EA8F4; material 澄んだガラスゼリー
6. K320 (アメポナ): ぽってり壺型の体、左だけ長い耳、逆さの金魚鉢、片側の口元にほくろ; body shape ぽってり壺型; 左だけ長い耳; signature prop 逆さの金魚鉢; face 口がほぼ点; main color #B5E0A1; material しっとりした水飴
7. K321 (ホシモム): 三角おにぎり型の体、左右に離れた耳、星座を描くペン、片側の口元にほくろ; body shape 三角おにぎり型; 左右に離れた耳; signature prop 星座を描くペン; face すこし泣きそうな目; main color #C9D878; material 銀河ラメ入りグミ
8. K322 (ツキラム): ねじれた雲型の体、透明なちいさな触角、片側だけ月形の耳、頭に乗った小さな石; body shape ねじれた雲型; 透明なちいさな触角; signature prop 片側だけ月形の耳; face 片目だけ星型ハイライト; main color #E0A7C2; material 星屑のベルベット
9. K323 (ソラピム): ぽってり壺型の体、左右の尖った耳、流星のマント、左右違う色の靴; body shape ぽってり壺型; 左右の尖った耳; signature prop 流星のマント; face 口がほぼ点; main color #F7D16A; material 偏光パール
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K315 K316 K317 K318 K319 K320 K321 K322 K323`

### バッチ 36（K324〜K332）
```
1. K324 (ギンガルム): 水たまり型の体、頭の真ん中の短い触角、光る夜空のポケット、ゆるく結んだネクタイ; body shape 水たまり型; 頭の真ん中の短い触角; signature prop 光る夜空のポケット; face ジト目と小さな口; main color #D9CCA7; material 銀河ラメ入りグミ
2. K325 (ヨゾラム): ぷっくり四角型の体、左だけ長い耳、金平糖の衛星、背中のちいさな羽; body shape ぷっくり四角型; 左だけ長い耳; signature prop 金平糖の衛星; face 赤面して真顔; main color #E7B5A9; material 星屑のベルベット
3. K326 (ネビュロム): 二段重ね型の体、左の耳だけ下向き、ゆらぐ天体リング、ふちどりだけきらめく模様; body shape 二段重ね型; 左の耳だけ下向き; signature prop ゆらぐ天体リング; face きりっと眉とぽかん口; main color #F6C37A; material 偏光パール
4. K327 (キセラム): 帽子状の円盤型の体、豆粒みたいな二本角、ずれた星のかんむり、端がほつれたケープ; body shape 帽子状の円盤型; 豆粒みたいな二本角; signature prop ずれた星のかんむり; face きょとんとした丸目; main color #C2C3D3; material 銀河ラメ入りグミ
5. K328 (テンポルム): 丸い洋梨型の体、片側だけのまる耳、小型のプラネタリウム、胸の一点刺繍; body shape 丸い洋梨型; 片側だけのまる耳; signature prop 小型のプラネタリウム; face 下を向きながら上目づかい; main color #7EA8F4; material 星屑のベルベット
6. K329 (スピカモム): 小さな山型の体、左右高さの違う角、星座を描くペン、背中のミニポーチ; body shape 小さな山型; 左右高さの違う角; signature prop 星座を描くペン; face 眠そうなのに口だけ元気; main color #B5E0A1; material 偏光パール
7. K330 (リュウセム): しわしわ風船型の体、片方だけまばたきする耳、片側だけ月形の耳、左だけのほっぺそばかす; body shape しわしわ風船型; 片方だけまばたきする耳; signature prop 片側だけ月形の耳; face 笑うと片目だけ閉じる; main color #DCCDEB; material 銀河ラメ入りグミ
8. K331 (スタラム): しずく型の体、まるいぷくぷく耳、流星のマント、片頬の小さなばんそうこう; body shape しずく型; まるいぷくぷく耳; signature prop 流星のマント; face 眉が左右で違う; main color #FFE3A1; material 星屑のベルベット
9. K332 (コメトルム): 横長あんぱん型の体、ヘアピン状の突起、光る夜空のポケット、頬のまるいペイント; body shape 横長あんぱん型; ヘアピン状の突起; signature prop 光る夜空のポケット; face 困り眉とひとすじ汗; main color #93C5E1; material 偏光パール
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K324 K325 K326 K327 K328 K329 K330 K331 K332`

### バッチ 37（K333〜K341）
```
1. K333 (ヒカボム): 片側だけふくらむ豆型の体、うず巻く左右の突起、金平糖の衛星、ぺたんこの足跡模様; body shape 片側だけふくらむ豆型; うず巻く左右の突起; signature prop 金平糖の衛星; face うっすらしかめ面; main color #AEC0CE; material 銀河ラメ入りグミ
2. K334 (アストロルム): 小さな鐘型の体、右だけ折れた耳、ゆらぐ天体リング、鼻先の小さな光; body shape 小さな鐘型; 右だけ折れた耳; signature prop ゆらぐ天体リング; face いつもニヤッとする; main color #C8A384; material 星屑のベルベット
3. K335 (クモホム): ふっくらキノコ型の体、左右に離れた耳、ずれた星のかんむり、巻きすぎた細いマフラー; body shape ふっくらキノコ型; 左右に離れた耳; signature prop ずれた星のかんむり; face 小さな八重歯が見える; main color #A996D7; material 偏光パール
4. K336 (ホシモン): 底が平らなプリン型の体、透明なちいさな触角、小型のプラネタリウム、おへその星形ボタン; body shape 底が平らなプリン型; 透明なちいさな触角; signature prop 小型のプラネタリウム; face 左右で大きさの違う目; main color #90D6DE; material 銀河ラメ入りグミ
5. K337 (ツキラン): かぼちゃ型の体、左右の尖った耳、星座を描くペン、一本だけの短いしっぽ; body shape かぼちゃ型; 左右の尖った耳; signature prop 星座を描くペン; face 目を閉じて微笑む; main color #9BD6C5; material 星屑のベルベット
6. K338 (ソラピン): つぶれおもち型の体、頭の真ん中の短い触角、片側だけ月形の耳、前髪のような模様; body shape つぶれおもち型; 頭の真ん中の短い触角; signature prop 片側だけ月形の耳; face いつも口が左にずれる; main color #F6A68D; material 偏光パール
7. K339 (ギンガルン): まるい鈴型の体、左だけ長い耳、流星のマント、片側の口元にほくろ; body shape まるい鈴型; 左だけ長い耳; signature prop 流星のマント; face 半目でとぼける; main color #F4ADBF; material 銀河ラメ入りグミ
8. K340 (ヨゾラン): 逆さハート型の体、左の耳だけ下向き、光る夜空のポケット、頭に乗った小さな石; body shape 逆さハート型; 左の耳だけ下向き; signature prop 光る夜空のポケット; face びっくり目で無表情; main color #C6A5F1; material 星屑のベルベット
9. K341 (ネビュロン): ひらたいしずく型の体、豆粒みたいな二本角、金平糖の衛星、左右違う色の靴; body shape ひらたいしずく型; 豆粒みたいな二本角; signature prop 金平糖の衛星; face すこし泣きそうな目; main color #C9D878; material 偏光パール
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K333 K334 K335 K336 K337 K338 K339 K340 K341`

### バッチ 38（K342〜K350）
```
1. K342 (キセラン): いびつな星形の体、片側だけのまる耳、ゆらぐ天体リング、ゆるく結んだネクタイ; body shape いびつな星形; 片側だけのまる耳; signature prop ゆらぐ天体リング; face 片目だけ星型ハイライト; main color #E0A7C2; material 銀河ラメ入りグミ
2. K343 (テンポルン): たて長まゆ型の体、左右高さの違う角、ずれた星のかんむり、背中のちいさな羽; body shape たて長まゆ型; 左右高さの違う角; signature prop ずれた星のかんむり; face 口がほぼ点; main color #F7D16A; material 星屑のベルベット
3. K344 (スピカモン): ころがる小石型の体、片方だけまばたきする耳、小型のプラネタリウム、ふちどりだけきらめく模様; body shape ころがる小石型; 片方だけまばたきする耳; signature prop 小型のプラネタリウム; face ジト目と小さな口; main color #D9CCA7; material 偏光パール
4. K345 (リュウセン): 三角おにぎり型の体、まるいぷくぷく耳、星座を描くペン、端がほつれたケープ; body shape 三角おにぎり型; まるいぷくぷく耳; signature prop 星座を描くペン; face 赤面して真顔; main color #E7B5A9; material 銀河ラメ入りグミ
5. K346 (スタラン): ねじれた雲型の体、ヘアピン状の突起、片側だけ月形の耳、胸の一点刺繍; body shape ねじれた雲型; ヘアピン状の突起; signature prop 片側だけ月形の耳; face きりっと眉とぽかん口; main color #F6C37A; material 星屑のベルベット
6. K347 (コメトルン): ぽってり壺型の体、うず巻く左右の突起、流星のマント、背中のミニポーチ; body shape ぽってり壺型; うず巻く左右の突起; signature prop 流星のマント; face きょとんとした丸目; main color #C2C3D3; material 偏光パール
7. K348 (ヒカボン): 水たまり型の体、右だけ折れた耳、光る夜空のポケット、左だけのほっぺそばかす; body shape 水たまり型; 右だけ折れた耳; signature prop 光る夜空のポケット; face 下を向きながら上目づかい; main color #7EA8F4; material 銀河ラメ入りグミ
8. K349 (アストロルン): ぷっくり四角型の体、左右に離れた耳、金平糖の衛星、片頬の小さなばんそうこう; body shape ぷっくり四角型; 左右に離れた耳; signature prop 金平糖の衛星; face 眠そうなのに口だけ元気; main color #B5E0A1; material 星屑のベルベット
9. K350 (クモホン): 二段重ね型の体、透明なちいさな触角、ゆらぐ天体リング、頬のまるいペイント; body shape 二段重ね型; 透明なちいさな触角; signature prop ゆらぐ天体リング; face 笑うと片目だけ閉じる; main color #DCCDEB; material 偏光パール
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K342 K343 K344 K345 K346 K347 K348 K349 K350`

### バッチ 39（K351〜K359）
```
1. K351 (ホシモチ): 帽子状の円盤型の体、左右の尖った耳、ずれた星のかんむり、ぺたんこの足跡模様; body shape 帽子状の円盤型; 左右の尖った耳; signature prop ずれた星のかんむり; face 眉が左右で違う; main color #FFE3A1; material 銀河ラメ入りグミ
2. K352 (ツキラチ): 丸い洋梨型の体、頭の真ん中の短い触角、小型のプラネタリウム、鼻先の小さな光; body shape 丸い洋梨型; 頭の真ん中の短い触角; signature prop 小型のプラネタリウム; face 困り眉とひとすじ汗; main color #93C5E1; material 星屑のベルベット
3. K353 (ソラピチ): 小さな山型の体、左だけ長い耳、星座を描くペン、巻きすぎた細いマフラー; body shape 小さな山型; 左だけ長い耳; signature prop 星座を描くペン; face うっすらしかめ面; main color #AEC0CE; material 偏光パール
4. K354 (ギンガルチ): しわしわ風船型の体、左の耳だけ下向き、片側だけ月形の耳、おへその星形ボタン; body shape しわしわ風船型; 左の耳だけ下向き; signature prop 片側だけ月形の耳; face いつもニヤッとする; main color #C8A384; material 銀河ラメ入りグミ
5. K355 (ヨゾラチ): しずく型の体、豆粒みたいな二本角、流星のマント、一本だけの短いしっぽ; body shape しずく型; 豆粒みたいな二本角; signature prop 流星のマント; face 小さな八重歯が見える; main color #A996D7; material 星屑のベルベット
6. K356 (ネビュロチ): 横長あんぱん型の体、片側だけのまる耳、光る夜空のポケット、前髪のような模様; body shape 横長あんぱん型; 片側だけのまる耳; signature prop 光る夜空のポケット; face 左右で大きさの違う目; main color #90D6DE; material 偏光パール
7. K357 (キセラチ): 片側だけふくらむ豆型の体、左右高さの違う角、金平糖の衛星、片側の口元にほくろ; body shape 片側だけふくらむ豆型; 左右高さの違う角; signature prop 金平糖の衛星; face 目を閉じて微笑む; main color #9BD6C5; material 銀河ラメ入りグミ
8. K358 (テンポルチ): 小さな鐘型の体、片方だけまばたきする耳、ゆらぐ天体リング、頭に乗った小さな石; body shape 小さな鐘型; 片方だけまばたきする耳; signature prop ゆらぐ天体リング; face いつも口が左にずれる; main color #F6A68D; material 星屑のベルベット
9. K359 (スピカモチ): ふっくらキノコ型の体、まるいぷくぷく耳、ずれた星のかんむり、左右違う色の靴; body shape ふっくらキノコ型; まるいぷくぷく耳; signature prop ずれた星のかんむり; face 半目でとぼける; main color #F4ADBF; material 偏光パール
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K351 K352 K353 K354 K355 K356 K357 K358 K359`

### バッチ 40（K360〜K368）
```
1. K360 (リュウセチ): 底が平らなプリン型の体、ヘアピン状の突起、小型のプラネタリウム、ゆるく結んだネクタイ; body shape 底が平らなプリン型; ヘアピン状の突起; signature prop 小型のプラネタリウム; face びっくり目で無表情; main color #C6A5F1; material 銀河ラメ入りグミ
2. K361 (スタラチ): かぼちゃ型の体、うず巻く左右の突起、星座を描くペン、背中のちいさな羽; body shape かぼちゃ型; うず巻く左右の突起; signature prop 星座を描くペン; face すこし泣きそうな目; main color #C9D878; material 星屑のベルベット
3. K362 (コメトルチ): つぶれおもち型の体、右だけ折れた耳、片側だけ月形の耳、ふちどりだけきらめく模様; body shape つぶれおもち型; 右だけ折れた耳; signature prop 片側だけ月形の耳; face 片目だけ星型ハイライト; main color #E0A7C2; material 偏光パール
4. K363 (ヒカボチ): まるい鈴型の体、左右に離れた耳、流星のマント、端がほつれたケープ; body shape まるい鈴型; 左右に離れた耳; signature prop 流星のマント; face 口がほぼ点; main color #F7D16A; material 銀河ラメ入りグミ
5. K364 (アストロルチ): 逆さハート型の体、透明なちいさな触角、光る夜空のポケット、胸の一点刺繍; body shape 逆さハート型; 透明なちいさな触角; signature prop 光る夜空のポケット; face ジト目と小さな口; main color #D9CCA7; material 星屑のベルベット
6. K365 (クモホチ): ひらたいしずく型の体、左右の尖った耳、金平糖の衛星、背中のミニポーチ; body shape ひらたいしずく型; 左右の尖った耳; signature prop 金平糖の衛星; face 赤面して真顔; main color #E7B5A9; material 偏光パール
7. K366 (リズモン): まるい鈴型の体、うず巻く左右の突起、リズムを刻む靴、背中のミニポーチ; body shape まるい鈴型; うず巻く左右の突起; signature prop リズムを刻む靴; face 口がほぼ点; main color #9BD6C5; material 光沢サテン
8. K367 (トンピン): 逆さハート型の体、右だけ折れた耳、小さなカスタネット、左だけのほっぺそばかす; body shape 逆さハート型; 右だけ折れた耳; signature prop 小さなカスタネット; face ジト目と小さな口; main color #F6A68D; material スピーカーの織り布
9. K368 (ポンラン): ひらたいしずく型の体、左右に離れた耳、音色の鈴、片頬の小さなばんそうこう; body shape ひらたいしずく型; 左右に離れた耳; signature prop 音色の鈴; face 赤面して真顔; main color #F4ADBF; material ソフトシリコン
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K360 K361 K362 K363 K364 K365 K366 K367 K368`

### バッチ 41（K369〜K377）
```
1. K369 (チャイムルン): いびつな星形の体、透明なちいさな触角、反対向きのヘッドホン、頬のまるいペイント; body shape いびつな星形; 透明なちいさな触角; signature prop 反対向きのヘッドホン; face きりっと眉とぽかん口; main color #C6A5F1; material 光沢サテン
2. K370 (オトネン): たて長まゆ型の体、左右の尖った耳、転がるドラム、ぺたんこの足跡模様; body shape たて長まゆ型; 左右の尖った耳; signature prop 転がるドラム; face きょとんとした丸目; main color #C9D878; material スピーカーの織り布
3. K371 (ビートラン): ころがる小石型の体、頭の真ん中の短い触角、ピアノの鍵盤柄、鼻先の小さな光; body shape ころがる小石型; 頭の真ん中の短い触角; signature prop ピアノの鍵盤柄; face 下を向きながら上目づかい; main color #E0A7C2; material ソフトシリコン
4. K372 (ネイロン): 三角おにぎり型の体、左だけ長い耳、片耳だけの音符、巻きすぎた細いマフラー; body shape 三角おにぎり型; 左だけ長い耳; signature prop 片耳だけの音符; face 眠そうなのに口だけ元気; main color #F7D16A; material 光沢サテン
5. K373 (フエルン): ねじれた雲型の体、左の耳だけ下向き、波形のしっぽ、おへその星形ボタン; body shape ねじれた雲型; 左の耳だけ下向き; signature prop 波形のしっぽ; face 笑うと片目だけ閉じる; main color #D9CCA7; material スピーカーの織り布
6. K374 (タンバン): ぽってり壺型の体、豆粒みたいな二本角、リズムを刻む靴、一本だけの短いしっぽ; body shape ぽってり壺型; 豆粒みたいな二本角; signature prop リズムを刻む靴; face 眉が左右で違う; main color #E7B5A9; material ソフトシリコン
7. K375 (モッカン): 水たまり型の体、片側だけのまる耳、小さなカスタネット、前髪のような模様; body shape 水たまり型; 片側だけのまる耳; signature prop 小さなカスタネット; face 困り眉とひとすじ汗; main color #F6C37A; material 光沢サテン
8. K376 (ピアノルン): ぷっくり四角型の体、左右高さの違う角、音色の鈴、片側の口元にほくろ; body shape ぷっくり四角型; 左右高さの違う角; signature prop 音色の鈴; face うっすらしかめ面; main color #C2C3D3; material スピーカーの織り布
9. K377 (コロネラン): 二段重ね型の体、片方だけまばたきする耳、反対向きのヘッドホン、頭に乗った小さな石; body shape 二段重ね型; 片方だけまばたきする耳; signature prop 反対向きのヘッドホン; face いつもニヤッとする; main color #7EA8F4; material ソフトシリコン
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K369 K370 K371 K372 K373 K374 K375 K376 K377`

### バッチ 42（K378〜K386）
```
1. K378 (ララミン): 帽子状の円盤型の体、まるいぷくぷく耳、転がるドラム、左右違う色の靴; body shape 帽子状の円盤型; まるいぷくぷく耳; signature prop 転がるドラム; face 小さな八重歯が見える; main color #B5E0A1; material 光沢サテン
2. K379 (ラッパモン): 丸い洋梨型の体、ヘアピン状の突起、ピアノの鍵盤柄、ゆるく結んだネクタイ; body shape 丸い洋梨型; ヘアピン状の突起; signature prop ピアノの鍵盤柄; face 左右で大きさの違う目; main color #DCCDEB; material スピーカーの織り布
3. K380 (タクトルン): 小さな山型の体、うず巻く左右の突起、片耳だけの音符、背中のちいさな羽; body shape 小さな山型; うず巻く左右の突起; signature prop 片耳だけの音符; face 目を閉じて微笑む; main color #FFE3A1; material ソフトシリコン
4. K381 (リズモピ): しわしわ風船型の体、右だけ折れた耳、波形のしっぽ、ふちどりだけきらめく模様; body shape しわしわ風船型; 右だけ折れた耳; signature prop 波形のしっぽ; face いつも口が左にずれる; main color #93C5E1; material 光沢サテン
5. K382 (トンピポ): しずく型の体、左右に離れた耳、リズムを刻む靴、端がほつれたケープ; body shape しずく型; 左右に離れた耳; signature prop リズムを刻む靴; face 半目でとぼける; main color #AEC0CE; material スピーカーの織り布
6. K383 (ポンラピ): 横長あんぱん型の体、透明なちいさな触角、小さなカスタネット、胸の一点刺繍; body shape 横長あんぱん型; 透明なちいさな触角; signature prop 小さなカスタネット; face びっくり目で無表情; main color #C8A384; material ソフトシリコン
7. K384 (チャイムルピ): 片側だけふくらむ豆型の体、左右の尖った耳、音色の鈴、背中のミニポーチ; body shape 片側だけふくらむ豆型; 左右の尖った耳; signature prop 音色の鈴; face すこし泣きそうな目; main color #A996D7; material 光沢サテン
8. K385 (オトネピ): 小さな鐘型の体、頭の真ん中の短い触角、反対向きのヘッドホン、左だけのほっぺそばかす; body shape 小さな鐘型; 頭の真ん中の短い触角; signature prop 反対向きのヘッドホン; face 片目だけ星型ハイライト; main color #90D6DE; material スピーカーの織り布
9. K386 (ビートラピ): ふっくらキノコ型の体、左だけ長い耳、転がるドラム、片頬の小さなばんそうこう; body shape ふっくらキノコ型; 左だけ長い耳; signature prop 転がるドラム; face 口がほぼ点; main color #9BD6C5; material ソフトシリコン
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K378 K379 K380 K381 K382 K383 K384 K385 K386`

### バッチ 43（K387〜K395）
```
1. K387 (ネイロピ): 底が平らなプリン型の体、左の耳だけ下向き、ピアノの鍵盤柄、頬のまるいペイント; body shape 底が平らなプリン型; 左の耳だけ下向き; signature prop ピアノの鍵盤柄; face ジト目と小さな口; main color #F6A68D; material 光沢サテン
2. K388 (フエルピ): かぼちゃ型の体、豆粒みたいな二本角、片耳だけの音符、ぺたんこの足跡模様; body shape かぼちゃ型; 豆粒みたいな二本角; signature prop 片耳だけの音符; face 赤面して真顔; main color #F4ADBF; material スピーカーの織り布
3. K389 (タンバピ): つぶれおもち型の体、片側だけのまる耳、波形のしっぽ、鼻先の小さな光; body shape つぶれおもち型; 片側だけのまる耳; signature prop 波形のしっぽ; face きりっと眉とぽかん口; main color #C6A5F1; material ソフトシリコン
4. K390 (モッカピ): まるい鈴型の体、左右高さの違う角、リズムを刻む靴、巻きすぎた細いマフラー; body shape まるい鈴型; 左右高さの違う角; signature prop リズムを刻む靴; face きょとんとした丸目; main color #C9D878; material 光沢サテン
5. K391 (ピアノルピ): 逆さハート型の体、片方だけまばたきする耳、小さなカスタネット、おへその星形ボタン; body shape 逆さハート型; 片方だけまばたきする耳; signature prop 小さなカスタネット; face 下を向きながら上目づかい; main color #E0A7C2; material スピーカーの織り布
6. K392 (コロネラピ): ひらたいしずく型の体、まるいぷくぷく耳、音色の鈴、一本だけの短いしっぽ; body shape ひらたいしずく型; まるいぷくぷく耳; signature prop 音色の鈴; face 眠そうなのに口だけ元気; main color #F7D16A; material ソフトシリコン
7. K393 (ララミピ): いびつな星形の体、ヘアピン状の突起、反対向きのヘッドホン、前髪のような模様; body shape いびつな星形; ヘアピン状の突起; signature prop 反対向きのヘッドホン; face 笑うと片目だけ閉じる; main color #D9CCA7; material 光沢サテン
8. K394 (ラッパモピ): たて長まゆ型の体、うず巻く左右の突起、転がるドラム、片側の口元にほくろ; body shape たて長まゆ型; うず巻く左右の突起; signature prop 転がるドラム; face 眉が左右で違う; main color #E7B5A9; material スピーカーの織り布
9. K395 (タクトルピ): ころがる小石型の体、右だけ折れた耳、ピアノの鍵盤柄、頭に乗った小さな石; body shape ころがる小石型; 右だけ折れた耳; signature prop ピアノの鍵盤柄; face 困り眉とひとすじ汗; main color #F6C37A; material ソフトシリコン
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K387 K388 K389 K390 K391 K392 K393 K394 K395`

### バッチ 44（K396〜K404）
```
1. K396 (リズモル): 三角おにぎり型の体、左右に離れた耳、片耳だけの音符、左右違う色の靴; body shape 三角おにぎり型; 左右に離れた耳; signature prop 片耳だけの音符; face うっすらしかめ面; main color #C2C3D3; material 光沢サテン
2. K397 (トンピル): ねじれた雲型の体、透明なちいさな触角、波形のしっぽ、ゆるく結んだネクタイ; body shape ねじれた雲型; 透明なちいさな触角; signature prop 波形のしっぽ; face いつもニヤッとする; main color #7EA8F4; material スピーカーの織り布
3. K398 (ポンラル): ぽってり壺型の体、左右の尖った耳、リズムを刻む靴、背中のちいさな羽; body shape ぽってり壺型; 左右の尖った耳; signature prop リズムを刻む靴; face 小さな八重歯が見える; main color #B5E0A1; material ソフトシリコン
4. K399 (チャイムルチ): 水たまり型の体、頭の真ん中の短い触角、小さなカスタネット、ふちどりだけきらめく模様; body shape 水たまり型; 頭の真ん中の短い触角; signature prop 小さなカスタネット; face 左右で大きさの違う目; main color #DCCDEB; material 光沢サテン
5. K400 (オトネル): ぷっくり四角型の体、左だけ長い耳、音色の鈴、端がほつれたケープ; body shape ぷっくり四角型; 左だけ長い耳; signature prop 音色の鈴; face 目を閉じて微笑む; main color #FFE3A1; material スピーカーの織り布
6. K401 (ビートラル): 二段重ね型の体、左の耳だけ下向き、反対向きのヘッドホン、胸の一点刺繍; body shape 二段重ね型; 左の耳だけ下向き; signature prop 反対向きのヘッドホン; face いつも口が左にずれる; main color #93C5E1; material ソフトシリコン
7. K402 (ネイロル): 帽子状の円盤型の体、豆粒みたいな二本角、転がるドラム、背中のミニポーチ; body shape 帽子状の円盤型; 豆粒みたいな二本角; signature prop 転がるドラム; face 半目でとぼける; main color #AEC0CE; material 光沢サテン
8. K403 (フエルチ): 丸い洋梨型の体、片側だけのまる耳、ピアノの鍵盤柄、左だけのほっぺそばかす; body shape 丸い洋梨型; 片側だけのまる耳; signature prop ピアノの鍵盤柄; face びっくり目で無表情; main color #C8A384; material スピーカーの織り布
9. K404 (タンバル): 小さな山型の体、左右高さの違う角、片耳だけの音符、片頬の小さなばんそうこう; body shape 小さな山型; 左右高さの違う角; signature prop 片耳だけの音符; face すこし泣きそうな目; main color #A996D7; material ソフトシリコン
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K396 K397 K398 K399 K400 K401 K402 K403 K404`

### バッチ 45（K405〜K413）
```
1. K405 (モッカル): しわしわ風船型の体、片方だけまばたきする耳、波形のしっぽ、頬のまるいペイント; body shape しわしわ風船型; 片方だけまばたきする耳; signature prop 波形のしっぽ; face 片目だけ星型ハイライト; main color #90D6DE; material 光沢サテン
2. K406 (ピアノルチ): しずく型の体、まるいぷくぷく耳、リズムを刻む靴、ぺたんこの足跡模様; body shape しずく型; まるいぷくぷく耳; signature prop リズムを刻む靴; face 口がほぼ点; main color #9BD6C5; material スピーカーの織り布
3. K407 (コロネラル): 横長あんぱん型の体、ヘアピン状の突起、小さなカスタネット、鼻先の小さな光; body shape 横長あんぱん型; ヘアピン状の突起; signature prop 小さなカスタネット; face ジト目と小さな口; main color #F6A68D; material ソフトシリコン
4. K408 (ララミル): 片側だけふくらむ豆型の体、うず巻く左右の突起、音色の鈴、巻きすぎた細いマフラー; body shape 片側だけふくらむ豆型; うず巻く左右の突起; signature prop 音色の鈴; face 赤面して真顔; main color #F4ADBF; material 光沢サテン
5. K409 (ラッパモル): 小さな鐘型の体、右だけ折れた耳、反対向きのヘッドホン、おへその星形ボタン; body shape 小さな鐘型; 右だけ折れた耳; signature prop 反対向きのヘッドホン; face きりっと眉とぽかん口; main color #C6A5F1; material スピーカーの織り布
6. K410 (タクトルチ): ふっくらキノコ型の体、左右に離れた耳、転がるドラム、一本だけの短いしっぽ; body shape ふっくらキノコ型; 左右に離れた耳; signature prop 転がるドラム; face きょとんとした丸目; main color #C9D878; material ソフトシリコン
7. K411 (プリモン): 片側だけふくらむ豆型の体、まるいぷくぷく耳、ずり落ちたコック帽、一本だけの短いしっぽ; body shape 片側だけふくらむ豆型; まるいぷくぷく耳; signature prop ずり落ちたコック帽; face 赤面して真顔; main color #AEC0CE; material サクサククッキー
8. K412 (グミラン): 小さな鐘型の体、ヘアピン状の突起、キャンディ型の角、前髪のような模様; body shape 小さな鐘型; ヘアピン状の突起; signature prop キャンディ型の角; face きりっと眉とぽかん口; main color #C8A384; material とろけたクリーム
9. K413 (パンネン): ふっくらキノコ型の体、うず巻く左右の突起、ポケットのいちご、片側の口元にほくろ; body shape ふっくらキノコ型; うず巻く左右の突起; signature prop ポケットのいちご; face きょとんとした丸目; main color #A996D7; material 弾むグミ
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K405 K406 K407 K408 K409 K410 K411 K412 K413`

### バッチ 46（K414〜K422）
```
1. K414 (モチルン): 底が平らなプリン型の体、右だけ折れた耳、片側だけのホイップ、頭に乗った小さな石; body shape 底が平らなプリン型; 右だけ折れた耳; signature prop 片側だけのホイップ; face 下を向きながら上目づかい; main color #90D6DE; material サクサククッキー
2. K415 (アメピン): かぼちゃ型の体、左右に離れた耳、小さな焼き型、左右違う色の靴; body shape かぼちゃ型; 左右に離れた耳; signature prop 小さな焼き型; face 眠そうなのに口だけ元気; main color #9BD6C5; material とろけたクリーム
3. K416 (クッキルン): つぶれおもち型の体、透明なちいさな触角、星型のクッキー、ゆるく結んだネクタイ; body shape つぶれおもち型; 透明なちいさな触角; signature prop 星型のクッキー; face 笑うと片目だけ閉じる; main color #F6A68D; material 弾むグミ
4. K417 (チョコラン): まるい鈴型の体、左右の尖った耳、ふるえるスプーン、背中のちいさな羽; body shape まるい鈴型; 左右の尖った耳; signature prop ふるえるスプーン; face 眉が左右で違う; main color #F4ADBF; material サクサククッキー
5. K418 (ミルモン): 逆さハート型の体、頭の真ん中の短い触角、クリームの前髪、ふちどりだけきらめく模様; body shape 逆さハート型; 頭の真ん中の短い触角; signature prop クリームの前髪; face 困り眉とひとすじ汗; main color #C6A5F1; material とろけたクリーム
6. K419 (タルトルン): ひらたいしずく型の体、左だけ長い耳、ずり落ちたコック帽、端がほつれたケープ; body shape ひらたいしずく型; 左だけ長い耳; signature prop ずり落ちたコック帽; face うっすらしかめ面; main color #C9D878; material 弾むグミ
7. K420 (カラメルン): いびつな星形の体、左の耳だけ下向き、キャンディ型の角、胸の一点刺繍; body shape いびつな星形; 左の耳だけ下向き; signature prop キャンディ型の角; face いつもニヤッとする; main color #E0A7C2; material サクサククッキー
8. K421 (ムースラン): たて長まゆ型の体、豆粒みたいな二本角、ポケットのいちご、背中のミニポーチ; body shape たて長まゆ型; 豆粒みたいな二本角; signature prop ポケットのいちご; face 小さな八重歯が見える; main color #F7D16A; material とろけたクリーム
9. K422 (ジャムネン): ころがる小石型の体、片側だけのまる耳、片側だけのホイップ、左だけのほっぺそばかす; body shape ころがる小石型; 片側だけのまる耳; signature prop 片側だけのホイップ; face 左右で大きさの違う目; main color #D9CCA7; material 弾むグミ
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K414 K415 K416 K417 K418 K419 K420 K421 K422`

### バッチ 47（K423〜K431）
```
1. K423 (ワッフロン): 三角おにぎり型の体、左右高さの違う角、小さな焼き型、片頬の小さなばんそうこう; body shape 三角おにぎり型; 左右高さの違う角; signature prop 小さな焼き型; face 目を閉じて微笑む; main color #E7B5A9; material サクサククッキー
2. K424 (ゼリピン): ねじれた雲型の体、片方だけまばたきする耳、星型のクッキー、頬のまるいペイント; body shape ねじれた雲型; 片方だけまばたきする耳; signature prop 星型のクッキー; face いつも口が左にずれる; main color #F6C37A; material とろけたクリーム
3. K425 (ケーコン): ぽってり壺型の体、まるいぷくぷく耳、ふるえるスプーン、ぺたんこの足跡模様; body shape ぽってり壺型; まるいぷくぷく耳; signature prop ふるえるスプーン; face 半目でとぼける; main color #C2C3D3; material 弾むグミ
4. K426 (プリモラ): 水たまり型の体、ヘアピン状の突起、クリームの前髪、鼻先の小さな光; body shape 水たまり型; ヘアピン状の突起; signature prop クリームの前髪; face びっくり目で無表情; main color #7EA8F4; material サクサククッキー
5. K427 (グミラポ): ぷっくり四角型の体、うず巻く左右の突起、ずり落ちたコック帽、巻きすぎた細いマフラー; body shape ぷっくり四角型; うず巻く左右の突起; signature prop ずり落ちたコック帽; face すこし泣きそうな目; main color #B5E0A1; material とろけたクリーム
6. K428 (パンネラ): 二段重ね型の体、右だけ折れた耳、キャンディ型の角、おへその星形ボタン; body shape 二段重ね型; 右だけ折れた耳; signature prop キャンディ型の角; face 片目だけ星型ハイライト; main color #DCCDEB; material 弾むグミ
7. K429 (モチルラ): 帽子状の円盤型の体、左右に離れた耳、ポケットのいちご、一本だけの短いしっぽ; body shape 帽子状の円盤型; 左右に離れた耳; signature prop ポケットのいちご; face 口がほぼ点; main color #FFE3A1; material サクサククッキー
8. K430 (アメピラ): 丸い洋梨型の体、透明なちいさな触角、片側だけのホイップ、前髪のような模様; body shape 丸い洋梨型; 透明なちいさな触角; signature prop 片側だけのホイップ; face ジト目と小さな口; main color #93C5E1; material とろけたクリーム
9. K431 (クッキルラ): 小さな山型の体、左右の尖った耳、小さな焼き型、片側の口元にほくろ; body shape 小さな山型; 左右の尖った耳; signature prop 小さな焼き型; face 赤面して真顔; main color #AEC0CE; material 弾むグミ
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K423 K424 K425 K426 K427 K428 K429 K430 K431`

### バッチ 48（K432〜K440）
```
1. K432 (チョコラポ): しわしわ風船型の体、頭の真ん中の短い触角、星型のクッキー、頭に乗った小さな石; body shape しわしわ風船型; 頭の真ん中の短い触角; signature prop 星型のクッキー; face きりっと眉とぽかん口; main color #C8A384; material サクサククッキー
2. K433 (ミルモラ): しずく型の体、左だけ長い耳、ふるえるスプーン、左右違う色の靴; body shape しずく型; 左だけ長い耳; signature prop ふるえるスプーン; face きょとんとした丸目; main color #A996D7; material とろけたクリーム
3. K434 (タルトルラ): 横長あんぱん型の体、左の耳だけ下向き、クリームの前髪、ゆるく結んだネクタイ; body shape 横長あんぱん型; 左の耳だけ下向き; signature prop クリームの前髪; face 下を向きながら上目づかい; main color #90D6DE; material 弾むグミ
4. K435 (カラメルラ): 片側だけふくらむ豆型の体、豆粒みたいな二本角、ずり落ちたコック帽、背中のちいさな羽; body shape 片側だけふくらむ豆型; 豆粒みたいな二本角; signature prop ずり落ちたコック帽; face 眠そうなのに口だけ元気; main color #9BD6C5; material サクサククッキー
5. K436 (ムースラポ): 小さな鐘型の体、片側だけのまる耳、キャンディ型の角、ふちどりだけきらめく模様; body shape 小さな鐘型; 片側だけのまる耳; signature prop キャンディ型の角; face 笑うと片目だけ閉じる; main color #F6A68D; material とろけたクリーム
6. K437 (ジャムネラ): ふっくらキノコ型の体、左右高さの違う角、ポケットのいちご、端がほつれたケープ; body shape ふっくらキノコ型; 左右高さの違う角; signature prop ポケットのいちご; face 眉が左右で違う; main color #F4ADBF; material 弾むグミ
7. K438 (ワッフロラ): 底が平らなプリン型の体、片方だけまばたきする耳、片側だけのホイップ、胸の一点刺繍; body shape 底が平らなプリン型; 片方だけまばたきする耳; signature prop 片側だけのホイップ; face 困り眉とひとすじ汗; main color #C6A5F1; material サクサククッキー
8. K439 (ゼリピラ): かぼちゃ型の体、まるいぷくぷく耳、小さな焼き型、背中のミニポーチ; body shape かぼちゃ型; まるいぷくぷく耳; signature prop 小さな焼き型; face うっすらしかめ面; main color #C9D878; material とろけたクリーム
9. K440 (ケーコラ): つぶれおもち型の体、ヘアピン状の突起、星型のクッキー、左だけのほっぺそばかす; body shape つぶれおもち型; ヘアピン状の突起; signature prop 星型のクッキー; face いつもニヤッとする; main color #E0A7C2; material 弾むグミ
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K432 K433 K434 K435 K436 K437 K438 K439 K440`

### バッチ 49（K441〜K449）
```
1. K441 (プリモチ): まるい鈴型の体、うず巻く左右の突起、ふるえるスプーン、片頬の小さなばんそうこう; body shape まるい鈴型; うず巻く左右の突起; signature prop ふるえるスプーン; face 小さな八重歯が見える; main color #F7D16A; material サクサククッキー
2. K442 (グミラチ): 逆さハート型の体、右だけ折れた耳、クリームの前髪、頬のまるいペイント; body shape 逆さハート型; 右だけ折れた耳; signature prop クリームの前髪; face 左右で大きさの違う目; main color #D9CCA7; material とろけたクリーム
3. K443 (パンネチ): ひらたいしずく型の体、左右に離れた耳、ずり落ちたコック帽、ぺたんこの足跡模様; body shape ひらたいしずく型; 左右に離れた耳; signature prop ずり落ちたコック帽; face 目を閉じて微笑む; main color #E7B5A9; material 弾むグミ
4. K444 (モチルチ): いびつな星形の体、透明なちいさな触角、キャンディ型の角、鼻先の小さな光; body shape いびつな星形; 透明なちいさな触角; signature prop キャンディ型の角; face いつも口が左にずれる; main color #F6C37A; material サクサククッキー
5. K445 (アメピチ): たて長まゆ型の体、左右の尖った耳、ポケットのいちご、巻きすぎた細いマフラー; body shape たて長まゆ型; 左右の尖った耳; signature prop ポケットのいちご; face 半目でとぼける; main color #C2C3D3; material とろけたクリーム
6. K446 (クッキルチ): ころがる小石型の体、頭の真ん中の短い触角、片側だけのホイップ、おへその星形ボタン; body shape ころがる小石型; 頭の真ん中の短い触角; signature prop 片側だけのホイップ; face びっくり目で無表情; main color #7EA8F4; material 弾むグミ
7. K447 (チョコラチ): 三角おにぎり型の体、左だけ長い耳、小さな焼き型、一本だけの短いしっぽ; body shape 三角おにぎり型; 左だけ長い耳; signature prop 小さな焼き型; face すこし泣きそうな目; main color #B5E0A1; material サクサククッキー
8. K448 (ミルモチ): ねじれた雲型の体、左の耳だけ下向き、星型のクッキー、前髪のような模様; body shape ねじれた雲型; 左の耳だけ下向き; signature prop 星型のクッキー; face 片目だけ星型ハイライト; main color #DCCDEB; material とろけたクリーム
9. K449 (タルトルチ): ぽってり壺型の体、豆粒みたいな二本角、ふるえるスプーン、片側の口元にほくろ; body shape ぽってり壺型; 豆粒みたいな二本角; signature prop ふるえるスプーン; face 口がほぼ点; main color #FFE3A1; material 弾むグミ
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K441 K442 K443 K444 K445 K446 K447 K448 K449`

### バッチ 50（K450〜K458）
```
1. K450 (カラメルチ): 水たまり型の体、片側だけのまる耳、クリームの前髪、頭に乗った小さな石; body shape 水たまり型; 片側だけのまる耳; signature prop クリームの前髪; face ジト目と小さな口; main color #93C5E1; material サクサククッキー
2. K451 (ムースラチ): ぷっくり四角型の体、左右高さの違う角、ずり落ちたコック帽、左右違う色の靴; body shape ぷっくり四角型; 左右高さの違う角; signature prop ずり落ちたコック帽; face 赤面して真顔; main color #AEC0CE; material とろけたクリーム
3. K452 (ジャムネチ): 二段重ね型の体、片方だけまばたきする耳、キャンディ型の角、ゆるく結んだネクタイ; body shape 二段重ね型; 片方だけまばたきする耳; signature prop キャンディ型の角; face きりっと眉とぽかん口; main color #C8A384; material 弾むグミ
4. K453 (ワッフロチ): 帽子状の円盤型の体、まるいぷくぷく耳、ポケットのいちご、背中のちいさな羽; body shape 帽子状の円盤型; まるいぷくぷく耳; signature prop ポケットのいちご; face きょとんとした丸目; main color #A996D7; material サクサククッキー
5. K454 (ゼリピチ): 丸い洋梨型の体、ヘアピン状の突起、片側だけのホイップ、ふちどりだけきらめく模様; body shape 丸い洋梨型; ヘアピン状の突起; signature prop 片側だけのホイップ; face 下を向きながら上目づかい; main color #90D6DE; material とろけたクリーム
6. K455 (ケーコチ): 小さな山型の体、うず巻く左右の突起、小さな焼き型、端がほつれたケープ; body shape 小さな山型; うず巻く左右の突起; signature prop 小さな焼き型; face 眠そうなのに口だけ元気; main color #9BD6C5; material 弾むグミ
7. K456 (ギアモト): 帽子状の円盤型の体、左右高さの違う角、頭の巻き鍵、端がほつれたケープ; body shape 帽子状の円盤型; 左右高さの違う角; signature prop 頭の巻き鍵; face きょとんとした丸目; main color #B5E0A1; material 真鍮の光沢
8. K457 (ネジラト): 丸い洋梨型の体、片方だけまばたきする耳、小型の鍵束、胸の一点刺繍; body shape 丸い洋梨型; 片方だけまばたきする耳; signature prop 小型の鍵束; face 下を向きながら上目づかい; main color #DCCDEB; material 透明メカジェル
9. K458 (ハグルト): 小さな山型の体、まるいぷくぷく耳、からくりネクタイ、背中のミニポーチ; body shape 小さな山型; まるいぷくぷく耳; signature prop からくりネクタイ; face 眠そうなのに口だけ元気; main color #FFE3A1; material すりガラスの外殻
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K450 K451 K452 K453 K454 K455 K456 K457 K458`

### バッチ 51（K459〜K467）
```
1. K459 (マキロト): しわしわ風船型の体、ヘアピン状の突起、片眼モノクル、左だけのほっぺそばかす; body shape しわしわ風船型; ヘアピン状の突起; signature prop 片眼モノクル; face 笑うと片目だけ閉じる; main color #93C5E1; material 真鍮の光沢
2. K460 (カギナト): しずく型の体、うず巻く左右の突起、スイッチ型の耳、片頬の小さなばんそうこう; body shape しずく型; うず巻く左右の突起; signature prop スイッチ型の耳; face 眉が左右で違う; main color #AEC0CE; material 透明メカジェル
3. K461 (トケルト): 横長あんぱん型の体、右だけ折れた耳、歪んだ歯車、頬のまるいペイント; body shape 横長あんぱん型; 右だけ折れた耳; signature prop 歪んだ歯車; face 困り眉とひとすじ汗; main color #C8A384; material すりガラスの外殻
4. K462 (ナゾピト): 片側だけふくらむ豆型の体、左右に離れた耳、ずれた時計針、ぺたんこの足跡模様; body shape 片側だけふくらむ豆型; 左右に離れた耳; signature prop ずれた時計針; face うっすらしかめ面; main color #A996D7; material 真鍮の光沢
5. K463 (パズラト): 小さな鐘型の体、透明なちいさな触角、ミニドローン、鼻先の小さな光; body shape 小さな鐘型; 透明なちいさな触角; signature prop ミニドローン; face いつもニヤッとする; main color #90D6DE; material 透明メカジェル
6. K464 (ギミルト): ふっくらキノコ型の体、左右の尖った耳、頭の巻き鍵、巻きすぎた細いマフラー; body shape ふっくらキノコ型; 左右の尖った耳; signature prop 頭の巻き鍵; face 小さな八重歯が見える; main color #9BD6C5; material すりガラスの外殻
7. K465 (コードント): 底が平らなプリン型の体、頭の真ん中の短い触角、小型の鍵束、おへその星形ボタン; body shape 底が平らなプリン型; 頭の真ん中の短い触角; signature prop 小型の鍵束; face 左右で大きさの違う目; main color #F6A68D; material 真鍮の光沢
8. K466 (ボタンルト): かぼちゃ型の体、左だけ長い耳、からくりネクタイ、一本だけの短いしっぽ; body shape かぼちゃ型; 左だけ長い耳; signature prop からくりネクタイ; face 目を閉じて微笑む; main color #F4ADBF; material 透明メカジェル
9. K467 (ケーブルルト): つぶれおもち型の体、左の耳だけ下向き、片眼モノクル、前髪のような模様; body shape つぶれおもち型; 左の耳だけ下向き; signature prop 片眼モノクル; face いつも口が左にずれる; main color #C6A5F1; material すりガラスの外殻
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K459 K460 K461 K462 K463 K464 K465 K466 K467`

### バッチ 52（K468〜K476）
```
1. K468 (スイチト): まるい鈴型の体、豆粒みたいな二本角、スイッチ型の耳、片側の口元にほくろ; body shape まるい鈴型; 豆粒みたいな二本角; signature prop スイッチ型の耳; face 半目でとぼける; main color #C9D878; material 真鍮の光沢
2. K469 (ラチェルト): 逆さハート型の体、片側だけのまる耳、歪んだ歯車、頭に乗った小さな石; body shape 逆さハート型; 片側だけのまる耳; signature prop 歪んだ歯車; face びっくり目で無表情; main color #E0A7C2; material 透明メカジェル
3. K470 (レバーント): ひらたいしずく型の体、左右高さの違う角、ずれた時計針、左右違う色の靴; body shape ひらたいしずく型; 左右高さの違う角; signature prop ずれた時計針; face すこし泣きそうな目; main color #F7D16A; material すりガラスの外殻
4. K471 (ギアモン): いびつな星形の体、片方だけまばたきする耳、ミニドローン、ゆるく結んだネクタイ; body shape いびつな星形; 片方だけまばたきする耳; signature prop ミニドローン; face 片目だけ星型ハイライト; main color #D9CCA7; material 真鍮の光沢
5. K472 (ネジラン): たて長まゆ型の体、まるいぷくぷく耳、頭の巻き鍵、背中のちいさな羽; body shape たて長まゆ型; まるいぷくぷく耳; signature prop 頭の巻き鍵; face 口がほぼ点; main color #E7B5A9; material 透明メカジェル
6. K473 (ハグルン): ころがる小石型の体、ヘアピン状の突起、小型の鍵束、ふちどりだけきらめく模様; body shape ころがる小石型; ヘアピン状の突起; signature prop 小型の鍵束; face ジト目と小さな口; main color #F6C37A; material すりガラスの外殻
7. K474 (マキロン): 三角おにぎり型の体、うず巻く左右の突起、からくりネクタイ、端がほつれたケープ; body shape 三角おにぎり型; うず巻く左右の突起; signature prop からくりネクタイ; face 赤面して真顔; main color #C2C3D3; material 真鍮の光沢
8. K475 (カギナン): ねじれた雲型の体、右だけ折れた耳、片眼モノクル、胸の一点刺繍; body shape ねじれた雲型; 右だけ折れた耳; signature prop 片眼モノクル; face きりっと眉とぽかん口; main color #7EA8F4; material 透明メカジェル
9. K476 (トケルン): ぽってり壺型の体、左右に離れた耳、スイッチ型の耳、背中のミニポーチ; body shape ぽってり壺型; 左右に離れた耳; signature prop スイッチ型の耳; face きょとんとした丸目; main color #B5E0A1; material すりガラスの外殻
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K468 K469 K470 K471 K472 K473 K474 K475 K476`

### バッチ 53（K477〜K485）
```
1. K477 (ナゾピン): 水たまり型の体、透明なちいさな触角、歪んだ歯車、左だけのほっぺそばかす; body shape 水たまり型; 透明なちいさな触角; signature prop 歪んだ歯車; face 下を向きながら上目づかい; main color #DCCDEB; material 真鍮の光沢
2. K478 (パズラン): ぷっくり四角型の体、左右の尖った耳、ずれた時計針、片頬の小さなばんそうこう; body shape ぷっくり四角型; 左右の尖った耳; signature prop ずれた時計針; face 眠そうなのに口だけ元気; main color #FFE3A1; material 透明メカジェル
3. K479 (ギミルン): 二段重ね型の体、頭の真ん中の短い触角、ミニドローン、頬のまるいペイント; body shape 二段重ね型; 頭の真ん中の短い触角; signature prop ミニドローン; face 笑うと片目だけ閉じる; main color #93C5E1; material すりガラスの外殻
4. K480 (コードンポ): 帽子状の円盤型の体、左だけ長い耳、頭の巻き鍵、ぺたんこの足跡模様; body shape 帽子状の円盤型; 左だけ長い耳; signature prop 頭の巻き鍵; face 眉が左右で違う; main color #AEC0CE; material 真鍮の光沢
5. K481 (ボタンルン): 丸い洋梨型の体、左の耳だけ下向き、小型の鍵束、鼻先の小さな光; body shape 丸い洋梨型; 左の耳だけ下向き; signature prop 小型の鍵束; face 困り眉とひとすじ汗; main color #C8A384; material 透明メカジェル
6. K482 (ケーブルルン): 小さな山型の体、豆粒みたいな二本角、からくりネクタイ、巻きすぎた細いマフラー; body shape 小さな山型; 豆粒みたいな二本角; signature prop からくりネクタイ; face うっすらしかめ面; main color #A996D7; material すりガラスの外殻
7. K483 (スイチン): しわしわ風船型の体、片側だけのまる耳、片眼モノクル、おへその星形ボタン; body shape しわしわ風船型; 片側だけのまる耳; signature prop 片眼モノクル; face いつもニヤッとする; main color #90D6DE; material 真鍮の光沢
8. K484 (ラチェルン): しずく型の体、左右高さの違う角、スイッチ型の耳、一本だけの短いしっぽ; body shape しずく型; 左右高さの違う角; signature prop スイッチ型の耳; face 小さな八重歯が見える; main color #9BD6C5; material 透明メカジェル
9. K485 (レバーンポ): 横長あんぱん型の体、片方だけまばたきする耳、歪んだ歯車、前髪のような模様; body shape 横長あんぱん型; 片方だけまばたきする耳; signature prop 歪んだ歯車; face 左右で大きさの違う目; main color #F6A68D; material すりガラスの外殻
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K477 K478 K479 K480 K481 K482 K483 K484 K485`

### バッチ 54（K486〜K494）
```
1. K486 (ギアモリ): 片側だけふくらむ豆型の体、まるいぷくぷく耳、ずれた時計針、片側の口元にほくろ; body shape 片側だけふくらむ豆型; まるいぷくぷく耳; signature prop ずれた時計針; face 目を閉じて微笑む; main color #F4ADBF; material 真鍮の光沢
2. K487 (ネジラリ): 小さな鐘型の体、ヘアピン状の突起、ミニドローン、頭に乗った小さな石; body shape 小さな鐘型; ヘアピン状の突起; signature prop ミニドローン; face いつも口が左にずれる; main color #C6A5F1; material 透明メカジェル
3. K488 (ハグルリ): ふっくらキノコ型の体、うず巻く左右の突起、頭の巻き鍵、左右違う色の靴; body shape ふっくらキノコ型; うず巻く左右の突起; signature prop 頭の巻き鍵; face 半目でとぼける; main color #C9D878; material すりガラスの外殻
4. K489 (マキロリ): 底が平らなプリン型の体、右だけ折れた耳、小型の鍵束、ゆるく結んだネクタイ; body shape 底が平らなプリン型; 右だけ折れた耳; signature prop 小型の鍵束; face びっくり目で無表情; main color #E0A7C2; material 真鍮の光沢
5. K490 (カギナリ): かぼちゃ型の体、左右に離れた耳、からくりネクタイ、背中のちいさな羽; body shape かぼちゃ型; 左右に離れた耳; signature prop からくりネクタイ; face すこし泣きそうな目; main color #F7D16A; material 透明メカジェル
6. K491 (トケルリ): つぶれおもち型の体、透明なちいさな触角、片眼モノクル、ふちどりだけきらめく模様; body shape つぶれおもち型; 透明なちいさな触角; signature prop 片眼モノクル; face 片目だけ星型ハイライト; main color #D9CCA7; material すりガラスの外殻
7. K492 (ナゾピリ): まるい鈴型の体、左右の尖った耳、スイッチ型の耳、端がほつれたケープ; body shape まるい鈴型; 左右の尖った耳; signature prop スイッチ型の耳; face 口がほぼ点; main color #E7B5A9; material 真鍮の光沢
8. K493 (パズラリ): 逆さハート型の体、頭の真ん中の短い触角、歪んだ歯車、胸の一点刺繍; body shape 逆さハート型; 頭の真ん中の短い触角; signature prop 歪んだ歯車; face ジト目と小さな口; main color #F6C37A; material 透明メカジェル
9. K494 (ギミルリ): ひらたいしずく型の体、左だけ長い耳、ずれた時計針、背中のミニポーチ; body shape ひらたいしずく型; 左だけ長い耳; signature prop ずれた時計針; face 赤面して真顔; main color #C2C3D3; material すりガラスの外殻
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K486 K487 K488 K489 K490 K491 K492 K493 K494`

### バッチ 55（K495〜K500）
```
1. K495 (コードンリ): いびつな星形の体、左の耳だけ下向き、ミニドローン、左だけのほっぺそばかす; body shape いびつな星形; 左の耳だけ下向き; signature prop ミニドローン; face きりっと眉とぽかん口; main color #7EA8F4; material 真鍮の光沢
2. K496 (ボタンルリ): たて長まゆ型の体、豆粒みたいな二本角、頭の巻き鍵、片頬の小さなばんそうこう; body shape たて長まゆ型; 豆粒みたいな二本角; signature prop 頭の巻き鍵; face きょとんとした丸目; main color #B5E0A1; material 透明メカジェル
3. K497 (ケーブルルリ): ころがる小石型の体、片側だけのまる耳、小型の鍵束、頬のまるいペイント; body shape ころがる小石型; 片側だけのまる耳; signature prop 小型の鍵束; face 下を向きながら上目づかい; main color #DCCDEB; material すりガラスの外殻
4. K498 (スイチリ): 三角おにぎり型の体、左右高さの違う角、からくりネクタイ、ぺたんこの足跡模様; body shape 三角おにぎり型; 左右高さの違う角; signature prop からくりネクタイ; face 眠そうなのに口だけ元気; main color #FFE3A1; material 真鍮の光沢
5. K499 (ラチェルリ): ねじれた雲型の体、片方だけまばたきする耳、片眼モノクル、鼻先の小さな光; body shape ねじれた雲型; 片方だけまばたきする耳; signature prop 片眼モノクル; face 笑うと片目だけ閉じる; main color #93C5E1; material 透明メカジェル
6. K500 (レバーンリ): ぽってり壺型の体、まるいぷくぷく耳、スイッチ型の耳、巻きすぎた細いマフラー; body shape ぽってり壺型; まるいぷくぷく耳; signature prop スイッチ型の耳; face 眉が左右で違う; main color #AEC0CE; material すりガラスの外殻
```
切りぬき: `python3 tools/cut_sheet.py シート.png 3 3 1 K495 K496 K497 K498 K499 K500 - - -`
