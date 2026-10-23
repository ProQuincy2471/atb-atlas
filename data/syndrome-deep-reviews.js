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
}
};
