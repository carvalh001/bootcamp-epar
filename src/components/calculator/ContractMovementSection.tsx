
import React from 'react';
import { CalculatorInput } from '@/utils/calculateValue';
import { Card, CardContent } from '@/components/ui/card';
import SliderField from './SliderField';

interface ContractMovementSectionProps {
  inputs: CalculatorInput;
  onChange: (key: keyof CalculatorInput, value: number | string) => void;
}

const ContractMovementSection = ({ inputs, onChange }: ContractMovementSectionProps) => {
  return (
    <Card className="overflow-hidden border-l-4 border-l-realestate-secondary">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-realestate-secondary mb-4">Movimentação de Contratos</h3>
        <div className="space-y-4">
          <SliderField
            id="terminatedContractsPerMonth"
            label="Contratos Distratados por Mês"
            value={inputs.terminatedContractsPerMonth}
            min={0}
            max={50}
            step={1}
            onChange={(value) => onChange('terminatedContractsPerMonth', value)}
            infoTooltip="Média mensal de contratos encerrados"
            required={true}
            allowTextInput={false}
          />
          
          <SliderField
            id="newContractsPerMonth"
            label="Novos Contratos por Mês"
            value={inputs.newContractsPerMonth}
            min={0}
            max={50}
            step={1}
            onChange={(value) => onChange('newContractsPerMonth', value)}
            infoTooltip="Média mensal de novos contratos firmados"
            required={true}
            allowTextInput={false}
          />
          
          <SliderField
            id="averageContractDuration"
            label="Duração Média dos Contratos"
            value={inputs.averageContractDuration}
            min={12}
            max={60}
            step={1}
            onChange={(value) => onChange('averageContractDuration', value)}
            unit=" meses"
            infoTooltip="Duração média dos contratos em meses"
            required={true}
            allowTextInput={false}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractMovementSection;
