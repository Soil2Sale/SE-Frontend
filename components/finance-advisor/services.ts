import { InterestRate, YieldRecord, DebtAccount, Subsidy } from './types';

// Mock interest data aggregator - in real app swap for API calls
export async function fetchInterestRates(): Promise<InterestRate[]> {
  // sample NABARD-linked banks and MFIs
  return [
    { institution: 'NABARD Bank A', ratePercent: 9.5, loanType: 'KCC' },
    { institution: 'MFI B', ratePercent: 14.0, loanType: 'Short-term' },
    { institution: 'NABARD Bank C', ratePercent: 10.2, loanType: 'KCC' },
    { institution: 'GoldLend', ratePercent: 16.5, loanType: 'Gold' },
  ];
}

// Compute cheapest interest offers
export function compareInterestRates(rates: InterestRate[]) {
  const sorted = [...rates].sort((a, b) => a.ratePercent - b.ratePercent);
  return sorted;
}

// Yield trust / credit reliability: uses historical yields to compute score
export function computeYieldTrustScore(yields: YieldRecord[]) {
  if (!yields || yields.length === 0) return { score: 40, reason: 'No yield history' };
  // Use consistency and avg yield as proxy
  const avg = yields.reduce((s, r) => s + r.yieldKgPerAcre, 0) / yields.length;
  const variance = yields.reduce((s, r) => s + Math.pow(r.yieldKgPerAcre - avg, 2), 0) / yields.length;
  // Normalize: lower variance and higher avg => better score
  const score = Math.max(20, Math.min(95, Math.round((avg / (avg + Math.sqrt(variance) + 1)) * 100)));
  return { score, reason: `Avg ${avg.toFixed(1)} kg/acre, variance ${variance.toFixed(1)}` };
}

// Route 20% of sale to debts automatically - returns updated debts
export function autoRouteDebtPayment(saleAmount: number, debts: DebtAccount[]) {
  const routing = saleAmount * 0.2;
  let remaining = routing;
  // Prioritize high-interest debts (simple heuristic)
  const order = [...debts].sort((a, b) => b.balance - a.balance);
  const updated = order.map(d => ({ ...d }));
  for (const d of updated) {
    if (remaining <= 0) break;
    const pay = Math.min(d.balance, remaining);
    d.balance = +(d.balance - pay).toFixed(2);
    remaining = +(remaining - pay).toFixed(2);
  }
  return { updatedDebts: updated, routed: routing - remaining };
}

// Profitability: given mandi price, distance, fuel/labor costs compute net
export function calculateProfitability(params: {
  mandiPricePerQuintal: number; // per 100kg
  quantityQuintal: number;
  distanceKm: number;
  fuelCostPerKm: number;
  laborCostTotal: number;
  otherCosts?: number;
}) {
  const gross = params.mandiPricePerQuintal * params.quantityQuintal;
  const transport = params.distanceKm * params.fuelCostPerKm;
  const costs = transport + params.laborCostTotal + (params.otherCosts || 0);
  const net = gross - costs;
  const breakeven = costs / params.quantityQuintal; // per quintal
  return {
    gross,
    transport,
    costs,
    net,
    breakevenPerQuintal: breakeven,
    profitable: net > 0,
  };
}

// Deductions breakdown including platform fee, tax, moisture adjustment
export function computeDeductions(params: {
  saleAmount: number;
  platformFeePercent?: number; // e.g., 2%
  taxPercent?: number; // e.g., GST
  moisturePct?: number; // percent moisture above baseline
  moisturePenaltyPerPct?: number; // rupees per pct per quintal
  quantityQuintal: number;
}) {
  const platformFeePercent = params.platformFeePercent ?? 2.0;
  const taxPercent = params.taxPercent ?? 0.0;
  const platformFee = +(params.saleAmount * (platformFeePercent / 100));
  const tax = +(params.saleAmount * (taxPercent / 100));
  // Moisture penalty: simple linear penalty
  const moisturePenalty = +((params.moisturePct ?? 0) * (params.moisturePenaltyPerPct ?? 5) * params.quantityQuintal);
  const totalDeductions = +(platformFee + tax + moisturePenalty);
  const netReceived = +(params.saleAmount - totalDeductions);
  return { platformFee, tax, moisturePenalty, totalDeductions, netReceived };
}

// Simple moisture-based price adjustment (quality valuation)
export function qualityPriceAdjustment(basePricePerQuintal: number, moisturePct: number) {
  // Deduct 0.5% price per moisture pct above 12%
  const baseline = 12;
  const above = Math.max(0, moisturePct - baseline);
  const factor = 1 - (above * 0.005);
  return Math.max(0.6, factor) * basePricePerQuintal;
}

// Subsidy recommendations
const SUBSIDIES: Subsidy[] = [
  {
    id: 'S1',
    name: 'Drip Irrigation Subsidy',
    description: 'Assistance for installing drip irrigation.',
    minLandSizeAcre: 0.5,
    states: ['Karnataka', 'Maharashtra', 'Rajasthan'],
  },
  {
    id: 'S2',
    name: 'Solar Pump Subsidy',
    description: 'Subsidy for solar-powered irrigation pumps.',
    minLandSizeAcre: 1,
    states: ['Punjab', 'Haryana', 'Uttar Pradesh'],
  },
];

export function suggestSubsidies(state: string, landSizeAcre: number) {
  return SUBSIDIES.filter(s => s.states.includes(state) && landSizeAcre >= s.minLandSizeAcre);
}
