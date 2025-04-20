
import React, { useState } from 'react';
import { Phone, Mail, MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const ContactSection = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const phoneNumber = "5511999999999"; // Replace with your actual WhatsApp number
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <section id="contact" className="py-20 bg-realestate-light">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-realestate-dark mb-4">
            Entre em Contato
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Precisa de ajuda ou tem dúvidas sobre nossa calculadora de valor de carteira? 
            Nossa equipe está pronta para atender você.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-80 transition-opacity"
            >
              <div className="bg-realestate-primary/10 p-4 rounded-full inline-block mb-4">
                <Phone className="h-6 w-6 text-realestate-primary" />
              </div>
              <h3 className="text-xl font-semibold text-realestate-dark mb-3">
                WhatsApp
              </h3>
              <p className="text-gray-600">
                (11) 99999-9999
              </p>
            </a>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-realestate-primary/10 p-4 rounded-full inline-block mb-4">
              <Mail className="h-6 w-6 text-realestate-primary" />
            </div>
            <h3 className="text-xl font-semibold text-realestate-dark mb-3">
              E-mail
            </h3>
            <p className="text-gray-600">
              contato@valorimob.com.br
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <button 
              onClick={() => setIsChatOpen(true)}
              className="block w-full hover:opacity-80 transition-opacity"
            >
              <div className="bg-realestate-primary/10 p-4 rounded-full inline-block mb-4">
                <MessageSquare className="h-6 w-6 text-realestate-primary" />
              </div>
              <h3 className="text-xl font-semibold text-realestate-dark mb-3">
                Chat Online
              </h3>
              <p className="text-gray-600">
                Disponível de seg. a sex. das 9h às 18h
              </p>
            </button>
          </div>
        </div>
      </div>

      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chat Online</DialogTitle>
          </DialogHeader>
          <div className="min-h-[400px] flex items-center justify-center">
            <p className="text-gray-500">Chat em desenvolvimento...</p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ContactSection;
