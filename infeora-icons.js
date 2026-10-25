/* INFEORA — iconos de interfaz originales (SVG de trazo, 24×24) y paleta por sistema clínico.
   No son ilustraciones científicas: solo señalan secciones, dominios y territorios anatómicos. */
(function(){
const P={
 // secciones
 inicio:'<path d="M4 11.5 12 5l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1z"/>',
 mapa:'<circle cx="6" cy="7" r="2.2"/><circle cx="18" cy="6" r="2.2"/><circle cx="12" cy="17" r="2.6"/><path d="M7.8 8.3 10.6 15M16.4 7.6 13.5 15M8.2 7l7.6-.6"/>',
 micro:'<ellipse cx="12" cy="12" rx="7.5" ry="4.6" transform="rotate(-30 12 12)"/><path d="M9 13.5h.01M12.5 10.5h.01M14 13h.01"/><path d="M18.5 6.5 21 4M5.5 17.5 3 20"/>',
 atb:'<rect x="3.5" y="9" width="17" height="6.5" rx="3.25" transform="rotate(-35 12 12.25)"/><path d="m9.6 8.9 4.9 6.8"/>',
 clinica:'<path d="M5 4h9l5 5v11H5z"/><path d="M14 4v5h5M9 13h6M12 10v6"/>',
 comparar:'<path d="M5 4v16M19 4v16"/><path d="M5 8h6M5 12h4M5 16h7M19 8h-5M19 12h-7M19 16h-4"/>',
 aprender:'<path d="M4 5.5C6.5 4.5 9.5 4.5 12 6c2.5-1.5 5.5-1.5 8-.5V19c-2.5-1-5.5-1-8 .5-2.5-1.5-5.5-1.5-8-.5z"/><path d="M12 6v13.5"/>',
 laboratorio:'<path d="M9.5 3.5h5M10.5 3.5v5.2L5.2 18a1.7 1.7 0 0 0 1.5 2.5h10.6a1.7 1.7 0 0 0 1.5-2.5l-5.3-9.3V3.5"/><path d="M7.6 14h8.8"/>',
 fuentes:'<path d="M6 3.5h9.5L19 7v13.5H6z"/><path d="M15 3.5V7h4M9 11h7M9 14.5h7M9 18h4.5"/>',
 // dominios
 bacteria:'<rect x="4" y="8.5" width="16" height="7" rx="3.5"/><path d="M8 12h.01M12 11h.01M15.5 13h.01M20 12h2M2 12h2"/>',
 virus:'<circle cx="12" cy="12" r="5"/><path d="M12 7V3.5M12 20.5V17M7 12H3.5M20.5 12H17M8.5 8.5 6 6M18 18l-2.5-2.5M15.5 8.5 18 6M6 18l2.5-2.5"/><circle cx="12" cy="3" r=".9"/><circle cx="12" cy="21" r=".9"/><circle cx="3" cy="12" r=".9"/><circle cx="21" cy="12" r=".9"/>',
 fungi:'<path d="M4 12a8 6 0 0 1 16 0z"/><path d="M10 12v6.5a2 2 0 0 0 4 0V12"/><path d="M8 9.5h.01M12 8h.01M15.5 9.5h.01"/>',
 parasites:'<path d="M5 15c0-4 3-7 7-7s7 3 7 7"/><path d="M5 15c1.5 2 3.5 3 7 3s5.5-1 7-3"/><path d="M9 8 7.5 4.5M15 8l1.5-3.5M8 12.5h.01M12 11.5h.01M16 12.5h.01"/>',
 // territorios clínicos
 resp:'<path d="M12 4v8M12 9c-1.5 0-2.5 1-3.5 2.5C7 14 5 15 5 18a2 2 0 0 0 3 1.7C10 18.5 11 17 11 14"/><path d="M12 9c1.5 0 2.5 1 3.5 2.5C17 14 19 15 19 18a2 2 0 0 1-3 1.7C14 18.5 13 17 13 14"/>',
 ent:'<path d="M15 19c-2 0-2.5-1.5-3.5-3S9 14 9 11a4.5 4.5 0 0 1 9 0c0 1.5-1 2-1.5 3"/><path d="M13.5 11a1.5 1.5 0 0 0-1.5-1.5"/>',
 tooth:'<path d="M7.5 4c-2 0-3.5 1.5-3.5 4 0 2.5 1.5 4 2 6.5S7 20 8.5 20s1.5-4.5 3.5-4.5S14 20 15.5 20 17.5 17 18 14.5 20 10.5 20 8c0-2.5-1.5-4-3.5-4-1.8 0-2.6 1-4.5 1S9.3 4 7.5 4z"/>',
 eye:'<path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"/><circle cx="12" cy="12" r="2.8"/>',
 skin:'<path d="M3 8c3-2 6 2 9 0s6-2 9 0M3 13c3-2 6 2 9 0s6-2 9 0"/><path d="M3 18h18"/>',
 gut:'<path d="M9 3.5v3c0 1.5-3 1.5-3 4s3 2.5 6 2.5 6 0 6 2.5-3 2.5-6 2.5-4 1-4 2.5"/>',
 liver:'<path d="M3.5 9c0-2 1.5-3 4-3H17c2 0 3.5 1 3.5 3 0 4-5 9-10 9C6 18 3.5 13 3.5 9z"/><path d="M12 6v6"/>',
 kidney:'<path d="M8 4c-3 0-4.5 3-4.5 7S5 19 8 19s3.5-2 3-4c-.4-1.5-1.5-2-1.5-3.5S11 9.5 11 8 10 4 8 4z"/><path d="M11 12h3.5c1.5 0 2.5 1 2.5 2.5V20"/>',
 sti:'<circle cx="9" cy="10" r="5"/><path d="M9 15v6M6.5 18.5h5"/><circle cx="16" cy="9" r="4"/><path d="m19 6 2.5-2.5M18.5 3.5h3v3"/>',
 bone:'<path d="M8 6.5a2.5 2.5 0 1 0-3.5 2.4L15 19.5a2.5 2.5 0 1 0 2.4-3.5A2.5 2.5 0 1 0 15.5 13L11 8.5A2.5 2.5 0 1 0 8 6.5z"/>',
 blood:'<path d="M12 3.5S6 10 6 14a6 6 0 0 0 12 0c0-4-6-10.5-6-10.5z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/>',
 heart:'<path d="M12 20s-8-4.7-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.3 12 20 12 20z"/><path d="M4.5 12H9l1.5-2.5 2 5 1.5-2.5h5"/>',
 sepsis:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".8"/>',
 brain:'<path d="M12 5.5c-1-1.5-4-1.5-5 .5-2 0-3 2-2.5 3.5C3 10.5 3 13 4.5 14c-.5 2 1 3.5 3 3.5.5 1.5 3 2 4.5.5 1.5 1.5 4 1 4.5-.5 2 0 3.5-1.5 3-3.5 1.5-1 1.5-3.5 0-4.5.5-1.5-.5-3.5-2.5-3.5-1-2-4-2-5-.5z"/><path d="M12 5.5V18"/>',
 child:'<circle cx="12" cy="6" r="2.5"/><path d="M12 9v6M8 11.5l4-1.5 4 1.5M9.5 20.5 12 15l2.5 5.5"/>',
 scalpel:'<path d="M4 20 15 9l2.5 2.5L8 20z"/><path d="m15 9 4.5-4.5a1.8 1.8 0 0 1 2.5 2.5L17.5 11.5"/>',
 shield:'<path d="M12 3.5 19 6v5.5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12h6"/>',
 globe:'<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.5 3.5 5.5 3.5 8.5s-1 6-3.5 8.5c-2.5-2.5-3.5-5.5-3.5-8.5s1-6 3.5-8.5z"/>',
 // utilidades
 search:'<circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/>',
 filter:'<path d="M4 5h16l-6 7.5V19l-4-1.5v-5z"/>',
 clear:'<path d="M6 6l12 12M18 6 6 18"/>',
 who:'<circle cx="12" cy="12" r="8.5"/><path d="M7.5 9.5 9.5 15l2.5-5 2.5 5 2-5.5"/>',
 pill:'<rect x="3.5" y="9" width="17" height="6.5" rx="3.25"/><path d="M12 9v6.5"/>',
 nopill:'<rect x="3.5" y="9" width="17" height="6.5" rx="3.25"/><path d="M4 4l16 16"/>',
 maybe:'<rect x="3.5" y="9" width="17" height="6.5" rx="3.25"/><path d="M12 9v6.5" stroke-dasharray="1.5 1.5"/>'
};

/* formas bacterianas y dianas farmacológicas (para facetas) */
Object.assign(P,{
 coccus:'<circle cx="8" cy="9" r="3"/><circle cx="15.5" cy="8" r="3"/><circle cx="11.5" cy="15.5" r="3"/>',
 rod:'<rect x="3" y="9.5" width="18" height="5.5" rx="2.75" transform="rotate(-20 12 12.25)"/>',
 coccobacillus:'<rect x="5" y="8.5" width="9" height="7" rx="3.5"/><rect x="13" y="10" width="7" height="5.5" rx="2.75"/>',
 spiral:'<path d="M3 13c1.5-3 3-3 4.5 0s3 3 4.5 0 3-3 4.5 0 3 3 4.5 0"/>',
 nowall:'<path d="M12 4.5c3.5 0 7 2 7 6.5s-4 8.5-7.5 8.5S5 16 5 12c0-3.5 2.5-7.5 7-7.5z" stroke-dasharray="2.2 2"/>',
 wall:'<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M4 9h16M4 15h16M9 4v16M15 4v16"/>',
 membrane:'<path d="M3 8c3-2 6 2 9 0s6-2 9 0M3 16c3-2 6 2 9 0s6-2 9 0"/><circle cx="7" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="17" cy="12" r="1"/>',
 ribo30:'<ellipse cx="12" cy="15" rx="7" ry="4"/><path d="M8 11.5c0-2 1.8-3.5 4-3.5s4 1.5 4 3.5"/>',
 ribo50:'<ellipse cx="12" cy="10" rx="7.5" ry="5"/><path d="M7.5 16.5c1 1.5 2.7 2.5 4.5 2.5s3.5-1 4.5-2.5"/>',
 dna:'<path d="M7 3c0 6 10 6 10 12s-10 3-10 6M17 3c0 6-10 6-10 12s10 3 10 6"/><path d="M8.5 7h7M8.5 17h7"/>',
 folate:'<path d="M12 3.5 19.5 8v8L12 20.5 4.5 16V8z"/><path d="M12 8.5v7M8.5 10.5l7 3"/>',
 rnap:'<path d="M4 12h16"/><path d="M8 12V7.5M12 12V5.5M16 12V8"/><circle cx="12" cy="16.5" r="3"/>',
 topical:'<path d="M8 3.5h8v4H8zM7 7.5h10l-1 13H8z"/><path d="M10 12h4"/>',
 star:'<path d="m12 4 2.3 4.9 5.2.6-3.9 3.6 1 5.2L12 15.8l-4.6 2.5 1-5.2-3.9-3.6 5.2-.6z"/>',
 book:'<path d="M5 4.5h11a2 2 0 0 1 2 2V20H7a2 2 0 0 1-2-2z"/><path d="M5 18a2 2 0 0 1 2-2h11"/>'
});
window.INF_SHAPE=m=>{m=String(m||'').toLowerCase();if(/sin pared|intracel|pleom/.test(m))return ['nowall','Sin pared / intracelular'];if(/helic|curvo|espir/.test(m))return ['spiral','Curvos y espirales'];if(/cocobac/.test(m))return ['coccobacillus','Cocobacilos'];if(/^coco|diplococo|cocos/.test(m))return ['coccus','Cocos'];if(/bacil/.test(m))return ['rod','Bacilos'];return ['nowall','Otras formas']};
const TG={'Penicilinas':'wall','Cefalosporinas':'wall','Carbapenémicos':'wall','Monobactámicos':'wall','Sideróforos betalactámicos':'wall','Sulbactam avanzado':'wall','Glicopéptidos / lipoglicopéptidos':'wall','Fosfonatos':'wall','Polimixinas':'membrane','Lipopéptidos':'membrane','Aminoglucósidos':'ribo30','Tetraciclinas / derivados':'ribo30','Macrólidos / ketólidos':'ribo50','Oxazolidinonas':'ribo50','Lincosamidas':'ribo50','Estreptograminas':'ribo50','Pleuromutilinas':'ribo50','Ácido fusídico':'ribo50','Fluoroquinolonas':'dna','Nitroimidazoles':'dna','Nitrofuranos':'dna','Sulfonamidas / antifolatos':'folate','Rifamicinas':'rnap','Mupirocina / tópicos':'topical','Antimicobacterianos':'multi','Inhibidores especializados':'wall'};
const TL={wall:['Pared celular','#5a34b8'],membrane:['Membrana','#2b7d6a'],ribo30:['Ribosoma 30S','#a03f8e'],ribo50:['Ribosoma 50S','#7a46c8'],dna:['ADN / topoisomerasas','#b23a55'],folate:['Vía del folato','#2f6f9f'],rnap:['ARN polimerasa','#46508e'],topical:['Tópicos','#5f6b85'],multi:['Antimicobacterianos (varias dianas)','#6a5a2a']};
window.INF_TARGET=f=>{const k=TG[f]||'multi';return {key:k,icon:k==='multi'?'micro':k,label:TL[k][0],color:TL[k][1]}};
window.INF_TARGETS=TL;
window.INF_DOMAIN_COLOR={Grampositivos:'#6b2fc4',Gramnegativos:'#a23fb0',Anaerobios:'#47278a',Atípicos:'#8a5bd6',Especiales:'#5b3e9e'};
const KR={bacteria:[262,300],virus:[58,98],fungi:[184,212],parasites:[328,358]};
window.INF_HASH=(s,kind)=>{let h=0;for(const ch of String(s))h=(h*31+ch.charCodeAt(0))>>>0;const r=KR[kind];if(r){const hue=r[0]+(h%(r[1]-r[0]+1)),l=[34,40,46][h%3],sat=kind==='virus'?58:66;return 'hsl('+hue+' '+sat+'% '+l+'%)'}const hues=[214,258,190,160,232,284,174,200,246,300,222,178];return 'hsl('+hues[h%hues.length]+' 55% 42%)'};
window.INF_ICON=(n,cls)=>P[n]?'<svg class="inf-ic'+(cls?' '+cls:'')+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+P[n]+'</svg>':'';
/* Territorios: agrupan los sistemas del índice WHO + revisiones complementarias. Colores fríos distinguibles entre sí. */
const T=[
 ['cabeza','Vía aérea y cabeza','#2f6f9f',[['Respiratorio','resp'],['Otorrinolaringología','ent'],['Odontología','tooth'],['Oftalmología','eye']]],
 ['abdomen','Abdomen','#2b7d6a',[['Gastrointestinal','gut'],['Hepatobiliar','liver']]],
 ['gu','Genitourinario','#5a4bb0',[['Urinario','kidney'],['ITS','sti']]],
 ['tejidos','Piel, hueso y músculo','#9a4a86',[['Piel y tejidos blandos','skin'],['Osteoarticular','bone']]],
 ['sistemico','Sangre y sistémico','#b23a55',[['Sistémico','sepsis'],['Hematología','blood'],['Cardiovascular','heart']]],
 ['snc','Sistema nervioso','#46508e',[['Sistema nervioso','brain'],['Neurología','brain']]],
 ['huesped','Huésped y contexto','#5d7a2e',[['Pediatría','child'],['Quirúrgico','scalpel'],['Inmunodeficiencia','shield'],['Medicina tropical','globe']]]
];
const SYS={};T.forEach(([k,l,c,items])=>items.forEach(([s,ic],i)=>{SYS[s]={territory:k,territoryLabel:l,color:c,icon:ic,shade:i}}));
window.INF_TERRITORIES=T;
window.INF_SYS=s=>SYS[s]||{territory:'otros',territoryLabel:'Otros',color:'#4a5f86',icon:'clinica',shade:0};
})();
