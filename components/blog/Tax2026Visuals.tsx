'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export function Tax2026Stats() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="my-8 rounded-3xl border border-brandBorder bg-white p-6 shadow-sm">
      <h3 className="text-lg font-black text-brandDeepNavy mb-6">2026 Tax Planning Impact</h3>
      <div className="grid gap-6 md:grid-cols-2">
        
        {/* Stat 1 */}
        <div className="rounded-2xl bg-brandBgSoft p-5 border border-brandNavy/10 hover:shadow-md transition-shadow">
          <p className="text-xs font-semibold text-slate-500 uppercase">Standard Deduction</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl md:text-2xl font-black text-brandGrowthGreen">Check Latest Deduction</span>
          </div>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div className={`h-full bg-brandGrowthGreen transition-all duration-1000 ease-out ${mounted ? 'w-full' : 'w-0'}`} />
          </div>
          <p className="mt-3 text-xs text-slate-600">Standard deduction depends on regime and year. Available under both Old and New Tax Regimes for salaried individuals.</p>
        </div>

        {/* Stat 2 */}
        <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200 hover:shadow-md transition-shadow">
          <p className="text-xs font-semibold text-slate-500 uppercase">New Regime Tax-Free Limit</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl md:text-2xl font-black text-brandNavy">Verify Current Rebate Limit</span>
          </div>
          <div className="mt-4 flex h-6 w-full overflow-hidden rounded-md bg-slate-200">
            <div className={`h-full bg-slate-300 transition-all duration-1000 delay-300 ${mounted ? 'w-[30%]' : 'w-0'}`} title="Basic Exemption" />
            <div className={`h-full bg-brandNavy transition-all duration-1000 delay-500 ${mounted ? 'w-[70%]' : 'w-0'}`} title="Rebate u/s 87A" />
          </div>
          <p className="mt-3 text-xs text-slate-600">Rebate and slab rules may change by FY. Verify the exact rebate limit for the relevant Assessment Year.</p>
        </div>
      </div>
    </div>
  );
}

export function Tax2026CompactCTA() {
  return (
    <div className="my-8 rounded-2xl border-l-4 border-l-brandGrowthGreen bg-white p-5 shadow-sm border-t border-b border-r border-brandBorder flex flex-col md:flex-row items-center justify-between gap-4">
      <div>
        <h4 className="font-bold text-brandDeepNavy text-lg">Want to compare your tax quickly?</h4>
        <p className="text-sm text-slate-600 mt-1">
          Open the RupeeKit Income Tax Calculator and compare old vs new regime using your income and deductions.
        </p>
      </div>
      <Link 
        href="/tools/income-tax-calculator-old-vs-new-regime-india"
        className="shrink-0 rounded-full bg-brandGrowthGreen px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-brandBrightGreen transition whitespace-nowrap"
      >
        Use Income Tax Calculator
      </Link>
    </div>
  );
}

export function CommonMistakesCards() {
  const mistakes = [
    { title: 'Confusing Financial Year and Assessment Year', icon: '🗓️' },
    { title: 'Assuming tax slabs never change', icon: '📉' },
    { title: 'Ignoring deductions and exemptions', icon: '📝' },
    { title: 'Treating calculator output as final tax advice', icon: '⚠️' }
  ];

  return (
    <div className="my-8 grid gap-4 sm:grid-cols-2">
      {mistakes.map((mistake, idx) => (
        <div key={idx} className="flex items-start gap-4 rounded-2xl border border-rose-100 bg-rose-50/50 p-5 transition hover:bg-rose-50">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xl shadow-sm border border-rose-100">
            {mistake.icon}
          </div>
          <p className="text-sm font-bold text-slate-800 pt-2">{mistake.title}</p>
        </div>
      ))}
    </div>
  );
}

export function Tax2026CTA() {
  return (
    <div className="rounded-3xl border border-brandGrowthGreen/20 bg-gradient-to-br from-white to-brandGrowthGreen/5 p-8 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brandGrowthGreen/10 mb-4 text-3xl">
        📊
      </div>
      <h3 className="text-2xl font-black text-brandDeepNavy">Ready to Estimate Your 2026 Taxes?</h3>
      <p className="mt-3 text-slate-600 max-w-lg mx-auto">
        Use our advanced income tax calculator to compare the Old vs New regime, run future projections, and plan your investments effectively.
      </p>
      <div className="mt-8">
        <Link 
          href="/tools/income-tax-calculator-old-vs-new-regime-india"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brandGrowthGreen px-8 py-4 text-sm font-bold text-white shadow-lg shadow-brandGrowthGreen/30 transition-all hover:scale-105 hover:bg-brandBrightGreen"
        >
          Calculate Your 2026 Tax Now
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}
