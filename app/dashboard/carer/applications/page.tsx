"use client";

import { useState, useEffect } from "react";
import { Briefcase, CheckCircle2, XCircle, Clock, Loader2, MapPin } from "lucide-react";

export default function CarerApplicationsPage() {
    const [loading, setLoading] = useState(true);
    const [applications, setApplications] = useState<any[]>([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('/api/applications', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    setApplications(await res.json());
                }
            } catch (error) {
                console.error("Failed to load applications", error);
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-fraunces text-slate-900 mb-2">My Applications</h1>
                    <p className="text-slate-600">Track the status of your job applications</p>
                </div>

                {applications.length > 0 ? (
                    <div className="space-y-4">
                        {applications.map((app: any) => (
                            <div key={app.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="font-fraunces text-lg text-slate-900 mb-2">
                                            {app.careRequest.careType.replace('_', ' ')} Care for {app.careRequest.recipient?.firstName || 'Client'}
                                        </h3>
                                        {app.careRequest.family && (
                                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                                <MapPin className="w-4 h-4" />
                                                <span>{app.careRequest.family.postcode}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase ${app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                                            app.status === 'unsuccessful' ? 'bg-red-100 text-red-700' :
                                                app.status === 'reserved' ? 'bg-amber-100 text-amber-700' :
                                                    'bg-blue-100 text-blue-700'
                                        }`}>
                                        {app.status === 'accepted' && <CheckCircle2 className="w-3 h-3" />}
                                        {app.status === 'unsuccessful' && <XCircle className="w-3 h-3" />}
                                        {app.status === 'applied' && <Clock className="w-3 h-3" />}
                                        <span>{app.status}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm pt-4 border-t border-slate-100">
                                    <span className="text-slate-500">Applied {new Date(app.appliedAt).toLocaleDateString()}</span>
                                    {app.statusChangedAt && app.status !== 'applied' && (
                                        <span className="text-slate-500">
                                            Updated {new Date(app.statusChangedAt).toLocaleDateString()}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-12 text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-fraunces text-slate-900 mb-2">No Applications Yet</h3>
                        <p className="text-slate-500">Start applying to jobs to see your application history here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
