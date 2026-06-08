# Registro de defectos

Este documento registra defectos y riesgos detectados durante el taller de pruebas de integración y sistema en TypeScript.

| ID | Título | Capa | Tipo de prueba | Estado | Prioridad | Evidencia o prueba relacionada | Resolución |
| --- | --- | --- | --- | --- | --- | --- | --- |
| DEF-001 | Edad negativa aceptada en versiones iniciales | Dominio | Unitaria | Cerrado | Alta | `tests/domain/registry.test.ts` | Regla `age < 0` retorna `INVALID_AGE`. |
| DEF-002 | Persona fallecida aceptada en versiones iniciales | Dominio | Unitaria | Cerrado | Alta | `tests/domain/registry.test.ts` | Regla `alive === false` retorna `DEAD`. |
| DEF-003 | Duplicados dependían de estado en memoria | Aplicación/Infraestructura | Integración | Cerrado | Alta | `tests/integration/registry-integration.it.ts` | `RegistryUseCase` consulta el puerto y SQLite persiste el ID. |
| DEF-004 | Mock mal configurado puede ocultar errores de puerto | Aplicación | Mock | Cerrado | Media | `tests/application/registry-with-mock.test.ts` | Se verifican llamadas, ausencia de llamadas y excepción con `vi.spyOn()`. |
| DEF-005 | Mapeo HTTP de errores de negocio no estaba cerrado | Delivery | Sistema HTTP | Cerrado | Alta | `tests/system/registry-http.e2e-spec.ts` | Se definieron `200`, `400`, `409`, `422` y `500`. |
| DEF-006 | SQLite nativo requería build no interactivo | Infraestructura | Integración | Cerrado | Media | `docs/planning-report.md` | Se usa `sql.js` como SQLite en memoria sin build nativo. |

## Convenciones de estado

| Estado | Significado |
| --- | --- |
| Abierto | Defecto o riesgo pendiente de resolver. |
| En seguimiento | Existe base técnica, pero faltan escenarios finales. |
| Cerrado | Validado por pruebas y aceptado en la entrega final. |

## Observación

Los defectos de dominio se mantienen trazables desde el taller de pruebas unitarias. Los riesgos nuevos de integración, mocks y sistema HTTP quedaron cubiertos por la suite final.
