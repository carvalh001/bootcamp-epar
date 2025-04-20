
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalculatorSubmission } from '@/types/calculator';
import AdminDashboard from './AdminDashboard';
import DashboardOverview from './dashboard/DashboardOverview';
import { supabase } from '@/integrations/supabase/client';

const AdminTabs = () => {
  const [submissions, setSubmissions] = useState<CalculatorSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const { data, error } = await supabase
          .from('calculator_submissions')
          .select(`
            *,
            contact_info:contact_info_id (*)
          `);
          
        if (error) {
          console.error('Error fetching submissions:', error);
          return;
        }
        
        // Transformar os dados do formato Supabase para o formato esperado pelo componente
        const formattedSubmissions: CalculatorSubmission[] = data.map(item => ({
          id: item.id,
          timestamp: item.timestamp,
          ipAddress: item.ip_address,
          inputs: {
            numProperties: item.num_properties,
            averageRent: item.average_rent,
            occupancyRate: item.occupancy_rate,
            defaultRate: item.default_rate,
            averageCommission: item.average_commission,
            averageContractDuration: item.average_contract_duration,
            terminatedContractsPerMonth: item.terminated_contracts_per_month,
            newContractsPerMonth: item.new_contracts_per_month,
            contractsExpiring12Months: item.contracts_expiring_12_months,
            contractsExpiring12To24Months: item.contracts_expiring_12_to_24_months,
            contractsExpiring24To36Months: item.contracts_expiring_24_to_36_months,
            contractsExpiringOver36Months: item.contracts_expiring_over_36_months,
            expiredIndefiniteContracts: item.expired_indefinite_contracts,
            predominantGuaranteeType: item.predominant_guarantee_type,
            residentialPercentage: item.residential_percentage || 0,
            commercialPercentage: item.commercial_percentage || 0,
            contractLength: item.contract_length || 0,
            city: item.city || '',
            state: item.state || '',
            valorCriterio: item.valor_criterio || 0,
            estoqueAtual: item.estoque_atual || 0,
            contractType: item.contract_type || ''
          },
          results: item.portfolio_value ? {
            portfolioValue: item.portfolio_value,
            monthlyRevenue: item.monthly_revenue,
            annualRevenue: item.annual_revenue,
            potentialGrowth: item.potential_growth,
            stabilityScore: item.stability_score,
            growthRate: item.growth_rate
          } : null,
          contactInfo: item.contact_info ? {
            name: item.contact_info.name,
            email: item.contact_info.email,
            phone: item.contact_info.phone,
            company: item.contact_info.company,
            city: item.contact_info.city,
            state: item.contact_info.state
          } : undefined,
          isSubmitted: item.is_submitted
        }));
        
        setSubmissions(formattedSubmissions);
      } catch (error) {
        console.error('Error processing submissions:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSubmissions();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-realestate-primary"></div>
      </div>
    );
  }
  
  return (
    <Tabs defaultValue="dashboard" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="submissions">Submissões</TabsTrigger>
      </TabsList>
      
      <TabsContent value="dashboard">
        <DashboardOverview submissions={submissions} />
      </TabsContent>
      
      <TabsContent value="submissions">
        <AdminDashboard submissions={submissions} />
      </TabsContent>
    </Tabs>
  );
};

export default AdminTabs;
