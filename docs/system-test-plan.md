# Plan de pruebas de sistema HTTP

## Objetivo

Validar el sistema como caja negra a través de `POST /register`, usando NestJS, `@nestjs/testing` y `supertest`.

## Endpoint

- Método: `POST`
- Ruta: `/register`
- Body: `{ "name": string, "id": number, "age": number, "gender": string, "alive": boolean }`

## Mapeo HTTP final

- `200`: `VALID`.
- `400`: payload inválido, género inválido o `INVALID`.
- `409`: `DUPLICATED`.
- `422`: `UNDERAGE`, `DEAD`, `INVALID_AGE`.
- `500`: error no controlado de infraestructura.

## Escenarios cubiertos

- Registro exitoso por HTTP.
- Payload inválido por género no reconocido.
- Duplicado por HTTP.
- Menor de edad por HTTP.
- Persona fallecida por HTTP.
- Edad inválida por HTTP.
- ID inválido por HTTP.
- Error no controlado de infraestructura por HTTP.

## Comando

```bash
pnpm test:system
```
