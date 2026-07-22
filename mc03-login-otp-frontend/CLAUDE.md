# Login OTP — Frontend (lab MC03 / MC04)

Frontend del login OTP que consume la API del backend (`../mc02-login-otp`).
Material de aprendizaje: reproduce el flujo de la mentoría (plan → TDD →
revisión por subagentes) con un **andamiaje propio y simplificado**, para ver
qué resultado da un andamiaje mínimo.

## Stack
- TypeScript + Node. Dominio y aplicación corren con `node:test` (sin dependencias).
- React para la UI (es infraestructura).

## Arquitectura
- Hexagonal en el frontend: el dominio NO sabe de React. Componentes, hooks y HTTP
  son infraestructura. Detalle en la skill `architecture`.
- TDD inside-out: del dominio hacia afuera. Ciclo en la skill `action-tdd`.

## Skills (se cargan cuando aplican)
- `architecture` — capas y regla de dependencia en el front.
- `naming` — convenciones de nombres.
- `testing` — estándares de test.
- `action-tdd` — el ciclo de TDD (invocable con `/action-tdd`).

## Subagentes de revisión (`.claude/agents/`)
- `code-reviewer`, `architecture-reviewer`, `testing-reviewer`.

## No negociables
- Nada de código de producción sin un test en rojo primero.
- El dominio y la aplicación no importan nada de React ni de infraestructura.
- Los puertos se definen en la aplicación; los adaptadores en infraestructura.
- Sin `any`. Sin comentarios que repitan lo que dice el código.
