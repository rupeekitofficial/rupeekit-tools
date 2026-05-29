import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from '@react-pdf/renderer';

export interface HraChecklistPdfData {
  generatedAt: string;
  logoUrl?: string;
  basicSalary?: number;
  dearnessAllowance?: number;
  commission?: number;
  hraReceived?: number;
  rentPaid?: number;
  cityRatePercent?: number;
  actualHra?: number;
  rentMinusTenPercent?: number;
  salaryCapAmount?: number;
  estimatedExemptHra?: number;
  taxableHra?: number;
}

Font.registerHyphenationCallback((word) => [word]);

const GREEN = '#2e7d32';
const GREEN_SOFT = '#e8f5e9';
const BORDER = '#d0d7de';
const TEXT_DARK = '#0f172a';
const TEXT_MUTED = '#475569';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: TEXT_DARK,
    paddingTop: 34,
    paddingBottom: 40,
    paddingHorizontal: 36,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: GREEN,
    paddingBottom: 10,
    marginBottom: 14,
  },
  logo: {
    width: 130,
    height: 28,
  },
  logoText: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: GREEN,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: GREEN,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 10,
    color: TEXT_MUTED,
  },
  generatedAt: {
    fontSize: 8,
    color: TEXT_MUTED,
  },
  section: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 6,
    padding: 10,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: GREEN,
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    gap: 8,
  },
  label: {
    width: '60%',
    color: TEXT_MUTED,
  },
  value: {
    width: '40%',
    textAlign: 'right',
    fontFamily: 'Helvetica-Bold',
    color: TEXT_DARK,
  },
  listItem: {
    marginBottom: 4,
    lineHeight: 1.4,
  },
  callout: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#c8e6c9',
    borderRadius: 6,
    padding: 9,
    backgroundColor: GREEN_SOFT,
  },
  calloutText: {
    fontSize: 9,
    color: '#1b5e20',
    lineHeight: 1.45,
  },
  checklistItem: {
    marginBottom: 5,
    lineHeight: 1.45,
  },
  footer: {
    position: 'absolute',
    left: 36,
    right: 36,
    bottom: 18,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingTop: 6,
  },
  footerText: {
    fontSize: 8,
    color: TEXT_MUTED,
    marginBottom: 2,
  },
});

function formatCurrency(value?: number): string {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '________';
  return `Rs ${Math.round(value).toLocaleString('en-IN')}`;
}

function formatPercent(value?: number): string {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '____';
  return `${value}%`;
}

function formatYesNo(value?: number): string {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 'Yes / No';
  return value >= 50 ? 'Yes' : 'No';
}

export function HraChecklistPdfDocument({ data }: { data: HraChecklistPdfData }) {
  const hasSalaryParts =
    typeof data.basicSalary === 'number' || typeof data.dearnessAllowance === 'number';
  const salaryTotal =
    (typeof data.basicSalary === 'number' ? data.basicSalary : 0) +
    (typeof data.dearnessAllowance === 'number' ? data.dearnessAllowance : 0);

  return (
    <Document
      title="HRA Exemption Checklist FY 2026-27"
      author="RupeeKit"
      subject="HRA quick worksheet and checklist"
      creator="RupeeKit"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            {data.logoUrl ? (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image src={data.logoUrl} style={styles.logo} />
            ) : (
              <Text style={styles.logoText}>RupeeKit</Text>
            )}
            <Text style={styles.generatedAt}>Generated: {data.generatedAt}</Text>
          </View>
        </View>

        <Text style={styles.title}>HRA Exemption Checklist FY 2026-27</Text>
        <Text style={styles.subtitle}>Old Regime Rule 279 Quick Worksheet</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>A. Your Inputs</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Basic salary + DA</Text>
            <Text style={styles.value}>{hasSalaryParts ? formatCurrency(salaryTotal) : '________'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>HRA received</Text>
            <Text style={styles.value}>{formatCurrency(data.hraReceived)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Rent paid</Text>
            <Text style={styles.value}>{formatCurrency(data.rentPaid)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>City cap selected</Text>
            <Text style={styles.value}>{formatPercent(data.cityRatePercent)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>50% city?</Text>
            <Text style={styles.value}>{formatYesNo(data.cityRatePercent)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>B. HRA Formula</Text>
          <Text style={styles.listItem}>Your exempt HRA is the least of:</Text>
          <Text style={styles.listItem}>1. Actual HRA received</Text>
          <Text style={styles.listItem}>2. Rent paid minus 10% of salary</Text>
          <Text style={styles.listItem}>3. 50% or 40% of salary based on city</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>C. 50% HRA City List</Text>
          <Text style={styles.listItem}>
            Mumbai, Kolkata, Delhi, Chennai, Hyderabad, Pune, Ahmedabad, Bengaluru
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>D. Your Result</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Actual HRA</Text>
            <Text style={styles.value}>{formatCurrency(data.actualHra)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Rent minus 10% salary</Text>
            <Text style={styles.value}>{formatCurrency(data.rentMinusTenPercent)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Salary cap</Text>
            <Text style={styles.value}>{formatCurrency(data.salaryCapAmount)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Estimated exempt HRA</Text>
            <Text style={styles.value}>{formatCurrency(data.estimatedExemptHra)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Taxable HRA</Text>
            <Text style={styles.value}>{formatCurrency(data.taxableHra)}</Text>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Generated by RupeeKit</Text>
          <Text style={styles.footerText}>Educational estimate only. Not tax or legal advice.</Text>
          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
          />
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            {data.logoUrl ? (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image src={data.logoUrl} style={styles.logo} />
            ) : (
              <Text style={styles.logoText}>RupeeKit</Text>
            )}
          </View>
        </View>

        <Text style={styles.title}>Documents and Claim Checklist</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Claim documents</Text>
          <Text style={styles.checklistItem}>[ ] Rent receipts</Text>
          <Text style={styles.checklistItem}>[ ] Rent agreement, if available</Text>
          <Text style={styles.checklistItem}>[ ] Landlord PAN, where applicable</Text>
          <Text style={styles.checklistItem}>[ ] Landlord address</Text>
          <Text style={styles.checklistItem}>[ ] Landlord relationship, if any</Text>
          <Text style={styles.checklistItem}>[ ] Salary slip</Text>
          <Text style={styles.checklistItem}>[ ] Employer HRA declaration</Text>
          <Text style={styles.checklistItem}>[ ] Bank transfer proof, if rent was paid digitally</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Common mistakes checklist</Text>
          <Text style={styles.checklistItem}>[ ] Claiming HRA under the wrong regime</Text>
          <Text style={styles.checklistItem}>[ ] Using 40% for Bengaluru, Hyderabad, Pune or Ahmedabad</Text>
          <Text style={styles.checklistItem}>[ ] Not keeping rent proof</Text>
          <Text style={styles.checklistItem}>[ ] Assuming full HRA is automatically exempt</Text>
          <Text style={styles.checklistItem}>[ ] Forgetting landlord PAN where required</Text>
        </View>

        <View style={styles.callout}>
          <Text style={styles.calloutText}>
            Where the applicable employer declaration or prescribed form asks for landlord details, keep
            the landlord name, address, PAN/Aadhaar where applicable, rent paid and relationship with
            the landlord ready.
          </Text>
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Generated by RupeeKit</Text>
          <Text style={styles.footerText}>Educational estimate only. Not tax or legal advice.</Text>
          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
          />
        </View>
      </Page>
    </Document>
  );
}
