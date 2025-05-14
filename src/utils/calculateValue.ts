import { CalculatorInput, CalculationResult } from '@/types/calculator-types';
import { calculateGuaranteeFactor, guaranteeTypeOptions } from './calculator/guarantee-utils';
import { calculateContractTypeFactor, calculateContractStabilityFactor, calculateGrowthFactor } from './calculator/contract-utils';
import { formatCurrency } from './calculator/format-utils';
import { calculateValorizacaoFactor, calculatePotentialGrowth } from './calculator/valuation-utils';

// **** Novas funções de regra de negócio ****
/**
 * Classifica a estabilidade da carteira em 'Frágil' ou 'Moderada'
 */
const calculateStabilityCategory = (inputs: CalculatorInput): 'Frágil' | 'Moderada' => {
  const shortTerm =
    inputs.contractsExpiring12Months + inputs.expiredIndefiniteContracts;
  const longTerm =
    inputs.contractsExpiring12To24Months +
    inputs.contractsExpiring24To36Months +
    inputs.contractsExpiringOver36Months;
  return shortTerm > longTerm ? 'Frágil' : 'Moderada';
};

/**
 * Calcula a duração média dos contratos (em meses)
 */
const calculateAverageContractDuration = (inputs: CalculatorInput): number => {
  const totalContracts =
    inputs.contractsExpiring12Months +
    inputs.contractsExpiring12To24Months +
    inputs.contractsExpiring24To36Months +
    inputs.contractsExpiringOver36Months +
    inputs.expiredIndefiniteContracts;
  if (totalContracts === 0) return 0;
  const weightedSum =
    inputs.contractsExpiring12Months * 6 +
    inputs.contractsExpiring12To24Months * 18 +
    inputs.contractsExpiring24To36Months * 30 +
    inputs.contractsExpiringOver36Months * 48 +
    inputs.expiredIndefiniteContracts * 12;
  return weightedSum / totalContracts;
};

/**
 * Classifica a taxa de crescimento em categorias qualitativas
 */
const classifyGrowthCategory = (
  rate: number
): 'Negativo' | 'Frágil' | 'Moderada' | 'Positiva' => {
  if (rate < 0) return 'Negativo';
  if (rate <= 5) return 'Frágil';
  if (rate <= 7) return 'Moderada';
  return 'Positiva';
};

export { guaranteeTypeOptions, formatCurrency };
export type { CalculatorInput, CalculationResult };

/**
 * Calcula todas as métricas da carteira
 */
export const calculatePortfolioValue = (
  inputs: CalculatorInput
): CalculationResult => {
  // Receita bruta mensal
  const grossMonthlyRevenue =
    inputs.numProperties * inputs.averageRent * (inputs.occupancyRate / 100);
  // Receita líquida após inadimplência
  const monthlyRevenue =
    grossMonthlyRevenue * (1 - inputs.defaultRate / 100);

  // Receita anual
  const annualRevenue = monthlyRevenue * 12;

  // Comissão de primeira locação anual
  const firstRentalCommissionMonthly =
    inputs.newContractsPerMonth *
    inputs.averageRent *
    (inputs.averageCommission / 100);
  const annualFirstRentalCommission = firstRentalCommissionMonthly * 12;
  const totalAnnualRevenue = annualRevenue + annualFirstRentalCommission;

  // Fatores de multiplicação já existentes
  const contractStabilityFactor =
    calculateContractStabilityFactor(inputs);
  const growthFactor = calculateGrowthFactor(inputs);
  const guaranteeFactor =
    calculateGuaranteeFactor(inputs.predominantGuaranteeType);
  const contractTypeFactor = calculateContractTypeFactor(inputs);
  const valorizacaoFactor = calculateValorizacaoFactor(inputs);

  const baseMultiplier = 5;
  const adjustedMultiplier =
    baseMultiplier *
    contractStabilityFactor *
    growthFactor *
    guaranteeFactor *
    contractTypeFactor *
    valorizacaoFactor;

  const portfolioValue = totalAnnualRevenue * adjustedMultiplier;

  // Taxa de crescimento anual em percentual
  const growthRate = Math.round(
    ((inputs.newContractsPerMonth - inputs.terminatedContractsPerMonth) /
      inputs.numProperties) *
      12 *
      100
  );

  // Score de estabilidade (mantido)
  const stabilityScore = Math.round(
    contractStabilityFactor * 100 + growthFactor * 20
  );

  // Novas regras de negócio qualitativas
  const stabilityCategory = calculateStabilityCategory(inputs);
  const averageContractDuration = calculateAverageContractDuration(inputs);
  const growthCategory = classifyGrowthCategory(growthRate);

  // Potencial de crescimento quantitativo
  const potentialGrowth = calculatePotentialGrowth(
    inputs,
    totalAnnualRevenue
  );

  return {
    portfolioValue,
    monthlyRevenue,
    annualRevenue: totalAnnualRevenue,
    potentialGrowth,
    stabilityScore,
    growthRate,
    stabilityCategory,
    averageContractDuration,
    growthCategory,
  };
};
