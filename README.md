# ATB Atlas — el cerebro inicial

Una **prueba de concepto independiente** para GitHub Pages. Permite entrar desde un antibiótico, un microorganismo o un síndrome clínico. Los enlaces entre las tres entidades están almacenados como datos estructurados; no se requiere backend, cuenta ni IA.

**Estado del contenido: borrador editorial pendiente de revisión clínica experta por registro. NO utilizar para prescribir.**

## Abrir y publicar

1. Crea un repositorio de GitHub (por ejemplo `atb-atlas`).
2. Sube los archivos que están dentro de esta carpeta al **directorio raíz** de la rama `main` (incluye `index.html`, `app.js`, `styles.css`, carpeta `data/` y `.nojekyll`).
3. Abre **Settings → Pages → Build and deployment → Deploy from a branch → main → /(root) → Save**.
4. El enlace público suele tener el formato `https://TU-USUARIO.github.io/atb-atlas/`, según el nombre del repositorio. GitHub Pages puede tardar varios minutos en publicar.
5. Puedes compartir un enlace directo a una ficha, como `.../atb-atlas/#/microorganismo/e-coli-blee`.

No hay dependencias de npm. Para probar en local (con Python instalado), ejecuta `python3 -m http.server 8000` desde la raíz del proyecto y abre `http://localhost:8000/`. No abras `index.html` directamente como `file://` porque `fetch()` de JSON requiere HTTP en varios navegadores.

## Estructura del cerebro

- `data/knowledge.json`: antibióticos, microorganismos, síndromes, asociaciones de espectro, reglas contextuales y citas.
- `app.js`: presenta vistas reversibles, busca, filtra, construye la matriz y permite compartir enlaces profundos.
- `styles.css` + `index.html`: diseño y acceso web público.
- `tools/build_data.py`: fuente de trabajo para regenerar el JSON de ejemplo.
- `tools/validate.py`: auditoría básica de integridad referencial y cobertura de fuentes.

### Cinco conceptos que nunca debemos mezclar

1. **Especie / fenotipo:** *E. coli* sin resistencia definida no equivale a *E. coli* BLEE.
2. **Actividad de espectro:** `active`, `conditional`, `none`, `unknown` describen una relación general, **no** un antibiograma individual.
3. **Idoneidad por foco:** las reglas de sitio (`siteRules`) se interpretan independientemente de actividad microbiológica.
4. **Etiología clínica:** `syndromes[].consider[]` describe patógenos que pueden considerarse, **no** probabilidades ni diagnóstico.
5. **Recomendación terapéutica:** este prototipo todavía **no** genera regímenes, dosis o clasificaciones de primera línea para casos individuales.

**La ausencia de relación no debe convertirse en un 'no cubre'.** Se muestra como **Sin evaluar**. Las combinaciones con `conditional` no son negativas ni positivas absolutas. El fenotipo, el sitio, los puntos de corte, las concentraciones en tejido, la susceptibilidad local y otros factores pueden cambiar la conclusión.

## Extender los datos

- Agregar un antibiótico en `antibiotics` con ID único y campos obligatorios.
- Agregar una entidad específica en `pathogens`; separar especies y fenotipos (MRSA, BLEE, AmpC, CRE, DTR).
- Agregar relaciones individuales en `spectrum`. Cada vínculo debe tener `sources`, `note`, `status` y conservar `review='pendiente_revision_editorial'` hasta una revisión registrada.
- Agregar asociaciones etiológicas en `syndromes[].consider` con condición explícita.
- Agregar reglas específicas de foco en `siteRules` para evitar simplificaciones peligrosas.
- Registrar versión y fecha de fuente; priorizar documentos vigentes y antibiogramas locales para contexto, sin inventar tasas de resistencia.

## Fuentes y derechos

Fuentes de orientación documental: OMS AWaRe Antibiotic Book (2022), guía IDSA AMR (2026), UCSF spectrum guide, OpenStax *Microbiology* y el camino clínico de neumonía IDSA. Los materiales didácticos PowerPoint proporcionados por el usuario se utilizaron para identificar necesidades pedagógicas (preguntas de espectro, casos, sitios), no para reproducir tablas, figuras ni declaraciones clínicas literalmente. Todos los párrafos son paráfrasis breves originales.

Si en una versión futura se adaptan páginas, diagramas o texto de OpenStax (CC BY-NC-SA 4.0) o de OMS (CC BY-NC-SA 3.0 IGO), deben respetarse sus licencias y obligaciones de atribución y compartir bajo las mismas condiciones, además de los requisitos propios de traducciones OMS. El diseño actual no utiliza sus imágenes ni logos.

## Próximos pasos antes de un lanzamiento clínico

- Revisión experta línea por línea con control de versiones y fecha.
- Expandir por fenotipo / especie y contexto clínico, incluir farmacocinética por foco.
- Distinguir empírico vs dirigido, terapia combinada, alternativas, efectos adversos, ajuste renal, embarazo y poblaciones especiales.
- Incorporar vigencia de guías y un módulo opcional para consultar antibiogramas institucionales que no se propaguen a todo el país.
- Revisar accesibilidad, enlaces y visualización en móvil.