import React from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';
import { formatCurrency } from '@/utils/calculator/format-utils';
import { formatNumber } from '@/utils/formatUtils';
import MetricCard from './MetricCard';
import DetailedAnalysis from './DetailedAnalysis';
import type { CalculatorInput, CalculationResult } from '@/types/calculator-types';

interface ResultsSummaryProps {
  results: CalculationResult | null;
  inputs: CalculatorInput;
  distribution: {
    short: number;
    medium: number;
    long: number;
    indefinite: number;
  };
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({ results, inputs, distribution }) => {
  if (!results) return null;

  // Formata valores principais
  const portfolioValue    = formatCurrency(results.portfolioValue || 0);
  const annualRevenue     = formatCurrency(results.annualRevenue || 0);
  const monthlyRevenue    = formatCurrency(results.monthlyRevenue || 0);
  const potentialGrowth   = formatCurrency(results.potentialGrowth || 0);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-center text-realestate-dark">
        Valor da sua carteira Estimado*
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MetricCard
          title="Valor da Carteira"
          value={portfolioValue}
          icon={DollarSign}
          iconColor="text-realestate-primary-600"
          secondaryLabel="Receita Anual"
          secondaryValue={annualRevenue}
        />

        <MetricCard
          title="Receita Mensal"
          value={monthlyRevenue}
          icon={TrendingUp}
          iconColor="text-realestate-secondary-600"
          secondaryLabel="Potencial de Crescimento"
          secondaryValue={potentialGrowth}
        />
      </div>

      <DetailedAnalysis inputs={inputs} results={results} distribution={distribution} />

      <div className="text-xs text-gray-500 italic mt-2">
        * Valores estimados, tendo em vista que para uma melhor avaliação, devemos considerar outras informações adicionais.
      </div>
    </div>
  );
};

export default ResultsSummary;
