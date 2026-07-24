# Design: users criteria filter

## Decisión: Criteria como value object en el dominio
El dominio describe QUÉ buscar; no sabe de base de datos. El adaptador traduce.
Alternativa descartada: pasar filtros sueltos (searchText, role, ...) hasta el
repositorio; se descarta porque acopla la firma del puerto a cada filtro nuevo.

## Decisión: PageResult<T> genérico en shared
Lo usan (o lo van a usar) varios módulos; no es específico de users.

## Decisión: matching(criteria), no findAll + filtros
Un solo método que recibe el criteria completo. En el code base los value objects
son clases con validación; `UserCriteria` sigue ese patrón (fábrica `create` que
valida page y pageSize, `default()` para el caso base).

## Capas
- dominio: `User`, `UserCriteria`
- aplicación: `UserRepository` (puerto), `SearchUsers` (caso de uso)
- infraestructura: `InMemoryUserRepository` (adaptador)
- shared: `PageResult`

## Riesgos / trade-offs
- El in-memory ordena y pagina en memoria: sirve para dev/test, no para millones
  de filas. El adaptador de Postgres empujaría el orden y el límite a la query.
