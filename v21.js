/* ATB Atlas V21 — functional coverage, verified media, mechanisms, editorial accessibility. */
(function bootstrapV21() {
  'use strict';
  const ui21 = {family:'all',domain:'all',drugQuery:'',microQuery:'',expanded:new Set(),selectedDrug:'cefepima',selectedPath:'p-aeruginosa',show:'subgroups',sort:'catalog',hasData:false};
  const repo21 = 'https://github.com/resolvetosavelives/healthicons';
  const iconUrl21 = name => `https://cdn.jsdelivr.net/gh/resolvetosavelives/healthicons@main/public/icons/svg/outline/body/${name}.svg`;
  const health21 = (name, size=38) => `<img class="v21-healthicon" src="${iconUrl21(name)}" width="${size}" height="${size}" alt="" loading="lazy">`;
  const esc21 = v => H(String(v??''));
  const clean21 = s => String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const familyGroups21 = () => {
    const m=new Map();
    D.antibiotics.forEach(a=>{const key=a.family+'|'+(a.subgroup||'Sin subgrupo');if(!m.has(key))m.set(key,{key,family:a.family,subgroup:a.subgroup||'Sin subgrupo',drugs:[]});m.get(key).drugs.push(a)});
    return [...m.values()];
  };
  const statusNames21 = {active:'Actividad registrada',conditional:'Actividad condicionada',none:'Sin actividad documentada',unknown:'Sin evaluación individual',partial:'Registros parciales',mixed:'Actividad heterogénea'};
  const symbol21 = {active:'✓',conditional:'≈',none:'×',unknown:'·',partial:'◐',mixed:'≠'};
  function cell21(drugs,p) {
    const rows=drugs.map(a=>relation(a.id,p.id)).filter(Boolean);
    if(!rows.length)return {type:'unknown',rows:[],detail:'No hay un par antibiótico–microorganismo evaluado. No significa resistencia.'};
    const statuses=[...new Set(rows.map(r=>rstatus(r)))];
    const complete=rows.length===drugs.length;
    const type=!complete?'partial':statuses.length>1?'mixed':statuses[0];
    const note=rows.map(r=>`${A(r.antibiotic)?.name||r.antibiotic}: ${statusNames21[rstatus(r)]}. ${r.note||''}`).join('\n');
    return {type,rows,detail:note,complete};
  }
  function microDomain21(p) {return dp20(p);}
  function groupedCols21() {
    let list=D.pathogens.filter(p=>(ui21.domain==='all'||microDomain21(p)===ui21.domain) && (!ui21.microQuery||clean21(p.name+' '+(p.aliases||[]).join(' ')).includes(clean21(ui21.microQuery))));
    return list;
  }
  const groupColor21 = p => cd20(microDomain21(p)).color;
  function familyButton21(f) {return `<button data-act="v21-family:${encodeURIComponent(f)}" class="${ui21.family===f?'selected':''}">${esc21(f)} <span>${f==='all'?D.antibiotics.length:D.antibiotics.filter(a=>a.family===f).length}</span></button>`}
  function side21() {
    const fam=[...new Set(D.antibiotics.map(a=>a.family))];
    return `<aside class="v21-sidebar"><h3>FAMILIAS DE ANTIMICROBIANOS</h3><div class="v21-families">${familyButton21('all')}${fam.map(familyButton21).join('')}</div><div class="v21-sidenote">Cada subgrupo contiene sus fármacos reales. La cobertura solo se asigna al par evaluado, nunca a toda la familia por analogía.</div></aside>`;
  }
  function legend21(){return `<div class="v21-legend">${['active','conditional','none','partial','mixed','unknown'].map(s=>`<span><i class="v21-mark ${s}">${symbol21[s]}</i>${statusNames21[s]}</span>`).join('')}</div>`}
  function cellMarkup21(rows,p,key) {
    const c=cell21(rows,p),actval=`v21-cell:${encodeURIComponent(rows[0].id)}:${encodeURIComponent(p.id)}:${encodeURIComponent(key)}`;
    return `<td><button class="v21-cell ${c.type}" data-act="${actval}" title="${esc21(c.detail)}" aria-label="${esc21(p.name)} · ${statusNames21[c.type]} · ${c.rows.length} de ${rows.length} registros">${symbol21[c.type]}${rows.length>1?`<small>${c.rows.length}</small>`:''}</button></td>`;
  }
  function row21(group,paths) {
    const isOpen=ui21.expanded.has(group.key);
    const visible=group.drugs.filter(a=>!ui21.drugQuery||clean21(a.name+' '+a.family+' '+a.subgroup).includes(clean21(ui21.drugQuery)));
    if(!visible.length)return '';
    const main=`<tr class="v21-group-row"><th scope="row"><button data-act="v21-toggle:${encodeURIComponent(group.key)}" aria-expanded="${isOpen}"><b class="v21-chevron">${isOpen?'▾':'▸'}</b><span><strong>${esc21(group.subgroup)}</strong><small>${esc21(group.family)} · ${group.drugs.length} ${group.drugs.length===1?'fármaco':'fármacos'}</small></span></button></th>${paths.map(p=>cellMarkup21(visible,p,group.key)).join('')}</tr>`;
    const children=isOpen?visible.map(a=>`<tr class="v21-individual-row"><th scope="row"><button data-act="open-drug:${a.id}">${ic('drugs',15)}<span>${esc21(a.name)}</span><span class="v21-arrow">↗</span></button></th>${paths.map(p=>cellMarkup21([a],p,group.key)).join('')}</tr>`).join(''):'';
    return main+children;
  }
  function insight21() {
    const a=A(ui21.selectedDrug)||D.antibiotics[0],p=P(ui21.selectedPath)||D.pathogens[0],r=relation(a.id,p.id),st=rstatus(r);
    const cls=(E19.classes||{})[a.family]||{},stateText=r?`${statusNames21[st]}. ${r.note||''}`:'Este par todavía no está revisado. No puede inferirse susceptibilidad ni resistencia.';
    return `<aside class="v21-inspector"><div class="v21-inspectorlabel">DETALLE DE LA CELDA SELECCIONADA</div><h3>${esc21(a.name)}</h3><p class="v21-sub">${esc21(a.family)} / ${esc21(a.subgroup||'')}</p><div class="v21-versus">VS.</div><h3><i>${esc21(p.name)}</i></h3><p class="v21-sub">${esc21(p.morphology||'')} · ${esc21(microDomain21(p))}</p><div class="v21-statusbox ${st}"><b><i class="v21-mark ${st}">${symbol21[st]}</i>${statusNames21[st]}</b><p>${esc21(stateText)}</p>${r?`<small>Revisión: ${esc21(r.review||'sin validación individual')}</small>`:''}</div><div class="v21-facts"><b>¿Cómo interpretarlo?</b><p><strong>Diana:</strong> ${esc21(cls.target||'Consultar ficha individual')}</p><p><strong>Mecanismo de familia:</strong> ${esc21(cls.mechanism||a.mechanism)}</p><p><strong>Límite importante:</strong> ${esc21(cls.gap||a.limitations)}</p></div><div class="v21-inspectoractions"><button data-act="open-drug:${a.id}">Ver ficha del ATB →</button><button data-act="open-micro:${p.id}">Ver microorganismo →</button></div><p class="v21-source-note">Fuente: registros individuales del catálogo del atlas. El estado no equivale a antibiograma ni a indicación de tratamiento.</p></aside>`;
  }
  function cov21(){
    const paths=groupedCols21();
    const groups=familyGroups21().filter(g=>(ui21.family==='all'||g.family===ui21.family)&&(!ui21.drugQuery||g.drugs.some(a=>clean21(a.name+' '+a.family+' '+a.subgroup).includes(clean21(ui21.drugQuery)))));
    const selected=D.antibiotics.filter(a=>ui21.family==='all'||a.family===ui21.family);
    const shown=groups.reduce((a,g)=>a+g.drugs.length,0);
    return `<div class="v21-cover">
      <div class="v21-coverheading"><div><span class="v21-eyebrow">MICRO × ATB / MATRIZ INTERACTIVA</span><h1>Espectro antimicrobiano</h1><p>Compara familias, subgrupos y fármacos individuales frente a todos los microorganismos del catálogo. Selecciona una celda para estudiar el fundamento y sus datos.</p></div><div class="v21-coverstat"><b>${D.antibiotics.length} × ${D.pathogens.length}</b><span>ATB y microorganismos</span><small>${D.relations.length} cruces registrados · revisión preliminar</small></div></div>
      <div class="v21-mapmode"><button data-act="v20-mode:taxonomico">Taxonomía</button><button data-act="v20-mode:clinico">Mapa clínico</button><button class="selected" data-act="v20-mode:cobertura">Cobertura comparativa</button></div>
      <div class="v21-coverage-layout">${side21()}<div class="v21-center">
        <div class="v21-filterbar"><label>Buscar antibiótico <input id="v21-drug-query" placeholder="Fármaco, familia o subgrupo…" value="${esc21(ui21.drugQuery)}" autocomplete="off"></label><label>Buscar microorganismo <input id="v21-micro-query" placeholder="Especie, fenotipo o alias…" value="${esc21(ui21.microQuery)}" autocomplete="off"></label><button data-act="v21-reset">Restablecer</button></div>
        <div class="v21-domainbar"><span>MICROORGANISMOS</span><button class="${ui21.domain==='all'?'selected':''}" data-act="v21-domain:all">Todos (${D.pathogens.length})</button>${DOMAIN20.filter(d=>d.id!=='Sin catálogo').map(d=>`<button class="${ui21.domain===d.id?'selected':''}" data-act="v21-domain:${d.id}">${esc21(d.label)} (${D.pathogens.filter(p=>microDomain21(p)===d.id).length})</button>`).join('')}</div>
        <div class="v21-table-title"><div><h2>Matriz por subgrupo</h2><p>${groups.length} subgrupos · ${shown} antibióticos · ${paths.length} microorganismos visibles · desliza horizontalmente para explorar</p></div><button data-act="v21-expand-all">${ui21.expanded.size===familyGroups21().length?'Contraer':'Expandir'} fármacos</button></div>
        <div class="v21-matrixscroll" role="region" aria-label="Matriz de actividad antibiótica" tabindex="0"><table class="v21-matrix"><thead><tr><th scope="col">FAMILIA / SUBGRUPO / FÁRMACO</th>${paths.map(p=>`<th scope="col" style="--gcolor:${groupColor21(p)}"><button data-act="v21-pick-micro:${p.id}"><span>${esc21(microDomain21(p))}</span><b>${esc21(p.name)}</b></button></th>`).join('')}</tr></thead><tbody>${groups.length&&paths.length?groups.map(g=>row21(g,paths)).join(''):`<tr><td colspan="${paths.length+1}" class="v21-noresults">No hay resultados con estos filtros. Modifícalos para volver a explorar.</td></tr>`}</tbody></table></div>
        ${legend21()}<div class="v21-clinicalwarning"><b>Interpretación de seguridad</b><p>Una celda gris significa <strong>sin datos individuales</strong>, no resistencia. Los valores parciales no se extrapolan al subgrupo; los fenotipos BLEE, CRE, DTR, CRAB y VRE se estudian por separado. Verifica AST, foco, dosis/PK-PD y guías IDSA o locales.</p></div>
      </div>${insight21()}</div></div>`;
  }
  const mapOld21 = mapPage;
  mapPage = function(){return v20.mode==='cobertura'?cov21():mapOld21()};
  const actOld21=act;
  act=function(arg){
    const parts=String(arg).split(':'), op=parts[0], val=decodeURIComponent(parts.slice(1).join(':'));
    if(op==='v21-family'){ui21.family=val;render();return;}
    if(op==='v21-domain'){ui21.domain=val;render();return;}
    if(op==='v21-toggle'){ui21.expanded.has(val)?ui21.expanded.delete(val):ui21.expanded.add(val);render();return;}
    if(op==='v21-expand-all'){if(ui21.expanded.size===familyGroups21().length)ui21.expanded.clear();else familyGroups21().forEach(g=>ui21.expanded.add(g.key));render();return;}
    if(op==='v21-pick-micro'){ui21.selectedPath=val;render();return;}
    if(op==='v21-reset'){Object.assign(ui21,{family:'all',domain:'all',drugQuery:'',microQuery:'',selectedDrug:'cefepima',selectedPath:'p-aeruginosa'});ui21.expanded.clear();render();return;}
    if(op==='v21-cell'){const a=A(parts[1]),p=P(parts[2]);if(a&&p){ui21.selectedDrug=a.id;ui21.selectedPath=p.id;const g=decodeURIComponent(parts.slice(3).join(':'));const group=familyGroups21().find(x=>x.key===g);if(group&&group.drugs.length>1)ui21.expanded.add(g);render();}return;}
    return actOld21(arg);
  };
  // Use public-domain medical icon assets rather than invented body shapes or spheres.
  anatomical20=function(){return `<div class="v21-anatomical" aria-label="Órganos de orientación clínica con iconos de Health Icons"><div class="v21-body">${health21('body',205)}</div><div class="v21-organs"><div>${health21('brain',46)}<small>SNC</small></div><div>${health21('lungs',59)}<small>Pulmón</small></div><div>${health21('heart',47)}<small>Corazón</small></div><div>${health21('intestine',49)}<small>Abdomen</small></div><div>${health21('kidneys',47)}<small>Riñón</small></div></div><small class="v21-anatomylabel">ICONOGRAFÍA MÉDICA · HEALTH ICONS (CC0)</small></div>`};
  mapGroupNode20=function(d){
    const members=D.pathogens.filter(p=>dp20(p)===d.id);
    return `<button class="v20-region v21-region ${v20.domain===d.id?'chosen':''}" style="--region:${d.color};--wash:${d.glow}" data-act="v20-domain:${d.id}"><div class="v20-region-heading"><span class="v21-dicon">${health21('bacteria',33)}</span><span><strong>${esc21(d.label)}</strong><small>${members.length?members.length+' microorganismos':'Catálogo por incorporar'}</small></span></div><p>${esc21(d.detail)}</p><div class="v21-regionentries">${(members.length?members.slice(0,3).map(p=>p.name):['Sin registros catalogados']).map(x=>`<span>${esc21(x)}</span>`).join('')}</div><span class="v21-regionaction">Explorar territorio →</span></button>`;
  };
  // Source-specific mechanism flows; explanatory HTML, not fabricated biological photography.
  const mechanics21=[
    {find:/PBPs|transpeptidaci|peptidoglucano|pared bacteriana/i,steps:['El fármaco alcanza la pared bacteriana y su compartimento diana.','Se une a proteínas fijadoras de penicilina (PBPs) o interfiere con la síntesis de pared.','El peptidoglucano no se ensambla correctamente; aparece daño estructural.'],name:'Pared / PBPs'},
    {find:/D-Ala|vancomicina|glicopéptido/i,steps:['El glicopéptido alcanza precursores de peptidoglucano.','Se une a los extremos D-Ala–D-Ala y bloquea elongación y entrecruzamiento.','La síntesis de pared se interrumpe en microorganismos susceptibles.'],name:'Pared / precursor D-Ala'},
    {find:/30S|aminoacil.tRNA|ARNm/i,steps:['El antibiótico alcanza el ribosoma 30S.','Interfiere con la lectura del mensaje o con la entrada del aminoacil-ARNt, según clase.','Disminuye la producción de proteínas esenciales.'],name:'Ribosoma 30S'},
    {find:/50S|elongaci|traducci|ribosoma|peptidil/i,steps:['El agente alcanza el ribosoma 50S.','Bloquea una etapa específica de iniciación, elongación o transferencia peptídica.','Se altera la síntesis de proteínas bacterianas.'],name:'Ribosoma 50S'},
    {find:/girasa|topoisomerasa|ADN/i,steps:['El fármaco penetra en la bacteria.','Interfiere con enzimas de replicación o integridad del ADN.','Se detiene la replicación o se acumula daño genómico.'],name:'ADN / replicación'},
    {find:/folato|dihidrofolato/i,steps:['El antimicrobiano alcanza enzimas del metabolismo de folato.','Bloquea uno o más pasos de síntesis de tetrahidrofolato.','Se limita la síntesis de bases nitrogenadas.'],name:'Metabolismo de folato'},
    {find:/membrana|despolariza|lipopolisacárido/i,steps:['El fármaco interactúa con componentes de la envoltura bacteriana.','Modifica permeabilidad o potencial eléctrico de membrana, según clase.','Se comprometen funciones celulares esenciales.'],name:'Envoltura / membrana'},
    {find:/MurA|fosfomicina/i,steps:['La fosfomicina llega al citoplasma bacteriano.','Inhibe MurA en una fase temprana de biosíntesis de pared.','Se reduce la formación de precursores de peptidoglucano.'],name:'MurA / pared'},
    {find:/ARN polimerasa|rifampicina/i,steps:['El agente entra en el microorganismo.','Bloquea la ARN polimerasa dependiente de ADN.','Se inhibe la transcripción de genes esenciales.'],name:'Transcripción de ARN'}
  ];
  function mechanism21(a){
    const cls=(E19.classes||{})[a.family]||{};
    const combined=[a.mechanism,cls.target,cls.mechanism].join(' ');
    const explicit=/[a-z]/i.test(a.mechanism||'') ? a.mechanism : cls.mechanism||'';
    const specifics=/antimicobacterian/i.test(a.family)?null:mechanics21.find(x=>x.find.test(combined));
    const steps=specifics?.steps||['Identificar diana molecular del fármaco individual.','Establecer mecanismo preciso a partir de la bibliografía revisada.','Relacionar mecanismo con espectro y resistencia, sin extrapolar a la familia completa.'];
    const title=specifics?.name||'Mecanismo específico';
    return `<div class="v21-mechanism"><div class="v21-mech-head"><small>FARMACOLOGÍA VISUAL • ${esc21(a.family)}</small><h3>${esc21(title)}</h3><p>${esc21(explicit||'Mecanismo pendiente de descripción individual.')}</p></div><ol class="v21-mechsteps">${steps.map((s,i)=>`<li><span>${i+1}</span><p>${esc21(s)}</p></li>`).join('')}</ol><div class="v21-mechfoot"><b>Diana:</b> ${esc21(cls.target||a.mechanism||'En revisión')} <b>PK/PD:</b> ${esc21(cls.pkpd||'Revisar agente concreto')}</div><small class="v21-mechdisclaimer">Esquema didáctico por familia; para combinaciones y antimicobacterianos deben verificarse los componentes individuales.</small></div>`;
  }
  const oldDrugSections21=drugPageSections;
  drugPageSections=function(a){
    const html=oldDrugSections21(a);
    return html.replace(/<div class="v20-hero-art">[\s\S]*?<\/div><\/div>(?=<nav class="v20-anchor")/,`<div class="v21-drughero-art">${mechanism21(a)}</div></div>`)
      .replace(/<div class="v20-image-card">[\s\S]*?<\/div>(?=<\/div><div class="v20-highlight")/,`<div class="v21-mechanism-inline">${mechanism21(a)}</div>`);
  };
  function getWikiTitle21(p){
    const aliases={'s-aureus-mssa':'Staphylococcus aureus','s-aureus-mrsa':'Staphylococcus aureus','e-coli-blee':'Escherichia coli','escherichia-coli-cre':'Escherichia coli','klebsiella-pneumoniae-cre':'Klebsiella pneumoniae','pseudomonas-aeruginosa-dtr':'Pseudomonas aeruginosa','acinetobacter-baumannii-crab':'Acinetobacter baumannii','enterococcus-faecium-vre':'Enterococcus faecium','streptococcus-anginosus-group':'Streptococcus anginosus','estreptococos-viridans':'Viridans streptococci','nocardia-spp':'Nocardia','prevotella-spp':'Prevotella','peptostreptococcus-spp':'Peptostreptococcus','shigella-spp':'Shigella','brucella-spp':'Brucella','mycobacterium-avium-complex':'Mycobacterium avium complex','mycobacterium-abscessus-complex':'Mycobacterium abscessus','acinetobacter-baumannii-complex':'Acinetobacter baumannii','enterobacter-cloacae':'Enterobacter cloacae'};
    return aliases[p.id]||p.name.replace(/\s+—.*$/,'').replace(/\s+\(.*$/,'').replace(/ spp\.$/,'');
  }
  const mediaCache21=new Map();
  async function getMedia21(p) {
    if(mediaCache21.has(p.id))return mediaCache21.get(p.id);
    const title=getWikiTitle21(p);
    const url='https://en.wikipedia.org/w/api.php?'+new URLSearchParams({action:'query',format:'json',origin:'*',redirects:'1',prop:'pageimages',piprop:'thumbnail|name',pithumbsize:'900',titles:title});
    try {
      const response=await fetch(url);
      if(!response.ok)throw Error('HTTP '+response.status);
      const pages=Object.values((await response.json()).query?.pages||{});
      const page=pages.find(x=>x.thumbnail?.source&&x.pageimage);
      // Do not substitute a different organism when exact identity is missing.
      if(!page||clean21(page.title)!==clean21(title)){mediaCache21.set(p.id,null);return null;}
      const obj={image:page.thumbnail.source,source:'https://en.wikipedia.org/wiki/'+encodeURIComponent(page.title.replaceAll(' ','_')),filename:page.pageimage,title:page.title};
      mediaCache21.set(p.id,obj);return obj;
    }catch(e){return null;}
  }
  async function updateMicroPhotos21() {
    if(state.route!=='micro')return;
    const p=P(state.micro)||D.pathogens[0];
    const targets=[...document.querySelectorAll('.v20-micro-hero .v20-hero-art,.v20-section#micro-identidad .v20-image-card')];
    if(!targets.length)return;
    for(const target of targets)target.innerHTML=`<div class="v21-mediawait"><b>${esc21(p.name)}</b><span>Consultando archivo científico Wikimedia por taxón…</span></div>`;
    const item=await getMedia21(p);
    if(state.route!=='micro'||state.micro!==p.id)return;
    const html=item?`<figure class="v21-media"><img src="${esc21(item.image)}" alt="Imagen documental vinculada a ${esc21(item.title)}" loading="lazy" referrerpolicy="no-referrer"><figcaption><b>${esc21(item.title)}</b> · fotografía o figura documental de Wikimedia. <a href="${esc21(item.source)}" target="_blank" rel="noopener noreferrer">Abrir fuente, archivo y licencia ↗</a><span>La imagen no demuestra fenotipo de resistencia ni identifica un aislado individual.</span></figcaption></figure>`:`<div class="v21-mediaunavailable"><b>${esc21(p.name)}</b><p>No se encontró una imagen documental verificable para esta identidad en la fuente consultada. Se omite la ilustración genérica para evitar una representación incorrecta.</p><a href="https://commons.wikimedia.org/w/index.php?search=${encodeURIComponent(getWikiTitle21(p))}&title=Special:MediaSearch&type=image" target="_blank" rel="noopener noreferrer">Buscar fuentes visuales verificables ↗</a></div>`;
    for(const target of targets) if(target.isConnected)target.innerHTML=html;
  }
  const oldMicro21=microPageSections;
  microPageSections=function(p){
    let html=oldMicro21(p);
    // Remove decorative faux microscopy immediately; photos load independently with a taxon-matched source.
    html=html.replace(/<div class="v20-hero-art">[\s\S]*?<\/div><\/div>(?=<nav class="v20-anchor")/,`<div class="v20-hero-art v21-hero-media"><div class="v21-mediawait"><b>${esc21(p.name)}</b><span>Consultando imagen documental…</span></div></div></div>`);
    return html;
  };
  const prevRender21=render;
  render=function(){
    const left=document.querySelector('.v21-matrixscroll')?.scrollLeft||0;
    const top=document.querySelector('.v21-matrixscroll')?.scrollTop||0;
    prevRender21();
    const scroll=document.querySelector('.v21-matrixscroll');if(scroll){scroll.scrollLeft=left;scroll.scrollTop=top;}
    if(state.route==='micro')updateMicroPhotos21();
  };
  document.addEventListener('input',e=>{
    const n=e.target;if(!['v21-drug-query','v21-micro-query'].includes(n.id))return;
    if(state.route!=='mapa'||v20.mode!=='cobertura')return;
    const key=n.id==='v21-drug-query'?'drugQuery':'microQuery';
    ui21[key]=n.value;
    const start=n.selectionStart,end=n.selectionEnd;
    render();
    const target=document.getElementById(n.id);
    if(target){target.focus();target.setSelectionRange(start,end);}
  });
  footer=function(){return `<footer class="v20-footer"><b>ATB / ATLAS · V21</b><span>Datos revisables por especie y fármaco; la ausencia de registro no es resistencia.</span><a href="${repo21}" target="_blank" rel="noopener noreferrer">Health Icons (CC0)</a><a href="https://www.wikimedia.org/" target="_blank" rel="noopener noreferrer">Wikimedia</a></footer>`};
})();
