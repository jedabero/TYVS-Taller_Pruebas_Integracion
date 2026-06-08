# Pruebas de integración

Las pruebas de integración reales se escriben como `*.it.ts`.

## Adaptación

- H2 del taller Java se adapta a SQLite en memoria.
- JDBC se adapta a `sql.js` como SQLite en memoria sin servidor externo.
- `RegistryTest.java` se adapta a pruebas entre `RegistryUseCase` y `SqliteRegistryRepository`.

## Comando

```bash
pnpm test:integration
```
