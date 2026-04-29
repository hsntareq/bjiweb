import React from 'react';
import { X } from 'lucide-react';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSave: () => void;
  saving?: boolean;
  children: React.ReactNode;
  width?: string;
}

export const BaseModal: React.FC<BaseModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  onSave, 
  saving = false, 
  children,
  width = 'max-w-2xl'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-white rounded-3xl shadow-2xl w-full ${width} overflow-hidden animate-in fade-in zoom-in duration-200`}>
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-8 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
        <div className="px-8 py-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 text-gray-600 font-semibold hover:bg-gray-200 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onSave}
            disabled={saving}
            className="px-8 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};
