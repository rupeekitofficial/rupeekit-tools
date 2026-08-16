'use client';

import { useMemo, useState } from 'react';
import type { Tool } from '@/lib/tools';
import { calculateEighthPayCommission } from '@/lib/calculators/search-growth';
import {
  CalculatorGovernanceStrip,
  NumericField,
  ResultCard,
  formatCurrency,
  formatNumber,
  numeric,
  type NumericValue,
} from './PriorityCalculatorPrimitives';

const FACTOR_SCENARIOS = [1.92, 2.08, 2.57, 2.86, 3];

export default function EighthPayCommissionCalculator({ tool }: { tool: Tool }) {
  const [currentBasic, setCurrentBasic] = useState<NumericValue>(44_900);
  const [currentDaPercent, setCurrentDaPercent] = useState<NumericValue>(60);
  const [currentHraPercent, setCurrentHraPercent] = useState(30);
  const [currentTransportAllowance, setCurrentTransportAllowance] = useState<NumericValue>(3_600);
  const [fitmentFactor, setFitmentFactor] = useState<NumericValue>(2.57);
  const [projectedDaPercent, setProjectedDaPercent] = useState<NumericValue>(0);
  const [projectedHraPercent, setProjectedHraPercent] = useState<NumericValue>(30);
  const [projectedTransportAllowance, setProjectedTransportAllowance] = useState<NumericValue>(3_600);

  const result = useMemo(() => calculateEighthPayCommission({
    currentBasic: numeric(currentBasic),
    currentDaPercent: numeric(currentDaPercent),
    currentHraPercent,
    currentTransportAllowance: numeric(currentTransportAllowance),
    fitmentFactor: numeric(fitmentFactor),
    projectedDaPercent: numeric(projectedDaPercent),
    projectedHraPercent: numeric(projectedHraPercent),
    projectedTransportAllowance: numeric(projectedTransportAllowance),
  }), [
    currentBasic,
    currentDaPercent,
    currentHraPercent,
    currentTransportAllowance,
    fitmentFactor,
    projectedDaPercent,
    projectedHraPercent,
    projectedTransportAllowance,
  ]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
        <p className="font-bold">Unofficial scenario calculator</p>
        <p className="mt-1">
          The 8th Central Pay Commission was constituted on 3 November 2025 and has 18 months to submit its report.
          No final fitment factor, pay matrix, implementation date, revised HRA or starting DA has been notified.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <div className="space-y-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-brandNavy">Current 7th CPC baseline</p>
            <h3 className="mt-1 text-lg font-bold text-brandDeepNavy">Enter current monthly pay components</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <NumericField id="eighth-current-basic" label="Current basic pay" unit="₹ / month" value={currentBasic} onChange={setCurrentBasic} step={100} />
            <NumericField
              id="eighth-current-da"
              label="Current DA"
              unit="% of basic"
              value={currentDaPercent}
              onChange={setCurrentDaPercent}
              max={200}
              step={1}
              help="Defaults to the officially approved 60% rate effective 1 January 2026."
            />
            <label htmlFor="eighth-current-hra" className="block">
              <span className="text-sm font-semibold text-slate-700">Current HRA city category</span>
              <select
                id="eighth-current-hra"
                value={currentHraPercent}
                onChange={(event) => setCurrentHraPercent(Number(event.target.value))}
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 font-semibold outline-none focus:border-brandNavy"
              >
                <option value={30}>X city — 30%</option>
                <option value={20}>Y city — 20%</option>
                <option value={10}>Z city — 10%</option>
              </select>
            </label>
            <NumericField id="eighth-current-ta" label="Current transport allowance" unit="₹ / month" value={currentTransportAllowance} onChange={setCurrentTransportAllowance} step={100} />
          </div>

          <div className="border-t border-slate-100 pt-5">
            <p className="text-xs font-bold uppercase tracking-wide text-brandNavy">Projected scenario</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label htmlFor="eighth-factor" className="block">
                <span className="text-sm font-semibold text-slate-700">Fitment-factor scenario</span>
                <select
                  id="eighth-factor"
                  value={fitmentFactor}
                  onChange={(event) => setFitmentFactor(Number(event.target.value))}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 font-semibold outline-none focus:border-brandNavy"
                >
                  {FACTOR_SCENARIOS.map((factor) => <option key={factor} value={factor}>{factor.toFixed(2)}× scenario</option>)}
                </select>
              </label>
              <NumericField id="eighth-custom-factor" label="Or enter a custom factor" unit="× current basic" value={fitmentFactor} onChange={setFitmentFactor} min={0.1} max={10} step={0.01} />
            </div>
          </div>

          <details className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <summary className="cursor-pointer text-sm font-bold text-brandDeepNavy">Advanced projected-allowance assumptions</summary>
            <p className="mt-2 text-xs leading-5 text-slate-600">
              These inputs are separate assumptions because the Commission has not notified them. Projected DA defaults to 0% so current DA is not counted twice.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <NumericField id="eighth-projected-da" label="Projected DA scenario" unit="% of revised basic" value={projectedDaPercent} onChange={setProjectedDaPercent} max={200} />
              <NumericField id="eighth-projected-hra" label="Projected HRA scenario" unit="% of revised basic" value={projectedHraPercent} onChange={setProjectedHraPercent} max={100} />
              <NumericField id="eighth-projected-ta" label="Projected transport allowance" unit="₹ / month" value={projectedTransportAllowance} onChange={setProjectedTransportAllowance} step={100} />
            </div>
          </details>
        </div>

        <div className="space-y-5">
          <div className="rounded-3xl border border-brandNavy/10 bg-brandNavy/5 p-5 shadow-sm md:p-6">
            <h3 className="text-lg font-bold text-brandDeepNavy">Basic-to-basic and gross-to-gross results</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <ResultCard label="Current gross baseline" value={formatCurrency(result.currentGross)} detail="Basic + current DA + current HRA + current TA" />
              <ResultCard label="Revised basic scenario" value={formatCurrency(result.revisedBasic)} detail={`${formatNumber(numeric(fitmentFactor), 2)}× current basic; current DA is not added again`} emphasis />
              <ResultCard label="Projected gross scenario" value={formatCurrency(result.projectedGross)} detail="Revised basic + only the projected allowances entered" />
              <ResultCard label="Gross-to-gross change" value={formatCurrency(result.grossChange)} detail={`${formatNumber(result.grossChangePercent, 1)}% versus the current gross baseline`} />
            </div>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">
              <p><strong>Current gross:</strong> {formatCurrency(result.currentBasic)} basic + {formatCurrency(result.currentDa)} DA + {formatCurrency(result.currentHra)} HRA + {formatCurrency(result.currentTransportAllowance)} TA.</p>
              <p className="mt-2"><strong>Basic increase only:</strong> {formatCurrency(result.basicIncrease)}. This is different from the gross-to-gross change above.</p>
            </div>
          </div>

          {numeric(projectedDaPercent) > 0 ? (
            <p className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-950">
              You entered a projected DA above 0%. It is included only as your scenario and is not an official 8th CPC rate.
            </p>
          ) : null}
        </div>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <h3 className="text-lg font-bold text-brandDeepNavy">Fitment scenarios side by side</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">This table compares revised basic pay only, which prevents uncertain allowances from obscuring the fitment calculation.</p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full min-w-[540px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr><th className="px-4 py-3">Scenario</th><th className="px-4 py-3 text-right">Revised basic</th><th className="px-4 py-3 text-right">Basic increase</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {FACTOR_SCENARIOS.map((factor) => {
                const revised = numeric(currentBasic) * factor;
                return <tr key={factor}><td className="px-4 py-3 font-semibold">{factor.toFixed(2)}×</td><td className="px-4 py-3 text-right">{formatCurrency(revised)}</td><td className="px-4 py-3 text-right">{formatCurrency(revised - numeric(currentBasic))}</td></tr>;
              })}
            </tbody>
          </table>
        </div>
      </section>

      <CalculatorGovernanceStrip tool={tool} />
    </div>
  );
}
