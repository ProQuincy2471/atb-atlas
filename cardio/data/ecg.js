/* CARDIORA — Nivel 2 · ECG. Lecciones del método y atlas de ritmos con trazos esquemáticos (cardio/js/ecg-engine.js). */
window.CARDIO=window.CARDIO||{};
CARDIO.ecgAnatomy={
 p:{t:'Onda P',x:'Despolarización de ambas aurículas. Normal: positiva en I, II y aVF, <0,12 s de duración y <2,5 mm de altura. Ausente en fibrilación auricular; ondas “en sierra” en flutter.'},
 pri:{t:'Intervalo PR',x:'Desde el inicio de la P hasta el inicio del QRS: tiempo que tarda el impulso en llegar a los ventrículos. Normal 0,12–0,20 s (3–5 cuadritos). Largo (>0,20 s) = bloqueo AV de 1.er grado; corto (<0,12 s) con onda delta = preexcitación (WPW).'},
 pr:{t:'Segmento PR',x:'Línea isoeléctrica tras la P: retraso fisiológico en el nodo AV. Su descenso difuso (con elevación en aVR) sugiere pericarditis aguda.'},
 qrs:{t:'Complejo QRS',x:'Despolarización ventricular. Normal <0,12 s (3 cuadritos). Ancho: bloqueo de rama, ritmo ventricular, marcapasos, hiperpotasemia, preexcitación o fármacos bloqueadores de sodio. Una onda Q patológica (≥0,04 s o ≥25% del R) sugiere necrosis previa.'},
 st:{t:'Segmento ST',x:'Del final del QRS (punto J) al inicio de la T. Debe estar isoeléctrico. Elevación: infarto con elevación del ST, pericarditis, aneurisma, repolarización precoz, Brugada. Descenso: isquemia subendocárdica, efecto digitálico, sobrecarga ventricular, imagen especular.'},
 t:{t:'Onda T',x:'Repolarización ventricular. Normalmente sigue la dirección del QRS. Picuda: hiperpotasemia o fase hiperaguda del infarto. Invertida: isquemia, sobrecarga, Wellens, TEP (V1–V4), post-taquicardia, normal en aVR y a veces en III y V1.'},
 qt:{t:'Intervalo QT',x:'Del inicio del QRS al final de la T: toda la actividad eléctrica ventricular. Se corrige por frecuencia (QTc). Prolongado (>450 ms en hombres, >460–470 ms en mujeres; >500 ms = riesgo alto) predispone a torsades de pointes.'}
};
CARDIO.ecgLecciones=[
{id:'papel',nivel:2,min:10,titulo:'Papel, derivaciones y colocación',sub:'Lo que tienes que saber antes de interpretar',
 resumen:'El ECG mide voltaje contra tiempo desde 12 puntos de vista. Conocer el papel y saber qué cara del corazón mira cada derivación es la mitad de la interpretación.',
 secciones:[
 {h:'El papel',b:[
  {table:{h:['Elemento','Valor estándar'],r:[['Velocidad','25 mm/s'],['Cuadrito (1 mm) horizontal','0,04 s (40 ms)'],['Cuadro grande (5 mm) horizontal','0,20 s (200 ms)'],['5 cuadros grandes','1 segundo'],['Calibración vertical','10 mm = 1 mV (el pulso de calibración rectangular)']]}},
  {ecg:'sinus',cap:'Ritmo sinusal a 75 lpm: un QRS cada 4 cuadros grandes (300/4 = 75). A la izquierda, el pulso de calibración de 10 mm.'}]},
 {h:'Las 12 derivaciones',b:[
  {table:{h:['Grupo','Derivaciones','Cara que miran'],r:[['Inferiores','II, III, aVF','Cara inferior (CD o Cx)'],['Laterales altas','I, aVL','Cara lateral alta (Cx, diagonales)'],['Septales','V1, V2','Septum (DA)'],['Anteriores','V3, V4','Cara anterior (DA)'],['Laterales bajas','V5, V6','Cara lateral (Cx, DA)'],['aVR','aVR','Mira la cavidad: casi todo es negativo; su ST elevado con descenso difuso sugiere isquemia de tronco o multivaso']]}},
  {ul:['V1: 4.º espacio intercostal, borde esternal derecho. V2: 4.º espacio, borde esternal izquierdo.','V4: 5.º espacio, línea medioclavicular. V3: a la mitad entre V2 y V4.','V5: línea axilar anterior a la altura de V4. V6: línea axilar media.','Derivaciones extra: V4R (ventrículo derecho) y V7–V9 (cara posterior).']},
  {warn:'Electrodos de brazos invertidos: P y QRS negativos en I con aVR positivo. Repite el trazo antes de diagnosticar dextrocardia.'}]}
 ],
 claves:['1 mm = 0,04 s; 5 mm = 0,20 s.','10 mm = 1 mV.','II, III, aVF inferior; I, aVL, V5–V6 lateral; V1–V4 anteroseptal.']},

{id:'metodo',nivel:2,min:15,titulo:'Lectura sistemática en 8 pasos',sub:'El mismo orden, siempre, para no omitir nada',
 resumen:'Los errores de ECG casi nunca son por no saber, sino por no mirar. Este método te obliga a revisar todo en menos de dos minutos.',
 secciones:[
 {h:'Los 8 pasos',b:[
  {ol:['**Datos y calidad**: nombre, fecha, calibración 10 mm/mV y 25 mm/s, artefactos, colocación de electrodos.','**Frecuencia**: 300 / cuadros grandes entre dos R, o 1500 / cuadritos. Si es irregular: cuenta los QRS en 10 s (tira completa) × 6.','**Ritmo**: ¿hay P antes de cada QRS y QRS después de cada P? ¿P positiva en II y negativa en aVR? ¿Regular o irregular?','**Eje**: mira I y aVF. Ambos positivos = normal. I+ y aVF− con II negativo = desviación izquierda. I− y aVF+ = desviación derecha.','**Intervalos**: PR 0,12–0,20 s; QRS <0,12 s; QTc según sexo.','**Onda P**: crecimiento auricular derecho (P >2,5 mm en II) o izquierdo (P ancha >0,12 s, bimodal en II, componente negativo en V1).','**QRS**: voltaje (hipertrofia), anchura y morfología (bloqueos de rama), ondas Q patológicas, progresión de R en precordiales.','**ST-T**: elevación o descenso del ST, morfología de la T, ondas U. Compara con un ECG previo y concluye.']},
  {pearl:'Termina siempre con una frase: “Ritmo sinusal a 80 lpm, eje normal, intervalos normales, sin alteraciones agudas de la repolarización”. Si no puedes decirla, te faltó un paso.'}]},
 {h:'Eje rápido',b:[
  {table:{h:['I','aVF','Eje','Causas frecuentes'],r:[['+','+','Normal (0° a +90°)','—'],['+','−','Izquierdo si II también es negativo (< −30°)','Hemibloqueo anterior izquierdo, HVI, infarto inferior'],['−','+','Derecho (> +90°)','Sobrecarga de VD, TEP, EPOC, hemibloqueo posterior; normal en niños'],['−','−','Extremo (“tierra de nadie”)','Ritmo ventricular, electrodos invertidos, hiperpotasemia']]}}]},
 {h:'Crecimientos ventriculares',b:[
  {ul:['**HVI — Sokolow-Lyon**: S en V1 + R en V5 o V6 ≥35 mm.','**HVI — Cornell**: R en aVL + S en V3 >28 mm (hombres) o >20 mm (mujeres).','Patrón de “sobrecarga”: descenso del ST con T asimétrica invertida en V5–V6.','**HVD**: R dominante en V1 (R/S >1), eje derecho, T invertidas en V1–V3.']},
  {warn:'Los criterios de voltaje son poco sensibles: un ECG normal no descarta hipertrofia. El ecocardiograma es el estándar.'}]}
 ],
 claves:['Siempre en el mismo orden.','Frecuencia irregular: QRS en 10 s × 6.','Compara con un ECG previo.']},

{id:'isquemia',nivel:2,min:16,titulo:'Isquemia e infarto en el ECG',sub:'Elevación del ST, equivalentes y territorios',
 resumen:'El ECG separa el síndrome coronario agudo con elevación del ST (reperfusión inmediata) del que no la tiene. Además hay patrones “equivalentes” que obligan a actuar igual de rápido.',
 secciones:[
 {h:'Criterios de elevación del ST (Cuarta Definición Universal)',b:[
  'Elevación nueva del ST en el punto J en **dos derivaciones contiguas**:',
  {ul:['≥1 mm en todas las derivaciones excepto V2–V3.','En V2–V3: ≥2 mm en hombres ≥40 años; ≥2,5 mm en hombres <40 años; ≥1,5 mm en mujeres.','V7–V9 ≥0,5 mm (posterior); V3R–V4R ≥0,5 mm (≥1 mm en hombres <30 años) para ventrículo derecho.']},
  {ecg:'stemi',cap:'Elevación del ST convexa que se fusiona con la onda T (lesión subepicárdica). Trazo esquemático.'}]},
 {h:'Evolución temporal',b:[
  {flow:['Minutos: T hiperagudas (altas y anchas)','Horas: elevación del ST','Horas–días: aparecen ondas Q y la T se invierte','Semanas: el ST vuelve a la línea basal; la Q suele persistir']}]},
 {h:'Equivalentes de oclusión coronaria',b:[
  {table:{h:['Patrón','Qué ver','Significado'],r:[
   ['Infarto posterior','Descenso del ST en V1–V3 con R alta; elevación en V7–V9','Oclusión de Cx o CD: tratar como IAMCEST'],
   ['De Winter','Descenso del ST ascendente en V1–V6 con T altas y simétricas','Oclusión proximal de la DA'],
   ['Wellens (A y B)','T bifásicas o profundamente invertidas en V2–V3 en paciente sin dolor','Estenosis crítica de la DA proximal: riesgo de infarto anterior extenso; evitar prueba de esfuerzo'],
   ['Elevación del ST en aVR + descenso difuso','≥1 mm en aVR con descenso en ≥6 derivaciones','Isquemia del tronco o multivaso (también en isquemia por demanda grave)'],
   ['BRI o marcapasos con criterios de Sgarbossa','ST concordante ≥1 mm, descenso concordante en V1–V3, o ST discordante excesivo','Infarto agudo pese al bloqueo']]}},
  {warn:'Un ECG inicial normal no descarta un SCA. Repite el ECG cada 15–30 min si persiste el dolor.'}]},
 {h:'Imitadores de la elevación del ST',b:[
  {table:{h:['Entidad','Pistas que la diferencian'],r:[
   ['Pericarditis aguda','Elevación difusa y cóncava, descenso del PR, sin imagen especular (salvo aVR y V1)'],
   ['Repolarización precoz','Jóvenes, muesca en el punto J, ST cóncavo, estable en el tiempo'],
   ['Aneurisma ventricular','Ondas Q con elevación persistente semanas después de un infarto'],
   ['Brugada tipo 1','Elevación en “cúpula” ≥2 mm en V1–V2 seguida de T negativa'],
   ['HVI y BRI','Elevación discordante en V1–V3 proporcional a la profundidad del QRS'],
   ['Hiperpotasemia','T picudas, QRS ancho; corrige con el potasio']]}},
  {ecg:'pericarditis',cap:'Pericarditis: elevación cóncava del ST con descenso del PR. Trazo esquemático.'}]}
 ],
 claves:['Dos derivaciones contiguas; umbral especial en V2–V3.','Busca la imagen especular: apoya infarto.','Conoce los equivalentes: posterior, De Winter, aVR, Sgarbossa.','Wellens = estenosis crítica de DA aunque ya no haya dolor.']},

{id:'bloqueos',nivel:2,min:12,titulo:'Bloqueos de rama y fasciculares',sub:'Cuando el QRS se ensancha',
 resumen:'Si una rama no conduce, el ventrículo correspondiente se activa tarde y de célula en célula: el QRS se ensancha (≥120 ms) con morfologías características en V1 y V6.',
 secciones:[
 {h:'Bloqueo de rama derecha (BRD)',b:[
  {ul:['QRS ≥120 ms.','V1–V2: rsR′ (“orejas de conejo”, M).','S ancha y empastada en I y V6.','La T suele invertirse en V1–V3 (secundaria).']},
  {ecg:'rbbb-v1',lead:'V1',cap:'BRD en V1: patrón rsR′.'},{ecg:'rbbb-v6',lead:'V6',cap:'BRD en V6: S ancha final.'}]},
 {h:'Bloqueo de rama izquierda (BRI)',b:[
  {ul:['QRS ≥120 ms.','V1: QS o rS profundo y ancho.','I, aVL, V5–V6: R ancha con muesca, sin onda q septal.','ST-T discordante (opuesto al QRS): es lo esperado.']},
  {ecg:'lbbb-v1',lead:'V1',cap:'BRI en V1: QS profundo y ancho.'},{ecg:'lbbb-v6',lead:'V6',cap:'BRI en V6: R ancha con muesca y T invertida.'},
  {warn:'BRI nuevo con dolor ya no equivale automáticamente a IAMCEST: aplica criterios de Sgarbossa (modificados) y la clínica. Con inestabilidad hemodinámica, activa el laboratorio de hemodinámica.'}]},
 {h:'Hemibloqueos',b:[
  {table:{h:['Hemibloqueo','Eje','Patrón'],r:[['Anterior izquierdo (el más frecuente)','< −45°','qR en I y aVL; rS en II, III y aVF'],['Posterior izquierdo','> +90° (descartar HVD, TEP)','rS en I y aVL; qR en III y aVF']]}},
  {pearl:'BRD + hemibloqueo anterior = bloqueo bifascicular. Si además hay PR largo, vigila la progresión a bloqueo AV avanzado en el contexto clínico (síncope).'}]}
 ],
 claves:['QRS ≥120 ms: piensa en bloqueo de rama.','BRD: rsR′ en V1. BRI: QS en V1 y R con muesca en V6.','En BRI la repolarización discordante es normal.']},

{id:'electrolitos',nivel:2,min:8,titulo:'Electrolitos, fármacos y QT',sub:'Patrones que se tratan fuera del laboratorio de hemodinámica',
 resumen:'Potasio, calcio y varios fármacos dejan huellas típicas en el ECG. Algunas, como la hiperpotasemia, exigen tratamiento antes de tener el resultado de laboratorio.',
 secciones:[
 {h:'Potasio',b:[
  {ecg:'hyperk',cap:'Hiperpotasemia: T altas, estrechas y picudas, P aplanada y QRS que empieza a ensancharse.'},
  {ecg:'hypok',cap:'Hipopotasemia: T aplanada, ST descendido y onda U prominente.'},
  {warn:'Hiperpotasemia con cambios en el ECG: gluconato de calcio IV de inmediato (estabiliza la membrana), luego insulina con glucosa, β-agonista y eliminación del potasio.'}]},
 {h:'QT largo',b:[
  {ecg:'long-qt',cap:'QT prolongado: la onda T termina muy lejos del QRS.'},
  {ul:['**Bazett**: QTc = QT / √RR (s). Sobrecorrige a frecuencias altas.','**Fridericia**: QTc = QT / ∛RR. Preferible con taquicardia.','Causas adquiridas: antiarrítmicos (sotalol, amiodarona), macrólidos, fluoroquinolonas, antipsicóticos, ondansetrón, metadona, hipopotasemia, hipomagnesemia, hipocalcemia, bradicardia.','Congénito: canalopatías (LQT1–3); historia familiar de muerte súbita.']},
  'Usa la calculadora de QTc en **Herramientas**.']},
 {h:'Digoxina',b:['Efecto digitálico (no intoxicación): descenso del ST “en cubeta” y QT corto. La **intoxicación** se sospecha por síntomas (náusea, visión amarilla) y arritmias: extrasístoles ventriculares, taquicardia auricular con bloqueo, TV bidireccional, bradicardia y bloqueo AV.']}
 ],
 claves:['Hiperpotasemia con ECG alterado = calcio IV ya.','Usa Fridericia si la frecuencia es alta.','Revisa los fármacos que alargan el QT antes de combinarlos.']}
];

/* Atlas de ritmos: id = generador del motor ECG */
CARDIO.ritmos=[
 {id:'sinus',grupo:'Sinusales',nombre:'Ritmo sinusal normal',fc:'60–100 lpm',criterios:['P positiva en II antes de cada QRS','PR constante 0,12–0,20 s','QRS estrecho, RR regular'],causas:['Normal'],manejo:'Ninguno. Es tu referencia para comparar todo lo demás.'},
 {id:'sinus-brady',grupo:'Sinusales',nombre:'Bradicardia sinusal',fc:'<60 lpm',criterios:['Ritmo sinusal con frecuencia <60 lpm'],causas:['Deportistas, sueño','Betabloqueadores, calcioantagonistas, digoxina','Hipotiroidismo, hipotermia, hipertensión intracraneal','Infarto inferior, enfermedad del nodo sinusal'],manejo:'Tratar solo si hay síntomas o signos de hipoperfusión: algoritmo de bradicardia (atropina, marcapasos transcutáneo, infusiones).',acls:'bradicardia'},
 {id:'sinus-tachy',grupo:'Sinusales',nombre:'Taquicardia sinusal',fc:'>100 lpm (rara vez >150 en reposo en adultos)',criterios:['Ritmo sinusal con frecuencia >100 lpm','Inicio y fin graduales'],causas:['Fiebre, dolor, ansiedad, hipovolemia, anemia','Sepsis, TEP, hipoxemia, hipertiroidismo','Estimulantes, abstinencia'],manejo:'Trata la causa. No se cardiovierte ni se “frena” con fármacos sin entender por qué existe.'},
 {id:'sinus-arr',grupo:'Sinusales',nombre:'Arritmia sinusal respiratoria',fc:'Variable',criterios:['P sinusal normal','RR varía con la respiración (se acorta en inspiración)'],causas:['Normal en jóvenes; reflejo del tono vagal'],manejo:'Benigna; no requiere tratamiento.'},
 {id:'af',grupo:'Supraventriculares',nombre:'Fibrilación auricular',fc:'Respuesta ventricular variable',criterios:['Sin ondas P organizadas; línea de base fibrilatoria','RR **irregularmente irregular**','QRS estrecho (salvo bloqueo de rama o preexcitación)'],causas:['HTA, IC, valvulopatía mitral, edad','Hipertiroidismo, alcohol, apnea del sueño','Postoperatorio, sepsis, TEP'],manejo:'Inestable: cardioversión eléctrica sincronizada. Estable: control de frecuencia (betabloqueador, diltiazem si FEVI >40%), valorar control de ritmo y **anticoagulación según CHA₂DS₂-VA**.',pato:'fa'},
 {id:'flutter',grupo:'Supraventriculares',nombre:'Flutter auricular típico',fc:'Aurícula ≈300 lpm; ventrículo ≈150 lpm (2:1)',criterios:['Ondas F “en dientes de sierra” en II, III, aVF','Conducción fija 2:1, 3:1 o 4:1 (o variable)','Una taquicardia regular a 150 lpm debe hacerte buscar flutter'],causas:['Similares a la FA; cardiopatía estructural, EPOC'],manejo:'Igual que FA para anticoagulación. Responde bien a cardioversión con baja energía; la ablación del istmo cavotricuspídeo es muy eficaz.',pato:'fa'},
 {id:'svt',grupo:'Supraventriculares',nombre:'Taquicardia supraventricular paroxística',fc:'150–250 lpm',criterios:['Regular, QRS estrecho','P no visibles o retrógradas (tras el QRS)','Inicio y fin bruscos'],causas:['Reentrada intranodal (TRNAV, la más frecuente)','Reentrada por vía accesoria (TRAV)'],manejo:'Estable: maniobras vagales (Valsalva modificada) → adenosina 6 mg IV rápida, luego 12 mg. Inestable: cardioversión sincronizada.',acls:'taquicardia',pato:'tsv'},
 {id:'pac',grupo:'Supraventriculares',nombre:'Extrasístoles auriculares',fc:'Ritmo de base',criterios:['Latido prematuro con P de morfología distinta','QRS habitualmente estrecho','Pausa no compensadora'],causas:['Cafeína, alcohol, estrés, tabaco','Cardiopatía estructural, EPOC'],manejo:'Generalmente benignas. Reducir desencadenantes; betabloqueador si son sintomáticas.'},
 {id:'junctional',grupo:'Supraventriculares',nombre:'Ritmo de la unión',fc:'40–60 lpm (acelerado 60–100)',criterios:['QRS estrecho sin P previa','P invertida tras el QRS o ausente'],causas:['Escape por disfunción sinusal','Intoxicación digitálica, infarto inferior, postoperatorio cardiaco'],manejo:'Busca la causa (fármacos, isquemia). Si hay hipoperfusión: algoritmo de bradicardia.'},
 {id:'pvc',grupo:'Ventriculares',nombre:'Extrasístoles ventriculares',fc:'Ritmo de base',criterios:['Latido prematuro ancho (≥120 ms) sin P previa','T opuesta al QRS','Pausa compensadora completa'],causas:['Normal en baja carga','Isquemia, IC, hipopotasemia, hipomagnesemia, estimulantes'],manejo:'Corregir electrolitos y causas. Si la carga es alta (>10–15%) o hay síntomas/disfunción, estudiar cardiopatía estructural.'},
 {id:'vt',grupo:'Ventriculares',nombre:'Taquicardia ventricular monomórfica',fc:'>100 lpm (habitualmente 150–250)',criterios:['QRS ancho y regular, morfología constante','Disociación AV, latidos de captura o de fusión (si se ven, confirman TV)','En cardiopatía isquémica, una taquicardia de QRS ancho es TV hasta demostrar lo contrario'],causas:['Cicatriz de infarto','Miocardiopatías','Alteraciones electrolíticas, fármacos'],manejo:'Sin pulso: desfibrilación (algoritmo de paro). Con pulso e inestable: cardioversión sincronizada. Estable: antiarrítmico IV (procainamida, amiodarona o sotalol) y consulta experta.',acls:'taquicardia',pato:'tv'},
 {id:'vf',grupo:'Ventriculares',nombre:'Fibrilación ventricular',fc:'Caótica, sin complejos identificables',criterios:['Ondulaciones irregulares sin QRS, P ni T','Paciente sin pulso'],causas:['Isquemia aguda','Miocardiopatías, canalopatías','Hipoxia, electrolitos, toxinas'],manejo:'Paro cardiaco: **descarga inmediata** y RCP de alta calidad. Cada minuto sin desfibrilar reduce drásticamente la supervivencia.',acls:'paro'},
 {id:'torsades',grupo:'Ventriculares',nombre:'Torsades de pointes',fc:'200–250 lpm',criterios:['TV polimórfica cuyo eje “gira” alrededor de la línea basal','Precedida de QT largo'],causas:['QT largo adquirido (fármacos, hipopotasemia, hipomagnesemia) o congénito'],manejo:'Sulfato de magnesio 2 g IV; sin pulso, desfibrilar. Suspender fármacos que alargan el QT; corregir K⁺; valorar marcapasos de sobreestimulación o isoproterenol.',acls:'paro'},
 {id:'aivr',grupo:'Ventriculares',nombre:'Ritmo idioventricular acelerado',fc:'40–100 lpm',criterios:['QRS ancho regular, frecuencia “lenta para TV”','Sin P relacionadas'],causas:['Reperfusión tras infarto (marcador frecuente)','Digoxina, cocaína'],manejo:'Generalmente benigno y autolimitado; **no suprimir** con antiarrítmicos (podría ser el único ritmo).'},
 {id:'avb1',grupo:'Bloqueos AV',nombre:'Bloqueo AV de primer grado',fc:'Ritmo de base',criterios:['PR >0,20 s constante','Toda P conduce'],causas:['Fármacos nodales, tono vagal','Degeneración del sistema de conducción, isquemia inferior'],manejo:'Habitualmente no requiere tratamiento. Revisar fármacos.'},
 {id:'mobitz1',grupo:'Bloqueos AV',nombre:'Bloqueo AV 2.º grado Mobitz I (Wenckebach)',fc:'Irregular, agrupada',criterios:['PR se alarga progresivamente hasta que una P no conduce','Latidos agrupados','Bloqueo generalmente en el nodo AV'],causas:['Tono vagal, sueño, deportistas','Fármacos nodales','Infarto inferior'],manejo:'Suele ser benigno. Si hay síntomas: atropina suele funcionar (bloqueo nodal).',acls:'bradicardia'},
 {id:'mobitz2',grupo:'Bloqueos AV',nombre:'Bloqueo AV 2.º grado Mobitz II',fc:'Variable',criterios:['PR constante; súbitamente una P no conduce','QRS a menudo ancho (bloqueo infranodal)'],causas:['Enfermedad del sistema His-Purkinje','Infarto anterior'],manejo:'Riesgo de progresión a bloqueo completo: monitorización y **marcapasos** (transcutáneo como puente; definitivo). La atropina suele ser ineficaz.',acls:'bradicardia'},
 {id:'avb3',grupo:'Bloqueos AV',nombre:'Bloqueo AV completo (3.er grado)',fc:'Ventrículo 20–40 lpm (escape ancho) o 40–60 (escape de la unión)',criterios:['Ondas P y QRS independientes (disociación AV)','PP regular y RR regular, sin relación entre ellas','Frecuencia auricular > frecuencia ventricular'],causas:['Degeneración del sistema de conducción','Infarto (inferior: suele ser transitorio)','Fármacos, enfermedad de Lyme, sarcoidosis, hiperpotasemia'],manejo:'Si hay hipoperfusión: marcapasos transcutáneo y/o dopamina o epinefrina mientras se coloca marcapasos transvenoso; marcapasos definitivo si no hay causa reversible.',acls:'bradicardia'},
 {id:'asystole',grupo:'Paro',nombre:'Asistolia',fc:'0',criterios:['Línea plana','Confirmar en dos derivaciones, revisar ganancia y conexión de electrodos'],causas:['Paro prolongado, hipoxia, hiperpotasemia, acidosis'],manejo:'**No se desfibrila.** RCP de alta calidad, epinefrina lo antes posible y buscar causas reversibles (H y T).',acls:'paro'},
 {id:'paced',grupo:'Patrones',nombre:'Ritmo de marcapasos ventricular',fc:'Frecuencia programada',criterios:['Espiga vertical seguida de QRS ancho','Morfología de BRI si el electrodo está en VD'],causas:['Marcapasos definitivo o transcutáneo'],manejo:'Verificar captura (cada espiga seguida de QRS y pulso palpable). Falla de captura o de detección = consultar.'},
 {id:'stemi',grupo:'Patrones',nombre:'Elevación del ST (lesión aguda)',fc:'—',criterios:['ST elevado en dos derivaciones contiguas','Convexo, con imagen especular','Evolución: T hiperaguda → ST → Q'],causas:['Oclusión coronaria aguda'],manejo:'Activar el código infarto: ICP primaria (meta ≤90 min desde el primer contacto) o fibrinólisis si la ICP no es posible a tiempo.',pato:'sca-cest'},
 {id:'st-dep',grupo:'Patrones',nombre:'Descenso del ST (isquemia subendocárdica)',fc:'—',criterios:['ST descendido horizontal o descendente ≥0,5 mm en dos contiguas'],causas:['SCA sin elevación del ST, isquemia por demanda','Imagen especular, digoxina, HVI con sobrecarga'],manejo:'Integrar con troponina y clínica; estratificar riesgo.',pato:'sca-sest'},
 {id:'hyperk',grupo:'Patrones',nombre:'Hiperpotasemia',fc:'—',criterios:['T picudas y estrechas','PR largo, P aplanada','QRS ancho → patrón sinusoidal'],causas:['ERC, fármacos (IECA, ARA-II, espironolactona), rabdomiólisis, acidosis'],manejo:'Gluconato de calcio IV + insulina/glucosa + salbutamol; eliminar K⁺ (diuréticos, quelantes, diálisis).'},
 {id:'hypok',grupo:'Patrones',nombre:'Hipopotasemia',fc:'—',criterios:['T aplanada','Onda U prominente','Descenso del ST; QT(U) largo'],causas:['Diuréticos, vómito, diarrea, alcalosis'],manejo:'Reponer K⁺ y magnesio; vigilar arritmias.'},
 {id:'wpw',grupo:'Patrones',nombre:'Preexcitación (Wolff-Parkinson-White)',fc:'—',criterios:['PR corto <0,12 s','Onda delta (empastamiento inicial del QRS)','QRS ancho'],causas:['Vía accesoria congénita'],manejo:'Si hay FA preexcitada (irregular, ancha y rápida): **evitar bloqueadores del nodo AV**; cardioversión o procainamida. Referir para ablación.',pato:'tsv'},
 {id:'long-qt',grupo:'Patrones',nombre:'QT largo',fc:'—',criterios:['QTc >450 ms (H) / >460–470 ms (M)','>500 ms: riesgo alto de torsades'],causas:['Fármacos, hipopotasemia, hipomagnesemia, hipocalcemia, congénito'],manejo:'Suspender fármacos culpables, corregir electrolitos, monitorizar.'},
 {id:'pericarditis',grupo:'Patrones',nombre:'Pericarditis aguda',fc:'Suele haber taquicardia',criterios:['Elevación difusa y cóncava del ST','Descenso del PR (elevación del PR en aVR)','Sin imagen especular'],causas:['Viral/idiopática, post-IAM, urémica, autoinmune, neoplásica'],manejo:'AINE o AAS + colchicina; buscar derrame con ecocardiograma.',pato:'pericarditis'},
 {id:'rbbb-v1',grupo:'Patrones',nombre:'Bloqueo de rama derecha (V1)',fc:'—',lead:'V1',criterios:['QRS ≥120 ms','rsR′ en V1–V2','S ancha en I y V6'],causas:['Puede ser normal; cardiopatía, TEP, cardiopatía congénita'],manejo:'Por sí solo no requiere tratamiento; valorar el contexto (TEP si es nuevo con disnea).'},
 {id:'lbbb-v1',grupo:'Patrones',nombre:'Bloqueo de rama izquierda (V1)',fc:'—',lead:'V1',criterios:['QRS ≥120 ms','QS ancho en V1','R ancha con muesca en V6, sin q septal'],causas:['Cardiopatía estructural, HTA, isquemia, degenerativo'],manejo:'Obliga a buscar cardiopatía estructural (ecocardiograma). Con dolor: criterios de Sgarbossa.'}
];
