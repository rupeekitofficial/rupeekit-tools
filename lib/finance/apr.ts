export function solveMonthlyIrr(netCash: number, payment: number, paymentCount: number) {
  if (netCash <= 0 || payment <= 0 || paymentCount <= 0) return Number.NaN;

  const presentValueGap = (rate: number) => {
    let presentValue = 0;
    for (let month = 1; month <= paymentCount; month += 1) {
      presentValue += payment / (1 + rate) ** month;
    }
    return presentValue - netCash;
  };

  if (presentValueGap(0) <= 0) return 0;

  let low = 0;
  let high = 0.02;
  while (presentValueGap(high) > 0 && high < 10) high *= 2;
  if (presentValueGap(high) > 0) return Number.NaN;

  for (let iteration = 0; iteration < 120; iteration += 1) {
    const middle = (low + high) / 2;
    if (presentValueGap(middle) > 0) low = middle;
    else high = middle;
  }

  return (low + high) / 2;
}
