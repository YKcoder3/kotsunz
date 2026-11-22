// 10人＋通信が悪い状態のテスト：受けとりもれ（DROP%）・とちゅうで電波が切れる人・裏に回す人
//   実行: DROP=0.15 PORT=8082 node chaos10.js
const { chromium, devices } = require('playwright');
const path = require('path'); const NM = path.join(__dirname, 'node_modules');
const PORT = process.env.PORT || '8082', DROP = +(process.env.DROP || .15), N = +(process.env.N || 10), ROUNDS = +(process.env.R || 8);
const BASE = 'http://127.0.0.1:' + PORT + '/index.html?debug=1&notitle=1&broker=ws://127.0.0.1:9001/mqtt';
const sleep = ms => new Promise(r => setTimeout(r, ms));
let F = 0, P_ = 0; const ok = (n, c, x) => { c ? P_++ : F++; console.log((c ? 'PASS ' : 'FAIL ') + n + (x !== undefined ? '  ' + JSON.stringify(x) : '')); };
async function mk(browser, drop){
  const c = await browser.newContext({ ...devices['iPhone 13'] });
  await c.route('https://unpkg.com/**', r => r.fulfill({ path: path.join(NM, 'mqtt/dist/mqtt.min.js'), contentType:'application/javascript' }));
  await c.route('https://cdn.jsdelivr.net/**', r => r.fulfill({ path: path.join(NM, 'qrcode-generator/qrcode.js'), contentType:'application/javascript' }));
  // 受けとるメッセージを DROP の割合で落とす（電波が悪い状態のまね）
  await c.addInitScript(drop => { window.__drop = drop; let real; Object.defineProperty(window, 'mqtt', { configurable: true, get(){ return real; }, set(v){
    real = Object.assign({}, v, { connect: (...a) => { const cl = v.connect(...a); const on = cl.on.bind(cl); cl.on = (ev, fn) => ev === 'message' ? on(ev, (t, b, pk) => { if(Math.random() < window.__drop) return; fn(t, b, pk); }) : on(ev, fn); return cl; } }); } }); }, drop);
  const p = await c.newPage(); p.errs = []; p.on('pageerror', e => { p.errs.push(e.message); }); p.ctx = c; return p;
}
const view = p => p.evaluate(() => { const g = window.__hb.view().game; const sc = [...document.querySelectorAll('main>section')].find(s => !s.hidden).id; return { sc, r: g ? g.r : -1, hp: g ? [...g.players.values()].map(x => x.hp).join(',') : '' }; });
(async () => {
  const browser = await chromium.launch();
  const P = []; for(let i = 0; i < N; i++) P.push(await mk(browser, i === 0 ? DROP * .5 : DROP));
  const host = P[0];
  await host.goto(BASE); await host.evaluate(n => window.__hb.quickLogin(n), 'ホスト'); await host.click('#b-friend'); await sleep(400); await host.click('#b-create');
  await host.waitForSelector('#s-lobby:not([hidden])', { timeout: 15000 });
  const code = await host.textContent('#l-code');
  for(let i = 1; i < N; i++){ await P[i].goto(BASE + '&room=' + code); await P[i].evaluate(n => window.__hb.quickLogin(n), 'P' + i); await P[i].click('#b-join-link'); }
  const joined = await Promise.all(P.slice(1).map(p => p.waitForSelector('#s-lobby:not([hidden])', { timeout: 30000 }).then(() => true).catch(() => false)));
  await sleep(2500);
  const cnt = await host.textContent('#l-count');
  for(let i = 1; i < N; i++) if(!joined[i - 1]) console.log('P' + i, await P[i].evaluate(() => [...document.querySelectorAll('main>section')].find(s => !s.hidden).id + ' / ' + document.getElementById('home-status').textContent));
  ok('通信が悪くても全員が部屋に入れる', joined.every(Boolean) && cnt.startsWith(N + ' '), { joined: joined.filter(Boolean).length + 1, cnt });
  // コツン（ペアで）
  for(let i = 0; i + 1 < N; i += 2){ await Promise.all([P[i].click('#b-bump'), P[i + 1].click('#b-bump')]); await sleep(1100); for(const p of [P[i], P[i + 1]]) if(await p.$eval('#birth', e => !e.hidden)) await p.click('#b-birth-ok'); }
  if(N % 2){ await Promise.all([P[N - 1].click('#b-bump'), P[0].click('#b-bump')]); await sleep(1100); for(const p of [P[N - 1], P[0]]) if(await p.$eval('#birth', e => !e.hidden)) await p.click('#b-birth-ok'); }
  for(let k = 0; k < 6 && await host.$eval('#b-start', e => e.disabled); k++) await sleep(1000);
  ok('全員コツンしてスタートできる', !(await host.$eval('#b-start', e => e.disabled)), await host.textContent('#l-status'));
  await host.click('#l-set'); await sleep(450); await host.click('#l-count-seg button[data-n="10"]'); await sleep(300); await host.click('#sh-genre [data-close]'); await sleep(400);
  await host.click('#b-start');
  // 全員、問題が出たら自分のタイマーで答える（ページの中で自動）
  await Promise.all(P.map((p, i) => p.evaluate(i => { setInterval(() => { const g = window.__hb.view().game; if(!g || !g.q) return; const bs = [...document.querySelectorAll('#g-choices button')]; if(bs.length < 4 || bs.some(b => b.classList.contains('picked') || b.classList.contains('sel')) || window.__ansR === g.q.r) return; if(!g.shown) return; window.__ansR = g.q.r; const k = (i % 4 === 3) ? 1 : 0; setTimeout(() => { const b = bs[k]; if(b && !b.disabled) b.click(); }, 300 + i * 250); }, 120); }, i)));
  let mism = 0, stuck = 0, rounds = 0;
  for(let r = 0; r < ROUNDS; r++){
    if(await host.evaluate(() => window.__hb.host().phase) !== 'game') break;
    const hr = await host.evaluate(() => window.__hb.host().game && window.__hb.host().game.r);
    // とちゅうで電波が切れる（3問目に2人、5問目に1人）
    if(r === 2){ for(const i of [2, 5]) P[i].ctx.setOffline(true); setTimeout(() => { P[2].ctx.setOffline(false); P[5].ctx.setOffline(false); }, 5000); }
    if(r === 4){ P[7].ctx.setOffline(true); setTimeout(() => P[7].ctx.setOffline(false), 8000); }
    await host.waitForFunction(r => { const g = window.__hb.host().game; return !g || window.__hb.host().phase !== 'game' || g.r > r; }, hr, { timeout: 40000 }).catch(() => {});
    rounds++;
    await sleep(2600);   // 結果のあと、心拍で追いつく時間
    const hv = await view(host); const gv = await Promise.all(P.slice(1).map(view));
    const bad = gv.map((v, i) => ({ i: i + 1, ...v })).filter(v => v.sc === 'game' && hv.sc === 'game' && (v.r !== hv.r || v.hp !== hv.hp));
    const off = gv.map((v, i) => ({ i: i + 1, ...v })).filter(v => hv.sc === 'game' && v.sc !== 'game');
    mism += bad.length; stuck += off.length;
    console.log('R' + (r + 1), 'host r=' + hv.r, 'hp=' + hv.hp, '| ずれ:', bad.map(b => 'P' + b.i + '(r' + b.r + ')').join(' ') || 'なし', '| ゲーム画面にいない:', off.map(b => 'P' + b.i + ':' + b.sc).join(' ') || 'なし');
  }
  const ends = await Promise.all(P.map(p => p.waitForSelector('#s-end:not([hidden])', { timeout: 60000 }).then(() => true).catch(() => false)));
  ok('全員が最後の結果画面まで行く', ends.every(Boolean), ends.map((e, i) => e ? '' : 'P' + i).filter(Boolean));
  const wins = await Promise.all(P.map(p => p.textContent('#e-win').catch(() => '')));
  ok('全員の画面で優勝者が同じ', wins.every(w => w.split('あなた')[0] === wins[0].split('あなた')[0]), wins.map(w => w.replace(/\s+/g, ' ').slice(0, 20)));
  ok('結果のあと2.6秒で、全員の問題番号とHPがホストとそろう', mism === 0, { mism, rounds });
  ok('ゲームのとちゅうで画面がずれたままの人がいない', stuck === 0, { stuck });
  const errs = P.flatMap(p => p.errs); ok('ページのエラーなし', errs.length === 0, errs.slice(0, 3));
  await browser.close(); console.log(`\n${P_} passed, ${F} failed`); process.exit(F ? 1 : 0);
})();
