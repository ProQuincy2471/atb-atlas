/* INFEORA · Fichas selectivas documentadas en IDSA, CDC, FDA y OMS.
   Los esquemas son estrictamente por indicación y adultos; no sustituyen
   las fichas oficiales ni dosis individualizadas por función renal/hepática.
 */
window.INFEORA_PHARM_CLINICAL=window.INFEORA_PHARM_CLINICAL||{sources:{},drugs:{},additions:[],meta:{}};
(function(R){
'use strict';
const SRC=R.sources;
SRC.IDSA_CANDIDA={label:'IDSA · Guía candidiasis 2016 (última comprobación noviembre 2026)',url:'https://www.idsociety.org/practice-guideline/candidiasis/',reviewed:'2026-11-04',scope:'Esquemas de candidemia y candidiasis invasiva en pacientes seleccionados.'};
SRC.FDA_REZA={label:'DailyMed · Rezafungina (Rezzayo), ficha de julio 2026',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=90073508-6dca-4d27-aa5a-ed837737c35b',reviewed:'2026-11-04'};
SRC.FDA_IBRE={label:'FDA · Ibrexafungerp (Brexafemme), ficha 2025',url:'https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/214900s003lbl.pdf',reviewed:'2026-11-04'};
SRC.CDC_MAL26={label:'CDC · Tratamiento de malaria, agosto 2026',url:'https://www.cdc.gov/malaria/hcp/clinical-guidance/appendix-a-treatment-tables.html',reviewed:'2026-11-04',scope:'Regímenes estadounidenses; ajustar a especie, región de adquisición y gravedad.'};
SRC.CDC_SEV26={label:'CDC · Tratamiento de malaria grave, agosto 2026',url:'https://www.cdc.gov/malaria/hcp/clinical-guidance/iv-artesunate-us.html',reviewed:'2026-11-04'};
SRC.CDC_PIN={label:'CDC · Enterobiasis, esquemas y repetición',url:'https://www.cdc.gov/pinworm/hcp/clinical-overview/index.html',reviewed:'2026-11-04'};
SRC.CDC_LICE={label:'CDC · Pediculosis capitis, tratamientos tópicos',url:'https://www.cdc.gov/lice/hcp/clinical-care/',reviewed:'2026-11-04'};
SRC.WHO_TB26={label:'OMS · Tuberculosis, módulo 4, segunda edición 2026',url:'https://www.who.int/publications/i/item/9789240125124',reviewed:'2026-11-04'};
SRC.WHO_TB25={label:'OMS · Manual operativo TB, módulo 4, edición 2025',url:'https://www.who.int/publications/i/item/9789240108141',reviewed:'2026-11-04'};
const put=(id,key,doses,extra={})=>{
 const prev=R.drugs[id]||{};
 R.drugs[id]={...prev,
  doses:[...(prev.doses||[]),...doses.map(([t,ad,comment])=>({t,ad,comment:comment||'',sourceKey:key}))],
  sourceKeys:[...new Set([...(prev.sourceKeys||[]),key,...(extra.sourceKeys||[])])],
  reviewDate:'2026-11-04',...extra};
};
put('micafungina','IDSA_CANDIDA',[
 ['Candidemia / candidiasis invasiva en adultos','100 mg IV cada 24 h']
],{pearls:['Equinocandina: concentraciones insuficientes en orina, humor vítreo y LCR; no extrapolar a esos focos.'],monitor:['Hemocultivos de control, foco, función hepática y respuesta clínica.']});
put('anidulafungina','IDSA_CANDIDA',[
 ['Candidemia / candidiasis invasiva: dosis de carga','200 mg IV una vez'],
 ['Candidemia / candidiasis invasiva: mantenimiento','100 mg IV cada 24 h después de la carga']
],{pearls:['No suele requerir ajuste renal; considerar limitaciones de penetración urinaria/SNC/ocular.']});
put('caspofungina','IDSA_CANDIDA',[
 ['Candidemia / candidiasis invasiva: carga','70 mg IV una vez'],
 ['Candidemia / candidiasis invasiva: mantenimiento','50 mg IV cada 24 h']
],{pearls:['Considerar ajuste en disfunción hepática moderada y medicamentos inductores, según ficha técnica.']});
put('fluconazol','IDSA_CANDIDA',[
 ['Candidemia seleccionada (no crítico, cepa susceptible probable): carga','800 mg VO/IV una vez (12 mg/kg)'],
 ['Candidemia seleccionada: mantenimiento','400 mg VO/IV cada 24 h (6 mg/kg)']
],{pearls:['En candidemia se debe probar susceptibilidad a azoles; no confundir con el tratamiento de micosis por mohos.','Desescalamiento de equinocandina a fluconazol solo si estable, hemocultivos negativos y aislamiento susceptible.'],monitor:['Pruebas hepáticas, QT y función renal/interacciones cuando proceda.']});
put('anfotericina-liposomal','IDSA_CANDIDA',[
 ['Candidemia / candidiasis invasiva, alternativa cuando no es apropiada una equinocandina','3–5 mg/kg IV cada 24 h de anfotericina B formulación lipídica (la pauta concreta depende de la formulación)']
],{pearls:['La dosis no es intercambiable entre anfotericina desoxicolato, liposomal y complejo lipídico.'],
 monitor:['Creatinina, potasio, magnesio, hidratación y reacciones a infusión.']});
put('rezafungina','FDA_REZA',[
 ['Candidemia / candidiasis invasiva con opciones limitadas, carga','400 mg IV una vez en la primera semana'],
 ['Candidemia / candidiasis invasiva, mantenimiento','200 mg IV una vez por semana después de la carga; seguridad más allá de 4 dosis semanales no establecida']
],{indications:['Candidemia o candidiasis invasiva en pacientes seleccionados con opciones limitadas, según ficha FDA.'],
 precautions:['No estudiada específicamente en endocarditis, osteomielitis ni meningitis por Candida.','La duración y pauta deben considerar control de foco y resultados microbiológicos.'],
 pearls:['Equinocandina de administración semanal; no intercambiar por equivalencia simple con micafungina o caspofungina.']});
put('ibrexafungerp','FDA_IBRE',[
 ['Candidiasis vulvovaginal aguda','300 mg VO; repetir 300 mg aproximadamente 12 h después (600 mg en 1 día)'],
 ['Reducción de recurrencia de candidiasis vulvovaginal seleccionada','300 mg VO cada 12 h durante un día, repetido cada mes por 6 meses, según ficha']
],{contraindications:['Embarazo: verificar prohibición/advertencias reproductivas vigentes según etiqueta.'],
 precautions:['Comprobar estado de embarazo previo a cada curso y medidas de anticoncepción recomendadas en ficha.','No extrapolar a candidemia ni micosis profundas.'],
 pearls:['Triterpeno inhibidor de glucano-sintasa oral, distinto de las equinocandinas IV.']});
put('artesunato-iv','CDC_SEV26',[
 ['Malaria grave, cualquier especie: fase inicial','2.4 mg/kg IV a las 0, 12 y 24 horas (tres dosis iniciales)'],
 ['Malaria grave: continuación si parasitemia >1% o no tolera VO','2.4 mg/kg IV una vez al día hasta completar como máximo 7 días IV; después completar esquema oral apropiado']
],{pearls:['El artesunato IV no sustituye el tratamiento oral completo de consolidación una vez que el paciente lo tolera.','Seguimiento de hemólisis tardía después de artesunato en malaria grave.'],
 monitor:['Gota gruesa/frotis hasta aclaramiento y vigilancia de hemólisis diferida.']});
put('artemeter-lumefantrina','CDC_MAL26',[
 ['P. falciparum no complicado (CDC agosto 2026, régimen extendido)','4 tabletas (20/120 mg cada tableta) VO por dosis: día 1 a las 0 y 8 h; días 2–5 cada 12 h (10 dosis en total)'],
 ['P. malariae/knowlesi confirmado, régimen de 3 días en CDC','4 tabletas VO por dosis: día 1 a las 0 y 8 h; días 2 y 3 cada 12 h (6 dosis)']
],{pearls:['Cambio CDC agosto 2026: para P. falciparum se amplía a cinco días; no aplicar automáticamente 3 días a este escenario.','Administrar con comida/bebida grasa para facilitar absorción.'],
 monitor:['Respuesta clínica y parasitemia, gravedad y ECG si riesgo de QT.']});
put('atovacuona-proguanil','CDC_MAL26',[
 ['Malaria no complicada, adulto, especie y contexto susceptible','4 tabletas adultas (250 mg atovacuona/100 mg proguanil cada una) VO una vez al día por 3 días']
],{pearls:['Administrar con comida grasa; absorción puede fallar con vómito/diarrea.','No sustituye el tratamiento antirrecaída de P. vivax/ovale cuando está indicado.']});
put('primaquina','CDC_MAL26',[
 ['Prevención de recaída P. vivax/P. ovale, adulto con actividad G6PD normal','30 mg base VO cada 24 h por 14 días; en peso ≥70 kg CDC recomienda dosis total 6 mg/kg distribuidas en días apropiados']
],{contraindications:['No administrar sin determinación cuantitativa de G6PD adecuada; evitar embarazo.'],
 pearls:['Actúa sobre hipnozoítos hepáticos; no sustituye terapia de fase sanguínea aguda.'],
 monitor:['Prueba G6PD cuantitativa antes de tratamiento y signos de hemólisis.']});
put('tafenoquina','CDC_MAL26',[
 ['Prevención de recaída P. vivax/ovale, opción seleccionada','300 mg VO dosis única en condiciones específicas, usualmente tras cloroquina/hidroxicloroquina y con G6PD cuantitativa normal']
],{contraindications:['Evitar con deficiencia G6PD, en embarazo y en otras situaciones contraindicadas por ficha.'],
 pearls:['No es sustituto universal de primaquina: selección depende del tratamiento sanguíneo previo y criterios de edad/G6PD.'],
 monitor:['Comprobar G6PD cuantitativa normal y contraindicaciones antes de administrar.']});
put('quinina','CDC_MAL26',[
 ['Malaria no complicada cuando se requiere alternativa; combinar con doxiciclina','Quinina sulfato 650 mg de sal VO cada 8 h por 7 días + doxiciclina 100 mg VO cada 12 h por 7 días (esquema CDC)']
],{pearls:['Quinina sola no es tratamiento completo del escenario descrito; requiere fármaco acompañante.']});
put('mefloquina','CDC_MAL26',[
 ['Malaria no complicada, solo sin otras opciones','750 mg de sal VO, seguidos de 500 mg de sal VO 6–12 h después (dosis en sales según presentación estadounidense)']
],{precautions:['Evitar con antecedentes psiquiátricos o convulsivos y en otros supuestos de contraindicación; verificar ficha.'],
 pearls:['CDC la reserva cuando no hay otras opciones; no se prefiere por neurotoxicidad.']});
put('cloroquina','CDC_MAL26',[
 ['P. malariae o P. knowlesi en monoinfección confirmada sensible','600 mg base VO inicial; 300 mg base VO a las 6, 24 y 48 horas']
],{pearls:['No usar indiscriminadamente ante P. falciparum con resistencia geográfica probable.','La dosis puede expresarse en base o sal; comprobar equivalencias de la presentación.']});
put('hidroxicloroquina-malaria','CDC_MAL26',[
 ['P. malariae / knowlesi como alternativa en monoinfección confirmada','800 mg de sulfato (620 mg base) VO inicial; luego 400 mg de sulfato (310 mg base) a las 6, 24 y 48 h']
],{pearls:['La indicación aquí es MALARIA; no confundir con dosis reumatológica ni entre unidades base y sal.']});
put('albendazol','CDC_PIN',[
 ['Enterobiasis por Enterobius vermicularis','400 mg VO una vez en ayunas; repetir a las 2 semanas']
],{pearls:['Tratar contactos e higiene para evitar reinfección; la repetición destruye helmintos que nacieron después de la primera dosis.']});
put('mebendazol','CDC_PIN',[
 ['Enterobiasis por Enterobius vermicularis','100 mg VO en dosis única; repetir a las 2 semanas']
],{pearls:['No olvidar segunda dosis y medidas ambientales.']});
put('pirantel-pamoato','CDC_PIN',[
 ['Enterobiasis, adultos','11 mg/kg VO una vez (máximo 1 g), repetir a las 2 semanas']
],{pearls:['Paraliza nematodos intestinales; no sustituye tratamiento de enfermedad tisular.']});
put('spinosad-topico','CDC_LICE',[
 ['Pediculosis capitis, suspensión tópica 0.9%','Aplicar suspensión de spinosad 0.9% según ficha; repetir solo si se observan piojos vivos a los 7 días']
],{pearls:['Pediculicida y ovicida; la guía CDC indica que habitualmente no requiere peine para liendres ni repetición rutinaria.']});
R.additions.push(
 {id:'hidroxicloroquina-malaria',name:'Hidroxicloroquina (malaria)',kingdom:'parasites',family:'4-aminoquinolinas',subgroup:'Antipalúdico sensible',mechanism:'Interfiere con detoxificación de hemo en Plasmodium susceptible.',context:'P. malariae/knowlesi confirmado, como alternativa dentro de pautas regionales.',limitations:'La equivalencia base/sal es crucial; no extrapolar a P. falciparum resistente.'},
 {id:'pirantel-pamoato',name:'Pamoato de pirantel',kingdom:'parasites',family:'Antihelmínticos neuromusculares',subgroup:'Despolarizantes de nematodos',mechanism:'Bloqueo neuromuscular despolarizante en nematodos intestinales.',context:'Enterobiasis y otros nematodos luminales según especie.',limitations:'No para infestaciones tisulares.'},
 {id:'spinosad-topico',name:'Spinosad tópico 0.9%',kingdom:'parasites',family:'Ectoparasiticidas',subgroup:'Pediculicida ovicida',mechanism:'Afecta la transmisión nerviosa en insectos causando parálisis.',context:'Pediculosis de la cabeza.',limitations:'No usar por vía sistémica.'},
 {id:'anfotericina-b-complejo-lipidico',name:'Complejo lipídico de anfotericina B',kingdom:'fungi',family:'Polienos sistémicos',subgroup:'Anfotericina B formulación lipídica',mechanism:'Se une a ergosterol y altera integridad de la membrana fúngica.',context:'Micosis invasivas seleccionadas según especie y formulación.',limitations:'No intercambiar dosificación mg/kg con anfotericina liposomal o desoxicolato.'}
);
const p=R.drugs['bedaquilina']||{};
R.drugs['bedaquilina']={...p,sourceKeys:[...new Set([...(p.sourceKeys||[]),'WHO_TB26','WHO_TB25'])],
 pearls:[...(p.pearls||[]),'La actualización OMS de septiembre 2026 individualiza regímenes cortos para TB resistente según gravedad; revisar el esquema completo antes de prescribir.','Nunca administrar bedaquilina sola para tuberculosis activa.'],
 monitor:['ECG/QTc, función hepática, interacciones y tolerancia de los demás componentes del esquema.']};
const py=R.drugs['pretomanid']||{};
R.drugs['pretomanid']={...py,sourceKeys:[...new Set([...(py.sourceKeys||[]),'WHO_TB26'])],
 pearls:[...(py.pearls||[]),'Pretomanid solo se utiliza dentro de esquemas combinados apropiados para TB resistente; la elección depende de sensibilidad y guías OMS 2026.']};
})(window.INFEORA_PHARM_CLINICAL);