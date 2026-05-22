'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PersonalFinanceRoadmap from './PersonalFinanceRoadmap';

interface Question {
  id: number;
  text: string;
  category: string;
}

export default function MoneyHealthCheckQuiz() {
  const [mounted, setMounted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const questions: Question[] = [
    { id: 1, text: 'Do you track your monthly expenses?', category: 'Tracking' },
    { id: 2, text: 'Do you follow a structured monthly budget?', category: 'Budgeting' },
    { id: 3, text: 'Do you have a dedicated emergency fund covering at least 3 months of expenses?', category: 'Savings' },
    { id: 4, text: 'Do you save a portion of your income systematically before spending?', category: 'Savings' },
    { id: 5, text: 'Do you know your exact monthly debt payments and total liabilities?', category: 'Debt' },
    { id: 6, text: 'Do you review subscriptions or recurring expenses at least once a quarter?', category: 'Audit' },
    { id: 7, text: 'Do you understand the difference between saving and investing?', category: 'Investing' },
    { id: 8, text: 'Do you have a basic money goal for the next 30 days?', category: 'Mindset' },
  ];

  const handleAnswer = (val: boolean) => {
    setAnswers((prev) => ({ ...prev, [questions[currentIdx].id]: val }));
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentIdx(0);
    setShowResults(false);
    setCopied(false);
  };

  const calculateScore = () => {
    const yesCount = Object.values(answers).filter((val) => val === true).length;
    return Math.round((yesCount / questions.length) * 100);
  };

  const getResultsDetails = (score: number) => {
    if (score < 40) {
      return {
        category: 'Getting Started',
        colorClass: 'text-amber-600 bg-amber-50 border-amber-200',
        message: 'You are at the beginning of your financial journey. Establishing basic habits like tracking monthly spending and laying out a simple budget will help build your confidence.',
        roadmapStage: 1,
        actions: [
          { text: 'Read: How to Track Expenses Guide', href: '/blog/how-to-track-expenses' },
          { text: 'Read: How to Create a Monthly Budget', href: '/blog/how-to-create-a-monthly-budget' },
          { text: 'Start: The 30-Day Budget Challenge', href: '/resources/30-day-budget-challenge' },
        ],
      };
    } else if (score < 60) {
      return {
        category: 'Building Awareness',
        colorClass: 'text-blue-600 bg-blue-50 border-blue-200',
        message: 'You understand the basics but are still building a consistent routine. Focusing on saving automatically and building a dedicated emergency buffer will strengthen your progress.',
        roadmapStage: 3,
        actions: [
          { text: 'Read: 50/30/20 Budgeting Rule', href: '/blog/50-30-20-budget-rule' },
          { text: 'Explore: How Much Emergency Fund You Need', href: '/blog/how-much-emergency-fund' },
          { text: 'Explore: Personal Finance Books for Beginners', href: '/blog/best-personal-finance-books-for-beginners' },
        ],
      };
    } else if (score < 80) {
      return {
        category: 'On Track',
        colorClass: 'text-indigo-600 bg-indigo-50 border-indigo-200',
        message: 'You have solid money habits. Optimizing your current liabilities, clearing high-interest debt, and mapping out long-term saving vs investing goals is your next step.',
        roadmapStage: 5,
        actions: [
          { text: 'Read: Saving vs Investing Differences', href: '/blog/saving-vs-investing-for-beginners' },
          { text: 'Read: Debt Repayment Planning (Snowball vs Avalanche)', href: '/blog/debt-repayment-planning-for-beginners' },
          { text: 'Estimate: Interactive Loan Calculator', href: '/tools/emi-calculator-india' },
        ],
      };
    } else {
      return {
        category: 'Strong Foundation',
        colorClass: 'text-brandGrowthGreen bg-emerald-50 border-emerald-200',
        message: 'Fantastic! You have constructed a highly disciplined financial framework. Keep reviewing your progress monthly, adjust your investments, and build compounding wealth.',
        roadmapStage: 6,
        actions: [
          { text: 'Read: Build Better Money Habits Guide', href: '/blog/build-better-money-habits' },
          { text: 'Read: Saving vs Investing Differences', href: '/blog/saving-vs-investing-for-beginners' },
          { text: 'Explore: How Much Emergency Fund You Need', href: '/blog/how-much-emergency-fund' },
        ],
      };
    }
  };

  const handleShare = () => {
    const score = calculateScore();
    const details = getResultsDetails(score);
    const text = `I just checked my Money Health Score on RupeeKit and scored ${score}/100 (${details.category})! Take this 60-second interactive self-reflection quiz to understand your money score: ${window.location.origin}/money-health-check`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  if (!mounted) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-brandBorder bg-white p-8 text-center shadow-sm">
        <p className="text-brandMuted">Loading self-assessment...</p>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const details = getResultsDetails(score);

    return (
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="rounded-3xl border border-brandBorder bg-white p-8 shadow-sm text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-brandMuted">
            Your Money Health Assessment
          </span>
          <h2 className="mt-4 text-3xl font-black text-brandDeepNavy">Your Results</h2>

          <div className="mt-6 flex flex-col items-center justify-center">
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-brandBgSoft border-4 border-slate-100 shadow-inner">
              <span className="text-4xl font-black text-brandNavy">{score}</span>
              <span className="absolute bottom-4 text-xs font-bold text-brandMuted">/100</span>
            </div>
            <span
              className={`mt-4 rounded-full border px-4 py-1 text-sm font-bold uppercase tracking-wide ${details.colorClass}`}
            >
              {details.category}
            </span>
          </div>

          <p className="mt-6 text-brandText leading-relaxed text-sm max-w-md mx-auto">
            {details.message}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={handleShare}
              className="rounded-full bg-brandNavy px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-brandDeepNavy transition"
            >
              {copied ? '✓ Results Copied to Clipboard!' : 'Share Your Progress'}
            </button>
            <button
              onClick={resetQuiz}
              className="rounded-full border border-brandBorder bg-white px-6 py-2.5 text-xs font-bold text-brandText hover:bg-brandBgSoft transition"
            >
              Retake Quiz
            </button>
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="rounded-3xl border border-brandBorder bg-white p-8 shadow-sm">
          <h3 className="text-xl font-bold tracking-tight text-brandDeepNavy">
            Recommended Action Plan
          </h3>
          <p className="mt-2 text-xs text-brandMuted">
            Here are three education-focused actions selected based on your responses:
          </p>

          <ul className="mt-5 space-y-3">
            {details.actions.map((act, i) => (
              <li key={i}>
                <Link
                  href={act.href}
                  className="flex items-center justify-between rounded-xl border border-brandBorder bg-brandBgSoft p-4 hover:border-slate-300 hover:bg-white transition"
                >
                  <span className="text-sm font-bold text-brandDeepNavy">{act.text}</span>
                  <span className="text-brandGrowthGreen text-lg font-black">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Highlighted Roadmap */}
        <div className="rounded-3xl border border-brandBorder bg-white p-8 shadow-sm">
          <h3 className="text-xl font-bold tracking-tight text-brandDeepNavy mb-6">
            Your Personal Finance Roadmap
          </h3>
          <PersonalFinanceRoadmap highlightStage={details.roadmapStage} />
        </div>

        {/* Educational Disclaimer */}
        <div className="rounded-2xl border border-brandBorder bg-brandBgSoft p-5 text-center">
          <p className="text-xs leading-relaxed text-brandMuted">
            <span className="font-bold text-brandDeepNavy block mb-1">Educational Disclaimer</span>
            This score is for educational self-reflection only and is not financial, tax, legal, or investment advice.
          </p>
        </div>
      </div>
    );
  }

  // Quiz Mode
  const progressPercent = Math.round((currentIdx / questions.length) * 100);

  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-brandBorder bg-white p-8 shadow-sm relative overflow-hidden">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100">
        <div
          className="h-full bg-brandGrowthGreen transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between text-xs font-semibold text-brandMuted">
        <span>Self-Assessment</span>
        <span>
          Question {currentIdx + 1} of {questions.length}
        </span>
      </div>

      <div className="mt-8 min-h-[140px] flex flex-col justify-center text-center">
        <span className="text-xs font-bold text-brandGrowthGreen uppercase tracking-wider">
          {questions[currentIdx].category}
        </span>
        <h3 className="mt-3 text-xl font-bold tracking-tight text-brandDeepNavy leading-snug px-4">
          {questions[currentIdx].text}
        </h3>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <button
          onClick={() => handleAnswer(true)}
          className="rounded-full bg-brandNavy py-3 text-sm font-bold text-white shadow-sm hover:bg-brandDeepNavy transition focus:outline-none focus:ring-2 focus:ring-brandNavy focus:ring-offset-2"
        >
          Yes
        </button>
        <button
          onClick={() => handleAnswer(false)}
          className="rounded-full border border-brandBorder bg-white py-3 text-sm font-bold text-brandText hover:bg-brandBgSoft transition focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2"
        >
          No
        </button>
      </div>

      <div className="mt-8 border-t border-brandBorder pt-4 text-center">
        <p className="text-[11px] text-brandMuted leading-relaxed">
          No logs are saved. Your choices remain strictly confidential in your temporary browser state.
        </p>
      </div>
    </div>
  );
}
