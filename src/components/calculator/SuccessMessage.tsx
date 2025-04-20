
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface SuccessMessageProps {
  resetCalculator: () => void;
}

const SuccessMessage = ({ resetCalculator }: SuccessMessageProps) => {
  return (
    <div className="text-center py-8">
      <div className="mb-6 text-green-600">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="48" 
          height="48" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="mx-auto"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Avaliação Enviada com Sucesso!</h3>
      <p className="text-gray-600 mb-6">
        Verifique seu e-mail com todos os detalhes da avaliação da sua carteira
        e dicas para maximizar seus resultados.
      </p>
      <Button 
        variant="outline" 
        onClick={resetCalculator}
        className="flex items-center gap-2"
      >
        <RefreshCw className="h-4 w-4" />
        Nova Avaliação
      </Button>
    </div>
  );
};

export default SuccessMessage;
