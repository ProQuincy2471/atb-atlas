/* INFEORA — Tratamiento por síndrome para cuadros sin pauta en el manual OMS AWaRe.
   Referencia consultada: Médecins Sans Frontières, «Clinical guidelines – Diagnosis and treatment manual»
   (exportación 30/01/2025). © MSF, todos los derechos reservados. Síntesis original en español: no reproduce ni traduce
   el libro; las dosis se usan como datos verificables y cada entrada cita las páginas consultadas.
   Misma estructura que data/who-aware-treatments.js para que la interfaz la muestre igual; c vacío = sin categoría AWaRe.
   Contenido educativo: no sustituye la guía nacional, la evaluación del paciente ni la ficha técnica. */
window.ATLAS25=window.ATLAS25||{};window.ATLAS25.msfTreat=window.ATLAS25.msfTreat||{};
(function(){
const T=window.ATLAS25.msfTreat;
const SRC=p=>'MSF Clinical guidelines (ed. 2025), pp. '+p;
const D=(c,t)=>({c,t});
const E=(t,first,second,dur,nota)=>({t,first:first||[],second:second||[],dur:dur||'',nota:nota||'',extra:[]});
const G=(p,esc)=>({p,esc});

T['severe-malaria-v25']={fuente:'msf',pag:'181–187',src:SRC('181–187'),abx:'si',
 res:'Toda fiebre (o fiebre en las 48 h previas) en alguien que vive en una zona endémica o viene de ella obliga a pensar en malaria. Confirmar con prueba rápida o gota gruesa siempre que se pueda, sin retrasar el tratamiento si no hay prueba. La malaria grave se define por complicaciones y es casi siempre por P. falciparum: hospitalizar.',
 pat:['Plasmodium falciparum (casi toda la malaria grave)','P. vivax y P. knowlesi (con menos frecuencia)','P. ovale, P. malariae'],
 alertas:['Signos de gravedad: alteración de conciencia o coma, más de 2 convulsiones en 24 h, postración, dificultad respiratoria, choque, ictericia, hemoglobinuria, sangrado anormal, insuficiencia renal aguda.','Medir hemoglobina y glucemia en toda malaria grave; la hipoglucemia es más frecuente con quinina IV.','Ante coma, descartar meningitis (punción lumbar) o iniciar antibiótico empírico.','Hidratar con cuidado: riesgo de edema pulmonar por sobrecarga.','Una prueba rápida HRP2 puede seguir positiva 6 semanas o más tras eliminar el parásito.'],
 grupos:[
  G('Malaria grave',[
   E('Tratamiento hospitalario',[D('','Artesunato IV lento (o IM en la cara anterior del muslo si no es posible IV; en choque, solo IV): < 20 kg 3 mg/kg por dosis; ≥ 20 kg y adulto 2,4 mg/kg por dosis, a las 0, 12 y 24 h y luego una vez al día')],
    [D('','Si no hay artesunato: arteméter IM (nunca IV) 3,2 mg/kg el día 1 y luego 1,6 mg/kg al día'),D('','Quinina IV (en sal), solo si persiste en el protocolo nacional o en choque sin artesunato IV: carga de 20 mg/kg en 4 h y, a las 8 h, 10 mg/kg cada 8 h (sin dosis de carga si recibió quinina o mefloquina en las 24 h previas)')],
    'Parenteral al menos 24 h (3 dosis de artesunato, 2 de arteméter); en cuanto tolere la vía oral, un ciclo completo de 3 días de TCA. Sin superar 7 días de tratamiento parenteral.',
    'Si al día 5 sigue con tratamiento parenteral, completar 7 días sin necesidad de TCA.'),
   E('Antes de un traslado',[D('','En la comunidad, niños < 6 años: artesunato rectal 10 mg/kg (2 meses–< 3 años: 1 cápsula de 100 mg; 3–< 6 años: 2 cápsulas)'),D('','En el dispensario: primera dosis de artesunato (o de arteméter)')],[],'Dosis única previa al traslado','Dar algo de azúcar antes o durante el traslado, sobre todo a los niños.')
  ]),
  G('Malaria no complicada',[
   E('P. falciparum',[D('','Una TCA por vía oral durante 3 días, elegida según la eficacia en la zona: arteméter-lumefantrina, artesunato-amodiaquina o dihidroartemisinina-piperaquina')],[D('','Quinina oral 7 días si persiste en el protocolo nacional: < 50 kg 10 mg/kg cada 8 h; ≥ 50 kg 600 mg cada 8 h')],'3 días',
    'En zonas de baja endemia, añadir primaquina 0,25 mg/kg en dosis única para reducir la transmisión (salvo niños < 30 kg, embarazo y lactancia de menores de 6 meses). Si los vómitos impiden la vía oral, tratar como malaria grave.'),
   E('P. vivax, P. ovale, P. malariae, P. knowlesi',[D('','Cloroquina oral (base): 10 mg/kg el día 1, 10 mg/kg el día 2 y 5 mg/kg el día 3')],[D('','TCA si la resistencia de P. vivax a cloroquina es > 10 % o el país la retiró')],'3 días',
    'Para evitar recaídas de P. vivax y P. ovale: primaquina 14 días (niño ≥ 15 kg 0,25–0,5 mg/kg/día; adulto 15 mg/día) solo donde la reinfección es improbable; contraindicada en déficit de G6PD.')
  ]),
  G('Embarazo',[
   E('Malaria en la embarazada',[D('','No complicada: cualquier TCA en todos los trimestres; P. vivax/ovale/malariae/knowlesi como en otros pacientes'),D('','Grave: artesunato (o arteméter) en todos los trimestres')],[D('','Si no hay TCA: quinina oral + clindamicina 10 mg/kg cada 12 h × 7 días')],'Como fuera del embarazo','No dar primaquina durante el embarazo.')
  ])
 ]};
T['chagas-cardiac-v25']={fuente:'msf',pag:'191–193',src:SRC('191–193'),abx:'cond',
 res:'El tratamiento etiológico (benznidazol o nifurtimox) está indicado en la fase aguda y en la crónica sin daño orgánico; no se recomienda cuando ya hay complicaciones cardiacas o digestivas, en las que el manejo es sintomático. Los protocolos varían por país.',
 pat:['Trypanosoma cruzi'],
 alertas:['Fase aguda: diagnóstico por visualización directa del parásito en sangre (fresca o microhematocrito); si la sospecha persiste, serología al mes.','Fase crónica: dos pruebas serológicas distintas a la vez (ELISA, HAI, IFI o prueba rápida); una tercera si discrepan.','Hasta un 30 % desarrolla daño orgánico: trastornos de conducción y miocardiopatía dilatada, megaesófago o megacolon; más riesgo en inmunodeprimidos.','Efectos adversos frecuentes: hemograma y función hepática y renal antes, durante y después del tratamiento.','Aconsejar no donar sangre; cribado de donantes en zonas endémicas.'],
 grupos:[G('Tratamiento etiológico',[
  E('Fase aguda o crónica sin complicaciones',[D('','Benznidazol oral: 2–12 años 5–8 mg/kg/día en 2 tomas; > 12 años y adultos 5–7 mg/kg/día en 2 tomas, durante 60 días')],
   [D('','Nifurtimox oral en 3–4 tomas durante 90 días: ≤ 10 años 15–20 mg/kg/día; 11–16 años 12,5–15 mg/kg/día; ≥ 17 años y adultos 8–10 mg/kg/día')],
   'Benznidazol 60 días · nifurtimox 90 días',
   'Ambos contraindicados en embarazo, lactancia e insuficiencia hepática o renal grave; nifurtimox además en trastorno mental grave o convulsiones. Sus efectos adversos (digestivos, agitación, insomnio, convulsiones) suelen ser reversibles y no obligan siempre a suspender; evitar alcohol y comidas grasas.')]),
  G('Con daño cardiaco o digestivo',[E('Miocardiopatía, megaesófago, megacolon',[D('','Tratamiento sintomático: insuficiencia cardiaca, arritmias, dolor y convulsiones según cada capítulo')],[],'','El tratamiento antiparasitario no se recomienda en esta fase.')])]};

T['leishmaniasis-v25']={fuente:'msf',pag:'194–196',src:SRC('194–196'),abx:'si',
 res:'La respuesta depende de la especie y de la región: seguir el protocolo nacional. En la forma visceral, la hidratación, el soporte nutricional y el tratamiento de infecciones intercurrentes (malaria, disentería, neumonía) son tan importantes como el antiparasitario.',
 pat:['Leishmania spp. (más de 20 especies; L. donovani/infantum en la forma visceral)'],
 alertas:['Visceral: fiebre irregular > 2 semanas, esplenomegalia, pérdida de peso, anemia, pancitopenia; mortal sin tratamiento.','Diagnóstico visceral: parásitos en aspirado de bazo (el más sensible, con riesgo teórico de hemorragia), médula ósea o ganglio; rK39 o DAT para el primer episodio. La recaída solo se confirma con parasitología.','Sospechar tuberculosis o VIH si recae más de una vez o falla el tratamiento.','Cutánea: suele curar sola en 3–6 meses; tratar solo si persiste > 6 meses, desfigura, ulcera o se disemina. Tratar la sobreinfección bacteriana de las úlceras.'],
 grupos:[
  G('Visceral · África oriental',[
   E('Primer episodio',[D('','Antimonial pentavalente IM o IV lento 20 mg/kg/día × 17 días + paromomicina IM 15 mg (11 mg base)/kg/día × 17 días')],
    [D('','Recaída o grupos vulnerables (enfermedad grave, embarazo, > 45 años): anfotericina B liposomal IV 3–5 mg/kg/día × 6–10 días hasta 30 mg/kg en total')],'17 días (primera línea)',''),
   E('Coinfección por VIH',[D('','Anfotericina B liposomal IV 3–5 mg/kg/día × 6–10 días (total 30 mg/kg) + miltefosina oral 28 días: 2–11 años 2,5 mg/kg/día; ≥ 12 años y < 25 kg 50 mg/día; 25–50 kg 50 mg cada 12 h; > 50 kg 50 mg cada 8 h')],[],'28 días','')]),
  G('Visceral · Asia meridional',[
   E('Primer episodio',[D('','Anfotericina B liposomal IV 3–5 mg/kg/día × 3–5 días hasta 15 mg/kg en total, o 10 mg/kg en dosis única')],
    [D('','Recaída: anfotericina B liposomal 3–5 mg/kg/día × 5–8 días hasta 25 mg/kg en total')],'3–5 días o dosis única','')]),
  G('Cutánea y mucocutánea',[
   E('Una o pocas lesiones',[D('','Antimonial pentavalente intralesional 1–2 ml (en el nódulo, o en bordes y base de la úlcera) cada 3–7 días × 2–4 semanas; puede suspenderse cuando empieza a cicatrizar')],
    [D('','Miltefosina oral 28 días (dosis como en la visceral), eficaz en muchas formas'),D('','Formas graves: antimonial IM 20 mg/kg/día × 10–20 días bajo vigilancia estrecha')],'2–4 semanas',''),
   E('Mucocutánea',[D('','Como la leishmaniasis visceral')],[],'','')]),
  G('Leishmaniasis dérmica post-kala-azar',[
   E('Solo si es grave, desfigurante, dura > 6 meses o (en niños) las lesiones orales impiden comer',[D('','África oriental: antimonial 20 mg/kg/día × 17–60 días + paromomicina 15 mg/kg/día × 17 días, o anfotericina B liposomal 2,5 mg/kg/día × 20 días'),D('','Asia meridional: anfotericina B liposomal 5 mg/kg dos veces por semana hasta 30 mg/kg en total')],[D('','Miltefosina 28 días, útil en coinfección por VIH')],'Según pauta','')])
 ]};

T['strongyloides-v25']={fuente:'msf',pag:'208–210',src:SRC('208–210'),abx:'si',
 res:'La ivermectina es la primera línea de la estrongiloidiasis. La autoinfección permite que la infección persista décadas; con corticoides u otra inmunosupresión puede convertirse en hiperinfección con diseminación de larvas (SNC, corazón), refractaria al tratamiento habitual.',
 pat:['Strongyloides stercoralis'],
 alertas:['Larva currens: lesión lineal, serpiginosa, muy pruriginosa, que avanza 5–10 cm por hora en región anal y tronco.','La hiperinfección exacerba los síntomas pulmonares y digestivos y aparece sobre todo con tratamiento inmunosupresor (corticoides).','Diagnóstico por examen parasitológico de heces (larvas).'],
 grupos:[G('Tratamiento',[
  E('Estrongiloidiasis aguda o crónica',[D('','Ivermectina oral en ayunas: > 15 kg y adultos 200 µg/kg en dosis única')],[D('','Albendazol oral 3 días (menos eficaz): > 6 meses y adultos 400 mg/día (200 mg/día si < 10 kg)')],'Dosis única (ivermectina) · 3 días (albendazol)',''),
  E('Hiperinfección',[D('','Pautas prolongadas o de dosis múltiples intermitentes; el manual remite a protocolos especializados')],[],'Prolongada','Resistente a la terapia convencional: manejo hospitalario especializado.')])]};

T['neurocysticercosis-v25']={fuente:'msf',pag:'206',src:SRC('206'),abx:'cond',
 res:'La neurocisticercosis y la cisticercosis ocular deben manejarse en centros especializados. Dar antiparasitarios sin conocer la localización y el estadio de las lesiones por TC o RM puede empeorar los síntomas e incluso poner en riesgo la vida; puede requerirse neurocirugía.',
 pat:['Taenia solium (forma larvaria)'],
 alertas:['Manifestaciones: cefalea, convulsiones, coma; musculares (asintomática o mialgias), subcutáneas (nódulos) y oculares (exoftalmos, estrabismo, iritis).','Hipereosinofilia en sangre y LCR.','Transmisión por huevos de T. solium en alimentos contaminados o por autoinfección: tratar a los portadores de tenia, higiene y cocción completa de la carne.'],
 grupos:[G('Manejo',[
  E('Neurocisticercosis u ocular',[D('','Derivar a un centro especializado con TC o RM antes de decidir el tratamiento antiparasitario')],[],'','El manual no da una pauta para atención primaria; el tratamiento antiparasitario, el corticoide y el antiepiléptico se deciden según la imagen.')])]};

T['dengue-critical']={fuente:'msf',pag:'268–272',src:SRC('268–272'),abx:'no',
 res:'No hay tratamiento antiviral específico: el manejo es de soporte y se basa en clasificar al paciente (grupos A, B o C) y en una reposición de líquidos medida para evitar tanto el choque como la sobrecarga. La fase crítica aparece entre el día 3 y el 7, cuando baja la fiebre.',
 pat:['Virus del dengue (4 serotipos); una segunda infección por otro serotipo aumenta el riesgo de dengue grave'],
 alertas:['Signos de alarma: dolor abdominal intenso, vómitos persistentes, acumulación de líquido (ascitis, derrame), sangrado de mucosas, hepatomegalia > 2 cm, hipotensión postural, agitación o letargo, hematocrito en ascenso.','Dengue grave: fuga plasmática con dificultad respiratoria o choque, sangrado grave o daño orgánico (transaminasas > 1 000 UI/l, miocarditis, alteración de conciencia).','No usar ácido acetilsalicílico, ibuprofeno ni otros AINE; evitar inyecciones IM y sondas.','Paracetamol con intervalos de 6–8 h; no darlo si las transaminasas superan 10 veces el límite normal.','Diagnóstico: antígeno NS1 en la fase febril (prueba rápida o ELISA); IgM desde el día 5–6 apoya pero no confirma. En zonas endémicas, descartar siempre malaria.'],
 grupos:[
  G('Grupo A · ambulatorio',[E('Sin signos de alarma, bebe bien y orina normal',[D('','Reposo, buena hidratación oral y paracetamol para fiebre y dolor')],[],'Mientras dure la fiebre','Volver de inmediato si no mejora, vomita sin parar, tiene extremidades frías, agitación o letargo, dificultad respiratoria o deja de orinar. Hospitalizar si no puede vigilarse en casa.')]),
  G('Grupo B · hospitalizado',[
   E('Signos de alarma, comorbilidad, riesgo de sangrado, embarazo, < 1 año o ≥ 65 años, o no puede beber',[D('','Mosquitero, hidratación oral (con SRO) y paracetamol con prudencia: niño 10 mg/kg y adulto 500 mg cada 6–8 h'),D('','Si bebe poco: niño glucosa 5 % + Ringer lactato según Holliday-Segar (4 ml/kg/h los primeros 10 kg, 2 ml/kg/h los 10 siguientes y 1 ml/kg/h por cada kg más); adulto Ringer lactato 2–3 ml/kg/h')],[],'Hasta que desaparezcan los signos de alarma','Vigilar constantes, ingresos y diuresis cada 4 h; hematocrito antes y después de cada aporte de líquidos.'),
   E('Con signos de alarma: bolos de Ringer lactato',[D('','10 ml/kg en 1 h (5 ml/kg si ≥ 65 años o comorbilidad); reevaluar y repetir hasta 3 bolos'),D('','Si mejora: 5–7 ml/kg/h × 2–4 h, luego 3–5 ml/kg/h × 2–4 h y 2–4 ml/kg/h durante 24–48 h (en ancianos o con comorbilidad: 5, luego 3 y 2 ml/kg/h)')],[],'24–48 h','Si no mejora tras 3 bolos, manejar como dengue grave en cuidados intensivos. Si empeora después de mejorar, volver a los bolos. Suspender los líquidos en cuanto sea posible.')]),
  G('Grupo C · cuidados intensivos',[E('Dengue grave',[D('','Tratamiento urgente del choque y de las complicaciones (sangrado grave, acidosis, coagulopatía) en una unidad de cuidados intensivos')],[],'','')])
 ]};

T['viral-hepatitis']={fuente:'msf',pag:'263–267',src:SRC('263–267'),abx:'no',
 res:'Las hepatitis A y E son agudas y no se cronifican; B, C y D pueden evolucionar a cirrosis y hepatocarcinoma. La fase aguda se maneja con soporte; el tratamiento antiviral se reserva para la hepatitis B crónica activa con criterios y para la hepatitis C crónica.',
 pat:['Virus de las hepatitis A, B, C, D (delta) y E'],
 alertas:['Formas fulminantes: más frecuentes en la sobreinfección B + D y en la hepatitis E del tercer trimestre del embarazo (mortalidad cercana al 20 %).','Diagnóstico: IgM anti-VHA, anti-VHD y anti-VHE; HBsAg (crónica si persiste > 6 meses; activa si HBeAg y/o ADN-VHB); anti-VHC y ARN-VHC (crónica si viremia > 6 meses). Pedir siempre prueba de VIH.','Fibrosis: índice APRI > 1 indica probable fibrosis grave; elastografía F0–F4.','Fase aguda: reposo e hidratación; evitar fármacos sintomáticos (analgésicos, antipiréticos, antieméticos), que pueden empeorar el curso; los corticoides no están indicados; suprimir el alcohol.','Capítulo actualizado en octubre de 2021: los criterios de tratamiento de hepatitis B y las combinaciones frente a VHC han evolucionado; contrastar con la guía vigente (OMS 2024, AASLD/EASL).'],
 grupos:[
  G('Hepatitis B crónica activa',[
   E('Sin VIH: tratar si hay cirrosis o fibrosis avanzada (APRI > 1,5 o elastografía F3–F4 > 10 kPa), HBsAg con ALT/AST > 2 veces el normal en dos determinaciones separadas 3–6 meses, o ALT/AST elevadas con carga viral > 20 000 UI/ml',[D('','Tenofovir disoproxil fumarato 300 mg una vez al día con comida, de por vida (≥ 12 años y adultos, también en el embarazo)')],[],'De por vida',''),
   E('Con VIH',[D('','Tratamiento antirretroviral de por vida que incluya tenofovir')],[],'De por vida','No usar tenofovir en monoterapia ni en biterapia con lamivudina o emtricitabina (riesgo de resistencia del VIH).')]),
  G('Hepatitis C crónica',[
   E('Genotipos 1–6, sin cirrosis o con cirrosis compensada',[D('','Sofosbuvir/velpatasvir 400/100 mg una vez al día × 12 semanas')],[D('','Sofosbuvir/daclatasvir 400/60 mg una vez al día: 12 semanas (genotipos 1, 2, 4, 5, 6 o genotipo 3 sin cirrosis) o 24 semanas (genotipo 3 con cirrosis compensada)')],'12 semanas (24 en cirrosis descompensada)',
    'En cirrosis descompensada (ascitis, ictericia, confusión o hemorragia digestiva), misma pauta durante 24 semanas. Contraindicado en embarazo y lactancia: ofrecer anticoncepción y no iniciar en mujeres que no la deseen.')]),
  G('Prevención de la hepatitis B',[
   E('Vacunación',[D('','Recién nacido: primera dosis en las primeras 24 h y luego a las 6 y 14 semanas (o 6, 10 y 14 semanas según el calendario nacional)'),D('','Rescate en no vacunados: 0, 1 y 6 meses'),D('','Profilaxis posexposición: días 0, 7 y 21–30, con refuerzo a los 12 meses')],[],'','Al nacer solo puede usarse la vacuna monovalente.')])
 ]};

})();
