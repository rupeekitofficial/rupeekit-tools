import fs from 'node:fs';
import path from 'node:path';
import { Parser } from 'expr-eval';

const file = path.join(process.cwd(), 'data', 'tools.json');
const tools = JSON.parse(fs.readFileSync(file, 'utf8'));
const parser = new Parser();
const slugs = new Set();
let errors = 0;

function assert(condition, message) {
  if (!condition) {
    errors += 1;
    console.error(`❌ ${message}`);
  }
}

for (const tool of tools) {
  assert(tool.slug && typeof tool.slug === 'string', 'Tool missing slug');
  assert(!slugs.has(tool.slug), `Duplicate slug: ${tool.slug}`);
  slugs.add(tool.slug);
  assert(tool.name, `${tool.slug} missing name`);
  assert(Array.isArray(tool.inputs) && tool.inputs.length > 0, `${tool.slug} needs inputs`);
  assert(Array.isArray(tool.outputs) && tool.outputs.length > 0, `${tool.slug} needs outputs`);
  const context = {};
  for (const input of tool.inputs) context[input.key] = Number(input.default ?? 0);
  for (const output of tool.outputs) {
    try {
      const result = parser.parse(output.formula).evaluate(context);
      context[output.key] = result;
      assert(Number.isFinite(result), `${tool.slug}.${output.key} did not produce a finite number`);
    } catch (error) {
      errors += 1;
      console.error(`❌ ${tool.slug}.${output.key} formula error: ${error.message}`);
    }
  }
}

if (errors > 0) {
  console.error(`\nValidation failed with ${errors} error(s).`);
  process.exit(1);
}
console.log(`✅ Validated ${tools.length} tool(s).`);
