import { test } from "node:test";
import assert from "node:assert/strict";
import { UserCriteria } from "../domain/value-objects/UserCriteria.ts";

test("default(): sin texto, sin rol, orden created_at desc, página 1, 10 elementos", () => {
  const c = UserCriteria.default();
  assert.equal(c.searchText, null);
  assert.equal(c.role, null);
  assert.equal(c.sortField, "createdAt");
  assert.equal(c.sortDirection, "desc");
  assert.equal(c.page, 1);
  assert.equal(c.pageSize, 10);
});

test("create(): recorta el texto de búsqueda y trata el vacío como null", () => {
  assert.equal(UserCriteria.create({ searchText: "  ada  " }).searchText, "ada");
  assert.equal(UserCriteria.create({ searchText: "   " }).searchText, null);
});

test("create(): rechaza página fuera de rango", () => {
  assert.throws(() => UserCriteria.create({ page: 0 }), /page/);
  assert.throws(() => UserCriteria.create({ page: 1.5 }), /page/);
});

test("create(): rechaza pageSize fuera de rango", () => {
  assert.throws(() => UserCriteria.create({ pageSize: 0 }), /pageSize/);
  assert.throws(() => UserCriteria.create({ pageSize: 101 }), /pageSize/);
});

test("withPage(): cambia la página conservando el resto", () => {
  const c = UserCriteria.create({ role: "admin", pageSize: 5 }).withPage(3);
  assert.equal(c.page, 3);
  assert.equal(c.role, "admin");
  assert.equal(c.pageSize, 5);
});
