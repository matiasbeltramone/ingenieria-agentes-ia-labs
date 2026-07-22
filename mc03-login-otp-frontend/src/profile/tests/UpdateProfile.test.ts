import test from "node:test";
import assert from "node:assert/strict";
import { UpdateProfile } from "../application/UpdateProfile.ts";
import type { ProfilePort } from "../application/ports/ProfilePort.ts";
import type { Username } from "../domain/value-objects/Username.ts";

class StubProfilePort implements ProfilePort {
  updatedTo: string | null = null;
  async updateName(name: Username): Promise<void> {
    this.updatedTo = name.value;
  }
}

test("UpdateProfile actualiza el nombre por el puerto", async () => {
  const profile = new StubProfilePort();
  await new UpdateProfile(profile).execute("Ada Lovelace");
  assert.equal(profile.updatedTo, "Ada Lovelace");
});

test("UpdateProfile no toca el puerto si el nombre es inválido", async () => {
  const profile = new StubProfilePort();
  await assert.rejects(() => new UpdateProfile(profile).execute("Al"));
  assert.equal(profile.updatedTo, null);
});
