// v7（2026-11-19）全員リセットのテスト
const { chromium, devices } = require('playwright'); const path = require('path'); const NM = path.join(__dirname, 'node_modules');
const ORIGIN = 'http://127.0.0.1:8082/', BASE = ORIGIN + 'index.html?debug=1&notitle=1&broker=ws://127.0.0.1:9001/mqtt';
const sleep = ms => new Promise(r => setTimeout(r, ms));
let F = 0, P = 0; const ok = (n, c, x) => { c ? P++ : F++; console.log((c ? 'PASS ' : 'FAIL ') + n + (x !== undefined ? '  ' + JSON.stringify(x) : '')); };
(async () => {
  const b = await chromium.launch(); const c = await b.newContext({ ...devices['iPhone 13'] });
  await c.route('https://unpkg.com/**', r => r.fulfill({ path: path.join(NM, 'mqtt/dist/mqtt.min.js'), contentType:'application/javascript' }));
  await c.route('https://cdn.jsdelivr.net/**', r => r.fulfill({ path: path.join(NM, 'qrcode-generator/qrcode.js'), contentType:'application/javascript' }));
  const p = await c.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(ORIGIN + 'manifest.webmanifest');
  await p.evaluate(() => { localStorage.setItem('kotsunz-reset', 'v6'); localStorage.setItem('kotsunz-accts-v1', JSON.stringify({ v: 1, list: [{ uid: 'u1', name: 'まえの' }], cur: 'u1' })); localStorage.setItem('kotsunz-hb-u-u1', JSON.stringify({ ver: 6, games: 9, col: { coins: 999 } })); localStorage.setItem('other-app', 'keep'); });
  await p.goto(BASE); await sleep(700);
  const a = await p.evaluate(() => ({ keys: Object.keys(localStorage).sort(), notice: !document.getElementById('ask').hidden, text: document.getElementById('ask-text').textContent }));
  ok('前のアカウント・キャラの記録が消える', !a.keys.includes('kotsunz-hb-u-u1') && !a.keys.includes('kotsunz-accts-v1'), a.keys);
  ok('ほかのサイトの記録は消さない', a.keys.includes('other-app'));
  ok('前の記録があった人に、お知らせが出る', a.notice && /リセットしました/.test(a.text), a.text);
  await p.click('#ask-ok'); await p.evaluate(() => window.__hb.quickLogin('あたらしい')); const uid = await p.evaluate(() => JSON.parse(localStorage.getItem('kotsunz-accts-v1')).cur);
  await p.reload(); await sleep(700);
  const b2 = await p.evaluate(() => ({ cur: (JSON.parse(localStorage.getItem('kotsunz-accts-v1')) || {}).cur, notice: !document.getElementById('ask').hidden }));
  ok('リセットは1回だけ（新しいアカウントは残る）・お知らせも1回だけ', b2.cur === uid && !b2.notice, b2);
  // 開いたままの古いタブが、前の形で書きもどしても読まない
  await p.evaluate(() => localStorage.setItem('kotsunz-accts-v1', JSON.stringify({ v: 1, list: [{ uid: 'u1', name: 'まえの' }], cur: 'u1' })));
  await p.reload(); await sleep(700);
  ok('古いタブが書きもどした前のアカウントは使わない', await p.evaluate(() => !document.body.innerText.includes('まえの')));
  const ctx2 = await b.newContext({ ...devices['iPhone 13'] }); const q = await ctx2.newPage(); await q.goto(BASE); await sleep(700);
  ok('はじめての人にはお知らせを出さない', await q.evaluate(() => document.getElementById('ask').hidden));
  ok('ページのエラーなし', errs.length === 0, errs);
  await b.close(); console.log(`\n${P} passed, ${F} failed`); process.exit(F ? 1 : 0);
})();
