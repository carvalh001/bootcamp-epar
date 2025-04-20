
/**
 * Formats a number with thousand separators
 */
export const formatNumber = (value: number): string => {
  return value.toLocaleString('pt-BR');
};

/**
 * Formats a currency value
 */
export const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', { 
    style: 'currency', 
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};
