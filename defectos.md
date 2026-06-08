# Registro de defectos

Este documento registra defectos y riesgos detectados durante la preparación del taller de pruebas de integración y sistema en TypeScript.

| ID | Título | Capa | Tipo de prueba | Estado | Prioridad | Evidencia o prueba relacionada | Acción esperada |
| --- | --- | --- | --- | --- | --- | --- | --- |
| DEF-001 | Edad negativa aceptada en versiones iniciales | Dominio | Unitaria | Resuelto heredado | Alta | `tests/domain/registry.test.ts` | Regla `age < 0` retorna `INVALID_AGE`. |
| DEF-002 | Persona fallecida aceptada en versiones iniciales | Dominio | Unitaria | Resuelto heredado | Alta | `tests/domain/registry.test.ts` | Regla `alive === false` retorna `DEAD`. |
| DEF-003 | Duplicados dependían de estado en memoria | Aplicación/Infraestructura | Integración | En seguimiento | Alta | `tests/integration/registry-integration.it.ts` | Completar escenarios con SQLite real. |
| DEF-004 | Mock mal configurado puede ocultar errores de puerto | Aplicación | Mock | En seguimiento | Media | `tests/application/registry-with-mock.test.ts` | Ampliar pruebas con `vi.fn()` y excepción controlada. |
| DEF-005 | Mapeo HTTP de errores de negocio no está cerrado | Delivery | Sistema HTTP | Abierto | Alta | `tests/system/registry-http.e2e-spec.ts` | Definir códigos para `DUPLICATED`, `UNDERAGE`, `DEAD`, `INVALID_AGE`. |

## Convenciones de estado

| Estado | Significado |
| --- | --- |
| Abierto | Defecto o riesgo pendiente de resolver. |
| En seguimiento | Existe base técnica, pero faltan escenarios finales. |
| Resuelto heredado | Fue resuelto en el taller de unitarias y se conserva en esta base. |
| Cerrado | Validado y aceptado en entrega final. |

## Observación

Los defectos de dominio se mantienen trazables desde el taller de pruebas unitarias. Los riesgos nuevos pertenecen a integración real, mocks y sistema HTTP.
