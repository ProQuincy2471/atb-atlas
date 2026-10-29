/* CARDIORA — Nivel 3 · Soporte vital (BLS/ACLS del adulto).
   Basado en las Guías AHA de RCP y ACE 2025 (Circulation, oct. 2025) y sus algoritmos. Educativo: no sustituye un curso certificado. */
window.CARDIO=window.CARDIO||{};
CARDIO.acls=[
{id:'bls',nivel:3,min:10,titulo:'Soporte vital básico y RCP de alta calidad',sub:'Lo que más salva vidas en un paro',
 resumen:'La supervivencia depende sobre todo de reconocer el paro rápido, comprimir bien y desfibrilar pronto. Los fármacos vienen después.',
 secciones:[
 {h:'Reconocer y actuar (adulto, entorno hospitalario o extrahospitalario)',b:[
  {ol:['Seguridad de la escena.','¿Responde? Si no, pide ayuda y que traigan un DEA/desfibrilador; activa el sistema de emergencias.','Comprueba respiración y pulso **a la vez, ≤10 segundos**. Las respiraciones agónicas (jadeos) **no** son respiración normal.','Sin pulso: inicia compresiones de inmediato (30:2).','Coloca el DEA en cuanto llegue y sigue sus instrucciones; reanuda compresiones inmediatamente después de cada descarga.','Con pulso pero sin respiración normal: 1 ventilación cada 6 s; comprueba pulso cada 2 min. Si sospechas opioides, administra naloxona.']}]},
 {h:'Métricas de una RCP de alta calidad',b:[
  {table:{h:['Parámetro','Objetivo'],r:[
   ['Frecuencia','100–120 compresiones/min'],
   ['Profundidad','5–6 cm (adulto)'],
   ['Reexpansión','Completa entre compresiones (no apoyarse)'],
   ['Interrupciones','Mínimas: fracción de compresión >60% (ideal ≥80%); pausas <10 s'],
   ['Ventilación sin vía aérea avanzada','30:2, cada ventilación ≈1 s con elevación visible del tórax'],
   ['Ventilación con vía aérea avanzada','1 ventilación cada 6 s (10/min) con compresiones continuas'],
   ['Relevo del compresor','Cada 2 min o antes si hay fatiga'],
   ['Capnografía (ETCO₂)','<10 mmHg → mejorar la calidad de la RCP; un aumento brusco y sostenido (≥35–40 mmHg) sugiere RCE']]}},
  {pearl:'Hiperventilar es dañino: aumenta la presión intratorácica y reduce el retorno venoso y el flujo coronario.'}]}
 ],
 claves:['Pulso y respiración a la vez, ≤10 s.','Comprime fuerte (5–6 cm) y rápido (100–120/min).','Descarga lo antes posible en ritmos desfibrilables.']},

{id:'paro',nivel:3,min:15,titulo:'Algoritmo de paro cardiaco del adulto',sub:'Ritmos desfibrilables y no desfibrilables',
 resumen:'Todo paro se divide en dos caminos según el ritmo: FV/TV sin pulso (se desfibrila) o asistolia/AESP (no se desfibrila). En ambos: RCP de alta calidad en ciclos de 2 minutos, epinefrina y búsqueda de causas reversibles.',
 secciones:[
 {h:'Ritmos desfibrilables: FV y TV sin pulso',b:[
  {ecg:'vf',cap:'Fibrilación ventricular: actividad caótica sin complejos identificables.'},
  {flow:['Descarga 1 → RCP 2 min inmediatamente · acceso IV (preferente) o IO','Analiza ritmo → si sigue desfibrilable: descarga 2 → RCP 2 min · **epinefrina 1 mg cada 3–5 min** · considera vía aérea avanzada y capnografía','Analiza → descarga 3 → RCP 2 min · **amiodarona 300 mg** (o lidocaína 1–1,5 mg/kg) · trata causas reversibles','Ciclos posteriores: amiodarona 150 mg (2.ª dosis) o lidocaína 0,5–0,75 mg/kg; epinefrina cada 3–5 min']},
  {pearl:'No compruebes el pulso justo después de la descarga: reanuda compresiones de inmediato y revisa ritmo al final de los 2 minutos.'},
  {warn:'FV refractaria: la desfibrilación secuencial doble o el cambio de vector (anteroposterior) tienen evidencia limitada; aplícalos solo según protocolo local y equipo entrenado.'}]},
 {h:'Ritmos no desfibrilables: asistolia y AESP',b:[
  {ecg:'asystole',cap:'Asistolia: confirma en otra derivación y con la ganancia adecuada.'},
  {flow:['RCP 2 min · acceso IV/IO','**Epinefrina 1 mg lo antes posible**, luego cada 3–5 min','Vía aérea avanzada y capnografía','Analiza el ritmo cada 2 min: si aparece un ritmo desfibrilable, cambia al otro brazo del algoritmo','Busca y trata activamente las H y las T']},
  'La **AESP** (actividad eléctrica sin pulso) es cualquier ritmo organizado sin pulso palpable: no se diagnostica en el monitor, sino al tocar el pulso. Un QRS estrecho sugiere causa mecánica (taponamiento, neumotórax, TEP, hipovolemia); un QRS ancho sugiere causa metabólica (hiperpotasemia, toxinas como bloqueadores de sodio).']},
 {h:'¿Cuándo hay retorno de la circulación espontánea (RCE)?',b:[
  {ul:['Pulso y presión arterial palpables o medibles.','Aumento brusco y sostenido del ETCO₂ (habitualmente ≥35–40 mmHg).','Ondas de presión arterial espontáneas en la línea arterial.']},
  'Con RCE, pasa al algoritmo de cuidados post-paro.']}
 ],
 claves:['Desfibrilable: descarga + RCP; epinefrina tras la 2.ª descarga; amiodarona tras la 3.ª.','No desfibrilable: epinefrina lo antes posible.','Ciclos de 2 min; mínimas pausas.']},

{id:'hyt',nivel:3,min:8,titulo:'Causas reversibles: las H y las T',sub:'Lo que debes buscar en cada ciclo',
 resumen:'Un paro que no responde suele tener una causa tratable. Revisa esta lista en voz alta con el equipo durante la RCP y usa la ecografía a pie de cama sin interrumpir las compresiones.',
 secciones:[{h:'Lista y tratamiento',b:[
  {table:{h:['Causa','Pistas','Tratamiento'],r:[
   ['Hipovolemia','Hemorragia, trauma, AESP de QRS estrecho y rápido','Volumen/hemoderivados; control de la hemorragia'],
   ['Hipoxia','Paro respiratorio, obstrucción de la vía aérea','Oxígeno al 100%, vía aérea, ventilación eficaz'],
   ['Hidrogeniones (acidosis)','Acidosis previa, ERC, sepsis','Ventilación adecuada; bicarbonato solo en situaciones específicas (hiperpotasemia, tóxicos)'],
   ['Hipo/hiperpotasemia','ERC, diálisis, ECG previo con T picudas o QRS ancho','Hiperpotasemia: calcio IV, bicarbonato, insulina/glucosa; hipopotasemia: potasio y magnesio'],
   ['Hipotermia','Exposición, ahogamiento','Recalentamiento activo; RCP prolongada'],
   ['Neumotórax a tensión (Tensión)','Trauma, ventilación mecánica, ausencia de murmullo unilateral','Descompresión con aguja/toracostomía'],
   ['Taponamiento','Trauma penetrante, posquirúrgico cardiaco, derrame conocido','Pericardiocentesis o toracotomía según contexto'],
   ['Tóxicos','Antecedente de ingesta, toxíndrome','Antídotos específicos (naloxona, bicarbonato en antidepresivos tricíclicos, lípidos en anestésicos locales); centro toxicológico'],
   ['Trombosis pulmonar','TVP, inmovilización, VD dilatado en eco','Considerar fibrinólisis; si se administra, prolongar la RCP 60–90 min'],
   ['Trombosis coronaria','Dolor torácico previo, FV recurrente','Coronariografía urgente tras RCE (o durante RCP con soporte mecánico en centros con ECMO)']]}},
  {pearl:'Ecografía en el paro: mira durante la comprobación de pulso (<10 s), graba el clip y revísalo mientras se reanudan las compresiones.'}]}],
 claves:['5 H + 5 T.','QRS estrecho → causa mecánica; QRS ancho → metabólica.']},

{id:'bradicardia',nivel:3,min:10,titulo:'Bradicardia con pulso',sub:'Tratar al paciente, no al número',
 resumen:'Una frecuencia baja solo se trata de urgencia si causa hipoperfusión. Identifica primero si la bradicardia explica los síntomas.',
 secciones:[{h:'Algoritmo',b:[
  {flow:['Evalúa: vía aérea, oxígeno si SpO₂ <90–92%, monitor, PA, ECG de 12 derivaciones, acceso IV; busca causas (hipoxia, fármacos, isquemia, potasio)','¿Hipoperfusión? Hipotensión, alteración del estado mental, signos de choque, dolor isquémico o IC aguda','Sí → **atropina 1 mg IV**; repetir cada 3–5 min (máximo 3 mg)','Si la atropina no funciona o no es probable que funcione: **marcapasos transcutáneo** y/o **dopamina 5–20 µg/kg/min** o **epinefrina 2–10 µg/min**','Consulta experta; marcapasos transvenoso']},
  {warn:'La atropina suele fallar en bloqueos infranodales (Mobitz II, bloqueo completo con QRS ancho) y en el corazón trasplantado: no retrases el marcapasos.'},
  {ecg:'avb3',cap:'Bloqueo AV completo: P y QRS disociados, escape ventricular ancho y lento.'},
  {pearl:'Con marcapasos transcutáneo, confirma la captura eléctrica (QRS ancho tras cada espiga) **y** mecánica (pulso femoral), y administra analgesia/sedación.'}]}],
 claves:['Atropina 1 mg c/3–5 min, máx. 3 mg.','Marcapasos transcutáneo o infusión de dopamina/epinefrina si no responde.']},

{id:'taquicardia',nivel:3,min:12,titulo:'Taquicardia con pulso',sub:'Estable o inestable; QRS estrecho o ancho',
 resumen:'La pregunta clave es si el paciente está inestable por la taquicardia. Si lo está, cardioversión sincronizada. Si no, define el QRS y la regularidad.',
 secciones:[
 {h:'Paso 1: ¿inestable?',b:[
  'Hipotensión, alteración del estado mental, signos de choque, dolor isquémico o IC aguda atribuibles a la taquicardia (habitualmente ≥150 lpm) → **cardioversión eléctrica sincronizada** (sedación si es posible; no retrasarla).']},
 {h:'Paso 2: estable — QRS estrecho (<0,12 s)',b:[
  {flow:['Regular → maniobras vagales (Valsalva modificada: soplar 15 s y luego elevar las piernas en decúbito)','**Adenosina 6 mg** IV rápida en vena proximal + bolo de 20 mL de suero; si no responde, **12 mg**','Si no revierte o recurre: betabloqueador o calcioantagonista no dihidropiridínico (diltiazem, verapamilo)','Irregular → probablemente FA: control de frecuencia y anticoagulación según riesgo']},
  {ecg:'svt',cap:'TSV: QRS estrecho, regular, rápido, sin ondas P visibles.'}]},
 {h:'Paso 3: estable — QRS ancho (≥0,12 s)',b:[
  {ul:['Trata como TV si hay duda, sobre todo si hay cardiopatía estructural.','Adenosina solo si es **regular y monomorfa** (puede servir para diagnóstico).','Antiarrítmico IV con consulta experta: **procainamida** 20–50 mg/min (evitar con QT largo o IC), **amiodarona** 150 mg en 10 min (repetible; luego 1 mg/min las primeras 6 h) o **sotalol** 100 mg (1,5 mg/kg) en 5 min (evitar con QT largo).','Irregular y ancha: FA con bloqueo de rama, FA preexcitada (WPW: **no** bloqueadores del nodo AV) o TV polimórfica (magnesio, desfibrilación si inestable).']},
  {ecg:'vt',cap:'TV monomórfica: QRS ancho, regular y rápido.'}]}
 ],
 claves:['Inestable = cardioversión sincronizada.','Estrecha y regular = vagales → adenosina 6 → 12 mg.','Ancha y regular estable = antiarrítmico IV y experto.']},

{id:'postparo',nivel:3,min:10,titulo:'Cuidados tras el retorno de la circulación',sub:'Las primeras horas deciden el pronóstico neurológico',
 resumen:'Tras la RCE, el objetivo es evitar una segunda lesión: optimizar ventilación, oxigenación y presión, identificar la causa y proteger el cerebro.',
 secciones:[{h:'Metas iniciales',b:[
  {table:{h:['Dominio','Meta'],r:[
   ['Vía aérea','Asegurar; capnografía continua para confirmar el tubo'],
   ['Oxigenación','SpO₂ 92–98%; evitar hipoxemia e hiperoxia'],
   ['Ventilación','PaCO₂ 35–45 mmHg (normocapnia)'],
   ['Hemodinamia','Evitar PAS <90 mmHg y PAM <65 mmHg; volumen, vasopresores e inotrópicos según perfil'],
   ['ECG de 12 derivaciones','Inmediato: IAMCEST o sospecha de oclusión coronaria → coronariografía urgente'],
   ['Control de temperatura','En pacientes que no obedecen órdenes: control deliberado entre 32 y 37,5 °C y prevención activa de la fiebre (la guía AHA 2025 propone mantenerlo al menos 36 h; verificar en tu protocolo)'],
   ['Glucosa','Evitar hipo e hiperglucemia'],
   ['Neuropronóstico','Multimodal y no antes de 72 h tras normotermia; evitar decisiones precoces']]}},
  {warn:'No retires el soporte vital por hallazgos neurológicos tempranos aislados: el pronóstico se integra con varias pruebas y tiempo suficiente.'}]}],
 claves:['SpO₂ 92–98%, PaCO₂ 35–45, PAM ≥65.','ECG inmediato tras RCE.','Control de temperatura y evitar fiebre.']},

{id:'sca-acv',nivel:3,min:10,titulo:'SCA e ictus: las primeras decisiones',sub:'Los dos códigos de tiempo',
 resumen:'En el síndrome coronario agudo y en el ictus, cada minuto cuenta. La primera hora consiste en reconocer, documentar el tiempo de inicio y activar la reperfusión.',
 secciones:[
 {h:'Síndrome coronario agudo',b:[
  {ol:['ECG de 12 derivaciones en ≤10 min desde la llegada.','Ácido acetilsalicílico 162–325 mg masticado (si no hay alergia ni hemorragia activa).','Oxígeno solo si SpO₂ <90%.','Nitroglicerina para el dolor si no hay hipotensión, infarto de VD ni uso reciente de inhibidores de fosfodiesterasa-5.','IAMCEST: ICP primaria en ≤90 min desde el primer contacto médico (≤120 min si hay traslado); si no es posible, fibrinólisis en ≤30 min desde la llegada si no hay contraindicaciones.']}]},
 {h:'Ictus agudo',b:[
  {ol:['Hora de última vez visto sano (dato más importante).','Glucosa capilar: la hipoglucemia imita un ictus.','Escala prehospitalaria y aviso al centro de ictus.','TC/RM cerebral inmediata (puerta-imagen ≤20–25 min).','Trombólisis IV (alteplasa o tenecteplasa) en ventana ≤4,5 h si es elegible; trombectomía en oclusión de vaso grande hasta 24 h en pacientes seleccionados.']},
  {warn:'No bajes la PA agresivamente en ictus isquémico salvo que vayas a trombolizar (meta <185/110 antes y <180/105 después).'}]}
 ],
 claves:['SCA: ECG ≤10 min; AAS; reperfusión con metas de tiempo.','Ictus: última vez visto sano y glucosa.']}
];

CARDIO.aclsFarmacos=[
 ['Epinefrina','Paro: 1 mg IV/IO cada 3–5 min. Bradicardia: 2–10 µg/min en infusión','Desfibrilable: tras la 2.ª descarga. No desfibrilable: lo antes posible.'],
 ['Amiodarona','Paro FV/TVSP: 300 mg en bolo; 2.ª dosis 150 mg. Taquicardia estable: 150 mg en 10 min, luego 1 mg/min (6 h)','Hipotensión, bradicardia; alarga QT.'],
 ['Lidocaína','Paro: 1–1,5 mg/kg; luego 0,5–0,75 mg/kg (máx. 3 mg/kg)','Alternativa a amiodarona en FV/TVSP.'],
 ['Atropina','Bradicardia: 1 mg IV cada 3–5 min (máx. 3 mg)','No se usa de rutina en asistolia/AESP.'],
 ['Adenosina','6 mg IV rápido + bolo de suero; 2.ª dosis 12 mg','Vena proximal; avisar al paciente (sensación de muerte inminente). Reducir dosis con dipiridamol, trasplante o acceso central; precaución en asma.'],
 ['Dopamina','5–20 µg/kg/min','Bradicardia inestable o hipotensión post-RCE.'],
 ['Norepinefrina','0,1–0,5 µg/kg/min (titular)','Vasopresor de elección en la mayoría de los choques post-RCE.'],
 ['Procainamida','20–50 mg/min hasta suprimir arritmia, hipotensión, QRS +50% o máx. 17 mg/kg','Evitar con QT largo o IC.'],
 ['Sulfato de magnesio','1–2 g IV (diluido)','Torsades de pointes; hipomagnesemia.'],
 ['Gluconato/cloruro de calcio','Gluconato 10% 15–30 mL o cloruro 10% 5–10 mL IV','Hiperpotasemia, hipocalcemia, intoxicación por calcioantagonistas.']
];
CARDIO.aclsEnergias=[
 ['FV / TV sin pulso','Desfibrilación (no sincronizada)','Bifásica: dosis del fabricante (120–200 J); si se desconoce, la máxima. Monofásica: 360 J'],
 ['QRS estrecho regular (TSV, flutter)','Sincronizada','50–100 J'],
 ['QRS estrecho irregular (FA)','Sincronizada','Bifásica 120–200 J (según equipo)'],
 ['QRS ancho regular (TV monomórfica con pulso)','Sincronizada','100 J, escalar si no responde'],
 ['QRS ancho irregular / TV polimórfica','Desfibrilación (no sincronizada)','Dosis de desfibrilación']
];
