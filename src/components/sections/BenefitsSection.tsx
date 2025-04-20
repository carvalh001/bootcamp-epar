
import React from 'react';
import { DollarSign, TrendingUp, Users } from 'lucide-react';

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-20 bg-realestate-light">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-realestate-dark mb-4">
            Por que Avaliar Sua Carteira?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conhecer o valor real da sua carteira de locação é o primeiro passo 
            para tomar decisões estratégicas e aumentar sua rentabilidade.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-realestate-primary/10 p-4 rounded-full inline-block mb-4">
              <DollarSign className="h-6 w-6 text-realestate-primary" />
            </div>
            <h3 className="text-xl font-semibold text-realestate-dark mb-3">
              Conheça o Valor do Seu Negócio
            </h3>
            <p className="text-gray-600">
              Saiba exatamente quanto vale sua carteira de locação e utilize essa 
              informação para negociações, fusões ou vendas do seu negócio.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-realestate-primary/10 p-4 rounded-full inline-block mb-4">
              <TrendingUp className="h-6 w-6 text-realestate-primary" />
            </div>
            <h3 className="text-xl font-semibold text-realestate-dark mb-3">
              Maximize Seus Resultados
            </h3>
            <p className="text-gray-600">
              Identifique oportunidades de melhoria em crescimento, inadimplência e
              comissões para aumentar a rentabilidade da sua carteira.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-realestate-primary/10 p-4 rounded-full inline-block mb-4">
              <Users className="h-6 w-6 text-realestate-primary" />
            </div>
            <h3 className="text-xl font-semibold text-realestate-dark mb-3">
              Melhore a Gestão
            </h3>
            <p className="text-gray-600">
              Use dados para tomar decisões estratégicas, melhorar processos e 
              estruturar equipes para crescimento sustentável.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
