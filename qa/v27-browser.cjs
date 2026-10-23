/* INFEORA V27 — regression checks for audit fixes: collapsed filter chips, unrendered template text,
   syndrome tab labels, comparator target coherence and deep syndrome reviews. */
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),folder=path.join(root,'qa','results27');fs.mkdirSync(folder,{recursive:true});
const types={'.js':'text/javascript','.css':'text/css','.html':'text/html','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg'};
const server=http.createServer((req,res)=>{
 let p=decodeURIComponent(new URL(req.url,'http://x').pathname);if(p.endsWith('/'))p+='index.html';
 const fp=path.resolve(root,'.'+p);if(!fp.startsWith(root+path.sep))return res.writeHead(403).end();
 fs.readFile(fp,(e,d)=>{if(e)return res.writeHead(404).end();res.setHeader('Content-Type',types[path.extname(fp)]||'application/octet-stream');res.end(d)});
});
const assert=(x,m)=>{if(!x)throw Error(m)};
const MICRO_DEEP=['s-aureus-mssa','s-aureus-mrsa','staphylococcus-epidermidis','staphylococcus-lugdunensis','staphylococcus-saprophyticus','s-pyogenes','streptococcus-agalactiae-gbs','s-pneumoniae','streptococcus-anginosus-group','streptococcus-mutans','streptococcus-gallolyticus','estreptococos-viridans','e-faecalis','enterococcus-faecium','enterococcus-faecium-vre','bacillus-anthracis','bacillus-cereus','listeria-monocytogenes','corynebacterium-diphtheriae','mycobacterium-tuberculosis','mycobacterium-avium-complex','mycobacterium-leprae','mycobacterium-abscessus-complex','nocardia-spp','neisseria-gonorrhoeae','neisseria-meningitidis','h-influenzae','pasteurella-multocida','e-coli','e-coli-blee','escherichia-coli-cre','k-pneumoniae','klebsiella-pneumoniae-cre','klebsiella-oxytoca','enterobacter-cloacae','klebsiella-aerogenes','citrobacter-freundii','proteus-mirabilis','proteus-vulgaris','morganella-morganii','providencia-stuartii','serratia-marcescens','salmonella-enterica','shigella-spp','yersinia-enterocolitica','vibrio-cholerae','vibrio-vulnificus','aeromonas-hydrophila'];
const DEEP=['infective-endocarditis','who-16','who-24','who-26','who-27','who-34','who-39'];
async function main(){
 await new Promise(ok=>server.listen(9177,'127.0.0.1',ok));
 const browser=await chromium.launch({headless:true,args:['--no-sandbox'],...(process.env.CHROME_BIN?{executablePath:process.env.CHROME_BIN}:{})});
 let checks=0;
 for(const width of [1600,1280,768,390]){
  const page=await (await browser.newContext({viewport:{width,height:width<=390?840:900}})).newPage(),errors=[];
  page.on('pageerror',e=>errors.push(String(e)));
  await page.goto('http://127.0.0.1:9177/infeora/');await page.waitForSelector('.nx-rail, .nx-topbar',{timeout:15000});
  const go=r=>page.evaluate(x=>window.act('nx-go:'+x),r).then(()=>page.waitForTimeout(250));
  const scan=()=>page.evaluate(()=>({leak:[...document.body.innerText.matchAll(/\$\{[^}]*\}|\bundefined\b|\bNaN\b|\[object Object\]/g)].map(m=>m[0]),overflow:document.documentElement.scrollWidth-innerWidth,
   squashed:[...document.querySelectorAll('.v24-domainbar button,.v25-clinic-systems button')].filter(b=>b.offsetParent&&b.getBoundingClientRect().height<26).map(b=>b.textContent)}));
  for(const r of ['inicio','mapa','micro','atb','clinica','comparar','aprender','laboratorio','fuentes']){
   await go(r);const s=await scan();checks++;
   assert(!s.leak.length,`${r}@${width}: texto sin renderizar ${s.leak}`);assert(s.overflow<9,`${r}@${width}: desborde ${s.overflow}`);assert(!s.squashed.length,`${r}@${width}: chips colapsados ${s.squashed}`);
   if(['laboratorio','fuentes'].includes(r)){const t=await page.evaluate(()=>document.body.innerText);if(r==='fuentes')assert(!/VOLUMEN 09 \/ 08/.test(t),'contador de volumen incoherente');}
  }
  // syndromes: tab labels not clipped to first word, deep reviews rendered
  await go('clinica');
  for(const id of DEEP){
   await page.evaluate(i=>window.act('v25-clinical:'+i),id);await page.waitForTimeout(250);
   const d=await page.evaluate(()=>({deep:!!document.querySelector('#v25-syn-deep'),steps:document.querySelectorAll('.v25-deep-steps li').length,refs:document.querySelectorAll('.v25-deep-refs a').length,tabs:[...document.querySelectorAll('.v25-syndrome-nav a')].map(a=>a.textContent),overflow:document.documentElement.scrollWidth-innerWidth}));
   checks++;assert(d.deep&&d.steps>=5&&d.refs>=2,`revisión ampliada ausente en ${id}@${width}`);assert(!d.tabs.some(t=>/ (Qué|Tratamiento,|Estudios)$/.test(t)),'pestañas truncadas '+d.tabs);assert(d.overflow<9,`desborde en ${id}@${width}`);
   await page.screenshot({path:path.join(folder,`deep-${id}-${width}.png`)});
   await page.evaluate(()=>document.querySelector('#v25-syn-deep').scrollIntoView());await page.waitForTimeout(100);
   await page.screenshot({path:path.join(folder,`deep-${id}-body-${width}.png`)});
  }
  await go('micro');
  for(const id of MICRO_DEEP){await page.evaluate(i=>window.act('v24-open-micro:'+i),id);await page.waitForTimeout(250);
   const m=await page.evaluate(()=>({blocks:document.querySelectorAll('.v25-md-block').length,over:document.documentElement.scrollWidth-innerWidth,leak:/\$\{|undefined|NaN/.test(document.querySelector('#micro-profundo')?.innerText||'')}));
   checks++;assert(m.blocks>=5&&!m.leak&&m.over<9,`revisión ampliada de microorganismo ${id}@${width}: ${JSON.stringify(m)}`)}
  // comparator: target follows the kingdom of the first chosen agent and sidebar tabs stay readable
  await go('comparar');await page.evaluate(()=>[...document.querySelectorAll('button')].find(x=>/integral/.test(x.textContent))?.click());await page.waitForTimeout(250);
  await page.evaluate(()=>window.act('v24-compare-clear'));await page.waitForTimeout(100);
  await page.evaluate(()=>window.act('v24-compare-tab:bacteria'));await page.waitForTimeout(100);
  const first=await page.evaluate(()=>document.querySelector('.v24-comp-druglist button')?.dataset.act);
  await page.evaluate(a=>window.act(a),first);await page.waitForTimeout(250);
  const tgt=await page.evaluate(()=>document.querySelector('#v24-compare-micro')?.selectedOptions[0]?.parentElement?.label);
  checks++;assert(tgt==='Bacterias','el objetivo del comparador no sigue el dominio del fármaco elegido: '+tgt);
  await page.screenshot({path:path.join(folder,`comparator-${width}.png`)});
  await go('laboratorio');await page.screenshot({path:path.join(folder,`lab-${width}.png`)});
  assert(!errors.length,'errores de página: '+errors.join('|'));
  console.log(`V27 ${width}px ok`);await page.context().close();
 }
 await browser.close();server.close();console.log(`INFEORA V27 QA: ${checks} comprobaciones, 0 fallos`);
}
main().catch(e=>{console.error(e);process.exit(1)});
