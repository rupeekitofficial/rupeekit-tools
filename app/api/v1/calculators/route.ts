import { NextResponse } from 'next/server';
import { API_RESPONSE_HEADERS } from '@/lib/api-request';
import { listPublicCalculators } from '@/lib/public-calculator-api';

export async function GET() {
  return NextResponse.json(
    { schemaVersion: '1.0', calculators: listPublicCalculators() },
    { headers: API_RESPONSE_HEADERS }
  );
}
