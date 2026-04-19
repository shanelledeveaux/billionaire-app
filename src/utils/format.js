export function formatBillions(val) {
  if (val >= 1000) return `$${(val / 1000).toFixed(1)}T`;
  if (val >= 1) return `$${val.toFixed(1)}B`;
  if (val >= 0.001) return `$${Math.round(val * 1000)}M`;
  return `$${Math.round(val * 1e6).toLocaleString()}`;
}

export function formatPercent(val, total) {
  return `${Math.min(100, Math.round((val / total) * 100))}%`;
}
