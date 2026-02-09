'use client';
import React from 'react';
import { TrendingUp, DollarSign } from 'lucide-react';
import { getCostVsProfitData } from './partnership-services';

export default function CostVsProfitAnalysis() {
  const data = getCostVsProfitData();
  const maxProfit = Math.max(...data.map(d => d.netProfit));

  return (
    <div className="bg-white border-4 border-gray-300 p-8 rounded-3xl h-full flex flex-col">
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Financial Analysis</p>
        <h3 className="text-xl font-black italic">Cost vs Profit</h3>
      </div>

      {/* Bar Chart */}
      <div className="flex-1 flex items-end justify-between gap-2 mb-6">
        {data.map((month, i) => (
          <div key={i} className="flex-1 flex flex-col items-center group relative">
            {/* Tooltip on hover */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white p-2 rounded-lg text-xs z-50 whitespace-nowrap font-bold">
              <div>Cost: ₹{(month.loanCost / 100000).toFixed(1)}L</div>
              <div>Return: ₹{(month.returns / 100000).toFixed(1)}L</div>
              <div className="text-green-300">Profit: ₹{(month.netProfit / 100000).toFixed(1)}L</div>
            </div>

            {/* Cost bar (light gray) */}
            <div
              className="w-full bg-gray-300 rounded-t-md transition-all group-hover:shadow-lg"
              style={{ height: `${(month.loanCost / Math.max(...data.map(d => d.loanCost))) * 100}%` }}
            />
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-xs font-bold mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-300 rounded"></div>
          <span>Loan Cost</span>
        </div>
      </div>

      {/* Latest Month Stats */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-2xl border border-green-200">
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p className="opacity-60 font-bold mb-1">Latest Net Profit</p>
            <p className="text-lg font-black text-green-600">₹{(data[data.length - 1].netProfit / 100000).toFixed(2)}L</p>
          </div>
          <div>
            <p className="opacity-60 font-bold mb-1">Portfolio Health</p>
            <p className="text-lg font-black text-blue-600">{data[data.length - 1].portfolioHealth}%</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-green-600 font-bold">
          <TrendingUp size={16} />
          <span>↑ 20% Growth (6-month trend)</span>
        </div>
      </div>
    </div>
  );
}
