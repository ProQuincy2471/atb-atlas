# ATB Atlas V7 · Microbiología visual

Sitio estático e interactivo publicado con GitHub Pages. Rediseño completo del frontend, sin animaciones.

## Modos

- **Micro × ATB**: mapa por familias y grupos microbiológicos; vista por especie y vista invertida; filtros; inspector de cruces.
- **Solo antibióticos**: catálogo de 111 agentes, familias/subgrupos, mecanismo, contexto y cobertura registrada.
- **Solo microorganismos**: catálogo de 79 especies y fenotipos, estructura, morfología, pistas clínicas, enfermedades y relaciones de espectro.
- Clínica y síndromes, comparador de hasta cuatro fármacos, lecciones y bibliografía.

## Principios de interfaz

- Identidad microbiológica = color de grupo personalizable. Actividad = símbolo/estado independiente del color de identidad.
- 12 grupos de color editable desde la web. Los cambios se guardan en el navegador (`localStorage`) sin cuenta ni backend.
- Iconografía SVG de la biblioteca pública Font Awesome Free empaquetada en `assets/icons/`; ver `LICENSE-ICONS.md`.
- Fuentes: Plus Jakarta Sans y DM Sans (Google Fonts; con alternativas locales). Sin animaciones CSS o JavaScript.
- Microfotografías de CDC PHIL solo cuando existen en el catálogo y con atribución/enlace de origen.

## Datos

`data/atlas.json` y `data/insights.json` fueron conservados del catálogo V4/V5: 111 antibióticos, 79 microorganismos/fenotipos, 22 síndromes, 130 relaciones explícitas. Las relaciones no documentadas permanecen marcadas «sin evaluar»; no se puede inferir resistencia de la ausencia de información. Las relaciones registradas aún están sujetas a revisión clínica individual.

Este es un recurso de estudio, no un sistema de recomendación de prescripción.

## Despliegue

GitHub Pages mediante `.github/workflows/deploy-pages.yml` existente. Abrir `index.html` desde un servidor HTTP; la lectura `fetch` del JSON puede fallar con `file://`.