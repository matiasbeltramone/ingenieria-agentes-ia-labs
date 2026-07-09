import type { Email } from "../../domain/value-objects/Email.ts";
import type { Otp } from "../../domain/value-objects/Otp.ts";

export interface OtpSender { send(email: Email, otp: Otp): Promise<void>; }
