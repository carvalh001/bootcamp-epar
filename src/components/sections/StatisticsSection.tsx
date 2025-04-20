
import React, { useEffect, useState } from 'react';
import StatisticCard from '@/components/StatisticCard';
import { MapPin, Home } from 'lucide-react';

const INITIAL_CITIES = 84;
const INITIAL_CONTRACTS = 53432;

const StatisticsSection = () => {
  const [stats, setStats] = useState({
    cities: INITIAL_CITIES,
    contracts: INITIAL_CONTRACTS
  });

  useEffect(() => {
    const savedStats = localStorage.getItem('calculatorStats');
    if (!savedStats) {
      // Initialize stats if they don't exist
      localStorage.setItem('calculatorStats', JSON.stringify({
        cities: INITIAL_CITIES,
        contracts: INITIAL_CONTRACTS
      }));
    } else {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  const getStats = () => {
    const submissions = localStorage.getItem('calculatorSubmissions') ? 
      JSON.parse(localStorage.getItem('calculatorSubmissions')!) : [];
    
    const uniqueCities = new Set(submissions.map((sub: any) => sub.inputs.city)).size;
    const totalContracts = submissions.reduce((acc: number, sub: any) => 
      acc + (sub.inputs.numProperties || 0), 0);
    
    const newStats = {
      cities: INITIAL_CITIES + uniqueCities,
      contracts: INITIAL_CONTRACTS + totalContracts
    };
    
    localStorage.setItem('calculatorStats', JSON.stringify(newStats));
    return newStats;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatisticCard 
            value={stats.cities}
            label={<span className="notranslate">Cidades Atendidas</span>}
            icon={<MapPin className="h-6 w-6 text-realestate-primary" />}
            animationDelay="animate-delay-100"
          />
          <StatisticCard 
            value={stats.contracts}
            label={<span className="notranslate">Contratos Analisados</span>}
            icon={<Home className="h-6 w-6 text-realestate-primary" />}
            animationDelay="animate-delay-200"
          />
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
