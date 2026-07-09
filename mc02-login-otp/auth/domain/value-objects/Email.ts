import { DomainError } from "../../../shared/DomainError.ts";

export class Email {
  private static readonly FORMAT = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  readonly value: string;
  private constructor(value: string) { this.value = value; }

  static create(value: string): Email {
    if (!Email.FORMAT.test(value)) {
      throw DomainError.validation("Invalid email");
    }
    return new Email(value);
  }

  equals(other: Email): boolean { return this.value === other.value; }
}
