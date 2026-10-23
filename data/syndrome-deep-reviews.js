/* INFEORA · Revisiones ampliadas por síndrome (formato académico).
   Cada entrada se vincula por id a data/who-conditions.json y se muestra tras las seis secciones base.
   Reglas editoriales: no se incluyen dosis que no procedan de la guía citada; cada afirmación terapéutica
   remite a la referencia de la entrada; las cifras de ensayos se citan solo cuando son de publicación primaria.
   Contenido educativo: no sustituye la guía local, el antibiograma ni el juicio clínico. */
window.ATLAS25=window.ATLAS25||{};
window.ATLAS25.deepReviews={
"who-27":{
 title:"Neumonía comunitaria grave",
 reviewed:"2026-10-23",
 summary:"La gravedad se define por criterios (no por impresión): shock con vasopresores o ventilación mecánica bastan; si no, tres o más criterios menores. La terapia empírica combina un β-lactámico antineumocócico con un macrólido o fluoroquinolona respiratoria, ampliada solo si hay factores de riesgo para SARM o Pseudomonas. El tratamiento es temprano; los cultivos y antígenos orientan la desescalada.",
 criteria:{
  label:"Criterios ATS/IDSA 2019 de neumonía grave",
  major:["Shock séptico que requiere vasopresores","Insuficiencia respiratoria con ventilación mecánica"],
  minor:["Frecuencia respiratoria ≥ 30/min","PaO₂/FiO₂ ≤ 250","Infiltrados multilobares","Confusión o desorientación","Uremia (BUN ≥ 20 mg/dL)","Leucopenia (< 4 000/µL)","Trombocitopenia (< 100 000/µL)","Hipotermia (< 36 °C)","Hipotensión que requiere reanimación hídrica intensiva"],
  rule:"Se considera grave con 1 criterio mayor o ≥ 3 menores; indica manejo en UCI o unidad de cuidados intermedios."
 },
 algorithm:[
  {t:"Reconocer y clasificar",x:"Constantes, saturación, estado mental, lactato y gasometría si hay hipoxemia. Aplicar los criterios de gravedad y decidir el nivel de cuidado; el retraso en UCI empeora el pronóstico."},
  {t:"Muestras antes del antibiótico, sin retrasarlo",x:"Hemocultivos; cultivo de esputo o aspirado endotraqueal con Gram; antígeno urinario de neumococo y Legionella; PCR de influenza/SARS-CoV-2 y panel respiratorio según estación. La procalcitonina no debe decidir el inicio del antibiótico."},
  {t:"Radiografía y, si hay dudas, ecografía o TC",x:"Confirmar infiltrado, extensión multilobar, derrame (si hay derrame significativo, puncionar y valorar pH/Gram/cultivo) y cavitación."},
  {t:"Tratamiento empírico inmediato",x:"Iniciar en la primera hora tras el reconocimiento de gravedad. Elegir el esquema según factores de riesgo (tabla siguiente)."},
  {t:"Reevaluar a las 48–72 h",x:"Con cultivos y antígenos: desescalar, suspender cobertura SARM/Pseudomonas si no se aislaron, o buscar causa de falta de respuesta."},
  {t:"Definir estabilidad clínica y duración",x:"Estabilidad: temperatura ≤ 37,8 °C, FC ≤ 100, FR ≤ 24, PAS ≥ 90 mmHg, SatO₂ ≥ 90 % en aire ambiente, ingesta oral y estado mental basal. La duración mínima es 5 días y debe alcanzarse la estabilidad antes de suspender."}
 ],
 decisions:[
  {c:"Sin factores de riesgo para SARM ni Pseudomonas",p:"β-lactámico (ampicilina-sulbactam, cefotaxima, ceftriaxona o ceftarolina) + macrólido; alternativa: β-lactámico + fluoroquinolona respiratoria.",n:"Recomendación fuerte de la guía ATS/IDSA 2019. El macrólido aporta cobertura de Legionella y Mycoplasma y efecto inmunomodulador."},
  {c:"Aislamiento previo de SARM en vías respiratorias, o ingreso reciente con antibiótico IV y factores de riesgo locales",p:"Añadir vancomicina o linezolid y enviar cultivo/PCR nasal de SARM para desescalar.",n:"La PCR nasal de SARM tiene alto valor predictivo negativo en neumonía; un resultado negativo apoya suspender la cobertura."},
  {c:"Aislamiento previo de Pseudomonas aeruginosa, o riesgo local validado",p:"β-lactámico antipseudomónico (piperacilina-tazobactam, cefepima, ceftazidima, meropenem, imipenem o aztreonam) combinado con macrólido o fluoroquinolona con actividad antipseudomónica según el caso.",n:"Seleccionar según el antibiograma previo del paciente y la epidemiología del centro."},
  {c:"Alergia grave a β-lactámicos",p:"Individualizar con alergología/farmacia: opciones con aztreonam más fluoroquinolona respiratoria, según gravedad y riesgos.",n:"Verificar la historia alérgica; muchas etiquetas de alergia a penicilina no son reales."},
  {c:"Sospecha de influenza concomitante o postinfluenza",p:"Tratamiento antiviral específico precoz además del esquema antibacteriano; cubrir S. aureus (incluido SARM) si hay neumonía necrotizante.",n:"La coinfección bacteriana por S. pneumoniae, S. aureus y S. pyogenes es la causa de muerte frecuente en influenza grave."}
 ],
 steroid:{
  title:"Corticosteroides",
  x:"La guía ATS/IDSA 2019 no recomendaba su uso sistemático. Desde entonces, el ensayo CAPE COD (hidrocortisona en neumonía grave en UCI) mostró menor mortalidad a 28 días y las recomendaciones posteriores favorecen su uso en neumonía grave con insuficiencia respiratoria. Excluir influenza grave y otras indicaciones sin beneficio claro y verificar la versión vigente de la guía antes de aplicarlo."
 },
 complications:[
  {n:"Insuficiencia respiratoria y SDRA",x:"Oxigenoterapia de alto flujo o ventilación no invasiva con vigilancia estrecha; ventilación protectora si SDRA."},
  {n:"Derrame paraneumónico y empiema",x:"Toracocentesis ante derrame significativo; pH < 7,2, Gram/cultivo positivo o pus indican drenaje."},
  {n:"Neumonía necrotizante y absceso pulmonar",x:"Sospechar S. aureus productor de leucocidina de Panton-Valentine, anaerobios y Klebsiella; imagen con cavitación."},
  {n:"Shock séptico y falla multiorgánica",x:"Aplicar el paquete de sepsis y control del foco; valorar insuficiencia suprarrenal relativa."},
  {n:"Complicaciones cardiovasculares",x:"Arritmias, infarto de miocardio e insuficiencia cardiaca durante y tras la neumonía, con riesgo elevado semanas después."}
 ],
 failure:"Falta de respuesta a las 72 h: confirmar adherencia y absorción; buscar empiema o absceso (ecografía/TC); considerar patógenos no cubiertos (Legionella, SARM, Pseudomonas, hongos, micobacterias, virus); revaluar etiologías no infecciosas (embolia pulmonar, insuficiencia cardiaca, vasculitis, neumonía organizada, neoplasia) y factores del huésped.",
 followup:[
  "Documentar estabilidad clínica antes del alta y del paso a vía oral.",
  "No se recomienda radiografía de control rutinaria si los síntomas se resuelven; considerarla a las 6–8 semanas en mayores de 50 años, fumadores o sospecha de neoplasia subyacente.",
  "Vacunación antineumocócica y antigripal; cesación tabáquica; revisar aspiración y estado dental cuando aplique.",
  "Dar signos de alarma y valorar rehabilitación en pacientes con ingreso prolongado."
 ],
 pitfalls:[
  "Retrasar el antibiótico a la espera de la prueba de imagen o del cultivo.",
  "Cubrir SARM y Pseudomonas por rutina, sin factores de riesgo ni cultivo que lo respalde.",
  "Usar la procalcitonina como criterio único para iniciar o negar tratamiento.",
  "Olvidar el macrólido o la cobertura de Legionella en neumonía grave.",
  "No investigar derrame pleural o insuficiencia cardiaca cuando la evolución no mejora."
 ],
 references:[
  {t:"Metlay JP et al. Diagnosis and Treatment of Adults with Community-acquired Pneumonia. ATS/IDSA guideline. Am J Respir Crit Care Med 2019;200:e45–e67",u:"https://doi.org/10.1164/rccm.201908-1581ST"},
  {t:"Dequin PF et al. Hydrocortisone in Severe Community-Acquired Pneumonia (CAPE COD). N Engl J Med 2023;388:1931–1941",u:"https://doi.org/10.1056/NEJMoa2215145"},
  {t:"Martin-Loeches I et al. ERS/ESICM/ESCMID/ALAT guidelines for severe community-acquired pneumonia. Intensive Care Med 2023;49:615–632",u:"https://doi.org/10.1007/s00134-023-07033-8"}
 ]
},
"who-24":{
 title:"Sepsis y choque séptico del adulto",
 reviewed:"2026-10-23",
 summary:"Sepsis es una disfunción orgánica potencialmente mortal causada por una respuesta desregulada a la infección. La prioridad es reconocer rápido, obtener hemocultivos, administrar antimicrobianos eficaces sin demora, reanimar con criterio dinámico y controlar el foco. La desescalada y la duración se deciden con cultivos, evolución y foco.",
 criteria:{
  label:"Definiciones Sepsis-3 (2016)",
  major:["Sepsis: sospecha de infección con aumento agudo de SOFA ≥ 2 puntos","Choque séptico: necesidad de vasopresores para mantener PAM ≥ 65 mmHg y lactato > 2 mmol/L tras reanimación hídrica adecuada"],
  minor:["qSOFA (FR ≥ 22/min, alteración del estado mental, PAS ≤ 100 mmHg) es una herramienta de alerta, no un criterio diagnóstico","La Surviving Sepsis Campaign 2021 desaconseja usar qSOFA como único instrumento de cribado frente a SIRS, NEWS o MEWS"],
  rule:"Un lactato elevado, hipotensión, oliguria, alteración mental, hipoxemia o ictericia en un paciente con posible infección obligan a actuar como sepsis hasta demostrar lo contrario."
 },
 algorithm:[
  {t:"Reconocer y alertar",x:"Cribado en urgencias y hospitalización con escala validada local; medir lactato, creatinina, bilirrubina, plaquetas, gasometría."},
  {t:"Hemocultivos y focos antes del antibiótico",x:"Al menos dos pares de hemocultivos si no retrasa el antibiótico de forma sustancial; cultivos del foco sospechado (orina, esputo, herida, líquido estéril)."},
  {t:"Antimicrobianos precoces",x:"En probable choque séptico o alta probabilidad de sepsis, administrar de inmediato, idealmente en la primera hora. Si la sepsis es posible sin shock, evaluar rápidamente y administrar en menos de 3 h si la sospecha persiste."},
  {t:"Reanimación hídrica y hemodinámica",x:"Cristaloides balanceados como primera opción; al menos 30 mL/kg en las primeras 3 h en hipoperfusión o choque (sugerencia débil). Guiar el volumen con variables dinámicas, tiempo de llenado capilar y lactato."},
  {t:"Vasopresores",x:"Noradrenalina de primera línea con objetivo de PAM 65 mmHg; añadir vasopresina si la dosis de noradrenalina sigue elevada; valorar acceso central y monitorización arterial."},
  {t:"Control del foco",x:"Identificar y controlar el foco lo antes posible desde el punto de vista médico y logístico (drenaje, desbridamiento, retirada de dispositivo, desobstrucción)."},
  {t:"Reevaluar y desescalar",x:"Revisar el esquema cada día con cultivos, evolución y farmacocinética; usar procalcitonina junto con la clínica para ayudar a suspender; evitar duración innecesaria."}
 ],
 decisions:[
  {c:"Riesgo alto de SARM",p:"Añadir cobertura anti-SARM al esquema empírico.",n:"Basarse en colonización previa, infección previa, dispositivos o epidemiología local."},
  {c:"Riesgo alto de bacilos gramnegativos multirresistentes",p:"Valorar dos agentes con actividad frente a gramnegativos mientras se espera el antibiograma.",n:"La SSC 2021 lo sugiere en pacientes de alto riesgo; desescalar a monoterapia en cuanto haya sensibilidad."},
  {c:"Foco urinario, abdominal, pulmonar o cutáneo",p:"Elegir la cobertura según el foco y los patógenos probables, la gravedad y el antibiograma local.",n:"Ver las fichas de síndromes específicos para la selección por foco."},
  {c:"Requerimiento de vasopresor persistente",p:"Hidrocortisona intravenosa como adyuvante cuando la noradrenalina permanece en dosis alta durante horas.",n:"La SSC 2021 sugiere hidrocortisona en el choque séptico con necesidad continua de vasopresor."},
  {c:"Antimicrobianos β-lactámicos",p:"Tras la primera dosis, valorar infusión prolongada para optimizar el tiempo sobre la CIM.",n:"Optimizar dosis según función renal, peso y disfunción orgánica; consultar farmacia clínica."}
 ],
 steroid:{
  title:"Fluidoterapia y vasoactivos: puntos críticos",
  x:"Los cristaloides balanceados son preferibles a la solución salina en la mayoría de los casos. El volumen fijo es una guía inicial, no una meta: reevaluar continuamente para evitar sobrecarga hídrica. Iniciar vasopresor sin esperar a completar el volumen si la hipotensión es profunda."
 },
 complications:[
  {n:"Lesión renal aguda",x:"Evitar nefrotóxicos innecesarios; ajustar dosis; terapia de reemplazo renal por indicaciones clásicas."},
  {n:"SDRA y falla respiratoria",x:"Ventilación protectora y estrategia conservadora de líquidos tras estabilizar."},
  {n:"Coagulopatía y CID",x:"Monitorizar plaquetas, fibrinógeno y TP; transfundir según sangrado o procedimiento."},
  {n:"Disfunción miocárdica",x:"Considerar inotrópicos y ecocardiografía si persiste hipoperfusión con presión adecuada."},
  {n:"Síndrome postsepsis",x:"Debilidad adquirida, deterioro cognitivo, readmisión e infección recurrente; planificar seguimiento."}
 ],
 failure:"Sin mejoría o empeoramiento: replantear el foco no controlado (colección, dispositivo, necrosis), cobertura antimicrobiana inadecuada o resistencia, infección fúngica o viral, causas de shock no infecciosas o mixtas (cardiogénico, hipovolémico, hemorrágico, anafiláctico, insuficiencia suprarrenal, tromboembolia pulmonar, pancreatitis) y toxicidad farmacológica.",
 followup:[
  "Reevaluar diariamente indicación, espectro, dosis y duración; documentar la fecha de suspensión.",
  "Controlar lactato, creatinina y función hepática hasta normalización.",
  "Alta con plan de seguimiento: función física y cognitiva, revisión de medicación y vacunación.",
  "Aplicar medidas de prevención de infecciones asociadas a la atención sanitaria."
 ],
 pitfalls:[
  "Esperar los cultivos o la imagen para administrar el antibiótico en choque séptico.",
  "Basar el diagnóstico solo en qSOFA o SIRS.",
  "Continuar un esquema de amplio espectro tras tener el antibiograma.",
  "Infundir volumen de forma fija sin evaluar respuesta ni signos de sobrecarga.",
  "Perder el foco quirúrgico o dispositivo que requiere drenaje o retirada."
 ],
 references:[
  {t:"Evans L et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021. Crit Care Med 2021;49:e1063–e1143",u:"https://doi.org/10.1097/CCM.0000000000005337"},
  {t:"Singer M et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA 2016;315:801–810",u:"https://doi.org/10.1001/jama.2016.0287"}
 ]
},
"who-26":{
 title:"Meningitis bacteriana",
 reviewed:"2026-10-23",
 summary:"Es una urgencia neurológica: dexametasona y antibiótico empírico no deben esperar a la imagen ni a la punción lumbar. La tríada clásica completa aparece en una minoría de pacientes, por lo que cualquier combinación de fiebre, cefalea, rigidez de nuca o alteración mental obliga a investigar. El esquema se ajusta por edad y riesgo, y la duración depende del patógeno.",
 criteria:{
  label:"Cuándo hacer TC antes de la punción lumbar (IDSA 2004)",
  major:["Inmunodepresión","Antecedente de enfermedad del SNC (masa, accidente cerebrovascular, foco focal)","Convulsión reciente (en la semana previa)"],
  minor:["Papiledema","Alteración del nivel de conciencia","Déficit neurológico focal"],
  rule:"Si hay alguno de estos hallazgos, obtener hemocultivos, iniciar dexametasona y antibiótico, hacer la TC y después la punción lumbar. Si no hay, puncionar sin demora."
 },
 algorithm:[
  {t:"Sospechar",x:"Fiebre, cefalea, rigidez de nuca y alteración mental: la tríada completa está presente en menos de la mitad; casi todos los casos tienen al menos dos de los cuatro. Petequias o púrpura orientan a meningococo."},
  {t:"Hemocultivos y estabilización",x:"Dos hemocultivos, glucemia, lactato, hemograma y coagulación; tratar como sepsis si hay inestabilidad hemodinámica."},
  {t:"Dexametasona y antibiótico sin retraso",x:"Primera dosis de dexametasona antes o junto con el antibiótico. Si se retrasa la punción por imagen, tratar primero."},
  {t:"Punción lumbar",x:"Medir presión de apertura; recuento celular, proteínas, glucosa con glucemia pareada, Gram y cultivo; PCR multiplex como complemento (tiene falsos negativos y positivos, por lo que no sustituye al cultivo)."},
  {t:"Interpretar el LCR",x:"Patrón bacteriano típico: pleocitosis neutrofílica, proteínas elevadas, glucosa baja con cociente LCR/suero reducido y presión de apertura elevada. El tratamiento previo con antibiótico reduce el rendimiento del Gram y del cultivo."},
  {t:"Ajustar a patógeno y sensibilidad",x:"Desescalar según Gram, cultivo, PCR y CIM; suspender la dexametasona si no es neumococo o no hay confirmación compatible."}
 ],
 decisions:[
  {c:"Adulto de 18 a 50 años, comunitario",p:"Vancomicina + cefalosporina de tercera generación (ceftriaxona o cefotaxima).",n:"Cobertura de S. pneumoniae resistente a penicilina y cefalosporina y de N. meningitidis."},
  {c:"Mayor de 50 años, alcoholismo o inmunodepresión celular",p:"Añadir ampicilina para Listeria monocytogenes al esquema anterior.",n:"Las cefalosporinas no cubren Listeria."},
  {c:"Posneurocirugía, trauma craneal con fístula o derivación",p:"Vancomicina + cefepima, ceftazidima o meropenem, según riesgo de Pseudomonas y gramnegativos nosocomiales.",n:"Considerar retirada o revisión del dispositivo."},
  {c:"Sospecha adicional de encefalitis herpética",p:"Añadir aciclovir hasta descartar con PCR de VHS en LCR.",n:"Encefalopatía, convulsiones o signos focales."},
  {c:"Duración según patógeno confirmado",p:"N. meningitidis y H. influenzae: 7 días; S. pneumoniae: 10–14 días; estreptococo del grupo B: 14–21 días; Listeria: 21 días o más; bacilos gramnegativos aeróbicos: 21 días.",n:"Valores de la guía IDSA 2004; individualizar según evolución y complicaciones."}
 ],
 steroid:{
  title:"Dexametasona adyuvante",
  x:"El ensayo de de Gans y van de Beek mostró menos desenlaces desfavorables y menos mortalidad en adultos, con el mayor beneficio en meningitis neumocócica. Debe administrarse antes o con la primera dosis de antibiótico y mantenerse entre 2 y 4 días si se confirma neumococo; suspender si se identifica otro patógeno. Su beneficio no está demostrado en países de bajos recursos ni en meningitis con inmunodepresión grave por VIH."
 },
 complications:[
  {n:"Hipoacusia neurosensorial",x:"Más frecuente en neumococo; audiometría precoz."},
  {n:"Edema cerebral, hipertensión intracraneal y herniación",x:"Cabecera elevada, evitar hipotonía, manejo de HTIC en UCI."},
  {n:"Convulsiones y estado epiléptico",x:"Tratar y buscar la causa (hidrocefalia, infarto, vasculitis, trombosis venosa)."},
  {n:"Hidrocefalia",x:"Imagen ante empeoramiento neurológico; derivación según neurocirugía."},
  {n:"Infarto y trombosis de senos venosos",x:"Imagen vascular cuando hay déficit focal o cefalea progresiva."},
  {n:"Meningococemia y CID (síndrome de Waterhouse–Friderichsen)",x:"Choque, púrpura fulminante; tratamiento como sepsis grave con aislamiento."},
  {n:"SIADH y trastornos electrolíticos",x:"Monitorizar sodio y balance hídrico."},
  {n:"Secuelas cognitivas y déficit focal",x:"Rehabilitación y evaluación neuropsicológica."}
 ],
 failure:"Falta de respuesta a las 48 h: repetir imagen (hidrocefalia, absceso, empiema subdural, trombosis), considerar repetir la punción lumbar en neumococo resistente tratado con vancomicina y dexametasona, confirmar cobertura de Listeria, revisar foco parameníngeo (otitis, sinusitis, endocarditis) y plantear etiologías alternativas (tuberculosis, criptococosis, virales, autoinmunes, neoplásicas).",
 followup:[
  "Declaración obligatoria y aislamiento de gotas durante las primeras 24 h de tratamiento eficaz si hay sospecha o confirmación de meningococo.",
  "Quimioprofilaxis de contactos cercanos de meningococo (rifampicina, ciprofloxacino o ceftriaxona según la pauta local).",
  "Audiometría al alta o durante el ingreso en todos los pacientes, sobre todo en neumococo.",
  "Vacunación (neumococo, meningococo, Hib) y estudio de inmunodeficiencia o fístula de LCR si hay recurrencia."
 ],
 pitfalls:[
  "Retrasar el antibiótico por esperar la TC o la punción lumbar.",
  "Omitir ampicilina en mayores de 50 años o inmunodeprimidos.",
  "No administrar la dexametasona antes de la primera dosis de antibiótico.",
  "Descartar el diagnóstico por la ausencia de rigidez de nuca o de fiebre en ancianos.",
  "Interpretar una PCR multiplex negativa como exclusión definitiva."
 ],
 references:[
  {t:"Tunkel AR et al. Practice Guidelines for the Management of Bacterial Meningitis. IDSA. Clin Infect Dis 2004;39:1267–1284",u:"https://doi.org/10.1086/425368"},
  {t:"van de Beek D et al. ESCMID guideline: diagnosis and treatment of acute bacterial meningitis. Clin Microbiol Infect 2016;22(Suppl 3):S37–S62",u:"https://doi.org/10.1016/j.cmi.2016.01.007"},
  {t:"de Gans J, van de Beek D. Dexamethasone in adults with bacterial meningitis. N Engl J Med 2002;347:1549–1556",u:"https://doi.org/10.1056/NEJMoa021334"}
 ]
},
"who-34":{
 title:"Pielonefritis / ITU alta",
 reviewed:"2026-10-23",
 summary:"Infección parenquimatosa renal con fiebre, dolor lumbar y síntomas urinarios o sistémicos. Se obtiene urocultivo siempre antes del antibiótico; la elección depende de gravedad, resistencia local y vía oral posible. Si no hay mejoría a las 48–72 h, o hay sepsis, obstrucción, diabetes o inmunodepresión, se busca complicación con imagen.",
 criteria:{
  label:"Cuándo sospechar ITU complicada o necesidad de imagen",
  major:["Sepsis o inestabilidad hemodinámica","Sospecha de obstrucción o litiasis (dolor cólico, hematuria, anuria)","Falta de respuesta clínica a las 48–72 h de tratamiento adecuado"],
  minor:["Diabetes, inmunodepresión o trasplante renal","Instrumentación o anomalía urológica previa, sonda o derivación","Embarazo","Varón (considerar prostatitis)","Aislamiento previo de microorganismo multirresistente"],
  rule:"Con cualquier criterio principal: hemocultivos, valoración de gravedad, ecografía o TC y consulta urológica urgente si hay obstrucción infectada, que exige drenaje además del antibiótico."
 },
 algorithm:[
  {t:"Confirmar el síndrome",x:"Fiebre, dolor en flanco o puñopercusión positiva, con o sin disuria; sedimento con piuria. Descartar apendicitis, diverticulitis, enfermedad pélvica inflamatoria, litiasis y neumonía basal."},
  {t:"Urocultivo y, si ingresa, hemocultivos",x:"El urocultivo previo al antibiótico es obligado para ajustar el tratamiento; los hemocultivos se piden en pacientes hospitalizados o con sepsis."},
  {t:"Estratificar gravedad y vía",x:"Tratamiento ambulatorio oral si es estable, tolera la vía oral y hay seguimiento. Ingreso si hay sepsis, vómitos, embarazo, dolor intenso, sospecha de obstrucción o imposibilidad de seguimiento."},
  {t:"Iniciar antibiótico empírico según resistencia local",x:"Ver la tabla de decisiones. En ambulatorio sin certeza de sensibilidad se puede dar una dosis inicial parenteral de acción prolongada."},
  {t:"Imagen selectiva",x:"Ecografía o TC en falta de respuesta, sepsis, litiasis conocida, diabetes mal controlada, trasplante o sospecha de absceso o gas."},
  {t:"Ajustar con el antibiograma y fijar duración",x:"Pasar a vía oral cuando haya mejoría y sensibilidad; la duración depende del antibiótico y de la respuesta (ver tabla)."}
 ],
 decisions:[
  {c:"Mujer ambulatoria con resistencia local a fluoroquinolonas baja",p:"Fluoroquinolona oral durante 5–7 días.",n:"IDSA/ESCMID 2010. Mantener solo si la resistencia local es baja; considerar riesgos de eventos adversos de las quinolonas."},
  {c:"Ambulatorio, aislado sensible a TMP-SMX",p:"Trimetoprima-sulfametoxazol oral durante 14 días.",n:"Si la sensibilidad es desconocida, dar antes una dosis parenteral de ceftriaxona o un aminoglucósido."},
  {c:"β-lactámico oral como alternativa",p:"Menos eficaz que fluoroquinolonas o TMP-SMX; tratar 10–14 días con dosis inicial parenteral.",n:"Reservar para cuando las demás opciones no son posibles."},
  {c:"Hospitalizado",p:"Terapia intravenosa: fluoroquinolona, aminoglucósido con o sin ampicilina, cefalosporina o penicilina de espectro extendido con o sin aminoglucósido, o carbapenémico según riesgo.",n:"Carbapenémico si colonización o riesgo de enterobacterias productoras de BLEE. Seguir la guía IDSA de ITU complicada y el antibiograma local."},
  {c:"Evolución rápida y sensibilidad conocida",p:"Una duración total de 7 días puede bastar con buena respuesta, también en bacteriemia por gramnegativos con control del foco.",n:"Ensayos de Sandberg 2012 (ciprofloxacino 7 frente a 14 días) y Yahav 2019 (7 frente a 14 días en bacteriemia por gramnegativos)."},
  {c:"Embarazo",p:"Ingreso y β-lactámico parenteral; evitar quinolonas y ajustar según urocultivo.",n:"Seguimiento con urocultivos tras el tratamiento."}
 ],
 steroid:{
  title:"Bacteriuria asintomática y varones",
  x:"No se debe tratar la bacteriuria asintomática salvo embarazo y antes de procedimientos urológicos con trauma de mucosa (IDSA 2019). En varones con fiebre, considerar prostatitis aguda y tratar con antibiótico de buena penetración prostática y una duración mayor que en mujeres."
 },
 complications:[
  {n:"Sepsis urinaria y bacteriemia",x:"Aplicar el manejo de sepsis y controlar el foco urinario."},
  {n:"Obstrucción infectada (pionefrosis)",x:"Urgencia urológica: descompresión con nefrostomía o catéter doble J."},
  {n:"Pielonefritis enfisematosa",x:"Gas en parénquima, sobre todo en diabéticos; TC, antibiótico y valorar nefrectomía o drenaje."},
  {n:"Absceso renal o perinéfrico",x:"Sospechar si persiste la fiebre tras 72 h; drenaje percutáneo según tamaño."},
  {n:"Necrosis papilar y daño renal crónico",x:"Más frecuente con diabetes, obstrucción o AINE; vigilar la creatinina."}
 ],
 failure:"Sin mejoría a las 48–72 h: confirmar cobertura con el antibiograma, buscar obstrucción, absceso, litiasis o cuerpo extraño con imagen, valorar resistencia (BLEE, carbapenemasas), cambiar o retirar sonda y plantear diagnósticos alternativos (prostatitis, apendicitis, enfermedad pélvica inflamatoria, causas no infecciosas).",
 followup:[
  "No se requiere urocultivo de control rutinario en mujeres asintomáticas no embarazadas; sí en embarazo.",
  "Estudiar anomalías urológicas tras episodios recurrentes, en varones o con mala respuesta.",
  "Medidas preventivas en recurrencias según el cuadro clínico y la guía local.",
  "Ajustar dosis a la función renal y revisar fármacos nefrotóxicos."
 ],
 pitfalls:[
  "Tratar con una quinolona sin conocer la resistencia local ni haber tomado urocultivo.",
  "Tratar la bacteriuria asintomática o el cultivo de sonda sin síntomas.",
  "Omitir la imagen en un paciente séptico o con litiasis conocida.",
  "Retirar el drenaje urológico demasiado pronto o no drenar una obstrucción infectada.",
  "Dar un β-lactámico oral durante pocos días como en una cistitis."
 ],
 references:[
  {t:"Gupta K et al. IDSA/ESCMID guideline for acute uncomplicated cystitis and pyelonephritis in women. Clin Infect Dis 2011;52:e103–e120",u:"https://doi.org/10.1093/cid/ciq257"},
  {t:"Sandberg T et al. Ciprofloxacin for 7 days versus 14 days in women with acute pyelonephritis. Lancet 2012;380:484–490",u:"https://doi.org/10.1016/S0140-6736(12)60608-4"},
  {t:"Yahav D et al. Seven versus 14 days of antibiotic therapy for uncomplicated gram-negative bacteremia. Clin Infect Dis 2019;69:1091–1098",u:"https://doi.org/10.1093/cid/ciy1054"},
  {t:"Nicolle LE et al. IDSA guideline on asymptomatic bacteriuria. Clin Infect Dis 2019;68:e83–e110",u:"https://doi.org/10.1093/cid/ciy1121"},
  {t:"IDSA. Complicated urinary tract infections guideline (versión vigente)",u:"https://www.idsociety.org/practice-guideline/complicated-urinary-tract-infections/"}
 ]
},
"who-39":{
 title:"Neutropenia febril",
 reviewed:"2026-10-23",
 summary:"Urgencia oncohematológica: el antibiótico antipseudomónico intravenoso se administra lo antes posible, sin esperar cultivos, tras una exploración dirigida. El riesgo (MASCC, duración y profundidad de la neutropenia, comorbilidad) define ingreso o manejo ambulatorio. La fiebre persistente obliga a buscar infección fúngica e infección focal.",
 criteria:{
  label:"Definiciones y estratificación de riesgo (IDSA)",
  major:["Fiebre: una temperatura oral ≥ 38,3 °C o ≥ 38,0 °C mantenida durante 1 h","Neutropenia: neutrófilos < 500/µL o previstos < 500/µL en 48 h; profunda si < 100/µL"],
  minor:["Alto riesgo: neutropenia esperada > 7 días, comorbilidad significativa, insuficiencia hepática o renal, inestabilidad, MASCC < 21","Bajo riesgo: neutropenia esperada ≤ 7 días, sin comorbilidades relevantes, MASCC ≥ 21","El índice CISNE es una alternativa validada en tumores sólidos estables"],
  rule:"La fiebre en neutropenia se trata como infección grave hasta demostrar lo contrario: los signos inflamatorios pueden estar atenuados, y los corticosteroides pueden enmascarar la fiebre."
 },
 algorithm:[
  {t:"Reconocer y valorar la estabilidad",x:"Constantes, estado mental y lactato. Si hay sepsis o shock, seguir el manejo de sepsis con antibiótico inmediato."},
  {t:"Exploración dirigida",x:"Piel, mucosas, periné (inspección, sin tacto rectal), catéteres, senos paranasales, pulmón y abdomen. Los hallazgos son escasos en neutropenia profunda."},
  {t:"Cultivos sin retrasar el tratamiento",x:"Al menos dos hemocultivos (uno por cada luz de catéter y otro periférico), urocultivo, cultivos de focos y radiografía de tórax si hay síntomas respiratorios."},
  {t:"Antibiótico empírico lo antes posible",x:"Habitualmente en la primera hora del triaje: monoterapia con β-lactámico antipseudomónico (ver tabla)."},
  {t:"Estratificar y decidir el lugar",x:"Alto riesgo: ingreso y tratamiento intravenoso. Bajo riesgo seleccionado: manejo oral u hospital de día con evaluación estrecha."},
  {t:"Revaluar a las 48–72 h y a los 4–7 días",x:"Ajustar con cultivos; si persiste la fiebre a los 4–7 días con espectro amplio, buscar infección fúngica."}
 ],
 decisions:[
  {c:"Alto riesgo, sin complicaciones",p:"Monoterapia IV con cefepima, piperacilina-tazobactam o carbapenémico (meropenem o imipenem).",n:"IDSA 2010. Elegir según resistencia local, alergias y colonización previa."},
  {c:"Inestabilidad hemodinámica, neumonía, infección de catéter o piel y partes blandas",p:"Añadir vancomicina u otro anti-SARM; valorar ampliar cobertura gramnegativa con aminoglucósido o fluoroquinolona.",n:"No añadir vancomicina de rutina; retirarla a las 48–72 h si no hay Gram positivo resistente."},
  {c:"Colonización o riesgo de BLEE o carbapenemasa",p:"Cobertura adaptada (carbapenémico u opciones activas según el aislado previo).",n:"Basarse en la microbiología previa y la epidemiología del centro."},
  {c:"Bajo riesgo, estable, con tolerancia oral y seguimiento",p:"Ciprofloxacino más amoxicilina-clavulanato por vía oral tras observación inicial.",n:"Recomendación ASCO/IDSA 2018; excluir pacientes con quinolona profiláctica o intolerancia oral."},
  {c:"Fiebre persistente a 4–7 días con neutropenia prevista > 7 días",p:"Estrategia antifúngica empírica (equinocandina o anfotericina liposomal) o dirigida por TC torácica y galactomanano o β-D-glucano.",n:"Elegir según profilaxis previa y riesgo de mohos; la TC de tórax es clave."},
  {c:"Duración",p:"Con foco documentado: según el foco. Sin foco: hasta recuperación de neutrófilos (≥ 500/µL y ascenso) y ausencia de fiebre, o suspensión precoz tras 72 h de tratamiento y 48 h afebril según ECIL-4 en pacientes seleccionados.",n:"Individualizar con el hematólogo; no es una regla para todos los pacientes."}
 ],
 steroid:{
  title:"Factores de crecimiento y puntos prácticos",
  x:"Los factores estimulantes de colonias no se usan de rutina una vez establecida la neutropenia febril; se valoran en alto riesgo de complicaciones. No realizar tacto rectal ni usar supositorios. Evitar el cambio de antibiótico solo por fiebre persistente en las primeras 72 h si el paciente está estable."
 },
 complications:[
  {n:"Bacteriemia y sepsis por gramnegativos o estreptococos viridans",x:"Reanimación y control del foco; vigilancia en UCI si hay shock."},
  {n:"Infecciones relacionadas con catéter",x:"Cultivos pareados; retirar en Staphylococcus aureus, Pseudomonas, micobacterias, hongos o infección del túnel."},
  {n:"Enterocolitis neutropénica (tiflitis)",x:"Dolor en fosa ilíaca derecha, diarrea y fiebre; TC; cobertura anaerobia; cirugía si perforación."},
  {n:"Infecciones fúngicas invasivas",x:"Aspergilosis pulmonar, candidemia y mucormicosis; ver fichas específicas."},
  {n:"Mucositis y puerta de entrada oral o perianal",x:"Control del dolor, cuidado bucal y cobertura anaerobia si hay absceso perianal."}
 ],
 failure:"Persistencia de la fiebre: reexaminar piel, catéter, periné y senos; repetir hemocultivos; TC de tórax, senos y abdomen; marcadores fúngicos; considerar virus (herpes, CMV, respiratorios), reacciones a fármacos, enfermedad tromboembólica, fiebre tumoral y colecciones no drenadas.",
 followup:[
  "Reevaluar a diario fiebre, neutrófilos, función renal y hepática, y niveles de fármacos si aplica.",
  "Documentar el microorganismo y la sensibilidad; desescalar con el antibiograma.",
  "Continuar profilaxis y apoyo hematológico según el protocolo del servicio.",
  "En manejo ambulatorio, contacto telefónico o presencial en 24 h y regreso inmediato ante empeoramiento."
 ],
 pitfalls:[
  "Esperar los neutrófilos o los cultivos para empezar el antibiótico.",
  "Usar tratamiento oral en un paciente de alto riesgo o inestable.",
  "Añadir vancomicina de rutina o mantenerla sin indicación.",
  "Olvidar la TC de tórax cuando la fiebre persiste.",
  "Suspender el antibiótico únicamente por el descenso de la fiebre en neutropenia profunda."
 ],
 references:[
  {t:"Freifeld AG et al. Clinical practice guideline for the use of antimicrobial agents in neutropenic patients with cancer. IDSA. Clin Infect Dis 2011;52:e56–e93",u:"https://doi.org/10.1093/cid/cir073"},
  {t:"Taplitz RA et al. Outpatient management of fever and neutropenia in adults treated for malignancy: ASCO/IDSA guideline update. J Clin Oncol 2018;36:1443–1453",u:"https://doi.org/10.1200/JCO.2017.77.6211"},
  {t:"Klastersky J et al. The MASCC risk-index score. J Clin Oncol 2000;18:3038–3051",u:"https://doi.org/10.1200/JCO.2000.18.16.3038"},
  {t:"Averbuch D et al. ECIL-4 guidelines on antibacterial therapy for febrile neutropenia. Haematologica 2013;98:1826–1835",u:"https://doi.org/10.3324/haematol.2013.091025"}
 ]
},
"who-16":{
 title:"Celulitis y erisipela",
 reviewed:"2026-10-23",
 summary:"Infección aguda de dermis y tejido subcutáneo, casi siempre no purulenta y causada por estreptococos β-hemolíticos. Lo esencial es separar la forma no purulenta de la purulenta (absceso), reconocer la fascitis necrosante y los simuladores, y tratar de forma corta cuando mejora. El drenaje es el tratamiento principal del absceso.",
 criteria:{
  label:"Clasificación práctica (IDSA 2014)",
  major:["No purulenta: eritema, calor, dolor y edema sin colección ni drenaje purulento","Purulenta: absceso, forúnculo o carbunco con drenaje; incisión y drenaje como base"],
  minor:["Gravedad sistémica: fiebre, taquicardia, hipotensión, deterioro mental","Factores para SARM: trauma penetrante, uso de drogas inyectadas, colonización o infección previa, drenaje purulento","Señales de alarma de infección necrotizante: dolor desproporcionado, progresión rápida, ampollas hemorrágicas, crepitación, anestesia cutánea, toxicidad"],
  rule:"Ante dolor desproporcionado o toxicidad, pensar en fascitis necrosante: la prioridad es la exploración quirúrgica urgente, no el antibiótico oral."
 },
 algorithm:[
  {t:"Distinguir purulenta de no purulenta",x:"Buscar fluctuación; ecografía de partes blandas si hay duda. Un absceso se drena aunque también se use antibiótico."},
  {t:"Buscar gravedad y necrosis",x:"Constantes, lactato y signos de infección necrotizante. Si existen, derivar a cirugía y manejar como fascitis necrosante."},
  {t:"Descartar simuladores",x:"Dermatitis de estasis, trombosis venosa profunda, dermatitis de contacto, gota, lipodermatoesclerosis, reacción a fármacos y eritema migratorio; la bilateralidad y la ausencia de fiebre orientan a simuladores."},
  {t:"Elegir antibiótico según el tipo",x:"Ver la tabla. En no purulenta, cobertura de estreptococos; ampliar a SARM solo con factores de riesgo."},
  {t:"Marcar el borde y reevaluar a las 24–48 h",x:"Si progresa o aparece toxicidad, ingresar, ampliar espectro y buscar necrosis o absceso."},
  {t:"Tratar factores predisponentes",x:"Edema, insuficiencia venosa, tinea pedis, solución de continuidad y linfedema."}
 ],
 decisions:[
  {c:"No purulenta leve, sin factores de riesgo para SARM",p:"β-lactámico oral con actividad antiestreptocócica (penicilina, cefalexina, dicloxacilina) o clindamicina; 5 días si hay mejoría.",n:"IDSA 2014; prolongar solo si la mejoría es insuficiente a los 5 días."},
  {c:"No purulenta con toxicidad sistémica o fallo oral",p:"Tratamiento intravenoso con β-lactámico; añadir vancomicina u otro anti-SARM si hay factores de riesgo o gravedad.",n:"Pasar a vía oral con mejoría."},
  {c:"Absceso purulento",p:"Incisión y drenaje; antibiótico (TMP-SMX o doxiciclina, o clindamicina) si fiebre, múltiples lesiones, inmunodepresión, celulitis extensa, edades extremas o respuesta insuficiente.",n:"El drenaje es la medida central."},
  {c:"Celulitis tras mordedura o inmersión",p:"Cobertura específica (flora oral del animal o Aeromonas/Vibrio según el ambiente).",n:"Ver la ficha de heridas y mordeduras."},
  {c:"Inmunodepresión, neutropenia o diabetes con úlcera",p:"Ampliar espectro y buscar hueso o fascia afectados.",n:"Consultar infectología o cirugía; la neutropenia obliga a seguir el manejo de neutropenia febril."},
  {c:"Recurrencias frecuentes (3–4 episodios al año)",p:"Penicilina oral profiláctica a largo plazo, con corrección de factores locales.",n:"El ensayo PATCH I mostró reducción de recurrencias solo mientras se mantuvo la profilaxis."}
 ],
 steroid:{
  title:"Medidas locales y hemocultivos",
  x:"Elevar la extremidad, tratar el edema y la tinea pedis y emplear compresión cuando el cuadro agudo cede reduce la recurrencia. Los hemocultivos no son rutinarios en celulitis típica; se piden con toxicidad, inmunodepresión, mordeduras, inmersión o sospecha de endocarditis."
 },
 complications:[
  {n:"Absceso",x:"Ecografía y drenaje."},
  {n:"Bacteriemia y sepsis",x:"Hemocultivos y manejo como sepsis si hay hipoperfusión."},
  {n:"Fascitis necrosante y mionecrosis",x:"Urgencia quirúrgica, antibióticos de amplio espectro con clindamicina."},
  {n:"Linfangitis y linfedema crónico",x:"Predispone a recurrencias; compresión y cuidado de la piel."},
  {n:"Osteomielitis y artritis séptica contiguas",x:"Imagen cuando hay dolor óseo o articular o úlcera profunda."}
 ],
 failure:"Sin mejoría a las 48–72 h: reconsiderar el diagnóstico (simulador), buscar absceso, necrosis, cuerpo extraño u osteomielitis, valorar SARM o patógenos inusuales según exposición, revisar adherencia y absorción, y revisar si es una trombosis venosa o reacción farmacológica.",
 followup:[
  "Revaluar a las 24–48 h con el borde marcado.",
  "Corregir edema, insuficiencia venosa, tinea pedis y fisuras.",
  "Vacunación antitetánica según estado.",
  "Considerar profilaxis en recurrencias frecuentes y reevaluar su indicación periódicamente."
 ],
 pitfalls:[
  "Tratar una celulitis bilateral simétrica sin fiebre sin considerar dermatitis de estasis.",
  "Dar antibiótico en un absceso sin drenarlo.",
  "Cubrir SARM de rutina en una celulitis no purulenta sin factores de riesgo.",
  "No pensar en infección necrotizante ante dolor desproporcionado.",
  "Prolongar innecesariamente el tratamiento por persistencia del edema y el eritema residual."
 ],
 references:[
  {t:"Stevens DL et al. Practice guidelines for the diagnosis and management of skin and soft tissue infections: 2014 update by the IDSA. Clin Infect Dis 2014;59:e10–e52",u:"https://doi.org/10.1093/cid/ciu296"},
  {t:"Thomas KS et al. Penicillin to prevent recurrent leg cellulitis (PATCH I). N Engl J Med 2013;368:1695–1703",u:"https://doi.org/10.1056/NEJMoa1206300"},
  {t:"IDSA. Skin and soft tissue infections guideline (versión vigente)",u:"https://www.idsociety.org/practice-guideline/skin-and-soft-tissue-infections/"}
 ]
}
};

