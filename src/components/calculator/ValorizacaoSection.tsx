
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CalculatorInput } from '@/types/calculator-types';
import SliderField from './SliderField';
import { BuildingIcon } from 'lucide-react';

interface ValorizacaoSectionProps {
  inputs: CalculatorInput;
  onChange: (key: keyof CalculatorInput, value: number | string) => void;
}

const ValorizacaoSection = ({ inputs, onChange }: ValorizacaoSectionProps) => {
  return (
    <Card className="border-gray-200">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <BuildingIcon className="h-5 w-5 text-realestate-primary" />
          <h3 className="text-lg font-semibold text-realestate-dark">Nível de Captação</h3>
        </div>
        
        <div className="space-y-6">
          <SliderField
            id="novosImoveisPorMes"
            label="Quantos imóveis novos capta por mês"
            value={inputs.valorCriterio || 0}
            min={0}
            max={100}
            step={1}
            onChange={(value) => onChange('valorCriterio', value)}
            infoTooltip="Defina a quantidade mensal de novos imóveis captados"
            allowTextInput={true}
          />
          
          <SliderField
            id="estoqueAtual"
            label="Volume atual de estoque de imóveis para locação"
            value={inputs.estoqueAtual || 0}
            min={0}
            max={1000}
            step={1}
            onChange={(value) => onChange('estoqueAtual', value)}
            infoTooltip="Quantidade total de imóveis disponíveis para locação"
            allowTextInput={true}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ValorizacaoSection;
