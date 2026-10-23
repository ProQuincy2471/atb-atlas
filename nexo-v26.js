/* NEXO ID V26 — Brand-new navigation, information architecture, explorer and command search.
 * Data remains in the audited V23–V25 catalogs. No synthetic microscopy images.
 */
(function(){
'use strict';
if(new URLSearchParams(location.search).get('legacy')==='1')return;
const NX={domain:'bacteria',group:'all',micro:'',query:'',rxQuery:'',rxFamily:'all',status:'relevant',searchOpen:false,searchQuery:'',drawer:false,compact:false};
window.NEXO_ID=NX;
const names={bacteria:'Bacterias',virus:'Virus',fungi:'Hongos',parasites:'Parásitos'};
const shades={bacteria:'#2b66b1',virus:'#7355b9',fungi:'#b46d43',parasites:'#178772'};
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
 return '<button class="nx-brand" data-act="nx-go:inicio" aria-label="NEXO ID, ir al inicio"><span class="nx-mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span class="nx-brand-type"><strong>NEXO<span>ID</span></strong><small>ATLAS DE INFECTOLOGÍA</small></span></button>';
}
function rail(){
 const entries=sections.map(([route,label,desc],i)=>{
 const active=state.route===route;const number=String(i+1).padStart(2,'0');
 return '<button class="nx-rail-link '+(active?'active':'')+'" data-act="nx-go:'+route+'" title="'+safe(desc)+'"><span class="nx-rail-icon">'+ic(icons[route],18)+'</span><span class="nx-rail-txt"><b>'+safe(label)+'</b></span>'+(active?'<i class="nx-rail-active"></i>':'')+'</button>';
 }).join('');
 return '<aside class="nx-rail '+(NX.drawer?'drawer-open':'')+'" id="nx-rail"><div class="nx-rail-header">'+shellBrand()+'<button class="nx-close-menu" data-act="nx-drawer" aria-label="Cerrar navegación">×</button></div>'+
 '<div class="nx-rail-label">EXPLORAR LA BIBLIOTECA</div><nav class="nx-rail-nav" aria-label="Secciones de NEXO ID">'+entries+'</nav>'+
 '<div class="nx-rail-bottom"><span class="nx-rail-symbol">N/26</span><div><b>Edición clínica</b><small>Microbiología · terapéutica</small></div></div></aside>';
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
 return '<div class="nx-app '+(NX.compact?'nx-compact':'')+'">'+rail()+'<div class="nx-stage">'+topbar()+'<main class="nx-main" id="main">'+content+'</main><footer class="nx-footer"><span><b>NEXO ID</b> · Atlas académico de microbiología e infectología</span><span>La cobertura es educativa; validar susceptibilidad, foco y guías antes de prescribir.</span><a href="https://github.com/ProQuincy2471/atb-atlas" target="_blank" rel="noopener noreferrer">Repositorio ↗</a></footer></div></div>'+commandPalette()+modal();
};
function home(){
 const countM=allMicro().length,countD=allDrug().length,who=typeof WHO==='undefined'?0:WHO.conditions.length;
 const tiles=[
 ['bacteria','Bacteriología','Gram, virulencia y resistencia',D.pathogens.length,'micro'],
 ['virus','Virología','Replicación, latencia y antivirales',window.ATLAS24.viruses.length,'micro'],
 ['fungi','Micología','Levaduras, mohos y micosis invasivas',window.ATLAS24.fungi.length,'micro'],
 ['parasites','Parasitología','Ciclos vitales y enfermedades tropicales',window.ATLAS24.parasites.length,'micro']
 ];
 return '<div class="nx-home"><div class="nx-hero"><div class="nx-hero-copy"><span class="nx-edition"><i></i> EDICIÓN CLÍNICA · 2026</span>'+
 '<h1>Del microorganismo<br> a la <em>decisión clínica.</em></h1><p>Un atlas de microbiología e infectología para estudiar con profundidad: reconocer el agente, comprender su biología, interpretar las pruebas y relacionar su mecanismo con el tratamiento.</p>'+
 '<div class="nx-hero-actions"><button class="nx-primary" data-act="nx-go:mapa">Explorar conexiones <span>↗</span></button><button class="nx-secondary" data-act="nx-go:clinica">Abrir síndromes <span>→</span></button></div></div>'+
 '<div class="nx-hero-panel"><div class="nx-hero-panel-top"><span>UNA MISMA LÓGICA CLÍNICA</span><span>N/26</span></div><ol><li><span>01</span><div><b>Identificar</b><p>Fenotipo, estructura, virulencia y contexto.</p></div></li><li><span>02</span><div><b>Interpretar</b><p>Pruebas microbiológicas, huésped y foco.</p></div></li><li><span>03</span><div><b>Seleccionar</b><p>Diana molecular, espectro y resistencias.</p></div></li></ol><div class="nx-panel-note">La ausencia de evidencia no se presenta como resistencia.</div></div></div>'+
 '<div class="nx-index-head"><div><span class="nx-overline">01 / EL ARCHIVO</span><h2>Cuatro dominios, una biblioteca clínica.</h2></div><p>Explora por biología y síndrome. La profundidad está en las fichas, no en un mapa decorativo.</p></div>'+
 '<div class="nx-home-domains">'+tiles.map(([k,label,desc,num])=>'<button class="nx-domain-card '+k+'" data-act="nx-home-domain:'+k+'"><span class="nx-dc-over">DOMINIO / '+safe(k.toUpperCase())+'</span><span class="nx-dc-count">'+num+'</span><h3>'+label+'</h3><p>'+desc+'</p><div class="nx-dc-bottom"><span>Explorar especies</span><b>↗</b></div></button>').join('')+'</div>'+
 '<div class="nx-home-bottom"><section><span class="nx-overline">02 / TERAPÉUTICA</span><h2>Farmacología sin atajos.</h2><p>'+countD+' agentes antibacterianos, antivirales, antifúngicos y antiparasitarios: diana, mecanismo, exposición, espectro y resistencia.</p><button data-act="nx-go:atb">Explorar antimicrobianos →</button></section>'+
 '<section><span class="nx-overline">03 / MEDICINA INTERNA</span><h2>Revisiones sindrómicas.</h2><p>'+String(who+(window.ATLAS25.extraConditions||[]).length)+' síndromes enlazados a un marco de reconocimiento, diagnóstico diferencial, tratamiento y evolución.</p><button data-act="nx-go:clinica">Consultar síndromes →</button></section>'+
 '<section><span class="nx-overline">04 / APRENDER</span><h2>Biblioteca de fundamentos.</h2><p>Capítulos de revisión, casos clínicos y explicaciones de microbiología aplicadas a la práctica de residencia.</p><button data-act="nx-go:aprender">Abrir biblioteca →</button></section></div></div>';
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
const oldMain=mainPage;
mainPage=function(){
 if(state.route==='inicio')return home();
 if(state.route==='mapa')return mapExplorer();
 return '<div class="nx-section-page nx-section-'+safe(state.route)+'"><div class="nx-page-kicker"><span>NEXO ID</span><i>/</i><span>'+safe((sections.find(x=>x[0]===state.route)||[])[1]||'Atlas')+'</span><span class="nx-kicker-right">BASE CLÍNICA · V26</span></div>'+oldMain()+'</div>';
};
const actBefore=act;
act=function(command){
 const a=String(command).split(':'),op=a[0],value=a.slice(1).join(':');
 switch(op){
 case 'nx-go':NX.drawer=false;return goto(value);
 case 'nx-home-domain':NX.domain=value;NX.group='all';NX.query='';NX.micro='';NX.drawer=false;return goto('mapa');
 case 'nx-drawer':NX.drawer=!NX.drawer;return render();
 case 'nx-density':NX.compact=!NX.compact;try{localStorage.setItem('nexo-v26-compact',NX.compact?'1':'0')}catch{}return render();
 case 'nx-map-domain':NX.domain=value;NX.group='all';NX.micro='';NX.query='';NX.rxQuery='';NX.rxFamily='all';NX.status='relevant';return render();
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
try{NX.compact=localStorage.getItem('nexo-v26-compact')==='1'}catch{}
NAV.unshift(['inicio','home','Inicio']);
NAV.find(x=>x[0]==='mapa')[2]='Explorar';
NAV.find(x=>x[0]==='atb')[2]='Antimicrobianos';
NAV.find(x=>x[0]==='aprender')[2]='Biblioteca';
if(!location.hash){
 state.route='inicio';history.replaceState(null,'',location.pathname+location.search+'#/inicio');
}
const originalRender=render;
render=function(){originalRender();document.title='NEXO ID · '+(sections.find(x=>x[0]===state.route)?.[1]||'Atlas de infectología clínica');document.documentElement.dataset.nexoVersion='26'};
})();
