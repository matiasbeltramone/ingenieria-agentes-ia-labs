# Add users criteria filter + pagination

## Why
Hoy la lista de usuarios se filtra entera en el cliente: se cargan todos los
usuarios y se filtra en memoria. Funciona con 20 usuarios y se rompe con 2000.
Queremos filtrado, orden y paginación con el patrón Criteria, para que escale y
para desacoplar la búsqueda de la base de datos.

## What changes
- Value object `UserCriteria` (dominio): searchText, role, sort, page, pageSize.
- `PageResult<T>` genérico (shared).
- Puerto `UserRepository.matching(criteria)` (aplicación).
- Caso de uso `SearchUsers` que arma el criteria desde primitivos.
- Adaptador `InMemoryUserRepository` que traduce el criteria a operaciones sobre
  un array (en producción, un `PostgresUserRepository` traduciría a SQL).

## Non-goals
- No implementamos el adaptador real de Postgres ni la UI de React (fuera de este
  lab; el núcleo es reproducible sin backend).
- No hacemos orden por múltiples columnas ni filtros combinados avanzados.
- No exponemos los filtros en la URL.

## Affected modules
- shared (PageResult)
- users (domain, application, infrastructure)
