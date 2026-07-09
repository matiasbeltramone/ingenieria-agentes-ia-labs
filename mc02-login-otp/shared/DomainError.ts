export class DomainError extends Error {
  readonly kind: string;
  private constructor(message: string, kind: string) {
    super(message);
    this.kind = kind;
  }
  static validation(message: string): DomainError {
    return new DomainError(message, "validation");
  }
  static notFound(message: string): DomainError {
    return new DomainError(message, "not_found");
  }
}
