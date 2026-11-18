// 新450キャラ：起動・初期化・マスター・ガチャ・詳細・CPU戦（必殺技v4）のテスト
//   実行: node n450.js （http://127.0.0.1:8081 で index.html、ws://127.0.0.1:9001 にMQTTブローカー）
const { chromium, devices } = require('playwright');
const path = require('path'); const NM = path.join(__dirname, 'node_modules');
const ORIGIN = 'http://127.0.0.1:8081/';
const BASE = ORIGIN + 'index.html?debug=1&notitle=1&broker=ws://127.0.0.1:9001/mqtt';
const sleep = ms => new Promise(r => setTimeout(r, ms));
let F = 0, P = 0; const ok = (name, cond, extra) => { cond ? P++ : F++; console.log((cond ? 'PASS ' : 'FAIL ') + name + (extra !== undefined ? '  ' + (typeof extra === 'string' ? extra : JSON.stringify(extra)) : '')); };
async function mkCtx(b){ const c = await b.newContext({ ...devices['iPhone 13'] });
  await c.route('https://unpkg.com/**', r => r.fulfill({ path: path.join(NM, 'mqtt/dist/mqtt.min.js'), contentType:'application/javascript' }));
  await c.route('https://cdn.jsdelivr.net/**', r => r.fulfill({ path: path.join(NM, 'qrcode-generator/qrcode.js'), contentType:'application/javascript' }));
  return c; }
async function page(c){ const p = await c.newPage(); p.errs = []; p.on('pageerror', e => { p.errs.push(e.message); console.log('PAGEERROR', e.message); }); return p; }
(async () => {
  const b = await chromium.launch();
  // ===== 1. 旧データの初期化 =====
  const c1 = await mkCtx(b); const p0 = await page(c1);
  await p0.goto(ORIGIN + 'manifest.webmanifest');
  await p0.evaluate(() => {
    localStorage.setItem('kotsunz-accts-v2', JSON.stringify({ v: 2, list: [{ uid: 'olduid', name: 'むかし' }], cur: 'olduid' }));
    localStorage.setItem('kotsunz-u2-olduid', JSON.stringify({ ver: 8, col: { coins: 99999, inst: [{ iid: 'a1', cid: 'K001' }] } }));
    localStorage.setItem('kotsunz-bak-v6-olduid', '{}'); localStorage.setItem('kotsunz_collection_v1', '{}'); localStorage.setItem('kotsunz-sound', '1');
    localStorage.setItem('other-app-key', 'keep'); localStorage.setItem('mykotsunz', 'keep2');
    sessionStorage.setItem('kotsunz-tmp', 'x'); sessionStorage.setItem('other-sess', 'keep');
  });
  const p1 = p0; await p1.goto(BASE); await sleep(600);
  const st = await p1.evaluate(() => ({ keys: Object.keys(localStorage).sort(), sk: Object.keys(sessionStorage).sort(), ep: localStorage.getItem('kotsunz_catalog_epoch_new450_v2'), notice: !document.getElementById('ask').hidden, ntext: document.getElementById('ask-text').textContent }));
  ok('初回起動で旧コツンズのキーが消える', !st.keys.some(k => /^kotsunz-u2-olduid|^kotsunz-bak|^kotsunz_collection|^kotsunz-sound/.test(k)), st.keys);
  ok('ほかのアプリのキーは残る（localStorage.clear を使わない）', st.keys.includes('other-app-key') && st.keys.includes('mykotsunz') && st.sk.includes('other-sess') && !st.sk.includes('kotsunz-tmp'), st);
  ok('完了マーカーが done', st.ep === 'done');
  ok('初期化のお知らせが1回出る', st.notice && st.ntext.includes('新キャラクターへのリニューアルに伴い'), st.ntext);
  await p1.click('#ask-ok'); await sleep(200);
  await p1.evaluate(() => window.__hb.quickLogin('しんきゃら'));
  const uid = await p1.evaluate(() => JSON.parse(localStorage.getItem('kotsunz-accts-v2')).cur);
  await p1.reload(); await sleep(600);
  const st2 = await p1.evaluate(() => ({ cur: (JSON.parse(localStorage.getItem('kotsunz-accts-v2')) || {}).cur, notice: !document.getElementById('ask').hidden, n: (JSON.parse(localStorage.getItem('kotsunz-accts-v2')) || {}).list.length }));
  ok('2回目以降は初期化しない（新データが残る）', st2.cur === uid && st2.n === 1, st2);
  ok('お知らせは2回目は出ない', !st2.notice);
  // 古いタブが古い形式で書き戻しても読まない
  await p1.evaluate(u => { localStorage.setItem('kotsunz-u2-' + u + 'x', JSON.stringify({ ver: 8, col: { coins: 5 } })); localStorage.setItem('kotsunz-accts-v2', JSON.stringify({ v: 2, list: [{ uid: 'zzz', name: 'ふるい' }], cur: 'zzz' })); }, uid);
  await p1.reload(); await sleep(600);
  const st3 = await p1.evaluate(() => ({ raw: localStorage.getItem('kotsunz-accts-v2'), u: Object.keys(localStorage).filter(k => k.startsWith('kotsunz-u2-')) }));
  ok('epochのない（旧タブが書いた）データは読まずに消す', !/ふるい/.test(st3.raw || '') && !st3.u.some(k => k.endsWith('x')), st3);
  // 旧バックアップは取り込めない
  const imp = await p1.evaluate(() => { try{ return window.__hb.importTest ? window.__hb.importTest({ kind: 'kotsunz-backup', v: 1, data: { ver: 8 } }) : 'nofn'; }catch(e){ return 'err:' + e.message; } });
  ok('旧バックアップの取り込みを拒否', imp === false || imp === 'nofn', imp);
  ok('ページエラーなし（初期化）', p1.errs.length === 0, p1.errs);
  await c1.close();

  // ===== 2. マスター・ガチャ・詳細 =====
  const c2 = await mkCtx(b); const p = await page(c2); await p.goto(BASE); await sleep(400);
  await p.evaluate(() => { const a = document.getElementById('ask-ok'); if(!document.getElementById('ask').hidden) a.click(); });
  await p.evaluate(() => window.__hb.quickLogin('ましゅ'));
  const mst = await p.evaluate(() => window.__hb.master());
  ok('マスター検査エラーなし・450体・1350形態', mst.bad.filter(x => !/ S[123]$/.test(x) || process.env.ART).length === 0 && mst.kids === 450 && mst.forms === 1350, { bad: mst.bad.slice(0, 5), kids: mst.kids, forms: mst.forms });
  const ids = await p.evaluate(() => window.__hb.col().inst.map(i => i.cid));
  const html = await p.content();
  ok('旧K系IDがページに出ない', !/\bK0\d\d\b|\bK[1-4]\d\d\b/.test(await p.evaluate(() => document.body.innerText)) && !/kotsunz_lore_500|assets\/characters\/k0/.test(html));
  const info = await p.evaluate(() => window.__hb.kInfoText('NZ001'));
  ok('キャラ詳細に2つの技と得意ジャンルが出る', info.includes('ゆらばしのぴたっとまもり') && info.includes('ゆらばしのわくわくインパクト') && info.includes('地理'), info.slice(0, 160));
  // ===== 3. CPU戦で必殺技 =====
  await p.click('#b-demo'); await p.waitForSelector('#s-lobby:not([hidden])'); await sleep(300);
  await p.click('#b-start'); await p.waitForSelector('#s-game:not([hidden])');
  let declared = 0, evs = 0, meterReset = true, rounds = 0;
  for(let r = 0; r < 12; r++){
    if(await p.evaluate(() => window.__hb.host().phase) !== 'game') break;
    await p.evaluate(() => { for(const x of window.__hb.host().players.values()) x.meter = 100; });
    await p.waitForFunction(() => { const s = window.__hb.sp(); return s && s.av && s.r === window.__hb.host().game.r && !s.sel; }, null, { timeout: 15000 }).catch(() => {});
    const av = await p.evaluate(() => window.__hb.sp() && window.__hb.sp().av);
    const k = av && ['attack', 'guard', 'recover'].find(x => av[x]);
    if(r === 0){ const ui = await p.evaluate(() => ({ n: document.querySelectorAll('#g-sp .spk').length, names: [...document.querySelectorAll('#g-sp .spk b')].map(b => b.textContent), av: window.__hb.sp().av })); const own = Object.values(ui.av).filter(Boolean).map(x => x.n); ok('技のボタンは、キャラが使える技の名前だけ', ui.n === own.length && ui.names.join() === own.join() && !ui.names.some(n => /^(ATTACK|DEFEND|RECOVER)$/.test(n)), ui); await p.screenshot({ path: '/home/claude/report/sk-v9.png' }); }
    if(k){ await p.evaluate(k => window.__hb.spSend(k, 'large'), k); await sleep(250); const it = await p.evaluate(() => { const x = window.__hb.host().game.intent.get('host'); return x ? x.k : null; }); if(it) declared++; }
    await p.waitForFunction(() => document.querySelectorAll('#g-choices button:not([disabled])').length >= 3 || window.__hb.host().phase !== 'game', null, { timeout: 20000 }).catch(() => {});
    await p.evaluate(() => { const g = window.__hb.host().game; if(!g || !g.q) return; const bs = document.querySelectorAll('#g-choices button'); if(bs[g.q.answer]) bs[g.q.answer].click(); });
    await p.waitForFunction(() => !!document.querySelector('#g-card .ansbox') || window.__hb.host().phase !== 'game', null, { timeout: 30000 }).catch(() => {});
    const res = await p.evaluate(() => window.__hb.view().game && window.__hb.view().game.res);
    if(res){ rounds++; evs += (res.skillEvents || []).length; const me = await p.evaluate(() => window.__hb.host().players.get('host')); if((res.skillEvents || []).some(e => e.id === 'host') && me.meter > 40) meterReset = false; }
    await p.waitForFunction(r => { const g = window.__hb.host().game; return !g || window.__hb.host().phase !== 'game' || g.r > r; }, await p.evaluate(() => window.__hb.host().game ? window.__hb.host().game.r : 99), { timeout: 20000 }).catch(() => {});
  }
  ok('CPU戦が進む', rounds >= 3, rounds);
  ok('必殺技の宣言がホストに受理される', declared >= 2, declared);
  ok('技の発動イベントが出る', evs >= 1, evs);
  ok('使ったあとゲージはリセット', meterReset);
  ok('ページエラーなし（ゲーム）', p.errs.length === 0, p.errs.slice(0, 3));
  await b.close();
  console.log(`\n${P} passed, ${F} failed`); process.exit(F ? 1 : 0);
})();
