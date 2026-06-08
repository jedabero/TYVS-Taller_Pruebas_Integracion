# Taller de Pruebas de Integración y Sistema

Este repositorio es la continuación del taller de pruebas unitarias. Aunque el taller original estaba planteado para Java, Maven, JUnit, Mockito, H2 y Spring Boot Test, esta entrega mantiene la adaptación académica ya realizada a TypeScript, pnpm, Vitest y Vitest Coverage V8.

## Stack adaptado

| Taller original | Adaptación TypeScript |
| --- | --- |
| Java | TypeScript |
| Maven | pnpm |
| JUnit | Vitest |
| JaCoCo | Vitest Coverage V8 |
| Mockito | `vi.fn()`, `vi.mock()`, `vi.spyOn()` |
| H2 | SQLite en memoria con `sql.js` |
| Spring Boot | NestJS |
| Spring Boot Test | `@nestjs/testing` |
| MockMvc / TestRestTemplate | `supertest` |
| `mvn test` | `pnpm test` |
| `mvn verify` | `pnpm verify` |
| `target/site/jacoco/index.html` | `coverage/index.html` |

## Instalación

```bash
pnpm install
```

## Comandos

```bash
pnpm typecheck
pnpm test
pnpm test:unit
pnpm test:integration
pnpm test:system
pnpm coverage
pnpm verify
```

## Estructura principal

- `src/domain`: reglas de negocio puras heredadas del taller de unitarias.
- `src/application`: caso de uso y puerto de repositorio.
- `src/infrastructure`: persistencia SQLite en memoria.
- `src/delivery`: capa HTTP con NestJS.
- `tests/domain`: pruebas unitarias.
- `tests/application`: pruebas de caso de uso y mocks.
- `tests/infrastructure`: pruebas del repositorio SQLite.
- `tests/integration`: integración real entre caso de uso y repositorio.
- `tests/system`: pruebas HTTP con NestJS y Supertest.
- `registraduria/`: referencia Java/Maven original conservada para trazabilidad académica.

## Documentación

- Wiki en Markdown: `docs/wiki/`.
- Matriz de pruebas: `docs/test-matrix.md`.
- Backlog de fases: `docs/development-backlog.md`.
- Mapeo tecnológico: `docs/technology-mapping.md`.
- Plan de integración: `docs/integration-test-plan.md`.
- Plan de sistema HTTP: `docs/system-test-plan.md`.
- Registro de defectos: `defectos.md`.
- Reporte de planeación: `docs/planning-report.md`.

## Mapeo HTTP

- `200`: registro válido.
- `400`: payload inválido, género inválido o ID inválido.
- `409`: registro duplicado.
- `422`: menor de edad, persona fallecida o edad inválida.
- `500`: error no controlado de infraestructura.

## Estado actual

El repositorio implementa las fases del taller en TypeScript y queda verificable con `pnpm verify`. La carpeta `registraduria/` se conserva únicamente como referencia académica Java/Maven del taller original.
