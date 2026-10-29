/* CARDIORA — iconos de interfaz originales (SVG de trazo 24×24) y paletas por nivel, categoría y grupo.
   Son señales de navegación, no ilustraciones científicas. */
(function(){
const P={
 inicio:'<path d="M4 11.5 12 5l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1z"/>',
 fundamentos:'<path d="M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.3a4.2 4.2 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z"/>',
 ecg:'<path d="M2 12.5h4.2l2-5.5 3.3 11 3.1-8.5 1.9 3h5.5"/>',
 acls:'<path d="M13.5 2.5 4.5 14h7l-1.5 7.5 9.5-12h-7z"/>',
 patologias:'<path d="M6 3.5v5a4 4 0 0 0 8 0v-5"/><path d="M10 12.5v2.5a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="11" r="2"/>',
 farmacos:'<path d="M10.6 20.4 3.6 13.4a4.95 4.95 0 0 1 7-7l7 7a4.95 4.95 0 0 1-7 7z"/><path d="m7.1 9.9 7 7"/>',
 herramientas:'<rect x="5" y="2.5" width="14" height="19" rx="2.5"/><path d="M8.5 6.5h7"/><path d="M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 14.5h.01M12 14.5h.01M15.5 14.5h.01M8.5 18h.01M12 18h3.5"/>',
 practica:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
 fuentes:'<path d="M4.5 5.5A2.5 2.5 0 0 1 7 3h12.5v15H7a2.5 2.5 0 0 0-2.5 2.5z"/><path d="M4.5 20.5v-15M9 7.5h6.5"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>',
 check:'<path d="m5 12.5 4.2 4.2L19 7"/>',
 alert:'<path d="M12 3.5 2.5 20h19z"/><path d="M12 10v4.5M12 17.5h.01"/>',
 bulb:'<path d="M9 18.5h6M10 21.5h4"/><path d="M12 2.5a6.5 6.5 0 0 0-4 11.6c.8.7 1 1.5 1 2.4h6c0-.9.2-1.7 1-2.4a6.5 6.5 0 0 0-4-11.6z"/>',
 table:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9.5h18M9.5 9.5V20"/>',
 flow:'<circle cx="6" cy="5.5" r="2.5"/><circle cx="18" cy="12" r="2.5"/><circle cx="6" cy="18.5" r="2.5"/><path d="M8.5 6.5 15.5 11M8.5 17.5l7-4.5"/>',
 arrow:'<path d="M4.5 12h15M13.5 6l6 6-6 6"/>',
 play:'<path d="M7 4.5v15l12-7.5z"/>',
 shuffle:'<path d="M3 7h3.5c3 0 4.5 10 8 10H21M17.5 13.5 21 17l-3.5 3.5M3 17h3.5c1.4 0 2.4-1.6 3.2-3.5M14.5 9.5c.8-1.4 1.6-2.5 3-2.5H21M17.5 3.5 21 7l-3.5 3.5"/>',
 eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
 layers:'<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
 scan:'<path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3"/><path d="M7 12h10"/>',
 book:'<path d="M2.5 5.5C5 4 8 4 12 6c4-2 7-2 9.5-.5V19c-2.5-1.5-5.5-1.5-9.5.5-4-2-7-2-9.5-.5z"/><path d="M12 6v13.5"/>',
 // categorías clínicas
 coronaria:'<path d="M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.3a4.2 4.2 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z"/><path d="M6.5 12h3l1.6-2.6 1.8 4.4 1.4-1.8h3.2"/>',
 ic:'<path d="M12 3s6.5 6.8 6.5 11.3a6.5 6.5 0 0 1-13 0C5.5 9.8 12 3 12 3z"/><path d="M9 14.5a3 3 0 0 0 3 3"/>',
 arritmia:'<path d="M2 12.5h3l1.5-4 2.5 8 2-10 2.5 9 1.5-3H22"/>',
 hta:'<path d="M3.5 17a8.5 8.5 0 1 1 17 0"/><path d="m12 17 4.5-5.5"/><circle cx="12" cy="17" r="1.3"/>',
 valvular:'<circle cx="12" cy="12" r="9"/><path d="M12 12V3M12 12l7.8 4.5M12 12l-7.8 4.5"/>',
 mio:'<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 12.5 9 5 9-5"/><path d="m3 16.5 9 5 9-5"/>',
 vascular:'<path d="M12 21.5V12M12 12 6 6M12 12l6-6M6 6V2.5M6 6H2.5M18 6V2.5M18 6h3.5"/>',
 otros:'<circle cx="7" cy="7" r="2.2"/><circle cx="17" cy="7" r="2.2"/><circle cx="7" cy="17" r="2.2"/><circle cx="17" cy="17" r="2.2"/>'
};
window.CI=(name,cls)=>`<svg class="ci ${cls||''}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${P[name]||P.otros}</svg>`;
/* Paletas: color principal y tinta oscura para texto sobre tinte */
window.CPAL={
 nivel:{1:['#3b4fa6','#22307a'],2:['#d0283e','#8f1326'],3:['#df6a24','#93400c'],4:['#6b2fc4','#43177f'],5:['#0a7fae','#064f6e']},
 cat:{coronaria:['#d0283e','#8f1326'],ic:['#3b4fa6','#22307a'],arritmia:['#df6a24','#93400c'],hta:['#b3246f','#701344'],valvular:['#6b2fc4','#43177f'],mio:['#0a7fae','#064f6e'],vascular:['#1c7d4c','#0f4f2f'],otros:['#56658a','#323d58']},
 ritmo:{Sinusales:['#1c7d4c','#0f4f2f'],Supraventriculares:['#3b4fa6','#22307a'],Ventriculares:['#d0283e','#8f1326'],'Bloqueos AV':['#6b2fc4','#43177f'],Paro:['#0a1633','#0a1633'],Patrones:['#df6a24','#93400c']},
 grupo:{'Antitrombóticos':['#d0283e','#8f1326','ic'],Neurohormonales:['#3b4fa6','#22307a','hta'],'Cardiometabólicos':['#1c7d4c','#0f4f2f','layers'],'Diuréticos':['#0a7fae','#064f6e','ic'],Vasodilatadores:['#b3246f','#701344','vascular'],'Antiarrítmicos':['#df6a24','#93400c','arritmia'],'Cuidados críticos':['#6b2fc4','#43177f','acls']}
};
})();
