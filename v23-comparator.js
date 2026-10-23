/* V23: full-catalogue, unlimited antimicrobial comparator */
(function installComparatorV23(){
"use strict";
let q="",fam="all";
const esc=s=>H(String(s??""));
const stat=(a,p)=>window.ATLAS23.coverage(a,p);
const labels={active:'ACTIVIDAD REGISTRADA',conditional:'CONDICIONADA',none:'SIN ACTIVIDAD',expected:'ACTIVIDAD HABITUAL',variable:'VARIABLE',excluded:'NO CUBRE',unknown:'NO EVALUADO'};
const drugFact=a=>E19.classes[a.family]||{};
function microPicker(){const grouped=new Map();for(const p of D.pathogens){const key=G(p.groupId)?.name||p.groupId;if(!grouped.has(key))grouped.set(key,[]);grouped.get(key).push(p)};return `<select id="v23-compare-micro" aria-label="Microorganismo de referencia">${[...grouped.entries()].map(([key,ps])=>`<optgroup label="${esc(key)}">${ps.map(p=>`<option ${p.id===state.compareMicro?'selected':''} value="${p.id}">${esc(p.name)}</option>`).join('')}</optgroup>`).join('')}</select>`}
function create(){
 const p=P(state.compareMicro)||D.pathogens[0], chosen=state.compare.map(A).filter(Boolean),families=[...new Set(D.antibiotics.map(a=>a.family))];
 const drugs=D.antibiotics.filter(a=>(fam==='all'||a.family===fam)&&(`${a.name} ${a.family} ${a.subgroup}`.toLowerCase().includes(q.toLowerCase())));
 const rows=[
 ['Mecanismo / diana',a=>`<b>${esc(window.ATLAS23.mechanism(a).target)}</b><small>${esc(window.ATLAS23.mechanism(a).action)}</small>`],
 ['PK/PD',a=>esc(drugFact(a).pkpd||"Consultar ficha")],
 ['Espectro en el microorganismo elegido',a=>{const st=stat(a,p);return `<span class="v23-compare-status ${st.st}">${esc(labels[st.st]||st.st)}</span><small>${esc(st.note)}</small>`}],
 ['Aplicación clínica representativa',a=>esc(a.context||drugFact(a).clinical||'Según síndrome')],
 ['Límite clave / resistencia',a=>esc(window.ATLAS23.mechanism(a).pearl||a.limitations||drugFact(a).gap)],
 ['Datos registrados sobre esta especie',a=>{const r=relation(a.id,p.id);return r?`<b>Un par documentado</b><small>${esc(r.note||'')}, revisión ${esc(r.review||'preliminar')}</small>`:'<span class="v23-status-empty">Sin par individual en base. No equivale a resistencia.</span>'}],
 ];
 return `<div class="v23-compare"><header class="v23-pagehead"><span>COMPARACIÓN FARMACOLÓGICA / ENFOQUE POR MICROORGANISMO</span><h1>Comparar sin límites arbitrarios.</h1><p>Elige las moléculas que necesites del catálogo completo (111). Sus columnas contrastan <strong>diana, actividad frente a la especie seleccionada, PK/PD y principales limitaciones</strong>. Desplaza la tabla lateralmente.</p></header>
 <div class="v23-comparetop"><label><span>MICROORGANISMO DE REFERENCIA</span>${microPicker()}</label><div><small>SELECCIÓN ACTUAL</small><b>${chosen.length} antibióticos</b><button data-act="v23-compare-clear">Limpiar selección</button></div></div>
 <div class="v23-compare-layout"><aside class="v23-compare-chooser"><h2>Biblioteca de antibióticos</h2><label class="v23-searchlabel">Filtrar por nombre, subgrupo o familia<input id="v23-compare-search" type="search" value="${esc(q)}" placeholder="Ej. cefepima, carbapenémico…"></label><label class="v23-searchlabel">Familia farmacológica<select id="v23-compare-family"><option value="all">Todas las familias</option>${families.map(f=>`<option ${fam===f?'selected':''} value="${esc(f)}">${esc(f)}</option>`).join('')}</select></label><div class="v23-searchcount">${drugs.length} antibióticos encontrados</div><div class="v23-compare-choices">${drugs.map(a=>{const found=chosen.some(x=>x.id===a.id),st=stat(a,p);return `<button aria-pressed="${found}" class="${found?'on':''}" data-act="v23-compare-toggle:${a.id}"><span class="v23-check">${found?'✓':'+'}</span><span><b>${esc(a.name)}</b><small>${esc(a.family)} · ${esc(a.subgroup)}</small></span><em class="${st.st}">${esc(labels[st.st]||st.st)}</em></button>`}).join('')}</div></aside>
 <main class="v23-compare-main"><div class="v23-selectedbar"><span>SELECCIONADOS</span>${chosen.map(a=>`<button data-act="v23-compare-toggle:${a.id}">${esc(a.name)} ×</button>`).join('')||'<p>Elige antibióticos del catálogo para llenar la comparación.</p>'}</div>
 ${chosen.length?`<div class="v23-compare-table-wrap" tabindex="0" role="region" aria-label="Comparación de antimicrobianos"><table class="v23-compare-table"><thead><tr><th>CRITERIO</th>${chosen.map(a=>`<th><b>${esc(a.name)}</b><small>${esc(a.subgroup)}</small><button data-act="open-drug:${a.id}">Ver ficha ↗</button></th>`).join('')}</tr></thead><tbody>${rows.map(([t,cb])=>`<tr><th scope="row">${esc(t)}</th>${chosen.map(a=>`<td>${cb(a)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`:`<div class="v23-empty-compare"><h3>Construye tu contraste</h3><p>Puedes añadir dos, ocho o más antimicrobianos. La tabla se adapta mediante desplazamiento horizontal y cada columna mantiene su mecanismo específico.</p></div>`}
 <p class="v23-compare-caveat">Actividad registrada ≠ eficacia clínica comprobada; actividad farmacológica habitual ≠ antibiograma. Valorar foco, fenotipo (BLEE, AmpC, CRE, DTR, CRAB), MIC, exposición y antibiograma local.</p></main></div></div>`;
}
comparePage=create;
document.addEventListener('click',e=>{const b=e.target.closest('[data-act^="v23-compare-"]');if(!b||state.route!=='comparar')return;e.preventDefault();e.stopImmediatePropagation();const args=b.dataset.act.split(':');if(args[0]==='v23-compare-clear')state.compare=[];
else if(args[0]==='v23-compare-toggle'){const id=args[1];if(!A(id))return;state.compare=state.compare.includes(id)?state.compare.filter(x=>x!==id):[...state.compare,id];}
render();},true);
document.addEventListener('change',e=>{if(state.route!=='comparar')return;
 if(e.target.id==='v23-compare-family'){fam=e.target.value;render();}
 if(e.target.id==='v23-compare-micro'){state.compareMicro=e.target.value;render();}
},true);
document.addEventListener('input',e=>{if(state.route!=='comparar'||e.target.id!=='v23-compare-search')return;q=e.target.value;const a=e.target.selectionStart,b=e.target.selectionEnd;render();const x=document.querySelector('#v23-compare-search');if(x){x.focus();x.setSelectionRange(a,b)}},true);
})();
