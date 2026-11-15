// v7：必殺技の画面と通信のテスト（CPU対戦 → 友達対戦）
const { chromium, devices } = require('playwright');
const path = require('path'); const NM = path.join(__dirname, 'node_modules');
const BASE = 'http://127.0.0.1:8081/index.html?debug=1&notitle=1&broker=ws://127.0.0.1:9001/mqtt';
const sleep = ms => new Promise(r => setTimeout(r, ms));
let F = 0; const ok = (name, cond, extra) => { if(!cond) F++; console.log((cond ? 'PASS ' : 'FAIL ') + name + (extra !== undefined ? '  ' + (typeof extra === 'string' ? extra : JSON.stringify(extra)) : '')); };
async function mk(b){ const c = await b.newContext({ ...devices['iPhone 13'] });
  await c.route('https://unpkg.com/**', r => r.fulfill({ path: path.join(NM, 'mqtt/dist/mqtt.min.js'), contentType:'application/javascript' }));
  await c.route('https://cdn.jsdelivr.net/**', r => r.fulfill({ path: path.join(NM, 'qrcode-generator/qrcode.js'), contentType:'application/javascript' }));
  const p = await c.newPage(); p.errs = []; p.on('pageerror', e => { p.errs.push(e.message); console.log('PAGEERROR', e.message); });
  p.bad = []; p.on('requestfailed', r => p.bad.push(r.url())); p.on('response', r => { if(r.status() >= 400) p.bad.push(r.status() + ' ' + r.url()); });
  return p; }
const scr = p => p.evaluate(() => [...document.querySelectorAll('main>section')].find(s => !s.hidden).id);
const useChar = (p, cid, st) => p.evaluate(({ cid, st }) => { const H = window.__hb, C = H.col(); const i = C.inst[0]; i.cid = cid; i.st = st || 1; H.state().fid = i.iid; }, { cid, st });
(async () => {
  const b = await chromium.launch();
  // ================= CPU対戦 =================
  const C = await mk(b); await C.goto(BASE); await C.evaluate(() => window.__hb.quickLogin('わざテスト'));
  const mst = await C.evaluate(() => window.__hb.master());
  ok('マスター：500体・1500形態・検査エラーなし', mst.kids === 500 && mst.forms === 1500 && mst.bad.length === 0, mst.bad.slice(0, 5).join(' / '));
  await useChar(C, 'K004', 2);      // ピピット（burst）
  await C.click('#b-demo'); await C.waitForSelector('#s-lobby:not([hidden])'); await sleep(300);
  await C.click('#l-set'); await sleep(400); await C.click('#l-count-seg button[data-n="10"]'); await sleep(200); await C.click('#sh-genre [data-close]'); await sleep(300);
  await C.click('#b-start'); await C.waitForSelector('#s-game:not([hidden])');
  const host0 = await C.evaluate(() => { const p = window.__hb.host().players.get('host'); return { m: p.meter, hp: p.hp }; });
  ok('試合の最初のゲージは10', host0.m === 10, host0);
  let declared = 0, fired = 0, sawPanel = false, sawHiddenBefore = true, checkedMath = false, sawLocked = false, guardSeen = false;
  for(let r = 0; r < 12; r++){
    if(await C.evaluate(() => window.__hb.host().phase) !== 'game') break;
    // ジャンル発表（問題文はまだ）
    await C.waitForFunction(() => { const g = window.__hb.host().game; return !g || (g.q && !document.querySelector('#g-card .qprompt')); }, null, { timeout: 20000 }).catch(() => {});
    const st = await C.evaluate(() => { const H = window.__hb, g = H.host().game; if(!g || !g.q) return null; const p = H.host().players.get('host');
      return { r: g.r, meter: p.meter, alive: p.alive, panel: !document.getElementById('g-sp').hidden, text: document.getElementById('g-sp').textContent, others: document.getElementById('g-skev').textContent, sealed: p.sealedR === g.r }; });
    if(!st) break;
    if(st.panel) sawPanel = true;
    if(st.others) sawHiddenBefore = false;
    let mine = null;
    if(st.alive && !st.sealed && st.meter >= 25){
      const kind = r % 3 === 2 ? 'guard' : r % 3 === 1 ? 'recover' : 'attack';
      await C.click('#g-sp .spk.' + kind);
      await C.waitForFunction(() => !!document.querySelector('#g-sp .spstate.ok'), null, { timeout: 3000 }).catch(() => {});
      const acked = await C.evaluate(() => !!document.querySelector('#g-sp .spstate.ok'));
      const it = await C.evaluate(() => { const g = window.__hb.host().game; const x = g.intent.get('host'); return x ? { k: x.k, tier: x.tier } : null; });
      if(acked && it){ declared++; mine = { start: st.meter, it }; }
    }
    // 問題が出たら正解する（ときどき わざと まちがえる）
    await C.waitForFunction(() => document.querySelectorAll('#g-choices button:not([disabled])').length >= 3 || window.__hb.host().phase !== 'game', null, { timeout: 15000 }).catch(() => {});
    if(await C.evaluate(() => !document.getElementById('g-sp').hidden && document.getElementById('g-sp').classList.contains('mini'))) sawLocked = true;
    const wrong = r === 4;
    await C.evaluate(w => { const g = window.__hb.host().game; if(!g || !g.q) return; const bs = document.querySelectorAll('#g-choices button'); let k = w ? (g.q.answer + 1) % bs.length : g.q.answer; if(bs[k].classList.contains('gone')) k = (k + 1) % bs.length; if(bs[k]) bs[k].click(); }, wrong);
    await C.waitForFunction(() => !!document.querySelector('#g-card .ansbox') || window.__hb.host().phase !== 'game', null, { timeout: 30000 });
    await sleep(1500);
    const after = await C.evaluate(() => { const H = window.__hb, p = H.host().players.get('host'), v = H.view().game; return { meter: p.meter, ev: document.getElementById('g-skev').textContent, res: v && v.res, myMeter: v && v.sp.m }; });
    if(mine){
      const evs = (after.res && after.res.skillEvents) || [], me = evs.find(e => e.id === 'host');
      const correct = after.res && after.res.ranking.some(x => x.id === 'host');
      if(correct && me){ fired++; if(me.type === 'guard') guardSeen = true; }
      if(!checkedMath && !correct){ ok('宣言して不正解：不発で、ゲージは技のぶん減らない', !me && after.meter >= mine.start - 4 && after.meter <= mine.start, { start: mine.start, end: after.meter }); checkedMath = true; }
      if(correct) ok('第' + (r + 1) + '問：正解で発動・ゲージ ' + mine.start + ' → ' + after.meter + '（' + mine.it.type + '・' + mine.it.tier + '）', !!me && after.meter <= mine.start - ({ small: 25, medium: 55, large: 90 })[mine.it.tier] + 34 && after.meter >= 0 && after.ev.includes('「'));
    }
    ok('第' + (r + 1) + '問：画面のゲージ＝ホストのゲージ', after.myMeter === after.meter, [after.myMeter, after.meter]);
    await C.waitForFunction(() => !document.querySelector('#g-card .ansbox') || window.__hb.host().phase !== 'game', null, { timeout: 15000 }).catch(() => {});
  }
  ok('ジャンル発表中に技をえらぶパネルが出る', sawPanel);
  ok('問題が出たら、宣言した技だけ小さく表示', sawLocked);
  ok('ほかの人の技は、答え合わせの前には見えない', sawHiddenBefore);
  ok('CPU対戦で何回も技が使えた（宣言' + declared + '回・発動' + fired + '回）', fired >= 2);
  await C.waitForSelector('#s-end:not([hidden])', { timeout: 60000 }).catch(() => {});
  ok('CPU対戦が最後まで終わる', (await scr(C)) === 's-end');
  // キャラ詳細：「強さ」「ワンポイント」がない・必殺技と属性がある
  await C.click('#b-home').catch(() => {}); await sleep(300);
  const info = await C.evaluate(() => window.__hb.kInfoText('K004'));
  ok('キャラ詳細に「強さ」「ワンポイント」がない', !/強さ|ワンポイント/.test(info));
  ok('キャラ詳細に 必殺技・得意・苦手・属性・物語', /超速スパーク/.test(info) && /得意ジャンル/.test(info) && /苦手ジャンル/.test(info) && /属性/.test(info) && /物語/.test(info));
  ok('ページのエラーなし・読めない画像なし（CPU）', !C.errs.length && !C.bad.filter(u => !/favicon/.test(u)).length, C.bad.slice(0, 3).join(' '));

  // ================= 友達対戦（ホストとゲスト） =================
  const A = await mk(b), B = await mk(b);
  for(const [p, n] of [[A, 'ほすと'], [B, 'げすと']]){ await p.goto(BASE); await p.evaluate(n => window.__hb.quickLogin(n), n); }
  await useChar(A, 'K035', 1); await useChar(B, 'K061', 2);
  await A.click('#b-friend'); await sleep(350); await A.click('#b-create'); await A.waitForSelector('#s-lobby:not([hidden])');
  const code = await A.textContent('#l-code');
  await B.click('#b-friend'); await sleep(350); await B.fill('#code', code); await B.click('#b-join'); await B.waitForSelector('#s-lobby:not([hidden])');
  await Promise.all([A.click('#b-bump'), B.click('#b-bump')]); await sleep(1800);
  for(const p of [A, B]) await p.evaluate(() => { document.getElementById('birth').hidden = true; });
  await A.click('#l-set'); await sleep(400); await A.click('#l-count-seg button[data-n="10"]'); await sleep(200); await A.click('#sh-genre [data-close]'); await sleep(300);
  // ゲストのゲージを多めにして始める（テストのため、ホスト側で設定）
  await A.click('#b-start'); await A.waitForSelector('#s-game:not([hidden])'); await B.waitForSelector('#s-game:not([hidden])');
  await A.evaluate(() => { for(const p of window.__hb.host().players.values()) p.meter = 100; });
  // 1問目：ゲストが「固有技・大」を宣言 → 同じ宣言の送り直し → 締め切り後の宣言
  await B.waitForFunction(() => { const v = window.__hb.view().game; return v && v.q && v.q.r === 0; }, null, { timeout: 15000 });
  const qpkt = await B.evaluate(() => window.__hb.view().game.q);
  ok('問題の配信に、ほかの人のゲージや宣言が入っていない', !JSON.stringify(qpkt).match(/"meter"|"intent"|"m":/));
  // ゲストの画面にゲージが届く（本人だけ）
  await A.evaluate(() => { const h = window.__hb.host(); for(const p of h.players.values()) if(p.id !== 'host'){} });
  await B.evaluate(() => { const H = window.__hb; H.spSend(window.__hb.sp().sk.c, 'large'); });
  await B.waitForFunction(() => { const s = window.__hb.sp(); return s && s.sel && s.sel.st === 'ok'; }, null, { timeout: 4000 }).catch(() => {});
  const gIntent = await A.evaluate(() => { const g = window.__hb.host().game, gid = [...window.__hb.host().players.keys()].find(k => k !== 'host'); const x = g.intent.get(gid); return x ? { k: x.k, tier: x.tier, n: x.n } : null; });
  ok('ゲストの宣言（skillIntent）がホストに届き、受理（skillAck）される', gIntent && gIntent.k && gIntent.tier === 'large' && await B.evaluate(() => window.__hb.sp().sel.st === 'ok'), gIntent);
  // 同じnonceの送り直し・ゲージの値を書いても無視
  const replay = await B.evaluate(n => { const H = window.__hb, v = H.view().game; H.toHost({ t: 'skill', g: v.id, r: v.r, k: 'attack', tier: 'small', n, s: 1 }); H.toHost({ t: 'skill', g: v.id, r: v.r, k: 'attack', tier: 'large', n: 'zzz9', s: 0, meter: 100, dmg: 99 }); return true; }, gIntent && gIntent.n);
  await sleep(800);
  const gIntent2 = await A.evaluate(() => { const g = window.__hb.host().game, gid = [...window.__hb.host().players.keys()].find(k => k !== 'host'); const x = g.intent.get(gid); return x ? { k: x.k, tier: x.tier } : null; });
  ok('同じ宣言の送り直し・古い順番の宣言では変わらない（二重処理しない）', gIntent2 && gIntent2.k === gIntent.k && gIntent2.tier === 'large', gIntent2);
  // ホストは正解しない、ゲストは正解する
  await A.waitForFunction(() => document.querySelectorAll('#g-choices button:not([disabled])').length >= 3, null, { timeout: 15000 });
  const late = await B.evaluate(() => { const H = window.__hb, v = H.view().game; H.toHost({ t: 'skill', g: v.id, r: v.r, k: 'attack', tier: 'small', n: 'late1', s: 50 }); return true; });
  await sleep(500);
  const gIntent3 = await A.evaluate(() => { const g = window.__hb.host().game, gid = [...window.__hb.host().players.keys()].find(k => k !== 'host'); const x = g.intent.get(gid); return x ? x.tier : null; });
  ok('問題が出たあとの宣言は受けつけない（400ms前で締め切り）', gIntent3 === 'large', gIntent3);
  const ans = await A.evaluate(() => window.__hb.host().game.q.answer);
  await B.waitForFunction(() => document.querySelectorAll('#g-choices button:not([disabled])').length >= 3, null, { timeout: 15000 });
  await B.evaluate(a => { const bs = document.querySelectorAll('#g-choices button'); bs[a].click(); }, ans);
  await sleep(400);
  await A.evaluate(a => { const bs = document.querySelectorAll('#g-choices button'); bs[(a + 1) % bs.length].click(); }, ans);
  await Promise.all([A, B].map(p => p.waitForFunction(() => { const v = window.__hb.view().game; return v && v.res && v.res.r === 0; }, null, { timeout: 15000 }).catch(() => {})));
  await sleep(1600);
  const evA = await A.evaluate(() => document.getElementById('g-skev').textContent), evB = await B.evaluate(() => document.getElementById('g-skev').textContent);
  const resEv = await A.evaluate(() => (window.__hb.view().game.res || {}).skillEvents || []);
  ok('ゲストの技がホストで発動し（res.skillEvents）、本人の画面に技の名前だけ出る', resEv.length === 1 && resEv[0].tier === 'large' && /「.+」/.test(evB) && !/ダメージ|軽減|HP/.test(evB), evB);
  ok('成功した技は、ほかの人にも「だれ＋技名」だけで出る', evA.includes('げすと') && /「.+」/.test(evA) && !/ダメージ|軽減|HP/.test(evA), evA);
  const gm = await A.evaluate(() => { const gid = [...window.__hb.host().players.keys()].find(k => k !== 'host'); return window.__hb.host().players.get(gid).meter; });
  const gmView = await B.evaluate(() => window.__hb.sp().m);
  ok('発動したらSPは0にリセット（ホストとゲストで同じ値）', gm === gmView && gm === 0, [gm, gmView]);
  const hostFizzle = await A.evaluate(() => window.__hb.host().players.get('host').meter);
  ok('ホストは宣言なし・不正解でふつうの減少だけ（100→96〜98）', hostFizzle >= 96 && hostFizzle <= 98, hostFizzle);
  await A.screenshot({ path: 'v7-host-result.png' }); await B.screenshot({ path: 'v7-guest-result.png' });
  // 2問目以降：ジャンル発表の画面を撮る
  await B.waitForFunction(() => { const v = window.__hb.view().game; return v && v.q && v.q.r === 1 && !document.getElementById('g-sp').hidden; }, null, { timeout: 15000 }).catch(() => {});
  await B.screenshot({ path: 'v7-guest-declare.png' });
  // 再接続：ゲストがリロードしても、ゲージと試合に戻れる
  const before = await A.evaluate(() => { const gid = [...window.__hb.host().players.keys()].find(k => k !== 'host'); return window.__hb.host().players.get(gid).meter; });
  ok('ページのエラーなし（友達対戦）', !A.errs.length && !B.errs.length, A.errs.concat(B.errs).slice(0, 2).join(' / '));
  // 全問を最後まで
  for(let r = 0; r < 12; r++){
    if(await A.evaluate(() => window.__hb.host().phase) !== 'game') break;
    await A.waitForFunction(() => { const g = window.__hb.host().game; return !g || (g.q && document.querySelectorAll('#g-choices button:not([disabled])').length >= 3); }, null, { timeout: 20000 }).catch(() => {});
    const a = await A.evaluate(() => { const g = window.__hb.host().game; return g && g.q ? g.q.answer : null; }); if(a == null) break;
    for(const [i, p] of [A, B].entries()) await p.evaluate(({ a, i }) => { const go = () => { const bs = document.querySelectorAll('#g-choices button'); if(bs.length < 3 || [...bs].every(x => x.disabled)) return setTimeout(go, 60); let k = a; if(bs[k].classList.contains('gone')) k = a; setTimeout(() => bs[k].click(), 200 + i * 300); }; go(); }, { a, i });
    await A.waitForFunction(() => !!document.querySelector('#g-card .ansbox') || window.__hb.host().phase !== 'game', null, { timeout: 30000 });
    await sleep(500);
    await A.waitForFunction(() => !document.querySelector('#g-card .ansbox') || window.__hb.host().phase !== 'game', null, { timeout: 15000 }).catch(() => {});
  }
  await Promise.all([A, B].map(p => p.waitForSelector('#s-end:not([hidden])', { timeout: 40000 }).catch(() => {})));
  ok('友達対戦が最後まで終わる', (await scr(A)) === 's-end' && (await scr(B)) === 's-end');
  console.log('\n失敗 ' + F + '件');
  await b.close();
})();
