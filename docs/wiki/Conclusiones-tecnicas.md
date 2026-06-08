# Conclusiones técnicas

La adaptación conserva la intención académica del taller original sin volver a Java/Maven.

## Decisión principal

Se mantiene TypeScript porque el taller anterior ya adaptó explícitamente el dominio y las pruebas unitarias a TypeScript, pnpm, Vitest y Vitest Coverage V8.

## Beneficio

La misma regla de negocio puede verificarse en varios niveles: dominio puro, caso de uso con mock, caso de uso con SQLite y endpoint HTTP.

## Decisiones cerradas

- `VALID` se mapea a HTTP `200`.
- `INVALID` y payloads inválidos se mapean a HTTP `400`.
- `DUPLICATED` se mapea a HTTP `409`.
- `UNDERAGE`, `DEAD` e `INVALID_AGE` se mapean a HTTP `422`.
- SQLite en memoria se implementa con `sql.js` para evitar builds nativos bloqueados por pnpm en modo no interactivo.
