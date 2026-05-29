import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
  Svg,
  Circle,
  Path,
} from '@react-pdf/renderer';

Font.registerHyphenationCallback((word) => [word]);

export type PersonalLoanTenureRow = {
  tenure: number;
  monthlyEmi: number;
  totalInterest: number;
  totalRepayment: number;
};

export type PersonalLoanAmortizationRow = {
  yearLabel: string;
  emiPaid: number;
  principalPaid: number;
  interestPaid: number;
  closingBalance: number;
};

export interface PersonalLoanEmiReportPdfData {
  generatedAt: string;
  logoUrl?: string;
  principal: number;
  annualInterestRate: number;
  tenureMonths: number;
  processingFeePercent: number;
  monthlyIncome: number;
  existingMonthlyEmi: number;
  monthlyEmi: number;
  totalInterest: number;
  totalRepayment: number;
  estimatedProcessingFee: number;
  totalCostWithFee: number;
  emiToIncomePercent: number;
  totalEmiBurdenPercent: number;
  tenureComparison: PersonalLoanTenureRow[];
  amortization: PersonalLoanAmortizationRow[];
}

const BRAND_GREEN = '#1b8a3a';
const BRAND_GREEN_SOFT = '#e9f7ef';
const BRAND_NAVY = '#0f2f5a';
const BORDER = '#d7dce3';
const TEXT_DARK = '#0f172a';
const TEXT_MUTED = '#4b5563';
const SURFACE_BLUE = '#f5f9ff';
const SURFACE_GRAY = '#f8fafc';
const PAGE_BG = '#ffffff';

const SHORT_FOOTER =
  'Educational estimate only. RupeeKit is not a lender and does not provide loan approval, financial advice or official bank rates.';
const FULL_FOOTER =
  'This report is for educational estimation only. RupeeKit is not a lender and does not provide loan approval, financial advice or official bank rates. Verify final rates, fees, eligibility and repayment terms with the lender before applying.';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: TEXT_DARK,
    backgroundColor: PAGE_BG,
    paddingTop: 24,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  headerWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: BRAND_GREEN,
    paddingBottom: 9,
    marginBottom: 10,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: BRAND_GREEN,
  },
  titleCol: {
    alignItems: 'flex-end',
    maxWidth: 330,
  },
  title: {
    fontSize: 17,
    fontFamily: 'Helvetica-Bold',
    color: BRAND_NAVY,
    textAlign: 'right',
  },
  subtitle: {
    fontSize: 9,
    color: TEXT_MUTED,
    marginTop: 2,
    textAlign: 'right',
  },
  generated: {
    fontSize: 8,
    color: TEXT_MUTED,
    marginTop: 2,
    textAlign: 'right',
  },
  kpiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  kpiLargeCard: {
    width: '32%',
    backgroundColor: SURFACE_BLUE,
    borderWidth: 1,
    borderColor: '#d4e5fb',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  kpiLabel: {
    fontSize: 8,
    textTransform: 'uppercase',
    color: TEXT_MUTED,
    marginBottom: 4,
  },
  kpiLargeValue: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: BRAND_NAVY,
    marginBottom: 2,
  },
  kpiHelper: {
    fontSize: 7.2,
    color: TEXT_MUTED,
    lineHeight: 1.4,
  },
  kpiSmallRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  kpiSmallCard: {
    width: '49%',
    backgroundColor: SURFACE_GRAY,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 9,
    paddingVertical: 7,
    paddingHorizontal: 8,
  },
  kpiSmallValue: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: BRAND_NAVY,
    marginTop: 2,
  },
  inputCard: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 10,
    backgroundColor: SURFACE_GRAY,
    paddingVertical: 7,
    paddingHorizontal: 9,
  },
  sectionHeading: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: BRAND_GREEN,
    marginBottom: 5,
  },
  inputGridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  inputCell: {
    width: '49%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  inputLabel: {
    fontSize: 8,
    color: TEXT_MUTED,
    paddingRight: 6,
  },
  inputValue: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: TEXT_DARK,
    textAlign: 'right',
  },
  visualRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  visualCard: {
    width: '49%',
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    paddingVertical: 7,
    paddingHorizontal: 8,
  },
  visualTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: BRAND_NAVY,
  },
  donutWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  legendWrap: {
    marginLeft: 8,
    flexGrow: 1,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  legendLabel: {
    fontSize: 8,
    color: TEXT_MUTED,
    width: 58,
  },
  legendValue: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: TEXT_DARK,
  },
  barChartWrap: {
    marginTop: 7,
  },
  barsRow: {
    height: 92,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  barColumn: {
    width: '18%',
    alignItems: 'center',
  },
  barTrack: {
    width: 20,
    height: 72,
    borderRadius: 10,
    backgroundColor: '#edf2f7',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: 20,
    borderRadius: 10,
    backgroundColor: BRAND_NAVY,
  },
  barTenure: {
    marginTop: 3,
    fontSize: 7.4,
    color: TEXT_MUTED,
  },
  barValue: {
    marginTop: 2,
    fontSize: 6.8,
    color: TEXT_DARK,
    textAlign: 'center',
  },
  barNote: {
    marginTop: 4,
    fontSize: 7.2,
    color: TEXT_MUTED,
    lineHeight: 1.35,
  },
  tableCard: {
    marginTop: 7,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 10,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: SURFACE_BLUE,
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  tableHeaderText: {
    fontSize: 7.7,
    fontFamily: 'Helvetica-Bold',
    color: BRAND_NAVY,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e7ebf1',
  },
  tableRowAlt: {
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e7ebf1',
    backgroundColor: '#fbfdff',
  },
  tableRowLast: {
    borderBottomWidth: 0,
  },
  tableCell: {
    fontSize: 7.6,
    color: TEXT_DARK,
  },
  tableCellRight: {
    fontSize: 7.6,
    color: TEXT_DARK,
    textAlign: 'right',
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 12,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingTop: 5,
  },
  footerText: {
    fontSize: 7,
    color: TEXT_MUTED,
    lineHeight: 1.35,
  },
  pageTwoTitle: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: BRAND_NAVY,
    marginBottom: 4,
  },
  insightCard: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#cfe8da',
    borderRadius: 10,
    backgroundColor: BRAND_GREEN_SOFT,
    paddingVertical: 7,
    paddingHorizontal: 9,
  },
  insightTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#166534',
    marginBottom: 3,
  },
  insightText: {
    fontSize: 8,
    color: '#1f2937',
    lineHeight: 1.4,
  },
  checklistRow: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checklistCol: {
    width: '49%',
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 10,
    backgroundColor: SURFACE_GRAY,
    paddingVertical: 7,
    paddingHorizontal: 8,
  },
  checklistTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: BRAND_NAVY,
    marginBottom: 4,
  },
  checklistItem: {
    fontSize: 7.8,
    color: TEXT_DARK,
    marginBottom: 0,
    lineHeight: 1.35,
  },
  checklistLine: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  checklistBox: {
    width: 8,
    height: 8,
    borderWidth: 1,
    borderColor: '#6b7280',
    borderRadius: 1.5,
    marginTop: 1.5,
    marginRight: 5,
    backgroundColor: '#ffffff',
  },
  checklistTextWrap: {
    flex: 1,
  },
  trustCard: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    borderRadius: 10,
    backgroundColor: '#eff6ff',
    paddingVertical: 7,
    paddingHorizontal: 9,
  },
  trustTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: BRAND_NAVY,
    marginBottom: 3,
  },
  trustText: {
    fontSize: 8,
    color: '#1f2937',
    lineHeight: 1.4,
  },
});

function formatCurrency(value?: number): string {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 'Rs 0';
  return `Rs ${Math.round(value).toLocaleString('en-IN')}`;
}

function formatPercent(value?: number): string {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '0.00%';
  return `${value.toFixed(2)}%`;
}

function polarToCartesian(cx: number, cy: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  };
}

function describeArc(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

function Header({
  logoUrl,
  title,
  subtitle,
  generatedAt,
}: {
  logoUrl?: string;
  title: string;
  subtitle?: string;
  generatedAt?: string;
}) {
  const safeGeneratedAt = generatedAt && generatedAt.trim().length > 0 ? generatedAt : '';

  return (
    <View style={styles.headerWrap} fixed>
      <View style={styles.brandRow}>
        <View style={styles.logoWrap}>
          {logoUrl ? (
            // eslint-disable-next-line jsx-a11y/alt-text
            <Image src={logoUrl} style={styles.logo} />
          ) : (
            <Text style={styles.logoText}>RupeeKit</Text>
          )}
        </View>
      </View>
      <View style={styles.titleCol}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        {safeGeneratedAt ? <Text style={styles.generated}>Generated on: {safeGeneratedAt}</Text> : null}
      </View>
    </View>
  );
}

function ChecklistItem({ text }: { text: string }) {
  return (
    <View style={styles.checklistLine}>
      <View style={styles.checklistBox} />
      <View style={styles.checklistTextWrap}>
        <Text style={styles.checklistItem}>{text}</Text>
      </View>
    </View>
  );
}

function KpiLargeCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <View style={styles.kpiLargeCard}>
      <Text style={styles.kpiLabel}>{label}</Text>
      <Text style={styles.kpiLargeValue}>{value}</Text>
      <Text style={styles.kpiHelper}>{helper}</Text>
    </View>
  );
}

function KpiSmallCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.kpiSmallCard}>
      <Text style={styles.kpiLabel}>{label}</Text>
      <Text style={styles.kpiSmallValue}>{value}</Text>
    </View>
  );
}

function InputSummary({ data }: { data: PersonalLoanEmiReportPdfData }) {
  return (
    <View style={styles.inputCard}>
      <Text style={styles.sectionHeading}>Input Summary</Text>

      <View style={styles.inputGridRow}>
        <View style={styles.inputCell}>
          <Text style={styles.inputLabel}>Loan amount</Text>
          <Text style={styles.inputValue}>{formatCurrency(data.principal)}</Text>
        </View>
        <View style={styles.inputCell}>
          <Text style={styles.inputLabel}>Annual interest rate</Text>
          <Text style={styles.inputValue}>{formatPercent(data.annualInterestRate)}</Text>
        </View>
      </View>

      <View style={styles.inputGridRow}>
        <View style={styles.inputCell}>
          <Text style={styles.inputLabel}>Tenure</Text>
          <Text style={styles.inputValue}>{Math.max(1, Math.round(data.tenureMonths))} months</Text>
        </View>
        <View style={styles.inputCell}>
          <Text style={styles.inputLabel}>Processing fee %</Text>
          <Text style={styles.inputValue}>{formatPercent(data.processingFeePercent)}</Text>
        </View>
      </View>

      <View style={styles.inputGridRow}>
        <View style={styles.inputCell}>
          <Text style={styles.inputLabel}>Monthly income</Text>
          <Text style={styles.inputValue}>{formatCurrency(data.monthlyIncome)}</Text>
        </View>
        <View style={styles.inputCell}>
          <Text style={styles.inputLabel}>Existing EMI</Text>
          <Text style={styles.inputValue}>{formatCurrency(data.existingMonthlyEmi)}</Text>
        </View>
      </View>
    </View>
  );
}

function PrincipalInterestDonut({
  principal,
  totalInterest,
}: {
  principal: number;
  totalInterest: number;
}) {
  const safePrincipal = Math.max(0, principal);
  const safeInterest = Math.max(0, totalInterest);
  const total = Math.max(safePrincipal + safeInterest, 1);

  const principalAngle = (safePrincipal / total) * 360;
  const interestAngle = 360 - principalAngle;

  const radius = 36;
  const center = 60;

  const principalPath =
    principalAngle > 0 && principalAngle < 360
      ? describeArc(center, center, radius, 0, principalAngle)
      : null;
  const interestPath =
    interestAngle > 0 && interestAngle < 360
      ? describeArc(center, center, radius, principalAngle, 360)
      : null;

  return (
    <View style={styles.visualCard}>
      <Text style={styles.visualTitle}>Principal vs Interest donut</Text>

      <View style={styles.donutWrap}>
        <Svg width={120} height={120} viewBox="0 0 120 120">
          <Circle cx={center} cy={center} r={radius} fill="none" stroke="#e5e7eb" strokeWidth={14} />

          {principalAngle >= 359.99 ? (
            <Circle cx={center} cy={center} r={radius} fill="none" stroke={BRAND_NAVY} strokeWidth={14} />
          ) : principalPath ? (
            <Path d={principalPath} fill="none" stroke={BRAND_NAVY} strokeWidth={14} />
          ) : null}

          {interestAngle >= 359.99 ? (
            <Circle cx={center} cy={center} r={radius} fill="none" stroke={BRAND_GREEN} strokeWidth={14} />
          ) : interestPath ? (
            <Path d={interestPath} fill="none" stroke={BRAND_GREEN} strokeWidth={14} />
          ) : null}

          <Circle cx={center} cy={center} r={23} fill="#ffffff" />
        </Svg>

        <View style={styles.legendWrap}>
          <View style={styles.legendRow}>
            <View style={[styles.legendDot, { backgroundColor: BRAND_NAVY }]} />
            <Text style={styles.legendLabel}>Principal</Text>
            <Text style={styles.legendValue}>{formatCurrency(safePrincipal)}</Text>
          </View>
          <View style={styles.legendRow}>
            <View style={[styles.legendDot, { backgroundColor: BRAND_GREEN }]} />
            <Text style={styles.legendLabel}>Interest</Text>
            <Text style={styles.legendValue}>{formatCurrency(safeInterest)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function TenureBarChart({ rows }: { rows: PersonalLoanTenureRow[] }) {
  const maxValue = Math.max(...rows.map((row) => Math.max(0, row.monthlyEmi)), 1);

  return (
    <View style={styles.visualCard}>
      <Text style={styles.visualTitle}>Tenure comparison bar chart (Monthly EMI)</Text>

      <View style={styles.barChartWrap}>
        <View style={styles.barsRow}>
          {rows.map((row) => {
            const barHeight = Math.max(6, Math.round((Math.max(0, row.monthlyEmi) / maxValue) * 72));
            return (
              <View key={row.tenure} style={styles.barColumn}>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { height: barHeight }]} />
                </View>
                <Text style={styles.barTenure}>{row.tenure}m</Text>
                <Text style={styles.barValue}>{formatCurrency(row.monthlyEmi)}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <Text style={styles.barNote}>
        Longer tenure can reduce monthly EMI but usually increases total interest.
      </Text>
    </View>
  );
}

function TenureTable({ rows }: { rows: PersonalLoanTenureRow[] }) {
  return (
    <View style={styles.tableCard}>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, { width: 56 }]}>Tenure</Text>
        <Text style={[styles.tableHeaderText, { width: 130, textAlign: 'right' }]}>Monthly EMI</Text>
        <Text style={[styles.tableHeaderText, { width: 130, textAlign: 'right' }]}>Total Interest</Text>
        <Text style={[styles.tableHeaderText, { width: 130, textAlign: 'right' }]}>Total Repayment</Text>
      </View>
      {rows.map((row, index) => {
        const baseRowStyle = index % 2 === 0 ? styles.tableRow : styles.tableRowAlt;
        return (
          <View
            key={row.tenure}
            style={index === rows.length - 1 ? [baseRowStyle, styles.tableRowLast] : baseRowStyle}
          >
            <Text style={[styles.tableCell, { width: 56 }]}>{row.tenure}m</Text>
            <Text style={[styles.tableCellRight, { width: 130 }]}>{formatCurrency(row.monthlyEmi)}</Text>
            <Text style={[styles.tableCellRight, { width: 130 }]}>{formatCurrency(row.totalInterest)}</Text>
            <Text style={[styles.tableCellRight, { width: 130 }]}>{formatCurrency(row.totalRepayment)}</Text>
          </View>
        );
      })}
    </View>
  );
}

function AmortizationTable({ rows }: { rows: PersonalLoanAmortizationRow[] }) {
  return (
    <View style={styles.tableCard}>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, { width: 58 }]}>Year</Text>
        <Text style={[styles.tableHeaderText, { width: 116, textAlign: 'right' }]}>EMI Paid</Text>
        <Text style={[styles.tableHeaderText, { width: 116, textAlign: 'right' }]}>Principal Paid</Text>
        <Text style={[styles.tableHeaderText, { width: 116, textAlign: 'right' }]}>Interest Paid</Text>
        <Text style={[styles.tableHeaderText, { width: 109, textAlign: 'right' }]}>Closing Balance</Text>
      </View>
      {rows.map((row, index) => {
        const baseRowStyle = index % 2 === 0 ? styles.tableRow : styles.tableRowAlt;
        return (
          <View
            key={row.yearLabel}
            style={index === rows.length - 1 ? [baseRowStyle, styles.tableRowLast] : baseRowStyle}
          >
            <Text style={[styles.tableCell, { width: 58 }]}>{row.yearLabel.replace('Year ', '')}</Text>
            <Text style={[styles.tableCellRight, { width: 116 }]}>{formatCurrency(row.emiPaid)}</Text>
            <Text style={[styles.tableCellRight, { width: 116 }]}>{formatCurrency(row.principalPaid)}</Text>
            <Text style={[styles.tableCellRight, { width: 116 }]}>{formatCurrency(row.interestPaid)}</Text>
            <Text style={[styles.tableCellRight, { width: 109 }]}>{formatCurrency(row.closingBalance)}</Text>
          </View>
        );
      })}
    </View>
  );
}

function PageOne({ data }: { data: PersonalLoanEmiReportPdfData }) {
  return (
    <Page size="A4" style={styles.page}>
      <Header
        logoUrl={data.logoUrl}
        title="Personal Loan EMI Report"
        subtitle="Generated by RupeeKit"
        generatedAt={data.generatedAt}
      />

      <View style={styles.kpiRow}>
        <KpiLargeCard
          label="Monthly EMI"
          value={formatCurrency(data.monthlyEmi)}
          helper="Estimated monthly payment"
        />
        <KpiLargeCard
          label="Total Interest"
          value={formatCurrency(data.totalInterest)}
          helper="Estimated interest across tenure"
        />
        <KpiLargeCard
          label="Total Repayment"
          value={formatCurrency(data.totalRepayment)}
          helper="Principal plus total interest"
        />
      </View>

      <View style={styles.kpiSmallRow}>
        <KpiSmallCard label="Processing Fee" value={formatCurrency(data.estimatedProcessingFee)} />
        <KpiSmallCard label="Total Cost Including Fee" value={formatCurrency(data.totalCostWithFee)} />
      </View>
      <View style={styles.kpiSmallRow}>
        <KpiSmallCard label="EMI as % of Income" value={formatPercent(data.emiToIncomePercent)} />
        <KpiSmallCard label="Total EMI Burden" value={formatPercent(data.totalEmiBurdenPercent)} />
      </View>

      <InputSummary data={data} />

      <View style={styles.visualRow}>
        <PrincipalInterestDonut principal={data.principal} totalInterest={data.totalInterest} />
        <TenureBarChart rows={data.tenureComparison} />
      </View>

      <View style={{ marginTop: 8 }}>
        <Text style={styles.sectionHeading}>Tenure Comparison Table</Text>
        <TenureTable rows={data.tenureComparison} />
      </View>

      <View style={styles.footer} fixed>
        <Text style={styles.footerText}>{SHORT_FOOTER}</Text>
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
      <Header
        logoUrl={data.logoUrl}
        title="Amortization and Checklist"
      />

      <Text style={styles.pageTwoTitle}>Yearly Amortization Summary</Text>
      <AmortizationTable rows={data.amortization} />

      <View style={styles.insightCard}>
        <Text style={styles.insightTitle}>Repayment insight</Text>
        <Text style={styles.insightText}>
          In this example, your EMI remains fixed, but the interest portion usually reduces over time while
          principal repayment increases. Always compare total interest, not only EMI.
        </Text>
      </View>

      <View style={styles.checklistRow}>
        <View style={styles.checklistCol}>
          <Text style={styles.checklistTitle}>Before applying</Text>
          <ChecklistItem text="Check total interest, not only EMI" />
          <ChecklistItem text="Verify processing fee" />
          <ChecklistItem text="Compare official lender rates" />
          <ChecklistItem text="Check prepayment and foreclosure charges" />
        </View>

        <View style={styles.checklistCol}>
          <Text style={styles.checklistTitle}>Borrowing safety checks</Text>
          <ChecklistItem text="Avoid borrowing more than needed" />
          <ChecklistItem text="Check EMI burden against income" />
          <ChecklistItem text="Keep emergency savings separate" />
          <ChecklistItem text="Read final lender terms before applying" />
        </View>
      </View>

      <View style={styles.trustCard}>
        <Text style={styles.trustTitle}>Trust note</Text>
        <Text style={styles.trustText}>
          RupeeKit does not show live personal loan interest rates. Enter the official rate offered by your lender and
          verify fees, eligibility, prepayment charges and foreclosure charges before applying.
        </Text>
      </View>

      <View style={styles.footer} fixed>
        <Text style={styles.footerText}>{FULL_FOOTER}</Text>
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
