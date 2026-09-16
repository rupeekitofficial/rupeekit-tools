# Issue #153 — Emergency-fund ranking/depth opportunity #3 (16 September 2026)

## Selection and pre-change metric

The latest available RupeeKit page-level evidence through 12 September 2026 shows `/tools/emergency-fund-calculator-india` at **1,446 impressions, 8 clicks, 0.55% CTR and average position 14.4**. That places it outside the top-10 and makes ranking/depth the primary constraint rather than a pure snippet-CTR problem.

The higher-impression salary-in-hand page was not selected because it received a separate source/freshness intervention immediately before this issue. This run avoids stacking another change on that page before the earlier intervention can be measured.

**Named metric:** move average position from 14.4 toward the top-10 while preserving the existing calculator URL, formula and intent. CTR is a secondary observation, not the primary success metric.

## Query-backed intent and content boundary

The existing page already covers the core demonstrated intent: size a household emergency reserve from essential monthly expenses, unavoidable EMIs, dependants and income stability. It already supports 3, 6, 9 and 12-month scenarios, so this issue does not create salary-specific, EMI-specific or duration-specific satellite pages.

The clearest remaining low-risk gap is contextual authority from adjacent savings content. Emergency reserves logically precede longer-term savings decisions, but the `savings-retirement` blog cluster previously routed only to SSY. This change adds the existing emergency-fund calculator as the cluster's secondary calculator, creating an additional contextual inbound path without changing the calculator itself.

## Source verification — 16 September 2026

The Reserve Bank of India's financial-education material describes an emergency fund as a cash reserve for unexpected events or income loss. It says a commonly recommended baseline is at least three months of living expenses, while people with less-secure jobs, businesses or self-employment may need six months or more. It also says emergency money should be kept separately and easily accessible.

Primary source:

- RBI Financial Education — *I Can Do: Financial Planning*: https://www.rbi.org.in/FinancialEducation/content/I%20Can%20Do_RBI.pdf

For bank-deposit safety context, DICGC's current guide states that eligible deposits such as savings, current, fixed and recurring deposits at insured banks are covered up to ₹5 lakh per depositor per bank in the same right and capacity. This is deposit-insurance information, not a recommendation that every emergency fund should be held in a fixed deposit.

Primary source:

- DICGC — Guide to Deposit Insurance: https://www.dicgc.org.in/guide-to-deposit-insurance

No formula or personal recommendation was added from these sources. The existing calculator remains an educational planning estimate.

## Implementation

- Keep the emergency-fund calculator as the primary destination for the `money-planning` blog cluster.
- Add it as the secondary calculator for the `savings-retirement` cluster so relevant savings/retirement articles can route readers back to emergency liquidity before long-term allocation decisions.
- Add a regression test protecting both discovery paths.

## Safety and scope

- No calculator formula, input, output, slug or canonical changed.
- No fake review, rating, schema claim or guarantee was added.
- No sensitive-data collection was added.
- No new calculator or thin satellite page was created.
- The RBI/DICGC material is used as educational source context only; RupeeKit does not prescribe a universal emergency-fund amount or product.

## Search Console action after deployment

This is an internal-link authority change to an existing indexed page, not a new important URL, canonical/sitemap/noindex fix, or major calculator-content rewrite. After deployment, use Search Console **Links → Internal links** and monitor whether `/tools/emergency-fund-calculator-india` gains internal-link visibility, then compare its settled page-level impressions and average position in Performance.

Do **not** request indexing solely for this change. Use URL Inspection → Request Indexing only if the valuable calculator is discovered-not-indexed after several days or a later deployment fixes an actual canonical, sitemap or noindex defect.
