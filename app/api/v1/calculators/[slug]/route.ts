import { NextRequest, NextResponse } from 'next/server';
import { apiError, calculate, getPublicCalculator } from '@/lib/public-calculator-api';

export async function GET(_request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    return NextResponse.json(getPublicCalculator(params.slug));
  } catch (error) {
    const response = apiError(error);
    return NextResponse.json(response.body, { status: response.status });
  }
}

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const body = await request.json();
    return NextResponse.json(calculate(params.slug, body?.inputs));
  } catch (error) {
    const response = apiError(error);
    return NextResponse.json(response.body, { status: response.status });
  }
}
