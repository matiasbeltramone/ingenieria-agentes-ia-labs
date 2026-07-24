import { test } from "node:test";
import assert from "node:assert/strict";
import type { User } from "../domain/User.ts";
import { SearchUsers } from "../application/SearchUsers.ts";
import { InMemoryUserRepository } from "../infrastructure/adapters/InMemoryUserRepository.ts";

const users: User[] = [
  { id: "u1", name: "Ada", email: "ada@example.com", role: "admin", createdAt: new Date(2026, 0, 1) },
  { id: "u2", name: "Beto", email: "beto@example.com", role: "member", createdAt: new Date(2026, 0, 2) },
  { id: "u3", name: "Ada Lovelace", email: "lovelace@example.com", role: "member", createdAt: new Date(2026, 0, 3) },
];

test("el caso de uso arma el criteria desde primitivos y devuelve la página", async () => {
  const search = new SearchUsers(new InMemoryUserRepository(users));

  const page = await search.execute({ searchText: "ada", pageSize: 10 });

  // Verifica el ESTADO (resultado), no la interacción: "ada" matchea a Ada y a
  // "Ada Lovelace" (por nombre); Beto queda afuera.
  assert.equal(page.total, 2);
  assert.deepEqual(
    page.items.map((u) => u.id).sort(),
    ["u1", "u3"],
  );
});

test("primitivos inválidos en el borde: el caso de uso falla al construir el criteria", async () => {
  const search = new SearchUsers(new InMemoryUserRepository(users));
  await assert.rejects(() => search.execute({ page: 0 }), /page/);
});
