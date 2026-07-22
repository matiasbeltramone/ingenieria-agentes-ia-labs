---
name: action-tdd
description: Guía el ciclo de TDD en cinco pasos. Usar al implementar cualquier feature o value object.
allowed-tools: Read, Write, Edit, Bash
---

# TDD en cinco pasos

1. **Rojo**: escribí el test más simple que capture el próximo comportamiento y que falle.
2. **Confirmá el rojo**: corré el test y verificá que falla por la razón correcta.
3. **Verde**: implementá lo mínimo para que pase. Nada de más (nada de anticiparse).
4. **Todos verdes**: corré la suite completa.
5. **Refactor**: mejorá nombres y duplicación con los tests en verde.

Repetí. Regla dura: no escribas código de producción sin un test en rojo primero.
