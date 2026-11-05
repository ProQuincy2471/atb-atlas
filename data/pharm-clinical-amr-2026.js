/* INFEORA · complementos antibacterianos cotejados con IDSA AMR 2026.
 * Dosis adultas (función renal y hepática normales); solo escenarios expresados
 * por las fuentes. No equivale a validación integral de la monografía.
 */
window.INFEORA_PHARM_CLINICAL=window.INFEORA_PHARM_CLINICAL||{sources:{},drugs:{},additions:[],meta:{}};
(function(R){
'use strict';
R.sources.IDSA26={label:'IDSA 2026 · Gramnegativos resistentes, tabla 1 (adultos)',url:'https://www.idsociety.org/globalassets/idsa/practice-guidelines/amr-guidance/5.0/table-1.pdf',reviewed:'2026-11-04',scope:'Dosis sugeridas solo en los cuadros AMR incluidos; no siempre idénticas a la ficha FDA.'};
R.sources.IDSA_AMR26={label:'IDSA 2026 · Guía de resistencia de gramnegativos',url:'https://www.idsociety.org/practice-guideline/amr-guidance/',reviewed:'2026-11-04',scope:'Recomendaciones condicionadas por especie, foco, fenotipo y antibiograma.'};
R.sources.FDA_GEP={label:'DailyMed · BLUJEPA, ficha revisada 2026',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=80b57cfe-7819-4d95-a57d-014af42f118d',reviewed:'2026-11-04'};
R.sources.FDA_PIV={label:'DailyMed · PIVYA, ficha FDA',url:'https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=440a5f17-ab11-0fc8-e063-6394a90a58e9&type=display',reviewed:'2026-11-04'};
R.sources.FDA_SUL={label:'DailyMed · ORLYNVAH, ficha FDA',url:'https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=24c451c0-4cfb-37f3-e063-6394a90a895e&type=display',reviewed:'2026-11-04'};
const put=(id,doses,extra={})=>{
 const r=R.drugs[id]||{};
 const list=doses.map(([t,ad,comment])=>({t,ad,comment:comment||'',sourceKey:'IDSA26'}));
 R.drugs[id]={...r,doses:[...(r.doses||[]),...list],
  sourceKeys:[...new Set([...(r.sourceKeys||[]),'IDSA26',...(extra.sourceKeys||[])])],
  ...extra,reviewDate:'2026-11-04'};
};
put('amikacina',[
 ['Cistitis no complicada por gramnegativo resistente','15 mg/kg IV, dosis única','Dosis puntual; no extender sin evaluación.'],
 ['ITU complicada por gramnegativo resistente','15 mg/kg IV inicial; ajustar dosis e intervalo posteriores según farmacocinética/monitorización']
],{monitor:['Función renal y concentraciones del aminoglucósido si continúan dosis.','Considerar ototoxicidad y exposición acumulada.']});
put('ampicilina-sulbactam',[
 ['Infección grave por A. baumannii resistente a carbapenémicos (CRAB), esquema de sulbactam alto','9 g de ampicilina/sulbactam IV cada 8 h (6 g ampicilina + 3 g sulbactam) en infusión de 4 h'],
 ['CRAB, alternativa de infusión continua','27 g de ampicilina/sulbactam IV en 24 h continuas (18 g ampicilina + 9 g sulbactam)']
],{pearls:['Este esquema aporta 9 g/día de sulbactam; no equivale a la dosificación convencional de otras infecciones.','En CRAB se utiliza como parte de una estrategia combinada, según IDSA, cuando sulbactam/durlobactam no está disponible.'],sourceKeys:['IDSA_AMR26'],monitor:['Balance hídrico, función renal, sodio aportado por dosis altas y tolerancia a la infusión.']});
put('aztreonam-avibactam',[
 ['Infección por gramnegativos resistentes susceptible, dosis de carga','2.67 g IV (2 g aztreonam + 0.67 g avibactam) una vez, en 3 h'],
 ['Mantenimiento después de carga','2 g IV (1.5 g aztreonam + 0.5 g avibactam) cada 6 h, en 3 h']
],{pearls:['En Enterobacterales productores de MBL (NDM, VIM, IMP) aztreonam resiste la hidrólisis por MBL; avibactam protege contra otras serina-β-lactamasas coexistentes.','No extrapolar actividad de esta combinación a Pseudomonas MBL: IDSA no la recomienda como opción habitual.'],phenotypes:{MBL_E:['variable','Opción preferida en Enterobacterales MBL si el aislamiento es susceptible.'],MBL_P:['no','Actividad limitada: no es estrategia preferida para Pseudomonas con MBL.'],KPC_E:['variable','Depende de antibiograma y mecanismo coexistente.']},sourceKeys:['IDSA_AMR26']});
put('cefepima',[
 ['ITU baja no complicada por gramnegativo sensible, escenario IDSA AMR','1 g IV cada 8 h, infusión 30 min'],
 ['Otras infecciones por gramnegativos AMR con cefepima susceptible','2 g IV de carga (30 min), luego 2 g IV cada 8 h en infusión extendida de 3 h']
],{pearls:['Sugerida para AmpC inducible de riesgo moderado cuando la CMI es susceptible o susceptible dependiente de dosis.','Evitar cefepima para infección invasiva por BLEE aun con reporte de sensibilidad, según IDSA 2026.','La neurotoxicidad por acumulación exige ajustar función renal.'],phenotypes:{AmpC:['variable','Opción sugerida en AmpC inducible con CMI apropiada; confirmar AST.'],ESBL:['no','IDSA desaconseja en pielonefritis/ITU complicada o infección invasiva por BLEE.']},sourceKeys:['IDSA_AMR26'],monitor:['Función renal y estado neurológico; ajustar pauta en insuficiencia renal.']});
put('cefepima-enmetazobactam',[
 ['Infecciones por Enterobacterales susceptibles, incluidas productoras de BLEE','2.5 g IV (2 g cefepima + 0.5 g enmetazobactam) cada 8 h en 2 h'],
 ['Depuración de creatinina ≥130 mL/min','2.5 g IV cada 8 h en 4 h']
],{pearls:['No es equivalente a cefepima sola; la utilidad depende de la β-lactamasa y del antibiograma.'],sourceKeys:['IDSA_AMR26']});
put('cefiderocol',[
 ['Infecciones gramnegativas resistentes incluidas en IDSA AMR','2 g IV cada 8 h, infusión de 3 h'],
 ['Depuración de creatinina ≥120 mL/min','2 g IV cada 6 h, infusión de 3 h']
],{pearls:['Puede ser opción frente a MBL, Pseudomonas multirresistente o Stenotrophomonas; confirmar sensibilidad.','La guía 2026 sitúa cefiderocol como opción preferida en infecciones invasivas por S. maltophilia, con evidencia clínica todavía limitada.','En CRAB considerar cuidadosamente los resultados clínicos y el tratamiento combinado; no declarar actividad universal.'],phenotypes:{MBL_E:['variable','Potencial alternativa en Enterobacterales con MBL; verificar AST.'],MBL_P:['variable','Preferida ante Pseudomonas productora de MBL según IDSA 2026, si susceptible.'],STENO:['variable','Opción preferida para infección invasiva según IDSA 2026; respaldo clínico limitado.'],CRAB:['variable','Actividad no uniforme; decisiones individualizadas y antibiograma.']},sourceKeys:['IDSA_AMR26']});
put('ceftazidima-avibactam',[
 ['Infecciones gramnegativas resistentes susceptibles incluidas en IDSA','2.5 g IV (2 g ceftazidima + 0.5 g avibactam) cada 8 h, infusión 3 h']
],{pearls:['Opción para KPC y OXA-48 en Enterobacterales si susceptible; no inhibe MBL.','Para Enterobacterales MBL puede utilizarse simultáneamente con aztreonam cuando la estrategia combinada esté respaldada.'],phenotypes:{KPC_E:['variable','Activa en muchas KPC; verificar AST y resistencia emergente.'],OXA48_E:['variable','Opción para OXA-48-like susceptible; depende de mecanismos coexistentes.'],MBL_E:['no','Por sí sola no protege frente a MBL; considerar estrategia con aztreonam.'],DTR_P:['variable','Opción sugerida si la Pseudomonas DTR es susceptible.']},sourceKeys:['IDSA_AMR26']});
put('ceftolozano-tazobactam',[
 ['Cistitis no complicada por gramnegativo resistente, esquema IDSA','1.5 g IV cada 8 h en 1 h (1 g ceftolozano + 0.5 g tazobactam)'],
 ['Otras infecciones por gramnegativos resistentes susceptibles, incluido foco pulmonar','3 g IV cada 8 h en 3 h (2 g ceftolozano + 1 g tazobactam)']
],{pearls:['Una de las opciones preferidas para Pseudomonas DTR susceptible; IDSA prioriza esta combinación en neumonía por DTR Pseudomonas.','No confiar en su actividad frente a KPC o metalo-β-lactamasas.'],phenotypes:{DTR_P:['variable','Preferido para neumonía por Pseudomonas DTR susceptible.'],KPC_E:['no','Tazobactam no inhibe KPC.'],MBL_E:['no','No inhibe MBL.']},sourceKeys:['IDSA_AMR26']});
put('ciprofloxacino',[
 ['Cistitis no complicada por gramnegativo resistente susceptible','400 mg IV cada 12 h o 500 mg VO cada 12 h'],
 ['Otras infecciones por gramnegativos resistentes susceptibles','400 mg IV cada 8 h o 750 mg VO cada 12 h']
],{pearls:['Reservar el uso de fluoroquinolonas cuando hay alternativas por su perfil de seguridad.','La sensibilidad microbiológica no sustituye valoración de foco ni toxicidad.'],monitor:['QT, efectos tendinosos/neurológicos y función renal según el contexto.']});
put('eravaciclina',[
 ['Infección por gramnegativos resistentes, en escenarios incluidos por IDSA','1 mg/kg IV cada 12 h']
],{pearls:['No elegirla para infección urinaria: exposición urinaria no adecuada.','Limitaciones en bacteriemia y actividad según especie/foco; comprobar recomendaciones específicas.']});
put('ertapenem',[
 ['Gramnegativos resistentes susceptibles, esquema intravenoso','1 g IV cada 24 h, infusión de 30 min']
],{pearls:['No ofrece cobertura fiable frente a P. aeruginosa ni Acinetobacter.','En pacientes críticos, hipoalbuminemia marcada puede alterar farmacocinética; reconsiderar selección.']});
put('fosfomicina-oral',[
 ['Cistitis no complicada por E. coli susceptible, formulación oral','3 g VO en dosis única']
],{pearls:['NO sustituye formulación IV.','Evitar en pielonefritis o infección invasiva por insuficiente exposición tisular.']});
put('fosfomicina-iv',[
 ['ITU complicada por gramnegativo resistente susceptible, formulación IV','6 g IV cada 8 h, infusión de 1 h']
],{pearls:['Formulación y dosis específicas de fosfomicina IV; no extrapolar esquema oral.','Atender a carga de sodio, electrolitos y función renal.'],monitor:['Sodio, potasio, balance de volumen y función renal.']});
put('gentamicina',[
 ['Cistitis no complicada por gramnegativo resistente susceptible','5 mg/kg IV, dosis única'],
 ['ITU complicada por gramnegativo resistente susceptible','7 mg/kg IV inicial; siguientes dosis e intervalos individualizados con farmacocinética']
],{monitor:['TDM si más de una dosis, creatinina y función auditiva/vestibular según duración.']});
put('imipenem-cilastatina',[
 ['Cistitis no complicada por gramnegativo susceptible','500 mg de imipenem IV cada 6 h, infusión de 30 min'],
 ['Otras infecciones resistentes susceptibles','500 mg imipenem IV cada 6 h en 3 h, o 1 g IV cada 8 h en 1 h (según escenario)']
],{pearls:['Imipenem se acompaña de cilastatina; las dosis expresadas corresponden al componente imipenem.','Ajustar por función renal y riesgo convulsivo.']});
put('imipenem-cilastatina-relebactam',[
 ['Gramnegativos resistentes susceptibles','1.25 g IV (imipenem 500 mg + cilastatina 500 mg + relebactam 250 mg) cada 6 h, infusión 30 min']
],{phenotypes:{KPC_E:['variable','Alternativa con AST; relebactam inhibe KPC, no MBL.'],DTR_P:['variable','Opción preferida en Pseudomonas DTR susceptible según IDSA.'],MBL_E:['no','No inhibe metalo-β-lactamasas.']},sourceKeys:['IDSA_AMR26']});
put('levofloxacino',[
 ['Gramnegativos resistentes susceptibles, esquema IDSA','750 mg IV o VO cada 24 h']
],{pearls:['Ajustar según función renal; evaluar riesgos de clase (tendón, SNC, QT y otros).']});
put('meropenem',[
 ['Cistitis no complicada por gramnegativo susceptible','1 g IV cada 8 h en 30 min'],
 ['Otras infecciones por gramnegativos resistentes susceptibles','1–2 g IV cada 8 h en infusión extendida de 3 h cuando sea factible; 2 g en escenarios seleccionados (SNC, obesidad, ECMO, depuración aumentada)']
],{pearls:['Carbapenémico útil en BLEE invasiva si sensible; no asumir actividad ante carbapenemasa.','Evitar monoterapia empírica para CRAB resistente; cefiderocol y nuevos agentes requieren susceptibilidad confirmada.'],phenotypes:{ESBL:['variable','Carbapenémico con actividad habitual frente a BLEE susceptibles.'],MBL_E:['no','La MBL hidroliza meropenem; verificar mecanismo/AST.']},sourceKeys:['IDSA_AMR26']});
put('meropenem-vaborbactam',[
 ['Infección por gramnegativo resistente susceptible','4 g IV (2 g meropenem + 2 g vaborbactam) cada 8 h, infusión 3 h']
],{pearls:['Especialmente útil frente a Enterobacterales KPC con susceptibilidad; no activo contra MBL u OXA-48-like por el inhibidor.'],phenotypes:{KPC_E:['variable','Preferido en Enterobacterales KPC susceptible.'],OXA48_E:['no','Vaborbactam no inhibe OXA-48-like.'],MBL_E:['no','Vaborbactam no inhibe MBL.']},sourceKeys:['IDSA_AMR26']});
put('minociclina',[
 ['Infecciones por gramnegativos resistentes seleccionados (IDSA)','200 mg IV o VO cada 12 h']
],{pearls:['No extrapolar resultados de minociclina a doxiciclina; PK y AST difieren.']});
put('nitrofurantoina',[
 ['Cistitis no complicada, formulación macrocristales/monohidrato','100 mg VO cada 12 h'],
 ['Cistitis no complicada, suspensión oral específica','50 mg VO cada 6 h']
],{pearls:['No usar para pielonefritis ni bacteriemia: concentraciones parenquimatosas y sistémicas insuficientes.','La elegibilidad renal depende de la formulación y del contexto; contrastar guía vigente.']});
put('plazomicina',[
 ['Cistitis no complicada por gramnegativo resistente susceptible','15 mg/kg IV en dosis única'],
 ['ITU complicada por gramnegativo resistente susceptible','15 mg/kg IV inicial; dosis sucesivas mediante farmacocinética']
],{monitor:['Creatinina, niveles séricos y toxicidad vestibulococlear cuando proceda.']});
put('sulbactam-durlobactam',[
 ['CRAB susceptible, tratamiento dirigido','2 g IV (1 g sulbactam + 1 g durlobactam) cada 6 h, en infusión de 3 h'],
 ['Depuración de creatinina ≥130 mL/min','2 g IV cada 4 h en infusión de 3 h']
],{pearls:['IDSA 2026 prioriza sulbactam/durlobactam en CRAB invasiva, combinado con un carbapenémico; no es una opción en monoterapia.','El sulbactam posee actividad antibacteriana propia frente a Acinetobacter; durlobactam evita parte de su hidrólisis.'],phenotypes:{CRAB:['variable','Tratamiento preferido de CRAB invasiva combinado con carbapenémico si el aislado es susceptible.']},sourceKeys:['IDSA_AMR26']});
put('tigeciclina',[
 ['Esquema de dosis alta para gramnegativos resistentes seleccionados, no dosis de ficha habitual','200 mg IV carga, luego 100 mg IV cada 12 h']
],{pearls:['Dosis alta de guía AMR ≠ dosis estándar de ficha técnica; no extrapolar a cualquier infección.','No preferir en infección urinaria ni en bacteriemia aislada por exposición subóptima.'],monitor:['Función hepática, tolerancia gastrointestinal, evolución de infección y riesgo clínico.']});
put('tobramicina',[
 ['Cistitis no complicada por gramnegativo resistente susceptible','5 mg/kg IV, dosis única'],
 ['ITU complicada por gramnegativo resistente susceptible','7 mg/kg IV inicial; siguientes dosis individualizadas con farmacocinética']
],{monitor:['Función renal y TDM cuando se administra más de una dosis.']});
put('tmp-smx',[
 ['Cistitis no complicada por gramnegativo susceptible (dosis componente TMP)','160 mg de trimetoprim IV/VO cada 12 h'],
 ['Infecciones resistentes distintas de cistitis en contextos IDSA (dosis componente TMP)','8–15 mg/kg/día de trimetoprim IV/VO dividido cada 8–12 h']
],{pearls:['Las dosis se expresan según el componente trimetoprim, no por el peso total de TMP-SMX.','Para S. maltophilia invasiva, valorar resistencia, toxicidad y combinaciones según IDSA 2026.'],monitor:['Creatinina, potasio, biometría hemática y tolerancia según dosis/duración.']});
put('gepotidacina',[
 ['Cistitis no complicada en mujer (ficha FDA)','1,500 mg VO cada 12 h por 5 días, después de alimentos'],
 ['Gonorrea urogenital no complicada (ficha FDA actualizada)','3,000 mg VO y una segunda dosis de 3,000 mg unas 12 h después; tomar con alimentos']
],{sourceKeys:['FDA_GEP'],indications:['Cistitis no complicada por microorganismos susceptibles y gonorrea urogenital no complicada en poblaciones incluidas en su ficha estadounidense.'],
 contraindications:['Antecedente de hipersensibilidad grave a gepotidacina.'],
 precautions:['Riesgo de prolongación del QTc, especialmente con exposición aumentada, cardiopatía o interacciones.','No extrapolar a pielonefritis, infección sistémica o gonorrea faríngea.'],
 adverse:['Diarrea, náusea y efectos gastrointestinales; evaluar QTc.'],
 interactions:['Revisar inhibidores fuertes de CYP3A4, inductores e interacciones que aumenten QTc.'],
 monitor:['Considerar ECG/QTc y factores de riesgo individuales; función renal/hepática según ficha.'],
 pearls:['Inhibe girasa y topoisomerasa IV mediante sitios de unión distintos a las fluoroquinolonas.','Aprobación estadounidense no demuestra disponibilidad ni indicación autorizada en México.']});
put('pivmecilinam',[
 ['Cistitis no complicada por gramnegativo susceptible, pauta sugerida IDSA 2026','370 mg de pivmecilinam VO cada 8 h'],
 ['Cistitis no complicada en mujeres adultas, dosis etiquetada FDA','185 mg VO cada 8 h por 3–7 días (según ficha estadounidense)']
],{sourceKeys:['FDA_PIV'],indications:['Cistitis no complicada en mujeres adultas por E. coli, P. mirabilis y S. saprophyticus susceptibles.'],
 pearls:['La dosis sugerida por IDSA 2026 difiere de la ficha FDA; no fusionar ni intercambiar estos regímenes.','Profármaco de mecillinam, activo sobre PBP2; no se usa para pielonefritis.'],
 precautions:['Verificar antecedentes de hipersensibilidad a penicilinas, formulación y contexto de pauta.']});
put('sulopenem-etzadroxilo-probenecid',[
 ['Cistitis no complicada en mujer adulta con pocas opciones orales','500 mg sulopenem etzadroxilo + 500 mg probenecid VO cada 12 h por 5 días, con alimentos']
],{sourceKeys:['FDA_SUL'],indications:['Cistitis no complicada por E. coli, K. pneumoniae o P. mirabilis susceptible cuando hay alternativas orales limitadas o inexistentes.'],
 precautions:['No indicado para tratamiento de ITU complicada ni para paso de IV a VO en infección intraabdominal complicada.','No recomendado si ClCr <15 mL/min o en hemodiálisis según ficha FDA.'],
 interactions:['Probenecid altera la eliminación renal de múltiples fármacos; revisar interacciones antes de usar.'],
 pearls:['No confundir este penémico oral con meropenem IV; el perfil de uso y evidencia son distintos.']});
put('ceftazidima-avibactam-aztreonam',[
 ['Estrategia combinada para Enterobacterales productores de MBL susceptibles, administración simultánea','Ceftazidima/avibactam 2.5 g IV cada 8 h en 3 h + aztreonam 2 g IV cada 8 h en 3 h; administrar simultáneamente, según protocolo']
],{indications:['Tratamiento dirigido de Enterobacterales productores de MBL cuando la combinación está respaldada por la sensibilidad y la disponibilidad.'],
 pearls:['Es una estrategia de dos productos, no un medicamento combinado comercial único.','IDSA 2026 considera razonable esta estrategia pero muestra ligera preferencia por aztreonam/avibactam cuando está disponible.'],
 phenotypes:{MBL_E:['variable','Estrategia IDSA para Enterobacterales con MBL confirmada y susceptibilidad.'],MBL_P:['no','No es opción rutinaria en Pseudomonas productora de MBL; ver guía específica.']},
 sourceKeys:['IDSA_AMR26']});
R.additions.push(
 {id:'gepotidacina',name:'Gepotidacina',kingdom:'bacteria',family:'Triazaacenafthilenos',subgroup:'Inhibidores de girasa/topoisomerasa nuevos',mechanism:'Inhibe DNA girasa y topoisomerasa IV mediante unión distinta a quinolonas.',context:'Cistitis no complicada; gonorrea urogenital no complicada en población autorizada por FDA.',limitations:'No usar como fármaco de amplio espectro sistémico por extrapolación.',newer:true},
 {id:'pivmecilinam',name:'Pivmecilinam',kingdom:'bacteria',family:'Penicilinas',subgroup:'Amidinopenicilinas orales',mechanism:'Profármaco de mecillinam; β-lactámico con afinidad por PBP2.',context:'Cistitis no complicada en mujeres adultas por uropatógenos susceptibles.',limitations:'No indicada para pielonefritis o sepsis.',newer:true},
 {id:'sulopenem-etzadroxilo-probenecid',name:'Sulopenem etzadroxilo / probenecid',kingdom:'bacteria',family:'Penémicos orales',subgroup:'Penémico + inhibidor de excreción renal',mechanism:'Sulopenem inhibe síntesis de pared bacteriana; probenecid modifica su eliminación renal.',context:'Cistitis no complicada con opciones orales limitadas según autorización FDA.',limitations:'No para ITU complicada ni infección sistémica.',newer:true},
 {id:'ceftazidima-avibactam-aztreonam',name:'Ceftazidima/avibactam + aztreonam',kingdom:'bacteria',family:'Estrategias combinadas',subgroup:'Enterobacterales productores de MBL',mechanism:'Aztreonam resiste hidrólisis por MBL, avibactam inhibe serina β-lactamasas que pueden hidrolizar aztreonam.',context:'Terapia combinada dirigida de Enterobacterales MBL susceptibles.',limitations:'No equiparar a aztreonam/avibactam preformulado ni extrapolar a Pseudomonas MBL.',newer:true}
);
})(window.INFEORA_PHARM_CLINICAL);