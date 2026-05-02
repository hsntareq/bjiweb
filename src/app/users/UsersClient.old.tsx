'use client';

import { useEffect, useState } from 'react';
import { Loader, User, Search } from 'lucide-react';

interface UserData {
    id: number;
    fullname: string;
    email: string;
    responsibility: string | null;
}

export default function UsersClient({ accessToken = '' }: { accessToken?: string }) {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3001/users', {
                headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
            });
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(Array.isArray(data) ? data : []);
            setError(null);
        } catch (err) {
            console.error('Error fetching users:', err);
            setError('Failed to load users. Ensure API is running.');
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(u => 
        (u.fullname || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.responsibility || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader className="w-12 h-12 animate-spin text-indigo-600 mb-4" />
                <p className="text-gray-600 font-medium">Loading users...</p>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            {error && (
                <div className="p-4 bg-red-50 text-red-800 border-b border-red-200">
                    {error}
                </div>
            )}
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <div className="relative w-72">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                </div>
                <div className="text-sm text-gray-600 font-medium">
                    Total: {filteredUsers.length} users
                </div>
            </div>
            {filteredUsers.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs uppercase tracking-wider">
                                <th className="px-6 py-4 font-semibold">User</th>
                                <th className="px-6 py-4 font-semibold">Email</th>
                                <th className="px-6 py-4 font-semibold">Responsibility</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                                                {(user.fullname || user.email || 'U')[0].toUpperCase()}
                                            </div>
                                            <span className="font-medium text-gray-900">{user.fullname || 'Unknown'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 text-sm">{user.email}</td>
                                    <td className="px-6 py-4">
                                        {user.responsibility ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {user.responsibility}
                                            </span>
                                        ) : (
                                            <span className="text-gray-400 text-xs italic">Unassigned</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="p-12 text-center">
                    <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900">No users found</h3>
                    <p className="text-gray-500 mt-1">Try adjusting your search.</p>
                </div>
            )}
        </div>
    );
}
