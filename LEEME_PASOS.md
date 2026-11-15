# Lanzador JCI Bogotá (PWA) · pasos

## Qué es
Una página instalable como app, con un botón por proceso. Cada botón abre el tablero correspondiente; el inicio de sesión y los roles los sigue validando cada tablero con Google.

## 1. Pegar los enlaces (archivo `apps.json`)
Abre `apps.json` y pon en `"url"` el enlace `https://script.google.com/macros/s/.../exec` de cada tablero. Mientras `"url"` esté vacío, el botón sale como «Próximamente».

Para sumar un proceso nuevo, copia un bloque `{ ... }` dentro de `"apps"`, cambia `id`, `nombre`, `descripcion`, `url` y elige un `icono`: moneda, escudo, documento, personas, calendario, grafico.

## 2. Publicar (GitHub Pages, gratis)
1. Crea un repositorio público en GitHub, por ejemplo `jci-bogota-app`.
2. Sube todo el contenido de esta carpeta (no la carpeta, sus archivos).
3. Settings → Pages → Branch: `main` / carpeta `/ (root)` → Save.
4. En 1–2 minutos queda en `https://TU-USUARIO.github.io/jci-bogota-app/`.

## 3. Instalar en el celular (Android, Chrome)
Abre ese enlace → menú ⋮ → «Instalar app» (o «Añadir a pantalla de inicio»). Queda el ícono JCI Bogotá.

## 4. Cambios futuros
Solo edita `apps.json` en GitHub. A los miembros les aparece el cambio sin reinstalar.

## Notas
- La carcasa no guarda datos ni contraseñas; solo abre enlaces.
- Los tableros se abren con la cuenta de Google del celular: indicar @jcibogota.org.
- Si luego quieres un `.apk`, se genera desde este mismo enlace con PWABuilder.
