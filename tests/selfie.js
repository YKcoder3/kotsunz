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
  ok('シャッター1回で内カメ→外カメの2枚がとれて、「なみなみ」の形になる', ph.u && ph.e && ph.lay === 'wave' && !ph.cam, ph);
  ok('ビーリアル風はなくなった', !(await p.$('[data-lay="real"]')));
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
  await p.click('[data-tab="logo"]'); const sty = await p.$$('#styles .sty'); ok('ロゴは「なし」と4種類（公式・ぷっくり・てがき・どっしり）', sty.length === 5);
  await p.click('#styles .sty:nth-child(4)'); await p.click('#colors .dot:nth-child(2)');
  const lg0 = await p.evaluate(() => ({ x: S.logo.x, y: S.logo.y }));
  await touchDrag(c, p, '#cv', [lg0.x, lg0.y], [.5, .2]);
  const lg1 = await p.evaluate(() => ({ x: S.logo.x, y: S.logo.y, style: S.logo.style, color: S.logo.color }));
  ok('ロゴを指で動かせる・形と色を変えられる', Math.abs(lg1.y - .2) < .05 && lg1.style === 'hand' && lg1.color === 'pink', lg1);
  await touchDrag(c, p, '#cv', [.5, .2], [.5, -0.5]);
  ok('ロゴは写真の外には出ない', await p.evaluate(() => S.logo.y > 0.02));
  await p.click('[data-pos="top"]');
  await p.click('[data-pos="top"]');
  const fontsOk = await p.evaluate(() => ['KZ Pop', 'KZ Hand', 'KZ Bold'].every(f => document.fonts.check("40px '" + f + "'", 'コツンズ')));
  ok('かわいいロゴのフォント3つが読みこめている', fontsOk);
  await sleep(200); await p.screenshot({ path: OUT + 'c-edit.png' });
  // 写真の向きと大きさ（撮ったあと）
  await p.click('[data-tab="pho"]'); await p.click('[data-who="environment"]');
  const r0 = await p.evaluate(() => [S.photos.environment.width, S.photos.environment.height]);
  await p.click('#rotR'); const r1 = await p.evaluate(() => [S.photos.environment.width, S.photos.environment.height, S.view.environment.rot]);
  ok('撮ったあとで写真を90度回せる（縦と横が入れかわる）', r1[0] === r0[1] && r1[1] === r0[0] && r1[2] === 90, { r0, r1 });
  await p.$eval('#phZoom', e => { e.value = 250; e.dispatchEvent(new Event('input')); });
  ok('撮ったあとで写真の大きさ（拡大）を変えられる', await p.evaluate(() => S.view.environment.z === 2.5));
  await p.click('#phFlip'); ok('写真を反転できる', await p.evaluate(() => S.view.environment.flip === true));
  await p.click('#phReset'); ok('写真をもとにもどせる', await p.evaluate(() => S.view.environment.rot === 0 && S.view.environment.z === 1 && !S.view.environment.flip));
  await p.click('#rotL');
  // 2枚のあいだに白い線がない（境目のまん中の列に、真っ白が続かない）
  await p.click('[data-tab="lay"]');
  const seam = await p.evaluate(async () => { const out = {}; for(const lay of ['wave', 'vwave', 'zig', 'hcut', 'vcut']){ setLay(lay, false); S.spark.on = false; const c = document.createElement('canvas'); c.width = cv.width; c.height = cv.height; drawAll(c.getContext('2d'), true); const g = c.getContext('2d'); let white = 0, n = 0; for(let i = 0; i < 200; i++){ const vert = lay === 'vwave' || lay === 'vcut', x = vert ? c.width / 2 : c.width * i / 200, y = vert ? c.height * i / 200 : (lay === 'zig' ? c.height * (.62 - .24 * i / 200) : c.height / 2); const d = g.getImageData(x, y, 1, 1).data; n++; if(d[0] > 245 && d[1] > 245 && d[2] > 245) white++; } out[lay] = white / n; } S.spark.on = true; setLay('wave', false); return out; });
  ok('2枚の形は5種類（なみ・ゆら・コツン・上下・左右）で、境目に白い線がない', Object.values(seam).every(v => v < .2), seam);
  const sp0 = await p.evaluate(() => S.spark.s); await p.$eval('#spSize', e => { e.value = 160; e.dispatchEvent(new Event('input')); });
  ok('「コツン」マークの大きさをスライダーで変えられる', await p.evaluate(() => S.spark.s === 1.6) && sp0 === 1);
  await p.click('#sparkBtn'); ok('「コツン」マークを消せる', await p.evaluate(() => S.spark.on === false)); await p.click('#sparkBtn');
  for(const a of ['11', '916', '43']){ await p.click(`[data-asp="${a}"]`); }
  ok('写真の形を変えられる（よこ 1440×1080）', await p.evaluate(() => cv.width === 1440 && cv.height === 1080));
  await p.click('[data-asp="34"]');
  await sleep(200); await p.screenshot({ path: OUT + 'c2-edit.png' });
  // 保存（レイアウトごと）
  const res = {};
  for(const lay of ['wave', 'vwave', 'zig', 'hcut', 'vcut', 'one']){
    await p.click('[data-tab="lay"]'); await p.click(`[data-lay="${lay}"]`); await sleep(200);
    const [dl] = await Promise.all([p.waitForEvent('download'), p.click('#saveBtn')]);
    const f = OUT + 'save-' + lay + '.png'; await dl.saveAs(f); res[lay] = png(f);
  }
  ok('どのレイアウトも 1080×1440 のPNGで保存', Object.values(res).every(r => r.png && r.w === 1080 && r.h === 1440), res);
  // ロゴなし
  await p.click('[data-tab="logo"]'); await p.click('#styles .sty:nth-child(1)');
  const nologo = await p.evaluate(async () => { const c = document.createElement('canvas'); c.width = cv.width; c.height = cv.height; drawAll(c.getContext('2d'), true); const a = c.toDataURL(); S.logo.style = 'pop'; drawAll(c.getContext('2d'), true); const b2 = c.toDataURL(); S.logo.style = 'none'; return a !== b2; });
  ok('「ロゴなし」をえらぶと、ロゴを入れずに保存できる', nologo && await p.evaluate(() => S.logo.style === 'none') && await p.isHidden('#logoOpts'));
  const [dl] = await Promise.all([p.waitForEvent('download'), p.click('#saveBtn')]); const f2 = OUT + 'save-nologo.png'; await dl.saveAs(f2);
  ok('ロゴなしでも保存できる', png(f2).png);
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
  await q.setInputFiles('#file', [OUT + 'save-wave.png', OUT + 'save-zig.png']); await q.waitForSelector('#scrEdit:not(.hidden)', { timeout: 8000 });
  await q.click('#saveBtn'); await q.waitForSelector('#saved:not(.hidden)', { timeout: 8000 }).catch(() => {});
  ok('iPhoneは保存すると、写真アプリに入れられる画面が出る', await q.isVisible('#saved') && await q.evaluate(() => document.getElementById('savedImg').naturalWidth === 1080));
  await q.screenshot({ path: OUT + 'd-iphone-saved.png' });
  ok('iPhoneでもページのエラーなし', qerr.length === 0, qerr);
  await b.close(); console.log(`\n${P} passed, ${F} failed`); process.exit(F ? 1 : 0);
})();
