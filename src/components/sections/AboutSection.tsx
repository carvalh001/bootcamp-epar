import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Users, TrendingUp, Award, BarChart, Clock } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-realestate-dark mb-4">
            Especialistas em Valorização de Carteiras Imobiliárias
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Nossa equipe combina expertise técnica e conhecimento de mercado para maximizar o valor da sua carteira de locação.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-realestate-primary/10 flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-realestate-primary" />
            </div>
            <h3 className="text-xl font-semibold text-realestate-dark mb-3">Avaliação Profissional</h3>
            <p className="text-gray-600 mb-4">
              Utilizamos metodologia proprietária para avaliar precisamente o valor atual da sua carteira imobiliária.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Análise detalhada de contratos</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Avaliação de risco personalizada</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-realestate-primary/10 flex items-center justify-center mb-4">
              <BarChart className="h-6 w-6 text-realestate-primary" />
            </div>
            <h3 className="text-xl font-semibold text-realestate-dark mb-3">Estratégias de Crescimento</h3>
            <p className="text-gray-600 mb-4">
              Identificamos oportunidades concretas para maximizar o potencial de receita da sua carteira.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Planos de ação personalizados</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Otimização de preços e condições</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-realestate-primary/10 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-realestate-primary" />
            </div>
            <h3 className="text-xl font-semibold text-realestate-dark mb-3">Consultoria Especializada</h3>
            <p className="text-gray-600 mb-4">
              Suporte contínuo para implementação das melhores práticas de gestão de carteiras.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Atendimento personalizado</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Relatórios de desempenho periódicos</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 bg-realestate-dark text-white p-8 rounded-lg shadow-lg">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Resultados Comprovados</h3>
              <p className="mb-6 text-gray-300">
                Nossa metodologia já ajudou centenas de imobiliárias e corretores a maximizar o valor de suas carteiras de locação.
              </p>
              
              <div className="flex flex-col space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Equipe Experiente</h4>
                    <p className="text-gray-300 text-sm">Profissionais com mais de 15 anos no mercado imobiliário</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Aumento de Rentabilidade</h4>
                    <p className="text-gray-300 text-sm">Média de crescimento na rentabilidade das carteiras</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <a href="#calculator">
                  <Button className="bg-white text-realestate-primary hover:bg-gray-100">
                    Quero Avaliar Minha Carteira
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-semibold">Metodologia Exclusiva</h4>
                  <div className="bg-blue-600 text-white text-xs font-bold py-1 px-2 rounded">Exclusivo</div>
                </div>
                <p className="text-gray-300 text-sm">
                  Nossa abordagem proprietária considera fatores exclusivos do mercado brasileiro, 
                  garantindo avaliações mais precisas e estratégias mais eficazes para o cenário local.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-white mb-1">15%</div>
                  <p className="text-sm text-gray-300">Aumento médio de rentabilidade</p>
                </div>
                
                <div className="bg-white/10 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-white mb-1">142+</div>
                  <p className="text-sm text-gray-300">Carteiras otimizadas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
