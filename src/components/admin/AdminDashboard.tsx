
import React, { useState } from 'react';
import { CalculatorSubmission } from '@/types/calculator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import SubmissionDetails from './SubmissionDetails';
import DashboardTable from './dashboard/table/DashboardTable';
import DashboardToolbar from './dashboard/table/DashboardToolbar';
import DashboardPagination from './dashboard/table/DashboardPagination';
import { useDashboardTable } from '@/hooks/useDashboardTable';

interface AdminDashboardProps {
  submissions: CalculatorSubmission[];
}

const AdminDashboard = ({ submissions }: AdminDashboardProps) => {
  const [selectedSubmission, setSelectedSubmission] = useState<CalculatorSubmission | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const {
    currentItems,
    totalPages,
    currentPage,
    searchTerm,
    filteredSubmissions,
    handleSearchChange,
    handlePageChange
  } = useDashboardTable(submissions);
  
  const handleViewDetails = (submission: CalculatorSubmission) => {
    setSelectedSubmission(submission);
    setIsDetailsOpen(true);
  };
  
  const exportToCSV = () => {
    if (filteredSubmissions.length === 0) return;
    
    const headers = ['Data', 'Hora', 'IP', 'Nome', 'Email', 'Telefone', 'Cidade', 'Estado', 
      'Nº Imóveis', 'Aluguel Médio', 'Taxa Admin', 'Taxa Inadimplência', 'Valor Calculado'];
    
    const rows = filteredSubmissions.map(submission => [
      submission.timestamp ? new Date(submission.timestamp).toLocaleDateString('pt-BR') : '',
      submission.timestamp ? new Date(submission.timestamp).toLocaleTimeString('pt-BR') : '',
      submission.ipAddress || '',
      submission.contactInfo?.name || '',
      submission.contactInfo?.email || '',
      submission.contactInfo?.phone || '',
      submission.inputs.city || '',
      submission.inputs.state || '',
      submission.inputs.numProperties.toString(),
      submission.inputs.averageRent.toString(),
      submission.inputs.occupancyRate.toString(),
      submission.inputs.defaultRate.toString(),
      submission.results?.portfolioValue ? `R$ ${submission.results.portfolioValue.toLocaleString('pt-BR')}` : ''
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `calculadora-carteiras-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    alert("Funcionalidade de exportação para PDF será implementada em breve.");
  };
  
  return (
    <div className="space-y-6">
      <DashboardToolbar 
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onExportCSV={exportToCSV}
        onExportPDF={exportToPDF}
        hasData={filteredSubmissions.length > 0}
      />
      
      <DashboardTable 
        currentItems={currentItems}
        onViewDetails={handleViewDetails}
      />
      
      <DashboardPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      
      <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <SheetContent className="sm:max-w-2xl">
          <SheetHeader>
            <SheetTitle>Detalhes da Submissão</SheetTitle>
            <SheetDescription>
              Informações completas sobre o cálculo da carteira
            </SheetDescription>
          </SheetHeader>
          
          {selectedSubmission && (
            <SubmissionDetails submission={selectedSubmission} />
          )}
          
          <div className="flex justify-end mt-4">
            <SheetClose asChild>
              <Button variant="outline">Fechar</Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminDashboard;
