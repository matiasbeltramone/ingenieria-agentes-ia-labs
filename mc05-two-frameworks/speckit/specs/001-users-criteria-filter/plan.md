# Implementation Plan: Users criteria filter + pagination

**Spec**: ./spec.md | **Constitution**: ../../.specify/memory/constitution.md

## Technical context
TypeScript + Node.js. Arquitectura hexagonal (según la constitution). Sin build:
`node --experimental-strip-types`.

## Mapeo a capas hexagonales

| Componente | Capa | Rol |
|---|---|---|
| `User`, `UserCriteria` | dominio | entidad + value object (el Criteria) |
| `PageResult<T>` | shared | resultado paginado genérico |
| `UserRepository.matching(criteria)` | aplicación | puerto |
| `SearchUsers` | aplicación | caso de uso (arma el criteria desde primitivos) |
| `InMemoryUserRepository` | infraestructura | adaptador (traduce a operaciones sobre un array) |

## Decisiones
- Criteria como value object con `create()` (valida page/pageSize) y `default()`.
- `matching(criteria)` en el puerto, no `findAll` + filtros sueltos (evita acoplar la firma a cada filtro).
- `PageResult<T>` en shared (lo usarán otros módulos).

## Alternativas descartadas
- Pasar filtros sueltos hasta el repositorio: acopla el puerto a cada filtro nuevo.
- Ordenar/paginar en el cliente: no escala (el problema que motiva la feature).
