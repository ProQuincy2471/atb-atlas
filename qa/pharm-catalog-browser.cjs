/* INFEORA V46 pharmacology catalog: real Chromium regression (5 domains). */
'use strict';
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),out=path.join(root,'qa','results-pharm');
fs.mkdirSync(out,{recursive:true});
const types={'.js':'application/javascript','.css':'text/css','.html':'text/html','.json':'application/json','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'};
const server=http.createServer((req,res)=>{
 const u=new URL(req.url,'http://localhost'),p=decodeURIComponent(u.pathname),q=p.endsWith('/')?p+'index.html':p;
 const file=path.resolve(root,'.'+q);
 if(!file.startsWith(root+path.sep))return res.writeHead(403).end();
 fs.readFile(file,(error,buf)=>{
  if(error)return res.writeHead(404).end(q);
  res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(buf);
 });
});
const assert=(value,message)=>{if(!value)throw Error(message)};
async function main(){
 await new Promise(ok=>server.listen(9184,'127.0.0.1',ok));
 const browser=await chromium.launch({headless:true,args:['--no-sandbox'],...(process.env.CHROME_BIN?{executablePath:process.env.CHROME_BIN}:{})});
 const records=[];
 for(const width of [1600,1280,768,390]){
  const ctx=await browser.newContext({viewport:{width,height:900},serviceWorkers:'block'});
  await ctx.addInitScript(()=>{window.__PHARM_QA__=true});
  const page=await ctx.newPage(),jsErrors=[],missing=[];
  page.on('pageerror',error=>jsErrors.push(String(error)));
  page.on('response',response=>{if(response.status()>=400&&response.url().includes('127.0.0.1:9184'))missing.push(response.status()+' '+response.url())});
  const check=async(label)=>{
   const result=await page.evaluate(()=>{
    const page=document.documentElement;const el=document.querySelector('.ph-catalog');
    const layout=el?.querySelector('.ph-layout');
    const pane=el?.querySelector('.ph-coverage');
    const article=el?.querySelector('.ph-article');
    const tree=el?.querySelector('.ph-sidebar');
    return {overflow:page.scrollWidth-innerWidth,layout:layout?.getBoundingClientRect().width||0,
      panes:!!article&&!!tree&&!!pane,domain:window.INFEORA_PHARM?.domain,
      count:el?.querySelectorAll('.ph-drug').length||0};
   });
   assert(result.overflow<=8,label+' body overflow '+JSON.stringify(result));
   if(!result.layout)throw Error(label+' layout absent');
   records.push({width,label,...result});
   await page.screenshot({path:path.join(out,label+'-'+width+'.png'),fullPage:false});
  };
  try{
   const start=width===1280?'/infeora/':'/';
   await page.goto('http://127.0.0.1:9184'+start,{waitUntil:'domcontentloaded',timeout:30000});
   await page.waitForFunction(()=>!!window.INFEORA_APP&&document.querySelector('.hm-drawers'),{timeout:23000});
   await page.evaluate(()=>window.act('nx-go:atb'));
   await page.waitForSelector('.ph-catalog',{timeout:23000});
   const counts=await page.evaluate(()=>({n:window.INFEORA_PHARM&&document.querySelectorAll('.ph-domain').length,
     drugs:document.querySelector('.ph-topstat strong')?.textContent,
     count:document.querySelectorAll('.ph-drug').length}));
   assert(counts.n===5,'Expected 5 territories '+JSON.stringify(counts));
   assert(Number(counts.drugs)>=261,'Expected 235 original + 26 documented new agents '+counts.drugs);
   assert(await page.evaluate(()=>window.INFEORA_PHARM_CLINICAL?.additions.length)===26,'Supplemental agents unavailable');
   await check('antibacterianos');
   for(const [domain,minCount] of [['tb',10],['virus',50],['fungi',20],['parasites',35]]){
     await page.locator('[data-ph="domain"][data-val="'+domain+'"]').click();
     const count=await page.locator('.ph-drug').count();
     assert(count>=minCount,domain+' incomplete roster '+count);
     const hero=await page.locator('.ph-article-hero h2').first().innerText();
     assert(hero.length>4,domain+' no detail');
     await check(domain);
   }
   await page.locator('[data-ph="domain"][data-val="bacteria"]').click();
   await page.locator('[data-ph="block"][data-val="β-lactámicos"]').click();
   assert((await page.locator('.ph-subtree .ph-tree-btn').count())>=5,'Antibacterial subgroups missing');
   await page.locator('[data-ph="sub"]').first().click();
   assert((await page.locator('.ph-drug').count())>0,'Subgroup filter lost roster');
   await page.locator('[data-ph="clear"]').click();
   await page.locator('[data-ph-input="search"]').fill('cefiderocol');
   assert(await page.locator('.ph-drug').count()===1,'Search not constrained');
   await page.locator('.ph-drug').first().click();
   assert((await page.locator('.ph-article-hero h2').innerText()).includes('Cefiderocol'),'Selected drug not opened');
   assert((await page.locator('.ph-brief-grid .ph-brief-item').count())===3,'Three clinical reasoning cards must be visible');
   assert((await page.locator('.ph-mechanism-flow .ph-mech-node').count())===3,'Source-grounded molecular pathway must include three steps');
   assert((await page.locator('.ph-cover-key [data-grade]').count())===6,'Six evidence/coverage states must remain distinct');
   assert((await page.locator('.ph-lesson-nav button').count())>=7,'Intra-article learning navigation absent');
   assert((await page.locator('.ph-indication-grid .ph-indication').count())>=1,'Clinical scenarios absent');
   await page.locator('[data-ph="jump"][data-val="ph-step-05"]').click();
   assert(await page.locator('#ph-step-05').count()===1,'Section anchor missing');
   await check('cefiderocol');
   assert((await page.locator('.ph-dose-scroll tbody tr').count())>=1,'IDSA cefiderocol dosing unavailable');
   assert((await page.locator('.ph-dose-source a').count())>=1,'Cefiderocol row missing original IDSA citation');
   assert((await page.locator('.ph-phenos .ph-pheno').count())>=2,'Cefiderocol resistance phenotype panel missing');
   await page.locator('[data-ph="compare-add"]').click();
   await page.locator('[data-ph="mode"][data-val="comparar"]').click();
   assert((await page.locator('.ph-compare-scroll table').count())===1,'Compare table absent');
   await page.locator('[data-ph-change="comparePick"]').selectOption('meropenem');
   assert((await page.locator('.ph-compare-scroll thead th').count())===3,'Comparator did not add second drug');
   assert((await page.locator('.ph-compare-scroll').innerText()).includes('MBL'),'Phenotype rows missing in comparator');
   await check('comparador');
   await page.locator('[data-ph="mode"][data-val="ficha"]').click();
   await page.locator('[data-ph="domain"][data-val="bacteria"]').click();
   await page.locator('[data-ph-input="search"]').fill('amoxicilina');
   await page.locator('.ph-drug').first().click();
   assert((await page.locator('.ph-dose-scroll tbody tr').count())>=1,'Documented adult dose unavailable');
   assert((await page.locator('.ph-coverage').count())===1,'Coverage panel missing');
   await page.locator('[data-ph-input="search"]').fill('cefaclor');
   await page.locator('.ph-drug').first().click();
   assert((await page.locator('.ph-source-gap').count())===1,'Cefaclor must be honestly marked without a verified dose');
   await page.locator('[data-ph-input="search"]').fill('pivmecilinam');
   await page.locator('.ph-drug').first().click();
   assert((await page.locator('.ph-dose-source').count())===2,'Both cited pivmecillinam regimens should remain separate');
   assert((await page.locator('.ph-dose-section').innerText()).includes('370 mg'),'IDSA pivmecillinam dose missing');
   assert((await page.locator('.ph-dose-section').innerText()).includes('185 mg'),'FDA pivmecillinam dose missing');
   await check('pivmecilinam');
   await page.locator('[data-ph="domain"][data-val="virus"]').click();
   await page.locator('[data-ph-input="search"]').fill('bictegravir-lenacapavir');
   assert((await page.locator('.ph-drug').count())===1,'Bixlenvo not present');
   await page.locator('.ph-drug').first().click();
   assert((await page.locator('.ph-dose-section').innerText()).includes('Días 1 y 2'),'Bixlenvo oral initiation not shown');
   assert((await page.locator('.ph-reviewed-links').innerText()).includes('BIXLENVO'),'Bixlenvo FDA citation missing');
   await check('bictegravir-lenacapavir');
   await page.locator('[data-ph="domain"][data-val="fungi"]').click();
   await page.locator('[data-ph-input="search"]').fill('rezafungina');
   await page.locator('.ph-drug').first().click();
   assert((await page.locator('.ph-dose-section').innerText()).includes('400 mg'),'Rezafungin loading dose missing');
   await check('rezafungina');
   await page.locator('[data-ph="domain"][data-val="parasites"]').click();
   await page.locator('[data-ph-input="search"]').fill('Arteméter');
   await page.locator('.ph-drug').first().click();
   assert((await page.locator('.ph-dose-section').innerText()).includes('días 2–5'),'CDC 2026 malaria schedule missing');
   await check('artemeter-lumefantrina');

   assert(!jsErrors.length,'Runtime errors '+jsErrors.join('; '));
   assert(!missing.length,'Missing assets '+missing.join('; '));
  }catch(error){records.push({width,error:String(error),stack:error.stack,jsErrors,missing});}
  await ctx.close();
 }
 await browser.close();server.close();
 fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(records,null,2));
 const errors=records.filter(r=>r.error||r.overflow>8);
 records.filter(r=>r.label).forEach(r=>console.log('PHARM',r.width,r.label,'overflow',r.overflow));
 errors.forEach(r=>console.error('PHARM FAIL',r.width,r.error));
 console.log('INFEORA PHARM QA:',records.filter(r=>r.label).length,'views,',errors.length,'failures');
 if(errors.length)process.exitCode=1;
}
main().catch(e=>{console.error(e);server.close();process.exitCode=1});
