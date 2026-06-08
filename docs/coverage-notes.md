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

## Estado

La suite final supera los umbrales globales. La evidencia actualizada se guarda en `docs/evidence/coverage-output.txt`.

| Métrica | Resultado final |
| --- | --- |
| Statements | 97.11% |
| Branches | 90.62% |
| Functions | 100% |
| Lines | 97.11% |

## Código no cubierto

Las líneas no cubiertas corresponden a ramas defensivas o de fallback:

- `RegistryUseCase`: rama redundante de persona nula después del narrowing de TypeScript.
- `RegistryController`: rama defensiva de validación.
- `SqliteRegistryRepository`: fallback para género desconocido leído desde SQLite.
