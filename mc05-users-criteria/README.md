# Lab MC05 — Users con patrón Criteria (Spec-Driven Development)

Lab del cuaderno **Ingeniería de Software con Agentes de IA** (masterclass 5).
Implementa filtrado, orden y paginación de usuarios con el **patrón Criteria**,
siguiendo el flujo de Spec-Driven Development.

## Qué muestra este lab

1. **OpenSpec real**: `openspec init` corrido de verdad (Node 20+). Generó
   `openspec/config.yaml` (customizado con el contexto y las reglas del proyecto)
   y las skills/comandos `/opsx:*` en `.claude/`.
2. **Los artefactos de `propose`** en `openspec/changes/add-users-criteria-filter/`:
   `proposal.md` (el porqué + non-goals), `specs/users.md` (escenarios BDD),
   `design.md` (decisiones de arquitectura) y `tasks.md` (checklist con TDD).
3. **El núcleo implementado con TDD y ejecutable sin instalar nada**: el patrón
   Criteria en el dominio (`UserCriteria`), el caso de uso, el puerto y un
   adaptador in-memory que traduce el criteria a operaciones sobre un array.

## Estructura

```
openspec/                 # config.yaml + el change con los 4 artefactos
src/
  shared/PageResult.ts
  users/
    domain/               # User, value-objects/UserCriteria
    application/          # SearchUsers + ports/UserRepository
    infrastructure/       # adapters/InMemoryUserRepository
    tests/                # 13 tests (node:test)
```

## Correr los tests

Requiere Node 22 (usa type-stripping nativo, sin build ni dependencias):

```bash
node --experimental-strip-types --test 'src/users/tests/*.test.ts'
# tests 13   pass 13   fail 0
```

## Honestidad sobre el alcance

El núcleo (dominio + aplicación + adaptador in-memory) se implementó con TDD y
los tests corren de verdad. `openspec init` también se corrió de verdad. Lo que
NO se reproduce acá es la corrida autónoma completa de `/opsx:apply` (la demo de
la clase, ~36 min, con la UI de React y el adaptador de Postgres reales): eso
necesita el proyecto full-stack corriendo y se recorre en el apunte.
