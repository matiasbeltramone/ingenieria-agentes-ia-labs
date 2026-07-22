import { Username } from "../domain/value-objects/Username.ts";
import type { ProfilePort } from "./ports/ProfilePort.ts";

export class UpdateProfile {
  private readonly profile: ProfilePort;

  constructor(profile: ProfilePort) {
    this.profile = profile;
  }

  async execute(rawName: string): Promise<void> {
    const name = Username.create(rawName);
    await this.profile.updateName(name);
  }
}
