# ATB Atlas — Illustrated Clinical Atlas V20

Sitio estático, publicado mediante GitHub Pages en https://proquincy2471.github.io/atb-atlas/.

La edición 20 incorpora una implementación visual real (HTML, CSS, JavaScript y SVG) inspirada en las capturas del usuario. No es un mockup ni una imagen de página completa.

## Entrypoint
`index.html` importa por orden `styles.css`, `v18.css`, `v19.css`, `v20.css` y `app.js`, `v18.js`, `v19.js`, `v20.js`. Es una capa incremental sobre el corpus y la funcionalidad existente.

## Organización
- `data/atlas.json`: catálogo de 111 antibióticos, 79 microorganismos, 22 síndromes y 130 relaciones preliminares.
- `data/who-conditions.json`: biblioteca de 37 enfermedades WHO y pautas concretas donde estaban cotejadas.
- `data/fundamentals.json`: 24 capítulos.
- `data/study-quiz.json`: banco educativo propio.
- `data/editorial-knowledge.json`: información adicional de mecanismo, familias y especies.
- `v20.js` y `v20.css`: mapa cartográfico, fichas y estilo de V20.
- `assets/`: SVG de iconos locales y seis ilustraciones editadas de las referencias visuales aprobadas (no fotografías médicas validadas).

## Seguridad clínica
La visualización de grupo representa taxonomía, no susceptibilidad. No usar el atlas para prescripción sin antibiograma, fenotipo, gravedad, contexto, PK/PD y guía vigente. No se completaron artificialmente pautas faltantes ni se añadieron cruces sin fuente.

## Pruebas
`node qa_vm.cjs` — renderizado virtual de todas las áreas y registros. Prueba de navegador pendiente por bloqueo de Chromium en este entorno; en GitHub Pages debe revisarse visualmente en escritorio/móvil.