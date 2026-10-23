/* V23: microbiology disease mechanisms, diagnostic recognition and AMR identity. */
(function installMicroV23(){
"use strict";
const Hx=s=>H(String(s??""));
const core={
staph:["Adhesinas MSCRAMMs, proteínas de unión al fibrinógeno y biofilm facilitan colonización, invasión de endotelio y dispositivos.","La colonización nasal o cutánea no equivale a infección. El patrón supurativo, hemocultivos concordantes y foco determinan su relevancia.","mecA/mecC codifican PBP2a en MRSA; verificar fenotipo. Para MSSA invasivo suelen preferirse β-lactámicos específicos sobre vancomicina."],
strep:["Cápsula, adhesión mucosa y exotoxinas determinan invasividad; S. pyogenes y S. pneumoniae tienen mecanismos de enfermedad diferentes.","Foco respiratorio, piel, sangre o SNC y morfología en cadenas/diplococos orientan el diagnóstico; confirmar especie y aislamiento.","Resistencia neumocócica a penicilina refleja cambios de PBPs; los puntos de corte difieren entre meningitis y otros focos."],
entero:["La adaptación al entorno intestinal, biofilm y tolerancia ambiental favorecen infección urinaria, catéteres y endocarditis.","Distinguir colonización de orina de bacteriemia verdadera. E. faecalis y E. faecium difieren en patrones de susceptibilidad.","Resistencia intrínseca a cefalosporinas; VRE suele implicar vanA/vanB y cambio de extremos D-Ala–D-Ala."],
enterobacterales:["Adhesinas, cápsulas, sideróforos y sistemas de secreción facilitan invasión urinaria, abdominal y bacteriemia.","Interpretar especie, foco, origen comunitario o nosocomial y producción potencial de β-lactamasas.","BLEE, AmpC, CRE y porinas alteradas no son sinónimos; IDSA 2026 utiliza estrategias diferenciadas."],
nonfermenters:["Eflujo, impermeabilidad de membrana externa y adquisición de β-lactamasas definen fenotipos resistentes; biofilm favorece dispositivos.","En muestra respiratoria de un hospitalizado, distinguir colonización de neumonía. Considerar infección en quemados y dispositivos.","Pseudomonas DTR y Acinetobacter CRAB requieren interpretación específica de AST y selección molecular de agentes."],
anaerobes:["Bajo potencial redox, nichos con necrosis y flora polimicrobiana favorecen abscesos profundos.","El cultivo requiere transporte anaerobio, y la imagen más control del foco pueden pesar más que un hisopado.","Metronidazol actúa tras reducción anaerobia, pero no cubre aerobios coexistentes; B. fragilis puede ser resistente a clindamicina."],
atypicals:["El comportamiento intracelular o la ausencia de pared impone barreras terapéuticas que no se explican solo por Gram.","PCR, pruebas antigénicas y serología tienen sensibilidades/ventanas diferentes según agente; contexto epidemiológico orienta.","Mycoplasma carece de peptidoglucano; Legionella reside en vacuolas celulares. Macrólidos/doxiciclina/quinolonas difieren por especie."],
mycobacteria:["La envoltura rica en ácidos micólicos, crecimiento lento y tolerancia fisiológica dificultan erradicación.","BAAR, cultivo micobacteriano, NAAT y pruebas de susceptibilidad forman un proceso escalonado; distinguir TB de micobacterias no tuberculosas.","La terapia combinada limita selección de resistencia; isoniazida, rifamicinas, etambutol y nuevos agentes tienen dianas distintas."],
spirochetes:["Estructura helicoidal y movilidad por endoflagelos facilitan migración tisular.","No se detectan de forma fiable con tinción de Gram rutinaria: se requieren NAAT, serología y métodos según síndrome.","Tratamiento y seguimiento difieren profundamente entre sífilis, Lyme y leptospirosis."]
};
const unique={
"legionella":["Sistema Dot/Icm tipo IV inyecta efectores en macrófagos y bloquea la maduración fagolisosomal.","Neumonía grave asociada con aerosoles de sistemas acuáticos; hiponatremia o elevación de transaminasas son pistas, no criterios diagnósticos.","Antígeno urinario detecta sobre todo L. pneumophila serogrupo 1; PCR respiratoria y cultivo BCYE aumentan cobertura diagnóstica."],
"mycoplasma":["La adhesina P1 y CARDS toxin intervienen en daño del epitelio respiratorio; ausencia total de pared bacteriana.","Tos persistente y neumonía intersticial en adultos jóvenes; hemólisis por crioaglutininas es fenómeno posible pero inespecífico.","Los β-lactámicos carecen de diana. Resistencia macrólida por mutaciones 23S rRNA puede obligar a alternativas."],
"s-aureus-mrsa":["PBP2a derivada de mecA/mecC conserva transpeptidación pese a numerosos β-lactámicos convencionales.","Sospechar en absceso, infección asociada a dispositivos, bacteriemia y neumonía asociada a factores específicos.","Confirmar susceptibilidad e identificar bacteriemia persistente, endocarditis y focos metastásicos antes de definir duración."],
"pseudomonas-aeruginosa-dtr":["Pérdida OprD, sobreexpresión AmpC, bombas MexAB y enzimas adquiridas pueden coexistir.","DTR indica ausencia de susceptibilidad a clases tradicionales definidas; no usar antibiograma histórico como sustituto del actual.","Considerar ceftolozano/tazobactam, ceftazidima/avibactam, imipenem/relebactam o cefiderocol solo según mecanismo, AST y foco."],
"mycobacterium-tuberculosis":["Envoltura lipídica micobacteriana y persistencia metabólica explican necesidad de combinación y exposición prolongada.","Diagnóstico con NAAT (incluida resistencia a rifampicina cuando disponible), cultivo y pruebas fenotípicas/genotípicas.","La monoterapia selecciona resistencia; analizar isoniazida KatG/InhA, rifampicina rpoB y esquemas con bedaquilina en TB resistente."]
};
function profile(p){
 const ex=unique[p.id],b=core[p.groupId]||["La virulencia depende de adhesión, invasión y respuesta inmune específicas del taxón.","El contexto del aislamiento condiciona si representa enfermedad.","La actividad se decide por especie, sitio y fenotipo de resistencia."];
 return ex||b;
}
const original=microPageSections;
microPageSections=function(p){
 let out=original(p);
 const block=profile(p);
 const section=section20('micro-molecular23','03B','MICROBIOLOGÍA CLÍNICA · MECANISMOS Y DECISIONES','Del microorganismo al problema clínico',`<div class="v23-micro-dossier"><div class="v23-micro-box"><span>VIRULENCIA / FISIOPATOLOGÍA</span><p>${Hx(block[0])}</p></div><div class="v23-micro-box"><span>RECONOCIMIENTO EN CLÍNICA</span><p>${Hx(block[1])}</p></div><div class="v23-micro-box"><span>RESISTENCIA / INTERPRETACIÓN ATB</span><p>${Hx(block[2])}</p></div></div>`);
 const target='<section class="v20-section" id="micro-espectro">';
 const i=out.indexOf(target);return i<0?out:out.slice(0,i)+section+out.slice(i);
};
})();
