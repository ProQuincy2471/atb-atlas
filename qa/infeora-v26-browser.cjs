/* INFEORA V26 — Real UI/UX regression at 5 viewport widths, canonical and branded path. */
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),folder=path.join(root,'qa','results26');fs.mkdirSync(folder,{recursive:true});
const types={'.js':'text/javascript','.css':'text/css','.html':'text/html','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp'};
const server=http.createServer((req,res)=>{
 const pathName=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname),requested=pathName.endsWith('/')?pathName+'index.html':pathName,fp=path.resolve(root,'.'+requested);
 if(!fp.startsWith(root+path.sep))return res.writeHead(403).end();
 fs.readFile(fp,(err,data)=>{if(err)return res.writeHead(404).end(requested);res.setHeader('Content-Type',types[path.extname(fp)]||'application/octet-stream');res.end(data)});
});
const records=[];
const assert=(x,m)=>{if(!x)throw Error(m)};
async function main(){
 await new Promise(ok=>server.listen(9176,'127.0.0.1',ok));
 const browser=await chromium.launch({headless:true,args:['--no-sandbox'],...(process.env.CHROME_BIN?{executablePath:process.env.CHROME_BIN}:{})});
 for(const width of [1600,1280,1024,768,390]){
  const ctx=await browser.newContext({viewport:{width,height:width<=390?840:900}}),page=await ctx.newPage(),errors=[],missing=[];
  page.on('pageerror',e=>errors.push(String(e)));
  page.on('response',r=>{if(r.status()>=400&&r.url().includes('127.0.0.1:9176'))missing.push(r.status()+': '+r.url())});
  const act=cmd=>page.evaluate(x=>window.act(x),cmd);
  async function snap(label){
   await page.waitForTimeout(110);
   const rect=await page.evaluate(()=>{
    const paneNames=['.nx-hero','.nx-home-domains','.nx-explore-tabs','.nx-explore-workspace','.nx-selected-organism','.nx-spectrum-row','.nx-topbar','.nx-spectrum-stats','.nx-home-bottom','.nx-rail-header','.v24-columns','.v24-mechanism','.v25-clinic-layout','.v24-compare-layout','.v24-book-layout'];
    const collisions=[];
    for(const selector of paneNames){
     for(const el of document.querySelectorAll(selector)){
      const er=el.getBoundingClientRect();if(er.width<=0||er.height<=0)continue;
      const kids=[...el.children].filter(x=>{const q=getComputedStyle(x);return q.display!=='none'&&q.position!=='absolute'&&q.position!=='fixed';});
      for(let i=0;i<kids.length;i++)for(let j=i+1;j<kids.length;j++){const a=kids[i].getBoundingClientRect(),b=kids[j].getBoundingClientRect(),x=Math.min(a.right,b.right)-Math.max(a.left,b.left),y=Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top);if(x>13&&y>13)collisions.push({selector,x:Math.round(x),y:Math.round(y)});}
     }
    }
    return {overflow:document.documentElement.scrollWidth-innerWidth,collisions,brand:document.querySelector('.nx-brand-type strong')?.textContent,frame:document.querySelector('.nx-stage')?.clientWidth};
   });
   records.push({width,view:label,...rect});
   assert(rect.overflow<9,label+' horizontal overflow '+rect.overflow+' @'+width);
   assert(!rect.collisions.length,label+' collisions '+JSON.stringify(rect.collisions)+' @'+width);
   assert(rect.brand?.includes('INFEORA'),'Brand not visible '+label);
   await page.screenshot({path:path.join(folder,label+'-'+width+'.png'),fullPage:false});
  }
  try{
   const open=width===1280?'http://127.0.0.1:9176/infeora/':'http://127.0.0.1:9176/';
   await page.goto(open,{waitUntil:'domcontentloaded',timeout:28000});
   let ready=false;
   for(let attempt=0;attempt<3;attempt++){
    try{
     await page.waitForFunction(()=>!!window.INFEORA_APP&&!!document.querySelector('.nx-home-domains'),null,{timeout:18000});
     ready=true;break;
    }catch(error){
     if(attempt===2)throw new Error('INFEORA app boot failed after 3 attempts: '+String(error)+'; page errors: '+errors.join(' | ')+'; missing assets: '+missing.join(' | '));
     errors.length=0;missing.length=0;
     await page.reload({waitUntil:'domcontentloaded',timeout:30000});
    }
   }
   assert(ready,'INFEORA failed to initialize');
   assert((await page.title()).includes('INFEORA'),'Page title missing');
   assert(await page.locator('.nx-rail-link').count()>=9,'Nine nav destinations missing');
   if(width===1280){
    const base=await page.evaluate(()=>({base:document.baseURI,href:location.href,css:document.querySelector('link[href*="infeora-v26"]')?.href}));
    assert(base.base.endsWith('/'),'Base path missing');
    assert(base.href.includes('/infeora/'),'Branded URL alias missing');
    records.push({alias:base});
   }
   await snap('home');
   await act('nx-home-domain:virus');
   assert(await page.locator('.nx-explore-tabs button.active').count()===1,'Domain selection not retained');
   assert(await page.locator('.rm-svg .rm-group').count()>=3,'Relationship map missing');
   await snap('explore-map-virus');
   await act('nx-view:matriz');
   assert(await page.locator('.cv-table tbody .cv-row').count()>=5&&await page.locator('.cv-table .cv-cell').count()>100,'Coverage matrix missing');
   await snap('explore-matrix-virus');
   await act('nx-view:especie');
   assert(await page.locator('.nx-explore-species button').count()>30,'Virus species list missing');
   await snap('explore-virus');
   await act('nx-map-domain:fungi');await act('nx-map-micro:candida-auris');
   assert((await page.locator('.nx-selected-main h2').innerText()).includes('Candida auris'),'Fungal selection failed');
   assert(await page.locator('.nx-spectrum-stats button').count()===4,'Four evidence states missing');
   await snap('explore-fungi');
   await act('nx-map-domain:parasites');await act('nx-map-micro:plasmodium-falciparum');await snap('explore-parasites');
   await act('nx-map-domain:bacteria');await snap('explore-bacteria');
   await act('nx-search-open');assert(await page.locator('.nx-command').count()===1,'Command palette missing');
   await page.locator('#nx-command-input').fill('Candida auris');await page.waitForTimeout(120);
   assert((await page.locator('.nx-command-results').innerText()).includes('Candida auris'),'Global search does not find fungal organism');
   await snap('command-search');
   await act('nx-find:micro:fungi:candida-auris');
   assert(await page.locator('.v24-detail').count()===1,'Fungal detail route missing');
   await snap('micro-detail');
   await act('nx-go:atb');await act('v24-mode:drugs:fungi');await act('v24-open-drug:micafungina');
   assert(await page.locator('.v24-mechanism>div').count()===3,'Detailed molecular mechanism missing');
   await snap('drug-detail');
   await act('nx-go:clinica');assert(await page.locator('.v25-clinic-article').count()===1,'Syndrome library missing');await snap('syndromes');
   await act('nx-go:comparar');assert(await page.locator('.v24-compare-scroll').count()===1,'Integrated comparator missing');await snap('comparator');
   await act('nx-go:aprender');assert(await page.locator('.v24-book,.v23-learn').count()>0,'Lesson library missing');await snap('learning');
   await act('nx-go:laboratorio');assert(await page.locator('.nx-section-laboratorio').count()===1,'Laboratory page missing');await snap('lab');
   await act('nx-go:fuentes');assert(await page.locator('.nx-section-fuentes').count()===1,'Sources page missing');await snap('sources');
   if(width<=768){await act('nx-drawer');assert(await page.locator('.nx-rail.drawer-open').count()===1,'Mobile nav drawer broken');await snap('mobile-menu');await act('nx-drawer')}
   assert(!errors.length,'Runtime page errors: '+errors.join('; '));assert(!missing.length,'404 local assets: '+missing.join('; '));
  }catch(e){records.push({width,error:String(e),stack:e.stack})}
  await ctx.close();
 }
 await browser.close();server.close();fs.writeFileSync(path.join(folder,'report.json'),JSON.stringify(records,null,2));
 const fails=records.filter(x=>x.error||x.overflow>8||x.collisions?.length);records.filter(x=>x.view).forEach(x=>console.log('INFEORA QA',x.width,x.view,'overflow',x.overflow,'collision',x.collisions.length));
 for(const x of fails)console.error('INFEORA FAIL',x.width,x.error||JSON.stringify(x));
 console.log('INFEORA V26 QA:',records.filter(x=>x.view).length,'screen snapshots,',fails.length,'failures');
 if(fails.length)process.exitCode=1;
}
main().catch(e=>{console.error(e);server.close();process.exitCode=1});
