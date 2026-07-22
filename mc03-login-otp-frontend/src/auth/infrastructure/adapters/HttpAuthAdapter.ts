import type { AuthPort, AuthToken } from "../../application/ports/AuthPort.ts";
import type { Email } from "../../domain/value-objects/Email.ts";
import type { OtpCode } from "../../domain/value-objects/OtpCode.ts";
import type { HttpClient } from "../../../shared/HttpClient.ts";

export class HttpAuthAdapter implements AuthPort {
  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  async requestOtp(email: Email): Promise<void> {
    await this.http.post("/auth/request-otp", { email: email.value });
  }

  async verifyOtp(email: Email, code: OtpCode): Promise<AuthToken> {
    const response = await this.http.post<{ token: string }>("/auth/verify-otp", {
      email: email.value,
      code: code.value,
    });
    return response.token;
  }
}
