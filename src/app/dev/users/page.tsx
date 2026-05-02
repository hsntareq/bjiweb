import DevUsersClient from './DevUsersClient';

export default function DevUsersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 bg-yellow-100 border border-yellow-300 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            <span>🛠</span> DEV ONLY — Public Page
          </div>
          <h1 className="text-2xl font-bold text-gray-900">All Users</h1>
          <p className="text-gray-500 text-sm mt-1">Development view — no authentication required</p>
        </div>
        <DevUsersClient />
      </div>
    </div>
  );
}
