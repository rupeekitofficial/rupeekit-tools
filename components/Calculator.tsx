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
import DownloadHraChecklistButton from '@/components/hra/DownloadHraChecklistButton';

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

  const showHraRuleUpdate = tool.slug === 'hra-exemption-calculator-india';
  const hraEstimateSummary = useMemo(() => {
    if (!showHraRuleUpdate) return null;

    const salaryForHra =
      (numericValues.basicSalary ?? 0) +
      (numericValues.dearnessAllowance ?? 0) +
      (numericValues.commission ?? 0);
    const cityRatePercent = numericValues.cityRatePercent ?? 40;
    const salaryCapUsed = cityRatePercent >= 50 ? 50 : 40;
    const actualHraReceived = numericValues.hraReceived ?? 0;
    const rentMinusTenPercent = Math.max(0, (numericValues.rentPaid ?? 0) - salaryForHra * 0.1);
    const salaryCapAmount = salaryForHra * salaryCapUsed / 100;

    const resultExemption = results.find((item) => item.key === 'monthlyHraExemption')?.value;
    const estimatedExemptHra = typeof resultExemption === 'number' && Number.isFinite(resultExemption)
      ? resultExemption
      : Math.max(
          0,
          Math.min(actualHraReceived, salaryForHra * cityRatePercent / 100, rentMinusTenPercent)
        );
    const resultTaxable = results.find((item) => item.key === 'taxableHraMonthly')?.value;
    const taxableHra = typeof resultTaxable === 'number' && Number.isFinite(resultTaxable)
      ? resultTaxable
      : Math.max(0, actualHraReceived - estimatedExemptHra);

    return {
      salaryForHra,
      cityRatePercent,
      actualHraReceived,
      salaryCapUsed,
      salaryCapAmount,
      rentMinusTenPercent,
      estimatedExemptHra,
      taxableHra,
    };
  }, [showHraRuleUpdate, numericValues, results]);

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

            {hraEstimateSummary ? (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-slate-800">
                <p className="font-semibold text-emerald-900">Based on your inputs:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Actual HRA received: {formatValue(hraEstimateSummary.actualHraReceived, 'currency')}</li>
                  <li>Salary cap used: {hraEstimateSummary.salaryCapUsed}%</li>
                  <li>
                    Rent minus 10% of salary: {formatValue(hraEstimateSummary.rentMinusTenPercent, 'currency')}
                  </li>
                  <li>
                    Estimated exempt HRA: {formatValue(hraEstimateSummary.estimatedExemptHra, 'currency')}
                  </li>
                </ul>
              </div>
            ) : null}

            {showHraRuleUpdate ? (
              <div className="mt-6 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm leading-6 text-slate-800">
                <p className="text-[11px] font-bold uppercase tracking-wide text-sky-800">
                  Important FY 2026-27 update
                </p>
                <p className="mt-2">
                  Important FY 2026-27 update: Under Rule 279 of the Income-tax Rules, 2026, Mumbai, Kolkata, Delhi,
                  Chennai, Hyderabad, Pune, Ahmedabad and Bengaluru follow the 50% salary cap for HRA exemption. All
                  other cities use the 40% cap. Where the applicable employer declaration or prescribed form asks for
                  landlord details, keep the landlord name, address, PAN/Aadhaar where applicable, rent paid and
                  relationship with the landlord ready.
                </p>
                <DownloadHraChecklistButton
                  className="mt-4"
                  data={
                    hraEstimateSummary
                      ? {
                          basicSalary: numericValues.basicSalary,
                          dearnessAllowance: numericValues.dearnessAllowance,
                          commission: numericValues.commission,
                          hraReceived: numericValues.hraReceived,
                          rentPaid: numericValues.rentPaid,
                          cityRatePercent: hraEstimateSummary.cityRatePercent,
                          actualHra: hraEstimateSummary.actualHraReceived,
                          rentMinusTenPercent: hraEstimateSummary.rentMinusTenPercent,
                          salaryCapAmount: hraEstimateSummary.salaryCapAmount,
                          estimatedExemptHra: hraEstimateSummary.estimatedExemptHra,
                          taxableHra: hraEstimateSummary.taxableHra,
                        }
                      : undefined
                  }
                />
              </div>
            ) : null}
          </div>
          <div className="mt-6">
            <p className="rounded-2xl bg-white/70 p-4 text-sm leading-6 text-brandMuted border border-brandBorder">
              {showHraRuleUpdate
                ? 'This result is an estimate for educational use. RupeeKit does not provide tax, legal or filing advice. Your final exemption may depend on salary structure, employer policy, proof submission and applicable tax rules.'
                : 'This calculator gives an educational estimate. Verify final numbers with your payslip, lender, tax advisor or official source.'}
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

