# Lab MC03 / MC04 — Frontend del login OTP (con andamiaje propio)

Frontend del login OTP (arquitectura hexagonal) que consume la API del backend de
[`../mc02-login-otp`](../mc02-login-otp). Crece sobre ese hilo: **MC02** = backend,
**MC03** = login/verificación en el front, **MC04** = vista de perfil.

Pero el objetivo real de este lab no es el código: es **reproducir el flujo de la
mentoría (plan → TDD → revisión por subagentes) con un andamiaje propio y
simplificado**, y ver qué resultado da un andamiaje mínimo. Es un harness mostrable.

## El andamiaje (lo mostrable)

```
CLAUDE.md                      índice lean + no negociables
.claude/skills/
  action-tdd/                  el ciclo de TDD en 5 pasos (invocable)
  architecture/                capas y regla de dependencia (guideline)
  naming/                      convenciones de nombres (guideline)
  testing/                     estándares de test (guideline)
.claude/agents/
  code-reviewer.md             calidad de código
  architecture-reviewer.md     arquitectura hexagonal
  testing-reviewer.md          calidad de tests
```

Son versiones **propias y destiladas** (cortas), no las del material original de la
mentoría. La hipótesis: con este mínimo el agente ya debería producir un buen diseño.

## El código

```
src/
  shared/          DomainError, HttpClient (contrato de infraestructura)
  auth/            (MC03) Email, OtpCode · RequestOtp, VerifyOtp · AuthPort · HttpAuthAdapter
  profile/         (MC04) Username · UpdateProfile · ProfilePort · HttpProfileAdapter
```

Dominio y aplicación son puros (sin React, sin fetch). La infraestructura tiene los
adaptadores HTTP. Los primitivos entran por el borde y el caso de uso arma los value
objects.

## Correr los tests

```bash
npm test
# equivale a: node --experimental-strip-types --test 'src/**/*.test.ts'
```

Requiere Node 22+. Resultado actual: **15 tests, 15 pass**. Cero dependencias.

## El harness en acción (qué encontró la revisión)

Se corrieron los reviewers como subagentes sobre el código:

- **Architecture reviewer**: sin violaciones. Hexagonal correctamente aplicada
  (dominio puro, casos de uso dependiendo de puertos, adaptadores que no filtran HTTP
  hacia adentro). Observación menor: `HttpClient` vive en `shared/` (decisión
  defendible, no rompe la regla de dependencias).
- **Code reviewer**: un hallazgo real y uno menor.
  - *Real (corregido)*: el test `VerifyOtp rechaza un código mal formado antes de
    llegar al puerto` afirmaba `rejects` pero no verificaba que el puerto no se
    llamara. Se ajustó el stub para registrar la llamada y ahora el test comprueba
    `verifyCalled === false`.
  - *Menor (no corregido)*: `OtpCode.test.ts` junta dos casos inválidos en un test.

**Conclusión del experimento**: con un andamiaje mínimo, el diseño salió limpio (los
reviewers no encontraron smells de arquitectura). El único hallazgo real fue una
laguna de test, no un problema de diseño. Distinto al lab del material original, donde
la revisión encontró un puerto en la capa equivocada.

## Nota honesta (gotchas y alcance)

- **`strip-types` no soporta parameter properties.** El primer intento usó
  `constructor(private readonly x)` y `private constructor(readonly value)`, y Node
  falló con `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`: el modo strip-only solo borra tipos,
  no genera código. Se corrigió declarando los campos de forma explícita (como hace
  el backend `mc02-login-otp`).
- **La UI en React todavía no está en este milestone.** Este lab cubre el núcleo
  reproducible (dominio + aplicación + adaptadores HTTP) con tests que corren de
  verdad. Los componentes/hooks (infraestructura de UI) y la UX review con Playwright
  quedan como siguiente paso (necesitan un toolchain de frontend y la app corriendo).

- **El endpoint que consumen los adaptadores no existe todavía en el backend.** Los
  adaptadores (`HttpAuthAdapter`, `HttpProfileAdapter`) están escritos contra el
  contrato esperado de una API (`POST /auth/request-otp`, `PUT /profile`, etc.), pero
  el backend `../mc02-login-otp` solo tiene el núcleo del OTP (dominio + aplicación +
  tests), sin capa HTTP ni endpoint `/profile`. Por eso los tests de los adaptadores
  usan un `HttpClient` **falso**: verifican que el adaptador arma bien la llamada, no
  que haya un backend real guardando datos. En un montaje completo, el guardado ocurre
  en el backend; el frontend solo delega.

- **Repositorio vs puerto de servicio (debate abierto).** `ProfilePort` y `AuthPort`
  están modelados como **puertos de servicio** (gateways a una API remota), en la capa
  de aplicación, porque el frontend no persiste datos propios: le habla al backend por
  HTTP. Un repositorio sería lo apropiado si el front guardara entidades propias
  (localStorage, IndexedDB) o si esto fuera el backend contra una DB. En el material de
  la mentoría, el mentor marcó como smell un caso parecido (un `ProfilePort` en
  aplicación que, según él, debería ser un `ProfileRepository` en dominio). No hay
  consenso: es el mismo hilo de "puerto de dominio (repo) vs puerto de aplicación
  (servicio)" que recorre el cuaderno.

## Reproducir el harness

Con Claude Code, desde esta carpeta: el `CLAUDE.md` y las skills se cargan solas, y
podés lanzar los reviewers definidos en `.claude/agents/` sobre un diff para repetir
la revisión.
