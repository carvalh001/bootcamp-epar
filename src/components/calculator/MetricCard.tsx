// src/components/calculator/MetricCard.tsx

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: React.ReactNode;
  icon: LucideIcon;
  iconColor: string;
  secondaryValue?: string | null;
  secondaryLabel?: string | null;
  blurred?: boolean;
  blurIntensity?: string;
}

const MetricCard = ({
  title,
  value,
  icon: Icon,
  iconColor,
  secondaryValue = null,
  secondaryLabel = null,
  blurred = false,
  blurIntensity = 'blur-sm'
}: MetricCardProps) => (
  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-600 text-sm mb-1">{title}</p>
        <h3 className={`text-2xl font-bold ${iconColor} ${blurred ? blurIntensity : ''}`}>
          {value}
        </h3>
        {secondaryValue && (
          <div className="mt-2 text-sm">
            <span className="text-gray-500">{secondaryLabel}: </span>
            <span className={`font-medium ${blurred ? blurIntensity : ''}`}>{secondaryValue}</span>
          </div>
        )}
      </div>
      <div className={`p-3 rounded-full ${iconColor.replace('text-', 'bg-').replace('-600', '-100')}`}>
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>
    </div>
  </div>
);

export default MetricCard;
