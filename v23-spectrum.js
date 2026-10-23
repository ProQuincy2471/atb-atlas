/* V23: in-ficha antimicrobial spectrum, no forced map navigation. */
(function installSpectrumV23(){
"use strict";
const E=s=>H(String(s??''));
const display={
active:["Actividad registrada","✓","registered"],
conditional:["Actividad condicionada","≈","conditional"],
none:["Sin actividad registrada","×","none"],
unknown:["Sin evaluación individual","·","unknown"],
expected:["Actividad habitual descrita","✓","expected"],
variable:["Cobertura condicionada","≈","variable"],
excluded:["Sin cobertura clínica habitual","×","excluded"]
};
const C={};
function add(ids,yes=[],variable=[],no=[],remarks={}){
 for(const id of ids.split(" ")){C[id]={yes:new Set(yes),variable:new Set(variable),no:new Set(no),remarks};}
}
const STAPH=['s-aureus-mssa','s-aureus-mrsa','staphylococcus-epidermidis','s-pneumoniae','s-pyogenes'];
add('cefepima',['s-aureus-mssa','s-pneumoniae','s-pyogenes','e-coli','k-pneumoniae','p-aeruginosa'],['enterobacter-cloacae','citrobacter-freundii','klebsiella-aerogenes'],['s-aureus-mrsa','e-faecalis','enterococcus-faecium','enterococcus-faecium-vre','b-fragilis','legionella','mycoplasma','chlamydia-pneumoniae'],{'p-aeruginosa':'Solo aislados susceptibles; no extrapolar a DTR.','enterobacter-cloacae':'AmpC e hidrólisis por mecanismos coexpresados pueden modificar utilidad.'});
add('ceftriaxona cefotaxima',['s-pneumoniae','s-pyogenes','h-influenzae','neisseria-meningitidis','e-coli','k-pneumoniae'],['neisseria-gonorrhoeae'],['p-aeruginosa','pseudomonas-aeruginosa-dtr','s-aureus-mrsa','e-faecalis','b-fragilis','legionella','mycoplasma','chlamydia-pneumoniae','e-coli-blee']);
add('meropenem imipenem-cilastatina',['e-coli','e-coli-blee','k-pneumoniae','b-fragilis','s-pneumoniae','s-pyogenes'],['p-aeruginosa','acinetobacter-baumannii-complex'],['s-aureus-mrsa','enterococcus-faecium-vre','legionella','mycoplasma','e-coli-blee'+'-CRE'],{'p-aeruginosa':'Sólo si AST confirma susceptibilidad; no extrapolar a DTR.'});
add('ertapenem',['e-coli','e-coli-blee','k-pneumoniae','b-fragilis','s-pneumoniae'],[],['p-aeruginosa','pseudomonas-aeruginosa-dtr','acinetobacter-baumannii-complex','s-aureus-mrsa','enterococcus-faecium-vre','legionella']);
add('vancomicina-iv',['s-aureus-mrsa','s-aureus-mssa','s-pneumoniae','s-pyogenes'],['e-faecalis','enterococcus-faecium'],['enterococcus-faecium-vre','e-coli','p-aeruginosa','b-fragilis','mycoplasma','legionella'],{'s-aureus-mssa':'Activo in vitro, pero β-lactámicos antiestafilocócicos son preferibles en enfermedad invasiva susceptible.'});
add('linezolid tedizolid',['s-aureus-mrsa','s-pneumoniae','enterococcus-faecium-vre'],['e-faecalis'],['e-coli','p-aeruginosa','b-fragilis','legionella']);
add('daptomicina',['s-aureus-mrsa','s-aureus-mssa','enterococcus-faecium-vre','e-faecalis'],[],['p-aeruginosa','e-coli','mycoplasma'],{'s-aureus-mrsa':'No utilizar para neumonía alveolar por inactivación por surfactante.'});
add('azitromicina claritromicina',['legionella','mycoplasma','chlamydia-pneumoniae','bordetella-pertussis'],['s-pneumoniae'],['e-coli','k-pneumoniae','p-aeruginosa','s-aureus-mrsa'],{'s-pneumoniae':'Resistencia a macrólidos puede ser alta según epidemiología local.'});
add('doxiciclina',['rickettsia-rickettsii','ehrlichia-chaffeensis','chlamydia-trachomatis','chlamydia-pneumoniae','mycoplasma','coxiella-burnetii','borrelia-burgdorferi'],['s-aureus-mrsa','legionella'],['p-aeruginosa','b-fragilis']);
add('metronidazol tinidazol',['b-fragilis','prevotella-spp','fusobacterium-necrophorum'],['clostridioides-difficile'],['e-coli','p-aeruginosa','s-aureus-mssa','s-aureus-mrsa','legionella','mycoplasma'],{'clostridioides-difficile':'Actividad in vitro no significa primera elección en CDI; revisar recomendaciones actualizadas.'});
add('piptazo',['e-coli','k-pneumoniae','b-fragilis','s-pyogenes','s-aureus-mssa'],['p-aeruginosa'],['s-aureus-mrsa','legionella','mycoplasma','e-coli-blee','enterococcus-faecium-vre'],{'e-coli-blee':'No preferido para infección invasiva por BLEE fuera de tracto urinario según IDSA; individualizar.'});
add('cefazolina oxacilina nafcilina flucloxacilina dicloxacilina',['s-aureus-mssa','s-pyogenes'],['s-pneumoniae'],['s-aureus-mrsa','p-aeruginosa','e-faecalis','legionella','mycoplasma']);
add('tmp-smx',['stenotrophomonas-maltophilia','nocardia-spp'],['s-aureus-mrsa','e-coli','k-pneumoniae'],['p-aeruginosa','b-fragilis']);
add('nitrofurantoina',['e-coli','staphylococcus-saprophyticus'],['e-faecalis'],['p-aeruginosa','proteus-mirabilis'],{'e-coli':'Cistitis no complicada; no pielonefritis, próstata ni bacteriemia.'});
add('ciprofloxacino',['e-coli','k-pneumoniae'],['p-aeruginosa'],['s-pneumoniae','enterococcus-faecium-vre','b-fragilis'],{'s-pneumoniae':'No se considera fluoroquinolona respiratoria de elección.'});
add('levofloxacino',['legionella','s-pneumoniae','mycoplasma','chlamydia-pneumoniae'],['e-coli','p-aeruginosa'],['s-aureus-mrsa','b-fragilis']);
add('isoniazida etambutol pirazinamida bedaquilina delamanid pretomanid clofazimina cicloserina',['mycobacterium-tuberculosis'],['mycobacterium-avium-complex'],['e-coli','s-aureus-mssa','p-aeruginosa'],{'mycobacterium-tuberculosis':'Actividad y relevancia de cada agente dependen de susceptibilidad y régimen combinado; no monoterapia.'});
function category(a,p){
 const r=relation(a.id,p.id),reg=rstatus(r);
 if(r)return {st:reg,source:"REGISTRO INDIVIDUAL · PRELIMINAR",note:r.note||"",ref:r.referenceKeys||[]};
 const entry=C[a.id];if(entry){
 if(entry.yes.has(p.id))return {st:"expected",source:"PERFIL FARMACOLÓGICO ORIENTATIVO",note:entry.remarks[p.id]||"Actividad habitual de la molécula o del grupo ante cepas susceptibles; no garantiza eficacia clínica.",ref:[]};
 if(entry.variable.has(p.id))return {st:"variable",source:"PERFIL FARMACOLÓGICO ORIENTATIVO",note:entry.remarks[p.id]||"La actividad varía con resistencia, especie, MIC o foco clínico; interpretar AST.",ref:[]};
 if(entry.no.has(p.id))return {st:"excluded",source:"PERFIL FARMACOLÓGICO ORIENTATIVO",note:entry.remarks[p.id]||"No se considera cobertura clínica confiable de este microorganismo.",ref:[]};
 }
 return {st:"unknown",source:"NO REVISADO",note:"No existe relación individual registrada ni una síntesis farmacológica revisada para este par; no significa resistente.",ref:[]};
}
const groupDefault=a=>{
 if(a.family==='Antimicobacterianos')return 'mycobacteria';
 if(/macrólidos|tetraciclinas/i.test(a.family))return 'atypicals';
 if(/nitroimidazoles|lincosamidas/.test(a.family))return 'anaerobes';
 if(/lipopéptidos|oxazolidinonas|glicopéptidos/i.test(a.family))return 'staph';
 if(/nitrofuranos|fosfonatos|carbapenémicos|cefalosporinas/i.test(a.family))return 'enterobacterales';
 const by=D.groups.map(g=>({id:g.id,n:members(g.id).filter(p=>category(a,p).st!=='unknown').length})).sort((a,b)=>b.n-a.n);return by[0]?.n?by[0].id:'staph';
};
const groupSel=new Map(), perStatus=(arr,s)=>arr.filter(p=>category(s,p).st!=="unknown").length;
function coveragePage(a){
 let g=groupSel.get(a.id)||groupDefault(a);
 if(!G(g))g='staph';
 const organism=members(g), data=organism.map(p=>({p,...category(a,p)}));
 let current=data.filter(x=>x.st!=="unknown").length;
 const statLabels=[['expected','Actividad habitual'],['active','Registro activo'],['conditional','Condicionada'],['variable','Espectro variable'],['excluded','No cubre'],['none','Registro sin actividad']];
 return `<div class="v23-cov">
 <div class="v23-cov-header"><span>ESPECTRO DE ${E(a.name).toUpperCase()} · INTERPRETACIÓN FÁRMACO–ESPECIE</span><h3>¿Qué microorganismos puede cubrir?</h3><p>La <strong>actividad farmacológica esperada</strong> no es un porcentaje de eficacia: requiere concentración adecuada en el sitio, sensibilidad del aislamiento y control del foco. Las relaciones individuales registradas se muestran por separado.</p></div>
 <nav class="v23-organism-nav">${D.groups.map(gr=>{const n=members(gr.id).filter(p=>category(a,p).st!=="unknown").length;return `<button class="${g===gr.id?'on':''}" data-act="v23-spectrum:${gr.id}" style="--gt:${grpcolor(gr.id)}"><span class="v23-nav-dot"></span><b>${E(gr.name)}</b><small>${n} perfiles disponibles</small></button>`}).join('')}</nav>
 <div class="v23-cov-hero"><div><small>GRUPO EN EXPLORACIÓN</small><h4>${E(G(g)?.name||g)}</h4><p>${current} de ${organism.length} especies con información farmacológica o un registro preliminar.</p></div><div class="v23-cov-stats">${statLabels.map(([st,label])=>{const n=data.filter(x=>x.st===st).length;return n?`<span class="v23-count ${st}"><b>${n}</b> ${label}</span>`:''}).join('')}</div></div>
 <div class="v23-organisms">${data.map(x=>`<article class="v23-pair ${x.st}"><header><span class="v23-pair-status">${display[x.st]?.[1]||'·'}</span><div><strong>${E(x.p.name)}</strong><small>${E(display[x.st]?.[0])}</small></div><button data-act="open-micro:${x.p.id}" title="Ficha microbiológica">Ficha ↗</button></header><p>${E(x.note)}</p><small class="v23-sourcekind">${E(x.source)}</small></article>`).join('')}</div>
 <div class="v23-cov-foot"><strong>LECTURA CRÍTICA</strong><p>Estas categorías describen actividad esperada o registros preliminares, <b>no tasas de éxito clínico ni antibiograma</b>. ESBL, AmpC, CRE, DTR, CRAB y VRE se consideran fenotipos particulares; no se extrapolan desde la especie sin resistencia caracterizada. Bibliografía de actualización: <a target="_blank" rel="noopener noreferrer" href="https://www.idsociety.org/practice-guideline/amr-guidance/">IDSA AMR Guidance 2026 ↗</a>.</p></div></div>`;
}
window.ATLAS23=window.ATLAS23||{};window.ATLAS23.coverage=category;
function enhance(){
 if(state.route!=='atb')return;
 const a=A(state.drug)||D.antibiotics[0];
 const target=document.querySelector('#drug-spectrum .v20-section-body');
 if(target)target.innerHTML=coveragePage(a);
}
const oldR=render;render=function(){oldR();enhance()};
document.addEventListener('click',e=>{
 const btn=e.target.closest('[data-act^="v23-spectrum:"], [data-act^="drug-territory:"]');
 if(!btn||state.route!=='atb')return;
 e.preventDefault();e.stopImmediatePropagation();
 const a=A(state.drug)||D.antibiotics[0];
 const parts=btn.getAttribute('data-act').split(':');
 const group=parts[0]==='drug-territory'?parts[2]:parts[1];
 if(!G(group))return;
 groupSel.set(a.id,group);
 enhance();
 document.querySelector('.v23-cov-hero')?.scrollIntoView({behavior:'smooth',block:'nearest'});
},true);
})();
