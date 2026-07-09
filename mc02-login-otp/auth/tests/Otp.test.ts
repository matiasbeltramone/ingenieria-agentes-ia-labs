// Casos del value object Otp (de simple a complejo):
//  1. acepta un código de 6 dígitos
//  2. no permite menos de 6 dígitos
//  3. no permite caracteres no numéricos
//  4. dos OTP con el mismo valor son iguales
//  5. genera un código de 6 dígitos
import { test } from "node:test";
import assert from "node:assert/strict";
import { Otp } from "../domain/value-objects/Otp.ts";

test("The Otp accepts a valid 6 digit code", () => {
  assert.equal(Otp.create("123456").value, "123456");
});

test("The Otp does not allow a code with less than 6 digits", () => {
  assert.throws(() => Otp.create("12345"), /OTP must be 6 digits/);
});

test("The Otp does not allow non-numeric characters", () => {
  assert.throws(() => Otp.create("12345a"), /OTP must be 6 digits/);
});

test("The Otp generates a 6 digit numeric code", () => {
  assert.match(Otp.generate().value, /^\d{6}$/);
});

test("The Otp considers two codes with the same value as equal", () => {
  assert.equal(Otp.create("123456").equals(Otp.create("123456")), true);
});
