# users-criteria Constitution

Las MISMAS guidelines que se le pasan a OpenSpec en el otro lab, para que la
comparación aísle "herramienta vs contexto".

## Core Principles

### I. Arquitectura hexagonal
Vertical slicing por módulo (dominio / aplicación / infraestructura). Regla de
dependencia: dominio <- aplicación <- infraestructura. El dominio no tiene
dependencias externas.

### II. Patrón Criteria
El dominio describe QUÉ buscar (campo, filtro, orden, página) sin saber de base
de datos; el adaptador traduce el criteria a la query concreta.

### III. Test-First (NON-NEGOTIABLE)
TDD: red -> green -> commit. Testing por capa: unit para dominio, repos in-memory
(no mocks) para casos de uso, integración para adaptadores reales.

### IV. Diseño
Value objects con validación; naming en inglés; funciones con una sola
responsabilidad; primitivos en el borde, el caso de uso arma los VOs.

## Governance
Esta constitution es la fuente de las decisiones de diseño. La complejidad se
justifica; ante la duda, YAGNI.

**Version**: 1.0.0 | **Ratified**: 2026-07-24 | **Last Amended**: 2026-07-24
