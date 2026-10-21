# ATB Atlas — Edición V4

**Versión pública:** https://proquincy2471.github.io/atb-atlas/#/cruce

Atlas didáctico en español de microorganismos, antibióticos y síndromes clínicos. Funciona íntegramente en **GitHub Pages** sin servidor, cuenta ni IA. Inspiración: cartografía de espectro por familias con microorganismos agrupados como en las referencias del usuario; desarrollo visual y textos originales.

## Navegación

- **Micro × ATB** — dos lecturas: bandas por familias y matriz precisa, con inversión de ejes, búsqueda, filtros y panel inspector.
- **Solo antibióticos** — 111 medicamentos catalogados, 26 familias y decenas de subgrupos, mecanismo, perlas, límites y relaciones identificadas.
- **Solo microorganismos** — 79 patógenos o fenotipos, diferenciados en 12 grupos microbiológicos, con identidad, morfología, asociaciones clínicas, pistas y relaciones conocidas.
- **Comparar** — hasta cuatro antibióticos en un formato de contraste por especie.
- **Síndromes** — 22 escenarios con pistas clínicas, posibles agentes y enlaces a fuentes.
- **Aprender** — 12 lecciones de estructura, Gram, anaerobiosis, virulencia, resistencia y selección.
- **Guías y fuentes** — fuentes IDSA oficiales y bibliografía académica.

### Lectura de la cobertura

**Color = grupo microbiológico.** Se puede personalizar individualmente desde el botón de paleta, guardar en el navegador y exportar como JSON. Valores predeterminados en `data/palette.json`.

**Símbolo = interpretación de cada cruce específico:** ✓ actividad habitual; ≈ condicionada; × ausencia de actividad útil; · sin evaluar. Una celda sin evaluar **no significa resistencia**. Los colores de grupo nunca equivalen a cobertura.

### Catálogo ampliado ≠ bases de susceptibilidad

El catálogo de 111 agentes y 79 organismos es una **taxonomía para aprendizaje**, no un antibiograma. Contiene **130 relaciones explícitas**, muchas heredadas del piloto sin revisión clínica individual, y el resto se marca *sin evaluar*. **No se generan relaciones por mera pertenencia a una familia.** Las notas clínicas son educativas; no constituyen recomendaciones de tratamiento individual.

El catálogo incluye agentes recientes, especializados y medicamentos en investigación o de disponibilidad regional limitada. Los agentes antituberculosos están separados de los antibacterianos de uso general. Verificar estado regulatorio y recomendaciones locales.

## Datos y actualización

- `data/atlas.json`: catálogo y conocimiento; no copiar/redistribuir textos extensos o figuras de los libros.
- `data/palette.json`: colores predeterminados.
- `data/knowledge.json`: contenido piloto legado, mantenido para trazabilidad.
- `tools/validate_v4.py`: auditoría de IDs, relaciones y referencias.
- `tools/build_content_v4.py`, `tools/enrich_data_v4.py`: scripts reproducibles a partir de `data/knowledge.v3.json`; **no ejecutar a menos que se quiera reconstruir y revisar cambios**.

## Bibliografía principal

- IDSA 2026 AMR Guidance — https://www.idsociety.org/practice-guideline/amr-guidance/
- IDSA 2025 Complicated UTI — https://www.idsociety.org/practice-guideline/complicated-urinary-tract-infections
- IDSA 2024 Intraabdominal infection (diagnóstico Parte 1) — https://www.idsociety.org/practice-guideline/intra-abdominal-infections/
- ATS/IDSA 2019 CAP — https://www.idsociety.org/practice-guideline/community-acquired-pneumonia-cap-in-adults/
- IDSA 2014 SSTI — https://www.idsociety.org/practice-guideline/skin-and-soft-tissue-infections/
- CDC STI Treatment — https://www.cdc.gov/std/treatment-guidelines/default.htm
- Murray, Rosenthal & Pfaller, *Medical Microbiology*, 10ª ed., Elsevier, 2026 (aportado por el usuario).
- Cornelissen & Hobbs, *Lippincott Illustrated Reviews: Microbiology*, 4ª ed., 2020 (aportado por el usuario).
- Levinson et al., *Review of Medical Microbiology & Immunology*, 15ª ed., 2018 (aportado por el usuario).
- Saif ul Islam, *Infectious Diseases*, 2023 (aportado por el usuario).

Fuentes bibliográficas citadas para síntesis **original** de conocimiento; ningún libro completo, ilustración ni tabla del material con copyright se incorpora a la aplicación pública.

## Uso técnico

Servir `index.html` en un servidor HTTP estático; también funciona en GitHub Pages con rutas `#/...`. Se evita el `file://` ya que los datos se cargan mediante `fetch`. Se usa biblioteca pública **Lucide** para iconografía. Algunas micrografías de referencia provienen de NIGMS/NIH y Wikimedia Commons con los créditos indicados.

## Estado editorial

**Borrador educativo: no apto para prescripción.** Toda decisión clínica requiere microorganismo/AST, sitio, PK/PD, riesgo, contraindicaciones, fuentes primarias y guías locales. Solo se deben marcar como revisadas las relaciones que pasen un control editorial clínico individual.