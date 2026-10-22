# ATB Atlas V16 · Biblioteca editorial y estudio interactivo

## Reconstrucción visual y funcional

- Nueva interfaz editorial médica: masthead, navegación compacta, tonos cálidos con acentos contrastantes.
- Mapa a ancho útil con 12 territorios en color independiente, indicador por especie, vista de precisión y leyenda clínica explícita.
- Filtros de familia, búsqueda, ordenación, favoritos, vistas guardadas, grupos y densidad de datos sin inferir cobertura.
- Fichas microbiológicas por identidad, clínica, cruces y bibliografía, con media CDC atribuida donde exista.
- Fichas farmacológicas con familia, subgrupo, mecanismo, contexto, limitaciones y relaciones explícitas.
- 22 síndromes clínicos con vista escalonada de foco, gravedad, microorganismos y guías.
- Comparación frente a una misma especie de hasta cuatro antibióticos; incertidumbre visible.
- 24 capítulos de fundamentos: microbiología, diagnóstico, mecanismo, espectro, PK/PD, clínica, resistencia y casos integradores.
- Laboratorio guiado en cuatro etapas: síndrome → micro → antibiótico → interpretación.
- Cuatro paletas predefinidas y 12 colores microbiológicos editables y persistentes.
- Acepta accesos directos #/mapa, #/micro, #/atb, #/clinica, #/comparar, #/aprender, #/laboratorio, #/fuentes.

## Integridad

Se preservan `data/atlas.json`, `data/insights.json`, las 130 relaciones originales y la iconografía local; se añade `data/fundamentals.json`. No se fabricaron nuevas relaciones de susceptibilidad.

## QA

Comprobaciones: sintaxis JavaScript, carga de JSON, 8 rutas, inspector, editor de colores, vista móvil y sin desbordamiento global a 390 px.