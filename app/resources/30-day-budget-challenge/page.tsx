import type { Metadata } from 'next';
import BudgetChallenge from '@/components/BudgetChallenge';

export const metadata: Metadata = {
  title: '30-Day Budget Challenge for Beginners | RupeeKit',
  description: 'Join our free 30-day budgeting challenge. Mark off one small financial habit checklist item every day to build lasting financial awareness.',
};

export default function BudgetChallengePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <header className="text-center max-w-2xl mx-auto mb-10">
        <span className="rounded-full bg-brandNavy/10 border border-brandNavy/20 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brandNavy">
          30-Day Program
        </span>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-brandNavy md:text-5xl">
          30-Day Budget Challenge
        </h1>
        <p className="mt-3 text-brandMuted text-base leading-relaxed">
          Build positive financial discipline one small action at a time. This challenge helps you track spending, audit subscriptions, and establish baseline habits.
        </p>
      </header>

      <BudgetChallenge />
    </div>
  );
}
