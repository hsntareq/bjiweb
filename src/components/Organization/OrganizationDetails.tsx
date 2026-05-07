'use client';

import { Edit2, Plus, Trash2, Building2, Landmark, MapPin, Users, MoreVertical, RotateCcw } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
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
	demoMembers?: number;
	activists?: number;
	associates?: number;
}

interface OrganizationDetailsProps {
	organization: Organization;
	onEdit?: () => void;
	onDelete?: () => void;
	onAddChild?: () => void;
	childCount?: number;
	userEmail?: string;
	accessToken?: string;
	userOrgId?: number | null;
	userOrgType?: string | null;
}

const typeColors: Record<string, { border: string; light: string; text: string; accent: string; button: string }> = {
	CENTRAL: { 
		border: 'border-blue-500', 
		light: 'bg-blue-50', 
		text: 'text-gray-900',
		accent: 'text-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700'
	},
	CITY: { 
		border: 'border-emerald-500', 
		light: 'bg-emerald-50', 
		text: 'text-gray-900',
		accent: 'text-emerald-600',
        button: 'bg-emerald-600 hover:bg-emerald-700'
	},
	THANA: { 
		border: 'border-amber-500', 
		light: 'bg-amber-50', 
		text: 'text-gray-900',
		accent: 'text-amber-600',
        button: 'bg-amber-600 hover:bg-amber-700'
	},
	WARD: { 
		border: 'border-violet-500', 
		light: 'bg-violet-50', 
		text: 'text-gray-900',
		accent: 'text-violet-600',
        button: 'bg-violet-600 hover:bg-violet-700'
	},
	UNIT: { 
		border: 'border-rose-500', 
		light: 'bg-rose-50', 
		text: 'text-gray-900',
		accent: 'text-rose-600',
        button: 'bg-rose-600 hover:bg-rose-700'
	},
};

const getChildTypeName = (type: string) => {
	switch (type) {
		case 'CENTRAL': return 'City';
		case 'CITY': return 'Thana';
		case 'THANA': return 'Ward';
		case 'WARD': return 'Unit';
		default: return 'Sub-organization';
	}
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
	userEmail = 'default',
	accessToken = '',
	userOrgId = null,
	userOrgType = null,
}) => {
	const colors = typeColors[organization.type] || typeColors.UNIT;
	const [activeTab, setActiveTab] = useState<'details' | 'positions' | 'members'>('details');

	const [showMenu, setShowMenu] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const [visibleTabs, setVisibleTabs] = useState<Set<string>>(new Set(['details', 'positions', 'members']));
	const [settingsLoaded, setSettingsLoaded] = useState(false);

	const storageKey = `org_details_settings_${userEmail}`;

	useEffect(() => {
		try {
			const saved = localStorage.getItem(storageKey);
			if (saved) {
				const parsed = JSON.parse(saved);
				if (parsed.visibleTabs) setVisibleTabs(new Set(parsed.visibleTabs));
			}
		} catch (e) {
			console.error('Failed to load settings', e);
		} finally {
			setSettingsLoaded(true);
		}
	}, [storageKey]);

	useEffect(() => {
		if (!settingsLoaded) return;
		localStorage.setItem(storageKey, JSON.stringify({ visibleTabs: Array.from(visibleTabs) }));
	}, [visibleTabs, settingsLoaded, storageKey]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setShowMenu(false);
			}
		};
		if (showMenu) document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [showMenu]);

	const toggleTabVisibility = (tabId: string) => {
		const next = new Set(visibleTabs);
		if (next.has(tabId)) {
			if (next.size > 1) next.delete(tabId);
		} else {
			next.add(tabId);
		}
		setVisibleTabs(next);
		if (activeTab === tabId && !next.has(tabId)) {
			setActiveTab(Array.from(next)[0] as any);
		}
	};

	const resetSettings = () => {
		setVisibleTabs(new Set(['details', 'positions', 'members']));
	};

	const countDescendants = (org: Organization, type: string): number => {
		let count = 0;
		if (org.children) {
			org.children.forEach(child => {
				if (child.type === type) count++;
				count += countDescendants(child, type);
			});
		}
		return count;
	};

	const cityCount = countDescendants(organization, 'CITY');
	const thanaCount = countDescendants(organization, 'THANA');
	const wardCount = countDescendants(organization, 'WARD');
	const unitCount = countDescendants(organization, 'UNIT');

	const tabs = [
		{ id: 'details', label: 'Details' },
		{ id: 'positions', label: 'Positions' },
		{ id: 'members', label: 'Persons' },
	] as const;

	return (
		<div className="space-y-4">
			{/* Header Card */}
			<div className={`bg-white border-t-4 ${colors.border} rounded-xl p-6 shadow-sm border-x border-b border-gray-100`}>
				<div className="flex items-start justify-between gap-4">
					<div className="flex items-start gap-4 flex-1">
						<div className={`p-3 ${colors.light} ${colors.accent} rounded-xl`}>
							{typeIcons[organization.type]}
						</div>
						<div>
							<h2 className="text-2xl font-bold text-gray-900">{organization.name}</h2>
							<p className={`font-medium text-sm mt-1 ${colors.accent}`}>{organization.type}</p>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex gap-2">
						{onEdit && (
							<button
								onClick={onEdit}
								className={`p-2.5 bg-gray-50 hover:${colors.light} rounded-lg transition-colors text-gray-500 hover:${colors.accent}`}
								title="Edit"
							>
								<Edit2 className="w-5 h-5" />
							</button>
						)}
						{onAddChild && organization.type !== 'UNIT' && (
							<button
								onClick={onAddChild}
								className={`p-2.5 bg-gray-50 hover:${colors.light} rounded-lg transition-colors text-gray-500 hover:${colors.accent}`}
								title={`Add ${getChildTypeName(organization.type)}`}
							>
								<Plus className="w-5 h-5" />
							</button>
						)}
						{onDelete && (
							<button
								onClick={onDelete}
								className="p-2.5 bg-gray-50 hover:bg-red-50 rounded-lg transition-colors text-gray-500 hover:text-red-600"
								title="Delete"
							>
								<Trash2 className="w-5 h-5" />
							</button>
						)}
						<div className="relative ml-2" ref={menuRef}>
							<button 
								onClick={() => setShowMenu(!showMenu)}
								className={`p-2.5 rounded-lg border transition-colors ${showMenu ? 'bg-gray-100 border-gray-300 text-gray-800' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
							>
								<MoreVertical className="w-5 h-5" />
							</button>
							{showMenu && (
								<div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-2">
									<p className="px-2 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Visible Tabs</p>
									{tabs.map((tab) => (
										<label key={tab.id} className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer text-sm">
											<input 
												type="checkbox" 
												checked={visibleTabs.has(tab.id)} 
												onChange={() => toggleTabVisibility(tab.id)}
												disabled={visibleTabs.has(tab.id) && visibleTabs.size === 1}
												className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 disabled:opacity-50" 
											/>
											<span className="text-gray-700">{tab.label}</span>
										</label>
									))}
									<hr className="my-1 border-gray-100" />
									<button onClick={resetSettings} className="w-full flex items-center justify-center gap-1.5 px-2 py-1.5 mt-1 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded transition-colors">
										<RotateCcw className="w-3.5 h-3.5" />
										Reset Settings
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Tabs */}
			<div className="flex gap-1 bg-gray-100 rounded-xl p-1">
				{tabs.filter(t => visibleTabs.has(t.id)).map((tab) => (
					<button
						key={tab.id}
						onClick={() => setActiveTab(tab.id as any)}
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
				<div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
					<div className="grid grid-cols-2 gap-4">
						{organization.division && (
							<div className="space-y-1">
								<p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Division</p>
								<p className="text-lg font-semibold text-gray-800">{organization.division}</p>
							</div>
						)}
						{organization.city && (
							<div className="space-y-1">
								<p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">City</p>
								<p className="text-lg font-semibold text-gray-800">{organization.city}</p>
							</div>
						)}
						{organization.thana && (
							<div className="space-y-1">
								<p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Thana</p>
								<p className="text-lg font-semibold text-gray-800">{organization.thana}</p>
							</div>
						)}
						{organization.wardNumber && (
							<div className="space-y-1">
								<p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Ward</p>
								<p className="text-lg font-semibold text-gray-800">{organization.wardNumber}</p>
							</div>
						)}
						{organization.unitName && (
							<div className="space-y-1">
								<p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Unit</p>
								<p className="text-lg font-semibold text-gray-800">{organization.unitName}</p>
							</div>
						)}
						{organization.type === 'CENTRAL' && (
							<div className="space-y-1">
								<p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Cities / Thanas / Wards / Units</p>
								<p className="text-xl font-bold text-gray-900">{cityCount} / {thanaCount} / {wardCount} / {unitCount}</p>
							</div>
						)}
						{organization.type === 'CITY' && (
							<div className="space-y-1">
								<p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Thanas / Wards / Units</p>
								<p className="text-xl font-bold text-gray-900">{thanaCount} / {wardCount} / {unitCount}</p>
							</div>
						)}
						{organization.type === 'THANA' && (
							<div className="space-y-1">
								<p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Wards / Units</p>
								<p className="text-xl font-bold text-gray-900">{wardCount} / {unitCount}</p>
							</div>
						)}
						{organization.type === 'WARD' && (
							<div className="space-y-1">
								<p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Units</p>
								<p className="text-xl font-bold text-gray-900">{unitCount}</p>
							</div>
						)}

						{/* M/A/S Stats Badge Row */}
						<div className="col-span-2 mt-2 pt-4 border-t border-gray-100">
							<p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Personnel Strength (Recursive)</p>
							<div className="flex gap-3">
								<div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg border border-blue-100">
									<Users className="w-4 h-4" />
									<span className="text-sm font-bold">Members: {organization.demoMembers || 0}</span>
								</div>
								<div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100">
									<Users className="w-4 h-4" />
									<span className="text-sm font-bold">Activists: {organization.activists || 0}</span>
								</div>
								<div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg border border-amber-100">
									<Users className="w-4 h-4" />
									<span className="text-sm font-bold">Associates: {organization.associates || 0}</span>
								</div>
							</div>
						</div>
					</div>

					{childCount === 0 && (
						<div className="mt-4 text-center">
							<p className="text-gray-400 text-sm">No {getChildTypeName(organization.type).toLowerCase()}s yet</p>
							{onAddChild && organization.type !== 'UNIT' && (
								<button
									onClick={onAddChild}
									className={`mt-3 px-4 py-2 ${colors.button} text-white rounded-lg shadow-sm transition-colors text-sm font-medium`}
								>
									Create {getChildTypeName(organization.type)}
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
					organization={organization}
					userOrgId={userOrgId}
					userOrgType={userOrgType}
					accessToken={accessToken}
				/>
			)}

			{activeTab === 'members' && (
				<OrganizationMembers
					organizationId={organization.id}
					organizationType={organization.type}
					accessToken={accessToken}
				/>
			)}
		</div>
	);
};
