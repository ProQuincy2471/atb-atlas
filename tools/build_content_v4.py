import json, re, pathlib, itertools, collections
R=pathlib.Path(__file__).resolve().parents[1]
old=json.load(open(R/'data/knowledge.json'))
existing={a['name'].lower():a for a in old['antibiotics']}
# Groups > subgroups > names; no unsupported coverage inference for catalog-only drugs.
CATALOG={
'Penicilinas':{
 'Naturales':['Penicilina G','Penicilina V'],
 'Antiestafilocócicas':['Oxacilina','Nafcilina','Dicloxacilina','Flucloxacilina'],
 'Aminopenicilinas':['Amoxicilina','Ampicilina'],
 'Antipseudomónicas':['Piperacilina','Ticarcilina'],
 'Con inhibidor de betalactamasa':['Amoxicilina / clavulanato','Ampicilina / sulbactam','Piperacilina / tazobactam','Ticarcilina / clavulanato']},
'Cefalosporinas':{
 '1.ª generación':['Cefazolina','Cefalexina','Cefadroxilo'],
 '2.ª generación':['Cefuroxima','Cefaclor','Cefprozil'],
 'Cefamicinas':['Cefoxitina','Cefotetán'],
 '3.ª generación':['Ceftriaxona','Cefotaxima','Ceftazidima','Cefixima','Cefpodoxima'],
 '4.ª generación':['Cefepima'],
 'Actividad frente a MRSA':['Ceftarolina','Ceftobiprol'],
 'Combinaciones modernas':['Ceftazidima / avibactam','Ceftolozano / tazobactam','Cefepima / enmetazobactam','Cefepima / taniborbactam']},
'Carbapenémicos':{'Clásicos':['Imipenem / cilastatina','Meropenem','Ertapenem','Doripenem'], 'Con inhibidores modernos':['Meropenem / vaborbactam','Imipenem / cilastatina / relebactam']},
'Monobactámicos':{'Monobactámicos':['Aztreonam'],'Con inhibidor moderno':['Aztreonam / avibactam']},
'Sideróforos betalactámicos':{'Cefalosporina siderófora':['Cefiderocol']},
'Glicopéptidos / lipoglicopéptidos':{'Glicopéptidos':['Vancomicina IV','Vancomicina oral','Teicoplanina'], 'Lipoglicopéptidos':['Dalbavancina','Oritavancina','Telavancina']},
'Lipopéptidos':{'Lipopéptidos cíclicos':['Daptomicina']},
'Oxazolidinonas':{'Oxazolidinonas':['Linezolid','Tedizolid']},
'Aminoglucósidos':{'Clásicos':['Gentamicina','Tobramicina','Amikacina','Estreptomicina','Neomicina'],'De nueva generación':['Plazomicina']},
'Fluoroquinolonas':{'Generación temprana':['Ciprofloxacino','Ofloxacino','Norfloxacino'], 'Respiratorias':['Levofloxacino','Moxifloxacino','Gemifloxacino'], 'Nuevas / especiales':['Delafloxacino']},
'Macrólidos / ketólidos':{'Macrólidos':['Eritromicina','Claritromicina','Azitromicina'], 'Ketólidos':['Telitromicina']},
'Tetraciclinas / derivados':{'Tetraciclinas':['Tetraciclina','Doxiciclina','Minociclina'], 'Glicilciclinas':['Tigeciclina'], 'Aminometilciclinas':['Omadaciclina'], 'Fluorociclinas':['Eravaciclina']},
'Sulfonamidas / antifolatos':{'Combinaciones antifolato':['Trimetoprim / sulfametoxazol'], 'Antifolatos individuales':['Trimetoprim','Sulfadiazina']},
'Lincosamidas':{'Lincosamidas':['Clindamicina']},
'Nitroimidazoles':{'Nitroimidazoles':['Metronidazol','Tinidazol','Secnidazol']},
'Nitrofuranos':{'Nitrofuranos urinarios':['Nitrofurantoína']},
'Fosfonatos':{'Fosfonatos':['Fosfomicina oral','Fosfomicina IV']},
'Polimixinas':{'Polimixinas':['Polimixina B','Colistina']},
'Rifamicinas':{'Rifamicinas':['Rifampicina','Rifabutina','Rifapentina','Rifaximina']},
'Pleuromutilinas':{'Pleuromutilinas':['Lefamulina','Retapamulina tópica']},
'Estreptograminas':{'Estreptograminas':['Quinupristina / dalfopristina']},
'Ácido fusídico':{'Esteroide antibacteriano':['Ácido fusídico']},
'Mupirocina / tópicos':{'Tópicos':['Mupirocina','Ozenoxacino','Bacitracina']},
'Inhibidores especializados':{'Enzimas / otras dianas':['Fidaxomicina','Ácido nalidíxico','Cloranfenicol','Spectinomicina']},
'Sulbactam avanzado':{'Inhibidor con actividad antibacteriana':['Sulbactam / durlobactam']},
'Antimicobacterianos':{'Antituberculosos principales':['Isoniazida','Etambutol','Pirazinamida'], 'Para TB resistente':['Bedaquilina','Delamanid','Pretomanid','Clofazimina','Cicloserina']}
}
# Group class mechanism; representative educational class descriptors, not uniform indication claims.
MECH={
 'Penicilinas':'Inhibición de proteínas fijadoras de penicilina (PBPs): pared celular',
 'Cefalosporinas':'Inhibición de síntesis de pared celular (PBPs)',
 'Carbapenémicos':'Betalactámicos inhibidores de síntesis de pared celular',
 'Monobactámicos':'Betalactámicos; acción principal en PBP de bacilos gramnegativos',
 'Sideróforos betalactámicos':'Cefalosporina siderófora; entrada mediada por captación de hierro',
 'Glicopéptidos / lipoglicopéptidos':'Unión a precursores de peptidoglicano; pared celular',
 'Lipopéptidos':'Despolarización de membrana bacteriana',
 'Oxazolidinonas':'Inhibición de inicio de síntesis proteica 50S',
 'Aminoglucósidos':'Inhibición ribosomal 30S; dependiente de concentración',
 'Fluoroquinolonas':'Inhibición de ADN girasa y topoisomerasa IV',
 'Macrólidos / ketólidos':'Inhibición ribosomal 50S',
 'Tetraciclinas / derivados':'Bloqueo de unión al aminoacil-tRNA en 30S',
 'Sulfonamidas / antifolatos':'Alteración de ruta de síntesis de folato',
 'Lincosamidas':'Inhibición ribosomal 50S',
 'Nitroimidazoles':'Daño del ADN tras reducción en microorganismos susceptibles',
 'Nitrofuranos':'Metabolitos reactivos que dañan componentes bacterianos',
 'Fosfonatos':'Inhibición de MurA: síntesis temprana de pared',
 'Polimixinas':'Alteración de membrana externa gramnegativa',
 'Rifamicinas':'Inhibición de ARN polimerasa dependiente de ADN',
 'Pleuromutilinas':'Unión ribosomal 50S: centro peptidil transferasa',
 'Estreptograminas':'Inhibición ribosomal 50S',
 'Ácido fusídico':'Inhibición de factor de elongación G',
 'Mupirocina / tópicos':'Múltiples dianas locales; mupirocina inhibe isoleucil-tRNA sintetasa',
 'Inhibidores especializados':'Mecanismos diversos: revisar fármaco particular',
 'Sulbactam avanzado':'Sulbactam se une a PBPs de Acinetobacter; durlobactam inhibe betalactamasas',
 'Antimicobacterianos':'Mecanismos específicos antimicobacterianos (revisar cada agente)'
}
COMMON_NOTES={
'Piperacilina / tazobactam':'Antipseudomónico en cepas susceptibles; no presupone eficacia frente a BLEE fuera de contexto.',
'Cefepima':'Diferenciar AmpC de BLEE; revisar susceptibilidad, foco y guías.',
'Ceftazidima / avibactam':'Activo frente a determinados mecanismos de CRE (KPC/OXA-48-like); no supera por sí solo todas las MBL.',
'Ceftolozano / tazobactam':'Opción especializada frente a cepas seleccionadas de P. aeruginosa; confirmar AST.',
'Cefepima / enmetazobactam':'Combinación nueva para determinados gramnegativos; indicación regulatoria varía.',
'Aztreonam / avibactam':'Diseñada para escenarios complejos, incluidos mecanismos MBL en determinadas combinaciones de resistencia; verificar disponibilidad local y AST.',
'Meropenem / vaborbactam':'Especialmente relevante para determinadas CRE productoras de KPC; no equivalente a todas las carbapenemasas.',
'Imipenem / cilastatina / relebactam':'Valor en ciertos gramnegativos resistentes; depende del mecanismo.',
'Cefiderocol':'Utilidad en determinados gramnegativos difíciles; decisiones individualizadas.',
'Sulbactam / durlobactam':'Relevante en Acinetobacter baumannii-calcoaceticus resistente a carbapenémicos (CRAB) según indicación y guía.',
'Daptomicina':'No debe utilizarse para neumonía por inactivación por surfactante pulmonar.',
'Nitrofurantoína':'Uso limitado a infección vesical seleccionada; no para pielonefritis ni infección sistémica.',
'Fosfomicina oral':'Su uso depende de microorganismo y síndrome; la formulación oral no equivale a la intravenosa.',
'Vancomicina oral':'Actividad intraluminal para colitis por C. difficile; no equivalente a administración IV.',
'Vancomicina IV':'Actividad sistémica en grampositivos susceptibles; no sustituye vancomicina oral para infección luminal por C. difficile.',
'Ertapenem':'Carbapenémico sin actividad fiable frente a Pseudomonas aeruginosa ni Acinetobacter.',
'Ceftarolina':'Cefalosporina con actividad anti-MRSA, sin actividad antipseudomónica útil.',
'Metronidazol':'Relevante para anaerobios susceptibles, no cubre aerobios facultativos de forma habitual.',
'Moxifloxacino':'No elegirlo para infección urinaria solo por su espectro respiratorio.',
'Rifaximina':'Antibiótico principalmente intraluminal, no para bacteriemia.',
'Fidaxomicina':'Agente estrecho frente a C. difficile; no antibiótico sistémico de amplio espectro.',
'Ceftriaxona':'No brinda cobertura útil para Pseudomonas ni Enterococcus; falta cobertura anaerobia fiable.'
}
NEW_SET=set(['Ceftazidima / avibactam','Ceftolozano / tazobactam','Cefepima / enmetazobactam','Cefepima / taniborbactam','Ceftobiprol','Meropenem / vaborbactam','Imipenem / cilastatina / relebactam','Aztreonam / avibactam','Cefiderocol','Sulbactam / durlobactam','Plazomicina','Delafloxacino','Omadaciclina','Eravaciclina','Lefamulina'])
def slug(s):
 s=s.lower().replace('ñ','n');s=re.sub(r'[^a-z0-9]+','-',s);return s.strip('-')
origids={slug(a['name']):a for a in old['antibiotics']}
# explicitly anchor original ids for the same drugs
spec_names={a['name'].lower():a for a in old['antibiotics']}
antibiotics=[]; ids=set()
for family,subdict in CATALOG.items():
 for subgroup,names in subdict.items():
  for name in names:
   orig=spec_names.get(name.lower());
   if not orig:
    # names with existing case or roman numeral differences
    orig=next((a for a in old['antibiotics'] if slug(a['name'])==slug(name)),None)
   id=orig['id'] if orig else slug(name)
   if id in ids:continue
   ids.add(id)
   details={**(orig or {}),'id':id,'name':name,'family':family,'subgroup':subgroup,'mechanism':orig.get('mechanism',MECH[family]) if orig else MECH[family],
            'pearl':COMMON_NOTES.get(name,orig.get('pearl') if orig else f'Familia {family}. Evaluar microorganismo, sensibilidad, foco y formulación antes de usar.'),
            'newer':name in NEW_SET,'evidence':'piloto_con_relaciones' if orig else 'catalogo_sin_relacion',
            'review':'pendiente_revision_clinica' if not orig else 'relaciones_piloto_no_revisadas',
            'referenceKeys':['IDSA26'] if name in NEW_SET else ['MURRAY26']}
   details.pop('group',None)
   antibiotics.append(details)
# guarantee old antibiotics, when missing from taxonomy, are readded
for x in old['antibiotics']:
 if x['id'] not in ids:
  antibiotics.append({**x,'family':x['group'],'subgroup':'Otros', 'newer':False,'evidence':'piloto_con_relaciones','review':'relaciones_piloto_no_revisadas','referenceKeys':['MURRAY26']})
# Microbiology groups use biology rather than overlapping resistance phenotype as separate taxon.
MG=[
 ('staph','Estafilococos','Grampositivos','Cocos en racimos'),
 ('strep','Estreptococos','Grampositivos','Cocos en cadenas / diplococos'),
 ('entero','Enterococos','Grampositivos','Cocos en cadenas cortas'),
 ('gp-rods','Bacilos grampositivos','Grampositivos','Bacilos / ramificados'),
 ('enterobacterales','Enterobacterales','Gramnegativos','Bacilos facultativos'),
 ('nonfermenters','No fermentadores','Gramnegativos','Bacilos aerobios'),
 ('gn-respiratory','Gramnegativos respiratorios','Gramnegativos','Cocobacilos / diplococos'),
 ('gn-zoonotic','Gramnegativos y zoonosis','Gramnegativos','Bacilos / curvos'),
 ('anaerobes','Anaerobios','Anaerobios','Bacilos y cocos variados'),
 ('atypicals','Atípicos / intracelulares','Atípicos','Sin pared / intracelulares'),
 ('spirochetes','Espiroquetas','Especiales','Helicoidales'),
 ('mycobacteria','Micobacterias y ácido-alcohol resistentes','Especiales','Bacilos ácido-alcohol resistentes')]
MGC={x[0]:{'name':x[1],'domain':x[2],'morphology':x[3]} for x in MG}
# Core new pathogen catalog, all profiles distinct, biological metadata may be incomplete when evidence not audited.
PATHOGENS={
'staph':['Staphylococcus aureus — MSSA','Staphylococcus aureus — MRSA','Staphylococcus epidermidis','Staphylococcus saprophyticus','Staphylococcus lugdunensis'],
'strep':['Streptococcus pneumoniae','Streptococcus pyogenes (GAS)','Streptococcus agalactiae (GBS)','Streptococcus anginosus group','Streptococcus mutans','Streptococcus gallolyticus','Estreptococos viridans'],
'entero':['Enterococcus faecalis','Enterococcus faecium','Enterococcus faecium — VRE'],
'gp-rods':['Listeria monocytogenes','Bacillus cereus','Bacillus anthracis','Corynebacterium diphtheriae','Nocardia spp.','Actinomyces israelii','Cutibacterium acnes'],
'enterobacterales':['Escherichia coli (sin fenotipo de resistencia definido)','Escherichia coli — BLEE','Escherichia coli — CRE','Klebsiella pneumoniae (sin fenotipo de resistencia definido)','Klebsiella pneumoniae — CRE','Klebsiella oxytoca','Enterobacter cloacae complex (riesgo AmpC)','Klebsiella aerogenes','Citrobacter freundii','Proteus mirabilis','Proteus vulgaris','Morganella morganii','Providencia stuartii','Serratia marcescens','Salmonella enterica','Shigella spp.','Yersinia enterocolitica'],
'nonfermenters':['Pseudomonas aeruginosa (sin DTR definido)','Pseudomonas aeruginosa — DTR','Acinetobacter baumannii complex','Acinetobacter baumannii — CRAB','Stenotrophomonas maltophilia','Burkholderia cepacia complex'],
'gn-respiratory':['Haemophilus influenzae','Moraxella catarrhalis','Neisseria meningitidis','Neisseria gonorrhoeae','Bordetella pertussis'],
'gn-zoonotic':['Pasteurella multocida','Campylobacter jejuni','Helicobacter pylori','Vibrio vulnificus','Vibrio cholerae','Aeromonas hydrophila','Brucella spp.','Francisella tularensis'],
'anaerobes':['Bacteroides fragilis','Prevotella spp.','Fusobacterium necrophorum','Clostridium perfringens','Clostridium tetani','Clostridioides difficile','Peptostreptococcus spp.'],
'atypicals':['Legionella pneumophila','Mycoplasma pneumoniae','Chlamydia pneumoniae','Chlamydia trachomatis','Coxiella burnetii','Rickettsia rickettsii','Ehrlichia chaffeensis'],
'spirochetes':['Treponema pallidum','Borrelia burgdorferi','Leptospira interrogans'],
'mycobacteria':['Mycobacterium tuberculosis','Mycobacterium avium complex','Mycobacterium leprae','Mycobacterium abscessus complex']}
ORIGINAL_NAME_ID={p['name']:p for p in old['pathogens']}
MICRO_DETAILS={
'Staphylococcus aureus — MSSA':('Coco grampositivo en racimos; catalasa y coagulasa positivos.','Piel y tejidos blandos, bacteriemia, endocarditis, osteoarticular.','No confundir susceptibilidad a meticilina con enfermedad leve.','MURRAY26'),
'Staphylococcus aureus — MRSA':('Coco grampositivo en racimos; resistencia a meticilina asociada a PBP2a (mecA/mecC).','Piel purulenta, bacteriemia, endocarditis, neumonía según contexto.','La resistencia es un fenotipo; MRSA no constituye una especie diferente.','IDSA_SSTI'),
'Streptococcus pneumoniae':('Diplococo grampositivo encapsulado, alfa-hemolítico.','Neumonía comunitaria, sinusitis, otitis, meningitis.','La interpretación de penicilina depende del foco y puntos de corte.','IDSA_CAP'),
'Escherichia coli (sin fenotipo de resistencia definido)':('Bacilo gramnegativo fermentador de lactosa; flora intestinal.','ITU, bacteriemia e infecciones intraabdominales.','Frecuente en ITU; BLEE o CRE deben especificarse, no asumirse.','IDSA_CUTI'),
'Escherichia coli — BLEE':('Enterobacteral con betalactamasa de espectro extendido; resistencia heterogénea.','ITU y bacteriemia en distintos contextos.','Distinguir cistitis de pielonefritis e infección extraurinaria; revisar AST.','IDSA26'),
'Klebsiella pneumoniae (sin fenotipo de resistencia definido)':('Bacilo gramnegativo encapsulado, fermentador de lactosa.','Neumonía, ITU y bacteriemia, particularmente hospitalaria.','La resistencia no se deduce de la especie; identificar BLEE, KPC u otros mecanismos.','MURRAY26'),
'Pseudomonas aeruginosa (sin DTR definido)':('Bacilo gramnegativo aerobio no fermentador, oxidasa positivo.','Infección hospitalaria, dispositivo, heridas, fibrosis quística.','No equiparar antipseudomónico con susceptibilidad del aislado.','IDSA26'),
'Pseudomonas aeruginosa — DTR':('Fenotipo de difícil tratamiento; no equivale a cualquier resistencia.','Infecciones graves respiratorias o sistémicas en entornos seleccionados.','Exige susceptibilidad a opciones especializadas y contexto clínico.','IDSA26'),
'Enterococcus faecalis':('Coco grampositivo en pares o cadenas; tolerante a ambiente adverso.','ITU, endocarditis y bacteriemia.','Cefalosporinas no ofrecen actividad fiable contra Enterococcus.','MURRAY26'),
'Enterococcus faecium — VRE':('Enterococo resistente a vancomicina, habitualmente por genes van.','Bacteriemia, infección asociada a dispositivos y foco urinario.','Distinguir colonización de infección y susceptibilidad individual.','MURRAY26'),
'Acinetobacter baumannii — CRAB':('Cocobacilo gramnegativo no fermentador, resistente a carbapenémicos.','Neumonía nosocomial, heridas y bacteriemia.','IDSA 2026 dedica apartado específico a CRAB; no extrapolar la actividad desde otros bacilos GN.','IDSA26'),
'Stenotrophomonas maltophilia':('Bacilo gramnegativo no fermentador con resistencia intrínseca compleja.','Infección respiratoria y bacteriemia en pacientes con dispositivos/inmunosupresión.','Colonización respiratoria no equivale a infección; opciones dependen de pruebas.','IDSA26'),
'Listeria monocytogenes':('Bacilo grampositivo intracelular facultativo.','Meningitis o bacteriemia en embarazadas, neonatos, mayores o inmunocomprometidos.','Cefalosporinas no son una elección eficaz para Listeria.','MURRAY26'),
'Clostridioides difficile':('Bacilo grampositivo anaerobio esporulado, productora de toxinas.','Colitis asociada a antibióticos.','No se interpreta como infección sistémica tratable con vancomicina IV.','IDSA_CDI'),
'Mycoplasma pneumoniae':('Bacteria sin pared celular; no visible con Gram convencional.','Neumonía atípica, traqueobronquitis.','Los betalactámicos carecen de diana de pared celular.','MURRAY26'),
'Legionella pneumophila':('Bacilo gramnegativo exigente con supervivencia intracelular.','Neumonía relacionada con aerosoles acuáticos.','Exige pruebas diagnósticas específicas y antimicrobianos con actividad intracelular.','IDSA_CAP'),
'Bacteroides fragilis':('Bacilo anaerobio gramnegativo, flora intestinal.','Absceso intraabdominal e infección polimicrobiana.','La cobertura anaerobia depende de especie y agente; control de foco es primordial.','IDSA_IAI'),
'Neisseria meningitidis':('Diplococo gramnegativo encapsulado.','Meningitis y meningococcemia.','Aislamiento, profilaxis a contactos y urgencia clínica son aspectos separados de cobertura.','MURRAY26'),
'Clostridium perfringens':('Bacilo grampositivo anaerobio esporulado, produce toxinas.','Mionecrosis y cuadros alimentarios.','La mionecrosis es emergencia de control de foco.','MURRAY26')}
ORIGINAL_MAP={x['name']:x for x in old['pathogens']}
pathogens=[]; used=set()
for gid,names in PATHOGENS.items():
 for name in names:
  x=ORIGINAL_MAP.get(name)
  if x:
   id=x['id']; used.add(id)
  else:
   id=slug(name)
  if id in used and not x:continue
  used.add(id)
  desc,sites,pearl,ref=MICRO_DETAILS.get(name,(
      f'Grupo microbiológico: {MGC[gid]["name"]}. Clasificación anatómica y fenotípica orientativa.',
      'Las enfermedades dependen del sitio anatómico, huésped y epidemiología.',
      'La identificación de especie no sustituye diagnóstico ni antibiograma.', 'MURRAY26'))
  if x:desc=x.get('features') or desc
  item={'id':id,'name':name,'groupId':gid,'domain':MGC[gid]['domain'],'morphology':x.get('morphology',MGC[gid]['morphology']) if x else MGC[gid]['morphology'],
        'identity':desc,'clinical':sites,'pearl':pearl, 'aliases':x.get('aliases',[]) if x else [],'syndromeIds':x.get('commonSyndromes',[]) if x else [],
        'referenceKeys':[ref], 'review':'detalle_educativo_preliminar'}
  pathogens.append(item)
# ensure unchanged original pathogens mapped despite inconsistent naming
for x in old['pathogens']:
 if x['id'] not in used:raise ValueError('Original pathogen lost: '+x['id'])
# clinically contextual educational syndromes, with nuanced linked pathogens and official links
SYNDROMES=[
 ('nac','Neumonía adquirida en la comunidad','Respiratorio','Evaluar infección, gravedad y factores de riesgo; no añadir cobertura MRSA o Pseudomonas de rutina.','IDSA_CAP',['s-pneumoniae','h-influenzae','legionella','mycoplasma','s-aureus-mrsa'],['Hospitalización y gravedad','Riesgo validado de MRSA / Pseudomonas','Exposición epidemiológica','Muestras cuando correspondan']),
 ('neumonia-hospitalaria','Neumonía hospitalaria','Respiratorio','La ecología local y los cultivos previos orientan cobertura; distinguir HAP y VAP.','IDSA_HAP',['p-aeruginosa','s-aureus-mrsa','k-pneumoniae'],['Duración de estancia','Antibióticos IV previos','Cultivos respiratorios','Antibiograma institucional']),
 ('cistitis','Cistitis localizada en vejiga','Urinario','Diferenciar síntomas vesicales de infección renal o sistémica.','IDSA_CUTI',['e-coli','proteus-mirabilis'],['Disuria, urgencia, frecuencia','Ausencia de fiebre y dolor en flanco','Embarazo y otros contextos']),
 ('pielonefritis','Pielonefritis','Urinario','Infección renal: penetración de tejido y bacteriemia importan; nitrofurantoína no es adecuada.','IDSA_CUTI',['e-coli','e-coli-blee','k-pneumoniae','proteus-mirabilis'],['Fiebre y dolor en flanco','Obstrucción urinaria','Cultivo y susceptibilidad']),
 ('itu-complicada','Infección urinaria complicada','Urinario','Seleccionar empiria en cuatro pasos: gravedad, riesgos de resistencia, paciente y antibiograma cuando aplica.','IDSA_CUTI',['e-coli','e-coli-blee','k-pneumoniae','p-aeruginosa'],['¿Sepsis?','Cultivos previos','Dispositivo u obstrucción','Ajustar tras cultivo']),
 ('celulitis-no-purulenta','Celulitis no purulenta','Piel','Habitualmente considerar estreptococos; buscar necrosis o infección profunda.','IDSA_SSTI',['s-pyogenes','s-aureus-mssa'],['Eritema y edema sin absceso','Compromiso sistémico','Puerta de entrada']),
 ('piel-purulenta','Absceso e infección purulenta','Piel','Drenaje es esencial cuando está indicado; cobertura empírica depende de gravedad y epidemiología.','IDSA_SSTI',['s-aureus-mrsa','s-aureus-mssa'],['Fluctuación o drenaje purulento','Síntomas sistémicos','Revaluar por mala evolución']),
 ('intraabdominal','Infección intraabdominal complicada','Abdomen','Control de foco, anatomía y cultivos son esenciales; IDSA 2024 Parte 1 trata diagnóstico y riesgo, no régimen definitivo universal.','IDSA_IAI',['e-coli','k-pneumoniae','b-fragilis'],['¿Peritonitis / absceso?','Control de foco','Adquisición comunitaria u hospitalaria']),
 ('meningitis','Meningitis bacteriana','SNC','Síndrome tiempo-dependiente; edad, inmunidad y contexto cambian etiología.','MURRAY26',['s-pneumoniae'],['Fiebre, rigidez y alteración mental','LCR y hemocultivos sin retrasos inapropiados','Riesgo de Listeria']),
 ('endocarditis','Endocarditis infecciosa','Cardiovascular','Valorar bacteriemia, válvulas, dispositivos y ecocardiografía; no extrapolar cobertura por color.','MURRAY26',['s-aureus-mssa','s-aureus-mrsa','e-faecalis'],['Hemocultivos seriados','Prótesis o dispositivo','Émbolos y signos periféricos']),
 ('osteomielitis','Osteomielitis','Osteoarticular','Confirmación microbiológica y duración dependen de foco, cirugía y tejido.','MURRAY26',['s-aureus-mssa','s-aureus-mrsa'],['Contigüidad o vía hematógena','Material protésico','Muestras profundas']),
 ('artritis-septica','Artritis séptica','Osteoarticular','Artrocentesis urgente y drenaje según escenario.','MURRAY26',['s-aureus-mssa','s-aureus-mrsa'],['Monoartritis aguda','Líquido sinovial','Compromiso sistémico']),
 ('c-difficile','Infección por Clostridioides difficile','Gastrointestinal','Distinguir diarrea e infección de portación; estrategias terapéuticas específicas y prevención de recurrencia.','IDSA_CDI',['clostridioides-difficile'],['Diarrea nueva y exposición previa','Prueba adecuada','Recurrencias']),
 ('sepsis','Sepsis de posible origen bacteriano','Sistémico','Priorizar reconocimiento, control de foco, cultivos y cobertura proporcionada; no es un diagnóstico etiológico.','IDSA_STEW',['e-coli','s-aureus-mrsa','p-aeruginosa'],['Identificar origen','Obtener muestras sin retrasar atención','Reevaluar y desescalar']),
 ('faringitis','Faringoamigdalitis bacteriana','Respiratorio','Diagnóstico diferencial viral y pruebas dirigidas; evitar antibióticos innecesarios.','MURRAY26',['s-pyogenes'],['Criterios clínicos y pruebas','Complicaciones','No tratar virosis']),
 ('infeccion-cateter','Bacteriemia relacionada con catéter','Dispositivos','Cultivos emparejados y evaluación de retiro del dispositivo, si corresponde.','MURRAY26',['s-aureus-mrsa','s-aureus-mssa','e-faecalis'],['Hemocultivos periféricos y por catéter','Dispositivo presente','Persistencia bacteriemia']),
 ('diabetico-pie','Infección del pie diabético','Piel','Diferenciar infección de colonización; extensión profunda e isquemia modifican decisiones.','IDSA_DFI',['s-aureus-mssa','s-aureus-mrsa','e-coli'],['¿Hay infección clínica?','Isquemia y profundidad','Osteomielitis']),
 ('prostatitis','Prostatitis bacteriana aguda','Urinario','Síntomas urinarios y sistémicos; diferencias PK por tejido prostático.','MURRAY26',['e-coli','k-pneumoniae'],['Fiebre y disuria','Dolor pélvico','Evitar masaje prostático']),
 ('diarrea','Gastroenteritis bacteriana','Gastrointestinal','Etiología y necesidad de antibióticos varían; muchas infecciones son autolimitadas.','IDSA_DIARRHEA',['salmonella-enterica','campylobacter-jejuni'],['Sangre en heces','Viaje','Inmunosupresión']),
 ('infeccion-gonococica','Infección gonocócica','ITS','Pruebas por sitio de exposición y resistencia emergente; guías específicas.','CDC_STI',['neisseria-gonorrhoeae'],['Exposición sexual','Muestras según sitio','Coinfecciones']),
 ('neumonia-atipica','Síndrome de neumonía atípica','Respiratorio','Las características clínicas no identifican por sí solas el organismo; considerar pruebas específicas.','IDSA_CAP',['legionella','mycoplasma'],['Exposiciones','Tendencias epidemiológicas','Pruebas dirigidas']),
 ('absceso-cerebral','Absceso cerebral','SNC','Neuroimagen y control del foco; patógenos dependen de vía de diseminación.','MURRAY26',['s-aureus-mssa','b-fragilis'],['Imagen cerebral','Infección contigua','Neurocirugía'])]
NAMEID={p['name']:p['id'] for p in pathogens};known=set(p['id'] for p in pathogens)
# Special names from recent expansions.
extragroup={p['name']:p['id'] for p in pathogens}
syndromes=[]
for sid,name,site,summary,ref,refs,clues in SYNDROMES:
 r=[i for i in refs if i in known]
 syndromes.append({'id':sid,'name':name,'site':site,'summary':summary,'clues':clues,'pathogenIds':r,'referenceKeys':[ref], 'review':'resumen_educativo_preliminar'})
GUIDES={
 'IDSA26':{'title':'IDSA 2026 · Tratamiento de gramnegativos resistentes','year':'2026','category':'Resistencia','url':'https://www.idsociety.org/practice-guideline/amr-guidance/','topic':'BLEE, AmpC, CRE, Pseudomonas DTR, CRAB, S. maltophilia','takeaway':'Distinguir fenotipo, mecanismo y foco. Las opciones varían según pruebas de susceptibilidad.'},
 'IDSA_CUTI':{'title':'IDSA 2025 · ITU complicada','year':'2025','category':'Síndromes','url':'https://www.idsociety.org/practice-guideline/complicated-urinary-tract-infections','topic':'Gravedad → resistencia previa → paciente → antibiograma','takeaway':'Priorizar gravedad clínica, cultivos previos y adecuación a foco; desescalar cuando haya resultados.'},
 'IDSA_IAI':{'title':'IDSA 2024 · Infección intraabdominal (diagnóstico, Parte 1)','year':'2024','category':'Síndromes','url':'https://www.idsociety.org/practice-guideline/intra-abdominal-infections/','topic':'Riesgo, imagen, hemocultivos y cultivo intraabdominal','takeaway':'El documento 2024 parte 1 no es una guía universal de elección antibiótica.'},
 'IDSA_CAP':{'title':'ATS/IDSA 2019 · Neumonía comunitaria adulta','year':'2019','category':'Síndromes','url':'https://www.idsociety.org/practice-guideline/community-acquired-pneumonia-cap-in-adults/','topic':'Diagnóstico, gravedad, cobertura y factores MRSA/Pseudomonas','takeaway':'No añadir MRSA o Pseudomonas empíricamente sin factores apropiados.'},
 'IDSA_SSTI':{'title':'IDSA 2014 · Piel y tejidos blandos','year':'2014','category':'Síndromes','url':'https://www.idsociety.org/practice-guideline/skin-and-soft-tissue-infections/','topic':'Purulento vs no purulento y control de foco','takeaway':'Absceso y celulitis son entidades distintas: drenaje y selección dependen de presentación.'},
 'IDSA_CDI':{'title':'IDSA/SHEA 2021 · C. difficile','year':'2021','category':'Síndromes','url':'https://www.idsociety.org/practice-guideline/clostridioides-difficile/','topic':'Tratamiento de episodio inicial y recurrencias','takeaway':'Los antibióticos sistémicos no equivalen a terapia intraluminal.'},
 'IDSA_HAP':{'title':'ATS/IDSA 2016 · Neumonía hospitalaria / ventilador','year':'2016','category':'Síndromes','url':'https://www.idsociety.org/practice-guideline/hap_vap/','topic':'HAP/VAP, cultivo y resistencia local','takeaway':'Revisar contexto y actualizaciones, ecología y antibiograma institucional.'},
 'IDSA_STEW':{'title':'IDSA · Stewardship antimicrobiano','year':'2026','category':'Principios','url':'https://www.idsociety.org/practice-resources/practice-tools/antimicrobial-stewardship/','topic':'Optimizar selección, dosis, vía y duración','takeaway':'Menos sobretratamiento, menos toxicidad y menos presión de resistencia.'},
 'IDSA_DFI':{'title':'IWGDF/IDSA 2023 · Infecciones del pie diabético','year':'2023','category':'Síndromes','url':'https://www.idsociety.org/practice-guideline/diabetic-foot-infections/','topic':'Diagnóstico, microbiología y manejo interdisciplinario','takeaway':'No tratar colonización ni ulceraciones no infectadas.'},
 'IDSA_DIARRHEA':{'title':'IDSA 2017 · Diarrea infecciosa','year':'2017','category':'Síndromes','url':'https://www.idsociety.org/practice-guideline/infectious-diarrhea/','topic':'Diagnóstico y tratamiento seleccionados','takeaway':'Antibióticos no están indicados en toda gastroenteritis.'},
 'CDC_STI':{'title':'CDC · Tratamiento de ITS','year':'2021','category':'Síndromes','url':'https://www.cdc.gov/std/treatment-guidelines/default.htm','topic':'ITS y resistencia gonocócica','takeaway':'Usar guías por sitio de infección, exposición y embarazo.'},
 'MURRAY26':{'title':'Murray et al. · Medical Microbiology 10ª ed.','year':'2026','category':'Texto','url':'','topic':'Clasificación, patogenia, diagnóstico, bacterias y síndromes','takeaway':'Referencia bibliográfica proporcionada por el usuario, no redistribuida.'},
 'LIPP20':{'title':'Lippincott Illustrated Reviews · Microbiology 4ª ed.','year':'2020','category':'Texto','url':'','topic':'Clasificación y aprendizaje visual de microbiología','takeaway':'Referencia bibliográfica proporcionada por el usuario, no redistribuida.'},
 'LEVIN18':{'title':'Levinson · Review of Medical Microbiology and Immunology 15ª ed.','year':'2018','category':'Texto','url':'','topic':'Diagnóstico, mecanismos y perlas clínicas','takeaway':'Referencia bibliográfica proporcionada por el usuario, no redistribuida.'},
 'ISLAM23':{'title':'Islam · Infectious Diseases (2023)','year':'2023','category':'Texto','url':'','topic':'Grupos de antibióticos y enfoque por síndrome','takeaway':'Referencia bibliográfica proporcionada por el usuario, no redistribuida.'}
}
# Keep original 114 relations and add explicitly scoped high-yield relations, never guess all cross-product values.
old_ids=set(a['id'] for a in antibiotics); pathids=set(p['id'] for p in pathogens)
rel=[];seen=set()
for x in old['spectrum']:
 if x['antibiotic'] not in old_ids or x['pathogen'] not in pathids:raise ValueError('Unmatched legacy relation')
 rel.append({**x,'review':'piloto_sin_validacion_individual','referenceKeys':['IDSA26'] if 'IDSA26' in x.get('sources',[]) else ['MURRAY26']});seen.add((x['antibiotic'],x['pathogen']))
from itertools import product
extra=[
 ('cefiderocol','p-aeruginosa','conditional','La actividad frente a aislados multirresistentes depende de AST específico y del foco; no universal.'),
 ('ceftolozano-tazobactam','p-aeruginosa','conditional','Antipseudomónico especializado; confirmar sensibilidad, especialmente en fenotipo DTR.'),
 ('ceftazidima-avibactam','p-aeruginosa','conditional','Actividad condicionada a perfil de resistencia y pruebas de susceptibilidad.'),
 ('meropenem-vaborbactam','e-coli-blee','conditional','Considerar mecanismo de resistencia y sitio; no extrapolar desde BLEE a CRE.'),
 ('sulbactam-durlobactam','acinetobacter-baumannii-crab','conditional','Opción especializada para CRAB en escenarios definidos; verificar AST y guía IDSA.'),
 ('aztreonam-avibactam','e-coli-blee','conditional','No equivalente a sensibilidad indiscriminada; considerar fenotipo y disponibilidad.'),
 ('fosfomicina-oral','e-coli','conditional','Solo en determinados escenarios de cistitis; no inferir actividad sistémica.'),
 ('fidaxomicina','clostridioides-difficile','conditional','Actividad intraluminal intestinal en infección por C. difficile; revisar guía y contexto.'),
 ('vancomicina-oral','clostridioides-difficile','conditional','Actividad luminal; no sistémica.'),
 ('vancomicina-iv','e-coli','none','Glicopéptido sin actividad clínicamente útil frente a gramnegativos entéricos.'),
 ('vancomicina-iv','p-aeruginosa','none','Glicopéptido sin actividad útil frente a Pseudomonas.'),
 ('daptomicina','e-coli','none','Lipopéptido utilizado para grampositivos, no bacilos gramnegativos entéricos.'),
 ('ceftarolina','p-aeruginosa','none','Ceftarolina no brinda cobertura antipseudomónica útil.'),
 ('nitrofurantoina','p-aeruginosa','none','Nitrofurantoína no se considera cobertura útil frente a Pseudomonas.'),
 ('metronidazol','e-coli','none','Metronidazol no cubre Enterobacterales facultativas.'),
 ('ceftriaxona','e-faecalis','none','Enterococcus tiene resistencia intrínseca clínicamente relevante a cefalosporinas.'),
 ('cefepima','e-faecalis','none','Cefepima no cubre Enterococcus.'),
 ('ampicilina','listeria-monocytogenes','conditional','Opción clásica dirigida; confirmar contexto, foco y protocolos.'),
 ('ceftriaxona','listeria-monocytogenes','none','Cefalosporinas no brindan actividad clínica útil frente a Listeria.'),
 ('daptomicina','s-aureus-mrsa','conditional','Considerar infecciones bacteriémicas seleccionadas; NO neumonía (surfactante).'),
 ('linezolid','enterococcus-faecium-vre','conditional','Opción frente a VRE susceptible y en escenarios determinados.'),
 ('ampicilina','e-faecalis','conditional','Uso dirigido en cepas susceptibles; depende de foco y AST.')
]
for a,p,s,note in extra:
 if (a,p) not in seen and a in old_ids and p in pathids:
  rel.append({'antibiotic':a,'pathogen':p,'status':s,'note':note,'clinical':'condicionada_por_contexto','referenceKeys':['IDSA26' if ('crab' in p or 'blee' in p or p=='p-aeruginosa') else 'MURRAY26'], 'review':'orientacion_educativa_no_validada'});seen.add((a,p))
# Clinical statements from guidelines are non-prescriptive and reviewed as summaries.
EDUCATION=[
 {'id':'gram','title':'Gram primero, especie después','category':'IDENTIFICACIÓN','body':'La tinción de Gram orienta estructura de pared. No demuestra especie ni resistencia. Combínala con forma, disposición, bioquímica, cultivo o métodos moleculares.','why':'Evita confundir un cocobacilo gramnegativo con una enterobacteria o asumir que cualquier bacteria teñida comparte tratamiento.','refs':['MURRAY26','LIPP20']},
 {'id':'clusters','title':'Racimos, cadenas y diplococos','category':'MORFOLOGÍA','body':'Estafilococos suelen verse en racimos; estreptococos en cadenas; neumococos en diplococos. Son pistas iniciales, no identificación definitiva.','why':'Pone orden en los grampositivos antes de hablar de meticilina, betalactámicos o vancomicina.','refs':['LIPP20']},
 {'id':'anaerobes','title':'Anaerobio no significa gramnegativo','category':'METABOLISMO','body':'El metabolismo anaerobio y la tinción Gram son ejes diferentes: Bacteroides es gramnegativo; Clostridium es grampositivo.','why':'Previene errores de cobertura cuando un diagrama combina oxígeno y Gram.','refs':['MURRAY26','LIPP20']},
 {'id':'atypical','title':'¿Por qué los atípicos no responden igual?','category':'MECANISMO','body':'Mycoplasma carece de pared celular, por lo que los betalactámicos no tienen diana útil. Chlamydia y Legionella tienen biología intracelular que modifica la elección de agentes.','why':'El sitio de acción y la biología del patógeno explican el espectro.','refs':['MURRAY26']},
 {'id':'phenotype','title':'La resistencia es un atributo, no un taxón','category':'RESISTENCIA','body':'BLEE, AmpC, KPC, MBL, MRSA, VRE o CRAB son fenotipos o mecanismos; no deben reemplazar la clasificación biológica de la especie.','why':'Ayuda a no atribuir a toda E. coli una resistencia que solo tiene determinado aislamiento.','refs':['IDSA26']},
 {'id':'cystitis','title':'Cistitis ≠ pielonefritis','category':'CLÍNICA','body':'Una molécula puede alcanzar concentraciones urinarias apropiadas sin alcanzar concentraciones tisulares renales. Nitrofurantoína es el ejemplo clásico.','why':'La casilla de cobertura microbiológica nunca sustituye penetración al foco.','refs':['IDSA_CUTI']},
 {'id':'ampc','title':'AmpC y BLEE no son sinónimos','category':'RESISTENCIA','body':'Ambos afectan actividad de betalactámicos, pero difieren en especies asociadas, mecanismos y selección de tratamiento. Cefepima no es intercambiable en todos los contextos.','why':'La guía IDSA 2026 separa secciones para BLEE y AmpC por sus implicaciones terapéuticas.','refs':['IDSA26']},
 {'id':'dtr','title':'DTR Pseudomonas exige otra lectura','category':'RESISTENCIA','body':'La resistencia de difícil tratamiento (DTR) se define en función de susceptibilidad a varios antibióticos tradicionales; no basta con decir “resistente a carbapenémicos”.','why':'Evita clasificar cualquier Pseudomonas resistente como si necesitara las mismas opciones especializadas.','refs':['IDSA26']},
 {'id':'sourcecontrol','title':'En abdomen el control de foco es protagonista','category':'CLÍNICA','body':'La infección intraabdominal complicada requiere valorar drenaje o cirugía, además de la terapia antimicrobiana y las pruebas de microbiología.','why':'Una matriz de actividad no evalúa abscesos, colecciones ni perforación.','refs':['IDSA_IAI']},
 {'id':'clinicallogic','title':'Tres preguntas antes de elegir fármaco','category':'PENSAMIENTO CLÍNICO','body':'¿Hay infección y dónde? ¿Qué microorganismo es plausible o confirmado? ¿Qué fármaco tiene actividad, concentración apropiada y seguridad en este paciente?','why':'Ordena el razonamiento sin simular que un catálogo prescribe.','refs':['MURRAY26','IDSA_STEW']},
 {'id':'mssa','title':'MRSA y MSSA comparten especie','category':'RESISTENCIA','body':'S. aureus MSSA y MRSA son fenotipos de la misma especie. Su diferenciación modifica grupos de agentes útiles, aun con enfermedades similares.','why':'Ayuda a construir el mapa de resistencia sin duplicar biología.','refs':['MURRAY26','IDSA_SSTI']},
 {'id':'deescalate','title':'Revisar y desescalar','category':'STEWARDSHIP','body':'La selección empírica inicial depende del contexto. Cuando se conoce la etiología y AST, reconsidera espectro, vía, dosis, duración y control de foco.','why':'Menor espectro no equivale a menor calidad si cubre correctamente la infección.','refs':['IDSA_STEW','IDSA_CUTI']}
]
META={'version':'4.0.0','built':'2026-10-21','scope':'Catálogo ampliado de estudio: relaciones nuevas deben validarse individualmente; no prescripción',
      'disclaimer':'Material académico preliminar. La cobertura no certifica susceptibilidad del aislado ni selección de terapia; verificar guías vigentes, AST, PK/PD, indicación local y especialista.',
      'notes':'Las obras aportadas por el usuario sustentan organización y conceptos; no se redistribuyen imágenes, tablas ni texto extenso de esas obras.'}
result={'meta':META,'groups':[{**{'id':k},**v} for k,v in MGC.items()], 'antibiotics':antibiotics,'pathogens':pathogens,'syndromes':syndromes,'relations':rel,'guides':GUIDES,'lessons':EDUCATION}
with open(R/'data/atlas.json','w') as f:json.dump(result,f,ensure_ascii=False,indent=2)
counts={k:len(result[k]) for k in ['groups','antibiotics','pathogens','syndromes','relations','guides','lessons']};print(counts)
# audit all references and IDs
assert len({a['id'] for a in antibiotics})==len(antibiotics)
assert len({p['id'] for p in pathogens})==len(pathogens)
assert all(x['antibiotic'] in old_ids and x['pathogen'] in pathids for x in rel)
assert len(seen)==len(rel)
print('REL',collections.Counter(x['status'] for x in rel))