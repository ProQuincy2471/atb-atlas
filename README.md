# ATB Atlas V10 — Laboratorio interactivo

# ATB Atlas V9 — Visual Studio para microbiología y antibioticoterapia

Sitio web estático de enseñanza médica, desplegable en GitHub Pages. Sin backend, sin IA obligatoria y sin animaciones.

## Tres formas de entrar

- **Micro × ATB**: un mapa de espectro con filas de antibióticos y columnas de microorganismos. El color identifica el grupo taxonómico; el símbolo explica el estado **registrado** de la relación.
- **Solo ATB**: biblioteca organizada por familia y subgrupo, con mecanismos, limitaciones, interacciones de espectro y enlaces.
- **Solo Micro**: fichas organizadas por grupo, con identidad, morfología, pistas clínicas, síndromes y antibióticos relacionados. Puede mostrar microfotografías de CDC PHIL con sus créditos.

También incluye escenarios clínicos, comparador hasta de cuatro antibióticos, lecciones, guías y referencias.

## Cambios V9

- Selector principal en tres pasos con listas agrupadas por familia o microorganismo.
- Accesos rápidos a Pseudomonas, MRSA, E. coli BLEE, neumococo y B. fragilis.
- Filtros combinables sin una lista larga: grupo, familia, estado, orden; modo por grupos, especies o inverso.
- Hasta 16 antibióticos por página con cabeceras de familia; mapa con desplazamiento interno.
- Leyenda ampliada para evitar confundir identidad cromática con actividad.
- Inspector por cruce con estado, explicación, condiciones y fuentes; desgloses por especies.
- 12 perfiles educativos de grupos microbiológicos; ampliación de la sección Aprender con contenido de IDSA 2025/2026 y siete módulos de resistencia de la biblioteca existente.
- Paleta con doce colores editables, cuatro combinaciones predefinidas, guardado local y exportación JSON.
- Vistas personalizadas guardadas en el navegador y enlaces con filtros compartibles.
- Interfaz adaptable a móviles y sin animaciones.

## Datos y verificación

Se **preserva** el archivo `data/atlas.json` de V4-V8: 111 antibióticos, 79 microorganismos/fenotipos, 22 síndromes y 130 relaciones explícitas piloto, además de 15 referencias base. No se presentan cruces ausentes como resistencia. Las relaciones piloto no han sido revisadas clínicamente de forma individual. Una recomendación de tratamiento requiere identificación del organismo, antibiograma, foco, gravedad, farmacocinética, comorbilidades, resistencia local y una guía clínica apropiada.

Se conserva `data/insights.json`, con notas originales educativas vinculadas con guías públicas. El nuevo material de enseñanza se elaboró como **paráfrasis original**, no como transcripción extensa de libros.

## Publicar

El repositorio `ProQuincy2471/atb-atlas` utiliza GitHub Actions para publicar automáticamente el sitio. No hay etapa de compilación: `index.html`, `app.js`, `styles.css` y `data/` son archivos estáticos. Los SVG de iconos se sirven localmente desde `assets/icons/` y conservan su aviso de licencia en `LICENSE-ICONS.md`.

## Guías clínicas enlazadas

- [IDSA 2026, AMR Gram-negative guidance](https://www.idsociety.org/practice-guideline/amr-guidance/)
- [IDSA 2025, complicated UTI](https://www.idsociety.org/practice-guideline/complicated-urinary-tract-infections/)

Las versiones de las guías deben re-verificarse periódicamente; este sitio no sustituye guías actualizadas, un antibiograma o juicio clínico.


## Nuevo en V10
- Ruta separada `#/laboratorio`, con tres modos: mesa Micro × ATB, ruta clínica en tres pasos y quiz didáctico de seis preguntas explicadas.
- Mesa para seleccionar y reordenar hasta cuatro antibióticos con arrastrar y soltar o botones accesibles. Los estados se calculan desde `data/atlas.json`.
- Animaciones breves de entrada y paneles; se pueden desactivar desde el menú lateral, se respeta `prefers-reduced-motion`.
- El contenido no prescribe, no sustituye antibiograma o guías, y los cruces piloto no equivalen a evidencia revisada.