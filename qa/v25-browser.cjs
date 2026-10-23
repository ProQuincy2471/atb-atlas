/* Atlas V25: data-integrity, clinical-depth, map layout and navigation QA. */
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),dir=path.join(root,'qa','results25');fs.mkdirSync(dir,{recursive:true});
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.jpg':'image/jpeg','.png':'image/png'};
const server=http.createServer((req,res)=>{const u=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname),f=path.resolve(root,'.'+(u==='/'?'/index.html':u));if(!f.startsWith(root+path.sep))return res.writeHead(403).end();fs.readFile(f,(err,data)=>{if(err)return res.writeHead(404).end(u);res.setHeader('Content-Type',mime[path.extname(f)]||'application/octet-stream');res.end(data)})});
const all=[];function assert(ok,msg){if(!ok)throw Error(msg)}
async function main(){await new Promise(ok=>server.listen(9175,'127.0.0.1',ok));const browser=await chromium.launch({headless:true,args:['--no-sandbox'],...(process.env.CHROME_BIN?{executablePath:process.env.CHROME_BIN}:{})});
for(const view of [{width:1600,height:900},{width:1280,height:820},{width:768,height:900},{width:390,height:840}]){
 const ctx=await browser.newContext({viewport:view}),page=await ctx.newPage(),js=[],missing=[];page.on('pageerror',err=>js.push(String(err)));page.on('response',r=>{if(r.status()>=400&&r.url().includes('127.0.0.1:9175'))missing.push(r.url()+':'+r.status())});
 const nav=route=>page.evaluate(r=>act('nav:'+r),route),click=a=>page.evaluate(v=>act(v),a);
 async function screenshot(name){await page.waitForTimeout(110);const status=await page.evaluate(()=>{
 const parents=['.v25-mapgrid','.v25-domainbar','.v25-clinic-layout','.v25-review-meta','.v25-org-review .v25-rounds','.v25-syndrome-steps'].flatMap(s=>[...document.querySelectorAll(s)]);const collisions=[];
 for(const el of parents){if(el.getBoundingClientRect().width<1)continue;const cs=[...el.children].filter(x=>{const s=getComputedStyle(x);return s.display!=='none'&&s.position!=='absolute'});for(let i=0;i<cs.length;i++)for(let j=i+1;j<cs.length;j++){const a=cs[i].getBoundingClientRect(),b=cs[j].getBoundingClientRect(),w=Math.min(a.right,b.right)-Math.max(a.left,b.left),h=Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top);if(w>12&&h>12)collisions.push({parent:el.className,w:Math.round(w),h:Math.round(h)})}}
 return {overflow:document.documentElement.scrollWidth-innerWidth,collisions,sectionCount:document.querySelectorAll('.v25-syndrome-section,.v25-org-review section').length};
 });all.push({width:view.width,view:name,...status});assert(status.overflow<9,name+' document overflow '+status.overflow);assert(status.collisions.length===0,name+' collisions '+JSON.stringify(status.collisions));await page.screenshot({path:path.join(dir,name+'-'+view.width+'.png'),fullPage:false});}
 try{
 await page.goto('http://127.0.0.1:9175/?legacy=1',{waitUntil:'domcontentloaded',timeout:40000});await page.waitForFunction(()=>window.ATLAS25?.reviewUI&&window.ATLAS24?.debug&&document.querySelector('.v25-mapgrid'),null,{timeout:45000});
 if(view.width===1600){const audit=await page.evaluate(()=>{
 const gs=ATLAS25.microGroups,all=ATLAS24.debug.orgs,c=new Map(),unknown=[];for(const g of gs)for(const id of g.ids){c.set(id,(c.get(id)||0)+1);if(!all.find(x=>x.id===id))unknown.push(id)}
 return {groups:gs.length,organisms:all.length,missing:all.filter(p=>c.get(p.id)!==1).map(p=>p.id),unknown,who:WHO.conditions.length,syndromes:ATLAS25.extraConditions.length,specific:Object.keys(ATLAS25.speciesInsight).length,reviewFields:Object.entries(ATLAS25.conditions).filter(([k,a])=>a.length!==6).map(([k])=>k)};
 });assert(audit.organisms===129&&audit.groups===25&&!audit.missing.length&&!audit.unknown.length,'Hierarchy not exhaustive '+JSON.stringify(audit));assert(audit.who===37&&audit.syndromes===18&&!audit.reviewFields.length,'Syndrome coverage '+JSON.stringify(audit));all.push({dataAudit:audit})}
 await screenshot('territory-bacteria');
 for(const [kind,id,drug] of [['virus','influenza-a','oseltamivir'],['fungi','candida-auris','micafungina'],['parasites','plasmodium-falciparum','artesunato-iv']]){
  await click('v25-domain:'+kind);assert(await page.locator('.v25-group-list button').count()>5,kind+' groups absent');
  await click('v25-micro:'+id);assert((await page.locator('.v25-current h2').innerText()).length>5,kind+' profile missing');
  await screenshot('territory-'+kind);
  await click('v24-open-micro:'+id);assert(await page.locator('.v25-org-review section').count()===5,kind+' missing expanded chapters');assert((await page.locator('.v25-org-review').innerText()).length>1200,kind+' review too brief');
  await screenshot('microreview-'+kind);
  await nav('mapa');
 }
 await nav('clinica');assert(await page.locator('.v25-clinic-list button').count()>35,'Syndrome library missing WHO');
 await click('v25-clinical:who-34');assert(await page.locator('.v25-syndrome-section').count()===8,'Pyelonephritis review sections incomplete');assert((await page.locator('.v25-syndrome').innerText()).length>2000,'Pyelo review short');
 await screenshot('syndrome-pyelonephritis');
 await click('v25-clinical:crypto-cns-v25');assert((await page.locator('.v25-syndrome h1').innerText()).includes('criptoc'),'Fungal syndrome inaccessible');
 await screenshot('syndrome-fungal');
 await click('v25-clinical:severe-malaria-v25');assert((await page.locator('.v25-syndrome h1').innerText()).includes('Malaria'),'Parasitic syndrome inaccessible');
 await screenshot('syndrome-malaria');
 assert(!js.length,'JS errors '+js.join('; '));assert(!missing.length,'Local resources 404 '+missing.join('; '));
 }catch(e){all.push({width:view.width,error:String(e),stack:e.stack})}await ctx.close();
}
await browser.close();server.close();fs.writeFileSync(path.join(dir,'report.json'),JSON.stringify(all,null,2));const failures=all.filter(x=>x.error||x.overflow>=9||x.collisions?.length);for(const x of all.filter(x=>x.view))console.log('QA',x.width,x.view,'overflow',x.overflow,'overlaps',x.collisions.length);failures.forEach(x=>console.error('FAIL',x.width,x.error||JSON.stringify(x)));console.log('V25 QA:',all.filter(x=>x.view).length,'screens,',failures.length,'failures');if(failures.length)process.exitCode=1;
}main().catch(e=>{console.error(e);server.close();process.exitCode=1});