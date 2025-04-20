import React from 'react';
import { CalculatorInput } from '@/utils/calculateValue';
import { Card, CardContent } from '@/components/ui/card';
import SliderField from './SliderField';

interface ContractExpirationSectionProps {
  inputs: CalculatorInput;
  onChange: (key: keyof CalculatorInput, value: number | string) => void;
}

const ContractExpirationSection = ({ inputs, onChange }: ContractExpirationSectionProps) => {
  // Calculate total allocated contracts
  const totalAllocated = 
    inputs.contractsExpiring12Months + 
    inputs.contractsExpiring12To24Months + 
    inputs.contractsExpiring24To36Months + 
    inputs.contractsExpiringOver36Months + 
    inputs.expiredIndefiniteContracts;
  
  // Check if total matches expected
  const isValid = totalAllocated === inputs.numProperties;
  const remainingToAllocate = inputs.numProperties - totalAllocated;

  return (
    <Card className="overflow-hidden border-l-4 border-l-realestate-dark">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-realestate-dark mb-4">Duração dos Contratos</h3>
        
        {!isValid && (
          <div className={`text-xs mb-4 p-2 rounded ${remainingToAllocate > 0 ? 'bg-amber-50 text-amber-800' : 'bg-red-50 text-red-800'}`}>
            {remainingToAllocate > 0 
              ? `Você ainda precisa distribuir ${remainingToAllocate} contrato(s). O total de contratos distribuídos deve ser igual ao número total de contratos (${inputs.numProperties}).`
              : `Você distribuiu ${Math.abs(remainingToAllocate)} contrato(s) a mais. O total não pode exceder o número total de contratos (${inputs.numProperties}).`
            }
          </div>
        )}
        
        <div className="space-y-4">
          <SliderField
            id="contractsExpiring12Months"
            label="Contratos que Vencem em até 12 meses"
            value={inputs.contractsExpiring12Months}
            min={0}
            max={3000}
            step={1}
            onChange={(value) => onChange('contractsExpiring12Months', value)}
            required
            allowTextInput={true}
          />
          
          <SliderField
            id="contractsExpiring12To24Months"
            label="Contratos que Vencem entre 12 e 24 meses"
            value={inputs.contractsExpiring12To24Months}
            min={0}
            max={3000}
            step={1}
            onChange={(value) => onChange('contractsExpiring12To24Months', value)}
            required
            allowTextInput={true}
          />
          
          <SliderField
            id="contractsExpiring24To36Months"
            label="Contratos que Vencem entre 24 e 36 meses"
            value={inputs.contractsExpiring24To36Months}
            min={0}
            max={3000}
            step={1}
            onChange={(value) => onChange('contractsExpiring24To36Months', value)}
            required
            allowTextInput={true}
          />
          
          <SliderField
            id="contractsExpiringOver36Months"
            label="Contratos Acima de 36 meses"
            value={inputs.contractsExpiringOver36Months}
            min={0}
            max={3000}
            step={1}
            onChange={(value) => onChange('contractsExpiringOver36Months', value)}
            required
            allowTextInput={true}
          />
          
          <SliderField
            id="expiredIndefiniteContracts"
            label="Contratos Vencidos (Tempo Indeterminado)"
            value={inputs.expiredIndefiniteContracts}
            min={0}
            max={3000}
            step={1}
            onChange={(value) => onChange('expiredIndefiniteContracts', value)}
            required
            allowTextInput={true}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractExpirationSection;
