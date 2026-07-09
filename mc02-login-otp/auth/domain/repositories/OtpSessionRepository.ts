import { Email } from "../value-objects/Email.ts";
import { Otp } from "../value-objects/Otp.ts";

export interface OtpSession { email: Email; otp: Otp; }

export interface OtpSessionRepository {
  save(session: OtpSession): Promise<void>;
  findByEmail(email: Email): Promise<OtpSession | undefined>;
}

// Implementación real en memoria (NO es un mock).
export class InMemoryOtpSessionRepository implements OtpSessionRepository {
  private readonly sessions = new Map<string, OtpSession>();
  async save(session: OtpSession): Promise<void> {
    this.sessions.set(session.email.value, session);
  }
  async findByEmail(email: Email): Promise<OtpSession | undefined> {
    return this.sessions.get(email.value);
  }
}
