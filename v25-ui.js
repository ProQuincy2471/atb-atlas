/* Atlas V25: readable territory map, organism editorials, high-density clinical syndrome reviews.
   Preserves original V24/V23 records; evidence states never equate unknown with resistant. */
(function installV25(){
"use strict";
const e=window.ATLAS25||{},d=window.ATLAS24?.debug;if(!d)return;
const Hx=x=>H(String(x??'')),search=x=>String(x??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(),groupList=e.microGroups||[],allMicro=[...D.pathogens.map(x=>({...x,kingdom:'bacteria'})),...d.orgs],allDrug=[...D.antibiotics.map(x=>({...x,kingdom:'bacteria'})),...d.drugs];
const palette={bacteria:'#256bc0',virus:'#6555ba',fungi:'#b77848',parasites:'#27876e'},labels={bacteria:'Bacterias',virus:'Virus',fungi:'Hongos',parasites:'Parásitos'},domainOrder=['bacteria','virus','fungi','parasites'];
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
 return oldAct(a);
};
document.addEventListener('input',event=>{if(!['v25-map-query','v25-clinic-query'].includes(event.target.id))return;const id=event.target.id,st=event.target.selectionStart,en=event.target.selectionEnd;event.stopImmediatePropagation();if(id==='v25-map-query')map.query=event.target.value;else cl.query=event.target.value;render();const el=document.getElementById(id);el?.focus();if(el?.setSelectionRange)el.setSelectionRange(st,en)},true);
document.addEventListener('change',event=>{if(event.target.id==='v25-map-family'){map.family=event.target.value;map.status='all';render()}},true);
const originalRender=render;
render=function(){originalRender();if(state.route==='micro'&&d.ui.micro!=='bacteria')fillMicro25()};
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
function clinical25(){
 const who=(typeof WHO!=='undefined'?WHO.conditions:[]),extras=e.extraConditions||[],all=[...who,...extras],sys=[...new Set(all.map(c=>c.system))];
 const candidates=all.filter(c=>(cl.system==='all'||c.system===cl.system)&&(!cl.query||search(c.title).includes(search(cl.query))));
 const c=candidates.find(c=>c.id===cl.selected)||candidates[0],record=c&&e.conditions?.[c.id],isWho=c?.id.startsWith('who-'),r=c&&isWho?window.ATLAS_CLINICAL23?.get(c):null,dat=record||c?.details;
 if(c)cl.selected=c.id;
 return '<div class="v25-clinic"><header class="v25-clinic-head"><span>ATB ATLAS / REVISIÓN CLÍNICA POR SÍNDROME</span><h1>Síndromes infecciosos, <em>del diagnóstico al seguimiento.</em></h1><p>Fichas orientadas a Medicina Interna: reconocimiento, epidemiología, diferencial, pruebas dirigidas, decisiones terapéuticas y complicaciones. El contenido WHO disponible representa el índice; la revisión complementaria se identifica por separado.</p></header><div class="v25-clinic-layout"><aside class="v25-clinic-sidebar"><label>Buscar enfermedad<input id="v25-clinic-query" placeholder="Nombre, órgano o síndrome…" value="'+Hx(cl.query)+'"></label><div class="v25-clinic-systems"><button class="'+(cl.system==='all'?'on':'')+'" data-act="v25-clinical-system:all">Todos · '+all.length+'</button>'+sys.map(x=>'<button data-act="v25-clinical-system:'+Hx(x)+'" class="'+(cl.system===x?'on':'')+'">'+Hx(x)+' · '+all.filter(y=>y.system===x).length+'</button>').join('')+'</div><div class="v25-clinic-count">'+candidates.length+' enfermedades</div><div class="v25-clinic-list">'+candidates.map(x=>'<button data-act="v25-clinical:'+x.id+'" class="'+(x.id===c?.id?'on':'')+'"><b>'+Hx(x.title)+'</b><small>'+Hx(x.system)+(x.id.startsWith('who-')?' · WHO AWaRe':' · Review transversal')+'</small></button>').join('')+'</div></aside><main class="v25-clinic-article">'+(c?syndromeReview(c,dat,r):'<p>Selecciona otro sistema o limpia el buscador.</p>')+'</main></div></div>';
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
 const colors={'respiratorio':'#3d74b6','cardiovascular':'#bd6278','neurología':'#645ab9','urinario':'#4985ba','hepatobiliar':'#ae7b45','medicina tropical':'#2c8f76','inmunodeficiencia':'#a46da0'};
 const color=colors[k]||'#316d96';
 const focus=isSpecial?(c.domain==='virus'?'Virus':c.domain==='fungi'?'Hongo':'Parásito'):'Síndrome bacteriano / diferencial integral';
 return '<article class="v25-syndrome" style="--syndrome:'+color+'"><header class="v25-syndrome-hero"><span>FICHA CLÍNICA / '+Hx(c.system).toUpperCase()+' / '+focus.toUpperCase()+'</span><h1>'+Hx(c.title)+'</h1><p>'+Hx(narrative[0])+'</p><div class="v25-review-meta"><span>MEDICINA INTERNA</span><span>DIAGNÓSTICO</span><span>FARMACOLOGÍA</span><span>EVOLUCIÓN</span></div></header><nav class="v25-syndrome-nav">'+headings.map(([n,,t])=>'<a href="#v25-syn-'+n+'">'+n+' '+Hx(t.split(' ')[0])+'</a>').join('')+'</nav>'+
 headings.map(([n,tag,title],idx)=>'<section id="v25-syn-'+n+'" class="v25-syndrome-section"><header><b>'+n+'</b><div><span>'+Hx(tag)+'</span><h2>'+Hx(title)+'</h2></div></header>'+story[idx].filter(Boolean).map((x,j)=>j===0?'<p>'+Hx(x)+'</p>':'<div class="v25-syndrome-context"><b>Correlación y matiz clínico</b><p>'+Hx(x)+'</p></div>').join('')+(idx===4&&Array.isArray(c.first)&&c.first.length?'<div class="v25-clinical-rx">'+c.first.map(x=>'<div><b>'+Hx(x.drug)+'</b><p>'+Hx(x.dose)+'</p></div>').join('')+'</div>':'')+'</section>').join('')+
 '<section class="v25-syndrome-section v25-syn-summary"><header><b>07</b><div><span>SÍNTESIS</span><h2>Cómo pensar este síndrome en una guardia</h2></div></header><div class="v25-syndrome-steps">'+[['SOSPECHAR',narrative[0]],['CONFIRMAR',narrative[3]],['TRATAR',narrative[4]],['REVALORAR',narrative[5]]].map(([a,b])=>'<div><b>'+a+'</b><p>'+Hx(b)+'</p></div>').join('')+'</div></section>'+
 '<footer class="v25-syndrome-foot"><b>BIBLIOGRAFÍA Y TRAZABILIDAD</b><p>'+(isSpecial?'Review complementario de infección viral, fúngica o parasitaria; contrastar guías del patógeno específico.':'El índice WHO AWaRe solo documenta que existe un capítulo; los apartados clínicos proceden de síntesis original y revisiones adicionales, no de dosis WHO extraídas.')+'</p><a target="_blank" rel="noopener noreferrer" href="'+source+'">WHO AWaRe ↗</a><a target="_blank" rel="noopener noreferrer" href="'+i25+'">IDSA 2026 AMR ↗</a><a target="_blank" rel="noopener noreferrer" href="https://www.cdc.gov/infectious-diseases/">CDC Infectious diseases ↗</a></footer></article>';
}
window.ATLAS25.reviewUI={map,cl,groups,members,clinical25};
})();
