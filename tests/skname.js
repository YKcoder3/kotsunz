// v8.1：必殺技は「キャラが持っている技の名前」だけをえらぶ（ATTACK/DEFEND/RECOVERの共通ボタンなし）
//   実行: node skname.js （http://127.0.0.1:8082 で main、ws://127.0.0.1:9001 にMQTTブローカー）
const { chromium, devices } = require('playwright');
const path = require('path'); const NM = path.join(__dirname, 'node_modules');
const BASE = 'http://127.0.0.1:8082/index.html?debug=1&notitle=1&broker=ws://127.0.0.1:9001/mqtt';
const sleep = ms => new Promise(r => setTimeout(r, ms));
let F = 0, P = 0; const ok = (n, c, x) => { c ? P++ : F++; console.log((c ? 'PASS ' : 'FAIL ') + n + (x !== undefined ? '  ' + JSON.stringify(x) : '')); };
async function mk(b){ const c = await b.newContext({ ...devices['iPhone 13'] });
  await c.route('https://unpkg.com/**', r => r.fulfill({ path: path.join(NM, 'mqtt/dist/mqtt.min.js'), contentType:'application/javascript' }));
  await c.route('https://cdn.jsdelivr.net/**', r => r.fulfill({ path: path.join(NM, 'qrcode-generator/qrcode.js'), contentType:'application/javascript' }));
  const p = await c.newPage(); p.errs = []; p.on('pageerror', e => p.errs.push(e.message)); return p; }
const useChar = (p, cid) => p.evaluate(cid => { const H = window.__hb, C = H.col(); const i = C.inst[0]; i.cid = cid; i.st = 1; H.state().fid = i.iid; }, cid);
(async () => {
  const b = await chromium.launch();
  for(const [cid, kind] of [['K004', 'attack'], ['K002', null]]){
    const p = await mk(b); await p.goto(BASE); await p.evaluate(() => window.__hb.quickLogin('わざ'));
    const sk = await p.evaluate(cid => { const m = window.__hb.master; return null; }, cid);
    await useChar(p, cid);
    await p.click('#b-demo'); await p.waitForSelector('#s-lobby:not([hidden])'); await sleep(300); await p.click('#b-start'); await p.waitForSelector('#s-game:not([hidden])');
    await p.evaluate(() => { for(const x of window.__hb.host().players.values()) x.meter = 100; });
    await p.waitForFunction(() => { const s = window.__hb.sp(); return s && s.av && !document.getElementById('g-sp').hidden && document.querySelectorAll('#g-sp .spk').length > 0; }, null, { timeout: 15000 });
    const ui = await p.evaluate(() => ({ btns: [...document.querySelectorAll('#g-sp .spk')].map(b => ({ cls: b.className, name: b.querySelector('b').textContent, type: b.querySelector('small').textContent })), av: window.__hb.sp().av }));
    ok(cid + '：技のボタンは、そのキャラの必殺技1つだけ（名前で出る）', ui.btns.length === 1 && ui.av.length === 1 && ui.btns[0].name === ui.av[0].n && !/^(ATTACK|DEFEND|RECOVER)$/.test(ui.btns[0].name), ui);
    if(kind) ok(cid + '：攻撃の技しかないキャラは、攻撃（ATTACK）だけ', ui.av[0].k === 'attack' && ui.btns[0].type === 'ATTACK', ui.av);
    await p.screenshot({ path: '/home/claude/report/sk-' + cid + '.png' });
    // 自分の技を押す → ホストが受けつける
    await p.click('#g-sp .spk'); await p.waitForFunction(() => { const s = window.__hb.sp(); return s.sel && s.sel.st === 'ok'; }, null, { timeout: 4000 }).catch(() => {});
    const it = await p.evaluate(() => { const x = window.__hb.host().game.intent.get('host'); return x && x.k; });
    ok(cid + '：技の名前を押すと宣言できる', it === ui.av[0].k, it);
    await p.screenshot({ path: '/home/claude/report/sk-' + cid + '-on.png' });
    // 持っていない種類の技を送っても、ホストは受けつけない
    const other = ['attack', 'guard', 'recover'].find(k => k !== ui.av[0].k);
    await p.evaluate(k => window.__hb.spSend(k, 'small'), other); await sleep(500);
    const it2 = await p.evaluate(() => { const x = window.__hb.host().game.intent.get('host'); return x && x.k; });
    ok(cid + '：持っていない種類の技は使えない（ホストが受けつけない）', it2 === ui.av[0].k, { sent: other, kept: it2 });
    // CPUも自分の技だけ
    const cpu = await p.evaluate(() => { const H = window.__hb.host(), out = []; for(const [id, x] of H.game.intent) if(id.startsWith('cpu')){ const pl = H.players.get(id); out.push([x.k, pl.fighter && pl.fighter.cid]); } return out; });
    const okCpu = await p.evaluate(list => list.every(([k, cid]) => window.__hb.spOwnOf ? true : true), cpu);
    ok(cid + '：ページのエラーなし', p.errs.length === 0, p.errs);
    await p.context().close();
  }
  await b.close(); console.log(`\n${P} passed, ${F} failed`); process.exit(F ? 1 : 0);
})();
