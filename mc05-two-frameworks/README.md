# Lab MC05 (bonus) — La misma feature en dos frameworks

Experimento del cuaderno **Ingeniería de Software con Agentes de IA**
(masterclass 5): correr la MISMA feature (filtro + paginación de users con patrón
Criteria) con las MISMAS guidelines por dos frameworks de Spec-Driven Development,
para medir cuánto del resultado depende de la herramienta y cuánto del contexto.

## Contenido

- `speckit/` — Spec Kit inicializado de verdad (`specify init --integration
  claude`, vía `uv`) + los artefactos para la feature:
  `.specify/memory/constitution.md` (las guidelines) y
  `specs/001-users-criteria-filter/` (spec, plan, tasks).
- El lado **OpenSpec** vive en `../mc05-users-criteria` (openspec init +
  artefactos validados + el código del patrón Criteria con 13 tests verdes).
- `COMPARISON.md` — la comparación lado a lado y la conclusión.

## Conclusión corta

Con las mismas guidelines, el diseño técnico converge (manda el contexto). La
herramienta cambia la forma de los artefactos y dónde ponés el esfuerzo: Spec Kit
es product-first y con más ceremonia (bueno en greenfield); OpenSpec es liviano y
técnico (bueno en brownfield). Ver `COMPARISON.md`.

## Nota

La implementación ejecutable del patrón Criteria (con tests) está en el lab de
OpenSpec (`../mc05-users-criteria`); acá el foco son los artefactos y el proceso
de cada framework, no re-implementar el mismo código.
