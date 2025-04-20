
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calculator as CalculatorIcon } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-realestate-primary to-realestate-secondary text-white">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="container max-w-7xl mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 opacity-0 animate-fade-in">
            Descubra o Valor Real da Sua Carteira de Locação
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-0 animate-fade-in animate-delay-100">
            Ferramenta especializada para imobiliárias e corretores calcularem o valor estimado de mercado da sua carteira de aluguéis.
          </p>
          <div className="opacity-0 animate-fade-in animate-delay-200">
            <a href="#calculator">
              <Button size="lg" className="bg-white text-realestate-primary hover:bg-gray-100 flex items-center gap-2">
                <CalculatorIcon className="h-5 w-5" />
                Quero Avaliar Minha Carteira
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
