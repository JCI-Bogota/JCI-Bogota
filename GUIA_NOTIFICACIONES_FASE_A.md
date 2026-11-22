# Notificaciones al celular · Fase A (solo afonseca@)

Todo el código está construido en el lanzador y en los dos tableros. Queda **apagado** hasta completar estos pasos. En la fase A, **todas** las notificaciones llegan solo a los dispositivos de afonseca@, de los dos tableros.

## 1. Firebase (una vez)
1. En **console.firebase.google.com**, entra al proyecto que creaste.
2. **Configuración del proyecto → General → Tus apps → Agregar app → Web** (ícono `</>`). Nombre: «Lanzador JCI Bogotá». No marques Hosting.
3. Copia el bloque `firebaseConfig` que muestra: `apiKey`, `authDomain`, `projectId`, `messagingSenderId`, `appId`. **Esta configuración es pública** (va en el lanzador); me la puedes pasar o pegarla tú en `notificaciones.json`.
4. **Configuración del proyecto → Cloud Messaging → Certificados push web → Generar par de claves.** Copia la clave pública: es el `vapidKey`. También es pública.
5. **Configuración del proyecto → Cuentas de servicio → Generar nueva clave privada.** Se descarga un archivo `.json`. **Esta sí es secreta: no la pegues en el chat ni en GitHub.**

## 2. Lanzador (`notificaciones.json` en GitHub)
Llena los cinco datos de `firebase`, el `vapidKey` y cambia `"activas": false` por `true`. Al guardar, en 1–2 minutos aparece el bloque **Notificaciones** en la app.

## 3. Cada tablero (Tesorería y Contraloría)
En el editor de Apps Script: **Configuración del proyecto (⚙) → Propiedades del script → Agregar propiedad**:

| Propiedad | Valor |
|---|---|
| `FCM_PROYECTO` | El `projectId` de Firebase |
| `FCM_CUENTA_SERVICIO` | Todo el contenido del archivo `.json` de la cuenta de servicio (ábrelo con un editor de texto, copia todo y pégalo) |

Se hace en los dos proyectos. Después borra el archivo `.json` de tu computador o guárdalo en un lugar seguro.

## 4. Probar
1. En tu celular abre la app (en iPhone, instalada en la pantalla de inicio) → **Notificaciones → Activar** → acepta el permiso.
2. Desde la app, abre **Tesorería** y **Contraloría** una vez cada uno (así cada tablero guarda tu celular).
3. En cada editor ejecuta **`estadoNotificaciones`**: debe decir la configuración «ok» y **1 dispositivo activo** (o más).
4. Ejecuta **`probarNotificacion`**: llega «Prueba de notificación» al celular. Al tocarla, abre el tablero.

## Qué notificaciones quedan conectadas
| Tablero | Cuándo | Texto (sin montos) |
|---|---|---|
| Tesorería | Aviso antes de perder voz y voto (día 14) | «Tienes un aviso sobre tu membresía…» |
| Contraloría | Resumen diario (11:30 p. m.) | «Resumen diario: todo en orden» o «N punto(s) por revisar» |
| Contraloría | Alerta temprana Art. 49 (lunes, si hay riesgo) | «Alerta temprana Art. 49: N miembro(s) en riesgo» |

En la fase A todas llegan solo a afonseca@ (las de Tesorería dicen en el registro para quién iban). Reglas: nada entre 9 p. m. y 7 a. m. (quedan en cola), máximo 2 por persona al día por tablero (el resumen diario de Contraloría no cuenta), y los códigos vencidos se desactivan solos.

## Para pasar a la fase B o C
Cambiar en `Notificaciones.gs` de Tesorería `NOTIF_SOLO_A` (vacío = cada quien recibe las suyas). En Contraloría sigue mandando el bloqueo `DESTINO_UNICO` hasta el paso a producción.
