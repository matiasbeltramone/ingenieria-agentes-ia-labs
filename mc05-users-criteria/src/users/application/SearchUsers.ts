import type { User } from "../domain/User.ts";
import { UserCriteria } from "../domain/value-objects/UserCriteria.ts";
import type { UserRepository } from "./ports/UserRepository.ts";
import type { PageResult } from "../../shared/PageResult.ts";

// Caso de uso: recibe primitivos del borde y arma el value object adentro.
export class SearchUsers {
  private readonly users: UserRepository;

  constructor(users: UserRepository) {
    this.users = users;
  }

  async execute(params: {
    searchText?: string;
    role?: User["role"];
    sortField?: "name" | "email" | "createdAt";
    sortDirection?: "asc" | "desc";
    page?: number;
    pageSize?: number;
  }): Promise<PageResult<User>> {
    const criteria = UserCriteria.create(params);
    return this.users.matching(criteria);
  }
}
