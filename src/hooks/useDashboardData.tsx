
import { useState, useEffect, useMemo } from 'react';
import { CalculatorSubmission } from '@/types/calculator';
import { supabase } from '@/integrations/supabase/client';

export const useDashboardData = () => {
  const [submissions, setSubmissions] = useState<CalculatorSubmission[]>([]);
  const [filterState, setFilterState] = useState<string>("all");
  const [uniqueStates, setUniqueStates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const { data: submissionsData, error: submissionsError } = await supabase
          .from('calculator_submissions')
          .select(`
            *,
            contact_info:contact_info_id (
              name,
              email,
              phone,
              company,
              city,
              state
            )
          `);

        if (submissionsError) {
          console.error('Error fetching submissions:', submissionsError);
          return;
        }

        // Transform the data to match the CalculatorSubmission type
        const transformedSubmissions: CalculatorSubmission[] = submissionsData.map(submission => ({
          id: submission.id,
          timestamp: submission.timestamp,
          ipAddress: submission.ip_address,
          inputs: {
            numProperties: submission.num_properties,
            averageRent: submission.average_rent,
            occupancyRate: submission.occupancy_rate,
            defaultRate: submission.default_rate,
            averageCommission: submission.average_commission,
            averageContractDuration: submission.average_contract_duration,
            terminatedContractsPerMonth: submission.terminated_contracts_per_month,
            newContractsPerMonth: submission.new_contracts_per_month,
            contractsExpiring12Months: submission.contracts_expiring_12_months,
            contractsExpiring12To24Months: submission.contracts_expiring_12_to_24_months,
            contractsExpiring24To36Months: submission.contracts_expiring_24_to_36_months,
            contractsExpiringOver36Months: submission.contracts_expiring_over_36_months,
            expiredIndefiniteContracts: submission.expired_indefinite_contracts,
            predominantGuaranteeType: submission.predominant_guarantee_type,
            residentialPercentage: submission.residential_percentage,
            commercialPercentage: submission.commercial_percentage,
            contractLength: submission.contract_length,
            city: submission.city,
            state: submission.state,
            valorCriterio: submission.valor_criterio,
            estoqueAtual: submission.estoque_atual,
            contractType: submission.contract_type
          },
          results: submission.portfolio_value ? {
            portfolioValue: submission.portfolio_value,
            monthlyRevenue: submission.monthly_revenue,
            annualRevenue: submission.annual_revenue,
            potentialGrowth: submission.potential_growth,
            stabilityScore: submission.stability_score,
            growthRate: submission.growth_rate
          } : null,
          contactInfo: submission.contact_info ? {
            name: submission.contact_info.name,
            email: submission.contact_info.email,
            phone: submission.contact_info.phone,
            company: submission.contact_info.company,
            city: submission.contact_info.city,
            state: submission.contact_info.state
          } : undefined,
          isSubmitted: submission.is_submitted
        }));

        setSubmissions(transformedSubmissions);
        
        // Extract unique states
        const states = [...new Set(transformedSubmissions
          .map(sub => sub.inputs.state)
          .filter((state): state is string => Boolean(state)))];
        setUniqueStates(states.sort());
        
      } catch (error) {
        console.error('Error loading submissions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissions();
    
    // Set up realtime subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'calculator_submissions'
        },
        () => {
          fetchSubmissions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  
  const filteredSubmissions = useMemo(() => {
    if (filterState === "all") return submissions;
    
    return submissions.filter(sub => 
      sub.inputs.state && sub.inputs.state.toLowerCase() === filterState.toLowerCase()
    );
  }, [submissions, filterState]);
  
  // Calculate dashboard metrics
  const metrics = useMemo(() => {
    if (!filteredSubmissions.length) {
      return {
        totalQueries: 0,
        uniqueCities: 0,
        totalContracts: 0,
        averageTicket: 0,
        averageAdminFee: 0,
        averageDefaultRate: 0,
        residentialContracts: 0,
        commercialContracts: 0
      };
    }
    
    // Get unique cities
    const cities = new Set<string>();
    let totalContracts = 0;
    let totalValue = 0;
    let totalAdminFee = 0;
    let totalDefaultRate = 0;
    let residentialContracts = 0;
    let commercialContracts = 0;
    
    filteredSubmissions.forEach(sub => {
      if (sub.inputs.city) cities.add(sub.inputs.city);
      
      const numProperties = sub.inputs.numProperties || 0;
      totalContracts += numProperties;
      
      // Calculate values for averages
      totalValue += sub.inputs.averageRent || 0;
      totalAdminFee += sub.inputs.occupancyRate || 0;
      totalDefaultRate += sub.inputs.defaultRate || 0;
      
      // Calculate contract types
      if (sub.inputs.contractType === "Imóveis Residenciais") {
        residentialContracts += numProperties;
      } else if (sub.inputs.contractType === "Imóveis Comerciais") {
        commercialContracts += numProperties;
      }
    });
    
    // Calculate averages
    const count = filteredSubmissions.length;
    
    return {
      totalQueries: count,
      uniqueCities: cities.size,
      totalContracts,
      averageTicket: totalValue / count,
      averageAdminFee: totalAdminFee / count,
      averageDefaultRate: totalDefaultRate / count,
      residentialContracts,
      commercialContracts
    };
  }, [filteredSubmissions]);
  
  // Calculate queries by month
  const queriesByMonth = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const monthlyData = Array(12).fill(0);
    
    filteredSubmissions.forEach(sub => {
      if (sub.timestamp) {
        const date = new Date(sub.timestamp);
        if (date.getFullYear() === currentYear) {
          monthlyData[date.getMonth()]++;
        }
      }
    });
    
    return monthlyData;
  }, [filteredSubmissions]);
  
  // Group contracts by period
  const contractsByPeriod = useMemo(() => {
    let expired = 0;
    let upTo12 = 0;
    let from12To24 = 0;
    let from24To36 = 0;
    let above36 = 0;
    
    filteredSubmissions.forEach(sub => {
      const period = sub.inputs.contractLength || 0;
      const count = sub.inputs.numProperties || 0;
      
      if (period <= 0) expired += count;
      else if (period <= 12) upTo12 += count;
      else if (period <= 24) from12To24 += count;
      else if (period <= 36) from24To36 += count;
      else above36 += count;
    });
    
    return [
      { name: 'Vencidos', value: expired },
      { name: 'Até 12 meses', value: upTo12 },
      { name: 'De 12 a 24 meses', value: from12To24 },
      { name: 'De 24 a 36 meses', value: from24To36 },
      { name: 'Acima de 36 meses', value: above36 }
    ];
  }, [filteredSubmissions]);

  return {
    filterState,
    setFilterState,
    uniqueStates,
    filteredSubmissions,
    metrics,
    queriesByMonth,
    contractsByPeriod,
    isLoading
  };
};
