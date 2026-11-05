/* INFEORA · antiviral y oportunista con fuentes NIH/CDC/FDA, nov 2026.
 * Cada dosis se restringe a la indicación escrita y requiere ajuste individual.
 */
window.INFEORA_PHARM_CLINICAL=window.INFEORA_PHARM_CLINICAL||{sources:{},drugs:{},additions:[],meta:{}};
(function(R){
'use strict';
const S=R.sources;
S.NIH_HSV={label:'NIH · Infección HSV en adultos con VIH, cuadro de tratamiento',url:'https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-opportunistic-infections/herpes-simplex',reviewed:'2026-11-04'};
S.NIH_VZV={label:'NIH · Varicela-zóster en adultos con VIH, actualizado 2026',url:'https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-opportunistic-infections/varicella-zoster',reviewed:'2026-11-04'};
S.NIH_CMV={label:'NIH · Enfermedad CMV en adultos con VIH',url:'https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-opportunistic-infections/cytomegalovirus',reviewed:'2026-11-04'};
S.CDC_FLU={label:'CDC · Influenza, tabla clínica de antivirales 2026',url:'https://www.cdc.gov/flu/hcp/antivirals/summary-clinicians.html',reviewed:'2026-11-04'};
S.CDC_COVID26={label:'CDC · Tratamiento COVID ambulatorio, octubre 2026',url:'https://www.cdc.gov/covid/hcp/clinical-care/outpatient-treatment.html',reviewed:'2026-11-04'};
S.FDA_PAX25={label:'FDA · Paxlovid, etiqueta 2025 con pautas renales',url:'https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217188s010lbl.pdf',reviewed:'2026-11-04'};
S.NIH_CRYPTO={label:'NIH · Criptococosis en adultos con VIH',url:'https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-opportunistic-infections/cryptococcosis',reviewed:'2026-11-04'};
S.NIH_PCP26={label:'NIH · Neumonía por Pneumocystis, actualización mayo 2026',url:'https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-opportunistic-infections/pneumocystis',reviewed:'2026-11-04'};
const put=(id,key,rows,extra={})=>{
 const old=R.drugs[id]||{}, {sourceKeys:extraSources,...fields}=extra;
 R.drugs[id]={...old,...fields,
 doses:[...(old.doses||[]),...rows.map(([t,ad,comment])=>({t,ad,comment:comment||'',sourceKey:key}))],
 sourceKeys:[...new Set([...(old.sourceKeys||[]),key,...(extraSources||[])])],
 reviewDate:'2026-11-04'};
};
put('aciclovir','NIH_HSV',[
 ['HSV orolabial / genital en personas con VIH, leve a moderado','400 mg VO cada 8 horas por 5–10 días (inicial genital: 7–10 días)'],
 ['HSV mucocutáneo grave o visceral en VIH','10 mg/kg IV cada 8 h por 10–14 días; pasar a VO al mejorar según indicación']
],{precautions:['Cristaluria y nefrotoxicidad con IV: hidratación, administración adecuada y ajuste renal.'],monitor:['Creatinina y estado neurológico durante IV o con enfermedad renal.']});
put('valaciclovir','NIH_HSV',[
 ['HSV orolabial/genital en personas con VIH','1 g VO cada 12 h por 5–10 días (inicial genital: 7–10 días)'],
 ['Supresión de recurrencias HSV en personas con VIH','500 mg VO cada 12 h']
],{monitor:['Función renal y tolerancia neurológica cuando existe insuficiencia renal.']});
put('famciclovir','NIH_HSV',[
 ['HSV orolabial/genital en personas con VIH','500 mg VO cada 12 h por 5–10 días (inicial genital: 7–10 días)']
],{pearls:['No equivale a pauta de herpes zóster, que requiere otra frecuencia.']});
put('valaciclovir','NIH_VZV',[
 ['Herpes zóster dermatomal localizado en persona con VIH','1 g VO cada 8 h por 7–10 días']
],{sourceKeys:['NIH_HSV']});
put('famciclovir','NIH_VZV',[
 ['Herpes zóster dermatomal localizado en persona con VIH','500 mg VO cada 8 h por 7–10 días']
],{sourceKeys:['NIH_HSV']});
put('aciclovir','NIH_VZV',[
 ['Herpes zóster extenso/visceral en VIH','10 mg/kg IV cada 8 h hasta mejoría; continuar oral para completar 10–14 días']
],{sourceKeys:['NIH_HSV']});
put('valganciclovir','NIH_CMV',[
 ['Retinitis por CMV en personas con VIH, inducción','900 mg VO cada 12 h durante 14–21 días'],
 ['Retinitis por CMV en VIH, mantenimiento','900 mg VO cada 24 h tras inducción']
],{precautions:['Ajustar estrictamente a depuración renal y biometría hemática; posible citopenia grave.'],monitor:['Biometría hemática, creatinina y evaluación oftalmológica seriada.']});
put('ganciclovir','NIH_CMV',[
 ['Retinitis por CMV VIH, inducción IV','5 mg/kg IV cada 12 h por 14–21 días'],
 ['Retinitis por CMV VIH, mantenimiento IV cuando se requiere','5 mg/kg IV cada 24 h']
],{monitor:['Biometría hemática, función renal y seguimiento oftalmológico.']});
put('foscarnet','NIH_CMV',[
 ['Retinitis por CMV en VIH, inducción de alternativa','60 mg/kg IV cada 8 h o 90 mg/kg IV cada 12 h por 14–21 días'],
 ['Retinitis por CMV, mantenimiento','90–120 mg/kg IV cada 24 h']
],{precautions:['Nefrotoxicidad y trastornos de calcio, magnesio y potasio.'],
 monitor:['Creatinina y electrolitos; hidratación y ECG si riesgo arrítmico.']});
put('cidofovir','NIH_CMV',[
 ['Retinitis por CMV resistente o alternativas no disponibles, inducción','5 mg/kg IV cada semana por 2 semanas, acompañado de probenecid e hidratación salina según protocolo'],
 ['Retinitis por CMV, mantenimiento','5 mg/kg IV cada 2 semanas con probenecid e hidratación protocolizada']
],{contraindications:['Contraindicado en insuficiencia renal/proteinuria según límites de ficha; verificar umbrales antes de cada dosis.'],
 monitor:['Creatinina, proteinuria y tolerancia oftalmológica.'],
 pearls:['La dosis sin probenecid y expansión salina NO corresponde a la pauta citada; riesgo importante de lesión renal.']});
put('oseltamivir','CDC_FLU',[
 ['Influenza A/B no complicada, adulto, inicio temprano','75 mg VO cada 12 h por 5 días'],
 ['Quimioprofilaxis posexposición seleccionada, adulto','75 mg VO cada 24 h por 7 días después de última exposición']
],{precautions:['Ajustar por función renal; enfermedad grave/hospitalizada puede requerir curso más largo individualizado.'],
 pearls:['En hospitalizados o pacientes con alto riesgo se considera incluso después de 48 h desde inicio de síntomas.']});
put('zanamivir','CDC_FLU',[
 ['Influenza no complicada, adulto, tratamiento','10 mg por inhalación (dos inhalaciones de 5 mg) cada 12 h por 5 días']
],{contraindications:['No utilizar en asma/EPOC o hipersensibilidad a lactosa/proteína de leche por riesgo de broncoespasmo.']});
put('peramivir','CDC_FLU',[
 ['Influenza no complicada, adulto, dentro de primeras 48 h','600 mg IV en dosis única, infusión de al menos 15 min']
],{precautions:['Ajuste renal; no está recomendado para profilaxis.']});
put('baloxavir','CDC_FLU',[
 ['Influenza no complicada, adulto de 40 a menos de 80 kg','40 mg VO dosis única'],
 ['Influenza no complicada, adulto de 80 kg o más','80 mg VO dosis única']
],{precautions:['Evitar coadministración con antiácidos, hierro o suplementos con cationes polivalentes.','No sustituye oseltamivir para influenza grave/hospitalizada sin indicación adecuada.']});
put('nirmatrelvir-ritonavir','FDA_PAX25',[
 ['COVID-19 leve/moderado de alto riesgo, eGFR ≥60 mL/min','Nirmatrelvir 300 mg + ritonavir 100 mg VO cada 12 h por 5 días'],
 ['eGFR 30 a menos de 60 mL/min','Nirmatrelvir 150 mg + ritonavir 100 mg VO cada 12 h por 5 días'],
 ['eGFR menor de 30 mL/min, incluida hemodiálisis, pauta FDA 2025','Día 1: nirmatrelvir 300 mg + ritonavir 100 mg VO una vez; días 2–5: nirmatrelvir 150 mg + ritonavir 100 mg VO una vez al día']
],{sourceKeys:['CDC_COVID26'],
 interactions:['Ritonavir inhibe CYP3A con interacciones de alta gravedad: revisar específicamente antiarrítmicos, anticoagulantes, anticonvulsivos, inmunosupresores, estatinas, etc.'],
 pearls:['Solo iniciar dentro de 5 días de síntomas en población elegible; la edición 2025 de FDA ya incluye régimen renal grave con horario específico.']});
put('fluconazol','NIH_CRYPTO',[
 ['Criptococosis meníngea asociada a VIH, consolidación tras inducción adecuada','800 mg VO cada 24 h durante al menos 8 semanas'],
 ['Criptococosis meníngea asociada a VIH, mantenimiento','200 mg VO cada 24 h por al menos 1 año desde inicio del tratamiento, según respuesta y reconstitución inmune']
],{pearls:['En enfermedad meníngea NO iniciar fluconazol como monoterapia por conveniencia si se dispone de inducción combinada recomendada.']});
put('flucitosina','NIH_CRYPTO',[
 ['Meningitis criptocócica VIH, como componente de inducción combinada','25 mg/kg VO cada 6 h por 2 semanas junto con anfotericina B liposomal IV según esquema (no monoterapia)']
],{precautions:['Mielotoxicidad, hepatotoxicidad y acumulación en enfermedad renal.'],
 monitor:['Función renal, biometría hemática, pruebas hepáticas y niveles séricos si disponibles.']});
put('anfotericina-liposomal','NIH_CRYPTO',[
 ['Criptococosis meníngea VIH, inducción preferida donde es factible monitorizar','3–4 mg/kg IV cada 24 h junto con flucitosina 25 mg/kg VO cada 6 h por 2 semanas']
],{monitor:['Creatinina, magnesio, potasio y balance de fluidos; hemocultivos/CSF según síndrome.']});
put('tmp-smx','NIH_PCP26',[
 ['Pneumocystis jirovecii neumonía moderada-grave en VIH, tratamiento','TMP 15–20 mg/kg/día IV dividido cada 6–8 h, durante 21 días'],
 ['Pneumocystis leve/moderada en VIH, tratamiento','TMP 15–20 mg/kg/día VO en 3 dosis o TMP-SMX DS (160/800 mg) dos tabletas VO cada 8 h por 21 días']
],{monitor:['Creatinina, potasio, sodio, BH y PFH según dosis; evaluación de criterios de corticosteroide adjunto.'],
 pearls:['Dosis expresada como componente TMP, no como masa total de combinación.','Si PaO2 menor de 70 mmHg en aire ambiente o gradiente A-a ≥35 mmHg, valorar corticoesteroide adjunto dentro de 72 h según NIH.']});
put('tmp-smx-paras','NIH_PCP26',[
 ['Pneumocystis (coinfección por VIH), neumonía moderada/grave','TMP 15–20 mg/kg/día IV dividido cada 6–8 h por 21 días']
],{pearls:['Pneumocystis es taxonómicamente un hongo; la ficha se enlaza aquí solo por la indicación oportunista cruzada.']});
put('pentamidina','NIH_PCP26',[
 ['Pneumocystis moderada/grave en VIH: alternativa de rescate','4 mg/kg IV cada 24 h durante 21 días, infusión de al menos 60 min']
],{precautions:['Nefrotoxicidad, hipoglucemia seguida de hiperglucemia, hipotensión y pancreatitis; no aerosolizada para tratar PCP.'],
 monitor:['Glucosa, electrolitos, creatinina, PA y ECG según clínica.']});
})(window.INFEORA_PHARM_CLINICAL);