import { DomainError } from "../../../shared/DomainError.ts";

export class Username {
  readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(raw: string): Username {
    const value = raw.trim();
    if (value.length < 3) {
      throw new DomainError("El nombre debe tener al menos tres caracteres");
    }
    return new Username(value);
  }
}
