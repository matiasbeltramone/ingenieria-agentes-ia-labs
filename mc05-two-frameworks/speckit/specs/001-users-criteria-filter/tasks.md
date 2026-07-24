# Tasks: Users criteria filter + pagination

Ordenadas inside-out. TDD (red -> green -> commit) en las de comportamiento.

## Fase 1: Dominio (P1)
- [ ] T001 [plana] Tipos `User` y `Role`
- [ ] T002 [plana] `PageResult<T>` + helper `pageResult` (shared)
- [ ] T003 [TDD] `UserCriteria.default()` y `create()` con validación de page/pageSize

## Fase 2: Aplicación (P1)
- [ ] T004 [plana] Puerto `UserRepository.matching(criteria)`
- [ ] T005 [TDD] Caso de uso `SearchUsers` (arma el criteria desde primitivos)

## Fase 3: Infraestructura (P1)
- [ ] T006 [TDD] `InMemoryUserRepository.matching` (filtro texto/rol, orden, paginación, sin resultados)

## Validación
- [ ] T007 Correr la suite completa
- [ ] T008 Commit final
