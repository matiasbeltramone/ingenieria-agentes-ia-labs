// Resultado paginado genérico (vive en shared: lo usa cualquier módulo).
export type PageResult<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export function pageResult<T>(
  items: T[],
  page: number,
  pageSize: number,
  total: number,
): PageResult<T> {
  return {
    items,
    page,
    pageSize,
    total,
    totalPages: total === 0 ? 0 : Math.ceil(total / pageSize),
  };
}
