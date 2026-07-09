import { test } from "node:test";
import assert from "node:assert/strict";
import { InMemoryOtpSessionRepository } from "../domain/repositories/OtpSessionRepository.ts";
import { Email } from "../domain/value-objects/Email.ts";
import { RequestOtp } from "../application/RequestOtp.ts";

// Spy del puerto externo: la ÚNICA excepción a "sin mocks" (caso de uso + puerto externo).
class SpyOtpSender {
  calls = 0;
  async send(): Promise<void> { this.calls++; }
}

test("The RequestOtp use case stores an OTP session for the given email", async () => {
  const sessions = new InMemoryOtpSessionRepository();   // in-memory real, NO mock
  const sender = new SpyOtpSender();
  const requestOtp = new RequestOtp(sessions, sender as any);

  await requestOtp.execute("ada@example.com");

  const saved = await sessions.findByEmail(Email.create("ada@example.com"));
  assert.ok(saved, "debería haber una sesión guardada");         // verifica ESTADO
  assert.match(saved!.otp.value, /^\d{6}$/);
});

test("The RequestOtp use case sends the OTP through the sender port", async () => {
  const sessions = new InMemoryOtpSessionRepository();
  const sender = new SpyOtpSender();
  const requestOtp = new RequestOtp(sessions, sender as any);

  await requestOtp.execute("ada@example.com");

  assert.equal(sender.calls, 1);                                 // verifica INTERACCIÓN (spy)
});
