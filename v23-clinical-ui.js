/* V23: structured disease reviews with source-based figures */
(function applyClinicalUI23() {
"use strict";
const safe=s=>H(String(s??""));
const icons={"Respiratorio":"lungs","Otorrinolaringología":"ear","Odontología":"tooth","Oftalmología":"eye","Gastrointestinal":"intestine","Urinario":"bladder","Hepatobiliar":"gallbladder","Hematología":"blood-cells","Sistema nervioso":"neurology","ITS":"bladder","Piel y tejidos blandos":"body"};
const section=(id,n,eyebrow,title,content)=>'<section class="v23-clinical-section" id="'+id+'"><header><span>'+n+'</span><div><small>'+safe(eyebrow)+'</small><h2>'+safe(title)+'</h2></div></header><div class="v23-clinical-content">'+content+'</div></section>';
const base=clinicalFull;
clinicalFull=function(c){
  const d=window.ATLAS_CLINICAL23?.get(c);
  if(!d)return base(c);
  const icon=icons[c.system]||'body';
  const rx=[...(c.first||[]),...(c.alternatives||[])];
  const dosage=rx.length?'<div class="v23-dosegrid">'+rx.map(x=>'<article><strong>'+safe(x.drug)+'</strong><b>'+safe(x.dose)+'</b><p>'+safe(x.note||x.basis||'')+'</p></article>').join('')+'</div>':'<div class="v23-management-principles"><div><b>Elección empírica</b><p>Definir foco, severidad, huéspedes especiales, exposición antibiótica previa y resistencia local. No confundir tratamiento empírico con cobertura indiscriminada.</p></div><div><b>Tratamiento dirigido</b><p>Revaluar al identificar el microorganismo y su AST. El control del foco, la penetración tisular y la duración importan tanto como el espectro.</p></div></div>';
  const pathogens=c.pathogens?.length?'<p>'+safe(c.pathogens.join('; '))+'</p>':'<p>La selección de pruebas microbiológicas debe responder a la epidemiología del síndrome y a la probabilidad preprueba.</p>';
  const warnings=(c.redflags||[]).length?'<ul>'+c.redflags.map(x=>'<li>'+safe(x)+'</li>').join('')+'</ul>':'';
  return '<div class="v23-clinical" style="--clinical:'+sysColor(c.system)+'">'+
  '<header class="v23-clinical-hero"><div><span class="v23-kicker">ATLAS DE ENFERMEDADES · '+safe(c.system.toUpperCase())+'</span><h1>'+safe(c.title)+'</h1><p>'+safe(d.presentation)+'</p><div class="v23-tags"><span>MICROBIOLOGÍA</span><span>DIAGNÓSTICO</span><span>TERAPÉUTICA</span></div></div>'+
  '<figure class="v23-disease-image" data-wiki="'+safe(d.wiki)+'"><img src="assets/health/'+icon+'.svg" alt="Ilustración médica del sistema '+safe(c.system)+'"><figcaption>Health Icons · CC0 · Imagen anatómica de referencia</figcaption></figure></header>'+
  '<nav class="v23-disease-anchor"><a href="#clinical-micro23">Etiología</a><a href="#clinical-dx23">Diagnóstico</a><a href="#clinical-tx23">Tratamiento</a><a href="#clinical-pit23">Decisiones</a><a href="#clinical-ref23">Fuentes</a></nav>'+
  section('clinical-micro23','01','ETIOLOGÍA / RAZONAMIENTO','Microbiología y fisiopatología',pathogens+'<div class="v23-clinical-highlight"><b>RECONOCIMIENTO</b><p>'+safe(d.presentation)+'</p></div>')+
  section('clinical-dx23','02','ESTRATEGIA DIAGNÓSTICA','¿Cómo confirmar y estratificar?', '<p>'+safe(d.diagnosis)+'</p><div class="v23-diagnostic-sequence"><div><b>Probabilidad clínica</b><small>Huésped y exposición</small></div><span>→</span><div><b>Gravedad / complicaciones</b><small>Disfunción orgánica</small></div><span>→</span><div><b>Microbiología dirigida</b><small>Muestra y AST</small></div></div>')+
  section('clinical-tx23','03','TRATAMIENTO / CONTROL DE FOCO','Conducta terapéutica fundamentada','<p>'+safe(d.management)+'</p>'+dosage)+
  section('clinical-pit23','04','FALLOS Y ALERTAS','¿Cuándo cambiar la estrategia?','<p>'+safe(d.pitfall)+'</p>'+warnings+'<div class="v23-clinical-highlight"><b>REVALUACIÓN</b><p>Un curso desfavorable exige revisar el diagnóstico, la sensibilidad, la exposición tisular, el control del foco y las complicaciones.</p></div>')+
  section('clinical-ref23','05','LECTURA CRÍTICA','Fuentes y vigencia','<div class="v23-references"><a target="_blank" rel="noopener noreferrer" href="https://www.who.int/publications/i/item/9789240062382">WHO AWaRe 2022 ↗</a><a target="_blank" rel="noopener noreferrer" href="https://www.idsociety.org/practice-guideline/">Guías IDSA ↗</a></div><p>Síntesis académica original. No sustituye la pauta completa de la guía ni la valoración clínica individual.</p>')+
  '</div>';
};
const cache=new Map(),prev=render;
render=function(){
 prev();
 if(state.route!=='clinica')return;
 const fig=document.querySelector('.v23-disease-image');
 if(!fig)return;
 const title=fig.dataset.wiki;
 if(!title)return;
 async function load(){
  if(cache.has(title))return cache.get(title);
  try{
   const params=new URLSearchParams({action:'query',format:'json',origin:'*',redirects:'1',prop:'pageimages',piprop:'thumbnail|name',pithumbsize:'900',titles:title});
   const r=await fetch('https://en.wikipedia.org/w/api.php?'+params);
   if(!r.ok)return null;
   const p=Object.values((await r.json()).query.pages).find(v=>v.thumbnail?.source&&v.pageimage&&v.title.toLowerCase()===title.toLowerCase());
   const asset=p?{image:p.thumbnail.source,link:'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(p.pageimage.replaceAll(' ','_'))}:null;
   cache.set(title,asset);return asset;
  }catch{return null}
 }
 load().then(r=>{
   if(!r||!fig.isConnected||fig.dataset.wiki!==title)return;
   fig.querySelector('img').src=r.image;
   fig.querySelector('figcaption').innerHTML='Imagen documental: '+safe(title)+' · <a href="'+r.link+'" target="_blank" rel="noopener noreferrer">archivo y licencia ↗</a>';
 });
};
})();
