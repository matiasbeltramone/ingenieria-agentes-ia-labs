# Reglas (arquitectura hexagonal + TDD inside-out) — lab

Trabajo inside-out: dominio -> caso de uso -> adaptador -> HTTP.
Dominio puro (sin dependencias externas). Casos de uso con in-memory repos (NO mocks).
Stubs/spies SOLO en el test de un caso de uso que depende de un puerto externo.
Un test rojo por vez. TPP en green. Tests como reglas de negocio, no implementación.
