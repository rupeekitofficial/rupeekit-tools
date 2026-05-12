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

export default function Calculator({ tool }: { tool: Tool }) {
  const initialValues = useMemo(() => {
    return Object.fromEntries(tool.inputs.map((input) => [input.key, input.default]));
  }, [tool.inputs]);

  const [values, setValues] = useState<Record<string, number>>(initialValues);

  const results = useMemo(() => {
    const context: Record<string, number> = { ...values };
    return tool.outputs.map((output) => {
      try {
        const value = parser.parse(output.formula).evaluate(context);
        context[output.key] = value;
        return { ...output, value, formatted: formatValue(value, output.format) };
      } catch (error) {
        return { ...output, value: Number.NaN, formatted: 'Check inputs' };
      }
    });
  }, [tool.outputs, values]);

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
        <h2 className="text-xl font-bold">Enter your values</h2>
        <div className="mt-6 grid gap-5">
          {tool.inputs.map((input) => (
            <label key={input.key} className="block">
              <span className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-800">
                {input.label}
                {input.unit ? <span className="font-medium text-slate-500">{input.unit}</span> : null}
              </span>
              <input
                type="number"
                value={values[input.key] ?? 0}
                min={input.min}
                max={input.max}
                step={input.step ?? 1}
                onChange={(event) => {
                  const next = Number(event.target.value);
                  setValues((current) => ({ ...current, [input.key]: Number.isFinite(next) ? next : 0 }));
                }}
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-base font-semibold outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"
              />
              {input.help ? <span className="mt-2 block text-xs leading-5 text-slate-500">{input.help}</span> : null}
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-sky-100 bg-sky-50 p-5 shadow-sm md:p-8">
        <h2 className="text-xl font-bold text-slate-950">Estimated results</h2>
        <div className="mt-6 grid gap-4">
          {results.map((result, index) => (
            <div key={result.key} className={`rounded-2xl bg-white p-4 shadow-sm ${index === results.length - 1 ? 'ring-2 ring-sky-200' : ''}`}>
              <p className="text-sm font-medium text-slate-500">{result.label}</p>
              <p className="mt-1 text-2xl font-black tracking-tight text-slate-950">{result.formatted}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 rounded-2xl bg-white/70 p-4 text-sm leading-6 text-slate-600">
          This calculator gives an educational estimate. Verify final numbers with your payslip, lender, tax advisor or official source.
        </p>
      </div>
    </section>
  );
}
