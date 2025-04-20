
import type { CalculatorInput, CalculationResult } from '@/types/calculator-types';

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  state: string;
}

export interface CalculatorSubmission {
  id?: string;
  timestamp?: string;
  ipAddress?: string;
  inputs: CalculatorInput;
  results: CalculationResult | null;
  contactInfo?: ContactInfo;
  isSubmitted: boolean;
}
