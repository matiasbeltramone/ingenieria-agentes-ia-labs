export type Role = "admin" | "member";

// Entidad de dominio: sin dependencias de framework ni de base de datos.
export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
};
