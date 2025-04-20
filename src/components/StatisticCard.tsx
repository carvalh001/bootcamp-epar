
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface StatisticCardProps {
  value: number;
  label: React.ReactNode;
  icon: React.ReactNode;
  animationDelay?: string;
}

const StatisticCard = ({ value, label, icon, animationDelay = 'animate-delay-100' }: StatisticCardProps) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return (
    <Card className={`opacity-0 animate-fade-in ${animationDelay} shadow-lg border-none`}>
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="mb-4 bg-realestate-primary/10 p-3 rounded-full">
          {icon}
        </div>
        <h3 className="text-4xl font-bold text-realestate-primary mb-2">{count.toLocaleString()}</h3>
        <p className="text-gray-600">{label}</p>
      </CardContent>
    </Card>
  );
};

export default StatisticCard;
