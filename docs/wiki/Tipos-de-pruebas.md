# Tipos de pruebas

## Unitarias

Validan reglas de negocio aisladas del dominio. En este repositorio se reutilizan las pruebas del taller anterior para `Registry.registerVoter`.

## Integración real

Validan colaboración entre el caso de uso y el repositorio SQLite en memoria.

## Integración con mocks

Validan interacción contra puertos usando dobles de prueba de Vitest, como `vi.fn()`.

## Sistema HTTP

Validan el sistema por su interfaz pública usando NestJS y Supertest.
