// コツンズ自撮り（selfie.html）のテスト。偽のカメラで、内カメ→外カメの順に撮って、キャラをのせて保存する
const { chromium, devices } = require('playwright'); const fs = require('fs'), path = require('path'); const NM = path.join(__dirname, 'node_modules');
const ORIGIN = 'http://127.0.0.1:8082/'; const OUT = '/home/claude/report/selfie/'; fs.mkdirSync(OUT, { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let F = 0, P = 0; const ok = (n, c, x) => { c ? P++ : F++; console.log((c ? 'PASS ' : 'FAIL ') + n + (x !== undefined ? '  ' + JSON.stringify(x) : '')); };
(async () => {
  const b = await chromium.launch({ args: ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'] });
  const c = await b.newContext({ ...devices['Pixel 7'], permissions: ['camera'], acceptDownloads: true });
  await c.route('https://unpkg.com/**', r => r.fulfill({ path: path.join(NM, 'mqtt/dist/mqtt.min.js'), contentType:'application/javascript' }));
  await c.route('https://cdn.jsdelivr.net/**', r => r.fulfill({ path: path.join(NM, 'qrcode-generator/qrcode.js'), contentType:'application/javascript' }));
  const ext = []; c.on('request', r => { const u = r.url(); if(!u.startsWith(ORIGIN) && !u.startsWith('data:') && !u.startsWith('blob:')) ext.push(u); });
  const p = await c.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(ORIGIN + 'index.html?debug=1&notitle=1&broker=ws://127.0.0.1:9001/mqtt'); await p.evaluate(() => window.__hb.quickLogin('じどり')); await sleep(800);
  ok('ホームに「コツンズ自撮り」のメニューがある', await p.isVisible('#b-selfie'));
  await p.screenshot({ path: OUT + '0-home.png', fullPage: true });
  ext.length = 0; let onSelfie = false; c.on('request', r => { if(onSelfie && !r.url().startsWith(ORIGIN) && !/^(data|blob):/.test(r.url())) ext.push('S ' + r.url()); });
  await p.click('#b-selfie'); await p.waitForURL(/selfie\.html/); onSelfie = true; await sleep(800);
  ok('メニューから自撮りの画面が開く', /selfie\.html/.test(p.url()));
  const picks = await p.$$eval('#characterPicker .char', bs => bs.map(x => x.textContent.trim()));
  ok('キャラは「キャラなし」と正式8体', picks.length === 9 && picks[0].endsWith('キャラなし'), picks);
  const broken = await p.$$eval('#characterPicker img', is => is.filter(i => !i.complete || !i.naturalWidth).map(i => i.alt));
  ok('キャラの絵がすべて読める', broken.length === 0, broken);
  await p.click('#startCamera'); await p.waitForFunction(() => document.getElementById('video').videoWidth > 0, null, { timeout: 10000 });
  ok('内カメが起動', (await p.textContent('#captureBtn')).includes('内カメ'));
  await p.click('#captureBtn'); await p.waitForFunction(() => document.getElementById('captureBtn').textContent.includes('外カメ') && document.getElementById('video').videoWidth > 0, null, { timeout: 10000 });
  ok('内カメを撮ったら外カメに切りかわる', true);
  await sleep(300); await p.click('#captureBtn'); await p.waitForFunction(() => !!document.querySelector('#thumbRear img'), null, { timeout: 8000 }).catch(() => {});
  ok('2枚とも撮れた', await p.evaluate(() => !!document.querySelector('#thumbFront img') && !!document.querySelector('#thumbRear img')));
  await p.click('#characterPicker .char:nth-child(5)'); await sleep(500);
  const box = await p.$('#resultCanvas').then(e => e.boundingBox());
  await p.mouse.move(box.x + box.width * .73, box.y + box.height * .77); await p.mouse.down(); await p.mouse.move(box.x + box.width * .3, box.y + box.height * .5, { steps: 6 }); await p.mouse.up();
  await p.$eval('#charScale', e => { e.value = 50; e.dispatchEvent(new Event('input')); });
  await sleep(300); await p.screenshot({ path: OUT + '1-side.png', fullPage: true });
  const modes = {};
  for(const m of ['side', 'stack', 'full']){
    await p.click(`[data-mode="${m}"]`); await sleep(300);
    if(m === 'full') await p.click('#fullRear');
    const [dl] = await Promise.all([p.waitForEvent('download'), p.click('#download')]);
    const f = OUT + 'save-' + m + '.png'; await dl.saveAs(f);
    const buf = fs.readFileSync(f); modes[m] = { png: buf.slice(1, 4).toString() === 'PNG', w: buf.readUInt32BE(16), h: buf.readUInt32BE(20), name: dl.suggestedFilename() };
  }
  ok('左右・上下は1200×1600、全画面は1080×1920のPNGで保存', modes.side.png && modes.side.w === 1200 && modes.side.h === 1600 && modes.stack.w === 1200 && modes.full.w === 1080 && modes.full.h === 1920, modes);
  // ロゴ：キャラなしでも上の真ん中に文字が入る（白と濃い紫のふち）
  await p.click('#characterPicker .char:nth-child(1)'); await sleep(200);
  const logo = await p.evaluate(() => { const c = document.getElementById('resultCanvas'), x = c.getContext('2d'); const d = x.getImageData(c.width * .3, c.height * .06, c.width * .4, c.height * .05).data; let white = 0, ink = 0; for(let i = 0; i < d.length; i += 4){ if(d[i] > 245 && d[i + 1] > 245 && d[i + 2] > 245) white++; if(d[i] < 70 && d[i + 1] < 50 && d[i + 2] > 80 && d[i + 2] < 130) ink++; } return { white, ink }; });
  ok('キャラなしでも「コツンズ」のロゴが入る', logo.white > 500 && logo.ink > 500, logo);
  ok('自撮りの画面から外のサーバーに何も送っていない', ext.filter(x => x.startsWith('S ')).length === 0, ext.slice(0, 5));
  ok('ページのエラーなし', errs.length === 0, errs);
  // iPhone：保存ボタンで、写真アプリに入れる画面が出る
  const ci = await b.newContext({ ...devices['iPhone 13'], permissions: ['camera'] }); const q = await ci.newPage(); q.on('pageerror', e => console.log('QERR', e.message)); q.on('console', m => console.log('QLOG', m.text()));
  await q.goto(ORIGIN + 'selfie.html'); await q.click('[data-mode="full"]'); await q.setInputFiles('#filePicker', OUT + 'save-side.png'); await sleep(800);
  await q.click('#download'); await q.waitForSelector('#savedSheet:not(.hidden)', { timeout: 8000 }).catch(() => {}); await sleep(300); console.log('dbg', JSON.stringify(await q.evaluate(() => ({ st: document.getElementById('status').textContent, sheet: document.getElementById('savedSheet').className, w: document.getElementById('savedImg').naturalWidth, ua: navigator.userAgent.slice(0, 40), front: !!document.querySelector('#thumbFront img') }))));
  ok('iPhoneでは保存すると写真の画面が出る（長押しで写真に保存）', await q.isVisible('#savedSheet') && await q.evaluate(() => document.getElementById('savedImg').naturalWidth === 1080));
  await q.screenshot({ path: OUT + '2-iphone-saved.png' });
  await b.close(); console.log(`\n${P} passed, ${F} failed`); process.exit(F ? 1 : 0);
})();
