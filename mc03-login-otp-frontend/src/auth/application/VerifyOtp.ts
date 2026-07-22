import { Email } from "../domain/value-objects/Email.ts";
import { OtpCode } from "../domain/value-objects/OtpCode.ts";
import type { AuthPort, AuthToken } from "./ports/AuthPort.ts";

export class VerifyOtp {
  private readonly auth: AuthPort;

  constructor(auth: AuthPort) {
    this.auth = auth;
  }

  async execute(rawEmail: string, rawCode: string): Promise<AuthToken> {
    const email = Email.create(rawEmail);
    const code = OtpCode.create(rawCode);
    return this.auth.verifyOtp(email, code);
  }
}
