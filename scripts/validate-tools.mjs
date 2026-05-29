import fs from 'node:fs';
import path from 'node:path';
import { Parser } from 'expr-eval';

const file = path.join(process.cwd(), 'data', 'tools.json');
const tools = JSON.parse(fs.readFileSync(file, 'utf8'));

const parser = new Parser({
  operators: {
    add: true,
    concatenate: false,
    conditional: false,
    divide: true,
    factorial: false,
    multiply: true,
    power: true,
    remainder: true,
    subtract: true,
    logical: false,
    comparison: false,
    in: false,
    assignment: false,
  },
});

const VALID_STATUSES = new Set(['live', 'draft', 'paused']);
const VALID_OUTPUT_FORMATS = new Set(['currency', 'number', 'percent']);

let errors = 0;

function fail(message) {
  errors += 1;
  console.error(`❌ ${message}`);
}

function ensure(condition, message) {
  if (!condition) fail(message);
}

const slugMap = new Map();

for (const [index, tool] of tools.entries()) {
  if (!tool || typeof tool !== 'object') {
    fail(`Tool at index ${index} is not a valid object`);
    continue;
  }

  ensure(typeof tool.slug === 'string' && tool.slug.trim().length > 0, `Tool at index ${index} missing valid slug`);
  if (typeof tool.slug === 'string' && tool.slug.trim().length > 0) {
    if (slugMap.has(tool.slug)) {
      fail(`Duplicate slug: ${tool.slug}`);
    } else {
      slugMap.set(tool.slug, tool);
    }
  }

  ensure(typeof tool.name === 'string' && tool.name.trim().length > 0, `${tool.slug || `tool[${index}]`} missing name`);
  ensure(
    typeof tool.status === 'string' && VALID_STATUSES.has(tool.status),
    `${tool.slug || `tool[${index}]`} has invalid status: ${tool.status}`
  );
}

for (const [index, tool] of tools.entries()) {
  const slugLabel = tool?.slug || `tool[${index}]`;

  if (tool?.status === 'live') {
    ensure(typeof tool.targetKeyword === 'string' && tool.targetKeyword.trim().length > 0, `${slugLabel} missing targetKeyword`);
    ensure(typeof tool.shortDescription === 'string' && tool.shortDescription.trim().length > 0, `${slugLabel} missing shortDescription`);
    ensure(typeof tool.metaDescription === 'string' && tool.metaDescription.trim().length > 0, `${slugLabel} missing metaDescription`);
    if (typeof tool.metaDescription === 'string') {
      ensure(tool.metaDescription.length <= 160, `${slugLabel} metaDescription exceeds 160 characters (${tool.metaDescription.length})`);
    }
    ensure(Array.isArray(tool.faqs) && tool.faqs.length >= 2, `${slugLabel} must have at least 2 FAQs`);
    ensure(Array.isArray(tool.related), `${slugLabel} must include related array`);
  }

  if (tool.related !== undefined) {
    ensure(Array.isArray(tool.related), `${slugLabel} related must be an array`);
    if (Array.isArray(tool.related)) {
      for (const relatedSlug of tool.related) {
        ensure(typeof relatedSlug === 'string' && relatedSlug.trim().length > 0, `${slugLabel} has invalid related slug entry`);
        const relatedTool = slugMap.get(relatedSlug);
        ensure(Boolean(relatedTool), `${slugLabel} references missing related slug: ${relatedSlug}`);
        if (relatedTool) {
          ensure(relatedTool.status === 'live', `${slugLabel} references non-live related slug: ${relatedSlug}`);
        }
      }
    }
  }

  ensure(Array.isArray(tool.inputs) && tool.inputs.length > 0, `${slugLabel} needs inputs`);
  ensure(Array.isArray(tool.outputs) && tool.outputs.length > 0, `${slugLabel} needs outputs`);

  const context = {};
  if (Array.isArray(tool.inputs)) {
    for (const [inputIndex, input] of tool.inputs.entries()) {
      ensure(typeof input?.key === 'string' && input.key.trim().length > 0, `${slugLabel} input[${inputIndex}] missing key`);
      ensure(typeof input?.label === 'string' && input.label.trim().length > 0, `${slugLabel} input[${inputIndex}] missing label`);
      ensure(
        typeof input?.default === 'number' && Number.isFinite(input.default),
        `${slugLabel} input[${inputIndex}] default must be a finite number`
      );

      if (typeof input?.key === 'string' && typeof input?.default === 'number' && Number.isFinite(input.default)) {
        context[input.key] = input.default;
      }
    }
  }

  if (Array.isArray(tool.outputs)) {
    for (const [outputIndex, output] of tool.outputs.entries()) {
      ensure(typeof output?.key === 'string' && output.key.trim().length > 0, `${slugLabel} output[${outputIndex}] missing key`);
      ensure(typeof output?.label === 'string' && output.label.trim().length > 0, `${slugLabel} output[${outputIndex}] missing label`);
      ensure(typeof output?.formula === 'string' && output.formula.trim().length > 0, `${slugLabel} output[${outputIndex}] missing formula`);
      ensure(VALID_OUTPUT_FORMATS.has(output?.format), `${slugLabel}.${output?.key || outputIndex} has invalid format: ${output?.format}`);

      if (!(typeof output?.formula === 'string' && output.formula.trim().length > 0)) {
        continue;
      }

      try {
        const result = parser.parse(output.formula).evaluate(context);
        ensure(Number.isFinite(result), `${slugLabel}.${output.key} formula did not produce a finite number`);
        if (typeof output?.key === 'string' && Number.isFinite(result)) {
          context[output.key] = result;
        }
      } catch (error) {
        fail(`${slugLabel}.${output?.key || outputIndex} formula error: ${error.message}`);
      }
    }
  }
}

if (errors > 0) {
  console.error(`\nValidation failed with ${errors} error(s).`);
  process.exit(1);
}

console.log(`✅ Validated ${tools.length} tool(s).`);

