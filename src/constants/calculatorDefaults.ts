
import { CalculatorInput } from '@/types/calculator-types';

export const defaultInputs: CalculatorInput = {
  numProperties: 50,
  averageRent: 1500,
  occupancyRate: 6,
  defaultRate: 5,
  averageCommission: 50,
  averageContractDuration: 24,
  terminatedContractsPerMonth: 2,
  newContractsPerMonth: 3,
  contractsExpiring12Months: 10,
  contractsExpiring12To24Months: 15,
  contractsExpiring24To36Months: 15,
  contractsExpiringOver36Months: 5,
  expiredIndefiniteContracts: 5,
  predominantGuaranteeType: 'Seguro Fiança',
  residentialPercentage: 70,
  commercialPercentage: 30,
  valorCriterio: 5,
  estoqueAtual: 0,
  city: '',
  state: ''
};
