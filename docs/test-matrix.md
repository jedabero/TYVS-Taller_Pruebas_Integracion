# Matriz de pruebas

La matriz consolida pruebas unitarias, integración real, integración con mocks, infraestructura SQLite y sistema HTTP.

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
| RV-011 | Unidad dominio | `tests/domain/registry.test.ts` | Persona `null` | `INVALID` | Implementado |
| RV-012 | Unidad dominio | `tests/domain/registry.test.ts` | Persona `undefined` | `INVALID` | Implementado |
| APP-001 | Aplicación | `tests/application/registry-use-case.test.ts` | Caso de uso registra persona válida | `VALID` y persistencia en puerto | Implementado |
| APP-002 | Aplicación | `tests/application/registry-use-case.test.ts` | Caso de uso detecta duplicado | `DUPLICATED` | Implementado |
| MOCK-001 | Mock | `tests/application/registry-with-mock.test.ts` | Repositorio simula ID existente | `DUPLICATED`, no llama `save()` | Implementado |
| MOCK-002 | Mock | `tests/application/registry-with-mock.test.ts` | Menor de edad con mock | `UNDERAGE`, no consulta ni guarda | Implementado |
| MOCK-003 | Mock | `tests/application/registry-with-mock.test.ts` | Persona válida con mock | Llama `existsById()` y `save()` | Implementado |
| MOCK-004 | Mock | `tests/application/registry-with-mock.test.ts` | ID inválido con mock | No consulta ni guarda | Implementado |
| MOCK-005 | Mock | `tests/application/registry-with-mock.test.ts` | Excepción del repositorio con `vi.spyOn()` | Excepción propagada y verificada | Implementado |
| INF-001 | Infraestructura | `tests/infrastructure/sqlite-registry-repository.it.ts` | Guardar y consultar en SQLite | Registro persistido | Implementado |
| INF-002 | Infraestructura | `tests/infrastructure/sqlite-registry-repository.it.ts` | Consultar ID inexistente | `undefined` | Implementado |
| INF-003 | Infraestructura | `tests/infrastructure/sqlite-registry-repository.it.ts` | Limpiar datos | Registro eliminado | Implementado |
| INF-004 | Infraestructura | `tests/infrastructure/sqlite-registry-repository.it.ts` | Duplicado por llave primaria | Excepción SQLite | Implementado |
| INT-001 | Integración real | `tests/integration/registry-integration.it.ts` | Caso de uso + SQLite válido | `VALID` y registro persistido | Implementado |
| INT-002 | Integración real | `tests/integration/registry-integration.it.ts` | Caso de uso + SQLite duplicado | `DUPLICATED` | Implementado |
| INT-003 | Integración real | `tests/integration/registry-integration.it.ts` | Menor de edad con SQLite | `UNDERAGE` y no persiste | Implementado |
| INT-004 | Integración real | `tests/integration/registry-integration.it.ts` | Persona fallecida con SQLite | `DEAD` y no persiste | Implementado |
| INT-005 | Integración real | `tests/integration/registry-integration.it.ts` | ID inválido con SQLite | `INVALID` y no persiste | Implementado |
| INT-006 | Integración real | `tests/integration/registry-integration.it.ts` | Edad inválida con SQLite | `INVALID_AGE` y no persiste | Implementado |
| SYS-001 | Sistema HTTP | `tests/system/registry-http.e2e-spec.ts` | `POST /register` válido | HTTP `200`, `VALID` | Implementado |
| SYS-002 | Sistema HTTP | `tests/system/registry-http.e2e-spec.ts` | Payload con género inválido | HTTP `400` | Implementado |
| SYS-003 | Sistema HTTP | `tests/system/registry-http.e2e-spec.ts` | Registro duplicado | HTTP `409`, `DUPLICATED` | Implementado |
| SYS-004 | Sistema HTTP | `tests/system/registry-http.e2e-spec.ts` | Menor de edad | HTTP `422`, `UNDERAGE` | Implementado |
| SYS-005 | Sistema HTTP | `tests/system/registry-http.e2e-spec.ts` | Persona fallecida | HTTP `422`, `DEAD` | Implementado |
| SYS-006 | Sistema HTTP | `tests/system/registry-http.e2e-spec.ts` | Edad inválida | HTTP `422`, `INVALID_AGE` | Implementado |
| SYS-007 | Sistema HTTP | `tests/system/registry-http.e2e-spec.ts` | ID inválido | HTTP `400`, `INVALID` | Implementado |
| SYS-008 | Sistema HTTP | `tests/system/registry-http.e2e-spec.ts` | Falla de persistencia | HTTP `500` | Implementado |

## Convenciones

- `*.test.ts` para pruebas unitarias.
- `*.it.ts` para pruebas de integración.
- `*.e2e-spec.ts` para pruebas de sistema HTTP.
- Formato AAA en todos los tests.
- `describe`/`it` legibles y trazables.
- Escenarios Given-When-Then cuando aporten claridad.
