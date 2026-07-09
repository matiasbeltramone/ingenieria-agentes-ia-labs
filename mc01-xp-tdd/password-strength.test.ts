// Lista de casos (de simple a complejo), escrita ANTES de tocar el código:
//  1. contraseña que cumple todos los criterios         -> "strong"
//  2. contraseña demasiado corta (< 8)                  -> "weak"
//  3. sin mayúsculas                                     -> "weak"
//  4. sin minúsculas                                     -> "weak"
//  5. sin dígito                                         -> "weak"
//  6. sin carácter especial                              -> "weak"
import { test } from "node:test";
import assert from "node:assert/strict";
import { evaluatePasswordStrength } from "./password-strength.ts";

test("una contraseña que cumple todos los criterios es fuerte", () => {
  assert.equal(evaluatePasswordStrength("Abcdef1!"), "strong");
});

test("una contraseña de menos de 8 caracteres es débil", () => {
  assert.equal(evaluatePasswordStrength("Ab1!"), "weak");
});

test("sin mayúsculas es débil", () => {
  assert.equal(evaluatePasswordStrength("abcdef1!"), "weak");
});

test("sin minúsculas es débil", () => {
  assert.equal(evaluatePasswordStrength("ABCDEF1!"), "weak");
});

test("sin dígitos es débil", () => {
  assert.equal(evaluatePasswordStrength("Abcdefg!"), "weak");
});

test("sin carácter especial es débil", () => {
  assert.equal(evaluatePasswordStrength("Abcdefg1"), "weak");
});
