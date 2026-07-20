import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rupeekit.co.in';
  return NextResponse.json({
    openapi: '3.1.0',
    info: { title: 'RupeeKit Calculator API', version: '1.0.0', description: 'Free educational India-focused calculator estimates with methodology, assumptions, sources, and safe disclaimers.' },
    servers: [{ url: base }],
    paths: {
      '/api/v1/calculators': { get: { operationId: 'listCalculators', summary: 'List live calculators', responses: { '200': { description: 'Calculator catalog' } } } },
      '/api/v1/calculators/{slug}': {
        get: { operationId: 'getCalculator', summary: 'Get calculator definition', parameters: [{ name: 'slug', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'Definition and sources' }, '404': { description: 'Not found' } } },
        post: { operationId: 'calculate', summary: 'Calculate an estimate', parameters: [{ name: 'slug', in: 'path', required: true, schema: { type: 'string' } }], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['inputs'], properties: { inputs: { type: 'object', additionalProperties: { type: 'number' } } } } } } }, responses: { '200': { description: 'Results with methodology and sources' }, '400': { description: 'Invalid inputs' }, '422': { description: 'Calculation could not produce a finite result' } } },
      },
    },
  });
}
