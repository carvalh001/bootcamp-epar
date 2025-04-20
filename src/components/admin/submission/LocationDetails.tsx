
import React from 'react';
import { MapPin } from 'lucide-react';
import { CalculatorInput } from '@/types/calculator-types';

interface LocationDetailsProps {
  inputs: CalculatorInput;
}

const LocationDetails = ({ inputs }: LocationDetailsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <MapPin className="h-5 w-5" />
        Localização
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Cidade</h4>
          <p>{inputs.city || 'Não informado'}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Estado</h4>
          <p>{inputs.state || 'Não informado'}</p>
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;
