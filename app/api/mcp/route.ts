import { NextRequest, NextResponse } from 'next/server';
import { apiError, calculate, getPublicCalculator, listPublicCalculators } from '@/lib/public-calculator-api';

type JsonRpcRequest = { jsonrpc?: string; id?: string | number | null; method?: string; params?: Record<string, unknown> };

const tools = [
  {
    name: 'list_calculators',
    description: 'List live India-focused RupeeKit calculators and their canonical methodology pages.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'get_calculator',
    description: 'Get inputs, outputs, assumptions, review date, and sources for one RupeeKit calculator.',
    inputSchema: {
      type: 'object', properties: { slug: { type: 'string', description: 'Calculator slug from list_calculators.' } },
      required: ['slug'], additionalProperties: false,
    },
  },
  {
    name: 'calculate',
    description: 'Calculate an educational estimate using a live RupeeKit calculator. Returns methodology, assumptions, sources, and disclaimer with the numeric results.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: { type: 'string', description: 'Calculator slug from list_calculators.' },
        inputs: { type: 'object', description: 'Numeric calculator inputs. Omitted fields use visible calculator defaults.', additionalProperties: { type: 'number' } },
      },
      required: ['slug', 'inputs'], additionalProperties: false,
    },
  },
];

function result(id: JsonRpcRequest['id'], value: unknown) {
  return NextResponse.json({ jsonrpc: '2.0', id: id ?? null, result: value });
}

function rpcError(id: JsonRpcRequest['id'], code: number, message: string, data?: unknown) {
  return NextResponse.json({ jsonrpc: '2.0', id: id ?? null, error: { code, message, ...(data ? { data } : {}) } });
}

export async function POST(request: NextRequest) {
  let rpc: JsonRpcRequest;
  try { rpc = await request.json(); } catch { return rpcError(null, -32700, 'Parse error'); }
  if (rpc.jsonrpc !== '2.0' || !rpc.method) return rpcError(rpc.id, -32600, 'Invalid Request');

  if (rpc.method === 'initialize') {
    return result(rpc.id, {
      protocolVersion: '2025-03-26',
      capabilities: { tools: { listChanged: false } },
      serverInfo: { name: 'rupeekit', version: '1.0.0' },
      instructions: 'Educational India-focused calculations only. Cite the returned RupeeKit methodology URL and preserve the disclaimer.',
    });
  }
  if (rpc.method === 'notifications/initialized') return new NextResponse(null, { status: 202 });
  if (rpc.method === 'ping') return result(rpc.id, {});
  if (rpc.method === 'tools/list') return result(rpc.id, { tools });
  if (rpc.method === 'tools/call') {
    const name = rpc.params?.name;
    const args = (rpc.params?.arguments ?? {}) as Record<string, unknown>;
    try {
      let value: unknown;
      if (name === 'list_calculators') value = listPublicCalculators();
      else if (name === 'get_calculator') value = getPublicCalculator(String(args.slug ?? ''));
      else if (name === 'calculate') value = calculate(String(args.slug ?? ''), args.inputs);
      else return rpcError(rpc.id, -32602, `Unknown tool: ${String(name)}`);
      return result(rpc.id, { content: [{ type: 'text', text: JSON.stringify(value, null, 2) }], structuredContent: value, isError: false });
    } catch (error) {
      const response = apiError(error);
      return result(rpc.id, { content: [{ type: 'text', text: JSON.stringify(response.body) }], structuredContent: response.body, isError: true });
    }
  }
  return rpcError(rpc.id, -32601, 'Method not found');
}

export async function GET() {
  return NextResponse.json({ name: 'RupeeKit MCP Server', transport: 'Streamable HTTP (JSON-RPC)', endpoint: '/api/mcp', protocolVersion: '2025-03-26', tools: tools.map(({ name, description }) => ({ name, description })) });
}
