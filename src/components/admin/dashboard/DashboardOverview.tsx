
import React, { useState } from 'react';
import { useDashboardData } from '@/hooks/useDashboardData';
import DashboardFilter from './DashboardFilter';
import DashboardStats from './DashboardStats';
import DashboardCharts from './DashboardCharts';
import DashboardAnalysis from './DashboardAnalysis';

const DashboardOverview = () => {
  // Dialog state for detailed analysis
  const [consultationsDialogOpen, setConsultationsDialogOpen] = useState(false);
  const [citiesDialogOpen, setCitiesDialogOpen] = useState(false);
  const [contractsDialogOpen, setContractsDialogOpen] = useState(false);
  const [ticketDialogOpen, setTicketDialogOpen] = useState(false);
  const [adminFeeDialogOpen, setAdminFeeDialogOpen] = useState(false);
  const [defaultRateDialogOpen, setDefaultRateDialogOpen] = useState(false);
  
  const {
    filterState,
    setFilterState,
    uniqueStates,
    filteredSubmissions,
    metrics,
    queriesByMonth,
    contractsByPeriod,
    isLoading
  } = useDashboardData();
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-realestate-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <DashboardFilter 
        filterState={filterState}
        uniqueStates={uniqueStates}
        onFilterChange={setFilterState}
      />
      
      <DashboardStats 
        metrics={metrics}
        queriesByMonth={queriesByMonth}
        onOpenConsultations={() => setConsultationsDialogOpen(true)}
        onOpenCities={() => setCitiesDialogOpen(true)}
        onOpenContracts={() => setContractsDialogOpen(true)}
        onOpenTicket={() => setTicketDialogOpen(true)}
        onOpenAdminFee={() => setAdminFeeDialogOpen(true)}
        onOpenDefaultRate={() => setDefaultRateDialogOpen(true)}
      />
      
      <DashboardCharts 
        queriesByMonth={queriesByMonth}
        contractsByPeriod={contractsByPeriod}
      />
      
      <DashboardAnalysis 
        submissions={filteredSubmissions}
        dialogState={{
          consultations: consultationsDialogOpen,
          cities: citiesDialogOpen,
          contracts: contractsDialogOpen,
          ticket: ticketDialogOpen,
          adminFee: adminFeeDialogOpen,
          defaultRate: defaultRateDialogOpen
        }}
        onCloseDialogs={{
          consultations: () => setConsultationsDialogOpen(false),
          cities: () => setCitiesDialogOpen(false),
          contracts: () => setContractsDialogOpen(false),
          ticket: () => setTicketDialogOpen(false),
          adminFee: () => setAdminFeeDialogOpen(false),
          defaultRate: () => setDefaultRateDialogOpen(false)
        }}
      />
    </div>
  );
};

export default DashboardOverview;
