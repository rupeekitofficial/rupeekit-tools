import { describe, expect, it } from 'vitest';
import { getSipReturnPresetKey, isSipReturnPreset } from './presets';

describe('sip return presets', () => {
  it('identifies preset return values', () => {
    expect(isSipReturnPreset(8)).toBe(true);
    expect(isSipReturnPreset(10)).toBe(true);
    expect(isSipReturnPreset(12)).toBe(true);
    expect(isSipReturnPreset(9.5)).toBe(false);
  });

  it('maps return values to preset keys', () => {
    expect(getSipReturnPresetKey(8)).toBe('8');
    expect(getSipReturnPresetKey(10)).toBe('10');
    expect(getSipReturnPresetKey(12)).toBe('12');
    expect(getSipReturnPresetKey(11)).toBe('custom');
  });
});
