import { NextRequest, NextResponse } from 'next/server';
import { API_RESPONSE_HEADERS, readJsonBody } from '@/lib/api-request';
import { apiError, calculate, getPublicCalculator } from '@/lib/public-calculator-api';

export async function GET(_request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    return NextResponse.json(getPublicCalculator(params.slug), { headers: API_RESPONSE_HEADERS });
  } catch (error) {
    const response = apiError(error);
    return NextResponse.json(response.body, { status: response.status, headers: API_RESPONSE_HEADERS });
  }
}

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const body = await readJsonBody(request) as { inputs?: unknown };
    return NextResponse.json(calculate(params.slug, body?.inputs), { headers: API_RESPONSE_HEADERS });
  } catch (error) {
    const response = apiError(error);
    return NextResponse.json(response.body, { status: response.status, headers: API_RESPONSE_HEADERS });
  }
}
