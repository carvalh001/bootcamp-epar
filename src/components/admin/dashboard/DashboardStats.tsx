
import React from 'react';
import { Calendar, MapPin, FileText, Receipt, BarChart, Percent, Home, Briefcase } from 'lucide-react';
import StatCard from './StatCard';
import { formatCurrency } from '@/utils/formatUtils';

interface DashboardStatsProps {
  metrics: {
    totalQueries: number;
    uniqueCities: number;
    totalContracts: number;
    averageTicket: number;
    averageAdminFee: number;
    averageDefaultRate: number;
    residentialContracts: number;
    commercialContracts: number;
  };
  queriesByMonth: number[];
  onOpenConsultations: () => void;
  onOpenCities: () => void;
  onOpenContracts: () => void;
  onOpenTicket: () => void;
  onOpenAdminFee: () => void;
  onOpenDefaultRate: () => void;
}

const DashboardStats = ({
  metrics,
  queriesByMonth,
  onOpenConsultations,
  onOpenCities,
  onOpenContracts,
  onOpenTicket,
  onOpenAdminFee,
  onOpenDefaultRate
}: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <StatCard 
        title="Consultas Totais" 
        value={metrics.totalQueries} 
        icon={<Calendar className="h-5 w-5 text-blue-600" />}
        description={`${queriesByMonth[new Date().getMonth()]} neste mês`}
        actionLabel="Gerar Relatório"
        onAction={onOpenConsultations}
      />
      
      <StatCard 
        title="Cidades Consultadas" 
        value={metrics.uniqueCities} 
        icon={<MapPin className="h-5 w-5 text-green-600" />}
        actionLabel="Ver Detalhes"
        onAction={onOpenCities}
      />
      
      <StatCard 
        title="Total de Contratos" 
        value={metrics.totalContracts} 
        icon={<FileText className="h-5 w-5 text-purple-600" />}
        actionLabel="Ver Contratos"
        onAction={onOpenContracts}
      />
      
      <StatCard 
        title="Ticket Médio" 
        value={formatCurrency(metrics.averageTicket)}
        icon={<Receipt className="h-5 w-5 text-amber-600" />}
        actionLabel="Analisar Valores"
        onAction={onOpenTicket}
      />
      
      <StatCard 
        title="Taxa Administração Média" 
        value={metrics.averageAdminFee.toFixed(2)} 
        suffix="%"
        icon={<BarChart className="h-5 w-5 text-indigo-600" />}
        actionLabel="Comparar Taxas"
        onAction={onOpenAdminFee}
      />
      
      <StatCard 
        title="Inadimplência Média" 
        value={metrics.averageDefaultRate.toFixed(2)} 
        suffix="%"
        icon={<Percent className="h-5 w-5 text-red-600" />}
        actionLabel="Analisar Inadimplência"
        onAction={onOpenDefaultRate}
      />
      
      <StatCard 
        title="Contratos Residenciais" 
        value={metrics.residentialContracts} 
        icon={<Home className="h-5 w-5 text-emerald-600" />}
      />
      
      <StatCard 
        title="Contratos Comerciais" 
        value={metrics.commercialContracts} 
        icon={<Briefcase className="h-5 w-5 text-orange-600" />}
      />
    </div>
  );
};

export default DashboardStats;
