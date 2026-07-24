import type { Role } from "../User.ts";

export type SortField = "name" | "email" | "createdAt";
export type SortDirection = "asc" | "desc";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 100;

// El patrón Criteria en el DOMINIO: describe QUÉ buscar (campo, filtro, orden,
// página), sin saber NADA de la base de datos. El adaptador de infraestructura
// es el que traduce esto a una query concreta (SQL, Mongo, o un array en memoria).
export class UserCriteria {
  readonly searchText: string | null;
  readonly role: Role | null;
  readonly sortField: SortField;
  readonly sortDirection: SortDirection;
  readonly page: number;
  readonly pageSize: number;

  private constructor(
    searchText: string | null,
    role: Role | null,
    sortField: SortField,
    sortDirection: SortDirection,
    page: number,
    pageSize: number,
  ) {
    this.searchText = searchText;
    this.role = role;
    this.sortField = sortField;
    this.sortDirection = sortDirection;
    this.page = page;
    this.pageSize = pageSize;
  }

  // El escenario que sale en la spec: sin texto, sin rol, orden por created_at
  // descendente, página 1, 10 elementos.
  static default(): UserCriteria {
    return new UserCriteria(
      null,
      null,
      "createdAt",
      "desc",
      DEFAULT_PAGE,
      DEFAULT_PAGE_SIZE,
    );
  }

  static create(params: {
    searchText?: string;
    role?: Role;
    sortField?: SortField;
    sortDirection?: SortDirection;
    page?: number;
    pageSize?: number;
  }): UserCriteria {
    const page = params.page ?? DEFAULT_PAGE;
    const pageSize = params.pageSize ?? DEFAULT_PAGE_SIZE;
    if (!Number.isInteger(page) || page < 1) {
      throw new Error("page debe ser un entero >= 1");
    }
    if (!Number.isInteger(pageSize) || pageSize < 1 || pageSize > MAX_PAGE_SIZE) {
      throw new Error(`pageSize debe ser un entero entre 1 y ${MAX_PAGE_SIZE}`);
    }
    const searchText = params.searchText?.trim() ? params.searchText.trim() : null;
    return new UserCriteria(
      searchText,
      params.role ?? null,
      params.sortField ?? "createdAt",
      params.sortDirection ?? "desc",
      page,
      pageSize,
    );
  }

  withPage(page: number): UserCriteria {
    return UserCriteria.create({
      searchText: this.searchText ?? undefined,
      role: this.role ?? undefined,
      sortField: this.sortField,
      sortDirection: this.sortDirection,
      page,
      pageSize: this.pageSize,
    });
  }
}
