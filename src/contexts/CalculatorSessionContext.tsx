// src/contexts/CalculatorSessionContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface CalculatorSessionContextValue {
  sessionId: string;
  setSessionId: (id: string) => void;
}

const CalculatorSessionContext = createContext<CalculatorSessionContextValue | undefined>(undefined);

export const CalculatorSessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sessionId, setSessionId] = useState<string>('');

  // Gera um sessionId novo só uma vez, no mount
  useEffect(() => {
    setSessionId(uuidv4());
  }, []);

  return (
    <CalculatorSessionContext.Provider value={{ sessionId, setSessionId }}>
      {children}
    </CalculatorSessionContext.Provider>
  );
};

// Hook de consumo
export const useCalculatorSession = (): CalculatorSessionContextValue => {
  const ctx = useContext(CalculatorSessionContext);
  if (!ctx) throw new Error('useCalculatorSession must be used within CalculatorSessionProvider');
  return ctx;
};
