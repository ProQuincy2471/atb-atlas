# INFEORA — instrucciones permanentes para Claude Code

> Este archivo es contexto de proyecto y convenciones. Leer el código actual antes de cambiarlo.
> Fecha de transferencia: 2026-10-23. No asumir que los recuentos o el estado de despliegue siguen iguales; comprobar `main`.

## Identidad y propósito
- **Nombre comercial/editorial:** INFEORA — Atlas de Infectología Clínica.
- **Propósito:** atlas web interactivo de Microbiología, Infectología y farmacología antimicrobiana para estudiantes avanzados y médicos de residencia (especialmente Medicina Interna). No es un chatbot ni una app de prescripción.
- **Lema:** «Del microorganismo a la decisión clínica».
- **Repositorio canónico:** `ProQuincy2471/atb-atlas`, rama `main`. **NO** crear otra aplicación/repo desde cero.
- **GitHub Pages:** `https://proquincy2471.github.io/atb-atlas/infeora/`. La raíz antigua `/atb-atlas/` se conserva. El repositorio sigue llamándose `atb-atlas`; no asumir que el slug cambió.
- La persona usuaria pide **modificaciones reales del código, en GitHub, con validación visual y funcional**; no mockups ni imágenes generadas.

## Arquitectura (verificar antes de editar)
- App **estática**, HTML/CSS/JS sin framework ni `package.json` de aplicación. `index.html` carga una cadena heredada V17–V25 y la capa V26.
- Entrada y marca: `index.html`, `infeora/index.html`, `assets/infeora-mark.svg`.
- Interfaz V26: `infeora-v26.js`, `infeora-v26.css`; portada, rail adaptable, búsqueda global y explorador microorganismo–fármaco.
- Corpus central: `data/atlas.json`, `data/editorial-knowledge.json`, `data/who-conditions.json` y JS de V23–V25.
- Taxonomía/medicamentos no bacterianos: `v24-viruses.js`, `v24-fungi.js`, `v24-parasites.js`, `v24-antivirals.js`, `v24-antifungals.js`, `v24-antiparasitics.js`.
- Razonamiento/fichas: `v23-clinical.js`, `v23-pharmacology.js`, `v23-reviews-ui.js`, `v24-ui.js`, `v24-learning.js`, `v25-micro-editorial.js`, `v25-syndromes.js`, `v25-syndromes-extra.js`, `v25-ui.js`.
- Estado global y rendering: `app.js` define `state`, `D`, `render`, `mainPage`, `act`; las capas posteriores interceptan algunas funciones. Leer el orden de scripts en `index.html` antes de refactorizar.
- `?legacy=1` omite el shell V26 y permite probar las rutas V23–V25 históricas; **no eliminarlo sin sustituir las pruebas**.
- La ruta `/infeora/` usa un `<base href="../">`; proteger las rutas relativas a scripts, datos, SVG y enlaces.

## Producto y UX
1. Nueve áreas: Inicio, Explorar (anterior «Mapa»), Microorganismos, Antimicrobianos, Síndromes, Comparador, Biblioteca, Laboratorio y Fuentes.
2. Los cuatro dominios tienen identidad propia: bacterias, virus, hongos y parásitos; conservar filtros, categorías, color taxonómico, fichas y navegación por especie.
3. Explorar es un **mapa lógico de relaciones** por dominio → grupo → microorganismo → espectro farmacológico, no una infografía decorativa o un diagrama confuso.
4. No redirigir al mapa al expandir resultados dentro de fichas; las interacciones deben operar en su sección y ofrecer navegación explícita solo cuando el usuario la elija.
5. Mecanismos de acción detallados, **específicos por grupo/subgrupo/fármaco cuando exista evidencia**: diana → acceso → interacción molecular → efecto celular → resistencias → implicación clínica. No frases genéricas.
6. Síndromes y lecciones = revisiones clínicas de posgrado, con profundidad, diagnóstico diferencial, confirmación, tratamiento, seguimiento, complicaciones y fuentes. No reemplazar con párrafos de 2 líneas ni «consulta el libro».
7. El comparador debe buscar múltiples fármacos, mantener la comparación intuitiva y mostrar información explícita, no resultados simulados.

## Identidad visual y fuentes gráficas
- Estilo editorial médico, contemporáneo, con tipografía legible y jerarquía reconocible. Azul medio/claro como estructura, naranja/cobre como acento, colores clínico-taxonómicos por dominio, mucho blanco sin exceso de espacio vacío. Evitar navy excesivamente oscuro, teal dominante, pasteles y «AI slop».
- Conservar lo que funciona en las fichas Microorganismos y Antimicrobianos, pero mejorar globalmente composición, legibilidad, identidad y responsive.
- **NO crear imágenes con IA, placeholders o SVG que simulen microfotografías**. Para imágenes científicas usar recursos reales con licencia/autorización verificable y procedencia; los iconos pueden venir de bibliotecas confiables como Health Icons (CC0) o SVG originales sencillos de interfaz. No incluir contenido protegido sin permiso.
- Comprobar explícitamente desbordamientos, colisiones, texto tapado, elementos truncados, menús, scrolls, contraste, estados vacíos y focus.

## Integridad de datos clínicos
- El atlas conservaba en V25 **79 bacterias + 129 virus/hongos/parásitos**, **54 síndromes** (37 entradas WHO + 17 reviews adicionales). Es el inventario histórico, NO un certificado de profundidad o actualidad de cada tema.
- Relación «actividad habitual» ≠ susceptibilidad individual ≠ eficacia clínica. «Sin evaluar» NO equivale a resistencia; no inventar espectro para completar una matriz.
- Evitar atribuir dosificaciones WHO a `data/who-conditions.json`: contiene un **índice** de condiciones, no todas las pautas verificadas.
- Diferenciar texto sustentado por libros aportados, síntesis editorial anterior y evidencias externas actuales. No inventar páginas, citas, eficacia, niveles de evidencia ni resistencia. Actualizar con CDC, IDSA, NIH, OMS y guías relevantes según organismo/síndrome, con fecha cuando sea necesaria.
- Contenido clínico para educación: no sustituye juicio clínico, AST, evaluación del huésped, función renal, embarazo, foco, guías ni validación editorial por especialista.
- **No afirmar que las 208 fichas son revisiones exhaustivas**. La profundidad individual del catálogo es heterogénea y debe auditarse antes de declarar completitud.
- **Contexto no transferido automáticamente:** Claude no tiene acceso al historial de este chat, las capturas ni los PDF privados originalmente compartidos con ChatGPT. Solicitar los archivos necesarios en Claude/Drive o rutas autorizadas; nunca presumir que un libro está en GitHub ni subir PDFs protegidos al repositorio público.

## Flujo técnico de trabajo
1. Leer este documento y `README.md`; inventariar arquitectura, dependencias, rutas y estado de `main`.
2. Antes de modificar, revisar archivos implicados, identificar la causa de raíz y planificar una solución sostenible; evitar acumular otra capa V27 de CSS sin necesidad.
3. Trabajar en una **rama por tarea**, basada en `main`; preferir PR con diff claro y explicación de cambios. No forzar push ni sobrescribir `main` sin revisión.
4. Preservar datos/IDs y todas las funciones existentes. Si se migran módulos, verificar paridad funcional y respaldar/retirar código antiguo con pruebas.
5. Ejecutar pruebas automatizadas y **revisión visual en navegador real** (desktop, tablet, mobile). No afirmar QA completo por inspección estática.
6. Corregir errores detectados, revisar resultados de CI y dejar el PR listo para revisión; nunca declarar algo desplegado si la publicación Pages no se verificó.
7. Al terminar, reportar cambios reales, pruebas y pendientes de manera precisa y concisa.

## QA actual
- Workflow: `.github/workflows/atlas-visual-qa.yml` (GitHub Actions).
- Suites: `qa/browser-qa.cjs`, `qa/v24-browser.cjs`, `qa/v25-browser.cjs`, `qa/infeora-v26-browser.cjs`.
- En entorno con Node.js: `npm install --no-save --no-package-lock playwright@1.56.1` y `npx playwright install chromium` si falta Chromium (el workflow puede usar Chrome preinstalado).
- Ejecutar: `node qa/browser-qa.cjs`; `node qa/v24-browser.cjs`; `node qa/v25-browser.cjs`; `node qa/infeora-v26-browser.cjs`. Los scripts crean su propio servidor HTTP y capturas en `qa/results*`.
- Resoluciones de la prueba V26: 1600, 1280, 1024, 768 y 390 píxeles. No considerar la suite exhaustiva: complementar con inspección visual manual y pruebas de interacción concretas.
- Última entrega V26 integrada previamente: PR #4, commit squash `d2a3259`. Su CI de origen registró 67 capturas V26, 0 fallos. Verificar resultados actuales antes de citarlo.

## Primera tarea recomendada
Realizar **auditoría UX + técnica + clínica** de INFEORA actual. Entregar matriz por pantalla con hallazgos específicos reproducibles y priorización (P0–P3). Implementar mejoras con pruebas; priorizar el explorador, el comparador y la profundidad clínica por organismo/síndrome, sin volver a construir el proyecto desde cero.
