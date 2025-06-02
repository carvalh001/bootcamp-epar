import { CalculationResult } from '@/types/calculator-types';

export const normalizeCalculationResult = (raw: any): CalculationResult => {
  const growthRate = raw.growth_rate * 100;
  let growthCategory: CalculationResult['growthCategory'];

  if (growthRate <= 0) {
    growthCategory = 'Negativo';
  } else if (growthRate <= 5) {
    growthCategory = 'Frágil';
  } else if (growthRate <= 7) {
    growthCategory = 'Moderada';
  } else {
    growthCategory = 'Positiva';
  }

  return {
    portfolioValue: raw.portfolio_value,
    monthlyRevenue: raw.monthly_revenue,
    annualRevenue: raw.annual_revenue,
    potentialGrowth: raw.potential_growth,
    stabilityScore: raw.stability_score,
    growthRate: Math.round(growthRate), // Remove casas decimais
    averageContractDuration: raw.average_duration,
    stabilityCategory: 'Moderada', // (você pode adicionar lógica similar para este também, se quiser)
    growthCategory
  };
};
