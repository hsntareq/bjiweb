import React from 'react';

interface PrintTableProps {
  children: React.ReactNode;
}

export const PrintTable: React.FC<PrintTableProps> = ({ children }) => {
  return (
    <table className="w-full border-collapse border border-black mb-4 print:mb-2 table-fixed">
      <tbody>
        {children}
      </tbody>
    </table>
  );
};

interface PrintRowProps {
  children: React.ReactNode;
}

export const PrintRow: React.FC<PrintRowProps> = ({ children }) => {
  return <tr className="border border-black">{children}</tr>;
};

interface PrintHeaderCellProps {
  children: React.ReactNode;
  width?: string;
  colSpan?: number;
  rowSpan?: number;
  align?: 'left' | 'center' | 'right';
}

export const PrintHeaderCell: React.FC<PrintHeaderCellProps> = ({ 
  children, width, colSpan, rowSpan, align = 'center' 
}) => {
  return (
    <td 
      colSpan={colSpan} 
      rowSpan={rowSpan}
      style={{ width }} 
      className={`border border-black p-1 text-[8pt] font-bold text-${align} align-middle`}
    >
      {children}
    </td>
  );
};

interface PrintDataCellProps {
  children: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
  align?: 'left' | 'center' | 'right';
  bold?: boolean;
  className?: string;
}

export const PrintDataCell: React.FC<PrintDataCellProps> = ({ 
  children, colSpan, rowSpan, align = 'center', bold = false, className = ''
}) => {
  return (
    <td 
      colSpan={colSpan}
      rowSpan={rowSpan}
      className={`border border-black p-1 text-[8pt] text-${align} align-middle ${bold ? 'font-bold' : ''} ${className}`}
    >
      {children}
    </td>
  );
};

interface PrintSectionTitleProps {
  title: string;
}

export const PrintSectionTitle: React.FC<PrintSectionTitleProps> = ({ title }) => {
  return (
    <div className="font-bold text-[9pt] mb-1 mt-3">
      {title}
    </div>
  );
};
