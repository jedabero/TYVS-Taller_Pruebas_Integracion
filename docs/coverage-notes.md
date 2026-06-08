# Notas de cobertura

La cobertura se genera con Vitest Coverage V8.

## Comando

```bash
pnpm coverage
```

## Configuración

| Opción | Valor |
| --- | --- |
| Provider | `v8` |
| Reporters | `text`, `html`, `lcov` |
| Directorio | `coverage` |
| Archivos incluidos | `src/**/*.ts` |

## Umbrales

| Métrica | Umbral |
| --- | --- |
| Lines | 80% |
| Functions | 80% |
| Statements | 80% |
| Branches | 75% |

## Reporte HTML

El reporte equivalente a `target/site/jacoco/index.html` es:

```txt
coverage/index.html
```

## Pendientes

- Completar cobertura de mapeos HTTP cuando se definan códigos definitivos para `DUPLICATED`, `UNDERAGE`, `DEAD` e `INVALID_AGE`.
- Documentar cualquier exclusión futura en este archivo.
