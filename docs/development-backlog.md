# Backlog de desarrollo

Este backlog divide la adaptación TypeScript del taller de integración y sistema en fases pequeñas, revisables y aptas para commits manuales.

## Fase 0 — Preparación y migración

- Inspeccionar ambos repositorios.
- Migrar base TypeScript desde unitarias.
- Limpiar o aislar archivos Java/Maven si existen.
- Verificar `.gitignore`.
- Verificar `integrantes.txt`.
- Verificar ejecución inicial con `pnpm install`, `pnpm typecheck`, `pnpm test`.

## Fase 1 — Reorganización a arquitectura limpia

- Mantener dominio puro.
- Crear puerto `RegistryRepositoryPort`.
- Crear caso de uso en `application`.
- Asegurar que dominio no depende de infraestructura ni delivery.

## Fase 2 — Persistencia SQLite en memoria

- Crear `SqliteRegistryRepository`.
- Crear inicialización de esquema.
- Crear limpieza de datos para tests.
- Crear helper `test-database.ts`.

## Fase 3 — Pruebas de integración reales

- Implementar pruebas sin mocks entre caso de uso y repositorio SQLite.
- Cubrir `VALID`, `DUPLICATED`, `UNDERAGE`, `DEAD`, `INVALID`.
- Verificar persistencia real.

## Fase 4 — Pruebas con mocks

- Implementar pruebas usando `vi.fn()` o `vi.spyOn()`.
- Verificar que `save()` se invoca cuando corresponde.
- Verificar que `save()` no se invoca en duplicados.
- Simular excepción controlada del repositorio.

## Fase 5 — Capa HTTP con NestJS

- Crear módulo NestJS mínimo.
- Crear controlador `POST /register`.
- Crear DTO `PersonRequestDto`.
- Mapear resultados de negocio a respuestas HTTP.
- Definir estrategia para códigos `200`, `400`, `409`, `422` o `500`.

## Fase 6 — Pruebas de sistema HTTP

- Usar `@nestjs/testing` y `supertest`.
- Validar registro exitoso.
- Validar entrada inválida.
- Validar duplicado, menor de edad y persona fallecida si aplica.
- Preparar evidencia para Wiki.

## Fase 7 — Cobertura

- Mantener cobertura global >= 80%.
- Mantener umbrales razonables en `vitest.config.ts`.
- Generar `coverage/index.html`.
- Documentar clases no cubiertas y justificación.

## Fase 8 — CI

- Actualizar GitHub Actions.
- Usar Node.js 24 y pnpm.
- Ejecutar `pnpm install --frozen-lockfile`.
- Ejecutar `pnpm verify`.
- El pipeline debe fallar si fallan typecheck, tests o coverage.

## Fase 9 — Documentación y Wiki

- Preparar páginas en `docs/wiki/`.
- Documentar el mapeo Java a TypeScript.
- Documentar tipos de pruebas.
- Documentar arquitectura limpia.
- Documentar pruebas de integración con SQLite.
- Documentar pruebas con mocks de Vitest.
- Documentar pruebas HTTP con NestJS/Supertest.
- Documentar resultados de cobertura.
- Documentar reflexión técnica.

## Fase 10 — Entrega final

- Completar matriz de pruebas.
- Completar `defectos.md`.
- Completar evidencias.
- Ejecutar `pnpm verify` desde cero.
- Revisar README final.
- Revisar que la entrega explique claramente por qué se usó TypeScript en lugar de Java.
