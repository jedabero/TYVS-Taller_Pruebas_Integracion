# Reporte de planeación

## Resumen del estado inicial

`TYVS-Taller_Pruebas_Unitarias/` contiene una adaptación TypeScript/Vitest funcional del taller de pruebas unitarias. Incluye dominio puro, pruebas unitarias, configuración de Vitest Coverage V8, CI, matriz de pruebas, documentación TDD, registro de defectos e integrantes.

`TYVS-Taller_Pruebas_Integracion/` contenía el taller original Java/Maven bajo `registraduria/`, con Spring Boot, JUnit, Mockito, H2, JaCoCo, código de arquitectura limpia y pruebas Java de integración, mocks y REST. En la raíz solo existían `README.md`, `.gitignore`, `defectos.md`, `defectos_template.md` y `registraduria/`.

## Qué se migró desde unitarias

- Modelos de dominio `Gender`, `Person` y `RegisterResult`.
- Servicio de dominio `Registry`.
- Pruebas unitarias de `Registry` en `tests/domain/registry.test.ts`.
- Configuración base de TypeScript, Vitest, coverage, `.nvmrc` y Prettier.
- Convenciones de matriz, cobertura, defectos y documentación.
- `integrantes.txt`.

## Qué se adaptó

- `package.json` se adaptó para integración y sistema con NestJS, Supertest y SQLite en memoria.
- CI se adaptó para ejecutar `pnpm verify`.
- `vitest.config.ts` conserva Coverage V8 y umbrales globales.
- La arquitectura limpia Java se adaptó a capas `domain`, `application`, `infrastructure` y `delivery`.
- Mockito se adaptó a `vi.fn()`.
- H2 se adaptó a SQLite en memoria con `sql.js`.
- Spring Boot Test se adaptó a `@nestjs/testing`.
- MockMvc/TestRestTemplate se adaptó a `supertest`.

## Qué no se migró y por qué

- No se migró Maven ni `pom.xml` como implementación principal porque el stack obligatorio es TypeScript/pnpm.
- No se migraron clases Java como código ejecutable principal porque se conserva continuidad con el taller de unitarias.
- No se agregó `class-validator` ni `class-transformer` porque la validación inicial del DTO se resolvió manualmente para evitar dependencia innecesaria en la preparación.

## Archivos Java/Maven conservados como referencia

La carpeta `registraduria/` se conserva intacta como referencia académica del taller original Java/Maven/Spring Boot. No se movió ni borró para evitar pérdida de trazabilidad.

## Estructura final preparada

- `src/domain`: dominio puro migrado.
- `src/application`: puerto de repositorio y caso de uso.
- `src/infrastructure`: repositorio SQLite en memoria.
- `src/delivery`: controlador y módulo HTTP NestJS.
- `tests/domain`: pruebas unitarias heredadas.
- `tests/application`: pruebas de caso de uso y mocks.
- `tests/infrastructure`: pruebas de SQLite.
- `tests/integration`: pruebas reales caso de uso + SQLite.
- `tests/system`: pruebas HTTP con NestJS y Supertest.
- `docs/wiki`: borradores de Wiki.

## Dependencias agregadas

- `@nestjs/common`
- `@nestjs/core`
- `@nestjs/testing`
- `@nestjs/platform-express`
- `reflect-metadata`
- `rxjs`
- `supertest`
- `@types/supertest`
- `sql.js`
- `@types/sql.js`

## Scripts disponibles

- `pnpm typecheck`
- `pnpm test`
- `pnpm test:unit`
- `pnpm test:integration`
- `pnpm test:system`
- `pnpm coverage`
- `pnpm verify`

## Riesgos técnicos pendientes

- Definir mapeo HTTP final para `DUPLICATED`, `UNDERAGE`, `DEAD`, `INVALID` e `INVALID_AGE`.
- Ampliar pruebas de integración para todos los resultados de negocio.
- Simular excepción controlada del repositorio con mocks.
- Decidir si se agregan `class-validator` y `class-transformer` para DTOs decorados.
- Revisar si el endpoint debe responder `200` en lugar de `201` para alinearse con el texto del taller original.
- Registrar que se evaluó `better-sqlite3`, pero se cambió a `sql.js` porque pnpm bloqueó el build nativo en este entorno no interactivo.

## Próximos pasos recomendados

- Completar Fase 1 con revisión de dependencias entre capas.
- Completar Fase 3 cubriendo todos los resultados de negocio con SQLite real.
- Completar Fase 4 con `vi.spyOn()` y excepciones controladas.
- Completar Fase 5 definiendo semántica HTTP final.
- Guardar evidencias de ejecución en `docs/evidence/`.

## Validaciones ejecutadas y resultados

Las validaciones se ejecutan al final de esta preparación con comandos no destructivos:

```bash
ls
find . -maxdepth 4 -type f | sort
pnpm install
pnpm typecheck
pnpm test
pnpm verify
```

Resultados de la validación local de preparación:

```txt
ls: passed
find . -maxdepth 4 -type f | sort: passed
pnpm install: passed; pnpm mostró una advertencia residual de build ignorado para better-sqlite3, paquete ya no declarado en package.json
pnpm typecheck: passed
pnpm test: 7 test files passed, 27 tests passed
pnpm coverage: passed, statements 92.47%, branches 81.81%, functions 100%, lines 92.47%
pnpm verify: passed; ejecuta typecheck, test y coverage correctamente
```
