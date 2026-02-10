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
    <div className="w-full min-h-screen bg-[#F5F7F5]">
      {/* Main Content Area */}
      <main className="w-full p-12">
        <header className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-black text-[#143023] italic">Farmer Portfolio - India Heat Map</h2>
          <div className="bg-white px-6 py-2 rounded-full shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 bg-[#4CAF50] rounded-full text-white flex items-center justify-center font-bold">P</div>
            <span className="text-xs font-bold text-gray-600">Institutional Partner (ID: 992)</span>
          </div>
        </header>

        {/* Top Row: Financial Analysis, Rating, GIF */}
        <div className="grid grid-cols-12 gap-8 mb-8">
          <div className="col-span-4">
            <CostVsProfitAnalysis />
          </div>
          <div className="col-span-4">
            <CreditRating />
          </div>
          <div className="col-span-4 bg-white border-4 border-gray-300 rounded-3xl p-8 flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Gif Section</p>
              <div className="w-24 h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center">
                <Zap size={32} className="text-gray-300" />
              </div>
              <p className="text-xs text-gray-400 mt-4">Reserved for animations</p>
            </div>
          </div>
        </div>

        {/* Middle Row: Risk Radar (Full Width) */}
        <div className="grid grid-cols-12 gap-8 mb-8">
          <div className="col-span-12">
            <RiskRadarShipment />
          </div>
        </div>

        {/* Portfolio Summary & Government Schemes Row */}
        <div className="grid grid-cols-12 gap-8 mb-12">
          {/* Portfolio Summary */}
          <div className="col-span-8 bg-white p-10 rounded-3xl border-4 border-gray-300 shadow-sm">
            <h3 className="text-xl font-black italic mb-6 text-[#143023]">Active Farmer Loans</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Total Lent</p>
                <p className="text-3xl font-black text-[#143023]">₹{(portfolio.totalLent / 10000000).toFixed(1)}Cr</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Total Returned</p>
                <p className="text-3xl font-black text-green-600">₹{(portfolio.totalReturned / 10000000).toFixed(1)}Cr</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Outstanding</p>
                <p className="text-3xl font-black text-yellow-600">₹{(portfolio.outstandingDebt / 10000000).toFixed(1)}Cr</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Avg Interest Rate</p>
                <p className="text-3xl font-black text-blue-600">{portfolio.avgInterestRate}%</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Active Loans</p>
                <p className="text-3xl font-black">{portfolio.activeLoans.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Default Loans</p>
                <p className="text-3xl font-black text-red-600">{portfolio.defaultLoans}</p>
              </div>
            </div>
          </div>

          {/* Government Schemes */}
          <div className="col-span-4 space-y-6">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Govt Schemes Alert</h4>

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

        {/* Farmer Portfolio Details */}
        <div className="mt-16">
          <FarmerPortfolio />
        </div>
      </main>
    </div>
  );
}
