import test from "node:test";
import assert from "node:assert/strict";
import { VerifyOtp } from "../application/VerifyOtp.ts";
import type { AuthPort, AuthToken } from "../application/ports/AuthPort.ts";
import type { Email } from "../domain/value-objects/Email.ts";
import type { OtpCode } from "../domain/value-objects/OtpCode.ts";

class StubAuthPort implements AuthPort {
  verifyCalled = false;
  async requestOtp(_email: Email): Promise<void> {}
  async verifyOtp(email: Email, code: OtpCode): Promise<AuthToken> {
    this.verifyCalled = true;
    return `token-for-${email.value}-${code.value}`;
  }
}

test("VerifyOtp devuelve el token que da el puerto de auth", async () => {
  const token = await new VerifyOtp(new StubAuthPort()).execute("ada@example.com", "123456");
  assert.equal(token, "token-for-ada@example.com-123456");
});

test("VerifyOtp rechaza un código mal formado antes de llegar al puerto", async () => {
  const auth = new StubAuthPort();
  await assert.rejects(() => new VerifyOtp(auth).execute("ada@example.com", "bad"));
  assert.equal(auth.verifyCalled, false);
});
