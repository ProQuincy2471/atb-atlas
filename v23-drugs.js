/* V23 drug mechanism and in-page microbiology spectrum + unrestricted comparator */
(function bootstrapDrugs23(){
'use strict';
const state23={status:'documented',domain:'all',path:'',compareFamily:'all',search:'',max:10};
const esc=x=>H(x==null?'':String(x));
const P23=window.ATLAS_PHARM23;
const ST23={active:'Actividad registrada',conditional:'Condicionada',none:'Sin actividad',unknown:'Sin evaluación'};
const symbols={active:'✓',conditional:'≈',none:'×',unknown:'·'};
function chip(st){return `<span class="v23-status ${st}">${symbols[st]} ${ST23[st]}</span>`}
const named=(id)=>P(id)?.name||id;
function spec(a){
 const rels=relsA(a.id),allowed=D.pathogens.filter(p=>state23.domain==='all'||dp20(p)===state23.domain);
 const visible=allowed.map(p=>({p,r:relation(a.id,p.id)})).filter(x=>state23.status==='all'||(x.r&&(state23.status==='documented'?rstatus(x.r)!=='none':rstatus(x.r)===state23.status))).sort((x,y)=>({active:0,conditional:1,none:2,unknown:3}[rstatus(x.r)]-({active:0,conditional:1,none:2,unknown:3}[rstatus(y.r)]))||x.p.name.localeCompare(y.p.name,'es'));
 const hit=visible.find(x=>x.p.id===state23.path)||visible[0];
 const cnt={active:rels.filter(r=>rstatus(r)==='active').length,conditional:rels.filter(r=>rstatus(r)==='conditional').length,none:rels.filter(r=>rstatus(r)==='none').length};
 return `<div class="v23-spectra"><div class="v23-spechead"><p>Correlación microbiológica por par <b>fármaco–microorganismo</b>. La ausencia de datos no equivale a resistencia; los resultados están condicionados por fenotipo, foco, CMI y PK/PD.</p><div><b>${cnt.active}</b> activos · <b>${cnt.conditional}</b> condicionados · <b>${D.pathogens.length-rels.length}</b> sin evaluación</div></div>
 <div class="v23-specfilters"><div>${[['documented','Con actividad'],['active','Activos'],['conditional','Condicionados'],['none','Sin actividad'],['all','Todos']].map(([id,label])=>`<button class="${state23.status===id?'chosen':''}" data-act="v23-spec-status:${id}">${label}</button>`).join('')}</div><div>${[['all','Todos'],['Grampositivos','Gram +'],['Gramnegativos','Gram −'],['Anaerobios','Anaerobios'],['Atípicos','Atípicos'],['Especiales','Especiales']].map(([id,label])=>`<button class="${state23.domain===id?'chosen':''}" data-act="v23-spec-domain:${id}">${label}</button>`).join('')}</div></div>
 <div class="v23-specbody"><div class="v23-speclist">${visible.length?visible.map(({p,r})=>`<button class="v23-specrow ${state23.path===p.id?'chosen':''}" data-act="v23-spec-path:${p.id}"><span><b>${esc(p.name)}</b><small>${esc(dp20(p))} · ${esc(p.morphology||'')}</small></span>${chip(rstatus(r))}</button>`).join(''):`<div class="v23-no-data"><b>Sin cruces registrados con el filtro actual</b><p>Selecciona «Todos» para examinar el catálogo; no debe interpretarse como ausencia de cobertura.</p></div>`}</div>
 <aside class="v23-specdetail">${hit?`<span class="v23-overline">CORRELACIÓN MICROBIOLÓGICA</span><h3><i>${esc(hit.p.name)}</i></h3>${chip(rstatus(hit.r))}<p>${esc(hit.r?.note||'Par pendiente de evaluación individual. No se puede inferir sensibilidad ni resistencia.')}</p><p><b>Biología:</b> ${esc(hit.p.identity)}</p><p><b>Clínica:</b> ${esc(hit.p.clinical)}</p><button data-act="open-micro:${hit.p.id}">Abrir ficha del microorganismo ↗</button>`:'<p>No hay microorganismos para este filtro.</p>'}<small>El estado de actividad no representa un porcentaje de curación; la eficacia clínica requiere evidencia específica y exposición suficiente.</small></aside></div></div>`;
}
function ul(a){return `<ul class="v23-pointlist">${(a||[]).filter(Boolean).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`}
function subcard(title,contents,cls=''){return `<div class="v23-subcard ${cls}"><h3>${esc(title)}</h3>${contents}</div>`}
drugPageSections=function(a){
 const e=DRUG_EDU[a.id]||{},cl=E19.classes[a.family]||{},m=P23.dossier(a),ds=fromManualForDrug(a);
 const anchors=[['drug-mechanism','Mecanismo'],['drug-spectrum','Cobertura'],['drug-indications','Indicaciones'],['drug-safety','PK/PD'],['drug-dosing','Posología'],['drug-source','Fuentes']];
 return `<div class="v23-drug"><header class="v23-drug-hero"><div class="v23-hero-symbol">${ic('drugs',38)}</div><div><span class="v23-overline">ANTIMICROBIANOS / ${esc(a.family)}</span><h1>${esc(a.name)}</h1><p>${esc(a.subgroup||'')} · ${esc(m.target)}</p><div class="v23-tags"><span>${esc(a.family)}</span><span>${esc(a.subgroup||'')}</span>${a.newer?'<span>Nuevo / especializado</span>':''}</div></div><button data-act="v23-compare-add:${a.id}">Añadir a comparador ↗</button></header>
 <nav class="v23-subnav">${anchors.map(([id,label])=>`<a href="#${id}">${label}</a>`).join('')}</nav><div class="v23-drug-grid"><div class="v23-drug-main">
 ${section20('drug-mechanism','01','FARMACOLOGÍA MOLECULAR','Diana y mecanismo de acción',`<div class="v21-mechanism-inline">${P23.mechanismHTML(a,esc)}</div>`)}
 ${section20('drug-spectrum','02','CORRELACIÓN ATB × MICRO','Actividad y límites del espectro',spec(a))}
 ${section20('drug-indications','03','APLICACIÓN EN CLÍNICA','Indicaciones y errores de selección',`<div class="v23-2cols">${subcard('Escenarios clínicos',ul(e.classic||[a.context]),'positive')}${subcard('Puntos ciegos',ul(e.missing||[a.limitations]),'negative')}</div><p class="v23-emphasis"><b>Selección razonada:</b> ${esc(m.clinical)}</p>`)}
 ${section20('drug-safety','04','EXPOSICIÓN Y SEGURIDAD','PK/PD, resistencia y toxicidad',`<div class="v23-2cols">${subcard('Farmacocinética/farmacodinamia',`<p>${esc(e.pk||cl.pkpd||m.effect)}</p>`,'neutral')}${subcard('Eventos adversos',ul(e.adverse||[E19.drugs[a.id]?.safety||'Evaluación individual según ficha técnica']), 'warning')}</div><p class="v23-emphasis"><b>Mecanismos de resistencia:</b> ${esc(m.resistance)}</p>`)}
 ${section20('drug-dosing','05','DOSIFICACIÓN POR INDICACIÓN','Pautas registradas para condiciones OMS',`${ds.length?`<div class="v23-dosegrid">${ds.slice(0,7).map(x=>`<div><span>${esc(x.condition?.title||'Condición')} · ${esc(x.choice)}</span><b>${esc(x.dose)}</b><p>${esc(x.note)}</p></div>`).join('')}</div>`:`<p>La indicación, biodisponibilidad, función renal y gravedad condicionan la dosis. El corpus actual no contiene una pauta individual de WHO validada para ${esc(a.name)}; no se ofrece una dosis genérica inferida.</p>`}<p class="v23-caution">La prescripción requiere ficha técnica, ajuste renal/hepático, antibiograma y protocolos institucionales.</p>`)}
 ${section20('drug-source','06','EVIDENCIA','Referencias y nivel documental',`<div class="v23-links">${linkRefs(a.referenceKeys||[])}<a href="https://www.idsociety.org/practice-guideline/amr-guidance/" target="_blank" rel="noopener">IDSA 2026 · gramnegativos resistentes ↗</a><a href="https://www.who.int/publications/i/item/9789240062382" target="_blank" rel="noopener">WHO AWaRe · antibióticos ↗</a></div><p>Diagrama educativo basado en dianas y mecanismos; espectro por relación individual. No extrapolar a susceptibilidad no registrada.</p>`)}
 </div><aside class="v23-drug-aside"><div><span>FICHA DE MECANISMO</span><h3>${esc(a.name)}</h3><dl><dt>Familia</dt><dd>${esc(a.family)}</dd><dt>Subgrupo</dt><dd>${esc(a.subgroup)}</dd><dt>Diana</dt><dd>${esc(m.target)}</dd><dt>PK/PD</dt><dd>${esc(cl.pkpd||e.pk||m.effect)}</dd></dl></div><div class="v23-drug-warning"><b>Correlación clínico-microbiológica</b><p>${esc(m.clinical)}</p></div></aside></div></div>`;
};
const oldMicro=microPageSections;
microPageSections=function(p){
 const html=oldMicro(p),g=G(p.groupId),e=MICRO_EDU[p.id]||{},deep=E19.organisms[p.id]||{};
 const accent=({Grampositivos:'#cf3674',Gramnegativos:'#2363b8',Anaerobios:'#408abf',Atípicos:'#8750b4',Especiales:'#6253ba'})[dp20(p)]||'#4c7a90';
 const text=`<div class="v23-micro-highlight" style="--microaccent:${accent}"><div class="v23-micro-head">${ic('micro',30)}<div><span class="v23-overline">IDENTIDAD TAXONÓMICA · ${esc(g?.name)}</span><h2>${esc(p.name)}</h2><p>${esc(p.morphology)} · ${esc(p.domain)}</p></div></div><div class="v23-micro-four">
 ${subcard('Biología / reservorio',`<p>${esc(deep.reservoir||e.definition||p.identity)}</p>`)}
 ${subcard('Patogenia y virulencia',`<p>${esc(e.pathophys||deep.pathophysiology||p.identity)}</p>`)}
 ${subcard('Clave diagnóstica',`<p>${esc(e.distinct||p.pearl)}</p>`)}
 ${subcard('Manifestaciones clínicas',`<p>${esc(p.clinical)}</p>`)}
 </div></div>`;
 return html.replace('<div class="v20-articlegrid">',text+'<div class="v20-articlegrid">');
};
comparePage=function(){
 const p=P(state.compareMicro)||D.pathogens[0],fams=[...new Set(D.antibiotics.map(a=>a.family))],q=state23.search.toLocaleLowerCase();
 const list=D.antibiotics.filter(a=>(state23.compareFamily==='all'||a.family===state23.compareFamily)&&(!q||(a.name+' '+a.family+' '+a.subgroup).toLocaleLowerCase().includes(q))).sort((a,b)=>a.name.localeCompare(b.name,'es'));
 const chosen=state.compare.map(A).filter(Boolean);
 const fields=[['Mecanismo',a=>P23.dossier(a).interaction],['Diana',a=>P23.dossier(a).target],['Resistencia',a=>P23.dossier(a).resistance],['PK/PD',a=>(E19.classes[a.family]||{}).pkpd||DRUG_EDU[a.id]?.pk||'Depende del compuesto'],['Indicación orientativa',a=>DRUG_EDU[a.id]?.classic?.join(' · ')||a.context],['Límite clínico',a=>P23.dossier(a).clinical]];
 const species=[p,...D.pathogens.filter(x=>x.groupId===p.groupId&&x.id!==p.id).slice(0,7)];
 return `<div class="v23-comparator"><header class="v23-comp-hero"><span class="v23-overline">FARMACOLOGÍA COMPARADA / HEAD TO HEAD</span><h1>Comparar hasta ${state23.max} antimicrobianos</h1><p>Selecciona libremente entre los ${D.antibiotics.length} fármacos del atlas y un patógeno objetivo. Contrasta mecanismos, espectro, resistencia, PK/PD e indicaciones en una tabla desplazable.</p></header>
 <div class="v23-comp-layout"><aside class="v23-comp-sidebar"><h2>Seleccionar</h2><p>${chosen.length} de ${state23.max} seleccionados</p><label>Buscar antibiótico<input id="v23-compare-search" value="${esc(state23.search)}" placeholder="Nombre o subgrupo…"></label><label>Familia<select id="v23-compare-family"><option value="all">Todas</option>${fams.map(f=>`<option value="${esc(f)}" ${state23.compareFamily===f?'selected':''}>${esc(f)}</option>`).join('')}</select></label><button data-act="v23-clear-compare">Limpiar comparador</button><div class="v23-comp-candidates">${list.map(a=>`<button class="${state.compare.includes(a.id)?'selected':''}" data-act="v23-toggle-compare:${a.id}"><span><b>${esc(a.name)}</b><small>${esc(a.family)} · ${esc(a.subgroup||'')}</small></span><strong>${state.compare.includes(a.id)?'✓':'+'}</strong></button>`).join('')}</div></aside>
 <main class="v23-comp-main"><label>Microorganismo principal<select id="v23-compare-micro">${D.pathogens.map(m=>`<option value="${m.id}" ${p.id===m.id?'selected':''}>${esc(m.name)}</option>`).join('')}</select></label><div class="v23-comp-pills">${chosen.map(a=>`<button data-act="v23-toggle-compare:${a.id}">${esc(a.name)} ×</button>`).join('')}</div>${chosen.length?`<div class="v23-comp-scroll" tabindex="0"><table class="v23-comp-table"><thead><tr><th>CRITERIO</th>${chosen.map(a=>`<th>${esc(a.name)}<button data-act="open-drug:${a.id}">Abrir ↗</button></th>`).join('')}</tr></thead><tbody><tr><th>Microorganismo ${esc(p.name)}</th>${chosen.map(a=>`<td>${chip(rstatus(relation(a.id,p.id)))}<p>${esc(relation(a.id,p.id)?.note||'Sin evaluación individual.')}</p></td>`).join('')}</tr>${fields.map(([label,fn])=>`<tr><th>${label}</th>${chosen.map(a=>`<td>${esc(fn(a)||'Por caracterizar')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
 <h2>Matriz del entorno taxonómico</h2><div class="v23-comp-scroll"><table class="v23-comp-table"><thead><tr><th>MICROORGANISMO</th>${chosen.map(a=>`<th>${esc(a.name)}</th>`).join('')}</tr></thead><tbody>${species.map(m=>`<tr><th>${esc(m.name)}</th>${chosen.map(a=>`<td>${chip(rstatus(relation(a.id,m.id)))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`:`<div class="v23-comp-empty"><h2>Selecciona al menos dos antibióticos</h2><p>La selección no se limita a cuatro ni a una sola familia: usa los filtros y añade los que necesites para comparar.</p></div>`}<p class="v23-caution">Los estados corresponden a registros individuales del corpus; «sin evaluación» no indica resistencia ni valores de eficacia clínica.</p></main></div></div>`;
};
const actOld=act;
function redraw(){const top=window.scrollY;render();requestAnimationFrame(()=>window.scrollTo({top,behavior:'instant'}))}
act=function(command){const [key,...arr]=String(command).split(':'),val=arr.join(':');
 if(key==='v23-spec-status'){state23.status=val;state23.path='';redraw();return}
 if(key==='v23-spec-domain'){state23.domain=val;state23.path='';redraw();return}
 if(key==='v23-spec-path'){state23.path=val;redraw();return}
 if(key==='v23-toggle-compare'||key==='v23-compare-add'||key==='add-compare'){
  if(state.compare.includes(val))state.compare=state.compare.filter(x=>x!==val);else if(state.compare.length<state23.max)state.compare.push(val);
  if(key==='v23-toggle-compare')redraw();else goto('comparar');return
 }
 if(key==='v23-clear-compare'){state.compare=[];redraw();return}
 return actOld(command);
};
document.addEventListener('input',evt=>{
 const n=evt.target;if(n.id!=='v23-compare-search')return;
 state23.search=n.value;const start=n.selectionStart,end=n.selectionEnd;redraw();
 const x=document.getElementById('v23-compare-search');if(x){x.focus();x.setSelectionRange(start,end)}
});
document.addEventListener('change',evt=>{
 const n=evt.target;
 if(n.id==='v23-compare-family'){state23.compareFamily=n.value;redraw()}
 if(n.id==='v23-compare-micro'){state.compareMicro=n.value;redraw()}
});
})();
