import test from "node:test";
import assert from "node:assert/strict";
import { Username } from "../domain/value-objects/Username.ts";
import { DomainError } from "../../shared/DomainError.ts";

test("Username recorta espacios alrededor", () => {
  assert.equal(Username.create("  Ada Lovelace  ").value, "Ada Lovelace");
});

test("Username rechaza nombres demasiado cortos", () => {
  assert.throws(() => Username.create("Al"), DomainError);
});
