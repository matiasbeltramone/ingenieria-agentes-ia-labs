import type { User } from "../../domain/User.ts";
import type { UserCriteria } from "../../domain/value-objects/UserCriteria.ts";
import type { PageResult } from "../../../shared/PageResult.ts";

// Puerto de dominio: el caso de uso depende de esta interfaz, no de Postgres.
// 'matching' recibe un criteria y devuelve una página de resultados.
export interface UserRepository {
  matching(criteria: UserCriteria): Promise<PageResult<User>>;
}
