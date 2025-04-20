
import React, { useMemo } from 'react';
import { CalculatorSubmission } from '@/types/calculator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ContractsAnalysisProps {
  submissions: CalculatorSubmission[];
  isOpen: boolean;
  onClose: () => void;
}

const ContractsAnalysis = ({ submissions, isOpen, onClose }: ContractsAnalysisProps) => {
  // Group by year and month
  const contractsByYearMonth = useMemo(() => {
    const groupedData: Record<string, { month: string, count: number }[]> = {};
    
    submissions.forEach(sub => {
      if (!sub.timestamp) return;
      
      const date = new Date(sub.timestamp);
      const year = date.getFullYear();
      const month = date.getMonth();
      const yearKey = year.toString();
      const monthNames = [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
      ];
      
      if (!groupedData[yearKey]) {
        groupedData[yearKey] = Array(12).fill(0).map((_, i) => ({
          month: monthNames[i],
          count: 0
        }));
      }
      
      groupedData[yearKey][month].count += sub.inputs.numProperties || 0;
    });
    
    return groupedData;
  }, [submissions]);
  
  // Sort years in descending order
  const sortedYears = useMemo(() => {
    return Object.keys(contractsByYearMonth).sort((a, b) => parseInt(b) - parseInt(a));
  }, [contractsByYearMonth]);
  
  // Calculate total contracts
  const totalContracts = useMemo(() => {
    return submissions.reduce((total, sub) => total + (sub.inputs.numProperties || 0), 0);
  }, [submissions]);
  
  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Análise de Contratos</DialogTitle>
          <DialogDescription>
            Dados analíticos do volume total de contratos: {totalContracts} contratos
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6 space-y-8">
          {sortedYears.map(year => (
            <Card key={year}>
              <CardHeader>
                <CardTitle className="text-lg">Contratos em {year}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={contractsByYearMonth[year]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="Nº de Contratos" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContractsAnalysis;
