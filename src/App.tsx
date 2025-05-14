// src/App.tsx
import { StrictMode, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { CalculatorSessionProvider } from "@/contexts/CalculatorSessionContext";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const Admin = lazy(() => import("./pages/Admin"));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-realestate-primary"></div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CalculatorSessionProvider>
        <BrowserRouter>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route
                path="/admin"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Admin />
                  </Suspense>
                }
              />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </TooltipProvider>
        </BrowserRouter>
      </CalculatorSessionProvider>
    </QueryClientProvider>
  </StrictMode>
);

export default App;
