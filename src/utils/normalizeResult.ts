// src/utils/normalizeResult.ts

import { CalculationResult } from '@/types/calculator-types'

export const normalizeCalculationResult = (raw: any): CalculationResult => {
  return {
    portfolioValue: raw.portfolio_value,
    monthlyRevenue: raw.monthly_revenue,
    annualRevenue: raw.annual_revenue,
    potentialGrowth: raw.potential_growth,
    stabilityScore: raw.stability_score,
    growthRate: raw.growth_rate,
    averageContractDuration: raw.average_duration,
    stabilityCategory: 'Moderada',
    growthCategory: 'Positiva'
  }
}
