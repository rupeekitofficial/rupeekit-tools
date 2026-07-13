'use client';

import Link from 'next/link';

const BROKERS = [
  {
    name: 'Zerodha',
    tagline: 'Best for simplicity & beginners',
    delivery: 'Zero',
    intraday: 'Rs 20/order',
    amc: 'Rs 300/yr (free yr 1)',
    accountType: '2-in-1',
    platform: 'Kite (web + mobile)',
    mf: 'Zerodha Coin — direct plans, zero commission',
    research: 'Varsity (free education) — no advisory',
    nri: 'Not available',
    bestFor: 'First-time investors, long-term buy-and-hold, MF via direct plans',
    href: 'https://zerodha.com/open-account?c=IZ8333',
    label: 'Open Zerodha Account',
  },
  {
    name: 'Upstox',
    tagline: 'Best for active traders',
    delivery: 'Zero',
    intraday: 'Rs 20/order',
    amc: 'Rs 300/yr (free yr 1)',
    accountType: '3-in-1 (trading + demat + savings)',
    platform: 'Pro Web + Pro Mobile',
    mf: 'Direct plans via Upstox MF',
    research: 'Options analytics, stock screeners',
    nri: 'Not available',
    bestFor: 'Active F&O traders, investors wanting 3-in-1 bank linkage',
    href: 'https://upstox.onelink.me/0H1s/ZT66',
    label: 'Open Upstox Account',
  },
  {
    name: 'Angel One',
    tagline: 'Best for research & NRI',
    delivery: 'Zero',
    intraday: 'Rs 20/order',
    amc: 'Rs 240/yr',
    accountType: '2-in-1',
    platform: 'Angel One app',
    mf: 'Direct plans via app',
    research: 'ARQ Prime AI advisory, research reports',
    nri: 'NRI trading accounts available',
    bestFor: 'Investors wanting advisory, NRIs, beginners who want guidance',
    href: 'https://angel-one.onelink.me/Wjgr/jbmek9om',
    label: 'Open Angel One Account',
  },
] as const;

const COMPARISON_ROWS: { label: string; key: keyof typeof BROKERS[0] }[] = [
  { label: 'Delivery Brokerage', key: 'delivery' },
  { label: 'Intraday / F&O', key: 'intraday' },
  { label: 'Demat AMC', key: 'amc' },
  { label: 'Account Type', key: 'accountType' },
  { label: 'Platform', key: 'platform' },
  { label: 'Mutual Funds', key: 'mf' },
  { label: 'Research / Advisory', key: 'research' },
  { label: 'NRI Trading', key: 'nri' },
  { label: 'Best For', key: 'bestFor' },
];

export default function BrokerComparisonCard() {
  return (
    <div className="my-8 rounded-3xl border border-brandBorder bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 bg-gradient-to-r from-brandDeepNavy to-brandNavy text-white">
        <span className="inline-block rounded-full bg-brandGrowthGreen/15 border border-brandGrowthGreen/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brandBrightGreen mb-2">
          Broker Comparison 2026
        </span>
        <h3 className="text-lg font-black tracking-tight">Zerodha vs Upstox vs Angel One</h3>
        <p className="text-xs text-slate-300 mt-1">Charges, features, and platform — side by side.</p>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th className="text-left px-5 py-3 bg-slate-50 border-b border-brandBorder text-[10px] font-bold uppercase tracking-wide text-brandMuted w-40" />
              {BROKERS.map(b => (
                <th key={b.name} className="px-4 py-3 bg-slate-50 border-b border-brandBorder text-center">
                  <div className="font-black text-brandDeepNavy text-sm">{b.name}</div>
                  <div className="text-[10px] text-brandMuted font-normal mt-0.5">{b.tagline}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row, i) => (
              <tr key={row.key} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                <td className="px-5 py-3 text-[11px] font-bold text-brandMuted border-b border-slate-100 align-top">
                  {row.label}
                </td>
                {BROKERS.map(b => (
                  <td key={b.name} className="px-4 py-3 text-[12px] text-slate-700 border-b border-slate-100 text-center align-top">
                    {b[row.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-brandBorder">
        {BROKERS.map(b => (
          <div key={b.name} className="px-5 py-4">
            <div className="font-black text-brandDeepNavy text-base">{b.name}</div>
            <div className="text-[11px] text-brandMuted mb-3">{b.tagline}</div>
            <dl className="space-y-1.5">
              {COMPARISON_ROWS.map(row => (
                <div key={row.key} className="flex gap-3">
                  <dt className="text-[11px] font-bold text-brandMuted w-32 shrink-0">{row.label}</dt>
                  <dd className="text-[11px] text-slate-700">{b[row.key]}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="px-5 py-5 bg-brandBgSoft border-t border-brandBorder">
        <p className="text-[11px] text-brandMuted mb-4 font-medium">
          Open an account — affiliate links (we may earn a referral fee at no extra cost to you):
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {BROKERS.map(b => (
            <Link
              key={b.name}
              href={b.href}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex flex-col items-center rounded-2xl border border-brandBorder bg-white px-4 py-3.5 text-center shadow-sm hover:shadow-md hover:border-brandNavy/30 transition-all"
            >
              <span className="text-sm font-black text-brandDeepNavy">{b.name}</span>
              <span className="text-[10px] text-brandMuted mt-0.5 mb-2.5">{b.tagline}</span>
              <span className="rounded-full bg-brandGrowthGreen px-4 py-1.5 text-[11px] font-bold text-white">
                {b.label}
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-3 text-[10px] text-brandMuted text-center leading-relaxed">
          Charges current as of July 2026. Verify with each broker before opening.
          RupeeKit earns affiliate commissions from Angel One and Upstox. Zerodha link is a referral — you and the referee each get brokerage credits.
        </p>
      </div>
    </div>
  );
}
