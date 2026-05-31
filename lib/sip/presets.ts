export const SIP_RETURN_PRESETS = [8, 10, 12] as const;

export type SipReturnPresetKey = '8' | '10' | '12' | 'custom';

export function isSipReturnPreset(value: number): boolean {
  return SIP_RETURN_PRESETS.some((preset) => Math.abs(value - preset) < 0.001);
}

export function getSipReturnPresetKey(value: number): SipReturnPresetKey {
  if (Math.abs(value - 8) < 0.001) return '8';
  if (Math.abs(value - 10) < 0.001) return '10';
  if (Math.abs(value - 12) < 0.001) return '12';
  return 'custom';
}
