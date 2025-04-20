
import React from 'react';
import { Clock, Database } from 'lucide-react';
import { formatSubmissionDate } from '@/utils/submissionUtils';

interface SubmissionMetaProps {
  timestamp?: string;
  ipAddress?: string;
}

const SubmissionMeta = ({ timestamp, ipAddress }: SubmissionMetaProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="h-4 w-4" />
        <span>Registrado em {formatSubmissionDate(timestamp)}</span>
      </div>
      
      {ipAddress && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Database className="h-4 w-4" />
          <span>IP: {ipAddress}</span>
        </div>
      )}
    </div>
  );
};

export default SubmissionMeta;
