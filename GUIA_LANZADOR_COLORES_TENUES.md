# Lanzador v11 · Colores de marca tenues sobre el vidrio (26-nov-2026)

Va con el cambio 48 de Contraloría y el cambio «Colores tenues» de Tesorería.

## Qué cambia
- **Íconos de los procesos:** tinte azul translúcido con brillo y trazo navy, en vez de azul sólido.
- **Botón de notificaciones y «Abrir»:** tinte azul con texto navy.
- **Etiqueta «Nuevo»:** tinte azul; en los avisos importantes, tinte amarillo con texto negro.
- **Barras de los avisos** (aviso, nota y error): 4 px, redondeadas y desvanecidas.
- Versión **v11** en `sw.js` y en el pie de la página, para que el celular tome la página nueva.
- **v12:** el contador amarillo lleva una base blanca para que no se vea verde sobre fondos azules.

## Pasos
1. Fusiona el PR. GitHub Pages publica en 1–2 minutos.
2. Abre el lanzador en el celular y ciérralo y ábrelo una vez. El pie debe decir **«v11»**. Si sigue en v10, espera unos minutos y repite.

## Pruebas
- ✅ Capturas en Chromium (celular y computadora), incluida la ventana de la clave de Contraloría, sin errores en la consola.
- ❌ No probado en el iPhone ni en el Android reales.
- **v13:** vidrio líquido completo en el celular (cambio 49 de Contraloría). Refracción en Chrome de Android y reflejo que se mueve con la inclinación, el desplazamiento y el dedo, también sobre las tarjetas de los procesos.
