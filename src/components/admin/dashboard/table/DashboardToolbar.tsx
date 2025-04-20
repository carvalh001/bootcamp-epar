
import React from 'react';
import { Search, FileSpreadsheet, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface DashboardToolbarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExportCSV: () => void;
  onExportPDF: () => void;
  hasData: boolean;
}

const DashboardToolbar = ({
  searchTerm,
  onSearchChange,
  onExportCSV,
  onExportPDF,
  hasData
}: DashboardToolbarProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar por nome, cidade..."
          value={searchTerm}
          onChange={onSearchChange}
          className="pl-8"
        />
      </div>
      
      <div className="flex gap-2 w-full sm:w-auto">
        <Button 
          onClick={onExportCSV}
          className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-auto"
          disabled={!hasData}
        >
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          Excel
        </Button>
        
        <Button 
          onClick={onExportPDF}
          className="bg-red-600 hover:bg-red-700 flex-1 sm:flex-auto"
          disabled={!hasData}
        >
          <FileText className="w-4 h-4 mr-2" />
          PDF
        </Button>
      </div>
    </div>
  );
};

export default DashboardToolbar;
