'use client';

import DownloadEmergencyFundPlanButton from '@/components/emergency-fund/DownloadEmergencyFundPlanButton';
import type { EmergencyFundPlanPdfData } from '@/components/emergency-fund/EmergencyFundPlanPdfDocument';

interface EmergencyFundVisualBreakdownProps {
  monthlySurvivalCost: number;
  targetEmergencyFund: number;
  currentEmergencySavings: number;
  currentShortfall: number;
  monthsToReachTarget: number;
  targetMonths: number;
  milestones: Array<{
    months: number;
    amount: number;
  }>;
  targetWithBuffer?: number;
  reportData?: Partial<EmergencyFundPlanPdfData>;
}

function formatCurrency(value: number) {
  if (!Number.isFinite(value)) return 'Rs 0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatMonths(value: number) {
  if (!Number.isFinite(value)) return '0';
  return value < 1 ? value.toFixed(1) : value.toFixed(1);
}

export default function EmergencyFundVisualBreakdown({
  monthlySurvivalCost,
  targetEmergencyFund,
  currentEmergencySavings,
  currentShortfall,
  monthsToReachTarget,
  targetMonths,
  milestones,
  targetWithBuffer,
  reportData,
}: EmergencyFundVisualBreakdownProps) {
  const safeTarget = Math.max(0, targetEmergencyFund);
  const safeSavings = Math.max(0, currentEmergencySavings);
  const safeShortfall = Math.max(0, currentShortfall);
  const progressPercent = safeTarget > 0 ? Math.min(100, (safeSavings / safeTarget) * 100) : 0;
  const gapMax = Math.max(safeTarget, safeSavings, safeShortfall, 1);
  const milestoneMax = Math.max(...milestones.map((item) => item.amount), 1);

  const gapBars = [
    { label: 'Target fund', value: safeTarget, color: 'bg-brandDeepNavy' },
    { label: 'Current savings', value: safeSavings, color: 'bg-emerald-600' },
    { label: 'Shortfall', value: safeShortfall, color: 'bg-amber-500' },
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-brandDeepNavy">Emergency Fund Milestone Track</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Compare your monthly survival cost across 3, 6, 9 and 12 month safety milestones.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {milestones.map((item) => (
          <div
            key={item.months}
            className={`rounded-2xl border p-4 ${
              item.months === targetMonths
                ? 'border-emerald-300 bg-emerald-50'
                : 'border-slate-200 bg-slate-50'
            }`}
          >
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{item.months}-month fund</p>
            <p className="mt-2 text-lg font-black text-brandDeepNavy">{formatCurrency(item.amount)}</p>
            {item.months === targetMonths ? (
              <p className="mt-1 text-xs font-semibold text-emerald-700">Current target</p>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="text-base font-bold text-brandDeepNavy">Current Progress</h3>
          <p className="mt-1 text-xs leading-5 text-slate-600">
            Progress is shown against your selected target corpus.
          </p>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-700">
            Current savings: {formatCurrency(safeSavings)} ({progressPercent.toFixed(1)}% of target)
          </p>
          <p className="mt-1 text-sm text-slate-600">Target corpus: {formatCurrency(safeTarget)}</p>
          {typeof targetWithBuffer === 'number' && Number.isFinite(targetWithBuffer) ? (
            <p className="mt-1 text-xs text-slate-500">
              Target with buffer: {formatCurrency(Math.max(0, targetWithBuffer))}
            </p>
          ) : null}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="text-base font-bold text-brandDeepNavy">Shortfall Breakdown</h3>
          <p className="mt-1 text-xs leading-5 text-slate-600">
            Snapshot of target corpus, available savings and remaining shortfall.
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
              <span className="text-xs font-semibold text-slate-600">Monthly survival cost</span>
              <span className="text-sm font-bold text-brandDeepNavy">{formatCurrency(monthlySurvivalCost)}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
              <span className="text-xs font-semibold text-slate-600">Target emergency fund</span>
              <span className="text-sm font-bold text-brandDeepNavy">{formatCurrency(safeTarget)}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
              <span className="text-xs font-semibold text-slate-600">Current savings</span>
              <span className="text-sm font-bold text-brandDeepNavy">{formatCurrency(safeSavings)}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 px-3 py-2">
              <span className="text-xs font-semibold text-amber-800">Remaining shortfall</span>
              <span className="text-sm font-bold text-amber-900">{formatCurrency(safeShortfall)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="text-base font-bold text-brandDeepNavy">Emergency Fund Gap Chart</h3>
          <p className="mt-1 text-xs leading-5 text-slate-600">
            Compare target corpus, current savings and current shortfall in one view.
          </p>
          <div className="mt-4 space-y-3">
            {gapBars.map((item) => {
              const widthPercent = Math.min(100, (item.value / gapMax) * 100);
              return (
                <div key={item.label}>
                  <div className="mb-1 flex items-center justify-between text-xs text-slate-600">
                    <span>{item.label}</span>
                    <span className="font-semibold text-slate-800">{formatCurrency(item.value)}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${widthPercent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="text-base font-bold text-brandDeepNavy">3 vs 6 vs 9 vs 12 Month Comparison</h3>
          <p className="mt-1 text-xs leading-5 text-slate-600">
            Compare how your corpus target changes as coverage months increase.
          </p>
          <div className="mt-4 grid grid-cols-4 items-end gap-3">
            {milestones.map((item) => {
              const heightPercent = Math.max(10, Math.round((item.amount / milestoneMax) * 100));
              return (
                <div key={item.months} className="min-w-0">
                  <div className="flex h-40 items-end rounded-xl bg-slate-100 p-1.5">
                    <div
                      className={`w-full rounded-lg ${
                        item.months === targetMonths ? 'bg-emerald-600' : 'bg-brandDeepNavy'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                      aria-label={`${item.months} months: ${formatCurrency(item.amount)}`}
                    />
                  </div>
                  <p className="mt-2 text-center text-[11px] font-bold text-slate-700">{item.months}m</p>
                  <p className="mt-1 text-center text-[11px] font-semibold text-slate-600">
                    {formatCurrency(item.amount)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-sky-200 bg-sky-50 p-4">
        <h3 className="text-base font-bold text-brandDeepNavy">Time to Goal</h3>
        <p className="mt-1 text-sm leading-6 text-slate-700">
          At your current monthly saving pace, you may need about{' '}
          <span className="font-bold text-brandDeepNavy">{formatMonths(Math.max(0, monthsToReachTarget))} months</span>{' '}
          to reach this target corpus.
        </p>
      </div>

      <DownloadEmergencyFundPlanButton className="mt-4" data={reportData} />
    </section>
  );
}
