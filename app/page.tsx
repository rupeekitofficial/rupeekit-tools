import Link from 'next/link';
import { getLiveTools } from '@/lib/tools';

export default function HomePage() {
  const tools = getLiveTools();
  const categories = Array.from(new Set(tools.map((tool) => tool.category)));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <section className="rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-sky-900 p-8 text-white shadow-xl md:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">India salary, tax and finance tools</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
          Free calculators that explain the formula, not just the answer.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 md:text-lg">
          Estimate salary in-hand, EMI, SIP, GST, FD maturity and more with simple examples, FAQs and related tools.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <span key={category} className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20">
              {category}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Popular calculators</h2>
            <p className="mt-2 text-slate-600">Start with any tool below. More tools are added as the site grows.</p>
          </div>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-sky-700">{tool.category}</span>
              <h3 className="mt-4 text-xl font-black tracking-tight text-slate-950 group-hover:text-sky-700">{tool.name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{tool.shortDescription}</p>
              <p className="mt-5 text-sm font-bold text-sky-700">Open calculator →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-bold">How to use these tools</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="font-bold">1. Enter your values</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Use values from your offer letter, bank quote, payslip or investment plan where possible.</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="font-bold">2. Review the formula</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Each page explains the basic formula and gives a simple example calculation.</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="font-bold">3. Verify important decisions</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Use this for planning. Confirm final tax, salary or investment decisions with official sources or a professional.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
