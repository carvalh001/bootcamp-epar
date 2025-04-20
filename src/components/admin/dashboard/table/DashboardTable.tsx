
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CalculatorSubmission } from '@/types/calculator';

interface DashboardTableProps {
  currentItems: CalculatorSubmission[];
  onViewDetails: (submission: CalculatorSubmission) => void;
}

const DashboardTable = ({ currentItems, onViewDetails }: DashboardTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>
          {currentItems.length === 0 
            ? "Nenhum dado de calculadora encontrado." 
            : `Mostrando ${currentItems.length} registros.`
          }
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Cidade/UF</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Valor Calculado</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.length > 0 ? (
            currentItems.map((submission, index) => (
              <TableRow key={submission.id || index}>
                <TableCell className="font-medium">
                  {submission.timestamp ? new Date(submission.timestamp).toLocaleDateString('pt-BR') : 'N/A'}
                </TableCell>
                <TableCell>
                  {submission.inputs.city ? (
                    <>
                      {submission.inputs.city}/{submission.inputs.state}
                    </>
                  ) : (
                    'N/A'
                  )}
                </TableCell>
                <TableCell>
                  {submission.contactInfo?.name || 'Não informado'}
                </TableCell>
                <TableCell>
                  {submission.contactInfo?.email || 'Não informado'}
                </TableCell>
                <TableCell className="text-right">
                  {submission.results?.portfolioValue 
                    ? `R$ ${submission.results.portfolioValue.toLocaleString('pt-BR')}` 
                    : 'Não finalizado'
                  }
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onViewDetails(submission)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                Nenhum resultado encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashboardTable;
