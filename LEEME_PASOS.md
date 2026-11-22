# Lanzador JCI Bogotá (PWA) · pasos

## Qué es
Una página instalable como app, con un botón por proceso. Cada botón abre el tablero correspondiente; el inicio de sesión y los roles los sigue validando cada tablero con Google.

## 1. Pegar los enlaces (archivo `apps.json`)
Abre `apps.json` y pon en `"url"` el enlace `https://script.google.com/macros/s/.../exec` de cada tablero. Mientras `"url"` esté vacío, el botón sale como «Próximamente».

Para sumar un proceso nuevo, copia un bloque `{ ... }` dentro de `"apps"`, cambia `id`, `nombre`, `descripcion`, `url` y elige un `icono`: moneda, escudo, documento, personas, calendario, grafico.

## 2. Publicar (GitHub Pages, gratis)

> **Repositorio oficial:** `JCI-Bogota/JCI-Bogota` (cuenta de la organización). Dirección: `https://jci-bogota.github.io/JCI-Bogota/`. El repositorio personal `AndresfonsecaC/jci-bogota-app` queda solo para avisar del cambio de dirección.
1. Crea un repositorio público en GitHub, por ejemplo `jci-bogota-app`.
2. Sube todo el contenido de esta carpeta (no la carpeta, sus archivos).
3. Settings → Pages → Branch: `main` / carpeta `/ (root)` → Save.
4. En 1–2 minutos queda en `https://TU-USUARIO.github.io/jci-bogota-app/`.

## 3. Instalar en el celular (Android, Chrome)
Abre ese enlace → menú ⋮ → «Instalar app» (o «Añadir a pantalla de inicio»). Queda el ícono JCI Bogotá.

## 4. Cambios futuros
Solo edita `apps.json` en GitHub. A los miembros les aparece el cambio sin reinstalar.

## 5. Avisos generales (archivo `avisos.json`)
Los avisos salen arriba de los botones, iguales para todos. Para publicar uno, edita `avisos.json` en GitHub y agrega un bloque:

```json
{
  "id": "2026-12-asamblea",
  "titulo": "Asamblea ordinaria",
  "texto": "Texto corto del aviso.",
  "tipo": "importante",
  "desde": "2026-11-25",
  "hasta": "2026-12-03",
  "enlace": { "texto": "Ver la convocatoria", "url": "https://..." }
}
```

- `id`: único y sin repetir (sirve para saber si la persona ya lo leyó). Sugerido: año-mes-tema.
- `tipo`: `importante` (amarillo, va primero) o `info` (azul).
- `desde` / `hasta`: fechas `AAAA-MM-DD`. Antes de `desde` no se ve; después de `hasta` desaparece solo. Ambas son opcionales.
- `enlace`: opcional; solo se aceptan enlaces `https://`.
- Cada aviso nuevo sale con la etiqueta «Nuevo» y el ícono de la app muestra cuántos hay sin leer (Android y iPhone con la app instalada). «Marcar como leídos» lo recuerda en ese celular.
- Si el archivo tiene un error de formato, simplemente no salen avisos: el resto del lanzador funciona igual. Revisa las comas entre bloques.

## Notas
- La carcasa no guarda datos ni contraseñas; solo abre enlaces.
- Los tableros se abren con la cuenta de Google del celular: indicar @jcibogota.org.
- Si luego quieres un `.apk`, se genera desde este mismo enlace con PWABuilder.
