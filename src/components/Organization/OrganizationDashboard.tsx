'use client';

import { Activity, AlertCircle, BarChart3, Loader, TrendingUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TeamPerformance {
	organizationId: number;
	organizationName: string;
	organizationType: string;
	totalMembers: number;
	activeMembers: number;
	reportSubmissionRate: number;
	averageEngagementScore: number;
	personalReportsSummary: {
		totalReports: number;
		averageQuranStudyDays: number;
		totalHaditsRead: number;
		averageSalahJamaat: number;
		totalOrgWorkHours: number;
	};
}

export function OrganizationDashboard() {
	const [performance, setPerformance] = useState<TeamPerformance | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchTeamPerformance();
	}, []);

	const fetchTeamPerformance = async () => {
		try {
			const token = localStorage.getItem('auth_token');
			const response = await fetch('http://localhost:3001/dashboard/team-performance', {
				headers: token ? { Authorization: `Bearer ${token}` } : {},
			});

			if (response.ok) {
				const data = await response.json();
				setPerformance(data);
			} else if (response.status !== 401) {
				setError('Failed to load team performance data');
			}
		} catch (err) {
			console.error('Error fetching team performance:', err);
			setError('Unable to connect to dashboard service');
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center p-8 min-h-screen">
				<div className="text-center">
					<Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
					<p className="text-gray-600">Loading team performance...</p>
				</div>
			</div>
		);
	}

	if (error || !performance) {
		return (
			<div className="max-w-4xl mx-auto p-8">
				<div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
					<AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
					<div>
						<h3 className="font-semibold text-amber-900">Dashboard Information</h3>
						<p className="text-sm text-amber-800 mt-1">
							{error || 'Please ensure you have an active organization assignment'}
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900">Team Dashboard</h1>
				<p className="text-gray-600 mt-1">
					{performance.organizationName} ({performance.organizationType})
				</p>
			</div>

			{/* KPI Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600 font-medium">Total Members</p>
							<p className="text-3xl font-bold text-gray-900 mt-1">{performance.totalMembers}</p>
						</div>
						<Users className="w-10 h-10 text-blue-500 opacity-20" />
					</div>
				</div>

				<div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600 font-medium">Active Members</p>
							<p className="text-3xl font-bold text-gray-900 mt-1">{performance.activeMembers}</p>
						</div>
						<Activity className="w-10 h-10 text-green-500 opacity-20" />
					</div>
				</div>

				<div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600 font-medium">Report Rate</p>
							<p className="text-3xl font-bold text-gray-900 mt-1">
								{performance.reportSubmissionRate.toFixed(1)}%
							</p>
						</div>
						<BarChart3 className="w-10 h-10 text-purple-500 opacity-20" />
					</div>
				</div>

				<div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600 font-medium">Engagement</p>
							<p className="text-3xl font-bold text-gray-900 mt-1">
								{performance.averageEngagementScore.toFixed(0)}/100
							</p>
						</div>
						<TrendingUp className="w-10 h-10 text-orange-500 opacity-20" />
					</div>
				</div>
			</div>

			{/* Team Activity Summary */}
			<div className="bg-white rounded-lg shadow p-6">
				<h2 className="text-lg font-semibold text-gray-900 mb-4">Team Activity Summary</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-6">
					<div>
						<p className="text-sm text-gray-600 font-medium">Personal Reports</p>
						<p className="text-2xl font-bold text-gray-900 mt-2">
							{performance.personalReportsSummary.totalReports}
						</p>
						<p className="text-xs text-gray-500 mt-1">total reports</p>
					</div>

					<div>
						<p className="text-sm text-gray-600 font-medium">Qur&apos;an Study Avg</p>
						<p className="text-2xl font-bold text-gray-900 mt-2">
							{performance.personalReportsSummary.averageQuranStudyDays.toFixed(1)}
						</p>
						<p className="text-xs text-gray-500 mt-1">days per person</p>
					</div>

					<div>
						<p className="text-sm text-gray-600 font-medium">Hadith Read</p>
						<p className="text-2xl font-bold text-gray-900 mt-2">
							{performance.personalReportsSummary.totalHaditsRead}
						</p>
						<p className="text-xs text-gray-500 mt-1">total</p>
					</div>

					<div>
						<p className="text-sm text-gray-600 font-medium">Salah Jamaat Avg</p>
						<p className="text-2xl font-bold text-gray-900 mt-2">
							{performance.personalReportsSummary.averageSalahJamaat.toFixed(1)}/5
						</p>
						<p className="text-xs text-gray-500 mt-1">per person</p>
					</div>

					<div>
						<p className="text-sm text-gray-600 font-medium">Org Work Hours</p>
						<p className="text-2xl font-bold text-gray-900 mt-2">
							{performance.personalReportsSummary.totalOrgWorkHours.toFixed(0)}
						</p>
						<p className="text-xs text-gray-500 mt-1">total hours</p>
					</div>

					<div>
						<p className="text-sm text-gray-600 font-medium">Team Size</p>
						<p className="text-2xl font-bold text-gray-900 mt-2">
							{((performance.activeMembers / performance.totalMembers) * 100).toFixed(0)}%
						</p>
						<p className="text-xs text-gray-500 mt-1">active</p>
					</div>
				</div>
			</div>

			{/* Info Box */}
			<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
				<p className="text-sm text-blue-900">
					💡 Dashboard shows aggregated metrics for your organization and team members. Refresh the page to see latest updates.
				</p>
			</div>
		</div>
	);
}
