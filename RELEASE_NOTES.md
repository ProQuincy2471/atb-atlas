# ATB Atlas V20.0.0 — Implementación web del atlas ilustrado

## Referencias
Recreación como interfaz web interactiva de las cinco capturas de diseño aprobadas en la conversación. Los JPG recortados de las referencias del usuario se usan solamente como ilustraciones didácticas. No constituyen micrografías diagnósticas ni fotografías de producto. El resto de la interfaz es HTML/CSS/JS/SVG y controles funcionales.

## Funciones nuevas
1. Mapa cartográfico SVG: seis territorios visuales, órganos, curvas de conexión, modos taxonómico / clínico / cobertura, controles de capas y panel contextual. Las rutas son conexiones conceptuales, no equivalen a susceptibilidad.
2. Microorganismos: fichas continuas con cabecera ilustrada, identidad, morfología, enfermedades vinculadas, factores de riesgo, fisiopatología, relación ATB, preguntas y fuentes; panel de conocimiento específico.
3. Antibióticos: fichas continuas, mecanismos, clase, esquema ilustrativo, recuentos de cruces por grupo, indicaciones, dosis con fuente WHO cuando existen, seguridad y preguntas.
4. Síndromes: encabezado editorial por sistema, resumen, ficha continua de enfermedad WHO, panel de riesgo y contexto, conservación de niveles de evidencia.
5. Comparador: franja previa con siete candidatos ordenados por disponibilidad de datos y etiquetados según actividad preliminar o interés conceptual (no recomendaciones).
6. Navegación global compacta, paletas por sección, buscador, índices jerárquicos y responsive.

## Integridad del corpus
`atlas.json`, `insights.json`, `who-conditions.json`, `fundamentals.json`, `study-quiz.json` y `editorial-knowledge.json` permanecen sin modificar. Se conserva la posibilidad de editar colores, buscar y explorar el corpus existente.

## Advertencias
Los 130 cruces del corpus son preliminares. La falta de un cruce no implica resistencia. Las 37 enfermedades WHO no equivalen a 37 esquemas individuales completos: los campos de tratamiento y dosis aparecen solo cuando existía material cotejado.

## Verificación
`node --check v20.js` y VM de renderizado de 8 secciones, 111 drogas, 79 microorganismos y 37 enfermedades. El entorno impide navegación HTTP/file en Chromium local con `ERR_BLOCKED_BY_ADMINISTRATOR`; no declarar QA de navegador visual completada.