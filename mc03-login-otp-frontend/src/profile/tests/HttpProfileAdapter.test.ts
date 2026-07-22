import test from "node:test";
import assert from "node:assert/strict";
import { HttpProfileAdapter } from "../infrastructure/adapters/HttpProfileAdapter.ts";
import type { HttpClient } from "../../shared/HttpClient.ts";
import { Username } from "../domain/value-objects/Username.ts";

class FakeHttpClient implements HttpClient {
  calls: Array<{ method: string; path: string; body: unknown }> = [];
  async post<T>(path: string, body: unknown): Promise<T> {
    this.calls.push({ method: "POST", path, body });
    return {} as T;
  }
  async put<T>(path: string, body: unknown): Promise<T> {
    this.calls.push({ method: "PUT", path, body });
    return {} as T;
  }
}

test("HttpProfileAdapter actualiza el nombre con PUT /profile", async () => {
  const http = new FakeHttpClient();
  await new HttpProfileAdapter(http).updateName(Username.create("Ada Lovelace"));
  assert.deepEqual(http.calls, [
    { method: "PUT", path: "/profile", body: { fullName: "Ada Lovelace" } },
  ]);
});
