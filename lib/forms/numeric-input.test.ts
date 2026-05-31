import { describe, expect, it } from 'vitest';
import { extractDigits, parseIntegerFromTextInput, stripLeadingZeros } from './numeric-input';

describe('numeric-input helpers', () => {
  it('extracts only digits from mixed text', () => {
    expect(extractDigits('₹01,25,1ab')).toBe('01251');
  });

  it('strips unnecessary leading zeros while keeping single zero behavior', () => {
    expect(stripLeadingZeros('0001251')).toBe('1251');
    expect(stripLeadingZeros('0')).toBe('0');
    expect(stripLeadingZeros('')).toBe('');
  });

  it('parses integer values for controlled text inputs', () => {
    expect(parseIntegerFromTextInput('')).toBe(0);
    expect(parseIntegerFromTextInput('0')).toBe(0);
    expect(parseIntegerFromTextInput('000')).toBe(0);
    expect(parseIntegerFromTextInput('010')).toBe(10);
    expect(parseIntegerFromTextInput('01,25,1')).toBe(1251);
    expect(parseIntegerFromTextInput('abc012x')).toBe(12);
  });
});
