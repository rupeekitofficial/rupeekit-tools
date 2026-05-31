import React from 'react';
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
  Image,
} from '@react-pdf/renderer';

Font.registerHyphenationCallback((word) => [word]);

export type SipPlanPdfInput = {
  label: string;
  value: string;
};

export type SipPlanPdfHighlight = {
  label: string;
  value: string;
};

export type SipPlanPdfMilestone = {
  label: string;
  invested: number;
  value: number;
  gains: number;
};

export type SipPlanPdfData = {
  generatedAt: string;
  logoUrl?: string;
  modeLabel: string;
  inputs: SipPlanPdfInput[];
  resultHighlights: SipPlanPdfHighlight[];
  stepUpComparison?: {
    regularFutureValue: number;
    stepUpFutureValue: number;
    investedDifference: number;
    gainsDifference: number;
    extraCorpus: number;
  };
  goalSummary?: {
    requiredMonthlySip: number;
    requiredWith5StepUp: number;
    requiredWith10StepUp: number;
    goalGapWithExistingSip: number;
    onTrackStatus: string;
  };
  delayCost: {
    startingNow: number;
    startingAfterOneYear: number;
    difference: number;
    note: string;
  };
  milestones: SipPlanPdfMilestone[];
  inflationAdjusted: {
    inflationRate: number;
    futureValue: number;
    presentValue: number;
  };
  reviewChecklist: string[];
  disclaimer: string;
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 24,
    paddingBottom: 36,
    paddingHorizontal: 24,
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#1b8a3a',
    paddingBottom: 8,
    marginBottom: 10,
  },
  logoWrap: {
    borderWidth: 1,
    borderColor: '#dbe5ef',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  logo: {
    width: 136,
    height: 28,
  },
  logoText: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: '#1b8a3a',
  },
  titleWrap: {
    maxWidth: 330,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 16,
    color: '#0f2f5a',
    fontFamily: 'Helvetica-Bold',
    textAlign: 'right',
  },
  subtitle: {
    fontSize: 8,
    color: '#475569',
    marginTop: 2,
    textAlign: 'right',
  },
  sectionCard: {
    borderWidth: 1,
    borderColor: '#d8e0ea',
    borderRadius: 8,
    backgroundColor: '#f8fafc',
    padding: 8,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 10,
    color: '#0f2f5a',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
    gap: 8,
  },
  rowLabel: {
    color: '#334155',
    flex: 1,
  },
  rowValue: {
    color: '#0f172a',
    fontFamily: 'Helvetica-Bold',
    textAlign: 'right',
    flexShrink: 0,
  },
  twoCol: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  col: {
    width: '49%',
    borderWidth: 1,
    borderColor: '#d8e0ea',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    padding: 8,
  },
  colTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#0f2f5a',
    marginBottom: 5,
  },
  checklistItem: {
    marginBottom: 4,
    lineHeight: 1.35,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e8f1ff',
    borderBottomWidth: 1,
    borderBottomColor: '#d8e0ea',
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  tableHeaderCell: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    color: '#0f2f5a',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e7ebf1',
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  tableCell: {
    fontSize: 7.5,
    color: '#0f172a',
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 12,
    borderTopWidth: 1,
    borderTopColor: '#d8e0ea',
    paddingTop: 4,
  },
  footerText: {
    fontSize: 7,
    color: '#475569',
    lineHeight: 1.35,
  },
});

function formatCurrency(value: number) {
  if (!Number.isFinite(value)) return 'Rs 0';
  return `Rs ${Math.round(value).toLocaleString('en-IN')}`;
}

function formatPercent(value: number) {
  if (!Number.isFinite(value)) return '0.00%';
  return `${value.toFixed(2)}%`;
}

function Header({ data }: { data: SipPlanPdfData }) {
  return (
    <View style={styles.header} fixed>
      <View style={styles.logoWrap}>
        {data.logoUrl ? (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image src={data.logoUrl} style={styles.logo} />
        ) : (
          <Text style={styles.logoText}>RupeeKit</Text>
        )}
      </View>
      <View style={styles.titleWrap}>
        <Text style={styles.title}>SIP Plan Report</Text>
        <Text style={styles.subtitle}>Mode: {data.modeLabel}</Text>
        <Text style={styles.subtitle}>Generated: {data.generatedAt}</Text>
      </View>
    </View>
  );
}

function KeyValueSection({
  title,
  rows,
}: {
  title: string;
  rows: Array<{ label: string; value: string }>;
}) {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {rows.map((row) => (
        <View key={`${title}-${row.label}`} style={styles.row}>
          <Text style={styles.rowLabel}>{row.label}</Text>
          <Text style={styles.rowValue}>{row.value}</Text>
        </View>
      ))}
    </View>
  );
}

function DelayAndInflation({ data }: { data: SipPlanPdfData }) {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>Delay cost and inflation-adjusted view</Text>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Starting now (estimated value)</Text>
        <Text style={styles.rowValue}>{formatCurrency(data.delayCost.startingNow)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Starting after 1 year (estimated value)</Text>
        <Text style={styles.rowValue}>{formatCurrency(data.delayCost.startingAfterOneYear)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Estimated difference</Text>
        <Text style={styles.rowValue}>{formatCurrency(data.delayCost.difference)}</Text>
      </View>
      <Text style={{ marginTop: 2, color: '#475569', lineHeight: 1.35 }}>{data.delayCost.note}</Text>

      <View style={{ marginTop: 6 }}>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Inflation assumption</Text>
          <Text style={styles.rowValue}>{formatPercent(data.inflationAdjusted.inflationRate)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Estimated future value</Text>
          <Text style={styles.rowValue}>{formatCurrency(data.inflationAdjusted.futureValue)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Approx present-value equivalent</Text>
          <Text style={styles.rowValue}>{formatCurrency(data.inflationAdjusted.presentValue)}</Text>
        </View>
      </View>
    </View>
  );
}

function MilestonesTable({ milestones }: { milestones: SipPlanPdfMilestone[] }) {
  const rows = milestones.slice(0, 8);
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>Year-wise milestone schedule</Text>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderCell, { width: '34%' }]}>Milestone</Text>
        <Text style={[styles.tableHeaderCell, { width: '22%', textAlign: 'right' }]}>Invested</Text>
        <Text style={[styles.tableHeaderCell, { width: '22%', textAlign: 'right' }]}>Value</Text>
        <Text style={[styles.tableHeaderCell, { width: '22%', textAlign: 'right' }]}>Gains</Text>
      </View>
      {rows.map((row, index) => (
        <View key={`${row.label}-${index}`} style={styles.tableRow}>
          <Text style={[styles.tableCell, { width: '34%' }]}>{row.label}</Text>
          <Text style={[styles.tableCell, { width: '22%', textAlign: 'right' }]}>{formatCurrency(row.invested)}</Text>
          <Text style={[styles.tableCell, { width: '22%', textAlign: 'right' }]}>{formatCurrency(row.value)}</Text>
          <Text style={[styles.tableCell, { width: '22%', textAlign: 'right' }]}>{formatCurrency(row.gains)}</Text>
        </View>
      ))}
    </View>
  );
}

function ChecklistAndDisclaimer({ data }: { data: SipPlanPdfData }) {
  return (
    <View style={styles.twoCol}>
      <View style={styles.col}>
        <Text style={styles.colTitle}>SIP review checklist</Text>
        {data.reviewChecklist.map((item) => (
          <Text key={item} style={styles.checklistItem}>
            - {item}
          </Text>
        ))}
      </View>
      <View style={styles.col}>
        <Text style={styles.colTitle}>Educational disclaimer</Text>
        <Text style={{ lineHeight: 1.35 }}>{data.disclaimer}</Text>
      </View>
    </View>
  );
}

function PageOne({ data }: { data: SipPlanPdfData }) {
  const comparisonRows = data.stepUpComparison
    ? [
        { label: 'Regular SIP future value', value: formatCurrency(data.stepUpComparison.regularFutureValue) },
        { label: 'Step-Up SIP future value', value: formatCurrency(data.stepUpComparison.stepUpFutureValue) },
        { label: 'Total invested difference', value: formatCurrency(data.stepUpComparison.investedDifference) },
        { label: 'Estimated gains difference', value: formatCurrency(data.stepUpComparison.gainsDifference) },
        { label: 'Extra estimated corpus from step-up', value: formatCurrency(data.stepUpComparison.extraCorpus) },
      ]
    : null;

  const goalRows = data.goalSummary
    ? [
        { label: 'Required monthly SIP', value: formatCurrency(data.goalSummary.requiredMonthlySip) },
        { label: 'Required SIP with 5% annual step-up', value: formatCurrency(data.goalSummary.requiredWith5StepUp) },
        { label: 'Required SIP with 10% annual step-up', value: formatCurrency(data.goalSummary.requiredWith10StepUp) },
        { label: 'Goal gap with existing SIP', value: formatCurrency(data.goalSummary.goalGapWithExistingSip) },
        { label: 'On-track status', value: data.goalSummary.onTrackStatus },
      ]
    : null;

  return (
    <Page size="A4" style={styles.page}>
      <Header data={data} />
      <KeyValueSection title="Inputs used" rows={data.inputs} />
      <KeyValueSection title="Estimated results" rows={data.resultHighlights} />
      {comparisonRows ? <KeyValueSection title="Step-up comparison" rows={comparisonRows} /> : null}
      {goalRows ? <KeyValueSection title="Goal SIP result" rows={goalRows} /> : null}
      <DelayAndInflation data={data} />

      <View style={styles.footer} fixed>
        <Text style={styles.footerText}>
          Educational estimate only. RupeeKit does not recommend any mutual fund or guarantee returns.
        </Text>
        <Text style={styles.footerText} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
      </View>
    </Page>
  );
}

function PageTwo({ data }: { data: SipPlanPdfData }) {
  return (
    <Page size="A4" style={styles.page}>
      <Header data={data} />
      <MilestonesTable milestones={data.milestones} />
      <ChecklistAndDisclaimer data={data} />

      <View style={styles.footer} fixed>
        <Text style={styles.footerText}>{data.disclaimer}</Text>
        <Text style={styles.footerText} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
      </View>
    </Page>
  );
}

export function SipPlanPdfDocument({ data }: { data: SipPlanPdfData }) {
  return (
    <Document
      title="SIP Plan Report"
      author="RupeeKit"
      subject="SIP planning estimate report"
      creator="RupeeKit"
    >
      <PageOne data={data} />
      <PageTwo data={data} />
    </Document>
  );
}

