'use client';

import { useMemo, useState } from 'react';
import { Parser } from 'expr-eval';
import type { Tool } from '@/lib/tools';

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

function formatValue(value: number, format: string) {
  if (!Number.isFinite(value)) return 'Check inputs';
  if (format === 'currency') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  }
  if (format === 'percent') return `${value.toFixed(2)}%`;
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(value);
}

import {
  CalculatorResultSummary,
  CalculatorResultChart,
  CalculatorBreakdownTable,
  CalculatorScenarioComparison,
  CalculatorInsightBox,
} from './CalculatorVisualizations';
import { isAdvancedCalculator } from '@/lib/advanced-calculators';
import AdvancedCalculatorRenderer from '@/components/calculators/advanced/AdvancedCalculatorRenderer';

export default function Calculator({ tool }: { tool: Tool }) {
  if (isAdvancedCalculator(tool.slug)) {
    return <AdvancedCalculatorRenderer tool={tool} />;
  }
  return <StandardCalculator tool={tool} />;
}

function StandardCalculator({ tool }: { tool: Tool }) {
  const initialValues = useMemo(() => {
    return Object.fromEntries(tool.inputs.map((input) => [input.key, input.default]));
  }, [tool.inputs]);


  const [values, setValues] = useState<Record<string, number | ''>>(initialValues);

  const numericValues = useMemo(() => {
    const next: Record<string, number> = {};
    for (const [k, v] of Object.entries(values)) {
      next[k] = v === '' ? 0 : v;
    }
    return next;
  }, [values]);

  const results = useMemo(() => {
    const context: Record<string, number> = { ...numericValues };
    return tool.outputs.map((output) => {
      try {
        const value = parser.parse(output.formula).evaluate(context);
        context[output.key] = value;
        return { ...output, value, formatted: formatValue(value, output.format) };
      } catch (error) {
        return { ...output, value: Number.NaN, formatted: 'Check inputs' };
      }
    });
  }, [tool.outputs, numericValues]);

  const hasChart = useMemo(() => {
    return [
      'sip-calculator-india',
      'fd-calculator-india',
      'emi-calculator-india',
      'salary-in-hand-calculator-india',
      'gst-calculator-india',
      'income-tax-calculator-old-vs-new-regime-india',
      'hra-exemption-calculator-india',
      'gratuity-calculator-india',
      '80c-deduction-calculator-india',
    ].includes(tool.slug);
  }, [tool.slug]);

  const hasComparison = useMemo(() => {
    return [
      'sip-calculator-india',
      'fd-calculator-india',
      'emi-calculator-india',
      'salary-in-hand-calculator-india',
      'gst-calculator-india',
      'income-tax-calculator-old-vs-new-regime-india',
      'hra-exemption-calculator-india',
      'gratuity-calculator-india',
    ].includes(tool.slug);
  }, [tool.slug]);

  const hasBreakdown = useMemo(() => {
    return ['sip-calculator-india', 'fd-calculator-india', 'emi-calculator-india'].includes(tool.slug);
  }, [tool.slug]);

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-3xl border border-brandBorder bg-white p-5 shadow-sm md:p-8">
          <h2 className="text-xl font-bold text-brandDeepNavy">Enter your values</h2>
          <div className="mt-6 grid gap-5">
            {tool.inputs.map((input) => (
              <label key={input.key} className="block">
                <span className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-800">
                  {input.label}
                  {input.unit ? <span className="font-medium text-slate-500">{input.unit}</span> : null}
                </span>
                <input
                  type="number"
                  value={values[input.key] ?? ''}
                  min={input.min}
                  max={input.max}
                  step={input.step ?? 1}
                  onFocus={(e) => e.target.select()}
                  onChange={(event) => {
                    const val = event.target.value;
                    setValues((current) => ({
                      ...current,
                      [input.key]: val === '' ? '' : (Number.isFinite(Number(val)) ? Number(val) : 0),
                    }));
                  }}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-base font-semibold outline-none transition focus:border-brandNavy focus:bg-white focus:ring-4 focus:ring-brandNavy/10"
                />
                {input.help ? <span className="mt-2 block text-xs leading-5 text-slate-500">{input.help}</span> : null}
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-brandNavy/10 bg-brandNavy/5 p-5 shadow-sm md:p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-brandDeepNavy">Estimated results</h2>
            <div className="mt-6">
              <CalculatorResultSummary results={results} />
            </div>
          </div>
          <div className="mt-6">
            <p className="rounded-2xl bg-white/70 p-4 text-sm leading-6 text-brandMuted border border-brandBorder">
              This calculator gives an educational estimate. Verify final numbers with your payslip, lender, tax advisor or official source.
            </p>
          </div>
        </div>
      </section>

      {/* Visualizations (Chart & What-If Comparison) */}
      {(hasChart || hasComparison) && (
        <div className="grid gap-6 lg:grid-cols-2">
          {hasChart && <CalculatorResultChart tool={tool} values={numericValues} results={results} />}
          {hasComparison && <CalculatorScenarioComparison tool={tool} values={numericValues} />}
        </div>
      )}

      {/* Amortization/Compounding Schedule */}
      {hasBreakdown && <CalculatorBreakdownTable tool={tool} values={numericValues} />}

      {/* Dynamic Insight disclaimer box */}
      <CalculatorInsightBox />
    </div>
  );
}

