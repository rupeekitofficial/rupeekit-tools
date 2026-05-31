import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { Parser } from 'expr-eval';

const parser = new Parser({
  operators: {
    add: true,
    concatenate: false,
    conditional: false,
    divide: true,
    factorial: false,
    multiply: true,
    power: true,
    remainder: true,
    subtract: true,
    logical: false,
    comparison: false,
    in: false,
    assignment: false,
  },
});

type ToolInput = {
  key: string;
  default: number;
};

type ToolOutput = {
  key: string;
  formula: string;
};

type ToolRecord = {
  slug: string;
  inputs?: ToolInput[];
  outputs?: ToolOutput[];
};

function loadTools(): ToolRecord[] {
  const filePath = path.join(process.cwd(), 'data', 'tools.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as ToolRecord[];
}

describe('tool formula smoke test', () => {
  it('evaluates all tool output formulas with default inputs', () => {
    const tools = loadTools();

    for (const tool of tools) {
      const inputs = Array.isArray(tool.inputs) ? tool.inputs : [];
      const outputs = Array.isArray(tool.outputs) ? tool.outputs : [];
      const context: Record<string, number> = {};

      for (const input of inputs) {
        context[input.key] = Number.isFinite(input.default) ? input.default : 0;
      }

      for (const output of outputs) {
        const value = parser.parse(output.formula).evaluate(context);
        expect(
          Number.isFinite(value),
          `Expected finite value for ${tool.slug}:${output.key}, formula=${output.formula}`
        ).toBe(true);
        context[output.key] = value;
      }
    }
  });
});
