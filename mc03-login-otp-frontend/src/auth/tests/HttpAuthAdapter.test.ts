import test from "node:test";
import assert from "node:assert/strict";
import { HttpAuthAdapter } from "../infrastructure/adapters/HttpAuthAdapter.ts";
import type { HttpClient } from "../../shared/HttpClient.ts";
import { Email } from "../domain/value-objects/Email.ts";
import { OtpCode } from "../domain/value-objects/OtpCode.ts";

class FakeHttpClient implements HttpClient {
  calls: Array<{ method: string; path: string; body: unknown }> = [];
  response: unknown = {};
  async post<T>(path: string, body: unknown): Promise<T> {
    this.calls.push({ method: "POST", path, body });
    return this.response as T;
  }
  async put<T>(path: string, body: unknown): Promise<T> {
    this.calls.push({ method: "PUT", path, body });
    return this.response as T;
  }
}

test("HttpAuthAdapter pide el OTP contra el endpoint con el email", async () => {
  const http = new FakeHttpClient();
  await new HttpAuthAdapter(http).requestOtp(Email.create("ada@example.com"));
  assert.deepEqual(http.calls, [
    { method: "POST", path: "/auth/request-otp", body: { email: "ada@example.com" } },
  ]);
});

test("HttpAuthAdapter verifica el OTP y devuelve el token de la respuesta", async () => {
  const http = new FakeHttpClient();
  http.response = { token: "abc123" };
  const token = await new HttpAuthAdapter(http).verifyOtp(
    Email.create("ada@example.com"),
    OtpCode.create("123456"),
  );
  assert.equal(token, "abc123");
});
