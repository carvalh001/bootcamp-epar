
import { CalculatorSubmission } from '@/types/calculator';
import { CalculatorInput, CalculationResult } from '@/utils/calculateValue';
import { supabase } from '@/integrations/supabase/client';

export const saveCalculatorSubmission = async (
  sessionId: string,
  inputs: CalculatorInput,
  results: CalculationResult | null,
  ipAddress: string,
  isSubmitted: boolean = false
) => {
  try {
    const submission: CalculatorSubmission = {
      id: sessionId,
      timestamp: new Date().toISOString(),
      ipAddress,
      inputs: { ...inputs },
      results,
      isSubmitted
    };

    // Se houver informações de contato, salve primeiro
    if (submission.contactInfo) {
      const { data: contactData, error: contactError } = await supabase
        .from('contact_info')
        .insert({
          name: submission.contactInfo.name,
          email: submission.contactInfo.email,
          phone: submission.contactInfo.phone,
          company: submission.contactInfo.company,
          city: submission.contactInfo.city,
          state: submission.contactInfo.state
        })
        .select()
        .single();

      if (contactError) {
        console.error('Error saving contact info:', contactError);
        return;
      }

      // Insira a submissão da calculadora com a referência do contato
      const { error: submissionError } = await supabase
        .from('calculator_submissions')
        .insert({
          id: submission.id,
          timestamp: submission.timestamp,
          ip_address: submission.ipAddress,
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
          contract_length: inputs.contractLength,
          city: inputs.city,
          state: inputs.state,
          valor_criterio: inputs.valorCriterio,
          estoque_atual: inputs.estoqueAtual,
          contract_type: inputs.contractType,
          portfolio_value: results?.portfolioValue,
          monthly_revenue: results?.monthlyRevenue,
          annual_revenue: results?.annualRevenue,
          potential_growth: results?.potentialGrowth,
          stability_score: results?.stabilityScore,
          growth_rate: results?.growthRate,
          contact_info_id: contactData?.id,
          is_submitted: isSubmitted
        });

      if (submissionError) {
        console.error('Error saving calculator submission:', submissionError);
      }
    } else {
      // Se não houver informações de contato, salve apenas a submissão
      const { error: submissionError } = await supabase
        .from('calculator_submissions')
        .insert({
          id: submission.id,
          timestamp: submission.timestamp,
          ip_address: submission.ipAddress,
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
          contract_length: inputs.contractLength,
          city: inputs.city,
          state: inputs.state,
          valor_criterio: inputs.valorCriterio,
          estoque_atual: inputs.estoqueAtual,
          contract_type: inputs.contractType,
          portfolio_value: results?.portfolioValue,
          monthly_revenue: results?.monthlyRevenue,
          annual_revenue: results?.annualRevenue,
          potential_growth: results?.potentialGrowth,
          stability_score: results?.stabilityScore,
          growth_rate: results?.growthRate,
          is_submitted: isSubmitted
        });

      if (submissionError) {
        console.error('Error saving calculator submission:', submissionError);
      }
    }
  } catch (error) {
    console.error('Error saving calculator submission:', error);
  }
};

