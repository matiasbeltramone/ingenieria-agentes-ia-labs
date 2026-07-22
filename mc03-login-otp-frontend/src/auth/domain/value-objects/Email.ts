import { DomainError } from "../../../shared/DomainError.ts";

export class Email {
  readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(raw: string): Email {
    const value = raw.trim().toLowerCase();
    if (!Email.isValid(value)) {
      throw new DomainError(`Email inválido: "${raw}"`);
    }
    return new Email(value);
  }

  private static isValid(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
}
