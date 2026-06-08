# Arquitectura limpia

La estructura se organiza por capas:

- `domain`: modelos y reglas puras.
- `application`: casos de uso y puertos.
- `infrastructure`: adaptadores de persistencia.
- `delivery`: adaptadores de entrada HTTP.

El dominio no depende de NestJS, SQLite ni Supertest. La aplicación depende de abstracciones y modelos propios, y la infraestructura implementa esas abstracciones.

El puerto `RegistryRepositoryPort` solo expone operaciones requeridas por el caso de uso: consultar existencia, guardar y buscar por ID. Operaciones como inicializar esquema o limpiar datos pertenecen al adaptador SQLite concreto y a los helpers de prueba, no al contrato de aplicación.
