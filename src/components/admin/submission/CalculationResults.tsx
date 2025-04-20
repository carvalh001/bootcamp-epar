
import React from 'react';
import { CalculationResult } from '@/types/calculator-types';
import { formatNumber } from '@/utils/formatUtils';

interface CalculationResultsProps {
  results: CalculationResult;
  numProperties: number;
}

const CalculationResults = ({ results, numProperties }: CalculationResultsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Resultados do Cálculo</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-realestate-primary/10 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-realestate-primary">Valor Total da Carteira</h4>
          <p className="text-2xl font-bold text-realestate-primary">
            R$ {formatNumber(results.portfolioValue)}
          </p>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-600">Valor por Contrato</h4>
          <p className="text-2xl font-bold text-gray-700">
            R$ {formatNumber(results.portfolioValue / numProperties)}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-3 rounded">
          <h4 className="text-xs font-medium text-gray-500">Receita Mensal</h4>
          <p className="text-lg font-semibold">
            R$ {formatNumber(results.monthlyRevenue)}
          </p>
        </div>
        
        <div className="bg-gray-50 p-3 rounded">
          <h4 className="text-xs font-medium text-gray-500">Receita Anual</h4>
          <p className="text-lg font-semibold">
            R$ {formatNumber(results.annualRevenue)}
          </p>
        </div>
        
        <div className="bg-gray-50 p-3 rounded">
          <h4 className="text-xs font-medium text-gray-500">Retorno sobre Valor</h4>
          <p className="text-lg font-semibold">
            {((results.annualRevenue / results.portfolioValue) * 100).toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default CalculationResults;
