import React, { useState } from 'react';
import { Edit2, ChevronDown, ChevronUp } from 'lucide-react';

interface ReportAccordionSectionProps {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const ReportAccordionSection: React.FC<ReportAccordionSectionProps> = ({ 
  title, 
  onEdit, 
  children,
  defaultOpen = false 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
      <div 
        className="px-6 py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/50 cursor-pointer hover:bg-gray-100/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          {isOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
          <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Prevent accordion toggle when clicking edit
            onEdit();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-semibold shadow-sm"
        >
          <Edit2 className="w-4 h-4" />
          Edit Section
        </button>
      </div>
      
      {/* Accordion Content */}
      <div 
        className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};
