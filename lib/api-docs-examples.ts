export const mcpCalculateExample = {
  jsonrpc: '2.0',
  id: 1,
  method: 'tools/call',
  params: {
    name: 'calculate',
    arguments: {
      slug: 'emi-calculator-india',
      inputs: {
        principal: 500000,
        annualRate: 12,
        years: 3,
      },
    },
  },
} as const;

export const mcpCalculateExampleText = JSON.stringify(mcpCalculateExample, null, 2);
