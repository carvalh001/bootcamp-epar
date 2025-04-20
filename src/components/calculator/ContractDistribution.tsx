
import React from 'react';

interface ContractDistributionProps {
  distribution: {
    short: number;
    medium: number;
    long: number;
    indefinite: number;
  };
}

const ContractDistribution = ({ distribution }: ContractDistributionProps) => {
  return (
    <div className="mt-6">
      <h4 className="font-medium mb-3 text-realestate-dark">Distribuição de Contratos</h4>
      <div className="flex items-center h-6 w-full rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500"
          style={{ width: `${distribution.short}%` }}
          title={`Até 12 meses: ${distribution.short}%`}
        ></div>
        <div
          className="h-full bg-green-500"
          style={{ width: `${distribution.medium}%` }}
          title={`12-36 meses: ${distribution.medium}%`}
        ></div>
        <div
          className="h-full bg-purple-500"
          style={{ width: `${distribution.long}%` }}
          title={`>36 meses: ${distribution.long}%`}
        ></div>
        <div
          className="h-full bg-yellow-500"
          style={{ width: `${distribution.indefinite}%` }}
          title={`Vencidos: ${distribution.indefinite}%`}
        ></div>
      </div>
      <div className="grid grid-cols-4 gap-2 text-xs mt-2">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
          <span>Até 12m: {distribution.short}%</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
          <span>12-36m: {distribution.medium}%</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
          <span>&gt;36m: {distribution.long}%</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
          <span>Vencidos: {distribution.indefinite}%</span>
        </div>
      </div>
    </div>
  );
};

export default ContractDistribution;
