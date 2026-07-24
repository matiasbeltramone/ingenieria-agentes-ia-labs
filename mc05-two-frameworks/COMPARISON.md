# OpenSpec vs Spec Kit: la misma feature, las mismas guidelines

Experimento para aislar **herramienta vs contexto** (la duda del apunte 15). La
misma feature (filtro + orden + paginación de users con patrón Criteria) y las
mismas guidelines (hexagonal, TDD, Criteria) corridas por dos frameworks de SDD.

## Setup (los dos, reales)

- **OpenSpec**: `openspec init --tools claude` (ver `../mc05-users-criteria`).
  Genera `openspec/config.yaml` + skills/comandos `/opsx:*`. Estructura **ligera**.
- **Spec Kit**: `specify init --integration claude`. Genera `.specify/`
  (constitution, templates, scripts, workflows) + `.claude/skills/speckit-*`
  (specify, plan, tasks, clarify, analyze, checklist, implement, converge...).
  Estructura **más pesada**, con más pasos.

## Los artefactos, para la misma feature

| | OpenSpec | Spec Kit |
|---|---|---|
| Punto de entrada | `proposal` (por qué + non-goals) | `constitution` (principios) + `spec` |
| La "spec" | escenarios Given/When/Then en formato delta (**técnico**) | user stories con prioridad P1/P2, FR-001..., success criteria medibles (**product-first**) |
| Diseño | `design.md` (decisiones + alternativas) | `plan.md` |
| Tareas | `tasks.md` (TDD inside-out) | `tasks.md` (T001..., por fase) |
| Pasos | 3+1 (explore / propose / apply / archive) | más pasos opcionales (clarify, analyze, checklist, converge) |
| Validación | `openspec validate` | `/speckit-analyze` + checklists |

## El diseño que sale (los dos)

Idéntico en lo que importa: mismo mapeo hexagonal (`User` + `UserCriteria` en
dominio, puerto `matching`, adaptador que traduce, `PageResult` en shared), mismo
value object con validación. Lo dictó la constitution / el config, no el framework.

## Conclusión

Con las mismas guidelines, **el diseño técnico converge: manda el contexto.** La
herramienta cambia sobre todo la FORMA y el punto de entrada de los artefactos:

- **Spec Kit** te empuja a pensar producto (user stories, criterios de éxito
  medibles) y trae más gates de validación. Bueno para greenfield y para alinear
  con negocio.
- **OpenSpec** es más liviano y técnico, y brilla en brownfield.

El grueso del resultado es el contexto; la herramienta es el envase, pero **no es
neutral**: define dónde ponés el esfuerzo (framing de producto vs spec técnica) y
cuánta ceremonia de validación arrastrás.
