// v8：問題データとジャンル・出題・漏えい・写真・CPUの強さのテスト
//   実行: node k8q.js （http://127.0.0.1:8081 で index.html、ws://127.0.0.1:9001 にMQTTブローカー）
const { chromium, devices } = require('playwright');
const fs = require('fs'), path = require('path'); const NM = path.join(__dirname, 'node_modules');
const SITE = '/home/claude/kotsunz-site/';
const BASE = 'http://127.0.0.1:8081/index.html?debug=1&notitle=1&broker=ws://127.0.0.1:9001/mqtt';
const sleep = ms => new Promise(r => setTimeout(r, ms));
let F = 0, P = 0; const ok = (name, cond, extra) => { cond ? P++ : F++; console.log((cond ? 'PASS ' : 'FAIL ') + name + (extra !== undefined ? '  ' + (typeof extra === 'string' ? extra : JSON.stringify(extra)) : '')); };
const norm = s => String(s).normalize('NFKC').toLowerCase().replace(/[\s　「」『』（）()\[\]【】〈〉《》、。，．・,.!！?？:：;；"'“”‘’〜~ー\-－—…]/g, '');
async function mk(b){ const c = await b.newContext({ ...devices['iPhone 13'] });
  await c.route('https://unpkg.com/**', r => r.fulfill({ path: path.join(NM, 'mqtt/dist/mqtt.min.js'), contentType:'application/javascript' }));
  await c.route('https://cdn.jsdelivr.net/**', r => r.fulfill({ path: path.join(NM, 'qrcode-generator/qrcode.js'), contentType:'application/javascript' }));
  const p = await c.newPage(); p.errs = []; p.on('pageerror', e => { p.errs.push(e.message); console.log('PAGEERROR', e.message); }); return p; }
async function playCpu(p, n, lv){
  await p.click('#b-demo'); await p.waitForSelector('#s-lobby:not([hidden])'); await sleep(300);
  await p.click('#l-set'); await sleep(400); await p.click('#l-count-seg button[data-n="' + n + '"]'); await sleep(150);
  await p.click('#l-cpu-seg button[data-lv="' + lv + '"]'); await sleep(150); await p.click('#sh-genre [data-close]'); await sleep(300);
  const lvSet = await p.evaluate(() => window.__hb.host().cpuLv);
  await p.click('#b-start'); await p.waitForSelector('#s-game:not([hidden])');
  let qs = 0, cpuOk = 0, cpuAns = 0;
  for(let r = 0; r < n + 4; r++){
    if(await p.evaluate(() => window.__hb.host().phase) !== 'game') break;
    await p.waitForFunction(() => { const g = window.__hb.host().game; return !g || (g.q && (document.querySelectorAll('#g-choices button:not([disabled])').length >= 3 || !window.__hb.host().players.get('host').alive)); }, null, { timeout: 25000 }).catch(() => {});
    const a = await p.evaluate(() => { const g = window.__hb.host().game; return g && g.q ? g.q.answer : null; }); if(a == null) break;
    qs++;
    await p.evaluate(a => { const b = document.querySelectorAll('#g-choices button')[(a + 1) % 4]; if(b && !b.disabled) b.click(); }, a);   // 人間はわざとまちがえて、CPUだけで戦わせる
    await p.waitForFunction(() => !!document.querySelector('#g-card .ansbox') || window.__hb.host().phase !== 'game', null, { timeout: 30000 });
    const res = await p.evaluate(() => window.__hb.view().game && window.__hb.view().game.res);
    if(res){ for(const [id, c] of Object.entries(res.answers)) if(id.startsWith('cpu')){ cpuAns++; if(c === res.answer) cpuOk++; } }
    await p.waitForFunction(r => { const g = window.__hb.host().game; return !g || window.__hb.host().phase !== 'game' || g.r > r; }, await p.evaluate(() => window.__hb.host().game ? window.__hb.host().game.r : 99), { timeout: 20000 }).catch(() => {});
  }
  await p.waitForSelector('#s-end:not([hidden])', { timeout: 40000 }).catch(() => {});
  const end = await p.evaluate(() => [...document.querySelectorAll('main>section')].find(s => !s.hidden).id);
  await p.click('#b-home').catch(() => {}); await p.evaluate(() => { const b = [...document.querySelectorAll('#s-end button')].find(x => /部屋を出る/.test(x.textContent)); b && b.click(); }); await sleep(600);
  return { lvSet, qs, end, rate: cpuAns ? cpuOk / cpuAns : 0 };
}
(async () => {
  // ===== 1. データの検査（正規データ） =====
  const D = JSON.parse(fs.readFileSync(SITE + 'data/questions_v8.json', 'utf8')).questions;
  const REQ = ['id', 'category_id', 'category', 'group', 'difficulty', 'question', 'options', 'correct_index', 'answer', 'explanation', 'media', 'review_status'];
  ok('正規データ：必須フィールドがすべてある（' + D.length + '問）', D.every(q => REQ.every(k => k in q)));
  ok('選択肢は4つで重複なし', D.every(q => q.options.length === 4 && new Set(q.options.map(norm)).size === 4));
  ok('正解の位置と答えが一致', D.every(q => q.options[q.correct_index] === q.answer));
  ok('問題IDは重複なし', new Set(D.map(q => q.id)).size === D.length);
  ok('問題文は重複なし（全角半角・空白・記号のゆれをそろえて比較）', new Set(D.map(q => norm(q.question))).size === D.length);
  ok('解説が全問にある', D.every(q => typeof q.explanation === 'string' && q.explanation.length > 0));
  ok('画像つきの問題は入っていない', D.every(q => !q.media));
  const dump = JSON.parse(fs.readFileSync('/home/claude/qdump.json', 'utf8'));
  const ex = new Set(); for(const l of Object.values(dump.bank)) for(const [q] of l) ex.add(norm(q)); for(const l of Object.values(dump.tables)) for(const [q] of l) ex.add(norm(q));
  ok('既存の問題（v7の BANK と表の問題）と重複しない', D.every(q => !ex.has(norm(q.question))));
  const PH = JSON.parse(fs.readFileSync(SITE + 'data/photo_quiz_v8.json', 'utf8')).questions;
  ok('写真クイズ125問はすべて素材待ち（asset_path なし）', PH.length === 125 && PH.every(q => q.media.asset_path === null && q.media.status === 'pending_asset_and_license_review'));
  ok('写真の予定ファイル名に答えが入っていない', PH.every(q => /^img-\d{4}\.webp$/.test(q.media.planned_file) && !q.options.some(o => q.media.planned_file.includes(o))));

  const b = await chromium.launch();
  const p = await mk(b); await p.goto(BASE); await p.evaluate(() => window.__hb.quickLogin('ぶいはち'));
  // ===== 2. ジャンルと出題 =====
  const G = await p.evaluate(() => window.__genres());
  const old = dump.genres, oldKeys = Object.keys(old);
  ok('既存のジャンルはすべて残っている（' + oldKeys.length + '）', oldKeys.every(k => G.GENRES[k] === old[k]));
  ok('既存のジャンルの問題数はへっていない', Object.entries(dump.bank).every(([g, l]) => (G.counts[g] || 0) >= l.length));
  ok('既存のグループ（ランク戦の区分）の順番と中身は残っている', dump.groups.every((gr, i) => G.GENRE_GROUPS[i][0] === gr[0] && gr[1].every(k => G.GENRE_GROUPS[i][1].includes(k))));
  ok('新しいグループ：みんなで・家族／社会で役立つ教養／作品ファン向け', ['みんなで・家族', '社会で役立つ教養', '作品ファン向け'].every(l => G.GENRE_GROUPS.some(x => x[0] === l)));
  ok('どのジャンルもどこかのグループに入っている', Object.keys(G.GENRES).filter(k => !G.GENRE_GROUPS.some(x => x[1].includes(k))).length === 0, Object.keys(G.GENRES).filter(k => !G.GENRE_GROUPS.some(x => x[1].includes(k))));
  ok('写真クイズのジャンルは、公開できる素材がないので出さない', !G.GENRES.photo);
  ok('国旗がふえた（' + dump.flags + ' → ' + G.flags + '）', G.flags > dump.flags + 30);
  ok('ランク戦の区分も新しいグループのぶん増える', G.rq.length === G.GENRE_GROUPS.length + 1, G.rq.join(','));
  const byQ = new Map(D.map(q => [q.question, q]));
  let bad = [], cnt = 0, v8 = 0;
  for(const g of Object.keys(G.GENRES)){
    const qs = await p.evaluate(g => window.__qtest(g, 25), g);
    for(const q of qs){
      cnt++;
      if(q.choices.length !== 4 || new Set(q.choices).size !== 4 || !(q.answer >= 0 && q.answer < 4)) bad.push(g + ':' + q.prompt);
      const src = byQ.get(q.prompt);
      if(src){ v8++; if(q.choices[q.answer] !== src.answer || q.qid !== src.id || q.ex !== src.explanation) bad.push('v8 ' + g + ':' + q.prompt); }
    }
  }
  ok('全ジャンルで出題（' + cnt + '問・うち追加データ ' + v8 + '問）：選択肢4つ・重複なし・正解の位置が正しい・IDと解説つき', bad.length === 0, bad.slice(0, 5));
  const fl = await p.evaluate(() => window.__qtest('flag', 80));
  ok('国旗の問題：新しい国旗も出る（80問で' + new Set(fl.map(q => q.flag)).size + '種類）', new Set(fl.map(q => q.flag)).size >= 60);
  const vv = await p.evaluate(() => window.__qtest('vivant', 30));
  ok('問題が少ないジャンル（VIVANT 13問）で30問出しても止まらず、13問までは重複しない', vv.length === 30 && new Set(vv.slice(0, 13).map(q => q.prompt)).size === 13);
  const cap = await p.evaluate(() => window.__qtest('capital', 200));
  ok('表から作るジャンル（首都）でも追加の問題がまざる', cap.some(q => q.qid));

  // ===== 3. 答えと解説が、結果の前にゲストに届かない =====
  const A = await mk(b), B = await mk(b);
  for(const [x, n] of [[A, 'ほすと'], [B, 'げすと']]){ await x.goto(BASE); await x.evaluate(n => window.__hb.quickLogin(n), n); }
  await A.click('#b-friend'); await sleep(350); await A.click('#b-create'); await A.waitForSelector('#s-lobby:not([hidden])');
  const code = await A.textContent('#l-code');
  await B.click('#b-friend'); await sleep(350); await B.fill('#code', code); await B.click('#b-join'); await B.waitForSelector('#s-lobby:not([hidden])');
  await Promise.all([A.click('#b-bump'), B.click('#b-bump')]); await sleep(1800);
  for(const x of [A, B]) await x.evaluate(() => { document.getElementById('birth').hidden = true; });
  await A.evaluate(() => { const H = window.__hb.host(); H.genres = new Set(['civics', 'kimetsu', 'bizmath', 'flag']); H.count = 5; });
  await B.evaluate(() => { window.__pk = []; const orig = WebSocket.prototype.send; });
  await A.click('#b-start'); await B.waitForSelector('#s-game:not([hidden])');
  let leak = [], seenQ = 0, resEx = 0;
  for(let r = 0; r < 5; r++){
    await B.waitForFunction(r => { const v = window.__hb.view().game; return v && v.q && v.q.r === r; }, r, { timeout: 20000 }).catch(() => {});
    const q = await B.evaluate(() => window.__hb.view().game.q);
    if(!q) break; seenQ++;
    if('answer' in q || 'ex' in q || 'atext' in q) leak.push(Object.keys(q).join(','));
    await B.waitForFunction(() => document.querySelectorAll('#g-choices button:not([disabled])').length >= 3, null, { timeout: 15000 }).catch(() => {});
    for(const x of [A, B]) await x.evaluate(() => { const bs = document.querySelectorAll('#g-choices button'); bs[0] && bs[0].click(); });
    await B.waitForFunction(r => { const v = window.__hb.view().game; return v && v.res && v.res.r === r; }, r, { timeout: 20000 }).catch(() => {});
    const res = await B.evaluate(() => window.__hb.view().game.res);
    if(res && res.qid && res.ex) resEx++;
  }
  ok('問題の配信（q）に正解・解説が入っていない（' + seenQ + '問）', seenQ === 5 && !leak.length, leak);
  ok('結果（res）で初めて問題IDと解説が届く', resEx >= 3, resEx);
  await Promise.all([A, B].map(x => x.waitForSelector('#s-end:not([hidden])', { timeout: 40000 }).catch(() => {})));

  // ===== 4. 写真：読めないときはノーカウントで次へ =====
  const C = await mk(b); await C.goto(BASE); await C.evaluate(() => window.__hb.quickLogin('しゃしん'));
  await C.click('#b-demo'); await C.waitForSelector('#s-lobby:not([hidden])'); await sleep(300);
  await C.evaluate(() => { window.__dbgImg = 'assets/photo/img-9999.webp'; });
  await C.click('#b-start'); await C.waitForSelector('#s-game:not([hidden])');
  await C.waitForFunction(() => { const v = window.__hb.view().game; return v && v.res && v.res.r === 0; }, null, { timeout: 20000 }).catch(() => {});
  const sk = await C.evaluate(() => { const v = window.__hb.view().game; return { skip: v.res && v.res.skip, hp: [...window.__hb.host().players.values()].map(p => p.hp), txt: document.getElementById('g-card').textContent }; });
  ok('写真が読めない → その問題はノーカウント（ダメージなし）', sk.skip === 1 && sk.hp.every(h => h === 110) && /ノーカウント/.test(sk.txt), sk);
  await C.waitForFunction(() => { const v = window.__hb.view().game; return v && v.q && v.q.r === 1; }, null, { timeout: 20000 }).catch(() => {});
  ok('次の問題に進む', await C.evaluate(() => window.__hb.view().game.q.r === 1));
  await C.evaluate(() => { window.__hb.host().game.total = 2; });
  await C.waitForSelector('#s-end:not([hidden])', { timeout: 60000 }).catch(() => {});

  // ===== 5. CPU対戦：5・10・15問と、CPUの強さ3段階 =====
  const R = {};
  for(const [n, lv] of [[5, 'easy'], [10, 'normal'], [15, 'hard']]){
    const E = await mk(b); await E.goto(BASE); await E.evaluate(() => window.__hb.quickLogin('しーぴー'));
    R[lv] = await playCpu(E, n, lv);
    ok('CPU対戦 ' + n + '問・CPU「' + lv + '」が最後まで終わる', R[lv].lvSet === lv && R[lv].end === 's-end' && !E.errs.length, R[lv]);
  }
  ok('CPUの正解率が 強さ順（よわい < つよい）', R.easy.rate < R.hard.rate, [R.easy.rate, R.normal.rate, R.hard.rate].map(x => x.toFixed(2)).join(' / '));
  ok('ページのエラーなし', !p.errs.length && !A.errs.length && !B.errs.length && !C.errs.length);
  console.log('\n' + P + ' passed, ' + F + ' failed');
  await b.close();
})();
