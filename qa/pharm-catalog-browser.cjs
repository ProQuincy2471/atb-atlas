/* INFEORA V45 pharmacology catalog: real Chromium regression (5 domains). */
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
   assert(Number(counts.drugs)>=230,'Catalog inventory incomplete '+counts.drugs);
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
   await check('cefiderocol');
   const noDose=await page.locator('.ph-source-gap').count();
   assert(noDose===1,'No unverified adult dosing should be invented for cefiderocol');
   await page.locator('[data-ph="compare-add"]').click();
   await page.locator('[data-ph="mode"][data-val="comparar"]').click();
   assert((await page.locator('.ph-compare-scroll table').count())===1,'Compare table absent');
   await page.locator('[data-ph-change="comparePick"]').selectOption('meropenem');
   assert((await page.locator('.ph-compare-scroll thead th').count())===3,'Comparator did not add second drug');
   await check('comparador');
   await page.locator('[data-ph="mode"][data-val="ficha"]').click();
   await page.locator('[data-ph="domain"][data-val="bacteria"]').click();
   await page.locator('[data-ph-input="search"]').fill('amoxicilina');
   await page.locator('.ph-drug').first().click();
   assert((await page.locator('.ph-dose-scroll tbody tr').count())>=1,'Documented adult dose unavailable');
   assert((await page.locator('.ph-coverage').count())===1,'Coverage panel missing');
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
