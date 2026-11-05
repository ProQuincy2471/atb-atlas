/* INFEORA · revisiones de terapia antirretroviral NIH octubre 2026.
 * Separar moléculas, potenciadores y regímenes completos: NO hay monoterapia para VIH.
 */
window.INFEORA_PHARM_CLINICAL=window.INFEORA_PHARM_CLINICAL||{sources:{},drugs:{},additions:[],meta:{}};
(function(R){
'use strict';
R.sources.NIH_ARV26={label:'NIH/DHHS · Appendix A, Tables 1–10, actualizado 27-oct-2026',url:'https://clinicalinfo.hiv.gov/es/node/11696',reviewed:'2026-11-04',scope:'Dosis para adultos en regímenes concretos; revisar coinfección VHB, resistencia y apéndice renal/hepático.'};
R.sources.NIH_START26={label:'NIH/DHHS · Regímenes antirretrovirales iniciales, septiembre 2026',url:'https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-arv/what-start-initial-combination-regimens',reviewed:'2026-11-04'};
R.sources.NIH_CHANGE26={label:'NIH/DHHS · Novedades TAR, 27-oct-2026',url:'https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-arv/whats-new',reviewed:'2026-11-04'};
R.sources.FDA_BIX26={label:'DailyMed · BIXLENVO (bictegravir/lenacapavir), agosto 2026',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=072a3c7e-33fb-4a87-ba21-3d8dad3f5c48',reviewed:'2026-11-04'};
R.sources.FDA_IDV26={label:'DailyMed · IDVYNSO (doravirina/islatravir), abril 2026',url:'https://www.dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=11aaeb53-9848-433c-be7f-db8a5bc0b26f&type=display',reviewed:'2026-11-04'};
const put=(id,doses,detail={})=>{
 const prev=R.drugs[id]||{};
 const {sourceKeys:extraSources,...fields}=detail;
 R.drugs[id]={...prev,...fields,
  doses:[...(prev.doses||[]),...doses.map(([t,ad,comment,sourceKey])=>({t,ad,comment:comment||'',sourceKey:sourceKey||'NIH_ARV26'}))],
  sourceKeys:[...new Set([...(prev.sourceKeys||[]),'NIH_ARV26',...(extraSources||[])])],
  reviewDate:'2026-11-04'};
};
put('dolutegravir',[
 ['VIH: parte de régimen combinado, sin resistencia INSTI','50 mg VO una vez al día'],
 ['Con rifampicina o determinados inductores / resistencia INSTI seleccionada','50 mg VO cada 12 h; verificar mutaciones e interacciones']
],{pearls:['No constituye terapia completa si se administra solo.','NIH 2026 recomienda DTG + dos ITIAN o DTG/3TC en situaciones definidas; descartar VHB cuando se contempla DTG/3TC.'],sourceKeys:['NIH_START26'],monitor:['Carga viral, historial de resistencia, función hepática, interacciones y adherencia.']});
put('raltegravir',[
 ['VIH, formulación Isentress convencional','400 mg VO cada 12 h'],
 ['Isentress convencional cuando se administra con rifampicina','800 mg VO cada 12 h'],
 ['Isentress HD en personas seleccionadas sin exposición a INSTI o virológicamente suprimidas','1,200 mg VO (dos tabletas de 600 mg) una vez al día; no usar este esquema con rifampicina']
],{pearls:['Isentress HD no es intercambiable miligramo a miligramo con Isentress convencional.'],monitor:['Carga viral, interacciones, síntomas musculares y CK si clínicamente indicado.']});
put('cabotegravir',[
 ['Fase oral asociada a rilpivirina para preparación / puente de régimen IM completo','Cabotegravir 30 mg VO + rilpivirina 25 mg VO cada 24 h con alimentos durante hasta 4 semanas según protocolo']
],{pearls:['No equivale a tratamiento en monoterapia y no debe extrapolarse a PrEP inyectable.'],monitor:['Carga viral y cumplimiento del calendario de inyecciones al usar régimen LA.']});
put('elvitegravir-cobicistat',[
 ['VIH, únicamente dentro de Genvoya o Stribild (esquema completo según formulación)','Una tableta de combinación fija al día con comida; revisar componentes y función renal']
],{pearls:['Elvitegravir requiere potenciación con cobicistat; verificar interacciones de CYP3A y diferencias entre TDF/TAF.']});
put('lenacapavir',[
 ['VIH multirresistente, inicio opción 1 con Sunlenca','Día 1: lenacapavir 927 mg SC más 600 mg VO; día 2: 600 mg VO'],
 ['VIH multirresistente, inicio opción 2 con Sunlenca','Días 1 y 2: 600 mg VO/día; día 8: 300 mg VO; día 15: 927 mg SC'],
 ['VIH multirresistente, mantenimiento con Sunlenca','927 mg SC cada 6 meses (2 inyecciones SC); en combinación con otros antirretrovirales activos']
],{pearls:['Las pautas de lenacapavir para tratamiento, PrEP y su coformulación con bictegravir NO son intercambiables.','Larga duración y efecto en CYP3A requieren análisis estricto de interacciones.'],monitor:['Carga viral, reacciones locales y evaluación de interacciones prolongadas.']});
put('fostemsavir',[
 ['VIH-1 en rescate combinado, comprimido de liberación prolongada','600 mg VO cada 12 h']
],{pearls:['Debe combinarse con otros antirretrovirales activos según resistencia; evitar inductores fuertes CYP3A.'],monitor:['Carga viral, PFH y factores de riesgo de QT.']});
put('ibalizumab',[
 ['VIH-1 multirresistente, dosis inicial','2,000 mg IV una vez (infusión según ficha)'],
 ['VIH-1 multirresistente, mantenimiento','800 mg IV cada 2 semanas (infusión o administración según formulación autorizada)']
],{pearls:['Anticuerpo postunión CD4, no se utiliza solo.'],monitor:['Reacciones de infusión e hipersensibilidad; respuesta virológica.']});
put('maraviroc',[
 ['VIH-1 CCR5 con fármacos sin inductores ni inhibidores potentes CYP3A','300 mg VO cada 12 h'],
 ['Con inhibidores potentes CYP3A','150 mg VO cada 12 h (según interacciones y función renal)'],
 ['Con inductores CYP3A sin inhibidores','600 mg VO cada 12 h (según combinación)']
],{pearls:['Exige prueba de tropismo CCR5 antes de usarlo.','La dosis cambia marcadamente con interacciones CYP3A y función renal.'],monitor:['Función hepática, síntomas de hipersensibilidad e hipotensión; carga viral.']});
put('bictegravir-taf-ftc',[
 ['VIH-1, régimen completo BIC/TAF/FTC (Biktarvy)','Bictegravir 50 mg + TAF 25 mg + FTC 200 mg, una tableta VO cada 24 h']
],{indications:['Régimen completo indicado en tratamiento inicial para personas elegibles con VIH-1.'],
 pearls:['El fármaco bictegravir no se comercializa como monoterapia en este esquema.','La seguridad renal y las interacciones dependen de los tres componentes.'],sourceKeys:['NIH_START26']});
put('dolutegravir-lamivudina',[
 ['VIH-1, régimen completo DTG/3TC (Dovato)','Dolutegravir 50 mg + lamivudina 300 mg, una tableta VO cada 24 h']
],{indications:['Tratamiento inicial de VIH-1 en pacientes elegibles sin resistencia relevante ni coinfección VHB no cubierta.'],
 pearls:['NIH septiembre 2026 ya no restringe DTG/3TC por carga viral basal elevada por sí sola; mantiene restricciones relacionadas con VHB, resistencia y falta de resultados.'],sourceKeys:['NIH_START26']});
put('dolutegravir-abacavir-lamivudina',[
 ['VIH-1, régimen completo DTG/ABC/3TC (Triumeq)','50 mg dolutegravir + 600 mg abacavir + 300 mg lamivudina VO una vez al día']
],{contraindications:['No usar abacavir con HLA-B*57:01 positivo o antecedente de hipersensibilidad; evaluar VHB.'],pearls:['Obtener HLA-B*57:01 previo a abacavir y evaluar riesgo cardiovascular.'],sourceKeys:['NIH_START26']});
put('cabotegravir-rilpivirina-la',[
 ['VIH-1 suprimido, inicio mensual IM CAB/RPV','Cabotegravir 600 mg IM + rilpivirina 900 mg IM una vez'],
 ['VIH-1 suprimido, mantenimiento IM mensual','Cabotegravir 400 mg IM + rilpivirina 600 mg IM cada mes'],
 ['VIH-1 suprimido, mantenimiento cada 2 meses','Después de dos dosis mensuales de CAB 600 mg / RPV 900 mg, aplicar CAB 600 mg + RPV 900 mg IM cada 2 meses']
],{indications:['Régimen completo de mantenimiento en personas con VIH virológicamente suprimidas elegibles; no tratar fracaso activo sin evaluación.'],
 precautions:['La inyección omitida exige protocolo específico de sustitución/retorno; no cambiar intervalos improvisadamente.'],
 monitor:['Carga viral, reacciones locales y calendario exacto de aplicación.']});
put('dolutegravir-rilpivirina',[
 ['VIH suprimido, combinación completa DTG/RPV (Juluca)','Dolutegravir 50 mg + rilpivirina 25 mg VO una vez al día CON comida']
],{pearls:['Uso como cambio de esquema en supresión virológica seleccionada, no primer esquema universal.']});
put('doravirina-tdf-lamivudina',[
 ['VIH-1, régimen fijo DOR/TDF/3TC (Delstrigo)','Doravirina 100 mg + TDF 300 mg + lamivudina 300 mg VO una vez al día']
]);
put('efavirenz-tdf-emtricitabina',[
 ['VIH-1, combinación histórica EFV/TDF/FTC','Efavirenz 600 mg + TDF 300 mg + FTC 200 mg VO cada 24 h, en ayunas, preferentemente al acostarse']
],{pearls:['No es régimen inicial preferido en NIH 2026 por toxicidad del SNC, interacciones y alternativas actuales.']});
put('efavirenz-tdf-lamivudina',[
 ['VIH-1, combinación histórica EFV/TDF/3TC','Efavirenz 600 mg + TDF 300 mg + 3TC 300 mg VO cada 24 h, en ayunas, preferentemente al acostarse']
],{pearls:['No es régimen inicial preferido en NIH 2026.']});
put('rilpivirina-taf-emtricitabina',[
 ['VIH-1, combinación RPV/TAF/FTC (Odefsey)','Rilpivirina 25 mg + TAF 25 mg + FTC 200 mg VO una vez al día con comida']
]);
put('rilpivirina-tdf-emtricitabina',[
 ['VIH-1, combinación RPV/TDF/FTC (Complera)','Rilpivirina 25 mg + TDF 300 mg + FTC 200 mg VO una vez al día con comida']
]);
put('darunavir-cobicistat-taf-emtricitabina',[
 ['VIH-1, combinación DRV/c/TAF/FTC (Symtuza)','Darunavir 800 mg + cobicistat 150 mg + TAF 10 mg + FTC 200 mg VO una vez al día con comida']
],{pearls:['Numerosas interacciones por cobicistat; útil en determinados escenarios de resistencia.']});
put('tenofovir-df-emtricitabina',[
 ['Doble ITIAN TDF/FTC (requiere completar TAR)','TDF 300 mg + FTC 200 mg VO una vez al día']
],{pearls:['No es un régimen completo de tratamiento VIH por sí solo; evaluar PrEP/PEP según pautas independientes.']});
put('tenofovir-af-emtricitabina',[
 ['Doble ITIAN TAF/FTC (requiere completar TAR)','TAF 25 mg + FTC 200 mg VO una vez al día']
],{pearls:['No equivale automáticamente a PrEP para toda vía de exposición; revisar criterios específicos.']});
put('tenofovir-df-lamivudina',[
 ['Doble ITIAN TDF/3TC (requiere completar TAR)','TDF 300 mg + lamivudina 300 mg VO una vez al día']
]);
put('doravirina-islatravir',[
 ['VIH-1 suprimido: cambio a DOR/ISL (Idvynso)','Doravirina 100 mg + islatravir 0.25 mg, una tableta VO cada día','','FDA_IDV26']
],{sourceKeys:['FDA_IDV26','NIH_CHANGE26'],indications:['Cambio de régimen en VIH-1 suprimido sin fallo virológico previo ni resistencia a doravirina.'],
 pearls:['La indicación estadounidense es de cambio en supresión sostenida, NO primer tratamiento indiferenciado.','Con rifabutina se requiere ajuste suplementario de doravirina según la ficha FDA.'],
 interactions:['Fármacos inductores CYP3A pueden comprometer la exposición; revisar ficha de interacción específica.']});
put('bictegravir-lenacapavir',[
 ['VIH-1 suprimido: inicio BIC/LEN (Bixlenvo) más lenacapavir oral','Días 1 y 2: BIC 75 mg/LEN 50 mg VO (una tableta al día) + lenacapavir adicional 600 mg VO al día','','FDA_BIX26'],
 ['VIH-1 suprimido: mantenimiento BIC/LEN (Bixlenvo)','Desde día 3: BIC 75 mg/LEN 50 mg VO, una tableta al día','','FDA_BIX26']
],{sourceKeys:['FDA_BIX26','NIH_CHANGE26'],indications:['Régimen completo de sustitución en adultos con VIH-1 suprimido y sin resistencia conocida/sospechada a los componentes.'],
 contraindications:['No coadministrar con dofetilida ni con inductores potentes de CYP3A, según ficha.'],
 interactions:['La combinación contiene lenacapavir, con interacciones CYP3A/P-gp clínicamente relevantes; no se añaden otros antirretrovirales de rutina.'],
 pearls:['Aprobada FDA agosto 2026 e incorporada a guía NIH 27 octubre 2026.','Bixlenvo requiere dos días de inicio con Sunlenca oral: omitir esa fase no reproduce la pauta aprobada.'],
 monitor:['Carga viral, cumplimiento del esquema de inicio, interacciones, hepatitis B y función renal según contexto.']});
const add=(id,name,family,subgroup,mechanism,context,limitations,newer=true)=>
 R.additions.push({id,name,kingdom:'virus',family,subgroup,mechanism,context,limitations,newer});
add('bictegravir-taf-ftc','Bictegravir / tenofovir alafenamida / emtricitabina','VIH, regímenes completos','INSTI + 2 ITIAN','Inhibición de integrasa y transcriptasa inversa VIH.','TAR completo BIC/TAF/FTC en personas elegibles.','No extrapolar dosis de componentes aislados; verificar VHB e interacciones.');
add('dolutegravir-lamivudina','Dolutegravir / lamivudina','VIH, regímenes completos','INSTI + ITIAN','Inhibición de integrasa y transcriptasa inversa VIH.','TAR completo DTG/3TC en personas elegibles.','Requiere excluir VHB no cubierto y resistencia relevante.');
add('dolutegravir-abacavir-lamivudina','Dolutegravir / abacavir / lamivudina','VIH, regímenes completos','INSTI + 2 ITIAN','Integrasa y transcriptasa inversa VIH.','TAR completo en selección específica.','Requiere HLA-B*57:01 y revisar riesgo cardiovascular/VHB.');
add('cabotegravir-rilpivirina-la','Cabotegravir / rilpivirina IM de acción prolongada','VIH, regímenes completos','INSTI + ITINN, parenteral','Inhibición de integrasa y transcriptasa inversa.','Mantenimiento en VIH-1 suprimido elegible.','No para iniciar terapia en viremia activa sin criterio; calendario estricto.');
add('dolutegravir-rilpivirina','Dolutegravir / rilpivirina','VIH, regímenes completos','INSTI + ITINN','Integrasa y transcriptasa inversa VIH.','TAR de mantenimiento en suprimidos elegibles.','Requiere comida y revisión de resistencia.');
add('doravirina-tdf-lamivudina','Doravirina / TDF / lamivudina','VIH, regímenes completos','ITINN + 2 ITIAN','Inhibición de transcriptasa inversa.','Régimen fijo VIH con elegibilidad y acceso.','Interacciones con inductores CYP3A.');
add('efavirenz-tdf-emtricitabina','Efavirenz / TDF / emtricitabina','VIH, regímenes completos','ITINN + 2 ITIAN, clásico','Inhibición de transcriptasa inversa.','Regímenes históricos aún presentes en algunos contextos.','No recomendado como primera opción en NIH 2026.');
add('efavirenz-tdf-lamivudina','Efavirenz / TDF / lamivudina','VIH, regímenes completos','ITINN + 2 ITIAN, clásico','Inhibición de transcriptasa inversa.','Regímenes históricos.','No recomendado como primera opción en NIH 2026.');
add('rilpivirina-taf-emtricitabina','Rilpivirina / TAF / emtricitabina','VIH, regímenes completos','ITINN + 2 ITIAN','Inhibición transcriptasa inversa.','Régimen fijo seleccionado VIH.','Rilpivirina precisa comida; revisar interacción con supresores ácidos.');
add('rilpivirina-tdf-emtricitabina','Rilpivirina / TDF / emtricitabina','VIH, regímenes completos','ITINN + 2 ITIAN','Inhibición transcriptasa inversa.','Régimen fijo seleccionado VIH.','Considerar carga viral basal y uso con comida.');
add('darunavir-cobicistat-taf-emtricitabina','Darunavir / cobicistat / TAF / emtricitabina','VIH, regímenes completos','IP potenciado + 2 ITIAN','Bloqueo de proteasa y transcriptasa inversa VIH.','Tratamiento completo en contextos elegibles.','Muchas interacciones y precauciones metabólicas.');
add('tenofovir-df-emtricitabina','Tenofovir DF / emtricitabina','VIH, combinaciones base','2 ITIAN','Inhibición transcriptasa inversa.','Base de TAR o de prevención según protocolo.','No basta solo como TAR completo.');
add('tenofovir-af-emtricitabina','Tenofovir AF / emtricitabina','VIH, combinaciones base','2 ITIAN','Inhibición transcriptasa inversa.','Base de TAR en combinaciones.','Indicación preventiva depende tipo de exposición.');
add('tenofovir-df-lamivudina','Tenofovir DF / lamivudina','VIH, combinaciones base','2 ITIAN','Inhibición transcriptasa inversa.','Base de TAR en combinaciones.','No es TAR completo por sí sola.');
add('doravirina-islatravir','Doravirina / islatravir','VIH, regímenes completos','ITINN + ITIAN, cambio 2026','Inhibición combinada de transcriptasa inversa.','Cambio en VIH-1 suprimido sin fallo previo ni resistencia DOR.','No es un régimen inicial universal; disponibilidad regional.');
add('bictegravir-lenacapavir','Bictegravir / lenacapavir (Bixlenvo)','VIH, regímenes completos','INSTI + inhibidor de cápside','Inhibición de integración y función de cápside VIH.','Cambio de tratamiento VIH-1 suprimido en adultos elegibles.','Requiere inducción oral de dos días junto a Sunlenca.');
add('ritonavir-potenciador','Ritonavir (potenciador farmacocinético)','VIH, potenciadores','Inhibidor CYP3A','Inhibe CYP3A, elevando exposición de ciertos inhibidores de proteasa.','Potenciación de regímenes específicos y en combinaciones de otros antivirales.','No es terapia antirretroviral completa por sí sola.');
add('cobicistat-potenciador','Cobicistat (potenciador farmacocinético)','VIH, potenciadores','Inhibidor CYP3A','Inhibidor de CYP3A4 sin actividad antiviral directa.','Potenciación de elvitegravir y determinados inhibidores de proteasa.','No tiene efecto antirretroviral propio; interacciones múltiples.');
})(window.INFEORA_PHARM_CLINICAL);