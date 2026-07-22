---
name: testing
description: Estándares de test. Se usa al escribir o revisar tests.
---

# Testing

- TDD inside-out: primero dominio y aplicación, después infraestructura.
- **Sin librerías de mocking.** Para un puerto a un servicio externo usá un stub
  simple hecho a mano; para un repositorio, un in-memory.
- El nombre del test describe el **comportamiento**, no la implementación.
- Un test por comportamiento, con arrange / act / assert claros.
