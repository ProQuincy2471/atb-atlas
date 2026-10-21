# ATB ATLAS / Edición 05 — Rework visual integral

- Reconstrucción completa de layout, navegación y lenguaje visual.
- Tres modos principales inmediatos: Micro × Antibióticos, Solo Antibióticos y Solo Microorganismos.
- Mapa de espectro continuo mediante bandas segmentadas por especies, leyenda siempre visible, filtros taxonómicos de color, modo matriz y modo invertido.
- Inspector contextual de grupos/especies con trazabilidad del estado de cada relación.
- Atlas de microorganismos ampliado con estructura, taxonomía, clínica, resistencia y fotografías selectas CDC PHIL.
- Fichas de antibióticos reorganizadas por mecanismo, relación, utilidad contextual y limitaciones.
- Comparador de hasta 4 fármacos, explorador clínico por 22 síndromes, doce lecciones y 7 notas originales enlazadas con IDSA 2026.
- Configuración editable de 12 colores, presets, exportación JSON y persistencia local con fallback seguro.
- Búsqueda global Ctrl/Cmd+K. Adaptación para escritorio y móvil con matriz con desplazamiento horizontal interno.
- Se conservó V4 `data/atlas.json`: 111 antibióticos, 79 microorganismos, 22 síndromes, 130 relaciones sin inventar susceptibilidades nuevas.
- QA local: test de 7 rutas, inspector, búsqueda, inversión de matriz y persistencia de colores, cero errores JavaScript; sin overflow horizontal del documento en 390 px.

**Precaución**: la catalogación no equivale a validación clínica. Cada relación requiere una revisión editorial individual.