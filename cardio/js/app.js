/* CARDIORA — Cardiología 101. App estática sin dependencias: rutas por hash, render por plantillas y delegación de eventos.
   Datos en cardio/data/*.js (window.CARDIO); trazos en cardio/js/ecg-engine.js (window.ECG). */
(function(){
'use strict';
const C=window.CARDIO,$=s=>document.querySelector(s),app=$('#app');
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=s=>esc(s).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>');
const norm=s=>String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');

/* ── Progreso (solo comodidad local; la app funciona sin almacenamiento) ── */
const store={get(){try{return JSON.parse(localStorage.getItem('cardiora.v1'))||{}}catch(e){return {}}},set(v){try{localStorage.setItem('cardiora.v1',JSON.stringify(v))}catch(e){}}};
let P=store.get();P.read=P.read||{};
const isRead=k=>!!P.read[k],toggleRead=k=>{if(P.read[k])delete P.read[k];else P.read[k]=1;store.set(P)};

/* ── Áreas ── */
const LEVELS=[
 {n:1,id:'fundamentos',t:'Fundamentos',d:'Anatomía, ciclo cardiaco, hemodinamia, electrofisiología y exploración.',list:()=>C.fundamentos},
 {n:2,id:'ecg',t:'ECG',d:'Papel, método en 8 pasos, isquemia, bloqueos, electrolitos y atlas de ritmos.',list:()=>C.ecgLecciones},
 {n:3,id:'acls',t:'ACLS',d:'RCP de alta calidad, paro, bradicardia, taquicardia y post-paro, con simulador.',list:()=>C.acls},
 {n:4,id:'patologias',t:'Patologías',d:'SCA, insuficiencia cardiaca, arritmias, HTA, válvulas, pericardio, aorta y TEP.',list:()=>C.patologias},
 {n:5,id:'farmacos',t:'Fármacos',d:'Mecanismo, indicaciones, efectos adversos y perlas por grupo terapéutico.',list:()=>C.farmacos}
];
const NAV=[['inicio','Inicio'],['fundamentos','Fundamentos'],['ecg','ECG'],['acls','ACLS'],['patologias','Patologías'],['farmacos','Fármacos'],['herramientas','Herramientas'],['practica','Práctica'],['fuentes','Fuentes']];

/* ── Bloques de contenido ── */
function table(t){
 const h=t.h.map(x=>`<th scope="col">${fmt(x)}</th>`).join('');
 const r=t.r.map(row=>'<tr>'+row.map((c,i)=>`<td data-label="${esc(t.h[i]||'')}">${fmt(c)}</td>`).join('')+'</tr>').join('');
 return `<div class="cd-table"><table><thead><tr>${h}</tr></thead><tbody>${r}</tbody></table></div>`;
}
function strip(id,cap,o){o=o||{};return `<figure class="cd-strip">${ECG.svg(id,{lead:o.lead||'II',seconds:o.seconds||6,animate:o.animate,seed:o.seed})}${cap?`<figcaption>${fmt(cap)}</figcaption>`:''}</figure>`}
function blocks(arr){return arr.map(b=>{
 if(typeof b==='string')return `<p>${fmt(b)}</p>`;
 if(b.ul)return `<ul class="cd-list">${b.ul.map(x=>`<li>${fmt(x)}</li>`).join('')}</ul>`;
 if(b.ol)return `<ol class="cd-steps">${b.ol.map(x=>`<li>${fmt(x)}</li>`).join('')}</ol>`;
 if(b.table)return table(b.table);
 if(b.pearl)return `<aside class="cd-note cd-pearl"><b>Perla clínica</b><p>${fmt(b.pearl)}</p></aside>`;
 if(b.warn)return `<aside class="cd-note cd-warn"><b>Atención</b><p>${fmt(b.warn)}</p></aside>`;
 if(b.flow)return `<ol class="cd-flow">${b.flow.map(x=>`<li><span>${fmt(x)}</span></li>`).join('')}</ol>`;
 if(b.ecg)return strip(b.ecg,b.cap,{lead:b.lead});
 return '';}).join('')}

/* ── Piezas comunes ── */
const head=(over,title,lead,extra)=>`<header class="cd-pagehead"><p class="cd-over">${over}</p><h1>${title}</h1>${lead?`<p class="cd-lead">${lead}</p>`:''}${extra||''}</header>`;
const crumb=items=>`<nav class="cd-crumb" aria-label="Ruta">${items.map(([h,t])=>h?`<a href="${h}">${esc(t)}</a>`:`<span>${esc(t)}</span>`).join('<i aria-hidden="true">/</i>')}</nav>`;
const levelOf=area=>LEVELS.find(l=>l.id===area);
function progress(area){const l=levelOf(area),list=l.list(),n=list.filter(x=>isRead(area+':'+x.id)).length;return {n,total:list.length,pct:list.length?Math.round(n/list.length*100):0}}
function lessonCard(area,x,i){const done=isRead(area+':'+x.id);return `<a class="cd-card cd-lesson${done?' is-done':''}" href="#/${area}/${x.id}">
 <span class="cd-card-num">${String(i+1).padStart(2,'0')}</span><h3>${esc(x.titulo||x.nombre)}</h3><p>${esc(x.sub||x.idea||'')}</p>
 <span class="cd-card-meta">${x.min?x.min+' min':''}${done?'<b>✓ Estudiada</b>':''}</span></a>`}

/* ── Inicio ── */
function home(){
 const n={l:C.fundamentos.length+C.ecgLecciones.length+C.acls.length,r:C.ritmos.length,p:C.patologias.length,f:C.farmacos.length,q:C.quiz.length+C.tarjetas.length};
 return `<section class="cd-hero">
  <div class="cd-hero-copy"><p class="cd-over">Guía 101 · Cardiología clínica</p>
   <h1>Del latido a la <em>decisión clínica</em>.</h1>
   <p class="cd-lead">Una ruta ordenada para aprender cardiología desde cero: primero cómo funciona el corazón, después cómo leer un ECG, cómo actuar en un paro y, finalmente, cómo se diagnostican y tratan las enfermedades más importantes.</p>
   <div class="cd-cta"><a class="cd-btn cd-btn-main" href="#/fundamentos/anatomia">Empezar por el nivel 1</a><a class="cd-btn" href="#/acls">Ir a ACLS</a><a class="cd-btn" href="#/ecg">Leer un ECG</a></div></div>
  <div class="cd-hero-monitor" aria-hidden="true"><div class="cd-monitor-top"><span>II</span><span class="cd-monitor-hr">FC 75</span></div>${ECG.svg('sinus',{seconds:6,height:30,animate:true,cal:false})}<div class="cd-monitor-top"><span>Trazo esquemático didáctico</span><span>25 mm/s · 10 mm/mV</span></div></div>
 </section>
 <section class="cd-stats" aria-label="Contenido">${[[n.l,'lecciones guiadas'],[n.r,'ritmos y patrones ECG'],[n.p,'fichas de patologías'],[n.f,'grupos de fármacos'],[n.q,'preguntas y tarjetas']].map(([v,t])=>`<div><b>${v}</b><span>${t}</span></div>`).join('')}</section>
 <section class="cd-section"><div class="cd-sechead"><p class="cd-over">Ruta de aprendizaje</p><h2>Cinco niveles, en orden</h2><p>Cada nivel se apoya en el anterior. Marca las lecciones como estudiadas para ver tu avance (se guarda solo en este navegador).</p></div>
  <ol class="cd-path">${LEVELS.map(l=>{const p=progress(l.id);return `<li class="cd-level cd-l${l.n}"><a href="#/${l.id}"><span class="cd-level-n">Nivel ${l.n}</span><h3>${l.t}</h3><p>${l.d}</p>
   <span class="cd-bar" role="progressbar" aria-valuenow="${p.pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Avance ${l.t}"><i style="width:${p.pct}%"></i></span><small>${p.n}/${p.total} completadas</small></a></li>`}).join('')}</ol></section>
 <section class="cd-section cd-quick"><div class="cd-sechead"><p class="cd-over">Para practicar</p><h2>Herramientas interactivas</h2></div>
  <div class="cd-grid3">
   <a class="cd-card cd-tool" href="#/acls"><span class="cd-chip cd-chip-3">ACLS</span><h3>Simulador de código</h3><p>Cronómetro de ciclos de 2 min, descargas, epinefrina y amiodarona con el siguiente paso del algoritmo.</p></a>
   <a class="cd-card cd-tool" href="#/ecg"><span class="cd-chip cd-chip-2">ECG</span><h3>Anatomía de un latido</h3><p>Toca cada onda e intervalo para saber qué representa y cuáles son sus valores normales.</p></a>
   <a class="cd-card cd-tool" href="#/practica/ecg"><span class="cd-chip cd-chip-4">Práctica</span><h3>¿Qué ritmo es?</h3><p>Reto con trazos generados: identifica el ritmo y revisa los criterios.</p></a>
   <a class="cd-card cd-tool" href="#/herramientas"><span class="cd-chip cd-chip-1">Cálculo</span><h3>QTc, eje y escalas</h3><p>FC, QTc (Bazett y Fridericia), eje, CHA₂DS₂-VA, HEART, Wells y PAM.</p></a>
   <a class="cd-card cd-tool" href="#/practica"><span class="cd-chip cd-chip-5">Repaso</span><h3>Preguntas con explicación</h3><p>${C.quiz.length} preguntas por tema y ${C.tarjetas.length} tarjetas de memoria.</p></a>
   <a class="cd-card cd-tool" href="#/patologias"><span class="cd-chip cd-chip-4">Clínica</span><h3>Fichas de patologías</h3><p>Idea clave en una frase y, debajo, el desarrollo completo para la guardia.</p></a>
  </div></section>`;
}

/* ── Índices y lecciones ── */
function conduction(){return `<figure class="cd-conduction" aria-label="Sistema de conducción">
 ${[['Nodo sinusal','60–100 lpm','Marcapasos'],['Aurículas','Onda P','≈0,08–0,10 s'],['Nodo AV','Segmento PR','Retraso fisiológico'],['His y ramas','Inicio del QRS','Conducción rápida'],['Purkinje','QRS','Contracción ventricular']].map(([a,b,c],i)=>`<div class="cd-node"><b>${a}</b><span>${b}</span><small>${c}</small></div>${i<4?'<i aria-hidden="true">→</i>':''}`).join('')}
 <figcaption>Escapes si falla el nivel superior: unión AV 40–60 lpm · ventrículo 20–40 lpm.</figcaption></figure>`}
function areaIndex(area){
 const l=levelOf(area),list=l.list(),p=progress(area);
 const intro={fundamentos:'Empieza aquí. Sin estas bases, el ECG y la farmacología se memorizan en lugar de entenderse.',ecg:'Aprende a leer el ECG con un método, entiende cada onda y reconoce los ritmos que importan.',acls:'Soporte vital del adulto según las Guías AHA 2025. Practica el algoritmo con el simulador antes de vivirlo en la guardia.'}[area];
 let body=`${crumb([['#/inicio','Inicio'],[null,l.t]])}${head(`Nivel ${l.n} · ${p.n}/${p.total} completadas`,l.t,intro)}`;
 if(area==='fundamentos')body+=`<section class="cd-section">${conduction()}</section>`;
 if(area==='ecg')body+=ecgAnatomySection();
 if(area==='acls')body+=simulator();
 body+=`<section class="cd-section"><div class="cd-sechead"><p class="cd-over">Lecciones</p><h2>${area==='acls'?'Algoritmos explicados':'Lecciones del nivel'}</h2></div><div class="cd-grid3">${list.map((x,i)=>lessonCard(area,x,i)).join('')}</div></section>`;
 if(area==='ecg')body+=rhythmAtlas();
 if(area==='acls')body+=`<section class="cd-section"><div class="cd-sechead"><p class="cd-over">Tablas de bolsillo</p><h2>Fármacos y energías</h2></div>
  ${table({h:['Fármaco','Dosis (adulto)','Notas'],r:C.aclsFarmacos})}${table({h:['Situación','Modo','Energía orientativa'],r:C.aclsEnergias})}
  <p class="cd-small">Las energías dependen del equipo: sigue la recomendación del fabricante de tu desfibrilador.</p></section>`;
 return body;
}
function lesson(area,id){
 const l=levelOf(area),list=l.list(),i=list.findIndex(x=>x.id===id),x=list[i];if(!x)return notFound();
 const key=area+':'+id,prev=list[i-1],next=list[i+1];
 const toc=x.secciones.map((s,j)=>`<a href="#/${area}/${id}" data-act="jump" data-to="s${j}">${esc(s.h)}</a>`).join('');
 return `${crumb([['#/inicio','Inicio'],['#/'+area,l.t],[null,x.titulo]])}
 <article class="cd-lessonpage cd-l${l.n}">${head(`Nivel ${l.n} · ${l.t} · ${x.min} min`,esc(x.titulo),esc(x.resumen),`<p class="cd-sub">${esc(x.sub)}</p>`)}
 <div class="cd-lessonlayout"><aside class="cd-toc" aria-label="En esta lección"><b>En esta lección</b>${toc}<a href="#/${area}/${id}" data-act="jump" data-to="claves">Ideas clave</a>${x.preguntas?`<a href="#/${area}/${id}" data-act="jump" data-to="auto">Autoevaluación</a>`:''}</aside>
 <div class="cd-prose">${x.secciones.map((s,j)=>`<section id="s${j}" class="cd-block"><h2>${esc(s.h)}</h2>${blocks(s.b)}</section>`).join('')}
  <section id="claves" class="cd-block cd-keys"><h2>Ideas clave</h2><ul>${x.claves.map(c=>`<li>${fmt(c)}</li>`).join('')}</ul></section>
  ${x.preguntas?`<section id="auto" class="cd-block"><h2>Autoevaluación</h2>${x.preguntas.map(q=>`<details class="cd-qa"><summary>${fmt(q.q)}</summary><p>${fmt(q.a)}</p></details>`).join('')}</section>`:''}
  <div class="cd-lessonfoot"><button class="cd-btn ${isRead(key)?'':'cd-btn-main'}" data-act="read" data-key="${key}" aria-pressed="${isRead(key)}">${isRead(key)?'✓ Estudiada (desmarcar)':'Marcar como estudiada'}</button>
   <div class="cd-pn">${prev?`<a class="cd-btn" href="#/${area}/${prev.id}">← ${esc(prev.titulo)}</a>`:''}${next?`<a class="cd-btn" href="#/${area}/${next.id}">${esc(next.titulo)} →</a>`:(l.n<5?`<a class="cd-btn" href="#/${LEVELS[l.n].id}">Siguiente nivel: ${LEVELS[l.n].t} →</a>`:'')}</div></div>
 </div></div></article>`;
}

/* ── ECG: latido interactivo y atlas ── */
function ecgAnatomySection(){return `<section class="cd-section"><div class="cd-sechead"><p class="cd-over">Interactivo</p><h2>Anatomía de un latido</h2><p>Toca o selecciona con el teclado cada zona del trazo.</p></div>
 <div class="cd-anatomy"><div class="cd-anatomy-fig">${ECG.anatomy()}</div><div class="cd-anatomy-info" id="anaInfo" aria-live="polite">${anaText('p')}</div></div></section>`}
const anaText=k=>{const a=C.ecgAnatomy[k];return `<p class="cd-over">${k==='qt'||k==='pri'?'Intervalo':'Componente'}</p><h3>${esc(a.t)}</h3><p>${fmt(a.x)}</p>`};
let rhythmGroup='Todos';
function rhythmAtlas(){
 const groups=['Todos',...new Set(C.ritmos.map(r=>r.grupo))],list=C.ritmos.filter(r=>rhythmGroup==='Todos'||r.grupo===rhythmGroup);
 return `<section class="cd-section" id="atlas"><div class="cd-sechead"><p class="cd-over">Atlas de ritmos</p><h2>${C.ritmos.length} ritmos y patrones</h2><p>Trazos esquemáticos generados para enseñar criterios; no son registros de pacientes.</p></div>
 <div class="cd-chips" role="group" aria-label="Filtrar ritmos">${groups.map(g=>`<button class="cd-chipbtn${g===rhythmGroup?' on':''}" data-act="rgroup" data-g="${esc(g)}" aria-pressed="${g===rhythmGroup}">${esc(g)}</button>`).join('')}</div>
 <div class="cd-grid3 cd-rhythms">${list.map(r=>`<a class="cd-card cd-rhythm" href="#/ecg/ritmo/${r.id}">${ECG.svg(r.id,{seconds:4,height:26,lead:r.lead||'II',cal:false})}<span class="cd-chip">${esc(r.grupo)}</span><h3>${esc(r.nombre)}</h3><p>${esc(r.fc==='—'?r.criterios[0].replace(/\*\*/g,''):r.fc)}</p></a>`).join('')}</div></section>`;
}
function rhythm(id){
 const i=C.ritmos.findIndex(r=>r.id===id),r=C.ritmos[i];if(!r)return notFound();
 const prev=C.ritmos[i-1],next=C.ritmos[i+1];
 return `${crumb([['#/inicio','Inicio'],['#/ecg','ECG'],['#/ecg','Atlas de ritmos'],[null,r.nombre]])}
 ${head(esc(r.grupo)+(r.fc==='—'?'':' · Frecuencia: '+esc(r.fc)),esc(r.nombre))}
 <div class="cd-strip-big">${strip(r.id,'Trazo esquemático · 25 mm/s · 10 mm/mV · derivación '+(r.lead||'II'),{lead:r.lead,seconds:8,animate:true})}</div>
 <div class="cd-grid3 cd-facts"><section class="cd-panel"><h2>Criterios</h2><ul class="cd-list">${r.criterios.map(x=>`<li>${fmt(x)}</li>`).join('')}</ul></section>
 <section class="cd-panel"><h2>Causas</h2><ul class="cd-list">${r.causas.map(x=>`<li>${fmt(x)}</li>`).join('')}</ul></section>
 <section class="cd-panel cd-panel-accent"><h2>Qué hacer</h2><p>${fmt(r.manejo)}</p>${r.acls?`<a class="cd-btn cd-btn-main" href="#/acls/${r.acls}">Algoritmo ACLS →</a>`:''}${r.pato?`<a class="cd-btn" href="#/patologias/${r.pato}">Ficha clínica →</a>`:''}</section></div>
 <div class="cd-pn cd-pn-wide">${prev?`<a class="cd-btn" href="#/ecg/ritmo/${prev.id}">← ${esc(prev.nombre)}</a>`:''}<a class="cd-btn" href="#/ecg" data-act="toatlas">Todos los ritmos</a>${next?`<a class="cd-btn" href="#/ecg/ritmo/${next.id}">${esc(next.nombre)} →</a>`:''}</div>`;
}

/* ── Simulador ACLS ── */
const S={on:false};
function simReset(){Object.assign(S,{on:false,t0:0,cyc:0,path:null,pending:false,shocks:0,epi:[],amio:0,lido:0,airway:false,access:false,rosc:false,choosing:false,log:[]})}
simReset();
const now=()=>Date.now(),mmss=ms=>{const s=Math.max(0,Math.floor(ms/1000));return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')};
function simLog(t){S.log.unshift([S.on?mmss(now()-S.t0):'00:00',t])}
function simNext(){
 if(S.rosc)return 'Retorno de la circulación: inicia cuidados post-paro (vía aérea, SpO₂ 92–98%, PaCO₂ 35–45, PAM ≥65 mmHg, ECG de 12 derivaciones y control de temperatura).';
 if(!S.on)return 'Confirma que no responde, que no respira con normalidad (o solo jadea) y que no tiene pulso en ≤10 s. Pide ayuda y el desfibrilador. Después pulsa «Iniciar RCP».';
 if(S.choosing)return '¿Qué ritmo ves en el monitor? Elige una opción.';
 if(!S.path)return 'Comprime a 100–120/min y 5–6 cm, 30:2. Coloca los parches y analiza el ritmo en cuanto el monitor esté listo.';
 const cyc=now()-S.cyc,last=S.epi[S.epi.length-1],epiDue=last?now()-last>=180000:false;
 if(cyc>=120000)return 'Fin del ciclo de 2 min: pausa breve (<10 s) para analizar el ritmo y cambia de compresor.';
 if(S.path==='shock'){
  if(S.pending)return 'Ritmo desfibrilable: carga, aparta a todos y DESCARGA. Reanuda compresiones de inmediato, sin comprobar pulso.';
  if(S.shocks>=2&&(!S.epi.length||epiDue))return 'Administra epinefrina 1 mg IV/IO y repite cada 3–5 min.';
  if(S.shocks>=3&&!S.amio&&!S.lido)return 'Administra amiodarona 300 mg IV/IO en bolo (alternativa: lidocaína 1–1,5 mg/kg).';
  if(S.shocks>=4&&S.amio===1)return 'Si persiste FV/TVSP: segunda dosis de amiodarona 150 mg.';
  if(!S.access)return 'RCP 2 min. Obtén acceso venoso (IV preferente; IO si no se logra rápido).';
  if(S.shocks>=2&&!S.airway)return 'Considera vía aérea avanzada y capnografía sin interrumpir las compresiones.';
  return 'RCP de alta calidad. Repasa en voz alta las H y las T. Analiza al completar los 2 min.';
 }
 if(!S.access)return 'Ritmo no desfibrilable: obtén acceso IV/IO de inmediato para la epinefrina.';
 if(!S.epi.length)return 'Administra epinefrina 1 mg IV/IO lo antes posible.';
 if(epiDue)return 'Repite epinefrina 1 mg (cada 3–5 min).';
 if(!S.airway)return 'Considera vía aérea avanzada y capnografía.';
 return 'RCP 2 min y busca causas reversibles (H y T). Si aparece un ritmo desfibrilable, cambia de rama.';
}
function simButtons(){
 const b=(act,label,cls,dis)=>`<button class="cd-simbtn ${cls||''}" data-act="sim" data-op="${act}"${dis?' disabled':''}>${label}</button>`;
 if(S.choosing)return b('vf','FV / TV sin pulso','is-shock')+b('pea','Asistolia / AESP','is-noshock')+b('rosc','Ritmo organizado con pulso','is-ok')+b('cancel','Cancelar');
 if(!S.on)return b('start','Iniciar RCP','is-main');
 if(S.rosc)return b('reset','Reiniciar simulación');
 return b('analyze','Analizar ritmo','is-main')+b('shock','⚡ Descarga','is-shock',S.path!=='shock'||!S.pending)+b('access',S.access?'✓ Acceso IV/IO':'Acceso IV/IO','',S.access)+b('epi','Epinefrina 1 mg','',!S.access)
  +b('amio',S.amio?'Amiodarona 150 mg':'Amiodarona 300 mg','',!S.access||S.amio>=2||S.path!=='shock'||S.shocks<3)+b('lido','Lidocaína','',!S.access||S.path!=='shock'||S.shocks<3)+b('airway',S.airway?'✓ Vía aérea avanzada':'Vía aérea avanzada','',S.airway)+b('reset','Reiniciar');
}
function simulator(){return `<section class="cd-section"><div class="cd-sechead"><p class="cd-over">Práctica guiada · paro del adulto</p><h2>Simulador de código</h2><p>Ensaya el ritmo de trabajo del algoritmo. Es una herramienta de estudio: en un paro real sigue al líder del equipo y el protocolo de tu centro.</p></div>
 <div class="cd-sim" id="sim"><div class="cd-sim-clocks"><div><span>Tiempo total</span><b id="simT">00:00</b></div><div><span>Ciclo de RCP</span><b id="simC">02:00</b></div><div><span>Descargas</span><b id="simS">0</b></div><div><span>Epinefrina</span><b id="simE">—</b></div></div>
 <div class="cd-sim-next" id="simN" aria-live="polite"></div><div class="cd-sim-btns" id="simB"></div>
 <div class="cd-sim-cols"><div><b>Registro</b><ol class="cd-sim-log" id="simL"></ol></div><div><b>H y T (marca lo revisado)</b><div class="cd-hyt">${['Hipovolemia','Hipoxia','Hidrogeniones (acidosis)','Hipo/hiperpotasemia','Hipotermia','Neumotórax a tensión','Taponamiento','Tóxicos','Trombosis pulmonar','Trombosis coronaria'].map(h=>`<label><input type="checkbox"> ${h}</label>`).join('')}</div></div></div></div></section>`}
function simPaint(){
 if(!$('#sim'))return;const n=now();
 $('#simT').textContent=S.on?mmss(n-S.t0):'00:00';
 const left=S.on&&S.path&&!S.rosc?120000-(n-S.cyc):120000;$('#simC').textContent=left<=0?'¡Analiza!':mmss(left);$('#simC').parentNode.classList.toggle('is-alert',S.on&&left<=0&&!S.rosc);
 $('#simS').textContent=S.shocks;const last=S.epi[S.epi.length-1];$('#simE').textContent=last?S.epi.length+' · hace '+mmss(n-last):'—';
 const nx=simNext();if($('#simN').dataset.t!==nx){$('#simN').dataset.t=nx;$('#simN').innerHTML='<span>Siguiente paso</span>'+esc(nx)}
 const bh=simButtons();if($('#simB').dataset.h!==bh){$('#simB').dataset.h=bh;$('#simB').innerHTML=bh}
 const lh=S.log.map(([t,x])=>`<li><time>${t}</time>${esc(x)}</li>`).join('')||'<li class="cd-muted">Sin eventos todavía.</li>';if($('#simL').dataset.h!==lh){$('#simL').dataset.h=lh;$('#simL').innerHTML=lh}
}
function simOp(op){
 const n=now();
 if(op==='start'){simReset();Object.assign(S,{on:true,t0:n,cyc:n});simLog('RCP iniciada (30:2) · se pide desfibrilador')}
 else if(op==='analyze'){S.choosing=true}
 else if(op==='cancel'){S.choosing=false}
 else if(op==='vf'){S.choosing=false;S.path='shock';S.pending=true;S.cyc=n;simLog('Ritmo: FV/TV sin pulso → desfibrilable')}
 else if(op==='pea'){S.choosing=false;S.path='noshock';S.pending=false;S.cyc=n;simLog('Ritmo: asistolia/AESP → no desfibrilable')}
 else if(op==='rosc'){S.choosing=false;S.rosc=true;simLog('Ritmo organizado con pulso: RCE')}
 else if(op==='shock'){S.shocks++;S.pending=false;S.cyc=n;simLog('Descarga '+S.shocks+' · RCP inmediata 2 min')}
 else if(op==='access'){S.access=true;simLog('Acceso vascular obtenido')}
 else if(op==='epi'){S.epi.push(n);simLog('Epinefrina 1 mg IV/IO (dosis '+S.epi.length+')')}
 else if(op==='amio'){S.amio++;simLog(S.amio===1?'Amiodarona 300 mg':'Amiodarona 150 mg (2.ª dosis)')}
 else if(op==='lido'){S.lido++;simLog(S.lido===1?'Lidocaína 1–1,5 mg/kg':'Lidocaína 0,5–0,75 mg/kg')}
 else if(op==='airway'){S.airway=true;simLog('Vía aérea avanzada · 1 ventilación cada 6 s · capnografía')}
 else if(op==='reset'){simReset()}
 simPaint();
}
setInterval(simPaint,500);

/* ── Patologías ── */
let patoCat='todas',patoQ='';
function patoIndex(){
 const cats=[['todas','Todas'],...C.categorias];
 const list=C.patologias.filter(p=>(patoCat==='todas'||p.cat===patoCat)&&(!patoQ||norm(p.nombre+' '+p.idea).includes(norm(patoQ))));
 return `${crumb([['#/inicio','Inicio'],[null,'Patologías']])}${head('Nivel 4 · '+C.patologias.length+' fichas','Patologías','Cada ficha empieza con la idea clave en una frase. Debajo encontrarás fisiopatología, clínica, diagnóstico, tratamiento, banderas rojas y perlas.')}
 <div class="cd-filterbar"><div class="cd-chips" role="group" aria-label="Categorías">${cats.map(([k,t])=>`<button class="cd-chipbtn${k===patoCat?' on':''}" data-act="pcat" data-c="${k}" aria-pressed="${k===patoCat}">${esc(t)}</button>`).join('')}</div>
 <label class="cd-inline-search"><span class="cd-vh">Filtrar patologías</span><input id="patoQ" type="search" placeholder="Filtrar por nombre…" value="${esc(patoQ)}"></label></div>
 <div class="cd-grid3" id="patoList">${list.map(p=>`<a class="cd-card cd-pato" href="#/patologias/${p.id}"><span class="cd-chip">${esc(C.categorias.find(c=>c[0]===p.cat)[1])}</span><h3>${esc(p.nombre)}</h3><p>${esc(p.idea)}</p></a>`).join('')||'<p class="cd-empty">No hay fichas con ese filtro.</p>'}</div>`;
}
function pato(id){
 const i=C.patologias.findIndex(p=>p.id===id),p=C.patologias[i];if(!p)return notFound();
 const key='patologias:'+id,cat=C.categorias.find(c=>c[0]===p.cat)[1],prev=C.patologias[i-1],next=C.patologias[i+1];
 const box=(t,arr,cls)=>`<section class="cd-panel ${cls||''}"><h2>${t}</h2><ul class="cd-list">${arr.map(x=>`<li>${fmt(x)}</li>`).join('')}</ul></section>`;
 return `${crumb([['#/inicio','Inicio'],['#/patologias','Patologías'],[null,p.nombre]])}
 ${head(esc(cat)+' · Guía de referencia: '+esc(p.guia),esc(p.nombre))}
 <div class="cd-idea"><span>Idea clave</span><p>${fmt(p.idea)}</p></div>
 <section class="cd-panel cd-fisio"><h2>Fisiopatología</h2><p>${fmt(p.fisio)}</p></section>
 ${p.ecg?`<div class="cd-strip-mid">${strip(p.ecg,'Patrón ECG relacionado (esquemático). ',{seconds:6})}<a class="cd-link" href="#/ecg/ritmo/${p.ecg}">Ver criterios del trazo →</a></div>`:''}
 <div class="cd-grid2">${box('Clínica',p.clinica)}${box('Diagnóstico',p.dx)}</div>
 ${box('Tratamiento',p.tx,'cd-panel-wide')}
 <div class="cd-grid2">${box('Banderas rojas',p.rojo,'cd-panel-red')}${box('Perlas',p.perlas,'cd-panel-accent')}</div>
 ${p.infeora?`<p class="cd-cross">Para el enfoque microbiológico y antimicrobiano, consulta <a href="../infeora/#/clinica">INFEORA · Síndromes</a>.</p>`:''}
 <p class="cd-small">Resumen educativo basado en la guía citada; confirma dosis, contraindicaciones y metas en la versión vigente y en el contexto del paciente.</p>
 <div class="cd-lessonfoot"><button class="cd-btn ${isRead(key)?'':'cd-btn-main'}" data-act="read" data-key="${key}" aria-pressed="${isRead(key)}">${isRead(key)?'✓ Estudiada (desmarcar)':'Marcar como estudiada'}</button>
 <div class="cd-pn">${prev?`<a class="cd-btn" href="#/patologias/${prev.id}">← ${esc(prev.nombre)}</a>`:''}${next?`<a class="cd-btn" href="#/patologias/${next.id}">${esc(next.nombre)} →</a>`:''}</div></div>`;
}

/* ── Fármacos (fichas desplegables en la misma sección) ── */
function farmacos(open){
 const groups=[...new Set(C.farmacos.map(f=>f.grupo))];
 return `${crumb([['#/inicio','Inicio'],[null,'Fármacos']])}${head('Nivel 5 · '+C.farmacos.length+' grupos','Fármacos cardiovasculares','Organizados por grupo. Abre cada ficha para ver mecanismo, usos, efectos adversos, contraindicaciones y una perla práctica.')}
 ${groups.map(g=>`<section class="cd-section"><div class="cd-sechead"><h2>${esc(g)}</h2></div><div class="cd-drugs">${C.farmacos.filter(f=>f.grupo===g).map(f=>{const key='farmacos:'+f.id;return `<details class="cd-drug" id="f-${f.id}"${f.id===open?' open':''}><summary><span><b>${esc(f.nombre)}</b><small>${esc(f.ej)}</small></span>${isRead(key)?'<em>✓</em>':''}</summary>
  <div class="cd-drug-body"><p class="cd-mec"><b>Mecanismo.</b> ${fmt(f.mec)}</p><div class="cd-grid3">
   <div><h3>Usos</h3><ul class="cd-list">${f.usos.map(x=>`<li>${fmt(x)}</li>`).join('')}</ul></div>
   <div><h3>Efectos adversos</h3><ul class="cd-list">${f.ady.map(x=>`<li>${fmt(x)}</li>`).join('')}</ul></div>
   <div><h3>Contraindicaciones / precauciones</h3><ul class="cd-list">${f.ci.map(x=>`<li>${fmt(x)}</li>`).join('')}</ul></div></div>
   <aside class="cd-note cd-pearl"><b>Perla</b><p>${fmt(f.perla)}</p></aside>
   <button class="cd-btn" data-act="read" data-key="${key}" aria-pressed="${isRead(key)}">${isRead(key)?'✓ Estudiada':'Marcar como estudiada'}</button></div></details>`}).join('')}</div></section>`).join('')}`;
}

/* ── Herramientas ── */
function tools(){
 const card=(id,t,d,form)=>`<section class="cd-panel cd-calc" id="${id}" data-calc="${id}"><h2>${t}</h2><p class="cd-small">${d}</p><form onsubmit="return false">${form}</form><output class="cd-out" aria-live="polite"></output></section>`;
 const num=(n,l,v,ex)=>`<label>${l}<input type="number" inputmode="decimal" name="${n}" value="${v}" ${ex||''}></label>`;
 const chk=(n,l,pts)=>`<label class="cd-check"><input type="checkbox" name="${n}" value="${pts}"> ${l} <i>+${pts}</i></label>`;
 const sel=(n,l,opts)=>`<label>${l}<select name="${n}">${opts.map(([v,t])=>`<option value="${v}">${t}</option>`).join('')}</select></label>`;
 return `${crumb([['#/inicio','Inicio'],[null,'Herramientas']])}${head('Cálculo rápido','Herramientas','Calculadoras para practicar la interpretación. Úsalas para aprender el razonamiento; en la práctica clínica verifica con fuentes oficiales.')}
 <div class="cd-grid2 cd-calcs">
 ${card('fc','Frecuencia cardiaca','Cuenta los cuadritos (1 mm) entre dos ondas R consecutivas.',num('mm','Cuadritos entre R y R','20','min="1" step="0.5"'))}
 ${card('qtc','QT corregido','Mide el QT en la derivación donde sea más largo (habitualmente II o V5).',num('qt','QT (ms)','400','min="100" max="800"')+num('hr','Frecuencia (lpm)','75','min="20" max="250"')+sel('sex','Sexo',[['m','Hombre'],['f','Mujer']]))}
 ${card('eje','Eje eléctrico (aproximado)','Suma algebraica del QRS (positivo − negativo, en mm) en I y aVF.',num('i','Neto en I (mm)','6','step="0.5"')+num('avf','Neto en aVF (mm)','4','step="0.5"'))}
 ${card('pam','Presión arterial media','PAM ≈ PAD + (PAS − PAD)/3.',num('pas','PAS (mmHg)','120')+num('pad','PAD (mmHg)','80'))}
 ${card('cha','CHA₂DS₂-VA (FA)','Riesgo de ictus en fibrilación auricular (ESC 2024: sin punto por sexo).',chk('c','Insuficiencia cardiaca o FEVI reducida',1)+chk('h','Hipertensión',1)+chk('a2','Edad ≥75 años',2)+chk('d','Diabetes',1)+chk('s','Ictus, AIT o tromboembolia previa',2)+chk('v','Enfermedad vascular (IAM, arteriopatía, placa aórtica)',1)+chk('a','Edad 65–74 años',1))}
 ${card('heart','HEART (dolor torácico)','Riesgo de evento cardiaco mayor a 6 semanas en urgencias.',sel('h','Historia',[[0,'Poco sospechosa (0)'],[1,'Moderadamente sospechosa (1)'],[2,'Muy sospechosa (2)']])+sel('e','ECG',[[0,'Normal (0)'],[1,'Repolarización inespecífica (1)'],[2,'Descenso del ST significativo (2)']])+sel('a','Edad',[[0,'<45 (0)'],[1,'45–64 (1)'],[2,'≥65 (2)']])+sel('r','Factores de riesgo',[[0,'Ninguno (0)'],[1,'1–2 (1)'],[2,'≥3 o aterosclerosis conocida (2)']])+sel('t','Troponina',[[0,'≤ límite normal (0)'],[1,'1–3× límite (1)'],[2,'>3× límite (2)']]))}
 ${card('wells','Wells para TEP','Probabilidad clínica (modelo de dos niveles).',chk('a','Signos clínicos de TVP',3)+chk('b','TEP es el diagnóstico más probable',3)+chk('c','FC >100 lpm',1.5)+chk('d','Inmovilización ≥3 días o cirugía en 4 semanas',1.5)+chk('e','TVP o TEP previos',1.5)+chk('f','Hemoptisis',1)+chk('g','Cáncer activo',1))}
 </div>`;
}
function calc(sec){
 const f=sec.querySelector('form'),v=n=>parseFloat((f.elements[n]||{}).value),ch=()=>[...f.querySelectorAll('input[type=checkbox]:checked')].reduce((a,x)=>a+parseFloat(x.value),0),out=sec.querySelector('output');
 let h='';const id=sec.dataset.calc,ok=x=>isFinite(x)&&x>0;
 if(id==='fc'){const m=v('mm');h=ok(m)?`<b>${Math.round(1500/m)} lpm</b><span>1500 / ${m} cuadritos · equivale a ${(m/5).toFixed(1)} cuadros grandes</span>`:'Introduce un número válido.'}
 if(id==='qtc'){const qt=v('qt'),hr=v('hr');if(ok(qt)&&ok(hr)){const rr=60/hr,b=qt/Math.sqrt(rr),fr=qt/Math.cbrt(rr),fm=qt+154*(1-rr),lim=f.elements.sex.value==='f'?460:450,ref=hr>90?fr:b;
  const tag=ref>=500?'<em class="is-bad">≥500 ms: riesgo alto de torsades</em>':ref>lim?`<em class="is-warn">Prolongado (>${lim} ms)</em>`:ref<350?'<em class="is-warn">Corto (<350 ms): valorar QT corto/hipercalcemia</em>':'<em class="is-good">Dentro de lo normal</em>';
  h=`<b>Bazett ${Math.round(b)} ms · Fridericia ${Math.round(fr)} ms</b><span>Framingham ${Math.round(fm)} ms · RR ${rr.toFixed(2)} s${hr>90?' · con FC >90 se prefiere Fridericia':''}</span>${tag}`}else h='Introduce QT y frecuencia.'}
 if(id==='eje'){const i=v('i'),a=v('avf');if(isFinite(i)&&isFinite(a)&&(i||a)){const d=Math.round(Math.atan2(a,i)*180/Math.PI);const c=d>=-30&&d<=90?'Normal':d<-30&&d>=-90?'Desviación izquierda':d>90&&d<=180?'Desviación derecha':'Eje extremo';h=`<b>≈ ${d}°</b><span>${c} (normal: −30° a +90°)</span>`}else h='Introduce valores de I y aVF.'}
 if(id==='pam'){const s=v('pas'),d=v('pad');h=ok(s)&&ok(d)&&s>d?`<b>${Math.round(d+(s-d)/3)} mmHg</b><span>${d+(s-d)/3<65?'<em class="is-bad">PAM <65: hipoperfusión probable</em>':'Objetivo habitual en choque: ≥65 mmHg'}</span>`:'La PAS debe ser mayor que la PAD.'}
 if(id==='cha'){const s=ch();h=`<b>${s} punto${s===1?'':'s'}</b><span>${s>=2?'Anticoagulación oral recomendada.':s===1?'Considerar anticoagulación oral (decisión compartida).':'Riesgo bajo: no se recomienda anticoagular por este motivo.'} Corrige además los factores de sangrado modificables.</span>`}
 if(id==='heart'){const s=['h','e','a','r','t'].reduce((x,n)=>x+v(n),0);h=`<b>${s} / 10</b><span>${s<=3?'Riesgo bajo (MACE ≈1–2%): candidato a alta precoz con seguimiento.':s<=6?'Riesgo intermedio: observación, troponinas seriadas y estudio.':'Riesgo alto: manejo invasivo temprano.'}</span>`}
 if(id==='wells'){const s=ch();h=`<b>${s} puntos</b><span>${s>4?'TEP probable: angio-TC pulmonar.':'TEP poco probable: dímero D (ajustado por edad); si es normal, se descarta.'}</span>`}
 out.innerHTML=h;
}

/* ── Práctica ── */
const Q={tema:'Todos',order:[],i:0,ans:null,score:0,answered:0};
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
function quizStart(t){Q.tema=t||Q.tema;const idx=C.quiz.map((_,i)=>i).filter(i=>Q.tema==='Todos'||C.quiz[i].tema===Q.tema);Object.assign(Q,{order:shuffle(idx),i:0,ans:null,score:0,answered:0})}
quizStart('Todos');
const F={i:0,flip:false,order:C.tarjetas.map((_,i)=>i)};
const RX={pool:C.ritmos.filter(r=>!r.lead&&!['sinus-arr','st-dep','pac'].includes(r.id)),cur:null,ans:null,ok:0,n:0,seed:11};
function rxNew(){const p=RX.pool,c=p[Math.floor(Math.random()*p.length)];const others=shuffle(p.filter(r=>r.id!==c.id)).slice(0,3);RX.cur={r:c,opts:shuffle([c,...others])};RX.ans=null;RX.seed=1+Math.floor(Math.random()*999)}
function practice(mode){
 mode=mode||'preguntas';
 const tabs=[['preguntas','Preguntas'],['tarjetas','Tarjetas'],['ecg','¿Qué ritmo es?']].map(([k,t])=>`<a class="cd-tab${k===mode?' on':''}" href="#/practica/${k}"${k===mode?' aria-current="page"':''}>${t}</a>`).join('');
 let body='';
 if(mode==='preguntas'){
  const temas=['Todos',...new Set(C.quiz.map(q=>q.tema))];
  if(Q.i>=Q.order.length){const best=Math.max(P.quizBest||0,Q.order.length?Math.round(Q.score/Q.order.length*100):0);if(best!==P.quizBest){P.quizBest=best;store.set(P)}
   body=`<div class="cd-quiz cd-quiz-end"><h2>Resultado: ${Q.score} / ${Q.order.length}</h2><p>Mejor porcentaje guardado en este navegador: ${P.quizBest||0}%.</p><button class="cd-btn cd-btn-main" data-act="qrestart">Volver a empezar</button></div>`}
  else{const q=C.quiz[Q.order[Q.i]];
   body=`<div class="cd-chips" role="group" aria-label="Tema">${temas.map(t=>`<button class="cd-chipbtn${t===Q.tema?' on':''}" data-act="qtema" data-t="${t}" aria-pressed="${t===Q.tema}">${t}</button>`).join('')}</div>
   <div class="cd-quiz"><p class="cd-over">Pregunta ${Q.i+1} de ${Q.order.length} · ${esc(q.tema)} · aciertos ${Q.score}/${Q.answered}</p><h2>${fmt(q.q)}</h2>
   <div class="cd-opts">${q.o.map((o,j)=>{let cls='';if(Q.ans!==null){if(j===q.k)cls=' is-right';else if(j===Q.ans)cls=' is-wrong'}return `<button class="cd-opt${cls}" data-act="qans" data-j="${j}"${Q.ans!==null?' disabled':''}><span>${'ABCD'[j]}</span>${fmt(o)}</button>`}).join('')}</div>
   ${Q.ans!==null?`<div class="cd-expl ${Q.ans===q.k?'ok':'bad'}" role="status"><b>${Q.ans===q.k?'Correcto.':'No exactamente.'}</b> ${fmt(q.x)}</div><button class="cd-btn cd-btn-main" data-act="qnext">${Q.i+1<Q.order.length?'Siguiente pregunta →':'Ver resultado'}</button>`:''}</div>`}
 }
 if(mode==='tarjetas'){const c=C.tarjetas[F.order[F.i]];
  body=`<div class="cd-flash"><p class="cd-over">Tarjeta ${F.i+1} de ${C.tarjetas.length}</p><button class="cd-card-flip${F.flip?' is-flipped':''}" data-act="fflip" aria-label="Voltear tarjeta"><span class="cd-front">${fmt(c[0])}</span><span class="cd-back">${fmt(c[1])}</span></button>
  <div class="cd-pn"><button class="cd-btn" data-act="fprev">← Anterior</button><button class="cd-btn cd-btn-main" data-act="fflip">${F.flip?'Ver pregunta':'Ver respuesta'}</button><button class="cd-btn" data-act="fnext">Siguiente →</button><button class="cd-btn" data-act="fshuffle">Barajar</button></div></div>`}
 if(mode==='ecg'){if(!RX.cur)rxNew();const r=RX.cur.r;
  body=`<div class="cd-quiz"><p class="cd-over">Reto ECG · aciertos ${RX.ok}/${RX.n}</p><h2>¿Qué ritmo o patrón muestra este trazo?</h2>${strip(r.id,'',{seconds:7,seed:RX.seed})}
  <div class="cd-opts">${RX.cur.opts.map(o=>{let cls='';if(RX.ans){if(o.id===r.id)cls=' is-right';else if(o.id===RX.ans)cls=' is-wrong'}return `<button class="cd-opt${cls}" data-act="rxans" data-id="${o.id}"${RX.ans?' disabled':''}>${esc(o.nombre)}</button>`}).join('')}</div>
  ${RX.ans?`<div class="cd-expl ${RX.ans===r.id?'ok':'bad'}" role="status"><b>${RX.ans===r.id?'Correcto':'Era: '+esc(r.nombre)}.</b> Criterios: ${r.criterios.map(fmt).join(' · ')}</div><div class="cd-pn"><button class="cd-btn cd-btn-main" data-act="rxnext">Otro trazo →</button><a class="cd-btn" href="#/ecg/ritmo/${r.id}">Ficha del ritmo</a></div>`:''}</div>`}
 return `${crumb([['#/inicio','Inicio'],[null,'Práctica']])}${head('Repaso activo','Práctica','Recuperar la información de memoria consolida mucho más que releer. Combina las tres modalidades.')}<nav class="cd-tabs" aria-label="Modalidad">${tabs}</nav>${body}`;
}

/* ── Fuentes ── */
function sources(){return `${crumb([['#/inicio','Inicio'],[null,'Fuentes']])}${head('Método y referencias','Fuentes y uso responsable')}
 <section class="cd-panel cd-panel-wide"><h2>Cómo está hecho</h2><ul class="cd-list">
  <li>Texto editorial original, redactado con fines educativos a partir de las guías de práctica clínica listadas. No reproduce libros ni algoritmos protegidos.</li>
  <li>Los trazos ECG son <b>esquemáticos</b>: se generan con un modelo matemático para mostrar criterios. No son registros reales y no sustituyen la práctica con ECG auténticos.</li>
  <li>Las dosis y metas se resumen como referencia de estudio. Verifica la versión vigente de cada guía, la ficha técnica y los protocolos locales.</li>
  <li>Este contenido <b>no sustituye</b> el juicio clínico, la evaluación individual del paciente ni un curso certificado de BLS/ACLS.</li></ul></section>
 ${C.fuentes.map(g=>`<section class="cd-section"><div class="cd-sechead"><h2>${esc(g.g)}</h2></div><ul class="cd-refs">${g.items.map(([t,u])=>`<li><a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${esc(t)} ↗</a></li>`).join('')}</ul></section>`).join('')}
 <p class="cd-cross">CARDIORA es un proyecto hermano de <a href="../infeora/">INFEORA · Atlas de Infectología Clínica</a>.</p>`}
const notFound=()=>`${head('404','No encontrado','La página que buscas no existe.')}<a class="cd-btn cd-btn-main" href="#/inicio">Volver al inicio</a>`;

/* ── Búsqueda global ── */
let IDX=null;
function buildIndex(){IDX=[];
 const add=(t,k,h,txt)=>IDX.push({t,k,h,n:norm(t),x:norm(txt||'')});
 C.fundamentos.forEach(x=>add(x.titulo,'Fundamentos','#/fundamentos/'+x.id,x.sub+' '+x.resumen+' '+JSON.stringify(x.secciones)));
 C.ecgLecciones.forEach(x=>add(x.titulo,'ECG','#/ecg/'+x.id,x.sub+' '+x.resumen+' '+JSON.stringify(x.secciones)));
 C.acls.forEach(x=>add(x.titulo,'ACLS','#/acls/'+x.id,x.sub+' '+x.resumen+' '+JSON.stringify(x.secciones)));
 C.ritmos.forEach(x=>add(x.nombre,'Ritmo ECG','#/ecg/ritmo/'+x.id,x.criterios.join(' ')+' '+x.causas.join(' ')+' '+x.manejo));
 C.patologias.forEach(x=>add(x.nombre,'Patología','#/patologias/'+x.id,[x.idea,x.fisio,...x.clinica,...x.dx,...x.tx].join(' ')));
 C.farmacos.forEach(x=>add(x.nombre,'Fármaco','#/farmacos/'+x.id,x.ej+' '+x.mec+' '+x.usos.join(' ')));
 [['Calculadora de QTc','#/herramientas'],['CHA₂DS₂-VA','#/herramientas'],['Escala HEART','#/herramientas'],['Wells TEP','#/herramientas'],['Simulador de código ACLS','#/acls'],['Tarjetas de memoria','#/practica/tarjetas'],['Reto de ritmos ECG','#/practica/ecg']].forEach(([t,h])=>add(t,'Herramienta',h,''));
}
function search(q){if(!IDX)buildIndex();const n=norm(q.trim());if(n.length<2)return [];const words=n.split(/\s+/);
 return IDX.map(e=>{let s=0;for(const w of words){if(e.n.includes(w))s+=10;else if(e.x.includes(w))s+=2;else return null}if(e.n.startsWith(n))s+=8;return {e,s}}).filter(Boolean).sort((a,b)=>b.s-a.s).slice(0,14).map(r=>r.e)}
function openSearch(){const d=$('#cdSearch');d.hidden=false;document.body.classList.add('cd-noscroll');const i=d.querySelector('input');i.value='';paintSearch('');setTimeout(()=>i.focus(),20)}
function closeSearch(){$('#cdSearch').hidden=true;document.body.classList.remove('cd-noscroll')}
function paintSearch(q){const r=search(q),el=$('#cdSearchRes');el.innerHTML=q.trim().length<2?'<li class="cd-muted">Escribe al menos 2 letras: «QT», «adenosina», «fibrilación»…</li>':r.length?r.map(e=>`<li><a href="${e.h}" data-act="searchgo"><b>${esc(e.t)}</b><span>${esc(e.k)}</span></a></li>`).join(''):'<li class="cd-muted">Sin resultados.</li>'}

/* ── Marco y router ── */
function shell(route,content){
 const top=route[0]||'inicio';
 return `<a class="cd-skip" href="#main" data-act="skip">Saltar al contenido</a>
 <header class="cd-top"><a class="cd-brand" href="#/inicio" aria-label="CARDIORA, inicio"><span class="cd-mark" aria-hidden="true"><svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="19"/><path d="M5 21h8l3-7 4 14 3-10 2 3h10"/></svg></span><span><strong>CARDI<span>ORA</span></strong><small>Cardiología 101</small></span></a>
 <nav class="cd-nav" aria-label="Secciones">${NAV.map(([k,t],i)=>`<a href="#/${k}"${k===top?' class="on" aria-current="page"':''}><i>${String(i+1).padStart(2,'0')}</i>${t}</a>`).join('')}</nav>
 <button class="cd-searchbtn" data-act="search" aria-label="Buscar en CARDIORA"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg><span>Buscar</span><kbd>/</kbd></button></header>
 <main id="main" class="cd-main" tabindex="-1">${content}</main>
 <footer class="cd-foot"><span><b>CARDIORA</b> · Cardiología 101, proyecto hermano de <a href="../infeora/">INFEORA</a></span><span>Contenido educativo: no sustituye el juicio clínico, la guía vigente ni un curso certificado de soporte vital.</span><a href="https://github.com/ProQuincy2471/atb-atlas" target="_blank" rel="noopener noreferrer">Repositorio ↗</a></footer>
 <div class="cd-search" id="cdSearch" hidden role="dialog" aria-modal="true" aria-label="Buscar"><div class="cd-search-box"><label><span class="cd-vh">Buscar</span><input type="search" placeholder="Buscar lecciones, ritmos, patologías, fármacos…" autocomplete="off"></label><button class="cd-btn" data-act="closesearch">Cerrar</button><ul id="cdSearchRes"></ul></div></div>`;
}
let lastRoute='';
function render(){
 const h=location.hash.replace(/^#\/?/,''),r=h.split('/').filter(Boolean).map(decodeURIComponent),[a,b,c]=r;let html;
 if(!a||a==='inicio')html=home();
 else if(['fundamentos','ecg','acls'].includes(a)){html=b==='ritmo'?rhythm(c):b?lesson(a,b):areaIndex(a)}
 else if(a==='patologias')html=b?pato(b):patoIndex();
 else if(a==='farmacos')html=farmacos(b);
 else if(a==='herramientas')html=tools();
 else if(a==='practica')html=practice(b);
 else if(a==='fuentes')html=sources();
 else html=notFound();
 const title={inicio:'Inicio',fundamentos:'Fundamentos',ecg:'ECG',acls:'ACLS',patologias:'Patologías',farmacos:'Fármacos',herramientas:'Herramientas',practica:'Práctica',fuentes:'Fuentes'}[a||'inicio'];
 document.title=(title?title+' · ':'')+'CARDIORA · Cardiología 101';
 app.innerHTML=shell(r,html);
 document.querySelectorAll('[data-calc]').forEach(calc);simPaint();
 const nav=$('.cd-nav'),on=nav&&nav.querySelector('.on');if(on&&nav.scrollWidth>nav.clientWidth)nav.scrollLeft=on.offsetLeft-nav.clientWidth/2+on.offsetWidth/2;
 const same=lastRoute.split('/')[0]===h.split('/')[0]&&a==='practica';
 if(a==='farmacos'&&b){const el=document.getElementById('f-'+b);if(el)el.scrollIntoView({block:'start'})}else if(!same)scrollTo(0,0);
 lastRoute=h;
}
function rerender(){const y=scrollY;render();scrollTo(0,y)}

/* ── Eventos ── */
document.addEventListener('click',e=>{
 const t=e.target.closest('[data-act]');if(!t)return;const act=t.dataset.act;
 if(act==='search'){openSearch()}
 else if(act==='closesearch'){closeSearch()}
 else if(act==='searchgo'){closeSearch()}
 else if(act==='skip'){e.preventDefault();$('#main').focus()}
 else if(act==='jump'){e.preventDefault();const el=document.getElementById(t.dataset.to);if(el){el.scrollIntoView({behavior:'smooth',block:'start'})}}
 else if(act==='read'){toggleRead(t.dataset.key);rerender()}
 else if(act==='rgroup'){rhythmGroup=t.dataset.g;const y=scrollY;render();scrollTo(0,y)}
 else if(act==='toatlas'){rhythmGroup='Todos'}
 else if(act==='pcat'){patoCat=t.dataset.c;const y=scrollY;render();scrollTo(0,y)}
 else if(act==='sim'){simOp(t.dataset.op)}
 else if(act==='qtema'){quizStart(t.dataset.t);rerender()}
 else if(act==='qans'){if(Q.ans===null){Q.ans=+t.dataset.j;Q.answered++;if(Q.ans===C.quiz[Q.order[Q.i]].k)Q.score++;rerender()}}
 else if(act==='qnext'){Q.i++;Q.ans=null;rerender()}
 else if(act==='qrestart'){quizStart();rerender()}
 else if(act==='fflip'){F.flip=!F.flip;rerender()}
 else if(act==='fnext'){F.i=(F.i+1)%F.order.length;F.flip=false;rerender()}
 else if(act==='fprev'){F.i=(F.i-1+F.order.length)%F.order.length;F.flip=false;rerender()}
 else if(act==='fshuffle'){F.order=shuffle(F.order);F.i=0;F.flip=false;rerender()}
 else if(act==='rxans'){if(!RX.ans){RX.ans=t.dataset.id;RX.n++;if(RX.ans===RX.cur.r.id)RX.ok++;rerender()}}
 else if(act==='rxnext'){rxNew();rerender()}
});
function anaSelect(z){if(!z)return;document.querySelectorAll('.ecg-zone').forEach(x=>x.classList.toggle('on',x===z));const info=$('#anaInfo');if(info)info.innerHTML=anaText(z.dataset.zone)}
document.addEventListener('click',e=>anaSelect(e.target.closest('.ecg-zone')));
document.addEventListener('keydown',e=>{
 const z=e.target.closest&&e.target.closest('.ecg-zone');if(z&&(e.key==='Enter'||e.key===' ')){e.preventDefault();anaSelect(z)}
 const s=$('#cdSearch');
 if(e.key==='Escape'&&s&&!s.hidden){closeSearch();return}
 if(e.key==='/'&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)&&s&&s.hidden){e.preventDefault();openSearch()}
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch()}
});
document.addEventListener('input',e=>{
 if(e.target.closest('#cdSearch')){paintSearch(e.target.value);return}
 if(e.target.id==='patoQ'){patoQ=e.target.value;const pos=e.target.selectionStart,y=scrollY;render();const i=$('#patoQ');i.focus();try{i.setSelectionRange(pos,pos)}catch(_){}scrollTo(0,y);return}
 const sec=e.target.closest('[data-calc]');if(sec)calc(sec);
});
document.addEventListener('change',e=>{const sec=e.target.closest('[data-calc]');if(!sec)return;
 /* los dos tramos de edad de CHA₂DS₂-VA son excluyentes: gana el último marcado */
 if(sec.dataset.calc==='cha'&&e.target.checked&&/^a2?$/.test(e.target.name))sec.querySelector(`[name=${e.target.name==='a'?'a2':'a'}]`).checked=false;calc(sec)});
addEventListener('hashchange',render);
render();
window.CARDIORA={render,simOp,S,search};
})();
