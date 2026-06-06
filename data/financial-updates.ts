// TODO: Future version — populate through a manual-review workflow
// using official source feeds (PIB, RBI, CBIC, SEBI, DoE).
// No auto-publishing without human review and editorial approval.
// Internal status field ('explainer' | 'official') is for editorial tracking only
// and is NOT displayed on public-facing pages.

import type { DiscoverReadyArticleTemplate } from '@/lib/discover-content';

export interface FinancialUpdate {
  id: string;
  slug: string;
  title: string;
  category:
    | 'RBI'
    | 'Income Tax'
    | 'GST'
    | 'SEBI'
    | 'Banking'
    | 'Personal Finance'
    | 'Markets'
    | 'Government Salary';
  sourceName: string;
  sourceUrl?: string;
  publishedDate: string;
  /** Short card-level summary (2-3 sentences). No [SAMPLE FORMAT] prefix. */
  summary: string;
  /** Detailed educational explanation for the detail page. */
  whatHappened?: string;
  whyItMatters: string;
  whoMayBeAffected?: string;
  whatToVerify: string;
  announcementVsOrderNote?: string;
  relatedRupeeKitLinks: { label: string; href: string }[];
  tags?: string[];
  visualType?: string;
  modifiedDate?: string;
  discoverArticle?: DiscoverReadyArticleTemplate;
  /** Editorial tracking only — NOT shown in public UI. */
  status: 'official' | 'explainer' | 'sample';
}

export const financialUpdates: FinancialUpdate[] = [
  {
    id: 'rbi-repo-rate-explainer',
    slug: 'rbi-repo-rate-explainer',
    title: 'RBI Monetary Policy: How Repo Rate Changes Affect Your Loans and Savings',
    category: 'RBI',
    sourceName: 'Reserve Bank of India — Monetary Policy Committee',
    sourceUrl: 'https://rbi.org.in',
    publishedDate: '2025-04-01',
    summary:
      'The Reserve Bank of India periodically revises the repo rate — the rate at which it lends short-term funds to commercial banks. When the repo rate rises, banks typically increase their lending rates, making home loans, personal loans, and EMIs more expensive. A lower repo rate generally reduces borrowing costs.',
    whatHappened:
      "The Reserve Bank's Monetary Policy Committee (MPC) meets six times a year to assess inflation, GDP growth, and liquidity conditions. After deliberation, it votes on the policy repo rate. A rate cut reduces borrowing costs across the banking system, while a rate hike aims to control inflation by making credit more expensive. Banks adjust their MCLR (Marginal Cost of Funds-based Lending Rate) and external benchmark-linked rates in response. The RBI publishes official MPC statements and press releases on its website after every meeting. The standing deposit facility (SDF) rate and the marginal standing facility (MSF) rate also move in tandem with the repo rate.",
    whyItMatters:
      'The repo rate directly influences the interest you pay on floating-rate EMI loans and indirectly affects FD returns and SIP performance over the long term. A 0.25% repo rate cut on a ₹30 lakh home loan can reduce your EMI meaningfully over a 20-year tenure.',
    whoMayBeAffected:
      'Individuals with floating-rate home loans, car loans, and personal loans. Also affects FD investors whose renewal rates may change, and SIP investors whose equity fund returns are influenced by the broader interest rate environment.',
    whatToVerify:
      'Check the official RBI press release on rbi.org.in under "Press Releases → Monetary Policy". Look for the latest MPC statement and the updated policy rate table. Always confirm with your bank whether your loan type is linked to MCLR or an external benchmark.',
    relatedRupeeKitLinks: [
      { label: 'EMI / Loan Calculator', href: '/tools/emi-calculator-india' },
      { label: 'FD / Savings Growth Calculator', href: '/tools/fd-calculator-india' },
    ],
    tags: ['Repo Rate', 'Monetary Policy', 'EMI', 'Loans', 'FD', 'RBI', 'MPC'],
    visualType: 'rbi',
    status: 'explainer',
  },
  {
    id: 'income-tax-regime-comparison',
    slug: 'income-tax-regime-comparison',
    title: 'Old vs New Income Tax Regime: A Plain-Language Comparison for Salaried Individuals',
    category: 'Income Tax',
    sourceName: 'Income Tax Department, Government of India',
    sourceUrl: 'https://incometax.gov.in',
    publishedDate: '2025-04-15',
    summary:
      'India currently offers two income tax computation regimes. The Old Regime allows various deductions and exemptions (80C, 80D, HRA, LTA). The New Regime offers lower slab rates but removes most exemptions. The better option depends on your salary structure, investment habits, and total eligible deductions.',
    whatHappened:
      "The Finance Act 2023 made the New Tax Regime the default option for salaried individuals from FY 2023-24 onwards. Under the revised New Regime, the basic exemption limit was raised to ₹3 lakh and a standard deduction of ₹50,000 was introduced. However, employees can still opt for the Old Regime by filing Form 10-IEA and submitting a declaration to their employer. The employer defaults to the New Regime if no declaration is received. Once chosen at the start of the financial year (typically in April), the regime generally cannot be changed during that year for TDS purposes. For ITR filing, individuals can switch regimes up to the due date of filing.",
    whyItMatters:
      'Choosing the wrong regime can cost thousands of rupees in extra tax per year. For someone with significant 80C investments, HRA, and home loan interest, the Old Regime often remains beneficial. For those with fewer deductions or higher incomes, the New Regime may result in lower tax.',
    whoMayBeAffected:
      'All salaried individuals, self-employed professionals, and business owners who file income tax returns in India. Particularly important for those deciding their investment strategy for the year — since 80C, HRA, and LTA exemptions are unavailable in the New Regime.',
    whatToVerify:
      'Visit incometax.gov.in and use the official Tax Calculator under the "Quick Links" section to compare your tax liability under both regimes. Confirm the current slab rates for the relevant financial year with your employer HR or a qualified tax advisor.',
    announcementVsOrderNote:
      'Tax regime rules are established by the Finance Act passed by Parliament each year. Changes take effect from the financial year following the Budget announcement. The official Finance Act is published in the Gazette of India and is the binding legal document — not Budget speeches or media reports.',
    relatedRupeeKitLinks: [
      { label: '80C Deduction Calculator', href: '/tools/80c-deduction-calculator-india' },
      { label: 'Salary In-Hand Calculator', href: '/tools/salary-in-hand-calculator-india' },
    ],
    tags: ['Tax Regime', 'Old Regime', 'New Regime', 'Deductions', 'ITR', 'Salaried', 'Form 10-IEA'],
    visualType: 'income-tax',
    status: 'explainer',
  },
  {
    id: 'gst-council-explainer',
    slug: 'gst-council-explainer',
    title: 'GST Council Meetings: What Gets Revised and How It Affects Everyday Expenses',
    category: 'GST',
    sourceName: 'GST Council / Central Board of Indirect Taxes and Customs (CBIC)',
    sourceUrl: 'https://cbic.gov.in',
    publishedDate: '2025-03-20',
    summary:
      'The GST Council meets periodically to revise tax rates across goods and services. Rate changes may affect everyday items like packaged food, electronics, insurance, and electric vehicles. After council decisions, CBIC issues official notifications specifying new rates and their effective dates.',
    whatHappened:
      'The GST Council is a constitutional body under Article 279A of the Indian Constitution, chaired by the Union Finance Minister with state finance ministers as members. It meets when required (typically several times a year) and issues press releases summarising rate decisions. The actual legally binding changes come through official CBIC notifications published in the Gazette of India. Effective dates stated in notifications — not just press conference announcements — determine when businesses must apply the new rates. GST rate changes typically require filing amended returns and updating accounting systems.',
    whyItMatters:
      'GST rate changes affect prices of goods and services you buy, the input tax credits your business can claim, and the overall cost structure of industries from hospitality to healthcare. Insurance premium GST rates directly affect the cost of health and term insurance policies.',
    whoMayBeAffected:
      'GST-registered businesses (B2B and B2C). Consumers who purchase affected goods or services. Importers, exporters, and e-commerce operators. Specifically relevant for businesses in sectors like food, electronics, healthcare, hospitality, and insurance.',
    whatToVerify:
      'Check official CBIC notifications on cbic.gov.in under "GST Notifications". Confirm with a qualified CA before making tax-related adjustments to your business invoicing or purchase decisions. The official press release from the GST Council secretariat (available on gstcouncil.gov.in) summarises decisions.',
    relatedRupeeKitLinks: [
      { label: 'GST Calculator', href: '/tools/gst-calculator-india' },
    ],
    tags: ['GST', 'CBIC', 'Indirect Tax', 'Consumer Prices', 'GST Council', 'Rate Revision'],
    visualType: 'gst',
    status: 'explainer',
  },
  {
    id: 'sebi-mutual-fund-explainer',
    slug: 'sebi-mutual-fund-explainer',
    title: 'SEBI Investor Protection Norms: Key Rules Every Mutual Fund Investor Should Know',
    category: 'SEBI',
    sourceName: 'Securities and Exchange Board of India (SEBI)',
    sourceUrl: 'https://sebi.gov.in',
    publishedDate: '2025-02-10',
    summary:
      'SEBI periodically issues circulars that affect mutual fund regulations, including expense ratios, category definitions, SIP pause facilities, and nominee update rules. These changes aim to protect retail investors and improve fund transparency. Investors are generally not required to take immediate action unless notified by their fund house.',
    whatHappened:
      'SEBI (Securities and Exchange Board of India) is the statutory regulator for India\'s securities market, established under the SEBI Act 1992. Its circulars — published on sebi.gov.in under the "Circulars" section — are binding on all registered market participants. Recent regulatory focus areas include reducing total expense ratio (TER) caps for large AUM funds, mandating simpler factsheet formats, allowing SIP pause features, and streamlining nominee update processes. Fund houses are required to communicate SEBI circular changes to investors through mandated notices.',
    whyItMatters:
      "SEBI circulars define the rules under which your mutual fund investments are managed. Lower expense ratios directly increase your net returns. Investor protection norms like nominee mandates and grievance redress timelines protect you if a fund house's operations are disrupted.",
    whoMayBeAffected:
      'Mutual fund investors (direct and regular plan holders). Registered stockbrokers and sub-brokers. Depository participants, listed companies, and Portfolio Management Service (PMS) providers.',
    whatToVerify:
      'Read SEBI circulars directly on sebi.gov.in under "Legal → Circulars". Always read from official sources rather than social media summaries. Your fund house will also communicate any investor action required through SEBI-mandated notices.',
    relatedRupeeKitLinks: [
      { label: 'SIP / Savings Calculator', href: '/tools/sip-calculator-india' },
    ],
    tags: ['Mutual Funds', 'SEBI Circular', 'Investor Protection', 'TER', 'SIP', 'Securities'],
    visualType: 'sebi',
    status: 'explainer',
  },
  {
    id: 'banking-fd-rate-tracker',
    slug: 'banking-fd-rate-tracker',
    title: 'Bank FD Rates: How Fixed Deposit Interest Rates Are Set and Where to Compare Them',
    category: 'Banking',
    sourceName: 'Individual Bank Official Websites and India Post (Post Office Savings)',
    sourceUrl: 'https://rbi.org.in',
    publishedDate: '2025-05-01',
    summary:
      'Fixed deposit interest rates vary by bank and tenure. Public sector banks, private banks, and the Post Office Small Savings Scheme offer different rates. Senior citizens typically receive an additional 0.25–0.50% over standard rates. Rates change frequently based on RBI monetary policy decisions.',
    whatHappened:
      "Banks set FD rates based on their liquidity requirements, RBI repo rate signals, and competitive market conditions. The Reserve Bank does not directly set FD rates — they are market-determined by each bank's board. Small Finance Banks typically offer higher FD rates than large scheduled commercial banks to attract deposits. Post Office Time Deposits are backed by the Government of India and rates are announced quarterly by the Finance Ministry through the Small Savings Rate Notification. Senior citizens get a special rate (typically 0.25% to 0.50% extra) as a policy benefit. Tax Saving FDs have a 5-year lock-in and qualify for 80C deduction under the Old Tax Regime.",
    whyItMatters:
      "FD rates directly affect your passive income from savings. Even a 0.5% rate difference on a larger corpus can add up meaningfully over a multi-year tenure. Senior citizens with fixed income especially benefit from monitoring rate changes across banks and post offices.",
    whoMayBeAffected:
      'Individuals and senior citizens who hold or plan to open fixed deposits in banks or post offices. NRI investors holding NRE/NRO FDs. Those looking for guaranteed returns as part of their debt portfolio allocation.',
    whatToVerify:
      "Check the rate directly on your bank's official website or the Post Office Savings Schemes page on indiapost.gov.in. Rates shown on third-party comparison portals may not reflect same-day changes. For Post Office TD rates, check the Finance Ministry notification published quarterly.",
    relatedRupeeKitLinks: [
      { label: 'FD / Savings Growth Calculator', href: '/tools/fd-calculator-india' },
    ],
    tags: ['FD', 'Fixed Deposit', 'Interest Rates', 'Senior Citizens', 'Savings', 'Post Office', 'Small Finance Banks'],
    visualType: 'banking',
    status: 'explainer',
  },
  {
    id: 'personal-finance-epf-explainer',
    slug: 'personal-finance-epf-explainer',
    title: 'EPF Contribution Rules: What Every Salaried Employee Should Understand',
    category: 'Personal Finance',
    sourceName: "Employees' Provident Fund Organisation (EPFO)",
    sourceUrl: 'https://epfindia.gov.in',
    publishedDate: '2025-03-05',
    summary:
      "The Employees' Provident Fund (EPF) is a mandatory retirement savings scheme for salaried employees in organisations with 20 or more workers. Both the employee and employer contribute 12% of basic salary plus DA. The annual interest rate on EPF is declared by EPFO after approval from the Finance Ministry.",
    whatHappened:
      "EPFO is a statutory body under the Ministry of Labour and Employment, governed by the EPF & Miscellaneous Provisions Act 1952. Every employer with 20+ workers must register under EPF. The employee's 12% contribution goes entirely to their EPF account. The employer's 12% is split: 3.67% goes to the EPF account and 8.33% goes to the Employee Pension Scheme (EPS — capped at ₹1,250/month in most cases). Interest on EPF is announced by EPFO's Central Board of Trustees and ratified by the Finance Ministry before it is credited. Members can check their balance through the EPFO member portal (https://epfindia.gov.in) or the UMANG app.",
    whyItMatters:
      "EPF is one of the most tax-efficient savings instruments for salaried Indians. Employee contributions qualify for 80C deduction, employer contributions are not taxed, and interest earned is tax-free (if the employee's annual contribution is below ₹2.5 lakh). The employer's contribution is a significant component of your total CTC that doesn't reach your bank account directly but builds your retirement corpus.",
    whoMayBeAffected:
      "Salaried employees working in private organisations with 20 or more employees. Employers covered under the EPF & MP Act, 1952. Employees who voluntarily increase their EPF contribution (known as VPF — Voluntary Provident Fund).",
    whatToVerify:
      'Log in to your EPF passbook on the EPFO member portal (epfindia.gov.in) to verify contributions, balances, and declared interest rates. You can also use the UMANG app. Confirm with your HR team that your contributions match your salary slip deductions.',
    relatedRupeeKitLinks: [
      { label: 'Salary In-Hand Calculator', href: '/tools/salary-in-hand-calculator-india' },
    ],
    tags: ['EPF', 'PF', 'Provident Fund', 'Retirement', 'EPFO', 'VPF', 'EPS'],
    visualType: 'personal-finance',
    status: 'explainer',
  },
  {
    id: 'government-salary-da-link',
    slug: 'government-salary-da-link',
    title: 'Central Government Dearness Allowance: How DA is Calculated and When It is Revised',
    category: 'Government Salary',
    sourceName: 'Ministry of Finance — Department of Expenditure',
    sourceUrl: 'https://doe.gov.in',
    publishedDate: '2025-04-01',
    summary:
      "Central government employees' Dearness Allowance (DA) is revised twice a year — typically in January and July — based on the All India Consumer Price Index for Industrial Workers (AICPI-IW). The revision is announced via Cabinet approval and issued as an Office Memorandum by the Department of Expenditure.",
    whatHappened:
      "The central government DA is calculated using a formula based on the rolling 12-month average of the All India Consumer Price Index for Industrial Workers (AICPI-IW), published monthly by the Labour Bureau. The formula for DA % for 7th Pay Commission employees is: [(Average AICPI-IW for last 12 months / 261.42) - 1] × 100. Once the Cabinet approves a DA revision, the Department of Expenditure (doe.gov.in) issues a signed Office Memorandum (OM) which is the legally binding document authorising the pay revision. DA is calculated as a percentage of basic pay and is included in gross salary from the revised effective date. Arrears (if the effective date is backdated) are typically paid as a lump sum.",
    whyItMatters:
      'DA revisions directly increase your gross monthly salary if you are a central government employee, and increase Dearness Relief (DR) if you are a central government pensioner. A DA increase also raises House Rent Allowance (HRA) if your city classification changes the HRA threshold.',
    whoMayBeAffected:
      'All active central government employees drawing salary under the 7th Pay Commission pay matrix. Central government pensioners and family pensioners receiving Dearness Relief (DR). Employees and pensioners of central autonomous bodies whose pay is linked to central government scales.',
    whatToVerify:
      'Look for the signed Office Memorandum on doe.gov.in under "Office Memorandums / Orders". Do not rely on unofficial WhatsApp forwards or social media posts for specific percentage figures or payment timelines. The OM will specify the exact DA percentage, effective date, and instructions for arrears.',
    announcementVsOrderNote:
      "The Cabinet announcement (often reported in media) is the approval stage. The legally binding document is the signed Office Memorandum (OM) issued by the Department of Expenditure. The effective date (e.g., 1 January or 1 July) may differ from both the announcement date and the OM date. Actual payment (credit to bank account) happens after the OM is issued and payroll is processed — often 4–8 weeks after the effective date.",
    relatedRupeeKitLinks: [
      { label: 'Government Salary Updates', href: '/government-salary-updates' },
      { label: 'Salary In-Hand Calculator', href: '/tools/salary-in-hand-calculator-india' },
    ],
    tags: ['DA', 'Dearness Allowance', 'Central Govt', 'AICPI', 'Office Memorandum', 'DoE', '7th Pay Commission'],
    visualType: 'government-salary',
    status: 'explainer',
  },
  {
    id: 'hra-exemption-explainer',
    slug: 'hra-exemption-explainer',
    title: 'HRA Tax Exemption: How Salaried Employees Can Claim House Rent Allowance',
    category: 'Income Tax',
    sourceName: 'Income Tax Department, Government of India',
    sourceUrl: 'https://incometax.gov.in',
    publishedDate: '2025-01-20',
    summary:
      'House Rent Allowance (HRA) is a component of salary that can be partially or fully exempt from income tax under Section 10(13A). The exempt amount is the lowest of: (a) Actual HRA received, (b) 50% of salary for metro cities or 40% for non-metro, (c) Actual rent paid minus 10% of salary.',
    whatHappened:
      "HRA exemption is governed by Section 10(13A) of the Income Tax Act 1961 and Rule 2A of the Income Tax Rules. For HRA exemption, employees must provide rent receipts to their employer. If the annual rent exceeds ₹1 lakh, the landlord's PAN must be mentioned. Metro cities (Delhi, Mumbai, Kolkata, Chennai) qualify for 50% of basic + DA calculation; all other cities qualify for 40%. HRA exemption is calculated month-by-month (not annually) and depends on the actual rent paid each month. The employer applies the exemption in Form 16, but employees must declare rent details to their employer in advance. This exemption is NOT available under the New Tax Regime.",
    whyItMatters:
      'HRA exemption can significantly reduce your taxable income if you are paying rent. For example, an employee in Mumbai with a basic pay of ₹40,000 and monthly rent of ₹15,000 can exempt up to ₹1.44 lakh annually — saving thousands in tax under the Old Regime.',
    whoMayBeAffected:
      "Salaried employees who receive HRA as part of their salary structure AND pay rent for their accommodation. Employees working in metro cities get a higher exemption. Not applicable under the New Tax Regime. Not applicable for home loan borrowers claiming interest deduction (they can still claim both if living in rented accommodation while owning a different property).",
    whatToVerify:
      "Consult the latest computation rules on incometax.gov.in (search for 'Section 10(13A)'). Keep rent receipts throughout the year. If annual rent exceeds ₹1 lakh, collect your landlord's PAN. Confirm eligibility with your employer's payroll or HR team, and review your Form 16 to verify the HRA exemption applied.",
    relatedRupeeKitLinks: [
      { label: 'HRA Exemption Calculator', href: '/tools/hra-exemption-calculator-india' },
      { label: 'Salary In-Hand Calculator', href: '/tools/salary-in-hand-calculator-india' },
    ],
    tags: ['HRA', 'House Rent Allowance', 'Rent', 'Tax Exemption', 'Section 10(13A)', 'Old Regime', 'Salaried'],
    visualType: 'income-tax',
    status: 'explainer',
  },
  {
    id: 'nps-tier1-explainer',
    slug: 'nps-tier1-explainer',
    title: 'National Pension System (NPS): Tax Benefits and Retirement Planning for Salaried Individuals',
    category: 'Personal Finance',
    sourceName: 'Pension Fund Regulatory and Development Authority (PFRDA)',
    sourceUrl: 'https://pfrda.org.in',
    publishedDate: '2025-02-28',
    summary:
      'The National Pension System (NPS) is a voluntary, long-term retirement savings scheme regulated by PFRDA. Contributions to NPS Tier I qualify for tax deductions under Section 80CCD(1B) up to ₹50,000 per year, over and above the Section 80C limit.',
    whatHappened:
      "PFRDA-registered entities (banks, post offices, and online PoPs) allow individuals to open NPS accounts. NPS has two tiers: Tier I (mandatory, retirement-focused, exits allowed at age 60) and Tier II (voluntary, flexible withdrawal like a savings account). The NPS Trust manages the overall fund structure, while Pension Fund Managers (PFMs) handle the actual investment across equity (E), corporate bonds (C), government securities (G), and alternative assets (A). Upon reaching 60, subscribers can withdraw 60% tax-free (lump sum or phased) and must use at least 40% to purchase an annuity from an IRDA-registered insurer. For government employees under NPS, the Dearness Relief (DR) component of the employer's contribution is also a factor in calculating pension income.",
    whyItMatters:
      "NPS provides an additional tax-saving avenue of ₹50,000 per year beyond the ₹1.5 lakh Section 80C limit. This can save ₹10,000–₹15,000 in taxes annually for those in the 20%–30% tax bracket. It also builds a disciplined retirement corpus through long-term, diversified investing.",
    whoMayBeAffected:
      'Salaried and self-employed individuals who voluntarily invest in NPS Tier I for tax savings and retirement planning. Central and state government employees enrolled under NPS (mandatory for those joining government service from 2004 onwards). Senior citizens exploring annuity income options.',
    whatToVerify:
      'Visit pfrda.org.in or your NPS account portal (CRA — Central Recordkeeping Agency) to verify the current fund options, withdrawal rules, and applicable annual contribution limits. Confirm the exact 80CCD(1B) benefit with a tax advisor for your income bracket.',
    announcementVsOrderNote:
      'PFRDA announces operational guidelines and fee structures through official circulars on pfrda.org.in. Any changes to withdrawal rules, contribution limits, or fund manager norms take effect from the date specified in the PFRDA circular — not from media reports or social media announcements.',
    relatedRupeeKitLinks: [
      { label: '80C Deduction Calculator', href: '/tools/80c-deduction-calculator-india' },
      { label: 'SIP / Savings Calculator', href: '/tools/sip-calculator-india' },
    ],
    tags: ['NPS', 'Pension', 'PFRDA', 'Tax Saving', '80CCD', 'Retirement', 'Annuity'],
    visualType: 'personal-finance',
    status: 'explainer',
  },
  {
    id: 'tds-26as-explainer',
    slug: 'tds-26as-explainer',
    title: 'Form 26AS and Annual Information Statement (AIS): How to Verify Your TDS Before Filing ITR',
    category: 'Income Tax',
    sourceName: 'Income Tax Department, Government of India',
    sourceUrl: 'https://incometax.gov.in',
    publishedDate: '2025-03-15',
    summary:
      'Form 26AS and the Annual Information Statement (AIS) are official tax summary documents available on the Income Tax portal. They show all TDS deducted on your behalf by employers, banks, and others. Discrepancies between Form 26AS and your ITR can trigger income tax notices.',
    whatHappened:
      "Form 26AS was the traditional annual tax credit statement. The Annual Information Statement (AIS) was introduced in November 2021 as a more comprehensive document. AIS includes TDS and TCS, interest income from all banks, dividend income, mutual fund transaction values, securities transactions, and foreign remittances — sourced from multiple agencies and linked to the taxpayer's PAN. Taxpayers can submit feedback on the AIS portal if any information appears incorrect, which is considered during tax processing. The AIS is available through the IT portal (incometax.gov.in → Login → AIS). Taxpayers Insight Service (TIS) — a summary of AIS — is also available for easier review.",
    whyItMatters:
      'Cross-checking Form 26AS and AIS before filing ITR helps avoid mismatches, rejected refunds, and tax notices from the department. Many taxpayers overlook TDS deducted on bank FD interest, dividend income, and mutual fund redemptions — all of which appear in AIS.',
    whoMayBeAffected:
      'All individuals and entities who file Income Tax Returns in India. Especially important for those with multiple income sources — salary, FD interest, capital gains, freelance income, and rental income. NRI investors with Indian income sources should verify TDS on NRO accounts.',
    whatToVerify:
      "Log in to incometax.gov.in → My Account → AIS / Form 26AS. Verify all entries match your salary slips, bank statements, Form 16, and investment documents before filing your return. If you see an error in AIS, use the 'Submit Feedback' option on the portal.",
    relatedRupeeKitLinks: [
      { label: '80C Deduction Calculator', href: '/tools/80c-deduction-calculator-india' },
    ],
    tags: ['Form 26AS', 'AIS', 'TDS', 'ITR', 'TCS', 'Annual Information Statement', 'Tax Filing'],
    visualType: 'income-tax',
    status: 'explainer',
  },
];
