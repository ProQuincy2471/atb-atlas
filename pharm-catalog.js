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
  bacteria:{'Penicilinas':'β-lactámicos','Cefalosporinas':'β-lactámicos','Carbapenémicos':'β-lactámicos','Monobactámicos':'β-lactámicos',
  'Sideróforos betalactámicos':'Agentes contra multirresistentes','Sulbactam avanzado':'Agentes contra multirresistentes',
  'Glicopéptidos / lipoglicopéptidos':'Pared y membrana','Lipopéptidos':'Pared y membrana','Polimixinas':'Pared y membrana',
  'Oxazolidinonas':'Síntesis proteica','Aminoglucósidos':'Síntesis proteica','Macrólidos / ketólidos':'Síntesis proteica',
  'Tetraciclinas / derivados':'Síntesis proteica','Lincosamidas':'Síntesis proteica','Pleuromutilinas':'Síntesis proteica',
  'Estreptograminas':'Síntesis proteica','Inhibidores especializados':'Otros mecanismos','Ácido fusídico':'Otros mecanismos',
  'Mupirocina / tópicos':'Otros mecanismos','Fluoroquinolonas':'Ácidos nucleicos y folatos',
  'Sulfonamidas / antifolatos':'Ácidos nucleicos y folatos','Nitroimidazoles':'Ácidos nucleicos y folatos',
  'Nitrofuranos':'Ácidos nucleicos y folatos','Fosfonatos':'Ácidos nucleicos y folatos',
  'Rifamicinas':'Ácidos nucleicos y folatos'},
  virus:{'Neuraminidasa':'Influenza','Endonucleasa PA':'Influenza','Canal M2':'Influenza',
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
  parasites:{'Nitroimidazoles':'Protozoarios intestinales','Tiazólidos':'Protozoarios intestinales',
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
const rootDrugs=()=>[
 ...((typeof D!=='undefined'&&D?.antibiotics)||[]).map(a=>({...a,kingdom:'bacteria'})),
 ...(window.ATLAS24?.debug?.drugs||[])
];
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
  sub=k==='bacteria'?(a.family==='Cefalosporinas'?'Cefalosporinas · '+a.subgroup:a.family==='Penicilinas'?'Penicilinas · '+a.subgroup:a.family==='Carbapenémicos'?'Carbapenémicos · '+a.subgroup:a.subgroup||a.family):a.family||'Otros';
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
function adultDoses(a){const v=ess(a);return v?.dosis?.filter(x=>x.ad&&x.ad.trim())||[];}
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
  return '<div class="ph-tree-set" style="--accent:'+c+'">'+btn(g,g,members.length,c,'block')+
   (statePh.block===g?'<div class="ph-subtree">'+subs.map(s=>btn(s,s,members.filter(a=>classify(a,k).sub===s).length,tone(g,s),'sub')).join('')+'</div>':'')+'</div>';
 }).join('');
 return '<aside class="ph-sidebar" aria-label="Índice farmacológico">'+
 '<div class="ph-sidebar-sticky"><div class="ph-filter-head"><span>01 · EXPLORAR</span><strong>'+filtered.length+' / '+all.length+' fichas</strong></div>'+
 '<label class="ph-search"><span>Buscar fármaco o familia</span><input type="search" data-ph-input="search" value="'+esc(statePh.q)+'" placeholder="Buscar molécula, grupo…" autocomplete="off"></label>'+
 '<label class="ph-check"><input type="checkbox" data-ph-change="onlyDose" '+(statePh.onlyDose?'checked':'')+'><span>Con pauta adulta documentada</span></label>'+
 '<nav class="ph-tree" aria-label="Grupos y subgrupos">'+btn('all','Todos los grupos',all.length,'#315ead','block')+options+'</nav>'+
 (statePh.block!=='all'||statePh.sub!=='all'||statePh.q||statePh.onlyDose?'<button class="ph-clear" data-ph="clear">Restablecer filtros</button>':'')+
 '<div class="ph-list-head">FÁRMACOS <span>'+filtered.length+'</span></div>'+
 '<div class="ph-drug-list">'+(filtered.length?filtered.map(a=>{
  const g=classify(a,k),t=tone(g.block,g.sub);
  return '<button type="button" class="ph-drug'+(a.id===statePh.id?' on':'')+'" style="--accent:'+t+'" data-ph="select" data-id="'+esc(a.id)+'"><i></i><span><b>'+esc(a.name)+'</b><small>'+esc(g.sub)+'</small></span>'+(adultDoses(a).length?'<em title="Pauta de adulto verificada">Rx</em>':'')+'</button>';
 }).join(''):'<p class="ph-empty">No hay fármacos con estos filtros.</p>')+'</div></div></aside>';
}
function section(title,label,body,kind=''){
 return body?'<section class="ph-section '+kind+'"><div class="ph-section-h"><span>'+esc(label)+'</span><h2>'+esc(title)+'</h2></div>'+body+'</section>':'';
}
function list(items){return items.length?'<ul class="ph-bullets">'+items.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>':'';}
function paragraphs(items){return items.length?items.map(x=>'<p>'+esc(x)+'</p>').join(''):'';}
function intro(d){
 const g=classify(d,statePh.domain);
 return '<div class="ph-intro" style="--accent:'+tone(g.block,g.sub)+'"><span>'+esc(g.block)+'</span><p>'+esc(INTRO[g.block]||'La interpretación debe individualizarse por microorganismo, foco y pauta recomendada.')+'</p></div>';
}
function doseSection(a){
 const v=ess(a),d=adultDoses(a);
 if(!d.length)return '<div class="ph-source-gap"><b>Sin pauta adulta cotejada en este banco</b><p>No se traslada una dosis de otra molécula, indicación o formulación. Consultar ficha técnica vigente y guía clínica antes de prescribir.</p></div>';
 let html='<div class="ph-dose-scroll"><table><thead><tr><th>Situación / indicación</th><th>Dosis adulta documentada</th></tr></thead><tbody>'+
 d.map(x=>'<tr><th>'+esc(x.t)+'</th><td><b>'+esc(x.ad)+'</b></td></tr>').join('')+'</tbody></table></div>';
 if(v?.dur?.length)html+='<div class="ph-duration"><b>Duración según indicación</b>'+list(v.dur)+'</div>';
 if(v?.renal)html+='<div class="ph-kidney"><b>Ajuste / función renal</b><p>'+esc(v.renal)+'</p></div>';
 html+='<p class="ph-cite">Fuente específica de estas pautas: '+esc(v.src||'Documento de referencia')+'. Las formulaciones, contraindicaciones y condiciones de uso se deben verificar en la ficha vigente.</p>';
 return html;
}
function relevantSafety(a){
 const v=ess(a),d=deep(a);
 const cfg=[
 ['Contraindicaciones',v?.ci||[],'red'],
 ['Precauciones y ajuste',v?.prec||[],'orange'],
 ['Efectos adversos',v?.ea||[],'blue'],
 ['Interacciones',v?.inter||[],'violet']
 ];
 let blocks=cfg.filter(x=>x[1].length).map(([name,lines,color])=>'<div class="ph-safety-box ph-'+color+'"><h3>'+esc(name)+'</h3>'+list(lines)+'</div>');
 if(v?.emb||v?.lact)blocks.push('<div class="ph-safety-box ph-violet"><h3>Embarazo y lactancia</h3>'+paragraphs([v.emb?'Embarazo: '+v.emb:'',v.lact?'Lactancia: '+v.lact:''].filter(Boolean))+'</div>');
 if(!blocks.length&&pro(d.seguridad).length)blocks.push('<div class="ph-safety-box ph-orange"><h3>Seguridad y efectos adversos documentados</h3>'+paragraphs(pro(d.seguridad))+'</div>');
 return blocks.length?'<div class="ph-safety-grid">'+blocks.join('')+'</div>':'';
}
function sourceList(a){
 const d=deep(a),v=ess(a),s=[...pro(d.src)];
 if(v?.src)s.unshift(v.src);
 const sources=[...new Set(s)].slice(0,6);
 const links=DOM_SRC[statePh.domain]||[];
 return '<div class="ph-sources">'+(sources.length?'<h3>Documentación atribuida a esta ficha</h3>'+list(sources):'<p>Las descripciones básicas proceden del catálogo original. No hay revisión individual de dosis en las fuentes almacenadas.</p>')+
 '<h3>Guías y fichas para contrastar</h3>'+links.map(([label,url])=>'<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(label)+' <span aria-hidden="true">↗</span></a>').join('')+
 '<p class="ph-ver">Fecha del dossier individual: '+esc(d.reviewed||'no registrada')+'. Acceso y aprobación de fármacos varían por país. Las fuentes no implican validación clínica de todos los registros.</p></div>';
}
function article(a){
 if(!a)return '<div class="ph-blank">Selecciona un fármaco.</div>';
 const k=statePh.domain,group=classify(a,k),detail=deep(a),v=ess(a),pc=pathCells(a),known=pc.filter(c=>c.s!=='U').length;
 const indication=[...pro(detail.indicaciones),...pro(v?.ind),...(a.context?[a.context]:[])],
 mechanism=pro(detail.mecanismo).length?pro(detail.mecanismo):[a.mechanism||''].filter(Boolean),
 spectrum=pro(detail.espectro),
 resistance=pro(detail.resistencia),
 pk=pro(detail.farmacocinetica);
 const header='<header class="ph-article-hero" style="--accent:'+tone(group.block,group.sub)+'">'+
 '<div class="ph-super"><span>FICHA / '+esc(nameOf(k).toUpperCase())+'</span><span>'+esc(group.block)+' / '+esc(group.sub)+'</span></div>'+
 '<h2>'+esc(a.name)+'</h2><div class="ph-tagline">'+tags(a,k)+'</div>'+
 '<p>'+esc(a.distinct||a.subgroup||a.family)+'</p>'+
 '<div class="ph-hero-controls"><button data-ph="compare-add" data-id="'+esc(a.id)+'">+ Añadir al comparador</button><span>'+known+' pares con datos · '+pc.length+' especies</span></div></header>';
 const sep=section('Cómo actúa','01 · DIANA / MECANISMO',paragraphs(mechanism)+intro(a));
 const uses=section('Cuándo tiene utilidad clínica','02 · INDICACIONES',paragraphs([...new Set(indication)].slice(0,12))+
 (spectrum.length?'<div class="ph-quote"><b>Alcance farmacológico descrito</b>'+paragraphs(spectrum)+'</div>':''));
 const dose=section('Posología en adultos','03 · DOSIS / DURACIÓN',doseSection(a),'ph-dose-section');
 const exposure=section('Exposición y farmacocinética','04 · PK / DISTRIBUCIÓN',paragraphs(pk));
 const risks=section('Seguridad que modifica la elección','05 · CONTRAINDICACIONES / PRECAUCIONES / RAM',relevantSafety(a));
 const res=section('Resistencia y errores frecuentes','06 · RESISTENCIA / LÍMITES',paragraphs(resistance)+
 (a.limitations?'<div class="ph-quote ph-warn"><b>Limitaciones clínicas</b><p>'+esc(a.limitations)+'</p></div>':''));
 const notes=[...pro(detail.notas),...pro(v?.notas)].filter(x=>!/^La sección consultada no incluye/.test(x));
 const pearls=section('Perlas y notas clínicas','07 · INTERPRETACIÓN',paragraphs(notes.slice(0,7)));
 const cites=section('Trazabilidad','08 · FUENTES',sourceList(a));
 return '<article class="ph-article" aria-label="Ficha de '+esc(a.name)+'">'+header+sep+uses+dose+exposure+risks+res+pearls+cites+'</article>';
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
  return '<div class="ph-cover-row ph-'+cls+'"><div><b>'+esc(x.p.name)+'</b><small>'+esc(groupSpecies(x.p))+'</small></div>'+badge(x.s)+(x.tier?'<span class="ph-evidence">'+esc(x.tier)+'</span>':'')+
   (x.note?'<p>'+esc(short(x.note,170))+'</p>':'')+'</div>';
 }).join('');
 const d=deep(a),quick=pro(d.espectro);
 return '<aside class="ph-coverage" aria-label="Panel de cobertura de '+esc(a.name)+'"><div class="ph-cover-sticky"><div class="ph-cover-header"><span>03 · COBERTURA LATERAL</span><h2>¿Qué cubre?</h2><p>'+esc(a.name)+'</p></div>'+
 '<div class="ph-cover-counts"><div><b>'+cs.Y+'</b><span>habitual</span></div><div><b>'+cs.M+'</b><span>mayoría</span></div><div><b>'+cs.S+cs.R+'</b><span>variable</span></div><div><b>'+cs.N+'</b><span>no fiable</span></div></div>'+
 '<p class="ph-cover-caveat"><b>'+n+'</b> pares graduados; <b>'+cs.U+'</b> sin evaluación. El nivel describe actividad orientativa, <u>no</u> eficacia clínica ni sensibilidad de un aislamiento.</p>'+
 (quick.length?'<details class="ph-cover-explainer"><summary>Espectro narrativo y advertencias</summary>'+paragraphs(quick)+'</details>':'')+
 '<div class="ph-cover-tabs">'+legend+'</div><label class="ph-cover-search"><span class="sr-only">Buscar patógeno</span><input type="search" data-ph-input="coverQuery" value="'+esc(statePh.coverQuery)+'" placeholder="Buscar especie…"></label>'+
 '<div class="ph-cover-list">'+(rows||'<p class="ph-empty">Sin pares registrados con este filtro. Desconocido no significa resistente.</p>')+'</div>'+
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
 const safety=makeRow('Seguridad',a=>esc(short(pro(deep(a).seguridad).join(' ')||pro(ess(a)?.ea).join(' ')||'Revisar ficha individual',230)));
 const organisms=allMicro().filter(p=>p.kingdom===dKind(statePh.domain));
 const marked=statePh.domain==='bacteria'||statePh.domain==='tb'?
 ['s-aureus-mrsa','s-aureus-mssa','s-pneumoniae','e-coli-blee','p-aeruginosa','k-pneumoniae','b-fragilis','clostridioides-difficile']:
 statePh.domain==='fungi'?['candida-albicans','candida-auris','aspergillus-fumigatus','rhizopus-arrhizus','crypto-neoformans']:
 statePh.domain==='virus'?['hiv-1','influenza-a','influenza-b','hsv-1','cmv','hcv-1']:
 ['plasmodium-falciparum','giardia','entamoeba','toxoplasma'];
 const sentinels=marked.map(id=>organisms.find(p=>p.id===id)).filter(Boolean).slice(0,8);
 const covRows=sentinels.map(p=>makeRow(p.name,a=>{const x=coverage(a,p);return badge(x.s)+(x.tier?'<small class="ph-compare-tier">'+esc(x.tier)+'</small>':'');})).join('');
 return '<section class="ph-compare"><header><span>COMPARADOR CLÍNICO</span><h2>Comparar lado a lado</h2><p>Selecciona de 2 a 4 fármacos de este territorio. Las pautas y los cruces se muestran únicamente cuando están documentados.</p></header>'+
 '<div class="ph-compare-picker"><label>Añadir medicamento<select data-ph-change="comparePick"><option value="">Seleccionar fármaco…</option>'+x.all.filter(a=>!chosen.some(y=>y.id===a.id)).map(a=>'<option value="'+esc(a.id)+'">'+esc(a.name)+'</option>').join('')+'</select></label><b>'+chosen.length+'/4</b><button data-ph="compare-clear">Vaciar</button></div>'+
 (chosen.length?'<div class="ph-compare-scroll"><table><thead><tr><th>DIMENSIÓN</th>'+cols+'</tr></thead><tbody>'+block+mech+indication+rx+safety+covRows+'</tbody></table></div>':'<div class="ph-blank">Elige dos fármacos desde la lista o desde sus fichas individuales.</div>')+
 '<footer>La cobertura no es una probabilidad de curación. Los datos de clase son orientativos y no equivalen a AST, CMI ni indicación clínica. Dosis adulta: función renal normal salvo indicación.</footer></section>';
}
function page(){
 const k=statePh.domain,x=blockList(),selected=x.selected;
 const allDomains=DOMAINS.map(([id,name,desc,color])=>{
   const n=roster(id).length;
   return '<button class="ph-domain '+(k===id?'on':'')+'" style="--accent:'+color+'" data-ph="domain" data-val="'+id+'" aria-pressed="'+(k===id)+'"><span>'+esc(name)+'</span><b>'+n+'</b><small>'+esc(desc)+'</small></button>';
 }).join('');
 const footer='<div class="ph-inline-notice"><b>Fuente y alcance</b> · Catálogo académico en desarrollo basado en archivos clínicos del proyecto, MSF, guías y fichas regulatorias. La presencia de una ficha no implica revisión completa ni aprobación en México. Los datos sin revisión se señalan, no se infieren.</div>';
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