'use client';

import { Building2, ChevronDown, ChevronRight, Landmark, MapPin, Users } from 'lucide-react';
import React, { useState } from 'react';

interface Organization {
	id: number;
	name: string;
	type: string;
	children: Organization[];
	_childCount?: number;
	demoMembers?: number;
	activists?: number;
	associates?: number;
	division?: string;
}

interface OrganizationTreeProps {
	data: Organization[];
	onSelect?: (org: Organization) => void;
	selectedId?: number;
	visibleTypes?: Set<string>;
	isCompact?: boolean;
}

const typeStyles = {
	CENTRAL: { style: 'bg-blue-50 text-blue-600', icon: Landmark },
	CITY: { style: 'bg-emerald-50 text-emerald-600', icon: MapPin },
	THANA: { style: 'bg-amber-50 text-amber-600', icon: Building2 },
	WARD: { style: 'bg-violet-50 text-violet-600', icon: Users },
	UNIT: { style: 'bg-rose-50 text-rose-600', icon: Building2 },
};

const TreeNode: React.FC<{
	node: Organization;
	onSelect?: (org: Organization) => void;
	selectedId?: number;
	level: number;
	visibleTypes?: Set<string>;
	isCompact?: boolean;
}> = ({ node, onSelect, selectedId, level, visibleTypes, isCompact }) => {
	const [isExpanded, setIsExpanded] = useState(level < 2);
	const hasChildren = node.children && node.children.length > 0;
	const config = typeStyles[node.type as keyof typeof typeStyles] || typeStyles.UNIT;
	const IconComponent = config.icon;
	const isSelected = selectedId === node.id;
	const isVisible = !visibleTypes || visibleTypes.has(node.type);

	// Generate consistent demo stats based on organization ID
	const generateDemoStats = (id: number): { members: number; activists: number; associates: number } => {
		const seed = id * 7;
		return {
			members: (seed % 20) + 5,
			activists: ((seed * 3) % 15) + 3,
			associates: ((seed * 5) % 10) + 2,
		};
	};

	// Calculate totals including children
	const calculateChildStats = (org: Organization): { members: number; activists: number; associates: number } => {
		const demoStats = generateDemoStats(org.id);
		let members = org.demoMembers || demoStats.members;
		let activists = org.activists || demoStats.activists;
		let associates = org.associates || demoStats.associates;

		if (org.children && org.children.length > 0) {
			org.children.forEach(child => {
				const childStats = calculateChildStats(child);
				members += childStats.members;
				activists += childStats.activists;
				associates += childStats.associates;
			});
		}

		return { members, activists, associates };
	};

	const stats = calculateChildStats(node);

	const rowClass = isSelected
		? 'bg-blue-50 border border-blue-200 shadow-sm'
		: 'border border-transparent hover:bg-gray-50 hover:border-gray-200';

	const iconBgClass = `flex-shrink-0 p-1.5 rounded-md ${config.style}`;

	if (!isVisible) {
		return null;
	}

	return (
		<div>
			<div
				className={`flex items-center gap-2 ${isCompact ? 'p-1' : 'p-2'} rounded-lg cursor-pointer transition-all duration-200 ${rowClass}`}
				onClick={() => {
					onSelect?.(node);
					if (hasChildren) {
						setIsExpanded(!isExpanded);
					}
				}}
				style={{ marginLeft: `${level * 0.75}rem` }}
			>
				{hasChildren ? (
					<button
						className="flex-shrink-0 p-1 rounded-md hover:bg-gray-200 transition-colors"
						onClick={(e) => {
							e.stopPropagation();
							setIsExpanded(!isExpanded);
						}}
					>
						{isExpanded ? (
							<ChevronDown className="w-4 h-4 text-gray-600" />
						) : (
							<ChevronRight className="w-4 h-4 text-gray-600" />
						)}
					</button>
				) : (
					<div className="w-6" />
				)}

				<div className={iconBgClass}>
					<IconComponent className="w-4 h-4" />
				</div>

				<div className="flex-1 min-w-0">
					<div className="flex items-center gap-2">
						<p className={`font-semibold ${isCompact ? 'text-xs' : 'text-sm'} text-gray-900 truncate`}>{node.name}</p>
						{node.division && <span className="text-xs text-gray-500 bg-gray-100 px-1 rounded border border-gray-200 truncate max-w-[80px]">{node.division}</span>}
					</div>
					{!isCompact && (
						<div className="flex gap-1.5 mt-1 flex-wrap">
						<span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded font-medium">M {stats.members}</span>
						<span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded font-medium">A {stats.activists}</span>
						<span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded font-medium">S {stats.associates}</span>
					</div>
					)}
				</div>

				{hasChildren && (
					<div className="flex-shrink-0 px-2 py-0.5 rounded-full bg-white border border-gray-200 text-xs font-semibold text-gray-700">
						{node.children.length}
					</div>
				)}
			</div>

			{isExpanded && hasChildren && (
				<div className="mt-1 space-y-1">
					{node.children.map((child) => (
						<TreeNode
							key={child.id}
							node={child}
							onSelect={onSelect}
							selectedId={selectedId}
							level={level + 1}
							visibleTypes={visibleTypes}
							isCompact={isCompact}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export const OrganizationTree: React.FC<OrganizationTreeProps> = ({
	data,
	onSelect,
	selectedId,
	visibleTypes,
	isCompact,
}) => {
	if (!data || data.length === 0) {
		return (
			<div className="p-12 text-center">
				<Building2 className="w-12 h-12 mx-auto opacity-50 text-gray-400 mb-2" />
				<p className="text-gray-500 font-medium">No organizational data available</p>
			</div>
		);
	}

	return (
		<div className="space-y-2">
			{data.map((org) => (
				<TreeNode
					key={org.id}
					node={org}
					onSelect={onSelect}
					selectedId={selectedId}
					level={0}
					visibleTypes={visibleTypes}
					isCompact={isCompact}
				/>
			))}
		</div>
	);
};
