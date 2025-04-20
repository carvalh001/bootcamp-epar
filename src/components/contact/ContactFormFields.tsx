
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ContactFormFieldsProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    company: string;
    city: string;
    state: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cityState: { city: string, state: string } | null;
}

const ContactFormFields = ({ formData, onChange, cityState }: ContactFormFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="text-gray-700">Nome Completo*</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
            placeholder="Seu nome"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="email" className="text-gray-700">E-mail Corporativo*</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
            required
            placeholder="seu@empresarial.com.br"
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">Utilizamos apenas e-mails corporativos</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone" className="text-gray-700">Telefone</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            placeholder="(00) 00000-0000"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="company" className="text-gray-700">Imobiliária/Empresa</Label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={onChange}
            placeholder="Nome da sua empresa"
            className="mt-1"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city" className="text-gray-700">Cidade</Label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={onChange}
            placeholder="Sua cidade"
            className="mt-1"
            disabled={cityState !== null}
          />
        </div>
        
        <div>
          <Label htmlFor="state" className="text-gray-700">Estado</Label>
          <Input
            id="state"
            name="state"
            value={formData.state}
            onChange={onChange}
            placeholder="Seu estado"
            className="mt-1"
            disabled={cityState !== null}
          />
        </div>
      </div>
    </>
  );
};

export default ContactFormFields;
