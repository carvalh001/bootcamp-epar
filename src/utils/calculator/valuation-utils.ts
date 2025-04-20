
import { CalculatorInput } from '@/types/calculator-types';

export const calculateValorizacaoFactor = (inputs: CalculatorInput): number => {
  if (!inputs.valorCriterio || inputs.valorCriterio <= 0) {
    return 1.0;
  }
  
  const criterioNormalizado = Math.min(10, Math.max(1, inputs.valorCriterio)) / 10;
  return 0.8 + (criterioNormalizado * 0.7);
};

export const calculatePotentialGrowth = (inputs: CalculatorInput, currentAnnualRevenue: number): number => {
  const potentialOccupancy = Math.min(98, inputs.occupancyRate + 5);
  const potentialDefaultRate = Math.max(2, inputs.defaultRate - 2);
  const potentialCommission = Math.min(15, inputs.averageCommission + 1);
  
  const occupiedProperties = inputs.numProperties * (potentialOccupancy / 100);
  const paidContracts = occupiedProperties * (1 - potentialDefaultRate / 100);
  const potentialMonthlyRevenue = paidContracts * inputs.averageRent * (potentialCommission / 100);
  const potentialAnnualRevenue = potentialMonthlyRevenue * 12;
  
  return potentialAnnualRevenue - currentAnnualRevenue;
};
