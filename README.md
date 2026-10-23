# ATB / ATLAS — V23 · Atlas clínico interactivo

Aplicación web estática de microbiología, infectología y farmacología antimicrobiana, orientada a formación médica de posgrado. Publicación: https://proquincy2471.github.io/atb-atlas/.

## Nuevos módulos (V23)

- **Antibióticos:** mecanismos farmacológicos detallados de 26 familias/subfamilias con notas de moléculas clave, diana, acceso, mecanismo, consecuencia, resistencia y correlación clínica. Los fármacos sin revisión molecular individual se identifican como explicaciones por familia/subgrupo.
- **Espectro dentro de cada ficha:** selección por actividad individual registrada/condicionada/no útil o sin evaluación y filtro por dominio microbiológico. Ya no redirige al mapa.
- **Comparador:** búsqueda por nombre y familia; selección de hasta **10 antibióticos**, contrastados contra cualquier microorganismo del catálogo, con matriz de especies relacionadas.
- **Síndromes:** 37 capítulos con revisión original del cuadro clínico, pruebas, etiología, manejo, vigilancia y bibliografía. Cada enfermedad tiene ilustración médica local de Health Icons (CC0), con posibilidad de imagen documental de Wikipedia vinculada a su procedencia.
- **Aprender:** 24 revisiones ampliadas con microcapítulos, claves de contraste, casos, preguntas y referencias. Los contenidos son explicaciones originales y no reproducciones de libros.
- **Microorganismos:** tarjetas de identidad taxonómica y biológica con acentos de color específicos por territorio.
- **Visual:** soluciones responsive para mapa, fichas, tablas comparativas, sidebar y lector, con tipografía más grande.
- **Iconografía:** SVG originales de Health Icons en `assets/clinical/` y `assets/health/` para evitar dependencias visuales rotas.

## Datos base

- `data/atlas.json`: 111 antibióticos, 79 microorganismos, 22 síndromes y 130 cruces preliminares.
- `data/who-conditions.json`: 37 capítulos, con pautas específicas únicamente donde habían sido cotejadas.
- `data/fundamentals.json`: 24 capítulos base; `v23-learning.js` aporta el desarrollo académico.
- `v23-pharmacology.js`: mecanismos y advertencias por clase, subgrupo y molécula.
- `v23-clinical.js`: revisión original de las 37 enfermedades.
- `v23-drugs.js`, `v23-reviews-ui.js`, `v23.css`: interfaces y comportamiento.

## Interpretación clínica responsable

**Registro de actividad no es probabilidad de curación.** Una celda desconocida significa que no hay evaluación individual en el banco, no resistencia. No se puede extrapolar susceptibilidad de clase o familia a una especie/fenotipo individual. Las pautas sólo se muestran si existe un registro documental para la condición. Confirmar AST, CMI, sitio de infección, concentración/exposición, función orgánica, control de foco y guías locales.

### Actualización y fuentes
- [IDSA AMR Guidance 2026](https://www.idsociety.org/practice-guideline/amr-guidance/)
- [IDSA Complicated UTI 2025](https://www.idsociety.org/practice-guideline/complicated-urinary-tract-infections/)
- [ATS/IDSA CAP](https://www.idsociety.org/practice-guideline/community-acquired-pneumonia-cap-in-adults)
- [WHO AWaRe Antibiotic Book](https://www.who.int/publications/i/item/9789240062382)
- [Health Icons CC0](https://healthicons.org/)

## Pruebas de navegador

Workflow automático `.github/workflows/atlas-visual-qa.yml`, ejecutado en pull requests y en la rama principal.

`node qa/browser-qa.cjs` con Chromium/Playwright: cinco viewports (1600, 1280, 1024, 768, 390), navegación por todas las secciones, filtros de cobertura, panel farmacológico, comparador, lecciones y verificación geométrica de desbordamientos. Capturas y diagnóstico se conservan temporalmente como artifact del workflow.

`qa/results/report.json` es la salida detallada generada por CI.

### V23.1 · Actividad orientativa separada de registros

El módulo `v23-spectrum.js` añade un explorador dentro de las fichas de antibióticos, con comparación por organismo y territorio. Distingue **actividad individual registrada (preliminar)**, **actividad farmacológica habitual descrita** para pares seleccionados, **actividad condicionada**, **ausencia de cobertura clínica habitual** y **pares sin revisión**. Estos estados **no** son porcentajes de eficacia, antibiogramas, ni sustituyen interpretación de MIC/PK-PD, foco o guías. La selección no abandona la ficha ni redirige al mapa.


## V24 · Virología, micología y parasitología (23 de octubre de 2026)

La expansión V24 añade tres catálogos con contenido original para residencia de Medicina Interna:

| Dominio | Microorganismos | Agentes farmacológicos |
|---|---:|---:|
| Virus / antivirales | 47 | 55 |
| Hongos / antifúngicos | 33 | 25 |
| Parásitos / antiparasitarios | 49 | 42 |
| **Nuevos** | **129** | **122** |
| Catálogo bacteriano previo | 79 | 111 |
| **Total de fichas catalogadas** | **208** | **233** |

### Experiencia de navegación

- **Microorganismos:** pestañas Bacterias, Virus, Hongos y Parásitos; fichas con taxonomía, patogenia, diagnóstico, epidemiología y tratamiento.
- **Antimicrobianos:** Antibióticos, Antivirales, Antifúngicos y Antiparasitarios. Cada medicamento muestra acceso celular, diana, mecanismo, PK/PD, indicaciones, toxicidad, resistencia y espectro por microorganismo.
- **Mapa:** matriz de cobertura por dominios nuevos, scroll horizontal y filtros de familia/especie; el mapa antibacteriano anterior se conserva.
- **Comparador:** modo integral con fármacos de los cuatro dominios, sin límite arbitrario de cuatro opciones; también permanece el comparador antibacteriano previo.
- **Aprender:** doce revisiones adicionales sobre ciclos, diagnóstico, farmacología y síndromes de virus, hongos y parásitos, más los 24 capítulos bacterianos anteriores.
- **Imágenes:** consulta asíncrona de imágenes de artículos taxonómicos y enlace al archivo/licencia cuando la imagen documental existe. Si no se encuentra material verificable, no se fabrica fotografía microscópica ni representación sintética.

### Criterios de evidencia y seguridad

La etiqueta **actividad habitual descrita** representa la relación farmacológica o indicación conceptual de la molécula frente a un organismo y NO constituye susceptibilidad de aislamiento individual, tasa de curación, antibiograma ni decisión terapéutica. **Variable** requiere fenotipo, especie o contexto. **No caracterizado** nunca se interpreta como resistencia. **No indicado / no fiable** se reserva a una exclusión explícita curada. Existen excepciones entre dominios (p. ej. TMP-SMX para Pneumocystis).

No se muestran pautas de dosis improvisadas; su selección requiere síndrome, gravedad, edad, embarazo, formulación, interacciones, función hepatorrenal, susceptibilidad y disponibilidad regulatoria. Los ARV se interpretan como parte de regímenes combinados y los antipalúdicos por especie, fase y epidemiología de resistencia. Medicamentos en investigación se etiquetan como tales.

### Referencias de actualización

- [NIH · guías ART adultos 2026](https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-arv/what-start-initial-combination-regimens)
- [NIH · infecciones oportunistas en VIH](https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-opportunistic-infections/introduction)
- [CDC · antivirales influenza, marzo 2026](https://www.cdc.gov/flu/hcp/antivirals/summary-clinicians.html)
- [CDC · Candida auris, octubre 2026](https://www.cdc.gov/candida-auris/hcp/clinical-care/index.html)
- [CDC · malaria, agosto 2026](https://www.cdc.gov/malaria/hcp/clinical-guidance/treatment-of-uncomplicated-malaria.html)
- [CDC DPDx · atlas y diagnóstico parasitológico](https://www.cdc.gov/dpdx/az.html)
- [IDSA · candidiasis](https://www.idsociety.org/practice-guideline/candidiasis/)
- [ECMM · guía global de mucormicosis](https://www.ecmm.info/guidelines-and-publications/)

### QA de V24

`qa/v24-browser.cjs` comprueba rutas, fichas de los tres grupos, controles de navegación, mecanismo de acción, espectro, mapa, comparador y doce revisiones en resoluciones de 1600, 1280, 768 y 390 px. Resultado de referencia: [GitHub Actions run 39953953960](https://github.com/ProQuincy2471/atb-atlas/actions/runs/39953953960), **success** (37 registros, 0 fallos). La batería previa también reportó 0 incidencias en ese mismo run.

### Alcance clínico

La expansión es una biblioteca académica en desarrollo, no un sistema validado de apoyo a decisiones ni un vademécum de prescripción. Requiere curación y revisión clínica individual antes de cualquier uso asistencial.


## V25 · Rework editorial del mapa y de las revisiones clínicas

V25 sustituye la cartografía clínica principal por un mapa taxonómico legible:
**dominio (4) → territorio (25 grupos no bacterianos + 12 bacterianos) → especie (208) → relaciones farmacológicas**.
Los colores corresponden a dominios/grupos y no significan actividad; la actividad se describe por separado mediante «registrada/habitual», «variable», «no fiable/no indicada» y «no evaluada». La matriz anterior sigue accesible en la opción **Mapa anterior / matriz**. Las relaciones siguen sin ser susceptibilidad individual ni porcentajes de eficacia.

La biblioteca Microorganismos añade un dossier de razonamiento clínico para **las 79 especies bacterianas anteriores** y para **los 129 virus, hongos y parásitos**. Incluye identificación, patogenia, epidemiología, manifestaciones, selección/interpretación de pruebas, farmacología, preguntas de diferenciación y fuentes. Para el dominio no bacteriano hay **25 grupos clínico-taxonomicos**, con recuentos auditados y cobertura exacta de 129 IDs sin duplicados ni omisiones. Hay **73 notas suplementarias explícitamente individuales**; las demás mantienen su nota clínica por taxón de V24. No se generan micrografías artificiales.

La biblioteca Síndromes ahora contiene **54 entradas**: 37 capítulos WHO AWaRe ya catalogados con seis ejes de síntesis clínica específicos, más **17 capítulos nuevos** de virología, micología y parasitología. Todos usan una estructura común:
definición y reconocimiento, etiología, diagnóstico diferencial, confirmación, tratamiento/control de foco, complicaciones/evolución y síntesis para guardia. Las fuentes enlazadas se ajustan al tema cuando se conoce una guía pertinente.

### Bases y trazabilidad

La obra aportada *Infectious Diseases* (Saif ul Islam, Academic Press/Elsevier 2023) se consultó como referencia de **estructura temática**: capítulos de virus (6), hongos (7), parásitos (8) e infecciones sindrómicas (9). No se transcriben ni distribuyen capítulos protegidos. Para las decisiones contemporáneas se utilizaron recursos oficiales de IDSA, CDC, NIH y OMS; consultar su fecha vigente antes de decisiones asistenciales. La taxonomía y la farmacología por especie aún requieren revisión clínica formal individual antes de tratar este repositorio como una referencia de prescripción.

**Advertencia importante:** el archivo histórico de 37 condiciones WHO contiene **índices**, no dosis WHO individuales validadas para todas las enfermedades. Las síntesis V25 son editoriales originales y no se presentan como extracción literal del manual ni una revisión sistemática exhaustiva. Las relaciones incompletas permanecen señaladas, no se inventan para rellenar tablas.

### Verificación

`qa/v25-browser.cjs` prueba integridad de los grupos/IDs, 54 capítulos clínicos, navegación bacterias/virus/hongos/parásitos, reseñas y filtros a 1600, 1280, 768 y 390 px, además de 2 suites anteriores. [QA V25 run #47](https://github.com/ProQuincy2471/atb-atlas/actions/runs/39991205942): suites V23 (**0 incidencias**), V24 (**37 registros, 0 fallos**) y V25 (**40 capturas verificadas, 0 fallos**). La prueba observa desbordamiento horizontal/colisión de hijos; no sustituye revisión humana de todas las páginas ni validación clínica.
