# ATB Atlas — V17 | Chromatic Field Notes

Revisión de identidad visual y exploración con un lenguaje cromático propio, manteniendo intacto el catálogo clínico de V16.

## Qué cambió

- Shell violeta profundo, encabezados editoriales de alto contraste, navegación destacada.
- **12 pigmentos microbiológicos** visibles y personalizables; una banda cromática de acceso directo y tarjetas de taxonomía mejor identificadas.
- Cabeceras de matriz a color completo y bandas de espectro con señales semánticas independientes del color del organismo.
- Cuatro presets: Resonancia, Tropical Lab, Nocturno y Museo Médico.
- Dossiers interactivos para los perfiles: mapa de relaciones registradas por grupo en antibióticos y lista de cruces documentados en microorganismos.
- Tratamientos visuales específicos para Clínica, Comparador, Aprender, Laboratorio y Fuentes, con más contraste y mejores jerarquías.
- Iconografía SVG local, sin depender de CDN para los iconos.

## Integridad de datos

Se reutilizan `data/atlas.json`, `data/insights.json` y `data/fundamentals.json` de V16 sin cambios. La base contiene 111 antibióticos, 79 microorganismos, 22 síndromes y 130 relaciones preliminares.

Una relación registrada no constituye susceptibilidad clínica validada, y un vacío no significa resistencia. Los dossiers muestran **disponibilidad de cruces** y no probabilidades de cobertura ni porcentajes de éxito clínico.

## Archivos del despliegue

- `index.html`
- `app.js`
- `styles.css`
- `data/` (sin cambios)
- `assets/icons/` (sin cambios)

## Verificación

Probados 8 módulos, selector de paleta, inspector, mapa por especie, navegación y pantallas de 1512px / 390px. Iconos SVG representados, sin errores de JavaScript observados y sin overflow global.