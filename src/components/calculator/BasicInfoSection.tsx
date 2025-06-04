import React from 'react';
import { CalculatorInput } from '@/utils/calculateValue';
import { Card, CardContent } from '@/components/ui/card';
import SliderField from './SliderField';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatNumber } from '@/utils/formatUtils';

interface BasicInfoSectionProps {
  inputs: CalculatorInput;
  onChange: (key: keyof CalculatorInput, value: number | string) => void;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ inputs, onChange }) => {
  const handleRentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = e.target.value.replace(/[^\d]/g, '');
    const numericValue = parseInt(sanitizedValue, 10) || 0;
    onChange('averageRent', numericValue);
  };

  const formatRentDisplay = (value: number) =>
    value.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <Card className="overflow-hidden border-l-4 border-l-realestate-primary">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-realestate-primary mb-2">
          Informações Básicas
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Preencha os dados abaixo para calcular o desempenho da sua carteira.
        </p>

        <div className="space-y-6">
          {/* Tamanho da carteira */}
          <SliderField
            id="numProperties"
            label="Número de Contratos"
            value={inputs.numProperties}
            min={1}
            max={3000}
            step={1}
            onChange={(value) => onChange('numProperties', value)}
            infoTooltip="Total de contratos ativos na sua carteira."
            formatDisplay={(value) => formatNumber(value)}
            required
            allowTextInput
          />

          {/* Valor médio do aluguel */}
          <div>
            <Label htmlFor="averageRent" className="text-gray-700 font-medium block mb-2">
              Valor Médio de Aluguel <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                R$
              </span>
              <Input
                id="averageRent"
                type="text"
                value={formatRentDisplay(inputs.averageRent)}
                onChange={handleRentInputChange}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Taxas em percentual */}
          <SliderField
            id="occupancyRate"
            label="Taxa de Administração (%)"
            value={inputs.occupancyRate}
            min={0}
            max={20}
            step={0.5}
            onChange={(value) => onChange('occupancyRate', value)}
            unit="%"
            infoTooltip="Percentual médio cobrado para administrar os imóveis da sua carteira."
            required
          />

          <SliderField
            id="defaultRate"
            label="Taxa de Inadimplência (%)"
            value={inputs.defaultRate}
            min={0}
            max={50}
            step={1}
            onChange={(value) => onChange('defaultRate', value)}
            unit="%"
            infoTooltip="Percentual de contratos inadimplentes na sua carteira."
            required
          />

          <SliderField
            id="averageCommission"
            label="Comissão na Primeira Locação (%)"
            value={inputs.averageCommission}
            min={0}
            max={100}
            step={1}
            onChange={(value) => onChange('averageCommission', value)}
            unit="%"
            infoTooltip="Percentual médio cobrado sobre o valor do aluguel na primeira locação."
            required
          />

          {/* Localização */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city" className="text-gray-700 font-medium block mb-2">
                Cidade <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="city"
                type="text"
                value={inputs.city}
                onChange={(e) => onChange('city', e.target.value)}
                placeholder="Digite sua cidade"
                required
              />
            </div>

            <div>
              <Label htmlFor="state" className="text-gray-700 font-medium block mb-2">
                Estado <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="state"
                type="text"
                value={inputs.state}
                onChange={(e) => onChange('state', e.target.value)}
                placeholder="UF"
                disabled={!inputs.city}
                className={!inputs.city ? 'bg-gray-100' : ''}
                required
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfoSection;
