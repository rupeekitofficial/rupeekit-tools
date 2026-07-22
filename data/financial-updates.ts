// Financial updates are populated only through a manual-review workflow
// using complete official sources and human approval.
// No auto-publishing, auto-merging, or auto-indexing.

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
  summary: string;
  whatHappened?: string;
  whyItMatters: string;
  whoMayBeAffected?: string;
  whatToVerify: string;
  announcementVsOrderNote?: string;
  relatedRupeeKitLinks: { label: string; href: string }[];
  tags?: string[];
  visualType?: string;
  status: 'official' | 'explainer' | 'sample';
}

// All previous placeholder/explainer updates have been removed.
// Only the current review-only EPFO story remains in the Financial Updates hub.
export const financialUpdates: FinancialUpdate[] = [
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
