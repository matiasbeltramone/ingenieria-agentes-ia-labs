import { Email } from "../domain/value-objects/Email.ts";
import { Otp } from "../domain/value-objects/Otp.ts";
import type { OtpSessionRepository } from "../domain/repositories/OtpSessionRepository.ts";
import type { OtpSender } from "./ports/OtpSender.ts";

export class RequestOtp {
  private readonly sessions: OtpSessionRepository;
  private readonly sender: OtpSender;
  constructor(sessions: OtpSessionRepository, sender: OtpSender) {
    this.sessions = sessions;
    this.sender = sender;
  }
  async execute(rawEmail: string): Promise<void> {
    const email = Email.create(rawEmail);
    const otp = Otp.generate();
    await this.sessions.save({ email, otp });
    await this.sender.send(email, otp);
  }
}
