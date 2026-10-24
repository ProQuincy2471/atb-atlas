/* INFEORA V26 — Brand-new navigation, information architecture, explorer and command search.
 * Data remains in the audited V23–V25 catalogs. No synthetic microscopy images.
 */
(function(){
'use strict';
if(new URLSearchParams(location.search).get('legacy')==='1')return;
const NX={domain:'bacteria',group:'all',micro:'',query:'',rxQuery:'',rxFamily:'all',status:'relevant',searchOpen:false,searchQuery:'',drawer:false,compact:false};
window.INFEORA_APP=NX;
const names={bacteria:'Bacterias',virus:'Virus',fungi:'Hongos',parasites:'Parásitos'};
const shades={bacteria:'#2b66b1',virus:'#7355b9',fungi:'#4984ae',parasites:'#178772'};
const icons={inicio:'book',mapa:'map',micro:'micro',atb:'drugs',clinica:'clinic',comparar:'compare',aprender:'learn',laboratorio:'lab',fuentes:'sources'};
const sections=[
 ['inicio','Inicio','Visión general'],['mapa','Explorar','Conexiones micro–fármaco'],
 ['micro','Microorganismos','Biología y clínica'],['atb','Antimicrobianos','Farmacología'],
 ['clinica','Síndromes','Revisiones clínicas'],['comparar','Comparador','Diferencias entre fármacos'],
 ['aprender','Biblioteca','Estudio profundo'],['laboratorio','Laboratorio','Razonamiento práctico'],
 ['fuentes','Fuentes','Base documental']
];
const safe=x=>H(String(x??'')),normalized=x=>String(x??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const allMicro=()=>[...D.pathogens.map(x=>({...x,kingdom:'bacteria'})),...(window.ATLAS24?.debug?.orgs||[])];
const allDrug=()=>[...D.antibiotics.map(x=>({...x,kingdom:'bacteria'})),...(window.ATLAS24?.debug?.drugs||[])];
const domainMicro=k=>allMicro().filter(x=>x.kingdom===k);
const domainDrug=k=>allDrug().filter(x=>x.kingdom===k);
const grps=k=>k==='bacteria'?D.groups.map((g,i)=>({id:g.id,label:g.name,color:grpcolor(g.id),ids:D.pathogens.filter(p=>p.groupId===g.id).map(p=>p.id),concept:'Morfología, especie y fenotipo de resistencia: interpretación siempre individual.'})):(window.ATLAS25?.microGroups||[]).filter(g=>g.kingdom===k);
const organismGroup=p=>grps(p.kingdom).find(g=>g.ids.includes(p.id));
const displayStatus={
 expected:{label:'Actividad habitual',description:'Actividad o indicación documentada; requiere confirmar contexto.',icon:'✓'},
 variable:{label:'Condicionada',description:'Resistencia, forma clínica o exposición pueden modificar eficacia.',icon:'≈'},
 excluded:{label:'No fiable',description:'No es una opción terapéutica fiable en este contexto.',icon:'×'},
 unknown:{label:'Sin evaluación',description:'Ausencia de cruce individual: NO equivale a resistencia.',icon:'·'}
};
function pairStatus(a,p){
 if(a.kingdom==='bacteria'&&p.kingdom==='bacteria'){
  const r=relation(a.id,p.id),s=rstatus(r);return {status:s==='active'?'expected':s==='conditional'?'variable':s==='none'?'excluded':'unknown',note:r?.note||r?.reason||'El catálogo aún no contiene un par individual validado.'};
 }
 const r=window.ATLAS24.debug.relation24(a,p);
 return {status:r.status==='expected'?'expected':r.status==='variable'?'variable':r.status==='excluded'?'excluded':'unknown',note:r.note};
}
function shellBrand(){
 return '<button class="nx-brand" data-act="nx-go:inicio" aria-label="INFEORA, ir al inicio"><span class="nx-mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span class="nx-brand-type"><strong>INFE<span>ORA</span></strong><small>ATLAS DE INFECTOLOGÍA</small></span></button>';
}
function rail(){
 const entries=sections.map(([route,label,desc],i)=>{
 const active=state.route===route;const number=String(i+1).padStart(2,'0');
 return '<button class="nx-rail-link '+(active?'active':'')+'" data-act="nx-go:'+route+'" title="'+safe(desc)+'"><span class="nx-rail-icon">'+ic(icons[route],18)+'</span><span class="nx-rail-txt"><b>'+safe(label)+'</b></span>'+(active?'<i class="nx-rail-active"></i>':'')+'</button>';
 }).join('');
 return '<aside class="nx-rail '+(NX.drawer?'drawer-open':'')+'" id="nx-rail"><div class="nx-rail-header">'+shellBrand()+'<button class="nx-close-menu" data-act="nx-drawer" aria-label="Cerrar navegación">×</button></div>'+
 '<div class="nx-rail-label">EXPLORAR LA BIBLIOTECA</div><nav class="nx-rail-nav" aria-label="Secciones de INFEORA">'+entries+'</nav>'+
 '<div class="nx-rail-bottom"><span class="nx-rail-symbol">I/26</span><div><b>Edición clínica</b><small>Microbiología · terapéutica</small></div></div></aside>';
}
function topbar(){
 const label=sections.find(x=>x[0]===state.route)||sections[0];
 return '<div class="nx-topbar"><div class="nx-topbar-left"><button class="nx-hamb" data-act="nx-drawer" title="Abrir menú" aria-label="Abrir menú"><span></span><span></span><span></span></button><div class="nx-breadcrumb"><span>ATLAS CLÍNICO</span><i>/</i><b>'+safe(label[1])+'</b></div></div><div class="nx-topbar-actions">'+
 '<button data-act="nx-search-open" class="nx-global-search"><span class="nx-search-magnifier" aria-hidden="true">⌕</span><span>Buscar microorganismo, fármaco o síndrome</span><kbd>⌘ K</kbd></button>'+
 '<button data-act="nx-density" class="nx-tool" title="Alternar densidad de lectura" aria-label="Alternar densidad de lectura"><span>◫</span></button></div></div>';
}
function commandPalette(){
 if(!NX.searchOpen)return '';
 const q=normalized(NX.searchQuery),m=allMicro().filter(p=>normalized([p.name,p.taxonomy,p.identity,p.clinical].join(' ')).includes(q)).slice(0,12),a=allDrug().filter(p=>normalized(p.name+' '+p.family).includes(q)).slice(0,12);
 const conditions=[...(typeof WHO==='undefined'?[]:WHO.conditions),...(window.ATLAS25?.extraConditions||[])].filter(p=>normalized(p.title).includes(q)).slice(0,8);
 const chunks=[['MICROORGANISMOS',m,p=>'<button data-act="nx-find:micro:'+p.kingdom+':'+p.id+'"><span class="nx-command-dot" style="background:'+shades[p.kingdom]+'"></span><b>'+safe(p.name)+'</b><small>'+names[p.kingdom]+'</small><span>↗</span></button>'],
 ['ANTIMICROBIANOS',a,p=>'<button data-act="nx-find:drug:'+p.kingdom+':'+p.id+'"><span class="nx-command-dot" style="background:'+shades[p.kingdom]+'"></span><b>'+safe(p.name)+'</b><small>'+safe(p.family)+'</small><span>↗</span></button>'],
 ['SÍNDROMES',conditions,p=>'<button data-act="nx-find:syndrome:'+p.id+'"><span class="nx-command-dot" style="background:#55769b"></span><b>'+safe(p.title)+'</b><small>'+safe(p.system)+'</small><span>↗</span></button>']];
 return '<div class="nx-command-backdrop"><button class="nx-command-dismiss" data-act="nx-search-close" aria-label="Cerrar búsqueda"></button><section class="nx-command" role="dialog" aria-modal="true" aria-label="Búsqueda global"><header><span>⌕</span><input id="nx-command-input" autocomplete="off" value="'+safe(NX.searchQuery)+'" placeholder="Buscar en el atlas..." aria-label="Buscar en el atlas"><button data-act="nx-search-close" aria-label="Cerrar">ESC</button></header><div class="nx-command-results">'+chunks.filter(x=>x[1].length).map(([title,values,fn])=>'<div><small>'+title+'</small>'+values.map(fn).join('')+'</div>').join('')+(m.length+a.length+conditions.length===0?'<div class="nx-command-empty">No encontramos coincidencias. Prueba el nombre de género, fármaco o síndrome.</div>':'')+'</div><footer><span><b>↵</b> Abrir resultado</span><span>Base documental · edición V26</span></footer></section></div>';
}
const oldFrame=frame;
frame=function(content){
 return '<div class="nx-app '+(NX.compact?'nx-compact':'')+'">'+rail()+'<div class="nx-stage">'+topbar()+'<main class="nx-main" id="main">'+content+'</main><footer class="nx-footer"><span><b>INFEORA</b> · Atlas académico de microbiología e infectología</span><span>La cobertura es educativa; validar susceptibilidad, foco y guías antes de prescribir.</span><a href="https://github.com/ProQuincy2471/atb-atlas" target="_blank" rel="noopener noreferrer">Repositorio ↗</a></footer></div></div>'+commandPalette()+modal();
};
function home(){
 const countM=allMicro().length,countD=allDrug().length,who=typeof WHO==='undefined'?0:WHO.conditions.length,synd=who+(window.ATLAS25.extraConditions||[]).length;
 const tiles=[
 ['bacteria','Bacteriología','Gram, virulencia y resistencia',D.pathogens.length,'A'],
 ['virus','Virología','Replicación, latencia y antivirales',window.ATLAS24.viruses.length,'B'],
 ['fungi','Micología','Levaduras, mohos y micosis invasivas',window.ATLAS24.fungi.length,'C'],
 ['parasites','Parasitología','Ciclos vitales y enfermedades tropicales',window.ATLAS24.parasites.length,'D']
 ];
 const dish='<svg class="nx-dish" viewBox="0 0 400 400" role="img" aria-label="Los cuatro dominios: bacterias, virus, hongos y parásitos"><defs><clipPath id="nxdish"><circle cx="200" cy="200" r="168"/></clipPath></defs>'+
  '<circle cx="200" cy="200" r="190" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="200" cy="200" r="182" fill="none" stroke="currentColor" stroke-width=".8" stroke-dasharray="2 5"/>'+
  '<g clip-path="url(#nxdish)"><rect x="32" y="32" width="168" height="168" class="d-bacteria"/><rect x="200" y="32" width="168" height="168" class="d-virus"/><rect x="32" y="200" width="168" height="168" class="d-fungi"/><rect x="200" y="200" width="168" height="168" class="d-parasites"/>'+
  '<g fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.4"><circle cx="200" cy="200" r="120"/><circle cx="200" cy="200" r="80"/><circle cx="200" cy="200" r="40"/></g>'+
  '<g fill="#fff" fill-opacity=".9"><circle cx="118" cy="104" r="9"/><circle cx="150" cy="140" r="5"/><circle cx="94" cy="150" r="4"/><circle cx="268" cy="112" r="3.5"/><circle cx="300" cy="86" r="8"/><circle cx="326" cy="140" r="5"/><circle cx="104" cy="272" r="7"/><circle cx="148" cy="300" r="4"/><circle cx="80" cy="316" r="3"/><circle cx="296" cy="276" r="10"/><circle cx="262" cy="320" r="4"/><circle cx="330" cy="300" r="5"/></g></g>'+
  '<g stroke="#0b1533" stroke-width="3"><line x1="200" y1="28" x2="200" y2="372"/><line x1="28" y1="200" x2="372" y2="200"/></g>'+
  '<g class="d-lbl" font-family="Big Shoulders Display,sans-serif" font-weight="900" fill="#fff"><text x="112" y="132" font-size="58" text-anchor="middle">'+D.pathogens.length+'</text><text x="288" y="132" font-size="58" text-anchor="middle">'+window.ATLAS24.viruses.length+'</text><text x="112" y="300" font-size="58" text-anchor="middle">'+window.ATLAS24.fungi.length+'</text><text x="288" y="300" font-size="58" text-anchor="middle">'+window.ATLAS24.parasites.length+'</text></g>'+
  '<circle cx="200" cy="200" r="22" fill="#8fe3ff" stroke="#0b1533" stroke-width="3"/><text x="200" y="207" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-weight="700" font-size="16" fill="#0b1533">Rx</text></svg>';
 const tick=['BACTERIAS '+D.pathogens.length,'VIRUS '+window.ATLAS24.viruses.length,'HONGOS '+window.ATLAS24.fungi.length,'PARÁSITOS '+window.ATLAS24.parasites.length,'ANTIMICROBIANOS '+countD,'SÍNDROMES '+synd,'DEL MICROORGANISMO A LA DECISIÓN CLÍNICA'];
 const band=tick.concat(tick).map(t=>'<span>'+t+'</span><i>✱</i>').join('');
 return '<div class="nx-home"><div class="nx-hero"><div class="nx-hero-copy"><span class="nx-edition"><i></i> ATLAS DE INFECTOLOGÍA CLÍNICA · EDICIÓN 2026</span>'+
 '<h1><span class="h-a">Del microorganismo</span><span class="h-b">a la <mark>decisión</mark></span><span class="h-c"><em>clínica</em>.</span></h1><p>Un atlas para estudiar con profundidad: reconocer el agente, comprender su biología, interpretar las pruebas y relacionar su mecanismo con el tratamiento.</p>'+
 '<div class="nx-hero-actions"><button class="nx-primary" data-act="nx-go:mapa">Explorar conexiones <span>↗</span></button><button class="nx-secondary" data-act="nx-go:clinica">Abrir síndromes <span>→</span></button></div></div>'+
 '<div class="nx-hero-panel"><div class="nx-dish-wrap">'+dish+'<span class="nx-dish-tag t1">PLACA 01 · LOS CUATRO DOMINIOS</span></div></div></div>'+
 '<div class="nx-band" aria-hidden="true"><div class="nx-band-track">'+band+'</div></div>'+
 '<div class="nx-steps"><div class="nx-steps-title"><span>UNA MISMA LÓGICA CLÍNICA</span></div><ol><li><span>01</span><div><b>Identificar</b><p>Fenotipo, estructura, virulencia y contexto.</p></div></li><li><span>02</span><div><b>Interpretar</b><p>Pruebas microbiológicas, huésped y foco.</p></div></li><li><span>03</span><div><b>Seleccionar</b><p>Diana molecular, espectro y resistencias.</p></div></li></ol><dl class="nx-hero-stats"><div><dt>'+countM+'</dt><dd>microorganismos</dd></div><div><dt>'+countD+'</dt><dd>antimicrobianos</dd></div><div><dt>'+synd+'</dt><dd>síndromes</dd></div></dl></div>'+
 '<div class="nx-index-head"><div><span class="nx-overline">01 / EL ARCHIVO</span><h2>Cuatro dominios, <em>una</em> biblioteca clínica.</h2></div><p>Explora por biología y síndrome. La profundidad está en las fichas, no en un mapa decorativo.</p></div>'+
 '<div class="nx-home-domains">'+tiles.map(([k,label,desc,num,ltr])=>'<button class="nx-domain-card '+k+'" data-act="nx-home-domain:'+k+'"><span class="nx-dc-over">DOMINIO '+ltr+'</span><span class="nx-dc-count">'+num+'</span><h3>'+label+'</h3><p>'+desc+'</p><div class="nx-dc-bottom"><span>Explorar especies</span><b>↗</b></div></button>').join('')+'</div>'+
 '<div class="nx-home-bottom"><section><span class="nx-overline">02 / TERAPÉUTICA</span><h2>Farmacología <em>sin atajos.</em></h2><p>'+countD+' agentes antibacterianos, antivirales, antifúngicos y antiparasitarios: diana, mecanismo, exposición, espectro y resistencia.</p><button data-act="nx-go:atb">Explorar antimicrobianos →</button></section>'+
 '<section><span class="nx-overline">03 / MEDICINA INTERNA</span><h2>Revisiones <em>sindrómicas.</em></h2><p>'+synd+' síndromes enlazados a un marco de reconocimiento, diagnóstico diferencial, tratamiento y evolución.</p><button data-act="nx-go:clinica">Consultar síndromes →</button></section>'+
 '<section><span class="nx-overline">04 / APRENDER</span><h2>Biblioteca de <em>fundamentos.</em></h2><p>Capítulos de revisión, casos clínicos y explicaciones de microbiología aplicadas a la práctica de residencia.</p><button data-act="nx-go:aprender">Abrir biblioteca →</button></section></div></div>';
}
function mapExplorer(){
 const groupList=grps(NX.domain),group=groupList.find(g=>g.id===NX.group),
 all=domainMicro(NX.domain),filtered=all.filter(p=>(NX.group==='all'||group?.ids.includes(p.id))&&(!NX.query||normalized([p.name,p.identity,p.taxonomy,p.clinical].join(' ')).includes(normalized(NX.query))));
 const p=filtered.find(p=>p.id===NX.micro)||filtered[0];if(p)NX.micro=p.id;
 const ag=domainDrug(NX.domain).filter(a=>!NX.rxFamily||NX.rxFamily==='all'||NX.rxFamily===a.family).filter(a=>!NX.rxQuery||normalized(a.name+' '+a.family).includes(normalized(NX.rxQuery)));
 const results=p?ag.map(a=>({a,r:pairStatus(a,p)})):[];
 const counts=Object.fromEntries(Object.keys(displayStatus).map(s=>[s,results.filter(x=>x.r.status===s).length]));
 const selections=results.filter(x=>NX.status==='all'||(NX.status==='relevant'?['expected','variable'].includes(x.r.status):x.r.status===NX.status));
 const drugFamilies=[...new Set(domainDrug(NX.domain).map(d=>d.family))].sort();
 const domainTabs=['bacteria','virus','fungi','parasites'].map(k=>'<button data-act="nx-map-domain:'+k+'" class="'+(NX.domain===k?'active':'')+'" style="--domain:'+shades[k]+'"><span class="nx-domain-pin"></span><b>'+names[k]+'</b><small>'+domainMicro(k).length+'</small></button>').join('');
 const microorganismPage=p?'nx-find:micro:'+p.kingdom+':'+p.id:'';
 const selectedIntro=p?.biology||p?.identity||p?.clinical||'';
 return '<div class="nx-explore"><div class="nx-explore-heading"><span class="nx-overline">01 / ATLAS DE RELACIONES</span><div class="nx-explore-hline"><div><h1>Explorar conexiones.</h1><p>Elige un dominio, reconoce la especie y analiza el espectro farmacológico. Una lectura clínica, sin redes arbitrarias ni diagramas confusos.</p></div><div class="nx-explore-metric"><b>'+allMicro().length+'</b><span>especies en el atlas</span></div></div></div>'+
 '<nav class="nx-explore-tabs" aria-label="Dominios">'+domainTabs+'</nav>'+
 '<div class="nx-explore-workspace"><aside class="nx-explore-browser"><header><span class="nx-overline">TAXONOMÍA / '+names[NX.domain].toUpperCase()+'</span><h2>Elegir microorganismo</h2></header>'+
 '<div class="nx-explore-search"><span>⌕</span><input id="nx-explore-query" value="'+safe(NX.query)+'" placeholder="Filtrar especies o patogenia" aria-label="Filtrar microorganismos"></div>'+
 '<div class="nx-explore-groups"><button data-act="nx-map-group:all" class="'+(NX.group==='all'?'active':'')+'"><b>Todos los grupos</b><span>'+all.length+'</span></button>'+
 groupList.map(g=>'<button data-act="nx-map-group:'+g.id+'" class="'+(NX.group===g.id?'active':'')+'" style="--group:'+g.color+'"><i></i><b>'+safe(g.label)+'</b><span>'+g.ids.length+'</span></button>').join('')+'</div>'+
 '<div class="nx-explore-species-label"><span>ESPECIES</span><span>'+filtered.length+' RESULTADOS</span></div>'+
 '<div class="nx-explore-species">'+filtered.map(x=>'<button class="'+(p?.id===x.id?'active':'')+'" data-act="nx-map-micro:'+x.id+'"><span><b>'+safe(x.name)+'</b><small>'+safe(organismGroup(x)?.label||x.groupId||'')+'</small></span><i>↗</i></button>').join('')+(filtered.length===0?'<p class="nx-empty-small">No hay especies con este filtro.</p>':'')+'</div></aside>'+
 '<section class="nx-explore-content">'+(p?'<div class="nx-selected-organism" style="--accent:'+shades[NX.domain]+'"><div class="nx-selected-main"><span class="nx-overline">FICHA SELECCIONADA / '+names[NX.domain].toUpperCase()+'</span><h2>'+safe(p.name)+'</h2><p>'+safe(selectedIntro)+'</p><button data-act="'+microorganismPage+'">Abrir revisión del microorganismo <span>↗</span></button></div><aside class="nx-selected-note"><span>FICHA CLÍNICA</span><b>'+safe(organismGroup(p)?.label||'Microbiología')+'</b><p>'+safe(p.pearl||p.clinical||'La interpretación requiere contexto.')+'</p></aside></div>'+
 '<div class="nx-spectrum-heading"><div><span class="nx-overline">ESPECTRO / DATOS POR PAR</span><h3>¿Qué actividad se ha descrito?</h3><p>Los estados reflejan información del catálogo, no predicen eficacia individual.</p></div><div class="nx-spectrum-total"><b>'+ag.length+'</b><small>agentes filtrados</small></div></div>'+
 '<div class="nx-spectrum-stats">'+Object.keys(displayStatus).map(k=>'<button class="'+k+' '+(NX.status===k?'active':'')+'" data-act="nx-map-status:'+k+'"><b>'+counts[k]+'</b><span>'+displayStatus[k].label+'</span></button>').join('')+'</div>'+
 '<div class="nx-spectrum-toolbar"><label>FAMILIA FARMACOLÓGICA<select id="nx-rx-family"><option value="all">Todas las familias</option>'+drugFamilies.map(f=>'<option value="'+safe(f)+'" '+(NX.rxFamily===f?'selected':'')+'>'+safe(f)+'</option>').join('')+'</select></label><label>BUSCAR FÁRMACO<input id="nx-rx-query" value="'+safe(NX.rxQuery)+'" placeholder="Nombre del agente"></label><button data-act="nx-map-status:all" class="nx-all-status">Todos los estados</button></div>'+
 '<div class="nx-spectrum-list">'+selections.map(({a,r})=>'<div class="nx-spectrum-row '+r.status+'"><span class="nx-spectrum-symbol">'+displayStatus[r.status].icon+'</span><div class="nx-spectrum-drug"><b>'+safe(a.name)+'</b><small>'+safe(a.family)+'</small></div><div class="nx-spectrum-evidence"><span>'+displayStatus[r.status].label+'</span><p>'+safe(r.note)+'</p></div><button data-act="nx-find:drug:'+a.kingdom+':'+a.id+'" aria-label="Consultar '+safe(a.name)+'">Ficha ↗</button></div>').join('')+
 (selections.length===0?'<div class="nx-spectrum-empty"><b>No hay cruces con esos criterios.</b><p>Prueba otro estado o muestra los pares sin evaluación. No inventamos susceptibilidad para completar tablas.</p><button data-act="nx-map-status:all">Ver todos los estados</button></div>':'')+'</div>'+
 '<div class="nx-evidence-note"><b>Lectura crítica.</b> Actividad habitual ≠ sensibilidad del aislado ≠ respuesta clínica. «Sin evaluación» no significa resistencia. En terapias combinadas se debe considerar régimen, resistencia, foco y estadio.</div>':
 '<div class="nx-not-found"><b>Sin resultados para ese filtro</b><button data-act="nx-map-clear">Restablecer búsqueda</button></div>')+'</section></div></div>';
}
/* ───────── V29: matriz de cobertura + mapa de relaciones animado ───────── */
const COOL={bacteria:'#1f6fe5',virus:'#7a3fe0',fungi:'#0e9f6e',parasites:'#0aa3c2'};
Object.assign(shades,COOL);
NX.view='mapa';NX.mapGroup='all';NX.covAll=false;NX.covFamily='all';NX.hoverMicro='';
function covStatus(a,p){
 if(a.kingdom==='bacteria'&&p.kingdom==='bacteria'&&window.ATLAS23&&window.ATLAS23.coverage){
  const c=window.ATLAS23.coverage(a,p);const s=c.st;
  return {status:(s==='active'||s==='expected')?'expected':(s==='conditional'||s==='variable')?'variable':(s==='none'||s==='excluded')?'excluded':'unknown',note:c.note||'',source:c.source||''};
 }
 const r=pairStatus(a,p);return {status:r.status,note:r.note,source:''};
}
const shortName=n=>{const [l,r]=String(n).replace(/\s*\(.*?\)/g,'').split(' — ');let w=l.trim().split(/\s+/);if(w.length>1&&/^[A-Z]/.test(w[0])&&w[0].length>3)w=[w[0][0]+'.',...w.slice(1)];let t=w.join(' ')+(r?' '+r.trim().split(/\s+/)[0]:'');return t.length>24?t.slice(0,23)+'…':t};
const covCache={};
function covData(dom){
 if(covCache[dom])return covCache[dom];
 const orgs=domainMicro(dom),drugs=domainDrug(dom),gl=grps(dom);
 const gOf={};gl.forEach(g=>g.ids.forEach(id=>gOf[id]=g));
 const cols=[...orgs].sort((x,y)=>{const gx=gl.findIndex(g=>g.id===gOf[x.id]?.id),gy=gl.findIndex(g=>g.id===gOf[y.id]?.id);return (gx<0?99:gx)-(gy<0?99:gy)});
 const rows=drugs.map(a=>{const cells=cols.map(p=>covStatus(a,p));const known=cells.filter(c=>c.status!=='unknown').length;return {a,cells,known}});
 return covCache[dom]={cols,rows,gOf,gl};
}
function matrixView(){
 const dom=NX.domain,{cols,rows,gOf,gl}=covData(dom),col=shades[dom];
 const fams=[...new Set(rows.map(r=>r.a.family))];
 let vis=rows.filter(r=>(NX.covAll||r.known>0)&&(NX.covFamily==='all'||r.a.family===NX.covFamily));
 const hidden=rows.filter(r=>r.known===0).length;
 // bandas de grupo
 let bands='',i=0;while(i<cols.length){const g=gOf[cols[i].id];let j=i;while(j<cols.length&&gOf[cols[j].id]===g)j++;bands+='<th class="cv-band" colspan="'+(j-i)+'" style="--g:'+(g?.color||col)+'"><span>'+safe(g?.label||'Otros')+'</span></th>';i=j}
 const head='<tr class="cv-bands"><th class="cv-corner" rowspan="2"><b>Agentes</b><small>'+vis.length+' filas · '+cols.length+' especies</small></th>'+bands+'</tr>'+
  '<tr class="cv-cols">'+cols.map((p,ci)=>'<th class="cv-col" data-c="'+ci+'" style="--g:'+(gOf[p.id]?.color||col)+'"><button data-act="nx-find:micro:'+p.kingdom+':'+p.id+'" title="'+safe(p.name)+'"><span>'+safe(shortName(p.name))+'</span></button></th>').join('')+'</tr>';
 let body='',lastFam='';
 vis.forEach((r,ri)=>{
  if(r.a.family!==lastFam){lastFam=r.a.family;body+='<tr class="cv-fam"><th colspan="'+(cols.length+1)+'"><span>'+safe(lastFam)+'</span></th></tr>'}
  body+='<tr class="cv-row" style="--i:'+Math.min(ri,40)+'"><th class="cv-rh"><button data-act="nx-find:drug:'+r.a.kingdom+':'+r.a.id+'">'+safe(r.a.name)+'</button></th>'+
   r.cells.map((c,ci)=>'<td class="cv-cell '+c.status+'" data-c="'+ci+'" data-a="'+safe(r.a.id)+'" data-p="'+safe(cols[ci].id)+'" style="--g:'+(gOf[cols[ci].id]?.color||col)+'"></td>').join('')+'</tr>';
 });
 return '<div class="cv-wrap" data-dom="'+dom+'"><div class="cv-toolbar"><label>Familia<select id="nx-cov-family"><option value="all">Todas</option>'+fams.map(f=>'<option value="'+safe(f)+'" '+(NX.covFamily===f?'selected':'')+'>'+safe(f)+'</option>').join('')+'</select></label>'+
  '<button class="cv-toggle '+(NX.covAll?'on':'')+'" data-act="nx-cov-toggle">'+(NX.covAll?'Ocultar':'Mostrar')+' agentes sin perfil ('+hidden+')</button>'+
  '<div class="cv-legend"><span><i class="e"></i>Actividad habitual</span><span><i class="v"></i>Condicionada</span><span><i class="x"></i>No fiable</span><span><i class="u"></i>Sin evaluación ≠ resistencia</span></div></div>'+
  '<div class="cv-scroll"><table class="cv-table"><thead>'+head+'</thead><tbody>'+body+'</tbody></table></div>'+
  '<div class="cv-tip" id="cv-tip" hidden></div>'+
  '<p class="cv-note"><b>Cómo leer.</b> Cada columna es una especie y cada fila un agente. El color identifica el grupo taxonómico; las barras continuas son actividad habitual descrita, las rayadas dependen de resistencia, foco o exposición. Perfil orientativo y registros individuales: no sustituyen el antibiograma ni la guía vigente.</p></div>';
}
/* mapa radial animado */
function relMap(){
 const dom=NX.domain,gl=grps(dom),col=shades[dom],W=1240,H=1040,cx=620,cy=520;
 const orgs=domainMicro(dom);
 const selG=NX.mapGroup;
 const gA=gl.map((g,i)=>({g,ang:(i/gl.length)*Math.PI*2-Math.PI/2}));
 const sector=Math.PI*2/Math.max(gl.length,1);
 let nodes='',edges='',labels='';
 const pos={};
 gA.forEach(({g,ang})=>{
  const ids=g.ids.map(id=>orgs.find(o=>o.id===id)).filter(Boolean);
  const per=ids.length,rings=Math.ceil(per/7)||1;
  ids.forEach((o,k)=>{
   const ring=k%rings,idxInRing=Math.floor(k/rings),inRing=Math.ceil(per/rings);
   const spread=sector*.74,a=ang+(inRing>1?(idxInRing/(inRing-1)-.5)*spread:0);
   const r=232+ring*38;
   pos[o.id]={x:cx+Math.cos(a)*r,y:cy+Math.sin(a)*r,g:g.color,gid:g.id,o};
  });
 });
 const sel=NX.micro&&pos[NX.micro]?NX.micro:'';
 // enlaces centro→grupo→especie
 gA.forEach(({g,ang},gi)=>{
  const gx=cx+Math.cos(ang)*118,gy=cy+Math.sin(ang)*118;
  edges+='<path class="rm-tree" d="M'+cx+' '+cy+' L'+gx.toFixed(1)+' '+gy.toFixed(1)+'" stroke="'+g.color+'" style="--d:'+(gi*70)+'ms"/>';
  g.ids.forEach(id=>{const q=pos[id];if(q)edges+='<path class="rm-tree light" d="M'+gx.toFixed(1)+' '+gy.toFixed(1)+' L'+q.x.toFixed(1)+' '+q.y.toFixed(1)+'" stroke="'+g.color+'"/>'});
 });
 // fármacos relacionados con la especie elegida
 let drugsSvg='';
 if(sel){
  const o=pos[sel].o,ag=domainDrug(dom).map(a=>({a,s:covStatus(a,o).status})).filter(x=>x.s==='expected'||x.s==='variable');
  const fam=[...new Set(ag.map(x=>x.a.family))];ag.sort((x,y)=>fam.indexOf(x.a.family)-fam.indexOf(y.a.family));
  const n=ag.length,R=420;
  ag.forEach(({a,s},i)=>{
   const ang=(i/Math.max(n,1))*Math.PI*2-Math.PI/2,x=cx+Math.cos(ang)*R,y=cy+Math.sin(ang)*R,p=pos[sel];
   const mx=cx+Math.cos(ang)*140,my=cy+Math.sin(ang)*140;
   edges+='<path class="rm-edge '+s+'" d="M'+p.x.toFixed(1)+' '+p.y.toFixed(1)+' Q'+mx.toFixed(1)+' '+my.toFixed(1)+' '+x.toFixed(1)+' '+y.toFixed(1)+'" style="--d:'+(i*22)+'ms"/>';
   const deg=ang*180/Math.PI,flip=Math.cos(ang)<0;
   drugsSvg+='<g class="rm-drug '+s+'" style="--d:'+(i*22)+'ms" data-act="nx-find:drug:'+a.kingdom+':'+a.id+'" transform="translate('+x.toFixed(1)+' '+y.toFixed(1)+')"><circle r="7"/><text transform="rotate('+(flip?deg+180:deg).toFixed(1)+')" text-anchor="'+(flip?'end':'start')+'" x="'+(flip?-13:13)+'" y="4">'+safe(a.name.length>20?a.name.slice(0,19)+'…':a.name)+'</text><title>'+safe(a.name+' · '+a.family+' · '+displayStatus[s].label)+'</title></g>';
  });
 }
 Object.values(pos).forEach(q=>{
  const isSel=q.o.id===sel,dim=selG!=='all'&&q.gid!==selG;
  nodes+='<g class="rm-org '+(isSel?'sel ':'')+(dim?'dim':'')+'" data-act="nx-map-micro:'+q.o.id+'" transform="translate('+q.x.toFixed(1)+' '+q.y.toFixed(1)+')"><circle r="'+(isSel?11:6.5)+'" fill="'+q.g+'"/>'+(isSel?'<circle class="ping" r="11" fill="none" stroke="'+q.g+'"/>':'')+'<title>'+safe(q.o.name)+'</title></g>';
 });
 gA.forEach(({g,ang},gi)=>{
  const gx=cx+Math.cos(ang)*118,gy=cy+Math.sin(ang)*118,on=selG===g.id;
  nodes+='<g class="rm-group '+(on?'on':'')+'" data-act="nx-mapgroup:'+g.id+'" style="--d:'+(gi*70)+'ms" transform="translate('+gx.toFixed(1)+' '+gy.toFixed(1)+')"><circle r="'+(on?33:27)+'" fill="'+g.color+'"/><text text-anchor="middle" y="5">'+g.ids.length+'</text><title>'+safe(g.label)+'</title></g>';
  const lx=cx+Math.cos(ang)*(on?158:152),ly=cy+Math.sin(ang)*(on?158:152);
  labels+='<text class="rm-glabel" x="'+lx.toFixed(1)+'" y="'+ly.toFixed(1)+'" text-anchor="'+(Math.cos(ang)>.25?'start':Math.cos(ang)<-.25?'end':'middle')+'">'+safe(g.label)+'</text>';
 });
 const s=sel?pos[sel].o:null;
 return '<div class="rm-wrap"><div class="rm-stage"><svg class="rm-svg" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Mapa de relaciones entre grupos, especies y fármacos"><defs><radialGradient id="rmglow"><stop offset="0" stop-color="'+col+'" stop-opacity=".28"/><stop offset="1" stop-color="'+col+'" stop-opacity="0"/></radialGradient></defs>'+
  '<circle cx="'+cx+'" cy="'+cy+'" r="470" fill="url(#rmglow)"/><circle class="rm-ring" cx="'+cx+'" cy="'+cy+'" r="118"/><circle class="rm-ring" cx="'+cx+'" cy="'+cy+'" r="250"/><circle class="rm-ring" cx="'+cx+'" cy="'+cy+'" r="420"/>'+
  '<g class="rm-edges">'+edges+'</g>'+nodes+drugsSvg+
  '<g class="rm-core" transform="translate('+cx+' '+cy+')"><circle r="48" fill="'+col+'"/><circle r="48" class="rm-pulse" fill="none" stroke="'+col+'"/><text text-anchor="middle" y="-2">'+safe(names[dom])+'</text><text class="sub" text-anchor="middle" y="16">'+orgs.length+' especies</text></g></svg>'+
  '<div class="rm-hint">'+(sel?'Los trazos unen la especie con agentes de actividad habitual (continuo) o condicionada (punteado). Haz clic en un agente para abrir su ficha.':'Haz clic en un grupo para enfocarlo y en una especie para ver sus agentes.')+'</div></div>'+
  '<aside class="rm-side">'+(s?'<span class="nx-overline">ESPECIE SELECCIONADA</span><h3>'+safe(s.name)+'</h3><p>'+safe((s.identity||s.biology||s.clinical||'').slice(0,260))+'</p><button class="nx-primary" data-act="nx-find:micro:'+s.kingdom+':'+s.id+'">Abrir ficha ↗</button>':'<span class="nx-overline">MAPA DE RELACIONES</span><h3>De grupo a especie y a fármaco</h3><p>Centro: dominio. Primer anillo: grupos taxonómicos. Segundo: especies. Anillo exterior: agentes con actividad documentada para la especie elegida.</p>')+
  '<div class="rm-groups">'+gl.map(g=>'<button class="'+(selG===g.id?'on':'')+'" style="--g:'+g.color+'" data-act="nx-mapgroup:'+g.id+'"><i></i>'+safe(g.label)+'<b>'+g.ids.length+'</b></button>').join('')+'</div><div class="rm-key"><span><i class="e"></i>Actividad habitual</span><span><i class="v"></i>Condicionada</span></div></aside></div>';
}
function exploreShell(inner){
 const tabs=[['mapa','Mapa de relaciones'],['matriz','Matriz de cobertura'],['especie','Especie → espectro']].map(([k,l],i)=>'<button class="'+(NX.view===k?'active':'')+'" data-act="nx-view:'+k+'"><i>'+String(i+1).padStart(2,'0')+'</i>'+l+'</button>').join('');
 const dom=['bacteria','virus','fungi','parasites'].map(k=>'<button data-act="nx-map-domain:'+k+'" class="'+(NX.domain===k?'active':'')+'" style="--domain:'+shades[k]+'"><span class="nx-domain-pin"></span><b>'+names[k]+'</b><small>'+domainMicro(k).length+'</small></button>').join('');
 return '<div class="nx-explore nxv-'+NX.view+'"><div class="nx-explore-heading"><span class="nx-overline">01 / ATLAS DE RELACIONES</span><div class="nx-explore-hline"><div><h1>Explorar <em>conexiones.</em></h1><p>Un mapa vivo del dominio al fármaco, y una matriz para comparar cobertura de muchos agentes sobre muchas especies de un vistazo.</p></div><div class="nx-explore-metric"><b>'+allMicro().length+'</b><span>especies en el atlas</span></div></div></div>'+
  '<nav class="nx-viewtabs">'+tabs+'</nav><nav class="nx-explore-tabs" aria-label="Dominios">'+dom+'</nav>'+inner+'</div>';
}
const oldMain=mainPage;
mainPage=function(){
 if(state.route==='inicio')return home();
 if(state.route==='mapa'){if(NX.view==='matriz')return exploreShell(matrixView());if(NX.view==='especie')return mapExplorer();return exploreShell(relMap());}
 return '<div class="nx-section-page nx-section-'+safe(state.route)+'"><div class="nx-page-kicker"><span>INFEORA</span><i>/</i><span>'+safe((sections.find(x=>x[0]===state.route)||[])[1]||'Atlas')+'</span><span class="nx-kicker-right">BASE CLÍNICA · V26</span></div>'+oldMain()+'</div>';
};
const actBefore=act;
act=function(command){
 const a=String(command).split(':'),op=a[0],value=a.slice(1).join(':');
 switch(op){
 case 'nx-go':NX.drawer=false;return goto(value);
 case 'nx-home-domain':NX.domain=value;NX.group='all';NX.query='';NX.micro='';NX.drawer=false;return goto('mapa');
 case 'nx-drawer':NX.drawer=!NX.drawer;return render();
 case 'nx-density':NX.compact=!NX.compact;try{localStorage.setItem('infeora-v26-compact',NX.compact?'1':'0')}catch{}return render();
 case 'nx-map-domain':NX.mapGroup='all';NX.domain=value;NX.group='all';NX.micro='';NX.query='';NX.rxQuery='';NX.rxFamily='all';NX.status='relevant';return render();
 case 'nx-view':NX.view=value;return render();
 case 'nx-mapgroup':NX.mapGroup=NX.mapGroup===value?'all':value;NX.micro='';return render();
 case 'nx-cov-toggle':NX.covAll=!NX.covAll;return render();
 case 'nx-map-group':NX.group=value;NX.micro='';NX.status='relevant';return render();
 case 'nx-map-micro':NX.micro=value;NX.status='relevant';return render();
 case 'nx-map-status':NX.status=value;return render();
 case 'nx-map-clear':NX.group='all';NX.query='';NX.rxQuery='';NX.rxFamily='all';NX.status='relevant';return render();
 case 'nx-search-open':NX.searchOpen=true;render();document.getElementById('nx-command-input')?.focus();return;
 case 'nx-search-close':NX.searchOpen=false;return render();
 case 'nx-find':{
  const type=a[1],kingdom=a[2],id=type==='syndrome'?a.slice(2).join(':'):a.slice(3).join(':');NX.searchOpen=false;NX.drawer=false;
  if(type==='micro'){
   if(kingdom==='bacteria'){state.micro=id;return goto('micro')}
   window.ATLAS24.debug.ui.micro=kingdom;window.ATLAS24.debug.ui.selectedMicro=id;window.ATLAS24.debug.ui.query='';return goto('micro');
  }
  if(type==='drug'){
   if(kingdom==='bacteria'){state.drug=id;return goto('atb')}
   window.ATLAS24.debug.ui.drugs=kingdom;window.ATLAS24.debug.ui.selectedDrug=id;window.ATLAS24.debug.ui.query='';return goto('atb');
  }
  if(type==='syndrome'){window.ATLAS25.reviewUI.cl.selected=id;window.ATLAS25.reviewUI.cl.query='';window.ATLAS25.reviewUI.cl.system='all';return goto('clinica')}
  return;
 }
 }
 return actBefore(command);
};
document.addEventListener('keydown',e=>{
 if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();act('nx-search-open')}
 if(e.key==='Escape'&&NX.searchOpen){e.preventDefault();act('nx-search-close')}
});
document.addEventListener('input',e=>{
 const id=e.target.id;if(!['nx-explore-query','nx-rx-query','nx-command-input'].includes(id))return;
 e.stopImmediatePropagation();if(id==='nx-explore-query')NX.query=e.target.value;
 if(id==='nx-rx-query')NX.rxQuery=e.target.value;if(id==='nx-command-input')NX.searchQuery=e.target.value;
 const pos=e.target.selectionStart,stop=e.target.selectionEnd;render();
 const input=document.getElementById(id);if(input){input.focus();if(input.setSelectionRange)input.setSelectionRange(pos,stop)}
},true);
document.addEventListener('change',e=>{if(e.target.id==='nx-rx-family'){NX.rxFamily=e.target.value;render()}},true);
document.addEventListener('change',e=>{if(e.target.id==='nx-cov-family'){NX.covFamily=e.target.value;render()}},true);
(function(){let tip=null;
 const show=(td,ev)=>{tip=document.getElementById('cv-tip');if(!tip)return;
  const a=allDrug().find(x=>x.id===td.dataset.a),p=allMicro().find(x=>x.id===td.dataset.p);if(!a||!p)return;
  const c=covStatus(a,p),d=displayStatus[c.status];
  tip.innerHTML='<b>'+safe(a.name)+' × '+safe(p.name)+'</b><span class="t '+c.status+'">'+d.icon+' '+d.label+'</span><p>'+safe((c.note||d.description).slice(0,230))+'</p>'+(c.source?'<small>'+safe(c.source)+'</small>':'');
  tip.hidden=false;const box=tip.parentElement.getBoundingClientRect();let x=ev.clientX-box.left+14,y=ev.clientY-box.top+16;if(x>box.width-300)x=ev.clientX-box.left-300;tip.style.left=Math.max(6,x)+'px';tip.style.top=y+'px'};
 document.addEventListener('mouseover',e=>{const td=e.target.closest&&e.target.closest('.cv-cell');
  document.querySelectorAll('.cv-hl').forEach(x=>x.classList.remove('cv-hl'));
  if(!td){const t=document.getElementById('cv-tip');if(t)t.hidden=true;return}
  const c=td.dataset.c;document.querySelectorAll('.cv-table [data-c="'+c+'"]').forEach(x=>x.classList.add('cv-hl'));td.parentElement.classList.add('cv-hl');show(td,e)});
 document.addEventListener('mousemove',e=>{const td=e.target.closest&&e.target.closest('.cv-cell');if(td)show(td,e)});
})();
try{NX.compact=localStorage.getItem('infeora-v26-compact')==='1'}catch{}
NAV.unshift(['inicio','home','Inicio']);
NAV.find(x=>x[0]==='mapa')[2]='Explorar';
NAV.find(x=>x[0]==='atb')[2]='Antimicrobianos';
NAV.find(x=>x[0]==='aprender')[2]='Biblioteca';
if(!location.hash){
 state.route='inicio';history.replaceState(null,'',location.pathname+location.search+'#/inicio');
}
const originalRender=render;
render=function(){originalRender();document.title='INFEORA · '+(sections.find(x=>x[0]===state.route)?.[1]||'Atlas de infectología clínica');document.documentElement.dataset.nexoVersion='26'};

/* ───────── V29: panel de perfil de cobertura dentro de fichas ATB / microorganismo ───────── */
function specPanelDrug(a){
 const dom=a.kingdom,{cols,gOf,gl}=covData(dom),col=shades[dom];
 const cells=cols.map(p=>({p,c:covStatus(a,p)}));
 const n=k=>cells.filter(x=>x.c.status===k).length;
 const groups=gl.map(g=>({g,items:cells.filter(x=>gOf[x.p.id]===g)})).filter(x=>x.items.length);
 const known=n('expected')+n('variable')+n('excluded');
 const stat=(k,l,cls)=>'<div class="sp-stat '+cls+'"><b>'+n(k)+'</b><span>'+l+'</span></div>';
 return '<section class="nx-spec" aria-label="Perfil de cobertura"><div class="sp-head"><div><span class="nx-overline">PERFIL DE COBERTURA · '+safe(names[dom]).toUpperCase()+'</span><h2>¿Dónde actúa <em>'+safe(a.name)+'</em>?</h2></div><div class="sp-stats">'+stat('expected','Actividad habitual','e')+stat('variable','Condicionada','v')+stat('excluded','No fiable','x')+stat('unknown','Sin evaluar','u')+'</div></div>'+
  (known===0?'<p class="sp-empty">Este agente no tiene aún un perfil de cobertura revisado en el atlas. «Sin evaluar» no equivale a resistencia.</p>':'')+
  '<div class="sp-groups">'+groups.map(({g,items},gi)=>'<div class="sp-group" style="--g:'+g.color+';--gi:'+gi+'"><header><b>'+safe(g.label)+'</b><small>'+items.filter(x=>x.c.status==='expected').length+'/'+items.length+'</small></header><div class="sp-dots">'+items.map(({p,c})=>'<button class="sp-dot '+c.status+'" data-act="nx-find:micro:'+p.kingdom+':'+p.id+'" title="'+safe(p.name+' · '+displayStatus[c.status].label)+'"><span>'+safe(shortName(p.name))+'</span></button>').join('')+'</div></div>').join('')+'</div>'+
  '<div class="sp-foot"><button class="nx-secondary" data-act="nx-view:matriz">Ver matriz completa ↗</button><span>Perfil orientativo y registros individuales; no sustituye antibiograma ni guía vigente.</span></div></section>';
}
function specPanelMicro(p){
 const dom=p.kingdom,drugs=domainDrug(dom),col=shades[dom];
 const items=drugs.map(a=>({a,c:covStatus(a,p)}));
 const fams=[...new Set(drugs.map(a=>a.family))].map(f=>({f,list:items.filter(x=>x.a.family===f)})).map(x=>({...x,k:x.list.filter(y=>y.c.status!=='unknown')})).filter(x=>x.k.length);
 const n=k=>items.filter(x=>x.c.status===k).length;
 const stat=(k,l,cls)=>'<div class="sp-stat '+cls+'"><b>'+n(k)+'</b><span>'+l+'</span></div>';
 return '<section class="nx-spec" aria-label="Perfil de cobertura"><div class="sp-head"><div><span class="nx-overline">AGENTES RELACIONADOS · '+safe(names[dom]).toUpperCase()+'</span><h2>¿Qué agentes <em>describe</em> el atlas?</h2></div><div class="sp-stats">'+stat('expected','Actividad habitual','e')+stat('variable','Condicionada','v')+stat('excluded','No fiable','x')+stat('unknown','Sin evaluar','u')+'</div></div>'+
  (fams.length===0?'<p class="sp-empty">Aún no hay agentes con perfil revisado para esta especie. «Sin evaluar» no equivale a resistencia.</p>':'')+
  '<div class="sp-fams">'+fams.map(({f,k},fi)=>'<div class="sp-fam" style="--gi:'+fi+'"><header><b>'+safe(f)+'</b><small>'+k.length+'</small></header><div class="sp-chips">'+k.map(({a,c})=>'<button class="sp-chip '+c.status+'" data-act="nx-find:drug:'+a.kingdom+':'+a.id+'" title="'+safe(displayStatus[c.status].label)+'">'+safe(a.name)+'</button>').join('')+'</div></div>').join('')+'</div>'+
  '<div class="sp-foot"><button class="nx-secondary" data-act="nx-view:matriz">Ver matriz completa ↗</button><span>Actividad habitual ≠ sensibilidad del aislado ≠ eficacia clínica.</span></div></section>';
}
function enhanceInterior(){
 document.querySelectorAll('.nx-spec').forEach(x=>x.remove());
 const ui=window.ATLAS24?.debug?.ui;if(!ui)return;
 try{
  if(state.route==='atb'){
   let a,anchor,pos='afterend';
   if(ui.drugs&&ui.drugs!=='bacteria'){a=allDrug().find(x=>x.id===ui.selectedDrug);const art=document.querySelector('.v24-detail');if(art&&art.firstElementChild){anchor=art.firstElementChild}}
   else{const d=A(state.drug)||D.antibiotics[0];a=allDrug().find(x=>x.id===d.id&&x.kingdom==='bacteria');anchor=document.querySelector('.v23-drug-hero')}
   if(a&&anchor)anchor.insertAdjacentHTML(pos,specPanelDrug(a));
  }else if(state.route==='micro'){
   let p,anchor;
   if(ui.micro&&ui.micro!=='bacteria'){p=allMicro().find(x=>x.id===ui.selectedMicro);const art=document.querySelector('.v24-detail');if(art&&art.firstElementChild)anchor=art.firstElementChild}
   else{const m=P(state.micro)||D.pathogens[0];p=allMicro().find(x=>x.id===m.id&&x.kingdom==='bacteria');anchor=document.querySelector('.v20-profilehero')}
   if(p&&anchor)anchor.insertAdjacentHTML('afterend',specPanelMicro(p));
  }
 }catch(e){console.warn('spec panel',e)}
}
const renderV28=render;render=function(){renderV28();enhanceInterior()};
})();
