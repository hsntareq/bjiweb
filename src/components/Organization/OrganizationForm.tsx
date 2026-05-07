'use client';

import { X } from 'lucide-react';
import React, { useState } from 'react';

interface Organization {
	id: number;
	name: string;
	bnName?: string;
	type: string;
}

interface OrganizationFormProps {
	onSubmit: (data: any) => void;
	onClose: () => void;
	initialData?: Organization;
	parentOrganization?: Organization;
	organizationTypes: string[];
}

export const OrganizationForm: React.FC<OrganizationFormProps> = ({
	onSubmit,
	onClose,
	initialData,
	parentOrganization,
	organizationTypes,
}) => {
	const getNextLevelType = (parentType?: string) => {
		switch (parentType) {
			case 'CENTRAL': return 'CITY';
			case 'CITY': return 'THANA';
			case 'THANA': return 'WARD';
			case 'WARD': return 'UNIT';
			default: return 'CENTRAL';
		}
	};

	const [formData, setFormData] = useState({
		name: initialData?.name || '',
		bnName: (initialData as any)?.bnName || '',
		type: initialData?.type || (parentOrganization ? getNextLevelType(parentOrganization.type) : 'CENTRAL'),
		division: '',
		city: '',
		thana: '',
		wardNumber: '',
		unitName: '',
	});

	const [loading, setLoading] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			await onSubmit(formData);
			onClose();
		} catch (error) {
			console.error('Error submitting form:', error);
		} finally {
			setLoading(false);
		}
	};

	const fields: Record<string, string[]> = {
		CENTRAL: ['name'],
		CITY: ['name'],
		THANA: ['name'],
		WARD: ['name', 'wardNumber'],
		UNIT: ['name'],
	};

	const visibleFields = fields[formData.type] || ['name'];

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold">
						{initialData ? 'Edit' : 'Create'} Organization
					</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Name Field */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Organization Name *
						</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter organization name"
						/>
					</div>

					{/* Bengali Name Field */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Organization Name (Bengali)
						</label>
						<input
							type="text"
							name="bnName"
							value={formData.bnName}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-bengali"
							placeholder="সংগঠনের নাম লিখুন"
						/>
					</div>

					{/* Type Field */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Organization Type *
						</label>
						<select
							name="type"
							value={formData.type}
							onChange={handleChange}
							disabled={!!parentOrganization}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
						>
							{organizationTypes.map((type) => (
								<option key={type} value={type}>
									{type}
								</option>
							))}
						</select>
					</div>

					{/* Division Field */}
					{visibleFields.includes('division') && (
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Division
							</label>
							<input
								type="text"
								name="division"
								value={formData.division}
								onChange={handleChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="e.g., Dhaka, Chittagong"
							/>
						</div>
					)}

					{/* City Field */}
					{visibleFields.includes('city') && (
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								City
							</label>
							<input
								type="text"
								name="city"
								value={formData.city}
								onChange={handleChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="e.g., Dhaka City"
							/>
						</div>
					)}

					{/* Thana Field */}
					{visibleFields.includes('thana') && (
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Thana
							</label>
							<input
								type="text"
								name="thana"
								value={formData.thana}
								onChange={handleChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="e.g., Gulshan"
							/>
						</div>
					)}

					{/* Ward Number Field */}
					{visibleFields.includes('wardNumber') && (
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Ward Number
							</label>
							<input
								type="number"
								name="wardNumber"
								value={formData.wardNumber}
								onChange={handleChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="e.g., 1, 2, 3"
							/>
						</div>
					)}

					{/* Unit Name Field */}
					{visibleFields.includes('unitName') && (
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Unit Name
							</label>
							<input
								type="text"
								name="unitName"
								value={formData.unitName}
								onChange={handleChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="e.g., Gulshan Unity Hub"
							/>
						</div>
					)}

					{/* Parent Organization Info */}
					{parentOrganization && (
						<div className="bg-gray-50 p-3 rounded border border-gray-200">
							<p className="text-sm text-gray-600">
								<span className="font-semibold">Parent:</span> {parentOrganization.name}
							</p>
						</div>
					)}

					{/* Form Actions */}
					<div className="flex gap-3 pt-4">
						<button
							type="button"
							onClick={onClose}
							className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={loading}
							className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
						>
							{loading ? 'Saving...' : 'Save'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
