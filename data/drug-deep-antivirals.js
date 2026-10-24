/* INFEORA — Revisión ampliada por fármaco: antivirales.
   Fuentes: Murray PR et al. Medical Microbiology, 9.ª ed., cap. 40 «Antiviral Agents and Infection Control» (pp. 403–410);
   material de Farmacología «Antivirales» (curso Dr. Prieto, resumen del usuario, no es fuente primaria);
   Guía de Manejo Antirretroviral de las Personas con VIH, México 2025 (tabla 2.8 y notas).
   Murray (2018) no cubre los antivirales posteriores (p. ej. letermovir, maribavir, nirmatrelvir, lenacapavir): para esos agentes la ficha solo
   registra lo que sostienen las fuentes locales y lo señala. Dosis, ajuste renal e interacciones: ficha técnica y guía vigente. Síntesis editorial original. */
window.ATLAS25=window.ATLAS25||{};window.ATLAS25.drugDeep=window.ATLAS25.drugDeep||{};
(function(){
const D=window.ATLAS25.drugDeep,reviewed='2026-10-23';
const M='Murray, Medical Microbiology 9.ª ed., cap. 40, pp. 403–410',P='Material de Farmacología «Antivirales» (Dr. Prieto), pp. 1–2',G='Guía de Manejo Antirretroviral México 2025, tabla 2.8 y notas';
const gap="Este fármaco no se describe de forma específica en las fuentes locales de esta ficha; revisar ficha técnica y guías actuales (IDSA, CDC, OMS, Guía TAR México) antes de usar la información.";

/* ---------- Herpesvirus: análogos de nucleósidos ---------- */
const hsvMech="Análogo acíclico de la guanosina (aciclo-guanosina): su cadena lateral hidroxietoximetil sustituye a la ribosa/desoxirribosa. Se activa en tres pasos: la timidina cinasa viral de HSV y VZV aporta el primer fosfato (monofosfato) y las cinasas celulares completan hasta difosfato y trifosfato. El trifosfato actúa como sustrato falso de la ADN polimerasa viral y, al carecer de grupo 3′-hidroxilo, termina la elongación de la cadena. Como el fármaco no se fosforila en células no infectadas, no hay metabolito activo que inhiba la síntesis celular de ADN, y la polimerasa viral lo usa ≥ 100 veces más que las polimerasas celulares: de ahí su baja toxicidad.";
const hsvRes="Mutación de la timidina cinasa (el aciclovir no se activa; los mutantes sin actividad de TK son resistentes) o de la ADN polimerasa (impide la unión del fármaco). Penciclovir y famciclovir comparten el mismo mecanismo de resistencia.";
D['aciclovir']={reviewed,src:[M,P],
 mecanismo:[hsvMech],
 espectro:["Acción selectiva sobre los herpesvirus que codifican timidina cinasa: HSV y VZV. VZV es menos sensible, en parte porque su timidina cinasa fosforila el aciclovir con menor eficiencia, por lo que requiere dosis mayores. No es el fármaco de elección para CMV (que no codifica timidina cinasa)."],
 farmacocinetica:["La forma oral tiene menor biodisponibilidad que su éster valílico (valaciclovir), que se absorbe mejor y se convierte rápidamente en aciclovir. Detalle de dosis, ajuste renal e hidratación en la ficha técnica y la guía clínica vigentes (no incluidos en las fuentes locales)."],
 indicaciones:["Infecciones por HSV y VZV (formas tópica, oral e intravenosa) según el cuadro clínico y la gravedad; las pautas concretas están en las fichas de los microorganismos y en las guías vigentes."],
 seguridad:["Toxicidades características según la presentación: queratopatía punteada (ungüento oftálmico), cefalea y reacciones neuropsiquiátricas (vía oral) y nefrotoxicidad (vía intravenosa)."],
 resistencia:[hsvRes],
 notas:["Murray describe la toxicidad mínima como consecuencia de la activación selectiva en células infectadas. Fuentes: Murray cap. 40 y resumen de Prieto."]};
D['valaciclovir']={reviewed,src:[M,P],
 mecanismo:["Éster valílico de aciclovir, profármaco con mejor absorción oral que se convierte rápidamente en aciclovir; a partir de ahí el mecanismo es el del aciclovir: fosforilación inicial por la timidina cinasa viral, activación a trifosfato por cinasas celulares y terminación de la cadena de ADN viral."],
 espectro:["HSV y VZV (los mismos que aciclovir). Aumenta la biodisponibilidad de aciclovir para el tratamiento de HSV y de VZV grave. VZV requiere dosis más altas por su menor sensibilidad."],
 farmacocinetica:["Murray: se absorbe más eficientemente por vía oral y se convierte rápido en aciclovir. Los detalles de dosis y función renal no están en las fuentes locales de esta ficha."],
 indicaciones:["Infecciones por HSV y VZV por vía oral cuando se busca mayor biodisponibilidad que aciclovir oral."],
 seguridad:["Mismo perfil que aciclovir oral: cefalea y reacciones neuropsiquiátricas (Prieto). Precauciones renales: ver ficha técnica."],
 resistencia:[hsvRes],
 notas:["Datos de Murray cap. 40 y resumen de Prieto."]};
D['famciclovir']={reviewed,src:[M],
 mecanismo:["Profármaco de penciclovir bien absorbido por vía oral, que se convierte en penciclovir en el hígado o en la mucosa intestinal. Penciclovir inhibe HSV y VZV igual que el aciclovir (activación por la timidina cinasa viral y terminación de la cadena de ADN), pero se concentra y persiste más tiempo en las células infectadas que el aciclovir."],
 espectro:["HSV y VZV; el penciclovir muestra además cierta actividad frente a EBV y CMV (Murray)."],
 farmacocinetica:["Absorción oral buena del profármaco y conversión hepática/intestinal a penciclovir. Persistencia intracelular mayor que aciclovir (Murray). Dosis: ficha técnica."],
 indicaciones:["Infecciones por HSV y VZV (vía oral)."],
 seguridad:["Las fuentes locales no describen toxicidades específicas de famciclovir; consultar ficha técnica."],
 resistencia:["Se desarrolla del mismo modo que para el aciclovir (alteración de la timidina cinasa o de la ADN polimerasa)."],
 notas:["Datos de Murray cap. 40."]};
D['penciclovir']={reviewed,src:[M],
 mecanismo:["Análogo acíclico de guanosina que inhibe HSV y VZV igual que el aciclovir: la timidina cinasa viral inicia la fosforilación y el trifosfato termina la cadena de ADN viral. Se concentra y persiste más en las células infectadas que el aciclovir."],
 espectro:["HSV y VZV, con cierta actividad frente a EBV y CMV (Murray)."],
 farmacocinetica:["Murray lo lista con el nombre comercial Denavir; el profármaco oral es famciclovir. Sin más detalle en las fuentes locales."],
 indicaciones:["Infecciones por HSV y VZV según Murray (tabla 40.2); la vía y la indicación concreta no se detallan en las fuentes locales."],
 seguridad:["Sin datos específicos en las fuentes locales."],
 resistencia:["Mismo mecanismo que aciclovir."],
 notas:["Datos de Murray cap. 40."]};
D['ganciclovir']={reviewed,src:[M,P],
 mecanismo:["Análogo de guanosina (dihidroxipropoximetil guanina): su cadena acíclica lleva un grupo hidroximetilo adicional respecto al aciclovir, lo que le confiere actividad considerable frente a CMV. CMV no codifica timidina cinasa; una proteína cinasa codificada por el virus fosforila el ganciclovir. Una vez activado, inhibe todas las ADN polimerasas de herpesvirus, que tienen alrededor de 30 veces más afinidad por el fármaco que la polimerasa celular, y termina la cadena."],
 espectro:["Activo frente a CMV y, una vez activado, inhibe las polimerasas de los herpesvirus en general. Su uso se centra en CMV."],
 farmacocinetica:["Valganciclovir es el éster valílico desarrollado para mejorar las propiedades farmacológicas del ganciclovir (Murray)."],
 indicaciones:["Infecciones por CMV; el uso está limitado por su toxicidad (Murray)."],
 seguridad:["La toxicidad de médula ósea y otras limita su uso. Toxicidades características (Prieto): neutropenia, trombocitopenia, fiebre, erupción, síntomas gastrointestinales, confusión y convulsiones (con uso concomitante de imipenem)."],
 resistencia:["Las fuentes locales describen resistencia a análogos por mutación de la polimerasa; para CMV se remite a las guías vigentes."],
 notas:["Murray señala el potencial de toxicidad como base de una estrategia antitumoral con timidina cinasa de HSV (terapia génica); sin relevancia clínica rutinaria."]};
D['valganciclovir']={reviewed,src:[M,P],
 mecanismo:["Éster valílico del ganciclovir, desarrollado para mejorar sus propiedades farmacológicas. Una vez convertido en ganciclovir, la proteína cinasa viral lo fosforila y el trifosfato inhibe las ADN polimerasas de herpesvirus y termina la cadena."],
 espectro:["CMV (y herpesvirus en general, como ganciclovir)."],
 farmacocinetica:["Profármaco oral de ganciclovir (Murray lista la forma Valcyte). Sin otros datos en las fuentes locales."],
 indicaciones:["Infecciones por CMV."],
 seguridad:["Comparte las toxicidades del ganciclovir: neutropenia, trombocitopenia, fiebre, erupción, síntomas gastrointestinales (Prieto)."],
 resistencia:["Ver ganciclovir."],
 notas:["Las fuentes locales no contienen dosis ni ajustes renales: consultar ficha técnica."]};
D['foscarnet']={reviewed,src:[M,P],
 mecanismo:["Análogo de pirofosfato (fosfonoformato, PFA): se une al sitio de unión del pirofosfato de la ADN polimerasa y bloquea la unión del nucleótido. A diferencia de los análogos de nucleósidos, no requiere fosforilación por cinasas virales (p. ej. timidina cinasa). Inhibe la ADN polimerasa de todos los herpesvirus y la transcriptasa inversa de VIH."],
 espectro:["Todos los herpesvirus y VIH. Aprobado para retinitis por CMV en pacientes con sida."],
 farmacocinetica:["Por su capacidad de quelar cationes divalentes (p. ej. calcio) y su incorporación al hueso, puede producir alteraciones renales y de otro tipo (Murray)."],
 indicaciones:["Retinitis por CMV en sida (Murray). Es una opción cuando no se puede usar un análogo que dependa de la timidina cinasa."],
 seguridad:["Toxicidades características (Prieto): fiebre, náusea, anemia, vómito, diarrea, cefalea, convulsiones y dermatitis por contacto en el área genital (por la concentración urinaria alta). Quelación de calcio y otros iones y problemas renales (Murray)."],
 resistencia:["Por mutación de la polimerasa; no depende de la timidina cinasa."],
 notas:["Datos de Murray cap. 40 y resumen de Prieto."]};
D['cidofovir']={reviewed,src:[M],
 mecanismo:["Análogo nucleotídico de citidina que contiene un grupo fosfato unido al análogo del azúcar: evita la fosforilación inicial por una enzima viral. Es sustrato de ADN polimerasas o transcriptasas inversas y tiene un espectro mayor de virus susceptibles."],
 espectro:["Aprobado para infecciones por CMV en pacientes con sida; inhibe además replicación de poliomavirus y papilomavirus, las polimerasas de otros herpesvirus, adenovirus y poxvirus (Murray)."],
 farmacocinetica:["Sin datos específicos en las fuentes locales."],
 indicaciones:["Retinitis por CMV en sida; Murray lista adenovirus (tabla 40.2)."],
 seguridad:["Las fuentes locales no describen toxicidades; consultar ficha técnica y guías."],
 resistencia:["Por mutación de la polimerasa."],
 notas:["Datos de Murray cap. 40."]};

/* ---------- Influenza y respiratorios ---------- */
const nai="Inhiben la neuraminidasa del virus de la influenza, enzima que rompe el ácido siálico. Sin ella, la hemaglutinina se une a esos azúcares de otras glicoproteínas, forma agregados y se impide el ensamblaje y la liberación del virus, lo que reduce su propagación en el tracto respiratorio. A diferencia de amantadina y rimantadina, actúan frente a influenza A y B.";
D['oseltamivir']={reviewed,src:[M,P],
 mecanismo:[nai],
 espectro:["Influenza A y B."],
 farmacocinetica:["Sin datos específicos en las fuentes locales."],
 indicaciones:["Murray: puede tomarse como profilaxis alternativa a la vacuna o, si se inicia en las primeras 48 horas de infección, acorta la duración de la enfermedad. Las guías vigentes (CDC/IDSA/OMS) determinan hoy ventanas y poblaciones, incluidos pacientes graves."],
 seguridad:["Alteraciones gastrointestinales y erupción; broncoespasmo en asmáticos (raro) (Prieto)."],
 resistencia:["Mutaciones de la neuraminidasa causan resistencia."],
 notas:["Murray (2018) menciona la ventana de 48 h; no sustituye las guías actuales."]};
D['zanamivir']={reviewed,src:[M,P],
 mecanismo:[nai],
 espectro:["Influenza A y B."],
 farmacocinetica:["Sin datos en las fuentes locales."],
 indicaciones:["Murray: profilaxis o tratamiento en las primeras 48 h; ver guías vigentes."],
 seguridad:["Broncoespasmo en asmáticos (raro), alteraciones gastrointestinales y erupción (Prieto)."],
 resistencia:["Mutaciones de la neuraminidasa."],
 notas:["Datos de Murray y Prieto."]};
D['peramivir']={reviewed,src:[M,P],
 mecanismo:[nai],
 espectro:["Influenza A y B."],
 farmacocinetica:["Murray lo lista como Rapivab; sin más datos locales."],
 indicaciones:["Tratamiento de influenza A y B; ver guías vigentes."],
 seguridad:["Perfil de clase: alteraciones gastrointestinales, erupción y broncoespasmo raro en asmáticos (Prieto)."],
 resistencia:["Mutaciones de la neuraminidasa."],
 notas:["Datos de Murray y Prieto."]};
D['baloxavir']={reviewed,src:[M],
 mecanismo:["Baloxavir marboxil inhibe la subunidad de la polimerasa de influenza que «roba la caperuza» (cap snatching), es decir, la actividad endonucleasa que corta la porción cap de ARNm celulares para usarla como cebador en la transcripción del ARNm viral. Murray lo describe como un análogo de nucleósido que inhibe esa endonucleasa."],
 espectro:["Influenza A y B."],
 farmacocinetica:["Sin datos en las fuentes locales."],
 indicaciones:["Tratamiento de influenza A y B (Murray tabla 40.2)."],
 seguridad:["Sin datos en las fuentes locales."],
 resistencia:["Sin datos en las fuentes locales."],
 notas:[gap]};
D['amantadina']={reviewed,src:[M,P],
 mecanismo:["Amina anfipática, acidotrópica: se concentra y tampona el contenido de las vesículas endosomales por donde entra el virus. Su especificidad por influenza A se debe a que se une al canal protónico formado por la proteína M2 y lo bloquea. Sin entrada de H+, las proteínas de matriz M1 no se disocian de la nucleocápside (no hay desnudamiento), de modo que no avanza el movimiento al núcleo ni la transcripción y replicación. Al bloquear el poro también se altera el procesamiento de la hemaglutinina al final del ciclo: en ausencia de un canal M2 funcional, la hemaglutinina adopta su forma de fusión de manera inoportuna y se inactiva al atravesar el Golgi ácido."],
 espectro:["Solo influenza A (no B). También es una alternativa en enfermedad de Parkinson (Murray)."],
 farmacocinetica:["Sin datos en las fuentes locales."],
 indicaciones:["Prieto: la resistencia identificada durante la pandemia de 2009 motiva que ya no se recomiende para el tratamiento de la influenza. Murray (2018) lo describe como útil dentro de las 48 h de la exposición y como profilaxis; no refleja la práctica actual."],
 seguridad:["Alucinaciones, mareo, xerostomía, edema periférico, estreñimiento e hipotensión ortostática (Prieto); principal toxicidad sobre el SNC: nerviosismo, irritabilidad e insomnio (Murray)."],
 resistencia:["Por alteración de la proteína M2 o de la hemaglutinina."],
 notas:["Estado de vigencia: no recomendada para influenza (Prieto)."]};
D['remdesivir']={reviewed,src:[P],
 mecanismo:["Análogo de adenosina que inhibe la ARN polimerasa dependiente de ARN de SARS-CoV-2, esencial para la replicación viral."],
 espectro:["SARS-CoV-2."],
 farmacocinetica:["Sin datos en las fuentes locales."],
 indicaciones:["COVID-19; indicación y momento según guías vigentes (no contenidas en las fuentes locales)."],
 seguridad:["Bradicardia, elevación de transaminasas (TGO/TGP) y reacciones de hipersensibilidad, incluida anafilaxia (Prieto)."],
 resistencia:["Sin datos en las fuentes locales."],
 notas:["Fuente única: resumen de Prieto."]};
D['ribavirina']={reviewed,src:[M],
 mecanismo:["Análogo de la guanosina. El monofosfato se parece al GMP: inhibe la biosíntesis de nucleósidos y el caperuzado del ARNm. Depleta las reservas celulares de guanina al inhibir la inosina monofosfato deshidrogenasa; impide la síntesis del cap 5′ del ARNm al interferir con la guanililación y metilación; y el trifosfato inhibe ARN polimerasas y promueve la hipermutación del genoma viral. Sus múltiples sitios de acción podrían explicar la falta de mutantes resistentes."],
 espectro:["Virus sincitial respiratorio, virus Lassa y otras fiebres hemorrágicas (Rift Valley, Crimea-Congo, Corea, fiebre hemorrágica argentina); influenza B; HCV en combinación con IFN-α y inhibidores de proteasa (Murray)."],
 farmacocinetica:["Aerosol para bronconeumonía grave por VSR en niños y potencialmente en adultos con influenza grave o sarampión; oral o intravenosa para fiebres hemorrágicas (Murray)."],
 indicaciones:["VSR, fiebres hemorrágicas virales, HCV en combinación (esquema histórico)."],
 seguridad:["Murray: el tratamiento puede tener efectos secundarios graves; no detalla cuáles."],
 resistencia:["Poco probable por sus múltiples dianas (Murray)."],
 notas:["El tratamiento actual de HCV se basa en antivirales de acción directa (ver sus fichas)."]};
D['peginterferon-alfa']={reviewed,src:[M],
 mecanismo:["Los interferones se unen a receptores de superficie celular e inician una respuesta antiviral: se intensifica la degradación de ARNm viral y celular, se bloquea el ensamblaje ribosomal y se impide la síntesis de proteínas y la replicación viral; además estimulan la respuesta inmune y la depuración inmune de la infección. La pegilación (unión de polietilenglicol) aumenta su potencia."],
 espectro:["Aprobado para condiloma acuminado (papilomavirus) y hepatitis C en combinación (Murray)."],
 farmacocinetica:["Sin datos en las fuentes locales."],
 indicaciones:["Hepatitis C con ribavirina (esquema histórico) y condiloma acuminado."],
 seguridad:["Síntomas pseudogripales, como los del interferón natural durante infecciones virémicas (Murray)."],
 resistencia:["Sin datos en las fuentes locales."],
 notas:["Para hepatitis B y D, ver las fichas de los virus; las fuentes locales no detallan su uso actual."]};

/* ---------- VIH y VHB: nucleósidos/nucleótidos ---------- */
const nrti="Los ITIN/ITINt se fosforilan (por enzimas celulares) y se incorporan a la cadena de ADN viral en elongación, produciendo su terminación al carecer de 3′-hidroxilo. La transcriptasa inversa de VIH los usa en cantidades y a una velocidad superiores a los de la polimerasa celular (alrededor de 100 veces mayor sensibilidad de la enzima viral en el caso del AZT).";
D['zidovudina']={reviewed,src:[M,P],
 mecanismo:["Análogo de timidina (azidotimidina, AZT), originalmente desarrollado como antineoplásico y primera terapia útil del VIH. Los enzimas del huésped la fosforilan; carece del 3′-hidroxilo necesario para la elongación y bloquea la síntesis de ADN complementario. La polimerasa del huésped es unas 100 veces menos sensible que la transcriptasa inversa."],
 espectro:["VIH."],
 farmacocinetica:["Sin datos específicos en las fuentes locales."],
 indicaciones:["Murray: tratamiento continuo en personas con CD4 bajos; el tratamiento de mujeres embarazadas con VIH puede reducir o prevenir la transmisión al bebé. Actualmente se usa en combinaciones; ver la guía TAR vigente."],
 seguridad:["Desde náuseas hasta toxicidad medular que puede poner en peligro la vida (Murray); anemia y neutropenia en la clase (Prieto)."],
 resistencia:["La alta tasa de error de la polimerasa del VIH favorece mutaciones y cepas resistentes; por eso se administra con terapia combinada (HAART). Murray añade que las cepas con resistencia múltiple tienden a ser menos aptas."],
 notas:["Fuentes: Murray cap. 40 y Prieto."]};
D['lamivudina']={reviewed,src:[M,P,G],
 mecanismo:["Análogo de citidina (2′-desoxi-3′-tiacitidina, 3TC); su azúcar modificado inhibe la transcriptasa inversa de VIH al impedir la elongación de la cadena de ADN. También activo sobre la polimerasa de VHB."],
 espectro:["VIH y VHB."],
 farmacocinetica:["Sin datos en las fuentes locales."],
 indicaciones:["Componente de esquemas combinados. La Guía TAR 2025 la considera equivalente a emtricitabina (XTC) en eficacia y seguridad y las hace intercambiables. Aparece en DTG/3TC (preferente en personas con carga viral < 500 000 copias/mL, descartando coinfección crónica por VHB y con genotipo basal deseable), DTG/ABC/3TC y DRV/cobi + 3TC (alternativos)."],
 seguridad:["Perfil de clase: náusea, cefalea, malestar, mialgias, anemia, neutropenia (Prieto)."],
 resistencia:["La Guía TAR menciona la mutación M184V en la resistencia transmitida (1.2 % en México, menor a 3 % en todas las regiones)."],
 notas:["La Guía TAR advierte realizar serología de VHB antes de iniciar esquemas con lamivudina sola como segundo fármaco."]};
D['emtricitabina']={reviewed,src:[P,G],
 mecanismo:[nrti],
 espectro:["VIH (y VHB)."],
 farmacocinetica:["Sin datos específicos en las fuentes locales."],
 indicaciones:["Componente de BIC/FTC/TAF (preferente) y de esquemas con tenofovir. La Guía TAR 2025 la considera clínicamente equivalente a lamivudina."],
 seguridad:["Perfil de clase ITIN (Prieto)."],
 resistencia:["Ver lamivudina (M184V)."],
 notas:["Fuentes: Guía TAR 2025 y Prieto. Murray 2018 no la describe."]};
D['abacavir']={reviewed,src:[P,G],
 mecanismo:[nrti],
 espectro:["VIH."],
 farmacocinetica:["Sin datos en las fuentes locales."],
 indicaciones:["Esquema alternativo DTG/ABC/3TC (tabla 2.8)."],
 seguridad:["Reacciones de hipersensibilidad (Prieto). La Guía TAR indica hacer la prueba del alelo HLA-B*5701 y no iniciar hasta tener resultado negativo; si hay enfermedad cardiovascular o alto riesgo (Framingham > 20 % a 10 años), preferir un esquema sin abacavir; no se recomienda en coinfección por VHB."],
 resistencia:["Ver clase ITIN."],
 notas:["Fuentes: Prieto y Guía TAR 2025."]};
D['tenofovir-df']={reviewed,src:[P,G],
 mecanismo:[nrti],
 espectro:["VIH y VHB."],
 farmacocinetica:["Sin datos en las fuentes locales."],
 indicaciones:["TDx (disoproxilo en cualquier sal) + XTC en esquemas con DTG o DRV/cobi; la Guía TAR 2025 no lo recomienda con depuración de creatinina < 60 mL/min. Se prefiere TAF cuando hay enfermedad renal crónica, riesgo de fractura ≥ 20 % por FRAX o enfermedad ósea."],
 seguridad:["Toxicidad renal y ósea (Guía TAR, pediatría): osteomalacia, descenso de densidad mineral y alteraciones tubulares como calciuria, proteinuria, glucosuria y fosfaturia; acidosis láctica. Su combinación con atazanavir/r o lopinavir/r puede aumentar niveles y toxicidad de TDF."],
 resistencia:["Ver clase ITIN."],
 notas:["Fuente: Guía TAR 2025 y Prieto."]};
D['tenofovir-af']={reviewed,src:[G],
 mecanismo:[nrti],
 espectro:["VIH y VHB."],
 farmacocinetica:["Dosis de TAF según tabla 2.10 de la Guía TAR: 25 mg al día con la mayoría de terceros componentes; 10 mg al día cuando se combina con un inhibidor de proteasa (cobicistat)."],
 indicaciones:["Parte de BIC/FTC/TAF (preferente) y de FTC/TAF + DTG o DRV/cobi. Puede usarse con depuración de creatinina > 30 mL/min. Indicado en lugar de TDF si hay enfermedad renal crónica, función renal en descenso, riesgo de fractura ≥ 20 % u osteoporosis."],
 seguridad:["Pediatría (Guía): astenia, cefalea, diarrea, náusea, vómito, dolor abdominal, rash, fatiga, sueños anormales, ganancia de peso y aumento de lípidos."],
 resistencia:["Ver clase ITIN."],
 notas:["Fuente: Guía TAR México 2025."]};

/* ---------- VIH: otras clases ---------- */
D['efavirenz']={reviewed,src:[M,P,G],
 mecanismo:["Inhibidor no nucleósido de la transcriptasa inversa: se une a un dominio hidrofóbico del sitio activo de la enzima, en un sitio distinto del sustrato, de forma no competitiva, e inhibe la síntesis de ADN. Como difiere de los análogos de nucleósidos, el mecanismo de resistencia también es distinto."],
 espectro:["VIH-1."],
 farmacocinetica:["Sin datos en las fuentes locales; la Guía pediátrica recomienda administrarlo de preferencia con el estómago vacío."],
 indicaciones:["Combinación con análogos de nucleósidos. La Guía TAR 2025 lo ubica como comparador del que doravirina fue no inferior."],
 seguridad:["Reacciones cutáneas que alcanzan el espectro del síndrome de Stevens-Johnson, alteraciones psiquiátricas (depresión, insomnio, sueños aberrantes) y teratogenicidad (Prieto); en la Guía: exantema, vértigo, somnolencia, psicosis, ginecomastia y hepatotoxicidad; potencialmente teratogénico, no se recomienda en el primer trimestre."],
 resistencia:["Distinta a la de los análogos de nucleósidos (Murray)."],
 notas:["Fuentes: Murray, Prieto, Guía TAR."]};
D['etravirina']={reviewed,src:[P],
 mecanismo:["ITINN: unión a un dominio hidrofóbico del sitio activo de la transcriptasa inversa e inhibición de la síntesis de ADN."],
 espectro:["VIH-1."],
 farmacocinetica:["Sin datos."],
 indicaciones:["Parte de esquemas de combinación."],
 seguridad:["Reacciones cutáneas del espectro Stevens-Johnson (clase)."],
 resistencia:["Distinta de la de los ITIN."],
 notas:[gap]};
D['doravirina']={reviewed,src:[G],
 mecanismo:["Inhibidor no nucleósido de la transcriptasa inversa."],
 espectro:["VIH-1."],
 farmacocinetica:["Sin datos."],
 indicaciones:["Alternativa DOR/TDF/3TC o DOR + otros (tabla 2.8, Guía TAR 2025): no inferior a efavirenz y superior a DRV/r como tercer componente; no se ha comparado con ningún inhibidor de integrasa; mayor barrera genética y mejor tolerabilidad que EFV. No recomendada en embarazadas."],
 seguridad:["Sin datos específicos."],
 resistencia:["Mayor barrera genética que EFV (Guía)."],
 notas:["Fuente: Guía TAR México 2025."]};
D['dolutegravir']={reviewed,src:[P,G],
 mecanismo:["Inhibidor de la integrasa: bloquea la integrasa, necesaria para la inserción del ADN viral en el ADN del huésped (Prieto). Es un inhibidor de integrasa de segunda generación, con alta barrera genética (Guía TAR)."],
 espectro:["VIH-1."],
 farmacocinetica:["Evitar administración simultánea con suplementos y antiácidos con cationes polivalentes (Ca, Mg, Al, Fe), que quelan los inhibidores de la integrasa y reducen su absorción. Aumenta la creatinina sérica (promedio 0.11 mg/dL a las 48 semanas) por disminución de la secreción tubular, sin alterar la función glomerular."],
 indicaciones:["Esquema preferente DTG/3TC (carga viral < 500 000 copias/mL; descartar VHB crónico; idealmente con genotipo basal). Alternativos: DTG/ABC/3TC (HLA-B*5701 negativo, sin VHB) y DTG + FTC/TAF o TDx/XTC. Con rifampicina: 50 mg cada 12 h; en coinfección con tuberculosis puede duplicarse la dosis. Considerar interacción con metformina > 1 g/24 h."],
 seguridad:["Prieto: miopatía y rabdomiólisis (clase)."],
 resistencia:["Alta barrera genética (Guía). Murray no describe estos agentes."],
 notas:["Fuentes: Guía TAR México 2025 y Prieto."]};
D['bictegravir']={reviewed,src:[G],
 mecanismo:["Inhibidor de integrasa de segunda generación con alta barrera genética a la resistencia."],
 espectro:["VIH-1."],
 farmacocinetica:["Evitar cationes polivalentes; aumenta la creatinina sérica por menor secreción tubular sin afectar la filtración glomerular."],
 indicaciones:["BIC/FTC/TAF es esquema preferente; no inferior a dolutegravir como tercer componente y opción adecuada para inicio rápido. Considerar interacción con metformina > 1 g/24 h."],
 seguridad:["Ver notas de creatinina."],
 resistencia:["Mayor barrera genética (Guía)."],
 notas:["Fuente: Guía TAR México 2025."]};
D['raltegravir']={reviewed,src:[M,P],
 mecanismo:["Inhibidor de la integrasa del VIH: bloquea la integración del ADNc viral en el cromosoma del huésped, paso catalizado por la integrasa y esencial para la replicación (Murray)."],
 espectro:["VIH-1."],
 farmacocinetica:["Sin datos."],
 indicaciones:["Combinación con otros antirretrovirales."],
 seguridad:["Miopatía y rabdomiólisis (Prieto, clase)."],
 resistencia:["Sin datos específicos."],
 notas:["Fuentes: Murray y Prieto."]};
D['darunavir']={reviewed,src:[M,P,G],
 mecanismo:["Inhibidor de la proteasa del VIH: se introduce en el sitio activo hidrofóbico de la enzima e inhibe su acción; la proteasa es indispensable para escindir y ensamblar las proteínas virales y producir viriones infecciosos."],
 espectro:["VIH-1."],
 farmacocinetica:["Se potencia con ritonavir o cobicistat; cobicistat tiene interacciones semejantes a ritonavir y eleva la creatinina sérica por inhibición de la secreción tubular, sin afectar la función glomerular. Administrar con alimentos."],
 indicaciones:["DRV/cobi + FTC/TAF o TDx/XTC, o DRV/cobi + 3TC (carga < 500 000 copias/mL) como alternativas. No recomendado con rifampicina ni rifabutina ni en embarazadas (con cobicistat). La dosis de TAF debe ser 10 mg."],
 seguridad:["Clase IP: alteraciones gastrointestinales, cefalea, mareo, elevación de enzimas hepáticas (Prieto)."],
 resistencia:["Las cepas resistentes surgen por mutación de la proteasa (Murray)."],
 notas:["Fuentes: Murray, Prieto, Guía TAR."]};
D['atazanavir']={reviewed,src:[P],
 mecanismo:["Inhibidor de la proteasa del VIH: bloquea el procesamiento de las proteínas virales."],
 espectro:["VIH-1."],
 farmacocinetica:["Sin datos."],
 indicaciones:["Esquemas de combinación."],
 seguridad:["Clase IP; hiperbilirrubinemia no conjugada (atazanavir)."],
 resistencia:["Mutaciones de la proteasa."],
 notas:["Fuente: Prieto."]};
D['maraviroc']={reviewed,src:[M,P],
 mecanismo:["Antagonista del correceptor CCR5: se une a CCR5 en la superficie de las células CD4+ (y macrófagos) y bloquea la entrada del virión."],
 espectro:["VIH que usa el correceptor CCR5 (según Murray, bloquea la unión a macrófagos y algunos linfocitos CD4)."],
 farmacocinetica:["Sin datos."],
 indicaciones:["Combinación en terapia de rescate."],
 seguridad:["Infecciones del tracto respiratorio superior, artritis y síntomas musculoesqueléticos, tos, fiebre, erupción y alteraciones del apetito (Prieto)."],
 resistencia:["Sin datos."],
 notas:["Fuentes: Murray y Prieto."]};
D['enfuvirtida']={reviewed,src:[M,P],
 mecanismo:["Péptido de 33 aminoácidos (T20) que se une a la gp41 del virión e inhibe la fusión con la célula, bloqueando la penetración y el desnudamiento del VIH."],
 espectro:["VIH-1."],
 farmacocinetica:["Se administra por inyección."],
 indicaciones:["Combinación en terapia de rescate."],
 seguridad:["Reacciones en el sitio de inyección; hipersensibilidad y neuropatía periférica (raras) (Prieto)."],
 resistencia:["Sin datos."],
 notas:["Fuentes: Murray y Prieto."]};
})();
