
export const guaranteeTypeOptions = [
  'Seguro Fiança',
  'Garantia Locatícia',
  'Fiador',
  'Caução',
  'Título de Capitalização',
  'Depósito Caução',
  'Misto'
];

export const calculateGuaranteeFactor = (guaranteeType: string): number => {
  const guaranteeFactors: Record<string, number> = {
    'Seguro Fiança': 1.05,
    'Garantia Locatícia': 1.03,
    'Fiador': 1.0,
    'Caução': 1.03,
    'Título de Capitalização': 1.01,
    'Garantia Fidejussória': 0.98,
    'Depósito Caução': 1.02,
    'Misto': 1.01
  };
  
  return guaranteeFactors[guaranteeType] || 1.0;
};
