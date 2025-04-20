
import React from 'react';
import { CalculatorInput, guaranteeTypeOptions } from '@/utils/calculateValue';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SliderField from './SliderField';

interface GuaranteeSectionProps {
  inputs: CalculatorInput;
  onChange: (key: keyof CalculatorInput, value: number | string) => void;
}

const GuaranteeSection = ({ inputs, onChange }: GuaranteeSectionProps) => {
  return (
    <Card className="overflow-hidden border-l-4 border-l-realestate-accent">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-realestate-accent mb-4">Garantia</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="predominantGuaranteeType" className="text-gray-700 font-medium block">
              Tipo de Garantia Predominante
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              value={inputs.predominantGuaranteeType}
              onValueChange={(value) => onChange('predominantGuaranteeType', value)}
              required
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Selecione o tipo de garantia" />
              </SelectTrigger>
              <SelectContent>
                {guaranteeTypeOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option === "Garantia Fidejussoria" ? "Garantia Locatícia" : option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <Label htmlFor="contractTypes" className="text-gray-700 font-medium block">
              Tipo de Contrato
            </Label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SliderField
                id="residentialPercentage"
                label="Imóveis Residenciais"
                value={inputs.residentialPercentage || 50}
                min={0}
                max={100}
                step={1}
                onChange={(value) => {
                  onChange('residentialPercentage', value);
                  onChange('commercialPercentage', 100 - value);
                }}
                unit="%"
                required={true}
              />
              
              <SliderField
                id="commercialPercentage"
                label="Imóveis Comerciais"
                value={inputs.commercialPercentage || 50}
                min={0}
                max={100}
                step={1}
                onChange={(value) => {
                  onChange('commercialPercentage', value);
                  onChange('residentialPercentage', 100 - value);
                }}
                unit="%"
                required={true}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GuaranteeSection;
