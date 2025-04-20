
import React from 'react';
import { User } from 'lucide-react';
import { ContactInfo } from '@/types/calculator';

interface ContactDetailsProps {
  contactInfo?: ContactInfo;
}

const ContactDetails = ({ contactInfo }: ContactDetailsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <User className="h-5 w-5" /> 
        Informações de Contato
      </h3>
      
      {contactInfo ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Nome</h4>
            <p>{contactInfo.name || 'Não informado'}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">E-mail</h4>
            <p>{contactInfo.email || 'Não informado'}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Telefone</h4>
            <p>{contactInfo.phone || 'Não informado'}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Empresa</h4>
            <p>{contactInfo.company || 'Não informado'}</p>
          </div>
        </div>
      ) : (
        <p className="text-muted-foreground italic">Informações de contato não fornecidas</p>
      )}
    </div>
  );
};

export default ContactDetails;
