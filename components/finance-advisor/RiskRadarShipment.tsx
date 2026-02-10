'use client';
import React, { useState } from 'react';
import { AlertTriangle, MapPin } from 'lucide-react';
import { ALL_INDIA_REGIONS } from './partnership-services';
import { FarmingRegion } from './partnership-types';

export default function RiskRadarShipment() {
  const [hoveredRegion, setHoveredRegion] = useState<FarmingRegion | null>(null);
  const regions = ALL_INDIA_REGIONS;

  const getRiskColor = (region: FarmingRegion) => {
    if (region.riskLevel === 'Critical') return '#DC2626'; // red-600
    if (region.riskLevel === 'High') return '#EF4444'; // red-500
    if (region.riskLevel === 'Medium') return '#EAB308'; // yellow-500
    return '#22C55E'; // green-500
  };

  // Interest suggestion heuristic
  const suggestInterest = (region: FarmingRegion) => {
    const base = 12;
    const healthAdj = (60 - region.yieldHealth) / 10;
    const defaultAdj = region.loanDefaultRate / 10;
    const suggested = Math.max(6, +(base + healthAdj + defaultAdj).toFixed(2));
    return suggested;
  };

  // State positions for labels (rough approximations)
  const statePositions: Record<string, { x: number; y: number }> = {
    'Jammu & Kashmir': { x: 25, y: 15 },
    'Punjab': { x: 28, y: 22 },
    'Haryana': { x: 30, y: 26 },
    'Rajasthan': { x: 25, y: 35 },
    'Gujarat': { x: 20, y: 45 },
    'Maharashtra': { x: 30, y: 52 },
    'Karnataka': { x: 30, y: 63 },
    'Tamil Nadu': { x: 35, y: 72 },
    'Kerala': { x: 28, y: 72 },
    'Andhra Pradesh': { x: 37, y: 62 },
    'Telangana': { x: 35, y: 55 },
    'Uttar Pradesh': { x: 40, y: 32 },
    'Madhya Pradesh': { x: 35, y: 42 },
  };

  return (
    <div className="bg-white border-4 border-[#4CAF50] p-2.5 rounded-2xl relative overflow-hidden shadow-md flex flex-col h-full">
      <div className="flex justify-between items-center mb-1.5 flex-shrink-0">
        <h3 className="text-sm font-black italic flex items-center gap-1.5 text-[#1B5E20]">
          <MapPin size={16} className="text-[#D32F2F]" />
          National Risk Radar - India Heatmap
        </h3>
        <div className="flex gap-1.5 text-xs font-bold">
          <span className="bg-[#D32F2F] text-white px-1.5 py-0.5 rounded-lg uppercase text-xs">High Risk</span>
          <span className="bg-[#F57F17] text-white px-1.5 py-0.5 rounded-lg uppercase text-xs">Medium</span>
          <span className="bg-[#4CAF50] text-white px-1.5 py-0.5 rounded-lg uppercase text-xs">Low Risk</span>
        </div>
      </div>

      <div className="relative bg-gradient-to-br from-[#E8F5E9] to-[#E0F2F1] flex-1 min-h-0 rounded-2xl border-2 border-[#4CAF50] overflow-hidden flex flex-col">
        {/* India Map SVG */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}
        >
          {/* India Outline with simplified state polygons */}
          
          {/* Jammu & Kashmir */}
          <path
            d="M 22,10 L 28,8 L 32,12 L 30,18 L 24,16 Z"
            fill={getRiskColor(regions.find(r => r.state === 'Jammu & Kashmir') || regions[0])}
            stroke="#FFFFFF"
            strokeWidth="0.3"
            className="cursor-pointer transition-all hover:opacity-80"
            onMouseEnter={() => setHoveredRegion(regions.find(r => r.state === 'Jammu & Kashmir') || null)}
            onMouseLeave={() => setHoveredRegion(null)}
          />
          
          {/* Punjab */}
          <path
            d="M 24,16 L 30,18 L 32,24 L 28,26 L 24,24 Z"
            fill={getRiskColor(regions.find(r => r.state === 'Punjab') || regions[1])}
            stroke="#FFFFFF"
            strokeWidth="0.3"
            className="cursor-pointer transition-all hover:opacity-80"
            onMouseEnter={() => setHoveredRegion(regions.find(r => r.state === 'Punjab') || null)}
            onMouseLeave={() => setHoveredRegion(null)}
          />
          
          {/* Haryana */}
          <path
            d="M 28,26 L 32,24 L 34,28 L 30,30 Z"
            fill={getRiskColor(regions.find(r => r.state === 'Haryana') || regions[2])}
            stroke="#FFFFFF"
            strokeWidth="0.3"
            className="cursor-pointer transition-all hover:opacity-80"
            onMouseEnter={() => setHoveredRegion(regions.find(r => r.state === 'Haryana') || null)}
            onMouseLeave={() => setHoveredRegion(null)}
          />
          
          {/* Rajasthan */}
          <path
            d="M 18,28 L 24,24 L 30,30 L 30,42 L 24,44 L 18,40 Z"
            fill={getRiskColor(regions.find(r => r.state === 'Rajasthan') || regions[3])}
            stroke="#FFFFFF"
            strokeWidth="0.3"
            className="cursor-pointer transition-all hover:opacity-80"
            onMouseEnter={() => setHoveredRegion(regions.find(r => r.state === 'Rajasthan') || null)}
            onMouseLeave={() => setHoveredRegion(null)}
          />
          
          {/* Gujarat */}
          <path
            d="M 14,40 L 18,40 L 24,44 L 24,52 L 18,50 L 12,48 Z"
            fill={getRiskColor(regions.find(r => r.state === 'Gujarat') || regions[4])}
            stroke="#FFFFFF"
            strokeWidth="0.3"
            className="cursor-pointer transition-all hover:opacity-80"
            onMouseEnter={() => setHoveredRegion(regions.find(r => r.state === 'Gujarat') || null)}
            onMouseLeave={() => setHoveredRegion(null)}
          />
          
          {/* Maharashtra */}
          <path
            d="M 24,44 L 30,42 L 36,46 L 36,56 L 30,58 L 24,54 Z"
            fill={getRiskColor(regions.find(r => r.state === 'Maharashtra') || regions[5])}
            stroke="#FFFFFF"
            strokeWidth="0.3"
            className="cursor-pointer transition-all hover:opacity-80"
            onMouseEnter={() => setHoveredRegion(regions.find(r => r.state === 'Maharashtra') || null)}
            onMouseLeave={() => setHoveredRegion(null)}
          />
          
          {/* Karnataka */}
          <path
            d="M 24,54 L 30,58 L 34,68 L 28,70 L 22,66 Z"
            fill={getRiskColor(regions.find(r => r.state === 'Karnataka') || regions[6])}
            stroke="#FFFFFF"
            strokeWidth="0.3"
            className="cursor-pointer transition-all hover:opacity-80"
            onMouseEnter={() => setHoveredRegion(regions.find(r => r.state === 'Karnataka') || null)}
            onMouseLeave={() => setHoveredRegion(null)}
          />
          
          {/* Tamil Nadu */}
          <path
            d="M 30,68 L 36,68 L 40,78 L 34,80 L 28,76 Z"
            fill={getRiskColor(regions.find(r => r.state === 'Tamil Nadu') || regions[7])}
            stroke="#FFFFFF"
            strokeWidth="0.3"
            className="cursor-pointer transition-all hover:opacity-80"
            onMouseEnter={() => setHoveredRegion(regions.find(r => r.state === 'Tamil Nadu') || null)}
            onMouseLeave={() => setHoveredRegion(null)}
          />
          
          {/* Kerala */}
          <path
            d="M 22,66 L 28,70 L 28,76 L 24,80 L 20,76 Z"
            fill={getRiskColor(regions.find(r => r.state === 'Kerala') || regions[8])}
            stroke="#FFFFFF"
            strokeWidth="0.3"
            className="cursor-pointer transition-all hover:opacity-80"
            onMouseEnter={() => setHoveredRegion(regions.find(r => r.state === 'Kerala') || null)}
            onMouseLeave={() => setHoveredRegion(null)}
          />
          
          {/* Andhra Pradesh */}
          <path
            d="M 34,56 L 40,56 L 44,64 L 40,68 L 34,68 Z"
            fill={getRiskColor(regions.find(r => r.state === 'Andhra Pradesh') || regions[9])}
            stroke="#FFFFFF"
            strokeWidth="0.3"
            className="cursor-pointer transition-all hover:opacity-80"
            onMouseEnter={() => setHoveredRegion(regions.find(r => r.state === 'Andhra Pradesh') || null)}
            onMouseLeave={() => setHoveredRegion(null)}
          />
          
          {/* Telangana */}
          <path
            d="M 34,50 L 38,50 L 40,56 L 36,56 Z"
            fill={getRiskColor(regions.find(r => r.state === 'Telangana') || regions[10])}
            stroke="#FFFFFF"
            strokeWidth="0.3"
            className="cursor-pointer transition-all hover:opacity-80"
            onMouseEnter={() => setHoveredRegion(regions.find(r => r.state === 'Telangana') || null)}
            onMouseLeave={() => setHoveredRegion(null)}
          />
          
          {/* Uttar Pradesh */}
          <path
            d="M 34,28 L 30,30 L 36,32 L 48,32 L 50,36 L 44,38 L 36,36 Z"
            fill={getRiskColor(regions.find(r => r.state === 'Uttar Pradesh') || regions[11])}
            stroke="#FFFFFF"
            strokeWidth="0.3"
            className="cursor-pointer transition-all hover:opacity-80"
            onMouseEnter={() => setHoveredRegion(regions.find(r => r.state === 'Uttar Pradesh') || null)}
            onMouseLeave={() => setHoveredRegion(null)}
          />
          
          {/* Madhya Pradesh */}
          <path
            d="M 30,36 L 36,36 L 44,38 L 42,46 L 36,46 L 30,42 Z"
            fill={getRiskColor(regions.find(r => r.state === 'Madhya Pradesh') || regions[12] || regions[0])}
            stroke="#FFFFFF"
            strokeWidth="0.3"
            className="cursor-pointer transition-all hover:opacity-80"
            onMouseEnter={() => setHoveredRegion(regions.find(r => r.state === 'Madhya Pradesh') || null)}
            onMouseLeave={() => setHoveredRegion(null)}
          />
          
          {/* Add more states from regions */}
          {regions.filter(r => !statePositions[r.state]).map((region, idx) => {
            const x = 50 + (idx % 5) * 8;
            const y = 20 + Math.floor(idx / 5) * 8;
            return (
              <circle
                key={region.id}
                cx={x}
                cy={y}
                r="3"
                fill={getRiskColor(region)}
                stroke="#FFFFFF"
                strokeWidth="0.3"
                className="cursor-pointer transition-all hover:opacity-80"
                onMouseEnter={() => setHoveredRegion(region)}
                onMouseLeave={() => setHoveredRegion(null)}
              />
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredRegion && (
          <div className="absolute top-2 right-2 w-60 bg-gradient-to-br from-[#E8F5E9] to-white text-[#1B5E20] p-2.5 rounded-lg shadow-lg z-50 border-2 border-[#4CAF50]">
            <h5 className="font-black italic text-sm mb-1.5">{hoveredRegion.name}, {hoveredRegion.state}</h5>
            <div className="text-xs space-y-1">
              <div className="flex justify-between border-b border-[#4CAF50]/20 pb-0.5">
                <span className="text-[#558B2F]">Yield Health</span>
                <span className="font-bold text-[#2E7D32]">{hoveredRegion.yieldHealth}%</span>
              </div>
              <div className="flex justify-between border-b border-[#4CAF50]/20 pb-0.5">
                <span className="text-[#558B2F]">Risk Level</span>
                <span className="font-bold text-[#F57F17]">{hoveredRegion.riskLevel}</span>
              </div>
              <div className="flex justify-between border-b border-[#4CAF50]/20 pb-0.5">
                <span className="text-[#558B2F]">Farmers Seeking Loans</span>
                <span className="font-bold text-[#2E7D32]">{hoveredRegion.farmersSeekingLoan.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-[#4CAF50]/20 pb-0.5">
                <span className="text-[#558B2F]">Avg Loan Amount</span>
                <span className="font-bold text-[#2E7D32]">{hoveredRegion.avgLoanAmount}</span>
              </div>
              <div className="flex justify-between border-b border-[#4CAF50]/20 pb-0.5">
                <span className="text-[#558B2F]">Default Rate</span>
                <span className="font-bold text-red-600">{hoveredRegion.loanDefaultRate}%</span>
              </div>
            </div>

            <div className="mt-1.5 bg-[#4CAF50]/10 p-1.5 rounded-lg border border-[#4CAF50]/50">
              <div className="flex items-center justify-between">
                <div className="text-xs text-[#558B2F] font-bold">Suggested Rate</div>
                <div className="text-lg font-black text-[#2E7D32]">{suggestInterest(hoveredRegion)}%</div>
              </div>
            </div>

            {hoveredRegion.activePestAlert && (
              <div className="mt-1 bg-red-500/10 text-red-700 p-1.5 rounded-lg text-center font-black text-xs uppercase border border-red-400/30 flex items-center justify-center gap-1">
                <AlertTriangle size={10} /> Active pest: {hoveredRegion.pestType}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}