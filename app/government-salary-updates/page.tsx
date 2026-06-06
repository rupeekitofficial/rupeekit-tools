import type { Metadata } from 'next';
import GovernmentSalaryUpdatesClient from '@/components/updates/GovernmentSalaryUpdatesClient';
import { buildDiscoverOgImage, INDEXABLE_ROBOTS, SITE_NAME, SITE_URL } from '@/lib/seo';

const TITLE = 'Government Salary Updates, DA, Pension and Pay Explainers | RupeeKit';
const DESCRIPTION =
  'Track India government salary updates including DA, DR, pay revision, pension, arrears and official circular summaries with educational explanations.';
const ogImage = buildDiscoverOgImage({
  kind: 'government-salary-hub',
  title: 'Government Salary Updates, DA, Pension and Pay Explainers',
  summary: DESCRIPTION,
  category: 'Salary updates',
});

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/government-salary-updates`,
  },
  robots: INDEXABLE_ROBOTS,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/government-salary-updates`,
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_IN',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [ogImage.url],
  },
};

export default function GovernmentSalaryUpdatesPage() {
  return <GovernmentSalaryUpdatesClient />;
}
