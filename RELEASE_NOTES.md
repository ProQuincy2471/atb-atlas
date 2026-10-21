# ATB Atlas V9 — Cartografía intuitiva

**Cambios publicados:** renovación de la experiencia de lectura y estudio. Se conservan los datos clínicos y el historial de versiones previas.

### Nuevas funciones
- Mapa Micro × ATB reorganizado con selector escalonado, filtros combinables, pagina de 16 filas, leyenda interpretativa y un inspector contextual.
- Orientaciones por grupo, especie e inversa, con foco individual de ATB o patógeno.
- Catálogos de fármacos y de microorganismos, sin listas interminables.
- Fichas clínicas de más fácil lectura y navegación cruzada.
- Biblioteca de 22 síndromes, comparador, 22 módulos de aprendizaje (12 existentes + 7 resistencia + 3 de integración), 12 perfiles de grupos y 15 referencias.
- Paletas Prisma, Aurora, Tinta y Alto contraste, editables localmente.
- Vistas guardadas y URL de filtros compartibles.

### Seguridad editorial
- Se mantienen las 130 relaciones piloto originales; no se completaron cruces sin validación.
- `No evaluado` se muestra explícitamente como **ausencia de datos**, nunca como resistencia.
- Información académica; no generador de prescripción.

### Verificación
- `node --check` del código JavaScript.
- Pruebas funcionales simuladas con Playwright en 1440 y 390 píxeles, incluidas rutas, búsqueda, filtros, inspector, comparación, paleta, y comprobación de errores de JavaScript; sin desbordamiento general en móvil.