import { NextResponse } from 'next/server';

export const revalidate = 14400; // 4 hours

export async function GET() {
  try {
    const [metalsRes, fxRes] = await Promise.all([
      fetch('https://metals.live/api/v1/spot', { next: { revalidate: 14400 } }),
      fetch('https://open.er-api.com/v6/latest/USD', { next: { revalidate: 14400 } }),
    ]);

    if (!metalsRes.ok || !fxRes.ok) throw new Error('upstream error');

    const metals = await metalsRes.json();
    const fx = await fxRes.json();

    // metals.live returns array: [{ gold: 3350.12, ... }] — handle both array and object
    const goldUSD: number = Array.isArray(metals) ? metals[0]?.gold : metals?.gold;
    const usdToINR: number = fx?.rates?.INR;

    if (!goldUSD || !usdToINR) throw new Error('missing fields');

    const pricePerGram24k = Math.round((goldUSD / 31.1035) * usdToINR);
    return NextResponse.json({ pricePerGram24k, source: 'live', updatedAt: Date.now() });
  } catch {
    return NextResponse.json({ pricePerGram24k: 7200, source: 'default', updatedAt: null });
  }
}
