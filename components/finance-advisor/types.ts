export type InterestRate = {
  institution: string;
  ratePercent: number;
  loanType: string;
};

export type YieldRecord = {
  year: number;
  crop: string;
  yieldKgPerAcre: number;
};

export type DebtAccount = {
  id: string;
  type: 'BNPL' | 'KCC' | 'GOLD';
  balance: number;
};

export type Subsidy = {
  id: string;
  name: string;
  description: string;
  minLandSizeAcre: number;
  states: string[];
};
