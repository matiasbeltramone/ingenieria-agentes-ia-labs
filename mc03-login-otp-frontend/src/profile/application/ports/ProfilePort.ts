import type { Username } from "../../domain/value-objects/Username.ts";

export interface ProfilePort {
  updateName(name: Username): Promise<void>;
}
