
import { CalculatorInput } from '@/types/calculator-types';

export const calculateContractTypeFactor = (inputs: CalculatorInput): number => {
  const residentialPct = inputs.residentialPercentage || 50;
  const commercialPct = inputs.commercialPercentage || 50;
  
  const residentialFactor = 0.9;
  const commercialFactor = 1.2;
  
  return (residentialPct / 100 * residentialFactor) + (commercialPct / 100 * commercialFactor);
};

export const calculateContractStabilityFactor = (inputs: CalculatorInput): number => {
  const shortTermWeight = 0.7;
  const mediumTermWeight = 1.0;
  const longTermWeight = 1.3;
  const indefiniteWeight = 1.1;
  
  const totalContracts = inputs.numProperties;
  
  if (totalContracts === 0) return 1.0;
  
  const shortTermPct = inputs.contractsExpiring12Months / totalContracts;
  const mediumTermPct = (inputs.contractsExpiring12To24Months + inputs.contractsExpiring24To36Months) / totalContracts;
  const longTermPct = inputs.contractsExpiringOver36Months / totalContracts;
  const indefinitePct = inputs.expiredIndefiniteContracts / totalContracts;
  
  const stabilityFactor = (
    (shortTermPct * shortTermWeight) +
    (mediumTermPct * mediumTermWeight) +
    (longTermPct * longTermWeight) +
    (indefinitePct * indefiniteWeight)
  );
  
  const occupancyFactor = inputs.occupancyRate / 90;
  const defaultFactor = 1 - (inputs.defaultRate / 10);
  
  return stabilityFactor * occupancyFactor * defaultFactor;
};

export const calculateGrowthFactor = (inputs: CalculatorInput): number => {
  const netMonthlyGrowth = inputs.newContractsPerMonth - inputs.terminatedContractsPerMonth;
  const monthlyGrowthPct = (netMonthlyGrowth / inputs.numProperties);
  return 1.0 + (monthlyGrowthPct * 5);
};
