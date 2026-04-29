'use client';

import { OrganizationDetails, OrganizationForm, OrganizationTree } from '@/components/Organization';
import { Building2, Loader, Plus, Search, SlidersHorizontal, X, MoreVertical, RotateCcw } from 'lucide-react';
import { useEffect, useMemo, useState, useRef } from 'react';

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

interface OrganizationClientProps {
	userEmail?: string;
	accessToken?: string;
	isGlobal?: boolean;
}

export default function OrganizationClient({ userEmail = 'default', accessToken = '', isGlobal = false }: OrganizationClientProps) {
	const [organizations, setOrganizations] = useState<Organization[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
	const [showForm, setShowForm] = useState(false);
	const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
	const [parentOrganization, setParentOrganization] = useState<Organization | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [visibleTypes, setVisibleTypes] = useState<Set<string>>(new Set(['CENTRAL', 'CITY', 'THANA', 'WARD', 'UNIT']));
	const [searchQuery, setSearchQuery] = useState('');
	const [showOnlyParents, setShowOnlyParents] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const [isCompact, setIsCompact] = useState(false);
	const [settingsLoaded, setSettingsLoaded] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	const resetTreeSettings = () => {
		setVisibleTypes(new Set(['CENTRAL', 'CITY', 'THANA', 'WARD', 'UNIT']));
		setShowOnlyParents(false);
		setIsCompact(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setShowMenu(false);
			}
		};
		if (showMenu) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [showMenu]);

	const storageKey = `org_tree_settings_${userEmail}`;

	useEffect(() => {
		try {
			const saved = localStorage.getItem(storageKey);
			if (saved) {
				const parsed = JSON.parse(saved);
				if (parsed.visibleTypes) {
					setVisibleTypes(new Set(parsed.visibleTypes));
				}
				if (parsed.showOnlyParents !== undefined) {
					setShowOnlyParents(parsed.showOnlyParents);
				}
				if (parsed.isCompact !== undefined) {
					setIsCompact(parsed.isCompact);
				}
			}
		} catch (e) {
			console.error('Failed to parse settings', e);
		} finally {
			setSettingsLoaded(true);
		}
	}, [storageKey]);

	useEffect(() => {
		if (!settingsLoaded) return;
		const settings = {
			visibleTypes: Array.from(visibleTypes),
			showOnlyParents,
			isCompact,
		};
		localStorage.setItem(storageKey, JSON.stringify(settings));
	}, [visibleTypes, showOnlyParents, isCompact, settingsLoaded, storageKey]);

	const ORGANIZATION_TYPES = ['CENTRAL', 'CITY', 'THANA', 'WARD', 'UNIT'];

	const typePillStyles: Record<string, string> = {
		CENTRAL: 'bg-gray-100 text-gray-800 border-gray-300',
		CITY: 'bg-gray-100 text-gray-800 border-gray-300',
		THANA: 'bg-gray-100 text-gray-800 border-gray-300',
		WARD: 'bg-gray-100 text-gray-800 border-gray-300',
		UNIT: 'bg-gray-100 text-gray-800 border-gray-300',
	};

	const toggleTypeVisibility = (type: string) => {
		const newVisibleTypes = new Set(visibleTypes);
		if (newVisibleTypes.has(type)) {
			newVisibleTypes.delete(type);
		} else {
			newVisibleTypes.add(type);
		}
		setVisibleTypes(newVisibleTypes);
	};

	const organizationMatchesSearch = (org: Organization, query: string) => {
		const normalizedQuery = query.trim().toLowerCase();
		if (!normalizedQuery) return true;

		const searchableFields = [
			org.name,
			org.type,
			org.division,
			org.city,
			org.thana,
			org.unitName,
			org.wardNumber?.toString(),
		];

		return searchableFields.some((field) => field?.toLowerCase().includes(normalizedQuery));
	};

	const filterTree = (nodes: Organization[]): Organization[] => {
		return nodes.reduce<Organization[]>((acc, node) => {
			const filteredChildren = filterTree(node.children || []);
			const typeVisible = visibleTypes.has(node.type);
			const matchesSearch = organizationMatchesSearch(node, searchQuery);
			const matchesParentFilter = !showOnlyParents || (node.children && node.children.length > 0);
			const shouldIncludeNode = typeVisible && matchesSearch && matchesParentFilter;

			if (shouldIncludeNode || filteredChildren.length > 0) {
				acc.push({ ...node, children: filteredChildren });
			}

			return acc;
		}, []);
	};

	const filteredOrganizations = useMemo(() => filterTree(organizations), [organizations, visibleTypes, searchQuery, showOnlyParents]);

	const countVisibleNodes = (nodes: Organization[]): number => {
		return nodes.reduce((count, node) => count + 1 + countVisibleNodes(node.children || []), 0);
	};

	const visibleNodeCount = useMemo(() => countVisibleNodes(filteredOrganizations), [filteredOrganizations]);

	useEffect(() => {
		fetchHierarchy();
	}, []);

	const fetchHierarchy = async () => {
		try {
			setLoading(true);
			const url = isGlobal ? 'http://localhost:3001/organization/hierarchy/tree?global=true' : 'http://localhost:3001/organization/hierarchy/tree';
			const response = await fetch(url, {
				headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
			});
			if (!response.ok) {
				throw new Error('Failed to fetch organizations');
			}
			const data = await response.json();
			setOrganizations(Array.isArray(data) ? data : []);
			setError(null);
		} catch (err) {
			console.error('Error fetching organizations:', err);
			setError(err instanceof Error ? err.message : 'Failed to load organizations');
		} finally {
			setLoading(false);
		}
	};

	const handleAddOrganization = () => {
		setParentOrganization(null);
		setFormMode('create');
		setShowForm(true);
	};

	const handleAddChild = () => {
		if (!selectedOrganization) return;
		setParentOrganization(selectedOrganization);
		setFormMode('create');
		setShowForm(true);
	};

	const handleEditOrganization = () => {
		if (!selectedOrganization) return;
		setFormMode('edit');
		setShowForm(true);
	};

	const handleDeleteOrganization = async () => {
		if (!selectedOrganization) return;

		if (!confirm(`Are you sure you want to delete "${selectedOrganization.name}"?`)) {
			return;
		}

		try {
			const response = await fetch(`http://localhost:3001/organization/${selectedOrganization.id}`, {
				method: 'DELETE',
			});

			if (!response.ok) {
				throw new Error('Failed to delete organization');
			}

			await fetchHierarchy();
			setSelectedOrganization(null);
		} catch (err) {
			console.error('Error deleting organization:', err);
			alert('Failed to delete organization');
		}
	};

	const handleFormSubmit = async (formData: any) => {
		try {
			let url = 'http://localhost:3001/organization';
			let method = 'POST';
			const body: any = {
				name: formData.name,
				type: formData.type,
			};

			if (formData.division) body.division = formData.division;
			if (formData.city) body.city = formData.city;
			if (formData.thana) body.thana = formData.thana;
			if (formData.wardNumber) body.wardNumber = parseInt(formData.wardNumber);
			if (formData.unitName) body.unitName = formData.unitName;

			if (parentOrganization) {
				body.parentId = parentOrganization.id;
			}

			if (formMode === 'edit' && selectedOrganization) {
				url = `${url}/${selectedOrganization.id}`;
				method = 'PUT';
				delete body.type;
			}

			const response = await fetch(url, {
				method,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || 'Failed to save organization');
			}

			await fetchHierarchy();
			setShowForm(false);
			setParentOrganization(null);
		} catch (err) {
			console.error('Error saving organization:', err);
			alert(err instanceof Error ? err.message : 'Failed to save organization');
		}
	};

	if (loading) {
		return (
			<div className="flex flex-col items-center justify-center py-20">
				<Loader className="w-12 h-12 animate-spin text-indigo-600 mb-4" />
				<p className="text-gray-600 font-medium">Loading organizational structure...</p>
				<p className="text-gray-400 text-sm mt-1">This may take a moment</p>
			</div>
		);
	}

	return (
		<>
			{/* Error Message */}
			{error && (
				<div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-red-100 border border-red-300 rounded-xl text-red-800 shadow-sm">
					<p className="font-semibold">Error loading organizations</p>
					<p className="text-sm mt-1">{error}</p>
				</div>
			)}

			{/* Main Content */}
			<div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
				{/* Left: Compact Organization Tree */}
				<div className="xl:col-span-4 space-y-4 xl:sticky xl:top-24">
					<div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4">
						<div className="flex items-center justify-between gap-3 mb-4">
							<h2 className="text-base font-bold text-gray-900">Organization Tree</h2>
							<div className="flex items-center gap-2">
								<button
									onClick={handleAddOrganization}
									className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all text-xs font-semibold"
								>
									<Plus className="w-3.5 h-3.5" />
									Add
								</button>
								<div className="relative" ref={menuRef}>
									<button 
										onClick={() => setShowMenu(!showMenu)}
										className={`p-1.5 rounded-lg border transition-colors ${showMenu ? 'bg-gray-100 border-gray-300 text-gray-800' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
									>
										<MoreVertical className="w-4 h-4" />
									</button>
									{showMenu && (
										<div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-2">
											<label className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer text-sm">
												<input type="checkbox" checked={!visibleTypes.has('CITY')} onChange={() => toggleTypeVisibility('CITY')} className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
												<span className="text-gray-700">Hide Cities</span>
											</label>
											<label className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer text-sm">
												<input type="checkbox" checked={!visibleTypes.has('THANA')} onChange={() => toggleTypeVisibility('THANA')} className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
												<span className="text-gray-700">Hide Thana</span>
											</label>
											<label className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer text-sm">
												<input type="checkbox" checked={!visibleTypes.has('WARD')} onChange={() => toggleTypeVisibility('WARD')} className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
												<span className="text-gray-700">Hide Wards</span>
											</label>
											<label className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer text-sm">
												<input type="checkbox" checked={!visibleTypes.has('UNIT')} onChange={() => toggleTypeVisibility('UNIT')} className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
												<span className="text-gray-700">Hide Units</span>
											</label>
											<hr className="my-1 border-gray-100" />
											<label className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer text-sm">
												<input type="checkbox" checked={showOnlyParents} onChange={() => setShowOnlyParents(!showOnlyParents)} className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
												<span className="text-gray-700">Only parent orgs</span>
											</label>
											<label className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer text-sm">
												<input type="checkbox" checked={isCompact} onChange={() => setIsCompact(!isCompact)} className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
												<span className="text-gray-700">Compact version</span>
											</label>
											<hr className="my-1 border-gray-100" />
											<button onClick={resetTreeSettings} className="w-full flex items-center justify-center gap-1.5 px-2 py-1.5 mt-1 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded transition-colors">
												<RotateCcw className="w-3.5 h-3.5" />
												Reset Settings
											</button>
										</div>
									)}
								</div>
							</div>
						</div>

						<div className="relative mb-3">
							<Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
							<input
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Search by name, area, type..."
								className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-gray-200 bg-gray-50/60 focus:bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 outline-none text-sm"
							/>
							{searchQuery && (
								<button
									onClick={() => setSearchQuery('')}
									className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-gray-200 text-gray-500"
									title="Clear search"
								>
									<X className="w-4 h-4" />
								</button>
							)}
						</div>





						<div className="mt-3 text-xs text-gray-500">
							Showing <span className="font-semibold text-gray-700">{visibleNodeCount}</span> organizations
						</div>

						<div className="mt-3 border border-gray-100 rounded-xl p-3 bg-white min-h-[26rem] max-h-[66vh] overflow-y-auto">
							<OrganizationTree
								data={filteredOrganizations as any}
								onSelect={setSelectedOrganization}
								selectedId={selectedOrganization?.id}
								isCompact={isCompact}
							/>
						</div>
					</div>
				</div>

				{/* Right: Larger Organization Details Workspace */}
				<div className="xl:col-span-8">
					{selectedOrganization ? (
						<OrganizationDetails
							organization={selectedOrganization}
							onEdit={handleEditOrganization}
							onDelete={handleDeleteOrganization}
							onAddChild={handleAddChild}
							childCount={selectedOrganization.children?.length || 0}
							userEmail={userEmail}
						/>
					) : (
						<div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-12 text-center min-h-[32rem] flex flex-col justify-center">
							<div className="mb-4">
								<div className="w-16 h-16 mx-auto rounded-full bg-gray-50 flex items-center justify-center">
									<Building2 className="w-8 h-8 text-gray-400" />
								</div>
							</div>
							<p className="text-gray-600 font-medium">Select an organization</p>
							<p className="text-gray-400 text-sm mt-1">Choose from the hierarchy on the left to view details</p>
						</div>
					)}
				</div>
			</div>

			{/* Organization Form Modal */}
			{showForm && (
				<OrganizationForm
					onSubmit={handleFormSubmit}
					onClose={() => {
						setShowForm(false);
						setParentOrganization(null);
					}}
					initialData={formMode === 'edit' ? selectedOrganization || undefined : undefined}
					parentOrganization={parentOrganization || undefined}
					organizationTypes={ORGANIZATION_TYPES}
				/>
			)}
		</>
	);
}
