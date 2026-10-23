const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),dir=path.join(root,'qa/results');fs.mkdirSync(dir,{recursive:true});
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.jpg':'image/jpeg','.png':'image/png'};
const server=http.createServer((req,res)=>{const u=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname),f=path.resolve(root,'.'+(u==='/'?'/index.html':u));if(!f.startsWith(root+path.sep)){res.writeHead(403).end();return;}fs.readFile(f,(err,data)=>{if(err){res.writeHead(404).end(u);return;}res.setHeader('Content-Type',mime[path.extname(f)]||'application/octet-stream');res.end(data)})});
async function main(){await new Promise(r=>server.listen(9172,'127.0.0.1',r));const browser=await chromium.launch({headless:true,args:['--no-sandbox'],...(process.env.CHROME_BIN?{executablePath:process.env.CHROME_BIN}:{})}),all=[];
for(const vp of [{width:1600,height:900},{width:1280,height:800},{width:1024,height:768},{width:768,height:900},{width:390,height:844}]){
const ctx=await browser.newContext({viewport:vp}),page=await ctx.newPage(),jsErrors=[],missingAssets=[];
page.on('pageerror',e=>jsErrors.push(String(e)));page.on('response',r=>{if(r.status()>=400&&new URL(r.url()).hostname==='127.0.0.1')missingAssets.push(r.url()+':'+r.status())});
async function audit(label){await page.waitForTimeout(130);const info=await page.evaluate(()=>{
const list=['.v20-topbar','.v20-map-grid','.v20-map-main','.v20-insights','.v20-article','.v20-profilehero','.v20-keyfacts>div','.v20-readingcols>div','.v20-section-body','.v21-coverheading','.v21-center','.v21-filterbar','.v21-inspector','.v21-mechanism','.v21-drughero-art'].join(',');
const bad=[...document.querySelectorAll(list)].filter(e=>{const s=getComputedStyle(e);return s.display!=='none'&&e.clientWidth>30&&e.scrollWidth>e.clientWidth+6}).map(e=>({className:e.className,clientWidth:e.clientWidth,scrollWidth:e.scrollWidth})).slice(0,15);
const overlaps=[];for(const par of document.querySelectorAll('.v20-map-grid,.v20-readingcols,.v20-keyfacts,.v21-coverheading,.v21-filterbar,.v21-coverage-layout,.v20-profilehero')){const cs=[...par.children].filter(e=>{const s=getComputedStyle(e);return s.display!=='none'&&s.position!=='absolute'});for(let i=0;i<cs.length;i++)for(let j=i+1;j<cs.length;j++){const a=cs[i].getBoundingClientRect(),b=cs[j].getBoundingClientRect(),w=Math.min(a.right,b.right)-Math.max(a.left,b.left),h=Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top);if(w>12&&h>12)overlaps.push({parent:par.className,a:cs[i].className,b:cs[j].className,w:Math.round(w),h:Math.round(h)});}}
return {hash:location.hash,documentOverflow:document.documentElement.scrollWidth-innerWidth,bad,overlaps:overlaps.slice(0,15)};
});all.push({viewport:vp,view:label,info});await page.screenshot({path:path.join(dir,label+'-'+vp.width+'.png'),fullPage:false});}
try{await page.goto('http://127.0.0.1:9172/',{waitUntil:'domcontentloaded',timeout:25000});await page.waitForFunction(()=>document.querySelector('#app')?.textContent?.includes('Microorganismos')||document.querySelector('.load-error'),null,{timeout:15000});if(await page.locator('.load-error').count())throw Error('Initialization: '+await page.locator('.load-error').innerText());await audit('mapa');
await page.locator('[data-act="v20-mode:cobertura"]').first().click({timeout:10000});await page.locator('.v21-matrix').waitFor({timeout:12000});await audit('cobertura');
if(await page.locator('.v21-matrix tbody tr').count()<3)throw Error('Matrix empty');
await page.locator('[data-act="v21-domain:Atípicos"]').first().click();await page.locator('[data-act^="v21-toggle:"]').first().click();await page.locator('.v21-matrix button.v21-cell').first().click({timeout:10000});await audit('cobertura-interactiva');
for(const route of ['micro','atb','clinica','comparar','aprender','laboratorio','fuentes']){await page.locator('[data-act="nav:'+route+'"]').first().click({timeout:10000});await audit(route);if(route==='atb'){if(!await page.locator('.v23-cov').count())throw Error('In-page spectrum missing');await page.locator('[data-act^="v23-spectrum:"]').first().click({timeout:10000});if(!await page.locator('.v23-organisms').count())throw Error('Spectrum filter broken');}if(route==='comparar'){if(!await page.locator('.v23-comp-table').count())throw Error('Comparator table missing');}if(route==='aprender'){if((await page.locator('.v23-learn-reading p').count())<3)throw Error('Learning reviews incomplete');}if(route==='clinica'){if(!await page.locator('.v23-clinical-art img').count())throw Error('Disease illustration missing');}if(route==='micro'&&!await page.locator('.v20-micro-hero h1').count())throw Error('Micro card unavailable');if(route==='atb'&&!await page.locator('.v23-mechanism').count())throw Error('V23 molecular mechanism missing');}
if(vp.width===1600){
 const integrity=await page.evaluate(()=>{
  const issues=[];for(const a of D.antibiotics){const h=drugPageSections(a);if(!h.includes('v23-mechanism')||!h.includes('v23-spectra')||!h.includes('drug-spectrum'))issues.push('drug '+a.id)}
  for(const c of WHO.conditions){const h=clinicalFull(c);if(!h.includes('v23-clinical-art')||!h.includes('v23-clinical-management'))issues.push('clinical '+c.id)}
  const old=state.lesson;for(const c of F.chapters){state.lesson=c.id;const h=learningPage();if(!h.includes('v23-learn-reading')||!h.includes('v23-lesson-case')||h.length<2200)issues.push('learning '+c.id)}state.lesson=old;
  return {drugs:D.antibiotics.length,clinical:WHO.conditions.length,lessons:F.chapters.length,issues};
 });
 all.push({viewport:vp,integrity});
 if(integrity.issues.length)throw Error('Incomplete catalog pages: '+integrity.issues.slice(0,15).join(', '));
 await page.locator('[data-act="nav:atb"]').first().click();
 await page.locator('[data-act="v23-spec-status:all"]').first().click();
 const routeAfter=await page.evaluate(()=>state.route);
 if(routeAfter!=='atb')throw Error('Drug spectrum unexpectedly navigates away');
 await page.locator('[data-act="nav:comparar"]').first().click();
 await page.evaluate(()=>{state.compare=[];render()});
 const ids=await page.evaluate(()=>D.antibiotics.slice(0,11).map(a=>a.id));
 for(const id of ids)await page.locator('[data-act="v23-toggle-compare:'+id+'"]').first().click({timeout:10000});
 const count=await page.evaluate(()=>state.compare.length);
 if(count!==10)throw Error('Comparator allows '+count+' medications, expected limit of 10');
 if(!await page.locator('.v23-comp-table').count())throw Error('Ten-drug comparator table unavailable');
 await page.locator('#v23-compare-micro').selectOption('legionella');
 const newMicro=await page.evaluate(()=>state.compareMicro);
 if(newMicro!=='legionella')throw Error('Comparator organism selector broken');
 await audit('comparador-10-medications');
}
}catch(err){all.push({viewport:vp,error:String(err),stack:err.stack})}
all.push({viewport:vp,jsErrors,missingAssets});await ctx.close();}
await browser.close();server.close();fs.writeFileSync(path.join(dir,'report.json'),JSON.stringify(all,null,2));
let problems=0;for(const x of all){if(x.info){const p=x.info.documentOverflow>8||x.info.overlaps.length>0||x.info.bad.length>0;console.log('QA',x.viewport.width,x.view,'horizontal',x.info.documentOverflow,'overlaps',x.info.overlaps.length,'clipped',x.info.bad.length);if(p){problems++;console.log(JSON.stringify(x.info).slice(0,1100))}}if(x.error){problems++;console.error('ERROR',x.viewport.width,x.error)}if(x.jsErrors?.length){problems++;console.error('JS',x.viewport.width,x.jsErrors.join('; '))}if(x.missingAssets?.length){problems++;console.error('MISSING',x.viewport.width,x.missingAssets.slice(0,10))}}
console.log('QA SUMMARY: '+problems+' problematic records. Full report attached.');if(problems)process.exitCode=1;}
main().catch(e=>{console.error(e);server.close();process.exitCode=1});