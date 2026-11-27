# Seguridad · JCI Bogotá

## Reportar un problema de seguridad
Si encuentras una falla que exponga datos de miembros, cifras o credenciales, **no abras un issue público**. Escribe a tesoreria@jcibogota.org o al Contralor, con:
- qué viste;
- cómo reproducirlo;
- desde qué cuenta.

## Qué hacer ante un incidente
1. **Credencial de publicación expuesta** (`.clasprc.json`): en la cuenta dueña, revocar el acceso de clasp en myaccount.google.com → Seguridad → Apps con acceso. Luego `clasp login` y reemplazar el secreto `CLASPRC_JSON` en GitHub.
2. **Llave de Firebase expuesta**: Google Cloud → `jci-bogota-notificaciones` → Cuentas de servicio → borrar la llave. Crear una nueva y cargarla con `configurarFirebaseDesdeDrive`.
3. **Acceso indebido a datos**: quitar la cuenta de la hoja Correos y revisar el historial de acciones y el uso del tablero. Avisar a la Junta. Si hay datos personales de por medio, evaluar el aviso a los titulares (Ley 1581 de 2012).
4. **Cambio no autorizado en el código**: revertir con un Pull Request. La publicación solo acepta cambios que llegaron por PR fusionado.

## Reglas para quien programe
- Toda función que no deba llamarse desde el navegador termina en `_`. Las de mantenimiento que se ejecutan desde el editor empiezan con la guardia de la cuenta dueña. Los disparadores empiezan con la guardia de disparador.
- Todo texto que llega del formulario se escribe en el libro con `celdaSegura_` o `textoSeguro_`, y se muestra en el tablero con `esc()`.
- Nunca subas al repositorio `.clasprc.json`, llaves de cuentas de servicio ni contraseñas.
- La auditoría vigente está en `AUDITORIA_SGSI_2026-11.md` del repositorio de Contraloría.
