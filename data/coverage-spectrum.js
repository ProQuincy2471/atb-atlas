/* INFEORA — Espectro por clase y por especie para la matriz de cobertura (V30).
   Escala de 5 niveles: Y habitual · M mayoría de cepas · S a veces/depende · R rara vez · N no activo. Sin dato = no se dibuja nivel.
   Fuentes:
   · Murray PR et al., Medical Microbiology 9.ª ed., cap. 17 «Antibacterial Agents» (tablas 17.2–17.6 y texto por clase): espectro DE CLASE, a nivel de grupo taxonómico.
     Murray (2018) no gradúa por especie ni por fenotipo de resistencia: lo no mencionado queda SIN DATO y no se infiere.
   · Murray cap. 61 «Antifungal Agents», tabla 61.2 (++++ → Y, +++ → M, ++ → S, + → R, 0 → N) para azoles, anfotericina B, flucitosina y equinocandinas; el texto del capítulo para posaconazol, terbinafina, griseofulvina y ketoconazol.
   · Fichas técnicas oficiales (FDA/EMA, consultadas 2026-10-23) para los agentes recientes: solo las especies que cada ficha enumera.
   Es un perfil ORIENTATIVO: no sustituye antibiograma, fenotipo de resistencia, foco ni guía vigente. Síntesis editorial original. */
window.ATLAS30=window.ATLAS30||{};
(function(){
const S=window.ATLAS30.spectrum={classes:{},drugClass:{},srcLabel:{
 murray17:'Espectro de clase · Murray cap. 17',murray61:'Tabla 61.2 · Murray cap. 61',label:'Ficha técnica oficial'}};
const cls=(key,src,g,s,note)=>{S.classes[key]={src,g:g||{},s:s||{},note:note||''}};
const map=(key,ids)=>ids.split(' ').forEach(id=>S.drugClass[id]=key);
const M17='murray17',LB='label';
const ENT_NONRES={ 'e-coli':'M','k-pneumoniae':'M','klebsiella-oxytoca':'M','proteus-mirabilis':'M' };

/* ───── β-lactámicos ───── */
cls('pen-nat',M17,{staph:'R',strep:'Y',enterobacterales:'R',nonfermenters:'R'},{'neisseria-meningitidis':'Y','clostridium-perfringens':'Y','clostridium-tetani':'Y','peptostreptococcus-spp':'Y','b-fragilis':'R','prevotella-spp':'R','fusobacterium-necrophorum':'R','actinomyces-israelii':'Y'},'Activa frente a todos los estreptococos β-hemolíticos y la mayoría de otras especies; actividad limitada frente a estafilococos; pobre frente a bacilos gramnegativos.');
map('pen-nat','penicilina-g penicilina-v');
cls('pen-antistaph',M17,{staph:'Y',strep:'Y',enterobacterales:'R',nonfermenters:'R'},{'s-aureus-mrsa':'N','staphylococcus-epidermidis':'S','neisseria-meningitidis':'Y'},'Espectro de las penicilinas naturales con actividad reforzada frente a estafilococos; la resistencia (SARM y estafilococos coagulasa-negativos) es común.');
map('pen-antistaph','oxacilina nafcilina dicloxacilina flucloxacilina cloxacilina');
cls('pen-amino',M17,{staph:'R',strep:'Y'},{'e-coli':'S','proteus-mirabilis':'S','h-influenzae':'S','s-aureus-mrsa':'N'},'Actividad frente a cocos grampositivos equivalente a las penicilinas naturales; frente a bacilos gramnegativos, principalmente Escherichia, Proteus y Haemophilus.');
map('pen-amino','amoxicilina ampicilina');
cls('pen-bli',M17,{staph:'Y',strep:'Y',enterobacterales:'S'},{'s-aureus-mrsa':'N','e-coli':'M','k-pneumoniae':'M','proteus-mirabilis':'M','h-influenzae':'M','e-coli-blee':'S','escherichia-coli-cre':'N','klebsiella-pneumoniae-cre':'N','b-fragilis':'M'},'Penicilina + inhibidor de β-lactamasa: mejor actividad frente a estafilococos productores de β-lactamasa y bacilos gramnegativos seleccionados; no todas las β-lactamasas se inhiben.');
map('pen-bli','amoxi-clav ampicilina-sulbactam ticarcilina-clavulanato');
cls('pen-bli-pip',M17,{staph:'Y',strep:'Y',enterobacterales:'M',nonfermenters:'S'},{'s-aureus-mrsa':'N','p-aeruginosa':'M','e-coli-blee':'S','escherichia-coli-cre':'N','klebsiella-pneumoniae-cre':'N','b-fragilis':'M','stenotrophomonas-maltophilia':'N'},'Piperacilina-tazobactam es de las combinaciones más activas (Murray); antipseudomonal.');
map('pen-bli-pip','piptazo');
cls('pen-antipseudo',M17,{strep:'Y',nonfermenters:'S',enterobacterales:'S'},{'p-aeruginosa':'M','s-aureus-mrsa':'N'},'Penicilinas antipseudomonas (carboxi/ureidopenicilinas, Prieto); suelen usarse con inhibidor de β-lactamasa.');
map('pen-antipseudo','piperacilina ticarcilina');
cls('ceph1',M17,{staph:'Y',strep:'Y'},{'s-aureus-mrsa':'N','e-coli':'S','k-pneumoniae':'S','proteus-mirabilis':'S'},'Espectro estrecho: grampositivos equivalente a oxacilina; algo de actividad gramnegativa (E. coli, Klebsiella, P. mirabilis).');
map('ceph1','cefazolina cefalexina cefadroxilo');
cls('ceph2',M17,{staph:'Y',strep:'Y'},{'s-aureus-mrsa':'N','e-coli':'M','k-pneumoniae':'M','proteus-mirabilis':'M','h-influenzae':'M','enterobacter-cloacae':'S','citrobacter-freundii':'S','serratia-marcescens':'S'},'Segunda generación: grampositivos como oxacilina y mejor cobertura gramnegativa (Enterobacter, Citrobacter, más Proteus; muchas cubren H. influenzae).');
map('ceph2','cefuroxima cefaclor cefprozil');
cls('cefamycin',M17,{staph:'Y',strep:'Y'},{'s-aureus-mrsa':'N','e-coli':'M','k-pneumoniae':'M','proteus-mirabilis':'M','b-fragilis':'S'},'Cefamicinas: similares a segunda generación y menos susceptibles a β-lactamasas; algunos anaerobios como B. fragilis.');
map('cefamycin','cefoxitina cefotet-n');
cls('ceph3',M17,{strep:'Y',staph:'M',enterobacterales:'M'},{'s-aureus-mrsa':'N','e-coli-blee':'N','escherichia-coli-cre':'N','klebsiella-pneumoniae-cre':'N','p-aeruginosa':'N','h-influenzae':'Y','neisseria-meningitidis':'Y','neisseria-gonorrhoeae':'M','s-pneumoniae':'Y'},'Tercera generación de amplio espectro: mejor actividad gramnegativa; las BLEE y carbapenemasas las inactivan.');
map('ceph3','ceftriaxona cefotaxima cefixima cefpodoxima');
cls('ceph3-pa',M17,{strep:'Y',staph:'S',enterobacterales:'M',nonfermenters:'M'},{'s-aureus-mrsa':'N','e-coli-blee':'N','escherichia-coli-cre':'N','klebsiella-pneumoniae-cre':'N','p-aeruginosa':'M','stenotrophomonas-maltophilia':'N'},'Ceftazidima: tercera generación con actividad frente a Pseudomonas; actividad grampositiva menor.');
map('ceph3-pa','ceftazidima');
cls('ceph4',M17,{strep:'Y',staph:'Y',enterobacterales:'M',nonfermenters:'M'},{'s-aureus-mrsa':'N','e-coli-blee':'S','escherichia-coli-cre':'N','klebsiella-pneumoniae-cre':'N','p-aeruginosa':'M','e-faecalis':'N','enterococcus-faecium':'N','b-fragilis':'N'},'Cuarta generación: activa frente a la mayoría de Enterobacteriaceae y P. aeruginosa; más estable a β-lactamasas.');
map('ceph4','cefepima');
cls('carba',M17,{staph:'Y',strep:'Y',enterobacterales:'Y',anaerobes:'Y',nonfermenters:'S'},{'s-aureus-mrsa':'N','e-faecalis':'M','enterococcus-faecium':'N','enterococcus-faecium-vre':'N','e-coli-blee':'Y','escherichia-coli-cre':'N','klebsiella-pneumoniae-cre':'N','p-aeruginosa':'M','pseudomonas-aeruginosa-dtr':'N','acinetobacter-baumannii-crab':'N','stenotrophomonas-maltophilia':'N','burkholderia-cepacia-complex':'N'},'Carbapenémicos: activos frente a la mayoría de bacterias aerobias y anaerobias grampositivas y gramnegativas, salvo SARM, la mayoría de E. faecium y bacilos como Stenotrophomonas y algunas Burkholderia/Pseudomonas.');
map('carba','imipenem-cilastatina meropenem doripenem ertapenem');
cls('aztreonam',M17,{enterobacterales:'M',nonfermenters:'S',staph:'N',strep:'N',entero:'N',anaerobes:'N'},{'p-aeruginosa':'S'},'Monobactámico: solo bacilos gramnegativos aerobios seleccionados; inactivo frente a grampositivos y anaerobios.');
map('aztreonam','aztreonam');
/* ───── glicopéptidos, lipopéptidos, oxazolidinonas, estreptograminas ───── */
cls('glyco',M17,{staph:'Y',strep:'Y',entero:'M',enterobacterales:'N',nonfermenters:'N','gn-respiratory':'N','gn-zoonotic':'N'},{'s-aureus-mrsa':'Y','e-faecalis':'M','enterococcus-faecium':'M','enterococcus-faecium-vre':'N'},'Vancomicina: oxacilina-resistentes y otros grampositivos resistentes a β-lactámicos; inactiva frente a gramnegativos (no atraviesa la membrana externa).');
map('glyco','vancomicina-iv teicoplanina');
cls('dapto',M17,{staph:'Y',strep:'Y',entero:'Y',enterobacterales:'N',nonfermenters:'N'},{'s-aureus-mrsa':'Y','enterococcus-faecium-vre':'Y'},'Potente frente a grampositivos multirresistentes (incluidos VRE); los gramnegativos son resistentes.');
map('dapto','daptomicina');
cls('linezolid',M17,{staph:'Y',strep:'Y',entero:'Y','gp-rods':'Y',enterobacterales:'N',nonfermenters:'N'},{'s-aureus-mrsa':'Y','enterococcus-faecium-vre':'Y','clostridium-perfringens':'Y','peptostreptococcus-spp':'Y'},'Activo frente a estafilococos (incluido SARM), estreptococos, enterococos (incluidos VRE), bacilos grampositivos, Clostridium y cocos anaerobios; sin actividad frente a gramnegativos.');
map('linezolid','linezolid');
cls('quinu',M17,{staph:'Y',strep:'Y',enterobacterales:'N',nonfermenters:'N'},{'s-aureus-mrsa':'Y','enterococcus-faecium':'Y','enterococcus-faecium-vre':'Y','e-faecalis':'N','h-influenzae':'Y','m-catarrhalis':'Y','b-fragilis':'Y'},'Quinupristina-dalfopristina: grampositivos incluidos SARM y E. faecium (no E. faecalis); Haemophilus, Moraxella y anaerobios; no Enterobacteriaceae.');
map('quinu','quinupristina-dalfopristina');
/* ───── ribosomales ───── */
cls('amino',M17,{enterobacterales:'Y',nonfermenters:'Y',staph:'S',strep:'N',entero:'N',anaerobes:'N'},{'p-aeruginosa':'Y','acinetobacter-baumannii-complex':'M','e-faecalis':'N'},'Aminoglucósidos: infecciones graves por bacilos gramnegativos; no actúan sobre anaerobios; estreptococos y enterococos son resistentes (solo sinergia con un inhibidor de pared).');
map('amino','gentamicina tobramicina amikacina');
cls('amino-strepto',M17,{enterobacterales:'S',strep:'N',anaerobes:'N'},{'mycobacterium-tuberculosis':'Y','francisella-tularensis':'Y','brucella-spp':'S'},'Estreptomicina: micobacterias y bacilos gramnegativos seleccionados; tuberculosis y tularemia (Murray).');
map('amino-strepto','estreptomicina');
cls('tetra',M17,{atypicals:'Y',staph:'S',strep:'S',enterobacterales:'S'},{'rickettsia-rickettsii':'Y','chlamydia-trachomatis':'Y','chlamydia-pneumoniae':'Y','mycoplasma':'Y','neisseria-gonorrhoeae':'S','p-aeruginosa':'N'},'Tetraciclinas: amplio espectro; grampositivos y algunos gramnegativos (Neisseria, algunas Enterobacteriaceae), micoplasmas, clamidias y rickettsias.');
map('tetra','tetraciclina doxiciclina minociclina');
cls('tige',M17,{staph:'M',strep:'M',enterobacterales:'M',anaerobes:'M',nonfermenters:'S'},{'proteus-mirabilis':'N','proteus-vulgaris':'N','morganella-morganii':'N','providencia-stuartii':'N','p-aeruginosa':'N','mycobacterium-abscessus-complex':'S'},'Tigeciclina: grampositivos, gramnegativos y anaerobios; Proteus, Morganella, Providencia y P. aeruginosa suelen ser resistentes.');
map('tige','tigeciclina');
cls('macro',M17,{atypicals:'Y',strep:'S',staph:'S',enterobacterales:'N',nonfermenters:'N'},{'legionella':'Y','mycoplasma':'Y','chlamydia-pneumoniae':'Y','campylobacter-jejuni':'Y','treponema-pallidum':'S','rickettsia-rickettsii':'S'},'Macrólidos: grampositivos y algunos gramnegativos, Neisseria, Legionella, Mycoplasma, Chlamydia, Treponema, Rickettsia; la mayoría de los gramnegativos son resistentes.');
map('macro','eritromicina');
cls('macro2',M17,{atypicals:'Y',strep:'S',staph:'S',enterobacterales:'N',nonfermenters:'N',mycobacteria:'S'},{'legionella':'Y','mycoplasma':'Y','chlamydia-pneumoniae':'Y','campylobacter-jejuni':'Y','mycobacterium-avium-complex':'Y'},'Claritromicina y azitromicina: como macrólidos; además activos frente a algunas micobacterias (complejo M. avium).');
map('macro2','claritromicina azitromicina');
cls('keto',M17,{atypicals:'Y'},{'s-pneumoniae':'Y','legionella':'Y','mycoplasma':'Y','chlamydia-pneumoniae':'Y'},'Telitromicina: actividad similar a macrólidos; uso restringido a neumonía adquirida en la comunidad.');
map('keto','telitromicina');
cls('clinda',M17,{staph:'M',anaerobes:'Y',enterobacterales:'N',nonfermenters:'N'},{'s-aureus-mrsa':'S','b-fragilis':'Y'},'Clindamicina: activa frente a estafilococos y bacilos gramnegativos anaerobios; generalmente inactiva frente a gramnegativos aerobios; resistencia cruzada con macrólidos por metilación del ARNr 23S.');
map('clinda','clindamicina');
/* ───── ácidos nucleicos / antimetabolitos ───── */
cls('fq-cipro',M17,{enterobacterales:'Y',nonfermenters:'S',staph:'S','gn-respiratory':'Y'},{'p-aeruginosa':'M','s-aureus-mrsa':'N','e-faecalis':'S','e-coli-blee':'S'},'Ciprofloxacino/ofloxacino/norfloxacino: amplio espectro; la resistencia puede desarrollarse con rapidez en Pseudomonas, estafilococos resistentes a oxacilina y enterococos.');
map('fq-cipro','ciprofloxacino ofloxacino norfloxacino');
cls('fq-levo',M17,{enterobacterales:'Y',nonfermenters:'S',staph:'M',strep:'M','gn-respiratory':'Y'},{'p-aeruginosa':'M','s-aureus-mrsa':'N','s-pneumoniae':'Y','e-coli-blee':'S'},'Levofloxacino: amplio espectro con mejor actividad grampositiva que ciprofloxacino.');
map('fq-levo','levofloxacino');
cls('fq-moxi',M17,{enterobacterales:'Y',strep:'Y',staph:'M',entero:'S',anaerobes:'S'},{'s-pneumoniae':'Y','s-aureus-mrsa':'N','p-aeruginosa':'R'},'Moxifloxacino: espectro ampliado con actividad mejorada frente a grampositivos (estreptococos y enterococos); gramnegativos similar a ciprofloxacino.');
map('fq-moxi','moxifloxacino');
cls('nitroimid',M17,{anaerobes:'Y',staph:'N',strep:'N',entero:'N',enterobacterales:'N',nonfermenters:'N','gn-respiratory':'N'},{'b-fragilis':'Y','clostridioides-difficile':'S'},'Metronidazol: infecciones anaerobias graves (incluido B. fragilis); sin actividad significativa frente a aerobios o anaerobios facultativos.');
map('nitroimid','metronidazol tinidazol secnidazol');
cls('tmpsmx',M17,{enterobacterales:'M',staph:'S',strep:'S',nonfermenters:'N',entero:'N'},{'e-coli':'Y','nocardia-spp':'Y','p-aeruginosa':'N','enterococcus-faecium':'N','e-faecalis':'N'},'TMP-SMX: amplia variedad de grampositivos y gramnegativos; fármaco de elección en infección urinaria; Pseudomonas resistente por barreras de permeabilidad y enterococos por uso de timidina exógena.');
map('tmpsmx','tmp-smx trimetoprim');
cls('sulfa',M17,{},{'nocardia-spp':'Y','e-coli':'M'},'Sulfonamidas: gran variedad de grampositivos y gramnegativos, Nocardia y Chlamydia (Murray).');
map('sulfa','sulfadiazina');
cls('rifa',M17,{staph:'Y',strep:'Y',enterobacterales:'N',nonfermenters:'N',mycobacteria:'M'},{'mycobacterium-tuberculosis':'Y'},'Rifampicina: bactericida frente a M. tuberculosis y muy activa frente a cocos grampositivos; gramnegativos intrínsecamente resistentes; siempre en combinación.');
map('rifa','rifampicina rifapentina');
cls('rifabutin',M17,{staph:'Y',strep:'Y',enterobacterales:'N'},{'mycobacterium-avium-complex':'Y','mycobacterium-tuberculosis':'Y'},'Rifabutina: modo y espectro similares a rifampicina; particularmente activa frente a M. avium.');
map('rifabutin','rifabutina');
cls('poly',M17,{enterobacterales:'M',nonfermenters:'M'},{'klebsiella-pneumoniae-cre':'Y','escherichia-coli-cre':'Y','acinetobacter-baumannii-crab':'Y','pseudomonas-aeruginosa-dtr':'Y'},'Polimixinas/colistina: bacilos gramnegativos, incluidos productores de carbapenemasa que solo son sensibles a colistina; la resistencia se está generalizando.');
map('poly','polimixina-b colistina');
/* ───── antimicobacterianos ───── */
cls('tb-inh',M17,{mycobacteria:'M'},{'mycobacterium-tuberculosis':'Y'},'Isoniazida/etambutol/pirazinamida: tuberculosis (Murray cap. 17 y resumen de Prieto).');
map('tb-inh','isoniazida etambutol pirazinamida cicloserina');
cls('tb-new',LB,{},{'mycobacterium-tuberculosis':'Y'},'Bedaquilina, pretomanid, delamanid: tuberculosis multirresistente (fichas oficiales).');
map('tb-new','bedaquilina pretomanid delamanid');
cls('clofa',M17,{},{'mycobacterium-tuberculosis':'Y','mycobacterium-leprae':'Y'},'Clofazimina: muy activa frente a M. tuberculosis; primera línea en lepra; secundaria para otras micobacterias.');
map('clofa','clofazimina');
cls('cdiff',LB,{},{'clostridioides-difficile':'Y'},'Fidaxomicina: acción local en intestino frente a la mayoría de aislados de C. difficile.');
map('cdiff','fidaxomicina');
cls('bacitracin',M17,{staph:'Y',strep:'Y',enterobacterales:'N',nonfermenters:'N'},{},'Bacitracina (tópica): grampositivos, sobre todo Staphylococcus y estreptococo del grupo A; gramnegativos resistentes.');
map('bacitracin','bacitracina');
cls('spec',M17,{},{'neisseria-gonorrhoeae':'Y'},'Espectinomicina: activa frente a N. gonorrhoeae (Murray).');
map('spec','spectinomicina');
cls('nalid',M17,{enterobacterales:'S',staph:'N',strep:'N'},{},'Ácido nalidíxico: bacilos gramnegativos seleccionados; sin actividad grampositiva útil; resistencia rápida.');
map('nalid','cido-nalid-xico');
/* ───── agentes recientes: solo especies que la ficha oficial enumera ───── */
cls('ceftaroline',LB,{},{'s-aureus-mssa':'Y','s-aureus-mrsa':'Y','s-pyogenes':'Y','streptococcus-agalactiae-gbs':'Y','s-pneumoniae':'Y','e-coli':'Y','k-pneumoniae':'Y','klebsiella-oxytoca':'Y','h-influenzae':'Y','e-coli-blee':'N','klebsiella-pneumoniae-cre':'N','escherichia-coli-cre':'N'},'Ceftarolina: no activa frente a BLEE, KPC, metalo-β-lactamasas ni AmpC.');
map('ceftaroline','ceftarolina');
cls('ceftobiprole',LB,{},{'s-aureus-mssa':'Y','s-aureus-mrsa':'Y','s-pneumoniae':'Y','e-coli-blee':'N','klebsiella-pneumoniae-cre':'N','escherichia-coli-cre':'N'},'Ceftobiprol: no activo frente a BLEE, KPC ni metalo-β-lactamasas.');
map('ceftobiprole','ceftobiprol');
cls('cazavi',LB,{},{'e-coli':'Y','k-pneumoniae':'Y','proteus-mirabilis':'Y','enterobacter-cloacae':'Y','klebsiella-oxytoca':'Y','citrobacter-freundii':'Y','p-aeruginosa':'Y'},'Ceftazidima-avibactam: especies de la ficha FDA.');
map('cazavi','ceftazidima-avibactam');
cls('ceftol',LB,{},{'e-coli':'Y','k-pneumoniae':'Y','klebsiella-oxytoca':'Y','proteus-mirabilis':'Y','p-aeruginosa':'Y','enterobacter-cloacae':'Y','h-influenzae':'Y','serratia-marcescens':'Y','b-fragilis':'Y'},'Ceftolozano-tazobactam: especies de la ficha FDA.');
map('ceftol','ceftolozano-tazobactam');
cls('cefepime-bli',LB,{},{'e-coli':'Y','k-pneumoniae':'Y','p-aeruginosa':'Y','proteus-mirabilis':'Y','enterobacter-cloacae':'Y','klebsiella-pneumoniae-cre':'N','escherichia-coli-cre':'N'},'Cefepima-enmetazobactam: BLEE CTX-M/SHV/TEM/VEB; no KPC ni metalo-β-lactamasas.');
map('cefepime-bli','cefepima-enmetazobactam');
cls('mero-vabor',LB,{},{'e-coli':'Y','k-pneumoniae':'Y','enterobacter-cloacae':'Y','klebsiella-pneumoniae-cre':'M','escherichia-coli-cre':'S'},'Meropenem-vaborbactam: protege de KPC; no activo frente a metalo-β-lactamasas ni oxacilinasas con actividad carbapenemasa.');
map('mero-vabor','meropenem-vaborbactam');
cls('imi-reb',LB,{enterobacterales:'M'},{'p-aeruginosa':'Y','acinetobacter-baumannii-complex':'Y','b-fragilis':'Y','enterococcus-faecium':'N','stenotrophomonas-maltophilia':'N'},'Imipenem-relebactam: Enterobacterales, P. aeruginosa, Acinetobacter y Bacteroides; no activo frente a la mayoría de metalo-β-lactamasas.');
map('imi-reb','imipenem-cilastatina-relebactam');
cls('azt-avi',LB,{},{'e-coli':'Y','k-pneumoniae':'Y','klebsiella-oxytoca':'Y','enterobacter-cloacae':'Y','citrobacter-freundii':'Y','serratia-marcescens':'Y','klebsiella-pneumoniae-cre':'Y','escherichia-coli-cre':'Y'},'Aztreonam-avibactam: Enterobacterales incl. productores de BLEE, KPC, NDM, VIM, IMP, AmpC u OXA-48 (in vitro).');
map('azt-avi','aztreonam-avibactam');
cls('cefiderocol',LB,{enterobacterales:'M',nonfermenters:'M',staph:'N',strep:'N',anaerobes:'N'},{},'Cefiderocol: aerobios gramnegativos; escasa actividad clínica frente a grampositivos y anaerobios (la ficha no gradúa por especie).');
map('cefiderocol','cefiderocol');
cls('sul-dur',LB,{},{'acinetobacter-baumannii-complex':'Y','acinetobacter-baumannii-crab':'Y'},'Sulbactam-durlobactam: complejo A. baumannii-calcoaceticus.');
map('sul-dur','sulbactam-durlobactam');
cls('lipogly',LB,{},{'s-aureus-mssa':'Y','s-aureus-mrsa':'Y','s-pyogenes':'Y','streptococcus-agalactiae-gbs':'Y','streptococcus-anginosus-group':'Y','e-faecalis':'Y'},'Lipoglucopéptidos (dalbavancina, oritavancina, telavancina): S. aureus incl. SARM, estreptococos y E. faecalis sensible a vancomicina.');
map('lipogly','dalbavancina oritavancina telavancina');
cls('tedizolid',LB,{},{'s-aureus-mssa':'Y','s-aureus-mrsa':'Y','s-pyogenes':'Y','streptococcus-agalactiae-gbs':'Y','streptococcus-anginosus-group':'Y','e-faecalis':'Y'},'Tedizolid: especies de la ficha FDA.');
map('tedizolid','tedizolid');
cls('plazomicin',LB,{strep:'N',entero:'N',anaerobes:'N'},{'e-coli':'Y','k-pneumoniae':'Y','proteus-mirabilis':'Y','enterobacter-cloacae':'Y','stenotrophomonas-maltophilia':'N','acinetobacter-baumannii-complex':'N'},'Plazomicina: Enterobacterales listados; no activa frente a estreptococos, enterococos, anaerobios, S. maltophilia ni Acinetobacter.');
map('plazomicin','plazomicina');
cls('omada',LB,{},{'s-pneumoniae':'Y','s-aureus-mssa':'Y','s-aureus-mrsa':'Y','h-influenzae':'Y','k-pneumoniae':'Y','legionella':'Y','mycoplasma':'Y','chlamydia-pneumoniae':'Y'},'Omadaciclina: especies de la ficha FDA (NAC y piel).');
map('omada','omadaciclina');
cls('erava',LB,{},{'e-coli':'Y','k-pneumoniae':'Y','e-faecalis':'Y','enterococcus-faecium':'Y','s-aureus-mssa':'Y','s-aureus-mrsa':'Y','streptococcus-anginosus-group':'Y','b-fragilis':'Y','clostridium-perfringens':'Y'},'Eravaciclina: especies de la ficha FDA (infección intraabdominal).');
map('erava','eravaciclina');
cls('delaflox',LB,{},{'s-aureus-mssa':'Y','s-aureus-mrsa':'Y','s-pneumoniae':'Y','s-pyogenes':'Y','e-coli':'Y','k-pneumoniae':'Y','p-aeruginosa':'Y','h-influenzae':'Y','legionella':'Y','mycoplasma':'Y','chlamydia-pneumoniae':'Y'},'Delafloxacino: especies de la ficha FDA (piel y NAC).');
map('delaflox','delafloxacino');
cls('lefamulin',LB,{enterobacterales:'N'},{'s-pneumoniae':'Y','s-aureus-mssa':'Y','h-influenzae':'Y','legionella':'Y','mycoplasma':'Y','chlamydia-pneumoniae':'Y','p-aeruginosa':'N'},'Lefamulina: especies de la ficha FDA; no activa frente a Enterobacteriaceae ni P. aeruginosa.');
map('lefamulin','lefamulina');
cls('nitrofur',LB,{},{'e-coli':'Y','e-faecalis':'Y','k-pneumoniae':'M','enterobacter-cloacae':'M','s-aureus-mssa':'M','proteus-mirabilis':'N','proteus-vulgaris':'N','serratia-marcescens':'N','p-aeruginosa':'N'},'Nitrofurantoína (infección urinaria): inactiva frente a la mayoría de Proteus, Serratia y Pseudomonas.');
map('nitrofur','nitrofurantoina');
cls('fosfo',LB,{},{'e-coli':'Y','e-faecalis':'Y'},'Fosfomicina trometamol: E. coli y E. faecalis (cistitis no complicada).');
map('fosfo','fosfomicina-oral');
cls('topic',LB,{},{'s-aureus-mssa':'Y','s-aureus-mrsa':'M','s-pyogenes':'Y'},'Mupirocina y ozenoxacino (impétigo): S. aureus y S. pyogenes; la resistencia a mupirocina es más frecuente en SARM.');
map('topic','mupirocina ozenoxacino');

/* ───── antifúngicos: tabla 61.2 de Murray (columnas AMB FC ISA ITZ FCZ VCZ ECH) ───── */
const L={'++++':'Y','+++':'M','++':'S','+':'R','0':'N'};
const T61={ 'candida-albicans':'++++ ++++ ++++ ++++ ++++ ++++ ++++','candida-glabrata':'+++ ++++ +++ ++ ++ +++ ++++','candida-parapsilosis':'++++ ++++ ++++ ++++ ++++ ++++ +++','candida-tropicalis':'+++ ++++ ++++ +++ ++++ ++++ ++++','candida-krusei':'++ + ++++ ++ 0 ++++ ++++',
 'crypto-neoformans':'++++ +++ ++++ ++ +++ ++++ 0','crypto-gattii':'++++ +++ ++++ ++ +++ ++++ 0','aspergillus-fumigatus':'++++ 0 ++++ ++++ 0 ++++ +++','aspergillus-flavus':'++++ 0 ++++ ++++ 0 ++++ +++','aspergillus-niger':'++++ 0 - ++++ 0 ++++ +++',
 'fusarium':'+++ 0 ++ + 0 +++ 0','rhizopus-arrhizus':'++++ 0 ++ 0 0 0 +','mucor-circinelloides':'++++ 0 ++ 0 0 0 +','lichtheimia-corymbifera':'++++ 0 ++ 0 0 0 +',
 'blastomyces':'++++ 0 ++++ ++++ + ++++ ++','coccidioides':'++++ 0 ++++ ++++ ++++ ++++ ++','histoplasma':'++++ 0 ++++ ++++ ++ ++++ ++','talaromyces':'++++ 0 ++++ ++ ++++ ++++ -',
 'fonsecaea':'++++ + ++++ ++++ + ++++ 0','madurella':'++++ + ++++ ++++ + ++++ 0'};
const COLS=['amb','fc','isa','itz','fcz','vcz','ech'];
S.table61={};
for(const [org,row] of Object.entries(T61)){row.split(' ').forEach((v,i)=>{if(L[v])(S.table61[COLS[i]]=S.table61[COLS[i]]||{})[org]=L[v]})}
/* Aspergillus terreus: anfotericina B resistente (Murray, texto) */
(S.table61.amb['aspergillus-terreus']='N');(S.table61.vcz['aspergillus-terreus']='Y');
(S.table61.vcz['scedosporium']='Y');(S.table61.vcz['lomentospora']='N');(S.table61.itz['scedosporium']='S');
(S.table61.itz['sporothrix']='Y');(S.table61.amb['sporothrix']='Y');
S.drugCol={'anfotericina-liposomal':'amb','anfotericina-desoxicolato':'amb','flucitosina':'fc','isavuconazol':'isa','itraconazol':'itz','fluconazol':'fcz','voriconazol':'vcz','caspofungina':'ech','micafungina':'ech','anidulafungina':'ech','rezafungina':'ech'};
/* posaconazol, terbinafina, griseofulvina, ketoconazol: texto de Murray cap. 61 */
S.antifungalText={
 'posaconazol':{src:'Murray cap. 61 (texto)',s:{'candida-albicans':'Y','candida-glabrata':'M','candida-krusei':'M','candida-parapsilosis':'Y','candida-tropicalis':'Y','crypto-neoformans':'Y','crypto-gattii':'Y','aspergillus-fumigatus':'Y','aspergillus-flavus':'Y','aspergillus-terreus':'Y','rhizopus-arrhizus':'Y','mucor-circinelloides':'Y','lichtheimia-corymbifera':'Y','histoplasma':'Y','blastomyces':'Y','coccidioides':'Y'}},
 'terbinafina':{src:'Murray cap. 61 (texto)',s:{'trichophyton-rubrum':'Y','trichophyton-indotineae':'Y','microsporum-canis':'Y','epidermophyton':'Y','malassezia':'M','candida-albicans':'S','crypto-neoformans':'S','aspergillus-fumigatus':'S','sporothrix':'M','talaromyces':'S'}},
 'griseofulvina':{src:'Murray cap. 61 (texto)',s:{'trichophyton-rubrum':'Y','trichophyton-indotineae':'Y','microsporum-canis':'Y','epidermophyton':'Y'}},
 'ketoconazol':{src:'Murray cap. 61 (texto)',s:{'histoplasma':'S','blastomyces':'S','coccidioides':'S','candida-albicans':'S','crypto-neoformans':'S','malassezia':'M','aspergillus-fumigatus':'N','rhizopus-arrhizus':'N','fusarium':'N','lomentospora':'N'}},
 'fluconazol':{src:'Murray cap. 61 (texto)',s:{'trichophyton-rubrum':'M','microsporum-canis':'M','epidermophyton':'M','paracoccidioides':'M'}},
 'itraconazol':{src:'Murray cap. 61 (texto)',s:{'trichophyton-rubrum':'Y','trichophyton-indotineae':'Y','microsporum-canis':'Y','epidermophyton':'Y','paracoccidioides':'Y'}}
};
/* escala */
S.levels={Y:{n:4,label:'Actividad habitual',short:'Sí',frac:'4/4'},M:{n:3,label:'Mayoría de cepas',short:'Casi siempre',frac:'3/4'},S:{n:2,label:'A veces / depende',short:'A veces',frac:'2/4'},R:{n:1,label:'Rara vez',short:'Rara vez',frac:'1/4'},N:{n:0,label:'No activo',short:'No',frac:'0/4'}};
})();
