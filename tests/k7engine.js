// v7 必殺技エンジンの単体テスト（パックの参考テスト＋追加）
const fs = require('fs');
const SRC = '/home/claude/hayaoshi/';
const SPC = JSON.parse(fs.readFileSync(SRC + 'data/special_config_v3.json', 'utf8'));
const code = fs.readFileSync(SRC + 'kskill.js', 'utf8');
const E = new Function('SPC', code + '\nreturn { spGaugeDelta, spCanDeclare, spFinish, spUnique, spBasic, spEffect, spSpread, spSealTarget, spResolveRound, SP_TIERS, spTypeOf };')(SPC);
const master = JSON.parse(fs.readFileSync(SRC + 'data/kotsunz_master_500.json', 'utf8'));
const PK = '/home/claude/v4pack/full/KOTSUNZ_FULL_CLAUDE_V4/data/';
const skills = JSON.parse(fs.readFileSync(PK + 'special_skills_500.json', 'utf8'));
const chars = JSON.parse(fs.readFileSync(PK + 'characters_500.json', 'utf8'));
let pass = 0, fail = 0;
const ok = (name, cond, extra) => { cond ? pass++ : fail++; console.log((cond ? 'PASS ' : 'FAIL ') + name + (extra !== undefined ? '  ' + JSON.stringify(extra) : '')); };
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// ---- マスター ----
ok('500体・500固有技・IDと属性とレア度がパックと一致', master.length === 500 && skills.length === 500 && master.every((c, i) => c.id === chars[i].id && c.a === chars[i].attribute && c.r === chars[i].rarity && c.sk.id === skills[i].skillId && c.sk.n === skills[i].skillName && c.sk.f === skills[i].family));
ok('固有技IDも技名も500件すべて別', new Set(master.map(c => c.sk.id)).size === 500 && new Set(master.map(c => c.sk.n)).size === 500);
ok('系統は設定ファイルの8系統だけ', master.every(c => SPC.abilities.uniques[c.sk.f]));
ok('全員に共通の攻撃・守り', skills.every(s => eq(s.defaultSkills, ['basic_attack', 'basic_guard'])));
const old50 = JSON.parse(fs.readFileSync(SRC + 'data/characters_50.json', 'utf8'));
ok('K001〜K050 のID・名前・属性・レア度は v6 と同じ', old50.every(o => { const n = master.find(x => x.id === o.id); return n && n.n === o.name && n.a === o.attribute && n.r === o.rarity; }));
ok('6属性', new Set(master.map(c => c.a)).size === 6);

// ---- パックの参考テスト ----
ok('段階は25/55/90', eq(SPC.meter.tiers, { small: 25, medium: 55, large: 90 }));
ok('共通技の数値', eq(E.spBasic('attack', 'small'), { damage: 3 }) && eq(E.spBasic('guard', 'large'), { guard: 12 }));
let r = E.spFinish({ start: 90, intent: { type: 'unique', tier: 'large' }, correct: false, affinity: 'weak' });
ok('不正解：コストは引かず、ふつうの減少だけ（90→87）', r.activated === false && r.spent === 0 && r.earned === -3 && r.end === 87, r);
r = E.spFinish({ start: 55, intent: { type: 'attack', tier: 'medium' }, correct: true, rank: 1, correctStreak: 1, firstStreak: 1 });
ok('正解で発動：SPは0にリセット（その問題の獲得も入らない）', r.activated && r.end === 0 && r.earned === 0, r);
ok('開始22では小技は宣言できない', E.spCanDeclare({ gauge: 22, tier: 'small' }) === false);
r = E.spFinish({ start: 22, intent: { type: 'attack', tier: 'small' }, correct: true, rank: 1 });
ok('同じ問題で増えた分は、その問題のコストに使えない（22→44・不発）', !r.activated && r.end === 44, r);
ok('得意1位+31・苦手1位+33・得意不正解−4', E.spGaugeDelta({ correct: true, rank: 1, affinity: 'favorite' }) === 31 && E.spGaugeDelta({ correct: true, rank: 1, affinity: 'weak' }) === 33 && E.spGaugeDelta({ correct: false, affinity: 'favorite' }) === -4);
ok('1問の獲得は最大+34', E.spGaugeDelta({ correct: true, rank: 1, correctStreak: 4, firstStreak: 4, affinity: 'favorite' }) === 34);
ok('0〜100におさまる', E.spFinish({ start: 0, correct: false, affinity: 'neutral' }).end === 0 && E.spFinish({ start: 99, correct: true, rank: 1 }).end === 100);
ok('封印中・KO中は宣言できない', !E.spCanDeclare({ gauge: 100, tier: 'large', sealed: true }) && !E.spCanDeclare({ gauge: 100, tier: 'large', alive: false }));
ok('レア度と進化の上乗せは上限あり、封印はS2から', eq(E.spUnique('burst', 'large', 'レジェンド', 3), { damage: 9 }) && E.spUnique('seal', 'medium', '普通', 1).nextQuestionLockSpecial === undefined && E.spUnique('seal', 'medium', '普通', 2).nextQuestionLockSpecial === 1);
let maxv = 0;
for(const f of Object.keys(SPC.abilities.uniques)) for(const t of E.SP_TIERS) for(const v of Object.values(E.spUnique(f, t, 'レジェンド', 3))) maxv = Math.max(maxv, v);
ok('どの固有技も数値は0〜14', maxv <= 14, maxv);

// ---- 追加：連続ボーナス ----
ok('2連続正解+3・3連続以上+6（1段だけ）', E.spGaugeDelta({ correct: true, rank: 2, correctStreak: 2 }) === 17 && E.spGaugeDelta({ correct: true, rank: 2, correctStreak: 5 }) === 20);
ok('2連続1位+4・3連続1位+7', E.spGaugeDelta({ correct: true, rank: 1, correctStreak: 1, firstStreak: 2 }) === 26 && E.spGaugeDelta({ correct: true, rank: 1, correctStreak: 1, firstStreak: 3 }) === 29);
ok('属性有利は正解のときだけ+2', E.spGaugeDelta({ correct: true, rank: 2, adv: true }) === 16 && E.spGaugeDelta({ correct: false, adv: true }) === -2);
ok('KOしたらゲージは増えない', E.spFinish({ start: 40, correct: true, rank: 1, ko: true }).end === 40);

// ---- 1問の解決 ----
const P = (id, o) => Object.assign({ id, name: id, alive: true, hp: 110, max: 110, meter: 10, rank: 0, answered: true, correctStreak: 0, firstStreak: 0, affinity: 'neutral', adv: false, bonus: 0, sealed: false, immuneTo: -1, intent: null, rarity: '普通', stage: 1, fam: 'burst', skillName: '技' }, o);
const ctx = { gid: 'g1', round: 2, last: false };
// 攻撃の大技：通常攻撃が届く相手だけ。正解者には新しく当てない
let R = E.spResolveRound([P('a', { rank: 1, meter: 90, intent: { type: 'attack', tier: 'large' } }), P('b', { rank: 2 }), P('c')], { b: 10, c: 20 }, { a: ['b', 'c'], b: ['c'] }, ctx);
ok('攻撃の大技は、届く相手にだけ+8', R.extra.b === 8 && R.extra.c === 8 && R.taken.b === 18 && R.taken.c === 28 && R.meter.a === 0, R);
ok('結果イベントは発動した人だけ', R.events.length === 1 && R.events[0].id === 'a' && R.events[0].dmg === 16);
// 不正解なら不発
R = E.spResolveRound([P('a', { meter: 90, intent: { type: 'attack', tier: 'large' } }), P('b', { rank: 1 })], { a: 14 }, { b: ['a'] }, ctx);
ok('不正解は不発（ゲージ90→88、イベントなし、本人にだけ理由）', R.meter.a === 88 && R.events.length === 0 && /不正解/.test(R.fizzle.a), R.fizzle);
// 大人数：合計18まで均等
const many = ['b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
R = E.spResolveRound([P('a', { rank: 1, meter: 90, intent: { type: 'attack', tier: 'large' } })].concat(many.map(x => P(x))), {}, { a: many }, ctx);
const tot = Object.values(R.extra).reduce((x, y) => x + y, 0);
ok('9人に大技：追加ダメージの合計は18、ひとり2ずつ', tot === 18 && Object.values(R.extra).every(v => v === 2), R.extra);
R = E.spResolveRound([P('a', { rank: 1, meter: 90, intent: { type: 'attack', tier: 'large' } })].concat(['b', 'c', 'd'].map(x => P(x))), {}, { a: ['b', 'c', 'd'] }, ctx);
ok('3人に大技8：合計24>18なので 6・6・6', eq(Object.values(R.extra).sort(), [6, 6, 6]), R.extra);
R = E.spResolveRound([P('a', { rank: 1, meter: 90, intent: { type: 'attack', tier: 'large' } })].concat(['b', 'c', 'd', 'e'].map(x => P(x))), {}, { a: ['b', 'c', 'd', 'e'] }, ctx);
ok('4人に大技8：合計18を 5・5・4・4（端数は決まった順）', eq(Object.values(R.extra).sort(), [4, 4, 5, 5]) && tot === 18, R.extra);
// 守り：正解したときだけ。苦手で不正解は固定2軽減
R = E.spResolveRound([P('a', { rank: 1 }), P('b', { rank: 2, meter: 60, intent: { type: 'guard', tier: 'medium' } }), P('c', { affinity: 'weak' })], { b: 7, c: 15 }, { a: ['b', 'c'] }, ctx);
ok('守り中技：正解した問題で8軽減（7→0）', R.taken.b === 0 && R.guarded.b === 7 && R.meter.b === 0, R);
ok('苦手ジャンルで不正解：受けるダメージ2軽減（割合ではない）', R.taken.c === 13 && R.weakProt.c === 2);
R = E.spResolveRound([P('a', { rank: 1 }), P('b', { meter: 60, intent: { type: 'guard', tier: 'medium' } })], { b: 12 }, { a: ['b'] }, ctx);
ok('守りを宣言しても不正解なら不発', R.taken.b === 12 && R.meter.b === 58);
// 回復：ダメージのあと。KOした人は回復しない。上限まで
R = E.spResolveRound([P('a', { rank: 1, hp: 100, fam: 'heal', rarity: 'レジェンド', stage: 3, meter: 90, intent: { type: 'unique', tier: 'large' } }), P('b', { rank: 2, hp: 5, fam: 'heal', meter: 30, intent: { type: 'unique', tier: 'small' } })], { a: 0, b: 10 }, { a: ['b'] }, ctx);
ok('回復は上限まで（100→110）', R.hp.a === 110 && R.healed.a === 10, R.hp);
ok('KOした人は回復しない', R.hp.b === 0 && !R.healed.b && R.out.includes('b'));
// ヒント：次の問題で自分だけ
R = E.spResolveRound([P('a', { rank: 1, fam: 'hint', meter: 60, intent: { type: 'unique', tier: 'medium' } }), P('b')], { b: 10 }, { a: ['b'] }, ctx);
ok('ヒント中技：自分の次の問題だけ3択', R.next.a && R.next.a.hint && !R.next.b);
R = E.spResolveRound([P('a', { rank: 1, fam: 'hint', meter: 60, intent: { type: 'unique', tier: 'medium' } }), P('b')], { b: 10 }, { a: ['b'] }, { gid: 'g', round: 9, last: true });
ok('最終問題ではヒントは起きない', !R.next.a);
// 封印：S2以上・中技以上・最下位を1人
R = E.spResolveRound([P('a', { rank: 1, fam: 'seal', stage: 2, meter: 60, intent: { type: 'unique', tier: 'medium' } }), P('b', { rank: 2 }), P('c', { answered: false })], { b: 8, c: 12 }, { a: ['b', 'c'], b: ['c'] }, ctx);
ok('封印：時間切れの人が対象。次の1問だけ', R.next.c && R.next.c.sealed && !(R.next.b && R.next.b.sealed) && R.events[0].seal.target === 'c', R.next);
R = E.spResolveRound([P('a', { rank: 1, fam: 'seal', stage: 1, meter: 60, intent: { type: 'unique', tier: 'medium' } }), P('c')], { c: 12 }, { a: ['c'] }, ctx);
ok('S1の封印は攻撃だけ', !R.next.c && R.extra.c === 3);
R = E.spResolveRound([P('a', { rank: 1, fam: 'seal', stage: 3, meter: 60, intent: { type: 'unique', tier: 'medium' } }), P('b', { rank: 2 }), P('c', { immuneTo: 3 })], { b: 8, c: 12 }, { a: ['b', 'c'] }, ctx);
ok('封印されたばかりの人（2問は免除）はさけて次の人', R.next.b && R.next.b.sealed && !R.next.c, R.next);
R = E.spResolveRound([P('a', { rank: 1, fam: 'seal', stage: 2, meter: 60, intent: { type: 'unique', tier: 'medium' } }), P('x', { rank: 2, fam: 'seal', stage: 2, meter: 60, intent: { type: 'unique', tier: 'medium' } }), P('c')], { x: 8, c: 12 }, { a: ['x', 'c'], x: ['c'] }, ctx);
ok('封印は1位の人だけ・1人だけ（2位の封印は不発）', R.next.c && R.next.c.sealed && !R.next.a && !R.next.x && R.fizzle.x, R.next);
R = E.spResolveRound([P('a', { rank: 1, fam: 'seal', stage: 2, meter: 60, intent: { type: 'unique', tier: 'medium' } }), P('c', { rank: 2, fam: 'cleanse', meter: 60, intent: { type: 'unique', tier: 'medium' } })], { c: 8 }, { a: ['c'] }, ctx);
ok('クレンズ中技は封印をふせぐ', !R.next.c && R.events.find(e => e.id === 'a').seal.cleansed);
// 集中：次も正解したときだけゲージ
R = E.spResolveRound([P('a', { rank: 1, fam: 'focus', meter: 60, intent: { type: 'unique', tier: 'medium' } }), P('b')], { b: 10 }, { a: ['b'] }, ctx);
ok('集中中技：回復5と、次も正解で+4の予約', R.next.a.focus === 4);
ok('予約したゲージは、正解したときだけ（不正解は普通の−2）', E.spGaugeDelta({ correct: true, rank: 2, bonus: 4 }) === 18 && E.spFinish({ start: 30, correct: false, bonus: 4 }).end === 28);
// ゲージ不足の宣言は無効
R = E.spResolveRound([P('a', { rank: 1, meter: 20, intent: { type: 'attack', tier: 'small' } }), P('b')], { b: 10 }, { a: ['b'] }, ctx);
ok('ゲージ不足の宣言は無効（ホストが判定）', !R.extra.b && R.events.length === 0 && R.fizzle.a);
// 合計ダメージの安全確認：レジェンドS3の大技でも、1人に与える追加は9まで
R = E.spResolveRound([P('a', { rank: 1, fam: 'burst', rarity: 'レジェンド', stage: 3, meter: 100, intent: { type: 'unique', tier: 'large' } }), P('b')], { b: 26 }, { a: ['b'] }, ctx);
ok('レジェンドS3の大技でも追加は9（一撃で全滅しない）', R.extra.b === 9 && R.hp.b === 110 - 35);
// 同じ入力なら同じ結果（ホストが決める順番は再現できる）
const R1 = E.spResolveRound([P('a', { rank: 1, meter: 90, intent: { type: 'attack', tier: 'large' } })].concat(['b', 'c', 'd', 'e'].map(x => P(x))), {}, { a: ['b', 'c', 'd', 'e'] }, ctx);
const R2 = E.spResolveRound([P('a', { rank: 1, meter: 90, intent: { type: 'attack', tier: 'large' } })].concat(['b', 'c', 'd', 'e'].map(x => P(x))), {}, { a: ['b', 'c', 'd', 'e'] }, ctx);
const R3 = E.spResolveRound([P('a', { rank: 1, meter: 90, intent: { type: 'attack', tier: 'large' } })].concat(['b', 'c', 'd', 'e'].map(x => P(x))), {}, { a: ['b', 'c', 'd', 'e'] }, { gid: 'g1', round: 3 });
ok('端数の配り方は再現でき、問題ごとに変わる', eq(R1.extra, R2.extra) && !eq(R1.extra, R3.extra), [R1.extra, R3.extra]);
// ---- v7.1：ATTACK / DEFEND / RECOVER と「攻撃は1位だけ」 ----
ok('RECOVER（共通）は回復 4/8/11', eq(E.spBasic('recover','small'),{heal:4}) && eq(E.spBasic('recover','large'),{heal:11}));
ok('固有技は系統に合うボタンに入る（burst→ATTACK、shield→DEFEND、heal→RECOVER）', E.spTypeOf('attack','burst')==='unique' && E.spTypeOf('guard','burst')==='guard' && E.spTypeOf('guard','hint')==='unique' && E.spTypeOf('recover','focus')==='unique' && E.spTypeOf('recover','seal')==='recover' && E.spTypeOf('x','burst')===null);
R = E.spResolveRound([P('a', { rank: 1 }), P('b', { rank: 2, meter: 60, intent: { type: 'attack', tier: 'medium' } }), P('c')], { b: 7, c: 15 }, { a: ['b', 'c'] }, ctx);
ok('2位の正解者のATTACKは不発で、SPも使わない（60→74）', !R.extra.c && R.events.length === 0 && R.meter.b === 74 && /1位/.test(R.fizzle.b), R.meter);
R = E.spResolveRound([P('a', { rank: 1 }), P('b', { rank: 2, hp: 90, meter: 60, intent: { type: 'recover', tier: 'medium' } }), P('c')], { b: 7, c: 15 }, { a: ['b', 'c'] }, ctx);
ok('2位の正解者のRECOVERは発動（90−7+8=91）', R.hp.b === 91 && R.meter.b === 0);
R = E.spResolveRound([P('a', { rank: 1, meter: 30, intent: { type: 'attack', tier: 'small' } }), P('b')], { b: 10 }, { a: ['b'] }, ctx);
ok('攻撃の技は、当たった相手のIDをイベントに入れる（くらった人にだけ名前を出すため）', eq(R.events[0].to, ['b']) && R.events[0].key === 'attack');
console.log('\n' + pass + ' passed, ' + fail + ' failed');
process.exit(fail ? 1 : 0);
