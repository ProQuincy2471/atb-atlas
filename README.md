# ATB Atlas · Edición 05

Aplicación de educación médica sobre microbiología clínica y espectro antimicrobiano, diseñada como un atlas bidireccional y publicada como sitio estático (sin backend) mediante GitHub Pages.

## Tres entradas principales

1. **Micro × ATB**: cartografía del espectro mediante bandas de grupos microbiológicos; matriz exacta y matriz invertida. Cada segmento de la banda corresponde a una especie. La banda NO indica susceptibilidad colectiva del grupo.
2. **Solo antibióticos**: catálogo farmacológico por familia y subgrupo, con fichas de mecanismo, limitaciones y relaciones registradas.
3. **Solo microorganismos**: catálogo taxonómico, mapas legibles de identidad, pistas clínicas, enfermedades, relaciones documentadas, fotos oficiales CDC para organismos seleccionados.

Secciones adicionales: clínica por síndrome, comparador hasta cuatro antibióticos, doce lecciones microbiológicas, notas docentes originales basadas en IDSA 2026, referencias y configuración de colores.

## Sistema visual

- El color identifica el grupo microbiológico, no el estado de susceptibilidad.
- Los símbolos identifican el estado de la relación documentada (`✓` habitual, `≈` condicional, `×` sin actividad útil, `·` sin evaluar).
- El aspecto de una banda se construye **por especie**, mostrando visualmente cobertura mixta y vacíos de conocimiento.
- Las 12 tonalidades pueden personalizarse en la UI, con persistencia en `localStorage` cuando está disponible, presets y copia JSON.

## Estructura

- `index.html` — documento principal
- `styles.css` — sistema visual, tarjetas editoriales, layouts responsive, taxonomía y estados de cobertura
- `app.js` — navegación, matriz, inspector, buscador global, bibliotecas, comparador y preferencias
- `data/atlas.json` — corpus heredado de V4 sin rellenar celdas desconocidas
- `data/insights.json` — anotaciones docentes originales, vínculos oficiales IDSA y microfotografías CDC
- `data/palette.json` — paleta heredada de V4, conservada como referencia

## Verificación y limitaciones

Corpus vigente: 111 antibióticos, 79 microorganismos/fenotipos, 22 síndromes, 130 relaciones explícitas. Las relaciones **no** están revisadas clínicamente de manera exhaustiva. Los cruces que no tienen datos permanecen como **sin evaluar**. No utilizar como recomendador de prescripción ni como sustituto de antibiograma, clínica, PK/PD, guías y conocimiento local.

Fuentes académicas adjuntas se utilizaron como referencia para la organización y elaboración de resúmenes originales; no se redistribuyen ilustraciones o tablas protegidas. Las imágenes microbiológicas seleccionadas enlazan a CDC PHIL con atribución y están identificadas como ilustrativas, no diagnósticas. La iconografía de interfaz es de la biblioteca pública Lucide (cargada por CDN). 

## Ejecución local

```bash
python -m http.server 8000
```

Abrir `http://localhost:8000/` desde el directorio de la aplicación. En GitHub Pages, publicar la raíz del repositorio usando el workflow existente.

## Fuentes que requieren actualización independiente

- IDSA 2026: https://www.idsociety.org/practice-guideline/amr-guidance/
- IDSA cUTI 2025: https://www.idsociety.org/practice-guideline/complicated-urinary-tract-infections
- CDC PHIL: https://phil.cdc.gov