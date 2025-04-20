
import React from 'react';
import Calculator from '@/components/Calculator';
import { Shield } from 'lucide-react';

const CalculatorSection = () => {
  return (
    <section id="calculator" className="py-20 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-realestate-dark mb-4">
            Calculadora de Valor de Carteira
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Preencha os dados abaixo para descobrir o valor real da sua carteira de locação 
            e receba uma análise detalhada por e-mail.
          </p>
        </div>
        
        <Calculator />

        <div className="mt-8 flex items-start gap-3 max-w-4xl mx-auto bg-blue-50 p-4 rounded-lg border border-blue-100">
          <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-black">
            <p className="font-medium mb-1 text-black">Proteção de Dados (LGPD)</p>
            <p className="text-black">
              Seus dados estão protegidos de acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). 
              Utilizamos criptografia de ponta a ponta e seguimos rigorosos protocolos de segurança. 
              Suas informações são utilizadas exclusivamente para fornecer a análise solicitada e 
              jamais são compartilhadas com terceiros sem seu consentimento expresso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
