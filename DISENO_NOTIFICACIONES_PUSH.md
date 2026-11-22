# Diseño · Nivel 2: notificaciones al celular (push)

**Estado:** diseño para aprobar. No hay nada construido de este nivel.
**Nivel 1** (avisos generales en `avisos.json`) ya está construido en este repositorio.

## 1. Qué resuelve
Notificaciones **personales** que llegan al celular aunque la app esté cerrada, como complemento de los correos. Cada persona las activa por su cuenta y las puede desactivar.

## 2. Cómo funciona
```
 Celular (lanzador)                 Tablero (Apps Script, con la cuenta de la persona)        Google
 ─────────────────                  ─────────────────────────────────────────────────         ──────
 1. «Activar notificaciones»
    → permiso del celular
    → Firebase entrega un código
      del dispositivo
 2. Al abrir un tablero, el lanzador
    agrega ?push=<código> al enlace  ─►  3. doGet lee el código y el correo de quien entra
                                            y lo guarda en su libro privado «Dispositivos»
                                         4. Los procesos automáticos (los de hoy) deciden
                                            a quién avisar y llaman a Firebase              ─► 5. Firebase lo
                                                                                               entrega al celular
```

- **Firebase Cloud Messaging (FCM)**, gratis, hace la entrega. Se usa porque Apps Script no puede cifrar por sí solo el formato estándar de las notificaciones web.
- **Cada tablero guarda sus propios dispositivos** en un libro privado aparte («Dispositivos · Tesorería» y «Dispositivos · Contraloría»), igual que el libro de uso. No se comparten datos entre cuentas.
- **La identidad la da Google:** el tablero toma el correo de la sesión, nunca de un dato que mande el celular.

## 3. Qué notificaciones (propuesta inicial)
| Tablero | Notificación | Cuándo | A quién |
|---|---|---|---|
| Tesorería | Tu cuota con descuento vence el día 10 | Día 8 | Miembros con saldo |
| Tesorería | Aviso antes de perder voz y voto | Día 14 (junto con el correo actual) | Miembros con 4 meses de mora |
| Tesorería | Se registró tu pago | Al registrar el pago | El miembro |
| Contraloría | Obligación que vence hoy / hallazgo asignado | Proceso diario | **Solo afonseca@ mientras exista el bloqueo** |
| Contraloría | Resumen diario listo | 11:30 p. m. | **Solo afonseca@** |
| Ambos | Aviso general importante | Al publicarlo | Todos los que activaron |

**Reglas:**
- **El bloqueo de Contraloría aplica igual:** mientras exista `DESTINO_UNICO`, sus notificaciones van solo a los dispositivos de afonseca@.
- **Horario:** no se envía entre las 9 p. m. y las 7 a. m. Lo que se genera de noche sale a las 7 a. m. (excepto el resumen diario de Contraloría, que va solo a afonseca@).
- **Límite:** máximo 2 notificaciones por persona al día por tablero.
- **El texto no incluye montos ni datos sensibles en la pantalla bloqueada:** «Tienes un aviso de Tesorería», y el detalle al abrir.
- **Siempre hay correo:** la notificación nunca reemplaza un correo que hoy es obligatorio.
- **Códigos vencidos:** si Firebase responde que el código ya no existe, se desactiva solo.

## 4. Lo que se construye
| Dónde | Qué |
|---|---|
| Lanzador | Botón «Activar notificaciones», registro con Firebase, agregar `?push=` a los enlaces, manejo de la notificación en `sw.js` |
| Tesorería y Contraloría | Registro del dispositivo en `doGet`, libro «Dispositivos», función `notificar_(correo, titulo, texto, enlace)` con horario, límite y bloqueo, y conexión a Firebase con cuenta de servicio |
| Procesos | Llamar a `notificar_` en los avisos de la tabla anterior |

## 5. Lo que hay que preparar (lo hace el dueño de las cuentas)
1. Crear un proyecto en Firebase (console.firebase.google.com) con una cuenta de JCI y activar Cloud Messaging.
2. Registrar una «app web» y copiar su configuración (es pública; va en el lanzador).
3. Generar la clave VAPID (Cloud Messaging → Certificados push web).
4. Crear una **cuenta de servicio** con permiso para enviar mensajes y descargar su llave JSON. **La llave no se pega en el chat ni en GitHub:** se guarda en las propiedades del script de cada tablero desde el editor, con una función que se dará en la guía.
5. Actualizar la política de tratamiento de datos: se guarda un código del dispositivo asociado al correo, solo para enviar avisos.

## 6. Limitaciones
- **iPhone:** solo con la app instalada en la pantalla de inicio e iOS 16.4 o posterior. En Android funciona en Chrome sin restricciones.
- **Bloqueo de entrega:** si la persona bloquea las notificaciones o borra los datos del navegador, deja de recibirlas hasta que las active de nuevo.
- **La entrega no es instantánea garantizada:** el celular puede retrasarla en ahorro de batería.

## 7. Fases y pruebas
1. **Fase A · solo afonseca@:** lanzador + Tesorería + Contraloría, notificaciones de prueba únicamente a tus dispositivos (Android y iPhone).
2. **Fase B · Tesorería a la Junta:** aviso general y resumen.
3. **Fase C · Tesorería a los miembros:** recordatorio del día 8 y aviso de voz y voto.
4. **Contraloría a terceros:** solo después del paso a producción con contraloria@.

Cada fase se entrega con guía, permisos nuevos (Tesorería y Contraloría ya tienen «conexión a servicios externos») y qué se probó y qué no.
