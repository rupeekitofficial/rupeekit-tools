/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

export interface EmergencyFundPlanPdfData {
  generatedAt: string;
  logoUrl?: string;
  monthlyEssentialExpenses: number;
  monthlyEmiCommitments: number;
  monthlySurvivalCost: number;
  currentEmergencySavings: number;
  targetMonths: number;
  targetEmergencyFund: number;
  currentShortfall: number;
  monthlySavingCapacity: number;
  monthsToReachTarget: number;
  threeMonthFund: number;
  sixMonthFund: number;
  nineMonthFund: number;
  twelveMonthFund: number;
}

const BRAND_GREEN = '#1b8a3a';
const BRAND_NAVY = '#0f2f5a';
const MUTED_TEXT = '#4b5563';
const BORDER = '#d7dce3';
const SOFT_BLUE = '#f5f9ff';
const SOFT_GRAY = '#f8fafc';

const DISCLAIMER =
  'Educational estimate only. RupeeKit does not provide financial, investment, legal or tax advice. This report is for planning support only.';

const styles = StyleSheet.create({
  page: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 40,
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
    borderBottomColor: BRAND_GREEN,
    paddingBottom: 9,
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
    width: 130,
    height: 26,
  },
  brandText: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 18,
    color: BRAND_GREEN,
  },
  titleCol: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: BRAND_NAVY,
  },
  subtitle: {
    fontSize: 9,
    color: MUTED_TEXT,
    marginTop: 2,
  },
  generated: {
    fontSize: 8,
    color: MUTED_TEXT,
    marginTop: 2,
  },
  kpiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  kpiCard: {
    width: '32%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d4e5fb',
    backgroundColor: SOFT_BLUE,
    paddingVertical: 7,
    paddingHorizontal: 8,
  },
  kpiLabel: {
    fontSize: 8,
    color: MUTED_TEXT,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  kpiValue: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: BRAND_NAVY,
    marginBottom: 2,
  },
  kpiHelp: {
    fontSize: 7,
    color: MUTED_TEXT,
  },
  card: {
    marginTop: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: SOFT_GRAY,
    paddingVertical: 7,
    paddingHorizontal: 9,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: BRAND_GREEN,
    marginBottom: 4,
  },
  keyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  keyLabel: {
    fontSize: 8,
    color: MUTED_TEXT,
    paddingRight: 8,
  },
  keyValue: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
    textAlign: 'right',
  },
  splitRow: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  splitCard: {
    width: '49%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: '#ffffff',
    paddingVertical: 7,
    paddingHorizontal: 8,
  },
  splitTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: BRAND_NAVY,
  },
  barRow: {
    marginTop: 6,
  },
  barLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  barLabel: {
    fontSize: 7.8,
    color: MUTED_TEXT,
  },
  barValue: {
    fontSize: 7.8,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
  },
  barTrack: {
    height: 8,
    borderRadius: 8,
    backgroundColor: '#e6edf5',
    overflow: 'hidden',
  },
  barFillBlue: {
    height: 8,
    borderRadius: 8,
    backgroundColor: BRAND_NAVY,
  },
  barFillGreen: {
    height: 8,
    borderRadius: 8,
    backgroundColor: BRAND_GREEN,
  },
  barFillAmber: {
    height: 8,
    borderRadius: 8,
    backgroundColor: '#b45309',
  },
  compareTable: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 10,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: SOFT_BLUE,
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  tableHeaderCell: {
    fontSize: 7.8,
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
    color: '#0f172a',
  },
  tableCellRight: {
    fontSize: 7.6,
    color: '#0f172a',
    textAlign: 'right',
  },
  checklistRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  checklistCard: {
    width: '49%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: SOFT_GRAY,
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
    fontSize: 7.9,
    color: '#0f172a',
    marginBottom: 4,
    lineHeight: 1.35,
  },
  noteCard: {
    marginTop: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cfe8da',
    backgroundColor: '#e9f7ef',
    paddingVertical: 7,
    paddingHorizontal: 9,
  },
  noteTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#166534',
    marginBottom: 3,
  },
  noteText: {
    fontSize: 8,
    color: '#1f2937',
    lineHeight: 1.4,
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
    color: MUTED_TEXT,
    lineHeight: 1.35,
  },
});

function asCurrency(value: number) {
  const safe = Number.isFinite(value) ? Math.max(0, value) : 0;
  return `Rs ${safe.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
}

function asMonths(value: number) {
  const safe = Number.isFinite(value) ? Math.max(0, value) : 0;
  return `${safe.toFixed(1)} months`;
}

function pct(value: number, max: number) {
  if (!Number.isFinite(value) || !Number.isFinite(max) || max <= 0) return '0%';
  return `${Math.min(100, (Math.max(0, value) / max) * 100)}%`;
}

export function EmergencyFundPlanPdfDocument({ data }: { data: EmergencyFundPlanPdfData }) {
  const monthlyComparison = [
    { label: '3-month fund', months: 3, amount: data.threeMonthFund },
    { label: '6-month fund', months: 6, amount: data.sixMonthFund },
    { label: '9-month fund', months: 9, amount: data.nineMonthFund },
    { label: '12-month fund', months: 12, amount: data.twelveMonthFund },
  ];
  const maxComparisonValue = Math.max(...monthlyComparison.map((item) => item.amount), 1);

  const gapRows = [
    { label: 'Target fund', value: data.targetEmergencyFund, fill: styles.barFillBlue },
    { label: 'Current savings', value: data.currentEmergencySavings, fill: styles.barFillGreen },
    { label: 'Shortfall', value: data.currentShortfall, fill: styles.barFillAmber },
  ];
  const gapMax = Math.max(data.targetEmergencyFund, data.currentEmergencySavings, data.currentShortfall, 1);

  return (
    <Document title="Emergency Fund Plan">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logoWrap}>
            {data.logoUrl ? (
              <Image src={data.logoUrl} style={styles.logo} />
            ) : (
              <Text style={styles.brandText}>RupeeKit</Text>
            )}
          </View>
          <View style={styles.titleCol}>
            <Text style={styles.title}>Emergency Fund Plan</Text>
            <Text style={styles.subtitle}>Generated by RupeeKit</Text>
            <Text style={styles.generated}>Generated on: {data.generatedAt}</Text>
          </View>
        </View>

        <View style={styles.kpiRow}>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>Target Emergency Fund</Text>
            <Text style={styles.kpiValue}>{asCurrency(data.targetEmergencyFund)}</Text>
            <Text style={styles.kpiHelp}>Selected target: {data.targetMonths} months</Text>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>Current Shortfall</Text>
            <Text style={styles.kpiValue}>{asCurrency(data.currentShortfall)}</Text>
            <Text style={styles.kpiHelp}>Gap after current savings</Text>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>Time to Goal</Text>
            <Text style={styles.kpiValue}>{asMonths(data.monthsToReachTarget)}</Text>
            <Text style={styles.kpiHelp}>Based on monthly saving capacity</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Plan Inputs and Outputs</Text>
          <View style={styles.keyRow}>
            <Text style={styles.keyLabel}>Monthly essential expenses</Text>
            <Text style={styles.keyValue}>{asCurrency(data.monthlyEssentialExpenses)}</Text>
          </View>
          <View style={styles.keyRow}>
            <Text style={styles.keyLabel}>Monthly EMI commitments</Text>
            <Text style={styles.keyValue}>{asCurrency(data.monthlyEmiCommitments)}</Text>
          </View>
          <View style={styles.keyRow}>
            <Text style={styles.keyLabel}>Monthly survival cost</Text>
            <Text style={styles.keyValue}>{asCurrency(data.monthlySurvivalCost)}</Text>
          </View>
          <View style={styles.keyRow}>
            <Text style={styles.keyLabel}>Current emergency savings</Text>
            <Text style={styles.keyValue}>{asCurrency(data.currentEmergencySavings)}</Text>
          </View>
          <View style={styles.keyRow}>
            <Text style={styles.keyLabel}>Target months</Text>
            <Text style={styles.keyValue}>{data.targetMonths.toString()} months</Text>
          </View>
          <View style={styles.keyRow}>
            <Text style={styles.keyLabel}>Target emergency fund</Text>
            <Text style={styles.keyValue}>{asCurrency(data.targetEmergencyFund)}</Text>
          </View>
          <View style={styles.keyRow}>
            <Text style={styles.keyLabel}>Current shortfall</Text>
            <Text style={styles.keyValue}>{asCurrency(data.currentShortfall)}</Text>
          </View>
          <View style={styles.keyRow}>
            <Text style={styles.keyLabel}>Monthly saving capacity</Text>
            <Text style={styles.keyValue}>{asCurrency(data.monthlySavingCapacity)}</Text>
          </View>
          <View style={styles.keyRow}>
            <Text style={styles.keyLabel}>Months needed to reach target</Text>
            <Text style={styles.keyValue}>{asMonths(data.monthsToReachTarget)}</Text>
          </View>
        </View>

        <View style={styles.splitRow}>
          <View style={styles.splitCard}>
            <Text style={styles.splitTitle}>Emergency Fund Gap Chart</Text>
            {gapRows.map((item) => (
              <View key={item.label} style={styles.barRow}>
                <View style={styles.barLabelRow}>
                  <Text style={styles.barLabel}>{item.label}</Text>
                  <Text style={styles.barValue}>{asCurrency(item.value)}</Text>
                </View>
                <View style={styles.barTrack}>
                  <View style={[item.fill, { width: pct(item.value, gapMax) }]} />
                </View>
              </View>
            ))}
          </View>

          <View style={styles.splitCard}>
            <Text style={styles.splitTitle}>3/6/9/12-Month Comparison</Text>
            {monthlyComparison.map((item) => (
              <View key={item.label} style={styles.barRow}>
                <View style={styles.barLabelRow}>
                  <Text style={styles.barLabel}>{item.label}</Text>
                  <Text style={styles.barValue}>{asCurrency(item.amount)}</Text>
                </View>
                <View style={styles.barTrack}>
                  <View style={[styles.barFillBlue, { width: pct(item.amount, maxComparisonValue) }]} />
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.compareTable}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { width: '20%' }]}>Months</Text>
            <Text style={[styles.tableHeaderCell, { width: '26%', textAlign: 'right' }]}>Fund target</Text>
            <Text style={[styles.tableHeaderCell, { width: '26%', textAlign: 'right' }]}>Savings gap</Text>
            <Text style={[styles.tableHeaderCell, { width: '28%', textAlign: 'right' }]}>Gap if current saved</Text>
          </View>
          {monthlyComparison.map((item, index) => {
            const shortfall = Math.max(0, item.amount - data.currentEmergencySavings);
            const rowStyle = index % 2 === 0 ? styles.tableRow : styles.tableRowAlt;
            const isLast = index === monthlyComparison.length - 1;
            const finalRowStyle = isLast ? [rowStyle, styles.tableRowLast] : rowStyle;
            return (
              <View key={item.label} style={finalRowStyle}>
                <Text style={[styles.tableCell, { width: '20%' }]}>{item.months} months</Text>
                <Text style={[styles.tableCellRight, { width: '26%' }]}>{asCurrency(item.amount)}</Text>
                <Text style={[styles.tableCellRight, { width: '26%' }]}>{asCurrency(shortfall)}</Text>
                <Text style={[styles.tableCellRight, { width: '28%' }]}>{asCurrency(shortfall)}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{DISCLAIMER}</Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logoWrap}>
            {data.logoUrl ? (
              <Image src={data.logoUrl} style={styles.logo} />
            ) : (
              <Text style={styles.brandText}>RupeeKit</Text>
            )}
          </View>
          <View style={styles.titleCol}>
            <Text style={styles.title}>Emergency Fund Checklist</Text>
            <Text style={styles.subtitle}>Planning support worksheet</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Where to keep emergency fund</Text>
          <View style={styles.keyRow}>
            <Text style={styles.keyLabel}>Savings account</Text>
            <Text style={styles.keyValue}>Daily access and quick transfer</Text>
          </View>
          <View style={styles.keyRow}>
            <Text style={styles.keyLabel}>Sweep-in FD</Text>
            <Text style={styles.keyValue}>Linked liquidity with deposit discipline</Text>
          </View>
          <View style={styles.keyRow}>
            <Text style={styles.keyLabel}>Short-term FD</Text>
            <Text style={styles.keyValue}>Stability with defined short tenure</Text>
          </View>
          <View style={styles.keyRow}>
            <Text style={styles.keyLabel}>Low-risk liquid option</Text>
            <Text style={styles.keyValue}>Access plus lower volatility intent</Text>
          </View>
          <View style={styles.keyRow}>
            <Text style={styles.keyLabel}>Small urgent cash</Text>
            <Text style={styles.keyValue}>Immediate cash-only emergencies</Text>
          </View>
        </View>

        <View style={styles.checklistRow}>
          <View style={styles.checklistCard}>
            <Text style={styles.checklistTitle}>Checklist</Text>
            <Text style={styles.checklistItem}>[ ] Keep at least one part instantly accessible</Text>
            <Text style={styles.checklistItem}>[ ] Include EMI commitments in survival cost</Text>
            <Text style={styles.checklistItem}>[ ] Review after job, income, family or EMI changes</Text>
            <Text style={styles.checklistItem}>[ ] Refill the fund after using it</Text>
            <Text style={styles.checklistItem}>
              [ ] Avoid equity/crypto/long-lock-in products for core emergency money
            </Text>
          </View>
          <View style={styles.checklistCard}>
            <Text style={styles.checklistTitle}>Quick plan reminder</Text>
            <Text style={styles.checklistItem}>
              Build the corpus step by step. A practical emergency plan usually combines cash access, stable parking,
              and periodic review.
            </Text>
            <Text style={styles.checklistItem}>
              Emergency planning needs may vary by household size, dependants, income stability, and EMI obligations.
            </Text>
          </View>
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>Trust note</Text>
          <Text style={styles.noteText}>
            Avoid keeping core emergency money in equity, crypto, long lock-in products or anything that can fall
            sharply when you need cash.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{DISCLAIMER}</Text>
        </View>
      </Page>
    </Document>
  );
}
