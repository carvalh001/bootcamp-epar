
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ContractsByPeriodChart from './ContractsByPeriodChart';

interface DashboardChartsProps {
  queriesByMonth: number[];
  contractsByPeriod: Array<{ name: string; value: number }>;
}

const DashboardCharts = ({ queriesByMonth, contractsByPeriod }: DashboardChartsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Consultas por Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <div className="flex h-64 items-end space-x-2">
              {queriesByMonth.map((count, index) => (
                <div key={index} className="relative flex-1 group">
                  <div 
                    className="absolute inset-x-0 bottom-0 bg-blue-500 rounded-t"
                    style={{ 
                      height: `${Math.max(4, (count / Math.max(...queriesByMonth, 1)) * 100)}%`,
                      minHeight: count > 0 ? '4px' : '0'
                    }}
                  ></div>
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1">
                    {count}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'].map(month => (
                <span key={month}>{month}</span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Contratos por Período</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ContractsByPeriodChart data={contractsByPeriod} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;
