// Financial updates are populated only through a manual-review workflow
// using complete official sources and human approval.
// No auto-publishing, auto-merging, or auto-indexing.

export interface FinancialUpdateLink {
  label: string;
  href: string;
}

export interface FinancialUpdateFaq {
  question: string;
  answer: string;
}

export interface FinancialUpdateSlide {
  src: string;
  alt: string;
  caption: string;
}

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
  officialSources?: FinancialUpdateLink[];
  publishedDate: string;
  modifiedDate?: string;
  lastReviewed?: string;
  effectiveDate?: string;
  summary: string;
  quickAnswer?: string;
  storyTitle?: string;
  story?: string;
  whatHappened?: string;
  officialFacts?: string[];
  plainLanguageExplanation?: string;
  whyItMatters: string;
  whoMayBeAffected?: string;
  whoMayNotBeAffected?: string;
  realisticExample?: {
    title: string;
    body: string;
  };
  practicalSteps?: string[];
  commonMisunderstandings?: {
    claim: string;
    reality: string;
  }[];
  whatToVerify: string;
  announcementVsOrderNote?: string;
  methodology?: string;
  relatedRupeeKitLinks: FinancialUpdateLink[];
  tags?: string[];
  visualType?: string;
  schemaType?: 'Article' | 'NewsArticle';
  heroImage?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  carouselSlides?: FinancialUpdateSlide[];
  faqs?: FinancialUpdateFaq[];
  status: 'official' | 'explainer' | 'sample';
}

export const financialUpdates: FinancialUpdate[] = [
  {
    id: 'foreign-assets-information-in-ais-july-2026',
    slug: 'foreign-assets-information-in-ais-july-2026',
    title: 'Foreign Assets Now Visible in AIS: What Indian Taxpayers Should Check Before Filing',
    category: 'Income Tax',
    sourceName: 'Central Board of Direct Taxes, Ministry of Finance, Government of India',
    sourceUrl:
      'https://www.incometax.gov.in/iec/foportal/sites/default/files/2026-07/Annexure.pdf',
    officialSources: [
      {
        label: 'CBDT taxpayer information note dated 20 July 2026',
        href: 'https://www.incometax.gov.in/iec/foportal/sites/default/files/2026-07/Annexure.pdf',
      },
      {
        label: 'CBDT office memorandum dated 17 July 2026',
        href: 'https://www.incometax.gov.in/iec/foportal/sites/default/files/2026-07/OM_17.07.2026_Hosting%20of%20Note%20on%20CRS%20in%20AIS.pdf',
      },
      {
        label: 'Income Tax Department latest news page',
        href: 'https://www.incometax.gov.in/iec/foportal/latest-news',
      },
    ],
    publishedDate: '2026-07-20',
    modifiedDate: '2026-07-23',
    lastReviewed: '23 July 2026',
    effectiveDate:
      'The feature is available on the Income Tax e-Filing portal. The official note says information received for calendar years 2022, 2023 and 2024 is currently displayed. Calendar year 2025 information is expected after it is received in September or October 2026.',
    summary:
      'CBDT has enabled eligible taxpayers to view certain foreign-asset and foreign-income information received from partner jurisdictions inside the Annual Information Statement. The facility is meant to help with accurate reporting, but the displayed information may not be complete.',
    quickAnswer:
      'CBDT has added a Foreign Assets Information report under AIS for taxpayers whose information has been received through international exchange arrangements. It is a taxpayer-support feature, not a standalone scrutiny or investigation notice. Use it as a cross-check, because applicable foreign assets and foreign-source income may still need to be reported even when an item does not appear in AIS.',
    storyTitle: 'Neha found a foreign account in AIS and immediately worried',
    story:
      'Neha is an Indian software professional who worked overseas for a short period. She still has a small foreign bank account and received a little interest. While preparing her return, she opens AIS and sees a new Foreign Assets Information report. Her first thought is that she has received a tax notice. The official CBDT note gives a calmer explanation: the report is designed to show information already available with the Department so taxpayers can cross-check their records and report correctly. Neha downloads the report, compares it with her own bank and investment statements, and does not assume that a missing item can be ignored.',
    whatHappened:
      'CBDT enabled the display of foreign-asset and foreign-income information received under the Automatic Exchange of Information framework, including CRS and FATCA reporting, in the AIS of eligible taxpayers. The report is available through the Reports section of the Compliance Portal linked from AIS.',
    officialFacts: [
      'India receives financial-account information relating to tax residents from more than 100 partner jurisdictions under international information-exchange arrangements.',
      'The information may include foreign bank accounts, custodial accounts, certain financial investments, interest, dividends and other specified financial income reported by partner jurisdictions.',
      'The official note says calendar-year information for 2022, 2023 and 2024 is currently displayed. Calendar-year 2025 information is expected after receipt in September or October 2026.',
      'The report is accessible only to the concerned taxpayer through secure login credentials on the e-Filing portal.',
      'CBDT describes the initiative as facilitative and not as a scrutiny or investigation tool.',
    ],
    plainLanguageExplanation:
      'Think of this report as an extra checklist supplied by the Income Tax Department. It can help you notice an overseas account or income entry before filing. It is not a complete inventory, so it should be compared with your own records rather than treated as the final answer.',
    whyItMatters:
      'Foreign accounts, investments and income can be easy to overlook, especially when an account is old, has a small balance or was opened during overseas employment. The new AIS view may reduce accidental omissions, but it does not transfer responsibility for complete reporting from the taxpayer to the portal.',
    whoMayBeAffected:
      'Taxpayers for whom the Department has received foreign financial information, including people who hold or previously held foreign bank or custodial accounts, certain overseas investments, or received foreign interest, dividends or other specified financial income.',
    whoMayNotBeAffected:
      'People with no foreign financial assets, foreign accounts or foreign-source income may not see any information in this report. The official note does not provide a broader eligibility definition beyond taxpayers for whom information is available. Return-form and schedule applicability can vary, so users should verify their own position from official guidance or qualified tax help.',
    realisticExample: {
      title: 'Example: one item appears, another does not',
      body:
        'Neha’s AIS report shows her foreign bank account and interest received during calendar year 2024, but it does not show a small overseas investment she still holds. She should not conclude that the investment is irrelevant merely because it is absent from AIS. She compares the report with her own records and verifies whether Schedule FA, Schedule FSI or another return disclosure applies to her circumstances.',
    },
    practicalSteps: [
      'Visit the official Income Tax e-Filing portal and log in using your own secure credentials.',
      'Open AIS. The portal will direct you to the Compliance Portal.',
      'Choose Reports, then select Foreign Assets Information.',
      'Select the relevant calendar year and download the PDF report.',
      'Compare the report with your foreign bank, investment and income records.',
      'Verify the correct return form and the applicability of Schedule FA and Schedule FSI before filing.',
    ],
    commonMisunderstandings: [
      {
        claim: 'Seeing this report means I have received a tax notice.',
        reality:
          'CBDT says the feature is designed for taxpayer facilitation and is not a scrutiny or investigation tool.',
      },
      {
        claim: 'AIS contains every foreign asset and every foreign-income item.',
        reality:
          'The official note says the displayed information is not complete or exhaustive. It only reflects information received through the relevant exchange arrangements.',
      },
      {
        claim: 'If an asset is missing from AIS, I do not need to report it.',
        reality:
          'The official note says taxpayers must correctly and completely report applicable foreign assets and foreign-source income irrespective of whether they appear in AIS.',
      },
      {
        claim: 'Calendar year and assessment year are the same thing.',
        reality:
          'The report is organised by calendar year, while the return is filed for an assessment year. Match the information carefully and verify the correct reporting period.',
      },
    ],
    whatToVerify:
      'Check that you selected the correct calendar year, compare the downloaded report with your own records, and verify the correct return form and disclosure schedules. Do not share PAN, passwords, OTPs or downloaded AIS data with untrusted persons. Use only the official e-Filing portal or a qualified tax professional for case-specific help.',
    announcementVsOrderNote:
      'The 20 July taxpayer note explains the feature and its use. The underlying CBDT office memorandum is dated 17 July 2026 and requests that the explanatory note be hosted on the e-Filing portal. Neither document changes the basic requirement to report applicable foreign assets and foreign-source income correctly.',
    methodology:
      'RupeeKit reviewed the CBDT office memorandum, the enclosed eight-page taxpayer information note, the access steps and the stated calendar-year coverage. This explanation separates direct official facts from RupeeKit’s plain-language interpretation. No personalised conclusion about residence status, return-form selection, Schedule FA, Schedule FSI or tax liability is made.',
    relatedRupeeKitLinks: [
      {
        label: 'ITR-2 Filing Guide for AY 2026-27',
        href: '/blog/itr-2-ay-2026-27-filing-guide',
      },
      {
        label: 'Income Tax Old vs New Regime Calculator',
        href: '/tools/income-tax-calculator-old-vs-new-regime-india',
      },
      {
        label: 'Capital Gains Tax Calculator India',
        href: '/tools/capital-gains-tax-calculator-india',
      },
    ],
    tags: [
      'AIS',
      'Foreign Assets',
      'Foreign Income',
      'Schedule FA',
      'Schedule FSI',
      'CBDT',
      'AY 2026-27',
    ],
    visualType: 'income-tax',
    schemaType: 'NewsArticle',
    heroImage: {
      src: '/images/updates/cbdt-foreign-assets-ais/hero-foreign-assets-ais.svg',
      alt: 'Indian taxpayer reviewing the new Foreign Assets Information report inside the Annual Information Statement before filing an income-tax return',
      width: 1600,
      height: 900,
    },
    carouselSlides: [
      {
        src: '/images/updates/cbdt-foreign-assets-ais/slide-1-neha-sees-ais.svg',
        alt: 'Indian professional Neha notices the Foreign Assets Information option under Reports in the AIS portal',
        caption: 'Neha notices a new Foreign Assets Information report while preparing her return.',
      },
      {
        src: '/images/updates/cbdt-foreign-assets-ais/slide-2-not-a-tax-notice.svg',
        alt: 'Visual comparison explaining that the AIS foreign-assets feature is for taxpayer support and not a standalone investigation notice',
        caption: 'CBDT describes the feature as facilitative, not as a scrutiny or investigation tool.',
      },
      {
        src: '/images/updates/cbdt-foreign-assets-ais/slide-3-what-may-appear.svg',
        alt: 'Story slide showing foreign bank accounts, custodial accounts, investments, interest and dividends that may appear in AIS',
        caption: 'The report may contain several categories of information received from partner jurisdictions.',
      },
      {
        src: '/images/updates/cbdt-foreign-assets-ais/slide-4-how-to-check.svg',
        alt: 'Five-step visual showing how to open AIS Reports and download Foreign Assets Information for a selected calendar year',
        caption: 'The official note provides a five-step route to download the report.',
      },
      {
        src: '/images/updates/cbdt-foreign-assets-ais/slide-5-ais-not-complete.svg',
        alt: 'Visual warning that the Foreign Assets Information report in AIS may not contain every applicable foreign asset or income item',
        caption: 'AIS is a cross-check, not a complete inventory of every foreign asset or income item.',
      },
      {
        src: '/images/updates/cbdt-foreign-assets-ais/slide-6-next-steps.svg',
        alt: 'Indian taxpayer comparing the AIS foreign-assets report with personal bank and investment records before filing',
        caption: 'Compare the report with personal records and verify the correct return schedules before filing.',
      },
    ],
    faqs: [
      {
        question: 'Is Foreign Assets Information in AIS a tax notice?',
        answer:
          'No. CBDT describes the feature as a taxpayer-facilitation initiative and says it is not designed as a scrutiny or investigation tool. It still deserves careful review because it can help identify information relevant to return filing.',
      },
      {
        question: 'What information can appear in the AIS foreign-assets report?',
        answer:
          'The official note says it may include foreign bank accounts, custodial accounts, certain financial investments, interest, dividends and other specified financial income reported by partner jurisdictions.',
      },
      {
        question: 'Which calendar years are currently available?',
        answer:
          'The official note says information received for calendar years 2022, 2023 and 2024 is currently displayed. Calendar year 2025 information is expected after it is received in September or October 2026.',
      },
      {
        question: 'Where can I find Foreign Assets Information in AIS?',
        answer:
          'Log in to the official e-Filing portal, open AIS, go to the Compliance Portal, choose Reports, select Foreign Assets Information, choose the calendar year and download the PDF.',
      },
      {
        question: 'What should I do if a foreign asset is missing from AIS?',
        answer:
          'Do not assume that a missing item has no reporting requirement. CBDT says the AIS display is not complete or exhaustive and applicable foreign assets and foreign-source income must be reported correctly regardless of whether they appear in AIS.',
      },
      {
        question: 'Which income-tax schedules may be relevant?',
        answer:
          'The official note refers to Schedule FA and Schedule FSI wherever applicable. The correct return form and schedule depend on the taxpayer’s facts, so verify official guidance or seek qualified tax help.',
      },
      {
        question: 'Can another person view my foreign-assets report?',
        answer:
          'CBDT says the information is accessible only to the concerned taxpayer through secure login credentials on the e-Filing portal. Never share passwords, OTPs or downloaded reports with untrusted persons.',
      },
      {
        question: 'Can Kar Saathi help with foreign-asset reporting questions?',
        answer:
          'The CBDT note says taxpayers may use Kar Saathi, the e-Filing portal’s virtual assistant, for guidance on return-form selection, foreign-asset and foreign-income reporting, and other tax-related queries.',
      },
    ],
    status: 'official',
  },
  {
    id: 'epfo-services-restored-july-2026',
    slug: 'epfo-services-restored-july-2026',
    title: 'EPFO Services Are Back After an Upgrade: Should You Submit Your Claim Again?',
    category: 'Personal Finance',
    sourceName:
      'Employees’ Provident Fund Organisation, Ministry of Labour & Employment, Government of India',
    sourceUrl: 'https://unifiedportal-emp.epfindia.gov.in/',
    publishedDate: '2026-07-22',
    summary:
      'EPFO says its member and employer services are live again after a database consolidation and software upgrade. Some claims and service requests may still move gradually while the upgraded system stabilises and completes additional checks.',
    whatHappened:
      'EPFO stated that it completed a major database consolidation and software upgrade. Member and employer services were restored in phases. During the initial stabilisation period, claims and service requests may be processed gradually with additional verification and validation checks.',
    whyItMatters:
      'Members checking passbooks, claim status, or other online services may see slower updates even though the portal is available again. People who have already submitted a valid request should first check the existing status instead of creating repeated duplicate requests.',
    whoMayBeAffected:
      'EPF members using the online portal, employers using EPFO services, and people with pending claims or service requests during the post-upgrade stabilisation period.',
    whatToVerify:
      'Use only the official EPFO portal. Check the status of an existing claim before submitting another request, keep the acknowledgement or claim reference safely recorded, and use EPFO’s official support channels if the problem continues.',
    relatedRupeeKitLinks: [
      {
        label: 'EPF Corpus Calculator India',
        href: '/tools/epf-corpus-calculator-india',
      },
      {
        label: 'Salary In-Hand Calculator India',
        href: '/tools/salary-in-hand-calculator-india',
      },
    ],
    tags: ['EPFO', 'EPF Claim', 'UAN', 'Provident Fund', 'Official Update'],
    visualType: 'personal-finance',
    status: 'official',
  },
];
