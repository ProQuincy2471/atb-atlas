/* INFEORA V26 — Brand-new navigation, information architecture, explorer and command search.
 * Data remains in the audited V23–V25 catalogs. No synthetic microscopy images.
 */
(function(){
'use strict';
if(new URLSearchParams(location.search).get('legacy')==='1')return;
const NX={domain:'bacteria',group:'all',micro:'',query:'',rxQuery:'',rxFamily:'all',status:'relevant',searchOpen:false,searchQuery:'',drawer:false,compact:false};
window.INFEORA_APP=NX;
const names={bacteria:'Bacterias',virus:'Virus',fungi:'Hongos',parasites:'Parásitos'};
const shades={bacteria:'#6b2fc4',virus:'#66751c',fungi:'#0a86b8',parasites:'#d2386c'};
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
const grps=k=>k==='bacteria'?D.groups.map((g,i)=>({id:g.id,label:g.name,color:grpcolor(g.id),ids:D.pathogens.filter(p=>p.groupId===g.id).map(p=>p.id),concept:'Morfología, especie y fenotipo de resistencia: interpretación siempre individual.'})):(window.ATLAS25?.microGroups||[]).filter(g=>g.kingdom===k).map((g,i)=>({...g,color:['#6b2fc4','#2f6f9f','#b23a55','#2b7d6a','#a0558e','#46508e','#0a86b8','#7a46c8','#c2456f','#5b7a2a','#8a4aa8','#3b4fa6'][i%12]}));
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
 return '<button class="nx-rail-link '+(active?'active':'')+'" data-act="nx-go:'+route+'" title="'+safe(desc)+'"><span class="nx-rail-icon">'+(window.INF_ICON?window.INF_ICON(route):ic(icons[route],18))+'</span><span class="nx-rail-txt"><b>'+safe(label)+'</b></span>'+(active?'<i class="nx-rail-active"></i>':'')+'</button>';
 }).join('');
 return '<aside class="nx-rail '+(NX.drawer?'drawer-open':'')+'" id="nx-rail"><div class="nx-rail-header">'+shellBrand()+'<button class="nx-close-menu" data-act="nx-drawer" aria-label="Cerrar navegación">×</button></div>'+
 '<div class="nx-rail-label">EXPLORAR LA BIBLIOTECA</div><nav class="nx-rail-nav" aria-label="Secciones de INFEORA">'+entries+'</nav>'+
 '<div class="nx-rail-bottom"><span class="nx-rail-symbol">I/26</span><div><b>Edición clínica</b><small>Microbiología · terapéutica</small></div></div></aside>';
}
function topbar(){
 const label=sections.find(x=>x[0]===state.route)||sections[0];
 return '<div class="nx-topbar"><div class="nx-topbar-left"><button class="nx-hamb" data-act="nx-drawer" title="Abrir menú" aria-label="Abrir menú"><span></span><span></span><span></span></button><div class="nx-breadcrumb"><span>ATLAS CLÍNICO</span><i>/</i><b>'+safe(label[1])+'</b></div></div><div class="nx-topbar-actions"><button class="nx-motion" data-act="nx-motion" aria-pressed="'+!document.documentElement.classList.contains('motion-off')+'" title="Activar o desactivar animaciones"><i></i><span>Animaciones</span></button>'+
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
 const I=window.INF_ICON||(()=>''),GL=window.INF_GLYPH||(()=>''),WT=window.ATLAS25?.whoTreat||{};
 const conds=[...(typeof WHO!=='undefined'?WHO.conditions:[]),...(window.ATLAS25.extraConditions||[])];
 const dom=[['bacteria','Bacterias','Gram, morfología, virulencia y resistencia',D.pathogens.length,grps('bacteria')],['virus','Virus','Replicación, latencia y antivirales',domainMicro('virus').length,grps('virus')],['fungi','Hongos','Levaduras, mohos, dimórficos e invasivas',domainMicro('fungi').length,grps('fungi')],['parasites','Parásitos','Protozoos, helmintos y ciclos vitales',domainMicro('parasites').length,grps('parasites')]];
 const mode=NX.homeMode||'micro';
 const modes=[['micro','Un microorganismo','micro','p. ej. Klebsiella, Candida auris, VIH'],['drug','Un fármaco','atb','p. ej. meropenem, aciclovir, ivermectina'],['syndrome','Un cuadro clínico','clinica','p. ej. neumonía, meningitis, ITU']];
 const curMode=modes.find(m=>m[0]===mode)||modes[0];
 const feat=Object.keys(WT).filter(id=>WT[id].abx!=='no'&&WT[id].grupos?.[0]?.esc?.[0]?.first?.length).slice(0,40);
 const pick=['who-13','who-14','who-34','who-24','who-16','who-26','who-21','who-30'].filter(id=>feat.includes(id));const featIds=(pick.length>=6?pick:feat).slice(0,6);
 const featCards=featIds.map(id=>{const c=conds.find(x=>x.id===id)||{title:id,system:''},T=WT[id],e=T.grupos[0].esc[0],m=window.INF_SYS?window.INF_SYS(c.system):{color:'#3b4fa6',icon:'clinica'};
  return '<button class="hm-who" style="--t:'+m.color+'" data-act="nx-find:syndrome:'+safe(id)+'"><span class="hm-who-top"><i>'+I(m.icon)+'</i><small>'+safe(c.system)+'</small></span><b>'+safe(c.title)+'</b><span class="hm-who-rx"><em class="hm-aw hm-aw-'+(e.first[0].c||'x')+'">'+(e.first[0].c||'·')+'</em>'+safe(e.first[0].t.replace(/^Casos? (leves|graves): /,'').split(/\. Bandas|\. Vía oral|: neonatos/)[0].slice(0,70))+'</span><span class="hm-who-dur">'+safe(e.dur||'')+'</span></button>'}).join('');
 const route=[['micro','Reconoce el agente','Tinción, morfología, epidemiología y factores de virulencia.','bacteria'],['atb','Entiende el fármaco','Diana, mecanismo molecular, espectro y resistencia.','atb'],['mapa','Cruza agente y fármaco','Mapa y matriz de cobertura graduada con su fuente.','mapa'],['clinica','Decide en el paciente','Síndrome, diferencial, primera línea y duración.','clinica']];
 return '<div class="hm">'+
 '<section class="hm-hero"><div class="hm-hero-txt"><span class="hm-kicker">'+I('micro')+'INFEORA · Atlas de infectología clínica</span><h1>¿Qué tienes <span>enfrente</span>?</h1><p>Empieza por lo que sabes: el microorganismo del cultivo, el fármaco que te preguntan o el cuadro del paciente. El atlas te lleva al resto.</p></div>'+
 '<div class="hm-console" role="search"><div class="hm-modes" role="tablist">'+modes.map(([k,l,ic])=>'<button role="tab" aria-selected="'+(mode===k)+'" class="'+(mode===k?'on':'')+'" data-act="hm-mode:'+k+'">'+I(ic)+'<span>'+l+'</span></button>').join('')+'</div>'+
 '<label class="hm-input">'+I('search')+'<span class="sr-only">Buscar '+curMode[1]+'</span><input id="hm-q" autocomplete="off" placeholder="'+safe(curMode[3])+'" value="'+safe(NX.homeQ||'')+'"></label><div class="hm-results" id="hm-results">'+homeResults(mode,NX.homeQ||'')+'</div></div></section>'+
 '<section class="hm-drawers" aria-label="Los cuatro dominios">'+dom.map(([k,l,d,n,gs])=>'<article class="hm-drawer hm-'+k+'"><button class="hm-drawer-main" data-act="nx-home-domain:'+k+'"><span class="hm-glyph">'+GL(k)+'</span><span class="hm-drawer-n">'+n+'</span><h3>'+l+'</h3><p>'+d+'</p></button><div class="hm-groups">'+gs.slice(0,5).map(g=>'<span>'+safe(g.label)+'</span>').join('')+(gs.length>5?'<span class="more">+'+(gs.length-5)+'</span>':'')+'</div><div class="hm-drawer-acts"><button data-act="nx-home-domain:'+k+'">'+I('mapa')+'Ver en el mapa</button><button data-act="hm-lib:'+k+'">'+I('book')+'Abrir fichas</button></div></article>').join('')+'</section>'+
 '<section class="hm-route"><header><h2>Cómo se usa el atlas</h2><p>Cuatro pasos, del laboratorio a la cama del paciente.</p></header><ol>'+route.map(([r,t,d,ic],i)=>'<li><button data-act="nx-go:'+r+'"><span class="hm-step">'+(i+1)+'</span><span class="hm-route-ic">'+(GL(ic)||I(ic))+'</span><b>'+t+'</b><small>'+d+'</small></button></li>').join('')+'</ol></section>'+
 (featCards?'<section class="hm-whosec"><header><div><h2>Primera línea según la OMS</h2><p>Cuadros frecuentes con el tratamiento de primera elección del manual AWaRe 2022. Abre la ficha para dosis pediátricas, alternativas y duración.</p></div><button class="hm-link" data-act="nx-go:clinica">Ver los '+Object.keys(WT).length+' cuadros '+I('clinica')+'</button></header><div class="hm-who-grid">'+featCards+'</div><p class="hm-note"><b>A</b> Access · <b>W</b> Watch · <b>R</b> Reserve. Adaptación educativa no oficial: contrastar con la edición vigente y el antibiograma local.</p></section>':'')+
 '</div>';
}
function homeResults(mode,q){
 const n=normalized(q||'').trim(),I=window.INF_ICON||(()=>'');
 let list=[];
 if(mode==='micro')list=allMicro().map(p=>({t:p.name,s:(p.kingdom==='bacteria'?(p.domain||'Bacteria'):names[p.kingdom]||p.kingdom),k:p.kingdom,act:'nx-find:micro:'+p.kingdom+':'+p.id,txt:[p.name,p.taxonomy,p.family,p.domain].join(' ')}));
 else if(mode==='drug')list=allDrug().map(a=>({t:a.name,s:a.family||'',k:a.kingdom,act:'nx-find:drug:'+a.kingdom+':'+a.id,txt:[a.name,a.family,a.subgroup].join(' ')}));
 else list=[...(typeof WHO!=='undefined'?WHO.conditions:[]),...(window.ATLAS25.extraConditions||[])].map(c=>({t:c.title,s:c.system,k:'clin',act:'nx-find:syndrome:'+c.id,txt:c.title+' '+c.system,who:!!window.ATLAS25?.whoTreat?.[c.id]}));
 const hits=n?list.filter(x=>normalized(x.txt).includes(n)).slice(0,8):list.slice(0,8);
 if(!hits.length)return '<p class="hm-empty">Sin coincidencias para «'+safe(q)+'». Prueba con el género, la familia o el órgano.</p>';
 return (n?'':'<span class="hm-hint">Sugerencias</span>')+hits.map(x=>'<button class="hm-hit hm-k-'+x.k+'" data-act="'+safe(x.act)+'"><i>'+I(x.k==='clin'?'clinica':mode==='drug'?'pill':x.k)+'</i><b>'+safe(x.t)+'</b><small>'+safe(x.s)+(x.who?' · OMS':'')+'</small></button>').join('');
}
document.addEventListener('input',e=>{if(e.target.id!=='hm-q')return;NX.homeQ=e.target.value;const r=document.getElementById('hm-results');if(r)r.innerHTML=homeResults(NX.homeMode||'micro',NX.homeQ)});
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
/* ───────── V30: cobertura graduada (5 niveles), color por clase, matriz y mapa ───────── */
const COOL={bacteria:'#6b2fc4',virus:'#66751c',fungi:'#0a86b8',parasites:'#d2386c'};
Object.assign(shades,COOL);
Object.assign(NX,{view:'mapa',mapGroup:'all',covAll:false,covQuery:'',covClasses:[],covGroup:'all',covSort:'clase',covPick:null});
const SP=()=>window.ATLAS30&&window.ATLAS30.spectrum;
const LV={Y:{n:4,label:'Actividad habitual',short:'Sí',frac:'4/4'},M:{n:3,label:'Mayoría de cepas',short:'Casi siempre',frac:'3/4'},S:{n:2,label:'A veces / depende',short:'A veces',frac:'2/4'},R:{n:1,label:'Rara vez',short:'Rara vez',frac:'1/4'},N:{n:0,label:'No activo',short:'No',frac:'0/4'}};
const lvlToStatus=l=>l==='Y'||l==='M'?'expected':l==='S'||l==='R'?'variable':l==='N'?'excluded':'unknown';
const TIER={individual:'Registro / perfil del fármaco',especie:'Dato por especie',clase:'Espectro de clase (a nivel de grupo)',v24:'Perfil orientativo del catálogo',tabla:'Tabla de actividad (Murray cap. 61)'};
/* color por clase de fármaco: determinista, solo gama fría */
const famList=(()=>{const l=[];return ()=>{if(l.length)return l;const f=new Set();allDrug().forEach(a=>f.add(a.kingdom+'|'+a.family));[...f].sort().forEach(x=>l.push(x));return l}})();
function familyColor(kind,fam){const i=famList().indexOf(kind+'|'+fam);const k=i<0?0:i;const hue=[212,262,188,158,232,285,172,200,246,148,300,222,178,268,196,240,164,292,206,252][k%20];const light=[46,52,40][Math.floor(k/20)%3]||46;return 'hsl('+hue+' 72% '+light+'%)'}
function covLevel(a,p){
 const sp=SP(),gl=grps(p.kingdom),g=gl.find(x=>x.ids.includes(p.id));
 if(a.kingdom==='bacteria'&&p.kingdom==='bacteria'){
  if(window.ATLAS23&&window.ATLAS23.coverage){
   const c=window.ATLAS23.coverage(a,p),s=c.st;
   const l=(s==='active'||s==='expected')?'Y':(s==='conditional'||s==='variable')?'S':(s==='none'||s==='excluded')?'N':null;
   if(l)return {lvl:l,tier:'individual',note:c.note||'',src:c.source||''};
  }
  const k=sp&&sp.drugClass[a.id],cl=k&&sp.classes[k];
  if(cl){
   if(cl.s[p.id])return {lvl:cl.s[p.id],tier:'especie',note:cl.note,src:sp.srcLabel[cl.src]||cl.src};
   if(g&&cl.g[g.id])return {lvl:cl.g[g.id],tier:'clase',note:cl.note,src:sp.srcLabel[cl.src]||cl.src};
  }
  return {lvl:null,tier:'',note:'No hay relación individual ni espectro de clase documentado para este par; no significa resistencia.',src:''};
 }
 if(p.kingdom==='fungi'&&sp){
  const col=sp.drugCol[a.id];
  if(col&&sp.table61[col]&&sp.table61[col][p.id])return {lvl:sp.table61[col][p.id],tier:'tabla',note:'Actividad graduada en la tabla 61.2 de Murray (++++ a 0).',src:'Murray cap. 61'};
  const tx=sp.antifungalText[a.id];if(tx&&tx.s[p.id])return {lvl:tx.s[p.id],tier:'especie',note:'Según el texto de Murray cap. 61.',src:tx.src};
 }
 const r=window.ATLAS24.debug.relation24(a,p);
 const l=r.status==='expected'?'Y':r.status==='variable'?'S':r.status==='excluded'?'N':null;
 return {lvl:l,tier:l?'v24':'',note:r.note,src:''};
}
function covStatus(a,p){const r=covLevel(a,p);return {status:lvlToStatus(r.lvl),lvl:r.lvl,note:r.note,source:(TIER[r.tier]||'')+(r.src?' · '+r.src:'')}}
const shortName=n=>{const [l,r]=String(n).replace(/\s*\(.*?\)/g,'').split(' — ');let w=l.trim().split(/\s+/);if(w.length>1&&/^[A-Z]/.test(w[0])&&w[0].length>3)w=[w[0][0]+'.',...w.slice(1)];let t=w.join(' ')+(r?' '+r.trim().split(/\s+/)[0]:'');return t.length>24?t.slice(0,23)+'…':t};
const covCache={};
function covData(dom){
 if(covCache[dom])return covCache[dom];
 const orgs=domainMicro(dom),drugs=domainDrug(dom),gl=grps(dom);
 const gOf={};gl.forEach(g=>g.ids.forEach(id=>gOf[id]=g));
 const cols=[...orgs].sort((x,y)=>{const gx=gl.findIndex(g=>g.id===gOf[x.id]?.id),gy=gl.findIndex(g=>g.id===gOf[y.id]?.id);return (gx<0?99:gx)-(gy<0?99:gy)});
 const rows=drugs.map(a=>{const cells=cols.map(p=>covLevel(a,p));const known=cells.filter(c=>c.lvl).length;const score=cells.reduce((s,c)=>s+(c.lvl?LV[c.lvl].n:0),0);return {a,cells,known,score,color:familyColor(a.kingdom,a.family)}});
 return covCache[dom]={cols,rows,gOf,gl};
}
const gaugeStyle=(c,l)=>l&&l!=='N'?'background:linear-gradient(to top,'+c+' '+(LV[l].n*25)+'%,color-mix(in srgb,'+c+' 9%,#fff) '+(LV[l].n*25)+'%)':'';
function matrixView(){
 const dom=NX.domain,{cols:allCols,rows,gOf,gl}=covData(dom),col=shades[dom],q=normalized(NX.covQuery);
 const cols=NX.covGroup==='all'?allCols:allCols.filter(p=>gOf[p.id]?.id===NX.covGroup);
 const idx=cols.map(p=>allCols.indexOf(p));
 const fams=[...new Set(rows.map(r=>r.a.family))];
 let vis=rows.filter(r=>(NX.covAll||r.known>0)&&(!NX.covClasses.length||NX.covClasses.includes(r.a.family))&&(!q||normalized(r.a.name+' '+r.a.family).includes(q)));
 if(NX.covSort==='cobertura')vis=[...vis].sort((x,y)=>y.score-x.score);
 const hidden=rows.filter(r=>r.known===0).length;
 let bands='',i=0;while(i<cols.length){const g=gOf[cols[i].id];let j=i;while(j<cols.length&&gOf[cols[j].id]===g)j++;bands+='<th class="cv-band" colspan="'+(j-i)+'" style="--g:'+(g?.color||col)+'" title="'+safe(g?.label||'')+'"><span>'+safe(g?.label||'Otros')+'</span></th>';i=j}
 const head='<tr class="cv-bands"><th class="cv-corner" rowspan="2"><b>'+vis.length+' agentes</b><small>× '+cols.length+' especies</small></th>'+bands+'</tr><tr class="cv-cols">'+cols.map((p,ci)=>'<th class="cv-col" data-c="'+ci+'" style="--g:'+(gOf[p.id]?.color||col)+'"><button data-act="nx-find:micro:'+p.kingdom+':'+p.id+'" title="'+safe(p.name)+'"><span>'+safe(shortName(p.name))+'</span></button></th>').join('')+'</tr>';
 let body='',last='';
 vis.forEach((r,ri)=>{
  if(NX.covSort!=='cobertura'&&r.a.family!==last){last=r.a.family;body+='<tr class="cv-fam" style="--fc:'+r.color+'"><th colspan="'+(cols.length+1)+'"><i></i><span>'+safe(last)+'</span></th></tr>'}
  const full=r.cells.filter(c=>c.lvl==='Y'||c.lvl==='M').length;
  body+='<tr class="cv-row" style="--i:'+Math.min(ri,40)+';--fc:'+r.color+'"><th class="cv-rh"><button data-act="nx-find:drug:'+r.a.kingdom+':'+r.a.id+'"><i></i><span>'+safe(r.a.name)+'</span><em title="especies con actividad habitual o casi siempre">'+full+'</em></button></th>'+
   idx.map((oi,ci)=>{const c=r.cells[oi];return '<td class="cv-cell '+(c.lvl?'l'+c.lvl:'unknown')+(c.tier==='clase'?' tclase':'')+'" data-c="'+ci+'" data-a="'+safe(r.a.id)+'" data-p="'+safe(cols[ci].id)+'" style="'+gaugeStyle(r.color,c.lvl)+'"></td>'}).join('')+'</tr>';
 });
 const chips=fams.map(f=>{const c=familyColor(dom,f);return '<button class="cv-chip '+(NX.covClasses.includes(f)?'on':'')+'" style="--fc:'+c+'" data-act="nx-cov-class:'+safe(f)+'"><i></i>'+safe(f)+'</button>'}).join('');
 const gchips='<button class="cv-gchip '+(NX.covGroup==='all'?'on':'')+'" data-act="nx-cov-group:all">Todas las especies</button>'+gl.map(g=>'<button class="cv-gchip '+(NX.covGroup===g.id?'on':'')+'" style="--g:'+g.color+'" data-act="nx-cov-group:'+g.id+'"><i></i>'+safe(g.label)+'</button>').join('');
 const legend=['Y','M','S','R','N'].map(l=>'<span class="cv-lg"><i class="g l'+l+'" style="'+gaugeStyle('#3b4fa6',l)+'"></i><b>'+LV[l].short+'</b><small>'+LV[l].frac+'</small></span>').join('')+'<span class="cv-lg"><i class="g unknown"></i><b>Sin dato</b><small>≠ resistencia</small></span>';
 const pk=NX.covPick,pa=pk&&allDrug().find(x=>x.id===pk.a),pp=pk&&allMicro().find(x=>x.id===pk.p),pc=pa&&pp?covLevel(pa,pp):null;
 const pick=pc?'<div class="cv-pick" style="--fc:'+familyColor(pa.kingdom,pa.family)+'"><div class="cv-pick-gauge"><i class="g l'+(pc.lvl||'')+'" style="'+gaugeStyle(familyColor(pa.kingdom,pa.family),pc.lvl)+'"></i></div><div><b>'+safe(pa.name)+' × '+safe(pp.name)+'</b><span class="cv-pick-l">'+(pc.lvl?LV[pc.lvl].label+' · '+LV[pc.lvl].frac:'Sin dato')+'</span><p>'+safe(pc.note)+'</p><small>'+safe((TIER[pc.tier]||'Sin fuente')+(pc.src?' · '+pc.src:''))+'</small></div><div class="cv-pick-act"><button class="nx-secondary" data-act="nx-find:drug:'+pa.kingdom+':'+pa.id+'">Ficha del fármaco</button><button class="nx-secondary" data-act="nx-find:micro:'+pp.kingdom+':'+pp.id+'">Ficha de la especie</button></div></div>':'<div class="cv-pick empty"><b>Toca una celda</b><p>Verás el nivel de actividad, de dónde sale el dato y un enlace a ambas fichas.</p></div>';
 return '<div class="cv-wrap" data-dom="'+dom+'">'+
  '<div class="cv-tools"><div class="cv-searchbox"><span>⌕</span><input id="nx-cov-query" value="'+safe(NX.covQuery)+'" placeholder="Buscar agente o clase…" aria-label="Buscar agente"></div>'+
  '<label class="cv-sort">Ordenar<select id="nx-cov-sort"><option value="clase" '+(NX.covSort==='clase'?'selected':'')+'>Por clase</option><option value="cobertura" '+(NX.covSort==='cobertura'?'selected':'')+'>Por amplitud de cobertura</option></select></label>'+
  '<button class="cv-toggle '+(NX.covAll?'on':'')+'" data-act="nx-cov-toggle">'+(NX.covAll?'Ocultar':'Mostrar')+' '+hidden+' agentes sin datos</button></div>'+
  '<div class="cv-filterrow"><span class="cv-flabel">Clase</span><div class="cv-chips">'+'<button class="cv-chip all '+(NX.covClasses.length?'':'on')+'" data-act="nx-cov-class:all">Todas</button>'+chips+'</div></div>'+
  '<div class="cv-filterrow"><span class="cv-flabel">Especies</span><div class="cv-chips">'+gchips+'</div></div>'+
  '<div class="cv-legend"><span class="cv-lgtitle">Cuánto cubre</span>'+legend+'<span class="cv-lg"><i class="g l'+'Y'+' tclase" style="'+gaugeStyle('#3b4fa6','Y')+'"></i><b>Contorno punteado</b><small>espectro de clase</small></span></div>'+
  pick+
  '<div class="cv-scroll"><table class="cv-table"><thead>'+head+'</thead><tbody>'+body+'</tbody></table></div>'+
  '<div class="cv-tip" id="cv-tip" hidden></div>'+
  '<p class="cv-note"><b>Cómo se construye.</b> El relleno de cada celda indica cuánto cubre el agente a esa especie (de vacío a completo); el color de la fila es la clase del fármaco y el de la banda superior es el grupo de especies. Los datos vienen de registros individuales, de perfiles por fármaco, de las tablas de Murray y de las fichas técnicas oficiales; cuando solo existe el espectro de la clase se dibuja con contorno punteado. «Sin dato» no es lo mismo que resistente. Orientativo: no sustituye al antibiograma ni a la guía vigente.</p></div>';
}
/* ───── mapa radial por niveles ───── */
function relMap(){
 const dom=NX.domain,gl=grps(dom),col=shades[dom],W=1280,cx=640,cy=470;let H=920;
 const orgs=domainMicro(dom),selG=NX.mapGroup,selSp=NX.micro&&orgs.find(o=>o.id===NX.micro)?NX.micro:'';
 const n=gl.length,ang=i=>(i/n)*Math.PI*2-Math.PI/2,any=selG!=='all';
 const pos={};let edges='',nodes='',tags='',drugsSvg='',zone='';
 const fan=selG!=='all'?gl.find(g=>g.id===selG):null;
 if(!any){ // todos los grupos: puntos pequeños por sectores y etiquetas fuera
  gl.forEach((g,gi)=>{const ids=g.ids.map(id=>orgs.find(o=>o.id===id)).filter(Boolean),a0=ang(gi),sector=Math.PI*2/n;
   ids.forEach((o,k)=>{const rings=Math.ceil(ids.length/8)||1,ring=k%rings,iR=Math.floor(k/rings),inR=Math.ceil(ids.length/rings),a=a0+(inR>1?(iR/(inR-1)-.5)*sector*.66:0),r=270+ring*28;pos[o.id]={x:cx+Math.cos(a)*r,y:cy+Math.sin(a)*r,g,o,mini:true,a}});
   const lx=cx+Math.cos(a0)*372,ly=cy+Math.sin(a0)*372;
   tags+='<text class="rm-glabel" x="'+lx.toFixed(1)+'" y="'+(ly+5).toFixed(1)+'" text-anchor="'+(Math.cos(a0)>.3?'start':Math.cos(a0)<-.3?'end':'middle')+'">'+safe(g.label.length>22?g.label.replace(/ y .*/,'').replace(/ \/ .*/,''):g.label)+'</text>';
  });
 }else{ // un grupo: abanico de especies a la izquierda
  const ids=fan.ids.map(id=>orgs.find(o=>o.id===id)).filter(Boolean),m=ids.length,step=Math.min(.135,2.5/Math.max(m,1)),total=step*(m-1);
  ids.forEach((o,k)=>{const a=Math.PI+(m>1?(k/(m-1)-.5)*total:0),r=318;pos[o.id]={x:cx+Math.cos(a)*r,y:cy+Math.sin(a)*r,g:fan,o,mini:false,a}});
  zone='<text class="rm-zone" x="'+(cx-330)+'" y="64" text-anchor="middle">Especies</text><text class="rm-zone" x="'+(cx+330)+'" y="64" text-anchor="middle">Agentes por clase</text>';
 }
 // ramas centro→grupo→especie
 gl.forEach((g,gi)=>{const a=ang(gi),gx=cx+Math.cos(a)*(any?118:150),gy=cy+Math.sin(a)*(any?118:150),dim=any&&selG!==g.id;
  edges+='<path class="rm-tree '+(dim?'dim':'')+'" d="M'+cx+' '+cy+' L'+gx.toFixed(1)+' '+gy.toFixed(1)+'" stroke="'+g.color+'" style="--d:'+(gi*50)+'ms"/>';
  if(!any||selG===g.id)g.ids.forEach(id=>{const q=pos[id];if(q)edges+='<path class="rm-tree light" d="M'+gx.toFixed(1)+' '+gy.toFixed(1)+' L'+q.x.toFixed(1)+' '+q.y.toFixed(1)+'" stroke="'+g.color+'"/>'});
 });
 // fármacos a la derecha, agrupados por clase
 if(selSp&&pos[selSp]){
  const o=pos[selSp].o,list=domainDrug(dom).map(a=>({a,c:covLevel(a,o)})).filter(x=>x.c.lvl&&(NX.mapLv||'YM').includes(x.c.lvl));
  const fam=[...new Set(list.map(x=>x.a.family))];list.sort((x,y)=>fam.indexOf(x.a.family)-fam.indexOf(y.a.family)||LV[y.c.lvl].n-LV[x.c.lvl].n);
  const m=list.length,gaps=Math.max(0,fam.length-1),avail=H-150,unit=Math.max(21,Math.min(26,avail/Math.max(m+gaps*.7,1))),totalH=unit*(m-1+gaps*.7),y0=Math.max(96,cy-totalH/2),X=cx+372;H=Math.max(920,Math.ceil(y0+totalH+70));
  let t=0,prev='';
  list.forEach(({a,c},i)=>{
   if(i&&a.family!==prev)t+=.7;prev=a.family;
   const y=y0+t*unit,x=X+Math.sin((y-cy)/H*Math.PI)*0,p=pos[selSp],fc=familyColor(a.kingdom,a.family);t+=1;
   edges+='<path data-i="'+i+'" class="rm-edge l'+c.lvl+'" d="M'+p.x.toFixed(1)+' '+p.y.toFixed(1)+' C'+(cx-150)+' '+p.y.toFixed(1)+' '+(cx+120)+' '+y.toFixed(1)+' '+x.toFixed(1)+' '+y.toFixed(1)+'" style="--d:'+(i*16)+'ms;--w:'+(LV[c.lvl].n*.9+.7)+'px;stroke:'+fc+'"/>';
   drugsSvg+='<g data-i="'+i+'" class="rm-drug l'+c.lvl+'" style="--d:'+(i*16)+'ms" data-act="nx-find:drug:'+a.kingdom+':'+a.id+'" transform="translate('+x.toFixed(1)+' '+y.toFixed(1)+')"><circle r="'+(5+LV[c.lvl].n*1.5)+'" fill="'+fc+'"/><text x="17" y="4.5">'+safe(a.name.length>26?a.name.slice(0,25)+'…':a.name)+'</text><text class="fr" x="'+(17+Math.min(a.name.length,26)*6.6+8)+'" y="4.5">'+LV[c.lvl].frac+'</text><title>'+safe(a.name+' · '+a.family+' · '+LV[c.lvl].label+' ('+LV[c.lvl].frac+')')+'</title></g>';
  });
 }
 Object.values(pos).forEach(q=>{
  const isSel=q.o.id===selSp,left=Math.cos(q.a)<0;
  nodes+='<g class="rm-org '+(q.mini?'':'big ')+(isSel?'sel':'')+'" data-act="nx-map-micro:'+q.o.id+'" transform="translate('+q.x.toFixed(1)+' '+q.y.toFixed(1)+')"><circle r="'+(isSel?13:q.mini?6.5:9.5)+'" fill="'+q.g.color+'"/>'+(isSel?'<circle class="ping" r="13" fill="none" stroke="'+q.g.color+'"/>':'')+(q.mini?'':'<text x="'+(left?-17:17)+'" y="4.5" text-anchor="'+(left?'end':'start')+'">'+safe(shortName(q.o.name))+'</text>')+'<title>'+safe(q.o.name)+'</title></g>';
 });
 gl.forEach((g,gi)=>{const a=ang(gi),gx=cx+Math.cos(a)*(any?118:150),gy=cy+Math.sin(a)*(any?118:150),on=selG===g.id,dim=any&&!on;
  nodes+='<g class="rm-group '+(on?'on ':'')+(dim?'dim':'')+'" data-act="nx-mapgroup:'+g.id+'" style="--d:'+(gi*50)+'ms" transform="translate('+gx.toFixed(1)+' '+gy.toFixed(1)+')"><title>'+safe(g.label)+' · '+g.ids.length+' especies. Clic para ver su espectro.</title><circle r="'+(on?34:any?24:30)+'" fill="'+g.color+'"/><text text-anchor="middle" y="6">'+g.ids.length+'</text><title>'+safe(g.label)+'</title></g>'});
 const s=selSp&&pos[selSp]?pos[selSp].o:null,list2=s?domainDrug(dom).map(a=>({a,c:covLevel(a,s)})).filter(x=>x.c.lvl):[];
 const byL=l=>list2.filter(x=>x.c.lvl===l);
 const step=(k,t,ok)=>'<li class="'+(ok?'done':'')+'"><b>'+k+'</b><span>'+t+'</span></li>';
 const gsel=gl.find(g=>g.id===selG);
 return '<div class="rm-wrap"><div class="rm-stage"><ol class="rm-steps">'+step(1,'Elige un grupo',any)+step(2,'Elige una especie',!!s)+step(3,'Mira sus agentes',!!s&&list2.length>0)+'</ol>'+mapToolbar(dom,gl,gsel,s)+
  '<svg class="rm-svg" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Mapa de relaciones entre grupos, especies y fármacos"><defs><radialGradient id="rmglow"><stop offset="0" stop-color="'+col+'" stop-opacity=".2"/><stop offset="1" stop-color="'+col+'" stop-opacity="0"/></radialGradient></defs>'+
  '<circle cx="'+cx+'" cy="'+cy+'" r="440" fill="url(#rmglow)"/><circle class="rm-ring" cx="'+cx+'" cy="'+cy+'" r="150"/><circle class="rm-ring" cx="'+cx+'" cy="'+cy+'" r="'+(any?318:290)+'"/>'+(any?'<circle class="rm-ring" cx="'+cx+'" cy="'+cy+'" r="372"/>':'')+
  zone+'<g class="rm-edges">'+edges+'</g>'+nodes+'<g class="rm-tags">'+tags+'</g>'+drugsSvg+
  '<g class="rm-core" transform="translate('+cx+' '+cy+')"><circle r="54" fill="'+col+'"/><circle r="54" class="rm-pulse" fill="none" stroke="'+col+'"/><text text-anchor="middle" y="-3">'+safe(names[dom])+'</text><text class="sub" text-anchor="middle" y="17">'+orgs.length+' especies</text></g>'+
  (any&&!s?'<text class="rm-hintsvg" x="'+(cx+330)+'" y="'+cy+'" text-anchor="middle">Elige una especie a la izquierda</text>':'')+'</svg></div>'+
  '<aside class="rm-side">'+(s?'<span class="rm-kick">Especie</span><h3>'+safe(s.name)+'</h3><p>'+safe((s.identity||s.biology||s.clinical||'').slice(0,200))+'</p><button class="nx-primary" data-act="nx-find:micro:'+s.kingdom+':'+s.id+'">Abrir ficha</button>':'<span class="rm-kick">'+(gsel?'Grupo':'Cómo leer el mapa')+'</span><h3>'+(gsel?safe(gsel.label):'Del grupo al fármaco')+'</h3><p>'+(gsel?'Elige una especie del abanico izquierdo. Sus agentes aparecen a la derecha, agrupados por clase.':'Centro: el dominio. Alrededor, los grupos de especies. Elige un grupo para abrir sus especies; al elegir una especie verás los agentes que la cubren, más gruesos cuanto más cubren.')+'</p>')+
  (s?'<div class="rm-lv">'+['Y','M','S'].map(l=>byL(l).length?'<div class="rm-lvgroup"><header><i class="g l'+l+'" style="'+gaugeStyle('#3b4fa6',l)+'"></i><b>'+LV[l].short+'</b><small>'+LV[l].frac+' · '+byL(l).length+'</small></header><div class="rm-lvchips">'+byL(l).map(({a})=>'<button style="--fc:'+familyColor(a.kingdom,a.family)+'" data-act="nx-find:drug:'+a.kingdom+':'+a.id+'"><i></i>'+safe(a.name)+'</button>').join('')+'</div></div>':'').join('')+(list2.filter(x=>x.c.lvl!=='N'&&x.c.lvl!=='R').length===0?'<p class="rm-empty">Sin agentes documentados para esta especie. «Sin dato» no es resistencia.</p>':'')+'</div>':'')+
  '<div class="rm-groups">'+gl.map(g=>'<button class="'+(selG===g.id?'on':'')+'" style="--g:'+g.color+'" data-act="nx-mapgroup:'+g.id+'"><i></i>'+safe(g.label)+'<b>'+g.ids.length+'</b></button>').join('')+'</div></aside></div>';
}

/* barra del mapa: ruta actual con pasos atrás, salto directo a una especie y filtro de niveles */
function mapToolbar(dom,gl,gsel,s){
 const I=window.INF_ICON||(()=>''),lv=NX.mapLv||'YM';
 const crumbs='<nav class="rm-crumbs" aria-label="Ruta en el mapa"><button data-act="nx-mapgroup:'+(gsel?gsel.id:'__none')+'" class="rm-crumb root" style="--c:'+shades[dom]+'"'+(gsel?'':' aria-current="true"')+'>'+I(dom)+safe(names[dom])+'</button>'+(gsel?'<i>›</i><span class="rm-crumb" style="--c:'+gsel.color+'">'+safe(gsel.label)+'<button data-act="nx-mapgroup:'+gsel.id+'" aria-label="Quitar grupo">'+I('clear')+'</button></span>':'')+(s?'<i>›</i><span class="rm-crumb sp">'+safe(s.name)+'<button data-act="nx-map-micro:" aria-label="Quitar especie">'+I('clear')+'</button></span>':'')+'</nav>';
 const opts=gl.map(g=>'<optgroup label="'+safe(g.label)+'">'+g.ids.map(id=>{const o=domainMicro(dom).find(x=>x.id===id);return o?'<option value="'+safe(g.id+'|'+o.id)+'"'+(s&&s.id===o.id?' selected':'')+'>'+safe(o.name)+'</option>':''}).join('')+'</optgroup>').join('');
 const jump='<label class="rm-jump">'+I('search')+'<span class="sr-only">Ir directo a una especie</span><select id="rm-jump"><option value="">Ir directo a una especie…</option>'+opts+'</select></label>';
 const chip=(l,t)=>'<button class="rm-lvbtn l'+l+(lv.includes(l)?' on':'')+'" data-act="nx-maplv:'+l+'" aria-pressed="'+lv.includes(l)+'"><i class="g l'+l+'" style="'+gaugeStyle('#3b4fa6',l)+'"></i>'+t+'</button>';
 const filt=s?'<div class="rm-lvfilter" role="group" aria-label="Niveles de cobertura visibles"><span>Mostrar</span>'+chip('Y','Casi siempre')+chip('M','Habitual')+chip('S','A veces')+chip('R','Rara vez')+'</div>':'';
 return '<div class="rm-toolbar">'+crumbs+jump+filt+'</div>';
}
document.addEventListener('change',e=>{if(e.target.id!=='rm-jump'||!e.target.value)return;const [g,id]=e.target.value.split('|');NX.mapGroup=g;NX.micro=id;NX.status='relevant';render()});
document.addEventListener('mouseover',e=>{const t=e.target.closest&&e.target.closest('.rm-drug[data-i]');const svg=document.querySelector('.rm-svg');if(!svg)return;svg.querySelectorAll('.hl').forEach(x=>x.classList.remove('hl'));if(t){svg.classList.add('hovering');svg.querySelectorAll('[data-i="'+t.dataset.i+'"]').forEach(x=>x.classList.add('hl'))}else svg.classList.remove('hovering')});

/* Laboratorio: relaciona el cuadro con su entrada del manual OMS y asigna 1ª/2ª línea a cada fármaco */
const LAB_WHO={'neumonia adquirida en la comunidad':'who-12','neumonia hospitalaria':'who-28','cistitis localizada en vejiga':'who-23','pielonefritis':'who-34','infeccion urinaria complicada':'who-34','celulitis no purulenta':'who-16','absceso e infeccion purulenta':'who-16','infeccion intraabdominal complicada':'who-31','meningitis bacteriana':'who-26','osteomielitis':'who-35','artritis septica':'who-36','infeccion por clostridioides difficile':'who-33','sepsis de posible origen bacteriano':'who-24','faringoamigdalitis bacteriana':'who-06','gastroenteritis bacteriana':'who-14','infeccion gonococica':'who-20','endocarditis infecciosa':'infective-endocarditis'};
const anyTreat=id=>window.ATLAS25?.whoTreat?.[id]||window.ATLAS25?.oiTreat?.[id]||window.ATLAS25?.msfTreat?.[id];
function labWhoId(cur){const n=normalized(cur.name).trim();const id=LAB_WHO[n];return id&&anyTreat(id)?id:''}
function whoTier(id,a){const T=anyTreat(id);if(!T)return 0;const ad=T.grupos.find(x=>/adult/i.test(x.p));const g=ad||{esc:T.grupos.flatMap(x=>x.esc)};
 const words=normalized(a.name).replace(/\b(iv|vo|im|oral)\b/g,'').split(/[^a-z]+/).filter(w=>w.length>=5);if(!words.length)return 0;
 const EQ={oxacilina:'cloxacilina',nafcilina:'cloxacilina',dicloxacilina:'cloxacilina'};
 const re=w=>new RegExp('(^|[^a-z])'+w+'([^a-z]|$)');
 const has=(list,ws)=>list.some(d=>{const t=normalized(d.t);return ws.every(w=>re(w).test(t))});
 const eq=words.length===1&&EQ[words[0]]?[EQ[words[0]]]:null;
 if(g.esc.some(e=>has(e.first,words)))return 1;if(g.esc.some(e=>has(e.second,words)))return 2;
 if(eq){if(g.esc.some(e=>has(e.first,eq)))return 1.5;if(g.esc.some(e=>has(e.second,eq)))return 2.5}return 0}
/* ───────── V30: comparador y laboratorio guiados ───────── */
Object.assign(NX,{cmp:{dom:'bacteria',ids:[],q:'',cls:'all',target:'',grp:'all'},lab:{sid:'',sp:[],q:'',dom:'bacteria'}});
const deepTxt=(a,k)=>{const d=window.ATLAS25&&window.ATLAS25.drugDeep&&window.ATLAS25.drugDeep[a.id];const t=d&&d[k]&&d[k][0];return t?String(t).replace(/\s+/g,' ').slice(0,230)+(String(t).length>230?'…':''):''};
function gaugeCell(c,fc){return '<span class="gg" style="'+gaugeStyle(fc,c.lvl)+'"></span>'}
function groupAgg(a,g,dom){const cols=covData(dom).cols.filter(p=>covData(dom).gOf[p.id]===g);const cs=cols.map(p=>covLevel(a,p));const known=cs.filter(c=>c.lvl);const good=cs.filter(c=>c.lvl==='Y'||c.lvl==='M').length;const avg=known.length?known.reduce((s,c)=>s+LV[c.lvl].n,0)/known.length:null;return {total:cols.length,known:known.length,good,avg}}
function compareView(){
 const C=NX.cmp,dom=C.dom,drugs=domainDrug(dom),sel=C.ids.map(id=>drugs.find(a=>a.id===id)).filter(Boolean),q=normalized(C.q);
 const fams=[...new Set(drugs.map(a=>a.family))];
 const pool=drugs.filter(a=>(C.cls==='all'||a.family===C.cls)&&(!q||normalized(a.name+' '+a.family).includes(q)));
 const domTabs=['bacteria','virus','fungi','parasites'].map(k=>'<button class="'+(dom===k?'active':'')+'" style="--domain:'+shades[k]+'" data-act="nx-cmp-dom:'+k+'"><span class="nx-domain-pin"></span>'+safe(k==='bacteria'?'Antibacterianos':k==='virus'?'Antivirales':k==='fungi'?'Antifúngicos':'Antiparasitarios')+'</button>').join('');
 const tray=sel.length?sel.map(a=>{const fc=familyColor(a.kingdom,a.family);return '<span class="cmp-tag" style="--fc:'+fc+'"><i></i>'+safe(a.name)+'<button data-act="nx-cmp-del:'+a.id+'" aria-label="Quitar '+safe(a.name)+'">×</button></span>'}).join(''):'<span class="cmp-hint">Elige de 2 a 6 agentes de la lista. Aparecerán aquí.</span>';
 const list=pool.slice(0,140).map(a=>{const on=C.ids.includes(a.id),fc=familyColor(a.kingdom,a.family);return '<button class="cmp-opt '+(on?'on':'')+'" style="--fc:'+fc+'" data-act="nx-cmp-toggle:'+a.id+'"><i></i><span><b>'+safe(a.name)+'</b><small>'+safe(a.family)+'</small></span><em>'+(on?'✓':'+')+'</em></button>'}).join('')||'<p class="cmp-hint">Ningún agente coincide con ese filtro.</p>';
 const chips='<button class="cv-chip all '+(C.cls==='all'?'on':'')+'" data-act="nx-cmp-cls:all">Todas</button>'+fams.map(f=>'<button class="cv-chip '+(C.cls===f?'on':'')+'" style="--fc:'+familyColor(dom,f)+'" data-act="nx-cmp-cls:'+safe(f)+'"><i></i>'+safe(f)+'</button>').join('');
 let result='';
 if(sel.length<2){result='<div class="cmp-empty"><div class="cmp-empty-art"><i></i><i></i><i></i></div><h3>Elige al menos dos agentes</h3><p>Verás qué especies cubre cada uno, en qué se diferencian por mecanismo y seguridad, y cuál cubre mejor una especie concreta.</p></div>'}
 else{
  const {cols,gOf,gl}=covData(dom),target=C.target&&allMicro().find(p=>p.id===C.target);
  const orgOpts='<option value="">Sin especie objetivo</option>'+cols.map(p=>'<option value="'+safe(p.id)+'" '+(C.target===p.id?'selected':'')+'>'+safe(p.name)+'</option>').join('');
  const targetRow=target?'<section class="cmp-card"><header><b>Contra '+safe(target.name)+'</b><span>Nivel de cobertura de cada agente elegido</span></header><div class="cmp-target">'+sel.map(a=>{const c=covLevel(a,target),fc=familyColor(a.kingdom,a.family);return '<div class="cmp-tcard" style="--fc:'+fc+'"><div class="cmp-gauge" style="'+gaugeStyle(fc,c.lvl)+'">'+(c.lvl==='N'?'<b>×</b>':'')+'</div><b>'+safe(a.name)+'</b><span class="cmp-lvl">'+(c.lvl?LV[c.lvl].label:'Sin dato')+'</span><small>'+(c.lvl?LV[c.lvl].frac:'—')+' · '+safe(TIER[c.tier]||'sin fuente')+'</small></div>'}).join('')+'</div></section>':'';
  const head='<tr><th>Grupo de especies</th>'+sel.map(a=>'<th style="--fc:'+familyColor(a.kingdom,a.family)+'"><i></i>'+safe(a.name)+'</th>').join('')+'</tr>';
  const body=gl.filter(g=>covData(dom).cols.some(p=>gOf[p.id]===g)).map(g=>{const aggs=sel.map(a=>groupAgg(a,g,dom));const av=aggs.filter(x=>x.known).map(x=>x.avg),diff=aggs.some(x=>!x.known)&&av.length>0||(av.length>1&&Math.max(...av)-Math.min(...av)>=.75);
   return '<tr class="'+(diff?'diff':'')+'"><th style="--g:'+g.color+'"><i></i>'+safe(g.label)+'<small>'+aggs[0].total+' especies</small></th>'+aggs.map((x,i)=>{const fc=familyColor(sel[i].kingdom,sel[i].family);return '<td>'+(x.known?'<div class="cmp-bar"><div style="width:'+(x.avg/4*100).toFixed(0)+'%;background:'+fc+'"></div></div><b>'+x.good+'/'+x.total+'</b><small>'+(x.avg>=3.4?'cubre casi todas':x.avg>=2.4?'cubre buena parte':x.avg>=1.4?'a veces':'rara vez o no')+'</small>':'<span class="cmp-nodata">Sin dato</span>')+'</td>'}).join('')+'</tr>'}).join('');
  const attrs=[['Clase','family'],['Diana y mecanismo','mecanismo'],['Espectro','espectro'],['Usos clínicos','indicaciones'],['Seguridad','seguridad'],['Resistencia','resistencia']];
  const rows=attrs.map(([l,k])=>'<tr><th>'+l+'</th>'+sel.map(a=>'<td>'+safe(k==='family'?(a.family+(a.subgroup?' · '+a.subgroup:'')):(deepTxt(a,k)||a[{mecanismo:'mechanism',espectro:'distinct',indicaciones:'clinical',seguridad:'safety'}[k]]||'—'))+'</td>').join('')+'</tr>').join('');
  result=targetRow+'<section class="cmp-card"><header><b>Cobertura comparada</b><span>Proporción de especies de cada grupo con actividad habitual o casi siempre. Las filas resaltadas son donde los agentes se diferencian.</span></header><div class="cmp-scroll"><table class="cmp-table cov">'+head+body+'</table></div><div class="cmp-foot"><button class="nx-secondary" data-act="nx-view:matriz">Ver la matriz completa</button></div></section>'+
   '<section class="cmp-card"><header><b>Diferencias clave</b><span>Resumen de las fichas; abre cada agente para el detalle y las fuentes.</span></header><div class="cmp-scroll"><table class="cmp-table attr"><tr><th></th>'+sel.map(a=>'<th style="--fc:'+familyColor(a.kingdom,a.family)+'"><i></i><button data-act="nx-find:drug:'+a.kingdom+':'+a.id+'">'+safe(a.name)+'</button></th>').join('')+'</tr>'+rows+'</table></div></section>';
  result='<div class="cmp-targetpick"><label>Especie objetivo<select id="nx-cmp-target">'+orgOpts+'</select></label></div>'+result;
 }
 return '<div class="nx-section-page nx-section-comparar cmp"><div class="cmp-top"><div><h1>Comparador de agentes</h1><p>Elige varios agentes y mira, lado a lado, qué cubren y en qué se diferencian.</p></div><nav class="nx-explore-tabs">'+domTabs+'</nav></div>'+
  '<div class="cmp-layout"><aside class="cmp-picker"><div class="cmp-tray"><b>Tu comparación <em>'+sel.length+'/6</em></b><div class="cmp-tags">'+tray+'</div>'+(sel.length?'<button class="cmp-clear" data-act="nx-cmp-clear">Quitar todos</button>':'')+'</div>'+
  '<div class="cv-searchbox"><span>⌕</span><input id="nx-cmp-q" value="'+safe(C.q)+'" placeholder="Buscar agente…" aria-label="Buscar agente"></div><div class="cmp-chips">'+chips+'</div><div class="cmp-list">'+list+'</div></aside><div class="cmp-main">'+result+'</div></div></div>';
}
function matchOrgs(names){const out=[];(names||[]).forEach(nm=>{const n=normalized(nm);const m=allMicro().find(p=>normalized(p.name).includes(n)||n.includes(normalized(String(p.name).split(' — ')[0]))&&n.length>6);if(m&&!out.includes(m.id))out.push(m.id)});return out}
function labView(){
 const L=NX.lab,syns=(D.syndromes||[]),cur=syns.find(s=>s.id===L.sid),sites=[...new Set(syns.map(s=>s.site))];
 const siteColor=s=>['#3b4fa6','#7a3fe0','#0aa3c2','#1f6fe5','#0e9f6e','#5a54e8','#2f8fe8','#a24be0','#11a7c9','#1fb5a4'][sites.indexOf(s)%10];
 const step=(n,t,on,done)=>'<li class="'+(on?'on ':'')+(done?'done':'')+'"><b>'+(done?'✓':n)+'</b><span>'+t+'</span></li>';
 const picks=L.sp.map(id=>allMicro().find(p=>p.id===id)).filter(Boolean);
 const q=normalized(L.q);const found=q.length>1?allMicro().filter(p=>p.kingdom==='bacteria'&&!L.sp.includes(p.id)&&normalized(p.name).includes(q)).slice(0,8):[];
 let res='';
 if(picks.length){
  const dom=picks[0].kingdom,drugs=domainDrug(dom);
  const wid=cur?labWhoId(cur):'',tierOf=a=>wid?whoTier(wid,a):0;
  const rows=drugs.map(a=>{const cs=picks.map(p=>covLevel(a,p));const known=cs.filter(c=>c.lvl).length;const score=cs.reduce((s,c)=>s+(c.lvl?LV[c.lvl].n:0),0)/(4*picks.length);const full=cs.filter(c=>c.lvl==='Y'||c.lvl==='M').length;return {a,cs,known,score,full,tier:tierOf(a),fc:familyColor(a.kingdom,a.family)}}).filter(r=>r.known>0||r.tier).sort((x,y)=>(x.tier||9)-(y.tier||9)||y.full-x.full||y.score-x.score).slice(0,25);
  const who=(cur&&cur.id&&allDiseases().find(c=>normalized(c.title).includes(normalized(cur.name).slice(0,12))))||null;
  const head='<tr><th>Agente</th><th class="tier-h">Línea OMS</th>'+picks.map(p=>'<th class="sp"><span>'+safe(shortName(p.name))+'</span></th>').join('')+'<th>Cubre</th></tr>';
  const body=rows.map(r=>'<tr class="'+(r.tier?'tier'+Math.floor(r.tier):'')+'" style="--fc:'+r.fc+'"><th><i></i><button data-act="nx-find:drug:'+r.a.kingdom+':'+r.a.id+'">'+safe(r.a.name)+'</button><small>'+safe(r.a.family)+'</small></th><td class="tier-c">'+(r.tier===1?'<span class="tier-b t1">1ª línea</span>':r.tier===1.5?'<span class="tier-b t1" title="La OMS indica cloxacilina; este agente es su equivalente de la misma clase">1ª línea · equivalente</span>':r.tier===2?'<span class="tier-b t2">2ª línea</span>':r.tier===2.5?'<span class="tier-b t2" title="Equivalente de la misma clase">2ª línea · equivalente</span>':'<span class="tier-b t0">Cubre, sin rango OMS</span>')+'</td>'+r.cs.map(c=>'<td>'+gaugeCell(c,r.fc)+(c.lvl==='N'?'<b class="x">×</b>':'')+'</td>').join('')+'<td><div class="lab-score"><div style="width:'+(r.score*100).toFixed(0)+'%;background:'+r.fc+'"></div></div><b>'+r.full+'/'+picks.length+'</b></td></tr>').join('');
  const wc=wid&&typeof WHO!=='undefined'?(WHO.conditions.find(c=>c.id===wid)||(window.ATLAS25.extraConditions||[]).find(c=>c.id===wid)):null;res='<section class="lab-card result"><header><b>3 · Agentes ordenados por línea de tratamiento</b><span>'+(wid?'Primero la <b>1ª línea</b> y luego la <b>2ª línea</b> que '+(window.ATLAS25?.whoTreat?.[wid]?'el manual OMS AWaRe 2022':'la guía de referencia ('+safe(anyTreat(wid).titulo||anyTreat(wid).src||'')+')')+' indica para «'+safe(wc?.title||cur.name)+'» en adultos; después, otros agentes que cubren por espectro. <button class="lab-whobtn" data-act="nx-find:syndrome:'+wid+'">Ver dosis y duración</button>':'Este cuadro no tiene pauta en el manual OMS AWaRe: el orden es solo por cobertura, no por preferencia clínica.')+' No sustituye el antibiograma, el foco, el huésped ni la guía vigente.</span></header>'+(rows.length?'<div class="cmp-scroll"><table class="lab-table">'+head+body+'</table></div>':'<p class="cmp-hint">Ninguno de los agentes tiene datos para estas especies.</p>')+'</section>';
 }
 const side=sites.map(s=>'<div class="lab-site" style="--c:'+siteColor(s)+'"><b><i></i>'+safe(s)+'</b>'+syns.filter(x=>x.site===s).map(x=>'<button class="'+(L.sid===x.id?'on':'')+'" data-act="nx-lab-syn:'+x.id+'">'+safe(x.name)+'</button>').join('')+'</div>').join('');
 return '<div class="nx-section-page nx-section-laboratorio lab"><div class="cmp-top"><div><h1>Laboratorio de decisiones</h1><p>Del cuadro clínico a los agentes que cubren a sus microorganismos probables, en tres pasos.</p></div><ol class="lab-steps">'+step(1,'Elige el cuadro',!cur,!!cur)+step(2,'Ajusta las especies',!!cur&&!picks.length,picks.length>0)+step(3,'Compara agentes',picks.length>0,false)+'</ol></div>'+
  '<div class="lab-layout"><aside class="lab-side"><b class="lab-sidetitle">1 · Cuadro clínico</b>'+side+'</aside><div class="lab-main">'+
  (cur?'<section class="lab-card" style="--c:'+siteColor(cur.site)+'"><header><b>'+safe(cur.name)+'</b><span>'+safe(cur.site)+'</span></header><p>'+safe(cur.summary)+'</p><div class="lab-clues">'+(cur.clues||[]).map(c=>'<span>'+safe(c)+'</span>').join('')+'</div></section>':'<div class="cmp-empty"><div class="cmp-empty-art"><i></i><i></i><i></i></div><h3>Empieza por el cuadro clínico</h3><p>Elige un síndrome a la izquierda. Se cargarán sus microorganismos habituales y podrás ver qué agentes los cubren.</p></div>')+
  (cur?'<section class="lab-card"><header><b>2 · Microorganismos que vas a considerar</b><span>Quita o añade especies según tu contexto</span></header><div class="lab-picks">'+(picks.map(p=>'<span class="lab-pick" style="--g:'+((grps(p.kingdom).find(g=>g.ids.includes(p.id))||{}).color||'#3b4fa6')+'"><i></i>'+safe(shortName(p.name))+'<button data-act="nx-lab-del:'+p.id+'" aria-label="Quitar">×</button></span>').join('')||'<span class="cmp-hint">Sin especies. Añade alguna.</span>')+'</div><div class="cv-searchbox lab-add"><span>⌕</span><input id="nx-lab-q" value="'+safe(L.q)+'" placeholder="Añadir otra especie…" aria-label="Añadir especie"></div>'+(found.length?'<div class="lab-found">'+found.map(p=>'<button data-act="nx-lab-add:'+p.id+'">+ '+safe(p.name)+'</button>').join('')+'</div>':'')+'</section>':'')+res+'</div></div></div>';
}
function exploreShell(inner){
 const tabs=[['mapa','Mapa de relaciones','Del grupo al fármaco'],['matriz','Matriz de cobertura','Muchos agentes, muchas especies'],['especie','Especie → espectro','Lista detallada por especie']].map(([k,l,d])=>'<button class="'+(NX.view===k?'active':'')+'" data-act="nx-view:'+k+'"><b>'+l+'</b><small>'+d+'</small></button>').join('');
 const dom=['bacteria','virus','fungi','parasites'].map(k=>'<button data-act="nx-map-domain:'+k+'" class="'+(NX.domain===k?'active':'')+'" style="--domain:'+shades[k]+'"><span class="nx-domain-pin"></span><b>'+names[k]+'</b><small>'+domainMicro(k).length+'</small></button>').join('');
 return '<div class="nx-explore nxv-'+NX.view+'"><div class="nx-explore-top"><div class="nx-explore-title"><h1>Explorar conexiones</h1><p>Tres formas de leer lo mismo: un mapa, una matriz y una lista por especie.</p></div><nav class="nx-viewtabs" aria-label="Vista">'+tabs+'</nav></div><nav class="nx-explore-tabs" aria-label="Dominios">'+dom+'</nav>'+inner+'</div>';
}
const oldMain=mainPage;
mainPage=function(){
 if(state.route==='inicio')return home();
 if(state.route==='comparar')return compareView();
 if(state.route==='laboratorio')return labView();
 if(state.route==='mapa'){if(NX.view==='matriz')return exploreShell(matrixView());if(NX.view==='especie')return exploreShell(mapExplorer());return exploreShell(relMap());}
 return '<div class="nx-section-page nx-section-'+safe(state.route)+'">'+masthead(state.route)+(state.route==='atb'?atbViewTabs():'')+(state.route==='atb'&&NX.atbView==='esenciales'?essentialView():oldMain())+'</div>';
};
const actBefore=act;
act=function(command){
 const a=String(command).split(':'),op=a[0],value=a.slice(1).join(':');
 switch(op){
 case 'nx-go':NX.drawer=false;return goto(value);
 case 'atb-view':NX.atbView=value;return render();
 case 'ess-g':NX.essG=value;return render();
 case 'ess-via':NX.essVia=value;return render();
 case 'ess-open':NX.essOpen=NX.essOpen===value?'':value;return render();
 case 'nx-home-domain':NX.domain=value;NX.group='all';NX.query='';NX.micro='';NX.drawer=false;return goto('mapa');
 case 'nx-drawer':NX.drawer=!NX.drawer;return render();
 case 'nx-density':NX.compact=!NX.compact;try{localStorage.setItem('infeora-v26-compact',NX.compact?'1':'0')}catch{}return render();
 case 'nx-map-domain':NX.mapGroup='all';NX.domain=value;NX.group='all';NX.micro='';NX.query='';NX.rxQuery='';NX.rxFamily='all';NX.status='relevant';return render();
 case 'fx':{const [k,v]=String(value).split('=');if(k==='reset'){FX.dom='all';FX.shape='all';FX.target='all';FX.newer=false}else if(k==='newer')FX.newer=v==='1';else FX[k]=FX[k]===v?'all':v;return render()}
  case 'hm-mode':NX.homeMode=value;NX.homeQ='';render();document.getElementById('hm-q')?.focus();return;
  case 'hm-lib':NX.drawer=false;if(value==='bacteria'){window.ATLAS24.debug.ui.micro='bacteria'}else{window.ATLAS24.debug.ui.micro=value;window.ATLAS24.debug.ui.selectedMicro=''}return goto('micro');
  case 'nx-motion':{const off=!document.documentElement.classList.contains('motion-off');document.documentElement.classList.toggle('motion-off',off);try{localStorage.setItem('infeora-motion',off?'off':'on')}catch(e){}return render()}
  case 'who-age':WHOUI.age=+value||0;return render();
  case 'nx-view':NX.view=value;if(state.route!=='mapa')return goto('mapa');return render();
 case 'nx-cmp-dom':NX.cmp.dom=value;NX.cmp.ids=[];NX.cmp.cls='all';NX.cmp.q='';NX.cmp.target='';return render();
 case 'nx-cmp-toggle':{const i=NX.cmp.ids.indexOf(value);if(i<0){if(NX.cmp.ids.length<6)NX.cmp.ids.push(value)}else NX.cmp.ids.splice(i,1);return render()}
 case 'nx-cmp-del':NX.cmp.ids=NX.cmp.ids.filter(x=>x!==value);return render();
 case 'nx-cmp-clear':NX.cmp.ids=[];NX.cmp.target='';return render();
 case 'nx-cmp-cls':NX.cmp.cls=value;return render();
 case 'nx-lab-syn':{NX.lab.sid=value;const s=D.syndromes.find(x=>x.id===value);NX.lab.sp=(s&&s.pathogenIds||[]).slice();NX.lab.q='';return render()}
 case 'nx-lab-del':NX.lab.sp=NX.lab.sp.filter(x=>x!==value);return render();
 case 'nx-lab-add':if(!NX.lab.sp.includes(value))NX.lab.sp.push(value);NX.lab.q='';return render();
 case 'nx-mapgroup':if(value==='__none')return render();NX.mapGroup=NX.mapGroup===value?'all':value;NX.micro='';return render();
 case 'nx-cov-toggle':NX.covAll=!NX.covAll;return render();
 case 'nx-cov-class':{if(value==='all')NX.covClasses=[];else{const i=NX.covClasses.indexOf(value);if(i<0)NX.covClasses.push(value);else NX.covClasses.splice(i,1)}return render()}
 case 'nx-cov-group':NX.covGroup=value;return render();
 case 'nx-map-group':NX.group=value;NX.micro='';NX.status='relevant';return render();
 case 'nx-maplv':{let v=NX.mapLv||'YM';v=v.includes(value)?v.replace(value,''):v+value;NX.mapLv=v||value;return render()}
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
  if(type==='drug'){NX.atbView='catalogo';
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
 const id=e.target.id;if(!['nx-explore-query','nx-rx-query','nx-command-input','nx-cov-query','nx-cmp-q','nx-lab-q'].includes(id))return;
 e.stopImmediatePropagation();if(id==='nx-explore-query')NX.query=e.target.value;
 if(id==='nx-rx-query')NX.rxQuery=e.target.value;if(id==='nx-cov-query')NX.covQuery=e.target.value;if(id==='nx-cmp-q')NX.cmp.q=e.target.value;if(id==='nx-lab-q')NX.lab.q=e.target.value;if(id==='nx-command-input')NX.searchQuery=e.target.value;
 const pos=e.target.selectionStart,stop=e.target.selectionEnd;render();
 const input=document.getElementById(id);if(input){input.focus();if(input.setSelectionRange)input.setSelectionRange(pos,stop)}
},true);
document.addEventListener('change',e=>{if(e.target.id==='nx-rx-family'){NX.rxFamily=e.target.value;render()}},true);
document.addEventListener('change',e=>{if(e.target.id==='nx-cov-sort'){NX.covSort=e.target.value;render()}if(e.target.id==='nx-cmp-target'){NX.cmp.target=e.target.value;render()}},true);
(function(){let tip=null;
 const show=(td,ev)=>{tip=document.getElementById('cv-tip');if(!tip)return;
  const a=allDrug().find(x=>x.id===td.dataset.a),p=allMicro().find(x=>x.id===td.dataset.p);if(!a||!p)return;
  const c=covLevel(a,p);
  tip.innerHTML='<b>'+safe(a.name)+' × '+safe(p.name)+'</b><span class="t l'+(c.lvl||'U')+'">'+(c.lvl?LV[c.lvl].label+' · '+LV[c.lvl].frac:'Sin dato')+'</span><small>'+safe((TIER[c.tier]||'Sin fuente documentada')+(c.src?' · '+c.src:''))+'</small>';
  tip.hidden=false;const box=tip.parentElement.getBoundingClientRect();let x=ev.clientX-box.left+14,y=ev.clientY-box.top+16;if(x>box.width-300)x=ev.clientX-box.left-300;tip.style.left=Math.max(6,x)+'px';tip.style.top=y+'px'};
 document.addEventListener('mouseover',e=>{const td=e.target.closest&&e.target.closest('.cv-cell');
  document.querySelectorAll('.cv-hl').forEach(x=>x.classList.remove('cv-hl'));
  if(!td){const t=document.getElementById('cv-tip');if(t)t.hidden=true;return}
  const c=td.dataset.c;document.querySelectorAll('.cv-table [data-c="'+c+'"]').forEach(x=>x.classList.add('cv-hl'));td.parentElement.classList.add('cv-hl');show(td,e)});
 document.addEventListener('mousemove',e=>{const td=e.target.closest&&e.target.closest('.cv-cell');if(td)show(td,e)});
 document.addEventListener('click',e=>{const td=e.target.closest&&e.target.closest('.cv-cell');if(!td)return;NX.covPick={a:td.dataset.a,p:td.dataset.p};
  const sc=document.querySelector('.cv-scroll'),x=sc?sc.scrollLeft:0,y=sc?sc.scrollTop:0,wy=window.scrollY;render();const n=document.querySelector('.cv-scroll');if(n){n.scrollLeft=x;n.scrollTop=y}window.scrollTo(0,wy)});
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
function specStats(items){return ['Y','M','S','R','N'].map(l=>{const n=items.filter(x=>x.c.lvl===l).length;return '<div class="sp-stat"><i class="g l'+l+'" style="'+gaugeStyle('#3b4fa6',l)+'"></i><b>'+n+'</b><span>'+LV[l].short+'</span></div>'}).join('')+'<div class="sp-stat u"><i class="g unknown"></i><b>'+items.filter(x=>!x.c.lvl).length+'</b><span>Sin dato</span></div>'}
function specPanelDrug(a){
 const dom=a.kingdom,{cols,gOf,gl}=covData(dom),fc=familyColor(dom,a.family);
 const cells=cols.map(p=>({p,c:covLevel(a,p)}));
 const groups=gl.map(g=>({g,items:cells.filter(x=>gOf[x.p.id]===g)})).filter(x=>x.items.length);
 const known=cells.filter(x=>x.c.lvl).length;
 return '<section class="nx-spec" style="--fc:'+fc+'" aria-label="Perfil de cobertura"><div class="sp-head"><div><span class="sp-kick">Cobertura sobre '+safe(names[dom]).toLowerCase()+'</span><h2>¿Dónde actúa '+safe(a.name)+'?</h2></div><div class="sp-stats">'+specStats(cells)+'</div></div>'+
  (known===0?'<p class="sp-empty">Este agente aún no tiene perfil de cobertura en el atlas. «Sin dato» no equivale a resistencia.</p>':'')+
  '<div class="sp-groups">'+groups.map(({g,items},gi)=>'<div class="sp-group" style="--g:'+g.color+';--gi:'+gi+'"><header><b>'+safe(g.label)+'</b><small>'+items.filter(x=>x.c.lvl==='Y'||x.c.lvl==='M').length+'/'+items.length+'</small></header><div class="sp-dots">'+items.map(({p,c})=>'<button class="sp-dot '+(c.lvl?'l'+c.lvl:'unknown')+(c.tier==='clase'?' tclase':'')+'" style="'+gaugeStyle(fc,c.lvl)+'" data-act="nx-find:micro:'+p.kingdom+':'+p.id+'" title="'+safe(p.name+' · '+(c.lvl?LV[c.lvl].label+' '+LV[c.lvl].frac:'sin dato'))+'"><span>'+safe(shortName(p.name))+(c.lvl?' · '+LV[c.lvl].frac:'')+'</span></button>').join('')+'</div></div>').join('')+'</div>'+
  '<div class="sp-foot"><button class="nx-secondary" data-act="nx-view:matriz">Ver en la matriz completa</button><span>Relleno = cuánto cubre. Contorno punteado = espectro de clase. Orientativo; no sustituye antibiograma ni guía vigente.</span></div></section>';
}
function specPanelMicro(p){
 const dom=p.kingdom,drugs=domainDrug(dom);
 const items=drugs.map(a=>({a,c:covLevel(a,p)}));
 const fams=[...new Set(drugs.map(a=>a.family))].map(f=>({f,k:items.filter(x=>x.a.family===f&&x.c.lvl)})).filter(x=>x.k.length);
 return '<section class="nx-spec" aria-label="Perfil de cobertura"><div class="sp-head"><div><span class="sp-kick">Agentes relacionados · '+safe(names[dom]).toLowerCase()+'</span><h2>¿Qué agentes cubren a esta especie?</h2></div><div class="sp-stats">'+specStats(items)+'</div></div>'+
  (fams.length===0?'<p class="sp-empty">Aún no hay agentes con perfil para esta especie. «Sin dato» no equivale a resistencia.</p>':'')+
  '<div class="sp-fams">'+fams.map(({f,k},fi)=>{const fc=familyColor(dom,f);return '<div class="sp-fam" style="--fc:'+fc+';--gi:'+fi+'"><header><i></i><b>'+safe(f)+'</b><small>'+k.length+'</small></header><div class="sp-chips">'+k.sort((x,y)=>LV[y.c.lvl].n-LV[x.c.lvl].n).map(({a,c})=>'<button class="sp-chip l'+c.lvl+(c.tier==='clase'?' tclase':'')+'" data-act="nx-find:drug:'+a.kingdom+':'+a.id+'" title="'+safe(LV[c.lvl].label+' · '+LV[c.lvl].frac)+'"><span class="gg" style="'+gaugeStyle(fc,c.lvl)+'"></span>'+safe(a.name)+'<em>'+LV[c.lvl].frac+'</em></button>').join('')+'</div></div>'}).join('')+'</div>'+
  '<div class="sp-foot"><button class="nx-secondary" data-act="nx-view:matriz">Ver en la matriz completa</button><span>Actividad habitual ≠ sensibilidad del aislado ≠ eficacia clínica.</span></div></section>';
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


/* Cabecera de sección: ícono, propósito y conteos reales; color propio por sección */
const SECTION_TONE={micro:'var(--dom,#6b2fc4)',atb:'var(--dom,#6b2fc4)',clinica:'#1f5f73',aprender:'#3e6c8f',fuentes:'#5f6b85',comparar:'#46508e',laboratorio:'#2b7d6a'};
const SECTION_LEAD={micro:'Biología, clínica y espectro de cada especie, organizada por dominio y grupo.',atb:'Mecanismo, espectro, farmacocinética y seguridad de cada agente, por clase y diana.',clinica:'Revisiones por síndrome con el tratamiento del manual OMS AWaRe cuando aplica.',aprender:'Capítulos y lecciones para estudio profundo.',fuentes:'De dónde sale cada dato y cómo interpretarlo.'};
function masthead(route){
 const label=(sections.find(x=>x[0]===route)||[])[1]||'Atlas',I=window.INF_ICON||(()=>'');
 let facts=[];
 if(route==='micro'){facts=[['bacteria',D.pathogens.length,'bacterias'],['virus',domainMicro('virus').length,'virus'],['fungi',domainMicro('fungi').length,'hongos'],['parasites',domainMicro('parasites').length,'parásitos']]}
 else if(route==='atb'){facts=[['bacteria',D.antibiotics.length,'antibióticos'],['virus',domainDrug('virus').length,'antivirales'],['fungi',domainDrug('fungi').length,'antifúngicos'],['parasites',domainDrug('parasites').length,'antiparasitarios']]}
 else if(route==='clinica'){const w=window.ATLAS25?.whoTreat?Object.keys(window.ATLAS25.whoTreat).length:0;facts=[['who',w,'con tratamiento OMS'],['aprender',(window.ATLAS25?.extraConditions||[]).length,'revisiones complementarias']]}
 const ui=window.ATLAS24?.debug?.ui||{},sel=route==='micro'||route==='atb',cur=route==='micro'?(ui.micro||'bacteria'):(ui.drugs||'bacteria');
 const f=facts.map(([ic,n,t])=>sel?'<button class="ms-fact ms-'+ic+(cur===ic?' on':'')+'" data-act="v24-mode:'+(route==='micro'?'micro':'drugs')+':'+ic+'" aria-pressed="'+(cur===ic)+'">'+I(ic)+'<b>'+n+'</b>'+safe(t)+'</button>':'<span class="ms-fact ms-'+ic+'">'+I(ic)+'<b>'+n+'</b>'+safe(t)+'</span>').join('');
 return '<header class="ms" style="--ms:'+(SECTION_TONE[route]||'#3b4fa6')+'"><i class="ms-ic">'+I(route)+'</i><div class="ms-txt"><h1>'+safe(label)+'</h1>'+(SECTION_LEAD[route]?'<p>'+safe(SECTION_LEAD[route])+'</p>':'')+'</div>'+(f?'<div class="ms-facts"'+(sel?' role="group" aria-label="Elegir dominio"':'')+'>'+f+'</div>':'')+'</header>';
}

function atbViewTabs(){const n=Object.keys(ESS()).length,v=NX.atbView||'catalogo',I=window.INF_ICON||(()=>'');return '<nav class="atb-views" role="tablist" aria-label="Vista de antimicrobianos"><button role="tab" aria-selected="'+(v==='catalogo')+'" class="'+(v==='catalogo'?'on':'')+'" data-act="atb-view:catalogo">'+I('atb')+'<span><b>Catálogo completo</b><small>Mecanismo, espectro y revisión ampliada</small></span></button><button role="tab" aria-selected="'+(v==='esenciales')+'" class="'+(v==='esenciales'?'on':'')+'" data-act="atb-view:esenciales">'+I('book')+'<span><b>Fármacos esenciales · '+n+'</b><small>Indicaciones, dosis, duración y seguridad</small></span></button></nav>'}
/* Fármacos esenciales (data/essential-drugs.js): panel «Pauta y uso» en la ficha y vista de catálogo propia */
const ESS=()=>window.ATLAS25?.essential||{};
const essFor=id=>Object.entries(ESS()).filter(([k,v])=>k===id||v.link===id||(v.equiv||[]).includes(id)).map(([k,v])=>({k,v,eq:k!==id&&v.link!==id}));
const ESS_GROUPS=[['pen','Penicilinas',/penicil|aminopenic/i],['ceph','Cefalosporinas',/cefalosporina/i],['macro','Macrólidos y lincosamidas',/macrólido|lincosamida/i],['amino','Aminoglucósidos',/aminoglucós/i],['fq','Fluoroquinolonas',/fluoroquinol/i],['nitro','Nitroimidazoles y nitrofuranos',/nitroimidaz|nitrofur/i],['sulfa','Sulfonamidas y sulfonas',/sulfon/i],['tb','Antituberculosos',/antituberc|rifamicina/i],['tetra','Tetraciclinas',/tetraciclina|ciclina/i],['afung','Antifúngicos',/antifúng/i],['avir','Antivirales y antirretrovirales',/antivir|antirretrov/i],['apal','Antipalúdicos',/antipalúd/i],['ahelm','Antihelmínticos y antiprotozoarios',/antihelm|antiprot|tenicida|antifil/i],['otros','Otros',/./]];
const essGroup=v=>(ESS_GROUPS.find(g=>g[2].test(v.clase||''))||ESS_GROUPS[ESS_GROUPS.length-1]);
function essList(t,items,cls,ic){return items&&items.length?'<div class="ess-box ess-'+cls+'"><h5>'+(window.INF_ICON?INF_ICON(ic):'')+t+'</h5><ul>'+items.map(x=>'<li>'+safe(x)+'</li>').join('')+'</ul></div>':''}
function essPanel(k,v,eq){
 const I=window.INF_ICON||(()=>'');
 const rows=v.dosis.map(d=>'<tr><th>'+safe(d.t)+'</th><td>'+(d.ni?safe(d.ni):'<span class="ess-na">—</span>')+'</td><td>'+(d.ad?safe(d.ad):'<span class="ess-na">—</span>')+'</td></tr>').join('');
 const pop=[['kidney','Función renal',v.renal],['child','Embarazo',v.emb],['blood','Lactancia',v.lact]].filter(x=>x[2]).map(([ic,t,x])=>'<div class="ess-pop"><i>'+I(ic)+'</i><div><b>'+t+'</b><p>'+safe(x)+'</p></div></div>').join('');
 return '<section class="ess-panel" data-ess="'+safe(k)+'"><header><div class="ess-hic">'+I('pill')+'</div><div><span class="ess-kick">Pauta y uso · fármaco esencial</span><h3>'+safe(v.nombre)+'</h3><p>'+safe(v.clase)+' · '+safe(v.via)+(v.act?' · actualizado '+safe(v.act):'')+'</p></div></header>'+
  (eq?'<p class="ess-eq">El manual de referencia describe <b>'+safe(v.nombre)+'</b>, equivalente de la misma clase y con las mismas indicaciones.</p>':'')+
  '<div class="ess-ind"><h4>Indicaciones</h4><ul>'+v.ind.map(x=>'<li>'+safe(x)+'</li>').join('')+'</ul></div>'+
  '<div class="ess-dose"><h4>Dosis por escenario</h4><div class="ess-scroll"><table><thead><tr><th>Escenario</th><th>Niño</th><th>Adulto</th></tr></thead><tbody>'+rows+'</tbody></table></div></div>'+
  (v.dur&&v.dur.length?'<div class="ess-dur"><h4>Duración</h4><div>'+v.dur.map(x=>'<span>'+safe(x)+'</span>').join('')+'</div></div>':'')+
  (pop?'<div class="ess-pops">'+pop+'</div>':'')+
  '<div class="ess-safety">'+essList('Contraindicaciones',v.ci,'ci','nopill')+essList('Precauciones',v.prec,'prec','shield')+essList('Efectos adversos',v.ea,'ea','sepsis')+essList('Interacciones',v.inter,'inter','comparar')+'</div>'+
  (v.notas&&v.notas.length?'<div class="ess-notes">'+v.notas.map(x=>'<p>'+safe(x)+'</p>').join('')+'</div>':'')+
  '<footer>Fuente: '+safe(v.src)+'. Síntesis propia en español; consultar el original y la guía local. Dosis para función renal normal salvo que se indique.</footer></section>';
}
function enhanceEssential(){
 try{
  document.querySelectorAll('.ess-panel').forEach(x=>{if(!x.closest('.ess-view'))x.remove()});
  if(state.route!=='atb'||NX.atbView==='esenciales')return;
  const ui=window.ATLAS24?.debug?.ui,nb=ui&&ui.drugs&&ui.drugs!=='bacteria';
  const id=nb?ui.selectedDrug:(A(state.drug)||D.antibiotics[0]||{}).id;if(!id)return;
  const list=essFor(id);if(!list.length)return;
  const anchor=document.querySelector('.nx-spec')||(nb?document.querySelector('.v24-detail')?.firstElementChild:document.querySelector('.v23-drug-hero'));if(!anchor)return;
  anchor.insertAdjacentHTML('afterend',list.map(x=>essPanel(x.k,x.v,x.eq)).join(''));
 }catch(e){console.warn('essential',e)}
}
const renderEss=render;render=function(){renderEss();enhanceEssential()};
function essentialView(){
 const I=window.INF_ICON||(()=>''),all=Object.entries(ESS()),q=normalized(NX.essQ||''),g=NX.essG||'all',via=NX.essVia||'all';
 const pass=([k,v],skip)=>(skip==='g'||g==='all'||essGroup(v)[0]===g)&&(skip==='via'||via==='all'||(via==='oral'?/oral/i.test(v.via):/inyect/i.test(v.via)))&&(!q||normalized([v.nombre,v.clase,...v.ind].join(' ')).includes(q));
 const list=all.filter(x=>pass(x)).sort((a,b)=>a[1].nombre.localeCompare(b[1].nombre));
 const chip=(key,val,label,n)=>'<button class="fx-chip'+((key==='g'?g:via)===val?' on':'')+(n?'':' empty')+'" style="--t:#2b7d6a" data-act="ess-'+key+':'+val+'" aria-pressed="'+((key==='g'?g:via)===val)+'"><span>'+safe(label)+'</span><em>'+n+'</em></button>';
 const groups=ESS_GROUPS.filter(G=>all.some(([k,v])=>essGroup(v)[0]===G[0]));
 const cards=list.map(([k,v])=>{const d0=v.dosis[0]||{},open=NX.essOpen===k,target=v.link||k,dd=allDrug().find(x=>x.id===target),exists=!!dd;
  return '<article class="ess-card'+(open?' open':'')+'"><header><i>'+I('pill')+'</i><div><h3>'+safe(v.nombre)+'</h3><small>'+safe(v.clase)+'</small></div><span class="ess-via">'+safe(v.via)+'</span></header><p class="ess-cind">'+safe(v.ind.slice(0,2).join(' · '))+'</p><div class="ess-cdose"><b>'+safe(d0.t||'')+'</b><span>Adulto: '+safe(d0.ad||'—')+'</span><span>Niño: '+safe(d0.ni||'—')+'</span></div><div class="ess-cacts"><button data-act="ess-open:'+safe(k)+'" aria-expanded="'+open+'">'+(open?'Ocultar pauta':'Ver pauta completa')+'</button>'+(exists?'<button data-act="nx-find:drug:'+safe(dd.kingdom)+':'+safe(target)+'">Abrir ficha</button>':'')+'</div>'+(open?essPanel(k,v,false):'')+'</article>'}).join('');
 return '<div class="ess-view"><div class="ess-top"><label class="sx-search">'+I('search')+'<span class="sr-only">Buscar fármaco esencial</span><input id="ess-q" placeholder="Buscar por fármaco, clase o indicación" value="'+safe(NX.essQ||'')+'"></label>'+
  '<div class="fx-block"><h4>Clase</h4><div class="fx-chips">'+chip('g','all','Todas',all.filter(x=>pass(x,'g')).length)+groups.map(G=>chip('g',G[0],G[1],all.filter(x=>essGroup(x[1])[0]===G[0]&&pass(x,'g')).length)).join('')+'</div></div>'+
  '<div class="fx-block"><h4>Vía</h4><div class="fx-chips">'+chip('via','all','Todas',all.filter(x=>pass(x,'via')).length)+chip('via','oral','Oral',all.filter(x=>/oral/i.test(x[1].via)&&pass(x,'via')).length)+chip('via','iny','Inyectable',all.filter(x=>/inyect/i.test(x[1].via)&&pass(x,'via')).length)+'</div></div>'+
  '<p class="ess-legal">Pautas sintetizadas en español a partir del manual <b>MSF Essential drugs</b> (ed. 2026), con la página de cada dato. No es una reproducción ni una traducción del libro. Siempre contrastar con la guía local, el antibiograma y la ficha técnica.</p></div>'+
  '<div class="ess-grid">'+(cards||'<p class="sx-empty">Ningún fármaco cumple estos filtros.</p>')+'</div></div>';
}
document.addEventListener('input',e=>{if(e.target.id!=='ess-q')return;NX.essQ=e.target.value;const st=e.target.selectionStart;render();const n=document.getElementById('ess-q');if(n){n.focus();try{n.setSelectionRange(st,st)}catch(_){}}});
/* Facetas del catálogo bacteriano (Microorganismos y Antibióticos) */
const FX={dom:'all',shape:'all',target:'all',newer:false};
window.INF_FXON=micro=>micro?(FX.dom!=='all'||FX.shape!=='all'):(FX.target!=='all'||FX.newer);
window.INF_FX=(micro,x)=>micro?((FX.dom==='all'||x.domain===FX.dom)&&(FX.shape==='all'||INF_SHAPE(x.morphology)[1]===FX.shape)):((FX.target==='all'||INF_TARGET(x.family).key===FX.target)&&(!FX.newer||x.newer===true||x.newer==='True'));
window.INF_LEAF=(micro,x)=>{if(micro){const sh=INF_SHAPE(x.morphology),c=INF_DOMAIN_COLOR[x.domain]||'#3a4fb8';return '<i class="fx-leaf" style="--t:'+c+'" title="'+safe(x.domain+' · '+(x.morphology||''))+'">'+INF_ICON(sh[0])+'</i>'}const t=INF_TARGET(x.family);return '<i class="fx-leaf" style="--t:'+t.color+'" title="'+safe(t.label)+'">'+INF_ICON(t.icon)+'</i>'};
window.INF_FACETS=micro=>{
 const items=micro?D.pathogens:D.antibiotics;
 const chip=(k,v,label,icon,color,n)=>'<button class="fx-chip'+(FX[k]===v?' on':'')+(n?'':' empty')+'" style="--t:'+color+'" data-act="fx:'+k+'='+safe(v)+'" aria-pressed="'+(FX[k]===v)+'">'+(icon?INF_ICON(icon):'')+'<span>'+safe(label)+'</span><em>'+n+'</em></button>';
 const passX=(skip)=>x=>{const s={...FX};if(skip)s[skip]=skip==='newer'?false:'all';return micro?((s.dom==='all'||x.domain===s.dom)&&(s.shape==='all'||INF_SHAPE(x.morphology)[1]===s.shape)):((s.target==='all'||INF_TARGET(x.family).key===s.target)&&(!s.newer||x.newer===true||x.newer==='True'))};
 let html='';
 if(micro){
  const doms=[...new Set(items.map(x=>x.domain))];
  const shapes=['Cocos','Bacilos','Cocobacilos','Curvos y espirales','Sin pared / intracelular','Otras formas'].filter(l=>items.some(x=>INF_SHAPE(x.morphology)[1]===l));
  const shIcon={'Cocos':'coccus','Bacilos':'rod','Cocobacilos':'coccobacillus','Curvos y espirales':'spiral','Sin pared / intracelular':'nowall','Otras formas':'nowall'};
  html='<div class="fx-block"><h4>Tinción y tipo</h4><div class="fx-chips">'+doms.map(d=>chip('dom',d,d,'bacteria',INF_DOMAIN_COLOR[d]||'#3a4fb8',items.filter(x=>x.domain===d&&passX('dom')(x)).length)).join('')+'</div></div>'
   +'<div class="fx-block"><h4>Forma</h4><div class="fx-chips">'+shapes.map(l=>chip('shape',l,l,shIcon[l],'#2f6fe0',items.filter(x=>INF_SHAPE(x.morphology)[1]===l&&passX('shape')(x)).length)).join('')+'</div></div>';
 }else{
  const keys=Object.keys(INF_TARGETS).filter(k=>items.some(x=>INF_TARGET(x.family).key===k));
  html='<div class="fx-block"><h4>Diana del fármaco</h4><div class="fx-chips">'+keys.map(k=>chip('target',k,INF_TARGETS[k][0],k==='multi'?'micro':k,INF_TARGETS[k][1],items.filter(x=>INF_TARGET(x.family).key===k&&passX('target')(x)).length)).join('')+'</div></div>'
   +'<div class="fx-block"><button class="fx-toggle'+(FX.newer?' on':'')+'" data-act="fx:newer='+(FX.newer?'0':'1')+'" aria-pressed="'+FX.newer+'">'+INF_ICON('star')+'<span>Solo agentes recientes</span><em>'+items.filter(x=>(x.newer===true||x.newer==='True')&&passX('newer')(x)).length+'</em></button></div>';
 }
 const n=items.filter(x=>INF_FX(micro,x)).length;
 return '<div class="fx-panel">'+html+(INF_FXON(micro)?'<div class="fx-status"><b>'+n+'</b> de '+items.length+' fichas <button data-act="fx:reset=1">'+INF_ICON('clear')+'Quitar filtros</button></div>':'')+'</div>';
};

/* Ficha de microorganismo: «Antibióticos: por qué sí o por qué no» con la cobertura graduada completa,
   en tres columnas que responden una pregunta clara cada una. */
function whyBlock(p){
 const drugs=domainDrug(p.kingdom).map(a=>({a,c:covLevel(a,p)}));
 const col=(key,title,q,color,ic,levels)=>{const it=drugs.filter(x=>x.c.lvl&&levels.includes(x.c.lvl)).sort((x,y)=>LV[y.c.lvl].n-LV[x.c.lvl].n||x.a.name.localeCompare(y.a.name));
  return '<div class="why-col why-'+key+'" style="--w:'+color+'"><header><i>'+(window.INF_ICON?INF_ICON(ic):'')+'</i><div><h4>'+title+'</h4><p>'+q+'</p></div><b>'+it.length+'</b></header><div class="why-list">'+(it.length?it.slice(0,18).map(({a,c})=>'<button data-act="nx-find:drug:'+a.kingdom+':'+a.id+'" title="'+safe(c.note||'')+'"><span class="why-lv l'+c.lvl+'">'+LV[c.lvl].short+'</span><span class="why-name"><b>'+safe(a.name)+'</b><small>'+safe(a.family||'')+(c.tier==='clase'?' · dato de clase':c.tier==='individual'?' · dato de la especie':'')+'</small></span></button>').join('')+(it.length>18?'<p class="why-more">+'+(it.length-18)+' más en Explorar → Matriz</p>':''):'<p class="why-empty">Ningún agente documentado en esta categoría.</p>')+'</div></div>'};
 const unknown=drugs.filter(x=>!x.c.lvl).length;
 return '<div class="why">'+col('yes','Funciona','Actividad casi siempre o habitual frente a esta especie.','#1f7a55','pill',['Y','M'])+col('maybe','Depende','Solo algunas cepas: necesita antibiograma.','#5a4bb0','maybe',['S','R'])+col('no','No funciona','Sin actividad útil: no usar como cobertura.','#b23a3a','nopill',['N'])+'</div><p class="why-foot"><b>'+unknown+'</b> agentes sin dato para esta especie. «Sin dato» no significa resistencia. Que un fármaco funcione no lo convierte en primera elección: eso depende del foco, del huésped y de la guía.</p>';
}
function enhanceWhy(){
 try{if(state.route!=='micro')return;const box=document.querySelector('#micro-espectro .v20-coveragecats');if(!box)return;
  const ui=window.ATLAS24?.debug?.ui;if(ui&&ui.micro&&ui.micro!=='bacteria')return;
  const m=P(state.micro)||D.pathogens[0],p=allMicro().find(x=>x.id===m.id&&x.kingdom==='bacteria');if(!p)return;
  box.outerHTML=whyBlock(p);
 }catch(e){console.warn('why',e)}
}
const renderWhy=render;render=function(){renderWhy();enhanceWhy()};

/* Mapa premium: cada nodo anima su contenido interno (no su posición), brillo y halo por nodo,
   etiquetas de grupo en cápsulas con su color y núcleo con anillos concéntricos. */
function enhanceMap(){
 try{
  const svg=document.querySelector('.rm-svg');if(!svg||svg.dataset.fx)return;svg.dataset.fx='1';
  const NS='http://www.w3.org/2000/svg',mk=(t,a)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);return e};
  const defs=svg.querySelector('defs')||svg.insertBefore(mk('defs',{}),svg.firstChild);
  defs.insertAdjacentHTML('beforeend','<radialGradient id="rmgloss" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".45" stop-color="#fff" stop-opacity=".08"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></radialGradient>');
  svg.querySelectorAll('.rm-group,.rm-org,.rm-drug,.rm-core').forEach((g,i)=>{
   const inner=mk('g',{class:'rm-in'});inner.style.setProperty('--d',(g.style.getPropertyValue('--d')||((i%40)*14+'ms')));
   while(g.firstChild)inner.appendChild(g.firstChild);g.appendChild(inner);
   const c=inner.querySelector('circle');if(!c)return;const r=+c.getAttribute('r')||8;
   inner.insertBefore(mk('circle',{r:r,fill:'url(#rmgloss)',class:'rm-gloss','pointer-events':'none'}),c.nextSibling);
   if(g.classList.contains('rm-group')||g.classList.contains('rm-core')){inner.insertBefore(mk('circle',{r:r+9,fill:'none',stroke:c.getAttribute('fill'),class:'rm-halo'}),inner.firstChild)}
  });
  const gl=grps(NX.domain);
  svg.querySelectorAll('.rm-glabel').forEach((t,i)=>{try{const b=t.getBBox(),g=gl[i],col=g?g.color:'#3b4fa6';const pad=10;
   const rect=mk('rect',{x:b.x-pad-14,y:b.y-6,width:b.width+pad*2+14,height:b.height+12,rx:(b.height+12)/2,class:'rm-pill',style:'--c:'+col});
   const dot=mk('circle',{cx:b.x-10,cy:b.y+b.height/2,r:5,fill:col,class:'rm-pilldot'});
   t.parentNode.insertBefore(rect,t);t.parentNode.insertBefore(dot,t);t.style.setProperty('--d',(i*45)+'ms');rect.style.setProperty('--d',(i*45)+'ms');dot.style.setProperty('--d',(i*45)+'ms')}catch(e){}});
 }catch(e){console.warn('map fx',e)}
}
const renderMap=render;render=function(){renderMap();enhanceMap()};
/* Tratamiento WHO AWaRe por condición (data/who-aware-treatments.js) */
const WHOUI={age:0,sc:{}};
const whoEsc=x=>String(x==null?'':x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const AWR={A:['Access','Primera línea de uso amplio'],W:['Watch','Mayor riesgo de resistencia: usar con indicación'],R:['Reserve','Último recurso']};
function whoChips(list){return list.length?list.map(d=>'<li class="who-drug who-'+(d.c||'x')+'">'+(d.c?'<b title="'+whoEsc(AWR[d.c][0]+' — '+AWR[d.c][1])+'">'+d.c+'</b>':'')+'<span>'+whoEsc(d.t)+'</span></li>').join(''):''}
function whoPanel(id){
 const T=window.ATLAS25?.whoTreat?.[id]||window.ATLAS25?.oiTreat?.[id]||window.ATLAS25?.msfTreat?.[id];if(!T)return '';const isGuia=T.fuente==='guia',isMsf=T.fuente==='msf'||T.fuente==='nih'||isGuia,isNih=T.fuente==='nih';
 const gi=Math.min(WHOUI.age,T.grupos.length-1),g=T.grupos[gi];
 const abx={no:['Sin antibiótico','who-abx-no'],cond:['Antibiótico solo si hay indicación','who-abx-cond'],si:['Antibiótico indicado','who-abx-si']}[T.abx]||['',''];
 const tabs=T.grupos.length>1?'<div class="who-tabs" role="tablist">'+T.grupos.map((x,i)=>'<button role="tab" aria-selected="'+(i===gi)+'" class="'+(i===gi?'on':'')+'" data-act="who-age:'+i+'">'+whoEsc(x.p)+'</button>').join('')+'</div>':'<div class="who-tabs"><span class="on">'+whoEsc(g.p)+'</span></div>';
 const cards=g.esc.map(e=>'<article class="who-esc"><h3>'+whoEsc(e.t)+'</h3>'+(e.first.length?'<div class="who-line"><h4>Primera elección</h4><ul>'+whoChips(e.first)+'</ul></div>':'')+(e.second.length?'<div class="who-line who-second"><h4>Segunda elección</h4><ul>'+whoChips(e.second)+'</ul></div>':'')+(e.dur?'<p class="who-dur"><b>Duración</b> '+whoEsc(e.dur)+'</p>':'')+(e.nota?'<p class="who-note">'+whoEsc(e.nota)+'</p>':'')+'</article>').join('');
 return '<section class="who-panel" id="who-panel"><header><div><span class="who-abx '+abx[1]+'">'+abx[0]+'</span><h2>'+(isNih?'Tratamiento según la guía NIH de infecciones oportunistas en VIH':isMsf?'Tratamiento según MSF Clinical guidelines':'Tratamiento según el manual OMS AWaRe')+'</h2></div><p>'+whoEsc(T.res)+'</p></header>'+tabs+'<div class="who-grid">'+cards+'</div>'+(T.pat&&T.pat.length?'<p class="who-pat"><b>Patógenos probables</b> '+T.pat.map(whoEsc).join(' · ')+'</p>':'')+(T.alertas&&T.alertas.length?'<ul class="who-alerts">'+T.alertas.map(a=>'<li>'+whoEsc(a)+'</li>').join('')+'</ul>':'')+'<footer>'+(isMsf?'':'<span class="who-legend"><b>A</b> Access <b>W</b> Watch <b>R</b> Reserve</span>')+'<span>Dosis para función renal normal. Fuente: '+whoEsc(T.src)+(isNih?'. Documento de dominio público; síntesis en español con la fuerza de la recomendación entre corchetes (A–C, I–III)':isGuia?'. Síntesis propia en español a partir de las guías citadas; no reproduce su texto':isMsf?'. Síntesis propia en español; no reproduce ni traduce el manual':' ('+whoEsc(T.pag)+'); adaptación no oficial, la OMS no la avala')+'. Contrastar con la edición vigente, el antibiograma local, la función renal, el embarazo y las alergias.</span></footer></section>';
}
function enhanceWho(){
 document.querySelectorAll('.who-panel').forEach(x=>x.remove());
 if(state.route!=='clinica')return;
 try{
  const hero=document.querySelector('.v25-syndrome-hero');if(!hero)return;
  const on=document.querySelector('.v25-clinic-list button.on');
  const has=x=>x&&(window.ATLAS25.whoTreat?.[x]||window.ATLAS25.oiTreat?.[x]||window.ATLAS25.msfTreat?.[x]);const id=has(window.ATLAS25?.reviewUI?.cl?.selected)?window.ATLAS25.reviewUI.cl.selected:(on?(on.getAttribute('data-act')||'').split(':')[1]:'');
  if(id)hero.insertAdjacentHTML('afterend',whoPanel(id));
 }catch(e){console.warn('who panel',e)}
}
const renderWho=render;render=function(){renderWho();enhanceWho()};
/* Texto con identidad: dosis, duraciones, fármacos, microorganismos y alertas se marcan en el cuerpo de lectura */
let HLRE=null;
function hlBuild(){
 const esc=t=>t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 const nm=(list)=>[...new Set(list.map(x=>String(x.name||x.title||'').replace(/\s*\(.*\)$/,'').trim()).filter(n=>n.length>=6))].sort((a,b)=>b.length-a.length).map(esc);
 const drugs=nm(allDrug()),orgs=nm(allMicro());
 const dose='\\d+(?:[.,–\\-]\\d+)?\\s?(?:mg|g|µg|mcg|UI|mL|mEq)(?:\\/kg)?(?:\\/(?:día|dosis|h))?(?:\\s?c\\/\\d+(?:–\\d+)?\\s?h)?|c\\/\\d+(?:–\\d+)?\\s?h|\\d+(?:[–\\-]\\d+)?\\s?(?:días|semanas|meses|horas|h|min)|dosis única|single dose';
 const alert='contraindicad[oa]s?|urgente|emergencia|amenaza (?:de )?vía aérea|sepsis|choque séptico|no (?:se )?(?:recomienda|debe)\\w*|nunca|evitar|sin antibiótico|resistencia|multirresistente';
 const parts=[];
 HLRE={re:new RegExp('(?<![\\wÁ-ú])(?:('+dose+')|('+alert+')'+(drugs.length?'|('+drugs.join('|')+')':'')+(orgs.length?'|('+orgs.join('|')+')':'')+')(?![\\wÁ-ú])','gi'),dg:drugs.length?3:0,og:orgs.length?(drugs.length?4:3):0};
}
function enhanceText(){
 const root=document.querySelector('.nx-main');if(!root)return;
 try{
  if(!HLRE)hlBuild();
  const skip='button,a,input,select,textarea,svg,mark,b,i,em,strong,h1,h2,h3,h4,th,.cv-grid,.rm-wrap,.nx-spec,.who-drug,.who-tabs,script,style,[data-nohl]';
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>{if(n.nodeValue.length<12)return NodeFilter.FILTER_REJECT;const el=n.parentElement;if(!el||!el.closest('p,li,td,.v25-syndrome-context')||el.closest(skip))return NodeFilter.FILTER_REJECT;return NodeFilter.FILTER_ACCEPT}});
  const nodes=[];let n;while((n=walker.nextNode())&&nodes.length<4000)nodes.push(n);
  for(const node of nodes){
   const t=node.nodeValue;HLRE.re.lastIndex=0;if(!HLRE.re.test(t))continue;HLRE.re.lastIndex=0;
   const frag=document.createDocumentFragment();let last=0,m;
   while((m=HLRE.re.exec(t))){
    if(m.index>last)frag.appendChild(document.createTextNode(t.slice(last,m.index)));
    let el;
    if(m[1]){el=document.createElement('mark');el.className='hl-dose'}
    else if(m[2]){el=document.createElement('strong');el.className='hl-alert'}
    else if(HLRE.dg&&m[HLRE.dg]){el=document.createElement('b');el.className='hl-drug'}
    else{el=document.createElement('i');el.className='hl-org'}
    el.textContent=m[0];frag.appendChild(el);last=m.index+m[0].length;
    if(m[0].length===0)HLRE.re.lastIndex++;
   }
   if(last<t.length)frag.appendChild(document.createTextNode(t.slice(last)));
   node.parentNode.replaceChild(frag,node);
  }
 }catch(e){console.warn('hl',e)}
}
const renderHl=render;render=function(){renderHl();enhanceText()};
try{if(localStorage.getItem('infeora-motion')==='off')document.documentElement.classList.add('motion-off')}catch(e){}
/* Movimiento: entrada por sección y revelado al hacer scroll */
let mvRoute=null,mvIO=null;
function enhanceMotion(){
 try{
  const root=document.querySelector('.nx-main');if(!root)return;
  const reduce=document.documentElement.classList.contains('motion-off');
  if(state.route!==mvRoute){mvRoute=state.route;if(!reduce){root.classList.remove('mv-enter');void root.offsetWidth;root.classList.add('mv-enter');setTimeout(()=>root.classList.remove('mv-enter'),1100)}}
  if(reduce||!('IntersectionObserver' in window))return;
  document.documentElement.classList.add('mv-on');
  mvIO&&mvIO.disconnect();
  mvIO=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('mv-in');mvIO.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px',threshold:.06});
  const items=root.querySelectorAll('.v25-syndrome-section,.who-esc,.v23-subcard,.cmp-card,.v24-riskcards>div,.v23-dosegrid>div,.v25-deep-box,.nx-home-domains>*,.v24-book-chapter');
  let i=0;items.forEach(el=>{el.classList.add('mv-item');el.style.setProperty('--mi',String(i++%4));const r=el.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0)el.classList.add('mv-in');else mvIO.observe(el)});
  setTimeout(()=>items.forEach(el=>el.classList.add('mv-in')),4000);
 }catch(e){console.warn('motion',e)}
}
const renderMv=render;render=function(){renderMv();enhanceMotion()};
/* Scroll estable: cada render conserva la posición de la página y de las barras laterales;
   al elegir un elemento en una barra, la barra no se mueve y el artículo se muestra desde su inicio. */
const SCROLL_SEL='.a18-browser,.a18-tree,.v24-sidebar,.v24-items,.v25-clinic-sidebar,.v25-clinic-list,.v23-learn-rail,.cmp-list,.cv-scroll,.v21-sidebar,.v23-comp-sidebar,.v24-compare-sidebar,.nx-explore-browser';
const PICK_OPS=/^(micro-pick|drug-pick|v24-open-micro|v24-open-drug|v25-clinical|tree|fx|v24-fam|v25-clinical-system|v25-clinical-src|v25-clinical-abx|v25-clinical-reset|v24-mode)$/;
const ARTICLE_OPS=/^(micro-pick|drug-pick|v24-open-micro|v24-open-drug|v25-clinical)$/;
let scrollKeep=null;
function snapScroll(){const m={};document.querySelectorAll(SCROLL_SEL).forEach((el,i)=>{const k=el.className.split(' ')[0]+'#'+[...document.querySelectorAll('.'+el.className.split(' ')[0])].indexOf(el);m[k]=[el.scrollTop,el.scrollLeft]});return {route:state.route,y:window.scrollY,m}}
function restoreScroll(snap){if(!snap||snap.route!==state.route)return;document.querySelectorAll(SCROLL_SEL).forEach(el=>{const c=el.className.split(' ')[0],k=c+'#'+[...document.querySelectorAll('.'+c)].indexOf(el),v=snap.m[k];if(v){el.scrollTop=v[0];el.scrollLeft=v[1]}});window.scrollTo({top:snap.y,behavior:'instant'})}
function keepChosenVisible(){document.querySelectorAll('.a18-browser,.v24-items,.v25-clinic-list').forEach(box=>{if(box.scrollHeight<=box.clientHeight+4)return;const on=box.querySelector('.selected,.chosen,.on[data-act^="v25-clinical:"]');if(!on)return;const b=box.getBoundingClientRect(),r=on.getBoundingClientRect();if(r.top<b.top+8)box.scrollTop-=b.top+8-r.top;else if(r.bottom>b.bottom-8)box.scrollTop+=r.bottom-(b.bottom-8)})}
function showArticleStart(){const art=document.querySelector('.v25-clinic-article,.v24-article,.a18-article,.a18-sheet,.v23-article,.v20-article');if(!art)return;const top=art.getBoundingClientRect().top+window.scrollY-84;if(window.scrollY>top+40||innerWidth<=1100)window.scrollTo({top:Math.max(0,top),behavior:'smooth'})}

/* Guía de uso: pasos visibles en las barras laterales y recorrido Anterior/Siguiente en cada ficha */
function stepH(n,t,sub){const d=document.createElement('div');d.className='step-h';d.innerHTML='<b>'+n+'</b>'+t+(sub?' <small>'+sub+'</small>':'');return d}
function trailList(){
 const ui=window.ATLAS24?.debug?.ui||{},q=(state.browserQuery||'').toLowerCase();
 const bact=(state.route==='micro'&&(!ui.micro||ui.micro==='bacteria'))||(state.route==='atb'&&(!ui.drugs||ui.drugs==='bacteria'));
 if(bact){
  const micro=state.route==='micro',arr=(micro?D.pathogens:D.antibiotics).filter(x=>`${x.name} ${x.family||''} ${x.subgroup||''}`.toLowerCase().includes(q)&&(!window.INF_FX||INF_FX(micro,x)));
  const curId=micro?(state.micro||D.pathogens[0].id):(state.drug||D.antibiotics[0].id);
  const gname=x=>micro?(D.groups.find(g=>g.id===x.groupId)?.name||''):(x.family||'');
  return {items:arr.map(x=>({name:x.name,group:gname(x),go:()=>act((micro?'micro-pick:':'drug-pick:')+x.id)})),cur:arr.findIndex(x=>x.id===curId)};
 }
 const box=document.querySelector('.v24-items,.sx-side .v25-clinic-list');if(!box)return null;
 const btns=[...box.querySelectorAll(':scope>button')];
 return {items:btns.map(b=>({name:(b.querySelector('b')||b).innerText.split('\n')[0].trim(),group:b.querySelector('small')?.innerText||'',go:()=>b.click()})),cur:btns.findIndex(b=>b.matches('.chosen,.on'))};
}
function enhanceGuide(){
 try{
  const main=document.querySelector('.nx-main');if(!main)return;
  const kind=state.route==='micro'?'especie':state.route==='atb'?'fármaco':state.route==='clinica'?'síndrome':'';
  if(!kind)return;
  const side=document.querySelector('.a18-browser,.v24-sidebar,.sx-side');
  if(side&&!side.querySelector('.step-h')){
   const f=side.querySelector('.fx-panel,.sx-search,.v24-search'),l=side.querySelector('.a18-tree,.v24-items,.v25-clinic-list');
   if(f)f.parentNode.insertBefore(stepH(1,'Filtra','opcional'),f);
   if(l)l.parentNode.insertBefore(stepH(2,'Elige un'+(kind==='especie'?'a':'')+' '+kind),l);
  }
  const anchor=document.querySelector('.v20-profilehero,.v23-drug-hero,.v24-detail,.v25-syndrome');
  const T=trailList();if(!anchor||!T||T.cur<0)return;
  const it=T.items[T.cur],name=it.name,grp=it.group;
  const bar=document.createElement('nav');bar.className='trail';bar.setAttribute('aria-label','Recorrido de la lista');
  bar.innerHTML='<span class="step-h" style="margin:0"><b>3</b>Lee</span><span class="trail-path">'+(grp?safe(grp)+'<i>›</i>':'')+safe(name)+'</span><span class="trail-pos"><b>'+(T.cur+1)+'</b> de '+T.items.length+' en la lista</span><button data-trail="-1"'+(T.cur===0?' disabled':'')+' title="Anterior (tecla [)">‹ Anterior <kbd>[</kbd></button><button data-trail="1"'+(T.cur===T.items.length-1?' disabled':'')+' title="Siguiente (tecla ])">Siguiente › <kbd>]</kbd></button>';
  anchor.parentNode.insertBefore(bar,anchor);
 }catch(e){console.warn('guide',e)}
}
function trailGo(d){const T=trailList();if(!T||T.cur<0)return;const it=T.items[T.cur+d];if(it){it.go();requestAnimationFrame(showArticleStart)}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-trail]');if(t){e.preventDefault();trailGo(+t.dataset.trail)}});
document.addEventListener('keydown',e=>{if(e.target.closest('input,textarea,select,[contenteditable]')||e.metaKey||e.ctrlKey||e.altKey)return;if(e.key===']')trailGo(1);else if(e.key==='[')trailGo(-1)});
const renderGuide=render;render=function(){renderGuide();enhanceGuide()};

/* Transiciones entre vistas (View Transitions API): al cambiar de sección y al abrir otra ficha.
   Se omiten con movimiento reducido, en navegadores sin soporte y en pruebas automatizadas. */
const vtOK=()=>!!document.startViewTransition&&!navigator.webdriver&&!document.documentElement.classList.contains('motion-off');
const gotoVT=goto;goto=function(route){if(!vtOK()||route===state.route)return gotoVT(route);document.documentElement.dataset.vt='route';const t=document.startViewTransition(()=>gotoVT(route));t.finished.finally(()=>delete document.documentElement.dataset.vt)};
const actVT=act;act=function(command){const op=String(command).split(':')[0];if(vtOK()&&/^(micro-pick|drug-pick|v24-open-micro|v24-open-drug|v25-clinical|v24-mode|who-age|hm-mode)$/.test(op)){document.documentElement.dataset.vt='swap';let r;const t=document.startViewTransition(()=>{r=actVT(command)});t.finished.finally(()=>delete document.documentElement.dataset.vt);return r}return actVT(command)};
const renderScroll=render;render=function(){const snap=scrollKeep||snapScroll();scrollKeep=null;renderScroll();restoreScroll(snap);keepChosenVisible()};
const actScroll=act;act=function(command){const op=String(command).split(':')[0];const r=actScroll(command);if(ARTICLE_OPS.test(op))requestAnimationFrame(showArticleStart);return r};




})();
