# Plan de pruebas de sistema HTTP

## Objetivo

Validar el sistema como caja negra a través del endpoint HTTP `POST /register`, usando NestJS, `@nestjs/testing` y `supertest`.

## Endpoint inicial

- Método: `POST`
- Ruta: `/register`
- Body: `{ "name": string, "id": number, "age": number, "gender": string, "alive": boolean }`
- Respuesta inicial: `{ "result": "VALID" }` o error HTTP de validación.

## Estrategia de códigos HTTP

- `201`: registro aceptado por el endpoint actual de NestJS para `POST`.
- `400`: payload inválido o género no reconocido.
- `409`: candidato para duplicados en una fase posterior.
- `422`: candidato para reglas de negocio rechazadas como menor de edad o fallecido.
- `500`: errores no controlados de infraestructura.

## Escenarios mínimos

- Registrar persona válida mediante HTTP.
- Rechazar payload inválido.
- Rechazar género inválido.

## Escenarios futuros

- Duplicado por HTTP.
- Menor de edad por HTTP.
- Persona fallecida por HTTP.
- Error controlado de persistencia.
