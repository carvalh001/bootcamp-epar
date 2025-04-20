
import React from 'react';
import { DollarSign } from 'lucide-react';
import { CalculatorInput } from '@/types/calculator-types';
import { formatNumber } from '@/utils/formatUtils';

interface PortfolioDetailsProps {
  inputs: CalculatorInput;
}

const PortfolioDetails = ({ inputs }: PortfolioDetailsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <DollarSign className="h-5 w-5" />
        Dados da Carteira
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Número de Imóveis</h4>
          <p>{inputs.numProperties}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Aluguel Médio</h4>
          <p>R$ {formatNumber(inputs.averageRent)}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Taxa de Administração</h4>
          <p>{inputs.occupancyRate}%</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Taxa de Inadimplência</h4>
          <p>{inputs.defaultRate}%</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Primeira Locação</h4>
          <p>{inputs.averageCommission}%</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Duração Média dos Contratos</h4>
          <p>{inputs.averageContractDuration} meses</p>
        </div>
      </div>
      
      <div className="mt-4">
        <h4 className="text-sm font-medium text-muted-foreground">Distribuição de Contratos</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
          <div className="bg-gray-50 p-2 rounded text-center">
            <p className="text-xs text-muted-foreground">Até 12 meses</p>
            <p className="font-medium">{inputs.contractsExpiring12Months}</p>
          </div>
          <div className="bg-gray-50 p-2 rounded text-center">
            <p className="text-xs text-muted-foreground">12-24 meses</p>
            <p className="font-medium">{inputs.contractsExpiring12To24Months}</p>
          </div>
          <div className="bg-gray-50 p-2 rounded text-center">
            <p className="text-xs text-muted-foreground">24-36 meses</p>
            <p className="font-medium">{inputs.contractsExpiring24To36Months}</p>
          </div>
          <div className="bg-gray-50 p-2 rounded text-center">
            <p className="text-xs text-muted-foreground">+36 meses</p>
            <p className="font-medium">{inputs.contractsExpiringOver36Months}</p>
          </div>
          <div className="bg-gray-50 p-2 rounded text-center">
            <p className="text-xs text-muted-foreground">Indeterminado</p>
            <p className="font-medium">{inputs.expiredIndefiniteContracts}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetails;
