# KOTSUNZ — Premium Visual Redesign (preview branch)

## Safety boundary
CSS-only design preview. Never change quiz data, networking, user accounts, character stats, gacha, evolution, battle calculations, or storage. Preserve all DOM IDs and button handlers.

## Scope
- Splash: violet atmosphere and subtle light.
- Account screen: hierarchy, rounded cards, privacy notice, premium gold primary button.
- Home: premium action buttons and character summary.
- Lobby: more distinct purple bump area, yellow primary action, clear player cards.
- styles/premium-theme.css is the only style overlay, loaded via one extra link in index.html.

## Five flagship mascots to render separately (not yet integrated)
| ID | Name | Keep silhouette | Material / feel |
| --- | --- | --- | --- |
| K001 | ぬけもん | slanted book, sleepy eyes, bandage, droopy purple body | matte short plush + translucent tear |
| K002 | めだまる | egg topping, cream round body, curious eyes | soft velour and glossy yolk |
| K003 | ロジポン | gray-lilac cat, large round spectacles, book, tie | dense fleece, metal glasses, textile tie |
| K004 | ピピット | pink lightning ear, headphones, racing pose | brushed plush and satin lightning accents |
| K005 | ルミュ | star jewel, lilac celestial petal silhouette | opalescent gel, subtle fabric and scattered starlight |

## Art deliverables
- Individual transparent masters, 1024px square, with 512px and 256px WebP exports.
- Keep enough transparent padding around heads and appendages.
- Neutral, joy, sad, special attack expressions; front and three-quarter view.
- Soft controlled studio lighting, craft material detail, restrained glow, legible face at 48px.
- Do not replace with generic cute round blobs or imitate existing commercial characters.
- First approve quality and continuity; then install assets to existing named character paths.
- Keep legacy SVG as fallback until each asset is approved and verified.

## Visual-only QA before merge
- Check new account, passcode, transfer, file restore.
- Check lobby bump/CPU flow, selected character, genres, 10-player layout, start.
- Check special skills and online battle unchanged.
- Test narrow iPhone, safe-area insets, long names, Japanese text, reduced-motion and button focus.
- CSS preview does not establish runtime verification. No assets are installed yet.

## Revert
Remove the premium-theme.css stylesheet link from index.html to disable visual changes.
## Status (2026-11-14)
v7.1 の新デザイン（表紙・アカウント・ロビー・アイコン）を main に入れたため、この CSS は index.html から読みこんでいません。背景やアカウント画面の指定が v7.1 とぶつかるためです。ファイルは参考として残しています。
