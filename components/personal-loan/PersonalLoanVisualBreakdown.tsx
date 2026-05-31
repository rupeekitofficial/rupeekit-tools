'use client';

import DownloadPersonalLoanReportButton from '@/components/personal-loan/DownloadPersonalLoanReportButton';
import type {
  PersonalLoanEmiReportPdfData,
  PersonalLoanTenureRow,
} from '@/components/personal-loan/PersonalLoanEmiReportPdfDocument';

interface PersonalLoanVisualBreakdownProps {
  principal: number;
  totalInterestForSelectedTenure: number;
  emiToIncomePercent: number;
  tenureRows: PersonalLoanTenureRow[];
  reportData?: Partial<PersonalLoanEmiReportPdfData>;
}

function formatCurrency(value: number) {
  if (!Number.isFinite(value)) return 'Rs 0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value: number) {
  if (!Number.isFinite(value)) return '0.00%';
  return `${value.toFixed(2)}%`;
}

function VerticalBarChart({
  title,
  subtitle,
  rows,
  valueKey,
  barColorClass,
}: {
  title: string;
  subtitle: string;
  rows: PersonalLoanTenureRow[];
  valueKey: 'monthlyEmi' | 'totalInterest';
  barColorClass: string;
}) {
  const maxValue = Math.max(...rows.map((row) => row[valueKey]), 1);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <h3 className="text-base font-bold text-brandDeepNavy">{title}</h3>
      <p className="mt-1 text-xs leading-5 text-slate-600">{subtitle}</p>

      <div className="mt-4 grid grid-cols-5 items-end gap-3">
        {rows.map((row) => {
          const value = row[valueKey];
          const height = Math.max(10, Math.round((value / maxValue) * 100));

          return (
            <div key={row.tenure} className="min-w-0">
              <div className="flex h-40 items-end rounded-xl bg-slate-100 p-1.5">
                <div
                  className={`w-full rounded-lg ${barColorClass}`}
                  style={{ height: `${height}%` }}
                  aria-label={`${row.tenure} months: ${formatCurrency(value)}`}
                />
              </div>
              <p className="mt-2 text-center text-[11px] font-bold text-slate-700">{row.tenure}m</p>
              <p className="mt-1 text-center text-[11px] font-semibold text-slate-600">
                {formatCurrency(value)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PrincipalInterestDonut({
  principal,
  totalInterest,
}: {
  principal: number;
  totalInterest: number;
}) {
  const safePrincipal = Math.max(0, principal);
  const safeInterest = Math.max(0, totalInterest);
  const total = safePrincipal + safeInterest;
  const principalPct = total > 0 ? safePrincipal / total : 0;
  const interestPct = total > 0 ? safeInterest / total : 0;

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const principalLength = circumference * principalPct;
  const interestLength = circumference * interestPct;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <h3 className="text-base font-bold text-brandDeepNavy">Principal vs Interest</h3>
      <p className="mt-1 text-xs leading-5 text-slate-600">
        Current selected tenure split between principal and total interest.
      </p>

      <div className="mt-4 flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative h-44 w-44">
          <svg
            viewBox="0 0 100 100"
            className="h-full w-full -rotate-90"
            role="img"
            aria-label="Donut chart showing selected personal loan split between principal amount and total interest."
          >
            <circle cx="50" cy="50" r={radius} fill="transparent" stroke="#e2e8f0" strokeWidth="12" />
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="#003080"
              strokeWidth="12"
              strokeDasharray={`${principalLength} ${Math.max(circumference - principalLength, 0)}`}
              strokeDashoffset={0}
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="#43A047"
              strokeWidth="12"
              strokeDasharray={`${interestLength} ${Math.max(circumference - interestLength, 0)}`}
              strokeDashoffset={-principalLength}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Total cost</p>
            <p className="mt-1 text-sm font-black text-brandDeepNavy">{formatCurrency(total)}</p>
          </div>
        </div>

        <div className="w-full space-y-3 md:max-w-xs">
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
            <p className="text-xs font-semibold text-slate-500">Principal</p>
            <p className="mt-1 text-sm font-bold text-brandDeepNavy">{formatCurrency(safePrincipal)}</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
            <p className="text-xs font-semibold text-slate-500">Total interest</p>
            <p className="mt-1 text-sm font-bold text-brandDeepNavy">{formatCurrency(safeInterest)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmiBurdenProgress({
  emiToIncomePercent,
}: {
  emiToIncomePercent: number;
}) {
  const safePercent = Math.max(0, emiToIncomePercent);
  const markerPosition = Math.min(100, safePercent);
  const isHigh = safePercent >= 50;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <h3 className="text-base font-bold text-brandDeepNavy">EMI Burden Progress</h3>
      <p className="mt-1 text-xs leading-5 text-slate-600">
        EMI as a share of monthly income can help compare affordability across tenures.
      </p>

      <div className="mt-4">
        <div className="relative h-4 overflow-hidden rounded-full bg-slate-100">
          <div className="absolute inset-y-0 left-0 w-[30%] bg-emerald-500/60" />
          <div className="absolute inset-y-0 left-[30%] w-[20%] bg-amber-400/70" />
          <div className="absolute inset-y-0 left-[50%] right-0 bg-rose-400/70" />
          <div
            className="absolute -top-1 h-6 w-1 rounded-full bg-brandDeepNavy"
            style={{ left: `calc(${markerPosition}% - 2px)` }}
          />
        </div>

        <div className="mt-3 flex justify-between text-[11px] font-semibold text-slate-600">
          <span>Comfortable range</span>
          <span>Watch range</span>
          <span>High burden range</span>
        </div>

        <p className="mt-3 text-sm font-bold text-brandDeepNavy">
          EMI as % of income: {formatPercent(safePercent)}
        </p>
        <p className="mt-2 text-xs leading-5 text-slate-600">
          This indicator is only a budgeting estimate. It is not loan eligibility, approval advice, or financial
          advice.
        </p>

        {isHigh ? (
          <p className="mt-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
            Your EMI burden may feel high compared with your monthly income. Consider comparing tenure, loan amount
            and lender terms before applying.
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default function PersonalLoanVisualBreakdown({
  principal,
  totalInterestForSelectedTenure,
  emiToIncomePercent,
  tenureRows,
  reportData,
}: PersonalLoanVisualBreakdownProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-brandDeepNavy">Visual Loan Breakdown</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        A lower EMI is not always cheaper. Compare EMI and total interest together before choosing a loan tenure.
      </p>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <VerticalBarChart
          title="EMI vs Tenure"
          subtitle="Monthly EMI across common tenures"
          rows={tenureRows}
          valueKey="monthlyEmi"
          barColorClass="bg-brandDeepNavy"
        />
        <VerticalBarChart
          title="Total Interest vs Tenure"
          subtitle="Total interest paid across common tenures"
          rows={tenureRows}
          valueKey="totalInterest"
          barColorClass="bg-brandGrowthGreen"
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <PrincipalInterestDonut
          principal={principal}
          totalInterest={totalInterestForSelectedTenure}
        />
        <EmiBurdenProgress emiToIncomePercent={emiToIncomePercent} />
      </div>

      <p className="mt-5 rounded-2xl border border-sky-200 bg-sky-50 p-3 text-xs leading-5 text-slate-700">
        RupeeKit does not show live personal loan interest rates. Enter the official rate offered by your lender and
        verify fees, eligibility, prepayment and foreclosure charges before applying.
      </p>

      <DownloadPersonalLoanReportButton className="mt-4" data={reportData} />
    </section>
  );
}
