// src/utils/calculatorStorage.ts

import { CalculatorInput, CalculationResult } from '@/utils/calculateValue'

export const saveCalculatorSubmission = async (
  sessionId: string,
  inputs: CalculatorInput,
  results: CalculationResult | null,
  ipAddress: string,
  isSubmitted: boolean = false
): Promise<{ id: string; results: CalculationResult | null }> => {
  try {
    const payload = {
      id: sessionId,
      timestamp: new Date().toISOString(),
      ip_address: ipAddress,
      num_properties: inputs.numProperties,
      average_rent: inputs.averageRent,
      occupancy_rate: inputs.occupancyRate,
      default_rate: inputs.defaultRate,
      average_commission: inputs.averageCommission,
      average_contract_duration: inputs.averageContractDuration,
      terminated_contracts_per_month: inputs.terminatedContractsPerMonth,
      new_contracts_per_month: inputs.newContractsPerMonth,
      contracts_expiring_12_months: inputs.contractsExpiring12Months,
      contracts_expiring_12_to_24_months: inputs.contractsExpiring12To24Months,
      contracts_expiring_24_to_36_months: inputs.contractsExpiring24To36Months,
      contracts_expiring_over_36_months: inputs.contractsExpiringOver36Months,
      expired_indefinite_contracts: inputs.expiredIndefiniteContracts,
      predominant_guarantee_type: inputs.predominantGuaranteeType,
      residential_percentage: inputs.residentialPercentage,
      commercial_percentage: inputs.commercialPercentage,
      city: inputs.city,
      state: inputs.state,
      valor_criterio: inputs.valorCriterio,
      estoque_atual: inputs.estoqueAtual,
      portfolio_value: results?.portfolioValue ?? 0,
      monthly_revenue: results?.monthlyRevenue ?? 0,
      annual_revenue: results?.annualRevenue ?? 0,
      potential_growth: results?.potentialGrowth ?? 0,
      stability_score: results?.stabilityScore ?? 0,
      growth_rate: results?.growthRate ?? 0,
      is_submitted: isSubmitted
    }

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

    const response = await fetch(`${API_BASE_URL}/submissions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      console.error('Erro ao enviar submissão:', response.statusText)
      return { id: sessionId, results: null }
    }

    const data = await response.json()
    return { id: sessionId, results: data }
  } catch (error) {
    console.error('Erro no envio da submissão:', error)
    return { id: sessionId, results: null }
  }
}
