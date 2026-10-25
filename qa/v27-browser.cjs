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
const MICRO_DEEP=['s-aureus-mssa','s-aureus-mrsa','staphylococcus-epidermidis','staphylococcus-lugdunensis','staphylococcus-saprophyticus','s-pyogenes','streptococcus-agalactiae-gbs','s-pneumoniae','streptococcus-anginosus-group','streptococcus-mutans','streptococcus-gallolyticus','estreptococos-viridans','e-faecalis','enterococcus-faecium','enterococcus-faecium-vre','bacillus-anthracis','bacillus-cereus','listeria-monocytogenes','corynebacterium-diphtheriae','mycobacterium-tuberculosis','mycobacterium-avium-complex','mycobacterium-leprae','mycobacterium-abscessus-complex','nocardia-spp','neisseria-gonorrhoeae','neisseria-meningitidis','h-influenzae','pasteurella-multocida','e-coli','e-coli-blee','escherichia-coli-cre','k-pneumoniae','klebsiella-pneumoniae-cre','klebsiella-oxytoca','enterobacter-cloacae','klebsiella-aerogenes','citrobacter-freundii','proteus-mirabilis','proteus-vulgaris','morganella-morganii','providencia-stuartii','serratia-marcescens','salmonella-enterica','shigella-spp','yersinia-enterocolitica','vibrio-cholerae','vibrio-vulnificus','aeromonas-hydrophila','p-aeruginosa','pseudomonas-aeruginosa-dtr','acinetobacter-baumannii-complex','acinetobacter-baumannii-crab','stenotrophomonas-maltophilia','burkholderia-cepacia-complex','m-catarrhalis','campylobacter-jejuni','helicobacter-pylori','bordetella-pertussis','brucella-spp','francisella-tularensis','legionella','clostridioides-difficile','clostridium-perfringens','clostridium-tetani','b-fragilis','prevotella-spp','fusobacterium-necrophorum','peptostreptococcus-spp','actinomyces-israelii','cutibacterium-acnes','treponema-pallidum','borrelia-burgdorferi','leptospira-interrogans','mycoplasma','chlamydia-trachomatis','chlamydia-pneumoniae','rickettsia-rickettsii','ehrlichia-chaffeensis','coxiella-burnetii','influenza-a','influenza-b','hav','hbv','hcv','hdv','hev','hiv1','hiv2','hsv1','hsv2','vzv','cmv','ebv','hhv6','hhv8','measles','mumps','parainfluenza','rsv','rsv-b','hmpv','sars-cov-2','norovirus','poliovirus','enterovirus','rhinovirus','dengue','zika','yellow-fever','west-nile','chikungunya','rubella','rabies','ebola','marburg','lassa','hantavirus','cchf','hpv16','hpv18','bk','jc','b19','adenovirus','mpox','rotavirus','trichophyton-rubrum','trichophyton-indotineae','microsporum-canis','epidermophyton','malassezia','sporothrix','fonsecaea','madurella','histoplasma','blastomyces','coccidioides','paracoccidioides','talaromyces','candida-albicans','candida-glabrata','candida-krusei','candida-parapsilosis','candida-tropicalis','candida-auris','candida-dubliniensis','crypto-neoformans','crypto-gattii','aspergillus-fumigatus','aspergillus-flavus','aspergillus-terreus','aspergillus-niger','rhizopus-arrhizus','mucor-circinelloides','lichtheimia-corymbifera','pneumocystis','fusarium','scedosporium','lomentospora','entamoeba','giardia','cryptosporidium-parvum','cryptosporidium-hominis','cyclospora','cystoisospora','balantidium','blastocystis','trichomonas','plasmodium-falciparum','plasmodium-vivax','plasmodium-ovale','plasmodium-malariae','plasmodium-knowlesi','babesia-microti','toxoplasma','leishmania-donovani','leishmania-braziliensis','leishmania-tropica','trypanosoma-brucei','trypanosoma-cruzi','naegleria','acanthamoeba','balamuthia','enterobius','ascaris','trichuris','ancylostoma','necator','strongyloides','toxocara','trichinella','onchocerca','wuchereria','loa-loa','angiostrongylus','schisto-mansoni','schisto-japonicum','schisto-haematobium','fasciola','clonorchis','paragonimus','taenia-solium','taenia-saginata','echinococcus-granulosus','echinococcus-multilocularis','hymenolepis','sarcoptes','pediculus'];
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
  // WHO AWaRe: cada condición WHO trae su panel con dosis, primera elección y duración
  await go('clinica');
  const WHO_IDS=await page.evaluate(()=>Object.keys(window.ATLAS25.whoTreat||{}));
  checks++;assert(WHO_IDS.length===37,`whoTreat debe cubrir 37 condiciones, hay ${WHO_IDS.length}`);
  for(const id of WHO_IDS){
   await page.evaluate(i=>window.act('v25-clinical:'+i),id);await page.waitForTimeout(120);
   const w=await page.evaluate(()=>{const p=document.querySelector('.who-panel');if(!p)return null;return {esc:p.querySelectorAll('.who-esc').length,txt:p.innerText,over:document.documentElement.scrollWidth-innerWidth,inner:p.scrollWidth-p.clientWidth,tabs:p.querySelectorAll('.who-tabs button').length,first:p.querySelectorAll('.who-line:not(.who-second) .who-drug').length,dur:p.querySelectorAll('.who-dur').length}});
   checks++;assert(w&&w.esc>=1,`panel WHO ausente en ${id}@${width}`);
   assert(!/\$\{|undefined|NaN|\[object Object\]/.test(w.txt),`texto sin renderizar en WHO ${id}@${width}`);
   assert(w.over<9&&w.inner<2,`desborde WHO ${id}@${width}`);
   assert(/Fuente: WHO AWaRe antibiotic book 2022/.test(w.txt),`fuente WHO ausente en ${id}`);
   if(!['who-04'].includes(id)){assert(w.first>=1&&w.dur>=1,`WHO ${id} sin primera elección o duración`)}
  }
  // Fármacos esenciales: cada monografía abre su pauta completa sin fugas ni desborde; las que tienen ficha muestran el panel en ella
  await go('atb');
  await page.evaluate(()=>window.act('atb-view:esenciales'));await page.waitForTimeout(200);
  const ESS_IDS=await page.evaluate(()=>Object.keys(window.ATLAS25.essential||{}));
  checks++;assert(ESS_IDS.length>=30,`esenciales: se esperaban ≥30 monografías, hay ${ESS_IDS.length}`);
  for(const id of ESS_IDS){
   const r=await page.evaluate(i=>{window.act('ess-open:'+i);const c=document.querySelector('.ess-card.open .ess-panel');const t=c?c.innerText:'';window.act('ess-open:'+i);return {ok:!!c,rows:c?c.querySelectorAll('tbody tr').length:0,leak:/\$\{|undefined|NaN|\[object Object\]/.test(t),src:/MSF Essential drugs/.test(t),over:document.documentElement.scrollWidth-innerWidth}},id);
   checks++;assert(r.ok&&r.rows>=1&&!r.leak&&r.src&&r.over<9,`esencial ${id}@${width}: ${JSON.stringify(r)}`);
  }
  await page.evaluate(()=>window.act('atb-view:catalogo'));
  for(const id of ['ceftriaxona','amoxicilina','rifampicina','penicilina-g','oxacilina']){
   const r=await page.evaluate(i=>{window.act('nx-find:drug:bacteria:'+i);return document.querySelectorAll('.ess-panel').length},id);await page.waitForTimeout(60);
   checks++;assert(r>=1,`panel de pauta ausente en la ficha ${id}@${width}`);
  }
  await go('micro');
  for(const id of MICRO_DEEP){await page.evaluate(i=>window.act('v24-open-micro:'+i),id);await page.waitForTimeout(250);
   const m=await page.evaluate(()=>({blocks:document.querySelectorAll('.v25-md-block').length,over:document.documentElement.scrollWidth-innerWidth,leak:/\$\{|undefined|NaN/.test(document.querySelector('#micro-profundo')?.innerText||'')}));
   checks++;assert(m.blocks>=5&&!m.leak&&m.over<9,`revisión ampliada de microorganismo ${id}@${width}: ${JSON.stringify(m)}`)}
  const DRUG_IDS=await page.evaluate(()=>Object.keys(window.ATLAS25.drugDeep||{}));
  for(const id of DRUG_IDS){await page.evaluate(i=>window.act('v24-open-drug:'+i),id);await page.waitForTimeout(150);
   const m=await page.evaluate(()=>({blocks:document.querySelectorAll('#drug-profundo .v25-md-block').length,over:document.documentElement.scrollWidth-innerWidth,leak:/\$\{|undefined|NaN/.test(document.querySelector('#drug-profundo')?.innerText||'')}));
   checks++;assert(m.blocks>=6&&!m.leak&&m.over<9,`revisión ampliada de fármaco ${id}@${width}: ${JSON.stringify(m)}`)}
  // comparator: target follows the kingdom of the first chosen agent and sidebar tabs stay readable
  await go('comparar');
  await page.evaluate(()=>{window.act('nx-cmp-toggle:ceftriaxona');window.act('nx-cmp-toggle:meropenem');window.act('nx-cmp-toggle:piptazo')});await page.waitForTimeout(250);
  checks++;assert(await page.locator('.cmp-tag').count()===3,'el comparador no muestra los agentes elegidos');
  await page.selectOption('#nx-cmp-target','e-coli');await page.waitForTimeout(250);
  checks++;assert(await page.locator('.cmp-tcard').count()===3,'el comparador no muestra el nivel frente a la especie objetivo');
  // cobertura: pocos agentes sin ningún dato y niveles graduados presentes
  await go('mapa');await page.evaluate(()=>window.act('nx-view:matriz'));await page.waitForTimeout(500);
  const cov=await page.evaluate(()=>({rows:document.querySelectorAll('.cv-row').length,lv:['lY','lM','lS','lR','lN'].map(c=>document.querySelectorAll('.cv-cell.'+c).length)}));
  checks++;assert(cov.rows>=95&&cov.lv.every(n=>n>0),'matriz de cobertura incompleta '+JSON.stringify(cov));
  await page.evaluate(()=>window.act('nx-view:especie'));await page.waitForTimeout(250);
  checks++;assert(await page.locator('.nx-viewtabs button.active').count()===1&&await page.locator('.nx-viewtabs button').count()===3,'las pestañas de vista desaparecen en la vista por especie');
  await go('laboratorio');await page.evaluate(()=>window.act('nx-lab-syn:nac'));await page.waitForTimeout(250);
  checks++;assert(await page.locator('.lab-table tr').count()>=4,'el laboratorio no calcula la cobertura del síndrome');
  await page.screenshot({path:path.join(folder,`comparator-${width}.png`)});
  await go('laboratorio');await page.screenshot({path:path.join(folder,`lab-${width}.png`)});
  assert(!errors.length,'errores de página: '+errors.join('|'));
  console.log(`V27 ${width}px ok`);await page.context().close();
 }
 await browser.close();server.close();console.log(`INFEORA V27 QA: ${checks} comprobaciones, 0 fallos`);
}
main().catch(e=>{console.error(e);process.exit(1)});
