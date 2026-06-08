# Pruebas de sistema HTTP

Spring Boot Test, MockMvc y TestRestTemplate se adaptan a NestJS, `@nestjs/testing` y `supertest`.

## Endpoint inicial

```txt
POST /register
```

## Comando

```bash
pnpm test:system
```

## Mapeo final

- `200`: `VALID`.
- `400`: payload inválido, género inválido o `INVALID`.
- `409`: `DUPLICATED`.
- `422`: `UNDERAGE`, `DEAD`, `INVALID_AGE`.
- `500`: error no controlado de infraestructura.
