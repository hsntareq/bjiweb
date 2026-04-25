'use client';

import { Edit2, Plus, Trash2, Building2, Landmark, MapPin, Users } from 'lucide-react';
import React, { useState } from 'react';
import { OrgPositions } from './OrgPositions';
import { OrganizationMembers } from './OrganizationMembers';

interface Organization {
	id: number;
	name: string;
	type: string;
	division?: string;
	city?: string;
	thana?: string;
	wardNumber?: number;
	unitName?: string;
	children?: Organization[];
}

interface OrganizationDetailsProps {
	organization: Organization;
	onEdit?: () => void;
	onDelete?: () => void;
	onAddChild?: () => void;
	childCount?: number;
}

const typeColors: Record<string, { gradient: string; light: string; text: string; accent: string }> = {
	CENTRAL: { 
		gradient: 'from-blue-600 to-blue-700', 
		light: 'bg-blue-50', 
		text: 'text-blue-900',
		accent: 'bg-blue-100 text-blue-700'
	},
	CITY: { 
		gradient: 'from-emerald-600 to-emerald-700', 
		light: 'bg-emerald-50', 
		text: 'text-emerald-900',
		accent: 'bg-emerald-100 text-emerald-700'
	},
	THANA: { 
		gradient: 'from-amber-600 to-amber-700', 
		light: 'bg-amber-50', 
		text: 'text-amber-900',
		accent: 'bg-amber-100 text-amber-700'
	},
	WARD: { 
		gradient: 'from-violet-600 to-violet-700', 
		light: 'bg-violet-50', 
		text: 'text-violet-900',
		accent: 'bg-violet-100 text-violet-700'
	},
	UNIT: { 
		gradient: 'from-rose-600 to-rose-700', 
		light: 'bg-rose-50', 
		text: 'text-rose-900',
		accent: 'bg-rose-100 text-rose-700'
	},
};

const typeIcons: Record<string, React.ReactNode> = {
	CENTRAL: <Landmark className="w-6 h-6" />,
	CITY: <MapPin className="w-6 h-6" />,
	THANA: <Building2 className="w-6 h-6" />,
	WARD: <Users className="w-6 h-6" />,
	UNIT: <Building2 className="w-6 h-6" />,
};

export const OrganizationDetails: React.FC<OrganizationDetailsProps> = ({
	organization,
	onEdit,
	onDelete,
	onAddChild,
	childCount = 0,
}) => {
	const colors = typeColors[organization.type] || typeColors.UNIT;
	const [activeTab, setActiveTab] = useState<'details' | 'positions' | 'members'>('details');

	const tabs = [
		{ id: 'details', label: 'Details' },
		{ id: 'positions', label: 'Positions' },
		{ id: 'members', label: 'Members' },
	] as const;

	return (
		<div className="space-y-4">
			{/* Header Card with Gradient */}
			<div className={`bg-gradient-to-br ${colors.gradient} rounded-2xl p-6 text-white shadow-lg`}>
				<div className="flex items-start justify-between gap-4">
					<div className="flex items-start gap-4 flex-1">
						<div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
							{typeIcons[organization.type]}
						</div>
						<div>
							<h2 className="text-2xl font-bold">{organization.name}</h2>
							<p className="text-white/80 text-sm mt-1">{organization.type}</p>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex gap-2">
						{onEdit && (
							<button
								onClick={onEdit}
								className="p-2.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm"
								title="Edit"
							>
								<Edit2 className="w-5 h-5" />
							</button>
						)}
						{onAddChild && (
							<button
								onClick={onAddChild}
								className="p-2.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm"
								title="Add Child"
							>
								<Plus className="w-5 h-5" />
							</button>
						)}
						{onDelete && (
							<button
								onClick={onDelete}
								className="p-2.5 bg-red-500/30 hover:bg-red-500/50 rounded-lg transition-colors backdrop-blur-sm"
								title="Delete"
							>
								<Trash2 className="w-5 h-5" />
							</button>
						)}
					</div>
				</div>
			</div>

			{/* Tabs */}
			<div className="flex gap-1 bg-gray-100 rounded-xl p-1">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						onClick={() => setActiveTab(tab.id)}
						className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-all ${
							activeTab === tab.id
								? `bg-white text-gray-900 shadow-sm`
								: 'text-gray-500 hover:text-gray-700'
						}`}
					>
						{tab.label}
					</button>
				))}
			</div>

			{/* Tab Content */}
			{activeTab === 'details' && (
				<div className={`${colors.light} rounded-2xl p-6`}>
					<div className="grid grid-cols-2 gap-4">
						{organization.division && (
							<div className="space-y-1">
								<p className={`text-xs font-semibold ${colors.accent} uppercase`}>Division</p>
								<p className={`text-lg font-semibold ${colors.text}`}>{organization.division}</p>
							</div>
						)}
						{organization.city && (
							<div className="space-y-1">
								<p className={`text-xs font-semibold ${colors.accent} uppercase`}>City</p>
								<p className={`text-lg font-semibold ${colors.text}`}>{organization.city}</p>
							</div>
						)}
						{organization.thana && (
							<div className="space-y-1">
								<p className={`text-xs font-semibold ${colors.accent} uppercase`}>Thana</p>
								<p className={`text-lg font-semibold ${colors.text}`}>{organization.thana}</p>
							</div>
						)}
						{organization.wardNumber && (
							<div className="space-y-1">
								<p className={`text-xs font-semibold ${colors.accent} uppercase`}>Ward</p>
								<p className={`text-lg font-semibold ${colors.text}`}>{organization.wardNumber}</p>
							</div>
						)}
						{organization.unitName && (
							<div className="space-y-1">
								<p className={`text-xs font-semibold ${colors.accent} uppercase`}>Unit</p>
								<p className={`text-lg font-semibold ${colors.text}`}>{organization.unitName}</p>
							</div>
						)}
						<div className="space-y-1">
							<p className={`text-xs font-semibold ${colors.accent} uppercase`}>Sub-orgs</p>
							<p className={`text-2xl font-bold ${colors.text}`}>{childCount}</p>
						</div>
					</div>

					{childCount === 0 && (
						<div className="mt-4 text-center">
							<p className={`${colors.text} text-sm`}>No sub-organizations yet</p>
							{onAddChild && (
								<button
									onClick={onAddChild}
									className={`mt-3 px-4 py-2 bg-gradient-to-r ${colors.gradient} text-white rounded-lg hover:shadow-lg transition-shadow text-sm font-medium`}
								>
									Create Sub-organization
								</button>
							)}
						</div>
					)}
				</div>
			)}

			{activeTab === 'positions' && (
				<OrgPositions
					organizationId={organization.id}
					organizationType={organization.type}
				/>
			)}

			{activeTab === 'members' && (
				<OrganizationMembers
					organizationId={organization.id}
					organizationType={organization.type}
				/>
			)}
		</div>
	);
};
