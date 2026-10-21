"""Curated, paraphrased study prompts. No copying from source books, no inference of susceptibility."""
import json, pathlib
R=pathlib.Path(__file__).resolve().parents[1]
p=R/'data/atlas.json'
d=json.load(open(p))
# Identity + clinical presentation + differentiating pearl.
MICRO='''
Staphylococcus epidermidis|Coco grampositivo coagulasa negativo, habitual en flora cutánea, forma biopelícula.|Dispositivos intravasculares, prótesis y material implantado; hemocultivo aislado puede ser contaminación.|Valorar número de muestras positivas y presencia de dispositivo antes de llamar infección.
Staphylococcus saprophyticus|Estafilococo coagulasa negativo asociado a cistitis, clásicamente resistente a novobiocina.|Cistitis en mujeres jóvenes sexualmente activas.|El hallazgo de estafilococo en orina no indica necesariamente S. aureus.
Staphylococcus lugdunensis|Estafilococo coagulasa negativo que puede producir infección invasiva agresiva.|Endocarditis, abscesos, infecciones de prótesis.|Aunque sea coagulasa negativo, no asumir que su hallazgo es contaminante.
Streptococcus pyogenes (GAS)|Coco grampositivo betahemolítico del grupo A; causa enfermedad mediada por toxinas.|Faringitis, erisipela, celulitis y fascitis necrosante.|En sospecha de infección necrosante, la cirugía urgente y el control de foco son esenciales.
Streptococcus agalactiae (GBS)|Estreptococo betahemolítico del grupo B; coloniza tracto genital y gastrointestinal.|Sepsis y meningitis neonatal; infecciones periparto y del adulto mayor.|El contexto obstétrico cambia cribado y profilaxis.
Streptococcus anginosus group|Grupo de estreptococos viridans con marcada tendencia a formación de abscesos.|Abscesos cerebrales, hepáticos y de cabeza/cuello; infección dental.|Aislamiento en sangre debe hacer buscar un foco profundo o absceso.
Streptococcus mutans|Estreptococo del grupo viridans relacionado con biofilm y caries dental.|Caries y endocarditis selectiva.|Su presencia oral no equivale a bacteriemia clínicamente significativa.
Streptococcus gallolyticus|Estreptococo relacionado con bacteriemia y endocarditis; nombre antes asociado a S. bovis.|Endocarditis; asociación epidemiológica con neoplasia colorrectal.|Ante bacteriemia confirmada, valorar evaluación colónica según caso.
Estreptococos viridans|Grupo heterogéneo de cocos grampositivos alfa o no hemolíticos; flora oral.|Endocarditis subaguda, infecciones odontogénicas, bacteriemia.|No es una única especie: susceptibilidad y significado varían.
Enterococcus faecium|Enterococo asociado con alta frecuencia a resistencia a múltiples antibióticos.|Bacteriemia e ITU hospitalaria, dispositivos.|No extrapolar susceptibilidad de E. faecalis a E. faecium.
Listeria monocytogenes|Bacilo grampositivo corto, móvil e intracelular facultativo.|Meningitis y bacteriemia en gestación, edad avanzada e inmunodepresión.|La cobertura habitual con cefalosporinas no incluye Listeria.
Bacillus cereus|Bacilo grampositivo formador de esporas; produce enterotoxinas.|Síndromes de intoxicación alimentaria y, raramente, infección invasiva ocular o sanguínea.|Ciertos cultivos pueden ser contaminación; interpretar según huésped y sitio.
Bacillus anthracis|Bacilo grampositivo formador de esporas, no móvil y con cápsula polipeptídica.|Ántrax cutáneo, inhalatorio o gastrointestinal.|Un escenario de exposición epidemiológica especial requiere protocolos de salud pública.
Corynebacterium diphtheriae|Bacilo grampositivo irregular, algunos aislamientos productores de toxina diftérica.|Faringitis con pseudomembrana, miocarditis y neuropatía por toxina.|La emergencia se centra en antitoxina y salud pública, además de antibióticos.
Nocardia spp.|Actinomiceto aerobio ramificado, parcialmente ácido-alcohol resistente.|Pulmón, absceso cerebral y enfermedad diseminada en inmunodeprimidos.|La tinción y cultivo especiales son importantes; no confundir con Actinomyces.
Actinomyces israelii|Bacilo grampositivo filamentoso, anaerobio/microaerófilo, de flora mucosa.|Actinomicosis cervicofacial, torácica o abdominopélvica.|Puede formar trayectos fistulosos y gránulos de azufre; curso crónico.
Cutibacterium acnes|Bacilo grampositivo anaerobio de flora cutánea, crecimiento relativamente lento.|Acné e infección de dispositivos o prótesis.|Un cultivo aislado puede ser contaminación; correlacionar con material protésico.
Escherichia coli — CRE|Enterobacteral con resistencia a carbapenémicos, por diversos mecanismos.|ITU y bacteriemia asociadas a resistencia avanzada.|CRE no implica automáticamente KPC: buscar mecanismo (KPC, NDM, OXA-48-like, otros).
Klebsiella pneumoniae — CRE|Enterobacteral encapsulado resistente a carbapenémicos, mecanismo heterogéneo.|Neumonía nosocomial, ITU y bacteriemia.|El tratamiento depende del mecanismo exacto y del antibiograma.
Klebsiella oxytoca|Enterobacteral fermentador de lactosa, oportunista.|ITU, bacteriemia e infecciones nosocomiales.|Puede presentar betalactamasas cromosómicas y resistencia adquirida.
Enterobacter cloacae complex (riesgo AmpC)|Enterobacteral con potencial de inducción/desrepresión de AmpC.|ITU, infecciones nosocomiales, bacteriemia.|Al seleccionar cefalosporinas debe considerarse la biología de AmpC, foco y susceptibilidad.
Klebsiella aerogenes|Enterobacteral antes denominado Enterobacter aerogenes, con riesgo AmpC inducible.|ITU, neumonía y bacteriemia hospitalaria.|Revisar AmpC; no confundir con K. pneumoniae.
Citrobacter freundii|Enterobacteral oportunista con riesgo de AmpC inducible.|ITU, bacteriemia e infección intraabdominal.|La especie influye en riesgo de resistencia emergente durante terapia.
Proteus mirabilis|Bacilo gramnegativo muy móvil y ureasa positivo.|ITU, especialmente con cálculos de estruvita y obstrucción.|Su alcalinización urinaria favorece litiasis; resistencia intrínseca a nitrofurantoína.
Proteus vulgaris|Enterobacteral ureasa positivo, menos común que P. mirabilis.|ITU e infecciones asociadas a dispositivos.|Sus patrones de resistencia difieren de P. mirabilis.
Morganella morganii|Enterobacteral oportunista, ureasa variable y resistencia intrínseca característica.|ITU hospitalaria y bacteriemia.|No asumir susceptibilidad por parecido con Proteus.
Providencia stuartii|Enterobacteral asociado a sondas crónicas y atención sanitaria.|ITU complicada y bacteriemia.|Puede ser multirresistente; diferenciar colonización de infección.
Serratia marcescens|Enterobacteral oportunista, algunas cepas producen pigmento rojo.|Bacteriemia, ITU e infección por catéter.|Resistencia intrínseca a varias penicilinas/cefalosporinas tempranas.
Salmonella enterica|Bacilo gramnegativo entérico, patógeno intracelular facultativo.|Gastroenteritis y fiebre entérica según serovar.|La necesidad de antibióticos depende de presentación y riesgo; no toda gastroenteritis los requiere.
Shigella spp.|Bacilos gramnegativos enteroinvasivos, muy baja dosis infectante.|Disentería, brotes y transmisión fecal-oral.|La resistencia creciente condiciona elección dirigida.
Yersinia enterocolitica|Bacilo gramnegativo transmitido por alimentos, afinidad por íleon terminal.|Enterocolitis, adenitis mesentérica, pseudoapendicitis.|Puede simular abdomen agudo.
Pseudomonas aeruginosa — DTR|Bacilo no fermentador con fenotipo de difícil tratamiento definido por susceptibilidades.|Neumonía y bacteriemia hospitalarias en contextos complejos.|DTR es una clasificación basada en AST, no equivalente a resistencia a un único fármaco.
Acinetobacter baumannii complex|Cocobacilo gramnegativo aerobio, persistente en ambientes hospitalarios.|VAP, bacteriemia y heridas complejas.|Distinguir colonización respiratoria de infección y fenotipo CRAB.
Acinetobacter baumannii — CRAB|Complejo A. baumannii resistente a carbapenémicos, con resistencia avanzada.|Infección nosocomial y VAP; alta complejidad terapéutica.|IDSA separa CRAB por sus opciones y necesidad de enfoques específicos.
Stenotrophomonas maltophilia|No fermentador con resistencia intrínseca a carbapenémicos y múltiples agentes.|Cultivos respiratorios, infección en inmunodepresión o dispositivos.|Evitar confundir colonización de vía aérea con neumonía real.
Burkholderia cepacia complex|Grupo de no fermentadores asociado a fibrosis quística y ambiente hospitalario.|Infección respiratoria y bacteriemia de pacientes de riesgo.|La susceptibilidad es compleja y variable entre especies.
Haemophilus influenzae|Cocobacilo gramnegativo exigente, algunas cepas encapsuladas.|Otitis, sinusitis, exacerbación EPOC, neumonía y enfermedad invasiva.|Distinguir encapsulado de no tipificable; posible producción de betalactamasa.
Moraxella catarrhalis|Diplococo gramnegativo, oxidasa positivo y frecuentemente betalactamasa positivo.|Otitis, sinusitis y exacerbación de EPOC.|Una causa respiratoria que difiere de Neisseria pese a morfología semejante.
Neisseria meningitidis|Diplococo gramnegativo encapsulado, coloniza nasofaringe.|Meningitis, meningococcemia y enfermedad invasiva.|Quimioprofilaxis de contactos es una decisión separada del tratamiento del caso.
Neisseria gonorrhoeae|Diplococo gramnegativo intracelular en neutrófilos, transmisión sexual.|Uretritis, cervicitis, EPI e infección diseminada.|Antibiograma y guías vigentes importan por resistencia emergente.
Bordetella pertussis|Cocobacilo gramnegativo estricto, produce toxina pertussis.|Tos ferina y brotes respiratorios.|La utilidad antibiótica incluye disminuir transmisión, no solo síntomas tardíos.
Pasteurella multocida|Cocobacilo gramnegativo asociado a flora oral de perros y gatos.|Celulitis tras mordeduras, raramente infección invasiva.|Una mordedura orienta la etiología mejor que la tinción Gram aislada.
Campylobacter jejuni|Bacilo gramnegativo curvo, microaerófilo.|Gastroenteritis, diarrea inflamatoria; asociación posterior con Guillain-Barré.|La mayoría de episodios son autolimitados; seleccionar tratamientos por contexto.
Helicobacter pylori|Bacilo gramnegativo curvo y ureasa positivo, colonizador gástrico.|Gastritis, úlcera péptica y riesgo oncológico.|Tratamientos son esquemas combinados con erradicación confirmada.
Vibrio vulnificus|Bacilo gramnegativo halófilo de ambientes marinos.|Infección rápida de heridas tras agua salada y sepsis tras mariscos crudos.|La exposición y progresión rápida pueden ser urgencia quirúrgica.
Vibrio cholerae|Bacilo gramnegativo curvo, toxina colérica.|Diarrea acuosa profusa con deshidratación.|La rehidratación es el tratamiento más importante.
Aeromonas hydrophila|Bacilo gramnegativo oxidasa positivo asociado con agua dulce.|Infección de herida expuesta a agua y gastroenteritis.|El ambiente de exposición cambia diagnóstico y cobertura.
Brucella spp.|Cocobacilo gramnegativo intracelular, zoonosis de ganado y lácteos no pasteurizados.|Fiebre prolongada, osteoarticular y enfermedad focal.|El laboratorio debe conocer sospecha por riesgo de exposición.
Francisella tularensis|Cocobacilo gramnegativo muy exigente, zoonosis con infectividad alta.|Tularemia ulceroglandular, neumónica o tifoidea.|Notificar al laboratorio por precauciones especiales.
Bacteroides fragilis|Bacilo gramnegativo anaerobio, flora colónica, múltiples betalactamasas.|Absceso intraabdominal e infección polimicrobiana.|Piperacilina-tazobactam o carbapenémicos no son sustitutos de control de foco.
Prevotella spp.|Bacilos anaerobios gramnegativos frecuentes en mucosas oral y genital.|Infección odontogénica, aspiración y abscesos polimicrobianos.|Puede coexistir con flora mixta y producir betalactamasas.
Fusobacterium necrophorum|Bacilo gramnegativo anaerobio, flora orofaríngea.|Faringitis complicada y síndrome de Lemierre con tromboflebitis yugular.|Persistencia de fiebre y dolor cervical después de faringitis debe alertar.
Clostridium perfringens|Bacilo grampositivo anaerobio esporulado productor de múltiples toxinas.|Mionecrosis y cuadros alimentarios.|La infección necrosante requiere desbridamiento y cuidados urgentes.
Clostridium tetani|Bacilo grampositivo anaerobio productor de tetanospasmina.|Tétanos con espasmos y disfunción autonómica.|El tratamiento central incluye inmunoglobulina, control de herida y soporte.
Clostridioides difficile|Bacilo grampositivo anaerobio esporulado, toxinas A/B.|Diarrea y colitis asociadas a disbiosis tras antibióticos.|La prueba positiva en portador asintomático no justifica tratamiento.
Peptostreptococcus spp.|Cocos grampositivos anaerobios, flora de mucosas.|Abscesos dentales, pélvicos y profundos.|Suelen participar en infección polimicrobiana.
Legionella pneumophila|Bacilo gramnegativo exigente de hábitats acuáticos y crecimiento intracelular.|Neumonía, ocasional enfermedad de Legionarios en brotes.|No crece en medios habituales y la tinción convencional puede ser poco sensible.
Mycoplasma pneumoniae|Bacteria sin pared de peptidoglicano y de cultivo exigente.|Neumonía atípica, traqueobronquitis.|Sin pared implica ausencia de diana para betalactámicos.
Chlamydia pneumoniae|Bacteria intracelular obligada con ciclo de cuerpos elementales/reticulares.|Neumonía y bronquitis.|Cultivo común no es útil; considerar diagnóstico molecular.
Chlamydia trachomatis|Bacteria intracelular obligada con diferentes serovares clínicos.|ITS, cervicitis, uretritis, tracoma o LGV según serovar.|Coinfecciones y muestras por sitio importan.
Coxiella burnetii|Bacteria intracelular de zoonosis, asociada a aerosoles de animales.|Fiebre Q, neumonía, endocarditis crónica.|La exposición ocupacional y serología orientan diagnóstico.
Rickettsia rickettsii|Bacteria intracelular transmitida por garrapatas, endotelio vascular.|Fiebre maculosa con vasculitis, exantema y riesgo de fallo orgánico.|No retrasar manejo por ausencia inicial de rash o serología.
Ehrlichia chaffeensis|Bacteria intracelular de monocitos, transmitida por garrapatas.|Ehrlichiosis con fiebre, citopenias, transaminasas elevadas.|Un Gram convencional no identifica el microorganismo.
Treponema pallidum|Espiroqueta fina, no visible adecuadamente con Gram de rutina.|Sífilis primaria, secundaria, latente y terciaria.|Interpretar pruebas treponémicas/no treponémicas por fase y exposición.
Borrelia burgdorferi|Espiroqueta transmitida por Ixodes.|Enfermedad de Lyme con eritema migratorio, neurológica o articular.|El diagnóstico depende de estadio y probabilidad epidemiológica.
Leptospira interrogans|Espiroqueta zoonótica transmitida por orina animal/agua contaminada.|Leptospirosis febril, ictericia, lesión renal y hemorragia.|Exposición a inundaciones o aguas residuales es pista mayor.
Mycobacterium tuberculosis|Bacilo ácido-alcohol resistente, crecimiento lento y persistencia intracelular.|Tuberculosis pulmonar y extrapulmonar.|Usar esquema multidroga específico: la matriz de antibióticos habituales no es sustituto.
Mycobacterium avium complex|Micobacterias no tuberculosas ambientales, ácido-alcohol resistentes.|Enfermedad pulmonar crónica, adenitis y diseminación en inmunodeficiencia.|Un cultivo positivo aislado no prueba enfermedad pulmonar activa.
Mycobacterium leprae|Micobacteria intracelular que afecta piel y nervios periféricos.|Lepra con lesiones hipopigmentadas/anestesia y neuropatía.|Tratamiento multidroga prolongado, epidemiología importa.
Mycobacterium abscessus complex|Micobacteria de crecimiento rápido, resistencia intrínseca extensa.|Enfermedad pulmonar y de tejidos blandos, procedimientos y dispositivos.|Tratamiento complejo guiado por subespecie, AST y expertos.
'''
byname={x['name']:x for x in d['pathogens']}
missing=[]
for line in MICRO.strip().splitlines():
 name,identity,clinical,pearl=line.split('|');m=byname.get(name)
 if not m:missing.append(name);continue
 m.update(identity=identity,clinical=clinical,pearl=pearl)
print('missing micro names:',missing)
# Drug-specific learning signals. These do not imply a validated antibiotic-pathogen relation.
DRUGS='''
Penicilina G|Estreptococos susceptibles, sífilis y otras indicaciones específicas.|Resistencia y sitio de infección determinan si es útil.
Penicilina V|Infecciones orofaríngeas por estreptococos susceptibles.|No extrapolar su uso oral a enfermedad invasiva.
Oxacilina|Infección confirmada por MSSA, entre otras indicaciones.|No tiene actividad útil contra MRSA.
Nafcilina|Infecciones sistémicas por MSSA susceptible.|No tratar MRSA como si fuera MSSA.
Dicloxacilina|Infecciones cutáneas seleccionadas por MSSA susceptible.|La formulación oral no sustituye tratamiento de bacteriemia.
Flucloxacilina|Infecciones por MSSA donde disponible.|Disponibilidad y pautas difieren por país.
Amoxicilina|Faringitis estreptocócica y ciertos patógenos respiratorios susceptibles.|Betalactamasas y resistencia neumocócica alteran espectro.
Ampicilina|Enterococcus faecalis susceptible y Listeria en escenarios seleccionados.|No implica cobertura de E. faecium resistente.
Ampicilina / sulbactam|Algunas infecciones polimicrobianas, incluidas mordeduras y anaerobios.|No confiar para BLEE ni Pseudomonas.
Piperacilina / tazobactam|Gramnegativos, anaerobios y Pseudomonas susceptibles en focos apropiados.|BLEE y carbapenemasas requieren evaluación específica.
Cefazolina|MSSA y estreptococos susceptibles; profilaxis quirúrgica según procedimiento.|No MRSA, Enterococcus ni Pseudomonas.
Cefalexina|Tratamiento oral de infecciones cutáneas simples seleccionadas.|No cubre MRSA de forma fiable.
Ceftriaxona|Neumonía comunitaria y meningitis o sepsis por microorganismos susceptibles.|No cubre Enterococcus, Pseudomonas ni anaerobios colónicos de forma fiable.
Ceftazidima|Bacilos gramnegativos, incluido Pseudomonas susceptible.|Menor actividad frente a algunos grampositivos; mecanismo de resistencia importa.
Cefepima|Gramnegativos incl. Pseudomonas susceptibles, consideración en AmpC.|BLEE y neurotoxicidad (especialmente en disfunción renal) requieren atención.
Ceftarolina|Infecciones seleccionadas por MRSA y neumococo susceptible.|No cobertura útil para Pseudomonas.
Ceftobiprol|Cefalosporina con actividad contra determinados grampositivos incluidos MRSA.|No extrapolar su espectro a todos los gramnegativos resistentes.
Ceftazidima / avibactam|Infecciones por ciertos productores de KPC/OXA-48-like y Pseudomonas susceptibles.|No cubre por sí sola carbapenemasas metalo-beta-lactamasas.
Ceftolozano / tazobactam|Opción especializada para Pseudomonas difícil en cepas susceptibles.|No actividad universal contra carbapenemasas o todas las BLEE.
Cefepima / enmetazobactam|Tratamiento de ITU complicada por bacterias susceptibles según autorización regulatoria.|No convertir indicación regulatoria en inferencia sobre otros síndromes.
Cefepima / taniborbactam|Agente en desarrollo o evaluación regulatoria; consultar autorizaciones actualizadas.|No presentar como primera línea ni afirmar disponibilidad sin verificación.
Meropenem|Gramnegativos y anaerobios susceptibles, incluidos determinados productores de BLEE.|No cubre MRSA ni Enterococcus faecium de forma fiable.
Ertapenem|Algunas enterobacterias BLEE y anaerobios en escenarios concretos.|Sin actividad útil frente a Pseudomonas ni Acinetobacter.
Imipenem / cilastatina|Carbapenémico amplio con escenarios seleccionados para Pseudomonas susceptible.|No cubre MRSA; cautela en SNC y función renal.
Meropenem / vaborbactam|Determinadas CRE productoras de KPC susceptibles.|No actividad confiable frente a MBL o OXA-48-like.
Imipenem / cilastatina / relebactam|Determinadas CRE y Pseudomonas resistentes susceptibles.|No es opción uniforme para todos los mecanismos carbapenemasa.
Aztreonam|Bacilos gramnegativos aerobios susceptibles; relevante en algunas alergias a betalactámicos.|No cubre anaerobios ni grampositivos.
Aztreonam / avibactam|Infecciones selectas por gramnegativos resistentes, incluidas algunas combinaciones con MBL.|Revisar autorización y patógeno sensible, indicación limitada.
Cefiderocol|Gramnegativos aerobios multirresistentes susceptibles; cefalosporina siderófora.|No extrapolar a grampositivos o anaerobios; indicaciones concretas.
Vancomicina IV|MRSA sistémico y otros grampositivos susceptibles.|No trata colitis por C. difficile como vancomicina oral.
Vancomicina oral|Infección intestinal por C. difficile en escenarios seleccionados.|No consigue niveles sistémicos útiles para bacteriemia.
Daptomicina|Bacteriemia e infecciones por grampositivos susceptibles seleccionadas.|Inactivada por surfactante: NO en neumonía.
Linezolid|MRSA/VRE susceptibles en síndromes específicos; excelente biodisponibilidad oral.|Mielosupresión, interacciones y duración requieren vigilancia.
Tedizolid|Oxazolidinona con indicaciones cutáneas específicas.|No asumir equivalencia clínica a linezolid en cualquier foco.
Gentamicina|Gramnegativos aerobios susceptibles y sinergia en casos específicos.|Toxicidad renal/ótica y monitoreo PK/PD.
Amikacina|Gramnegativos resistentes susceptibles, indicaciones especializadas.|Ajuste renal y toxicidad; no se elige por amplitud teórica aislada.
Ciprofloxacino|Gramnegativos susceptibles, incluida Pseudomonas en contextos seleccionados.|Menor actividad contra neumococo que fluoroquinolonas respiratorias.
Levofloxacino|Patógenos respiratorios y algunos gramnegativos susceptibles.|Resistencia y eventos adversos de clase; no usar indiscriminadamente.
Moxifloxacino|Patógenos respiratorios/atípicos y algunos anaerobios susceptibles.|No usar como opción típica de ITU; actividad antipseudomónica limitada.
Azitromicina|Atípicos respiratorios y agentes de ITS determinados, según guías.|Resistencia macrólidos y QT deben considerarse.
Doxiciclina|Atípicos, ciertas zoonosis y algunos patógenos cutáneos susceptibles.|No asegurar tratamiento de bacteriemia por su cobertura in vitro.
Tigeciclina|Infecciones especializadas de tejidos o abdomen, según susceptibilidad.|Niveles séricos/urinarios limitan uso en bacteriemia e ITU.
Trimetoprim / sulfametoxazol|ITU seleccionada, S. maltophilia y MRSA cutáneo susceptible en casos particulares.|Resistencia, interacciones, hiperpotasemia y función renal.
Nitrofurantoína|Cistitis vesical seleccionada por microorganismos sensibles.|No usar en pielonefritis ni bacteriemia.
Fosfomicina oral|Cistitis seleccionada; actividad depende del patógeno.|La vía oral no equivale a fosfomicina IV ni trata pielonefritis.
Metronidazol|Bacterias anaerobias susceptibles y algunas infecciones protozoarias.|No cubre aerobios y no es terapia única de infección abdominal mixta.
Clindamicina|Grampositivos y anaerobios selectos; papel anti-toxina en síndromes concretos.|Resistencia inducible y riesgo C. difficile.
Colistina|Rescate en algunos gramnegativos resistentes cuando no existen alternativas.|Nefrotoxicidad y limitaciones farmacocinéticas.
Fidaxomicina|Infección por C. difficile en escenarios adecuados.|No es terapia sistémica para infecciones extraintestinales.
Rifampicina|Componente de esquemas combinados para TB y ciertas infecciones protésicas.|Resistencia rápida en monoterapia e interacciones CYP.
Rifaximina|Infecciones/luminal intestinales específicas y otras indicaciones no infecciosas.|No usar para bacteriemia.
Sulbactam / durlobactam|CRAB, en combinación y escenario definido por guías y regulación.|No extrapolar eficacia a cualquier bacilo gramnegativo resistente.
'''
bydrug={x['name']:x for x in d['antibiotics']}
missing2=[]
for line in DRUGS.strip().splitlines():
 name,use,lim=line.split('|');a=bydrug.get(name)
 if a:a.update(context=use,limitations=lim)
 else:missing2.append(name)
print('missing drugs:',missing2)
for a in d['antibiotics']:
 a.setdefault('context', 'Estudia esta subfamilia, su mecanismo y las indicaciones autorizadas en tu región.')
 a.setdefault('limitations', 'No inferir susceptibilidad del patógeno ni idoneidad clínica sin revisión individual.')
# bibliographic role anchored to attached books; no copied images.
d['meta']['bibliography']=[{'title':d['guides'][k]['title'],'category':d['guides'][k]['topic']} for k in ['MURRAY26','LIPP20','LEVIN18','ISLAM23']]
with open(p,'w') as f:json.dump(d,f,ensure_ascii=False,indent=2)
print('enriched',len([m for m in d['pathogens'] if 'Clasificación anatómica' not in m['identity']]),'microbes;',len([a for a in d['antibiotics'] if 'No inferir' not in a['limitations']]),'drugs')