export function extractDigits(value: string): string {
  return value.replace(/[^\d]/g, '');
}

export function stripLeadingZeros(value: string): string {
  return value.replace(/^0+(?=\d)/, '');
}

export function parseIntegerFromTextInput(value: string): number {
  const digits = stripLeadingZeros(extractDigits(value));
  if (digits.length === 0) return 0;

  const parsed = Number(digits);
  return Number.isFinite(parsed) ? parsed : 0;
}
