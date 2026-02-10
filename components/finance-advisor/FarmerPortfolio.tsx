'use client';
import React from 'react';
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
  return (
    <div className="bg-white p-2 rounded-2xl border-4 border-[#4CAF50] shadow-md h-full flex flex-col">
      <h4 className="text-xs font-black text-[#1B5E20] uppercase mb-1 border-b-2 border-[#4CAF50] pb-0.5 flex-shrink-0">Farmer Portfolio</h4>
      <ul className="space-y-0.5 overflow-y-auto flex-1">
        {DUMMY_FARMERS.map(f => {
          const region = ALL_INDIA_REGIONS.find(r => r.id === f.regionId)!;
          return (
            <li key={f.id} className="p-1 rounded-lg border-l-4 border-[#4CAF50] bg-gradient-to-r from-[#F1F8E9] to-white flex justify-between items-center text-xs hover:shadow-sm transition-shadow">
              <div className="flex-1">
                <div className="font-bold text-[#1B5E20] text-xs">{f.name}</div>
                <div className="text-xs text-[#558B2F]">{region.state}</div>
              </div>
              <div className="text-right text-xs">
                <div className="font-bold text-[#2E7D32]">₹{(f.loanAmount / 1000).toFixed(0)}K</div>
                <div className={`text-xs font-semibold ${f.status === 'Default' ? 'text-red-600' : f.status === 'Active' ? 'text-[#F57F17]' : 'text-[#2E7D32]'}`}>{f.status}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}