
import { CalculatorInput } from '@/utils/calculateValue';
import { toast } from 'sonner';

export const useCalculatorValidation = () => {
  const validateInputs = (inputs: CalculatorInput): boolean => {
    if (!inputs.city || !inputs.state) {
      toast.error("Por favor, preencha cidade e estado.");
      return false;
    }

    if (inputs.averageRent <= 0) {
      toast.error("O valor médio de aluguel não pode ser zero ou negativo.");
      return false;
    }

    if (inputs.occupancyRate <= 0) {
      toast.error("A taxa de administração não pode ser zero ou negativa.");
      return false;
    }

    const totalContracts = inputs.numProperties;
    const allocatedContracts = 
      inputs.contractsExpiring12Months + 
      inputs.contractsExpiring12To24Months + 
      inputs.contractsExpiring24To36Months + 
      inputs.contractsExpiringOver36Months + 
      inputs.expiredIndefiniteContracts;

    if (allocatedContracts !== totalContracts) {
      toast.error(`A soma dos contratos por prazo deve ser igual ao número total de contratos (${totalContracts}).`);
      return false;
    }

    if ((inputs.residentialPercentage || 0) + (inputs.commercialPercentage || 0) !== 100) {
      toast.error("A soma dos percentuais de imóveis residenciais e comerciais deve ser 100%.");
      return false;
    }

    return true;
  };

  return { validateInputs };
};
