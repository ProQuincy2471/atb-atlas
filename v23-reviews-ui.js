/* V23 professional educational reviews, clinical syndromes and sourced medical images */
(function bootstrapReviewsUI23(){
'use strict';
const cli=window.ATLAS_CLINICAL23,learning=window.ATLAS_LEARN23;
const esc=x=>H(x==null?'':String(x));
const bullets=a=>`<ul class="v23-pointlist">${(a||[]).filter(Boolean).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
const iconMap={'who-04':'conditions-coughing-alt','who-05':'body-ear','who-06':'body-mouth','who-07':'body-nose','who-08':'body-tooth','who-09':'body-lymph-nodes','who-10':'body-eye','who-11':'body-eye','who-12':'conditions-pneumonia','who-13':'lungs','who-14':'conditions-diarrhea','who-15':'conditions-chills-fever','who-16':'body-arm','who-17':'conditions-burn','who-18':'body-arm','who-19':'conditions-sti','who-20':'conditions-sti','who-21':'conditions-sti','who-22':'conditions-sti','who-23':'body-bladder','who-24':'specialties-intensive-care_unit','who-25':'specialties-pediatrics','who-26':'conditions-headache','who-27':'conditions-pneumonia','who-28':'conditions-pneumonia','who-29':'body-gallbladder','who-30':'body-liver','who-31':'intestine','who-32':'conditions-intestinal-pain','who-33':'conditions-diarrhea','who-34':'kidneys','who-35':'body-skeleton','who-36':'body-joints','who-37':'body-leg','who-38':'body-arm','who-39':'body-blood-cells','who-40':'specialties-general-surgery'};
function sym(c){const key=iconMap[c.id]||'bacteria',local=['lungs','intestine','kidneys','bacteria','body','neurology'].includes(key);return `assets/${local?'health':'clinical'}/${key}.svg`}
const renderSource=()=>`<div class="v23-links"><a href="https://www.who.int/publications/i/item/9789240062382" target="_blank" rel="noopener">WHO AWaRe 2022 · capítulos clínicos ↗</a><a href="https://www.idsociety.org/practice-guideline/amr-guidance/" target="_blank" rel="noopener">IDSA 2026 · resistencia gramnegativa ↗</a><a href="https://www.idsociety.org/practice-guideline/complicated-urinary-tract-infections/" target="_blank" rel="noopener">IDSA 2025 · ITU complicada ↗</a><a href="https://www.idsociety.org/practice-guideline/community-acquired-pneumonia-cap-in-adults" target="_blank" rel="noopener">ATS/IDSA · NAC del adulto ↗</a></div>`;
clinicalFull=function(c){
 const r=cli.get(c),color=sysColor(c.system)||'#2565af';
 const sections=[
 ['v23-clinical-concept','01','IDENTIFICACIÓN','Definición y reconocimiento',`<p>${esc(r.presentation)}</p>${c.overview&&c.overview!==r.presentation?`<p>${esc(c.overview)}</p>`:''}`],
 ['v23-clinical-study','02','ESTRATEGIA DIAGNÓSTICA','Diagnóstico diferencial y pruebas',`<p>${esc(r.diagnosis)}</p>${c.risks?.length?`<div class="v23-clinical-box"><b>Factores que cambian probabilidad preprueba</b>${bullets(c.risks)}</div>`:''}`],
 ['v23-clinical-micro','03','ETIOLOGÍA','Microbiología y fenotipos relevantes',`${c.pathogens?.length?`<div class="v23-tags">${c.pathogens.map(n=>`<span>${esc(n)}</span>`).join('')}</div>`:''}<p>La identificación de microorganismo, su fenotipo de resistencia, el foco y la calidad de la muestra determinan cómo interpretar un cultivo o NAAT. Un cultivo positivo no siempre documenta enfermedad activa, ni un Gram negativo permite descartar resistencia.</p>`],
 ['v23-clinical-management','04','MANEJO CLÍNICO','Tratamiento, control de foco y seguimiento',`<p>${esc(r.management)}</p>${c.why?`<div class="v23-emphasis">${esc(c.why)}</div>`:''}${c.first.length?`<h3>Tratamientos documentados para esta indicación (WHO)</h3><div class="v23-dosegrid">${c.first.map(rx=>`<div><b>${esc(rx.drug)}</b><p>${esc(rx.dose)}</p><small>${esc(rx.note||'')}</small></div>`).join('')}</div>`:''}${c.alternatives.length?`<h3>Alternativas documentadas</h3><div class="v23-dosegrid">${c.alternatives.map(rx=>`<div><b>${esc(rx.drug)}</b><p>${esc(rx.dose)}</p><small>${esc(rx.note||'')}</small></div>`).join('')}</div>`:''}`],
 ['v23-clinical-risks','05','SEGURIDAD Y EVOLUCIÓN','Alertas, complicaciones y errores habituales',`<div class="v23-clinical-alert"><b>Perla de seguridad</b><p>${esc(r.pitfall)}</p></div>${bullets(c.redflags)}<p>La ausencia de respuesta obliga a reexaminar control de foco, complicaciones, adherencia, exposición farmacológica, patógenos no cubiertos o diagnóstico alternativo antes de escalar de manera indiscriminada.</p>`],
 ['v23-clinical-source','06','LECTURAS','Evidencia y bibliografía',`${renderSource()}<p>Revisión clínica original complementaria a la estructura WHO. Las dosis sólo se muestran cuando existe pauta individualizada en el corpus; no se infieren automáticamente.</p>`]
 ];
 return `<div class="v23-clinical" style="--v23-clinical:${color}"><header class="v23-clinical-hero"><div><span class="v23-overline">ENFERMEDADES INFECCIOSAS / ${esc(c.system)} · CAP. ${esc(c.chapter)}</span><h1>${esc(c.title)}</h1><p>${esc(r.presentation)}</p><div class="v23-tags"><span>${esc(c.system)}</span><span>${c.first.length?'Pauta WHO registrada':'Abordaje clínico de residencia'}</span></div></div><div class="v23-clinical-art" data-wiki-title="${esc(r.wiki)}"><img src="${esc(sym(c))}" alt="Ilustración médica original: ${esc(c.system)}" loading="lazy"><span>${esc(c.title)}</span><small>Health Icons · licencia CC0</small></div></header>
 <nav class="v23-subnav">${sections.map(([id,n,k])=>`<a href="#${id}">${esc(k.toLowerCase())}</a>`).join('')}</nav><div class="v23-clinical-sections">${sections.map(([id,n,k,title,content])=>section20(id,n,k,title,content)).join('')}</div></div>`;
};
const photoCache=new Map();
async function attachPhoto(){
 if(state.route!=='clinica')return;const c=whoc(state.clinicalId)||allDiseases()[0],art=document.querySelector('.v23-clinical-art');
 if(!art||!c)return;
 const source=art.getAttribute('data-wiki-title');if(!source)return;
 if(photoCache.has(source)){insertPhoto(photoCache.get(source),c);return;}
 try{
   const uri='https://en.wikipedia.org/w/api.php?'+new URLSearchParams({action:'query',format:'json',origin:'*',redirects:'1',prop:'pageimages',piprop:'thumbnail|name',pithumbsize:'900',titles:source});
   const response=await fetch(uri);if(!response.ok)throw Error('image unavailable');
   const obj=Object.values((await response.json()).query?.pages||{}).find(p=>p.title?.toLocaleLowerCase()===source.toLocaleLowerCase()&&p.thumbnail?.source&&p.pageimage);
   const val=obj?{url:obj.thumbnail.source,name:obj.title,source:'https://en.wikipedia.org/wiki/'+encodeURIComponent(obj.title.replaceAll(' ','_'))}:null;
   photoCache.set(source,val);insertPhoto(val,c);
 }catch(err){photoCache.set(source,null)}
}
function insertPhoto(pic,c){
 if(!pic||state.route!=='clinica'||(whoc(state.clinicalId)||allDiseases()[0])?.id!==c.id)return;
 const target=document.querySelector('.v23-clinical-art');
 if(!target)return;
 const old=target.innerHTML;
 target.innerHTML=`<img class="v23-clinical-photo" src="${esc(pic.url)}" alt="Imagen documental de ${esc(c.title)}" loading="lazy" referrerpolicy="no-referrer"><small class="v23-image-source"><a target="_blank" rel="noopener" href="${esc(pic.source)}">Fuente de imagen: ${esc(pic.name)} · autor y licencia ↗</a></small>`;
 const image=target.querySelector('img');image.addEventListener('error',()=>target.innerHTML=old,{once:true});
}
const oldRender=render;
render=function(){oldRender();if(state.route==='clinica')attachPhoto()};
function studyQuestions(c){
 const qs=QUIZ.questions.filter(q=>q.chapter===c.id);
 return `<div class="v23-qa">${qs.map((q,i)=>{const chosen=state.quizAnswers[q.id];return `<article><span>PREGUNTA ${i+1}</span><h3>${esc(q.question)}</h3><div>${q.options.map((opt,j)=>`<button class="${chosen===j?(chosen===q.correct?'correct':'wrong'):''}" data-act="quiz-choice:${q.id}:${j}" ${chosen!==undefined?'disabled':''}>${String.fromCharCode(65+j)} · ${esc(opt)}</button>`).join('')}</div>${chosen!==undefined?`<p class="v23-q-explanation">${esc(q.explanation)}</p>`:''}</article>`}).join('')}<button data-act="quiz-retry:${c.id}">Repetir preguntas del capítulo</button></div>`;
}
learningPage=function(){
 const c=F.chapters.find(x=>x.id===state.lesson)||F.chapters[0],index=F.chapters.indexOf(c);
 const parts=learning.units[c.id]||[];
 const stages=[...new Set(F.chapters.map(x=>x.stage))];
 const qs=QUIZ.questions.filter(x=>x.chapter===c.id);
 return `<div class="v23-learn"><aside class="v23-learn-rail"><span class="v23-overline">ATLAS ACADEMY / POSGRADO</span><h2>Revisiones para residencia</h2><p>24 capítulos de Microbiología, Infectología y antimicrobianos, con casos y autoevaluación.</p><div class="v23-learn-progress">${state.completed.length}/${F.chapters.length} completados</div>${stages.map(stage=>`<div class="v23-learn-group"><h3>${esc(stage)}</h3>${F.chapters.filter(x=>x.stage===stage).map(x=>`<button data-act="lesson:${x.id}" class="${x.id===c.id?'selected':''}"><span>${esc(x.num)}</span><b>${esc(x.title)}</b>${state.completed.includes(x.id)?'✓':''}</button>`).join('')}</div>`).join('')}</aside>
 <main class="v23-learn-main"><header class="v23-learn-hero"><span class="v23-overline">MÓDULO ${esc(c.num)} / ${esc(c.stage)}</span><h1>${esc(c.title)}</h1><p>${esc(c.lead)}</p><div class="v23-tags"><span>Review clínico</span><span>${qs.length} preguntas</span><span>Lectura estructurada</span></div></header><nav class="v23-subnav"><a href="#v23-lesson-review">Revisión</a><a href="#v23-lesson-claves">Diferenciación</a><a href="#v23-lesson-case">Caso clínico</a><a href="#v23-lesson-quiz">Autoevaluación</a><a href="#v23-lesson-biblio">Bibliografía</a></nav>
 <section id="v23-lesson-review" class="v23-learn-reading">${parts.map(([title,body],i)=>`<article><span class="v23-chapter-no">${String(i+1).padStart(2,'0')}</span><div><h2>${esc(title)}</h2><p>${esc(body)}</p></div></article>`).join('')}<article><span class="v23-chapter-no">+</span><div><h2>Integración conceptual</h2><p>${esc(c.detail)}</p><p>El objetivo es vincular el mecanismo biológico o farmacológico con la especie, el huésped, el compartimento anatómico, las pruebas microbiológicas y las limitaciones de los antimicrobianos.</p></div></article></section>
 <section id="v23-lesson-claves" class="v23-learn-panel"><h2>Contrastes clínico-microbiológicos</h2><div class="v23-learn-concepts">${c.keys.map((k,i)=>`<div><b>${String(i+1).padStart(2,'0')}</b><p>${esc(k)}</p></div>`).join('')}</div><div class="v23-emphasis">${esc(c.question)}</div><details><summary>Respuesta razonada</summary><p>${esc(c.answer)}</p></details></section>
 <section id="v23-lesson-case" class="v23-learn-panel"><span class="v23-overline">APLICACIÓN Y TRANSFERENCIA</span><h2>Caso clínico</h2><blockquote>${esc(c.case)}</blockquote><p>Construye un diagnóstico sindromático; justifica qué microorganismos son plausibles, qué muestra solicitarías y qué mecanismo de resistencia o de exposición farmacológica modificaría la selección. Distingue cobertura teórica de eficacia clínica.</p></section>
 <section id="v23-lesson-quiz" class="v23-learn-panel"><h2>Preguntas con explicación</h2>${studyQuestions(c)}</section>
 <div class="v23-lesson-actions"><button data-act="lesson-complete">${state.completed.includes(c.id)?'✓ Estudiado':'Marcar como estudiado'}</button><button data-act="lesson-index:${Math.min(F.chapters.length-1,index+1)}">Siguiente capítulo →</button></div>
 <section id="v23-lesson-biblio" class="v23-learn-panel"><h2>Bibliografía y fuentes</h2><div class="v23-links">${learning.sources.map(s=>`<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`).join('')}${linkRefs(c.refs||[])}</div></section></main></div>`;
};
})();
