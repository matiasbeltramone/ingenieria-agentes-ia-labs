import type { Email } from "../../domain/value-objects/Email.ts";
import type { OtpCode } from "../../domain/value-objects/OtpCode.ts";

export type AuthToken = string;

export interface AuthPort {
  requestOtp(email: Email): Promise<void>;
  verifyOtp(email: Email, code: OtpCode): Promise<AuthToken>;
}
