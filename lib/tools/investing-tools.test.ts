import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { Parser } from 'expr-eval';

type FormulaTool = {
  slug: string;
  inputs: Array<{ key: string; default: number }>;
  outputs: Array<{ key: string; formula: string }>;
};

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

function loadInvestingTools() {
  const file = path.join(process.cwd(), 'data', 'investing-tools-2026.json');
  return JSON.parse(fs.readFileSync(file, 'utf8')) as FormulaTool[];
}

function evaluate(tool: FormulaTool) {
  const context: Record<string, number> = Object.fromEntries(
    tool.inputs.map((input) => [input.key, input.default])
  );
  for (const output of tool.outputs) {
    context[output.key] = parser.parse(output.formula).evaluate(context);
  }
  return context;
}

describe('investing calculator formulas', () => {
  it('matches the independent weighted-holding spreadsheet benchmark', () => {
    const tool = loadInvestingTools().find((item) => item.slug === 'xirr-portfolio-return-calculator-india');
    expect(tool).toBeDefined();

    const result = evaluate(tool!);

    expect(result.totalInvested).toBe(500_000);
    expect(result.weightedHoldingYears).toBeCloseTo(2.4, 10);
    expect(result.absoluteReturn).toBeCloseTo(20, 10);
    expect(result.annualisedReturnApprox).toBeCloseTo(7.892731, 6);
  });

  it('matches spreadsheet POWER and LN doubling-time benchmarks', () => {
    const tool = loadInvestingTools().find((item) => item.slug === 'rule-of-72-calculator-india');
    expect(tool).toBeDefined();

    const result = evaluate(tool!);

    expect(result.ruleOf72Years).toBeCloseTo(6, 10);
    expect(result.exactDoublingYears).toBeCloseTo(6.116255, 6);
    expect(result.yearsAt8Percent).toBeCloseTo(9, 10);
    expect(result.yearsAt10Percent).toBeCloseTo(7.2, 10);
    expect(result.yearsAt12Percent).toBeCloseTo(6, 10);
    expect(result.yearsAt15Percent).toBeCloseTo(4.8, 10);
  });
});
