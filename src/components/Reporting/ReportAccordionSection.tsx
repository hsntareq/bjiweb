import React, { useState } from 'react';
import { Edit2, ChevronDown, ChevronUp, Folder, FileText, CheckCircle2 } from 'lucide-react';

interface ReportAccordionSectionProps {
  title: string;
  onEdit?: () => void;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ElementType;
  completed?: boolean;
}

export const ReportAccordionSection: React.FC<ReportAccordionSectionProps> = ({ 
  title, 
  onEdit, 
  children,
  defaultOpen = false,
  icon: Icon = Folder,
  completed = false
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`group transition-all duration-300 bg-white rounded-3xl border ${isOpen ? 'border-indigo-100 shadow-xl shadow-indigo-500/5' : 'border-gray-100 shadow-sm hover:shadow-md'} overflow-hidden mb-6`}>
      <div 
        className={`px-6 sm:px-8 py-4 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer transition-colors ${isOpen ? 'bg-gradient-to-r from-indigo-50/50 to-white' : 'hover:bg-gray-50/50'} gap-4`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}`}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`font-bold transition-colors text-lg sm:text-xl ${isOpen ? 'text-gray-900' : 'text-gray-700'}`}>{title}</h3>
              {completed && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            </div>
            {!isOpen && <p className="text-xs sm:text-sm text-gray-400 font-medium">Click to expand details</p>}
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {onEdit && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-white text-indigo-600 border border-indigo-100 rounded-xl hover:bg-indigo-600 hover:text-white transition-all text-sm font-bold shadow-sm active:scale-95"
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit Section</span>
            </button>
          )}
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-indigo-50 text-indigo-600 rotate-180' : 'bg-gray-50 text-gray-400'}`}>
            <ChevronDown className="w-6 h-6" />
          </div>
        </div>
      </div>
      
      {/* Accordion Content */}
      <div 
        className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 overflow-hidden'}`}
      >
        <div className="overflow-hidden">
          <div className="p-8 pt-2 border-t border-gray-50">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
