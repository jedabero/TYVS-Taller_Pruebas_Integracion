# Mapeo tecnológico

El taller original está escrito para Java, Maven, JUnit, Mockito, H2 y Spring Boot Test. Esta entrega continúa la adaptación académica iniciada en el taller de pruebas unitarias con TypeScript, pnpm, Vitest y Vitest Coverage V8.

| Taller original | Adaptación TypeScript |
| --- | --- |
| Java | TypeScript |
| Maven | pnpm |
| JUnit | Vitest |
| JaCoCo | Vitest Coverage V8 |
| Mockito | Mocks de Vitest: `vi.fn()`, `vi.mock()`, `vi.spyOn()` |
| H2 | SQLite en memoria mediante `sql.js` |
| Spring Boot | NestJS |
| Spring Boot Test | `@nestjs/testing` |
| MockMvc / TestRestTemplate | `supertest` |
| `mvn test` | `pnpm test` |
| `mvn verify` | `pnpm verify` |
| `target/site/jacoco/index.html` | `coverage/index.html` |

## Decisiones

- Se conserva TypeScript para mantener continuidad con el taller de pruebas unitarias.
- Se usa NestJS porque reproduce el rol de Spring Boot como framework HTTP modular e inyectable.
- Se usa `sql.js` porque provee SQLite en memoria sin servidor externo ni build nativo. Inicialmente se evaluó `better-sqlite3`, pero pnpm bloqueó su build nativo en este entorno no interactivo; `sql.js` mantiene la equivalencia académica con H2 sin requerir aprobación manual de scripts.
- No se agregan inicialmente `class-validator` ni `class-transformer`; la validación inicial del DTO es manual para mantener la preparación mínima.
