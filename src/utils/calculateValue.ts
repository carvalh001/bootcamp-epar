import { CalculatorInput, CalculationResult } from '@/types/calculator-types';
import { calculateGuaranteeFactor, guaranteeTypeOptions } from './calculator/guarantee-utils';
import { calculateContractTypeFactor, calculateContractStabilityFactor, calculateGrowthFactor } from './calculator/contract-utils';
import { formatCurrency } from './calculator/format-utils';
import { calculateValorizacaoFactor, calculatePotentialGrowth } from './calculator/valuation-utils';

export { guaranteeTypeOptions, formatCurrency };
export type { CalculatorInput, CalculationResult };

export const calculatePortfolioValue = (inputs: CalculatorInput): CalculationResult => {
  const adminFeePercentage = inputs.occupancyRate / 100;
  const payingContracts = inputs.numProperties * (1 - inputs.defaultRate / 100);
  const monthlyRevenue = payingContracts * inputs.averageRent * adminFeePercentage;
  
  const annualRevenue = monthlyRevenue * 12;
  const firstRentalCommissionMonthly = inputs.newContractsPerMonth * inputs.averageRent * (inputs.averageCommission / 100);
  const annualFirstRentalCommission = firstRentalCommissionMonthly * 12;
  const totalAnnualRevenue = annualRevenue + annualFirstRentalCommission;
  
  const contractStabilityFactor = calculateContractStabilityFactor(inputs);
  const growthFactor = calculateGrowthFactor(inputs);
  const guaranteeFactor = calculateGuaranteeFactor(inputs.predominantGuaranteeType);
  const contractTypeFactor = calculateContractTypeFactor(inputs);
  const valorizacaoFactor = calculateValorizacaoFactor(inputs);
  
  const baseMultiplier = 5;
  const adjustedMultiplier = baseMultiplier * contractStabilityFactor * growthFactor * 
                            guaranteeFactor * contractTypeFactor * valorizacaoFactor;
  const portfolioValue = totalAnnualRevenue * adjustedMultiplier;
  
  const potentialGrowth = calculatePotentialGrowth(inputs, totalAnnualRevenue);
  const stabilityScore = Math.round((contractStabilityFactor * 100) + (growthFactor * 20));
  const growthRate = Math.round(((inputs.newContractsPerMonth - inputs.terminatedContractsPerMonth) / inputs.numProperties) * 12 * 100);
  
  return {
    portfolioValue,
    monthlyRevenue,
    annualRevenue: totalAnnualRevenue,
    potentialGrowth,
    stabilityScore,
    growthRate
  };
};
