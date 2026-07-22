import test from "node:test";
import assert from "node:assert/strict";
import { RequestOtp } from "../application/RequestOtp.ts";
import type { AuthPort, AuthToken } from "../application/ports/AuthPort.ts";
import type { Email } from "../domain/value-objects/Email.ts";
import type { OtpCode } from "../domain/value-objects/OtpCode.ts";

class StubAuthPort implements AuthPort {
  requestedFor: string | null = null;
  async requestOtp(email: Email): Promise<void> {
    this.requestedFor = email.value;
  }
  async verifyOtp(_email: Email, _code: OtpCode): Promise<AuthToken> {
    return "token";
  }
}

test("RequestOtp pide el OTP para el email normalizado", async () => {
  const auth = new StubAuthPort();
  await new RequestOtp(auth).execute("Ada@Example.com");
  assert.equal(auth.requestedFor, "ada@example.com");
});

test("RequestOtp no llama al puerto si el email es inválido", async () => {
  const auth = new StubAuthPort();
  await assert.rejects(() => new RequestOtp(auth).execute("invalido"));
  assert.equal(auth.requestedFor, null);
});
