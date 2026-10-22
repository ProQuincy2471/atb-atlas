# ATB Atlas V18 — The Clinical Field Guide

## Entrega

Reestructuración mayor del ATB Atlas y su información educativa manteniendo la base clínica original (`data/atlas.json`, `data/insights.json`) sin inventar nuevas relaciones de susceptibilidad.

### Funciones

1. **Microorganismos**: 79 fichas navegables en un árbol jerárquico y página continua con identidad, enfermedades, factores de riesgo (fichas seleccionadas), patogenia, espectro documentado, práctica y bibliografía.
2. **Antibióticos**: 111 fichas en 26 familias con mecanismo, territorios, contextos clínicos, dosificación estrictamente acotada a escenario WHO cuando disponible, seguridad/PKPD, aprendizaje y fuentes. Las 111 fichas no tienen la misma profundidad todavía: ver estado de revisión por apartado.
3. **Síndromes y enfermedades**: 37 capítulos WHO AWaRe 2022, con 13 síntesis clínicas ampliadas y 4 capítulos con una o más pautas específicas extraídas del manual; los restantes están expresamente marcados como índice que requiere revisión individual.
4. **Mapa**: filtro lateral por familia y territorio, grupos/especies, selección de cruces en contexto y páginas cortas.
5. **Comparador**: cuatro fármacos, candidatos visibles ordenados por registro individual y, en especies seleccionadas, perfil teórico de interés explícitamente diferenciado.
6. **Aprender**: 24 capítulos progresivos, 30 preguntas de opción múltiple originales más recuperación abierta, ejemplo aplicado y progreso local.
7. **Laboratorio**: 37 situaciones del libro WHO con taxonomía por órgano/sistema; cruce fármaco–especie y enlaces de contexto.
8. **Fuentes**: trazabilidad separada por texto/libro vs indicación terapéutica.

### Trazabilidad y licencias

**WHO AWaRe 2022:** World Health Organization. *The WHO AWaRe (Access, Watch, Reserve) antibiotic book*. Geneva: WHO; 2022. ISBN 978-92-4-006238-2. [Documento](https://www.who.int/publications/i/item/9789240062382). Licencia CC BY-NC-SA 3.0 IGO. El sitio no está avalado por la OMS, y este resumen original es una adaptación educativa no comercial.

El libro contiene los capítulos de enfermedades y dosificación adulta, empleados como marco de organización. Las dosis recogidas están asociadas a la patología y **no son prescripciones personalizadas**.

**LIR Pharmacology 7ª:** capítulos 28–31, estructura de mecanismos antimicrobianos. **LIR Pharmacology Questions & Answers:** usado como referencia de estilo didáctico; las preguntas del ATB Atlas son originales, no copias del banco.

**Ross & Wilson Pharmacology:** capítulo 11 (Antimicrobial Drugs) y bases PK/PD. **Pharmacotherapy: Principles and Practice 6e:** capítulo 72 de selección/ste­wardship y capítulos 73–87 sobre enfermedades infecciosas.

**IDSA 2025 cUTI:** https://www.idsociety.org/practice-guideline/complicated-urinary-tract-infections/

**IDSA 2024 AMR:** https://www.idsociety.org/practice-guideline/amr-guidance/

### Límites de esta versión

- Los **130 registros ATB × organismo** del proyecto original se conservan como relaciones **preliminares**, no revisadas individualmente.
- Las casillas sin relación no deben interpretarse como resistentes ni sensibles.
- Muchos de los 37 capítulos WHO son por ahora entradas de catálogo con enlaces y requieren transcripción/conciliación individual de primera elección, dosis y alternativas.
- En el comparador, *perfil de interés* significa actividad teórica o contextual reconocida: **no** indica primera elección para todos los casos ni susceptibilidad individual.
- Dosis de WHO 2022 requieren verificar vigencia, edad, embarazo, alergias, función renal y hepática, antibiograma y guías regionales antes de su aplicación.
- La interfaz funciona como sitio estático en GitHub Pages sin backend; filtros y progreso viven en el navegador.

## Estructura

- `index.html`, `app.js`, `styles.css`: núcleo V17, sin alterar el corpus.
- `v18.js`, `v18.css`: rework V18, componentes de navegación y fichas.
- `data/who-conditions.json`: índice de 37 condiciones y 13 síntesis, dosis documentadas.
- `data/study-quiz.json`: 30 preguntas originales.
- `assets/icons/`: SVG locales con iconografía pública estilo Lucide.

## QA

Se probaron las ocho rutas, selectores intra-app, árbol, fichas continuas, comparador, laboratorio, pregunta interactiva e inspector del mapa con el corpus original y viewport de 1440px/390px. Las pruebas no registraron errores de JavaScript ni desbordamiento horizontal del documento.