import {
  FarmingRegion,
  GovernmentScheme,
  PartnerPortfolio,
  FarmerLoanMetric,
  ShipmentRoute,
  CostVsProfitData,
} from './partnership-types';

// All-India Farming Regions Database
export const ALL_INDIA_REGIONS: FarmingRegion[] = [
  // Tamil Nadu
  {
    id: 'tn-cbe',
    name: 'Coimbatore',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    latitude: 11.0081,
    longitude: 76.9025,
    yieldHealth: 42,
    riskLevel: 'High',
    activePestAlert: true,
    pestType: 'Spodoptera',
    futureLoanDemand: 88,
    totalFarmers: 2400,
    farmersSeekingLoan: 2112,
    avgLoanAmount: '₹85K',
    primaryCrop: 'Cotton',
    secondaryCrop: 'Sugarcane',
    yieldTrend: 'Down',
    portfolioHealth: 38,
    loanDefaultRate: 8.2,
  },
  {
    id: 'tn-mdur',
    name: 'Madurai',
    state: 'Tamil Nadu',
    district: 'Madurai',
    latitude: 9.919,
    longitude: 78.1198,
    yieldHealth: 72,
    riskLevel: 'Low',
    activePestAlert: false,
    futureLoanDemand: 35,
    totalFarmers: 1800,
    farmersSeekingLoan: 630,
    avgLoanAmount: '₹1.2L',
    primaryCrop: 'Rice',
    secondaryCrop: 'Pulses',
    yieldTrend: 'Up',
    portfolioHealth: 82,
    loanDefaultRate: 2.1,
  },

  // Punjab
  {
    id: 'pb-lud',
    name: 'Ludhiana',
    state: 'Punjab',
    district: 'Ludhiana',
    latitude: 30.901,
    longitude: 75.8573,
    yieldHealth: 88,
    riskLevel: 'Low',
    activePestAlert: false,
    futureLoanDemand: 12,
    totalFarmers: 3200,
    farmersSeekingLoan: 384,
    avgLoanAmount: '₹2.1L',
    primaryCrop: 'Wheat',
    secondaryCrop: 'Cotton',
    yieldTrend: 'Stable',
    portfolioHealth: 91,
    loanDefaultRate: 0.8,
  },
  {
    id: 'pb-amr',
    name: 'Amritsar',
    state: 'Punjab',
    district: 'Amritsar',
    latitude: 31.6340,
    longitude: 74.8723,
    yieldHealth: 82,
    riskLevel: 'Low',
    activePestAlert: false,
    futureLoanDemand: 18,
    totalFarmers: 2900,
    farmersSeekingLoan: 522,
    avgLoanAmount: '₹1.95L',
    primaryCrop: 'Rice',
    secondaryCrop: 'Wheat',
    yieldTrend: 'Up',
    portfolioHealth: 88,
    loanDefaultRate: 1.2,
  },

  // Maharashtra
  {
    id: 'mh-nas',
    name: 'Nashik',
    state: 'Maharashtra',
    district: 'Nashik',
    latitude: 19.9975,
    longitude: 73.7898,
    yieldHealth: 65,
    riskLevel: 'Medium',
    activePestAlert: false,
    futureLoanDemand: 40,
    totalFarmers: 2100,
    farmersSeekingLoan: 840,
    avgLoanAmount: '₹1.4L',
    primaryCrop: 'Sugarcane',
    secondaryCrop: 'Grapes',
    yieldTrend: 'Stable',
    portfolioHealth: 72,
    loanDefaultRate: 3.5,
  },
  {
    id: 'mh-akl',
    name: 'Akola',
    state: 'Maharashtra',
    district: 'Akola',
    latitude: 20.7281,
    longitude: 77.1116,
    yieldHealth: 52,
    riskLevel: 'High',
    activePestAlert: true,
    pestType: 'Leaf Roller',
    futureLoanDemand: 71,
    totalFarmers: 1950,
    farmersSeekingLoan: 1385,
    avgLoanAmount: '₹95K',
    primaryCrop: 'Cotton',
    secondaryCrop: 'Soybean',
    yieldTrend: 'Down',
    portfolioHealth: 48,
    loanDefaultRate: 6.7,
  },

  // Karnataka
  {
    id: 'ka-ban',
    name: 'Bangalore',
    state: 'Karnataka',
    district: 'Bangalore Rural',
    latitude: 13.2326,
    longitude: 77.6245,
    yieldHealth: 78,
    riskLevel: 'Low',
    activePestAlert: false,
    futureLoanDemand: 28,
    totalFarmers: 2200,
    farmersSeekingLoan: 616,
    avgLoanAmount: '₹1.35L',
    primaryCrop: 'Arecanut',
    secondaryCrop: 'Coconut',
    yieldTrend: 'Up',
    portfolioHealth: 85,
    loanDefaultRate: 1.9,
  },
  {
    id: 'ka-bel',
    name: 'Belgaum',
    state: 'Karnataka',
    district: 'Belgaum',
    latitude: 15.8497,
    longitude: 75.6821,
    yieldHealth: 58,
    riskLevel: 'Medium',
    activePestAlert: true,
    pestType: 'Stem Borer',
    futureLoanDemand: 55,
    totalFarmers: 1750,
    farmersSeekingLoan: 963,
    avgLoanAmount: '₹1.05L',
    primaryCrop: 'Sugarcane',
    secondaryCrop: 'Maize',
    yieldTrend: 'Down',
    portfolioHealth: 62,
    loanDefaultRate: 4.8,
  },

  // Haryana
  {
    id: 'hr-hsr',
    name: 'Hisar',
    state: 'Haryana',
    district: 'Hisar',
    latitude: 29.1724,
    longitude: 75.7366,
    yieldHealth: 85,
    riskLevel: 'Low',
    activePestAlert: false,
    futureLoanDemand: 15,
    totalFarmers: 2600,
    farmersSeekingLoan: 390,
    avgLoanAmount: '₹1.85L',
    primaryCrop: 'Wheat',
    secondaryCrop: 'Mustard',
    yieldTrend: 'Stable',
    portfolioHealth: 89,
    loanDefaultRate: 0.9,
  },

  // Uttar Pradesh
  {
    id: 'up-knp',
    name: 'Kanpur',
    state: 'Uttar Pradesh',
    district: 'Kanpur',
    latitude: 26.4499,
    longitude: 80.3319,
    yieldHealth: 68,
    riskLevel: 'Medium',
    activePestAlert: false,
    futureLoanDemand: 48,
    totalFarmers: 3400,
    farmersSeekingLoan: 1632,
    avgLoanAmount: '₹1.1L',
    primaryCrop: 'Rice',
    secondaryCrop: 'Wheat',
    yieldTrend: 'Stable',
    portfolioHealth: 70,
    loanDefaultRate: 3.2,
  },
  {
    id: 'up-agra',
    name: 'Agra',
    state: 'Uttar Pradesh',
    district: 'Agra',
    latitude: 27.1767,
    longitude: 78.0081,
    yieldHealth: 45,
    riskLevel: 'High',
    activePestAlert: true,
    pestType: 'Whitefly',
    futureLoanDemand: 82,
    totalFarmers: 2200,
    farmersSeekingLoan: 1804,
    avgLoanAmount: '₹75K',
    primaryCrop: 'Sugarcane',
    secondaryCrop: 'Wheat',
    yieldTrend: 'Down',
    portfolioHealth: 42,
    loanDefaultRate: 7.1,
  },

  // Rajasthan
  {
    id: 'rj-jpr',
    name: 'Jaipur',
    state: 'Rajasthan',
    district: 'Jaipur',
    latitude: 26.9124,
    longitude: 75.7873,
    yieldHealth: 62,
    riskLevel: 'Medium',
    activePestAlert: false,
    futureLoanDemand: 52,
    totalFarmers: 2000,
    farmersSeekingLoan: 1040,
    avgLoanAmount: '₹90K',
    primaryCrop: 'Mustard',
    secondaryCrop: 'Barley',
    yieldTrend: 'Stable',
    portfolioHealth: 66,
    loanDefaultRate: 4.2,
  },

  // Andhra Pradesh
  {
    id: 'ap-vzag',
    name: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    latitude: 17.6869,
    longitude: 83.2185,
    yieldHealth: 75,
    riskLevel: 'Low',
    activePestAlert: false,
    futureLoanDemand: 32,
    totalFarmers: 1600,
    farmersSeekingLoan: 512,
    avgLoanAmount: '₹1.25L',
    primaryCrop: 'Rice',
    secondaryCrop: 'Coconut',
    yieldTrend: 'Up',
    portfolioHealth: 80,
    loanDefaultRate: 2.3,
  },
];

// Government Schemes
export const GOV_SCHEMES: GovernmentScheme[] = [
  {
    id: 'gs1',
    name: 'KCC Interest Subvention Scheme',
    description: '2% subsidy applied to Kisan Credit Card digital transactions',
    applicableStates: ['Tamil Nadu', 'Karnataka', 'Andhra Pradesh', 'Telangana'],
    subsidy: '₹2,000 - ₹15,000/farmer',
    deadline: '2026-06-30',
    status: 'Active',
    eligibility: 'Small & Marginal Farmers with KCC',
    impact: 'Reduces effective interest rate by 2%',
  },
  {
    id: 'gs2',
    name: 'PM-Fasal Bima Yojana (PMFBY)',
    description: 'Crop insurance with premium assistance for farmers',
    applicableStates: ['All States'],
    subsidy: '₹500 - ₹1,500/hectare',
    deadline: '2026-05-15',
    status: 'Closing Soon',
    eligibility: 'All farmers with notified crops',
    impact: 'Insures up to 75% crop loss',
  },
  {
    id: 'gs3',
    name: 'Pradhan Mantri Kisan Samman Nidhi',
    description: 'Direct income support to farmer families',
    applicableStates: ['All States'],
    subsidy: '₹6,000/year (3 installments)',
    deadline: '2026--12-31',
    status: 'Active',
    eligibility: 'Landholding farmers up to 2 hectares',
    impact: 'Direct cash transfer to farmers',
  },
  {
    id: 'gs4',
    name: 'Drip Irrigation Subsidy Scheme',
    description: 'Assistance for micro-irrigation installation',
    applicableStates: ['Maharashtra', 'Karnataka', 'Rajasthan', 'Haryana'],
    subsidy: '₹40,000 - ₹1,20,000',
    deadline: '2026-07-31',
    status: 'Active',
    eligibility: 'Farmers with 0.5-2 hectares in notified areas',
    impact: 'Reduces water usage by 40-60%',
  },
  {
    id: 'gs5',
    name: 'Solar Pump Installation Scheme',
    description: 'Subsidized solar-powered agricultural pumps',
    applicableStates: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Rajasthan'],
    subsidy: '₹50,000 - ₹3,00,000',
    deadline: '2026-08-15',
    status: 'New',
    eligibility: 'Farmers planning to switch to solar irrigation',
    impact: 'Zero electricity cost for irrigation',
  },
  {
    id: 'gs6',
    name: 'Soil Health Card Scheme',
    description: 'Free soil testing and customized fertilizer recommendations',
    applicableStates: ['All States'],
    subsidy: 'Free (Government funded)',
    deadline: '2026-12-31',
    status: 'Active',
    eligibility: 'All farmers',
    impact: 'Improves yield by 20-30% through optimal fertilization',
  },
];

// Partner Portfolio Summary
export function getPortfolioSummary(): PartnerPortfolio {
  return {
    totalLent: 427500000, // 42.75 Cr
    totalReturned: 385200000, // 38.52 Cr
    outstandingDebt: 42300000, // 4.23 Cr
    avgInterestRate: 11.5,
    portfolioHealth: 'Stable',
    totalFarmers: 28850,
    activeLoans: 2847,
    defaultLoans: 187,
  };
}

// Farmer Loan Metrics by Region
export function getFarmerLoanMetrics(): FarmerLoanMetric[] {
  return ALL_INDIA_REGIONS.map(region => ({
    regionId: region.id,
    regionName: region.name,
    loanCount: Math.floor(region.totalFarmers * (region.avgLoanAmount.replace(/[^\d]/g, '') as any / 100000) / 100),
    totalAmount: region.farmersSeekingLoan * parseInt(region.avgLoanAmount.replace(/[^\d]/g, '')),
    defaultCount: Math.floor(Math.random() * 15),
    recoveryRate: 94 + Math.random() * 6,
  }));
}

// Shipment Routes (Logistics-Aware)
export function getShipmentRoutes(): ShipmentRoute[] {
  return [
    {
      id: 'sh1',
      origin: 'Coimbatore, TN',
      destination: 'Delhi Mandi',
      crop: 'Cotton',
      quantity: '2,400 quintals',
      distance: 2180,
      status: 'Delayed',
      riskFactors: ['Pest activity reported', 'Extended drought'],
      weather: 'Stormy',
      estimatedArrival: '2026-02-12',
    },
    {
      id: 'sh2',
      origin: 'Ludhiana, PB',
      destination: 'Mumbai Mandi',
      crop: 'Wheat',
      quantity: '3,200 quintals',
      distance: 1620,
      status: 'In Transit',
      riskFactors: [],
      weather: 'Clear',
      estimatedArrival: '2026-02-10',
    },
    {
      id: 'sh3',
      origin: 'Akola, MH',
      destination: 'Bangalore',
      crop: 'Soybean',
      quantity: '1,950 quintals',
      distance: 1080,
      status: 'Risk',
      riskFactors: ['Leaf roller infestation', 'Quality degradation'],
      weather: 'Rainy',
      estimatedArrival: '2026-02-13',
    },
    {
      id: 'sh4',
      origin: 'Belgaum, KA',
      destination: 'Chennai',
      crop: 'Sugarcane',
      quantity: '1,750 quintals',
      distance: 840,
      status: 'Completed',
      riskFactors: [],
      weather: 'Clear',
      estimatedArrival: '2026-02-09',
    },
  ];
}

// Cost vs Profit Analysis (Last 6 months)
export function getCostVsProfitData(): CostVsProfitData[] {
  return [
    { month: 'Sep 2025', loanCost: 485000, returns: 528000, netProfit: 43000, portfolioHealth: 68 },
    { month: 'Oct 2025', loanCost: 512000, returns: 598000, netProfit: 86000, portfolioHealth: 72 },
    { month: 'Nov 2025', loanCost: 498000, returns: 612000, netProfit: 114000, portfolioHealth: 76 },
    { month: 'Dec 2025', loanCost: 521000, returns: 645000, netProfit: 124000, portfolioHealth: 79 },
    { month: 'Jan 2026', loanCost: 538000, returns: 698000, netProfit: 160000, portfolioHealth: 84 },
    { month: 'Feb 2026', loanCost: 542000, returns: 728000, netProfit: 186000, portfolioHealth: 88 },
  ];
}

// Weather/Crop Health Indicator
export function getPortfolioWeatherIndicator(): {
  status: 'Excellent' | 'Stable' | 'Risky' | 'Critical';
  score: number;
  description: string;
} {
  const allRegions = ALL_INDIA_REGIONS;
  const avgHealth = allRegions.reduce((sum, r) => sum + r.yieldHealth, 0) / allRegions.length;
  const pestAlerts = allRegions.filter(r => r.activePestAlert).length;

  let status: 'Excellent' | 'Stable' | 'Risky' | 'Critical' = 'Stable';
  if (avgHealth > 80) status = 'Excellent';
  else if (avgHealth < 50 || pestAlerts > 3) status = 'Risky';
  else if (avgHealth < 40 && pestAlerts > 4) status = 'Critical';

  return {
    status,
    score: Math.round(avgHealth),
    description: `${pestAlerts} active pest alerts | Avg yield health: ${Math.round(avgHealth)}%`,
  };
}

// Credit Rating Calculation
export function calculateCreditRating(): {
  rating: 'AAA' | 'AA' | 'A' | 'BBB' | 'BB' | 'B';
  score: number;
  factors: string[];
} {
  const portfolio = getPortfolioSummary();
  const recoveryRate = ((portfolio.totalReturned / portfolio.totalLent) * 100);
  const defaultRate = (portfolio.defaultLoans / portfolio.activeLoans) * 100;

  let rating: 'AAA' | 'AA' | 'A' | 'BBB' | 'BB' | 'B' = 'BBB';
  if (recoveryRate > 96 && defaultRate < 1) rating = 'AAA';
  else if (recoveryRate > 94 && defaultRate < 2) rating = 'AA';
  else if (recoveryRate > 92 && defaultRate < 3) rating = 'A';
  else if (recoveryRate > 88 && defaultRate < 5) rating = 'BBB';
  else if (recoveryRate > 84) rating = 'BB';
  else rating = 'B';

  return {
    rating,
    score: Math.round(recoveryRate * 10) / 10,
    factors: [
      `Recovery Rate: ${Math.round(recoveryRate * 10) / 10}%`,
      `Default Rate: ${Math.round(defaultRate * 10) / 10}%`,
      `Portfolio Health: ${portfolio.portfolioHealth}`,
      `Active Loans: ${portfolio.activeLoans}`,
    ],
  };
}
