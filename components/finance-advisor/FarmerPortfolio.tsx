'use client';
import React, { useState } from 'react';
import { ALL_INDIA_REGIONS } from './partnership-services';

type Farmer = {
  id: string;
  name: string;
  regionId: string;
  loanAmount: number;
  pendingAmount: number;
  status: 'Active' | 'Repaid' | 'Default';
};

const DUMMY_FARMERS: Farmer[] = [
  { id: 'f1', name: 'Ramesh Kumar', regionId: 'tn-cbe', loanAmount: 85000, pendingAmount: 20000, status: 'Active' },
  { id: 'f2', name: 'S. Kaur', regionId: 'pb-lud', loanAmount: 210000, pendingAmount: 0, status: 'Repaid' },
  { id: 'f3', name: 'M. Patil', regionId: 'mh-nas', loanAmount: 140000, pendingAmount: 70000, status: 'Active' },
  { id: 'f4', name: 'A. Singh', regionId: 'up-agra', loanAmount: 75000, pendingAmount: 50000, status: 'Default' },
];

export default function FarmerPortfolio() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  // aggregate per state
  const stateAgg = ALL_INDIA_REGIONS.reduce<Record<string, { farmers: number; totalLoan: number; pending: number }>>((acc, r) => {
    acc[r.state] = { farmers: 0, totalLoan: 0, pending: 0 };
    return acc;
  }, {});

  DUMMY_FARMERS.forEach(f => {
    const region = ALL_INDIA_REGIONS.find(r => r.id === f.regionId);
    if (!region) return;
    const agg = stateAgg[region.state] || { farmers: 0, totalLoan: 0, pending: 0 };
    agg.farmers += 1;
    agg.totalLoan += f.loanAmount;
    agg.pending += f.pendingAmount;
    stateAgg[region.state] = agg;
  });

  const states = Object.keys(stateAgg);

  return (
    <div className="mt-8 grid grid-cols-12 gap-8">
      <div className="col-span-8 bg-white p-8 rounded-3xl border-4 border-gray-200">
        <h4 className="text-sm font-black text-gray-500 uppercase mb-4">Farmer Portfolio (sample)</h4>
        <div className="flex gap-6">
          <div className="flex-1">
            <ul className="space-y-3 max-h-64 overflow-y-auto">
              {DUMMY_FARMERS.map(f => {
                const region = ALL_INDIA_REGIONS.find(r => r.id === f.regionId)!;
                return (
                  <li key={f.id} className="p-3 rounded-xl border border-gray-100 flex justify-between items-center">
                    <div>
                      <div className="font-bold">{f.name}</div>
                      <div className="text-xs opacity-60">{region.name} • {region.state}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">₹{(f.loanAmount).toLocaleString()}</div>
                      <div className="text-xs opacity-60">Pending ₹{(f.pendingAmount).toLocaleString()}</div>
                      <div className={`text-xs mt-1 ${f.status === 'Default' ? 'text-red-600' : f.status === 'Active' ? 'text-amber-600' : 'text-green-600'}`}>{f.status}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* small state heatmap (list) */}
          <div className="w-80">
            <h5 className="text-xs font-bold mb-3">State heatmap (hover)</h5>
            <div className="grid grid-cols-1 gap-2">
              {states.map((s) => {
                const agg = stateAgg[s];
                return (
                  <div
                    key={s}
                    onMouseEnter={() => setHoveredState(s)}
                    onMouseLeave={() => setHoveredState(null)}
                    className="p-3 rounded-lg border cursor-pointer hover:shadow-md flex justify-between items-center"
                  >
                    <div className="text-sm font-bold">{s}</div>
                    <div className="text-xs opacity-70">{agg.farmers} farmers</div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 p-3 rounded-xl bg-gray-50">
              {hoveredState ? (
                (() => {
                  const a = stateAgg[hoveredState];
                  return (
                    <div className="text-sm">
                      <div className="font-bold">{hoveredState}</div>
                      <div className="text-xs">Farmers: {a.farmers}</div>
                      <div className="text-xs">Total loan: ₹{(a.totalLoan).toLocaleString()}</div>
                      <div className="text-xs">Pending: ₹{(a.pending).toLocaleString()}</div>
                    </div>
                  );
                })()
              ) : (
                <div className="text-xs opacity-60">Hover a state to see aggregated farmer loan data.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* right column: empty placeholder used earlier for Cost vs Profit, keep reserved */}
      <div className="col-span-4 flex items-start">
        <div className="w-full bg-white border-4 border-gray-200 rounded-3xl p-6">
          <h5 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Portfolio Details</h5>
          <p className="text-sm opacity-70">Use this panel for quick filters, export, or quick actions on loans.</p>
        </div>
      </div>
    </div>
  );
}