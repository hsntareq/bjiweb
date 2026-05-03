import { CheckCircle2, ChevronDown, Edit2, Folder, RefreshCw } from 'lucide-react';
import React, { useState } from 'react';

interface ReportAccordionSectionProps {
	title: string;
	onEdit?: () => void;
	onReset?: () => void;
	children: React.ReactNode;
	defaultOpen?: boolean;
	icon?: React.ElementType;
	completed?: boolean;
	buttonText?: string;
}

export const ReportAccordionSection: React.FC<ReportAccordionSectionProps> = ({
	title,
	onEdit,
	children,
	defaultOpen = false,
	icon: Icon = Folder,
	completed = false,
	buttonText = 'Edit Section'
}) => {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	// Persistence logic
	React.useEffect(() => {
		const savedState = localStorage.getItem(`accordion_${title}`);
		if (savedState !== null) {
			setIsOpen(savedState === 'true');
		}
	}, [title]);

	const handleToggle = () => {
		const nextState = !isOpen;
		setIsOpen(nextState);
		localStorage.setItem(`accordion_${title}`, String(nextState));
	};

	return (
		<div className={`group transition-all duration-300 bg-white sm:rounded-2xl sm:border ${isOpen ? 'sm:border-indigo-100 sm:shadow-xl sm:shadow-indigo-500/5' : 'sm:border-gray-100 sm:shadow-sm sm:hover:shadow-md'} overflow-hidden mb-2 sm:mb-4`}>
			<div
				className={`px-3 sm:px-6 py-2 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer transition-colors ${isOpen ? 'bg-gradient-to-r from-indigo-50/50 to-white' : 'hover:bg-gray-50/50'} gap-2 sm:gap-4 border-b sm:border-b-0 border-gray-100`}
				onClick={handleToggle}
			>
				<div className="flex items-center gap-2 sm:gap-3 flex-1">
					<div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0 ${isOpen ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}`}>
						<Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
					</div>
					<div className='flex-1 flex items-center gap-5'>
						<div className="flex items-center gap-2">
							<h3 className={`font-bold transition-colors text-sm sm:text-base ${isOpen ? 'text-gray-900' : 'text-gray-700'}`}>{title}</h3>
							{completed && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
						</div>
					</div>
					<div className={`flex w-7 h-7 sm:w-8 sm:h-8 rounded-full items-center justify-center transition-all duration-300 shrink-0 ml-auto sm:ml-0 ${isOpen ? 'bg-indigo-50 text-indigo-600 rotate-180' : 'bg-gray-50 text-gray-400'}`}>
						<ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
					</div>

				</div>

				{onReset && (
<button
onClick={(e) => { e.stopPropagation(); if (window.confirm('Reset this section? This cannot be undone.')) onReset(); }}
className="mr-2 flex items-center justify-center gap-1 px-3 py-1.5 bg-white text-red-600 border border-red-100 rounded-xl hover:bg-red-600 hover:text-white transition-all text-xs sm:text-sm font-bold shadow-sm active:scale-95"
>
<RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
<span>Reset</span>
</button>
)}

{onEdit && (
<button
onClick={(e) => {
e.stopPropagation();
onEdit();
}}
className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-white text-indigo-600 border border-indigo-100 rounded-xl hover:bg-indigo-600 hover:text-white transition-all text-xs sm:text-sm font-bold shadow-sm active:scale-95"
>
<Edit2 className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
<span>{buttonText}</span>
</button>
)}


			</div>

			{/* Accordion Content */}
			<div
				className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 overflow-hidden'}`}
			>
				<div className="overflow-hidden">
					<div className="p-2 sm:p-5 pt-2 sm:border-t sm:border-gray-50">
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};
