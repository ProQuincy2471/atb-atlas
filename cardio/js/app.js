/* CARDIORA — Cardiología 101. App estática sin dependencias: rutas por hash, render por plantillas y delegación de eventos.
   Datos en cardio/data/*.js (window.CARDIO); trazos en cardio/js/ecg-engine.js (window.ECG); iconos y paletas en cardio/js/icons.js.
   Dirección visual «trazo anotado»: papel de ECG, tinta, rojo de plumilla, azul de bolígrafo y ámbar de marcador. */
(function(){
'use strict';
const C=window.CARDIO,$=s=>document.querySelector(s),app=$('#app'),I=window.CI,PAL=window.CPAL;
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=s=>esc(s).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>');
const plain=s=>String(s).replace(/\*\*/g,'');
const norm=s=>String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
const pad=n=>String(n).padStart(2,'0');
const tint=c=>`--c:${c[0]};--cd:${c[1]}`;

/* ── Progreso (solo comodidad local; la app funciona sin almacenamiento) ── */
const store={get(){try{return JSON.parse(localStorage.getItem('cardiora.v1'))||{}}catch(e){return {}}},set(v){try{localStorage.setItem('cardiora.v1',JSON.stringify(v))}catch(e){}}};
let P=store.get();P.read=P.read||{};
const isRead=k=>!!P.read[k],toggleRead=k=>{if(P.read[k])delete P.read[k];else P.read[k]=1;store.set(P)};

/* ── Áreas ── */
const LEVELS=[
 {n:1,id:'fundamentos',t:'Fundamentos',d:'Anatomía, ciclo cardiaco, hemodinamia, electrofisiología y exploración.',list:()=>C.fundamentos,rx:'sinus'},
 {n:2,id:'ecg',t:'ECG',d:'Papel, método en 8 pasos, isquemia, bloqueos, electrolitos y atlas de ritmos.',list:()=>C.ecgLecciones,rx:'mobitz1'},
 {n:3,id:'acls',t:'ACLS',d:'RCP de alta calidad, paro, bradicardia, taquicardia y post-paro, con simulador.',list:()=>C.acls,rx:'vf'},
 {n:4,id:'patologias',t:'Patologías',d:'SCA, insuficiencia cardiaca, arritmias, HTA, válvulas, pericardio, aorta y TEP.',list:()=>C.patologias,rx:'stemi'},
 {n:5,id:'farmacos',t:'Fármacos',d:'Mecanismo, indicaciones, efectos adversos y perlas por grupo terapéutico.',list:()=>C.farmacos,rx:'af'}
];
const NAV=[['inicio','Inicio'],['fundamentos','Fundamentos'],['ecg','ECG'],['acls','ACLS'],['patologias','Patologías'],['farmacos','Fármacos'],['herramientas','Herramientas'],['practica','Práctica'],['fuentes','Fuentes']];
const catOf=id=>C.categorias.find(c=>c[0]===id);

/* ── Bloques de contenido ── */
function table(t){
 const h=t.h.map(x=>`<th scope="col">${fmt(x)}</th>`).join('');
 const r=t.r.map(row=>'<tr>'+row.map((c,i)=>`<td data-label="${esc(t.h[i]||'')}">${fmt(c)}</td>`).join('')+'</tr>').join('');
 return `<div class="cd-table"><table><thead><tr>${h}</tr></thead><tbody>${r}</tbody></table></div>`;
}
function strip(id,cap,o){o=o||{};return `<figure class="cd-strip${o.dark?' is-dark':''}">${ECG.svg(id,{lead:o.lead||'II',seconds:o.seconds||6,animate:o.animate,seed:o.seed,cal:o.cal})}${cap?`<figcaption>${fmt(cap)}</figcaption>`:''}</figure>`}
function blocks(arr){return arr.map(b=>{
 if(typeof b==='string')return `<p>${fmt(b)}</p>`;
 if(b.ul)return `<ul class="cd-list">${b.ul.map(x=>`<li>${fmt(x)}</li>`).join('')}</ul>`;
 if(b.ol)return `<ol class="cd-steps">${b.ol.map(x=>`<li>${fmt(x)}</li>`).join('')}</ol>`;
 if(b.table)return table(b.table);
 if(b.pearl)return `<aside class="cd-note cd-pearl"><b>Perla clínica</b><p>${fmt(b.pearl)}</p></aside>`;
 if(b.warn)return `<aside class="cd-note cd-warn"><b>${I('alert')}Atención</b><p>${fmt(b.warn)}</p></aside>`;
 if(b.flow)return `<ol class="cd-flow">${b.flow.map(x=>`<li><span>${fmt(x)}</span></li>`).join('')}</ol>`;
 if(b.ecg)return strip(b.ecg,b.cap,{lead:b.lead});
 return '';}).join('')}

/* ── Piezas comunes ── */
/* Progreso dibujado como trazo: cada lección estudiada es un latido; las pendientes, línea isoeléctrica */
function progTrace(beats,label){
 const W=Math.max(beats.length,1)*22,base=17;let on='';
 beats.forEach((r,i)=>{if(!r)return;const x=i*22;on+=`M${x+2} ${base}h3q1.5 -3 3 0h2l1 2 2 -15 2 18 1 -5h2q2 -5 4 0h1`});
 const n=beats.filter(Boolean).length;
 return `<div class="cd-trace" role="img" aria-label="${n} de ${beats.length} ${label}"><svg viewBox="0 0 ${W} 24" preserveAspectRatio="none" aria-hidden="true"><path class="off" d="M0 ${base}H${W}"/><path class="on" d="${on}"/></svg><span><b>${n}</b>/${beats.length} ${label}</span></div>`;
}
/* Cabecera de página: folio con numeral, título, datos y cinta de ECG */
function mast(o){
 const rib=ECG.svg(o.rx||'sinus',{seconds:14,height:13,baseline:.7,cal:false,animate:true,seed:9});
 return `<header class="cd-folio" style="${tint(o.c)}">
 <div class="cd-folio-grid"><span class="cd-folio-num" aria-hidden="true">${o.num||''}</span>
  <div class="cd-folio-copy"><p class="cd-folio-over">${I(o.icon)}<span>${o.over}</span></p><h1>${o.title}</h1>${o.lead?`<p class="cd-folio-lead">${o.lead}</p>`:''}
  ${o.pills&&o.pills.length?`<p class="cd-folio-facts">${o.pills.map(([ic,t])=>`<span>${I(ic)}${t}</span>`).join('')}</p>`:''}</div>
  ${o.beats?progTrace(o.beats,o.beatLabel||'estudiadas'):''}</div>
 <div class="cd-ribbon" aria-hidden="true"><span>${o.ribLabel||'II'}</span>${rib}</div></header>`;
}
const crumb=items=>`<nav class="cd-crumb" aria-label="Ruta">${items.map(([h,t])=>h?`<a href="${h}">${esc(t)}</a>`:`<span>${esc(t)}</span>`).join('<i aria-hidden="true">/</i>')}</nav>`;
const sechead=(over,title,p,icon,c)=>`<div class="cd-sechead"${c?` style="${tint(c)}"`:''}><p class="cd-over">${icon?I(icon):''}${over}</p><h2>${title}</h2>${p?`<p>${p}</p>`:''}</div>`;
const levelOf=area=>LEVELS.find(l=>l.id===area);
function progress(area){const l=levelOf(area),list=l.list(),n=list.filter(x=>isRead(area+':'+x.id)).length;return {n,total:list.length,pct:list.length?Math.round(n/list.length*100):0,beats:list.map(x=>isRead(area+':'+x.id))}}
function lstats(x){const s={tab:0,ecg:0,flow:0};for(const sec of x.secciones||[])for(const b of sec.b){if(b.table)s.tab++;if(b.ecg)s.ecg++;if(b.flow||b.ol)s.flow++}return s}
function lessonCard(area,x,i){const l=levelOf(area),done=isRead(area+':'+x.id),s=lstats(x);
 return `<a class="cd-lcard${done?' is-done':''}" href="#/${area}/${x.id}" style="${tint(PAL.nivel[l.n])}">
 <span class="cd-lcard-num">${pad(i+1)}</span>${done?`<em class="cd-stamp">Estudiada</em>`:''}
 <h3>${esc(x.titulo)}</h3><p>${esc(x.sub)}</p>
 <span class="cd-lcard-meta"><span>${x.min} min</span><span>${x.secciones.length} secciones</span>${s.tab?`<span>${s.tab} tablas</span>`:''}${s.ecg?`<span class="is-ecg">${I('ecg')}${s.ecg}</span>`:''}</span><span class="cd-lcard-go">${I('arrow')}</span></a>`}
const ph=(ic,t)=>`<h2 class="cd-ph">${I(ic)}<span>${t}</span></h2>`;

/* ── Monitor multiparámetro ── */
const MON=[['sinus','Ritmo sinusal',75,98,'118/76',14,1],['af','Fibrilación auricular','≈100',96,'128/82',18,.8],['flutter','Flutter auricular 2:1',150,95,'104/68',20,.7],['svt','TSV paroxística',180,94,'96/60',22,.55],['vt','TV monomórfica',170,88,'78/50',26,.35],['avb3','Bloqueo AV completo',39,93,'82/48',16,.9],['stemi','Elevación del ST',80,95,'142/90',18,.9]];
function pleth(hr,amp){const fc=typeof hr==='number'?hr:100,rr=60/fc,W=150,H=16;let d='';
 for(let i=0;i<=600;i++){const t=i/100,ph=(t%rr)/rr,y=Math.exp(-Math.pow((ph-.16)/.08,2))+.38*Math.exp(-Math.pow((ph-.45)/.1,2));d+=(i?'L':'M')+(t/6*W).toFixed(2)+' '+(H-2-y*amp*11).toFixed(2)}
 return `<svg class="cd-pleth ecg-anim" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><path d="${d}" pathLength="1"/></svg>`}
function monitor(i){const m=MON[i];return {trace:ECG.svg(m[0],{seconds:6,height:26,animate:true,cal:false,seed:i+3}),pleth:pleth(m[2],m[6])}}

/* ── Inicio ── */
const H={q:0,ans:null,pearl:0,rx:0,rxShown:false,rxSeed:4};
let PEARLS=null;
function pearls(){if(PEARLS)return PEARLS;PEARLS=[];
 for(const [area,list] of [['fundamentos',C.fundamentos],['ecg',C.ecgLecciones],['acls',C.acls]])for(const x of list)for(const s of x.secciones)for(const b of s.b)if(b.pearl)PEARLS.push([b.pearl,`#/${area}/${x.id}`,x.titulo]);
 for(const f of C.farmacos)PEARLS.push([f.perla,'#/farmacos/'+f.id,f.nombre]);return PEARLS}
const RXPOOL=C.ritmos.filter(r=>!r.lead&&!['sinus-arr','st-dep','pac'].includes(r.id));
function homeInit(){H.q=Math.floor(Math.random()*C.quiz.length);H.pearl=Math.floor(Math.random()*pearls().length);H.rx=Math.floor(Math.random()*RXPOOL.length)}
homeInit();
/* Trazo impreso con anotaciones a mano (mismas coordenadas en mm que el trazo: 4 s × 30 mm, línea basal a 18 mm) */
function printout(){
 const notes=`<svg class="cd-notes" viewBox="0 0 100 30" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
  <path d="M27.5 10.8c2.6.4 4.8 1.8 6.1 4.2"/><path d="m32.7 14.2 1.4.9.1-1.7"/><text x="17.5" y="10.2">onda P</text>
  <path d="M44 4.2c-1.6.1-3 .9-3.9 2.3"/><path d="m40.9 5.4-.8 1.2 1.4.2"/><text x="44.5" y="5">QRS</text>
  <path d="M49.6 22.4c-.6-2.6-1.9-4.4-3.6-5.4"/><path d="m46.6 16.3-.8.6.9.8"/><text x="47.5" y="25.2">onda T</text>
  <path class="br" d="M39 1.8V3.2M39 2.5H59M59 1.8V3.2"/><text x="61" y="3.4">RR 0,80 s → 75 lpm</text>
  <path class="hl" d="M33.4 18h4.3"/><path class="br" d="M33.4 20.2V21.4M33.4 20.8H37.7M37.7 20.2V21.4"/><text x="27" y="25.2">PR 0,16 s</text></svg>`;
 return `<figure class="cd-printout"><i class="cd-tape cd-tape-l" aria-hidden="true"></i><i class="cd-tape cd-tape-r" aria-hidden="true"></i>
  <figcaption class="cd-printout-head"><span><b>CARDIORA</b> · ECG de reposo</span><span>25 mm/s · 10 mm/mV · derivación II</span></figcaption>
  <div class="cd-printout-strip">${ECG.svg('sinus',{seconds:4,height:30,seed:3,lead:'II'})}${notes}</div>
  <p class="cd-printout-foot"><span class="cd-hand">Ritmo sinusal, 75 lpm, eje normal ✓</span><span>Trazo esquemático didáctico</span></p></figure>`;
}
function home(){
 const n={l:C.fundamentos.length+C.ecgLecciones.length+C.acls.length,r:C.ritmos.length,p:C.patologias.length,f:C.farmacos.length,q:C.quiz.length+C.tarjetas.length};
 const m=monitor(0),q=C.quiz[H.q],pe=pearls()[H.pearl],rx=RXPOOL[H.rx];
 const read=Object.keys(P.read).length,total=LEVELS.reduce((a,l)=>a+l.list().length,0);
 const pathTrace=`<svg class="cd-path-trace" viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 44${[0,1,2,3,4].map(i=>{const x=100+200*i;return `H${x-22}q5 -7 10 0h5l3 5 4 -40 4 46 3 -11h6q8 -10 16 0`}).join('')}H1000"/></svg>`;
 return `<section class="cd-hero">
  <div class="cd-hero-copy"><p class="cd-kicker"><i class="cd-pulse" aria-hidden="true"></i>Cardiología 101 · guía didáctica</p>
   <h1>Del <em>latido</em> a la <mark>decisión clínica</mark>.</h1>
   <p class="cd-hero-lead">Aprende cardiología desde cero y en orden: cómo funciona el corazón, cómo se lee un ECG, cómo se actúa en un paro y cómo se diagnostican y tratan las enfermedades que verás en la guardia.</p>
   <div class="cd-cta"><a class="cd-btn cd-btn-main" href="#/fundamentos/anatomia">${I('play')}Empezar por el nivel 1</a><a class="cd-btn" href="#/acls">${I('acls')}Simulador ACLS</a><a class="cd-btn" href="#/ecg">${I('ecg')}Leer un ECG</a></div>
   <p class="cd-hero-progress">${read?`<b>${read}</b> de ${total} temas estudiados`:`${total} temas · empieza en 10 minutos`}</p></div>
  ${printout()}
 </section>
 <section class="cd-stats" aria-label="Contenido">${[[n.l,'lecciones guiadas',PAL.nivel[1]],[n.r,'ritmos y patrones ECG',PAL.nivel[2]],[n.p,'fichas de patologías',PAL.nivel[4]],[n.f,'grupos de fármacos',PAL.nivel[5]],[n.q,'preguntas y tarjetas',PAL.nivel[3]]].map(([v,t,c])=>`<div style="${tint(c)}"><b>${v}</b><small>${t}</small></div>`).join('')}</section>

 <section class="cd-section">${sechead('Ruta de aprendizaje','Cinco niveles, en orden','Cada nivel se apoya en el anterior. Marca las lecciones como estudiadas y tu avance aparecerá aquí, latido a latido (se guarda solo en este navegador).')}
  <div class="cd-path-wrap">${pathTrace}<ol class="cd-path">${LEVELS.map(l=>{const p=progress(l.id),list=l.list();
   return `<li class="cd-lvl" style="${tint(PAL.nivel[l.n])}"><a href="#/${l.id}"><span class="cd-lvl-head"><b>${pad(l.n)}</b>${I(l.id)}</span>
    <span class="cd-lvl-body"><strong>${l.t}</strong><span class="cd-lvl-d">${l.d}</span>
    <span class="cd-lvl-list">${list.slice(0,4).map(x=>`<span class="${isRead(l.id+':'+x.id)?'on':''}">${esc(x.titulo||x.nombre)}</span>`).join('')}${list.length>4?`<em>+ ${list.length-4} más</em>`:''}</span></span>
    <span class="cd-lvl-foot">${progTrace(p.beats,'completadas')}<span class="cd-lvl-cta">${p.n===0?'Empezar':p.n===p.total?'Repasar':'Continuar'}${I('arrow')}</span></span></a></li>`}).join('')}</ol></div></section>

 <section class="cd-liveband" aria-label="Monitor didáctico"><div class="cd-live-copy"><p class="cd-over">${I('ecg')}En vivo</p><h2>Un monitor, <em>siete ritmos</em>.</h2>
   <p>Cada seis segundos cambia el ritmo y cambian las constantes. Míralo como en la guardia: primero el trazo, después los números.</p>
   <ol class="cd-live-list" id="heroList">${MON.map((x,i)=>`<li class="${i===0?'on':''}"><a href="#/ecg/ritmo/${x[0]}">${x[1]}</a></li>`).join('')}</ol></div>
  <div class="cd-monitor" id="heroMon" aria-hidden="true">
   <div class="cd-mon-head"><span><i class="cd-rec"></i>Monitor didáctico</span><span id="heroName">${MON[0][1]}</span></div>
   <div class="cd-mon-grid"><div class="cd-mon-waves">
     <div class="cd-mon-ch is-ecg"><span>II</span><div id="heroTrace">${m.trace}</div></div>
     <div class="cd-mon-ch is-pleth"><span>Pleth</span><div id="heroPleth">${m.pleth}</div></div></div>
    <div class="cd-mon-vitals"><div class="is-hr"><span>FC</span><b id="heroHr">${MON[0][2]}</b><small>lpm</small></div><div class="is-sp"><span>SpO₂</span><b id="heroSp">${MON[0][3]}</b><small>%</small></div><div class="is-pa"><span>PA</span><b id="heroPa">${MON[0][4]}</b><small>mmHg</small></div><div class="is-fr"><span>FR</span><b id="heroFr">${MON[0][5]}</b><small>rpm</small></div></div></div>
   <div class="cd-mon-foot"><span>Trazos esquemáticos · valores ilustrativos</span><span>25 mm/s · 10 mm/mV</span></div></div></section>

 <section class="cd-section">${sechead('Estudia hoy','Tres minutos de práctica','Una pregunta, una perla y un trazo para identificar. Cambian cada vez que entras.')}
  <div class="cd-today">
   <article class="cd-widget cd-widget-q" style="${tint(PAL.nivel[4])}"><header><b>Pregunta rápida</b><span>${esc(q.tema)}</span></header><h3>${fmt(q.q)}</h3>
    <div class="cd-wopts">${q.o.map((o,j)=>{let cls='';if(H.ans!==null){if(j===q.k)cls=' is-right';else if(j===H.ans)cls=' is-wrong'}return `<button class="cd-wopt${cls}" data-act="hq" data-j="${j}"${H.ans!==null?' disabled':''}><i>${'abcd'[j]}</i>${fmt(o)}</button>`}).join('')}</div>
    ${H.ans!==null?`<p class="cd-wexpl">${fmt(q.x)}</p>`:''}<footer><button class="cd-link-btn" data-act="hqnext">${I('shuffle')}Otra pregunta</button><a href="#/practica">Ir a Práctica ${I('arrow')}</a></footer></article>
   <article class="cd-widget cd-widget-pearl"><header><b>Perla clínica</b><span>${pearls().length} perlas</span></header><blockquote>${fmt(pe[0])}</blockquote>
    <footer><button class="cd-link-btn" data-act="hpearl">${I('shuffle')}Otra perla</button><a href="${pe[1]}">${esc(pe[2])} ${I('arrow')}</a></footer></article>
   <article class="cd-widget cd-widget-rx" style="${tint(PAL.nivel[2])}"><header><b>Ritmo misterioso</b><span>${RXPOOL.length} posibles</span></header>
    ${strip(rx.id,'',{seconds:5,seed:H.rxSeed,cal:false})}
    ${H.rxShown?`<div class="cd-wreveal"><b>${esc(rx.nombre)}</b><span>${fmt(rx.criterios[0])}</span></div>`:`<p class="cd-wq">¿Lo reconoces? Fíjate en la regularidad, las ondas P y la anchura del QRS.</p>`}
    <footer>${H.rxShown?`<button class="cd-link-btn" data-act="hrxnext">${I('shuffle')}Otro trazo</button><a href="#/ecg/ritmo/${rx.id}">Ficha del ritmo ${I('arrow')}</a>`:`<button class="cd-btn cd-btn-main cd-btn-sm" data-act="hrx">${I('eye')}Revelar</button><a href="#/practica/ecg">Reto completo ${I('arrow')}</a>`}</footer></article>
  </div></section>

 <section class="cd-method">${sechead('Cómo estudiar con CARDIORA','Leer, ver, practicar, repasar','Cuatro pasos que se repiten en cada nivel.')}
  <ol>${[['Lee la lección','Resumen, tablas, flujos y perlas; termina con ideas clave y autoevaluación.'],['Mira el trazo','Cada concepto eléctrico tiene su trazo esquemático en papel milimetrado.'],['Practícalo','Simulador de código, calculadoras y casos con decisión inmediata.'],['Repasa','Preguntas con explicación y tarjetas de memoria para fijarlo.']].map(([t,d],i)=>`<li><i>${['I','II','III','IV'][i]}</i><b>${t}</b><p>${d}</p></li>`).join('')}</ol></section>

 <section class="cd-section">${sechead('Para practicar','Herramientas interactivas','')}
  <div class="cd-grid3">${[
   ['#/acls','acls',PAL.nivel[3],'Simulador de código','Ciclos de 2 min, descargas, epinefrina y amiodarona, con el siguiente paso del algoritmo.'],
   ['#/ecg','ecg',PAL.nivel[2],'Anatomía de un latido','Toca cada onda e intervalo para ver qué representa y sus valores normales.'],
   ['#/practica/ecg','eye',PAL.cat.valvular,'¿Qué ritmo es?','Reto con trazos generados: identifica el ritmo y revisa los criterios.'],
   ['#/herramientas','herramientas',PAL.nivel[1],'QTc, eje y escalas','FC, QTc (Bazett y Fridericia), eje, PAM, CHA₂DS₂-VA, HEART y Wells.'],
   ['#/practica','practica',PAL.nivel[4],'Preguntas con explicación',`${C.quiz.length} preguntas por tema y ${C.tarjetas.length} tarjetas de memoria.`],
   ['#/patologias','patologias',PAL.nivel[5],'Fichas de patologías','Idea clave en una frase y, debajo, el desarrollo completo para la guardia.']
  ].map(([h,ic,c,t,d])=>`<a class="cd-tcard" href="${h}" style="${tint(c)}"><span class="cd-tcard-icon">${I(ic)}</span><h3>${t}</h3><p>${d}</p><span class="cd-tcard-go">Abrir ${I('arrow')}</span></a>`).join('')}</div></section>

 <a class="cd-sister" href="../infeora/"><div><small>Proyecto hermano</small><b>INFEORA · Atlas de Infectología Clínica</b><p>Microorganismos, antimicrobianos y síndromes: del microorganismo a la decisión clínica.</p></div>${I('arrow')}</a>`;
}

/* ── Índices y lecciones ── */
function conduction(){return `<figure class="cd-conduction" aria-label="Sistema de conducción">
 ${[['Nodo sinusal','60–100 lpm','Marcapasos natural'],['Aurículas','Onda P','≈0,08–0,10 s'],['Nodo AV','Segmento PR','Retraso fisiológico'],['His y ramas','Inicio del QRS','Conducción rápida'],['Purkinje','QRS','Contracción ventricular']].map(([a,b,c],i)=>`<div class="cd-node"><i>${i+1}</i><b>${a}</b><span>${b}</span><small>${c}</small></div>`).join('')}
 <figcaption>${I('alert')}Si falla un nivel, toma el mando el siguiente: unión AV 40–60 lpm · ventrículo 20–40 lpm (ritmos de escape).</figcaption></figure>`}
const INTRO={fundamentos:'Empieza aquí. Sin estas bases, el ECG y la farmacología se memorizan en lugar de entenderse.',ecg:'Aprende a leer el ECG con un método, entiende cada onda y reconoce los ritmos que importan.',acls:'Soporte vital del adulto según las Guías AHA 2025. Practica el algoritmo con el simulador antes de vivirlo en la guardia.'};
function areaIndex(area){
 const l=levelOf(area),list=l.list(),p=progress(area),c=PAL.nivel[l.n],mins=list.reduce((a,x)=>a+(x.min||0),0);
 const pills=[['book',list.length+' lecciones'],['clock','≈'+mins+' min']];
 if(area==='ecg')pills.push(['ecg',C.ritmos.length+' ritmos y patrones']);
 if(area==='acls')pills.push(['acls','simulador de código']);
 if(area==='fundamentos')pills.push(['practica',list.reduce((a,x)=>a+(x.preguntas||[]).length,0)+' preguntas de autoevaluación']);
 let body=`${crumb([['#/inicio','Inicio'],[null,l.t]])}${mast({c,num:pad(l.n),rx:l.rx,icon:area,over:`Nivel ${l.n} de 5`,title:l.t,lead:INTRO[area],pills,beats:p.beats})}`;
 if(area==='fundamentos')body+=`<section class="cd-section">${sechead('Visión general','El sistema de conducción','El recorrido del impulso eléctrico en cada latido: la base de todo lo que verás en el ECG.','ecg',c)}${conduction()}</section>`;
 if(area==='ecg')body+=ecgAnatomySection(c);
 if(area==='acls')body+=simulator(c);
 body+=`<section class="cd-section">${sechead('Lecciones',area==='acls'?'Algoritmos explicados':'Lecciones del nivel','','book',c)}<div class="cd-grid3">${list.map((x,i)=>lessonCard(area,x,i)).join('')}</div></section>`;
 if(area==='ecg')body+=rhythmAtlas();
 if(area==='acls')body+=`<section class="cd-section">${sechead('Tablas de bolsillo','Fármacos y energías','Las energías dependen del equipo: sigue la recomendación del fabricante de tu desfibrilador.','table',c)}
  <div class="cd-pocket" style="${tint(c)}"><div>${table({h:['Fármaco','Dosis (adulto)','Notas'],r:C.aclsFarmacos})}</div><div>${table({h:['Situación','Modo','Energía orientativa'],r:C.aclsEnergias})}</div></div></section>`;
 return body;
}
function lesson(area,id){
 const l=levelOf(area),list=l.list(),i=list.findIndex(x=>x.id===id),x=list[i];if(!x)return notFound();
 const key=area+':'+id,prev=list[i-1],next=list[i+1],s=lstats(x),c=PAL.nivel[l.n];
 const firstEcg=(()=>{for(const sec of x.secciones)for(const b of sec.b)if(b.ecg)return b.ecg;return l.rx})();
 const toc=x.secciones.map((sec,j)=>`<a href="#/${area}/${id}" data-act="jump" data-to="s${j}"><i>${pad(j+1)}</i>${esc(sec.h)}</a>`).join('');
 const pills=[['clock',x.min+' min'],['layers',x.secciones.length+' secciones']];if(s.tab)pills.push(['table',s.tab+' tablas']);if(s.ecg)pills.push(['ecg',s.ecg+' trazos']);if(isRead(key))pills.push(['check','estudiada']);
 return `${crumb([['#/inicio','Inicio'],['#/'+area,l.t],[null,x.titulo]])}
 <article class="cd-lessonpage" style="${tint(c)}">${mast({c,num:l.n+'.'+(i+1),rx:firstEcg,icon:area,over:`Nivel ${l.n} · ${l.t} · lección ${i+1} de ${list.length}`,title:esc(x.titulo),lead:esc(x.resumen),pills})}
 <div class="cd-lessonlayout"><aside class="cd-toc" aria-label="En esta lección"><b>En esta lección</b>${toc}<a href="#/${area}/${id}" data-act="jump" data-to="claves"><i>✓</i>Ideas clave</a>${x.preguntas?`<a href="#/${area}/${id}" data-act="jump" data-to="auto"><i>?</i>Autoevaluación</a>`:''}</aside>
 <div class="cd-prose">${x.secciones.map((sec,j)=>`<section id="s${j}" class="cd-block"><h2><span class="cd-sec-n">${pad(j+1)}</span>${esc(sec.h)}</h2>${blocks(sec.b)}</section>`).join('')}
  <section id="claves" class="cd-block cd-keys"><h2><span class="cd-sec-n">✓</span>Ideas clave</h2><ul>${x.claves.map(k=>`<li>${fmt(k)}</li>`).join('')}</ul></section>
  ${x.preguntas?`<section id="auto" class="cd-block"><h2><span class="cd-sec-n">?</span>Autoevaluación</h2>${x.preguntas.map(q=>`<details class="cd-qa"><summary>${fmt(q.q)}</summary><p>${fmt(q.a)}</p></details>`).join('')}</section>`:''}
  <div class="cd-lessonfoot"><button class="cd-btn ${isRead(key)?'':'cd-btn-main'}" data-act="read" data-key="${key}" aria-pressed="${isRead(key)}">${I('check')}${isRead(key)?'Estudiada (desmarcar)':'Marcar como estudiada'}</button>
   <div class="cd-pn">${prev?`<a class="cd-btn" href="#/${area}/${prev.id}">← ${esc(prev.titulo)}</a>`:''}${next?`<a class="cd-btn" href="#/${area}/${next.id}">${esc(next.titulo)} →</a>`:(l.n<5?`<a class="cd-btn cd-btn-main" href="#/${LEVELS[l.n].id}">Siguiente nivel: ${LEVELS[l.n].t} →</a>`:'')}</div></div>
 </div></div></article>`;
}

/* ── ECG: latido interactivo y atlas ── */
function ecgAnatomySection(c){return `<section class="cd-section">${sechead('Interactivo','Anatomía de un latido','Toca o selecciona con el teclado cada zona del trazo.','eye',c)}
 <div class="cd-anatomy"><div class="cd-anatomy-fig">${ECG.anatomy()}</div><div class="cd-anatomy-info" id="anaInfo" aria-live="polite">${anaText('p')}</div></div></section>`}
const anaText=k=>{const a=C.ecgAnatomy[k];return `<p class="cd-over">${k==='qt'||k==='pri'?'Intervalo':'Componente'}</p><h3>${esc(a.t)}</h3><p>${fmt(a.x)}</p>`};
let rhythmGroup='Todos';
function rhythmAtlas(){
 const groups=['Todos',...new Set(C.ritmos.map(r=>r.grupo))],list=C.ritmos.filter(r=>rhythmGroup==='Todos'||r.grupo===rhythmGroup);
 return `<section class="cd-section" id="atlas">${sechead('Atlas de ritmos',C.ritmos.length+' ritmos y patrones','Trazos esquemáticos generados para enseñar criterios; no son registros de pacientes.','ecg',PAL.nivel[2])}
 <div class="cd-chips" role="group" aria-label="Filtrar ritmos">${groups.map(g=>`<button class="cd-chipbtn${g===rhythmGroup?' on':''}" data-act="rgroup" data-g="${esc(g)}" aria-pressed="${g===rhythmGroup}"${g!=='Todos'?` style="${tint(PAL.ritmo[g])}"`:''}>${g!=='Todos'?'<i></i>':''}${esc(g)} <small>${g==='Todos'?C.ritmos.length:C.ritmos.filter(r=>r.grupo===g).length}</small></button>`).join('')}</div>
 <div class="cd-grid3 cd-rhythms">${list.map(r=>`<a class="cd-card cd-rhythm" href="#/ecg/ritmo/${r.id}" style="${tint(PAL.ritmo[r.grupo])}">${ECG.svg(r.id,{seconds:4,height:26,lead:r.lead||'II',cal:false})}<span class="cd-chip">${esc(r.grupo)}</span><h3>${esc(r.nombre)}</h3><p>${esc(r.fc==='—'?plain(r.criterios[0]):r.fc)}</p></a>`).join('')}</div></section>`;
}
function rhythm(id){
 const i=C.ritmos.findIndex(r=>r.id===id),r=C.ritmos[i];if(!r)return notFound();
 const prev=C.ritmos[i-1],next=C.ritmos[i+1],c=PAL.ritmo[r.grupo];
 const pills=[['ecg',r.grupo]];if(r.fc!=='—')pills.push(['clock','frecuencia: '+esc(r.fc)]);if(r.acls)pills.push(['acls','con algoritmo ACLS']);
 return `${crumb([['#/inicio','Inicio'],['#/ecg','ECG'],['#/ecg','Atlas de ritmos'],[null,r.nombre]])}
 ${mast({c,num:pad(i+1),rx:r.id,ribLabel:r.lead||'II',icon:'ecg',over:'Atlas de ritmos · '+(i+1)+' de '+C.ritmos.length,title:esc(r.nombre),pills})}
 <div class="cd-strip-big">${strip(r.id,'Trazo esquemático · 25 mm/s · 10 mm/mV · derivación '+(r.lead||'II'),{lead:r.lead,seconds:8,animate:true})}</div>
 <div class="cd-grid3 cd-facts" style="${tint(c)}"><section class="cd-panel">${ph('check','Criterios')}<ul class="cd-list">${r.criterios.map(x=>`<li>${fmt(x)}</li>`).join('')}</ul></section>
 <section class="cd-panel">${ph('flow','Causas')}<ul class="cd-list">${r.causas.map(x=>`<li>${fmt(x)}</li>`).join('')}</ul></section>
 <section class="cd-panel cd-panel-fill">${ph('acls','Qué hacer')}<p>${fmt(r.manejo)}</p><div class="cd-pn">${r.acls?`<a class="cd-btn cd-btn-main" href="#/acls/${r.acls}">Algoritmo ACLS →</a>`:''}${r.pato?`<a class="cd-btn" href="#/patologias/${r.pato}">Ficha clínica →</a>`:''}</div></section></div>
 <div class="cd-pn cd-pn-wide">${prev?`<a class="cd-btn" href="#/ecg/ritmo/${prev.id}">← ${esc(prev.nombre)}</a>`:''}<a class="cd-btn" href="#/ecg" data-act="toatlas">Todos los ritmos</a>${next?`<a class="cd-btn" href="#/ecg/ritmo/${next.id}">${esc(next.nombre)} →</a>`:''}</div>`;
}

/* ── Simulador ACLS ── */
const S={on:false};
function simReset(){Object.assign(S,{on:false,t0:0,cyc:0,path:null,pending:false,shocks:0,epi:[],amio:0,lido:0,airway:false,access:false,rosc:false,choosing:false,log:[]})}
simReset();
const now=()=>Date.now(),mmss=ms=>{const s=Math.max(0,Math.floor(ms/1000));return pad(Math.floor(s/60))+':'+pad(s%60)};
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
function simulator(c){return `<section class="cd-section">${sechead('Práctica guiada · paro del adulto','Simulador de código','Ensaya el ritmo de trabajo del algoritmo. Es una herramienta de estudio: en un paro real sigue al líder del equipo y el protocolo de tu centro.','acls',c)}
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
/* El monitor de la portada alterna ritmos al ritmo del barrido (6 s); queda fijo si se pide reducir movimiento */
let monI=0;
setInterval(()=>{const t=document.getElementById('heroTrace');if(!t||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 monI=(monI+1)%MON.length;const m=MON[monI],w=monitor(monI);t.innerHTML=w.trace;$('#heroPleth').innerHTML=w.pleth;
 [['heroName',1],['heroHr',2],['heroSp',3],['heroPa',4],['heroFr',5]].forEach(([id,k])=>{const el=document.getElementById(id);if(el)el.textContent=m[k]});
 document.querySelectorAll('#heroList li').forEach((li,i)=>li.classList.toggle('on',i===monI));
 $('#heroMon').classList.toggle('is-alarm',m[3]<90)},6000);

/* ── Patologías ── */
let patoCat='todas',patoQ='';
function patoIndex(){
 const cats=[['todas','Todas'],...C.categorias],p=progress('patologias');
 const list=C.patologias.filter(x=>(patoCat==='todas'||x.cat===patoCat)&&(!patoQ||norm(x.nombre+' '+x.idea).includes(norm(patoQ))));
 return `${crumb([['#/inicio','Inicio'],[null,'Patologías']])}${mast({c:PAL.nivel[4],num:'04',rx:'stemi',icon:'patologias',over:'Nivel 4 de 5',title:'Patologías',lead:'Cada ficha empieza con la idea clave en una frase. Debajo encontrarás fisiopatología, clínica, diagnóstico, tratamiento, banderas rojas y perlas, con su guía de referencia.',pills:[['patologias',C.patologias.length+' fichas'],['layers',C.categorias.length+' categorías'],['ecg',C.patologias.filter(x=>x.ecg).length+' con trazo ECG']],beats:p.beats})}
 <div class="cd-filterbar"><div class="cd-chips" role="group" aria-label="Categorías">${cats.map(([k,t])=>`<button class="cd-chipbtn${k===patoCat?' on':''}" data-act="pcat" data-c="${k}" aria-pressed="${k===patoCat}"${k!=='todas'?` style="${tint(PAL.cat[k])}"`:''}>${k!=='todas'?'<i></i>':''}${esc(t)} <small>${k==='todas'?C.patologias.length:C.patologias.filter(x=>x.cat===k).length}</small></button>`).join('')}</div>
 <label class="cd-inline-search">${I('search')}<span class="cd-vh">Filtrar patologías</span><input id="patoQ" type="search" placeholder="Filtrar por nombre…" value="${esc(patoQ)}"></label></div>
 <div class="cd-grid3" id="patoList">${list.map(x=>{const done=isRead('patologias:'+x.id);return `<a class="cd-pcard cd-pato${done?' is-done':''}" href="#/patologias/${x.id}" style="${tint(PAL.cat[x.cat])}"><span class="cd-pcard-top">${I(x.cat)}<b>${esc(catOf(x.cat)[1])}</b><i>${pad(C.patologias.indexOf(x)+1)}</i></span>${done?'<em class="cd-stamp">Estudiada</em>':''}<h3>${esc(x.nombre)}</h3><p>${esc(x.idea)}</p><span class="cd-pcard-guide">${esc(x.guia.split(';')[0])}</span></a>`}).join('')||'<p class="cd-empty">No hay fichas con ese filtro.</p>'}</div>`;
}
function pato(id){
 const i=C.patologias.findIndex(x=>x.id===id),p=C.patologias[i];if(!p)return notFound();
 const key='patologias:'+id,c=PAL.cat[p.cat],prev=C.patologias[i-1],next=C.patologias[i+1];
 const box=(ic,t,arr,cls,ol)=>`<section class="cd-panel ${cls||''}">${ph(ic,t)}<${ol?'ol class="cd-steps"':'ul class="cd-list"'}>${arr.map(x=>`<li>${fmt(x)}</li>`).join('')}</${ol?'ol':'ul'}></section>`;
 return `${crumb([['#/inicio','Inicio'],['#/patologias','Patologías'],[null,p.nombre]])}
 ${mast({c,num:pad(i+1),rx:p.ecg||'sinus',icon:p.cat,over:esc(catOf(p.cat)[1])+' · ficha '+(i+1)+' de '+C.patologias.length,title:esc(p.nombre),pills:[['book',esc(p.guia)],...(isRead(key)?[['check','estudiada']]:[])]})}
 <div class="cd-idea" style="${tint(c)}"><span>Idea clave</span><p><mark>${fmt(p.idea)}</mark></p></div>
 <div class="cd-pato-body" style="${tint(c)}">
 <div class="${p.ecg?'cd-grid2 cd-fisio-row':''}"><section class="cd-panel cd-fisio">${ph('layers','Fisiopatología')}<p>${fmt(p.fisio)}</p></section>
 ${p.ecg?`<section class="cd-panel cd-ecgpanel">${ph('ecg','Trazo relacionado')}${strip(p.ecg,'',{seconds:5,cal:false})}<a class="cd-link" href="#/ecg/ritmo/${p.ecg}">Ver criterios del trazo →</a></section>`:''}</div>
 <div class="cd-grid2">${box('patologias','Clínica',p.clinica)}${box('scan','Diagnóstico',p.dx)}</div>
 ${box('farmacos','Tratamiento',p.tx,'cd-panel-wide cd-panel-tx',true)}
 <div class="cd-grid2">${box('alert','Banderas rojas',p.rojo,'cd-panel-red')}${box('bulb','Perlas',p.perlas,'cd-panel-accent')}</div></div>
 ${p.infeora?`<a class="cd-sister" href="../infeora/#/clinica"><div><small>Enfoque microbiológico</small><b>INFEORA · Síndromes</b><p>Agentes, antimicrobianos y duración del tratamiento de la endocarditis.</p></div>${I('arrow')}</a>`:''}
 <p class="cd-small">Resumen educativo basado en la guía citada; confirma dosis, contraindicaciones y metas en la versión vigente y en el contexto del paciente.</p>
 <div class="cd-lessonfoot"><button class="cd-btn ${isRead(key)?'':'cd-btn-main'}" data-act="read" data-key="${key}" aria-pressed="${isRead(key)}">${I('check')}${isRead(key)?'Estudiada (desmarcar)':'Marcar como estudiada'}</button>
 <div class="cd-pn">${prev?`<a class="cd-btn" href="#/patologias/${prev.id}">← ${esc(prev.nombre)}</a>`:''}${next?`<a class="cd-btn" href="#/patologias/${next.id}">${esc(next.nombre)} →</a>`:''}</div></div>`;
}

/* ── Fármacos (fichas desplegables en la misma sección) ── */
function farmacos(open){
 const groups=[...new Set(C.farmacos.map(f=>f.grupo))],p=progress('farmacos');
 return `${crumb([['#/inicio','Inicio'],[null,'Fármacos']])}${mast({c:PAL.nivel[5],num:'05',rx:'af',icon:'farmacos',over:'Nivel 5 de 5',title:'Fármacos cardiovasculares',lead:'Organizados por familia. Abre cada ficha para ver mecanismo, usos, efectos adversos, contraindicaciones y una perla práctica.',pills:[['farmacos',C.farmacos.length+' grupos terapéuticos'],['layers',groups.length+' familias'],['bulb',C.farmacos.length+' perlas']],beats:p.beats,beatLabel:'estudiados'})}
 <nav class="cd-jumpbar" aria-label="Familias">${groups.map(g=>`<a href="#/farmacos" data-act="jump" data-to="g-${norm(g).replace(/\W+/g,'-')}" style="${tint(PAL.grupo[g])}">${I(PAL.grupo[g][2])}${esc(g)}</a>`).join('')}</nav>
 ${groups.map(g=>{const c=PAL.grupo[g];return `<section class="cd-section" id="g-${norm(g).replace(/\W+/g,'-')}">${sechead('Familia',esc(g),'',c[2],c)}<div class="cd-drugs">${C.farmacos.filter(f=>f.grupo===g).map(f=>{const key='farmacos:'+f.id;return `<details class="cd-drug" id="f-${f.id}"${f.id===open?' open':''} style="${tint(c)}"><summary><span class="cd-drug-name"><b>${esc(f.nombre)}</b><span class="cd-drug-ej">${f.ej.split(' · ').map(e=>`<i>${esc(e)}</i>`).join('')}</span></span>${isRead(key)?`<em>${I('check')}</em>`:''}</summary>
  <div class="cd-drug-body"><p class="cd-mec"><b>Mecanismo.</b> ${fmt(f.mec)}</p><div class="cd-grid3">
   <div class="cd-dcol">${ph('check','Usos')}<ul class="cd-list">${f.usos.map(x=>`<li>${fmt(x)}</li>`).join('')}</ul></div>
   <div class="cd-dcol">${ph('alert','Efectos adversos')}<ul class="cd-list">${f.ady.map(x=>`<li>${fmt(x)}</li>`).join('')}</ul></div>
   <div class="cd-dcol">${ph('scan','Contraindicaciones')}<ul class="cd-list">${f.ci.map(x=>`<li>${fmt(x)}</li>`).join('')}</ul></div></div>
   <aside class="cd-note cd-pearl"><b>Perla</b><p>${fmt(f.perla)}</p></aside>
   <button class="cd-btn" data-act="read" data-key="${key}" aria-pressed="${isRead(key)}">${I('check')}${isRead(key)?'Estudiada':'Marcar como estudiada'}</button></div></details>`}).join('')}</div></section>`}).join('')}`;
}

/* ── Herramientas ── */
function tools(){
 const card=(id,ic,c,t,d,form)=>`<section class="cd-panel cd-calc" id="${id}" data-calc="${id}" style="${tint(c)}">${ph(ic,t)}<p class="cd-small">${d}</p><form onsubmit="return false">${form}</form><output class="cd-out" aria-live="polite"></output></section>`;
 const num=(n,l,v,ex)=>`<label>${l}<input type="number" inputmode="decimal" name="${n}" value="${v}" ${ex||''}></label>`;
 const chk=(n,l,pts)=>`<label class="cd-check"><input type="checkbox" name="${n}" value="${pts}"> ${l} <i>+${pts}</i></label>`;
 const sel=(n,l,opts)=>`<label>${l}<select name="${n}">${opts.map(([v,t])=>`<option value="${v}">${t}</option>`).join('')}</select></label>`;
 return `${crumb([['#/inicio','Inicio'],[null,'Herramientas']])}${mast({c:PAL.herramientas,num:'Rx',rx:'sinus',icon:'herramientas',over:'Cálculo rápido',title:'Herramientas',lead:'Calculadoras para practicar la interpretación. Úsalas para aprender el razonamiento; en la práctica clínica verifica con fuentes oficiales.',pills:[['ecg','3 de ECG'],['hta','1 hemodinámica'],['scan','3 escalas clínicas']]})}
 <div class="cd-calcs">
 ${card('fc','ecg',PAL.nivel[2],'Frecuencia cardiaca','Cuenta los cuadritos (1 mm) entre dos ondas R consecutivas.',num('mm','Cuadritos entre R y R','20','min="1" step="0.5"'))}
 ${card('qtc','clock',PAL.nivel[2],'QT corregido','Mide el QT en la derivación donde sea más largo (habitualmente II o V5).',num('qt','QT (ms)','400','min="100" max="800"')+num('hr','Frecuencia (lpm)','75','min="20" max="250"')+sel('sex','Sexo',[['m','Hombre'],['f','Mujer']]))}
 ${card('eje','arrow',PAL.nivel[1],'Eje eléctrico (aproximado)','Suma algebraica del QRS (positivo − negativo, en mm) en I y aVF.',num('i','Neto en I (mm)','6','step="0.5"')+num('avf','Neto en aVF (mm)','4','step="0.5"'))}
 ${card('pam','hta',PAL.cat.hta,'Presión arterial media','PAM ≈ PAD + (PAS − PAD)/3.',num('pas','PAS (mmHg)','120')+num('pad','PAD (mmHg)','80'))}
 ${card('cha','arritmia',PAL.nivel[3],'CHA₂DS₂-VA (FA)','Riesgo de ictus en fibrilación auricular (ESC 2024: sin punto por sexo).',chk('c','Insuficiencia cardiaca o FEVI reducida',1)+chk('h','Hipertensión',1)+chk('a2','Edad ≥75 años',2)+chk('d','Diabetes',1)+chk('s','Ictus, AIT o tromboembolia previa',2)+chk('v','Enfermedad vascular (IAM, arteriopatía, placa aórtica)',1)+chk('a','Edad 65–74 años',1))}
 ${card('heart','coronaria',PAL.nivel[4],'HEART (dolor torácico)','Riesgo de evento cardiaco mayor a 6 semanas en urgencias.',sel('h','Historia',[[0,'Poco sospechosa (0)'],[1,'Moderadamente sospechosa (1)'],[2,'Muy sospechosa (2)']])+sel('e','ECG',[[0,'Normal (0)'],[1,'Repolarización inespecífica (1)'],[2,'Descenso del ST significativo (2)']])+sel('a','Edad',[[0,'<45 (0)'],[1,'45–64 (1)'],[2,'≥65 (2)']])+sel('r','Factores de riesgo',[[0,'Ninguno (0)'],[1,'1–2 (1)'],[2,'≥3 o aterosclerosis conocida (2)']])+sel('t','Troponina',[[0,'≤ límite normal (0)'],[1,'1–3× límite (1)'],[2,'>3× límite (2)']]))}
 ${card('wells','vascular',PAL.cat.vascular,'Wells para TEP','Probabilidad clínica (modelo de dos niveles).',chk('a','Signos clínicos de TVP',3)+chk('b','TEP es el diagnóstico más probable',3)+chk('c','FC >100 lpm',1.5)+chk('d','Inmovilización ≥3 días o cirugía en 4 semanas',1.5)+chk('e','TVP o TEP previos',1.5)+chk('f','Hemoptisis',1)+chk('g','Cáncer activo',1))}
 </div>`;
}
function calc(sec){
 const f=sec.querySelector('form'),v=n=>parseFloat((f.elements[n]||{}).value),ch=()=>[...f.querySelectorAll('input[type=checkbox]:checked')].reduce((a,x)=>a+parseFloat(x.value),0),out=sec.querySelector('output');
 let h='';const id=sec.dataset.calc,ok=x=>isFinite(x)&&x>0;
 if(id==='fc'){const m=v('mm');h=ok(m)?`<b>${Math.round(1500/m)} lpm</b><span>1500 / ${m} cuadritos · equivale a ${(m/5).toFixed(1)} cuadros grandes</span>`:'Introduce un número válido.'}
 if(id==='qtc'){const qt=v('qt'),hr=v('hr');if(ok(qt)&&ok(hr)){const rr=60/hr,b=qt/Math.sqrt(rr),fr=qt/Math.cbrt(rr),fm=qt+154*(1-rr),lim=f.elements.sex.value==='f'?460:450,ref=hr>90?fr:b;
  const tag=ref>=500?'<em class="is-bad">≥500 ms: riesgo alto de torsades</em>':ref>lim?`<em class="is-warn">Prolongado (>${lim} ms)</em>`:ref<350?'<em class="is-warn">Corto (<350 ms): valorar QT corto/hipercalcemia</em>':'<em class="is-good">Dentro de lo normal</em>';
  h=`<b>Bazett ${Math.round(b)} ms · Fridericia ${Math.round(fr)} ms</b><span>Framingham ${Math.round(fm)} ms · RR ${rr.toFixed(2)} s${hr>90?' · con FC >90 se prefiere Fridericia':''}</span>${tag}`}else h='Introduce QT y frecuencia.'}
 if(id==='eje'){const i=v('i'),a=v('avf');if(isFinite(i)&&isFinite(a)&&(i||a)){const d=Math.round(Math.atan2(a,i)*180/Math.PI);const c=d>=-30&&d<=90?'Normal':d<-30&&d>=-90?'Desviación izquierda':d>90&&d<=180?'Desviación derecha':'Eje extremo';
  h=`<div class="cd-axis"><svg viewBox="-50 -50 100 100" aria-hidden="true"><circle r="40"/><path d="M-44 0H44M0 -44V44"/><path class="ok" d="M0 0L34.6 -20A40 40 0 0 1 0 40Z"/><path class="vec" d="M0 0L${(38*Math.cos(d*Math.PI/180)).toFixed(1)} ${(38*Math.sin(d*Math.PI/180)).toFixed(1)}"/><text x="43" y="-3">I</text><text x="3" y="48">aVF</text></svg><div><b>≈ ${d}°</b><span>${c} (normal: −30° a +90°)</span></div></div>`}else h='Introduce valores de I y aVF.'}
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
const RX={pool:RXPOOL,cur:null,ans:null,ok:0,n:0,seed:11};
function rxNew(){const p=RX.pool,c=p[Math.floor(Math.random()*p.length)];const others=shuffle(p.filter(r=>r.id!==c.id)).slice(0,3);RX.cur={r:c,opts:shuffle([c,...others])};RX.ans=null;RX.seed=1+Math.floor(Math.random()*999)}
function practice(mode){
 mode=mode||'preguntas';
 const tabs=[['preguntas','Preguntas','practica'],['tarjetas','Tarjetas','shuffle'],['ecg','¿Qué ritmo es?','ecg']].map(([k,t,ic])=>`<a class="cd-tab${k===mode?' on':''}" href="#/practica/${k}"${k===mode?' aria-current="page"':''}>${I(ic)}${t}</a>`).join('');
 let body='';
 if(mode==='preguntas'){
  const temas=['Todos',...new Set(C.quiz.map(q=>q.tema))];
  if(Q.i>=Q.order.length){const pct=Q.order.length?Math.round(Q.score/Q.order.length*100):0,best=Math.max(P.quizBest||0,pct);if(best!==P.quizBest){P.quizBest=best;store.set(P)}
   body=`<div class="cd-quiz cd-quiz-end"><p class="cd-score"><b>${pct}</b><small>%</small></p><h2>Resultado: ${Q.score} / ${Q.order.length}</h2><p>Mejor porcentaje guardado en este navegador: ${P.quizBest||0}%.</p><button class="cd-btn cd-btn-main" data-act="qrestart">Volver a empezar</button></div>`}
  else{const q=C.quiz[Q.order[Q.i]];
   body=`<div class="cd-chips" role="group" aria-label="Tema">${temas.map(t=>`<button class="cd-chipbtn${t===Q.tema?' on':''}" data-act="qtema" data-t="${t}" aria-pressed="${t===Q.tema}">${t}</button>`).join('')}</div>
   <div class="cd-quiz"><div class="cd-quiz-bar"><i style="width:${Math.round(Q.i/Q.order.length*100)}%"></i></div><p class="cd-over">Pregunta ${Q.i+1} de ${Q.order.length} · ${esc(q.tema)} · aciertos ${Q.score}/${Q.answered}</p><h2>${fmt(q.q)}</h2>
   <div class="cd-opts">${q.o.map((o,j)=>{let cls='';if(Q.ans!==null){if(j===q.k)cls=' is-right';else if(j===Q.ans)cls=' is-wrong'}return `<button class="cd-opt${cls}" data-act="qans" data-j="${j}"${Q.ans!==null?' disabled':''}><span>${'abcd'[j]}</span>${fmt(o)}</button>`}).join('')}</div>
   ${Q.ans!==null?`<div class="cd-expl ${Q.ans===q.k?'ok':'bad'}" role="status"><b>${Q.ans===q.k?'Correcto.':'No exactamente.'}</b> ${fmt(q.x)}</div><button class="cd-btn cd-btn-main" data-act="qnext">${Q.i+1<Q.order.length?'Siguiente pregunta →':'Ver resultado'}</button>`:''}</div>`}
 }
 if(mode==='tarjetas'){const c=C.tarjetas[F.order[F.i]];
  body=`<div class="cd-flash"><div class="cd-quiz-bar"><i style="width:${Math.round((F.i+1)/C.tarjetas.length*100)}%"></i></div><p class="cd-over">Tarjeta ${F.i+1} de ${C.tarjetas.length}</p><button class="cd-card-flip${F.flip?' is-flipped':''}" data-act="fflip" aria-label="Voltear tarjeta"><small>${F.flip?'Respuesta':'Pregunta · toca para voltear'}</small><span class="cd-front">${fmt(c[0])}</span><span class="cd-back">${fmt(c[1])}</span></button>
  <div class="cd-pn"><button class="cd-btn" data-act="fprev">← Anterior</button><button class="cd-btn cd-btn-main" data-act="fflip">${F.flip?'Ver pregunta':'Ver respuesta'}</button><button class="cd-btn" data-act="fnext">Siguiente →</button><button class="cd-btn" data-act="fshuffle">${I('shuffle')}Barajar</button></div></div>`}
 if(mode==='ecg'){if(!RX.cur)rxNew();const r=RX.cur.r;
  body=`<div class="cd-quiz"><p class="cd-over">Reto ECG · aciertos ${RX.ok}/${RX.n}</p><h2>¿Qué ritmo o patrón muestra este trazo?</h2>${strip(r.id,'',{seconds:7,seed:RX.seed})}
  <div class="cd-opts cd-opts-2">${RX.cur.opts.map(o=>{let cls='';if(RX.ans){if(o.id===r.id)cls=' is-right';else if(o.id===RX.ans)cls=' is-wrong'}return `<button class="cd-opt${cls}" data-act="rxans" data-id="${o.id}"${RX.ans?' disabled':''}>${esc(o.nombre)}</button>`}).join('')}</div>
  ${RX.ans?`<div class="cd-expl ${RX.ans===r.id?'ok':'bad'}" role="status"><b>${RX.ans===r.id?'Correcto':'Era: '+esc(r.nombre)}.</b> Criterios: ${r.criterios.map(fmt).join(' · ')}</div><div class="cd-pn"><button class="cd-btn cd-btn-main" data-act="rxnext">Otro trazo →</button><a class="cd-btn" href="#/ecg/ritmo/${r.id}">Ficha del ritmo</a></div>`:''}</div>`}
 return `${crumb([['#/inicio','Inicio'],[null,'Práctica']])}${mast({c:PAL.practica,num:'?',rx:'svt',icon:'practica',over:'Repaso activo',title:'Práctica',lead:'Recuperar la información de memoria consolida mucho más que releer. Combina las tres modalidades.',pills:[['practica',C.quiz.length+' preguntas'],['shuffle',C.tarjetas.length+' tarjetas'],['ecg',RXPOOL.length+' ritmos en el reto'],...(P.quizBest?[['check','mejor resultado: '+P.quizBest+'%']]:[])]})}<nav class="cd-tabs" aria-label="Modalidad">${tabs}</nav><div class="cd-practice"><div class="cd-practice-main">${body}</div>${practiceAside(mode)}</div>`;
}
function practiceAside(mode){
 const box=(ic,t,inner)=>`<section class="cd-aside-box">${ph(ic,t)}${inner}</section>`;
 if(mode==='preguntas'){const pct=Q.answered?Math.round(Q.score/Q.answered*100):0,temas=[...new Set(C.quiz.map(q=>q.tema))];
  return `<aside class="cd-practice-aside">${box('practica','Tu sesión',`<div class="cd-aside-score"><p class="cd-score"><b>${pct}</b><small>%</small></p><p><b>${Q.score}</b> correctas de <b>${Q.answered}</b> respondidas${P.quizBest?` · mejor resultado ${P.quizBest}%`:''}</p></div>`)}
  ${box('layers','Preguntas por tema',`<ul class="cd-aside-list">${temas.map(t=>`<li><span>${t}</span><b>${C.quiz.filter(q=>q.tema===t).length}</b></li>`).join('')}</ul>`)}
  ${box('bulb','Cómo sacarle provecho',`<p class="cd-small">Intenta responder antes de leer las opciones. Si fallas, lee la explicación y vuelve a la lección del tema.</p>`)}</aside>`}
 if(mode==='tarjetas')return `<aside class="cd-practice-aside">${box('shuffle','Repaso espaciado',`<ol class="cd-steps"><li>Lee la pregunta y responde en voz alta.</li><li>Voltea la tarjeta y compara.</li><li>Si dudaste, vuelve a ella al final de la vuelta.</li><li>Baraja y repite al día siguiente.</li></ol>`)}
  ${box('book','Dónde se explica',`<p class="cd-small">Las tarjetas resumen valores de ECG, dosis de ACLS, metas y tríadas. Cada una está desarrollada en su lección.</p><div class="cd-pn"><a class="cd-btn cd-btn-sm" href="#/ecg">ECG</a><a class="cd-btn cd-btn-sm" href="#/acls">ACLS</a><a class="cd-btn cd-btn-sm" href="#/patologias">Patologías</a></div>`)}</aside>`;
 return `<aside class="cd-practice-aside">${box('ecg','Método en 4 preguntas',`<ol class="cd-steps"><li><b>¿Es regular?</b> Compara la distancia entre R.</li><li><b>¿Hay una P antes de cada QRS?</b> ¿Y QRS tras cada P?</li><li><b>¿QRS estrecho o ancho?</b> Ancho (≥3 cuadritos) sugiere origen ventricular o bloqueo de rama.</li><li><b>¿Qué frecuencia?</b> 300 / cuadros grandes entre R.</li></ol>`)}
  ${box('practica','Tu racha',`<div class="cd-aside-score"><p class="cd-score"><b>${RX.ok}</b><small>/${RX.n}</small></p><p>aciertos en el reto</p></div>`)}</aside>`;
}

/* ── Fuentes ── */
const SRCICON={'Reanimación':'acls','Cardiopatía isquémica':'coronaria','Insuficiencia cardiaca y miocardio':'ic','Arritmias':'arritmia','Hipertensión, lípidos y vascular':'hta'};
function sources(){return `${crumb([['#/inicio','Inicio'],[null,'Fuentes']])}${mast({c:PAL.fuentes,num:'§',rx:'sinus',icon:'fuentes',over:'Método y referencias',title:'Fuentes y uso responsable',lead:'Qué respalda cada sección, cómo se hicieron los trazos y los límites de este material.',pills:[['book',C.fuentes.reduce((a,g)=>a+g.items.length,0)+' guías de referencia'],['layers',C.fuentes.length+' áreas']]})}
 <section class="cd-panel cd-panel-wide cd-method-list">${ph('check','Cómo está hecho')}<ul class="cd-list">
  <li>Texto editorial original, redactado con fines educativos a partir de las guías de práctica clínica listadas. No reproduce libros ni algoritmos protegidos.</li>
  <li>Los trazos ECG son <b>esquemáticos</b>: se generan con un modelo matemático para mostrar criterios. No son registros reales y no sustituyen la práctica con ECG auténticos.</li>
  <li>Las dosis y metas se resumen como referencia de estudio. Verifica la versión vigente de cada guía, la ficha técnica y los protocolos locales.</li>
  <li>Este contenido <b>no sustituye</b> el juicio clínico, la evaluación individual del paciente ni un curso certificado de BLS/ACLS.</li></ul></section>
 <div class="cd-srcgrid">${C.fuentes.map((g,i)=>{const c=[PAL.nivel[3],PAL.nivel[2],PAL.nivel[1],PAL.cat.valvular,PAL.cat.hta][i]||PAL.fuentes;return `<section class="cd-panel cd-src" style="${tint(c)}">${ph(SRCICON[g.g]||'book',esc(g.g))}<ul class="cd-refs">${g.items.map(([t,u])=>`<li><a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${esc(t)} ↗</a></li>`).join('')}</ul></section>`}).join('')}</div>
 <a class="cd-sister" href="../infeora/"><div><small>Proyecto hermano</small><b>INFEORA · Atlas de Infectología Clínica</b><p>CARDIORA comparte repositorio con INFEORA.</p></div>${I('arrow')}</a>`}
const notFound=()=>`${mast({c:PAL.fuentes,num:'404',rx:'asystole',icon:'search',over:'Sin trazo',title:'No encontrado',lead:'La página que buscas no existe.'})}<a class="cd-btn cd-btn-main" href="#/inicio">Volver al inicio</a>`;

/* ── Búsqueda global ── */
let IDX=null;
function buildIndex(){IDX=[];
 const add=(t,k,h,txt,ic)=>IDX.push({t,k,h,ic,n:norm(t),x:norm(txt||'')});
 C.fundamentos.forEach(x=>add(x.titulo,'Fundamentos','#/fundamentos/'+x.id,x.sub+' '+x.resumen+' '+JSON.stringify(x.secciones),'fundamentos'));
 C.ecgLecciones.forEach(x=>add(x.titulo,'ECG','#/ecg/'+x.id,x.sub+' '+x.resumen+' '+JSON.stringify(x.secciones),'ecg'));
 C.acls.forEach(x=>add(x.titulo,'ACLS','#/acls/'+x.id,x.sub+' '+x.resumen+' '+JSON.stringify(x.secciones),'acls'));
 C.ritmos.forEach(x=>add(x.nombre,'Ritmo ECG','#/ecg/ritmo/'+x.id,x.criterios.join(' ')+' '+x.causas.join(' ')+' '+x.manejo,'ecg'));
 C.patologias.forEach(x=>add(x.nombre,'Patología','#/patologias/'+x.id,[x.idea,x.fisio,...x.clinica,...x.dx,...x.tx].join(' '),x.cat));
 C.farmacos.forEach(x=>add(x.nombre,'Fármaco','#/farmacos/'+x.id,x.ej+' '+x.mec+' '+x.usos.join(' '),'farmacos'));
 [['Calculadora de QTc','#/herramientas'],['CHA₂DS₂-VA','#/herramientas'],['Escala HEART','#/herramientas'],['Wells TEP','#/herramientas'],['Simulador de código ACLS','#/acls'],['Tarjetas de memoria','#/practica/tarjetas'],['Reto de ritmos ECG','#/practica/ecg']].forEach(([t,h])=>add(t,'Herramienta',h,'','herramientas'));
}
function search(q){if(!IDX)buildIndex();const n=norm(q.trim());if(n.length<2)return [];const words=n.split(/\s+/);
 return IDX.map(e=>{let s=0;for(const w of words){if(e.n.includes(w))s+=10;else if(e.x.includes(w))s+=2;else return null}if(e.n.startsWith(n))s+=8;return {e,s}}).filter(Boolean).sort((a,b)=>b.s-a.s).slice(0,14).map(r=>r.e)}
function openSearch(){const d=$('#cdSearch');d.hidden=false;document.body.classList.add('cd-noscroll');const i=d.querySelector('input');i.value='';paintSearch('');setTimeout(()=>i.focus(),20)}
function closeSearch(){$('#cdSearch').hidden=true;document.body.classList.remove('cd-noscroll')}
function paintSearch(q){const r=search(q),el=$('#cdSearchRes');el.innerHTML=q.trim().length<2?'<li class="cd-muted">Escribe al menos 2 letras: «QT», «adenosina», «fibrilación»…</li>':r.length?r.map(e=>`<li><a href="${e.h}" data-act="searchgo">${I(e.ic)}<b>${esc(e.t)}</b><span>${esc(e.k)}</span></a></li>`).join(''):'<li class="cd-muted">Sin resultados.</li>'}

/* ── Marco y router ── */
function shell(route,content){
 const top=route[0]||'inicio';
 const flat=`<svg class="cd-foot-trace" viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 28H520q8 -8 16 0h10l4 5 6 -26 6 30 4 -9h10q12 -12 24 0H1200"/></svg>`;
 return `<a class="cd-skip" href="#main" data-act="skip">Saltar al contenido</a>
 <header class="cd-top"><a class="cd-brand" href="#/inicio" aria-label="CARDIORA, inicio"><span class="cd-mark" aria-hidden="true"><svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="19"/><path d="M5 21h8l3-7 4 14 3-10 2 3h10"/></svg></span><span><strong>Cardi<em>ora</em></strong><small>Cardiología 101</small></span></a>
 <nav class="cd-nav" aria-label="Secciones">${NAV.map(([k,t],i)=>`<a href="#/${k}"${k===top?' class="on" aria-current="page"':''}><i>${pad(i)}</i><span>${t}</span></a>`).join('')}</nav>
 <button class="cd-searchbtn" data-act="search" aria-label="Buscar en CARDIORA">${I('search')}<span>Buscar</span><kbd>/</kbd></button></header>
 <main id="main" class="cd-main" tabindex="-1">${content}</main>
 <footer class="cd-foot">${flat}<div class="cd-foot-grid"><div class="cd-foot-brand"><b>Cardi<em>ora</em></b><p>Cardiología 101 · Del latido a la decisión clínica. Proyecto hermano de <a href="../infeora/">INFEORA</a>.</p></div>
  <nav class="cd-foot-nav" aria-label="Pie de página">${NAV.slice(1).map(([k,t],i)=>`<a href="#/${k}"><i>${pad(i+1)}</i>${t}</a>`).join('')}</nav>
  <div class="cd-foot-note"><p>Contenido educativo: no sustituye el juicio clínico, la guía vigente ni un curso certificado de soporte vital.</p><a href="https://github.com/ProQuincy2471/atb-atlas" target="_blank" rel="noopener noreferrer">Repositorio ↗</a></div></div></footer>
 <div class="cd-search" id="cdSearch" hidden role="dialog" aria-modal="true" aria-label="Buscar"><div class="cd-search-box"><label>${I('search')}<span class="cd-vh">Buscar</span><input type="search" placeholder="Buscar lecciones, ritmos, patologías, fármacos…" autocomplete="off"></label><button class="cd-btn" data-act="closesearch">Cerrar</button><ul id="cdSearchRes"></ul></div></div>`;
}
let lastRoute=null;
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
 const changed=lastRoute!==h;
 app.innerHTML=shell(r,html);
 if(changed)$('#main').classList.add('cd-enter');
 document.querySelectorAll('[data-calc]').forEach(calc);simPaint();
 const nav=$('.cd-nav'),on=nav&&nav.querySelector('.on');if(on&&nav.scrollWidth>nav.clientWidth)nav.scrollLeft=on.offsetLeft-nav.clientWidth/2+on.offsetWidth/2;
 const same=lastRoute!==null&&lastRoute.split('/')[0]===h.split('/')[0]&&a==='practica';
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
 else if(act==='rgroup'){rhythmGroup=t.dataset.g;rerender()}
 else if(act==='toatlas'){rhythmGroup='Todos'}
 else if(act==='pcat'){patoCat=t.dataset.c;rerender()}
 else if(act==='sim'){simOp(t.dataset.op)}
 else if(act==='hq'){if(H.ans===null){H.ans=+t.dataset.j;rerender()}}
 else if(act==='hqnext'){H.q=(H.q+1+Math.floor(Math.random()*(C.quiz.length-1)))%C.quiz.length;H.ans=null;rerender()}
 else if(act==='hpearl'){H.pearl=(H.pearl+1+Math.floor(Math.random()*(pearls().length-1)))%pearls().length;rerender()}
 else if(act==='hrx'){H.rxShown=true;rerender()}
 else if(act==='hrxnext'){H.rx=(H.rx+1+Math.floor(Math.random()*(RXPOOL.length-1)))%RXPOOL.length;H.rxShown=false;H.rxSeed=1+Math.floor(Math.random()*999);rerender()}
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
