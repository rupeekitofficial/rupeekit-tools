import { CalculatorApiError } from './api-error';

export const MAX_API_BODY_BYTES = 16 * 1024;

export async function readJsonBody(request: Request): Promise<unknown> {
  const contentType = request.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase();
  if (contentType !== 'application/json' && !contentType?.endsWith('+json')) {
    throw new CalculatorApiError(
      415,
      'unsupported_media_type',
      'Content-Type must be application/json.'
    );
  }

  const declaredLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_API_BODY_BYTES) {
    throw new CalculatorApiError(
      413,
      'payload_too_large',
      `Request body must not exceed ${MAX_API_BODY_BYTES} bytes.`
    );
  }

  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > MAX_API_BODY_BYTES) {
    throw new CalculatorApiError(
      413,
      'payload_too_large',
      `Request body must not exceed ${MAX_API_BODY_BYTES} bytes.`
    );
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new CalculatorApiError(400, 'invalid_json', 'Request body must contain valid JSON.');
  }
}

export function assertAllowedOrigin(request: Request, allowedOrigin: string) {
  const origin = request.headers.get('origin');
  if (origin && origin !== allowedOrigin) {
    throw new CalculatorApiError(403, 'forbidden_origin', 'The request Origin is not allowed.');
  }
}

export const API_RESPONSE_HEADERS = {
  'Cache-Control': 'no-store',
  'Referrer-Policy': 'no-referrer',
  'X-API-Version': '1.0',
  'X-Content-Type-Options': 'nosniff',
} as const;
