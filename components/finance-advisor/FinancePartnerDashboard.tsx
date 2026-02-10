'use client';
import React from 'react';
import { Zap } from 'lucide-react';
import { SchemeCard } from './PartnerHelpers';
import CreditRating from './CreditRating';
import RiskRadarShipment from './RiskRadarShipment';
import CostVsProfitAnalysis from './CostVsProfitAnalysis';
import FarmerPortfolio from './FarmerPortfolio';
import { GOV_SCHEMES, getPortfolioSummary } from './partnership-services';

export default function FinancePartnerDashboard() {
  const portfolio = getPortfolioSummary();

  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#E8F5E9] via-[#F1F8E9] to-[#E0F2F1] overflow-hidden flex flex-col">
      {/* Main Content Area */}
      <main className="w-full h-full p-4 flex flex-col gap-2 overflow-hidden">
        <header className="flex justify-between items-center flex-shrink-0">
          <h2 className="text-xl font-black text-[#1B5E20] italic">Farmer Portfolio - India Heat Map</h2>
          <div className="bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] px-3 py-1 rounded-full shadow-md flex items-center gap-2">
            <div className="w-5 h-5 bg-white rounded-full text-[#2E7D32] flex items-center justify-center font-bold text-xs">P</div>
            <span className="text-xs font-bold text-white">Institutional Partner (ID: 992)</span>
          </div>
        </header>

        {/* Top Row: Financial Analysis, Rating, GIF */}
        <div className="grid grid-cols-12 gap-2 flex-shrink-0">
          <div className="col-span-4">
            <CostVsProfitAnalysis />
          </div>
          <div className="col-span-4">
            <CreditRating />
          </div>
          <div className="col-span-4 bg-white border-4 border-[#4CAF50] rounded-2xl p-3 flex items-center justify-center shadow-md">
            <div className="text-center">
              <p className="text-xs font-black text-[#2E7D32] uppercase tracking-widest mb-2">Gif Section</p>
              <div className="w-14 h-14 bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] border-2 border-dashed border-[#4CAF50] rounded-2xl flex items-center justify-center">
                <Zap size={20} className="text-[#2E7D32]" />
              </div>
              <p className="text-xs text-[#558B2F] mt-1.5">Reserved</p>
            </div>
          </div>
        </div>

        {/* Risk Radar, Active Loans, and Farmer Portfolio in one row */}
        <div className="grid grid-cols-12 gap-2 flex-1 min-h-0 overflow-hidden">
          {/* Risk Radar */}
          <div className="col-span-4 min-h-0 overflow-hidden flex flex-col">
            <RiskRadarShipment />
          </div>

          {/* Active Loans & Government Schemes */}
          <div className="col-span-4 min-h-0 overflow-hidden flex flex-col">
            <div className="bg-white p-3 rounded-2xl border-4 border-[#4CAF50] shadow-md h-full flex flex-col">
              <h3 className="text-sm font-black italic mb-2 text-[#1B5E20] border-b-2 border-[#4CAF50] pb-1 flex-shrink-0">Active Farmer Loans</h3>
              <div className="grid grid-cols-2 gap-2 flex-shrink-0">
                <div className="p-2 bg-gradient-to-br from-[#F1F8E9] to-[#E8F5E9] rounded-lg border-l-4 border-[#4CAF50]">
                  <p className="text-xs font-bold text-[#558B2F] uppercase tracking-wide mb-0.5">Total Lent</p>
                  <p className="text-base font-black text-[#1B5E20]">₹{(portfolio.totalLent / 10000000).toFixed(1)}Cr</p>
                </div>
                <div className="p-2 bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] rounded-lg border-l-4 border-[#2E7D32]">
                  <p className="text-xs font-bold text-[#558B2F] uppercase tracking-wide mb-0.5">Total Returned</p>
                  <p className="text-base font-black text-green-700">₹{(portfolio.totalReturned / 10000000).toFixed(1)}Cr</p>
                </div>
                <div className="p-2 bg-gradient-to-br from-[#E0F2F1] to-[#B2DFDB] rounded-lg border-l-4 border-[#00897B]">
                  <p className="text-xs font-bold text-[#558B2F] uppercase tracking-wide mb-0.5">Outstanding</p>
                  <p className="text-base font-black text-[#00695C]">₹{(portfolio.outstandingDebt / 10000000).toFixed(1)}Cr</p>
                </div>
                <div className="p-2 bg-gradient-to-br from-[#E3F2FD] to-[#BBDEFB] rounded-lg border-l-4 border-[#1976D2]">
                  <p className="text-xs font-bold text-[#558B2F] uppercase tracking-wide mb-0.5">Avg Rate</p>
                  <p className="text-base font-black text-blue-700">{portfolio.avgInterestRate}%</p>
                </div>
                <div className="p-2 bg-gradient-to-br from-[#F1F8E9] to-[#DCEDC8] rounded-lg border-l-4 border-[#4CAF50]">
                  <p className="text-xs font-bold text-[#558B2F] uppercase tracking-wide mb-0.5">Active Loans</p>
                  <p className="text-base font-black text-[#2E7D32]">{(portfolio.activeLoans / 1000).toFixed(1)}K</p>
                </div>
                <div className="p-2 bg-gradient-to-br from-[#FFEBEE] to-[#FFCDD2] rounded-lg border-l-4 border-[#D32F2F]">
                  <p className="text-xs font-bold text-[#558B2F] uppercase tracking-wide mb-0.5">Default</p>
                  <p className="text-base font-black text-red-700">{portfolio.defaultLoans}</p>
                </div>
              </div>

              {/* Government Schemes */}
              <h4 className="text-xs font-black text-[#1B5E20] uppercase tracking-[0.2em] border-b-2 border-[#4CAF50] pb-0.5 mt-2 mb-1 flex-shrink-0">Govt Schemes Alert</h4>
              <div className="flex-1 min-h-0 overflow-y-auto">
                <div className="grid grid-cols-1 gap-2">
                  {GOV_SCHEMES.slice(0, 3).map((scheme, i) => (
                    <SchemeCard
                      key={scheme.id}
                      title={scheme.name}
                      desc={scheme.description}
                      badge={scheme.status}
                      variant={scheme.status === 'Closing Soon' ? 'urgent' : 'default'}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Farmer Portfolio */}
          <div className="col-span-4 min-h-0 overflow-hidden">
            <FarmerPortfolio />
          </div>
        </div>
      </main>
    </div>
  );
}
