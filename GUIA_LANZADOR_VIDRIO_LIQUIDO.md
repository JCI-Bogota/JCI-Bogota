# Lanzador · Sistema visual compartido y vidrio líquido (26-nov-2026)

El lanzador adopta el mismo lenguaje visual que los tableros de Tesorería y Contraloría (cambios 44 a 47 de Contraloría).

## Qué cambia
- **Mismo bloque «SISTEMA VISUAL COMPARTIDO»** y **mismo script de vidrio líquido** que los dos tableros, letra por letra. Encima va una capa corta, propia del lanzador, con su ancho y sus tarjetas.
- **Encabezado como el de los tableros:** fondo negro JCI, ondas de la marca, título «Procesos JCI Bogotá», franja azul y **logo blanco** (`logo-blanco.webp`, la versión del manual para fondo oscuro).
- **Tarjetas de los procesos en vidrio grueso**, como los widgets de iOS: brillo en el canto, reflejo que sigue al puntero, lupa en el borde (en Chrome y Edge de computador) y rebote al tocarlas.
- **Íconos como botones de vidrio**, como el centro de control: azul cuando el proceso está disponible y transparente cuando está bloqueado o «próximamente».
- **Avisos y panel de notificaciones** en paneles de vidrio con barra de color: azul para la información y amarillo para lo importante. Los títulos ya no van en mayúsculas espaciadas (el manual pide tracking 0), y se retiró el amarillo oscuro que no está en el manual.
- **La clave del botón restringido** se pide en una ventana de vidrio, en lugar de la ventana gris del navegador. Si la clave es incorrecta, lo dice en la misma ventana; Esc cancela y Enter confirma.
- `sw.js` pasa a la versión v8 y guarda el logo blanco, para que la app instalada se actualice.

## Pasos
1. Fusiona el PR. GitHub Pages publica solo en 1 o 2 minutos.
2. En el celular, abre la app y ciérrala una vez para que tome la versión nueva.

No hay cambios en las funciones: avisos, bandeja, notificaciones y clave funcionan igual.

## Pruebas hechas
- ✅ En Chromium a 390 y 1280 px, servido como página real:
  - lista de procesos (disponible y bloqueado), avisos importante y de información, y panel de notificaciones;
  - la ventana de la clave muestra «Clave incorrecta» con una clave equivocada.

  Sin errores de JavaScript.
- ✅ El bloque visual y el script son idénticos a los de los tableros.
- ❌ No probado en un iPhone ni con la app instalada.

## Corrección (26-nov-2026): el panel de notificaciones no se ocultaba
- **Qué pasaba:** con las notificaciones ya activas, el panel «Notificaciones · Activar» seguía visible y el botón no hacía nada.
- **Causa:** al cambiar los estilos se perdió la regla que oculta el panel cuando tiene el atributo `hidden`, y el nuevo `display:flex` del panel le ganaba. El código sí detectaba que las notificaciones estaban activas.
- **Solución:** la regla general `[hidden]{display:none!important}` y `sw.js` en v9.
- **Probado:** con `hidden` el panel queda oculto, y sin él se ve.
