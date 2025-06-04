
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Lock, Send } from 'lucide-react';
import { CalculationResult } from '@/utils/calculateValue';
import { toast } from 'sonner';
import { ContactInfo } from '@/types/calculator';
import ContactFormFields from './contact/ContactFormFields';
import PrivacyDialog from './contact/PrivacyDialog';
import FollowUpDialog from './calculator/FollowUpDialog';

interface ContactFormProps {
  results?: CalculationResult | null;
  onSubmitted: () => void;
  cityState: { city: string, state: string } | null;
  onFormSave?: (contactInfo: ContactInfo) => Promise<boolean>;
}

const ContactForm = ({ results, onSubmitted, cityState, onFormSave }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    city: cityState?.city || '',
    state: cityState?.state || ''
  });
  
  const [loading, setLoading] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) return false;
    
    const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'aol.com', 'protonmail.com', 'zoho.com', 'mail.com', 'yandex.com', 'gmx.com', 'uol.com.br', 'bol.com.br', 'ig.com.br', 'terra.com.br', 'globo.com'];
    
    const domain = email.split('@')[1].toLowerCase();
    return !commonDomains.includes(domain);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (!formData.name || !formData.email) {
      toast.error('Por favor, preencha os campos obrigatórios');
      setLoading(false);
      return;
    }
    
    if (!validateEmail(formData.email)) {
      toast.error('Por favor, utilize um e-mail corporativo');
      setLoading(false);
      return;
    }
    
    if (onFormSave !== undefined && onFormSave !== null) {
      const success = await onFormSave(formData as ContactInfo);
      if (success) {
        setShowFollowUp(true);
      } else {
        toast.error('Ocorreu um erro ao salvar seus dados. Tente novamente.');
      }
    }
    
    
    
    setLoading(false);
    
  };
  
  const handleFollowUpClose = () => {
    setShowFollowUp(false);
    onSubmitted();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <ContactFormFields 
          formData={formData}
          onChange={handleChange}
          cityState={cityState}
        />
        
        <div className="flex items-start gap-2 mt-2">
          <Lock className="h-4 w-4 text-gray-500 mt-0.5" />
          <p className="text-sm text-gray-500">
            Seus dados serão tratados em conformidade com a 
            <button 
              type="button" 
              onClick={() => setShowPrivacyPolicy(true)}
              className="text-realestate-primary underline ml-1"
            >
              LGPD (Lei Geral de Proteção de Dados)
            </button>
          </p>
        </div>
        
        <div className="text-sm text-gray-500">
          * Campos obrigatórios
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-realestate-secondary hover:bg-realestate-dark"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enviando...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Receber Avaliação por E-mail
            </span>
          )}
        </Button>
      </form>
      
      <PrivacyDialog 
        open={showPrivacyPolicy} 
        onOpenChange={setShowPrivacyPolicy}
      />
      
      <FollowUpDialog 
        open={showFollowUp} 
        onOpenChange={handleFollowUpClose}
      />
    </>
  );
};

export default ContactForm;
