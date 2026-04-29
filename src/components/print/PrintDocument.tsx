import React from 'react';

interface PrintDocumentProps {
  children: React.ReactNode;
}

export const PrintDocument: React.FC<PrintDocumentProps> = ({ children }) => {
  return (
    <div className="w-full max-w-[8.27in] min-h-[11.69in] mx-auto bg-white shadow-xl print:shadow-none print:max-w-full print:w-full print:m-0 text-black">
      {/* 
        This wrapper ensures the content acts like an A4 page on screen,
        but stretches naturally when actually printed.
      */}
      <div className="p-[60px] print:p-0 print:pt-[20mm] print:pb-[25mm] print:px-[20mm]">
        {children}
      </div>
    </div>
  );
};
