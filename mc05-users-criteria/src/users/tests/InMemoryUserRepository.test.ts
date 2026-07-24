import { test } from "node:test";
import assert from "node:assert/strict";
import type { User } from "../domain/User.ts";
import { UserCriteria } from "../domain/value-objects/UserCriteria.ts";
import { InMemoryUserRepository } from "../infrastructure/adapters/InMemoryUserRepository.ts";

// 12 usuarios con created_at creciente (u01 el más viejo, u12 el más nuevo).
function makeUsers(): User[] {
  return Array.from({ length: 12 }, (_, i) => {
    const n = i + 1;
    return {
      id: `u${String(n).padStart(2, "0")}`,
      name: `User ${String(n).padStart(2, "0")}`,
      email: `user${n}@example.com`,
      role: n % 3 === 0 ? "admin" : "member",
      createdAt: new Date(2026, 0, n),
    } satisfies User;
  });
}

test("default(): página 1 de 10, ordenada por created_at desc, total 12", async () => {
  const repo = new InMemoryUserRepository(makeUsers());
  const page = await repo.matching(UserCriteria.default());

  assert.equal(page.total, 12);
  assert.equal(page.totalPages, 2);
  assert.equal(page.items.length, 10);
  assert.equal(page.items[0].id, "u12"); // el más nuevo primero
  assert.equal(page.items[9].id, "u03");
});

test("paginación: la página 2 trae los 2 restantes", async () => {
  const repo = new InMemoryUserRepository(makeUsers());
  const page = await repo.matching(UserCriteria.default().withPage(2));

  assert.equal(page.page, 2);
  assert.equal(page.items.length, 2);
  assert.deepEqual(
    page.items.map((u) => u.id),
    ["u02", "u01"],
  );
});

test("filtro por rol: solo admins", async () => {
  const repo = new InMemoryUserRepository(makeUsers());
  const page = await repo.matching(UserCriteria.create({ role: "admin" }));

  assert.equal(page.total, 4); // u03, u06, u09, u12
  assert.ok(page.items.every((u) => u.role === "admin"));
});

test("filtro por texto: matchea nombre o email, sin distinguir mayúsculas", async () => {
  const repo = new InMemoryUserRepository(makeUsers());
  const page = await repo.matching(UserCriteria.create({ searchText: "USER5" }));

  assert.equal(page.total, 1);
  assert.equal(page.items[0].email, "user5@example.com");
});

test("orden por nombre ascendente", async () => {
  const repo = new InMemoryUserRepository(makeUsers());
  const page = await repo.matching(
    UserCriteria.create({ sortField: "name", sortDirection: "asc", pageSize: 3 }),
  );

  assert.deepEqual(
    page.items.map((u) => u.id),
    ["u01", "u02", "u03"],
  );
});

test("sin resultados: total 0 y totalPages 0", async () => {
  const repo = new InMemoryUserRepository(makeUsers());
  const page = await repo.matching(UserCriteria.create({ searchText: "nada-matchea" }));

  assert.equal(page.total, 0);
  assert.equal(page.totalPages, 0);
  assert.equal(page.items.length, 0);
});
