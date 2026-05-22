import Link from 'next/link';
import { getLiveTools } from '@/lib/tools';
import PersonalFinanceRoadmap from '@/components/PersonalFinanceRoadmap';

export default function HomePage() {
  const tools = getLiveTools();
  const categories = Array.from(new Set(tools.map((tool) => tool.category)));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-12 space-y-12 md:space-y-16">
      {/* Hero & Trust Strip Group */}
      <div className="space-y-6 md:space-y-8">
        {/* Hero Section */}
        <section className="rounded-3xl bg-gradient-to-br from-brandDeepNavy via-brandNavy to-slate-900 px-6 py-10 md:px-12 md:py-12 text-white shadow-xl relative overflow-hidden">
          {/* Subtle decorative background accent */}
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-brandGrowthGreen/20 blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-brandNavy/40 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brandBrightGreen">
              Free Finance Calculators & Tools
            </p>
            <h1 className="mt-4 text-3xl font-black tracking-tight leading-tight md:text-5xl text-white">
              Understand your money with simple calculators
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-200 md:text-base">
              Use free calculators, beginner guides, and visual breakdowns to estimate salary, loans, savings, tax, and everyday money decisions.
            </p>
            
            {/* Action buttons */}
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/money-health-check"
                className="rounded-full bg-brandGrowthGreen px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-brandBrightGreen hover:shadow-md transition text-center"
              >
                Check Your Money Health Score
              </Link>
              <Link
                href="#calculators"
                className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/20 transition text-center"
              >
                Explore Free Calculators
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {categories.map((category) => (
                <span key={category} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20">
                  {category}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Strip */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex items-start gap-3 rounded-2xl border border-brandBorder bg-white p-4 shadow-sm">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brandNavy/10 text-brandNavy">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-bold text-brandDeepNavy">No signup needed</h4>
              <p className="mt-1 text-[11px] text-brandMuted leading-relaxed">
                Use all our calculators instantly. No email address, accounts, or phone numbers required.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-brandBorder bg-white p-4 shadow-sm">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brandNavy/10 text-brandNavy">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-bold text-brandDeepNavy">Educational estimates</h4>
              <p className="mt-1 text-[11px] text-brandMuted leading-relaxed">
                We focus on teaching the formulas and logic behind the math, helping you understand your choices.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-brandBorder bg-white p-4 shadow-sm">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brandNavy/10 text-brandNavy">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-bold text-brandDeepNavy">Beginner-friendly tools</h4>
              <p className="mt-1 text-[11px] text-brandMuted leading-relaxed">
                Designed with clean inputs, clear explanations, and interactive charts for easy decision-making.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Tools Preview Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-brandDeepNavy md:text-3xl">Popular Tools</h2>
          <p className="mt-2 text-sm text-brandMuted">Quickly access our most used interactive financial utilities.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Salary In-Hand */}
          <Link
            href="/tools/salary-in-hand-calculator-india"
            className="group flex flex-col justify-between rounded-2xl border border-brandBorder bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-brandNavy/35"
          >
            <div>
              <span className="inline-block rounded-full bg-brandNavy/10 border border-brandNavy/25 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brandNavy">
                Salary
              </span>
              <h3 className="mt-3 text-base font-bold tracking-tight text-brandDeepNavy transition group-hover:text-brandNavy">
                Salary In-Hand Calculator
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-brandMuted">
                Estimate monthly take-home salary from annual CTC, PF, and tax deductions.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-brandBorder">
              <p className="text-xs font-bold text-brandGrowthGreen group-hover:text-brandBrightGreen transition">
                Open calculator →
              </p>
            </div>
          </Link>

          {/* Card 2: EMI / Loan */}
          <Link
            href="/tools/emi-calculator-india"
            className="group flex flex-col justify-between rounded-2xl border border-brandBorder bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-brandNavy/35"
          >
            <div>
              <span className="inline-block rounded-full bg-brandNavy/10 border border-brandNavy/25 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brandNavy">
                Loans
              </span>
              <h3 className="mt-3 text-base font-bold tracking-tight text-brandDeepNavy transition group-hover:text-brandNavy">
                EMI / Loan Calculator
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-brandMuted">
                Calculate monthly loan EMIs, interest details, and payment schedules.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-brandBorder">
              <p className="text-xs font-bold text-brandGrowthGreen group-hover:text-brandBrightGreen transition">
                Open calculator →
              </p>
            </div>
          </Link>

          {/* Card 3: SIP / Savings */}
          <Link
            href="/tools/sip-calculator-india"
            className="group flex flex-col justify-between rounded-2xl border border-brandBorder bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-brandNavy/35"
          >
            <div>
              <span className="inline-block rounded-full bg-brandNavy/10 border border-brandNavy/25 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brandNavy">
                Investments
              </span>
              <h3 className="mt-3 text-base font-bold tracking-tight text-brandDeepNavy transition group-hover:text-brandNavy">
                SIP / Savings Calculator
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-brandMuted">
                Estimate the future value and potential returns of monthly SIP investments.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-brandBorder">
              <p className="text-xs font-bold text-brandGrowthGreen group-hover:text-brandBrightGreen transition">
                Open calculator →
              </p>
            </div>
          </Link>

          {/* Card 4: FD / Savings Growth */}
          <Link
            href="/tools/fd-calculator-india"
            className="group flex flex-col justify-between rounded-2xl border border-brandBorder bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-brandNavy/35"
          >
            <div>
              <span className="inline-block rounded-full bg-brandNavy/10 border border-brandNavy/25 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brandNavy">
                Savings
              </span>
              <h3 className="mt-3 text-base font-bold tracking-tight text-brandDeepNavy transition group-hover:text-brandNavy">
                FD / Savings Growth Calculator
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-brandMuted">
                Calculate interest earned and maturity amounts for fixed deposits.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-brandBorder">
              <p className="text-xs font-bold text-brandGrowthGreen group-hover:text-brandBrightGreen transition">
                Open calculator →
              </p>
            </div>
          </Link>

          {/* Card 5: GST Calculator */}
          <Link
            href="/tools/gst-calculator-india"
            className="group flex flex-col justify-between rounded-2xl border border-brandBorder bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-brandNavy/35"
          >
            <div>
              <span className="inline-block rounded-full bg-brandNavy/10 border border-brandNavy/25 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brandNavy">
                Tax
              </span>
              <h3 className="mt-3 text-base font-bold tracking-tight text-brandDeepNavy transition group-hover:text-brandNavy">
                GST Calculator
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-brandMuted">
                Add or remove GST from invoice prices with CGST and SGST splits.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-brandBorder">
              <p className="text-xs font-bold text-brandGrowthGreen group-hover:text-brandBrightGreen transition">
                Open calculator →
              </p>
            </div>
          </Link>

          {/* Card 6: Money Health Check */}
          <Link
            href="/money-health-check"
            className="group flex flex-col justify-between rounded-2xl border border-brandBorder bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-brandNavy/35"
          >
            <div>
              <span className="inline-block rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brandGrowthGreen">
                Quiz
              </span>
              <h3 className="mt-3 text-base font-bold tracking-tight text-brandDeepNavy transition group-hover:text-brandNavy">
                Money Health Check
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-brandMuted">
                Take a 60-second quiz to discover your financial wellness score.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-brandBorder">
              <p className="text-xs font-bold text-brandGrowthGreen group-hover:text-brandBrightGreen transition">
                Start Health Check →
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Engagement Layer: "Start with one simple step" */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="rounded-full bg-brandNavy/10 border border-brandNavy/20 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brandNavy">
            Engagement Hub
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-brandDeepNavy md:text-4xl">
            Start with one simple step
          </h2>
          <p className="mt-2 text-brandMuted">
            Building financial security doesn&apos;t happen overnight. Choose an interactive option below to start.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="flex flex-col justify-between rounded-3xl border border-brandBorder bg-white p-6 shadow-sm hover:shadow-md transition hover:-translate-y-0.5">
            <div>
              <span className="inline-block rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brandGrowthGreen">
                Quiz
              </span>
              <h3 className="mt-4 text-lg font-bold tracking-tight text-brandDeepNavy">
                Check Money Health
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-brandMuted">
                Take our 60-second self-reflection quiz to discover your Money Health Score and get 3 next steps.
              </p>
            </div>
            <Link
              href="/money-health-check"
              className="mt-6 inline-flex items-center text-xs font-bold text-brandNavy hover:text-brandDeepNavy transition"
            >
              Start Quiz <span className="ml-1">→</span>
            </Link>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col justify-between rounded-3xl border border-brandBorder bg-white p-6 shadow-sm hover:shadow-md transition hover:-translate-y-0.5">
            <div>
              <span className="inline-block rounded-full bg-indigo-50 border border-indigo-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                Challenge
              </span>
              <h3 className="mt-4 text-lg font-bold tracking-tight text-brandDeepNavy">
                30-Day Challenge
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-brandMuted">
                Check off one bite-sized money checklist task daily. Track progress easily in your browser.
              </p>
            </div>
            <Link
              href="/resources/30-day-budget-challenge"
              className="mt-6 inline-flex items-center text-xs font-bold text-brandNavy hover:text-brandDeepNavy transition"
            >
              Join Challenge <span className="ml-1">→</span>
            </Link>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col justify-between rounded-3xl border border-brandBorder bg-white p-6 shadow-sm hover:shadow-md transition hover:-translate-y-0.5">
            <div>
              <span className="inline-block rounded-full bg-amber-50 border border-amber-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">
                Guides
              </span>
              <h3 className="mt-4 text-lg font-bold tracking-tight text-brandDeepNavy">
                Finance Guides
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-brandMuted">
                Explore our beginner-friendly guides on budgeting, emergency funds, debt, and spending habits.
              </p>
            </div>
            <Link
              href="/blog"
              className="mt-6 inline-flex items-center text-xs font-bold text-brandNavy hover:text-brandDeepNavy transition"
            >
              Read Guides <span className="ml-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Reusable Roadmap Timeline on Homepage */}
      <section className="rounded-3xl border border-brandBorder bg-white p-6 md:p-10 shadow-sm">
        <div className="max-w-xl mb-8">
          <span className="inline-block rounded-full bg-brandNavy/10 border border-brandNavy/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brandNavy">
            Financial Milestones
          </span>
          <h2 className="mt-4 text-2xl font-black text-brandDeepNavy md:text-3xl">
            Your Personal Finance Roadmap
          </h2>
          <p className="mt-2 text-sm text-brandMuted">
            Follow these six foundational stages systematically to secure your financial future.
          </p>
        </div>
        <PersonalFinanceRoadmap />
      </section>

      {/* Calculators Grid Section */}
      <section id="calculators" className="scroll-mt-20 space-y-8">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-brandDeepNavy md:text-4xl">All Financial Calculators</h2>
          <p className="mt-2 text-brandMuted">Start with any tool below. Accurate estimations for standard financial regimes.</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link 
              key={tool.slug} 
              href={`/tools/${tool.slug}`} 
              className="group flex flex-col justify-between rounded-3xl border border-brandBorder bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-brandNavy/35"
            >
              <div>
                <span className="inline-block rounded-full bg-brandNavy/10 border border-brandNavy/25 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brandNavy">
                  {tool.category}
                </span>
                <h3 className="mt-4 text-xl font-bold tracking-tight text-brandDeepNavy transition group-hover:text-brandNavy">
                  {tool.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brandMuted">
                  {tool.shortDescription}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-brandBorder">
                <p className="text-sm font-bold text-brandGrowthGreen group-hover:text-brandBrightGreen transition">
                  Open calculator →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Educational Walkthrough Section */}
      <section className="rounded-[2rem] border border-brandBorder bg-white p-6 shadow-sm md:p-10">
        <h2 className="text-2xl font-black text-brandDeepNavy md:text-3xl">How to use these tools</h2>
        <p className="mt-2 text-brandMuted max-w-2xl text-sm">Follow three easy steps to plan your taxes, investments, and expenses accurately.</p>
        
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-brandBgSoft p-5 border border-brandBorder/80">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brandNavy/10 text-brandNavy font-bold">1</div>
            <p className="mt-4 font-bold text-brandDeepNavy text-base">Enter your values</p>
            <p className="mt-2 text-xs leading-relaxed text-brandMuted">Use values from your offer letter, bank statement, or savings schedule for accurate calculations.</p>
          </div>
          <div className="rounded-2xl bg-brandBgSoft p-5 border border-brandBorder/80">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brandNavy/10 text-brandNavy font-bold">2</div>
            <p className="mt-4 font-bold text-brandDeepNavy text-base">Review the formula</p>
            <p className="mt-2 text-xs leading-relaxed text-brandMuted">We explain the calculations behind each tool. Learn how your money is calculated, not just the end number.</p>
          </div>
          <div className="rounded-2xl bg-brandBgSoft p-5 border border-brandBorder/80">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brandNavy/10 text-brandNavy font-bold">3</div>
            <p className="mt-4 font-bold text-brandDeepNavy text-base">Verify decisions</p>
            <p className="mt-2 text-xs leading-relaxed text-brandMuted">Use results as educational guides. Always cross-verify major tax and loan choices with qualified professionals.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
