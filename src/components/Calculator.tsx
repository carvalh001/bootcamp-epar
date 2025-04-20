
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calculator as CalculatorIcon } from 'lucide-react';
import CalculatorForm from './CalculatorForm';
import useCalculatorData from '@/hooks/useCalculatorData';
import ContactForm from './ContactForm';
import ResultsSummary from './calculator/ResultsSummary';
import SuccessMessage from './calculator/SuccessMessage';
import { formatNumber } from '@/utils/formatUtils';

const Calculator = () => {
  const {
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
  } = useCalculatorData();

  // Calculate contract distribution percentages
  const getContractDistribution = () => {
    const total = inputs.numProperties;
    if (total === 0) return { short: 0, medium: 0, long: 0, indefinite: 0 };
    
    const short = Math.round((inputs.contractsExpiring12Months / total) * 100);
    const medium = Math.round(((inputs.contractsExpiring12To24Months + inputs.contractsExpiring24To36Months) / total) * 100);
    const long = Math.round((inputs.contractsExpiringOver36Months / total) * 100);
    const indefinite = Math.round((inputs.expiredIndefiniteContracts / total) * 100);
    
    return { short, medium, long, indefinite };
  };

  const distribution = getContractDistribution();

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border-none shadow-xl">
        <CardHeader className="bg-gradient-to-r from-realestate-primary to-realestate-secondary text-white rounded-t-lg">
          <div className="flex items-center gap-2 mb-2">
            <CalculatorIcon className="h-6 w-6" />
            <CardTitle className="text-2xl font-bold">Calculadora de Valor de Carteira</CardTitle>
          </div>
          <CardDescription className="text-white/80">
            Descubra quanto vale sua carteira de locação em poucos passos.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6 pt-8">
          {!showResults ? (
            <CalculatorForm inputs={inputs} onChange={handleInputChange} />
          ) : !formSubmitted ? (
            <ResultsSummary results={results} inputs={inputs} distribution={distribution} />
          ) : (
            <SuccessMessage resetCalculator={resetCalculator} />
          )}
        </CardContent>
        
        <CardFooter className="p-6 pt-0">
          {!showResults ? (
            <Button 
              onClick={calculateResults}
              className="w-full bg-realestate-primary hover:bg-realestate-dark flex items-center justify-center gap-2 py-6 text-lg"
              disabled={isCalculating}
            >
              {isCalculating ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Calculando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <ArrowRight className="h-5 w-5" />
                  Quero Avaliar Minha Carteira
                </span>
              )}
            </Button>
          ) : !formSubmitted ? (
            <ContactForm 
              results={results} 
              onSubmitted={() => setFormSubmitted(true)} 
              cityState={inputs.city ? { city: inputs.city, state: inputs.state } : null}
              onFormSave={saveContactForm}
            />
          ) : null}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Calculator;
