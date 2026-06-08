# Plan de pruebas de integración

## Objetivo

Validar la interacción real entre el caso de uso `RegistryUseCase` y el adaptador `SqliteRegistryRepository`, usando SQLite en memoria como equivalente académico de H2.

## Alcance inicial

- Persistencia real de votantes válidos.
- Consulta real por ID.
- Detección de duplicados contra la base de datos.
- Limpieza de datos entre pruebas mediante `deleteAll()`.

## Escenarios pendientes para fases posteriores

- `VALID`: guardar una persona válida.
- `DUPLICATED`: rechazar un ID existente.
- `UNDERAGE`: no guardar menores de edad.
- `DEAD`: no guardar personas fallecidas.
- `INVALID`: no consultar ni guardar IDs inválidos o persona nula.
- `INVALID_AGE`: no guardar edades fuera de rango.

## Evidencia esperada

- Salida de `pnpm test:integration`.
- Fragmentos de `coverage/index.html`.
- Capturas o logs en `docs/evidence/`.
