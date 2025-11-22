"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Briefcase,
    Clock,
    MapPin,
    ChevronRight,
    Star,
    TrendingUp,
    CheckCircle2,
    XCircle,
    Activity,
    Pill
} from "lucide-react";

export default function CarerDashboard() {
    const [applications, setApplications] = useState<any[]>([]);
    const [jobs, setJobs] = useState<any[]>([]);
    const [stats, setStats] = useState({
        activeApplications: 0,
        hours: 0,
        earnings: 0,
        rating: 0,
        activePlacements: 0
    });
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState<string>("Carer");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const headers = { 'Authorization': `Bearer ${token}` };

                // Fetch Applications
                const appsRes = await fetch('/api/applications', { headers });
                if (appsRes.ok) {
                    const appsData = await appsRes.json();
                    setApplications(appsData);
                    setStats((prev: any) => ({ ...prev, activeApplications: appsData.length }));
                }

                // Fetch Jobs
                const jobsRes = await fetch('/api/jobs', { headers });
                if (jobsRes.ok) {
                    const jobsData = await jobsRes.json();
                    setJobs(jobsData);
                }
                // Fetch Profile
                const profileRes = await fetch('/api/user/profile', { headers });
                if (profileRes.ok) {
                    const profile = await profileRes.json();
                    setUserName(profile.firstName || "Carer");

                    setStats((prev: any) => ({
                        ...prev,
                        rating: profile.avgRating || 0,
                        hours: profile.stats?.hours || 0,
                        earnings: profile.stats?.earnings || 0
                    }));
                }

            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-brand-purple font-heading">Welcome back, {userName}! 👋</h1>
                    <p className="text-gray-600 mt-1">You have {jobs.length} new job matches today.</p>
                </div>
                <div className="flex gap-3">
                    <div className="px-4 py-2 bg-white rounded-full border border-gray-200 flex items-center gap-2 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-sm font-bold text-gray-700">Status: Available</span>
                    </div>
                </div>
            </div>

            {/* Active Placement Card */}
            {stats.activePlacements > 0 && (
                <div className="bg-white p-6 rounded-3xl border border-green-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-8 -mt-8 z-0"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 border-4 border-white shadow-sm">
                                <Briefcase size={32} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Active Placement</h2>
                                <p className="text-gray-600">You have an ongoing care placement.</p>
                            </div>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto flex-wrap justify-end">
                            <Link href="/dashboard/carer/care-plan" className="flex-1 md:flex-none px-4 py-2 bg-brand-purple text-white font-bold rounded-xl hover:bg-brand-purple-light transition-colors text-center shadow-lg shadow-purple-200 text-sm">
                                Care Plan
                            </Link>
                            <Link href="/dashboard/carer/health" className="flex-1 md:flex-none px-4 py-2 bg-white border border-gray-200 text-brand-purple font-bold rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm">
                                <Activity size={16} />
                                Health
                            </Link>
                            <Link href="/dashboard/carer/medications" className="flex-1 md:flex-none px-4 py-2 bg-white border border-gray-200 text-blue-600 font-bold rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm">
                                <Pill size={16} />
                                Meds
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-brand-purple">
                            <Briefcase size={20} />
                        </div>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">Active</span>
                    </div>
                    <p className="text-gray-500 text-sm font-medium">Active Applications</p>
                    <h3 className="text-2xl font-bold text-gray-900">{stats.activeApplications}</h3>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <Clock size={20} />
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm font-medium">Hours This Week</p>
                    <h3 className="text-2xl font-bold text-gray-900">{stats.hours}</h3>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-brand-pink">
                            <TrendingUp size={20} />
                        </div>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
                    </div>
                    <p className="text-gray-500 text-sm font-medium">Total Earnings</p>
                    <h3 className="text-2xl font-bold text-gray-900">£{stats.earnings}</h3>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
                            <Star size={20} />
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm font-medium">Rating</p>
                    <h3 className="text-2xl font-bold text-gray-900">4.9/5.0</h3>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Job Matches */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900 font-heading">Recommended Jobs</h2>
                        <Link href="/dashboard/carer/jobs" className="text-sm font-bold text-brand-purple hover:text-brand-pink transition-colors">
                            View All
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {loading ? (
                            <div className="bg-white p-10 rounded-2xl border border-gray-100 text-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-purple mx-auto"></div>
                            </div>
                        ) : jobs.length > 0 ? (
                            jobs.map((job: any) => (
                                <div key={job.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group cursor-pointer">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900 group-hover:text-brand-purple transition-colors">
                                                {job.careType.replace('_', ' ')} Care for {job.recipient.firstName}
                                            </h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                                <MapPin size={14} />
                                                <span>{job.family?.postcode || 'Location hidden'}, UK</span>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 bg-purple-50 text-brand-purple text-sm font-bold rounded-lg">
                                            £{job.budgetMin} - £{job.budgetMax}/wk
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {job.recipient.medicalConditions.split(',').map((condition: string, i: number) => (
                                            <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">
                                                {condition.trim()}
                                            </span>
                                        ))}
                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium capitalize">
                                            {job.scheduleType.replace('_', ' ')}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                                        <span className="text-xs text-gray-400">Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                                        <button className="text-sm font-bold text-brand-purple hover:text-brand-pink transition-colors">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white p-10 rounded-2xl border border-gray-100 text-center text-gray-500">
                                No jobs found matching your criteria.
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Widgets */}
                <div className="space-y-8">
                    {/* Application Status */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 font-heading">Application Tracker</h3>
                        <div className="space-y-6 relative">
                            {/* Vertical Line */}
                            <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-gray-100"></div>

                            {applications.length > 0 ? (
                                applications.slice(0, 3).map((app: any) => (
                                    <div key={app.id} className="relative flex gap-4">
                                        <div className={`w-7 h-7 rounded-full border-2 border-white shadow-sm flex items-center justify-center z-10 ${app.status === 'accepted' ? 'bg-green-100 text-green-600' :
                                            app.status === 'unsuccessful' ? 'bg-red-100 text-red-600' :
                                                'bg-yellow-100 text-yellow-600'
                                            }`}>
                                            {app.status === 'accepted' ? <CheckCircle2 size={14} /> :
                                                app.status === 'unsuccessful' ? <XCircle size={14} /> :
                                                    <Clock size={14} />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900 capitalize">{app.status.replace('_', ' ')}</p>
                                            <p className="text-xs text-gray-500">
                                                {app.careRequest.recipient.firstName} • {new Date(app.appliedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="relative flex gap-4">
                                    <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white shadow-sm flex items-center justify-center z-10">
                                        <Briefcase size={14} className="text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">No active applications</p>
                                        <p className="text-xs text-gray-500">Apply to jobs to see status here</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <Link href="/dashboard/carer/applications" className="block w-full mt-6 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors text-center">
                            View All Applications
                        </Link>
                    </div>

                    {/* Carer Resources */}
                    <div className="bg-brand-purple rounded-3xl p-6 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8"></div>
                        <div className="relative z-10">
                            <h3 className="text-lg font-bold mb-4 font-heading">Carer Academy</h3>
                            <p className="text-sm text-white/80 mb-4">
                                Enhance your skills with our latest training modules on Dementia Care.
                            </p>
                            <button className="w-full py-2.5 bg-white text-brand-purple font-bold rounded-xl text-sm hover:bg-gray-50 transition-colors">
                                Start Learning
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
