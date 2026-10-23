/* V24 end-to-end regression: new domains, organism and drug profiles, molecular flow, map, comparator and textbook. */
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),output=path.join(root,'qa','results24');fs.mkdirSync(output,{recursive:true});
const mime={'.js':'text/javascript','.css':'text/css','.html':'text/html','.json':'application/json','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{const name=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname),full=path.resolve(root,'.'+(name==='/'?'/index.html':name));if(!full.startsWith(root+path.sep))return res.writeHead(403).end();fs.readFile(full,(err,data)=>{if(err)return res.writeHead(404).end();res.setHeader('Content-Type',mime[path.extname(full)]||'application/octet-stream');res.end(data)})});
const checks=[];function assert(condition,message){if(!condition)throw Error(message)}
async function main(){await new Promise(ok=>server.listen(9173,'127.0.0.1',ok));const browser=await chromium.launch({headless:true,args:['--no-sandbox'],...(process.env.CHROME_BIN?{executablePath:process.env.CHROME_BIN}:{})});
for(const viewport of [{width:1600,height:900},{width:1280,height:850},{width:768,height:960},{width:390,height:840}]){
 const ctx=await browser.newContext({viewport});const page=await ctx.newPage(),js=[],missing=[];
 page.on('pageerror',e=>js.push(String(e)));page.on('response',r=>{if(r.status()>=400&&r.url().includes('127.0.0.1:9173'))missing.push(r.url())});
 async function nav(route){await page.evaluate(route=>act('nav:'+route),route);await page.waitForTimeout(90)}
 async function click(actName){await page.evaluate(name=>act(name),actName);await page.waitForTimeout(90)}
 async function snap(id){await page.screenshot({path:path.join(output,id+'-'+viewport.width+'.png'),fullPage:false});const status=await page.evaluate(()=>{
 const parents=[...document.querySelectorAll('.v24-columns,.v24-entity-hero,.v24-mechanism,.v24-compare-layout,.v24-compare-target,.v24-map-filters,.v24-book-layout')];const clashes=[];
 for(const p of parents){const cs=[...p.children].filter(e=>getComputedStyle(e).display!=='none'&&getComputedStyle(e).position!=='absolute');for(let i=0;i<cs.length;i++)for(let j=i+1;j<cs.length;j++){const a=cs[i].getBoundingClientRect(),b=cs[j].getBoundingClientRect();const w=Math.min(a.right,b.right)-Math.max(a.left,b.left),h=Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top);if(w>14&&h>14)clashes.push({parent:p.className,w:Math.floor(w),h:Math.floor(h)})}}
 return {scrollOverflow:document.documentElement.scrollWidth-window.innerWidth,clashes,visible:document.querySelector('.v24-detail,.v24-matrix,.v24-compare-scroll,.v24-book-chapter')?.getBoundingClientRect().width||0};
 });checks.push({viewport:viewport.width,view:id,...status});assert(status.scrollOverflow<10,id+' horizontal document overflow '+status.scrollOverflow);assert(!status.clashes.length,id+' overlapping children '+JSON.stringify(status.clashes))}
 try{
 await page.goto('http://127.0.0.1:9173/?legacy=1',{waitUntil:'domcontentloaded',timeout:25000});await page.waitForFunction(()=>window.ATLAS24?.debug&&document.querySelector('#app')?.textContent?.includes('Microorganismos'),null,{timeout:20000});
 if(viewport.width===1600){const audit=await page.evaluate(()=>{const x=ATLAS24.debug;return {org:x.orgs.length,drugs:x.drugs.length,lessons:ATLAS24.lessons.length,unknown:x.relation24(x.drugs[0],x.orgs.find(p=>p.id==='hbv')).status}});assert(audit.org===129,'Expected 129 microorganisms');assert(audit.drugs===122,'Expected 122 agents');assert(audit.lessons===12,'Expected 12 reviews');checks.push({type:'data-audit',...audit})}
 for(const [domain,idOrg,idDrug] of [['virus','hiv1','lenacapavir'],['fungi','candida-auris','micafungina'],['parasites','plasmodium-falciparum','artesunato-iv']]){
  await nav('micro');await click('v24-mode:micro:'+domain);await page.locator('.v24-detail').waitFor();await click('v24-open-micro:'+idOrg);assert((await page.locator('.v24-detail h1').innerText()).length>4,'Missing '+idOrg);
  await snap('micro-'+domain);await nav('atb');await click('v24-mode:drugs:'+domain);await page.locator('.v24-drug').waitFor();await click('v24-open-drug:'+idDrug);
  assert((await page.locator('.v24-mechanism>div').count())===3,'Missing molecular steps '+idDrug);assert((await page.locator('.v24-spectrum-list button').count())>10,'Missing spectrum '+idDrug);
  await snap('drug-'+domain);
 }
 await nav('mapa');await click('v25-map-view:classic');await click('v24-mode:map:fungi');assert(await page.locator('.v24-matrix tbody tr').count()>0,'Fungal coverage empty');await snap('cross-matrix');
 await nav('comparar');assert(await page.locator('.v24-compare-scroll table').count()===1,'Integrated compare unavailable');await click('v24-compare-toggle:micafungina');assert(await page.locator('.v24-picked button').count()>=2,'Comparator not adding drugs');await snap('comparator');
 await nav('aprender');await click('v24-mode:learning:extended');assert(await page.locator('.v24-book-chapter section').count()>=5,'Incomplete textbook content');await page.locator('[data-act="v24-book-lesson:fungi-therapy"]').first().click({timeout:10000});assert((await page.locator('.v24-book-chapter').innerText()).includes('equinocandinas'),'Lesson navigation broken');await snap('learning');
 assert(!js.length,'Page JS errors '+js.join('; '));assert(!missing.length,'Missing local resources '+missing.join('; '));
 }catch(e){checks.push({viewport:viewport.width,error:String(e),stack:e.stack});}
 await ctx.close();
}
await browser.close();server.close();fs.writeFileSync(path.join(output,'v24-report.json'),JSON.stringify(checks,null,2));const fails=checks.filter(x=>x.error||x.scrollOverflow>9||x.clashes?.length);checks.filter(x=>x.view).forEach(x=>console.log('QA',x.viewport,x.view,'overflow',x.scrollOverflow,'clashes',x.clashes.length));fails.forEach(x=>console.error('QA FAIL',x.viewport,x.error||JSON.stringify(x)));console.log('V24 QA summary:',checks.length,'records,',fails.length,'failures');if(fails.length)process.exitCode=1;
}
main().catch(e=>{console.error(e);server.close();process.exitCode=1});