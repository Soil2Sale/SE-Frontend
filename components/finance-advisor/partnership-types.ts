// All-India Regions with comprehensive data
export interface FarmingRegion {
  id: string;
  name: string;
  state: string;
  district: string;
  latitude: number;
  longitude: number;
  yieldHealth: number; // 0-100%
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  activePestAlert: boolean;
  pestType?: string;
  futureLoanDemand: number; // farmers needing loans %
  totalFarmers: number;
  farmersSeekingLoan: number;
  avgLoanAmount: string;
  primaryCrop: string;
  secondaryCrop?: string;
  yieldTrend: 'Up' | 'Down' | 'Stable';
  portfolioHealth: number; // 0-100%
  loanDefaultRate: number; // %
}

export interface GovernmentScheme {
  id: string;
  name: string;
  description: string;
  applicableStates: string[];
  subsidy: string;
  deadline?: string;
  status: 'Active' | 'Closing Soon' | 'Closed' | 'New';
  eligibility: string;
  impact: string;
  icon?: string;
}

export interface PartnerPortfolio {
  totalLent: number;
  totalReturned: number;
  outstandingDebt: number;
  avgInterestRate: number;
  portfolioHealth: 'Excellent' | 'Stable' | 'At Risk' | 'Critical';
  totalFarmers: number;
  activeLoans: number;
  defaultLoans: number;
}

export interface FarmerLoanMetric {
  regionId: string;
  regionName: string;
  loanCount: number;
  totalAmount: number;
  defaultCount: number;
  recoveryRate: number;
}

export interface ShipmentRoute {
  id: string;
  origin: string;
  destination: string;
  crop: string;
  quantity: string;
  distance: number;
  status: 'In Transit' | 'Delayed' | 'Completed' | 'Risk';
  riskFactors: string[];
  weather: 'Clear' | 'Rainy' | 'Stormy';
  estimatedArrival: string;
}

export interface CostVsProfitData {
  month: string;
  loanCost: number; // Interest paid
  returns: number; // Amount returned + interest
  netProfit: number;
  portfolioHealth: number;
}
