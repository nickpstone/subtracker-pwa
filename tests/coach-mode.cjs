// Run with NODE_PATH pointing to an installed playwright package.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
(async () => {
 const root = path.resolve(__dirname, '..');
 const server = http.createServer((req,res) => {
  const file = path.join(root, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  const mime = {'.html':'text/html','.css':'text/css','.js':'application/javascript','.svg':'image/svg+xml'};
  res.setHeader('Content-Type',mime[path.extname(file)] || 'application/octet-stream');
  fs.readFile(file,(err,data)=>{res.statusCode=err?404:200;res.end(err?'Not found':data);});
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const browser = await chromium.launch({channel:'chrome',headless:true});
 try {
  const page = await browser.newPage({viewport:{width:390,height:844},serviceWorkers:'block'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`http://127.0.0.1:${server.address().port}`);
  await page.click('#btn-sound');
  await page.click('#btn-kickoff-match');
  const saved=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('subtracker_saved_state_v1')));
  const before=await saved();
  await page.click('#btn-open-quick-swap');
  await page.locator('[data-swap-out-id]').first().click();
  await page.locator('[data-swap-in-id]').first().click();
  await page.click('#btn-confirm-swap');
  let after=await saved();
  assert.equal(after.events.length,before.events.length+1);
  const out=before.players.find(p=>p.status==='playing');
  const incoming=before.players.find(p=>p.status==='bench');
  assert.equal(after.players.find(p=>p.id===out.id).status,'bench');
  // A foul recorded after the swap survives undo.
  await page.locator(`[data-action="player-details"][data-id="${incoming.id}"]`).click();
  await page.click('#btn-panel-foul-add');
  await page.click('[data-close-modal="modal-player"]');
  await page.click('#btn-undo-sub');
  after=await saved();
  assert.equal(after.players.find(p=>p.id===out.id).currentShiftStart,out.currentShiftStart);
  assert.equal(after.players.find(p=>p.id===incoming.id).personalFouls,1);
  assert.equal(after.players.find(p=>p.id===incoming.id).status,'bench');
  assert.equal(after.events.filter(e=>e.type==='swap').length,0);
  assert.equal(after.events.filter(e=>e.type==='foul').length,1);
  // Paused swaps and undo must not start player clocks.
  await page.click('#btn-clock-toggle');
  await page.click('#btn-open-quick-swap');
  await page.locator('[data-swap-out-id]').first().click();
  await page.locator('[data-swap-in-id]').first().click();
  await page.click('#btn-confirm-swap');
  await page.click('#btn-undo-sub');
  after=await saved();
  assert(after.players.every(p=>!p.currentShiftStart&&!p.currentBenchStart));
  for(const width of [320,390,768]) {
   await page.setViewportSize({width,height:844});
   await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));
   const geometry=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,clock:document.querySelector('.timer-card').getBoundingClientRect().top,dock:document.querySelector('#match-dock').getBoundingClientRect().bottom}));
   assert.equal(geometry.overflow,false,`overflow at ${width}`);
   assert(geometry.clock>=0&&geometry.clock<2,`sticky clock at ${width}: ${geometry.clock}`);
   assert(geometry.dock<=845);
  }
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>window.scrollTo(0,0));
  await page.waitForTimeout(3000);
  await page.screenshot({path:'/private/tmp/subtracker-coach-mode.png',fullPage:false});
  await page.reload();
  assert.equal((await saved()).matchState,'paused');
  await page.click('#btn-match-menu');await page.click('#btn-confirm-action');
  assert(await page.locator('#view-report').isVisible());
  assert.equal(await page.locator('#match-dock').isVisible(),false);
  assert.deepEqual(errors,[]);
  console.log('PASS: running and paused swap/undo, foul preservation, timing restoration, persistence, report, mobile/tablet layout; no browser errors.');
 } finally {await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exit(1);});
