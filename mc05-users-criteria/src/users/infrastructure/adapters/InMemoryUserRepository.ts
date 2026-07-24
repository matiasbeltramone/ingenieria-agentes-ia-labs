import type { User } from "../../domain/User.ts";
import type { UserCriteria, SortField, SortDirection } from "../../domain/value-objects/UserCriteria.ts";
import type { UserRepository } from "../../application/ports/UserRepository.ts";
import { pageResult, type PageResult } from "../../../shared/PageResult.ts";

// Adaptador en memoria: TRADUCE el criteria a operaciones sobre un array.
// Un PostgresUserRepository haría lo mismo traduciendo a SQL; el dominio no
// cambia. No es un mock: es una implementación real del puerto, apta para tests
// (y para desarrollo) sin levantar una base de datos.
export class InMemoryUserRepository implements UserRepository {
  private readonly all: User[];

  constructor(all: User[]) {
    this.all = all;
  }

  async matching(criteria: UserCriteria): Promise<PageResult<User>> {
    let result = this.all;

    if (criteria.searchText) {
      const q = criteria.searchText.toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q),
      );
    }

    if (criteria.role) {
      result = result.filter((u) => u.role === criteria.role);
    }

    const sorted = [...result].sort(compareBy(criteria.sortField, criteria.sortDirection));
    const total = sorted.length;
    const start = (criteria.page - 1) * criteria.pageSize;
    const items = sorted.slice(start, start + criteria.pageSize);

    return pageResult(items, criteria.page, criteria.pageSize, total);
  }
}

function compareBy(field: SortField, direction: SortDirection) {
  const sign = direction === "asc" ? 1 : -1;
  return (a: User, b: User): number => {
    const av = field === "createdAt" ? a.createdAt.getTime() : a[field].toLowerCase();
    const bv = field === "createdAt" ? b.createdAt.getTime() : b[field].toLowerCase();
    if (av < bv) return -1 * sign;
    if (av > bv) return 1 * sign;
    return 0;
  };
}
