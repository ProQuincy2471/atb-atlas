/* Atlas V25: readable territory map, organism editorials, high-density clinical syndrome reviews.
   Preserves original V24/V23 records; evidence states never equate unknown with resistant. */
(function installV25(){
"use strict";
const e=window.ATLAS25||{},d=window.ATLAS24?.debug;if(!d)return;
const Hx=x=>H(String(x??'')),search=x=>String(x??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(),groupList=e.microGroups||[];
let allMicro=[],allDrug=[];
function ensureData(){if(!D||allMicro.length)return;allMicro=[...D.pathogens.map(x=>({...x,kingdom:'bacteria'})),...d.orgs];allDrug=[...D.antibiotics.map(x=>({...x,kingdom:'bacteria'})),...d.drugs];}
const palette={bacteria:'#6b2fc4',virus:'#66751c',fungi:'#0a86b8',parasites:'#d2386c'},labels={bacteria:'Bacterias',virus:'Virus',fungi:'Hongos',parasites:'Parásitos'},domainOrder=['bacteria','virus','fungi','parasites'];
let map={domain:'bacteria',group:'all',micro:'',query:'',family:'all',status:'all',view:'territories'},cl={query:'',system:'all',selected:'who-12'};
const cGroups=()=>[...D.groups.map(g=>({id:g.id,label:g.name,color:grpcolor(g.id),ids:D.pathogens.filter(x=>x.groupId===g.id).map(x=>x.id),concept:'Agrupa especies bacterianas relacionadas por morfología, fisiología y epidemiología; la susceptibilidad debe verificarse por fenotipo y sitio clínico.',diagnosis:'Gram, cultivo, prueba molecular, fenotipo de resistencia y calidad de la muestra.'}))];
const groups=kind=>kind==='bacteria'?cGroups():groupList.filter(g=>g.kingdom===kind);
const selectedGroup=()=>groups(map.domain).find(g=>g.id===map.group);
const ownGroup=p=>groups(p.kingdom).find(g=>g.ids.includes(p.id));
const members=()=>allMicro.filter(p=>p.kingdom===map.domain&&(!selectedGroup()||selectedGroup().ids.includes(p.id))&&(!map.query||search(p.name).includes(search(map.query))));
const getMicro=()=>members().find(p=>p.id===map.micro)||members()[0];
const getRel=(a,p)=>{
 if(a.kingdom==='bacteria'&&p.kingdom==='bacteria'){const r=relation(a.id,p.id);return {status:!r?'unknown':rstatus(r)==='active'?'expected':rstatus(r)==='none'?'excluded':rstatus(r)==='conditional'?'variable':'unknown',text:r?.reason||r?.note||'Par documentado en el catálogo bacteriano.'};}
 return d.relation24(a,p);
};
const value={expected:['Activ. registrada o habitual','✓'],variable:['Condicionada / dependiente','≈'],excluded:['No fiable / no indicada','×'],unknown:['Sin evaluación individual','·']};
function nDrugs(p){return allDrug.filter(a=>a.kingdom===p.kingdom).map(a=>({a,r:getRel(a,p)})).filter(x=>map.family==='all'||x.a.family===map.family)}
function microName(p){return p.name||p.title}
function goToMicro(p){return p.kingdom==='bacteria'?'v25-bact-micro:'+p.id:'v24-open-micro:'+p.id}
function goToDrug(a){return a.kingdom==='bacteria'?'v25-bact-drug:'+a.id:'v24-open-drug:'+a.id}
function headline(num,k,content){return '<div class="v25-overline"><b>'+num+'</b><span>'+Hx(k)+'</span></div>'+content}
function map25(){
 const g=groups(map.domain),mm=members(),p=getMicro(),chosen=p?ownGroup(p):null,pairs=p?nDrugs(p):[],fam=[...new Set(allDrug.filter(a=>a.kingdom===map.domain).map(a=>a.family))].sort(),counts=Object.fromEntries(Object.keys(value).map(t=>[t,pairs.filter(x=>x.r.status===t).length]));
 const bg=palette[map.domain]||'#2767ac';
 return '<div class="v25-map" style="--map-color:'+bg+'"><header class="v25-maphead"><div><span>ATB / ATLAS · CARTOGRAFÍA MICROBIOLÓGICA</span><h1>Territorios, especies y <em>cobertura clínica.</em></h1><p>Explora primero el dominio y la especie; después interpreta mecanismos, actividad documentada y límites. Este mapa no confunde falta de datos con resistencia ni actividad de laboratorio con eficacia clínica.</p></div><div class="v25-map-key"><b>'+allMicro.length+'</b><span>microorganismos en catálogo</span><small>'+g.length+' grupos en el dominio activo</small></div></header>'+
 '<nav class="v25-domainbar" aria-label="Dominios microbiológicos">'+domainOrder.map(kind=>'<button data-act="v25-domain:'+kind+'" class="'+(map.domain===kind?'selected':'')+'" style="--tab:'+palette[kind]+'"><span class="v25-domainmark"></span><b>'+labels[kind]+'</b><small>'+allMicro.filter(x=>x.kingdom===kind).length+' fichas</small></button>').join('')+'</nav>'+
 '<div class="v25-mapgrid"><aside class="v25-territories"><div class="v25-panel-heading"><small>01 · ÁRBOL MICROBIOLÓGICO</small><h2>Selecciona el territorio</h2><p>Grupos con identidad propia, orden taxonómico y dimensión clínica.</p></div><div class="v25-group-list"><button data-act="v25-group:all" class="'+(map.group==='all'?'on':'')+'"><span class="v25-circle" style="background:'+bg+'"></span><span><b>Todos los grupos</b><small>'+allMicro.filter(x=>x.kingdom===map.domain).length+' especies</small></span></button>'+g.map(t=>'<button data-act="v25-group:'+t.id+'" class="'+(map.group===t.id?'on':'')+'" style="--item:'+t.color+'"><span class="v25-circle" style="background:'+t.color+'"></span><span><b>'+Hx(t.label)+'</b><small>'+t.ids.length+' especies</small></span></button>').join('')+'</div></aside>'+
 '<section class="v25-species-panel"><div class="v25-panel-heading"><small>02 · EXPLORAR ORGANISMOS</small><h2>'+Hx(selectedGroup()?.label||labels[map.domain])+'</h2><p>'+Hx(selectedGroup()?.concept||'Selecciona una especie para abrir su microperfil y revisar la actividad farmacológica sin navegar a otro apartado.')+'</p></div><label class="v25-search">Buscar taxón <input id="v25-map-query" value="'+Hx(map.query)+'" placeholder="Especie, género o microorganismo…"></label><div class="v25-species-count">'+mm.length+' resultados · '+(p?'1 seleccionado':'sin selección')+'</div><div class="v25-species-list">'+mm.map(x=>{const gx=ownGroup(x);return '<button data-act="v25-micro:'+x.id+'" class="'+(p?.id===x.id?'on':'')+'" style="--item:'+((gx&&gx.color)||bg)+'"><span class="v25-organ-dot"></span><span><b>'+Hx(microName(x))+'</b><small>'+Hx(gx?.label||(x.groupId||''))+'</small></span><span class="v25-right">›</span></button>'}).join('')+'</div></section>'+
 '<section class="v25-interpret">'+(p?'<div class="v25-current"><small>03 · PERFIL Y COBERTURA</small><h2>'+Hx(microName(p))+'</h2><p>'+Hx(p.biology||p.description||p.morphology||p.name)+'</p><div class="v25-profile-actions"><button data-act="'+goToMicro(p)+'">Abrir review del microorganismo ↗</button></div></div>'+
 '<div class="v25-activity"><div><h3>Actividad según catálogo</h3><p>'+pairs.length+' agentes del dominio · los símbolos describen vínculos, no porcentajes de eficacia</p></div><div class="v25-fourstats">'+Object.keys(value).map(k=>'<button data-act="v25-status:'+k+'" class="'+k+' '+(map.status===k?'on':'')+'"><b>'+counts[k]+'</b><small>'+value[k][0]+'</small></button>').join('')+'</div></div>'+
 '<div class="v25-activity-controls"><label>Familia / subgrupo<select id="v25-map-family"><option value="all">Todas las familias</option>'+fam.map(f=>'<option value="'+Hx(f)+'" '+(map.family===f?'selected':'')+'>'+Hx(f)+'</option>').join('')+'</select></label><button data-act="v25-status:all" class="'+(map.status==='all'?'on':'')+'">Mostrar todas las relaciones</button></div>'+
 '<div class="v25-pair-grid">'+pairs.filter(v=>map.status==='all'||v.r.status===map.status).map(v=>'<article class="v25-pair '+v.r.status+'"><div><span class="v25-pair-symbol">'+value[v.r.status][1]+'</span><span><strong>'+Hx(v.a.name)+'</strong><small>'+Hx(v.a.family)+'</small></span></div><p>'+Hx(v.r.note||v.r.text||'Actividad no documentada a nivel de especie')+'</p><button data-act="'+goToDrug(v.a)+'">Mecanismo y ficha ↗</button></article>').join('')+'</div>'+
 '<div class="v25-map-disclaimer"><b>Interpretación obligatoria</b><p>Una relación «sin evaluar» no es resistencia; actividad habitual no equivale a AST ni éxito clínico. Tratamientos combinados (VIH, HCV, HBV/HDV, malaria, criptococosis) se seleccionan por régimen y fase, no por una celda verde.</p></div>':
 '<div class="v25-map-empty"><h2>No se encontraron especies</h2><p>Borra el filtro o cambia de grupo.</p><button data-act="v25-clear">Limpiar búsqueda</button></div>')+'</section></div></div>';
}
const oldMain=mainPage;
mainPage=function(){
 ensureData();
 if(state.route==='mapa'){return '<div class="v25-mapview"><div class="v25-switch"><button data-act="v25-map-view:territories" class="'+(map.view==='territories'?'on':'')+'">Exploración clínica V25</button><button data-act="v25-map-view:classic" class="'+(map.view==='classic'?'on':'')+'">Mapa anterior / matriz</button></div>'+(map.view==='classic'?oldMain():map25())+'</div>';}
 if(state.route==='clinica')return clinical25();
 return oldMain();
};
const oldAct=act;
act=function(a){
 const [op,...parts]=String(a).split(':'),v=parts.join(':');
 if(op==='v25-map-view'){map.view=v;render();return}
 if(op==='v25-domain'){map.domain=v;map.group='all';map.micro='';map.query='';map.family='all';map.status='all';render();return}
 if(op==='v25-group'){map.group=v;map.micro='';map.status='all';render();return}
 if(op==='v25-micro'){map.micro=v;map.status='all';render();return}
 if(op==='v25-status'){map.status=v;render();return}
 if(op==='v25-clear'){map.query='';render();return}
 if(op==='v25-bact-micro'){state.micro=v;return goto('micro')}
 if(op==='v25-bact-drug'){state.drug=v;return goto('atb')}
 if(op==='v25-clinical'){cl.selected=v;render();return}
 if(op==='v25-clinical-system'){cl.system=v;cl.selected='';render();return}
 if(op==='v25-clinical-src'){cl.src=v;cl.selected='';render();return}
 if(op==='v25-clinical-abx'){cl.abx=v;cl.selected='';render();return}
 if(op==='v25-clinical-reset'){cl.system='all';cl.src='all';cl.abx='all';cl.query='';cl.selected='';render();return}
 return oldAct(a);
};
document.addEventListener('input',event=>{if(!['v25-map-query','v25-clinic-query'].includes(event.target.id))return;const id=event.target.id,st=event.target.selectionStart,en=event.target.selectionEnd;event.stopImmediatePropagation();if(id==='v25-map-query')map.query=event.target.value;else cl.query=event.target.value;render();const el=document.getElementById(id);el?.focus();if(el?.setSelectionRange)el.setSelectionRange(st,en)},true);
document.addEventListener('change',event=>{if(event.target.id==='v25-map-family'){map.family=event.target.value;map.status='all';render()}},true);
const originalRender=render;
render=function(){originalRender();if(state.route==='micro'){if(d.ui.micro==='bacteria')fillBacteria25();else fillMicro25();}};
function fillMicro25(){
 const p=d.orgs.find(x=>x.id===d.ui.selectedMicro);if(!p)return;
 const art=document.querySelector('.v24-detail');if(!art||art.querySelector('.v25-org-review'))return;
 const g=ownGroup(p),highlight=e.speciesInsight?.[p.id]||p.pearl;
 const related=d.drugs.filter(x=>x.kingdom===p.kingdom&&((x.yes||[]).includes(p.id)||(x.variable||[]).includes(p.id)));
 const base=palette[p.kingdom],list=related.slice(0,12);
 const status=related.length?'El atlas registra '+related.length+' agentes vinculados, pero no debe interpretarse como lista de fármacos intercambiables. Priorizar indicación, fase del ciclo biológico, vía, resistencia y órgano.':'No hay una relación terapéutica individual curada para esta especie; no concluir ausencia de tratamiento.';
 const ddx=p.kingdom==='virus'?'Distinguir replicación activa, persistencia de ácidos nucleicos, latencia/reactivación y fenómenos postinfecciosos. No toda PCR positiva equivale a enfermedad.':p.kingdom==='fungi'?'Separar colonización, sensibilización alérgica e invasión tisular. Localización, neutropenia, diabetes, prótesis y biomarcadores modifican la probabilidad preprueba.':'Correlacionar exposición, vector, ciclo vital y estadio invasor. Hallar una forma luminal no demuestra afectación tisular; serología y huevos pueden tener ventanas diagnósticas distintas.';
 const risk=p.kingdom==='virus'?'Valorar inmunidad celular, trasplante, embarazo, comorbilidad pulmonar y temporalidad respecto al inicio de síntomas; la indicación de antiviral depende de ventana y órgano.':p.kingdom==='fungi'?'Buscar inmunosupresión celular/neutropenia, dispositivos, tratamiento azólico previo, alteración de barreras y exposición geográfica. Control de foco puede ser más decisivo que ampliar antifúngicos.':'Preguntar región de nacimiento y viajes, agua y alimentos, vectores, animales, corticoides e inmunodeficiencia. El riesgo de recaída depende de estadio o quistes persistentes.';
 const sourceMap={virus:'https://www.cdc.gov/infectious-diseases/',fungi:'https://www.cdc.gov/fungal/',parasites:'https://www.cdc.gov/dpdx/az.html'};
 const content='<div class="v25-org-review" style="--review-accent:'+(g?.color||base)+'"><header><span>AMPLIACIÓN EDITORIAL · REVIEW DE MICROBIOLOGÍA CLÍNICA</span><h2>Del taxón a la decisión terapéutica</h2><p>Revisión estructurada que integra las propiedades biológicas de esta especie con reconocimiento clínico y fundamentos de tratamiento. Cada bloque se interpreta junto a la ficha individual anterior.</p></header>'+
 '<section id="v25-biology"><span>05 / IDENTIDAD MECANÍSTICA</span><h3>¿Qué lo hace diferente?</h3><p>'+Hx(g?.concept||p.taxonomy)+'</p><div class="v25-editorial-emphasis"><b>Rasgo específico</b><p>'+Hx(highlight)+'</p></div><p>'+Hx(p.biology)+'</p></section>'+
 '<section id="v25-presentation"><span>06 / EPIDEMIOLOGÍA Y HUÉSPED</span><h3>Cuándo considerarlo y a quién afecta</h3><p>'+Hx(risk)+'</p><p><strong>Fenotipo clínico orientador:</strong> '+Hx(p.clinical)+'</p></section>'+
 '<section id="v25-differential"><span>07 / DIAGNÓSTICO DIFERENCIAL</span><h3>La muestra correcta y su significado</h3><p>'+Hx(g?.diagnosis)+'</p><p><strong>Prueba y contexto de esta especie:</strong> '+Hx(p.diagnostics)+'</p><div class="v25-editorial-caution"><b>Interpretación crítica</b><p>'+Hx(ddx)+'</p></div></section>'+
 '<section id="v25-treatment"><span>08 / FARMACOLOGÍA APLICADA</span><h3>Qué tratar, por qué y con qué límites</h3><p>'+Hx(status)+'</p><div class="v25-editorial-related">'+list.map(a=>{let isVariable=(a.variable||[]).includes(p.id);return '<button data-act="v24-open-drug:'+a.id+'"><b>'+Hx(a.name)+'</b><small>'+Hx(a.family)+' · '+(isVariable?'uso condicionado':'actividad / indicación descrita')+'</small><em>Ficha ↗</em></button>'}).join('')+'</div><p><b>Punto de seguridad:</b> '+Hx(p.pearl)+'</p></section>'+
 '<section id="v25-rounds"><span>09 / RONDA DE MEDICINA INTERNA</span><h3>Secuencia clínica de decisión</h3><div class="v25-rounds"><div><small>RECONOCER</small><p>'+Hx(p.clinical)+'</p></div><div><small>CONFIRMAR</small><p>'+Hx(p.diagnostics)+'</p></div><div><small>INDIVIDUALIZAR</small><p>'+Hx(highlight)+'</p></div></div><p>Al reevaluar respuesta comprueba el diagnóstico inicial, la especie, resistencia, sitio, función hepatorrenal, interacción farmacológica y control de foco antes de ampliar espectro.</p><p class="v25-source-note">Base de lectura: Infectious Diseases (Islam, 2023), capítulos de virología, micología y parasitología; actualización general: <a href="'+sourceMap[p.kingdom]+'" target="_blank" rel="noopener noreferrer">CDC ↗</a>. La correlación con el libro es temática, no una transcripción ni una verificación página por página.</p></section></div>';
 art.insertAdjacentHTML('beforeend',content);
 const nav=art.querySelector('.v24-anchor');nav?.insertAdjacentHTML('beforeend','<a href="#v25-biology">Revisión avanzada</a><a href="#v25-differential">Diagnóstico crítico</a><a href="#v25-rounds">Ronda clínica</a>');
}

function fillBacteria25(){
 const p=D.pathogens.find(x=>x.id===state.micro),art=document.querySelector('.a18-article');
 if(!p||!art||art.querySelector('.v25-org-review'))return;
 const g=D.groups.find(x=>x.id===p.groupId),ed=typeof MICRO_EDU!=='undefined'?(MICRO_EDU[p.id]||{}):{},deep=typeof E19!=='undefined'?(E19.organisms[p.id]||{}):{},rel=relsP(p.id);
 const risk=Array.isArray(ed.risk)?ed.risk.join('; '):deep.risk||'';
 const path=ed.pathophys||deep.pathophysiology||p.identity;
 const diagnosis=deep.diagnosis||ed.diagnosis||'Seleccionar muestra pertinente al órgano afectado y corroborar identificación de especie. Interpretar susceptibilidad por fenotipo, no por apariencia al Gram.';
 const refs=(p.referenceKeys||[]).map(id=>D.guides?.[id]).filter(x=>x?.url);
 const pairs=rel.filter(x=>['active','conditional','none'].includes(rstatus(x))).slice(0,10);
 const html='<div class="v25-org-review v25-bacteria-review" style="--review-accent:'+grpcolor(p.groupId)+'"><header><span>MICROBIOLOGÍA BACTERIANA · DOSSIER AVANZADO</span><h2>Identidad → virulencia → diagnóstico → antibioterapia</h2><p>Ficha adicional para interpretar la especie, su fenotipo y el significado clínico de los resultados. Las relaciones preliminares del catálogo se muestran por separado de inferencias farmacológicas.</p></header>'+
 '<section id="v25-bacterial-identity"><span>07 / MORFOLOGÍA Y ECOLOGÍA</span><h3>Identificación contextual</h3><p><b>Especie y morfología:</b> '+Hx(p.name)+' · '+Hx(p.morphology)+'. '+Hx(ed.definition||p.identity)+'</p>'+(deep.reservoir?'<p><b>Reservorio:</b> '+Hx(deep.reservoir)+'</p>':'')+'</section>'+
 '<section><span>08 / PATOGENIA</span><h3>De colonización a lesión</h3><p>'+Hx(path)+'</p>'+(risk?'<div class="v25-editorial-emphasis"><b>Huésped y factores de riesgo</b><p>'+Hx(risk)+'</p></div>':'')+'</section>'+
 '<section><span>09 / SÍNDROMES Y DIFERENCIAL</span><h3>Cuándo sospechar infección verdadera</h3><p>'+Hx(p.clinical)+'</p><p>'+Hx(p.identity)+'</p><div class="v25-editorial-caution"><b>Problema diagnóstico específico</b><p>'+Hx(p.pearl)+'</p></div></section>'+
 '<section><span>10 / CONFIRMACIÓN MICROBIOLÓGICA</span><h3>Pruebas y calidad de evidencia</h3><p>'+Hx(diagnosis)+'</p><p>Un cultivo de sitio no estéril puede representar colonización. Un aislamiento en sangre, LCR u otro compartimento estéril tiene significado diferente; la decisión depende de número de muestras, sitio, huésped, clínica y fenotipo de susceptibilidad.</p></section>'+
 '<section><span>11 / SUSCEPTIBILIDAD Y RESPUESTA</span><h3>Antibióticos individualizados</h3><p>'+rel.length+' relaciones disponibles en el catálogo; '+pairs.length+' con estado de actividad explícito. Este inventario no constituye un antibiograma local ni un orden de preferencias.</p><div class="v25-editorial-related">'+pairs.map(rx=>'<button data-act="v25-bact-drug:'+rx.antibiotic+'"><b>'+Hx(A(rx.antibiotic)?.name||rx.antibiotic)+'</b><small>'+Hx(rstatus(rx))+' · '+Hx((rx.note||'').slice(0,85))+'</small><em>Ficha ↗</em></button>').join('')+'</div><p><b>Perla terapéutica:</b> '+Hx(deep.pearl||ed.distinct||p.pearl)+'</p></section>'+
 '<section><span>12 / RONDA DE RESIDENCIA</span><h3>Interpretación de un aislamiento</h3><div class="v25-rounds"><div><small>RECONOCER</small><p>'+Hx(p.identity)+'</p></div><div><small>CONFIRMAR</small><p>'+Hx(diagnosis)+'</p></div><div><small>NO CONFUNDIR</small><p>'+Hx(p.pearl)+'</p></div></div><div class="v25-sources-inline">'+refs.map(r=>'<a href="'+Hx(r.url)+'" target="_blank" rel="noopener noreferrer">'+Hx(r.title)+' ↗</a>').join('')+'</div></section></div>';
 art.insertAdjacentHTML('beforeend',html);
}


function clinicFilters(all,base,pass,candidates,c,sys,abxOf,srcOf){
 const I=window.INF_ICON||(()=>''),S=window.INF_SYS||(()=>({color:'#3a5a9a',icon:'clinica'})),TT=window.INF_TERRITORIES||[];
 const cnt=f=>base.filter(f).length;
 const seg=(key,val,label,icon,n)=>'<button class="sx-seg'+((cl[key]||'all')===val?' on':'')+'" data-act="v25-clinical-'+key+':'+val+'" aria-pressed="'+((cl[key]||'all')===val)+'">'+(icon?I(icon):'')+'<span>'+Hx(label)+'</span><em>'+n+'</em></button>';
 const known=new Set(TT.flatMap(t=>t[3].map(x=>x[0])));
 const groups=TT.map(([k,l,col,items])=>{const its=items.filter(([s])=>sys.includes(s));if(!its.length)return '';
   return '<div class="sx-terr" style="--t:'+col+'"><h4>'+Hx(l)+'</h4><div class="sx-chips">'+its.map(([s,ic])=>{const n=cnt(x=>x.system===s&&pass(x,'system'));return '<button class="sx-chip'+(cl.system===s?' on':'')+(n?'':' empty')+'" data-act="v25-clinical-system:'+Hx(s)+'" aria-pressed="'+(cl.system===s)+'" title="'+Hx(s)+'">'+I(ic)+'<span>'+Hx(s)+'</span><em>'+n+'</em></button>'}).join('')+'</div></div>'}).join('')
  +(sys.filter(s=>!known.has(s)).length?'<div class="sx-terr"><h4>Otros</h4><div class="sx-chips">'+sys.filter(s=>!known.has(s)).map(s=>'<button class="sx-chip'+(cl.system===s?' on':'')+'" data-act="v25-clinical-system:'+Hx(s)+'">'+I('clinica')+'<span>'+Hx(s)+'</span><em>'+cnt(x=>x.system===s&&pass(x,'system'))+'</em></button>').join('')+'</div></div>':'');
 const active=[cl.system!=='all'&&cl.system,cl.src&&cl.src!=='all'&&(cl.src==='who'?'Manual OMS':'Revisión complementaria'),cl.abx&&cl.abx!=='all'&&({no:'Sin antibiótico',cond:'Antibiótico si hay indicación',si:'Antibiótico indicado'}[cl.abx])].filter(Boolean);
 return '<label class="sx-search">'+I('search')+'<span class="sr-only">Buscar enfermedad</span><input id="v25-clinic-query" placeholder="Buscar enfermedad, órgano o síndrome" value="'+Hx(cl.query)+'"></label>'
  +'<div class="sx-row"><h4>Fuente</h4><div class="sx-segs">'+seg('src','all','Todas','',cnt(x=>pass(x,'src')))+seg('src','who','Manual OMS','who',cnt(x=>srcOf(x)==='who'&&pass(x,'src')))+seg('src','rev','Revisión','aprender',cnt(x=>srcOf(x)==='rev'&&pass(x,'src')))+'</div></div>'
  +'<div class="sx-row"><h4>¿Requiere antibiótico? <small>según OMS</small></h4><div class="sx-segs sx-abx">'+seg('abx','all','Todos','',cnt(x=>pass(x,'abx')))+seg('abx','no','No','nopill',cnt(x=>abxOf(x)==='no'&&pass(x,'abx')))+seg('abx','cond','A veces','maybe',cnt(x=>abxOf(x)==='cond'&&pass(x,'abx')))+seg('abx','si','Sí','pill',cnt(x=>abxOf(x)==='si'&&pass(x,'abx')))+'</div></div>'
  +'<details class="sx-terrs"'+(innerWidth>1100||cl.system!=='all'?' open':'')+'><summary>'+I('filter')+'Territorio y sistema</summary><div class="v25-clinic-systems"><button class="sx-chip sx-allchip'+(cl.system==='all'?' on':'')+'" data-act="v25-clinical-system:all" aria-pressed="'+(cl.system==='all')+'"><span>Todos los sistemas</span><em>'+cnt(x=>pass(x,'system'))+'</em></button>'+groups+'</div></details>'
  +'<div class="sx-status"><b>'+candidates.length+'</b> de '+all.length+' enfermedades'+(active.length?'<span>'+active.map(Hx).join(' · ')+'</span><button data-act="v25-clinical-reset:1">'+I('clear')+'Limpiar</button>':'')+'</div>'
  +'<div class="v25-clinic-list">'+(candidates.length?candidates.map(x=>{const m=S(x.system),ab=abxOf(x);return '<button data-act="v25-clinical:'+x.id+'" class="'+(x.id===c?.id?'on':'')+'" style="--t:'+m.color+'"><i class="sx-tile">'+I(m.icon)+'</i><span><b>'+Hx(x.title)+'</b><small>'+Hx(x.system)+'</small></span><span class="sx-tags">'+(srcOf(x)==='who'?'<em class="sx-who" title="Manual OMS AWaRe">OMS</em>':'<em class="sx-rev" title="Revisión complementaria">REV</em>')+(ab?'<em class="sx-ab sx-ab-'+ab+'" title="'+({no:'Sin antibiótico',cond:'Antibiótico si hay indicación',si:'Antibiótico indicado'}[ab])+'">'+I(ab==='no'?'nopill':ab==='cond'?'maybe':'pill')+'</em>':'')+'</span></button>'}).join(''):'<p class="sx-empty">Ningún síndrome cumple estos filtros. <button data-act="v25-clinical-reset:1">Quitar filtros</button></p>')+'</div>';
}
function clinical25(){
 const who=(typeof WHO!=='undefined'?WHO.conditions:[]),extras=e.extraConditions||[],all=[...who,...extras],sys=[...new Set(all.map(c=>c.system))];
 const WT=window.ATLAS25.whoTreat||{},abxOf=c=>WT[c.id]?.abx||'',srcOf=c=>c.id.startsWith('who-')?'who':'rev';
 const base=all.filter(c=>(!cl.query||search(c.title).includes(search(cl.query))));
 const pass=(c,skip)=>(skip==='system'||cl.system==='all'||c.system===cl.system)&&(skip==='src'||!cl.src||cl.src==='all'||srcOf(c)===cl.src)&&(skip==='abx'||!cl.abx||cl.abx==='all'||abxOf(c)===cl.abx);
 const candidates=base.filter(c=>pass(c));
 const c=candidates.find(c=>c.id===cl.selected)||candidates[0],record=c&&e.conditions?.[c.id],isWho=c?.id.startsWith('who-'),r=c&&isWho?window.ATLAS_CLINICAL23?.get(c):null,dat=record||c?.details;
 if(c)cl.selected=c.id;
 return '<div class="v25-clinic"><header class="v25-clinic-head"><span>INFEORA / REVISIÓN CLÍNICA POR SÍNDROME</span><h1>Síndromes infecciosos, <em>del diagnóstico al seguimiento.</em></h1><p>Fichas orientadas a Medicina Interna: reconocimiento, epidemiología, diferencial, pruebas dirigidas, decisiones terapéuticas y complicaciones. El contenido WHO disponible representa el índice; la revisión complementaria se identifica por separado.</p></header><div class="v25-clinic-layout"><aside class="v25-clinic-sidebar sx-side">'+clinicFilters(all,base,pass,candidates,c,sys,abxOf,srcOf)+'</aside><main class="v25-clinic-article">'+(c?syndromeReview(c,dat,r):'<p>Selecciona otro sistema o limpia el buscador.</p>')+'</main></div></div>';
}
function clinicalReferences(c){
 const refs=[["WHO AWaRe · manual 2022","https://www.who.int/publications/i/item/9789240062382"]];
 const id=c.id||"",domain=c.domain||"",system=c.system||"";
 if(id==="infective-endocarditis")refs.push(["ESC · Endocarditis 2023","https://doi.org/10.1093/eurheartj/ehad193"]);
 if(["who-23","who-34"].includes(id))refs.push(["IDSA · ITU complicada 2025","https://www.idsociety.org/practice-guideline/complicated-urinary-tract-infections/"]);
 if(["who-12","who-27","who-28","viral-pneumonia"].includes(id))refs.push(["ATS/IDSA · Neumonía","https://www.idsociety.org/practice-guideline/community-acquired-pneumonia-cap-in-adults"]);
 if(["who-16","who-17","who-18","who-37","who-38"].includes(id))refs.push(["IDSA · Piel y tejidos blandos","https://www.idsociety.org/practice-guideline/skin-and-soft-tissue-infections/"]);
 if(id==="who-33")refs.push(["IDSA/SHEA · C. difficile","https://www.idsociety.org/practice-guideline/clostridioides-difficile/"]);
 if(id==="who-24")refs.push(["Surviving Sepsis Campaign","https://www.sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-2021-guidelines"]);
 if(domain==="fungi")refs.push(["IDSA · Candidiasis","https://www.idsociety.org/practice-guideline/candidiasis/"]);
 if(domain==="virus")refs.push(["NIH · Infecciones oportunistas","https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-opportunistic-infections/introduction"]);
 if(domain==="parasites")refs.push(["CDC DPDx · Parasitología","https://www.cdc.gov/dpdx/az.html"]);
 if(system==="Medicina tropical")refs.push(["CDC · Enfermedades infecciosas","https://www.cdc.gov/infectious-diseases/"]);
 if(id.startsWith("who-"))refs.push(["IDSA 2026 · AMR","https://www.idsociety.org/practice-guideline/amr-guidance/"]);
 return refs;
}
window.ATLAS25=window.ATLAS25||{};

window.ATLAS25.drugDeep=window.ATLAS25.drugDeep||{};
window.ATLAS25.drugDeepHTML=function(id){
 const d=window.ATLAS25.drugDeep[id];if(!d)return '';
 const blocks=[['mecanismo','Mecanismo de acción'],['espectro','Espectro de actividad'],['farmacocinetica','Farmacocinética y distribución'],['indicaciones','Usos clínicos'],['seguridad','Efectos adversos, interacciones y precauciones'],['resistencia','Mecanismos de resistencia'],['notas','Notas de vigencia y límites de la fuente']];
 const body=blocks.filter(([k])=>d[k]&&d[k].length).map(([k,t],i)=>'<article class="v25-md-block"><span>'+String(i+1).padStart(2,'0')+'</span><h3>'+Hx(t)+'</h3>'+d[k].map(x=>'<p>'+Hx(x)+'</p>').join('')+'</article>').join('');
 return '<section class="v20-section v25-microdeep" id="drug-profundo"><div class="v20-section-title"><span class="v20-sectionnum">+</span><div><small>REVISIÓN AMPLIADA · '+Hx(d.reviewed||'')+'</small><h2>Farmacología en profundidad</h2></div></div><div class="v20-section-body">'+body+'<p class="v25-md-src"><b>Trazabilidad:</b> '+(d.src||[]).map(Hx).join(' · ')+'. Síntesis editorial original sin dosis no citadas; contrastar con ficha técnica y guías vigentes.</p></div></section>';
};
const dps=window.drugPageSections;
if(typeof dps==='function')window.drugPageSections=function(a){return dps(a)+window.ATLAS25.drugDeepHTML(a.id)};
window.ATLAS25.microDeepHTML=function(id){
 const d=window.ATLAS25.microDeep?.[id];if(!d)return '';
 const blocks=[['biologia','Biología y estructura'],['patogenia','Patogenia y factores de virulencia'],['epidemiologia','Epidemiología y transmisión'],['clinica','Manifestaciones clínicas'],['diagnostico','Diagnóstico de laboratorio'],['diferencial','Diagnóstico diferencial y confusiones frecuentes'],['tratamiento','Tratamiento'],['resistencia','Resistencia'],['complicaciones','Complicaciones y seguimiento']];
 const body=blocks.filter(([k])=>d[k]&&d[k].length).map(([k,t],i)=>'<article class="v25-md-block"><span>'+String(i+1).padStart(2,'0')+'</span><h3>'+Hx(t)+'</h3>'+d[k].map(x=>'<p>'+Hx(x)+'</p>').join('')+'</article>').join('');
 return '<section class="v20-section v25-microdeep" id="micro-profundo"><div class="v20-section-title"><span class="v20-sectionnum">+</span><div><small>REVISIÓN AMPLIADA · '+Hx(d.reviewed||'')+'</small><h2>Del laboratorio a la decisión clínica</h2></div></div><div class="v20-section-body">'+body+'<p class="v25-md-src"><b>Trazabilidad:</b> '+(d.src||[]).map(Hx).join(' · ')+'. Síntesis editorial original a partir de las obras citadas; contenido educativo, no sustituye la guía local ni el antibiograma.</p></div></section>';
};
function deepReview(id){
 const d=window.ATLAS25?.deepReviews?.[id];if(!d)return '';
 const list=a=>'<ul>'+a.map(x=>'<li>'+Hx(x)+'</li>').join('')+'</ul>',cr=d.criteria;
 return '<section id="v25-syn-deep" class="v25-syndrome-section v25-deep"><header><b>+</b><div><span>REVISIÓN AMPLIADA · '+Hx(d.reviewed)+'</span><h2>'+Hx(d.title)+': algoritmo, decisiones y seguimiento</h2></div></header>'+
 '<p class="v25-deep-lead">'+Hx(d.summary)+'</p>'+
 '<div class="v25-deep-box"><h3>'+Hx(cr.label)+'</h3><div class="v25-deep-cols"><div><b>Criterios principales</b>'+list(cr.major)+'</div><div><b>Criterios menores y notas</b>'+list(cr.minor)+'</div></div><p class="v25-deep-rule">'+Hx(cr.rule)+'</p></div>'+
 '<h3>Algoritmo paso a paso</h3><ol class="v25-deep-steps">'+d.algorithm.map(a=>'<li><b>'+Hx(a.t)+'</b><p>'+Hx(a.x)+'</p></li>').join('')+'</ol>'+
 '<h3>Decisiones terapéuticas según escenario</h3><div class="v25-deep-table" role="table"><div role="row" class="v25-deep-th"><span>Escenario</span><span>Conducta orientada por la guía</span><span>Matiz</span></div>'+d.decisions.map(x=>'<div role="row"><b>'+Hx(x.c)+'</b><span>'+Hx(x.p)+'</span><small>'+Hx(x.n)+(x.s?'<em class="v25-deep-src">Fuente: '+Hx(x.s)+'</em>':'')+'</small></div>').join('')+'</div>'+
 '<div class="v25-syndrome-context"><b>'+Hx(d.steroid.title)+'</b><p>'+Hx(d.steroid.x)+'</p></div>'+
 '<h3>Complicaciones</h3><dl class="v25-deep-dl">'+d.complications.map(x=>'<div><dt>'+Hx(x.n)+'</dt><dd>'+Hx(x.x)+'</dd></div>').join('')+'</dl>'+
 '<div class="v25-syndrome-context"><b>Si no mejora</b><p>'+Hx(d.failure)+'</p></div>'+
 '<div class="v25-deep-cols"><div><h3>Seguimiento</h3>'+list(d.followup)+'</div><div><h3>Errores frecuentes</h3>'+list(d.pitfalls)+'</div></div>'+
 '<h3>Referencias de esta revisión</h3><ul class="v25-deep-refs">'+d.references.map(r=>'<li><a target="_blank" rel="noopener noreferrer" href="'+Hx(r.u)+'">'+Hx(r.t)+' ↗</a></li>').join('')+'</ul><p class="v25-deep-note">Síntesis editorial para educación; sin dosis no citadas en la guía. Contrastar con la versión vigente de la guía, el antibiograma local, la función renal y el juicio clínico.</p></section>';
}
function syndromeReview(c,data,legacy){
 const headings=[['01','RECONOCIMIENTO','Presentación y factores que cambian la probabilidad'],['02','ETIOLOGÍA','Microorganismos y mecanismos relevantes'],['03','DIAGNÓSTICO DIFERENCIAL','Qué enfermedades se parecen y cómo separarlas'],['04','PRUEBAS','Estudios iniciales, confirmación e interpretación'],['05','MANEJO','Tratamiento, foco y decisiones terapéuticas'],['06','EVOLUCIÓN','Complicaciones, vigilancia y criterios de cambio']];
 const source='https://www.who.int/publications/i/item/9789240062382',i25='https://www.idsociety.org/practice-guideline/amr-guidance/',id=c.id;
 const narrative=Array.isArray(data)?data:[c.overview||'',c.pathogens?.join(', ')||'',c.why||'',c.overview||'',c.why||'',c.redflags?.join(', ')||''];
 const story=[
 [narrative[0],legacy?.presentation],
 [narrative[1],c.pathogens?.length?c.pathogens.join('; '):null],
 [narrative[2],null],
 [narrative[3],legacy?.diagnosis],
 [narrative[4],legacy?.management],
 [narrative[5],legacy?.pitfall]
 ];
 const k=c.system?.toLowerCase()||'clinica',isSpecial=!id.startsWith('who-');
 const colors={'respiratorio':'#3d74b6','cardiovascular':'#bd6278','neurología':'#645ab9','urinario':'#4985ba','hepatobiliar':'#4a81a9','medicina tropical':'#2c8f76','inmunodeficiencia':'#a46da0'};
 const color=(window.INF_SYS?window.INF_SYS(c.system).color:null)||colors[k]||'#316d96',sysIcon=window.INF_ICON?window.INF_ICON(window.INF_SYS(c.system).icon,'sx-heroic'):'';
 const focus=isSpecial&&c.domain!=='bacteria'?(c.domain==='virus'?'Virus':c.domain==='fungi'?'Hongo':'Parásito'):'Síndrome bacteriano / diferencial integral';
 return '<article class="v25-syndrome" style="--syndrome:'+color+'"><header class="v25-syndrome-hero">'+sysIcon+'<span>FICHA CLÍNICA / '+Hx(c.system).toUpperCase()+' / '+focus.toUpperCase()+'</span><h1>'+Hx(c.title)+'</h1><p>'+Hx(narrative[0])+'</p><div class="v25-review-meta"><span>MEDICINA INTERNA</span><span>DIAGNÓSTICO</span><span>FARMACOLOGÍA</span><span>EVOLUCIÓN</span></div></header><nav class="v25-syndrome-nav">'+headings.map(([n,k])=>'<a href="#v25-syn-'+n+'">'+n+' '+Hx(k.charAt(0)+k.slice(1).toLowerCase())+'</a>').join('')+(window.ATLAS25?.deepReviews?.[id]?'<a href="#v25-syn-deep">+ Revisión ampliada</a>':'')+'</nav>'+
 headings.map(([n,tag,title],idx)=>'<section id="v25-syn-'+n+'" class="v25-syndrome-section"><header><b>'+n+'</b><div><span>'+Hx(tag)+'</span><h2>'+Hx(title)+'</h2></div></header>'+story[idx].filter(Boolean).map((x,j)=>j===0?'<p>'+Hx(x)+'</p>':'<div class="v25-syndrome-context"><b>Correlación y matiz clínico</b><p>'+Hx(x)+'</p></div>').join('')+(idx===4&&Array.isArray(c.first)&&c.first.length?'<div class="v25-clinical-rx">'+c.first.map(x=>'<div><b>'+Hx(x.drug)+'</b><p>'+Hx(x.dose)+'</p></div>').join('')+'</div>':'')+'</section>').join('')+deepReview(id)+
 '<section class="v25-syndrome-section v25-syn-summary"><header><b>07</b><div><span>SÍNTESIS</span><h2>Cómo pensar este síndrome en una guardia</h2></div></header><div class="v25-syndrome-steps">'+[['SOSPECHAR',narrative[0]],['CONFIRMAR',narrative[3]],['TRATAR',narrative[4]],['REVALORAR',narrative[5]]].map(([a,b])=>'<div><b>'+a+'</b><p>'+Hx(b)+'</p></div>').join('')+'</div></section>'+
 '<footer class="v25-syndrome-foot"><b>BIBLIOGRAFÍA Y TRAZABILIDAD</b><p>'+(isSpecial&&c.domain==='bacteria'?'Revisión editorial complementaria; no deriva de dosis del manual WHO. Contrastar con las guías citadas y con la microbiología local.':isSpecial?'Review complementario de infección viral, fúngica o parasitaria; contrastar guías del patógeno específico.':'El índice WHO AWaRe solo documenta que existe un capítulo; los apartados clínicos proceden de síntesis original y revisiones adicionales, no de dosis WHO extraídas.')+'</p>'+clinicalReferences(c).map(([title,url])=>'<a target="_blank" rel="noopener noreferrer" href="'+Hx(url)+'">'+Hx(title)+' ↗</a>').join('')+'</footer></article>';
}
window.ATLAS25.reviewUI={map,cl,groups,members,clinical25};
})();
