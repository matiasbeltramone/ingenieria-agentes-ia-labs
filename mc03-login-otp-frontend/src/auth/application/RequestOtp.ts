import { Email } from "../domain/value-objects/Email.ts";
import type { AuthPort } from "./ports/AuthPort.ts";

export class RequestOtp {
  private readonly auth: AuthPort;

  constructor(auth: AuthPort) {
    this.auth = auth;
  }

  async execute(rawEmail: string): Promise<void> {
    const email = Email.create(rawEmail);
    await this.auth.requestOtp(email);
  }
}
