'use client';
import React from 'react';
import { TrendingUp, DollarSign } from 'lucide-react';
import { getCostVsProfitData } from './partnership-services';

export default function CostVsProfitAnalysis() {
  const data = getCostVsProfitData();
  const maxProfit = Math.max(...data.map(d => d.netProfit));

  return (
    <div className="bg-white border-4 border-[#4CAF50] p-3 rounded-2xl h-full flex flex-col shadow-md">
      <div className="mb-2">
        <p className="text-xs font-black uppercase tracking-widest text-[#1B5E20] mb-0.5">Financial Analysis</p>
        <h3 className="text-sm font-black italic text-[#1B5E20]">Cost vs Profit</h3>
      </div>

      {/* Bar Chart */}
      <div className="flex-1 flex items-end justify-between gap-0.5 mb-2">
        {data.map((month, i) => (
          <div key={i} className="flex-1 flex flex-col items-center group relative">
            {/* Tooltip on hover */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-[#1B5E20] text-white p-1.5 rounded-lg text-xs z-50 whitespace-nowrap font-bold">
              <div>Cost: ₹{(month.loanCost / 100000).toFixed(1)}L</div>
              <div>Return: ₹{(month.returns / 100000).toFixed(1)}L</div>
              <div className="text-[#4CAF50]">Profit: ₹{(month.netProfit / 100000).toFixed(1)}L</div>
            </div>

            {/* Cost bar (green) */}
            <div
              className="w-full bg-[#4CAF50] rounded-t-md transition-all group-hover:shadow-lg hover:bg-[#2E7D32]"
              style={{ height: `${(month.loanCost / Math.max(...data.map(d => d.loanCost))) * 100}%`, minHeight: '2px' }}
            />
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-2 text-xs font-bold mb-1.5">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-[#4CAF50] rounded"></div>
          <span className="text-[#558B2F]">Loan Cost</span>
        </div>
      </div>

      {/* Latest Month Stats */}
      <div className="bg-gradient-to-r from-[#E8F5E9] to-[#F1F8E9] p-2 rounded-lg border-2 border-[#4CAF50]">
        <div className="grid grid-cols-2 gap-1.5 text-xs">
          <div>
            <p className="text-[#558B2F] font-bold mb-0.5">Latest Net Profit</p>
            <p className="text-sm font-black text-[#2E7D32]">₹{(data[data.length - 1].netProfit / 100000).toFixed(2)}L</p>
          </div>
          <div>
            <p className="text-[#558B2F] font-bold mb-0.5">Portfolio Health</p>
            <p className="text-sm font-black text-[#00695C]">{data[data.length - 1].portfolioHealth}%</p>
          </div>
        </div>
        <div className="mt-1.5 flex items-center gap-2 text-[#2E7D32] font-bold text-xs">
          <TrendingUp size={12} />
          <span>↑ 20% Growth (6-month trend)</span>
        </div>
      </div>
    </div>
  );
}
