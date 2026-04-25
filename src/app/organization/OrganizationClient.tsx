'use client';

import { OrganizationDetails, OrganizationForm, OrganizationTree } from '@/components/Organization';
import { Building2, Loader, Plus, Search, SlidersHorizontal, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

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

export default function OrganizationClient() {
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

	const ORGANIZATION_TYPES = ['CENTRAL', 'CITY', 'THANA', 'WARD', 'UNIT'];

	const typePillStyles: Record<string, string> = {
		CENTRAL: 'from-blue-100 to-blue-200 text-blue-800 border-blue-300',
		CITY: 'from-emerald-100 to-emerald-200 text-emerald-800 border-emerald-300',
		THANA: 'from-amber-100 to-amber-200 text-amber-800 border-amber-300',
		WARD: 'from-violet-100 to-violet-200 text-violet-800 border-violet-300',
		UNIT: 'from-rose-100 to-rose-200 text-rose-800 border-rose-300',
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
			const response = await fetch('http://localhost:3001/organization/hierarchy/tree');
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
							<button
								onClick={handleAddOrganization}
								className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-lg hover:shadow-lg transition-all text-xs font-semibold"
							>
								<Plus className="w-3.5 h-3.5" />
								Add
							</button>
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

						<div className="flex flex-wrap gap-2 mb-3">
							{ORGANIZATION_TYPES.map((type) => {
								const isActive = visibleTypes.has(type);
								const styleClass = typePillStyles[type] || typePillStyles.UNIT;
								return (
									<button
										key={type}
										onClick={() => toggleTypeVisibility(type)}
										className={`px-2.5 py-1.5 rounded-full text-[11px] font-semibold border transition-all ${isActive
												? `bg-gradient-to-r ${styleClass} shadow-sm`
												: 'bg-white text-gray-500 border-gray-200 hover:bg-gray-100'
											}`}
									>
										{type}
									</button>
								);
							})}
						</div>

						<button
							onClick={() => setShowOnlyParents((prev) => !prev)}
							className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border text-xs font-semibold transition-colors ${showOnlyParents
									? 'bg-indigo-50 border-indigo-200 text-indigo-700'
									: 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
								}`}
						>
							<SlidersHorizontal className="w-3.5 h-3.5" />
							{showOnlyParents ? 'Showing only parent orgs' : 'Show only parent orgs'}
						</button>

						<div className="mt-3 text-xs text-gray-500">
							Showing <span className="font-semibold text-gray-700">{visibleNodeCount}</span> organizations
						</div>

						<div className="mt-3 border border-gray-100 rounded-xl p-3 bg-white min-h-[26rem] max-h-[66vh] overflow-y-auto">
							<OrganizationTree
								data={filteredOrganizations}
								onSelect={setSelectedOrganization}
								selectedId={selectedOrganization?.id}
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
						/>
					) : (
						<div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-12 text-center min-h-[32rem] flex flex-col justify-center">
							<div className="mb-4">
								<div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center">
									<Building2 className="w-8 h-8 text-indigo-600" />
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
