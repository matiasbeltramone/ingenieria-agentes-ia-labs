import test from "node:test";
import assert from "node:assert/strict";
import { Email } from "../domain/value-objects/Email.ts";
import { DomainError } from "../../shared/DomainError.ts";

test("Email normaliza a minúsculas y sin espacios alrededor", () => {
  assert.equal(Email.create("  Ada@Example.COM ").value, "ada@example.com");
});

test("Email rechaza un formato inválido", () => {
  assert.throws(() => Email.create("no-es-un-email"), DomainError);
});
