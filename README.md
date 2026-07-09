# Labs: Ingeniería de Software con Agentes de IA

Código de los **labs** del [Cuaderno de Ingeniería de Software con Agentes de IA](https://matiasbeltramone.com/apuntes/ingenieria-agentes-ia). Cada lab acompaña un apunte y se puede clonar y correr.

Son sesiones de TDD reales: la salida de consola de los apuntes salió de correr esto.

## Qué hay acá

| Carpeta | Apunte | De qué va |
|---------|--------|-----------|
| `mc01-xp-tdd/` | eXtreme Programming con agentes | TDD + TPP sobre una función de fortaleza de contraseña. |
| `mc02-login-otp/` | Arquitectura hexagonal + TDD inside-out | Núcleo de un login OTP: value objects, caso de uso, in-memory repo y un spy. |

## Cómo correrlo

Requiere **Node 22+** (usa el test runner nativo y ejecuta TypeScript con `--experimental-strip-types`, sin instalar nada).

```bash
# Lab MC01
cd mc01-xp-tdd
node --experimental-strip-types --test password-strength.test.ts

# Lab MC02
cd mc02-login-otp
node --experimental-strip-types --test 'auth/tests/*.test.ts'
```

## Nota

Estos labs son mi **reelaboración propia** para aprender, inspirada en una mentoría de pago sobre ingeniería con agentes. No reproducen el material original: son código mío, escrito para los apuntes. El `CLAUDE.md` de cada carpeta son las reglas que le doy al agente (mi versión).
