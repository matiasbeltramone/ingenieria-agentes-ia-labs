import { DomainError } from "../../../shared/DomainError.ts";

export class OtpCode {
  readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(raw: string): OtpCode {
    const value = raw.trim();
    if (!/^\d{6}$/.test(value)) {
      throw new DomainError("Código OTP inválido: deben ser seis dígitos");
    }
    return new OtpCode(value);
  }
}
