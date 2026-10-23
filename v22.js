/* V22 verified library icons, group-cell semantics and DOM safety checks. */
(function(){
'use strict';
const localHealth22={
 'body':'body','lungs':'lungs','intestine':'intestine','kidneys':'kidneys',
 'bacteria':'bacteria','neurology':'neurology','brain':'neurology','heart':'heart-organ','heart-organ':'heart-organ'
};
const safe22=x=>H(x==null?'':String(x));
function localIcons22(){
 document.querySelectorAll('img.v21-healthicon').forEach(img=>{
  const current=(img.getAttribute('src')||'').split('/').pop().split('?')[0].replace(/\.svg$/,'');
  if(localHealth22[current])img.src='assets/health/'+localHealth22[current]+'.svg';
 });
}
function mechanismFallback22(){
 if(state.route!=='atb')return;
 const a=A(state.drug)||D.antibiotics[0];
 const current=document.querySelector('#drug-mechanism');
 if(!current||current.querySelector('.v21-mechanism-inline'))return;
 const cls=E19.classes[a.family]||{};
 const card=current.querySelector('.v20-readingcols');
 if(!card)return;
 const visual=card.querySelector('.v20-image-card');
 const description=(a.mechanism||cls.mechanism||'Mecanismo individual sin documentar');
 const body='<div class="v21-mechanism-inline"><div class="v21-mechanism"><div class="v21-mech-head"><small>DIANA / ACCIÓN / EFECTO</small><h3>'+safe22(a.family)+' — '+safe22(a.subgroup||'Perfil del medicamento')+'</h3><p>'+safe22(description)+'</p></div><ol class="v21-mechsteps"><li><span>1</span><p><b>Diana:</b> '+safe22(cls.target||'Debe verificarse por molécula')+'</p></li><li><span>2</span><p><b>Acción molecular:</b> '+safe22(cls.mechanism||description)+'</p></li><li><span>3</span><p><b>Farmacodinamia:</b> '+safe22(cls.pkpd||'Depende del compuesto y del microorganismo')+'</p></li></ol><small class="v21-mechdisclaimer">Explicación didáctica basada en la información del catálogo, no imagen especulativa ni regla universal para la familia.</small></div></div>';
 if(visual)visual.outerHTML=body;
 else card.insertAdjacentHTML('beforeend',body);
}
function groupCellDetails22(evt){
 const btn=evt.target.closest('.v21-group-row .v21-cell');
 if(!btn)return;
 const actId=btn.getAttribute('data-act');
 if(!actId||!actId.startsWith('v21-cell:'))return;
 const parts=actId.split(':'),p=P(decodeURIComponent(parts[2])),key=decodeURIComponent(parts.slice(3).join(':'));
 const [family,subgroup]=key.split('|');
 const drugs=D.antibiotics.filter(a=>a.family===family&&(a.subgroup||'Sin subgrupo')===subgroup);
 if(!p||drugs.length<2)return;
 evt.preventDefault();evt.stopImmediatePropagation();
 // Preserve V21 group expansion, but replace its misleading first-drug summary.
 act(actId);
 const panel=document.querySelector('.v21-inspector');
 if(!panel)return;
 const names={active:'Actividad registrada',conditional:'Actividad condicionada',none:'Sin actividad documentada',unknown:'Sin registro individual'};
 const data=drugs.map(a=>({a,r:relation(a.id,p.id)})),known=data.filter(x=>x.r),missing=drugs.length-known.length;
 const n={active:0,conditional:0,none:0,unknown:0};
 for(const row of data)n[row.r?rstatus(row.r):'unknown']++;
 panel.innerHTML='<div class="v21-inspectorlabel">COMPARACIÓN DEL SUBGRUPO · NO EXTRAPOLAR</div>'+
 '<h3>'+safe22(subgroup)+'</h3><p class="v21-sub">'+safe22(family)+' · '+drugs.length+' fármacos distintos</p>'+
 '<div class="v21-versus">FRENTE A</div><h3><i>'+safe22(p.name)+'</i></h3>'+
 '<p class="v21-sub">'+known.length+' pares registrados · '+missing+' sin evaluación individual</p>'+
 '<div class="v22-summarycounts"><span class="active">'+n.active+' activos</span><span class="conditional">'+n.conditional+' condicionados</span><span class="none">'+n.none+' sin actividad</span><span class="unknown">'+n.unknown+' no evaluados</span></div>'+
 '<p class="v22-summarynote">No existe un porcentaje de cobertura del grupo: sus integrantes pueden diferir. Selecciona un antibiótico para consultar su relación individual.</p>'+
 '<div class="v22-druglist">'+data.map(x=>'<button data-act="open-drug:'+x.a.id+'"><b>'+safe22(x.a.name)+'</b><small>'+safe22(names[x.r?rstatus(x.r):'unknown'])+'</small><span>↗</span></button>').join('')+'</div>';
}
document.addEventListener('click',groupCellDetails22,true);
const renderBefore22=render;
render=function(){
 renderBefore22();
 localIcons22();
 mechanismFallback22();
};
})();
