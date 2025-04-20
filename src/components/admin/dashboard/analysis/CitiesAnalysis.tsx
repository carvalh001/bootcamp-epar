
import React, { useMemo } from 'react';
import { CalculatorSubmission } from '@/types/calculator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

interface CitiesAnalysisProps {
  submissions: CalculatorSubmission[];
  isOpen: boolean;
  onClose: () => void;
}

const CitiesAnalysis = ({ submissions, isOpen, onClose }: CitiesAnalysisProps) => {
  // Group by city
  const citiesData = useMemo(() => {
    const cityMap: Record<string, {
      city: string,
      state: string,
      count: number,
      countByMonth: Record<string, number>
    }> = {};
    
    submissions.forEach(sub => {
      if (!sub.inputs.city || !sub.inputs.state) return;
      
      const cityKey = `${sub.inputs.city}-${sub.inputs.state}`;
      
      if (!cityMap[cityKey]) {
        cityMap[cityKey] = {
          city: sub.inputs.city,
          state: sub.inputs.state,
          count: 0,
          countByMonth: {}
        };
      }
      
      cityMap[cityKey].count++;
      
      // Add month data
      if (sub.timestamp) {
        const date = new Date(sub.timestamp);
        const yearMonth = `${date.getFullYear()}-${date.getMonth() + 1}`;
        
        if (!cityMap[cityKey].countByMonth[yearMonth]) {
          cityMap[cityKey].countByMonth[yearMonth] = 0;
        }
        
        cityMap[cityKey].countByMonth[yearMonth]++;
      }
    });
    
    return Object.values(cityMap).sort((a, b) => b.count - a.count);
  }, [submissions]);
  
  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Análise de Cidades</DialogTitle>
          <DialogDescription>
            Dados analíticos de todas as cidades consultadas
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total de Consultas por Cidade</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cidade</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Consultas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {citiesData.map((cityData, index) => (
                    <TableRow key={index}>
                      <TableCell>{cityData.city}</TableCell>
                      <TableCell>{cityData.state}</TableCell>
                      <TableCell className="text-right font-medium">{cityData.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {citiesData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Evolução Mensal das Top 5 Cidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {citiesData.slice(0, 5).map((cityData, index) => {
                    const monthsData = Object.entries(cityData.countByMonth)
                      .sort((a, b) => a[0].localeCompare(b[0]));
                    
                    return (
                      <div key={index} className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">{cityData.city}/{cityData.state}</h4>
                        <div className="flex space-x-2 overflow-x-auto pb-2">
                          {monthsData.map(([yearMonth, count]) => {
                            const [year, month] = yearMonth.split('-');
                            const monthNames = [
                              'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                              'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
                            ];
                            
                            return (
                              <div 
                                key={yearMonth} 
                                className="flex-shrink-0 w-16 bg-realestate-primary/10 rounded p-2 text-center"
                              >
                                <div className="text-xs text-gray-500">{monthNames[parseInt(month) - 1]}/{year}</div>
                                <div className="font-bold text-realestate-primary">{count}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CitiesAnalysis;
