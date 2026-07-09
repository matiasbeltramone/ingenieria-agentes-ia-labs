const LONGITUD_MINIMA = 8;

export function evaluatePasswordStrength(password: string) {
  if (password.length < LONGITUD_MINIMA) return "weak";
  if (!/[A-Z]/.test(password)) return "weak";
  if (!/[a-z]/.test(password)) return "weak";
  if (!/[0-9]/.test(password)) return "weak";
  if (!/[^A-Za-z0-9]/.test(password)) return "weak";
  return "strong";
}
