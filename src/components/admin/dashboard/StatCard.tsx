
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  prefix?: string;
  suffix?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const StatCard = ({ 
  title, 
  value, 
  icon, 
  prefix = '', 
  suffix = '', 
  description,
  actionLabel,
  onAction
}: StatCardProps) => {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">
              {prefix}{value}{suffix}
            </h3>
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
            {actionLabel && onAction && (
              <Button 
                variant="link" 
                className="p-0 h-auto text-xs text-realestate-primary mt-2"
                onClick={onAction}
              >
                {actionLabel}
              </Button>
            )}
          </div>
          <div className="bg-gray-100 p-2 rounded-full">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
