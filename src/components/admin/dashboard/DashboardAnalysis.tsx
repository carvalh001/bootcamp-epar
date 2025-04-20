
import React from 'react';
import { CalculatorSubmission } from '@/types/calculator';
import ConsultationsAnalysis from './analysis/ConsultationsAnalysis';
import CitiesAnalysis from './analysis/CitiesAnalysis';
import ContractsAnalysis from './analysis/ContractsAnalysis';
import TicketAnalysis from './analysis/TicketAnalysis';
import AdminFeeAnalysis from './analysis/AdminFeeAnalysis';
import DefaultRateAnalysis from './analysis/DefaultRateAnalysis';

interface DashboardAnalysisProps {
  submissions: CalculatorSubmission[];
  dialogState: {
    consultations: boolean;
    cities: boolean;
    contracts: boolean;
    ticket: boolean;
    adminFee: boolean;
    defaultRate: boolean;
  };
  onCloseDialogs: {
    consultations: () => void;
    cities: () => void;
    contracts: () => void;
    ticket: () => void;
    adminFee: () => void;
    defaultRate: () => void;
  };
}

const DashboardAnalysis = ({ 
  submissions, 
  dialogState, 
  onCloseDialogs 
}: DashboardAnalysisProps) => {
  return (
    <>
      <ConsultationsAnalysis 
        submissions={submissions}
        isOpen={dialogState.consultations}
        onClose={onCloseDialogs.consultations}
      />
      
      <CitiesAnalysis 
        submissions={submissions}
        isOpen={dialogState.cities}
        onClose={onCloseDialogs.cities}
      />
      
      <ContractsAnalysis 
        submissions={submissions}
        isOpen={dialogState.contracts}
        onClose={onCloseDialogs.contracts}
      />
      
      <TicketAnalysis 
        submissions={submissions}
        isOpen={dialogState.ticket}
        onClose={onCloseDialogs.ticket}
      />
      
      <AdminFeeAnalysis 
        submissions={submissions}
        isOpen={dialogState.adminFee}
        onClose={onCloseDialogs.adminFee}
      />
      
      <DefaultRateAnalysis 
        submissions={submissions}
        isOpen={dialogState.defaultRate}
        onClose={onCloseDialogs.defaultRate}
      />
    </>
  );
};

export default DashboardAnalysis;
