# Tasks: users criteria filter

## Dominio
- [x] Tipos `User` y `Role` (tarea plana)
- [x] `PageResult<T>` + helper `pageResult` (tarea plana, shared)
- [x] TDD: `UserCriteria.default()` y `create()` con validación de page/pageSize (red -> green -> commit)

## Aplicación
- [x] Puerto `UserRepository.matching(criteria)` (tarea plana)
- [x] TDD: caso de uso `SearchUsers` (arma el criteria desde primitivos)

## Infraestructura
- [x] TDD: `InMemoryUserRepository.matching` (filtro por texto/rol, orden, paginación, sin resultados)

## Validación
- [x] Correr la suite: `node --experimental-strip-types --test 'src/users/tests/*.test.ts'`
- [x] Commit final
