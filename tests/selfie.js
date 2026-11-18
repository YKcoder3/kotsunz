// コツンズ自撮り（selfie.html）のテスト。偽のカメラで「内カメ→外カメ」を撮り、キャラとロゴをのせて保存する
//   実行: node selfie.js （http://127.0.0.1:8082 で main の内容、ws://127.0.0.1:9001 にMQTTブローカー）
const { chromium, devices } = require('playwright'); const fs = require('fs'), path = require('path'); const NM = path.join(__dirname, 'node_modules');
const ORIGIN = 'http://127.0.0.1:8082/'; const OUT = '/home/claude/report/selfie/'; fs.mkdirSync(OUT, { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let F = 0, P = 0; const ok = (n, c, x) => { c ? P++ : F++; console.log((c ? 'PASS ' : 'FAIL ') + n + (x !== undefined ? '  ' + JSON.stringify(x) : '')); };
const png = f => { const b = fs.readFileSync(f); return { png: b.slice(1, 4).toString() === 'PNG', w: b.readUInt32BE(16), h: b.readUInt32BE(20) }; };
async function touchDrag(c, p, sel, from, to){
  const box = await p.$(sel).then(e => e.boundingBox()); const s = await c.newCDPSession(p);
  const at = (x, y) => [{ x: box.x + box.width * x, y: box.y + box.height * y }];
  await s.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: at(...from) });
  for(let i = 1; i <= 8; i++) await s.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: at(from[0] + (to[0] - from[0]) * i / 8, from[1] + (to[1] - from[1]) * i / 8) });
  await s.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await sleep(150);
}
async function pinch(c, p, sel, center, d0, d1){
  const box = await p.$(sel).then(e => e.boundingBox()); const s = await c.newCDPSession(p);
  const pt = d => [{ x: box.x + box.width * (center[0] - d), y: box.y + box.height * center[1], id: 1 }, { x: box.x + box.width * (center[0] + d), y: box.y + box.height * center[1], id: 2 }];
  await s.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: pt(d0) });
  for(let i = 1; i <= 8; i++) await s.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: pt(d0 + (d1 - d0) * i / 8) });
  await s.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await sleep(150);
}
(async () => {
  const b = await chromium.launch({ args: ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'] });
  const c = await b.newContext({ ...devices['Pixel 7'], permissions: ['camera'], acceptDownloads: true });
  await c.route('https://unpkg.com/**', r => r.fulfill({ path: path.join(NM, 'mqtt/dist/mqtt.min.js'), contentType:'application/javascript' }));
  await c.route('https://cdn.jsdelivr.net/**', r => r.fulfill({ path: path.join(NM, 'qrcode-generator/qrcode.js'), contentType:'application/javascript' }));
  let onSelfie = false; const ext = [], bad = []; c.on('request', r => { if(onSelfie && !r.url().startsWith(ORIGIN) && !/^(data|blob):/.test(r.url())) ext.push(r.url()); });
  c.on('response', r => { if(onSelfie && r.status() >= 400) bad.push(r.status() + ' ' + r.url()); });
  const p = await c.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(ORIGIN + 'index.html?debug=1&notitle=1&broker=ws://127.0.0.1:9001/mqtt'); await p.evaluate(() => window.__hb.quickLogin('じどり')); await sleep(600);
  ok('ホームに「コツンズ自撮り」のメニューがある', await p.isVisible('#b-selfie'));
  onSelfie = true; await p.click('#b-selfie'); await p.waitForURL(/selfie\.html/);
  await p.waitForFunction(() => document.getElementById('video').videoWidth > 0 && document.getElementById('camMsg').classList.contains('hidden'), null, { timeout: 10000 });
  ok('開くとすぐ内カメが起動（ボタンを押さなくてよい）', await p.evaluate(() => S.facing === 'user' && !!S.stream));
  const fit = await p.evaluate(() => { const v = document.getElementById('video'), f = document.getElementById('finder').getBoundingClientRect(); return { video: +(v.videoWidth / v.videoHeight).toFixed(3), finder: +(f.width / f.height).toFixed(3), vw: v.videoWidth, vh: v.videoHeight }; });
  ok('ファインダーの形がカメラの映像と同じ（切りとらない）', Math.abs(fit.video - fit.finder) < .02, fit);
  const homeY = await p.$eval('#homeCam', e => { const r = e.getBoundingClientRect(); return r.top / innerHeight; });
  ok('ホームボタンが画面の下（親指でとどく所）にある', homeY > .75, +homeY.toFixed(2));
  await p.screenshot({ path: OUT + 'a-camera.png' });
  await p.click('#shutter'); await sleep(1200); await p.screenshot({ path: OUT + 'b-countdown.png' });
  await p.waitForSelector('#scrEdit:not(.hidden)', { timeout: 10000 });
  const ph = await p.evaluate(() => ({ u: S.photos.user && [S.photos.user.width, S.photos.user.height], e: S.photos.environment && [S.photos.environment.width, S.photos.environment.height], lay: S.lay, cam: !!S.stream }));
  ok('シャッター1回で内カメ→外カメの2枚がとれて、ビーリアル風になる', ph.u && ph.e && ph.lay === 'real' && !ph.cam, ph);
  ok('写真は映像を切りとらずに保存（形が同じ）', Math.abs(ph.u[0] / ph.u[1] - fit.video) < .02, ph.u);
  // キャラを2体のせる
  await p.click('[data-tab="chr"]'); const chs = await p.$$('#chars .ch'); ok('キャラは正式な8体', chs.length === 8);
  await p.click('#chars .ch:nth-child(2)'); await sleep(300); await p.click('#chars .ch:nth-child(5)'); await sleep(300);
  ok('キャラを2体のせられる', await p.evaluate(() => S.stickers.length === 2 && S.stickers.map(s => s.id).join() === 'k002,k006'));
  await p.$eval('#cv', e => e.scrollIntoView({ block: 'center' })); await sleep(200);
  const st0 = await p.evaluate(() => ({ x: S.stickers[1].x, y: S.stickers[1].y, w: S.stickers[1].w }));
  await touchDrag(c, p, '#cv', [st0.x, st0.y], [.3, .45]);
  const st1 = await p.evaluate(() => ({ x: S.stickers[1].x, y: S.stickers[1].y }));
  ok('キャラを指でドラッグして動かせる', Math.abs(st1.x - .3) < .05 && Math.abs(st1.y - .45) < .05, st1);
  await pinch(c, p, '#cv', [.3, .45], .06, .12);
  const st2 = await p.evaluate(() => S.stickers[1].w);
  ok('2本指でキャラを大きくできる', st2 > st0.w * 1.5, { before: st0.w, after: st2 });
  await p.click('#stFlip'); ok('反転できる', await p.evaluate(() => S.stickers[1].flip === true));
  // ロゴ
  await p.click('[data-tab="logo"]'); const sty = await p.$$('#styles .sty'); ok('ロゴの形は4種類（公式・ぷっくり・てがき・どっしり）', sty.length === 4);
  await p.click('#styles .sty:nth-child(3)'); await p.click('#colors .dot:nth-child(2)');
  const lg0 = await p.evaluate(() => ({ x: S.logo.x, y: S.logo.y }));
  await touchDrag(c, p, '#cv', [lg0.x, lg0.y], [.5, .2]);
  const lg1 = await p.evaluate(() => ({ x: S.logo.x, y: S.logo.y, style: S.logo.style, color: S.logo.color }));
  ok('ロゴを指で動かせる・形と色を変えられる', Math.abs(lg1.y - .2) < .05 && lg1.style === 'hand' && lg1.color === 'pink', lg1);
  await touchDrag(c, p, '#cv', [.5, .2], [.5, -0.5]);
  ok('ロゴは写真の外には出ない', await p.evaluate(() => S.logo.y > 0.02));
  await p.click('[data-pos="top"]');
  const fontsOk = await p.evaluate(() => ['KZ Pop', 'KZ Hand', 'KZ Bold'].every(f => document.fonts.check("40px '" + f + "'", 'コツンズ')));
  ok('かわいいロゴのフォント3つが読みこめている', fontsOk);
  await sleep(200); await p.screenshot({ path: OUT + 'c-edit.png' });
  // 保存（レイアウトごと）
  const res = {};
  for(const lay of ['real', 'side', 'stack', 'one']){
    await p.click('[data-tab="lay"]'); await p.click(`[data-lay="${lay}"]`); await sleep(200);
    const [dl] = await Promise.all([p.waitForEvent('download'), p.click('#saveBtn')]);
    const f = OUT + 'save-' + lay + '.png'; await dl.saveAs(f); res[lay] = png(f);
  }
  ok('どのレイアウトも 1080×1440 のPNGで保存', Object.values(res).every(r => r.png && r.w === 1080 && r.h === 1440), res);
  // キャラなし・公式ロゴでもロゴが入る
  await p.evaluate(() => { S.stickers = []; S.logo.style = 'official'; S.sel = null; });
  const [dl] = await Promise.all([p.waitForEvent('download'), p.click('#saveBtn')]); const f2 = OUT + 'save-official.png'; await dl.saveAs(f2);
  ok('キャラなし・公式ロゴでも保存できる', png(f2).png);
  ok('保存する写真に、えらんでいる枠は入らない', await p.evaluate(async () => { const h = async () => new Uint8Array(await (await exportBlob()).arrayBuffer()).join(); S.sel = null; const a = await h(); S.sel = 'logo'; const b2 = await h(); return a === b2; }));
  ok('自撮りの画面から外のサーバーに何も送っていない', ext.length === 0, ext.slice(0, 5));
  ok('読みこめないファイルがない', bad.length === 0, bad);
  ok('ページのエラーなし', errs.length === 0, errs);
  // ホームにもどる
  await p.click('#homeEdit'); await p.waitForURL(/index\.html/); ok('「ホーム」でゲームのホームにもどる', /notitle/.test(p.url()));
  // iPhone：アルバムから2枚 → 保存で写真アプリに入れる画面
  const ci = await b.newContext({ ...devices['iPhone 13'] }); const q = await ci.newPage(); const qerr = []; q.on('pageerror', e => qerr.push(e.message));
  await q.goto(ORIGIN + 'selfie.html'); await sleep(800);
  ok('アルバムから写真をえらぶボタンがある（カメラが使えないとき用）', await q.isVisible('#pickBtn'));
  await q.setInputFiles('#file', [OUT + 'save-side.png', OUT + 'save-stack.png']); await q.waitForSelector('#scrEdit:not(.hidden)', { timeout: 8000 });
  await q.click('#saveBtn'); await q.waitForSelector('#saved:not(.hidden)', { timeout: 8000 }).catch(() => {});
  ok('iPhoneは保存すると、写真アプリに入れられる画面が出る', await q.isVisible('#saved') && await q.evaluate(() => document.getElementById('savedImg').naturalWidth === 1080));
  await q.screenshot({ path: OUT + 'd-iphone-saved.png' });
  ok('iPhoneでもページのエラーなし', qerr.length === 0, qerr);
  await b.close(); console.log(`\n${P} passed, ${F} failed`); process.exit(F ? 1 : 0);
})();
