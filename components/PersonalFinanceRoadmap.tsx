'use client';

import React from 'react';

export interface RoadmapStage {
  number: number;
  title: string;
  description: string;
  recommendation: string;
}

interface PersonalFinanceRoadmapProps {
  highlightStage?: number; // 1 to 6
}

export default function PersonalFinanceRoadmap({ highlightStage }: PersonalFinanceRoadmapProps) {
  const stages: RoadmapStage[] = [
    {
      number: 1,
      title: 'Track Spending',
      description: 'List all daily expenses and identify spending leaks.',
      recommendation: 'Log everything for just 30 days to build raw awareness.',
    },
    {
      number: 2,
      title: 'Build a Budget',
      description: 'Organize your net income using a rule like 50/30/20.',
      recommendation: 'Earmark essential needs, personal wants, and future savings.',
    },
    {
      number: 3,
      title: 'Create Emergency Cushion',
      description: 'Accumulate 3 to 6 months of survival expenses in a secure account.',
      recommendation: 'Keep this money safe and highly liquid for unplanned emergencies.',
    },
    {
      number: 4,
      title: 'Reduce High-Interest Debt',
      description: 'Pay off high-rate credit cards and personal loans aggressively.',
      recommendation: 'Compare the Snowball or Avalanche methods to clear debts faster.',
    },
    {
      number: 5,
      title: 'Learn Saving vs Investing',
      description: 'Explore options to grow wealth and beat inflation over the long term.',
      recommendation: 'Understand your risk tolerance and separate short-term from long-term goals.',
    },
    {
      number: 6,
      title: 'Review Progress Monthly',
      description: 'Reflect on actual spending and adjust allocations consistently.',
      recommendation: 'Treat your financial security as a lifelong, evolving journey.',
    },
  ];

  return (
    <div className="w-full">
      <div className="relative border-l-2 border-slate-200 pl-6 ml-4 md:ml-6 space-y-8 py-2">
        {stages.map((stage) => {
          const isHighlighted = highlightStage === stage.number;
          return (
            <div key={stage.number} className="relative group">
              {/* Timeline marker */}
              <div
                className={`absolute -left-[37px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-300 ${
                  isHighlighted
                    ? 'border-brandGrowthGreen bg-brandGrowthGreen text-white scale-125 shadow-md shadow-brandGrowthGreen/20'
                    : 'border-brandBorder bg-white text-brandMuted group-hover:border-brandNavy group-hover:text-brandNavy'
                }`}
              >
                {stage.number}
              </div>

              {/* Card content */}
              <div
                className={`rounded-2xl border p-5 transition-all duration-300 ${
                  isHighlighted
                    ? 'border-brandGrowthGreen bg-brandBgSoft shadow-sm ring-1 ring-brandGrowthGreen/20'
                    : 'border-brandBorder bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <h4
                    className={`text-base font-bold tracking-tight ${
                      isHighlighted ? 'text-brandDeepNavy' : 'text-brandDeepNavy'
                    }`}
                  >
                    {stage.title}
                  </h4>
                  {isHighlighted && (
                    <span className="inline-block rounded-full bg-brandGrowthGreen/10 px-2.5 py-0.5 text-xs font-bold text-brandGrowthGreen border border-brandGrowthGreen/20 w-fit">
                      Your Focus Stage
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-brandMuted">
                  {stage.description}
                </p>
                <p
                  className={`mt-3 text-xs leading-relaxed font-medium ${
                    isHighlighted ? 'text-brandGrowthGreen' : 'text-slate-400'
                  }`}
                >
                  <span className="font-bold">Next Action:</span> {stage.recommendation}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
