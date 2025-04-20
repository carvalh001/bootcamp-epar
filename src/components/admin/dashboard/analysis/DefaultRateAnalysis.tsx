
import React, { useMemo } from 'react';
import { CalculatorSubmission } from '@/types/calculator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DefaultRateAnalysisProps {
  submissions: CalculatorSubmission[];
  isOpen: boolean;
  onClose: () => void;
}

const DefaultRateAnalysis = ({ submissions, isOpen, onClose }: DefaultRateAnalysisProps) => {
  // Calculate average default rate by month
  const rateByMonth = useMemo(() => {
    const monthlyData: Record<string, { totalRate: number, count: number }> = {};
    
    submissions.forEach(sub => {
      if (!sub.timestamp || !sub.inputs.defaultRate) return;
      
      const date = new Date(sub.timestamp);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { totalRate: 0, count: 0 };
      }
      
      monthlyData[monthKey].totalRate += sub.inputs.defaultRate;
      monthlyData[monthKey].count++;
    });
    
    // Convert to array and calculate averages
    return Object.entries(monthlyData)
      .map(([key, data]) => {
        const [year, month] = key.split('-');
        const monthNames = [
          'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
          'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
        ];
        
        return {
          month: `${monthNames[parseInt(month) - 1]}/${year}`,
          averageRate: data.totalRate / data.count
        };
      })
      .sort((a, b) => a.month.localeCompare(b.month));
  }, [submissions]);
  
  // Calculate average default rate by city
  const rateByCity = useMemo(() => {
    const cityData: Record<string, { 
      city: string, 
      state: string, 
      totalRate: number, 
      count: number 
    }> = {};
    
    submissions.forEach(sub => {
      if (!sub.inputs.city || !sub.inputs.state || !sub.inputs.defaultRate) return;
      
      const cityKey = `${sub.inputs.city}-${sub.inputs.state}`;
      
      if (!cityData[cityKey]) {
        cityData[cityKey] = { 
          city: sub.inputs.city, 
          state: sub.inputs.state, 
          totalRate: 0, 
          count: 0 
        };
      }
      
      cityData[cityKey].totalRate += sub.inputs.defaultRate;
      cityData[cityKey].count++;
    });
    
    return Object.values(cityData)
      .map(data => ({
        city: data.city,
        state: data.state,
        averageRate: data.totalRate / data.count
      }))
      .sort((a, b) => b.averageRate - a.averageRate);
  }, [submissions]);
  
  // Calculate overall average default rate
  const overallAverageRate = useMemo(() => {
    if (submissions.length === 0) return 0;
    
    const totalRate = submissions.reduce((sum, sub) => sum + (sub.inputs.defaultRate || 0), 0);
    return totalRate / submissions.length;
  }, [submissions]);
  
  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Análise de Inadimplência</DialogTitle>
          <DialogDescription>
            Taxa de inadimplência média geral: {overallAverageRate.toFixed(2)}%
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Evolução da Taxa de Inadimplência</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={rateByMonth}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${Number(value).toFixed(2)}%`} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="averageRate" 
                      name="Inadimplência Média" 
                      stroke="#ff7300" 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Inadimplência por Cidade</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cidade</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Taxa Média</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rateByCity.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell>{data.city}</TableCell>
                      <TableCell>{data.state}</TableCell>
                      <TableCell className="text-right font-medium">
                        {data.averageRate.toFixed(2)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DefaultRateAnalysis;
