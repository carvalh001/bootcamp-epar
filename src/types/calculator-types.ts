export interface CalculatorInput {
  numProperties: number;
  averageRent: number;
  occupancyRate: number;
  defaultRate: number;
  averageCommission: number;
  averageContractDuration: number;
  terminatedContractsPerMonth: number;
  newContractsPerMonth: number;
  contractsExpiring12Months: number;
  contractsExpiring12To24Months: number;
  contractsExpiring24To36Months: number;
  contractsExpiringOver36Months: number;
  expiredIndefiniteContracts: number;
  predominantGuaranteeType: string;
  residentialPercentage?: number;
  commercialPercentage?: number;
  contractLength?: number;
  city: string;
  state: string;
  valorCriterio?: number;
  estoqueAtual: number;
  contractType?: string;
}

export interface CalculationResult {
  portfolioValue: number;
  monthlyRevenue: number;
  annualRevenue: number;
  potentialGrowth: number;
  stabilityScore: number;
  growthRate: number;
  stabilityCategory: 'Frágil' | 'Moderada';
  averageContractDuration: number;
  growthCategory: 'Negativo' | 'Frágil' | 'Moderada' | 'Positiva';
}