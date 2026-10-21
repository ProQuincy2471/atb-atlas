# ATB Atlas V3 — Cartografía antimicrobiana

Proyecto estático independiente para GitHub Pages.

**URL de publicación:** https://proquincy2471.github.io/atb-atlas/

## Pantallas

| Ruta | Función |
| --- | --- |
| `#/atlas` | Spectrum Bands por familias, con territorios taxonómicos y microorganismos individuales |
| `#/matriz` | Cruces antibiótico × patógeno, estados y documentación |
| `#/biblioteca` | Catálogos simultáneos de antimicrobianos y patógenos |
| `#/identidad` | Taxonomía clínica diagramática navegable |
| `#/sindromes` | Relación síndrome → microorganismos → antibióticos con actividad documentada |
| `#/comparar` | Comparación de hasta 4 antimicrobianos |
| `#/antibiotico/:id` | Ficha por antimicrobiano |
| `#/microorganismo/:id` | Ficha por patógeno |
| `#/sindrome/:id` | Ficha por síndrome |
| `#/acerca` | Metodología y fuentes |

## Diseño

- Lenguaje de atlas editorial: fondo cálido, retícula, encabezados de coordenadas, banda continua por fila, jerarquía taxonómica y divisores definidos.
- Ocho grupos de microorganismos con **color editable individual**.
- Seis familias de antibióticos con color editable independiente.
- Representación cromática + tramas/texto: las celdas usan `active`, `conditional`, `none` y `unknown`.
- **Ausencia de dato NO equivale a resistencia.** Cada microorganismo tiene una celda independiente incluso en Spectrum Bands.
- Los iconos de interfaz son de la biblioteca pública **Lucide** (ISC); se obtienen mediante su script UMD alojado en jsDelivr. Se requiere internet para los iconos; la funcionalidad del atlas no depende de ellos.
- Colores y efectos reducidos. No se utiliza IA para inferir cobertura.

## Cambiar colores

1. En la aplicación, abre el icono de paleta en el encabezado o pulsa **Cambiar colores** en el Mapa de identidad.
2. Cambia cada color mediante el selector del navegador.
3. El navegador persiste los ajustes en `localStorage` con la clave `atb-atlas-palette-v3`.
4. Se pueden elegir tres presets, restablecer ajustes y descargar un JSON de paleta.
5. Para establecer valores **globales** (antes de que un visitante haya personalizado), edita `data/palette.json` en el repositorio y confirma los cambios. La edición global no sustituye ajustes locales ya guardados.

### Identificadores de grupos microbiológicos

- `staphylococci`: Estafilococos.
- `streptococci`: Estreptococos.
- `enterococci`: Enterococos.
- `enterobacterales`: Enterobacterales.
- `nonfermenters`: No fermentadores.
- `respiratory`: Respiratorios gramnegativos.
- `anaerobes`: Anaerobios.
- `atypicals`: Atípicos.

## Datos

Se conserva el corpus piloto en `data/knowledge.json`. A 21/oct/2026 contiene 20 antibióticos, 16 organismos o fenotipos, 8 síndromes y 114 relaciones registradas.

- Las bandas usan segmentos individuales: **no consolidan por defecto el estado de varios organismos de un grupo**.
- Una relación sin registro se representa como `unknown` (sin evaluar), nunca `none`.
- **La sección clínica presenta actividad microbiológica documentada, no listas de prescripción**.
- Todas las relaciones son provisionales y requieren revisión editorial clínico-farmacológica antes de considerarse una fuente prescriptiva.

## Desarrollo y publicación

Sitio estático, sin compilación ni servicios privados. GitHub Actions despliega la rama `main` automáticamente.

Archivos:

- `index.html`: documento principal y carga de Lucide.
- `styles.css`: sistema visual, diseño responsive y patrones.
- `app.js`: motor de interacción, vínculos y estados.
- `data/knowledge.json`: corpus de relaciones.
- `data/palette.json`: tema editable global.

Para probar localmente:

```bash
python -m http.server 8000
```

Abrir `http://localhost:8000/#/atlas`.

## Fuentes y limitaciones

Ver `#/acerca` y `data/knowledge.json.sources`. El corpus piloto se documenta con bibliografía base de OMS AWaRe, IDSA, UCSF y OpenStax. No se autoriza inferir sensibilidad individual, dosis, primera línea ni tratamiento empírico a partir de la representación visual.

**Advertencia:** herramienta educativa experimental; no sustituye antibiogramas, evaluación clínica, microbiología, guías vigentes ni políticas de resistencia local.