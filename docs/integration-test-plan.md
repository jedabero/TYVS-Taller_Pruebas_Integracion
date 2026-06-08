# Plan de pruebas de integración

## Objetivo

Validar la interacción real entre `RegistryUseCase` y `SqliteRegistryRepository`, usando SQLite en memoria como equivalente académico de H2.

## Alcance implementado

- Persistencia real de votantes válidos.
- Consulta real por ID.
- Detección de duplicados contra la base de datos.
- Limpieza de datos entre pruebas mediante `deleteAll()`.
- Verificación de que personas rechazadas no se guardan.

## Escenarios cubiertos

- `VALID`: guarda una persona válida.
- `DUPLICATED`: rechaza un ID existente.
- `UNDERAGE`: no guarda menores de edad.
- `DEAD`: no guarda personas fallecidas.
- `INVALID`: no guarda IDs inválidos.
- `INVALID_AGE`: no guarda edades fuera de rango.

## Comando

```bash
pnpm test:integration
```

## Evidencia

La salida final queda en `docs/evidence/test-output.txt` y `docs/evidence/verify-output.txt`.
