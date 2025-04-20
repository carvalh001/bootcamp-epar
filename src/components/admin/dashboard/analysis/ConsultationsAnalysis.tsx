
import React, { useMemo } from 'react';
import { CalculatorSubmission } from '@/types/calculator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface ConsultationsAnalysisProps {
  submissions: CalculatorSubmission[];
  isOpen: boolean;
  onClose: () => void;
}

const ConsultationsAnalysis = ({ submissions, isOpen, onClose }: ConsultationsAnalysisProps) => {
  // Group by year and month
  const consultationsByYearMonth = useMemo(() => {
    const groupedData: Record<string, Record<string, number>> = {};
    
    submissions.forEach(sub => {
      if (!sub.timestamp) return;
      
      const date = new Date(sub.timestamp);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      
      if (!groupedData[year]) {
        groupedData[year] = {};
      }
      
      const monthKey = month < 10 ? `0${month}` : `${month}`;
      if (!groupedData[year][monthKey]) {
        groupedData[year][monthKey] = 0;
      }
      
      groupedData[year][monthKey]++;
    });
    
    return groupedData;
  }, [submissions]);
  
  // Group by day for current month/year
  const consultationsByDay = useMemo(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    
    const dailyData: Record<number, number> = {};
    
    submissions.forEach(sub => {
      if (!sub.timestamp) return;
      
      const date = new Date(sub.timestamp);
      if (date.getFullYear() === currentYear && date.getMonth() === currentMonth) {
        const day = date.getDate();
        if (!dailyData[day]) {
          dailyData[day] = 0;
        }
        dailyData[day]++;
      }
    });
    
    return dailyData;
  }, [submissions]);
  
  // Sort years in descending order
  const sortedYears = useMemo(() => {
    return Object.keys(consultationsByYearMonth).sort((a, b) => parseInt(b) - parseInt(a));
  }, [consultationsByYearMonth]);
  
  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Análise de Consultas</DialogTitle>
          <DialogDescription>
            Dados analíticos de todas as consultas realizadas por período
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6 space-y-8">
          {/* Current Month Daily Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Consultas Diárias - Mês Atual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <div 
                    key={day} 
                    className={`p-2 rounded text-center ${
                      consultationsByDay[day] 
                        ? 'bg-realestate-primary/20 text-realestate-primary font-medium' 
                        : 'bg-gray-100'
                    }`}
                  >
                    <div className="text-xs">{day}</div>
                    {consultationsByDay[day] && (
                      <div className="text-sm font-bold mt-1">{consultationsByDay[day]}</div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Yearly and Monthly Analysis */}
          {sortedYears.map(year => (
            <Card key={year}>
              <CardHeader>
                <CardTitle className="text-lg">Consultas em {year}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                  {Array.from({ length: 12 }, (_, i) => {
                    const monthNum = i + 1;
                    const monthKey = monthNum < 10 ? `0${monthNum}` : `${monthNum}`;
                    const count = consultationsByYearMonth[year][monthKey] || 0;
                    const monthNames = [
                      'Janeiro', 'Fevereiro', 'Março', 'Abril', 
                      'Maio', 'Junho', 'Julho', 'Agosto', 
                      'Setembro', 'Outubro', 'Novembro', 'Dezembro'
                    ];
                    
                    return (
                      <div 
                        key={monthKey} 
                        className={`p-4 rounded text-center ${
                          count > 0 
                            ? 'bg-realestate-primary/20 text-realestate-primary font-medium' 
                            : 'bg-gray-100'
                        }`}
                      >
                        <div className="text-sm">{monthNames[i]}</div>
                        <div className="text-lg font-bold mt-1">{count}</div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationsAnalysis;
