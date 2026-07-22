import test from "node:test";
import assert from "node:assert/strict";
import { OtpCode } from "../domain/value-objects/OtpCode.ts";
import { DomainError } from "../../shared/DomainError.ts";

test("OtpCode acepta seis dígitos", () => {
  assert.equal(OtpCode.create("123456").value, "123456");
});

test("OtpCode rechaza longitud o caracteres inválidos", () => {
  assert.throws(() => OtpCode.create("12ab56"), DomainError);
  assert.throws(() => OtpCode.create("12345"), DomainError);
});
