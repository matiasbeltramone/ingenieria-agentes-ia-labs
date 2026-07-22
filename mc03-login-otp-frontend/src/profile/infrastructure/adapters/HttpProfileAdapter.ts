import type { ProfilePort } from "../../application/ports/ProfilePort.ts";
import type { Username } from "../../domain/value-objects/Username.ts";
import type { HttpClient } from "../../../shared/HttpClient.ts";

export class HttpProfileAdapter implements ProfilePort {
  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  async updateName(name: Username): Promise<void> {
    await this.http.put("/profile", { fullName: name.value });
  }
}
