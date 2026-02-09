'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, MapPin, DollarSign, AlertTriangle, Landmark, LogOut, TrendingUp } from 'lucide-react';
import { ALL_INDIA_REGIONS } from '@/components/finance-advisor/partnership-services';

type Farmer = {
  id: string;
  name: string;
  state: string;
  regionId: string;
  loanAmount: number;
  pendingAmount: number;
  status: 'Active' | 'Repaid' | 'Default';
  cropType: string;
};

const DUMMY_FARMERS: Farmer[] = [
  { id: 'f1', name: 'Ramesh Kumar', state: 'Tamil Nadu', regionId: 'tn-cbe', loanAmount: 85000, pendingAmount: 20000, status: 'Active', cropType: 'Rice' },
  { id: 'f2', name: 'S. Kaur', state: 'Punjab', regionId: 'pb-lud', loanAmount: 210000, pendingAmount: 0, status: 'Repaid', cropType: 'Wheat' },
  { id: 'f3', name: 'M. Patil', state: 'Maharashtra', regionId: 'mh-nas', loanAmount: 140000, pendingAmount: 70000, status: 'Active', cropType: 'Cotton' },
  { id: 'f4', name: 'A. Singh', state: 'Uttar Pradesh', regionId: 'up-agra', loanAmount: 75000, pendingAmount: 50000, status: 'Default', cropType: 'Sugarcane' },
  { id: 'f5', name: 'Venkat Reddy', state: 'Andhra Pradesh', regionId: 'ap-viz', loanAmount: 120000, pendingAmount: 30000, status: 'Active', cropType: 'Rice' },
  { id: 'f6', name: 'Anil Sharma', state: 'Rajasthan', regionId: 'rj-jai', loanAmount: 95000, pendingAmount: 25000, status: 'Active', cropType: 'Bajra' },
  { id: 'f7', name: 'Krishna Rao', state: 'Karnataka', regionId: 'ka-ban', loanAmount: 150000, pendingAmount: 60000, status: 'Active', cropType: 'Coffee' },
  { id: 'f8', name: 'Suresh Patel', state: 'Gujarat', regionId: 'gj-ahm', loanAmount: 110000, pendingAmount: 0, status: 'Repaid', cropType: 'Cotton' },
];

function NavItem({ icon, label, active = false, href }: any) {
  const content = (
    <div className={`flex items-center gap-4 p-3.5 px-6 rounded-2xl transition-all cursor-pointer ${active ? 'bg-[#4CAF50] text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
      {icon}
      <span className="text-sm font-bold uppercase tracking-wider">{label}</span>
    </div>
  );
  
  return href ? <Link href={href}>{content}</Link> : content;
}

export default function FarmerPortfolioPage() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);

  // Aggregate by state
  const stateAggregation = DUMMY_FARMERS.reduce((acc: any, farmer) => {
    if (!acc[farmer.state]) {
      acc[farmer.state] = { count: 0, totalLoan: 0, totalPending: 0, farmers: [] };
    }
    acc[farmer.state].count++;
    acc[farmer.state].totalLoan += farmer.loanAmount;
    acc[farmer.state].totalPending += farmer.pendingAmount;
    acc[farmer.state].farmers.push(farmer);
    return acc;
  }, {});

  const getStateColor = (state: string) => {
    const data = stateAggregation[state];
    if (!data) return '#E8F5E9'; // Light green for states without data
    const riskRatio = data.totalPending / data.totalLoan;
    if (riskRatio > 0.5) return '#EF5350'; // Red - high risk
    if (riskRatio > 0.3) return '#FFA726'; // Orange - medium risk
    return '#66BB6A'; // Green - low risk
  };

  // State positions for SVG map (rough approximations)
  const statePolygons: Record<string, { path: string; labelX: number; labelY: number }> = {
    'Jammu & Kashmir': { path: 'M 22,10 L 28,8 L 32,12 L 30,18 L 24,16 Z', labelX: 26, labelY: 14 },
    'Punjab': { path: 'M 24,16 L 30,18 L 32,24 L 28,26 L 24,24 Z', labelX: 27, labelY: 22 },
    'Haryana': { path: 'M 28,26 L 32,24 L 34,28 L 30,30 Z', labelX: 30, labelY: 27 },
    'Rajasthan': { path: 'M 18,28 L 24,24 L 30,30 L 30,42 L 24,44 L 18,40 Z', labelX: 24, labelY: 36 },
    'Gujarat': { path: 'M 14,40 L 18,40 L 24,44 L 24,52 L 18,50 L 12,48 Z', labelX: 18, labelY: 46 },
    'Maharashtra': { path: 'M 24,44 L 30,42 L 36,46 L 36,56 L 30,58 L 24,54 Z', labelX: 29, labelY: 51 },
    'Karnataka': { path: 'M 24,54 L 30,58 L 34,68 L 28,70 L 22,66 Z', labelX: 28, labelY: 63 },
    'Tamil Nadu': { path: 'M 30,68 L 36,68 L 40,78 L 34,80 L 28,76 Z', labelX: 34, labelY: 74 },
    'Kerala': { path: 'M 22,66 L 28,70 L 28,76 L 24,80 L 20,76 Z', labelX: 24, labelY: 73 },
    'Andhra Pradesh': { path: 'M 34,56 L 40,56 L 44,64 L 40,68 L 34,68 Z', labelX: 38, labelY: 62 },
    'Telangana': { path: 'M 34,50 L 38,50 L 40,56 L 36,56 Z', labelX: 36, labelY: 53 },
    'Uttar Pradesh': { path: 'M 34,28 L 30,30 L 36,32 L 48,32 L 50,36 L 44,38 L 36,36 Z', labelX: 40, labelY: 33 },
    'Madhya Pradesh': { path: 'M 30,36 L 36,36 L 44,38 L 42,46 L 36,46 L 30,42 Z', labelX: 36, labelY: 41 },
  };

  return (
    <div className="flex min-h-screen bg-[#F5F7F5]">
      {/* Sidebar */}
      <aside className="w-72 bg-[#143023] text-white flex flex-col p-8 fixed h-screen shadow-2xl z-50 overflow-y-auto">
        <div className="flex items-center gap-3 mb-16 px-2">
          <div className="bg-[#4CAF50] p-1.5 rounded-lg shadow-inner">
            <Landmark size={24} />
          </div>
          <h1 className="text-2xl font-black tracking-tighter italic uppercase">Finance Hub</h1>
        </div>

        <nav className="flex-grow space-y-4">
          <NavItem icon={<TrendingUp size={20} />} label="Risk Radar" href="/user/dashboard/finance-advisor" />
          <NavItem icon={<Users size={20} />} label="Farmer Portfolio" active />
          <NavItem icon={<Landmark size={20} />} label="Lending Pools" />
        </nav>

        <button className="flex items-center gap-4 text-white/50 hover:text-white mt-auto pt-6 border-t border-white/10">
          <LogOut size={20} />
          <span className="text-sm font-bold uppercase tracking-widest">Exit Portal</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-10">
        <div className="mb-6">
          <Link 
            href="/user/dashboard/finance-advisor"
            className="flex items-center gap-2 text-[#143023] hover:text-[#4CAF50] transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-bold">Back to Dashboard</span>
          </Link>
        </div>

        <header className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-black text-[#143023] italic flex items-center gap-3">
            <Users className="text-[#4CAF50]" size={36} />
            Farmer Portfolio - India Heat Map
          </h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* India Map */}
          <div className="bg-white p-8 rounded-3xl border-4 border-gray-300 shadow-lg">
            <h3 className="text-xl font-black text-[#143023] mb-6 flex items-center gap-2">
              <MapPin className="text-[#4CAF50]" size={24} />
              India Regional Loan Heatmap
            </h3>
            
            <div className="relative bg-gradient-to-br from-blue-50/50 to-green-50/50 p-6 rounded-2xl border-2 border-[#4CAF50]/20">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-auto"
                style={{ maxHeight: '600px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
              >
                {/* Render state polygons */}
                {Object.entries(statePolygons).map(([state, { path, labelX, labelY }]) => {
                  const color = getStateColor(state);
                  const isHovered = hoveredState === state;
                  
                  return (
                    <g key={state}>
                      <path
                        d={path}
                        fill={color}
                        stroke="#FFFFFF"
                        strokeWidth="0.4"
                        className="cursor-pointer transition-all hover:opacity-70"
                        onMouseEnter={() => setHoveredState(state)}
                        onMouseLeave={() => setHoveredState(null)}
                        onClick={() => {
                          if (stateAggregation[state]) {
                            setSelectedFarmer(stateAggregation[state].farmers[0]);
                          }
                        }}
                      />
                      {/* State label */}
                      {stateAggregation[state] && (
                        <text
                          x={labelX}
                          y={labelY}
                          fontSize="2.5"
                          fontWeight="bold"
                          fill="#143023"
                          textAnchor="middle"
                          className="pointer-events-none"
                        >
                          {stateAggregation[state].count}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Legend */}
              <div className="mt-6 flex items-center justify-center gap-6 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#66BB6A]"></div>
                  <span className="text-gray-600">Low Risk (&lt;30%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#FFA726]"></div>
                  <span className="text-gray-600">Medium (30-50%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#EF5350]"></div>
                  <span className="text-gray-600">High Risk (&gt;50%)</span>
                </div>
              </div>

              {/* Hover Info Box */}
              {hoveredState && stateAggregation[hoveredState] && (
                <div className="mt-4 bg-[#143023] text-white p-4 rounded-xl">
                  <div className="text-lg font-bold mb-2">{hoveredState}</div>
                  <div className="text-sm space-y-1">
                    <div className="flex items-center gap-2">
                      <Users size={14} /> {stateAggregation[hoveredState].count} farmers
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-70">Total Lent:</span>
                      <span className="font-bold">₹{(stateAggregation[hoveredState].totalLoan / 100000).toFixed(1)}L</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-70">Pending:</span>
                      <span className="font-bold text-orange-400">₹{(stateAggregation[hoveredState].totalPending / 100000).toFixed(1)}L</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-white/20">
                      <span className="opacity-70">Risk Ratio:</span>
                      <span className="font-bold text-yellow-400">
                        {((stateAggregation[hoveredState].totalPending / stateAggregation[hoveredState].totalLoan) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Farmer List */}
          <div className="bg-white p-8 rounded-3xl border-4 border-gray-300 shadow-lg">
            <h3 className="text-xl font-black text-[#143023] mb-6 flex items-center gap-2">
              <DollarSign className="text-[#4CAF50]" size={24} />
              Active Farmer Loans
            </h3>
            
            <div className="overflow-y-auto max-h-[700px] pr-2 space-y-4">
              {DUMMY_FARMERS.map((farmer) => (
                <div
                  key={farmer.id}
                  className={`p-5 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedFarmer?.id === farmer.id 
                      ? 'bg-gradient-to-r from-green-50 to-blue-50 border-[#4CAF50] shadow-lg' 
                      : 'bg-gradient-to-r from-white to-green-50/30 border-[#4CAF50]/20 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedFarmer(farmer)}
                  onMouseEnter={() => setHoveredState(farmer.state)}
                  onMouseLeave={() => setHoveredState(null)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-bold text-lg text-[#143023]">{farmer.name}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin size={12} /> {farmer.state}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      farmer.status === 'Active' ? 'bg-green-100 text-green-700' : 
                      farmer.status === 'Repaid' ? 'bg-blue-100 text-blue-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {farmer.status}
                    </span>
                  </div>
                  
                  <div className="text-xs text-gray-500 mb-3">Crop: <span className="font-semibold text-gray-700">{farmer.cropType}</span></div>
                  
                  <div className="flex items-center justify-between text-sm border-t border-gray-200 pt-3">
                    <div>
                      <span className="text-gray-500">Total Loan:</span>
                      <div className="font-bold text-[#143023] text-lg">₹{(farmer.loanAmount / 100000).toFixed(1)}L</div>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-500">Pending:</span>
                      <div className="font-bold text-orange-600 text-lg">₹{(farmer.pendingAmount / 100000).toFixed(1)}L</div>
                    </div>
                  </div>

                  {farmer.status === 'Default' && (
                    <div className="mt-3 bg-red-50 text-red-700 p-2 rounded-lg text-center text-xs font-bold flex items-center justify-center gap-1">
                      <AlertTriangle size={12} /> Loan in default
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
