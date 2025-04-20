
import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

interface PrivacyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PrivacyDialog = ({ open, onOpenChange }: PrivacyDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Política de Privacidade (LGPD)</AlertDialogTitle>
          <AlertDialogDescription className="max-h-96 overflow-y-auto">
            <div className="space-y-4 text-left">
              <p>
                De acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), informamos que os dados 
                pessoais coletados por meio deste formulário serão utilizados exclusivamente para:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>Fornecer o resultado detalhado da avaliação da sua carteira de locação</li>
                <li>Enviar informações relevantes sobre o mercado imobiliário</li>
                <li>Melhorar nossos serviços e a experiência do usuário</li>
              </ul>
              
              <p>
                Seus dados não serão compartilhados com terceiros sem o seu consentimento expresso, 
                exceto quando exigido por lei.
              </p>
              
              <p>
                Você tem o direito de solicitar a qualquer momento o acesso, correção, eliminação 
                ou portabilidade dos seus dados pessoais.
              </p>
              
              <p>
                Para mais informações ou para exercer seus direitos, entre em contato conosco 
                através do e-mail: privacidade@valorimob.com.br
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Entendi</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PrivacyDialog;
