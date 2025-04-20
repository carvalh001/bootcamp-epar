
import React from 'react';
import { Building, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-realestate-dark text-white">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Building className="w-6 h-6" />
              <span className="text-xl font-semibold">ValorImob</span>
            </div>
            <p className="text-gray-300 mb-4">
              Solução especializada em avaliação de carteiras imobiliárias para corretores e imobiliárias.
            </p>
            <div className="flex space-x-4">
              {/* Social media icons would go here */}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#calculator" className="text-gray-300 hover:text-white transition-colors">Calculadora</a></li>
              <li><a href="#benefits" className="text-gray-300 hover:text-white transition-colors">Benefícios</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">Sobre</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-gray-300">(11) 99999-9999</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-gray-300">contato@valorimob.com.br</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1" />
                <span className="text-gray-300">São Paulo, SP</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ValorImob. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
