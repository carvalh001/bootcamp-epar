
import { useState, useEffect } from 'react';
import { CalculatorInput, CalculationResult, calculatePortfolioValue } from '@/utils/calculateValue';
import { ContactInfo } from '@/types/calculator';
import { v4 as uuidv4 } from 'uuid';
import { defaultInputs } from '@/constants/calculatorDefaults';
import { useIpAddress } from './useIpAddress';
import { saveCalculatorSubmission } from '@/utils/calculatorStorage';
import { useCalculatorValidation } from './useCalculatorValidation';
import { submitContactForm } from '@/utils/submitContactForm';

const useCalculatorData = () => {
  const [inputs, setInputs] = useState<CalculatorInput>(defaultInputs);
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  
  const ipAddress = useIpAddress();
  const { validateInputs } = useCalculatorValidation();
  
  useEffect(() => {
    const newSessionId = uuidv4();
    setSessionId(newSessionId);
  }, []);
  
  const handleInputChange = (key: keyof CalculatorInput, value: number | string) => {
    if (key === 'city') {
      const cityStr = String(value);
      const stateMapping: Record<string, string> = {
        'São Paulo': 'SP',
        'Rio de Janeiro': 'RJ',
        'Belo Horizonte': 'MG',
        'Salvador': 'BA',
        'Brasília': 'DF',
        'Curitiba': 'PR',
        'Fortaleza': 'CE',
        'Recife': 'PE',
        'Porto Alegre': 'RS',
        'Manaus': 'AM',
        'Belém': 'PA',
        'Goiânia': 'GO',
        'Guarulhos': 'SP',
        'Campinas': 'SP',
        'Vitória': 'ES',
        'Florianópolis': 'SC',
        'Natal': 'RN',
        'João Pessoa': 'PB',
      };

      const stateValue = stateMapping[cityStr] || '';
      
      setInputs(prev => ({
        ...prev,
        city: cityStr,
        state: stateValue
      }));
    } else if (key === 'residentialPercentage') {
      setInputs(prev => ({
        ...prev,
        residentialPercentage: value as number,
        commercialPercentage: 100 - (value as number)
      }));
    } else if (key === 'commercialPercentage') {
      setInputs(prev => ({
        ...prev,
        commercialPercentage: value as number,
        residentialPercentage: 100 - (value as number)
      }));
    } else {
      setInputs(prev => ({
        ...prev,
        [key]: value
      }));
    }
    
    
    
    if (showResults) {
      setShowResults(false);
    }
  };
  
  const calculateResults = async () => {
    if (!validateInputs(inputs)) {
      return null;
    }
  
    setIsCalculating(true);
  
    setTimeout(async () => {
      const calculationResults = calculatePortfolioValue(inputs);
      setResults(calculationResults);
      setShowResults(true);
      setIsCalculating(false);
  
      // Salva com resultados completos
      await saveCalculatorSubmission(sessionId, inputs, calculationResults, ipAddress);
    }, 3000);
  
    return null;
  };
  


  const saveContactForm = async (contactInfo: ContactInfo): Promise<boolean> => {
    const success = await submitContactForm(contactInfo, sessionId);
    if (success) {
      setFormSubmitted(true);
      return true;
    }
    return false;
  };
  
  
  
  const resetCalculator = () => {
    setInputs(defaultInputs);
    setResults(null);
    setShowResults(false);
    setFormSubmitted(false);
    setSessionId(uuidv4());
  };
  
  return {
    inputs,
    results,
    showResults,
    formSubmitted,
    isCalculating,
    handleInputChange,
    calculateResults,
    resetCalculator,
    setFormSubmitted,
    saveContactForm
  };
};

export default useCalculatorData;
