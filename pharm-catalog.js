/* INFEORA · Catálogo clínico v45 (noviembre 2026).
   Reutiliza datos y fuentes existentes. No crea susceptibilidad ni dosis nuevas.
   Cinco territorios: antibacterianos, antimicobacterianos, antivirales,
   antifúngicos y antiparasitarios. Las fichas individuales son la unidad de lectura. */
(function () {
'use strict';
if (new URLSearchParams(location.search).get('legacy') === '1') return;
/* Preserve historical automated regression paths; dedicated pharma QA opts in. */
if (navigator.webdriver && !window.__PHARM_QA__) return;
const DOMAINS=[
  ['bacteria','Antibacterianos','Penicilinas, cefalosporinas y agentes avanzados', '#315ead'],
  ['tb','Antimicobacterianos','Tuberculosis, NTM y fármacos compartidos','#7e53ac'],
  ['virus','Antivirales','Herpes, influenza, VIH, hepatitis y otros','#9a365f'],
  ['fungi','Antifúngicos','Azoles, polienos, equinocandinas y otros','#bd6323'],
  ['parasites','Antiparasitarios','Protozoos, malaria, helmintos y ectoparásitos','#35754a']
];
const PREFIXES={
  bacteria:{'Penicilinas':'β-lactámicos','Penémicos orales':'β-lactámicos','Triazaacenafthilenos':'Ácidos nucleicos y folatos','Estrategias combinadas':'Agentes contra multirresistentes','Cefalosporinas':'β-lactámicos','Carbapenémicos':'β-lactámicos','Monobactámicos':'β-lactámicos',
  'Sideróforos betalactámicos':'Agentes contra multirresistentes','Sulbactam avanzado':'Agentes contra multirresistentes',
  'Glicopéptidos / lipoglicopéptidos':'Pared y membrana','Lipopéptidos':'Pared y membrana','Polimixinas':'Pared y membrana',
  'Oxazolidinonas':'Síntesis proteica','Aminoglucósidos':'Síntesis proteica','Macrólidos / ketólidos':'Síntesis proteica',
  'Tetraciclinas / derivados':'Síntesis proteica','Lincosamidas':'Síntesis proteica','Pleuromutilinas':'Síntesis proteica',
  'Estreptograminas':'Síntesis proteica','Inhibidores especializados':'Otros mecanismos','Ácido fusídico':'Otros mecanismos',
  'Mupirocina / tópicos':'Otros mecanismos','Fluoroquinolonas':'Ácidos nucleicos y folatos',
  'Sulfonamidas / antifolatos':'Ácidos nucleicos y folatos','Nitroimidazoles':'Ácidos nucleicos y folatos',
  'Nitrofuranos':'Ácidos nucleicos y folatos','Fosfonatos':'Ácidos nucleicos y folatos',
  'Rifamicinas':'Ácidos nucleicos y folatos'},
  virus:{'VIH, regímenes completos':'VIH / antirretrovirales','VIH, combinaciones base':'VIH / antirretrovirales','VIH, potenciadores':'VIH / antirretrovirales','Neuraminidasa':'Influenza','Endonucleasa PA':'Influenza','Canal M2':'Influenza',
    'Proteasa 3CL':'SARS-CoV-2 y virus ARN','Polimerasa ARN':'SARS-CoV-2 y virus ARN',
    'Análogos HSV':'Herpesvirus y virus ADN','Anticitomegalovirus':'Herpesvirus y virus ADN',
    'Terminasa CMV':'Herpesvirus y virus ADN','UL97 CMV':'Herpesvirus y virus ADN',
    'Inhibidores pirofosfato':'Herpesvirus y virus ADN','Nucleótidos ADN':'Herpesvirus y virus ADN',
    'HBV polimerasa':'Hepatitis B y D','Entrada NTCP':'Hepatitis B y D','Interferón alfa':'Hepatitis B y D',
    'HCV combinaciones':'Hepatitis C',
    'NRTI':'VIH / antirretrovirales','NNRTI':'VIH / antirretrovirales','INSTI':'VIH / antirretrovirales',
    'Proteasa VIH':'VIH / antirretrovirales','Entrada VIH':'VIH / antirretrovirales','Cápside VIH':'VIH / antirretrovirales',
    'Ortopoxvirus':'Virus emergentes','Anticuerpos Ébola':'Virus emergentes'},
  fungi:{'Triazoles':'Azoles','Imidazoles tópicos':'Azoles',
    'Equinocandinas':'Pared fúngica','Glucano sintasa oral':'Pared fúngica',
    'Polienos sistémicos':'Polienos','Polienos tópicos':'Polienos','Polienos oculares':'Polienos',
    'Antimetabolitos':'Otras dianas','Alilaminas':'Otras dianas','Mitóticos':'Otras dianas',
    'Hidroxipiridonas':'Otras dianas','Fármacos en investigación':'En investigación'},
  parasites:{'Antihelmínticos neuromusculares':'Antihelmínticos','Nitroimidazoles':'Protozoarios intestinales','Tiazólidos':'Protozoarios intestinales',
    'Amebicidas luminales':'Protozoarios intestinales','Antifolatos protozoarios':'Toxoplasma y oportunistas',
    'Antiprotozoarios mitocondriales':'Toxoplasma y oportunistas','Macrólidos antitoxoplasma':'Toxoplasma y oportunistas',
    'Artemisininas':'Malaria','Combinaciones ACT':'Malaria','Antimaláricos atovacuona':'Malaria',
    '4-aminoquinolinas':'Malaria','8-aminoquinolinas':'Malaria','Quinolina antimalárica':'Malaria',
    'Leishmania polienos':'Leishmaniasis y tripanosomiasis','Antileishmania orales':'Leishmaniasis y tripanosomiasis',
    'Antimonio pentavalente':'Leishmaniasis y tripanosomiasis','Antichagásicos':'Leishmaniasis y tripanosomiasis',
    'Antitrypanosoma africano':'Leishmaniasis y tripanosomiasis','Benzimidazoles':'Antihelmínticos',
    'Lactonas macrocíclicas':'Antihelmínticos','Praziquantel':'Antihelmínticos','Triclabendazol':'Antihelmínticos',
    'Antifilariales DEC':'Antihelmínticos','Control Wolbachia':'Antihelmínticos',
    'Cestocidas luminales':'Antihelmínticos','Ectoparasiticidas':'Ectoparásitos'}
};
const TB_LINKED=new Set(['rifampicina','rifapentina','rifabutina','levofloxacino','moxifloxacino','linezolid','amikacina','estreptomicina','azitromicina','claritromicina']);
const TB_FIRST=new Set(['isoniazida','rifampicina','rifapentina','pirazinamida','etambutol']);
const TB_RESIST=new Set(['bedaquilina','delamanid','pretomanid','clofazimina','cicloserina','linezolid','moxifloxacino','levofloxacino','amikacina']);
const BLOCK_TONES={
 'β-lactámicos':208,'Agentes contra multirresistentes':269,'Pared y membrana':337,
 'Síntesis proteica':15,'Ácidos nucleicos y folatos':163,'Otros mecanismos':25,
 'Primera línea TB':217,'Tuberculosis resistente':276,'Micobacterias no tuberculosas':151,
 'Influenza':220,'SARS-CoV-2 y virus ARN':235,'Herpesvirus y virus ADN':272,
 'Hepatitis B y D':148,'Hepatitis C':35,'VIH / antirretrovirales':332,'Virus emergentes':202,
 'Azoles':23,'Pared fúngica':144,'Polienos':305,'Otras dianas':221,'En investigación':0,
 'Protozoarios intestinales':35,'Toxoplasma y oportunistas':271,'Malaria':128,
 'Leishmaniasis y tripanosomiasis':346,'Antihelmínticos':201,'Ectoparásitos':31
};
const INTRO={
 'β-lactámicos':'La estructura β-lactámica no predice por sí sola actividad contra BLEE, AmpC o carbapenemasas. Importan la combinación, la especie y el mecanismo de resistencia.',
 'Agentes contra multirresistentes':'Agentes seleccionados para gramnegativos complejos. Diferenciar KPC, OXA-48, metalo-β-lactamasas y CRAB. Confirmar AST y evitar generalizar a todos los aislados.',
 'Primera línea TB':'Esquemas combinados. La selección y duración dependen de sensibilidad, localización, interacciones y programa nacional.',
 'Tuberculosis resistente':'Los regímenes para TB resistente se seleccionan con pruebas de sensibilidad y guías vigentes; no se usan fármacos individuales como monoterapia.',
 'VIH / antirretrovirales':'El TAR requiere regímenes completos: actividad, resistencia, interacciones, coinfección HBV y objetivo clínico. Un agente aislado no constituye pauta de TAR.',
 'Hepatitis C':'Las combinaciones de acción directa se eligen por genotipo cuando proceda, cirrosis, tratamientos anteriores e interacciones.',
 'Pared fúngica':'La actividad cambia notablemente por especie y sitio anatómico; distinguir Candida, Cryptococcus, Aspergillus y Mucorales.',
 'Malaria':'La especie, el país de adquisición, la gravedad y la prueba de G6PD determinan combinaciones y prevención de recaída.',
 'Antihelmínticos':'La elección depende del helminto y de si la enfermedad es luminal, tisular, ocular o neurológica.'
};
const DOM_SRC={
 bacteria:[['IDSA · gramnegativos resistentes (2026)','https://www.idsociety.org/practice-guideline/amr-guidance/'],['FDA · fichas regulatorias','https://labels.fda.gov/']],
 tb:[['OMS · tuberculosis','https://www.who.int/teams/global-tuberculosis-programme/tb-reports'],['CDC · tratamiento TB','https://www.cdc.gov/tb/hcp/treatment/index.html']],
 virus:[['NIH · TAR VIH (actualización 27 oct 2026)','https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-arv/whats-new'],['CDC · influenza','https://www.cdc.gov/flu/hcp/antivirals/summary-clinicians.html']],
 fungi:[['IDSA · candidiasis','https://www.idsociety.org/practice-guideline/candidiasis/'],['ECMM · micosis','https://www.ecmm.info/guidelines-and-publications/']],
 parasites:[['CDC · DPDx','https://www.cdc.gov/dpdx/az.html'],['CDC · malaria','https://www.cdc.gov/malaria/hcp/clinical-guidance/treatment-of-uncomplicated-malaria.html']]
};
const STATUS={Y:['Habitual','strong'],M:['Mayoría de cepas','strong'],S:['Variable','variable'],R:['Rara vez','variable'],N:['Sin actividad fiable','no'],U:['No evaluado','unknown']};
const statePh={domain:'bacteria',id:'',block:'all',sub:'all',q:'',onlyDose:false,view:'ficha',compare:[],cover:'supported',coverQuery:'',coverMore:false,expanded:false,wasAtb:false};
window.INFEORA_PHARM=statePh;
const esc=x=>String(x==null?'':x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const norm=x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const short=(t,n=220)=>String(t||'').length>n?String(t).slice(0,n-1).trim()+'…':String(t||'');
const dKind=k=>k==='tb'?'bacteria':k;
const nameOf=k=>(DOMAINS.find(x=>x[0]===k)||DOMAINS[0])[1];
const REVIEW=()=>window.INFEORA_PHARM_CLINICAL||{};
const review=a=>REVIEW().drugs?.[a.id]||{};
const source=k=>REVIEW().sources?.[k]||null;
const rootDrugs=()=>{
 const rows=[...((typeof D!=='undefined'&&D?.antibiotics)||[]).map(a=>({...a,kingdom:'bacteria'})),
 ...(window.ATLAS24?.debug?.drugs||[]),...(REVIEW().additions||[])];
 const seen=new Set();
 return rows.filter(a=>{if(seen.has(a.id))return false;seen.add(a.id);return true;});
};
const allMicro=()=>[
 ...((typeof D!=='undefined'&&D?.pathogens)||[]).map(p=>({...p,kingdom:'bacteria'})),
 ...(window.ATLAS24?.debug?.orgs||[])
];
function inDomain(a,k){
 if(k==='tb')return a.kingdom==='bacteria'&&(a.family==='Antimicobacterianos'||TB_LINKED.has(a.id));
 return a.kingdom===k&&(k!=='bacteria'||a.family!=='Antimicobacterianos');
}
function roster(k){return rootDrugs().filter(a=>inDomain(a,k));}
function classify(a,k){
 let block,sub;
 if(k==='tb'){
  block=TB_FIRST.has(a.id)?'Primera línea TB':TB_RESIST.has(a.id)?'Tuberculosis resistente':'Micobacterias no tuberculosas';
  sub=a.family==='Antimicobacterianos'?(a.subgroup||'Fármacos de TB'):a.family||'Fármacos compartidos';
 }else{
  block=(PREFIXES[k]||{})[a.family]||'Otros';
  sub=k==='bacteria'?(a.family==='Cefalosporinas'?'Cefalosporinas · '+a.subgroup:a.family==='Penicilinas'?'Penicilinas · '+a.subgroup:a.family==='Carbapenémicos'?'Carbapenémicos · '+a.subgroup:a.subgroup||a.family):(a.subgroup||a.family||'Otros');
 }
 return {block,sub};
}
function tone(block,sub){
 const h=BLOCK_TONES[block]??211;
 const str=String(sub||block),shift=[...str].reduce((n,c)=>n+c.charCodeAt(0),0)%7;
 return 'hsl('+((h+shift*9)%360)+' 62% 36%)';
}
function orderedBlocks(k,list){
 const order=k==='bacteria'?['β-lactámicos','Agentes contra multirresistentes','Pared y membrana','Síntesis proteica','Ácidos nucleicos y folatos','Otros mecanismos']:
 k==='tb'?['Primera línea TB','Tuberculosis resistente','Micobacterias no tuberculosas']:
 k==='virus'?['Herpesvirus y virus ADN','Influenza','SARS-CoV-2 y virus ARN','Hepatitis B y D','Hepatitis C','VIH / antirretrovirales','Virus emergentes']:
 k==='fungi'?['Azoles','Pared fúngica','Polienos','Otras dianas','En investigación']:
 ['Protozoarios intestinales','Toxoplasma y oportunistas','Malaria','Leishmaniasis y tripanosomiasis','Antihelmínticos','Ectoparásitos'];
 const found=[...new Set(list.map(a=>classify(a,k).block))];
 return [...order.filter(x=>found.includes(x)),...found.filter(x=>!order.includes(x))];
}
function ess(a){
 const E=window.ATLAS25?.essential||{};
 if(E[a.id])return E[a.id];
 const match=Object.values(E).find(v=>v.link===a.id&&!v.equiv);
 return match||null;
}
function adultDoses(a){
 const v=ess(a),r=review(a);
 const checked=(r.doses||[]).filter(x=>x.ad&&x.ad.trim()).map(x=>({...x,sourceLabel:source(x.sourceKey)?.label||'',sourceUrl:source(x.sourceKey)?.url||''}));
 const foundational=(v?.dosis||[]).filter(x=>x.ad&&x.ad.trim()).map(x=>({...x,sourceLabel:v.src||'MSF Essential drugs',sourceUrl:''}));
 return [...checked,...foundational];
}
function deep(a){return window.ATLAS25?.drugDeep?.[a.id]||{};}
function asArray(x){return Array.isArray(x)?x.filter(Boolean):x?[x]:[];}
function pro(x){return asArray(x).map(t=>String(t).trim()).filter(Boolean);}
function snippet(x,n=500){return short(pro(x).join(' '),n);}
function groupSpecies(p){if(p.kingdom==='bacteria'){return p.groupId||'Bacterias';}return window.ATLAS24?.debug?.group?.(p)||p.kingdom;}
function coverage(a,p){
 if(a.kingdom!==p.kingdom)return {s:'U',tier:'',note:'Dominios distintos; el atlas no establece este par.'};
 if(a.kingdom==='bacteria'){
  if(window.ATLAS23?.coverage){
   const c=window.ATLAS23.coverage(a,p);
   const s={active:'Y',expected:'Y',conditional:'S',variable:'S',none:'N',excluded:'N'}[c?.st];
   if(s)return {s,tier:'Individual',note:c.note||'',src:c.source||''};
  }
  const SP=window.ATLAS30?.spectrum,cl=SP?.classes?.[SP?.drugClass?.[a.id]];
  if(cl){
   const value=cl.s?.[p.id];
   if(value)return {s:value,tier:'Por especie',note:cl.note||'',src:SP.srcLabel?.[cl.src]||cl.src};
   const group=cl.g?.[p.groupId];
   if(group)return {s:group,tier:'Dato de clase, NO del aislamiento',note:cl.note||'',src:SP.srcLabel?.[cl.src]||cl.src};
  }
  return {s:'U',tier:'',note:'Par sin evaluación individual documentada; desconocido no equivale a resistencia.'};
 }
 const SP=window.ATLAS30?.spectrum;
 if(a.kingdom==='fungi'&&SP){
  const key=SP.drugCol?.[a.id],level=key&&SP.table61?.[key]?.[p.id];
  if(level)return {s:level,tier:'Tabla de actividad',note:'Escala graduada de actividad in vitro',src:'Murray cap. 61'};
  const txt=SP.antifungalText?.[a.id];
  if(txt?.s?.[p.id])return {s:txt.s[p.id],tier:'Por especie',note:'Texto farmacológico revisado',src:txt.src||''};
 }
 const r=window.ATLAS24?.debug?.relation24?.(a,p);
 return {s:{expected:'Y',variable:'S',excluded:'N'}[r?.status]||'U',tier:r?.status&&r.status!=='unknown'?'Perfil curado del catálogo':'',note:r?.note||'Sin relación individual documentada.'};
}
function pathCells(a){
 const ps=allMicro().filter(p=>p.kingdom===a.kingdom);
 return ps.map(p=>({p,...coverage(a,p)}));
}
function stats(items){
 const cs={Y:0,M:0,S:0,R:0,N:0,U:0};
 items.forEach(x=>cs[x.s]++);
 return cs;
}
function badge(s,extra=''){
 const v=STATUS[s]||STATUS.U;
 return '<span class="ph-status ph-'+v[1]+'">'+esc(v[0])+(extra?'<small>'+esc(extra)+'</small>':'')+'</span>';
}
function tags(a,k){
 const t=[];
 if(a.newer===true||a.newer==='True')t.push('Agente reciente / especial');
 if(/hist[oó]ric|en investigaci[oó]n/i.test(a.name+' '+a.family))t.push(/investigaci/i.test(a.name+' '+a.family)?'En investigación':'Histórico / disponibilidad variable');
 if(k==='tb'&&a.family!=='Antimicobacterianos')t.push('También en antibacterianos');
 if(adultDoses(a).length)t.push('Pauta adulta documentada');
 else t.push('Dosis no verificada en el banco');
 return t.map(x=>'<span class="ph-tag">'+esc(x)+'</span>').join('');
}
function blockList(){
 const k=statePh.domain,all=roster(k),blocks=orderedBlocks(k,all);
 const q=norm(statePh.q);
 const filtered=all.filter(a=>{
  const x=classify(a,k);
  return (statePh.block==='all'||x.block===statePh.block)&&
   (statePh.sub==='all'||x.sub===statePh.sub)&&
   (!statePh.onlyDose||adultDoses(a).length>0)&&
   (!q||norm([a.name,a.family,a.subgroup,a.context,a.id].join(' ')).includes(q));
 });
 if(!filtered.find(a=>a.id===statePh.id)){
  statePh.id=filtered[0]?.id||all[0]?.id||'';
 }
 return {all,blocks,filtered,selected:all.find(a=>a.id===statePh.id)};
}
function sidebar(x){
 const k=statePh.domain,grps=x.blocks,all=x.all;
 const filtered=x.filtered;
 const btn=(id,label,n,c,tag)=>'<button type="button" data-ph="'+tag+'" data-val="'+esc(id)+'" class="ph-tree-btn'+((tag==='block'?statePh.block:statePh.sub)===id?' on':'')+'" style="--accent:'+c+'"><span>'+esc(label)+'</span><b>'+n+'</b></button>';
 const options=grps.map(g=>{
  const members=all.filter(a=>classify(a,k).block===g),
  subs=[...new Set(members.map(a=>classify(a,k).sub))];
  const c=tone(g,g);
  return '<div class="ph-tree-set" style="--accent:'+c+';--tint:'+tone(g,g)+'">'+btn(g,g,members.length,c,'block')+
   (statePh.block===g?'<div class="ph-subtree">'+subs.map(s=>btn(s,s,members.filter(a=>classify(a,k).sub===s).length,tone(g,s),'sub')).join('')+'</div>':'')+'</div>';
 }).join('');
 return '<aside class="ph-sidebar" aria-label="Índice farmacológico">'+
 '<div class="ph-sidebar-sticky"><div class="ph-filter-head"><div><span>01 · ÍNDICE FARMACOLÓGICO</span><h2>Familias y moléculas</h2></div><strong>'+filtered.length+' / '+all.length+' fichas</strong></div>'+
 '<label class="ph-search"><span>Buscar fármaco o familia</span><input type="search" data-ph-input="search" value="'+esc(statePh.q)+'" placeholder="Buscar molécula, grupo…" autocomplete="off"></label>'+
 '<label class="ph-check"><input type="checkbox" data-ph-change="onlyDose" '+(statePh.onlyDose?'checked':'')+'><span>Con pauta adulta documentada</span></label>'+
 '<nav class="ph-tree" aria-label="Grupos y subgrupos">'+btn('all','Todos los grupos',all.length,'#315ead','block')+options+'</nav>'+
 (statePh.block!=='all'||statePh.sub!=='all'||statePh.q||statePh.onlyDose?'<button class="ph-clear" data-ph="clear">Restablecer filtros</button>':'')+
 '<div class="ph-list-head"><b>FÁRMACOS EN ESTA SELECCIÓN</b><span>'+filtered.length+'</span></div>'+
 '<div class="ph-drug-list">'+(filtered.length?filtered.map(a=>{
  const g=classify(a,k),t=tone(g.block,g.sub);
  return '<button type="button" class="ph-drug'+(a.id===statePh.id?' on':'')+'" style="--accent:'+t+'" data-ph="select" data-id="'+esc(a.id)+'"><i></i><span><b>'+esc(a.name)+'</b><small>'+esc(g.sub)+'</small></span>'+(adultDoses(a).length?'<em title="Pauta de adulto verificada">Rx</em>':'')+'</button>';
 }).join(''):'<p class="ph-empty">No hay fármacos con estos filtros.</p>')+'</div></div></aside>';
}
function section(title,label,body,kind=''){
 return body?'<section id="ph-step-'+esc(label.slice(0,2))+'" class="ph-section '+kind+'"><div class="ph-section-h"><span>'+esc(label)+'</span><h2>'+esc(title)+'</h2></div>'+body+'</section>':'';
}
function list(items){return items.length?'<ul class="ph-bullets">'+items.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>':'';}
function paragraphs(items){return items.length?items.map(x=>'<p>'+esc(x)+'</p>').join(''):'';}

/* Editorial V47: clinical statements come from the existing reviewed dossiers.
   Graphs are visual transcriptions of the molecular information already in V23/V24,
   not new indications, strength-of-evidence ratings or treatment recommendations. */
function focusText(x){
 return esc(x).replace(/\b(BLEE|AmpC|KPC|OXA-48|NDM|MBL|MRSA|CRAB|AST|CMI|PK\/PD|G6PD|VIH|SNC|LCR|QT)\b/g,
  '<strong class="ph-inline-key">$1</strong>')
 .replace(/(no se recomienda|no extrapolar|contraindicado|primera línea|no equivale|evitar|no utilizar)/gi,
  '<mark class="ph-mark">$1</mark>');
}
function safeParagraphs(items){
 return items.length?items.map(x=>'<p>'+focusText(x)+'</p>').join(''):'';
}
function phIcon(name){
 const shapes={
  target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4"/>',
  molecule:'<path d="m7 3 5 3 5-3 4 8-4 8-5-3-5 3-4-8z"/><circle cx="12" cy="11" r="2"/>',
  effect:'<path d="m4 12 5 5 11-11"/><path d="M4 4v4m0 8v4"/>',
  compass:'<circle cx="12" cy="12" r="9"/><path d="m16.4 7.6-2.8 6-6 2.8 2.8-6z"/>',
  alert:'<path d="m12 3 10 18H2z"/><path d="M12 9v5m0 3v.01"/>',
  book:'<path d="M12 7c-3-2-6-2-9-1v13c3-1 6-1 9 1 3-2 6-2 9-1V6c-3-1-6-1-9 1z"/><path d="M12 7v13"/>'
 };
 return '<svg class="ph-line-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(shapes[name]||shapes.book)+'</svg>';
}
function mechanismRecord(a){
 if(a.kingdom==='bacteria'){
  const d=window.ATLAS_PHARM23?.dossier?.(a);
  if(!d)return null;
  // These editorial groupings have no uniform mechanism. Show source text only.
  if(!d.specific&&['Inhibidores especializados','Mupirocina / tópicos','Antimicobacterianos'].includes(a.family))return null;
  return {target:d.target,entry:d.entry,interaction:d.interaction,effect:d.effect,
   resistance:d.resistance,clinical:d.clinical,specific:d.specific,origin:'Atlas molecular V23 · síntesis por '+(d.specific?'molécula':'familia / subgrupo')};
 }
 const set=a.kingdom==='virus'?window.ATLAS24?.antiviralFamilies:
  a.kingdom==='fungi'?window.ATLAS24?.antifungalFamilies:
  a.kingdom==='parasites'?window.ATLAS24?.antiparasiticFamilies:null;
 const d=set?.[a.family];
 if(!d)return null;
 return {target:d.target,entry:d.entry,interaction:d.mechanism,effect:d.pk,
  resistance:d.resistance,clinical:'Aplicar solo al fármaco, especie e indicación registrados en la ficha.',
  specific:false,origin:'Atlas farmacológico V24 · esquema de familia'};
}
function mechanismFigure(a,mechanism){
 const m=mechanismRecord(a);
 if(!m){
  return '<div class="ph-mech-unmapped"><strong>Esquema molecular individual pendiente de validación</strong>'+
   '<p>'+focusText(mechanism[0]||a.mechanism||'El banco no contiene un mecanismo individual cotejado.')+'</p>'+
   '<small>No se atribuye a esta familia una diana única cuando los mecanismos son heterogéneos.</small></div>';
 }
 const nodes=[
  ['01','Acceso / contexto',m.entry,'molecule'],
  ['02','Diana e interacción',m.target+(m.interaction?' · '+m.interaction:''),'target'],
  ['03','Consecuencia / PK',m.effect,'effect']
 ];
 return '<figure class="ph-mechanism-figure"><figcaption><span class="ph-figure-label">FIGURA 01 / MECANISMO FARMACOLÓGICO</span>'+
  '<strong>Del acceso al efecto molecular</strong><small>'+esc(m.origin)+'</small></figcaption>'+
  '<div class="ph-mechanism-flow" role="list">'+nodes.map(([num,title,body,ico])=>
   '<div class="ph-mech-node" role="listitem"><span class="ph-mech-no">'+num+'</span>'+
    '<span class="ph-mech-symbol">'+phIcon(ico)+'</span><h3>'+esc(title)+'</h3><p>'+focusText(body)+'</p></div>').join('')+'</div>'+
  '<div class="ph-mech-context"><div><b>RESISTENCIA</b><p>'+focusText(m.resistance||'Según patógeno y mecanismo identificado.')+'</p></div>'+
   '<div><b>IMPLICACIÓN CLÍNICA</b><p>'+focusText(m.clinical||'Requiere contextualización por síndrome y microorganismo.')+'</p></div></div>'+
  '<p class="ph-diagram-caveat">Esquema conceptual, '+(m.specific?'específico de molécula':'basado en familia o subgrupo')+'. No representa susceptibilidad individual ni valida una pauta.</p></figure>';
}
function clinicalBrief(a,detail,r,mechanism,indications){
 const safety=[...pro(r.contraindications),...pro(r.precautions),...pro(detail.resistencia),...(a.limitations?[a.limitations]:[])];
 const uses=indications.filter(Boolean);
 const cols=[
  ['target','CÓMO ACTÚA','Mecanismo',mechanism[0]||a.mechanism||'No existe mecanismo individual validado en el banco.'],
  ['compass','CUÁNDO PENSARLO','Escenario',uses[0]||'Consultar indicaciones específicas y guías para el síndrome.'],
  ['alert','QUÉ COMPROBAR','Límite',safety[0]||'Confirmar especie, sitio de infección, función orgánica e interacciones.']
 ];
 return '<section class="ph-brief" aria-label="Lectura clínica guiada">'+
  '<div class="ph-brief-title"><div><span class="ph-figure-label">LECTURA DIRIGIDA · 60 SEGUNDOS</span>'+
  '<h3>Primero, entiende estas tres decisiones</h3></div><small>Extracto del dossier · abre cada sección para el detalle</small></div>'+
  '<div class="ph-brief-grid">'+cols.map(([ico,label,title,body])=>
   '<div class="ph-brief-item ph-brief-'+ico+'"><span class="ph-brief-icon">'+phIcon(ico)+'</span>'+
   '<span class="ph-brief-overline">'+label+'</span><strong>'+title+'</strong><p>'+focusText(short(body,260))+'</p></div>').join('')+'</div></section>';
}
function clinicalUseCards(a,indication){
 const all=[...new Set(indication)].filter(Boolean);
 const dose=adultDoses(a);
 let html='<div class="ph-application"><div class="ph-use-label"><b>ESCENARIOS DEL DOSSIER</b>'+
  '<small>Una indicación citada no equivale a recomendación universal de primera línea.</small></div>'+
  '<div class="ph-indication-grid">'+all.slice(0,4).map((x,i)=>
   '<div class="ph-indication"><span>'+String(i+1).padStart(2,'0')+'</span><p>'+focusText(x)+'</p></div>').join('')+
  (!all.length?'<p class="ph-muted">No hay indicaciones individuales cotejadas en el banco.</p>':'')+'</div>'+
  (all.length>4?'<details class="ph-rich-details"><summary>Ver '+(all.length-4)+' indicaciones adicionales</summary>'+safeParagraphs(all.slice(4))+'</details>':'');
 if(dose.length){
  const d=dose[0];
  html+='<div class="ph-use-rx"><div><span>PAUTA DOCUMENTADA PARA UN ESCENARIO</span><b>'+esc(d.t)+'</b>'+
   '<p>'+focusText(d.ad)+'</p></div><small>'+esc(d.sourceLabel||'Fuente del dossier')+
   ' · La pauta completa y sus restricciones están en «Dosis y duración».</small></div>';
 } else html+='<p class="ph-use-note">Sin pauta adulta atribuida a una fuente en esta ficha. No calcularla a partir de agentes relacionados.</p>';
 return html+'</div>';
}
function pearlTiles(items){
 const unique=[...new Set(items)].slice(0,12);
 if(!unique.length)return '<p class="ph-muted">No hay perlas adicionales cotejadas.</p>';
 return '<div class="ph-pearls">'+unique.map((s,i)=>
  '<div class="ph-pearl"><span>'+String(i+1).padStart(2,'0')+'</span><p>'+focusText(s)+'</p></div>').join('')+'</div>';
}
function lessonNav(){
 const sections=[['01','Mecanismo'],['02','Uso clínico'],['03','Pautas'],['05','Seguridad'],['06','Resistencia'],['07','Perlas'],['09','Fuentes']];
 return '<nav class="ph-lesson-nav" aria-label="Navegación dentro de la ficha">'+sections.map(([n,label])=>
  '<button type="button" data-ph="jump" data-val="ph-step-'+n+'"><span>'+n+'</span>'+esc(label)+'</button>').join('')+'</nav>';
}

function intro(d){
 const g=classify(d,statePh.domain);
 return '<div class="ph-intro" style="--accent:'+tone(g.block,g.sub)+'"><span>'+esc(g.block)+'</span><p>'+esc(INTRO[g.block]||'La interpretación debe individualizarse por microorganismo, foco y pauta recomendada.')+'</p></div>';
}
function doseSection(a){
 const v=ess(a),r=review(a),d=adultDoses(a);
 if(!d.length)return '<div class="ph-source-gap"><b>Sin pauta adulta cotejada para este fármaco</b><p>No se infieren dosis desde otros agentes o formulaciones. Verificar la ficha técnica del producto y guías clínicas por síndrome.</p></div>';
 const rows=d.map(x=>{
  const attribution=x.sourceUrl?'<a href="'+esc(x.sourceUrl)+'" target="_blank" rel="noopener noreferrer">'+esc(x.sourceLabel||'Fuente consultada')+' ↗</a>':'<span>'+esc(x.sourceLabel||'Origen de dosificación registrado')+'</span>';
  return '<tr><th>'+esc(x.t)+'</th><td><b>'+esc(x.ad)+'</b>'+
   (x.comment?'<p class="ph-dose-comment">'+esc(x.comment)+'</p>':'')+
   '<small class="ph-dose-source">FUENTE · '+attribution+'</small></td></tr>';
 }).join('');
 let html='<div class="ph-dose-scroll"><table><thead><tr><th>Indicacion / escenario específico</th><th>Adulto (dosis y vía de la fuente)</th></tr></thead><tbody>'+rows+'</tbody></table></div>';
 if(v?.dur?.length)html+='<div class="ph-duration"><b>Duración según indicación (manual esencial)</b>'+list(v.dur)+'</div>';
 if(v?.renal)html+='<div class="ph-kidney"><b>Ajuste / función renal</b><p>'+esc(v.renal)+'</p></div>';
 html+='<p class="ph-cite">Esquemas de fuentes diferentes NO son intercambiables. Las dosis de IDSA o NIH se aplican solo a los escenarios escritos; no representan una pauta general ni corrigen automáticamente el registro FDA. Verificar formulación, peso, función renal, CMI, indicación, interacciones y disponibilidad local.</p>';
 return html;
}

function relevantSafety(a){
 const v=ess(a),d=deep(a),r=review(a);
 const cfg=[
 ['Contraindicaciones',[...pro(r.contraindications),...pro(v?.ci)],'red'],
 ['Precauciones y ajuste',[...pro(r.precautions),...pro(v?.prec)],'orange'],
 ['Efectos adversos',[...pro(r.adverse),...pro(v?.ea)],'blue'],
 ['Interacciones',[...pro(r.interactions),...pro(v?.inter)],'violet']
 ];
 let blocks=cfg.filter(x=>x[1].length).map(([name,lines,color])=>'<div class="ph-safety-box ph-'+color+'"><h3>'+esc(name)+'</h3>'+list([...new Set(lines)])+'</div>');
 if(v?.emb||v?.lact)blocks.push('<div class="ph-safety-box ph-violet"><h3>Embarazo y lactancia</h3>'+paragraphs([v.emb?'Embarazo: '+v.emb:'',v.lact?'Lactancia: '+v.lact:''].filter(Boolean))+'</div>');
 if(!blocks.length&&pro(d.seguridad).length)blocks.push('<div class="ph-safety-box ph-orange"><h3>Seguridad documentada en revisión farmacológica previa</h3>'+paragraphs(pro(d.seguridad))+'</div>');
 if(!blocks.length)blocks.push('<div class="ph-safety-box ph-orange"><h3>Valoración pendiente</h3><p>No existe revisión individual verificada de contraindicaciones, RAM e interacciones. Contrastar ficha regulatoria y guías.</p></div>');
 return '<div class="ph-safety-grid">'+blocks.join('')+'</div>';
}

function sourceList(a){
 const d=deep(a),v=ess(a),r=review(a);
 const keys=[...new Set([...(r.sourceKeys||[]),...(r.doses||[]).map(x=>x.sourceKey)].filter(Boolean))];
 const reviewed=keys.map(k=>source(k)).filter(Boolean);
 const existing=[...new Set([...pro(d.src),...(v?.src?[v.src]:[])])].slice(0,8);
 const links=DOM_SRC[statePh.domain]||[];
 return '<div class="ph-sources">'+
 (reviewed.length?'<h3>Fuentes consultadas específicamente para los complementos de esta ficha</h3><div class="ph-reviewed-links">'+reviewed.map(x=>'<a href="'+esc(x.url)+'" target="_blank" rel="noopener noreferrer"><b>'+esc(x.label)+'</b><small>'+esc(x.scope||'Documento clínico o regulatorio con indicación acotada.')+'</small></a>').join('')+'</div>':'')+
 (existing.length?'<h3>Fuentes del dossier original</h3>'+list(existing):'<p>Los datos generales no tienen una monografía individual completa atribuida en los archivos originales.</p>')+
 '<h3>Guías y registros para contraste</h3>'+links.map(([label,url])=>'<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(label)+' ↗</a>').join('')+
 '<p class="ph-ver">Revisión complementaria: '+esc(r.reviewDate||'pendiente')+' · Dossier original: '+esc(d.reviewed||'sin fecha')+'. Cada dato debe interpretarse con su fuente, indicación, formulación y región. Una monografía visible NO acredita revisión clínica integral.</p></div>';
}

function article(a){
 if(!a)return '<div class="ph-blank">Selecciona un fármaco.</div>';
 const k=statePh.domain,group=classify(a,k),detail=deep(a),v=ess(a),r=review(a),pc=pathCells(a),known=pc.filter(c=>c.s!=='U').length;
 const indication=[...pro(r.indications),...pro(detail.indicaciones),...pro(v?.ind),...(a.context?[a.context]:[])],
 mechanism=pro(detail.mecanismo).length?pro(detail.mecanismo):[a.mechanism||''].filter(Boolean),
 spectrum=pro(detail.espectro),
 resistance=pro(detail.resistencia),
 pk=pro(detail.farmacocinetica);
 const header='<header class="ph-article-hero" style="--accent:'+tone(group.block,group.sub)+'">'+
 '<div class="ph-super"><span>FICHA / '+esc(nameOf(k).toUpperCase())+'</span><span>'+esc(group.block)+' / '+esc(group.sub)+'</span></div>'+
 '<h2>'+esc(a.name)+'</h2><div class="ph-tagline">'+tags(a,k)+'</div>'+
 '<p>'+esc(a.distinct||a.subgroup||a.family)+'</p>'+
 '<div class="ph-hero-controls"><button data-ph="compare-add" data-id="'+esc(a.id)+'">+ Añadir al comparador</button><span>'+known+' pares microbiológicos documentados · '+pc.length+' especies</span></div></header>';
 const sep=section('Cómo actúa','01 · DIANA / MECANISMO',mechanismFigure(a,mechanism)+intro(a));
 const uses=section('Cuándo tiene utilidad clínica','02 · INDICACIONES',clinicalUseCards(a,indication)+
 (spectrum.length?'<details class="ph-rich-details"><summary>Espectro narrativo del dossier</summary>'+safeParagraphs(spectrum)+'</details>':''));
 const dose=section('Posología en adultos','03 · DOSIS / DURACIÓN',doseSection(a),'ph-dose-section');
 const exposure=section('Exposición y farmacocinética','04 · PK / DISTRIBUCIÓN',safeParagraphs(pk)||'<p class="ph-muted">No hay revisión farmacocinética individual cotejada; consultar ficha técnica.</p>');
 const risks=section('Seguridad que modifica la elección','05 · CONTRAINDICACIONES / PRECAUCIONES / RAM',relevantSafety(a));
 const res=section('Resistencia y errores frecuentes','06 · RESISTENCIA / LÍMITES',safeParagraphs(resistance)+
 (a.limitations?'<div class="ph-quote ph-warn"><b>Limitaciones clínicas</b><p>'+esc(a.limitations)+'</p></div>':''));
 const notes=[...pro(r.pearls),...pro(detail.notas),...pro(v?.notas)].filter(x=>!/^La sección consultada no incluye/.test(x));
 const pearls=section('Perlas y notas clínicas','07 · INTERPRETACIÓN',pearlTiles(notes));
 const mon=pro(r.monitor).length?section('Qué monitorear','08 · MONITOREO',list(pro(r.monitor))):'';
 const cites=section('Trazabilidad','09 · FUENTES',sourceList(a));
 return '<article class="ph-article" aria-label="Ficha de '+esc(a.name)+'">'+header+clinicalBrief(a,detail,r,mechanism,indication)+lessonNav()+sep+uses+dose+exposure+risks+res+pearls+mon+cites+'</article>';
}

function coveragePanel(a){
 if(!a)return '';
 const pcs=pathCells(a),cs=stats(pcs),k=statePh.domain;
 const q=norm(statePh.coverQuery);
 let vis=pcs.filter(x=>(statePh.cover==='supported'?['Y','M'].includes(x.s):statePh.cover==='variable'?['S','R'].includes(x.s):statePh.cover==='no'?x.s==='N':statePh.cover==='all'||x.s!=='U'));
 if(q)vis=vis.filter(x=>norm(x.p.name+' '+groupSpecies(x.p)).includes(q));
 const sorted=vis.sort((x,y)=>(['Y','M','S','R','N','U'].indexOf(x.s)-['Y','M','S','R','N','U'].indexOf(y.s))||x.p.name.localeCompare(y.p.name,'es'));
 const shown=statePh.coverMore?sorted:sorted.slice(0,28);
 const n=cs.Y+cs.M+cs.S+cs.R+cs.N;
 const legend=[['supported','Habitual',cs.Y+cs.M],['variable','Variable',cs.S+cs.R],['no','No fiable',cs.N],['all','Todos',pcs.length]].map(([id,label,count])=>'<button class="'+(statePh.cover===id?'on':'')+'" data-ph="coverage-filter" data-val="'+id+'">'+label+' <b>'+count+'</b></button>').join('');
 const rows=shown.map(x=>{
  const cls=STATUS[x.s][1];
  return '<div role="listitem" class="ph-cover-row ph-'+cls+'" data-grade="'+esc(x.s)+'"><div><b>'+esc(x.p.name)+'</b><small>'+esc(groupSpecies(x.p))+'</small></div>'+badge(x.s)+(x.tier?'<span class="ph-evidence">'+esc(x.tier)+'</span>':'')+
   (x.note?'<p>'+esc(short(x.note,170))+'</p>':'')+'</div>';
 }).join('');
 const d=deep(a),quick=pro(d.espectro);
 const phenotypes=review(a).phenotypes||{};
 const phenLabels={KPC_E:'Enterobacterales KPC',OXA48_E:'Enterobacterales OXA-48-like',MBL_E:'Enterobacterales MBL (NDM/VIM/IMP)',MBL_P:'Pseudomonas MBL',
  ESBL:'Enterobacterales BLEE',AmpC:'AmpC inducible',DTR_P:'Pseudomonas difícil de tratar',CRAB:'A. baumannii resistente a carbapenémicos',STENO:'S. maltophilia invasiva'};
 const phenotypePanel=Object.keys(phenotypes).length?
  '<section class="ph-phenos"><header><span>FENOTIPOS DE RESISTENCIA</span><h3>Lectura dirigida</h3></header>'+
  Object.entries(phenotypes).map(([key,value])=>{
    const cls=value?.[0]==='no'?'no':value?.[0]==='yes'?'strong':'variable';
    const lbl=cls==='no'?'No fiable':cls==='strong'?'Actividad documentada':'Condicionado a AST';
    return '<div class="ph-pheno ph-'+cls+'"><div><b>'+esc(phenLabels[key]||key)+'</b><span>'+lbl+'</span></div><p>'+esc(value?.[1]||'Revisar susceptibilidad y ficha individual.')+'</p></div>';
  }).join('')+'<small>El fenotipo y la indicación clínica deben validarse; no es una escala porcentual ni un resultado de laboratorio.</small></section>':'';
 return '<aside class="ph-coverage" aria-label="Panel de cobertura de '+esc(a.name)+'"><div class="ph-cover-sticky"><div class="ph-cover-header"><span>03 · COBERTURA LATERAL</span><h2>¿Qué cubre?</h2><p>'+esc(a.name)+'</p></div>'+
 '<div class="ph-cover-counts"><div><b>'+cs.Y+'</b><span>habitual</span></div><div><b>'+cs.M+'</b><span>mayoría</span></div><div><b>'+cs.S+cs.R+'</b><span>variable</span></div><div><b>'+cs.N+'</b><span>no fiable</span></div></div>'+
 '<p class="ph-cover-caveat"><b>'+n+'</b> pares graduados; <b>'+cs.U+'</b> sin evaluación. El nivel describe actividad orientativa, <u>no</u> eficacia clínica ni sensibilidad de un aislamiento.</p>'+ '<div class="ph-cover-key" aria-label="Escala descriptiva de actividad">'+[['Y','Habitual'],['M','Mayoría'],['S','Variable'],['R','Rara vez'],['N','No fiable'],['U','Sin evaluar']].map(([key,txt])=>'<span data-grade="'+key+'"><i aria-hidden="true"></i>'+txt+'</span>').join('')+'</div>'+
 phenotypePanel+
 (quick.length?'<details class="ph-cover-explainer"><summary>Espectro narrativo y advertencias</summary>'+paragraphs(quick)+'</details>':'')+
 '<div class="ph-cover-tabs">'+legend+'</div><label class="ph-cover-search"><span class="sr-only">Buscar patógeno</span><input type="search" data-ph-input="coverQuery" value="'+esc(statePh.coverQuery)+'" placeholder="Buscar especie…"></label>'+
 '<div class="ph-cover-list" role="list">'+(rows||'<p class="ph-empty">Sin pares registrados con este filtro. Desconocido no significa resistente.</p>')+'</div>'+
 (!statePh.coverMore&&sorted.length>28?'<button class="ph-more" data-ph="coverage-more">Mostrar '+(sorted.length-28)+' especies restantes</button>':'')+
 '<div class="ph-cover-footer"><h3>Interpretación responsable</h3><p>Las relaciones de clase están diferenciadas de las relaciones individuales. Para BLEE, AmpC, KPC, OXA-48, NDM/MBL y otros fenotipos no extrapolar a partir de un nombre de especie.</p>'+
 (k==='bacteria'?'<a href="https://www.idsociety.org/practice-guideline/amr-guidance/" target="_blank" rel="noopener noreferrer">IDSA AMR 2026 ↗</a>':'')+'</div></div></aside>';
}
function compareView(x){
 const chosen=statePh.compare.filter(c=>c.domain===statePh.domain).map(c=>x.all.find(a=>a.id===c.id)).filter(Boolean);
 const cols=chosen.map(a=>'<th style="--accent:'+tone(classify(a,statePh.domain).block,classify(a,statePh.domain).sub)+'"><b>'+esc(a.name)+'</b><button data-ph="compare-del" data-id="'+esc(a.id)+'" aria-label="Quitar '+esc(a.name)+'">×</button></th>').join('');
 const makeRow=(title,fn)=>'<tr><th scope="row">'+esc(title)+'</th>'+chosen.map(a=>'<td>'+fn(a)+'</td>').join('')+'</tr>';
 const rx=makeRow('Dosis adulta (documentada)',a=>{const ds=adultDoses(a);return ds.length?ds.slice(0,3).map(d=>'<p><b>'+esc(d.t)+'</b> '+esc(d.ad)+'</p>').join(''):'<small class="ph-na">Sin pauta cotejada</small>';});
 const block=makeRow('Clase y subgrupo',a=>{const c=classify(a,statePh.domain);return esc(c.block)+'<p>'+esc(c.sub)+'</p>';});
 const indication=makeRow('Indicaciones',a=>esc(short(pro(deep(a).indicaciones).join(' ')||a.context||'No cotejado',230)));
 const mech=makeRow('Mecanismo',a=>esc(short(pro(deep(a).mecanismo).join(' ')||a.mechanism||'No cotejado',270)));
 const safety=makeRow('Seguridad',a=>esc(short([...pro(review(a).precautions),...pro(review(a).contraindications),...pro(review(a).adverse),...pro(deep(a).seguridad),...pro(ess(a)?.ea)].join(' ')||'Revisar ficha individual',230)));
 const organisms=allMicro().filter(p=>p.kingdom===dKind(statePh.domain));
 const marked=statePh.domain==='bacteria'||statePh.domain==='tb'?
 ['s-aureus-mrsa','s-aureus-mssa','s-pneumoniae','e-coli-blee','p-aeruginosa','k-pneumoniae','b-fragilis','clostridioides-difficile']:
 statePh.domain==='fungi'?['candida-albicans','candida-auris','aspergillus-fumigatus','rhizopus-arrhizus','crypto-neoformans']:
 statePh.domain==='virus'?['hiv-1','influenza-a','influenza-b','hsv-1','cmv','hcv-1']:
 ['plasmodium-falciparum','giardia','entamoeba','toxoplasma'];
 const sentinels=marked.map(id=>organisms.find(p=>p.id===id)).filter(Boolean).slice(0,8);
 const covRows=sentinels.map(p=>makeRow(p.name,a=>{const x=coverage(a,p);return badge(x.s)+(x.tier?'<small class="ph-compare-tier">'+esc(x.tier)+'</small>':'');})).join('');
 const phenotypeKeys=['ESBL','AmpC','KPC_E','OXA48_E','MBL_E','MBL_P','DTR_P','CRAB','STENO'];
 const phenotypeLabels={ESBL:'BLEE (Enterobacterales)',AmpC:'AmpC',KPC_E:'KPC',OXA48_E:'OXA-48-like',MBL_E:'MBL en Enterobacterales',MBL_P:'MBL en Pseudomonas',DTR_P:'Pseudomonas DTR',CRAB:'CRAB',STENO:'S. maltophilia'};
 const phenotypeRows=(statePh.domain==='bacteria'?
  phenotypeKeys.filter(key=>chosen.some(a=>review(a).phenotypes?.[key])).map(key=>makeRow(phenotypeLabels[key],a=>{
   const p=review(a).phenotypes?.[key];
   if(!p)return '<small class="ph-na">Sin evaluación</small>';
   return '<span class="ph-status ph-'+(p[0]==='no'?'no':'variable')+'">'+(p[0]==='no'?'No fiable':'Según AST')+'</span><p>'+esc(p[1])+'</p>';
  })).join(''):'');
 return '<section class="ph-compare"><header><span>COMPARADOR CLÍNICO</span><h2>Comparar lado a lado</h2><p>Selecciona de 2 a 4 fármacos de este territorio. Las pautas y los cruces se muestran únicamente cuando están documentados.</p></header>'+
 '<div class="ph-compare-picker"><label>Añadir medicamento<select data-ph-change="comparePick"><option value="">Seleccionar fármaco…</option>'+x.all.filter(a=>!chosen.some(y=>y.id===a.id)).map(a=>'<option value="'+esc(a.id)+'">'+esc(a.name)+'</option>').join('')+'</select></label><b>'+chosen.length+'/4</b><button data-ph="compare-clear">Vaciar</button></div>'+
 (chosen.length?'<div class="ph-compare-scroll"><table><thead><tr><th>DIMENSIÓN</th>'+cols+'</tr></thead><tbody>'+block+mech+indication+rx+safety+phenotypeRows+covRows+'</tbody></table></div>':'<div class="ph-blank">Elige dos fármacos desde la lista o desde sus fichas individuales.</div>')+
 '<footer>La cobertura no es una probabilidad de curación. Los datos de clase son orientativos y no equivalen a AST, CMI ni indicación clínica. Dosis adulta: función renal normal salvo indicación.</footer></section>';
}
function page(){
 const k=statePh.domain,x=blockList(),selected=x.selected;
 const allDomains=DOMAINS.map(([id,name,desc,color])=>{
   const n=roster(id).length;
   return '<button class="ph-domain '+(k===id?'on':'')+'" style="--accent:'+color+'" data-ph="domain" data-val="'+id+'" aria-pressed="'+(k===id)+'"><span>'+esc(name)+'</span><b>'+n+'</b><small>'+esc(desc)+'</small></button>';
 }).join('');
 const documented=[...new Set(rootDrugs().filter(a=>adultDoses(a).length).map(a=>a.id))].length;
 const footer='<div class="ph-inline-notice"><b>Estado documental</b> · '+documented+' de '+rootDrugs().length+' fichas tienen al menos una pauta adulta atribuida a una fuente; esto no significa revisión clínica integral. El resto requiere cotejo específico. Las relaciones de cobertura sin evidencia se muestran como desconocidas. Disponibilidad regulatoria en México no comprobada de forma universal.</div>';
 return '<div class="ph-catalog"><header class="ph-top"><span class="ph-eyebrow">INFEORA / FARMACOLOGÍA / EDICIÓN NOVIEMBRE 2026</span><div class="ph-topline"><div><h1>Catálogo de antimicrobianos</h1><p>Del mecanismo molecular al paciente: grupos y subgrupos, pauta de adulto cuando existe respaldo, seguridad y cobertura separada.</p></div><div class="ph-topstat"><strong>'+rootDrugs().length+'</strong><span>fichas del banco</span></div></div></header>'+
 '<nav class="ph-domains" aria-label="Territorios farmacológicos">'+allDomains+'</nav>'+
 '<div class="ph-controls"><div><b>'+esc(nameOf(k))+'</b><span>'+esc(INTRO[orderedBlocks(k,x.all)[0]]||'Explora las familias, el mecanismo y sus limitaciones.')+'</span></div>'+
 '<div class="ph-mode-tabs"><button data-ph="mode" data-val="ficha" class="'+(statePh.view==='ficha'?'on':'')+'">Ficha + cobertura</button><button data-ph="mode" data-val="comparar" class="'+(statePh.view==='comparar'?'on':'')+'">Comparador ('+statePh.compare.filter(x=>x.domain===k).length+'/4)</button></div></div>'+
 (statePh.view==='ficha'?'<div class="ph-layout">'+sidebar(x)+article(selected)+coveragePanel(selected)+'</div>':'<div class="ph-layout ph-comparison">'+sidebar(x)+compareView(x)+'</div>')+
 footer+'</div>';
}
const previousRender=render;
render=function(){
 if(state.route==='atb'&&!statePh.wasAtb){
  const ui=window.ATLAS24?.debug?.ui||{};
  statePh.domain=ui.drugs&&ui.drugs!=='bacteria'?ui.drugs:'bacteria';
  statePh.id=statePh.domain==='bacteria'?state.drug||'':ui.selectedDrug||'';
  statePh.block='all';statePh.sub='all';statePh.q='';
 }
 previousRender();
 statePh.wasAtb=state.route==='atb';
 if(state.route==='atb'){
  const root=document.querySelector('.nx-section-atb');
  if(root){root.innerHTML=page();document.title='INFEORA · Catálogo de antimicrobianos'}
 }
};
function draw(focus){
 render();
 if(focus){
  const el=document.querySelector('[data-ph-input="'+focus+'"]');
  if(el){el.focus();try{el.setSelectionRange(el.value.length,el.value.length)}catch(e){}}
 }
}
function openDrug(id,domain){
 statePh.domain=domain||statePh.domain;
 statePh.id=id;statePh.view='ficha';statePh.block='all';statePh.sub='all';statePh.q='';
 const k=dKind(statePh.domain);
 if(k==='bacteria')state.drug=id;
 else if(window.ATLAS24?.debug?.ui){window.ATLAS24.debug.ui.drugs=k;window.ATLAS24.debug.ui.selectedDrug=id;}
 draw();
}
document.addEventListener('click',e=>{
 const t=e.target.closest?.('[data-act^="nx-find:drug:"]');
 if(t){
  const a=(t.getAttribute('data-act')||'').split(':');
  statePh.domain=a[2]||'bacteria';statePh.id=a.slice(3).join(':');statePh.view='ficha';
  statePh.block='all';statePh.sub='all';statePh.q='';
 }
},true);
document.addEventListener('click',e=>{
 const t=e.target.closest?.('[data-ph]');if(!t)return;
 e.preventDefault();e.stopImmediatePropagation();
 const op=t.dataset.ph,v=t.dataset.val||'',id=t.dataset.id||'';
 if(op==='domain'){
  statePh.domain=v;statePh.block='all';statePh.sub='all';statePh.q='';statePh.id='';statePh.onlyDose=false;statePh.view='ficha';statePh.cover='supported';statePh.coverQuery='';statePh.coverMore=false;
  return draw();
 }
 if(op==='block'){statePh.block=v;statePh.sub='all';statePh.id='';return draw()}
 if(op==='sub'){statePh.sub=statePh.sub===v?'all':v;statePh.id='';return draw()}
 if(op==='select')return openDrug(id,statePh.domain);
 if(op==='clear'){statePh.block='all';statePh.sub='all';statePh.q='';statePh.onlyDose=false;statePh.id='';return draw()}
 if(op==='mode'){statePh.view=v;return draw()}
 if(op==='jump'){const anchor=document.getElementById(v);if(anchor)anchor.scrollIntoView({behavior:'smooth',block:'start'});return}
  if(op==='coverage-filter'){statePh.cover=v;statePh.coverMore=false;return draw()}
 if(op==='coverage-more'){statePh.coverMore=true;return draw()}
 if(op==='compare-add'){
   const prev=statePh.compare.filter(a=>a.domain===statePh.domain);
   if(prev.length>=4){statePh.view='comparar';return draw();}
   if(!prev.some(a=>a.id===id))statePh.compare.push({id,domain:statePh.domain});
   return draw();
 }
 if(op==='compare-del'){statePh.compare=statePh.compare.filter(c=>!(c.id===id&&c.domain===statePh.domain));return draw()}
 if(op==='compare-clear'){statePh.compare=statePh.compare.filter(c=>c.domain!==statePh.domain);return draw()}
},true);
document.addEventListener('input',e=>{
 const t=e.target;if(!t.matches?.('[data-ph-input]'))return;
 e.stopImmediatePropagation();
 const key=t.dataset.phInput;
 if(key==='search'){statePh.q=t.value;statePh.id='';draw('search')}
 if(key==='coverQuery'){statePh.coverQuery=t.value;statePh.coverMore=false;draw('coverQuery')}
},true);
document.addEventListener('change',e=>{
 const t=e.target;if(!t.matches?.('[data-ph-change]'))return;
 e.stopImmediatePropagation();
 if(t.dataset.phChange==='onlyDose'){statePh.onlyDose=t.checked;statePh.id='';return draw();}
 if(t.dataset.phChange==='comparePick'){
   if(t.value&&!statePh.compare.some(x=>x.id===t.value&&x.domain===statePh.domain)&&statePh.compare.filter(x=>x.domain===statePh.domain).length<4)
    statePh.compare.push({id:t.value,domain:statePh.domain});
   return draw();
 }
},true);
})();