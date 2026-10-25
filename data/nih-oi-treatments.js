/* INFEORA — Infecciones oportunistas en adultos y adolescentes con VIH.
   Fuente: Panel on Guidelines for the Prevention and Treatment of Opportunistic Infections in Adults and Adolescents
   With HIV, NIH/HHS/CDC/IDSA (clinicalinfo.hiv.gov), documento del gobierno de EE. UU. de dominio público.
   Síntesis en español con la fecha de actualización de cada sección y la fuerza de la recomendación entre corchetes
   (A/B/C = fuerza; I/II/III = calidad de la evidencia), consultada el 25/10/2026.
   Misma estructura que data/who-aware-treatments.js. Contenido educativo; no sustituye la guía vigente. */
window.ATLAS25=window.ATLAS25||{};window.ATLAS25.oiTreat=window.ATLAS25.oiTreat||{};
(function(){
const T=window.ATLAS25.oiTreat;
const URL='https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-opportunistic-infections/';
const SRC=(sec,upd)=>'Guía NIH/HHS de infecciones oportunistas en VIH, sección «'+sec+'» (actualizada '+upd+'; consultada 25/10/2026)';
const D=(c,t)=>({c,t});
const E=(t,first,second,dur,nota)=>({t,first:first||[],second:second||[],dur:dur||'',nota:nota||'',extra:[]});
const G=(p,esc)=>({p,esc});

T['crypto-cns-v25']={fuente:'nih',url:URL+'cryptococcosis',pag:'',src:SRC('Cryptococcosis','29/10/2024; revisada 16/03/2026'),abx:'si',
 res:'El tratamiento de la criptococosis meníngea o diseminada tiene tres fases: inducción (2 semanas), consolidación (≥ 8 semanas) y mantenimiento (≥ 1 año). El control de la presión intracraneal con punciones lumbares repetidas mejora la supervivencia. A diferencia de otras infecciones oportunistas, el TAR se difiere 4–6 semanas.',
 pat:['Cryptococcus neoformans','Cryptococcus gattii'],
 alertas:['Hospitalizar al menos 7 días (idealmente 14) con punción lumbar en los días 7 y 14 para confirmar respuesta y esterilidad del cultivo [AII].','Medir siempre la presión de apertura; si está elevada, punciones diarias hasta normalizarla [AII]. Corticoides, acetazolamida y manitol no sirven para bajar la presión [AIII]; los corticoides no se usan de rutina salvo para el IRIS [AI].','Inicio del TAR: diferirlo 4–6 semanas tras empezar el antifúngico [AI]; reduce el riesgo de IRIS (10–30 % en criptococosis meníngea).','Ajustar la flucitosina a la función renal y, si es posible, monitorizar sus niveles.','En EE. UU. no se recomienda la profilaxis primaria sin antigenemia positiva [BII]; donde es prevalente, el cribado de antígeno criptocócico con CD4 < 100 permite el tratamiento anticipado.'],
 grupos:[
  G('Inducción (2 semanas)',[
   E('Meníngea o diseminada',[D('','Anfotericina B liposomal 3–4 mg/kg IV al día + flucitosina 25 mg/kg VO cada 6 h × 2 semanas [AII] (con monitorización diaria de electrolitos y función renal)'),D('','Contextos con recursos limitados (OMS): anfotericina B liposomal 10 mg/kg IV en dosis única el día 1 + flucitosina 25 mg/kg cada 6 h + fluconazol 1 200 mg/día × 2 semanas [AI]')],
    [D('','Complejo lipídico de anfotericina B 5 mg/kg/día + flucitosina × 2 semanas [BII]'),D('','Anfotericina B desoxicolato 1 mg/kg/día + flucitosina × 1 semana, luego fluconazol 1 200 mg/día 1 semana más [BI]'),D('','Otras estudiadas: fluconazol 1 200 mg/día + flucitosina [BII]; anfotericina + fluconazol 800–1 200 mg/día [BI–BIII]')],
    '2 semanas; si no mejora o sigue inestable, prolongar la inducción con anfotericina + flucitosina hasta cultivo de LCR negativo [BIII]','')]),
  G('Consolidación (≥ 8 semanas)',[
   E('Tras 2 semanas de inducción con paciente estable',[D('','Fluconazol 800 mg/día VO [AI]; puede bajarse a 400 mg/día cuando el LCR es estéril y ya se inició el TAR [AII]')],
    [D('','Itraconazol 200 mg cada 12 h si no hay fluconazol o no se tolera [CI]'),D('','Si el LCR sigue positivo a las 2 semanas: fluconazol 1 200 mg/día ± flucitosina 2 semanas más antes de bajar a 800 mg [BIII]')],
    'Al menos 8 semanas desde un cultivo de LCR negativo a las 2 semanas [AII]','')]),
  G('Mantenimiento (profilaxis secundaria)',[
   E('Tras la consolidación',[D('','Fluconazol 200 mg/día VO durante ≥ 1 año desde el inicio del antifúngico [AI] (400 mg si la CMI de fluconazol es ≥ 16 µg/ml [BIII])')],[D('','Itraconazol 200 mg cada 12 h [CI]')],
    'Suspender con ≥ 1 año de tratamiento, asintomático y CD4 ≥ 100 con carga viral suprimida [BII]; reiniciar si CD4 < 100 [AIII]','')]),
  G('Otras formas',[
   E('Extrapulmonar no meníngea, pulmonar difusa o antigenemia sérica alta (LFA ≥ 1:640)',[D('','Mismo tratamiento que la meningitis [BIII]; puncionar siempre el LCR')],[],'',''),
   E('Infiltrado pulmonar focal leve con antígeno sérico negativo',[D('','Fluconazol 400 mg/día [BIII]')],[],'6–12 meses según la resolución',''),
   E('Antigenemia aislada asintomática (LFA < 1:640)',[D('','Fluconazol 800–1 200 mg/día × 2 semanas, luego 400–800 mg/día × 10 semanas y 200 mg/día hasta completar 6 meses, con TAR eficaz [BIII]')],[],'6 meses','Si el riesgo es bajo y el título es < 1:80 por LFA, puede tratarse sin punción lumbar [AI].')]),
  G('Embarazo',[
   E('Primer trimestre',[D('','Anfotericina B desoxicolato 0,7–1 mg/kg/día o formulación lipídica 3–4 mg/kg/día [AIII]')],[],'',
    'Añadir flucitosina solo si el beneficio supera el riesgo, idealmente después del primer trimestre; evitar azoles en el primer trimestre salvo beneficio claro. El momento del TAR se decide con infectología y obstetricia.')])
 ]};
T['pneumocystis-v25']={fuente:'nih',url:URL+'pneumocystis',pag:'',src:SRC('Pneumocystis Pneumonia','27/05/2026'),abx:'si',
 res:'El cotrimoxazol es el tratamiento y la profilaxis de elección. La gravedad (PaO₂ y gradiente A-a) decide la vía y el uso de corticoides; el tratamiento dura 21 días y le sigue la profilaxis secundaria sin interrupción. El TAR se inicia dentro de las 2 semanas del diagnóstico.',
 pat:['Pneumocystis jirovecii'],
 alertas:['Iniciar el TAR en las 2 primeras semanas si es posible [AI].','Corticoides si PaO₂ < 70 mmHg en aire ambiente o gradiente A-a ≥ 35 mmHg [AI], idealmente en las primeras 72 h.','Determinar G6PD antes de dapsona o primaquina.','Una neumocistosis bajo profilaxis con cotrimoxazol suele responder a las dosis estándar del mismo [BIII].','Reacciones no graves al cotrimoxazol: mantenerlo si es posible o reintroducirlo con desensibilización; suspender para siempre ante Stevens-Johnson o necrólisis epidérmica tóxica [AIII].'],
 grupos:[
  G('Tratamiento (21 días)',[
   E('Moderada a grave',[D('','Cotrimoxazol IV: TMP 15–20 mg/kg/día + SMX 75–100 mg/kg/día repartidos cada 6–8 h; pasar a oral al mejorar [AI]')],
    [D('','Primaquina 30 mg base/día VO + clindamicina (IV 600 mg cada 6 h o 900 mg cada 8 h; VO 450 mg cada 6 h o 600 mg cada 8 h) [AI]'),D('','Pentamidina 4 mg/kg IV al día en ≥ 60 min (3 mg/kg si hay toxicidad) [AI]; muchos prefieren primaquina + clindamicina por ser más eficaz y menos tóxica')],
    '21 días [AII]','Prednisona (o metilprednisolona IV al 80 % de la dosis): 40 mg cada 12 h días 1–5, 40 mg/día días 6–10 y 20 mg/día días 11–21 [AI].'),
   E('Leve a moderada',[D('','Cotrimoxazol VO: TMP 15–20 mg/kg/día + SMX 75–100 mg/kg/día en 3 tomas, o 2 comprimidos forte cada 8 h [AI]')],
    [D('','Dapsona 100 mg/día + trimetoprim 15 mg/kg/día en 3 tomas [BI]'),D('','Primaquina 30 mg base/día + clindamicina VO [BI]'),D('','Atovacuona 750 mg cada 12 h con comida [BI]')],'21 días','')]),
  G('Profilaxis primaria',[
   E('CD4 < 200/mm³ [AI]',[D('','Cotrimoxazol 1 comprimido forte (800/160 mg) o 1 simple (400/80 mg) al día [AI]; protege también frente a toxoplasma y bacterias respiratorias')],
    [D('','Cotrimoxazol forte 3 veces por semana [BI]'),D('','Dapsona 50 mg/día + pirimetamina 50 mg + leucovorina 25 mg semanales, o dapsona 200 mg + pirimetamina 75 mg + leucovorina 25 mg semanales [BI]'),D('','Atovacuona 1 500 mg/día con comida [BI]'),D('','Solo si la serología de toxoplasma es negativa: dapsona 100 mg/día, pentamidina nebulizada 300 mg mensual [BI] o pentamidina IV 300 mg cada 28 días [CIII]')],
    'Suspender con CD4 ≥ 200 durante ≥ 3 meses con TAR [AI] (puede considerarse con CD4 100–200 y carga viral indetectable 3–6 meses [BII]); reiniciar si CD4 < 100 o 100–200 con viremia [AIII]','Quien recibe pirimetamina-sulfadiazina por toxoplasmosis no necesita profilaxis adicional [AII].')]),
  G('Profilaxis secundaria',[
   E('Tras un episodio de neumocistosis',[D('','Cotrimoxazol forte o simple, 1 comprimido al día [AI]')],[D('','Las mismas alternativas que en la profilaxis primaria')],
    'Mismos criterios de suspensión y reinicio que la primaria; si el episodio ocurrió con CD4 > 200 estando con TAR, mantenerla de por vida [BIII]','')]),
  G('Embarazo',[
   E('Tratamiento y profilaxis',[D('','Cotrimoxazol también en el primer trimestre: el beneficio supera el riesgo [AIII]; ácido fólico 4 mg/día en el primer trimestre y luego 0,4 mg [BIII–AIII]; ecografía morfológica a las 18–20 semanas [BIII]')],
    [D('','Pentamidina IV [BIII]; primaquina + clindamicina solo sin otras alternativas (hemólisis fetal si hay déficit de G6PD) [AIII]'),D('','En profilaxis del primer trimestre: pentamidina nebulizada o atovacuona [BII–CIII]')],'21 días (tratamiento)','')])
 ]};

T['neurotoxoplasmosis-v25']={fuente:'nih',url:URL+'toxoplasmosis',pag:'',src:SRC('Toxoplasma gondii Encephalitis','09/09/2025; revisada 23/06/2026'),abx:'si',
 res:'Pirimetamina + sulfadiazina + leucovorina, o cotrimoxazol, durante al menos 6 semanas, seguidos de mantenimiento crónico hasta la reconstitución inmune. Si no se consigue pirimetamina sin demora, usar cotrimoxazol.',
 pat:['Toxoplasma gondii (reactivación en personas seropositivas con CD4 bajos)'],
 alertas:['Profilaxis primaria en seropositivos para toxoplasma con CD4 < 100/mm³ [AII]; la pentamidina nebulizada no protege frente a toxoplasma [AI].','Corticoides (dexametasona) solo si hay efecto de masa o edema clínicamente relevante [BIII] o IRIS significativo [CIII]; retirarlos cuanto antes.','Inicio del TAR: sin datos específicos; muchos lo empiezan 2–3 semanas después del diagnóstico. El IRIS por toxoplasma es raro (≈ 5 %).','Determinar G6PD antes de usar dapsona; la atovacuona debe tomarse con comida.'],
 grupos:[
  G('Tratamiento agudo (≥ 6 semanas)',[
   E('Encefalitis por toxoplasma',[D('','Pirimetamina 200 mg una vez y luego, ≤ 60 kg: pirimetamina 50 mg/día + sulfadiazina 1 000 mg cada 6 h; > 60 kg: pirimetamina 75 mg/día + sulfadiazina 1 500 mg cada 6 h; ambos con leucovorina 10–25 mg/día (hasta 50 mg 1–2 veces al día) [AI]'),D('','O cotrimoxazol IV u oral: TMP 5 mg/kg + SMX 25 mg/kg cada 12 h [AII]')],
    [D('','Pirimetamina + leucovorina + clindamicina 600 mg IV o VO cada 6 h [AI] (alternativa preferida si no tolera sulfadiazina); añadir profilaxis de neumocistosis [AII]'),D('','Atovacuona 1 500 mg cada 12 h, sola o con pirimetamina + leucovorina o con sulfadiazina [BII]'),D('','Alergia a sulfamidas: desensibilización rápida [BI], con atovacuona 1 500 mg cada 12 h mientras tanto [CIII]')],
    'Al menos 6 semanas; más si la enfermedad clínica o radiológica es extensa o la respuesta es incompleta [BII]','')]),
  G('Mantenimiento crónico',[
   E('Tras el tratamiento agudo',[D('','Pirimetamina 25–50 mg/día + sulfadiazina 2 000–4 000 mg/día en 2–4 tomas + leucovorina 10–25 mg/día [AI]'),D('','O cotrimoxazol forte 1 comprimido cada 12 h [AII]')],
    [D('','Pirimetamina 25–50 mg + leucovorina 10–25 mg/día + clindamicina 1 800 mg/día en 3–4 tomas [BI] (más profilaxis de neumocistosis)'),D('','Atovacuona 750–1 500 mg cada 12 h, sola o con pirimetamina + leucovorina o con sulfadiazina [BII]')],
    'Suspender con tratamiento inicial completo, asintomático y CD4 > 200 durante > 6 meses con TAR [BI]; reiniciar si CD4 < 200 [AIII]','')]),
  G('Profilaxis primaria',[
   E('Toxoplasma IgG positivo y CD4 < 100/mm³',[D('','Cotrimoxazol forte 1 comprimido al día [AII] (protege también frente a neumocistosis)')],
    [D('','Cotrimoxazol forte 3 veces por semana [BII] o simple 1 al día [BIII]'),D('','Dapsona 50 mg/día + pirimetamina 50 mg + leucovorina 25 mg semanales [BI]'),D('','Atovacuona 1 500 mg/día, sola o con pirimetamina 25 mg + leucovorina 10 mg [CIII]')],
    'Suspender con CD4 > 200 durante > 3 meses y carga viral indetectable [AI]; reiniciar si CD4 < 100 o 100–200 con viremia [AIII]','En el embarazo, mismas indicaciones, fármacos y dosis.')])
 ]};

T['cmv-disease']={fuente:'nih',url:URL+'cytomegalovirus',pag:'',src:SRC('Cytomegalovirus Disease','14/07/2025; revisada 16/03/2026'),abx:'si',
 res:'La mejor prevención es el TAR que mantiene CD4 ≥ 100/mm³; no se recomienda profilaxis con valganciclovir ni vigilar la viremia. La retinitis se trata con inducción de 14–21 días y mantenimiento hasta la reconstitución inmune, con participación de oftalmología.',
 pat:['Citomegalovirus (HHV-5)'],
 alertas:['Con CD4 < 100 y sin TAR: enseñar a reconocer las miodesopsias; ante moscas volantes o pérdida de agudeza, derivación urgente a oftalmología [AIII]. Fondo de ojo basal con CD4 < 100 [CIII].','Iniciar el TAR a más tardar 1–2 semanas después del antiviral en retinitis, esofagitis o colitis [BIII]; también en 2 semanas en la enfermedad neurológica, con juicio individual [BIII].','Uveítis por reconstitución inmune: corticoides (y antiviral si hay inflamación activa al inicio) [CIII]; prednisona 1 mg/kg/día (máx. 60–80 mg) ≤ 1 mes y descenso en 2–3 meses [BIII].','No vigilar la carga viral de CMV en sangre para predecir recaídas [AII]; seguimiento oftalmológico al menos cada 3 meses tras suspender el mantenimiento [AIII].','Cidofovir: evitarlo en alérgicos a sulfamidas (reacción cruzada con probenecid) y nunca por vía intravítrea [AIII].'],
 grupos:[
  G('Retinitis',[
   E('Inducción y mantenimiento',[D('','Valganciclovir 900 mg VO cada 12 h × 14–21 días, luego 900 mg/día [AI]'),D('','O ganciclovir 5 mg/kg IV cada 12 h × 14–21 días, luego valganciclovir 900 mg/día o ganciclovir 5 mg/kg IV/día [AI]; la vía IV se prefiere si la lesión es central o la absorción es dudosa')],
    [D('','Foscarnet 60 mg/kg IV cada 8 h o 90 mg/kg cada 12 h × 14–21 días, luego 90–120 mg/kg/día [BI]'),D('','Cidofovir 5 mg/kg IV semanal × 2 semanas y luego cada 2 semanas, con 1 l de suero salino antes (y después si se tolera) y probenecid 2 g 3 h antes, 1 g 2 h y 1 g 8 h después [CI]')],
    'Inducción mínima 14–21 días según el fondo de ojo; mantenimiento ≥ 3 meses hasta lesiones inactivas y CD4 ≥ 100 durante ≥ 3 meses [AII]; reiniciar si CD4 < 100 [AIII]',
    'Lesiones con amenaza inmediata para la visión (a < 1 500 µm de la fóvea o del disco): añadir ganciclovir intravítreo 2 mg o foscarnet 2,4 mg semanales durante la inducción [BIII]. Lesiones periféricas: valganciclovir oral [AI].')]),
  G('Colitis o esofagitis',[
   E('Enfermedad digestiva',[D('','Ganciclovir 5 mg/kg IV cada 12 h [AI]; pasar a valganciclovir 900 mg cada 12 h cuando tolere y absorba la vía oral [AIII]; valganciclovir oral desde el inicio si es leve [AIII]')],
    [D('','Foscarnet (toxicidad o resistencia a ganciclovir) [BIII] o cidofovir [CI], con las mismas pautas que en la retinitis')],'21–42 días o hasta la resolución [AIII]','Sin mantenimiento rutinario salvo retinitis concomitante, recaídas o enfermedad inicial grave.')]),
  G('Neumonía',[
   E('Neumonía por CMV',[D('','Ganciclovir 5 mg/kg IV cada 12 h [BIII]')],[D('','Foscarnet 60 mg/kg cada 8 h o 90 mg/kg cada 12 h [BIII]; valganciclovir oral si no es potencialmente mortal y hay buena absorción [BIII]')],'≥ 21 días o hasta la resolución [CII]','')]),
  G('Enfermedad neurológica',[
   E('Encefalitis, ventriculitis, radiculitis',[D('','Ganciclovir 5 mg/kg IV cada 12 h + foscarnet (60 mg/kg cada 8 h o 90 mg/kg cada 12 h) [BIII]')],[],'≥ 21 días según la respuesta [AIII]','El papel del valganciclovir oral no está establecido.')])
 ]};

})();
