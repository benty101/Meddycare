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
    Pill,
    Sparkles,
    Bell,
    ShieldCheck
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

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600 font-urbanist font-medium">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Header */}
            <div className="bg-white border-b border-slate-100 sticky top-0 z-20 shadow-sm/50 backdrop-blur-xl bg-white/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-fraunces text-slate-900">
                                Welcome back, <span className="text-purple-600">{userName}</span>
                            </h1>
                            <p className="text-sm text-slate-500 font-urbanist mt-0.5">You have {jobs.length} new job matches today.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-100">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-xs font-bold uppercase tracking-wide">Available</span>
                            </div>
                            <button className="relative p-2 hover:bg-slate-50 rounded-full transition-colors">
                                <Bell className="w-6 h-6 text-slate-400 hover:text-purple-600 transition-colors" />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>
                            <div className="h-8 w-px bg-slate-200"></div>
                            <Link href="/dashboard/carer/profile" className="flex items-center gap-3 hover:bg-slate-50 pl-2 pr-4 py-1.5 rounded-full transition-all border border-transparent hover:border-slate-100">
                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold text-sm">
                                    {userName.charAt(0)}
                                </div>
                                <span className="text-sm font-bold text-slate-700 hidden sm:block">My Profile</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Active Placement Card */}
                {stats.activePlacements > 0 && (
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden mb-8 group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full -mr-16 -mt-16 z-0 transition-transform group-hover:scale-110 duration-700"></div>
                        <div className="relative z-10 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 shadow-sm ring-4 ring-white">
                                    <Briefcase size={32} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-fraunces text-slate-900 mb-1">Active Placement</h2>
                                    <p className="text-slate-600 font-medium">You have an ongoing care placement.</p>
                                </div>
                            </div>
                            <div className="flex gap-3 w-full md:w-auto flex-wrap justify-end">
                                <Link href="/dashboard/carer/care-plan" className="flex-1 md:flex-none px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-purple-600 transition-colors text-center shadow-lg shadow-slate-200 hover:shadow-purple-200 text-sm">
                                    View Care Plan
                                </Link>
                                <Link href="/dashboard/carer/health" className="flex-1 md:flex-none px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 text-sm">
                                    <Activity size={16} className="text-purple-500" />
                                    Health
                                </Link>
                                <Link href="/dashboard/carer/medications" className="flex-1 md:flex-none px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 text-sm">
                                    <Pill size={16} className="text-blue-500" />
                                    Meds
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                                <Briefcase size={20} />
                            </div>
                            <span className="text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full uppercase tracking-wide">Active</span>
                        </div>
                        <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Applications</p>
                        <h3 className="text-3xl font-fraunces text-slate-900">{stats.activeApplications}</h3>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                <Clock size={20} />
                            </div>
                        </div>
                        <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Hours This Week</p>
                        <h3 className="text-3xl font-fraunces text-slate-900">{stats.hours}</h3>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 group-hover:scale-110 transition-transform">
                                <TrendingUp size={20} />
                            </div>
                            <span className="text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full uppercase tracking-wide">+12%</span>
                        </div>
                        <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Total Earnings</p>
                        <h3 className="text-3xl font-fraunces text-slate-900">£{stats.earnings}</h3>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                                <Star size={20} />
                            </div>
                        </div>
                        <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Rating</p>
                        <h3 className="text-3xl font-fraunces text-slate-900">4.9<span className="text-lg text-slate-400 font-urbanist">/5.0</span></h3>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Job Matches */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-fraunces text-slate-900">Recommended Jobs</h2>
                            <Link href="/dashboard/carer/jobs" className="text-sm font-bold text-purple-600 hover:text-purple-700 transition-colors">
                                View All Jobs
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {loading ? (
                                <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                                </div>
                            ) : jobs.length > 0 ? (
                                jobs.map((job: any) => (
                                    <div key={job.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all group cursor-pointer relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="font-fraunces text-lg text-slate-900 group-hover:text-purple-700 transition-colors mb-1">
                                                        {job.careType.replace('_', ' ')} Care for {job.recipient.firstName}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                                                        <MapPin size={14} className="text-purple-500" />
                                                        <span>{job.family?.postcode || 'Location hidden'}, UK</span>
                                                    </div>
                                                </div>
                                                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-bold rounded-lg shadow-sm">
                                                    £{job.budgetMin} - £{job.budgetMax}/wk
                                                </span>
                                            </div>

                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {job.recipient.medicalConditions.split(',').map((condition: string, i: number) => (
                                                    <span key={i} className="px-2.5 py-1 bg-slate-50 text-slate-600 text-xs rounded-md font-bold border border-slate-100">
                                                        {condition.trim()}
                                                    </span>
                                                ))}
                                                <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs rounded-md font-bold border border-blue-100 capitalize">
                                                    {job.scheduleType.replace('_', ' ')}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                                <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                                                <button className="text-sm font-bold text-slate-900 group-hover:text-purple-600 transition-colors flex items-center gap-1">
                                                    View Details <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Briefcase className="w-8 h-8 text-slate-300" />
                                    </div>
                                    <h3 className="text-lg font-fraunces text-slate-900 mb-2">No jobs found</h3>
                                    <p className="text-slate-500">We couldn't find any jobs matching your criteria right now.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar Widgets */}
                    <div className="space-y-8">
                        {/* Application Status */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Application Tracker</h3>
                            <div className="space-y-6 relative">
                                {/* Vertical Line */}
                                <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-slate-100"></div>

                                {applications.length > 0 ? (
                                    applications.slice(0, 3).map((app: any) => (
                                        <div key={app.id} className="relative flex gap-4 group">
                                            <div className={`w-7 h-7 rounded-full border-2 border-white shadow-sm flex items-center justify-center z-10 transition-transform group-hover:scale-110 ${app.status === 'accepted' ? 'bg-green-100 text-green-600' :
                                                app.status === 'unsuccessful' ? 'bg-red-100 text-red-600' :
                                                    'bg-amber-100 text-amber-600'
                                                }`}>
                                                {app.status === 'accepted' ? <CheckCircle2 size={14} /> :
                                                    app.status === 'unsuccessful' ? <XCircle size={14} /> :
                                                        <Clock size={14} />}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 capitalize">{app.status.replace('_', ' ')}</p>
                                                <p className="text-xs text-slate-500 font-medium">
                                                    {app.careRequest.recipient.firstName} • {new Date(app.appliedAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="relative flex gap-4">
                                        <div className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center z-10">
                                            <Briefcase size={14} className="text-slate-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">No active applications</p>
                                            <p className="text-xs text-slate-500">Apply to jobs to see status here</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <Link href="/dashboard/carer/applications" className="block w-full mt-8 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors text-center">
                                View All Applications
                            </Link>
                        </div>

                        {/* Carer Resources */}
                        <div className="bg-gradient-to-br from-purple-900 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-10 -mt-10 blur-3xl"></div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/10">
                                    <ShieldCheck className="w-6 h-6 text-purple-300" />
                                </div>
                                <h3 className="text-xl font-fraunces mb-3">Carer Academy</h3>
                                <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                                    Enhance your skills with our latest training modules on Dementia Care.
                                </p>
                                <button className="w-full py-3 bg-white text-slate-900 font-bold rounded-xl text-sm hover:bg-purple-50 transition-colors shadow-lg">
                                    Start Learning
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
