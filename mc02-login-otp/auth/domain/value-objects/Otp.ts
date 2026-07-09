import { DomainError } from "../../../shared/DomainError.ts";

export class Otp {
  private static readonly SIX_DIGITS = /^\d{6}$/;
  readonly value: string;
  private constructor(value: string) { this.value = value; }

  static create(value: string): Otp {
    if (!Otp.SIX_DIGITS.test(value)) {
      throw DomainError.validation("OTP must be 6 digits");
    }
    return new Otp(value);
  }

  static generate(): Otp {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    return new Otp(code);
  }

  equals(other: Otp): boolean { return this.value === other.value; }
}
