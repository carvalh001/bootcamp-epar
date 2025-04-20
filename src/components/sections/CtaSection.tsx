
import React from 'react';
import { Button } from '@/components/ui/button';

const CtaSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-realestate-primary to-realestate-secondary text-white">
      <div className="container max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Pronto para Descobrir o Valor da Sua Carteira?
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Mais de 50.000 contratos foram analisados em nossa calculadora para 
          avaliar carteiras de locação e maximizar resultados.
        </p>
        <a href="#calculator">
          <Button size="lg" className="bg-white text-realestate-primary hover:bg-gray-100">
            Quero Avaliar Minha Carteira
          </Button>
        </a>
      </div>
    </section>
  );
};

export default CtaSection;
