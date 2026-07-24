# Feature Specification: Users criteria filter + pagination

**Feature Branch**: `001-users-criteria-filter`
**Status**: Draft
**Input**: "Filtrar, ordenar y paginar la lista de usuarios con el patrón Criteria, server-side."

## User Scenarios & Testing

### User Story 1 - Filtrar y paginar usuarios server-side (Priority: P1)

Un admin abre la lista de usuarios y necesita encontrar a alguien sin cargar
miles de filas en el navegador: filtra por texto o rol, ordena y navega por
páginas, y el servidor resuelve todo.

**Why this priority**: es el core; sin esto la vista no escala más allá de unas
decenas de usuarios.

**Independent Test**: se puede probar pidiendo una página con un filtro y
verificando el conjunto y el conteo devueltos, sin UI.

**Acceptance Scenarios**:

1. **Given** no se pasan filtros, **When** se pide la lista, **Then** devuelve la
   página 1 (10 elementos) ordenada por fecha de creación descendente.
2. **Given** un texto "ada", **When** se filtra, **Then** devuelve solo usuarios
   cuyo nombre o email contiene "ada" (sin distinguir mayúsculas).
3. **Given** rol "admin", **When** se filtra, **Then** devuelve solo admins.
4. **Given** 12 usuarios y pageSize 10, **When** se pide la página 2, **Then**
   devuelve los 2 restantes, con total 12 y totalPages 2.

### Edge Cases

- ¿Qué pasa con una página menor a 1 o un pageSize fuera de 1..100? -> error de validación.
- ¿Qué pasa si el filtro no matchea a nadie? -> total 0, totalPages 0.

## Requirements

### Functional Requirements

- **FR-001**: El sistema DEBE resolver filtrado, orden y paginación en el servidor mediante un criteria.
- **FR-002**: El sistema DEBE filtrar por texto (nombre o email, case-insensitive) y por rol.
- **FR-003**: El sistema DEBE ordenar por nombre, email o fecha de creación, asc o desc (default: created_at desc).
- **FR-004**: El sistema DEBE paginar (default: página 1, 10 por página) y devolver total y totalPages.
- **FR-005**: El sistema DEBE rechazar page < 1 y pageSize fuera de 1..100 con un error de validación.

### Key Entities

- **User**: id, name, email, role (admin | member), createdAt.
- **UserCriteria**: value object con searchText, role, sortField, sortDirection, page, pageSize.
- **PageResult<T>**: items, page, pageSize, total, totalPages.

## Success Criteria

- **SC-001**: Una búsqueda filtrada devuelve resultados correctos sin cargar toda la tabla en memoria del cliente.
- **SC-002**: Cambiar de base de datos no requiere tocar el dominio (solo se escribe otro adaptador).

## Assumptions

- El filtrado por múltiples columnas y los links compartibles por URL quedan fuera del alcance.
- Se reutiliza el módulo de usuarios existente; el adaptador real de Postgres queda para producción.
