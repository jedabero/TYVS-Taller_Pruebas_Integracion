# Conclusiones técnicas

La adaptación conserva la intención académica del taller original sin volver a Java/Maven.

## Decisión principal

Se mantiene TypeScript porque el taller anterior ya adaptó explícitamente el dominio y las pruebas unitarias a TypeScript, pnpm, Vitest y Vitest Coverage V8.

## Beneficio

La misma regla de negocio puede verificarse en varios niveles: dominio puro, caso de uso con mock, caso de uso con SQLite y endpoint HTTP.

## Riesgo pendiente

La fase HTTP todavía requiere decidir la semántica final de códigos para resultados de negocio distintos de `VALID`.
