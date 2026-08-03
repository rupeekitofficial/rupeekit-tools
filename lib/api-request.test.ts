import { describe, expect, it } from 'vitest';
import { MAX_API_BODY_BYTES, assertAllowedOrigin, readJsonBody } from './api-request';
import { CalculatorApiError } from './api-error';

async function expectApiError(promise: Promise<unknown>, status: number, code: string) {
  try {
    await promise;
    throw new Error('Expected request validation to fail.');
  } catch (error) {
    expect(error).toBeInstanceOf(CalculatorApiError);
    expect(error).toMatchObject({ status, code });
  }
}

describe('public API request validation', () => {
  it('accepts application/json with parameters', async () => {
    const request = new Request('https://example.test/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ inputs: { principal: 500000 } }),
    });

    await expect(readJsonBody(request)).resolves.toEqual({ inputs: { principal: 500000 } });
  });

  it('rejects non-JSON media types', async () => {
    const request = new Request('https://example.test/api', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: '{}',
    });

    await expectApiError(readJsonBody(request), 415, 'unsupported_media_type');
  });

  it('rejects malformed JSON', async () => {
    const request = new Request('https://example.test/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{',
    });

    await expectApiError(readJsonBody(request), 400, 'invalid_json');
  });

  it('rejects an actual UTF-8 body larger than the limit', async () => {
    const request = new Request('https://example.test/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: 'x'.repeat(MAX_API_BODY_BYTES) }),
    });

    await expectApiError(readJsonBody(request), 413, 'payload_too_large');
  });

  it('accepts missing or same-site Origin and rejects other browser origins', async () => {
    const allowed = 'https://www.rupeekit.co.in';
    expect(() => assertAllowedOrigin(new Request(`${allowed}/api/mcp`), allowed)).not.toThrow();
    expect(() => assertAllowedOrigin(new Request(`${allowed}/api/mcp`, {
      headers: { Origin: allowed },
    }), allowed)).not.toThrow();
    expect(() => assertAllowedOrigin(new Request(`${allowed}/api/mcp`, {
      headers: { Origin: 'https://example.com' },
    }), allowed)).toThrowError(/Origin is not allowed/);
  });
});
