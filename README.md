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
