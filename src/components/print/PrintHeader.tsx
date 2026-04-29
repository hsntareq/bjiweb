import React from 'react';

interface PrintHeaderProps {
  title: string;
  orgName?: string;
  month?: string;
  year?: string;
}

export const PrintHeader: React.FC<PrintHeaderProps> = ({ title, orgName, month, year }) => {
  return (
    <div className="mb-6">
      {/* Dynamic Title */}
      <h1 className="text-center font-bold text-lg mb-2">
        {title}
      </h1>
      
      {/* Subtitles / Metadata */}
      <div className="text-center text-sm space-y-1 font-semibold">
        {orgName && <p>শাখার নাম: {orgName}</p>}
        {(month || year) && <p>রিপোর্ট মাস: {month} {year}</p>}
      </div>
    </div>
  );
};
