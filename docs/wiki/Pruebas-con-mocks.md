# Pruebas con mocks

Mockito se adapta a mocks de Vitest.

## Equivalencias

- `mock(...)` se adapta a objetos con `vi.fn()`.
- `when(...).thenReturn(...)` se adapta a `vi.fn(() => value)` o `mockReturnValue`.
- `verify(..., never())` se adapta a `expect(fn).not.toHaveBeenCalled()`.

## Objetivo

Verificar el comportamiento del caso de uso frente al puerto de persistencia sin levantar SQLite.
