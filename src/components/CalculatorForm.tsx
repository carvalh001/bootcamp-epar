
import React from 'react';
import { CalculatorInput } from '@/types/calculator-types';
import BasicInfoSection from './calculator/BasicInfoSection';
import ContractMovementSection from './calculator/ContractMovementSection';
import GuaranteeSection from './calculator/GuaranteeSection';
import ContractExpirationSection from './calculator/ContractExpirationSection';
import ValorizacaoSection from './calculator/ValorizacaoSection';

interface CalculatorFormProps {
  inputs: CalculatorInput;
  onChange: (key: keyof CalculatorInput, value: number | string) => void;
}

const CalculatorForm = ({ inputs, onChange }: CalculatorFormProps) => {
  return (
    <div className="space-y-8">
      <BasicInfoSection inputs={inputs} onChange={onChange} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContractMovementSection inputs={inputs} onChange={onChange} />
        <GuaranteeSection inputs={inputs} onChange={onChange} />
      </div>
      
      <ValorizacaoSection inputs={inputs} onChange={onChange} />
      
      <ContractExpirationSection inputs={inputs} onChange={onChange} />
    </div>
  );
};

export default CalculatorForm;
