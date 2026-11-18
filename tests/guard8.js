// v8.3：防御の技は、まちがえても・時間切れでも発動する（攻撃・回復はこれまでどおり）。本番（main）の kskill.js を直接テスト
const fs = require('fs'); const SRC = process.env.SRC || '/home/claude/src-main/';   // ソース（kskill.js と data/special_config_v3.json）の場所
const SPC = JSON.parse(fs.readFileSync(SRC + 'data/special_config_v3.json', 'utf8'));
const E = new Function('SPC', fs.readFileSync(SRC + 'kskill.js', 'utf8') + '\nreturn { spResolveRound, SK_CAT };')(SPC);
let P = 0, F = 0; const ok = (n, c, x) => { c ? P++ : F++; console.log((c ? 'PASS ' : 'FAIL ') + n + (x !== undefined ? '  ' + JSON.stringify(x) : '')); };
const pl = (id, o) => ({ id, name: id, alive: true, hp: 50, max: 110, meter: 100, rank: 0, answered: true, correctStreak: 0, firstStreak: 0, affinity: 'neutral', adv: false, bonus: 0, sealed: false, immuneTo: -1, intent: null, rarity: 'N', stage: 1, fam: 'burst', skillName: '技', ...o });
const run = (ps, base) => E.spResolveRound(ps, base, { W: ps.filter(p => p.id !== 'W').map(p => p.id) }, { gid: 'g', round: 1, last: false });
const rar = Object.keys(SPC.abilities.rarityUniqueBonus)[0];
// 守り（shield）をまちがえて使う
let r = run([pl('D', { fam: 'shield', rarity: rar, intent: { type: 'unique', tier: 'medium' } }), pl('W', { rank: 1 })], { D: 20 });
ok('防御の技（shield）は、まちがえても発動してダメージを減らす', r.taken.D < 20 && r.events.some(e => e.id === 'D' && e.guard > 0), { taken: r.taken.D, ev: r.events });
ok('まちがえて発動したときも、ゲージは0にもどる', r.meter.D === 0, r.meter.D);
r = run([pl('D', { fam: 'shield', rarity: rar, answered: false, intent: { type: 'unique', tier: 'small' } }), pl('W', { rank: 1 })], { D: 20 });
ok('時間切れでも、防御の技は発動', r.taken.D < 20, r.taken.D);
r = run([pl('D', { fam: 'hint', rarity: rar, intent: { type: 'unique', tier: 'large' } }), pl('W', { rank: 1 })], { D: 20 });
ok('ヒントの技をまちがえて使ったら、守りだけ（次の問題の3択はなし）', r.taken.D < 20 && !(r.next.D && r.next.D.hint), { taken: r.taken.D, next: r.next.D });
r = run([pl('D', { fam: 'hint', rarity: rar, rank: 2, intent: { type: 'unique', tier: 'large' } }), pl('W', { rank: 1 })], { D: 20 });
ok('ヒントの技を正解で使えば、守り＋次の問題の3択', r.next.D && r.next.D.hint === true);
// 攻撃・回復はこれまでどおり
r = run([pl('A', { fam: 'burst', rarity: rar, intent: { type: 'unique', tier: 'small' } }), pl('W', { rank: 1 })], { A: 10 });
ok('攻撃の技は、まちがえたら不発（ゲージは使わない）', !r.events.some(e => e.id === 'A') && r.meter.A > 90, r.meter.A);
r = run([pl('H', { fam: 'heal', rarity: rar, intent: { type: 'unique', tier: 'small' } }), pl('W', { rank: 1 })], { H: 10 });
ok('回復の技は、まちがえたら不発', !r.events.some(e => e.id === 'H') && !r.healed.H);
r = run([pl('D', { fam: 'shield', rarity: rar, intent: { type: 'unique', tier: 'small' }, meter: 10 }), pl('W', { rank: 1 })], { D: 20 });
ok('ゲージが足りないときは、防御の技も無効', !r.events.some(e => e.id === 'D'));
console.log(`\n${P} passed, ${F} failed`); process.exit(F ? 1 : 0);
