# ATB Atlas V19 — Living Fieldguide

**Repositorio:** `ProQuincy2471/atb-atlas` · **Despliegue:** GitHub Pages · aplicación web estática sin Zite.

## Qué es

ATB Atlas reúne un catálogo educativo preexistente de **111 antibióticos, 79 microorganismos, 22 síndromes**, un índice de **37 enfermedades WHO AWaRe**, **24 capítulos** de Fundamentos y un banco de **30 preguntas originales**. La V19 agrega una capa editorial estructurada y mejora la identidad visual, la jerarquía y la navegación.

## Qué se incorporó en V19

1. **Navegación editorial:** ocho volúmenes con numeración, color propio, iconografía SVG local y un encabezado específico por sección. La biblioteca taxonómica tiene accesos rápidos y jerarquía compacta.
2. **Perfiles microbiológicos:** para los doce grupos, identificación, síndromes y errores frecuentes. Para 14 especies/fenotipos prioritarios, reservorio, factores de riesgo, fisiopatología, diagnóstico y diferencias clave. El resto mantiene su ficha individual y recibe orientación del territorio, sin atribuirle datos de otra especie.
3. **Farmacología:** los 26 grupos del catálogo tienen diana, mecanismo, PK/PD conceptual, aplicaciones y límites. Se añaden notas individuales sobre seguridad, penetración y perlas para 17 antibióticos seleccionados. No se infiere susceptibilidad individual desde notas de clase.
4. **Enfermedades WHO:** 15 sistemas/órganos incorporan capas de reconocimiento y contexto. Las 37 condiciones conservan sus niveles originales de revisión y solo muestran dosis cuando ya existe una pauta específica rastreada a WHO 2022.
5. **Mapa:** explicación inicial prominente del lenguaje visual (color = territorio, símbolo = relación registrada).
6. **Comparador, Aprender y Laboratorio:** guías de interpretación y recorridos por sistema para reducir la carga cognitiva.

## Archivos principales

- `index.html` — carga la aplicación y las capas v18 + v19.
- `app.js`, `styles.css` — catálogo base UI.
- `v18.js`, `v18.css` — lógica y presentación enciclopédica existente.
- `v19.js`, `v19.css` — identidad editorial y contenido complementario.
- `data/atlas.json` — catálogo y **130 relaciones preliminares**. No se modificó.
- `data/editorial-knowledge.json` — conocimiento didáctico nuevo, etiquetado como **no equivalente a antibiograma**.
- `data/who-conditions.json` — 37 capítulos WHO 2022, con niveles de revisión explícitos.
- `tools/build_editorial_knowledge.py` — generador reproducible de datos editoriales (fuente de los perfiles).

## Criterios de seguridad editorial

- Las relaciones previas permanecen preliminares. **Ausencia de registro ≠ resistencia.**
- Los perfiles por familia son explicativos, **no** una afirmación de cobertura para una especie.
- Un capítulo WHO catalogado no significa que exista una pauta revisada; las dosis aparecen únicamente en los capítulos que ya tienen fuente documentada.
- La guía WHO AWaRe de 2022 está siendo actualizada. Para meningitis, ITS, pediatría y otros temas, se requiere cotejo con guías más recientes.
- No usar el atlas como prescriptor sin epidemiología local, antibiograma, foco, severidad, función renal/hepática y supervisión clínica.

## Fuentes relevantes

- WHO AWaRe antibiotic book (2022): https://www.who.int/publications/i/item/9789240062382
- IDSA complicated UTI guideline (2025): https://www.idsociety.org/practice-guideline/complicated-urinary-tract-infections/
- IDSA AMR treatment guidance (2026): https://www.idsociety.org/practice-guideline/amr-guidance/

La V19 incluye explicaciones originales de estudio y no reproduce preguntas o ilustraciones de libros protegidos.