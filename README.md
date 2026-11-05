# コツンズ 早押しバトル

リンクで最大10人。近くの人とスマホをコツンしてキャラを生み、早押しクイズで戦うスマホ向けゲームの試作です（ISC322 ソフトウェア開発 最終課題）。

- 遊ぶ: https://ykcoder3.github.io/kotsunz/
- 1台だけでも「1人で試す（CPU 3人と対戦）」で遊べます。
- Googleでログインすると、キャラ・レベル・戦績がクラウド（Firebase）に保存されます。

## 使っているもの
- PeerJS 1.5.4（MIT License）… スマホ同士の通信
- qrcode-generator 1.4.4（MIT License, Kazuhiko Arase）… 招待用QRコード
- Firebase JavaScript SDK（Apache License 2.0）… Googleログインと保存
- キャラと国旗の絵、クイズの問題文は自作。音楽イントロの音はページ内で合成し、曲は作曲者の死後70年以上たったクラシックと古謡だけです。

## データについて
保存するのはニックネーム・キャラ・戦績だけで、メールアドレスや本名は保存しません。Firestore のルール（firestore.rules）で、本人だけが自分のデータを読み書きできるようにしています。
