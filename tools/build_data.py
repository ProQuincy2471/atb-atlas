import json, pathlib
P=pathlib.Path(__file__).resolve().parents[1]
src={
 'WHO22':{'label':'OMS — The WHO AWaRe antibiotic book (2022)','url':'https://www.who.int/publications/i/item/9789240062382','type':'guia','updated':'2022-12-09'},
 'IDSA26':{'label':'IDSA — AMR Guidance (2026)','url':'https://www.idsociety.org/practice-guideline/amr-guidance/','type':'guia','updated':'2026-07-30'},
 'UCSF':{'label':'UCSF — Antibiotic Stewardship & Spectrum Guide','url':'https://idmp.ucsf.edu/content/antibiotic-stewardship-and-spectrum-guide','type':'recurso_clinico'},
 'OPENSTAX':{'label':'OpenStax / ASM — Microbiology','url':'https://openstax.org/details/books/microbiology','type':'texto'},
 'CAP':{'label':'IDSA — Community-acquired pneumonia clinical pathway','url':'https://www.idsociety.org/globalassets/idsa/practice-guidelines/community-acquired-pneumonia-in-adults/cap-clinical-pathway-overview.pdf','type':'ruta_clinica'}
}

def drug(id,n,cl,aw,mech,why='',tags=[]): return dict(id=id,name=n,group=cl,aware=aw,mechanism=mech,pearl=why,tags=tags)
drugs=[
 drug('amoxicilina','Amoxicilina','Penicilinas','Access','Inhibición de síntesis de pared bacteriana','Útil frente a determinados estreptococos; su actividad depende de susceptibilidad y localización.',['oral']),
 drug('ampicilina','Ampicilina','Penicilinas','Access','Inhibición de síntesis de pared bacteriana','Considerarla frente a Enterococcus faecalis susceptible.',['iv','oral']),
 drug('amoxi-clav','Amoxicilina / clavulanato','Penicilinas + inhibidor','Access','β-lactámico + inhibidor de algunas β-lactamasas','El inhibidor no elimina todos los mecanismos de resistencia.',['oral']),
 drug('cefazolina','Cefazolina','Cefalosporinas','Access','Inhibición de síntesis de pared bacteriana','Particularmente importante para MSSA; no es una opción para MRSA.',['iv']),
 drug('ceftriaxona','Ceftriaxona','Cefalosporinas','Watch','Inhibición de síntesis de pared bacteriana','No cubre Pseudomonas ni enterococos de forma fiable.',['iv']),
 drug('cefepima','Cefepima','Cefalosporinas','Watch','Inhibición de síntesis de pared bacteriana','Actividad antipseudomónica en aislados susceptibles; el fenotipo BLEE cambia la interpretación clínica.',['iv']),
 drug('ceftarolina','Ceftarolina','Cefalosporinas','Reserve','Inhibición de síntesis de pared bacteriana','β-lactámico con actividad frente a MRSA; no equivale a cobertura antipseudomónica.',['iv']),
 drug('piptazo','Piperacilina / tazobactam','Penicilinas + inhibidor','Watch','β-lactámico + inhibidor de β-lactamasas','Puede cubrir Pseudomonas susceptible; no es opción sugerida para infecciones invasivas por BLEE.',['iv']),
 drug('meropenem','Meropenem','Carbapenémicos','Watch','Inhibición de síntesis de pared bacteriana','Amplia actividad, incluso frente a muchos productores de BLEE; verificar fenotipo y foco.',['iv']),
 drug('ertapenem','Ertapenem','Carbapenémicos','Watch','Inhibición de síntesis de pared bacteriana','Diferencia esencial: NO tiene actividad útil frente a Pseudomonas.',['iv']),
 drug('vancomicina-iv','Vancomicina IV','Glucopéptidos','Watch','Interfiere con la síntesis de pared de grampositivos','La vía IV se utiliza para infecciones invasivas por MRSA susceptible.',['iv']),
 drug('linezolid','Linezolid','Oxazolidinonas','Reserve','Inhibe síntesis proteica en subunidad 50S','Actividad frente a MRSA; el perfil de toxicidad y las interacciones importan.',['oral','iv']),
 drug('daptomicina','Daptomicina','Lipopéptidos','Reserve','Despolariza membrana bacteriana','No utilizar para neumonía: inactivación por surfactante pulmonar.',['iv']),
 drug('azitromicina','Azitromicina','Macrólidos','Watch','Inhibe síntesis proteica en subunidad 50S','Actividad contra microorganismos atípicos; la resistencia neumocócica limita monoterapia según el contexto.',['oral','iv']),
 drug('doxiciclina','Doxiciclina','Tetraciclinas','Access','Inhibe síntesis proteica en subunidad 30S','Útil frente a atípicos y algunos aislados de MRSA, con restricciones por infección.',['oral','iv']),
 drug('ciprofloxacino','Ciprofloxacino','Fluoroquinolonas','Watch','Inhibe girasa de ADN y topoisomerasa IV','La actividad antipseudomónica y ante Enterobacterales requiere considerar susceptibilidad.',['oral','iv']),
 drug('levofloxacino','Levofloxacino','Fluoroquinolonas','Watch','Inhibe girasa de ADN y topoisomerasa IV','Actividad respiratoria y frente a algunos gramnegativos, sin asumir susceptibilidad.',['oral','iv']),
 drug('tmp-smx','Trimetoprim / sulfametoxazol','Antifolatos','Access','Bloqueo secuencial de síntesis de folato','Algunas indicaciones dependen especialmente de cultivo y foco.',['oral','iv']),
 drug('nitrofurantoina','Nitrofurantoína','Nitrofuranos','Access','Metabolitos bacterianos lesionan múltiples blancos','Uso enfocado a infección limitada a vejiga; NO pielonefritis ni bacteriemia.',['oral']),
 drug('metronidazol','Metronidazol','Nitroimidazoles','Access','Daño del ADN tras activación en anaerobiosis','Cubre muchos anaerobios; NO reemplaza cobertura de aerobios entéricos.',['oral','iv'])]

def bug(id,name,gram,form,kind,features,syms,aliases=[]): return dict(id=id,name=name,gram=gram,morphology=form,group=kind,features=features,commonSyndromes=syms,aliases=aliases)
bugs=[
 bug('s-pneumoniae','Streptococcus pneumoniae','Grampositivo','Diplococo','Cocos grampositivos','Coloniza nasofaringe. Considerar en neumonía comunitaria, otitis, sinusitis y meningitis.',['nac'],['neumococo','s pneumo']),
 bug('s-pyogenes','Streptococcus pyogenes (GAS)','Grampositivo','Coco en cadenas','Cocos grampositivos','Faringitis y celulitis no purulenta; puede producir infección necrosante invasiva.',['celulitis-no-purulenta'],['estreptococo grupo A','GAS']),
 bug('s-aureus-mssa','Staphylococcus aureus — MSSA','Grampositivo','Coco en racimos','Estafilococos','Asociado a infección purulenta de piel, bacteriemia y endocarditis; diferenciar MSSA de MRSA.',['piel-purulenta'],['staph aureus sensible','MSSA']),
 bug('s-aureus-mrsa','Staphylococcus aureus — MRSA','Grampositivo','Coco en racimos','Estafilococos','Fenotipo resistente a meticilina: cambia las opciones β-lactámicas habituales.',['piel-purulenta','neumonia-hospitalaria'],['SAMR','MRSA']),
 bug('e-faecalis','Enterococcus faecalis','Grampositivo','Coco','Enterococos','Infecciones urinarias y endovasculares en contextos seleccionados; resistencia variable.',['itu-complicada'],['enterococo']),
 bug('e-coli','Escherichia coli (sin fenotipo de resistencia definido)','Gramnegativo','Bacilo','Enterobacterales','Causa frecuente de infección urinaria y también infecciones intraabdominales; confirmar susceptibilidad.',['cistitis','pielonefritis','intraabdominal'],['E coli']),
 bug('e-coli-blee','Escherichia coli — BLEE','Gramnegativo','Bacilo','Enterobacterales','Fenotipo productor de β-lactamasas de espectro extendido; cambia el valor de varias cefalosporinas.',['cistitis','pielonefritis','intraabdominal'],['E coli ESBL','E coli BLEE','ESBL']),
 bug('k-pneumoniae','Klebsiella pneumoniae (sin fenotipo de resistencia definido)','Gramnegativo','Bacilo','Enterobacterales','Puede provocar ITU, neumonía y bacteriemia; no inferir susceptibilidad por especie.',['itu-complicada','neumonia-hospitalaria'],['Klebsiella']),
 bug('p-aeruginosa','Pseudomonas aeruginosa (sin DTR definido)','Gramnegativo','Bacilo','No fermentadores','Considerar en contextos nosocomiales, dispositivos, antibióticos previos o enfermedad pulmonar estructural.',['neumonia-hospitalaria','itu-complicada'],['Pseudomonas','PsA']),
 bug('b-fragilis','Bacteroides fragilis','Gramnegativo','Bacilo anaerobio','Anaerobios','Componente de microbiota intestinal; relevante en infecciones intraabdominales mixtas.',['intraabdominal'],['Bacteroides','anaerobios intestinales']),
 bug('h-influenzae','Haemophilus influenzae','Gramnegativo','Cocobacilo','Respiratorios','Causa de infecciones respiratorias; ciertas cepas producen β-lactamasas.',['nac'],['H influenzae']),
 bug('m-catarrhalis','Moraxella catarrhalis','Gramnegativo','Diplococo','Respiratorios','Asociada a algunas exacerbaciones de EPOC, sinusitis y otras infecciones respiratorias.',['nac'],['Moraxella']),
 bug('legionella','Legionella pneumophila','Gramnegativo','Bacilo de tinción difícil','Atípicos','Neumonía asociada a exposiciones acuáticas; patógeno intracelular.',['nac'],['Legionella']),
 bug('mycoplasma','Mycoplasma pneumoniae','Sin pared','Pleomórfico','Atípicos','Causa neumonía atípica; carece de pared celular, por lo que los β-lactámicos no son útiles.',['nac'],['micoplasma']),
 bug('enterobacter-cloacae','Enterobacter cloacae complex (riesgo AmpC)','Gramnegativo','Bacilo','Enterobacterales','Puede inducir/desreprimir AmpC; interpretar selección de cefalosporinas con cautela.',['itu-complicada','intraabdominal'],['Enterobacter','AmpC']),
 bug('proteus-mirabilis','Proteus mirabilis','Gramnegativo','Bacilo','Enterobacterales','Asociado a ITU, cálculos de estruvita y actividad ureasa; nitrofurantoína no es fiable.',['itu-complicada','cistitis'],['Proteus'])]

def synd(id,n,site,desc,clues,consider,source,notes):return dict(id=id,name=n,site=site,description=desc,clues=clues,consider=[dict(pathogen=k,weight=w,when=cond) for k,w,cond in consider],clinicalNotes=notes,sources=source)
syndromes=[
 synd('nac','Neumonía adquirida en la comunidad','Pulmón','El contexto, gravedad y factores epidemiológicos orientan el diagnóstico y el tratamiento empírico.',['Tos + fiebre + infiltrado pulmonar','Exposiciones acuáticas o brotes','Colonización previa por MRSA o Pseudomonas'],[('s-pneumoniae','típico','Causa clásica a considerar'),('h-influenzae','contextual','Enfermedad respiratoria concomitante'),('m-catarrhalis','contextual','EPOC u otras condiciones'),('legionella','contextual','Exposiciones y evolución compatible'),('mycoplasma','contextual','Cuadro atípico'),('s-aureus-mrsa','según_riesgo','Datos epidemiológicos y factores de riesgo')],['WHO22','CAP'],'Diferenciar neumonía bacteriana de cuadros virales; no añadir cobertura de MRSA o Pseudomonas por defecto.'),
 synd('neumonia-hospitalaria','Neumonía hospitalaria','Pulmón','Considerar patógenos resistentes según exposición, gravedad y microbiología local.',['Inicio nosocomial','Antibióticos IV previos','Ventilación o dispositivos y cultivos previos'],[('p-aeruginosa','según_riesgo','Cultivos previos y ecología local'),('k-pneumoniae','según_riesgo','Patógenos gramnegativos hospitalarios'),('s-aureus-mrsa','según_riesgo','Riesgo y colonización previa')],['WHO22'],'La selección empírica requiere antibiograma institucional y factores de riesgo.'),
 synd('cistitis','Cistitis localizada en vejiga','Vía urinaria baja','La presencia de síntomas urinarios compatibles importa más que un urocultivo positivo aislado.',['Disuria','Polaquiuria o urgencia','Ausencia de fiebre o dolor en flanco'],[('e-coli','típico','Uropatógeno frecuente'),('e-coli-blee','según_riesgo','Antecedente de BLEE y exposición antibiótica'),('proteus-mirabilis','contextual','Otros uropatógenos')],['WHO22','IDSA26'],'No equiparar bacteriuria asintomática con infección que requiere tratamiento.'),
 synd('pielonefritis','Pielonefritis / infección urinaria con extensión renal','Riñón','El tratamiento requiere actividad sistémica y penetración adecuada al parénquima renal.',['Fiebre o escalofríos','Dolor costovertebral','Signos de infección sistémica'],[('e-coli','típico','Uropatógeno frecuente'),('e-coli-blee','según_riesgo','Cultivos y resistencias anteriores')],['WHO22','IDSA26'],'Nitrofurantoína y fosfomicina oral no deben interpretarse como opciones para pielonefritis.'),
 synd('itu-complicada','ITU complicada / relacionada con dispositivo','Vía urinaria','Foco y clasificación dependen de extensión más allá de vejiga, gravedad y contexto.',['Catéter y síntomas compatibles','Fiebre o bacteriemia','Instrumentación urinaria'],[('e-coli','típico','Enterobacterales'),('k-pneumoniae','contextual','Antecedentes y unidad'),('p-aeruginosa','según_riesgo','Instrumentación y cultivos previos'),('e-faecalis','contextual','Contexto asistencial'),('proteus-mirabilis','contextual','Litiasis, dispositivos')],['WHO22','IDSA26'],'La IDSA 2026 clasifica pielonefritis e ITU febril o bacteriémica dentro de infección que supera la vejiga.'),
 synd('celulitis-no-purulenta','Celulitis no purulenta','Piel','En ausencia de purulencia, los estreptococos suelen orientar el enfoque inicial.',['Eritema y calor sin absceso','Puerta de entrada cutánea','Gravedad sistémica'],[('s-pyogenes','típico','Estreptococos β-hemolíticos predominan')],['WHO22'],'La selección depende de severidad, factores especiales y evaluación clínica.'),
 synd('piel-purulenta','Infección cutánea purulenta / absceso','Piel','La presencia de material purulento modifica los patógenos probables y puede requerir drenaje.',['Colección fluctuante','Secreción purulenta','Infección recurrente o previa por MRSA'],[('s-aureus-mssa','típico','S. aureus frecuente'),('s-aureus-mrsa','según_riesgo','Epidemiología y factores de riesgo')],['WHO22'],'El drenaje/control del foco puede ser central; no todo absceso requiere antibióticos.'),
 synd('intraabdominal','Infección intraabdominal secundaria','Abdomen','Con frecuencia es polimicrobiana: combinar cobertura entérica y anaerobia cuando esté indicada.',['Peritonismo o colección','Perforación o fuga','Cirugía reciente o contexto nosocomial'],[('e-coli','típico','Gramnegativos entéricos'),('b-fragilis','típico','Anaerobios intestinales'),('e-coli-blee','según_riesgo','Antecedente BLEE/uso de antibióticos'),('enterobacter-cloacae','contextual','Entorno hospitalario')],['WHO22','IDSA26'],'El control de foco es fundamental; metronidazol solo no cubre los aerobios entéricos.')]
# Encode only specifically curated antibiotic-organism associations. Absence means NOT YET EVALUATED, never no activity.
# status active=actividad posible habitual para aislados susceptibles; conditional=variabilidad clínica/resistencia; none=sin actividad útil.
R={}
def r(ant,org,status,note,source='UCSF',clinical='depende_de_foco'):
  key=(ant,org)
  if key in R: raise ValueError('duplicate '+str(key))
  R[key]=dict(antibiotic=ant,pathogen=org,status=status,note=note,clinical=clinical,sources=[source],review='pendiente_revision_editorial')
for a in ['amoxicilina','ampicilina','ceftriaxona','vancomicina-iv']:
 r(a,'s-pneumoniae','conditional','La susceptibilidad y el síndrome determinan si es una opción adecuada.','WHO22')
r('azitromicina','s-pneumoniae','conditional','Resistencia a macrólidos: no presumir actividad confiable.','UCSF')
r('amoxicilina','s-pyogenes','active','Penicilina/aminopenicilinas tienen papel establecido frente a GAS.','WHO22')
r('ampicilina','s-pyogenes','active','Generalmente activo frente a cepas habituales de GAS.','WHO22')
r('cefazolina','s-pyogenes','active','Actividad estreptocócica habitual; considerar el síndrome.','WHO22')
r('azitromicina','s-pyogenes','conditional','Resistencia a macrólidos y contexto local condicionan su utilidad.','UCSF')
for a in ['cefazolina','ampicilina']:
 r(a,'s-aureus-mssa','none' if a=='ampicilina' else 'active', 'Cefazolina es referencia importante para MSSA.' if a=='cefazolina' else 'Ampicilina simple no es confiable ante producción de penicilinasa.','UCSF')
for a in ['vancomicina-iv','linezolid','daptomicina','ceftarolina']:
 r(a,'s-aureus-mrsa','active','Actividad frente a MRSA susceptible; selección depende de foco y evidencia.','UCSF')
for a in ['doxiciclina','tmp-smx']:
 r(a,'s-aureus-mrsa','conditional','Considerar susceptibilidad y solo indicaciones seleccionadas, especialmente piel; no extrapolar a bacteriemia.','UCSF')
for a in ['cefazolina','ceftriaxona','cefepima','meropenem','ertapenem','amoxicilina']:
 r(a,'s-aureus-mrsa','none','El fenotipo MRSA impide utilizar β-lactámicos convencionales; ceftarolina es una excepción con indicaciones propias.','UCSF')
r('vancomicina-iv','s-aureus-mssa','active','Activo ante MSSA susceptible, pero los β-lactámicos antistafilocócicos suelen preferirse en enfermedad invasiva.','UCSF')
r('linezolid','s-aureus-mssa','active','Actividad microbiológica que no lo convierte automáticamente en primera elección.','UCSF')
for a in ['ampicilina','vancomicina-iv']:
 r(a,'e-faecalis','conditional','Confirmar susceptibilidad: Enterococcus no es uniforme entre especies ni fenotipos.','WHO22')
for a in ['cefazolina','ceftriaxona','cefepima']:
 r(a,'e-faecalis','none','Enterococcus presenta resistencia intrínseca clínicamente relevante a cefalosporinas.','OPENSTAX')
for a in ['ceftriaxona','cefepima','piptazo','meropenem','ertapenem','ciprofloxacino','levofloxacino','tmp-smx']:
 r(a,'e-coli','conditional','Actividad posible, condicionada a antibiograma y patrones de resistencia.','WHO22')
r('nitrofurantoina','e-coli','conditional','Actividad para infección localizada en vejiga si es susceptible; no tratar pielonefritis.','IDSA26','solo_vejiga')
r('amoxi-clav','e-coli','conditional','Actividad variable en Enterobacterales; verificar susceptibilidad y foco.','WHO22')
for a in ['meropenem','ertapenem']:
 r(a,'e-coli-blee','active','Carbapenémico recomendado para muchas infecciones invasivas por BLEE tras evaluar susceptibilidad y situación clínica.','IDSA26')
for a in ['ciprofloxacino','levofloxacino','tmp-smx']:
 r(a,'e-coli-blee','conditional','Puede ser opción en determinados focos solamente si se documenta susceptibilidad.','IDSA26')
r('nitrofurantoina','e-coli-blee','conditional','Suele conservar actividad en cistitis localizada; no apropiado para pielonefritis.','IDSA26','solo_vejiga')
r('piptazo','e-coli-blee','conditional','Alternativa restringida a ITU complicada sin bacteriemia ni enfermedad crítica; no sugerida fuera de vía urinaria.','IDSA26','evitar_invasiva_extraurinaria')
r('ceftriaxona','e-coli-blee','none','Las BLEE generalmente inactivan ceftriaxona; no presumir que es útil.','IDSA26')
r('cefepima','e-coli-blee','conditional','No sugerida para infección por BLEE fuera de cistitis no complicada aun con resultado in vitro favorable.','IDSA26','evitar_blee_invasiva')
r('ampicilina','k-pneumoniae','none','Klebsiella pneumoniae presenta resistencia intrínseca a ampicilina.','OPENSTAX')
for a in ['ceftriaxona','cefepima','piptazo','meropenem','ertapenem','ciprofloxacino']:
 r(a,'k-pneumoniae','conditional','La susceptibilidad depende del aislamiento; buscar BLEE o carbapenemasa si corresponde.','IDSA26')
for a in ['cefepima','piptazo','meropenem','ciprofloxacino','levofloxacino']:
 r(a,'p-aeruginosa','conditional','Actividad antipseudomónica en aislamiento susceptible; no deducir sensibilidad en variantes MDR/DTR.','IDSA26')
for a in ['ceftriaxona','ertapenem','amoxicilina','amoxi-clav','cefazolina','ceftarolina','nitrofurantoina']:
 r(a,'p-aeruginosa','none','No ofrece cobertura antipseudomónica clínica fiable.','UCSF')
for a in ['metronidazol','piptazo','meropenem','ertapenem']:
 r(a,'b-fragilis','conditional','Actividad anaerobia frecuente, pero susceptibilidad y control del foco importan.','WHO22')
for a in ['ceftriaxona','cefepima','azitromicina','daptomicina']:
 r(a,'b-fragilis','none','No constituye cobertura adecuada frente a B. fragilis.','UCSF')
for a in ['azitromicina','levofloxacino']:
 r(a,'legionella','active','Actividad frente a patógeno atípico intracelular, según guía clínica.','WHO22')
for a in ['amoxicilina','ampicilina','ceftriaxona','cefepima','piptazo','meropenem']:
 r(a,'legionella','none','Los β-lactámicos no son tratamiento útil para Legionella.','OPENSTAX')
for a in ['azitromicina','doxiciclina','levofloxacino']:
 r(a,'mycoplasma','active','Actividad frente al patógeno sin pared; resistencia y contexto clínico siguen importando.','OPENSTAX')
for a in ['amoxicilina','ampicilina','ceftriaxona','cefepima','piptazo','meropenem','ertapenem']:
 r(a,'mycoplasma','none','Carece de pared celular: los β-lactámicos carecen de diana.','OPENSTAX')
for a in ['cefepima','meropenem']:
 r(a,'enterobacter-cloacae','conditional','Puede ser útil si es susceptible; considerar riesgo de AmpC.','IDSA26')
r('ceftriaxona','enterobacter-cloacae','conditional','Riesgo de aparición de resistencia por AmpC: no sugerida para infecciones invasivas.','IDSA26','evitar_ampc_invasiva')
for a in ['ceftriaxona','cefepima','piptazo','meropenem','ertapenem','tmp-smx','ciprofloxacino']:
 r(a,'proteus-mirabilis','conditional','Confirmar susceptibilidad y circunstancias clínicas.','WHO22')
r('nitrofurantoina','proteus-mirabilis','none','Proteus mirabilis suele ser intrínsecamente resistente a nitrofurantoína.','UCSF')
for a in ['amoxi-clav','ceftriaxona','azitromicina','doxiciclina','levofloxacino']:
 r(a,'h-influenzae','conditional','Actividad variable por producción de β-lactamasas y otros mecanismos.','WHO22')
for a in ['amoxi-clav','ceftriaxona','azitromicina','doxiciclina']:
 r(a,'m-catarrhalis','conditional','Actividad variable; cepas productoras de β-lactamasa son frecuentes.','WHO22')

rules=[
 dict(id='nitro-no-pielo',drug='nitrofurantoina',syndromes=['pielonefritis','itu-complicada'],severity='blocked',reason='Nitrofurantoína no alcanza niveles adecuados para infección renal o sistémica.',sources=['IDSA26']),
 dict(id='nitro-solo-vejiga',drug='nitrofurantoina',syndromes=['cistitis'],severity='limited',reason='Solo considerar para infección localizada en vejiga con susceptibilidad esperada o conocida.',sources=['IDSA26']),
 dict(id='dapto-no-neumonia',drug='daptomicina',syndromes=['nac','neumonia-hospitalaria'],severity='blocked',reason='Daptomicina se inactiva por surfactante pulmonar: no usar en neumonía.',sources=['UCSF']),
 dict(id='blee-piptazo-extra',drug='piptazo',syndromes=['intraabdominal','neumonia-hospitalaria'],pathogens=['e-coli-blee'],severity='blocked',reason='IDSA 2026 no sugiere piperacilina/tazobactam para infección por BLEE fuera de vías urinarias.',sources=['IDSA26']),
 dict(id='blee-cefepima-extra',drug='cefepima',syndromes=['pielonefritis','itu-complicada','intraabdominal','neumonia-hospitalaria'],pathogens=['e-coli-blee'],severity='blocked',reason='IDSA no sugiere cefepima en infección por BLEE fuera de cistitis no complicada, aun si parece susceptible in vitro.',sources=['IDSA26']),
 dict(id='ampc-ceftriaxona-extra',drug='ceftriaxona',syndromes=['itu-complicada','intraabdominal','neumonia-hospitalaria'],pathogens=['enterobacter-cloacae'],severity='blocked',reason='La desrepresión de AmpC puede comprometer ceftriaxona durante el tratamiento invasivo.',sources=['IDSA26']),
 dict(id='metro-no-monoterapia-intra',drug='metronidazol',syndromes=['intraabdominal'],severity='warning',reason='Metronidazol solo no trata el componente aeróbico gramnegativo de una infección polimicrobiana.',sources=['WHO22'])
]
# Add illustrative context prompts without using patient-specific treatment algorithms.
knowledge=dict(version='0.1.0',updated='2026-10-21',name='ATB Atlas — cerebro inicial',editorialStatus='BORRADOR CLÍNICO NO VALIDADO PARA PRESCRIPCIÓN',disclaimer='Recurso educativo preliminar: no sustituye el antibiograma, guías vigentes, microbiología ni criterio clínico. Los cuadros de actividad no certifican susceptibilidad individual.',sourcePolicy='Cada vínculo explícito lleva referencias. La ausencia de vínculo equivale a SIN EVALUAR, nunca a resistencia.',sources=src,antibiotics=drugs,pathogens=bugs,syndromes=syndromes,spectrum=list(R.values()),siteRules=rules)
with open(P/'data/knowledge.json','w',encoding='utf-8') as f:json.dump(knowledge,f,ensure_ascii=False,indent=2)
print('Wrote',len(drugs),'antibiotics,',len(bugs),'pathogens,',len(syndromes),'syndromes,',len(R),'curated spectrum edges,',len(rules),'context rules.')