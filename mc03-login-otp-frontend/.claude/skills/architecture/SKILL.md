---
name: architecture
description: Reglas de arquitectura hexagonal en el frontend. Se usa al decidir dónde va un archivo (dominio, aplicación o infraestructura).
---

# Arquitectura (hexagonal en el frontend)

- **dominio**: value objects y entidades. Puro: sin React, sin fetch, sin nada de infra.
- **aplicación**: casos de uso (una acción por clase, con `execute`) y los **puertos**
  (interfaces) que necesitan.
- **infraestructura**: adaptadores que implementan los puertos (HTTP a través de un
  `HttpClient`, nunca `fetch` suelto) y la UI (componentes y hooks).

Reglas:
- **Dependencia hacia adentro**: dominio y aplicación no conocen la infraestructura.
  La UI depende de los casos de uso, nunca al revés.
- Los **primitivos entran por el borde**; el caso de uso construye los value objects.
- Un puerto a un servicio externo se stubbea en los tests; no se usa mocking.
