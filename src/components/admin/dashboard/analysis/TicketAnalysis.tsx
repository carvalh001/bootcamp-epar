
import React, { useMemo } from 'react';
import { CalculatorSubmission } from '@/types/calculator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TicketAnalysisProps {
  submissions: CalculatorSubmission[];
  isOpen: boolean;
  onClose: () => void;
}

const TicketAnalysis = ({ submissions, isOpen, onClose }: TicketAnalysisProps) => {
  // Calculate average ticket by month
  const ticketByMonth = useMemo(() => {
    const monthlyData: Record<string, { totalTicket: number, count: number }> = {};
    
    submissions.forEach(sub => {
      if (!sub.timestamp || !sub.inputs.averageRent) return;
      
      const date = new Date(sub.timestamp);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { totalTicket: 0, count: 0 };
      }
      
      monthlyData[monthKey].totalTicket += sub.inputs.averageRent;
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
          averageTicket: data.totalTicket / data.count
        };
      })
      .sort((a, b) => a.month.localeCompare(b.month));
  }, [submissions]);
  
  // Calculate average ticket by city
  const ticketByCity = useMemo(() => {
    const cityData: Record<string, { 
      city: string, 
      state: string, 
      totalTicket: number, 
      count: number 
    }> = {};
    
    submissions.forEach(sub => {
      if (!sub.inputs.city || !sub.inputs.state || !sub.inputs.averageRent) return;
      
      const cityKey = `${sub.inputs.city}-${sub.inputs.state}`;
      
      if (!cityData[cityKey]) {
        cityData[cityKey] = { 
          city: sub.inputs.city, 
          state: sub.inputs.state, 
          totalTicket: 0, 
          count: 0 
        };
      }
      
      cityData[cityKey].totalTicket += sub.inputs.averageRent;
      cityData[cityKey].count++;
    });
    
    return Object.values(cityData)
      .map(data => ({
        city: data.city,
        state: data.state,
        averageTicket: data.totalTicket / data.count
      }))
      .sort((a, b) => b.averageTicket - a.averageTicket);
  }, [submissions]);
  
  // Calculate overall average ticket
  const overallAverageTicket = useMemo(() => {
    if (submissions.length === 0) return 0;
    
    const totalTicket = submissions.reduce((sum, sub) => sum + (sub.inputs.averageRent || 0), 0);
    return totalTicket / submissions.length;
  }, [submissions]);
  
  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Análise de Ticket Médio</DialogTitle>
          <DialogDescription>
            Ticket médio geral: R$ {overallAverageTicket.toFixed(2)}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Evolução do Ticket Médio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={ticketByMonth}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `R$ ${Number(value).toFixed(2)}`} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="averageTicket" 
                      name="Ticket Médio" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ticket Médio por Cidade</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cidade</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Ticket Médio</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ticketByCity.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell>{data.city}</TableCell>
                      <TableCell>{data.state}</TableCell>
                      <TableCell className="text-right font-medium">
                        R$ {data.averageTicket.toFixed(2)}
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

export default TicketAnalysis;
