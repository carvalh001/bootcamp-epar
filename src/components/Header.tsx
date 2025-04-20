
import React from 'react';
import { Building, Calculator, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white py-4 shadow-sm">
      <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Building className="w-8 h-8 text-realestate-primary" />
          <span className="text-xl font-semibold text-realestate-primary">ValorImob</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#calculator" className="text-gray-600 hover:text-realestate-primary transition-colors">
            Calculadora
          </a>
          <a href="#benefits" className="text-gray-600 hover:text-realestate-primary transition-colors">
            Benefícios
          </a>
          <a href="#about" className="text-gray-600 hover:text-realestate-primary transition-colors">
            Sobre
          </a>
          <a href="#contact" className="text-gray-600 hover:text-realestate-primary transition-colors">
            Contato
          </a>
        </nav>
        
        <a href="#calculator">
          <Button className="hidden md:flex items-center bg-realestate-primary hover:bg-realestate-dark text-white">
            <Calculator className="w-4 h-4 mr-2" />
            Avaliar Carteira
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </a>
      </div>
    </header>
  );
};

export default Header;
