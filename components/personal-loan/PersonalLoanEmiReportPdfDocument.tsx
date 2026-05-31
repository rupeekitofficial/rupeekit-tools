import React from 'react';
import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

Font.registerHyphenationCallback((word) => [word]);

export type PersonalLoanTenureRow = {
  tenure: number;
  monthlyEmi: number;
  totalInterest: number;
  totalRepayment: number;
  extraInterestVsShortest?: number;
};

export type PersonalLoanAmortizationRow = {
  yearLabel: string;
  emiPaid: number;
  principalPaid: number;
  interestPaid: number;
  closingBalance: number;
};

export type PersonalLoanMonthlyScheduleRow = {
  month: number;
  emi: number;
  principalPaid: number;
  interestPaid: number;
  closingBalance: number;
};

export type PersonalLoanPrepaymentScenario = {
  mode: 'reduce-tenure' | 'reduce-emi';
  prepaymentAmount: number;
  prepaymentAfterMonth: number;
  originalTotalInterest: number;
  revisedTotalInterest: number;
  interestSaved: number;
  monthsReduced: number;
  revisedEmi: number;
  revisedTenureMonths: number;
  revisedTotalRepayment: number;
};

export type PersonalLoanPauseScenario = {
  pauseMonths: number;
  restartOption: 'same-emi' | 'higher-emi';
  unpaidEmiAmount: number;
  possibleRepaymentDelayMonths: number;
  estimatedExtraInterestImpact: number;
  revisedEmi: number;
};

export interface PersonalLoanEmiReportPdfData {
  generatedAt: string;
  logoUrl?: string;
  principal: number;
  annualInterestRate: number;
  tenureMonths: number;
  processingFeePercent: number;
  processingFeeFixedAmount?: number;
  includeGstOnProcessingFee?: boolean;
  processingFeeGstRate?: number;
  insuranceAddonFee?: number;
  documentationFee?: number;
  monthlyIncome: number;
  existingMonthlyEmi: number;
  monthlyEmi: number;
  totalInterest: number;
  totalRepayment: number;
  estimatedProcessingFee?: number;
  processingFee?: number;
  gstOnProcessingFee?: number;
  optionalAddOnCost?: number;
  totalUpfrontCharges?: number;
  totalCostWithFee: number;
  netDisbursedAmount?: number;
  emiToIncomePercent: number;
  totalEmiBurdenPercent: number;
  affordabilityStatus?: string;
  tenureComparison: PersonalLoanTenureRow[];
  amortization: PersonalLoanAmortizationRow[];
  monthlySchedule?: PersonalLoanMonthlyScheduleRow[];
  prepaymentScenario?: PersonalLoanPrepaymentScenario;
  pauseScenario?: PersonalLoanPauseScenario;
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 24,
    paddingBottom: 34,
    paddingHorizontal: 24,
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#0f172a',
    backgroundColor: '#ffffff',
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
    color: '#1b8a3a',
    fontFamily: 'Helvetica-Bold',
  },
  titleWrap: {
    alignItems: 'flex-end',
    maxWidth: 340,
  },
  title: {
    fontSize: 16,
    color: '#0f2f5a',
    fontFamily: 'Helvetica-Bold',
    textAlign: 'right',
  },
  subtitle: {
    marginTop: 2,
    fontSize: 8,
    color: '#4b5563',
    textAlign: 'right',
  },
  sectionCard: {
    borderWidth: 1,
    borderColor: '#d7dce3',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    padding: 8,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 10,
    color: '#0f2f5a',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
  },
  kpiGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  kpiCard: {
    width: '32%',
    borderWidth: 1,
    borderColor: '#d4e5fb',
    borderRadius: 9,
    backgroundColor: '#f5f9ff',
    padding: 7,
  },
  kpiLabel: {
    fontSize: 7.5,
    color: '#4b5563',
    textTransform: 'uppercase',
  },
  kpiValue: {
    fontSize: 12,
    marginTop: 2,
    color: '#0f2f5a',
    fontFamily: 'Helvetica-Bold',
  },
  pairRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  pairCard: {
    width: '49%',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    backgroundColor: '#f8fafc',
    padding: 6,
  },
  pairLabel: {
    fontSize: 7.5,
    color: '#4b5563',
  },
  pairValue: {
    marginTop: 2,
    fontSize: 10,
    color: '#0f172a',
    fontFamily: 'Helvetica-Bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  rowLabel: {
    fontSize: 8,
    color: '#4b5563',
  },
  rowValue: {
    fontSize: 8,
    color: '#0f172a',
    fontFamily: 'Helvetica-Bold',
    textAlign: 'right',
  },
  note: {
    marginTop: 5,
    fontSize: 7.6,
    lineHeight: 1.4,
    color: '#374151',
  },
  tableWrap: {
    borderWidth: 1,
    borderColor: '#d7dce3',
    borderRadius: 9,
    marginTop: 5,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f9ff',
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#d7dce3',
  },
  tableHeaderText: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    color: '#0f2f5a',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e7ebf1',
  },
  tableCell: {
    fontSize: 7.5,
    color: '#0f172a',
  },
  tableCellRight: {
    fontSize: 7.5,
    color: '#0f172a',
    textAlign: 'right',
  },
  pill: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    borderRadius: 8,
    backgroundColor: '#eff6ff',
    padding: 6,
  },
  pillText: {
    fontSize: 7.6,
    color: '#1e293b',
    lineHeight: 1.4,
  },
  checklistRow: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checklistCol: {
    width: '49%',
    borderWidth: 1,
    borderColor: '#d7dce3',
    borderRadius: 8,
    backgroundColor: '#f8fafc',
    padding: 6,
  },
  checklistItem: {
    fontSize: 7.6,
    color: '#0f172a',
    lineHeight: 1.35,
    marginBottom: 2,
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#d7dce3',
    paddingTop: 4,
  },
  footerText: {
    fontSize: 7,
    lineHeight: 1.35,
    color: '#4b5563',
  },
});

function formatCurrency(value?: number) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 'Rs 0';
  return `Rs ${Math.round(value).toLocaleString('en-IN')}`;
}

function formatPercent(value?: number) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '0.00%';
  return `${value.toFixed(2)}%`;
}

function Header({ data }: { data: PersonalLoanEmiReportPdfData }) {
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
        <Text style={styles.title}>Personal Loan EMI Report</Text>
        <Text style={styles.subtitle}>Generated by RupeeKit</Text>
        {data.generatedAt ? <Text style={styles.subtitle}>Generated on: {data.generatedAt}</Text> : null}
      </View>
    </View>
  );
}

function InputSummary({ data }: { data: PersonalLoanEmiReportPdfData }) {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>Input summary</Text>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Loan amount</Text>
        <Text style={styles.rowValue}>{formatCurrency(data.principal)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Annual interest rate</Text>
        <Text style={styles.rowValue}>{formatPercent(data.annualInterestRate)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Tenure</Text>
        <Text style={styles.rowValue}>{Math.max(1, Math.round(data.tenureMonths))} months</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Processing fee (%)</Text>
        <Text style={styles.rowValue}>{formatPercent(data.processingFeePercent)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Processing fee fixed amount</Text>
        <Text style={styles.rowValue}>{formatCurrency(data.processingFeeFixedAmount)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>GST on processing fee</Text>
        <Text style={styles.rowValue}>
          {data.includeGstOnProcessingFee ? `Yes (${formatPercent(data.processingFeeGstRate)})` : 'No'}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Insurance/add-on fee</Text>
        <Text style={styles.rowValue}>{formatCurrency(data.insuranceAddonFee)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Documentation fee</Text>
        <Text style={styles.rowValue}>{formatCurrency(data.documentationFee)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Monthly income (optional)</Text>
        <Text style={styles.rowValue}>{formatCurrency(data.monthlyIncome)}</Text>
      </View>
    </View>
  );
}

function TenureComparisonTable({ rows }: { rows: PersonalLoanTenureRow[] }) {
  return (
    <View style={styles.tableWrap}>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, { width: 56 }]}>Tenure</Text>
        <Text style={[styles.tableHeaderText, { width: 106, textAlign: 'right' }]}>EMI</Text>
        <Text style={[styles.tableHeaderText, { width: 112, textAlign: 'right' }]}>Interest</Text>
        <Text style={[styles.tableHeaderText, { width: 112, textAlign: 'right' }]}>Repayment</Text>
        <Text style={[styles.tableHeaderText, { width: 122, textAlign: 'right' }]}>Extra vs 12m</Text>
      </View>
      {rows.map((row, index) => (
        <View key={`${row.tenure}-${index}`} style={styles.tableRow}>
          <Text style={[styles.tableCell, { width: 56 }]}>{row.tenure}m</Text>
          <Text style={[styles.tableCellRight, { width: 106 }]}>{formatCurrency(row.monthlyEmi)}</Text>
          <Text style={[styles.tableCellRight, { width: 112 }]}>{formatCurrency(row.totalInterest)}</Text>
          <Text style={[styles.tableCellRight, { width: 112 }]}>{formatCurrency(row.totalRepayment)}</Text>
          <Text style={[styles.tableCellRight, { width: 122 }]}>
            {formatCurrency(row.extraInterestVsShortest ?? 0)}
          </Text>
        </View>
      ))}
    </View>
  );
}

function YearlyAmortizationTable({ rows }: { rows: PersonalLoanAmortizationRow[] }) {
  return (
    <View style={styles.tableWrap}>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, { width: 56 }]}>Year</Text>
        <Text style={[styles.tableHeaderText, { width: 112, textAlign: 'right' }]}>EMI Paid</Text>
        <Text style={[styles.tableHeaderText, { width: 112, textAlign: 'right' }]}>Principal</Text>
        <Text style={[styles.tableHeaderText, { width: 112, textAlign: 'right' }]}>Interest</Text>
        <Text style={[styles.tableHeaderText, { width: 116, textAlign: 'right' }]}>Closing Bal.</Text>
      </View>
      {rows.map((row, index) => (
        <View key={`${row.yearLabel}-${index}`} style={styles.tableRow}>
          <Text style={[styles.tableCell, { width: 56 }]}>{row.yearLabel.replace('Year ', '')}</Text>
          <Text style={[styles.tableCellRight, { width: 112 }]}>{formatCurrency(row.emiPaid)}</Text>
          <Text style={[styles.tableCellRight, { width: 112 }]}>{formatCurrency(row.principalPaid)}</Text>
          <Text style={[styles.tableCellRight, { width: 112 }]}>{formatCurrency(row.interestPaid)}</Text>
          <Text style={[styles.tableCellRight, { width: 116 }]}>{formatCurrency(row.closingBalance)}</Text>
        </View>
      ))}
    </View>
  );
}

function PageOne({ data }: { data: PersonalLoanEmiReportPdfData }) {
  return (
    <Page size="A4" style={styles.page}>
      <Header data={data} />

      <View style={styles.kpiGrid}>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>Monthly EMI</Text>
          <Text style={styles.kpiValue}>{formatCurrency(data.monthlyEmi)}</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>Total Interest</Text>
          <Text style={styles.kpiValue}>{formatCurrency(data.totalInterest)}</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>Total Repayment</Text>
          <Text style={styles.kpiValue}>{formatCurrency(data.totalRepayment)}</Text>
        </View>
      </View>

      <View style={styles.pairRow}>
        <View style={styles.pairCard}>
          <Text style={styles.pairLabel}>Processing fee</Text>
          <Text style={styles.pairValue}>{formatCurrency(data.processingFee)}</Text>
        </View>
        <View style={styles.pairCard}>
          <Text style={styles.pairLabel}>GST on processing fee</Text>
          <Text style={styles.pairValue}>{formatCurrency(data.gstOnProcessingFee)}</Text>
        </View>
      </View>
      <View style={styles.pairRow}>
        <View style={styles.pairCard}>
          <Text style={styles.pairLabel}>Total cost including fees</Text>
          <Text style={styles.pairValue}>{formatCurrency(data.totalCostWithFee)}</Text>
        </View>
        <View style={styles.pairCard}>
          <Text style={styles.pairLabel}>Amount effectively received</Text>
          <Text style={styles.pairValue}>{formatCurrency(data.netDisbursedAmount)}</Text>
        </View>
      </View>

      <InputSummary data={data} />

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Affordability indicator</Text>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>EMI as % of income</Text>
          <Text style={styles.rowValue}>{formatPercent(data.emiToIncomePercent)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Total EMI burden</Text>
          <Text style={styles.rowValue}>{formatPercent(data.totalEmiBurdenPercent)}</Text>
        </View>
        {data.affordabilityStatus ? (
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Status</Text>
            <Text style={styles.rowValue}>{data.affordabilityStatus}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Why lower EMI is not always cheaper</Text>
        <TenureComparisonTable rows={data.tenureComparison} />
      </View>

      <View style={styles.pill}>
        <Text style={styles.pillText}>
          Fees and GST treatment vary by lender and product. Verify latest charges with the lender before borrowing.
        </Text>
      </View>

      <View style={styles.footer} fixed>
        <Text style={styles.footerText}>
          Educational estimate only. RupeeKit is not a lender and does not provide loan approval, financial advice, or
          live bank rates.
        </Text>
        <Text
          style={styles.footerText}
          render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
        />
      </View>
    </Page>
  );
}

function PageTwo({ data }: { data: PersonalLoanEmiReportPdfData }) {
  return (
    <Page size="A4" style={styles.page}>
      <Header data={data} />

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Amortisation summary</Text>
        <YearlyAmortizationTable rows={data.amortization} />
      </View>

      {data.prepaymentScenario ? (
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Prepayment scenario</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Prepayment amount</Text>
            <Text style={styles.rowValue}>{formatCurrency(data.prepaymentScenario.prepaymentAmount)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Prepayment after month</Text>
            <Text style={styles.rowValue}>{data.prepaymentScenario.prepaymentAfterMonth}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Mode</Text>
            <Text style={styles.rowValue}>
              {data.prepaymentScenario.mode === 'reduce-tenure' ? 'Reduce tenure' : 'Reduce EMI'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Original total interest</Text>
            <Text style={styles.rowValue}>{formatCurrency(data.prepaymentScenario.originalTotalInterest)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Revised total interest</Text>
            <Text style={styles.rowValue}>{formatCurrency(data.prepaymentScenario.revisedTotalInterest)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Estimated interest saved</Text>
            <Text style={styles.rowValue}>{formatCurrency(data.prepaymentScenario.interestSaved)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Revised tenure</Text>
            <Text style={styles.rowValue}>{data.prepaymentScenario.revisedTenureMonths} months</Text>
          </View>
          <Text style={styles.note}>
            Actual prepayment, foreclosure, and part-payment rules depend on lender policy and loan agreement.
          </Text>
        </View>
      ) : null}

      {data.pauseScenario ? (
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Missed EMI educational scenario</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Pause/missed months</Text>
            <Text style={styles.rowValue}>{data.pauseScenario.pauseMonths}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Restart option</Text>
            <Text style={styles.rowValue}>
              {data.pauseScenario.restartOption === 'same-emi' ? 'Same EMI' : 'Higher EMI'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Unpaid EMI amount</Text>
            <Text style={styles.rowValue}>{formatCurrency(data.pauseScenario.unpaidEmiAmount)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Possible repayment delay</Text>
            <Text style={styles.rowValue}>{data.pauseScenario.possibleRepaymentDelayMonths} months</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Estimated extra interest impact</Text>
            <Text style={styles.rowValue}>{formatCurrency(data.pauseScenario.estimatedExtraInterestImpact)}</Text>
          </View>
          <Text style={styles.note}>
            Missed EMI charges, credit-score impact, and restructuring terms depend on lender policy. This is only an
            educational scenario.
          </Text>
        </View>
      ) : null}

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Hidden charges checklist</Text>
        <View style={styles.checklistRow}>
          <View style={styles.checklistCol}>
            <Text style={styles.checklistItem}>- Processing fee</Text>
            <Text style={styles.checklistItem}>- GST on processing fee</Text>
            <Text style={styles.checklistItem}>- Foreclosure charge</Text>
            <Text style={styles.checklistItem}>- Part-payment charge</Text>
          </View>
          <View style={styles.checklistCol}>
            <Text style={styles.checklistItem}>- Late payment penalty</Text>
            <Text style={styles.checklistItem}>- Insurance/add-on fee</Text>
            <Text style={styles.checklistItem}>- Documentation/convenience fee</Text>
            <Text style={styles.checklistItem}>- Use this checklist before comparing offers</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Source and methodology</Text>
        <Text style={styles.note}>
          This report uses the reducing-balance EMI formula with user-entered assumptions for rate, tenure, fees and
          optional scenarios. RupeeKit does not show live lender rates and does not provide loan approval.
        </Text>
        <Text style={styles.note}>
          Educational information only. Verify final rates, fees, prepayment rules, missed EMI charges, and eligibility
          with official lender documents and qualified professionals where needed.
        </Text>
      </View>

      <View style={styles.footer} fixed>
        <Text style={styles.footerText}>
          Educational estimate only. RupeeKit is not a lender and does not provide loan approval, financial advice, or
          live bank rates.
        </Text>
        <Text
          style={styles.footerText}
          render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
        />
      </View>
    </Page>
  );
}

export function PersonalLoanEmiReportPdfDocument({ data }: { data: PersonalLoanEmiReportPdfData }) {
  return (
    <Document
      title="Personal Loan EMI Report"
      author="RupeeKit"
      subject="Personal loan EMI estimate report"
      creator="RupeeKit"
    >
      <PageOne data={data} />
      <PageTwo data={data} />
    </Document>
  );
}
