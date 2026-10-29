/* CARDIORA — QA de navegador: integridad de datos, todas las rutas en 5 anchos (sin errores, fugas de plantilla ni desbordes)
   e interacciones (búsqueda, latido interactivo, simulador ACLS, calculadoras, práctica, progreso). Capturas en qa/results-cardio. */
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),folder=path.join(root,'qa','results-cardio');fs.mkdirSync(folder,{recursive:true});
const types={'.js':'text/javascript','.css':'text/css','.html':'text/html','.json':'application/json','.svg':'image/svg+xml','.png':'image/png'};
const server=http.createServer((req,res)=>{
 let p=decodeURIComponent(new URL(req.url,'http://x').pathname);if(p.endsWith('/'))p+='index.html';
 const fp=path.resolve(root,'.'+p);if(!fp.startsWith(root+path.sep))return res.writeHead(403).end();
 fs.readFile(fp,(e,d)=>{if(e)return res.writeHead(404).end();res.setHeader('Content-Type',types[path.extname(fp)]||'application/octet-stream');res.end(d)});
});
const assert=(x,m)=>{if(!x)throw Error(m)};
const BASE='http://127.0.0.1:9188/cardio/';
async function main(){
 await new Promise(ok=>server.listen(9188,'127.0.0.1',ok));
 const browser=await chromium.launch({headless:true,args:['--no-sandbox'],...(process.env.CHROME_BIN?{executablePath:process.env.CHROME_BIN}:{})});
 let checks=0;const report=[];

 // 1. Integridad de datos
 {const page=await browser.newPage();await page.goto(BASE);await page.waitForSelector('.cd-top');
  const d=await page.evaluate(()=>{const C=window.CARDIO,errs=[],ids=new Set(),rid=new Set(C.ritmos.map(r=>r.id)),pid=new Set(C.patologias.map(p=>p.id)),aid=new Set(C.acls.map(a=>a.id));
   for(const [area,list] of [['fundamentos',C.fundamentos],['ecg',C.ecgLecciones],['acls',C.acls]])for(const x of list){if(ids.has(x.id))errs.push('id duplicado '+x.id);ids.add(x.id);
    if(!x.secciones.length||!x.claves.length)errs.push('lección incompleta '+x.id);
    for(const s of x.secciones)for(const b of s.b){if(typeof b==='string')continue;const k=Object.keys(b).filter(k=>!['cap','lead'].includes(k));if(k.length!==1||!['ul','ol','table','pearl','warn','flow','ecg'].includes(k[0]))errs.push('bloque desconocido en '+x.id+': '+k);if(b.ecg&&!rid.has(b.ecg)&&!/^(rbbb|lbbb)/.test(b.ecg))errs.push('trazo inexistente '+b.ecg);if(b.table&&b.table.r.some(r=>r.length!==b.table.h.length))errs.push('tabla desigual en '+x.id+' / '+s.h)}}
   for(const r of C.ritmos){if(r.acls&&!aid.has(r.acls))errs.push('ritmo→acls roto '+r.id);if(r.pato&&!pid.has(r.pato))errs.push('ritmo→patología rota '+r.id);
    const sig=window.ECG.signal(r.id,{seconds:6}),amp=Math.max(...sig)-Math.min(...sig);if(r.id!=='asystole'&&amp<0.3)errs.push('trazo plano '+r.id);if(sig.some(v=>!isFinite(v)))errs.push('trazo NaN '+r.id)}
   for(const p of C.patologias){if(p.ecg&&!rid.has(p.ecg))errs.push('patología→ritmo roto '+p.id);if(!C.categorias.some(c=>c[0]===p.cat))errs.push('categoría '+p.id);for(const k of ['clinica','dx','tx','rojo','perlas'])if(!p[k]||!p[k].length)errs.push(`patología ${p.id} sin ${k}`)}
   for(const q of C.quiz)if(!(q.k>=0&&q.k<q.o.length)||!q.x)errs.push('pregunta inválida '+q.q);
   for(const t of C.aclsFarmacos.concat(C.aclsEnergias))if(t.length!==3)errs.push('tabla ACLS');
   return {errs,counts:{lecciones:ids.size,ritmos:C.ritmos.length,patologias:C.patologias.length,farmacos:C.farmacos.length,quiz:C.quiz.length,tarjetas:C.tarjetas.length}}});
  checks++;assert(!d.errs.length,'integridad: '+d.errs.join('; '));report.push({datos:d.counts});await page.close()}

 const routes=await (async()=>{const page=await browser.newPage();await page.goto(BASE);await page.waitForSelector('.cd-top');
  const r=await page.evaluate(()=>{const C=window.CARDIO;return ['inicio','fundamentos','ecg','acls','patologias','farmacos','herramientas','practica','practica/tarjetas','practica/ecg','fuentes',
   ...C.fundamentos.map(x=>'fundamentos/'+x.id),...C.ecgLecciones.map(x=>'ecg/'+x.id),...C.acls.map(x=>'acls/'+x.id),...C.ritmos.map(x=>'ecg/ritmo/'+x.id),...C.patologias.map(x=>'patologias/'+x.id),...C.farmacos.map(x=>'farmacos/'+x.id)]});await page.close();return r})();
 const SHOTS=new Set(['inicio','fundamentos','fundamentos/hemodinamia','ecg','ecg/isquemia','ecg/ritmo/af','acls','acls/paro','patologias','patologias/fa','farmacos','herramientas','practica','practica/ecg','fuentes']);

 // 2. Todas las rutas × 5 anchos
 for(const width of [1600,1280,1024,768,390]){
  const ctx=await browser.newContext({viewport:{width,height:width<=390?844:900},reducedMotion:'reduce'}),page=await ctx.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(String(e)));page.on('console',m=>{if(m.type()==='error'&&!/fonts\.g/.test(m.text()))errors.push(m.text())});
  await page.goto(BASE+'#/inicio');await page.waitForSelector('.cd-top');
  for(const r of routes){
   await page.evaluate(h=>{location.hash='#/'+h},r);await page.waitForTimeout(60);
   const s=await page.evaluate(()=>{const t=document.querySelector('#main').innerText;
    const wide=[...document.querySelectorAll('#main *')].filter(el=>{const b=el.getBoundingClientRect();return b.width&&b.right>innerWidth+2&&!el.closest('.cd-table,.cd-nav,.cd-sim-log,.cd-strip')}).slice(0,3).map(el=>el.className||el.tagName);
    return {leak:[...t.matchAll(/\$\{[^}]*\}|\bundefined\b|\bNaN\b|\[object Object\]|\*\*/g)].map(m=>m[0]),overflow:document.documentElement.scrollWidth-innerWidth,wide,h1:!!document.querySelector('#main h1'),nf:/No encontrado/.test(t),title:document.title}});
   checks++;
   assert(!s.leak.length,`${r}@${width}: texto sin renderizar ${s.leak}`);
   assert(s.overflow<2,`${r}@${width}: desborde horizontal ${s.overflow}px`);
   assert(!s.wide.length,`${r}@${width}: elementos fuera del viewport ${s.wide}`);
   assert(s.h1&&!s.nf,`${r}@${width}: ruta sin contenido`);
   assert(/CARDIORA/.test(s.title),`${r}: título`);
   if(r.startsWith('farmacos/'))assert(await page.evaluate(id=>document.getElementById('f-'+id).open,r.split('/')[1]),`${r}: la ficha no se abre`);
   if(SHOTS.has(r))await page.screenshot({path:path.join(folder,`${r.replace(/\//g,'_')}-${width}.png`),fullPage:true});
  }
  // la navegación activa queda visible en móvil
  await page.evaluate(()=>{location.hash='#/fuentes'});await page.waitForTimeout(80);
  const navOk=await page.evaluate(()=>{const n=document.querySelector('.cd-nav'),a=n.querySelector('.on').getBoundingClientRect(),b=n.getBoundingClientRect();return a.left>=b.left-1&&a.right<=b.right+1});
  checks++;assert(navOk,`nav activa oculta @${width}`);
  assert(!errors.length,`errores de consola @${width}: ${errors.join(' | ')}`);
  report.push({width,routes:routes.length});await ctx.close();
 }

 // 3. Interacciones
 for(const width of [1280,390]){
  const ctx=await browser.newContext({viewport:{width,height:900}}),page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(String(e)));
  await page.goto(BASE+'#/inicio');await page.waitForSelector('.cd-top');
  // búsqueda global
  await page.keyboard.press('/');await page.fill('#cdSearch input','adenosina');
  const res=await page.$$eval('#cdSearchRes a',a=>a.map(x=>x.textContent));checks++;assert(res.length>=2,'búsqueda sin resultados: '+res);
  await page.click('#cdSearchRes a');await page.waitForTimeout(100);checks++;assert(await page.evaluate(()=>document.getElementById('cdSearch').hidden),'la búsqueda no se cierra');
  await page.keyboard.press('Control+k');await page.keyboard.press('Escape');checks++;assert(await page.evaluate(()=>document.getElementById('cdSearch').hidden),'Escape no cierra');
  // latido interactivo
  await page.goto(BASE+'#/ecg');await page.waitForSelector('.ecg-anatomy');
  await page.click('.ecg-zone[data-zone="qrs"] rect',{force:true});checks++;assert(/Complejo QRS/.test(await page.textContent('#anaInfo')),'zona QRS no responde');
  await page.focus('.ecg-zone[data-zone="qt"]');await page.keyboard.press('Enter');checks++;assert(/Intervalo QT/.test(await page.textContent('#anaInfo')),'teclado en zona QT');
  // filtro de ritmos
  await page.click('[data-act="rgroup"][data-g="Bloqueos AV"]');checks++;assert((await page.$$('.cd-rhythm')).length===4,'filtro de bloqueos AV');
  // simulador ACLS (rama desfibrilable)
  await page.goto(BASE+'#/acls');await page.waitForSelector('#sim');
  const sim=async op=>{await page.click(`[data-op="${op}"]`);await page.waitForTimeout(40)},next=()=>page.textContent('#simN');
  await sim('start');await sim('analyze');await sim('vf');checks++;assert(/DESCARGA/.test(await next()),'sim: pide descarga');
  await sim('shock');checks++;assert(/acceso/i.test(await next()),'sim: pide acceso');
  await sim('access');await sim('analyze');await sim('vf');await sim('shock');checks++;assert(/epinefrina/i.test(await next()),'sim: epinefrina tras 2.ª descarga');
  await sim('epi');await sim('analyze');await sim('vf');await sim('shock');checks++;assert(/amiodarona 300/i.test(await next()),'sim: amiodarona tras 3.ª descarga');
  await sim('amio');checks++;assert(/Amiodarona 300 mg/.test(await page.textContent('#simL')),'sim: registro');
  assert((await page.textContent('#simS')).trim()==='3','sim: contador de descargas');
  await sim('analyze');await sim('rosc');checks++;assert(/post-paro/.test(await next()),'sim: RCE');
  await sim('reset');await sim('start');await sim('analyze');await sim('pea');checks++;assert(/acceso/i.test(await next()),'sim: no desfibrilable pide acceso');
  await sim('access');checks++;assert(/epinefrina 1 mg IV\/IO lo antes/i.test(await next()),'sim: epinefrina precoz en no desfibrilable');
  checks++;assert(await page.$eval('[data-op="shock"]',b=>b.disabled),'sim: descarga debe estar deshabilitada en asistolia/AESP');
  // calculadoras
  await page.goto(BASE+'#/herramientas');await page.waitForSelector('[data-calc]');
  await page.fill('#qtc [name=qt]','440');await page.fill('#qtc [name=hr]','94');const q=await page.textContent('#qtc output');checks++;assert(/Bazett 551 ms/.test(q)&&/Fridericia/.test(q)&&/≥500/.test(q),'QTc: '+q);
  await page.fill('#fc [name=mm]','15');checks++;assert(/100 lpm/.test(await page.textContent('#fc output')),'FC');
  await page.fill('#eje [name=i]','-5');await page.fill('#eje [name=avf]','5');checks++;assert(/135°/.test(await page.textContent('#eje output'))&&/derecha/.test(await page.textContent('#eje output')),'eje');
  for(const n of ['h','a2','d'])await page.check(`#cha [name=${n}]`);checks++;assert(/4 puntos/.test(await page.textContent('#cha output'))&&/recomendada/.test(await page.textContent('#cha output')),'CHA2DS2-VA');
  await page.check('#cha [name=a]');checks++;assert(!(await page.isChecked('#cha [name=a2]'))&&/3 puntos/.test(await page.textContent('#cha output')),'edad contada dos veces en CHA2DS2-VA');
  await page.selectOption('#heart [name=t]','2');await page.selectOption('#heart [name=a]','2');checks++;assert(/4 \/ 10/.test(await page.textContent('#heart output')),'HEART');
  for(const n of ['a','c'])await page.check(`#wells [name=${n}]`);checks++;assert(/4\.5 puntos/.test(await page.textContent('#wells output'))&&/angio-TC/.test(await page.textContent('#wells output')),'Wells');
  // práctica
  await page.goto(BASE+'#/practica');await page.waitForSelector('.cd-opt');await page.click('.cd-opt');checks++;assert(await page.$('.cd-expl'),'quiz: explicación');
  await page.click('[data-act="qnext"]');checks++;assert(/Pregunta 2/.test(await page.textContent('.cd-quiz')),'quiz: siguiente');
  await page.goto(BASE+'#/practica/tarjetas');await page.waitForSelector('.cd-card-flip');await page.click('.cd-card-flip');checks++;assert(await page.$('.cd-card-flip.is-flipped'),'tarjeta: voltear');
  await page.goto(BASE+'#/practica/ecg');await page.waitForSelector('.cd-opt');await page.click('.cd-opt');checks++;assert(await page.$('.cd-expl'),'reto ECG');
  // progreso persistente
  await page.goto(BASE+'#/fundamentos/ciclo');await page.click('[data-act="read"]');await page.reload();await page.waitForSelector('[data-act="read"]');
  checks++;assert(/Estudiada/.test(await page.textContent('[data-act="read"]')),'progreso no persiste');
  await page.goto(BASE+'#/inicio');checks++;assert(/1\/8 completadas/.test(await page.textContent('.cd-path')),'progreso en inicio');
  // filtro de patologías
  await page.goto(BASE+'#/patologias');await page.fill('#patoQ','disec');await page.waitForTimeout(80);checks++;assert((await page.$$('.cd-pato')).length===1&&(await page.evaluate(()=>document.activeElement.id))==='patoQ','filtro de patologías');
  await page.fill('#patoQ','');await page.click('[data-act="pcat"][data-c="arritmia"]');checks++;assert((await page.$$('.cd-pato')).length===4,'filtro por categoría');
  await page.screenshot({path:path.join(folder,`interaccion-${width}.png`)});
  assert(!errors.length,`errores en interacciones @${width}: ${errors.join(' | ')}`);
  await ctx.close();
 }
 await browser.close();server.close();
 fs.writeFileSync(path.join(folder,'report.json'),JSON.stringify({checks,report},null,1));
 console.log(`CARDIORA QA: ${checks} comprobaciones superadas`,JSON.stringify(report[0]));
}
main().catch(e=>{console.error(e);server.close();process.exit(1)});
