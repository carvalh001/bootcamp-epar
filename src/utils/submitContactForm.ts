// src/utils/submitContactForm.ts

import { ContactInfo } from '@/types/calculator';

export const submitContactForm = async (
  contact: ContactInfo,
  submissionId: string
): Promise<boolean> => {
  try {
    const payload = {
      ...contact,
      submission_id: submissionId
    };

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    console.log("/contacts")
    console.log(API_BASE_URL)

    const response = await fetch(`${API_BASE_URL}/contacts`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
    });


    if (!response.ok) {
      console.error('Erro ao enviar dados de contato:', response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro no envio do contato:', error);
    return false;
  }
};
