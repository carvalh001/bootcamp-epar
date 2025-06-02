// src/components/calculator/DetailedAnalysis.tsx

import React from 'react';
import { Shield, TrendingUp, Calendar } from 'lucide-react';
import { formatCurrency } from '@/utils/calculator/format-utils';
import { formatNumber } from '@/utils/formatUtils';
import type { CalculatorInput, CalculationResult } from '@/types/calculator-types';
import MetricCard from './MetricCard';
import ContractDistribution from './ContractDistribution';

interface DetailedAnalysisProps {
  inputs: CalculatorInput;
  results: CalculationResult | null;
  distribution: {
    short: number;
    medium: number;
    long: number;
    indefinite: number;
  };
}

const DetailedAnalysis: React.FC<DetailedAnalysisProps> = ({
  inputs,
  results,
  distribution
}) => {
  if (!results) return null;

  const formattedStabilityScore =
    typeof results.stabilityScore === 'number'
      ? results.stabilityScore.toFixed(2)
      : results.stabilityScore;

  const formattedGrowthRate = results.growthRate.toFixed(2);

  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h3 className="text-xl font-semibold mb-6 text-realestate-dark pb-3 border-b border-gray-200">
        Detalhes da Avaliação
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Estabilidade da Carteira"
          value={<span className="inline-block">{formattedStabilityScore}</span>}
          icon={Shield}
          iconColor="text-blue-600"
        />

        <MetricCard
          title="Taxa de Crescimento"
          value={<span className="inline-block">{formattedGrowthRate}%</span>}
          icon={TrendingUp}
          iconColor="text-green-600"
        />

        <MetricCard
          title="Duração Média dos Contratos"
          value={`${results.averageContractDuration} meses`}
          icon={Calendar}
          iconColor="text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Número de Contratos:</span>
            <span className="font-medium">{formatNumber(inputs.numProperties)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Taxa de Administração:</span>
            <span className="font-medium">{inputs.occupancyRate}%</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Taxa de Inadimplência:</span>
            <span className="font-medium">{inputs.defaultRate}%</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Taxa na Primeira Locação:</span>
            <span className="font-medium">{inputs.averageCommission}%</span>
          </div>

          {inputs.valorCriterio != null && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Critério de Valorização:</span>
              <span className="font-medium">{inputs.valorCriterio}/10</span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Garantia Predominante:</span>
            <span className="font-medium">
              {inputs.predominantGuaranteeType === 'Garantia Fidejussoria'
                ? 'Garantia Locatícia'
                : inputs.predominantGuaranteeType}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Novos Contratos/Mês:</span>
            <span className="font-medium">{inputs.newContractsPerMonth}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Contratos Distratados/Mês:</span>
            <span className="font-medium">{inputs.terminatedContractsPerMonth}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Ticket Médio:</span>
            <span className="font-medium">{formatCurrency(inputs.averageRent)}</span>
          </div>
        </div>
      </div>

      <ContractDistribution distribution={distribution} />

      <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-800 mb-2">Análise Detalhada</h4>
        <p className="text-sm text-blue-700">
          Receba uma análise detalhada e descubra como maximizar o valor da sua carteira.
          Preencha o formulário abaixo para receber por e-mail.
        </p>
      </div>
    </div>
  );
};

export default DetailedAnalysis;
