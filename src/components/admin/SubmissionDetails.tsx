
import React from 'react';
import { CalculatorSubmission } from '@/types/calculator';
import { Separator } from '@/components/ui/separator';
import SubmissionMeta from './submission/SubmissionMeta';
import ContactDetails from './submission/ContactDetails';
import LocationDetails from './submission/LocationDetails';
import PortfolioDetails from './submission/PortfolioDetails';
import CalculationResults from './submission/CalculationResults';

interface SubmissionDetailsProps {
  submission: CalculatorSubmission;
}

const SubmissionDetails = ({ submission }: SubmissionDetailsProps) => {
  return (
    <div className="mt-6 space-y-6 max-h-[80vh] overflow-y-auto pr-2">
      <SubmissionMeta 
        timestamp={submission.timestamp} 
        ipAddress={submission.ipAddress} 
      />
      
      <Separator />
      
      <ContactDetails contactInfo={submission.contactInfo} />
      
      <Separator />
      
      <LocationDetails inputs={submission.inputs} />
      
      <Separator />
      
      <PortfolioDetails inputs={submission.inputs} />
      
      {submission.results && (
        <>
          <Separator />
          <CalculationResults 
            results={submission.results} 
            numProperties={submission.inputs.numProperties} 
          />
        </>
      )}
    </div>
  );
};

export default SubmissionDetails;
