export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-heading font-bold text-brand-purple">Admin Dashboard</h1>
                <p className="text-gray-600 mt-1">Platform oversight and management</p>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6">
                <div className="card">
                    <p className="text-sm text-gray-600 mb-1">Total Families</p>
                    <p className="text-3xl font-heading font-bold text-brand-purple">156</p>
                    <p className="text-sm text-green-600 mt-1">+12 this week</p>
                </div>
                <div className="card">
                    <p className="text-sm text-gray-600 mb-1">Active Carers</p>
                    <p className="text-3xl font-heading font-bold text-brand-purple">89</p>
                    <p className="text-sm text-green-600 mt-1">+5 this week</p>
                </div>
                <div className="card">
                    <p className="text-sm text-gray-600 mb-1">Pending Vetting</p>
                    <p className="text-3xl font-heading font-bold text-magenta-500">7</p>
                    <p className="text-sm text-gray-500 mt-1">Requires review</p>
                </div>
                <div className="card">
                    <p className="text-sm text-gray-600 mb-1">Active Placements</p>
                    <p className="text-3xl font-heading font-bold text-brand-purple">42</p>
                    <p className="text-sm text-gray-500 mt-1">In progress</p>
                </div>
            </div>

            {/* Main Sections */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Pending Matching Profiles */}
                <div className="card">
                    <h2 className="text-xl font-heading font-bold text-brand-purple mb-4">
                        Pending Matching Profiles
                    </h2>
                    <p className="text-gray-600 mb-4 text-sm">
                        Review and call families to refine their requirements
                    </p>

                    <div className="space-y-3">
                        {[
                            { name: 'Sarah Williams', type: 'Elderly care - Dementia', date: '2 hours ago', priority: 'high' },
                            { name: 'John Peterson', type: 'Child with special needs', date: '1 day ago', priority: 'medium' },
                            { name: 'Emma Thompson', type: 'Post-surgery care', date: '2 days ago', priority: 'low' },
                        ].map((profile, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">{profile.name}</p>
                                    <p className="text-sm text-gray-600">{profile.type}</p>
                                    <p className="text-xs text-gray-500 mt-1">{profile.date}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {profile.priority === 'high' && (
                                        <span className="badge bg-red-100 text-red-800 text-xs">High Priority</span>
                                    )}
                                    <button className="btn-primary text-sm px-4 py-2">
                                        Review
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Carer Vetting Queue */}
                <div className="card">
                    <h2 className="text-xl font-heading font-bold text-brand-purple mb-4">
                        Carer Vetting Queue
                    </h2>
                    <p className="text-gray-600 mb-4 text-sm">
                        Approve or reject carer applications and track DBS status
                    </p>

                    <div className="space-y-3">
                        {[
                            { name: 'Michael Brown', experience: '8 years', dbs: 'Pending', status: 'review' },
                            { name: 'Rachel Green', experience: '12 years', dbs: 'Verified', status: 'approve' },
                            { name: 'David Lee', experience: '5 years', dbs: 'Pending', status: 'review' },
                        ].map((carer, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-brand-purple-subtle rounded-full"></div>
                                    <div>
                                        <p className="font-medium text-gray-900">{carer.name}</p>
                                        <p className="text-sm text-gray-600">{carer.experience} experience</p>
                                        <span className={`inline-block mt-1 text-xs px-2 py-1 rounded-full ${carer.dbs === 'Verified'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            DBS: {carer.dbs}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700">
                                        ✓
                                    </button>
                                    <button className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700">
                                        ✕
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Manual Matching */}
            <div className="card">
                <h2 className="text-xl font-heading font-bold text-brand-purple mb-4">
                    Manual Matching Suggestions
                </h2>
                <p className="text-gray-600 mb-6 text-sm">
                    Suggest specific carers to families when automated matching needs refinement
                </p>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Family</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Requirements</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Suggested Carer</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Match %</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm">Sarah Williams</td>
                                <td className="px-4 py-3 text-sm text-gray-600">Dementia care, Live-in</td>
                                <td className="px-4 py-3 text-sm">Emma Davies</td>
                                <td className="px-4 py-3 text-sm">
                                    <span className="badge badge-success">95%</span>
                                </td>
                                <td className="px-4 py-3">
                                    <button className="text-sm text-magenta-500 hover:text-magenta-600 font-medium">
                                        Send Match →
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm">John Peterson</td>
                                <td className="px-4 py-3 text-sm text-gray-600">Special needs, Part-time</td>
                                <td className="px-4 py-3 text-sm">Rachel Green</td>
                                <td className="px-4 py-3 text-sm">
                                    <span className="badge badge-purple">88%</span>
                                </td>
                                <td className="px-4 py-3">
                                    <button className="text-sm text-magenta-500 hover:text-magenta-600 font-medium">
                                        Send Match →
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Platform Oversight */}
            <div className="card bg-brand-purple-50">
                <h2 className="text-xl font-heading font-bold text-brand-purple mb-4">
                    Platform Oversight
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-medium text-gray-900 mb-2">Recent Messages (flagged)</h3>
                        <p className="text-sm text-gray-600 mb-3">Monitor conversations for safety and compliance</p>
                        <button className="btn-outline">
                            View Message Log
                        </button>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-900 mb-2">Platform Analytics</h3>
                        <p className="text-sm text-gray-600 mb-3">View conversion rates and user engagement</p>
                        <button className="btn-outline">
                            View Analytics
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
