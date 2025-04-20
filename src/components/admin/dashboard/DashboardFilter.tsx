
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DashboardFilterProps {
  filterState: string;
  uniqueStates: string[];
  onFilterChange: (value: string) => void;
}

const DashboardFilter = ({ filterState, uniqueStates, onFilterChange }: DashboardFilterProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-realestate-dark">Dashboard</h2>
      
      <div className="w-56">
        <Select 
          value={filterState} 
          onValueChange={onFilterChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os estados</SelectItem>
            {uniqueStates.map(state => (
              <SelectItem key={state} value={state}>{state}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DashboardFilter;
