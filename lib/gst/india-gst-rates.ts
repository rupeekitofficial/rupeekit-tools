// India GST Rates and Calculation Helper.
// GST rates and classifications should be reviewed against official GST Council / CBIC notifications.

export interface GstCategory {
  key: string;
  label: string;
  defaultRate: number;
  description: string;
}

export const GST_CATEGORIES: GstCategory[] = [
  {
    key: 'nil',
    label: 'Essential / Nil-rated or Exempt (0%)',
    defaultRate: 0,
    description: 'Fresh fruits, vegetables, fresh milk, flour, salt, bread, and other essential/exempt items.'
  },
  {
    key: 'common',
    label: 'Common Goods/Services (5%)',
    defaultRate: 5,
    description: 'Sugar, tea, coffee, edible oil, domestic LPG, coal, life-saving drugs, and basic services.'
  },
  {
    key: 'standard-low',
    label: 'Standard Goods/Services (12%)',
    defaultRate: 12,
    description: 'Butter, cheese, ghee, cell phones, processed food, business class air tickets, and construction services.'
  },
  {
    key: 'standard-high',
    label: 'Standard Goods/Services (18%)',
    defaultRate: 18,
    description: 'Capital goods, IT services, electronic items, restaurants, hair oil, toothpaste, and standard services.'
  },
  {
    key: 'higher',
    label: 'Higher-rate Goods/Services (28%)',
    defaultRate: 28,
    description: 'ACs, refrigerators, automobiles, cement, betting, commercial goods, and other high-rate goods.'
  },
  {
    key: 'custom',
    label: 'Custom / Manual Rate',
    defaultRate: 18,
    description: 'Specify a custom GST percentage for calculations.'
  }
];

export interface GstCalculationResult {
  mode: 'add' | 'remove';
  supplyType: 'intra' | 'inter';
  rate: number;
  originalAmount: number;
  baseAmount: number;
  gstAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  finalAmount: number;
}

export function calculateGst(inputs: {
  amount: number;
  rate: number;
  mode: 'add' | 'remove';
  supplyType: 'intra' | 'inter';
}): GstCalculationResult {
  const { amount, rate, mode, supplyType } = inputs;
  
  let baseAmount = 0;
  let gstAmount = 0;
  let finalAmount = 0;

  if (mode === 'add') {
    // Add GST to base amount
    // Base = amount, GST = amount * rate / 100, Total = base + GST
    baseAmount = amount;
    gstAmount = (amount * rate) / 100;
    finalAmount = baseAmount + gstAmount;
  } else {
    // Remove GST from GST-inclusive amount
    // Total = amount, Base = amount / (1 + rate / 100), GST = total - base
    finalAmount = amount;
    baseAmount = amount / (1 + rate / 100);
    gstAmount = finalAmount - baseAmount;
  }

  // Split calculations
  let cgst = 0;
  let sgst = 0;
  let igst = 0;

  if (supplyType === 'intra') {
    // Intra-state split: CGST (50%) + SGST (50%)
    cgst = gstAmount / 2;
    sgst = gstAmount / 2;
    igst = 0;
  } else {
    // Inter-state split: IGST (100%)
    cgst = 0;
    sgst = 0;
    igst = gstAmount;
  }

  return {
    mode,
    supplyType,
    rate,
    originalAmount: amount,
    baseAmount,
    gstAmount,
    cgst,
    sgst,
    igst,
    finalAmount
  };
}
