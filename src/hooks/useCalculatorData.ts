
import { useState, useEffect } from 'react';
import { CalculatorInput, CalculationResult, calculatePortfolioValue } from '@/utils/calculateValue';
import { ContactInfo } from '@/types/calculator';
import { v4 as uuidv4 } from 'uuid';
import { defaultInputs } from '@/constants/calculatorDefaults';
import { useIpAddress } from './useIpAddress';
import { saveCalculatorSubmission } from '@/utils/calculatorStorage';
import { useCalculatorValidation } from './useCalculatorValidation';

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
    
    saveCalculatorSubmission(sessionId, inputs, null, ipAddress);
    
    if (showResults) {
      setShowResults(false);
    }
  };
  
  const calculateResults = () => {
    if (!validateInputs(inputs)) {
      return null;
    }
    
    setIsCalculating(true);
    
    setTimeout(() => {
      const calculationResults = calculatePortfolioValue(inputs);
      setResults(calculationResults);
      setShowResults(true);
      setIsCalculating(false);
      
      saveCalculatorSubmission(sessionId, inputs, calculationResults, ipAddress);
    }, 3000);
    
    return null;
  };
  
  const saveContactForm = (contactInfo: ContactInfo) => {
    try {
      const existingSubmissionsString = localStorage.getItem('calculatorSubmissions');
      let existingSubmissions = existingSubmissionsString ? JSON.parse(existingSubmissionsString) : [];
      
      const existingIndex = existingSubmissions.findIndex((s: any) => s.id === sessionId);
      
      if (existingIndex >= 0) {
        existingSubmissions[existingIndex] = {
          ...existingSubmissions[existingIndex],
          contactInfo,
          isSubmitted: true
        };
        
        localStorage.setItem('calculatorSubmissions', JSON.stringify(existingSubmissions));
      }
    } catch (error) {
      console.error('Error saving contact form:', error);
    }
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
