/* CARDIORA — Nivel 1 · Fundamentos. Texto editorial original con fines educativos.
   Formato de bloques: cadena = párrafo; {ul}, {ol}, {table:{h,r}}, {pearl}, {warn}, {flow}, {ecg,cap}. **negrita** permitida. */
window.CARDIO=window.CARDIO||{};
CARDIO.fundamentos=[
{id:'anatomia',nivel:1,min:12,titulo:'Anatomía funcional del corazón',sub:'Cámaras, válvulas, coronarias y el recorrido de la sangre',
 resumen:'El corazón son dos bombas en serie: la derecha empuja sangre a baja presión hacia el pulmón y la izquierda a alta presión hacia todo el cuerpo. Entender qué cámara, qué válvula y qué arteria coronaria están implicadas explica casi toda la clínica.',
 secciones:[
 {h:'El recorrido de la sangre, paso a paso',b:[
  {flow:['Venas cavas superior e inferior','Aurícula derecha','Válvula tricúspide','Ventrículo derecho','Válvula pulmonar','Arteria pulmonar → pulmones (intercambio de gases)','Venas pulmonares','Aurícula izquierda','Válvula mitral','Ventrículo izquierdo','Válvula aórtica','Aorta → circulación sistémica']},
  'Las válvulas **auriculoventriculares** (tricúspide y mitral) se abren en diástole para llenar los ventrículos; las **semilunares** (pulmonar y aórtica) se abren en sístole para vaciarlos. Una válvula estrecha (estenosis) se manifiesta cuando debería estar abierta; una válvula que fuga (insuficiencia) se manifiesta cuando debería estar cerrada.',
  {pearl:'Regla para soplos: estenosis aórtica e insuficiencia mitral suenan en **sístole**; estenosis mitral e insuficiencia aórtica suenan en **diástole**.'}]},
 {h:'Cámaras y paredes',b:[
  {table:{h:['Estructura','Presión normal aproximada (mmHg)','Qué conviene recordar'],r:[
   ['Aurícula derecha','2–6 (media)','Refleja la presión venosa central; se ve en el pulso venoso yugular.'],
   ['Ventrículo derecho','15–30 / 2–8','Pared delgada: tolera volumen, no tolera aumentos bruscos de poscarga (TEP masivo).'],
   ['Arteria pulmonar','15–30 / 4–12','Media >20 mmHg define hipertensión pulmonar (definición hemodinámica actual).'],
   ['Aurícula izquierda / cuña','6–12 (media)','Aumenta en insuficiencia cardiaca izquierda y estenosis mitral → congestión pulmonar.'],
   ['Ventrículo izquierdo','100–140 / 3–12','Pared gruesa (≈1 cm). Se hipertrofia con la sobrecarga de presión (HTA, estenosis aórtica).'],
   ['Aorta','100–140 / 60–90','La presión diastólica aórtica impulsa el flujo coronario.']]}},
  'El **pericardio** es un saco de dos capas con 15–50 mL de líquido. Si se llena rápido (sangre, derrame agudo) comprime las cámaras de baja presión y produce **taponamiento**, aun con volúmenes pequeños.']},
 {h:'Circulación coronaria',b:[
  'Las coronarias nacen en los senos de Valsalva de la raíz aórtica y se llenan sobre todo **en diástole** (el miocardio contraído comprime sus ramas en sístole). Por eso la taquicardia, que acorta la diástole, empeora la isquemia.',
  {table:{h:['Arteria','Territorio','Derivaciones ECG típicas'],r:[
   ['Descendente anterior (DA)','Cara anterior, 2/3 anteriores del septum, ápex','V1–V4 (septal V1–V2, anterior V3–V4)'],
   ['Circunfleja (Cx)','Cara lateral; posterior en dominancia izquierda','I, aVL, V5–V6; posterior: descenso ST V1–V3'],
   ['Coronaria derecha (CD)','Cara inferior, ventrículo derecho, nodo SA (≈60%) y nodo AV (≈80–90%)','II, III, aVF; VD: V4R']]}},
  'La **dominancia** la define qué arteria da la descendente posterior: en la mayoría de las personas es la coronaria derecha (dominancia derecha).',
  {pearl:'Infarto inferior + bradicardia o bloqueo AV → piensa en la coronaria derecha (irriga el nodo AV). Infarto inferior + hipotensión con pulmones limpios → busca infarto de ventrículo derecho (V4R) y evita nitratos.'}]},
 {h:'Sistema de conducción (vista rápida)',b:[
  {flow:['Nodo sinusal (marcapasos, 60–100 lpm)','Aurículas (onda P)','Nodo AV (retraso fisiológico → segmento PR)','Haz de His','Ramas derecha e izquierda (fascículos anterior y posterior)','Fibras de Purkinje → contracción ventricular (QRS)']},
  'Si el nodo sinusal falla, toman el mando marcapasos más lentos: unión AV (40–60 lpm) y ventrículo (20–40 lpm). Esta jerarquía explica los **ritmos de escape**.']}
 ],
 claves:['Dos bombas en serie: la derecha es de baja presión y la izquierda de alta presión.','Estenosis = válvula que no abre; insuficiencia = válvula que no cierra.','Las coronarias se perfunden en diástole.','La coronaria derecha suele irrigar el nodo AV: infarto inferior y bloqueos van de la mano.'],
 preguntas:[{q:'¿Qué arteria se sospecha ante elevación del ST en II, III y aVF?',a:'La coronaria derecha en la mayoría (dominancia derecha); a veces la circunfleja.'},{q:'¿Por qué la taquicardia empeora la isquemia?',a:'Aumenta el consumo de oxígeno y acorta la diástole, que es cuando se llenan las coronarias.'}]},

{id:'ciclo',nivel:1,min:10,titulo:'Ciclo cardiaco y ruidos cardiacos',sub:'Qué pasa en cada fase y por qué se oye lo que se oye',
 resumen:'Cada latido tiene una sístole (contracción y eyección) y una diástole (relajación y llenado). Los ruidos cardiacos son el sonido del cierre valvular; los ruidos extra y los soplos te dicen qué fase está alterada.',
 secciones:[
 {h:'Las cuatro fases del ventrículo izquierdo',b:[
  {table:{h:['Fase','Válvulas','Qué ocurre','Momento'],r:[
   ['1. Contracción isovolumétrica','Mitral y aórtica cerradas','Sube la presión sin cambiar el volumen','Empieza con S1 (cierre mitral/tricúspide)'],
   ['2. Eyección','Aórtica abierta','Sale el volumen latido (≈70 mL)','Pulso arterial'],
   ['3. Relajación isovolumétrica','Ambas cerradas','Cae la presión; fase que depende de energía (ATP)','Empieza con S2 (cierre aórtico/pulmonar)'],
   ['4. Llenado','Mitral abierta','Llenado rápido + contracción auricular (onda a, “patada auricular”)','La patada auricular aporta 15–25% (se pierde en FA)']]}},
  'La **fracción de eyección (FEVI)** = volumen latido / volumen telediastólico. Normal ≥50–55%. Mide la función sistólica, pero no la diastólica: un corazón rígido puede fallar con FEVI normal.']},
 {h:'Ruidos cardiacos',b:[
  {table:{h:['Ruido','Origen','Cuándo es normal / anormal'],r:[
   ['S1','Cierre mitral y tricúspide','Intenso en estenosis mitral y PR corto; débil en PR largo o FEVI baja.'],
   ['S2','Cierre aórtico (A2) y pulmonar (P2)','Desdoblamiento fisiológico en inspiración. Fijo: comunicación interauricular. Paradójico: bloqueo de rama izquierda, estenosis aórtica grave.'],
   ['S3','Llenado rápido contra un ventrículo dilatado','Normal en jóvenes y embarazo; en >40 años sugiere sobrecarga de volumen / IC con FEVI reducida.'],
   ['S4','Aurícula que empuja contra un ventrículo rígido','Siempre anormal: hipertrofia, isquemia, HTA. No existe en fibrilación auricular.']]}},
  {pearl:'S3 = “Ken-TUC-ky” (volumen). S4 = “TEN-nes-see” (rigidez). Se oyen mejor con la campana en el ápex, en decúbito lateral izquierdo.'}]},
 {h:'Pulso venoso yugular (PVY)',b:[
  'Se observa en la yugular interna derecha con la cabecera a 30–45°. Su altura estima la presión de la aurícula derecha: altura sobre el ángulo esternal + 5 cm ≈ PVC en cmH₂O.',
  {ul:['**Onda a** (contracción auricular): gigante en estenosis tricuspídea o hipertensión pulmonar; ondas a “en cañón” en disociación AV (bloqueo completo, TV).','**Onda v** (llenado auricular con tricúspide cerrada): gigante en insuficiencia tricuspídea.','**Signo de Kussmaul**: la PVY sube en inspiración → pericarditis constrictiva, miocardiopatía restrictiva, infarto de VD.']}]}
 ],
 claves:['S1 abre la sístole; S2 abre la diástole.','S3 = volumen; S4 = rigidez.','La FEVI no mide la función diastólica.','Ondas a en cañón = la aurícula se contrae contra una tricúspide cerrada (disociación AV).'],
 preguntas:[{q:'¿Por qué no puede haber S4 en fibrilación auricular?',a:'Porque el S4 lo produce la contracción auricular organizada, que desaparece en la FA.'},{q:'Desdoblamiento fijo de S2: ¿qué sospechas?',a:'Comunicación interauricular.'}]},

{id:'hemodinamia',nivel:1,min:14,titulo:'Hemodinamia: gasto, precarga y poscarga',sub:'Las ecuaciones que explican el choque y la insuficiencia cardiaca',
 resumen:'Presión arterial = gasto cardiaco × resistencias. El gasto depende de frecuencia y volumen latido; el volumen latido depende de precarga, poscarga y contractilidad. Con estas piezas puedes clasificar cualquier choque.',
 secciones:[
 {h:'Ecuaciones esenciales',b:[
  {table:{h:['Concepto','Ecuación / definición','Ejemplo clínico'],r:[
   ['Gasto cardiaco (GC)','GC = FC × volumen latido (normal 4–8 L/min)','La bradicardia extrema reduce el GC aunque el volumen latido sea normal.'],
   ['Presión arterial media (PAM)','PAM ≈ GC × RVS; o PAD + (PAS − PAD)/3','Objetivo habitual en choque: PAM ≥65 mmHg.'],
   ['Precarga','Estiramiento de la fibra al final de la diástole (volumen)','Hipovolemia → baja precarga → bajo GC.'],
   ['Poscarga','Resistencia contra la que eyecta el ventrículo','HTA, estenosis aórtica; vasodilatadores la reducen.'],
   ['Contractilidad','Fuerza intrínseca independiente de la carga','Baja en infarto extenso o miocardiopatía; inotrópicos la aumentan.']]}},
  '**Frank-Starling:** dentro de un rango, más llenado produce más fuerza de contracción. Un ventrículo enfermo tiene una curva aplanada: más volumen ya no aumenta el gasto, solo congestiona.']},
 {h:'Los cuatro tipos de choque',b:[
  'Choque = perfusión tisular insuficiente (lactato alto, oliguria, alteración mental, piel fría o moteada), no solo “presión baja”.',
  {table:{h:['Tipo','Ejemplos','PVC / presión de llenado','Gasto cardiaco','RVS'],r:[
   ['Hipovolémico','Hemorragia, deshidratación','↓','↓','↑'],
   ['Cardiogénico','Infarto extenso, miocarditis, arritmia','↑','↓','↑'],
   ['Obstructivo','TEP masivo, taponamiento, neumotórax a tensión','↑','↓','↑'],
   ['Distributivo','Sepsis, anafilaxia, neurogénico','↓ o normal','↑ o normal (al inicio)','↓']]}},
  {pearl:'Extremidades frías + congestión = “frío y húmedo”: perfil típico del choque cardiogénico. Extremidades calientes + presión baja = distributivo hasta demostrar lo contrario.'}]},
 {h:'Perfiles de Stevenson (insuficiencia cardiaca aguda)',b:[
  {table:{h:['Perfil','Congestión','Perfusión','Abordaje general'],r:[
   ['Caliente y seco','No','Adecuada','Optimizar tratamiento crónico.'],
   ['Caliente y húmedo (el más frecuente)','Sí','Adecuada','Diuréticos de asa ± vasodilatadores.'],
   ['Frío y húmedo','Sí','Baja','Valorar inotrópicos / vasopresores, soporte; descartar causa reversible.'],
   ['Frío y seco','No','Baja','Valorar volumen con cautela; reevaluar.']]}}]}
 ],
 claves:['PA = GC × RVS; GC = FC × volumen latido.','Precarga = volumen; poscarga = resistencia; contractilidad = fuerza intrínseca.','El choque obstructivo y el cardiogénico comparten PVC alta y GC bajo: la ecografía a pie de cama los distingue.'],
 preguntas:[{q:'Paciente hipotenso con PVC alta, pulmones limpios y ruidos apagados. ¿Qué tipo de choque?',a:'Obstructivo; sospecha taponamiento cardiaco (tríada de Beck).'},{q:'¿Por qué la sepsis temprana puede tener gasto alto?',a:'Porque la vasodilatación reduce la poscarga y el corazón compensa con taquicardia; el problema es la RVS baja.'}]},

{id:'electrofisiologia',nivel:1,min:15,titulo:'Electrofisiología celular',sub:'Potencial de acción, canales iónicos y cómo nacen las arritmias',
 resumen:'El ECG es la suma de millones de potenciales de acción. Si entiendes qué canal domina cada fase, entiendes por qué el potasio alto ensancha el QRS, por qué algunos fármacos alargan el QT y cómo actúan los antiarrítmicos.',
 secciones:[
 {h:'Potencial de acción del miocito ventricular',b:[
  {table:{h:['Fase','Corriente principal','Qué representa en el ECG','Fármacos que actúan aquí'],r:[
   ['0 · Despolarización rápida','Entrada de Na⁺ (canal rápido)','Complejo QRS','Clase I (flecainida, lidocaína, procainamida): ensanchan QRS.'],
   ['1 · Repolarización inicial','Salida de K⁺ (Ito)','Punto J','—'],
   ['2 · Meseta','Entrada de Ca²⁺ (tipo L) ≈ salida de K⁺','Segmento ST','Calcioantagonistas (más efecto en nodos).'],
   ['3 · Repolarización','Salida de K⁺ (IKr, IKs)','Onda T','Clase III (amiodarona, sotalol): alargan QT.'],
   ['4 · Reposo','Bomba Na⁺/K⁺; potencial ≈ −90 mV','Línea isoeléctrica','—']]}},
  'En el **nodo sinusal y AV** no hay canal rápido de sodio: la fase 0 depende del **calcio**, y la fase 4 tiene despolarización espontánea (corriente “funny”, If). Por eso los betabloqueadores y calcioantagonistas no dihidropiridínicos frenan los nodos, e ivabradina baja la frecuencia sin afectar la contractilidad.']},
 {h:'Tres mecanismos de arritmia',b:[
  {table:{h:['Mecanismo','Idea','Ejemplos'],r:[
   ['Automatismo anormal','Células que disparan solas por isquemia, catecolaminas o alteraciones electrolíticas','Taquicardia auricular, ritmo idioventricular acelerado'],
   ['Actividad desencadenada','Posdespolarizaciones precoces (QT largo) o tardías (sobrecarga de calcio, digoxina)','Torsades de pointes; arritmias por intoxicación digitálica'],
   ['Reentrada (la más frecuente)','Un circuito con dos vías de conducción distintas y un bloqueo unidireccional','Flutter auricular, TRNAV, TV por cicatriz de infarto, WPW']]}},
  {pearl:'Las taquicardias por reentrada empiezan y terminan de golpe y pueden interrumpirse con adenosina o cardioversión si el circuito pasa por el nodo AV o es eléctricamente estable.'}]},
 {h:'Electrolitos y su huella eléctrica',b:[
  {table:{h:['Alteración','Efecto celular','ECG'],r:[
   ['Hiperpotasemia','Despolariza el reposo e inactiva canales de Na⁺','T picudas → PR largo, P aplanada → QRS ancho → onda sinusoidal → FV/asistolia'],
   ['Hipopotasemia','Retrasa la repolarización','T aplanada, onda U, descenso del ST; riesgo de torsades'],
   ['Hipercalcemia','Acorta la meseta','QT corto'],
   ['Hipocalcemia','Alarga la meseta','QT largo (a expensas del ST)'],
   ['Hipomagnesemia','Facilita posdespolarizaciones','Se asocia a torsades; corregir junto con el K⁺']]}}]}
 ],
 claves:['QRS = fase 0 (sodio); QT = fases 2–3 (calcio y potasio).','Los nodos dependen del calcio: por eso se frenan con betabloqueadores y verapamilo/diltiazem.','Reentrada es el mecanismo más frecuente de taquicardias.'],
 preguntas:[{q:'¿Por qué el gluconato de calcio protege en hiperpotasemia?',a:'Estabiliza la membrana del miocito (restaura el umbral), aunque no baja el potasio.'},{q:'¿Qué fase alargan los fármacos clase III?',a:'La fase 3 (repolarización), alargando el QT.'}]},

{id:'exploracion',nivel:1,min:14,titulo:'Exploración cardiovascular y soplos',sub:'Inspección, pulsos, palpación, auscultación y maniobras',
 resumen:'Una exploración ordenada te da el diagnóstico de sospecha antes de cualquier estudio. Aprende a localizar el soplo, ubicarlo en el ciclo y modificarlo con maniobras.',
 secciones:[
 {h:'Orden práctico',b:[
  {ol:['Inspección general: disnea, cianosis, edema, estigmas (xantelasmas, acropaquias).','Signos vitales completos: PA en ambos brazos si hay dolor torácico (diferencia >20 mmHg sugiere disección).','Pulsos: frecuencia, ritmo, amplitud, simetría y forma.','Pulso venoso yugular y reflujo hepatoyugular.','Palpación del precordio: choque de punta (5.º espacio, línea medioclavicular), frémito, levantamiento paraesternal (VD).','Auscultación en los cuatro focos con diafragma y campana, sentado y en decúbito lateral izquierdo.','Pulmones (estertores, derrame), abdomen (hepatomegalia, ascitis) y extremidades (edema, perfusión, pulsos distales).']}]},
 {h:'Pulsos que orientan',b:[
  {table:{h:['Pulso','Descripción','Sugiere'],r:[
   ['Parvus et tardus','Pequeño y tardío','Estenosis aórtica grave'],
   ['Saltón / en martillo de agua','Amplio y colapsante','Insuficiencia aórtica, estados hiperdinámicos'],
   ['Bisferiens','Dos picos en sístole','Insuficiencia aórtica grave, miocardiopatía hipertrófica'],
   ['Alternante','Un latido fuerte, uno débil','Disfunción ventricular grave'],
   ['Paradójico','Caída de PAS >10 mmHg en inspiración','Taponamiento, asma grave, EPOC']]}}]},
 {h:'Soplos más importantes',b:[
  {table:{h:['Lesión','Momento','Foco / irradiación','Características y maniobras'],r:[
   ['Estenosis aórtica','Sistólico eyectivo (romboidal)','2.º espacio paraesternal derecho → carótidas','S2 débil en grave; pico tardío = más grave.'],
   ['Insuficiencia mitral','Holosistólico','Ápex → axila','Aumenta con handgrip.'],
   ['Miocardiopatía hipertrófica obstructiva','Sistólico eyectivo','Borde esternal izquierdo, no irradia a carótidas','**Aumenta** con Valsalva y al ponerse de pie (menos precarga); disminuye en cuclillas.'],
   ['Prolapso mitral','Clic mesosistólico ± soplo tardío','Ápex','Valsalva/bipedestación adelantan el clic.'],
   ['Insuficiencia aórtica','Diastólico precoz, decreciente','Borde esternal izquierdo, paciente inclinado adelante','Pulso saltón, presión diferencial amplia.'],
   ['Estenosis mitral','Diastólico (retumbo) con chasquido de apertura','Ápex, decúbito lateral, campana','S1 intenso; FA frecuente.'],
   ['Comunicación interventricular','Holosistólico rudo','Borde esternal izquierdo bajo','Frémito frecuente.']]}},
  {pearl:'Casi todos los soplos disminuyen con Valsalva (menos retorno venoso). Las dos excepciones que aumentan: **miocardiopatía hipertrófica obstructiva** y **prolapso mitral** (el clic se adelanta).'},
  {warn:'Soplo nuevo + fiebre = hemocultivos antes de antibióticos y descartar endocarditis infecciosa.'}]}
 ],
 claves:['Mide la PA en ambos brazos ante dolor torácico.','Ubica cada soplo en sístole o diástole antes de ponerle nombre.','Valsalva aumenta solo la MCH obstructiva y adelanta el clic del prolapso mitral.'],
 preguntas:[{q:'Soplo sistólico eyectivo que aumenta al ponerse de pie en un joven con síncope de esfuerzo:',a:'Miocardiopatía hipertrófica obstructiva.'},{q:'¿Qué sugiere un pulso parvus et tardus?',a:'Estenosis aórtica grave.'}]},

{id:'estudios',nivel:1,min:14,titulo:'Biomarcadores e imagen cardiaca',sub:'Troponina, péptidos natriuréticos, radiografía y ecocardiograma',
 resumen:'Cada estudio responde una pregunta concreta: ¿hay daño miocárdico? (troponina), ¿hay sobrecarga de presión/volumen? (BNP), ¿cómo se ve y cómo se contrae el corazón? (ecocardiograma).',
 secciones:[
 {h:'Troponina de alta sensibilidad',b:[
  'Detecta **lesión miocárdica** (valor > percentil 99). **Infarto** = lesión aguda (subida y/o bajada) + evidencia de isquemia (síntomas, ECG, imagen o trombo) según la Cuarta Definición Universal del Infarto.',
  {ul:['Usa algoritmos de 0/1 h o 0/2 h validados para el ensayo de tu hospital; una sola troponina muy baja con dolor de >3 h puede descartar en algunos protocolos.','Lo importante es la **cinética**: un valor estable y crónicamente elevado (ERC, IC crónica) no es igual a una curva que sube.','Causas no coronarias: miocarditis, TEP, sepsis, taquiarritmias, disección, Takotsubo, contusión, ERC, ictus.']},
  {pearl:'“Troponina positiva” no significa “infarto tipo 1”. Pregunta siempre: ¿hay ruptura de placa o es un desequilibrio oferta/demanda (infarto tipo 2) o lesión no isquémica?'}]},
 {h:'Péptidos natriuréticos (BNP / NT-proBNP)',b:[
  'Se liberan por estiramiento ventricular. Son más útiles para **descartar** insuficiencia cardiaca que para confirmarla.',
  {table:{h:['Contexto','BNP: IC poco probable si…','NT-proBNP: IC poco probable si…'],r:[
   ['Disnea aguda (urgencias)','<100 pg/mL','<300 pg/mL'],
   ['Síntomas crónicos (consulta)','<35 pg/mL','<125 pg/mL']]}},
  'Se elevan con la edad, la ERC y la FA; están bajos en obesidad. ARNI (sacubitrilo) eleva el BNP pero no el NT-proBNP.']},
 {h:'Imagen',b:[
  {table:{h:['Estudio','Pregunta que responde','Notas'],r:[
   ['Radiografía de tórax','¿Congestión, cardiomegalia, mediastino ancho, neumotórax?','Índice cardiotorácico >0,5 (PA) sugiere cardiomegalia.'],
   ['Ecocardiograma transtorácico','FEVI, motilidad segmentaria, válvulas, derrame, VD, presiones estimadas','Estudio clave en IC, soplos, síncope y dolor torácico con inestabilidad.'],
   ['Ecocardiograma transesofágico','Trombo en orejuela, vegetaciones, disección, prótesis','Más sensible para endocarditis protésica y orejuela.'],
   ['Prueba de esfuerzo / eco o SPECT de estrés','¿Isquemia inducible?','Útil en dolor torácico estable y estratificación.'],
   ['Angio-TC coronaria','¿Hay placa o estenosis coronaria?','Excelente valor predictivo negativo en riesgo bajo-intermedio.'],
   ['Resonancia magnética cardiaca','Caracteriza tejido: miocarditis, amiloidosis, fibrosis, viabilidad','Realce tardío de gadolinio.'],
   ['Coronariografía','Anatomía coronaria e intervención (ICP)','Invasiva; diagnóstico y tratamiento a la vez.']]}},
  {table:{h:['Clasificación por FEVI','Rango'],r:[['IC con FEVI reducida (ICFEr)','≤40%'],['IC con FEVI levemente reducida (ICFElr)','41–49%'],['IC con FEVI preservada (ICFEp)','≥50%'],['IC con FEVI mejorada','Previa ≤40% que mejora >40% (y ≥10 puntos)']]}}]}
 ],
 claves:['Troponina = lesión; infarto = lesión + isquemia.','BNP/NT-proBNP normales hacen improbable la IC.','El ecocardiograma es el estudio de imagen inicial en casi toda la cardiología clínica.'],
 preguntas:[{q:'Paciente con ERC y troponina estable discretamente elevada sin cambios en 2 h. ¿Infarto agudo?',a:'Probablemente no: es lesión crónica sin cinética aguda; integrar con la clínica.'},{q:'¿Qué péptido no se altera por sacubitrilo?',a:'El NT-proBNP.'}]},

{id:'riesgo',nivel:1,min:10,titulo:'Factores de riesgo y prevención',sub:'Lo que causa la mayoría de la enfermedad cardiovascular',
 resumen:'La aterosclerosis se construye durante décadas con factores modificables. La prevención consiste en estimar el riesgo global y actuar sobre cada factor con metas concretas.',
 secciones:[
 {h:'Factores de riesgo',b:[
  {table:{h:['Modificables','No modificables','Potenciadores del riesgo'],r:[
   ['Hipertensión, colesterol LDL, tabaquismo, diabetes, obesidad, sedentarismo, dieta, ERC','Edad, sexo masculino, antecedentes familiares de cardiopatía prematura','Lp(a) elevada, enfermedades inflamatorias, VIH, preeclampsia o menopausia precoz, calcio coronario elevado']]}},
  'Life’s Essential 8 (AHA) resume la salud cardiovascular: dieta, actividad física, nicotina, sueño, peso, lípidos, glucosa y presión arterial.']},
 {h:'Estimar el riesgo',b:[
  'Usa una calculadora validada en tu población: **PREVENT** (AHA, 2023; adoptada en la guía de HTA 2025) o **SCORE2/SCORE2-OP** (ESC). Estas herramientas estiman riesgo a 10 años y orientan cuándo iniciar estatina o fármacos antihipertensivos.',
  {warn:'Las calculadoras no se usan en quien ya tiene enfermedad aterosclerótica, diabetes con daño de órgano, ERC moderada-grave o LDL ≥190 mg/dL: ya son de riesgo alto o muy alto.'}]},
 {h:'Metas que vale la pena memorizar',b:[
  {table:{h:['Factor','Meta general'],r:[
   ['Presión arterial','<130/80 mmHg en la mayoría (AHA/ACC 2025); ESC 2024 propone PAS 120–129 si se tolera'],
   ['LDL — riesgo muy alto (p. ej., tras infarto)','<55 mg/dL y reducción ≥50% (ESC); AHA/ACC usa umbrales de 55–70 mg/dL para intensificar'],
   ['Tabaco','Abstinencia total; ofrecer farmacoterapia (vareniclina, TRN)'],
   ['Actividad física','150–300 min/semana moderada o 75–150 min vigorosa'],
   ['Diabetes','HbA1c individualizada; preferir iSGLT2 o arGLP-1 con beneficio cardiovascular demostrado']]}}]}
 ],
 claves:['Riesgo global, no factores aislados.','Quien ya tuvo un evento no necesita calculadora: es de riesgo muy alto.','LDL más bajo durante más tiempo = menos eventos.'],
 preguntas:[{q:'¿Se calcula el riesgo a 10 años en un paciente con infarto previo?',a:'No: ya pertenece a prevención secundaria (riesgo muy alto).'}]},

{id:'sintomas',nivel:1,min:12,titulo:'Síntomas cardinales: cómo abordarlos',sub:'Dolor torácico, disnea, palpitaciones, síncope y edema',
 resumen:'Ante cualquier síntoma cardiovascular, primero descarta lo que mata en minutos y después ordena el diagnóstico diferencial.',
 secciones:[
 {h:'Dolor torácico: los que no puedes pasar por alto',b:[
  {table:{h:['Diagnóstico','Pistas','Primer estudio'],r:[
   ['Síndrome coronario agudo','Opresivo, irradiado, con esfuerzo o en reposo, diaforesis, factores de riesgo','ECG en ≤10 min + troponina'],
   ['Disección aórtica','Desgarrante, máximo al inicio, irradia a espalda; pulsos o PA asimétricos; déficit neurológico','Angio-TC de aorta (o ETE/eco si inestable)'],
   ['Tromboembolia pulmonar','Disnea súbita, pleurítico, taquicardia, factores de riesgo de trombosis','Wells/Ginebra → dímero D o angio-TC'],
   ['Neumotórax a tensión','Disnea, hipotensión, hipoventilación unilateral, desviación traqueal','Diagnóstico clínico: descompresión inmediata'],
   ['Taponamiento cardiaco','Hipotensión, PVY alta, ruidos apagados, pulso paradójico','Ecocardiograma a pie de cama'],
   ['Rotura esofágica (Boerhaave)','Tras vómitos intensos; enfisema subcutáneo','TC con contraste oral hidrosoluble']]}},
  {pearl:'El dolor que se reproduce a la palpación no excluye por sí solo un SCA. El ECG es obligatorio en todo dolor torácico no traumático.'}]},
 {h:'Síncope',b:[
  'Pérdida transitoria de conciencia por hipoperfusión cerebral global, de inicio rápido, corta duración y recuperación espontánea completa.',
  {ul:['**Reflejo (vasovagal)**: el más frecuente; desencadenante claro, pródromo (náusea, calor, sudoración).','**Ortostático**: al ponerse de pie; deshidratación, fármacos, disautonomía.','**Cardiaco** (el más peligroso): en esfuerzo o en decúbito, palpitaciones previas, cardiopatía estructural, antecedente familiar de muerte súbita, ECG anormal.']},
  {warn:'Síncope durante el ejercicio = cardiaco hasta demostrar lo contrario (estenosis aórtica, MCH, arritmia).'}]},
 {h:'Disnea, palpitaciones y edema',b:[
  {ul:['**Disnea cardiaca**: ortopnea, disnea paroxística nocturna, edema, S3, BNP elevado.','**Palpitaciones**: documenta el ritmo durante el síntoma (ECG, Holter, monitor de eventos). Inicio y fin bruscos sugieren reentrada.','**Edema** bilateral: IC, ERC/nefrótico, cirrosis, fármacos (amlodipino), insuficiencia venosa. Unilateral: descartar TVP.']}]}
 ],
 claves:['Dolor torácico: ECG en ≤10 minutos.','Seis diagnósticos letales: SCA, disección, TEP, neumotórax a tensión, taponamiento y rotura esofágica.','Síncope de esfuerzo o con palpitaciones = estudio cardiológico urgente.'],
 preguntas:[{q:'Dolor torácico desgarrante con diferencia de PA de 30 mmHg entre brazos. ¿Primer diagnóstico a descartar?',a:'Disección aórtica.'},{q:'¿Qué datos sugieren síncope cardiaco?',a:'Esfuerzo o decúbito, palpitaciones previas, cardiopatía estructural, ECG anormal, historia familiar de muerte súbita.'}]}
];
