/* INFEORA — Fármacos esenciales antiinfecciosos: pauta de uso.
   Referencia consultada: Médecins Sans Frontières, «Essential drugs – Practical guide intended for physicians,
   pharmacists, nurses and medical auxiliaries» (exportación 28/04/2026). © MSF, todos los derechos reservados.
   Este archivo NO reproduce ni traduce el libro: es una síntesis original en español. Las dosis, intervalos y duraciones
   se usan como datos verificables y cada ficha cita la página consultada para que el lector compruebe la fuente.
   Las pautas pediátricas por banda de peso del libro no se transcriben; se resumen como mg/kg con su máximo.
   Contenido educativo: no sustituye la guía local, el antibiograma, la evaluación del huésped ni la ficha técnica. */
window.ATLAS25=window.ATLAS25||{};window.ATLAS25.essential=window.ATLAS25.essential||{};
(function(){
const E=window.ATLAS25.essential;
const SRC=p=>'MSF Essential drugs (ed. 2026), p. '+p;
// d: [escenario, niño, adulto]
const dose=(t,ni,ad)=>({t,ni:ni||'',ad:ad||''});

E['amoxicilina']={nombre:'Amoxicilina',via:'Oral',pag:'37–39',act:'abril 2024',src:SRC('37–39'),clase:'Penicilina (aminopenicilina)',
 ind:['Otitis media aguda, faringoamigdalitis estreptocócica, sinusitis, bronquitis y neumonía sin signos de gravedad','Erradicación de Helicobacter pylori (con omeprazol y claritromicina)','Leptospirosis y carbunco cutáneo no complicado','Fiebre tifoidea no complicada solo si la cepa es sensible en un estudio reciente','Paso a vía oral tras penicilinas o cefalosporinas parenterales'],
 dosis:[dose('Dosis habitual (faringoamigdalitis, leptospirosis, H. pylori)','25 mg/kg cada 12 h (máx. 1 g por toma)','1 g cada 12 h'),
  dose('Dosis alta (neumonía, fiebre tifoidea, neumococo resistente, carbunco cutáneo)','30 mg/kg cada 8 h (máx. 1 g por toma)','1 g cada 8 h')],
 dur:['Otitis media, bronquitis, neumonía: 5 días','Faringoamigdalitis: 6 días','Leptospirosis, H. pylori: 7 días','Sinusitis: 7–10 días','Carbunco cutáneo: 7–14 días según gravedad','Fiebre tifoidea: 14 días'],
 ci:['Alergia a penicilinas','Mononucleosis infecciosa (exantema)'],
 prec:['Precaución si hay alergia a cefalosporinas: posible reacción cruzada'],
 ea:['Molestias digestivas','Reacciones alérgicas, en ocasiones graves: suspender de inmediato'],
 inter:['No combinar con metotrexato'],
 renal:'Reducir la dosis en insuficiencia renal grave.',emb:'Sin contraindicación.',lact:'Sin contraindicación.',
 notas:['El libro ofrece la dosis también por bandas de peso para suspensión de 125 mg/5 ml y comprimidos de 250 y 500 mg.']};

E['amoxi-clav']={nombre:'Amoxicilina / ácido clavulánico',via:'Oral e inyectable',pag:'40–42 (oral) · 346–347 (inyectable)',act:'',src:SRC('40–42, 346–347'),clase:'Penicilina con inhibidor de betalactamasas',
 ind:['Mordeduras de animales cuando está indicada la profilaxis o el tratamiento','Segunda línea de otitis media aguda y sinusitis bacteriana tras fracaso de amoxicilina a dosis alta','Cistitis aguda no complicada en niñas mayores de 2 años','Infección genital alta posparto','Paso a vía oral en infecciones graves (p. ej. neumonía grave)'],
 dosis:[dose('Dosis estándar (expresada en amoxicilina): mordeduras, otitis, sinusitis','25 mg/kg cada 12 h si pesa < 40 kg','Proporción 8:1: 1 g cada 12 h (2 comp. de 500/62,5 mg) · proporción 7:1: 875/125 mg cada 12 h'),
  dose('Cistitis aguda no complicada en niñas > 2 años','12,5 mg/kg cada 12 h',''),
  dose('Infección genital alta posparto · paso a oral en infección grave','50 mg/kg cada 12 h si pesa < 40 kg','Proporción 8:1: 1 g cada 8 h · proporción 7:1: 875/125 mg cada 8 h'),
  dose('IV · erisipela y celulitis','< 3 meses: 30 mg/kg cada 12 h · ≥ 3 meses: 20–30 mg/kg cada 8 h (máx. 3 g/día)','1 g cada 8 h'),
  dose('IV · infecciones necrosantes de piel y partes blandas (con clindamicina)','< 3 meses: 50 mg/kg cada 12 h · ≥ 3 meses y < 40 kg: 50 mg/kg cada 8 h (máx. 6 g/día)','2 g cada 8 h'),
  dose('IV · infección genital alta posparto grave (con gentamicina)','','1 g cada 8 h')],
 dur:['Mordeduras: 5–7 días','Otitis media: 5 días','Sinusitis: 7–10 días','Cistitis: 3 días','Infección genital alta: 7 días','Neumonía grave tras vía parenteral: completar 10–14 días en total','IV: erisipela y celulitis 7–10 días; infecciones necrosantes 14 días; pasar a vía oral en cuanto sea posible'],
 ci:['Alergia a penicilinas','Antecedente de hepatopatía durante un tratamiento previo con amoxicilina-clavulánico','Mononucleosis infecciosa (forma inyectable)'],
 prec:['Precaución si hay alergia a cefalosporinas o insuficiencia hepática','El ácido clavulánico no debe superar 12,5 mg/kg/día ni 375 mg/día: por eso la dosis depende de la proporción del preparado (8:1, 7:1 o 4:1)','Con preparados 4:1, el máximo es 50 mg/kg/día de amoxicilina sin pasar de 1 500 mg/día','Tomar con alimentos','IV: inyección lenta en 3 min o infusión de 30 min; no diluir en glucosa ni mezclar con otros fármacos; usar la solución de inmediato'],
 ea:['Diarrea y otras molestias digestivas','Reacciones alérgicas, a veces graves','Ictericia y hepatitis colestásica en tratamientos prolongados (> 10–15 días)'],
 inter:['No combinar con metotrexato (aumenta su toxicidad)'],
 renal:'En insuficiencia renal grave, reducir dosis y administrar cada 12 o 24 h.',emb:'Sin contraindicación.',lact:'Sin contraindicación.',notas:[]};

E['azitromicina']={nombre:'Azitromicina',via:'Oral e inyectable',pag:'51–53 (oral) · 364–365 (inyectable)',act:'junio 2025',src:SRC('51–53, 364–365'),clase:'Macrólido',
 ind:['Tracoma y conjuntivitis por Chlamydia trachomatis','Cervicitis y uretritis por C. trachomatis (junto con tratamiento de gonorrea), donovanosis, chancroide y sífilis temprana','Cólera (cepa sensible), fiebre tifoidea, pian, leptospirosis y fiebres recurrentes','Tos ferina, difteria y neumonía por Mycoplasma o Chlamydophila pneumoniae','Segunda línea de shigelosis','Faringoamigdalitis estreptocócica y otitis media solo en alérgicos a penicilina'],
 dosis:[dose('Tracoma, cólera, cervicitis/uretritis por clamidia, chancroide, sífilis temprana','20 mg/kg (máx. 1 g) dosis única','1 g dosis única (2 g dosis única en sífilis temprana)'),
  dose('Pian','30 mg/kg (máx. 2 g) dosis única','30 mg/kg (máx. 2 g) dosis única'),
  dose('Conjuntivitis por C. trachomatis','20 mg/kg (máx. 1 g) cada 24 h × 3 días','1 g cada 24 h × 3 días'),
  dose('Fiebre tifoidea','10–20 mg/kg (máx. 1 g) cada 24 h × 7 días','500 mg–1 g cada 24 h × 7 días, o 1 g el día 1 y 500 mg/día del 2 al 7'),
  dose('Donovanosis','','1 g el día 1, luego 500 mg/día hasta la cicatrización'),
  dose('Tos ferina','< 6 meses: 10 mg/kg/día × 5 días · ≥ 6 meses: 10 mg/kg (máx. 500 mg) día 1 y 5 mg/kg (máx. 250 mg) días 2–5','500 mg día 1 y 250 mg/día días 2–5'),
  dose('Neumonía por M. pneumoniae o C. pneumoniae','10 mg/kg (máx. 500 mg) cada 24 h × 5 días','500 mg día 1 y 250 mg/día días 2–5'),
  dose('Leptospirosis','10 mg/kg (máx. 500 mg) día 1 y 5 mg/kg (máx. 250 mg) días 2–3','1 g día 1 y 500 mg/día días 2–3'),
  dose('Shigelosis (segunda línea)','12 mg/kg (máx. 500 mg) día 1 y 6 mg/kg (máx. 250 mg) días 2–5','500 mg día 1 y 250 mg/día días 2–5'),
  dose('Difteria','10–12 mg/kg (máx. 500 mg) cada 24 h × 14 días','500 mg cada 24 h × 14 días'),
  dose('Fiebres recurrentes','10 mg/kg (máx. 500 mg): dosis única si es transmitida por piojos; cada 24 h × 7–10 días si es por garrapatas','500 mg: dosis única (piojos) o cada 24 h × 7–10 días (garrapatas)'),
  dose('Faringoamigdalitis estreptocócica en alérgicos a penicilina','20 mg/kg (máx. 500 mg) cada 24 h × 3 días','500 mg cada 24 h × 3 días'),
  dose('Otitis media aguda en alérgicos a penicilina','10 mg/kg (máx. 500 mg) cada 24 h × 3 días',''),
  dose('IV · sepsis cuando no es posible la vía oral','10–20 mg/kg (máx. 500 mg) cada 24 h','500 mg–1 g cada 24 h'),
  dose('IV · difteria cuando no es posible la vía oral','10–12 mg/kg (máx. 500 mg) cada 24 h','500 mg cada 24 h')],
 dur:['La duración depende de la indicación (ver cada escenario).'],
 ci:['Alergia a macrólidos','Insuficiencia hepática grave'],
 prec:['Menores de 6 semanas: riesgo de estenosis hipertrófica de píloro','Factores de riesgo de QT largo: trastornos electrolíticos, cardiopatía o nefropatía, edad avanzada','Separar 2 h de los antiácidos','IV: solo en infusión de 60 min a 2 mg/ml (nunca en bolo ni IM); pasar a oral lo antes posible'],
 ea:['Molestias digestivas, alteraciones auditivas reversibles, trastornos electrolíticos, prolongación del QT','Raro: hipersensibilidad grave (Stevens-Johnson, Lyell, DRESS) y hepatotoxicidad potencialmente mortal: suspender'],
 inter:['Evitar con otros fármacos que alargan el QT (amiodarona, cloroquina, arteméter-lumefantrina, fluconazol, haloperidol, mefloquina, moxifloxacino, ondansetrón, pentamidina, quinina)','Vigilar digoxina: aumenta su toxicidad'],
 renal:'',emb:'Sin contraindicación.',lact:'Sin contraindicación.',
 notas:['También se emplea, combinada con otros antibacterianos, en sepsis de origen pulmonar o ginecológico (niño 10–20 mg/kg, máx. 1 g/día; adulto 500 mg–1 g/día).']};

E['cefalexina']={nombre:'Cefalexina',via:'Oral',pag:'76–77',act:'enero 2024',src:SRC('76–77'),clase:'Cefalosporina de 1.ª generación',
 ind:['Infecciones cutáneas por estafilococo o estreptococo: impétigo, forúnculo, erisipela y celulitis superficial'],
 dosis:[dose('Neonato < 7 días','25 mg/kg cada 12 h (calcular por peso exacto)',''),dose('Neonato 7–28 días','25 mg/kg cada 8 h',''),dose('Niño de 1 mes a < 12 años','12,5–25 mg/kg cada 12 h',''),dose('≥ 12 años y adulto','','1 g cada 12 h')],
 dur:['Impétigo, forúnculo: 7 días','Erisipela, celulitis: 7–10 días'],
 ci:['Alergia a cefalosporinas'],prec:['Alergia a penicilinas: posible reacción cruzada','Tomar preferentemente entre comidas'],
 ea:['Diarrea y otras molestias digestivas','Alergia: exantema, fiebre, prurito'],inter:[],
 renal:'Reducir la dosis en insuficiencia renal grave.',emb:'Sin contraindicación.',lact:'Sin contraindicación.',notas:[]};

E['cefixima']={nombre:'Cefixima',via:'Oral',pag:'78–79',act:'septiembre 2022',src:SRC('78–79'),clase:'Cefalosporina de 3.ª generación',
 ind:['Fiebre tifoidea','Cistitis aguda en niñas > 2 años, embarazadas y mujeres que amamantan','Pielonefritis aguda en adultos','Cervicitis y uretritis por Neisseria gonorrhoeae (junto con tratamiento de clamidia)','Segunda línea de shigelosis'],
 dosis:[dose('Fiebre tifoidea','10 mg/kg (máx. 200 mg) cada 12 h','200 mg cada 12 h'),dose('Cistitis en niñas > 2 años · shigelosis','8 mg/kg (máx. 400 mg) cada 24 h','400 mg cada 24 h'),dose('Cistitis en embarazo o lactancia · pielonefritis del adulto','','200 mg cada 12 h'),dose('Gonococo: cervicitis y uretritis','8 mg/kg (máx. 400 mg) dosis única','400 mg dosis única')],
 dur:['Fiebre tifoidea y pielonefritis: 10–14 días','Cistitis: 3 días en niñas, 5 días en adultas','Shigelosis: 5 días'],
 ci:['Alergia a cefalosporinas'],prec:['Alergia a penicilinas: posible reacción cruzada'],
 ea:['Diarrea y otras molestias digestivas','Cefalea, mareo','Alergia (exantema, prurito, fiebre): suspender de inmediato'],inter:[],
 renal:'Reducir la dosis en insuficiencia renal grave.',emb:'Sin contraindicación.',lact:'Sin contraindicación.',notas:[]};

E['ciprofloxacino']={nombre:'Ciprofloxacino',via:'Oral',pag:'88–90',act:'septiembre 2023',src:SRC('88–90'),clase:'Fluoroquinolona',
 ind:['Shigelosis y carbunco cutáneo no complicado','Pielonefritis aguda no complicada, prostatitis aguda y cistitis en mujer no embarazada tras fracaso previo','Peste, sola o combinada','Paso a oral tras ciprofloxacino parenteral'],
 dosis:[dose('Shigelosis, carbunco cutáneo','≥ 1 mes: 15 mg/kg (máx. 500 mg) cada 12 h','500 mg cada 12 h'),dose('Pielonefritis, prostatitis, cistitis','','500 mg cada 12 h'),dose('Peste','≥ 1 mes: 15 mg/kg cada 8–12 h (máx. 750 mg cada 12 h o 500 mg cada 8 h)','750 mg cada 12 h (en embarazo, 500 mg cada 8 h)')],
 dur:['Shigelosis, cistitis: 3 días','Carbunco cutáneo: 7–14 días','Pielonefritis, peste: 10–14 días','Prostatitis: 14 días; si persisten síntomas, otros 14 días'],
 ci:['Alergia o efecto adverso grave previo con fluoroquinolonas (tendinitis, rotura tendinosa)'],
 prec:['Epilepsia, edad avanzada, hipertensión o cardiopatía','Beber abundante líquido (cristaluria)','Antiácidos: tomar ciprofloxacino 2 h antes o 4 h después; hierro, calcio o zinc: separar 2 h'],
 ea:['Molestias digestivas','Neurológicos: cefalea, mareo, confusión, alucinaciones, convulsiones; neuropatía periférica','Tendinitis (sobre todo aquílea) y artromialgias, fotosensibilidad, QT largo, hipo/hiperglucemia, hemólisis en déficit de G6PD','Suspender ante alergia, trastorno neurológico grave, neuropatía o dolor tendinoso'],
 inter:['Evitar con fármacos que alargan el QT','Vigilar con glibenclamida (hipoglucemia), AINE (convulsiones) y corticoides (tendinitis)'],
 renal:'Reducir la dosis a la mitad en insuficiencia renal.',emb:'Solo en infección grave sin alternativa.',lact:'Sin contraindicación.',
 notas:['Resistencia endémica a fluoroquinolonas en Asia y creciente en otras regiones: no usar como primera línea de fiebre tifoidea donde exista.','Alternativa en sepsis combinada con otros antibacterianos: niño 15–20 mg/kg (máx. 750 mg) cada 12 h; adulto 500–750 mg cada 12 h.']};

E['claritromicina']={nombre:'Claritromicina',via:'Oral',pag:'91–92',act:'',src:SRC('91–92'),clase:'Macrólido',
 ind:['Erradicación de Helicobacter pylori con omeprazol y amoxicilina','También se usa en micobacterias no tuberculosas'],
 dosis:[dose('H. pylori','','500 mg cada 12 h × 7 días')],dur:['H. pylori: 7 días'],
 ci:['Alergia a macrólidos'],prec:['Reducir a la mitad en insuficiencia renal grave'],
 ea:['Cefalea, disgeusia, insomnio, molestias digestivas, alteraciones auditivas reversibles','Prolongación del QT','Hipersensibilidad grave: suspender'],
 inter:['Evitar con fármacos que alargan el QT (amiodarona, antipalúdicos, antipsicóticos, efavirenz, fluconazol, fluoroquinolonas, hidroxizina, ondansetrón)','Aumenta las concentraciones de antidiabéticos orales, atorvastatina, carbamazepina, daclatasvir, digoxina, fenitoína y rifabutina: vigilar'],
 renal:'Reducir la dosis a la mitad en insuficiencia renal grave.',emb:'Evitar: seguridad no establecida.',lact:'Sin contraindicación.',notas:[]};

E['clindamicina']={nombre:'Clindamicina',via:'Oral e inyectable',pag:'93–94 (oral) · 381–382 (inyectable)',act:'septiembre 2022–2023',src:SRC('93–94, 381–382'),clase:'Lincosamida',
 ind:['Infecciones graves por estafilococo o estreptococo (erisipela, celulitis, neumonía) en alérgicos a betalactámicos o por SARM','Carbunco cutáneo no complicado','Paso a oral tras clindamicina parenteral','Malaria en el embarazo, combinada con quinina'],
 dosis:[dose('Dosis habitual por vía oral','10–13 mg/kg (máx. 600 mg) cada 8 h','600 mg cada 8 h'),dose('Malaria en embarazada (con quinina)','','10 mg/kg cada 12 h × 7 días'),
  dose('IV · segunda línea en infecciones graves por anaerobios, estafilococo o estreptococo','Neonato 0–7 días: 5 mg/kg cada 12 h (< 2 kg) o cada 8 h (≥ 2 kg) · 8 días–1 mes: 5 mg/kg cada 8 h (< 2 kg) o 10 mg/kg cada 8 h (≥ 2 kg) · ≥ 1 mes: 10 mg/kg (máx. 600 mg) cada 8 h','600–900 mg cada 8 h'),
  dose('IV · infecciones necrosantes y carbunco cutáneo grave (combinada)','Neonato: igual que arriba · ≥ 1 mes: 10–13 mg/kg (máx. 900 mg) cada 8 h','900 mg cada 8 h')],
 dur:['Erisipela, celulitis: 7–10 días','Carbunco cutáneo: 7–14 días (grave: 14 días)','Neumonía: 10–14 días','Otras infecciones: según evolución; pasar a oral en cuanto sea posible'],
 ci:['Alergia a lincosamidas','Antecedente de colitis seudomembranosa'],
 prec:['Reducir la dosis en insuficiencia hepática','Tomar las cápsulas con un vaso de agua (irritación esofágica)','IV: siempre diluida, en infusión de 30 min; nunca en bolo','Algunas presentaciones contienen alcohol bencílico: no usar en neonatos'],
 ea:['Colitis seudomembranosa (tratar como infección por C. difficile)','Exantema, ictericia, alergia grave: suspender'],inter:[],
 renal:'',emb:'Sin contraindicación.',lact:'Solo sin alternativa; vigilar las heces del lactante (colitis).',notas:[]};

E['cloxacilina']={nombre:'Cloxacilina',via:'Oral e inyectable',pag:'95–96 (oral) · 383–385 (inyectable)',act:'septiembre 2023',src:SRC('95–96, 383–385'),clase:'Penicilina antiestafilocócica (isoxazolilpenicilina)',
 ind:['IV: infecciones graves por estreptococo o estafilococo: meningitis, neumonía, onfalitis, sepsis de origen cutáneo, endocarditis, osteomielitis, infecciones necrosantes','IV: erisipela y celulitis','Oral: impétigo (la cefalexina es preferible)'],
 dosis:[dose('IV · infecciones graves','Neonato 0–7 días: 50 mg/kg cada 12 h (< 2 kg) o cada 8 h (≥ 2 kg) · 8 días–1 mes: 50 mg/kg cada 8 h (< 2 kg) o cada 6 h (≥ 2 kg) · ≥ 1 mes: 25–50 mg/kg (máx. 2 g) cada 6 h','2 g cada 6 h'),
  dose('IV · erisipela y celulitis','La mitad de la dosis anterior','La mitad de la dosis anterior (1 g cada 6 h)'),
  dose('Oral · impétigo','> 10 años: 15 mg/kg cada 8 h (máx. 3 g/día) × 7 días','1 g cada 8 h × 7 días')],
 dur:['Según la infección; pasar a vía oral en cuanto sea posible con amoxicilina-clavulánico o cefalexina (no con cloxacilina oral)'],
 ci:['Alergia a penicilinas'],prec:['Alergia a cefalosporinas: posible reacción cruzada','IV: diluir y pasar en 60 min; usar de inmediato; no mezclar con otros fármacos','Oral: tomar entre comidas'],
 ea:['Diarrea y otras molestias digestivas','Alergia, a veces grave','Raro: alteraciones hematológicas'],inter:['No combinar con metotrexato'],
 renal:'Reducir la dosis en insuficiencia renal.',emb:'Sin contraindicación.',lact:'Sin contraindicación.',
 notas:['Dicloxacilina, flucloxacilina y oxacilina se usan para las mismas indicaciones.'],equiv:['oxacilina','dicloxacilina','flucloxacilina','nafcilina']};
E['tmp-smx']={nombre:'Cotrimoxazol (sulfametoxazol/trimetoprim)',via:'Oral',pag:'103–105',act:'diciembre 2024',src:SRC('103–105'),clase:'Sulfonamida + antifolato (diaminopirimidina)',
 ind:['Tratamiento de toxoplasmosis cerebral, neumocistosis, isosporiasis, ciclosporiasis y brucelosis','Profilaxis de neumocistosis, toxoplasmosis e isosporiasis','Segunda línea de tos ferina','Fiebre tifoidea no complicada si la cepa es sensible en un estudio reciente'],
 dosis:[dose('Toxoplasmosis cerebral (tratamiento)','≥ 6 semanas: 25 mg SMX/5 mg TMP por kg cada 12 h','25 mg SMX/5 mg TMP por kg cada 12 h'),
  dose('Neumocistosis (tratamiento)','≥ 4 semanas: 50 mg SMX/10 mg TMP por kg cada 12 h (máx. 1 600/320 mg por toma)','1 600 mg SMX/320 mg TMP cada 8 h'),
  dose('Isosporiasis y ciclosporiasis (tratamiento)','','800/160 mg cada 12 h'),
  dose('Profilaxis de neumocistosis, toxoplasmosis e isosporiasis','≥ 4 semanas: 50 mg SMX/10 mg TMP por kg (máx. 800/160 mg) una vez al día mientras sea necesario','800/160 mg una vez al día mientras sea necesario'),
  dose('Tos ferina, brucelosis, fiebre tifoidea','≥ 6 semanas: 20 mg SMX/4 mg TMP por kg (máx. 800/160 mg) cada 12 h','800/160 mg cada 12 h')],
 dur:['Ciclosporiasis: 7 días','Isosporiasis: 7–10 días','Fiebre tifoidea, tos ferina: 14 días','Neumocistosis: 21 días','Toxoplasmosis cerebral: 4–6 semanas','Brucelosis: 6 semanas'],
 ci:['Menores de 6 semanas (hiperbilirrubinemia y hemólisis neonatal), salvo tratamiento o profilaxis de neumocistosis','Insuficiencia renal o hepática grave','Hipersensibilidad previa a sulfonamidas'],
 prec:['Beber abundante agua (cristaluria)','En tratamientos prolongados, hemograma si es posible','Tomar preferentemente con las comidas'],
 ea:['Hemólisis en déficit de G6PD; trombocitopenia, leucopenia, agranulocitosis, anemia megaloblástica','Hipersensibilidad grave (Stevens-Johnson, Lyell, DRESS): fiebre, exantema, aftas o sangrado obligan a suspender y consultar','Molestias digestivas, alteración hepática o renal, hiperpotasemia, hipoglucemia, hiponatremia, neuropatía, fotosensibilidad'],
 inter:['Fármacos hiperpotasemiantes (sales de potasio, espironolactona, enalapril, AINE, heparina): evitar o vigilar','Aumenta la fenitoína; más hematotoxicidad con zidovudina; más hipoglucemia con antidiabéticos'],
 renal:'Contraindicado en insuficiencia renal grave.',emb:'Riesgo de malformaciones en el 1.er trimestre y de hemólisis/ictericia neonatal después de la semana 36. En profilaxis o tratamiento de neumocistosis en mujeres con VIH o expuestas, el beneficio supera el riesgo (vigilar anemia e ictericia del recién nacido); en otras indicaciones, evitar si es posible.',
 lact:'Evitar si el lactante es neonato, prematuro, de bajo peso, ictérico o está enfermo; si se usa, vigilar anemia e ictericia.',notas:[]};

E['dapsona']={nombre:'Dapsona',via:'Oral',pag:'106–107',act:'octubre 2023',src:SRC('106–107'),clase:'Sulfona (antileproso)',
 ind:['Profilaxis de toxoplasmosis y neumocistosis (con pirimetamina y ácido folínico)','Tratamiento de neumocistosis (con trimetoprim)','Lepra paucibacilar y multibacilar (con rifampicina y clofazimina)'],
 dosis:[dose('Profilaxis solo de neumocistosis','2 mg/kg una vez al día (máx. 100 mg/día)','100 mg una vez al día'),
  dose('Profilaxis de toxoplasmosis y neumocistosis','2 mg/kg una vez al día (máx. 25 mg/día)','200 mg una vez por semana o 50 mg una vez al día'),
  dose('Tratamiento de neumocistosis (con trimetoprim)','2 mg/kg una vez al día (máx. 100 mg/día)','100 mg una vez al día'),
  dose('Lepra','< 10 años: 2 mg/kg/día · 10–14 años: 50 mg/día','≥ 15 años y adulto: 100 mg una vez al día')],
 dur:['Profilaxis: mientras sea necesaria','Neumocistosis: 21 días','Lepra paucibacilar: 6 meses · multibacilar: 12 meses'],
 ci:['Alergia a sulfonas','Anemia grave (corregirla antes)'],
 prec:['Muchos efectos adversos potencialmente graves: vigilancia estrecha','Hemograma y transaminasas si es posible','Precaución en insuficiencia renal o hepática'],
 ea:['Hemólisis (dosis-dependiente y en déficit de G6PD), neutropenia, agranulocitosis, metahemoglobinemia','Prurito, exantema, molestias digestivas, neuropatía periférica','Síndrome de hipersensibilidad en el primer mes (fiebre, ictericia, hepatitis, adenopatías, dermatitis exfoliativa): suspender definitivamente'],
 inter:['Más toxicidad hematológica con zidovudina'],
 renal:'Precaución en insuficiencia renal.',emb:'Sin contraindicación.',lact:'Sin contraindicación.',notas:[]};

E['doxiciclina']={nombre:'Doxiciclina',via:'Oral',pag:'125–126',act:'septiembre 2023',src:SRC('125–126'),clase:'Tetraciclina (ciclina)',
 ind:['Cólera, carbunco cutáneo no complicado, fiebres recurrentes, tifus epidémico y otras rickettsiosis, peste, brucelosis, leptospirosis, linfogranuloma venéreo','Filariasis linfática; alternativa a ivermectina en oncocercosis','Alternativa en treponematosis, neumonía atípica, cervicitis y uretritis por C. trachomatis (con tratamiento de gonorrea), donovanosis y sífilis'],
 dosis:[dose('Fiebre recurrente por piojos, tifus epidémico, cólera','4 mg/kg (máx. 100 mg) dosis única','200 mg dosis única (300 mg en cólera)'),
  dose('Peste (y como dosis de carga en infecciones graves)','< 45 kg: 4,4 mg/kg (máx. 200 mg) el día 1 y luego 2,2 mg/kg (máx. 100 mg) cada 12 h','200 mg el día 1 y luego 100 mg cada 12 h'),
  dose('Otras indicaciones','< 45 kg: 2–2,2 mg/kg (máx. 100 mg) cada 12 h','100 mg cada 12 h')],
 dur:['Rickettsiosis: 5–7 días o hasta 3 días sin fiebre','Leptospirosis, cervicitis/uretritis por clamidia: 7 días','Carbunco cutáneo, fiebre recurrente por garrapatas: 7–10 días','Peste, neumonía atípica: 10–14 días','Sífilis temprana, bejel, pinta, linfogranuloma: 14 días','Filariasis: al menos 4 semanas','Sífilis latente tardía: 30 días','Brucelosis: 6 semanas','Donovanosis: hasta la curación completa'],
 ci:['Alergia a ciclinas','En menores de 8 años, tratamientos de más de 21 días (tinción dental)'],
 prec:['Tomar con comida, un vaso de agua, de pie y al menos 1 h antes de acostarse (úlcera esofágica)','Separar 2 h de hierro, zinc, calcio y antiácidos','Precaución en insuficiencia hepática o renal'],
 ea:['Molestias digestivas, alergia, fotosensibilidad','Úlceras esofágicas'],
 inter:['Inductores enzimáticos (rifampicina, fenobarbital, fenitoína, carbamazepina) reducen su eficacia'],
 renal:'Precaución en insuficiencia renal.',emb:'Evitar en 2.º y 3.er trimestre (tinción y malformación dental); solo en infección grave cuando es la opción más eficaz. Las dosis únicas no están contraindicadas.',
 lact:'Evitar si es posible; si no hay alternativa, no más de 10 días.',
 notas:['También se usa como alternativa en sepsis de origen pulmonar (dosis de peste) y como profilaxis de peste, tifus de los matorrales y leptospirosis.']};

E['eritromicina']={nombre:'Eritromicina',via:'Oral',pag:'132–134',act:'enero 2024',src:SRC('132–134'),clase:'Macrólido',
 ind:['Alternativa a la primera línea en: fiebre recurrente por piojos, leptospirosis, otitis media, faringitis, sinusitis, difteria, tos ferina, neumonía atípica, úlcera de pierna, cervicitis y uretritis por clamidia, donovanosis, chancroide, linfogranuloma, sífilis y tracoma','Conjuntivitis neonatal por C. trachomatis','Paso a oral tras eritromicina parenteral'],
 dosis:[dose('Fiebre recurrente por piojos','< 5 años: 250 mg dosis única','≥ 5 años y adulto: 500 mg dosis única'),
  dose('Difteria','< 40 kg: 10–15 mg/kg (máx. 500 mg) cada 6 h','500 mg cada 6 h'),
  dose('Conjuntivitis neonatal por C. trachomatis','Neonato: 12,5 mg/kg cada 6 h',''),
  dose('Otras indicaciones','30–50 mg/kg al día repartidos en varias tomas','500 mg cada 6 h, o 1 g cada 8–12 h')],
 dur:['Leptospirosis, tos ferina, cervicitis/uretritis, chancroide, úlcera de pierna: 7 días','Sinusitis: 7–10 días','Faringitis, otitis: 10 días','Neumonía atípica: 10–14 días','Difteria, sífilis temprana, linfogranuloma, donovanosis, conjuntivitis por clamidia, tracoma: 14 días','Sífilis latente tardía: 30 días'],
 ci:['Alergia a macrólidos'],
 prec:['Evitar o usar con cautela en < 6 meses y sobre todo en neonatos < 2 semanas (estenosis hipertrófica de píloro)','Precaución en insuficiencia hepática o renal, trastornos electrolíticos o riesgo cardiovascular','Tomar 1 h antes o 2 h después de comer'],
 ea:['Molestias digestivas, alteraciones auditivas reversibles','Prolongación del QT','Alergia, a veces grave: suspender'],
 inter:['Evitar con fármacos que alargan el QT','Aumenta las concentraciones de carbamazepina, digoxina y warfarina: vigilar'],
 renal:'En insuficiencia renal grave del adulto, máximo 1,5 g/día.',emb:'Sin contraindicación.',lact:'Sin contraindicación.',notas:[]};

E['etambutol']={nombre:'Etambutol (E)',via:'Oral',pag:'135–136',act:'agosto 2022',src:SRC('135–136'),clase:'Antituberculoso de primera línea (bacteriostático)',
 ind:['Tuberculosis, combinado con otros antituberculosos'],
 dosis:[dose('Tuberculosis','15–25 mg/kg una vez al día (máx. 1 200 mg/día)','15–25 mg/kg una vez al día (máx. 1 200 mg/día)'),dose('Insuficiencia renal','15–25 mg/kg tres veces por semana','15–25 mg/kg tres veces por semana')],
 dur:['Según el protocolo antituberculoso'],
 ci:['Insuficiencia renal grave','Neuritis óptica previa (p. ej. retinopatía diabética)'],
 prec:['Ajustar con cuidado al peso, sobre todo en menores de 5 años (la alteración visual es difícil de detectar)','En tuberculosis sensible se administra en combinación a dosis fijas'],
 ea:['Neuritis óptica retrobulbar dosis-dependiente (peor en insuficiencia renal): ante visión borrosa, menor agudeza o discromatopsia rojo-verde, suspender y consultar; suele revertir en semanas'],
 inter:[],renal:'Espaciar a tres veces por semana; contraindicado si es grave.',emb:'Sin contraindicación.',lact:'Sin contraindicación.',notas:[]};

E['fosfomicina-oral']={nombre:'Fosfomicina trometamol',via:'Oral',pag:'150',act:'',src:SRC('150'),clase:'Derivado del ácido fosfónico',
 ind:['Cistitis aguda no complicada en la mujer, sin fiebre ni dolor lumbar','Bacteriuria asintomática en el embarazo'],
 dosis:[dose('Cistitis no complicada · bacteriuria del embarazo','','3 g en dosis única (sobre disuelto en agua)')],dur:['Dosis única'],
 ci:['Insuficiencia renal grave','Alergia a fosfomicina'],
 prec:['Si no mejora en 3 días, reconsultar: puede tratarse de un microorganismo con resistencia natural (Staphylococcus saprophyticus)','Tomar entre comidas o al acostarse (los alimentos reducen la absorción)'],
 ea:['Molestias digestivas, exantema','Raro: alergia'],inter:[],renal:'Contraindicada en insuficiencia renal grave.',emb:'Sin contraindicación.',lact:'Sin contraindicación.',
 notas:['No figura en la Lista de Medicamentos Esenciales de la OMS.']};

E['isoniazida']={nombre:'Isoniazida (H)',via:'Oral',pag:'177–178',act:'junio 2021',src:SRC('177–178'),clase:'Antituberculoso de primera línea (bactericida)',
 ind:['Tuberculosis, combinada con otros antituberculosos','Tuberculosis latente, sola o con rifampicina o rifapentina'],
 dosis:[dose('Tuberculosis · latente en monoterapia o con rifampicina diaria','< 30 kg: 10 mg/kg (7–15) una vez al día en ayunas','5 mg/kg (4–6) una vez al día en ayunas (máx. 300 mg/día)'),
  dose('Latente con rifapentina semanal','< 30 kg y > 2 años: 20–30 mg/kg una vez por semana en ayunas','900 mg una vez por semana en ayunas'),
  dose('Latente con rifapentina diaria','≥ 13 años: 300 mg al día','300 mg una vez al día en ayunas')],
 dur:['Tuberculosis y latente en monoterapia: según protocolo','Latente con rifampicina diaria o rifapentina semanal: 3 meses','Latente con rifapentina diaria: 1 mes'],
 ci:['Insuficiencia hepática grave'],
 prec:['Piridoxina si hay riesgo de neuropatía (niño 5–10 mg/día; adulto 10 mg/día)','Vigilar la función hepática si hay hepatopatía conocida; ante ictericia, suspender hasta que se resuelva'],
 ea:['Neuropatía periférica (desnutrición, alcoholismo, diabetes, VIH, embarazo, lactancia, insuficiencia renal)','Hepatotoxicidad (alcohol, hepatopatía, rifampicina, > 35 años)','Hipersensibilidad, reacciones psicóticas, convulsiones, depresión'],
 inter:['Aumenta la toxicidad de fenitoína, carbamazepina y benzodiacepinas; más sangrado con warfarina'],
 renal:'',emb:'Sin contraindicación; dar piridoxina 10 mg/día a la madre.',lact:'Sin contraindicación; piridoxina a la madre (10 mg/día) y al lactante (5 mg/día).',
 notas:['En tuberculosis sensible se administra en combinación a dosis fijas.']};

E['metronidazol']={nombre:'Metronidazol',via:'Oral e inyectable',pag:'215–216 (oral) · 454–455 (inyectable)',act:'',src:SRC('215–216, 454–455'),clase:'Nitroimidazol (antiprotozoario y antibacteriano anaerobicida)',
 ind:['Amebiasis, giardiasis, tricomoniasis','Vaginosis bacteriana e infecciones por anaerobios (Clostridium, Bacteroides…)'],
 dosis:[dose('Amebiasis','15 mg/kg cada 8 h','500 mg cada 8 h'),dose('Giardiasis','30 mg/kg una vez al día × 3 días','2 g una vez al día × 3 días'),dose('Tricomoniasis y vaginosis bacteriana','','2 g en dosis única (tratar también a la pareja en tricomoniasis)'),dose('Infecciones por anaerobios (según indicación, combinado)','10 mg/kg cada 8 h','500 mg cada 8 h'),dose('IV · infecciones graves por anaerobios (infusión de 30 min)','≥ 1 mes: 10 mg/kg cada 8 h (máx. 1 500 mg/día)','500 mg cada 8 h')],
 dur:['Amebiasis intestinal: 5 días · hepática: 5–10 días','Anaerobios: según la indicación'],
 ci:['Hipersensibilidad a metronidazol u otro nitroimidazol (tinidazol, secnidazol)'],
 prec:['Reacción tipo disulfiram con alcohol','En insuficiencia hepática grave, dar un tercio de la dosis diaria en una toma','La vía oral es tan eficaz como la intravenosa: pasar a oral en cuanto sea posible','No añadir otros fármacos al frasco de infusión'],
 ea:['Molestias digestivas','Raro: alergia, orina parda, cefalea, mareo'],
 inter:['Aumenta el efecto de anticoagulantes orales (sangrado), litio, fenitoína y ergometrina'],
 renal:'',emb:'Sin contraindicación; repartir en dosis menores y evitar tratamientos prolongados.',lact:'Pasa en cantidad a la leche (molestias digestivas en el lactante): dosis menores y cursos cortos.',notas:[]};

E['nitrofurantoina']={nombre:'Nitrofurantoína',via:'Oral',pag:'235',act:'',src:SRC('235'),clase:'Nitrofurano',
 ind:['Cistitis no complicada, sin fiebre ni dolor lumbar, cuando no puede usarse otro antibiótico'],
 dosis:[dose('Cistitis no complicada','','100 mg cada 8 h × 5–7 días')],dur:['5–7 días'],
 ci:['Insuficiencia renal','Déficit de G6PD','Alergia a nitrofurantoína'],
 prec:['No usarla como profilaxis de cistitis','Tomar con comida; separar al menos 2 h de los antiácidos'],
 ea:['Náuseas, vómitos, cefalea, mareo, orina parda','Hemólisis en déficit de G6PD; toxicidad pulmonar y hepática; alergia'],inter:[],
 renal:'Contraindicada en insuficiencia renal.',emb:'Contraindicada en el último mes (hemólisis neonatal).',lact:'Evitar durante el primer mes.',notas:[]};

E['penicilina-v']={nombre:'Fenoximetilpenicilina (penicilina V)',via:'Oral',pag:'252–253',act:'enero 2024',src:SRC('252–253'),clase:'Penicilina natural',
 ind:['Faringitis estreptocócica y escarlatina','Alternativa en difteria','Paso a oral tras penicilina parenteral','Prevención de infección neumocócica en drepanocitosis y de recaídas de fiebre reumática en niños'],
 dosis:[dose('Faringitis estreptocócica, escarlatina (cada 12 h, por peso)','< 10 kg: 125 mg · 10–< 21 kg: 250 mg · 21–< 39 kg: 500 mg','≥ 39 kg: 1 g cada 12 h'),
  dose('Difteria','< 40 kg: 10–15 mg/kg (máx. 500 mg) cada 6 h','500 mg cada 6 h')],
 dur:['Faringitis, escarlatina: 10 días','Difteria: 14 días'],
 ci:['Alergia a penicilinas'],prec:['Alergia a cefalosporinas: posible reacción cruzada','Tomar entre comidas'],
 ea:['Diarrea, náuseas','Alergia, a veces grave'],inter:['No combinar con metotrexato'],
 renal:'Reducir la dosis en insuficiencia renal grave.',emb:'Sin contraindicación.',lact:'Sin contraindicación.',notas:['250 mg equivalen a 400 000 UI.']};

E['pirazinamida']={nombre:'Pirazinamida (Z)',via:'Oral',pag:'267–268',act:'junio 2021',src:SRC('267–268'),clase:'Antituberculoso de primera línea (esterilizante y bactericida)',
 ind:['Tuberculosis, combinada con otros antituberculosos'],
 dosis:[dose('Tuberculosis','< 30 kg: 35 mg/kg (30–40) una vez al día','25 mg/kg (20–30) una vez al día (máx. 2 g/día)'),dose('Insuficiencia renal','25 mg/kg tres veces por semana','25 mg/kg tres veces por semana')],
 dur:['Según protocolo'],ci:['Hipersensibilidad','Insuficiencia hepática grave','Gota grave'],
 prec:['Vigilar la función hepática si hay hepatopatía; ante ictericia, suspender hasta que se resuelva','Limitar la exposición solar'],
 ea:['Gota y artralgias','Hepatotoxicidad','Fotosensibilidad, exantema, molestias digestivas, hipersensibilidad'],inter:[],
 renal:'Espaciar a tres veces por semana.',emb:'Sin contraindicación.',lact:'Sin contraindicación.',notas:['En tuberculosis sensible se da en combinación a dosis fijas.']};

E['rifampicina']={nombre:'Rifampicina (R)',via:'Oral',pag:'279–280',act:'junio 2021',src:SRC('279–280'),clase:'Rifamicina (antituberculoso de primera línea, antileproso)',
 ind:['Tuberculosis, combinada con otros antituberculosos','Tuberculosis latente, sola o con isoniazida','Lepra paucibacilar y multibacilar (con dapsona y clofazimina)','Brucelosis, combinada con otro antibacteriano'],
 dosis:[dose('Tuberculosis y latente','< 30 kg: 15 mg/kg una vez al día en ayunas','10 mg/kg una vez al día en ayunas (máx. 600 mg/día)'),
  dose('Lepra (dosis mensual)','< 10 años: 10 mg/kg al mes · 10–14 años: 450 mg al mes','600 mg una vez al mes en ayunas'),
  dose('Brucelosis','15–20 mg/kg una vez al día (máx. 600 mg/día)','600–900 mg una vez al día en ayunas')],
 dur:['Tuberculosis: según protocolo','Latente en monoterapia: 4 meses · con isoniazida: 3 meses','Lepra paucibacilar 6 meses, multibacilar 12 meses','Brucelosis: 6 semanas'],
 ci:['Ictericia','Hipersensibilidad a rifamicinas','Trastorno hematológico grave (trombocitopenia, púrpura) con una rifamicina previa'],
 prec:['En insuficiencia hepática, no superar 8 mg/kg/día','Puede tomarse con un poco de comida si hay intolerancia digestiva; ante ictericia, suspender'],
 ea:['Coloración naranja-rojiza inocua de orina, lágrimas, saliva, sudor (lentes de contacto)','Molestias digestivas, cefalea, somnolencia, hepatotoxicidad, cuadro seudogripal','Trombocitopenia, hipersensibilidad'],
 inter:['Potente inductor: reduce el efecto de muchos antimicrobianos, antirretrovirales, hormonas, antidiabéticos, corticoides, fenitoína, antivirales de acción directa contra hepatitis C y warfarina','Con nevirapina, lopinavir/r o atazanavir/r, usar rifabutina en su lugar','Anticoncepción: usar medroxiprogesterona inyectable o DIU','Con fluconazol, separar 12 h (rifampicina por la mañana, fluconazol por la noche)'],
 renal:'',emb:'Sin contraindicación; al final del embarazo, vitamina K a la madre y al neonato (riesgo hemorrágico).',lact:'Sin contraindicación.',notas:['En tuberculosis sensible se da en combinación a dosis fijas.']};

E['rifapentina']={nombre:'Rifapentina (P)',via:'Oral',pag:'281–282',act:'septiembre 2023',src:SRC('281–282'),clase:'Rifamicina (antituberculoso bactericida)',
 ind:['Tuberculosis latente, con isoniazida'],
 dosis:[dose('Pauta semanal durante 3 meses (con isoniazida)','≥ 2 años, por peso: 10–14 kg 300 mg · 14,1–25 kg 450 mg · 25,1–32 kg 600 mg · 32,1–49 kg 750 mg','≥ 50 kg: 900 mg una vez por semana'),
  dose('Pauta diaria durante 1 mes (con isoniazida)','≥ 13 años: 600 mg al día','600 mg una vez al día')],
 dur:['Semanal: 3 meses · diaria: 1 mes'],
 ci:['Ictericia, hipersensibilidad a rifamicinas o trastorno hematológico grave previo con rifamicinas','Pauta semanal en menores de 2 años; pauta diaria en menores de 13 años'],
 prec:['Evitar o usar con cautela si hay hepatopatía; ante ictericia, suspender','Puede triturarse y mezclarse con un poco de comida','Rifapentina y rifampicina no son intercambiables en las pautas de tuberculosis latente'],
 ea:['Coloración naranja-rojiza de secreciones','Molestias digestivas, cefalea, cuadro seudogripal; rara hepatotoxicidad','Alteraciones hematológicas, exantema e hipersensibilidad (≈ 4 %)'],
 inter:['Inductor enzimático: no usar con inhibidores de proteasa ni nevirapina; anticoncepción con medroxiprogesterona o DIU; con fluconazol, separar 12 h'],
 renal:'',emb:'No recomendada (seguridad no establecida).',lact:'No recomendada (seguridad no establecida).',
 notas:['Existe combinación fija rifapentina 300 mg/isoniazida 300 mg para > 14 años y adultos (3 comprimidos por semana).']};

E['sulfadiazina']={nombre:'Sulfadiazina',via:'Oral',pag:'302–303',act:'',src:SRC('302–303'),clase:'Sulfonamida',
 ind:['Tratamiento y profilaxis secundaria de toxoplasmosis en inmunodeprimidos, con pirimetamina'],
 dosis:[dose('Toxoplasmosis (tratamiento)','','2 g cada 8–12 h durante al menos 6 semanas'),dose('Profilaxis secundaria de toxoplasmosis','','1–1,5 g cada 12 h mientras sea necesaria')],
 dur:['Tratamiento: mínimo 6 semanas','Profilaxis secundaria: mientras persista la inmunodepresión'],
 ci:['Alergia a sulfonamidas','Insuficiencia renal o hepática grave'],
 prec:['Ácido folínico sistemático para prevenir el déficit de folato','Beber abundante líquido (cristaluria)','Hemograma si es posible','Los efectos adversos son más frecuentes con VIH'],
 ea:['Molestias digestivas, cristaluria y daño renal, fotosensibilidad','Anemia megaloblástica; hemólisis en déficit de G6PD','Alergia a veces grave (Lyell, Stevens-Johnson, alteraciones hematológicas): suspender'],
 inter:['No combinar con metotrexato ni fenitoína'],
 renal:'Reducir la dosis a la mitad en insuficiencia renal; contraindicada si es grave.',emb:'Sin contraindicación, pero evitar el último mes (ictericia y hemólisis neonatal).',lact:'Evitar si el lactante es prematuro, ictérico, de bajo peso o menor de un mes; si se usa, vigilar ictericia.',notas:[]};

E['tinidazol']={nombre:'Tinidazol',via:'Oral',pag:'311–312',act:'',src:SRC('311–312'),clase:'Nitroimidazol',
 ind:['Amebiasis, giardiasis, tricomoniasis','Vaginosis bacteriana e infecciones por anaerobios'],
 dosis:[dose('Amebiasis','50 mg/kg una vez al día (máx. 2 g/día)','2 g una vez al día'),dose('Giardiasis, tricomoniasis, vaginosis bacteriana','50 mg/kg dosis única (máx. 2 g)','2 g dosis única (tratar a la pareja en tricomoniasis)'),dose('Infecciones por anaerobios','> 12 años: como el adulto','2 g el día 1, luego 1 g al día o 500 mg cada 12 h')],
 dur:['Amebiasis intestinal: 3 días · hepática: 5 días','Anaerobios: según indicación'],
 ci:['Alergia a tinidazol u otro nitroimidazol'],prec:['Reacción tipo disulfiram con alcohol'],
 ea:['Molestias digestivas','Raro: alergia, orina parda, cefalea, mareo'],inter:['Aumenta el efecto de anticoagulantes orales, litio y fenitoína'],
 renal:'',emb:'Sin contraindicación; dosis menores y cursos cortos.',lact:'Pasa a la leche: dosis menores y cursos cortos.',notas:[]};

E['ampicilina']={nombre:'Ampicilina',via:'Inyectable',pag:'353–354',act:'septiembre 2023',src:SRC('353–354'),clase:'Penicilina (aminopenicilina)',
 ind:['Infecciones bacterianas graves (sepsis, meningitis, neumonía, pielonefritis, infección genital alta posparto), sola o combinada según la indicación','Carbunco cutáneo grave, con clindamicina'],
 dosis:[dose('Infecciones graves (la dosis varía según la indicación)','Neonato 0–7 días: 50–100 mg/kg cada 12 h (< 2 kg) o cada 8 h (≥ 2 kg) · 8 días–1 mes: 50–100 mg/kg cada 8 h · ≥ 1 mes: 50–100 mg/kg cada 8 h','1–2 g cada 6–8 h (2 g cada 4 h en meningitis)'),
  dose('Carbunco cutáneo grave (con clindamicina)','≥ 1 mes: 50 mg/kg (máx. 3 g) cada 6 h o 65 mg/kg (máx. 4 g) cada 8 h','3 g cada 6 h o 4 g cada 8 h')],
 dur:['Según indicación y respuesta; pasar a vía oral (amoxicilina o combinación) en cuanto sea posible'],
 ci:['Alergia a penicilinas','Mononucleosis infecciosa (exantema)'],
 prec:['Preferir la vía IV lenta (3–5 min) o infusión de 30 min; IM solo si no es posible la IV; en neonatos, solo IV','Alergia a cefalosporinas: posible reacción cruzada','Usar de inmediato tras reconstituir y no mezclar con otros fármacos'],
 ea:['Exantema, molestias digestivas, alergia a veces grave'],inter:['No combinar con metotrexato'],
 renal:'Reducir la dosis en insuficiencia renal grave.',emb:'Sin contraindicación.',lact:'Sin contraindicación.',notas:['La amoxicilina inyectable se usa para las mismas indicaciones.']};

E['penicilina-g']={nombre:'Bencilpenicilina (penicilina G cristalina)',via:'Inyectable',pag:'368–369',act:'junio 2025',src:SRC('368–369'),clase:'Penicilina natural de acción corta',
 ind:['Difteria cuando no es posible la vía oral','Leptospirosis grave y neurosífilis','Sífilis congénita con signos clínicos en el neonato o madre sin tratamiento adecuado'],
 dosis:[dose('Difteria','25 000 UI (15 mg)/kg (máx. 1 MUI) IM o IV cada 6 h','1 MUI (600 mg) IM o IV cada 6 h'),
  dose('Leptospirosis grave','50 000 UI (30 mg)/kg (máx. 2 MUI) IV cada 6 h','1–2 MUI IV cada 6 h'),
  dose('Neurosífilis','','2–4 MUI IV cada 4 h'),
  dose('Sífilis congénita','Neonato: 50 000 UI/kg IV cada 12 h los días 1–7 y cada 8 h los días 8–10','')],
 dur:['Difteria: pasar a vía oral en cuanto pueda tragar, hasta completar 14 días','Leptospirosis grave: 7 días','Neurosífilis: 14 días','Sífilis congénita: 10 días'],
 ci:['Alergia a penicilinas'],
 prec:['Uso hospitalario (dosis cada 4–6 h)','IV lenta (3–5 min) o infusión de 60 min; la inyección rápida puede causar convulsiones','No confundir con las penicilinas de acción prolongada (benzatina, procaína), que son solo IM'],
 ea:['Molestias digestivas, dolor local, anemia, alergia a veces grave','Reacción de Jarisch-Herxheimer en sífilis (fiebre, escalofríos, mialgias, taquicardia)','Convulsiones con dosis altas, inyección rápida o insuficiencia renal'],
 inter:['No combinar con metotrexato'],renal:'Reducir la dosis en neurosífilis con insuficiencia renal.',emb:'Sin contraindicación.',lact:'Sin contraindicación.',notas:['1 MUI = 600 mg.']};

E['penicilina-benzatinica']={link:'penicilina-g',nombre:'Penicilina G benzatínica',via:'Inyectable (solo IM)',pag:'366–367',act:'',src:SRC('366–367'),clase:'Penicilina de acción prolongada',
 ind:['Sífilis temprana (primaria, secundaria o latente < 12 meses) y latente tardía','Sífilis congénita sin signos en el neonato y con madre bien tratada','Treponematosis endémicas (pian, bejel, pinta)','Faringoamigdalitis estreptocócica','Profilaxis de difteria tras contacto directo; profilaxis primaria y secundaria de fiebre reumática'],
 dosis:[dose('Sífilis','50 000 UI/kg por inyección (máx. 2,4 MUI)','2,4 MUI por inyección'),
  dose('Pian, bejel, pinta','< 10 años: 1,2 MUI por inyección','2,4 MUI por inyección'),
  dose('Faringoamigdalitis, profilaxis de difteria y de fiebre reumática','< 30 kg: 600 000 UI por inyección','1,2 MUI por inyección')],
 dur:['Dosis única: sífilis temprana y congénita, faringoamigdalitis, pian, bejel, pinta, profilaxis de difteria y profilaxis primaria de fiebre reumática','Sífilis latente tardía: una inyección semanal × 3 semanas','Profilaxis secundaria de fiebre reumática: una inyección cada 4 semanas durante años'],
 ci:['Alergia a penicilinas'],
 prec:['NUNCA por vía IV: la inyección intravascular accidental produce un cuadro de choque con síntomas neuropsiquiátricos; aspirar antes de inyectar','Para 2,4 MUI, poner 1,2 MUI en cada glúteo','Usar de inmediato tras reconstituir'],
 ea:['Dolor local, molestias digestivas, alergia a veces grave','Reacción de Jarisch-Herxheimer en sífilis','Convulsiones con dosis altas o insuficiencia renal'],
 inter:['No combinar con metotrexato'],renal:'Reducir la dosis en insuficiencia renal.',emb:'Sin contraindicación.',lact:'Sin contraindicación.',notas:['1,2 MUI = 900 mg.']};

E['penicilina-procainica']={link:'penicilina-g',nombre:'Penicilina G procaína',via:'Inyectable (solo IM)',pag:'370–371',act:'junio 2025',src:SRC('370–371'),clase:'Penicilina de acción prolongada (12–24 h)',
 ind:['Difteria cuando no es posible la vía oral','Sífilis congénita con signos clínicos o madre sin tratamiento adecuado'],
 dosis:[dose('Difteria','50 000 UI/kg una vez al día (máx. 1,2 MUI/día)','1,2 MUI una vez al día'),dose('Sífilis congénita','Neonato: 50 000 UI/kg una vez al día','')],
 dur:['Difteria: pasar a oral en cuanto pueda tragar, hasta 14 días en total','Sífilis congénita: 10 días'],
 ci:['Alergia a penicilinas o a procaína'],prec:['Nunca IV; comprobar que la aguja no está en un vaso (lesión neurovascular grave)'],
 ea:['Molestias digestivas','Alergia, a veces grave: suspender'],inter:[],renal:'Precaución en insuficiencia renal.',emb:'Sin contraindicación.',lact:'Sin contraindicación.',notas:[]};

E['cefotaxima']={nombre:'Cefotaxima',via:'Inyectable',pag:'375–376',act:'',src:SRC('375–376'),clase:'Cefalosporina de 3.ª generación',
 ind:['En neonatos: meningitis bacteriana (combinada), infección urinaria, neumonía (se prefiere ampicilina + gentamicina) y conjuntivitis gonocócica si no hay ceftriaxona'],
 dosis:[dose('Meningitis, infección urinaria, neumonía neonatal','0–7 días: 50 mg/kg cada 12 h (< 2 kg) o cada 8 h (≥ 2 kg) · 8 días–1 mes: 50 mg/kg cada 8 h',''),dose('Conjuntivitis gonocócica neonatal','100 mg/kg IM dosis única','')],
 dur:['Según indicación y respuesta clínica'],
 ci:['Alergia a cefalosporinas o penicilinas'],
 prec:['Para uso IV, disolver solo en agua para inyección; la inyección IV demasiado rápida puede causar arritmias','Evitar o vigilar con otros nefrotóxicos (anfotericina B, aminoglucósidos, pentamidina)'],
 ea:['Diarrea, náuseas','Neutropenia, leucopenia','Alergia y reacciones cutáneas graves (Stevens-Johnson, Lyell)'],inter:[],
 renal:'Reducir la dosis en insuficiencia renal.',emb:'',lact:'',notas:['El manual la limita a la población neonatal.']};

E['ceftriaxona']={nombre:'Ceftriaxona',via:'Inyectable',pag:'377–378',act:'septiembre 2023',src:SRC('377–378'),clase:'Cefalosporina de 3.ª generación',
 ind:['Infecciones bacterianas graves: sepsis, meningitis, neumonía, fiebre tifoidea, shigelosis, leptospirosis, fiebre recurrente por garrapatas, pielonefritis, neurosífilis','Cervicitis, uretritis y conjuntivitis por N. gonorrhoeae (con tratamiento de clamidia salvo en neonatos), chancroide'],
 dosis:[dose('Infecciones graves (la dosis depende de la indicación)','≥ 1 mes y < 50 kg: 50–100 mg/kg (máx. 4 g) una vez al día','1–2 g una vez al día (meningitis y fiebre tifoidea: hasta 2 g cada 12 h o 4 g al día)'),
  dose('Cervicitis y uretritis gonocócicas, chancroide','< 45 kg: 125 mg IM dosis única','500 mg IM dosis única (250 mg en chancroide)'),
  dose('Conjuntivitis gonocócica','Neonato: 50 mg/kg IM dosis única (máx. 125 mg)','1 g IM dosis única')],
 dur:['Según indicación y respuesta; pasar a vía oral en cuanto sea posible'],
 ci:['Alergia a cefalosporinas o penicilinas','Neonatos con ictericia (encefalopatía bilirrubínica) o que reciben gluconato cálcico (precipitados en pulmón y riñón)'],
 prec:['El disolvente con lidocaína es solo para IM; para IV, disolver en agua para inyección','No mezclar con soluciones que contienen calcio (Ringer lactato)','Más de 1 g IM: repartir en dos glúteos; más de 2 g: solo en infusión IV'],
 ea:['Molestias digestivas, alteración hepática y renal','Anemia, leucopenia, neutropenia','Alergia a veces grave (Stevens-Johnson)'],inter:[],
 renal:'En insuficiencia renal grave, máx. 50 mg/kg/día o 2 g/día IV.',emb:'Sin contraindicación.',lact:'Sin contraindicación.',notas:[]};

E['cloranfenicol']={nombre:'Cloranfenicol',via:'Inyectable',pag:'379–380',act:'septiembre 2022',src:SRC('379–380'),clase:'Fenicol',
 ind:['Meningitis por peste'],
 dosis:[dose('Meningitis por peste','1–12 años: 25 mg/kg cada 8 h × 10–14 días','≥ 13 años y adulto: 1 g cada 8 h × 10–14 días')],dur:['10–14 días'],
 ci:['Menores de 1 año','Alergia o depresión medular con un tratamiento previo','Déficit de G6PD'],
 prec:['Reducir la dosis en insuficiencia hepática o renal','Evitar o vigilar con otros hematotóxicos (carbamazepina, cotrimoxazol, flucitosina, pirimetamina, zidovudina)'],
 ea:['Toxicidad hematológica dosis-dependiente (aplasia, anemia, leucopenia, trombocitopenia) y alergia: suspender','Molestias digestivas, neuropatía periférica y óptica'],inter:[],
 renal:'Reducir la dosis en insuficiencia renal.',emb:'Sin contraindicación en meningitis por peste; en el 3.er trimestre, riesgo de síndrome gris del recién nacido.',lact:'Vigilar trastornos hematológicos y digestivos del lactante.',notas:[]};

E['gentamicina']={nombre:'Gentamicina',via:'Inyectable',pag:'406–407',act:'septiembre 2023',src:SRC('406–407'),clase:'Aminoglucósido',
 ind:['Infecciones bacterianas graves combinada con otros antibacterianos: peste, sepsis, meningitis, neumonía, pielonefritis, infección genital alta posparto, brucelosis'],
 dosis:[dose('Meningitis en el lactante pequeño (con ampicilina o cloxacilina)','Neonato 0–7 días: 3 mg/kg/día (< 2 kg) o 5 mg/kg/día (≥ 2 kg) · 8 días–1 mes: 5 mg/kg/día · 1–3 meses: 2,5 mg/kg cada 8 h; siempre IV',''),
  dose('Otras infecciones graves','Neonato: igual que arriba · ≥ 1 mes: 4,5–7,5 mg/kg una vez al día','5–6 mg/kg una vez al día')],
 dur:['Peste: 10–14 días','Otras: según indicación y respuesta; no prolongar sin necesidad (toxicidad renal y auditiva)'],
 ci:['Alergia a aminoglucósidos'],
 prec:['Precaución con antecedentes renales, vestibulares o auditivos','Suspender ante mareo, acúfenos o hipoacusia','IM, IV lenta (3 min) o infusión de 30 min; no mezclar con otros fármacos'],
 ea:['Ototoxicidad irreversible (vestibular y coclear), nefrotoxicidad','Neuropatía, parestesias, bloqueo neuromuscular; raro: alergia'],
 inter:['No combinar con otro aminoglucósido','Evitar o vigilar con furosemida, anfotericina B y vancomicina (más toxicidad renal/auditiva) y con bloqueantes neuromusculares'],
 renal:'Reducir la dosis en insuficiencia renal.',emb:'Solo si es claramente necesaria (ototoxicidad fetal).',lact:'Sin contraindicación.',notas:[]};

E['estreptomicina']={nombre:'Estreptomicina',via:'Inyectable (solo IM)',pag:'489–490',act:'septiembre 2022',src:SRC('489–490'),clase:'Aminoglucósido',
 ind:['Alternativa a gentamicina en la peste','Brucelosis, con doxiciclina'],
 dosis:[dose('Peste','15 mg/kg (máx. 1 g) cada 12 h','1 g cada 12 h'),dose('Brucelosis (con doxiciclina)','','1 g una vez al día')],
 dur:['Peste: 10–14 días','Brucelosis: 2 semanas'],
 ci:['Alergia a aminoglucósidos','Embarazo'],
 prec:['Nunca IV','Precaución con antecedentes renales, vestibulares o auditivos; beber líquido suficiente','Suspender ante mareo, acúfenos o hipoacusia'],
 ea:['Ototoxicidad irreversible, nefrotoxicidad, neuropatía, parestesias, bloqueo neuromuscular; raro: alergia'],
 inter:['No combinar con otro aminoglucósido; evitar o vigilar con furosemida, anfotericina B, vancomicina y bloqueantes neuromusculares'],
 renal:'Reducir la dosis en insuficiencia renal.',emb:'CONTRAINDICADA.',lact:'Sin contraindicación.',notas:[]};

})();
