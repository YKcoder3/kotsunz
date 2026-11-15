// 必殺技エンジン v4 の単体テスト（パックの参考テスト special_rules.test.mjs と同じ場面を、ゲームの実装 kskill.js で確かめる）
//   ちがいは1つだけ：ユーザーの指定で「発動したらゲージは0にもどる」（パックは「コストだけ引く」）
const fs = require('fs');
const SRC = '/home/claude/hayaoshi/';
const S = JSON.parse(fs.readFileSync(SRC + 'data/special_config_new450.json', 'utf8'));
const SPC = { meter: { max: S.skillMeter.maximum, initial: S.skillMeter.starting, tiers: S.skillMeter.tiers, gain: S.skillMeter.gains, loss: S.skillMeter.losses, maxGainPerQuestion: S.skillMeter.maxGainPerQuestion, resetOnUse: true },
  rules: S.skillRules, scaling: S.scaling, weakGenreWrongFlatProtection: 2 };
const master = JSON.parse(fs.readFileSync(SRC + 'data/nz_master_450.json', 'utf8'));
const KMASTER = {};
const R = { a: 'attack', d: 'defense', r: 'recover' };
for(const c of master) KMASTER[c.id] = { cid: c.id, rarity: c.r, skills: c.sk.map(k => ({ id: k.id, name: k.n, role: R[k.r], mirror: !!k.m, stage: k.st })) };
// テスト用のキャラ（役割ごと）
const T = (id, role, mirror) => { KMASTER[id] = { cid: id, rarity: '普通', skills: [{ id: id + '_1', name: id + 'の技', role, mirror: !!mirror, stage: 1 }] }; };
T('TA', 'attack'); T('TD', 'defense'); T('TR', 'recover'); T('TM', 'defense', true);
const code = fs.readFileSync(SRC + 'kskill.js', 'utf8');
const E = new Function('SPC', 'KMASTER', code + '\nreturn { spSkillFor, spPower, spResolveRound, spSpread, spSplitTotal, spFinishMeter };')(SPC, KMASTER);
let pass = 0, fail = 0;
const ok = (name, cond, extra) => { cond ? pass++ : fail++; console.log((cond ? 'PASS ' : 'FAIL ') + name + (extra !== undefined ? '  ' + JSON.stringify(extra) : '')); };

// パックの base：ゲージ100・小・HP30/100・受けるダメージ10
const P = (id, cid, o = {}) => ({ id, alive: true, hp: 30, max: 100, meter: 100, rank: 0, correctStreak: 0, firstStreak: 0, affinity: 'neutral', adv: false,
  intent: { key: { attack: 'attack', defense: 'guard', recover: 'recover' }[KMASTER[cid].skills[0].role], tier: 'small' }, cid, stage: 1, level: 1, rarity: '普通', shieldNext: 0, mirrorStore: 0, mirrorExp: -1, ...o });
const opp = (id, o = {}) => ({ id, alive: true, hp: 100, max: 100, meter: 0, rank: 0, intent: null, cid: 'NZ001', stage: 1, level: 1, rarity: '普通', ...o });
const run = (ps, base, hits, round = 1) => E.spResolveRound(ps, base, hits || {}, { gid: 'g', round });

// ATTACK：1位正解だけ発動
let r = run([P('A', 'TA', { rank: 2 }), opp('B', { rank: 1 })], { A: 0, B: 0 }, { B: ['A'] });
ok('ATTACK：1位でない正解は不発・ゲージ消費なし', !r.events.some(e => e.id === 'A') && r.spent.A === 0 && r.meter.A === 100, { m: r.meter.A });
r = run([P('A', 'TA', { rank: 1 }), opp('B')], { B: 5 }, { A: ['B'] });
ok('ATTACK：1位正解で発動、追加3', r.extra.B === 3 && r.hp.B === 92 && r.meter.A === 0, { x: r.extra, hp: r.hp.B });
// DEFENCE：まちがえても、遅くても発動
r = run([P('D', 'TD'), opp('B', { rank: 1 })], { D: 10 }, {});
ok('DEFENCE：不正解でも発動・4軽減・HP24・ゲージ0', r.blocked.D === 4 && r.hp.D === 24 && r.meter.D === 0, { b: r.blocked.D, hp: r.hp.D });
r = run([P('D', 'TD'), opp('B', { rank: 1 })], { D: 0 }, {});
ok('DEFENCE：ダメージ0でも発動して消費', r.events.some(e => e.id === 'D') && r.blocked.D === 0 && r.meter.D === 0);
// RECOVER
r = run([P('X', 'TR', { rank: 2 }), opp('B', { rank: 1 })], { X: 10 }, {});
ok('RECOVER：2位正解でも回復8（6＋HP低め2）', r.healed.X === 8 && r.hp.X === 28, { h: r.healed.X });
r = run([P('X', 'TR', { rank: 1 }), opp('B')], { X: 10 }, {});
ok('RECOVER：1位はさらに+3で11、HP31', r.healed.X === 11 && r.hp.X === 31, { h: r.healed.X, hp: r.hp.X });
r = run([P('X', 'TR', { rank: 0 }), opp('B', { rank: 1 })], { X: 10 }, {});
ok('RECOVER：不正解なら不発・消費なし', !r.healed.X && r.spent.X === 0 && r.meter.X > 90);
r = run([P('X', 'TR', { rank: 2, hp: 2 }), opp('B', { rank: 1 })], { X: 8 }, {});
ok('RECOVER：同じ問題で合わせてプラスならKOしない（HP2）', r.hp.X === 2 && !r.out.includes('X'), { hp: r.hp.X });
r = run([P('X', 'TR', { rank: 2, hp: 0, alive: false }), opp('B', { rank: 1 })], { X: 0 }, {});
ok('前の問題でKOした人は回復できない', r.hp.X === 0 && !r.events.some(e => e.id === 'X'));
r = run([P('X', 'TR', { rank: 1, hp: 98 }), opp('B')], { X: 0 }, {});
ok('あふれた回復は次の1問だけシールド（1〜3）', r.shieldNext.X >= 1 && r.shieldNext.X <= 3, r.shieldNext);
r = run([P('D', 'TD', { intent: null, shieldNext: 3 }), opp('B', { rank: 1 })], { D: 5 }, {});
ok('シールドで次の問題のダメージが減る', r.shieldUsed.D === 3 && r.hp.D === 28, { s: r.shieldUsed, hp: r.hp.D });
// MIRROR
let r1 = run([P('M', 'TM'), opp('B', { rank: 1 })], { M: 10 }, {}, 1);
ok('MIRROR：防いだ分（4）を記録', r1.blocked.M === 4 && r1.mirrorNext.M.store === 4, r1.mirrorNext);
let r2 = run([P('M', 'TM', { rank: 1, mirrorStore: r1.mirrorNext.M.store, mirrorExp: r1.mirrorNext.M.exp }), opp('P2'), opp('P3')], { P2: 0, P3: 0 }, {}, 2);
ok('MIRROR：次に1位正解で、実際に防いだ分の一部（合計1）を反射', Object.values(r2.mirrorOut).reduce((a, b) => a + b, 0) === 1, r2.mirrorOut);
r2 = run([P('M', 'TM', { rank: 1 }), opp('P2')], { P2: 0 }, {}, 2);
ok('MIRROR：防いだ記録がなければ反射0', Object.values(r2.mirrorOut).reduce((a, b) => a + b, 0) === 0);
r2 = run([P('M', 'TM', { rank: 1, mirrorStore: 6, mirrorExp: 3 }), opp('P2')], { P2: 0 }, {}, 7);
ok('MIRROR：期限切れの記録は使えない', Object.keys(r2.mirrorOut).length === 0);
// 強さ
ok('レジェンドS3 Lv30 の防御小は6（上限つき）', E.spPower({ role: 'defense', unique: true }, 'small', 'レジェンド', 3, 30) === 6);
ok('普通S1 Lv1 の回復大は16', E.spPower({ role: 'recover', unique: true }, 'large', '普通', 1, 1) === 16);
// ゲージ
let m = E.spFinishMeter(99, false, 0, { correct: true, rank: 1 });
ok('ゲージは100で止まる', m.end === 100);
m = E.spFinishMeter(90, true, 25, { correct: false });
ok('発動したらゲージは0（ユーザー指定のリセット）', m.end === 0);
ok('反射ダメージは整数で配る', Object.values(E.spSplitTotal(3, ['b', 'a', 'c'], 's')).reduce((a, b) => a + b, 0) === 3);
// 2つ目の技の解放
const n1 = master.find(c => c.r === '普通'), sr = master.find(c => c.r === 'SR' || c.r === 'レジェンド');
ok('普通のキャラは2つ目の技がS2から', n1.sk[1].st === 2 && !E.spSkillFor(n1.id, 1, { a: 'attack', d: 'guard', r: 'recover' }[n1.sk[1].r]) === (n1.sk[1].r === 'r') || E.spSkillFor(n1.id, 1, { a: 'attack', d: 'guard', r: 'recover' }[n1.sk[1].r]).unique === false);
ok('SR・レジェンドは2つ目もS1から', sr && sr.sk.every(k => k.st === 1), sr && sr.sk);
ok('全キャラ2技・役割は3種・ミラーは防御だけ', master.every(c => c.sk.length === 2 && c.sk.every(k => 'adr'.includes(k.r) && (!k.m || k.r === 'd'))));
ok('技IDと技名は900件すべて別', new Set(master.flatMap(c => c.sk.map(k => k.id))).size === 900 && new Set(master.flatMap(c => c.sk.map(k => k.n))).size === 900);
console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
