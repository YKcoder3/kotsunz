// コツンズ自撮り：スマホをよこにしたときの画面（ファインダーの大きさ・シャッターが見えるか・仕上げ画面）
const { chromium, devices } = require('playwright'); const fs = require('fs');
const ORIGIN = 'http://127.0.0.1:8082/'; const OUT = '/home/claude/report/selfie/'; const sleep = ms => new Promise(r => setTimeout(r, ms));
let F = 0, P = 0; const ok = (n, c, x) => { c ? P++ : F++; console.log((c ? 'PASS ' : 'FAIL ') + n + (x !== undefined ? '  ' + JSON.stringify(x) : '')); };
const inView = (r, vw, vh) => r && r.left >= 0 && r.top >= 0 && r.right <= vw + .5 && r.bottom <= vh + .5 && r.width > 0;
(async () => {
  const b = await chromium.launch({ args: ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'] });
  for(const dev of ['iPhone 13 landscape', 'iPhone 15 Pro Max landscape', 'iPhone SE landscape', 'Pixel 7 landscape', 'Galaxy S9+ landscape']){
    const d = devices[dev]; const c = await b.newContext({ ...d, permissions: ['camera'], acceptDownloads: true }); const p = await c.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto(ORIGIN + 'selfie.html'); await p.waitForFunction(() => document.getElementById('video').videoWidth > 0 && document.getElementById('camMsg').classList.contains('hidden'), null, { timeout: 10000 }); await sleep(500);
    const vw = d.viewport.width, vh = d.viewport.height;
    const L = await p.evaluate(() => { const r = id => { const x = document.getElementById(id).getBoundingClientRect(); return { left: x.left, top: x.top, right: x.right, bottom: x.bottom, width: x.width, height: x.height }; }; const v = document.getElementById('video'); return { sh: r('shutter'), home: r('homeCam'), flip: r('flip'), fin: r('finder'), ar: v.videoWidth / v.videoHeight }; });
    ok(dev + '：シャッター・ホーム・切替が画面の中に全部見える', inView(L.sh, vw, vh) && inView(L.home, vw, vh) && inView(L.flip, vw, vh), { sh: L.sh, vw, vh });
    ok(dev + '：ファインダーが大きい（画面の高さの75%以上）', L.fin.height >= vh * .75, { fin: Math.round(L.fin.height), vh });
    ok(dev + '：ファインダーは映像と同じ形', Math.abs(L.fin.width / L.fin.height - L.ar) < .03, { fin: +(L.fin.width / L.fin.height).toFixed(3), ar: +L.ar.toFixed(3) });
    ok(dev + '：シャッターとファインダーが重ならない', L.sh.left >= L.fin.right - 1);
    await p.screenshot({ path: OUT + 'land-cam-' + dev.split(' ')[0] + '.png' });
    await p.click('#shutter'); await p.waitForSelector('#scrEdit:not(.hidden)', { timeout: 10000 }); await sleep(400);
    const E = await p.evaluate(() => { const r = el => { const x = el.getBoundingClientRect(); return { left: x.left, top: x.top, right: x.right, bottom: x.bottom, width: x.width, height: x.height }; }; return { save: r(document.getElementById('saveBtn')), cv: r(document.getElementById('cv')), panel: r(document.querySelector('.panel')) }; });
    ok(dev + '：仕上げ画面で「保存する」が見える', inView(E.save, vw, vh), E.save);
    ok(dev + '：仕上げの写真が大きく見える（高さの75%以上）、操作と重ならない', E.cv.height >= vh * .75 * (E.cv.width > E.cv.height ? .0 : 1) && E.cv.right <= E.panel.left + 1 && E.cv.width > vw * .3, { cv: E.cv, panel: E.panel.left });
    if(/iPhone/.test(dev)){ await p.click('#saveBtn'); await p.waitForSelector('#saved:not(.hidden)', { timeout: 8000 }).catch(() => {}); const sv = await p.evaluate(() => { const r = document.getElementById('savedClose').getBoundingClientRect(); const t = document.getElementById('savedTip'), box = document.querySelector('.saved-box').getBoundingClientRect(), tr = t.getBoundingClientRect(); return { ok: !document.getElementById('saved').classList.contains('hidden'), bottom: r.bottom, w: document.getElementById('savedImg').naturalWidth, tipInside: tr.right <= box.right + .5 && t.scrollWidth <= t.clientWidth + 1 }; });
      ok(dev + '：よこのまま保存（iPhoneは保存画面が出て、とじるボタンも見える）', sv.ok && sv.w > 0 && sv.bottom <= vh + .5 && sv.tipInside, sv); await p.screenshot({ path: OUT + 'land-saved-' + dev.split(' ')[0] + '.png' }); await p.click('#savedClose'); }
    else { const [dl] = await Promise.all([p.waitForEvent('download'), p.click('#saveBtn')]); const f = OUT + 'land-save.png'; await dl.saveAs(f); ok(dev + '：よこのまま保存できる', fs.statSync(f).size > 1000); }
    await p.screenshot({ path: OUT + 'land-edit-' + dev.split(' ')[0] + '.png' });
    ok(dev + '：ページのエラーなし', errs.length === 0, errs);
    await c.close();
  }
  // たて → よこ に回したとき、ファインダーとボタンが合わせなおされる
  const c = await b.newContext({ ...devices['iPhone 13'], permissions: ['camera'] }); const p = await c.newPage();
  await p.goto(ORIGIN + 'selfie.html'); await p.waitForFunction(() => document.getElementById('video').videoWidth > 0, null, { timeout: 10000 }); await sleep(400);
  await p.setViewportSize({ width: 844, height: 390 }); await sleep(700);
  const R = await p.evaluate(() => { const x = document.getElementById('shutter').getBoundingClientRect(), f = document.getElementById('finder').getBoundingClientRect(); return { sb: x.bottom, sr: x.right, fh: f.height }; });
  ok('たてから よこに回すと、ボタンもファインダーも合わせなおされる', R.sb <= 390 && R.sr <= 844 && R.fh >= 390 * .75, R);
  await p.setViewportSize({ width: 390, height: 844 }); await sleep(700);
  const R2 = await p.evaluate(() => { const x = document.getElementById('shutter').getBoundingClientRect(); return { sb: x.bottom, cx: (x.left + x.right) / 2 }; });
  ok('よこから たてにもどすと、シャッターは下のまん中', R2.sb <= 844 && Math.abs(R2.cx - 195) < 4, R2);
  await b.close(); console.log(`\n${P} passed, ${F} failed`); process.exit(F ? 1 : 0);
})();
