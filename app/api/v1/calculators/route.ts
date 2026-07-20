import { NextResponse } from 'next/server';
import { listPublicCalculators } from '@/lib/public-calculator-api';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json({ schemaVersion: '1.0', calculators: listPublicCalculators() });
}
