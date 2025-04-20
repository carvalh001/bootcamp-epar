
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import StatisticsSection from '@/components/sections/StatisticsSection';
import CalculatorSection from '@/components/sections/CalculatorSection';
import BenefitsSection from '@/components/sections/BenefitsSection';
import AboutSection from '@/components/sections/AboutSection';
import CtaSection from '@/components/sections/CtaSection';
import ContactSection from '@/components/sections/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      <StatisticsSection />
      <CalculatorSection />
      <BenefitsSection />
      <AboutSection />
      <CtaSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
