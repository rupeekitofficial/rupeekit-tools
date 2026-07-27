import { describe, expect, it } from 'vitest';
import { mcpCalculateExample } from './api-docs-examples';
import { getToolBySlug } from './tools';

describe('API documentation examples', () => {
  it('keeps the published MCP calculation example aligned with the calculator contract', () => {
    const args = mcpCalculateExample.params.arguments;
    const calculator = getToolBySlug(args.slug);
    const documentedKeys = calculator?.inputs.map((input) => input.key);

    expect(calculator).toBeDefined();
    expect(Object.keys(args.inputs).every((key) => documentedKeys?.includes(key))).toBe(true);
    expect(Object.values(args.inputs).every((value) => Number.isFinite(value))).toBe(true);
  });
});
