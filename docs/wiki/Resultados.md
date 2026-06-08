# Resultados

La entrega incluye pruebas ejecutables para dominio, aplicación, infraestructura, integración real y sistema HTTP.

## Evidencias esperadas

- `pnpm typecheck`
- `pnpm test`
- `pnpm coverage`
- `pnpm verify`

Los resultados finales de cada ejecución se guardan en `docs/evidence/`.

## Resumen esperado

- `pnpm typecheck`: sin errores.
- `pnpm test`: 7 archivos, 42 pruebas en verde.
- `pnpm coverage`: statements 97.11%, branches 90.62%, functions 100%, lines 97.11%.
- `pnpm verify`: comando único de verificación en verde.

## Restricción de integración

El workflow `CI` ejecuta el job `verify` en cada `push` y `pull_request`. Para bloquear integraciones cuando fallen las pruebas, la compilación TypeScript o la cobertura, se debe configurar en GitHub una regla de protección para `main` y marcar `CI / verify` como required status check.
