# Matriz de pruebas

La matriz consolida pruebas unitarias heredadas y pruebas semilla para integración, mocks y sistema HTTP. Las fases posteriores deben ampliar los casos marcados como planeados.

| ID | Nivel | Archivo | Caso | Resultado esperado | Estado |
| --- | --- | --- | --- | --- | --- |
| RV-001 | Unidad dominio | `tests/domain/registry.test.ts` | Persona adulta viva con ID único | `VALID` | Implementado |
| RV-002 | Unidad dominio | `tests/domain/registry.test.ts` | Persona fallecida | `DEAD` | Implementado |
| RV-003 | Unidad dominio | `tests/domain/registry.test.ts` | Persona menor de edad | `UNDERAGE` | Implementado |
| RV-004 | Unidad dominio | `tests/domain/registry.test.ts` | Edad `0` | `UNDERAGE` | Implementado |
| RV-005 | Unidad dominio | `tests/domain/registry.test.ts` | Edad `-1` | `INVALID_AGE` | Implementado |
| RV-006 | Unidad dominio | `tests/domain/registry.test.ts` | Edad `121` | `INVALID_AGE` | Implementado |
| RV-007 | Unidad dominio | `tests/domain/registry.test.ts` | Edad `120` | `VALID` | Implementado |
| RV-008 | Unidad dominio | `tests/domain/registry.test.ts` | ID `0` | `INVALID` | Implementado |
| RV-009 | Unidad dominio | `tests/domain/registry.test.ts` | ID negativo | `INVALID` | Implementado |
| RV-010 | Unidad dominio | `tests/domain/registry.test.ts` | Segundo registro con mismo ID | `DUPLICATED` | Implementado |
| APP-001 | Aplicación | `tests/application/registry-use-case.test.ts` | Caso de uso registra persona válida | `VALID` y persistencia en puerto | Implementado semilla |
| APP-002 | Aplicación | `tests/application/registry-use-case.test.ts` | Caso de uso detecta duplicado | `DUPLICATED` | Implementado semilla |
| MOCK-001 | Mock | `tests/application/registry-with-mock.test.ts` | Repositorio simula ID existente | `DUPLICATED`, no llama `save()` | Implementado semilla |
| MOCK-002 | Mock | `tests/application/registry-with-mock.test.ts` | Menor de edad con mock | `UNDERAGE`, no consulta ni guarda | Implementado semilla |
| INF-001 | Infraestructura | `tests/infrastructure/sqlite-registry-repository.it.ts` | Guardar y consultar en SQLite | Registro persistido | Implementado semilla |
| INT-001 | Integración real | `tests/integration/registry-integration.it.ts` | Caso de uso + SQLite | `VALID` y registro persistido | Implementado semilla |
| INT-002 | Integración real | `tests/integration/registry-integration.it.ts` | Caso de uso + SQLite con duplicado | `DUPLICATED` | Implementado semilla |
| SYS-001 | Sistema HTTP | `tests/system/registry-http.e2e-spec.ts` | `POST /register` válido | HTTP `201`, `VALID` | Implementado semilla |
| SYS-002 | Sistema HTTP | `tests/system/registry-http.e2e-spec.ts` | Payload con género inválido | HTTP `400` | Implementado semilla |
| INT-003 | Integración real | Pendiente | `UNDERAGE`, `DEAD`, `INVALID`, `INVALID_AGE` con SQLite | No persistir rechazados | Planeado |
| SYS-003 | Sistema HTTP | Pendiente | Duplicado, menor, fallecido | Mapeo HTTP definido | Planeado |

## Convenciones

- `*.test.ts` para pruebas unitarias.
- `*.it.ts` para pruebas de integración.
- `*.e2e-spec.ts` para pruebas de sistema HTTP.
- Formato AAA en todos los tests.
- `describe`/`it` legibles y trazables.
- Escenarios Given-When-Then cuando aporten claridad.
