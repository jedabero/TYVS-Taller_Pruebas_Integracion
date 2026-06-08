# Arquitectura limpia

La estructura se organiza por capas:

- `domain`: modelos y reglas puras.
- `application`: casos de uso y puertos.
- `infrastructure`: adaptadores de persistencia.
- `delivery`: adaptadores de entrada HTTP.

El dominio no depende de NestJS, SQLite ni Supertest. La aplicación depende de abstracciones, y la infraestructura implementa esas abstracciones.
