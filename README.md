# ATB Atlas V16 — Editorial Clinical Atlas

Aplicación estática compatible con GitHub Pages. Rework integral de la experiencia del Atlas de microbiología y antibióticos.

## Navegación

- **Mapa:** 111 antibióticos y 79 microorganismos, 12 grupos taxonómicos, bandas con cruces documentados, vista por especies, inspector de evidencia, filtros, ordenación y paginación.
- **Microorganismos:** catálogo agrupado con fichas de morfología, enfermedades, clínica, referencias, fotografías CDC atribuidas cuando están disponibles.
- **Antibióticos:** 111 agentes en 26 familias, mecanismos, subgrupos, limitaciones, relaciones registradas y fuentes.
- **Síndromes:** 22 perfiles con preguntas clínicas, agentes y referencias.
- **Comparador:** hasta 4 fármacos frente a un mismo microorganismo; muestra solo relaciones existentes.
- **Aprender:** 24 capítulos progresivos desde Gram hasta resistencias y aplicación, con autoevaluación y progreso local.
- **Laboratorio:** ruta síndrome → microorganismo → antibiótico → interpretación.
- **Fuentes:** 15 entradas bibliográficas y guías clínicas.

## Publicación

GitHub Pages usa la raíz del repositorio (index.html). No requiere compilador ni backend. Se apoya en archivos JSON del directorio `data/` y SVG libres almacenados en `assets/icons/`.

## Calidad de los datos

El catálogo **no constituye un antibiograma**. La base histórica conserva 130 relaciones explícitas preliminares y sin validación clínica individual. El estado **sin evaluar** significa ausencia de un registro y nunca debe inferirse como resistencia. El componente de aprendizaje conceptual está separado de la capa de relaciones y las referencias.

## Cambios editoriales

El contenido de Fundamentos se redactó como material docente original. Las referencias del repositorio son bibliografía de apoyo, no una auditoría de cada frase o relación. Confirmar siempre guía vigente, población, sitio de infección, cultivos, PK/PD y susceptibilidad.

## Archivos

- `index.html`, `styles.css`, `app.js`
- `data/atlas.json` y `data/insights.json` (corpus conservado)
- `data/fundamentals.json` (nuevo)
- `assets/icons` (SVG existentes)

© Iconos: conservar archivo de licencia de iconografía del repositorio. Código fuente y recursos conforme a licencias de origen.