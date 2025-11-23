"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Calendar,
    Clock,
    MapPin,
    ChevronRight,
    Star,
    MessageSquare,
    Activity,
    Heart,
    Phone,
    Video,
    FileText,
    CheckCircle2,
    Bell,
    Sparkles
} from "lucide-react";

export default function FamilyDashboard() {
    const [activeRequest, setActiveRequest] = useState<any>(null);
    const [matches, setMatches] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [hiringId, setHiringId] = useState<string | null>(null);
    const [careLogs, setCareLogs] = useState<any[]>([]);
    const [userName, setUserName] = useState<string>("Family");
    const [activeCarer, setActiveCarer] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setLoading(false);
                    return;
                }

                const headers = { 'Authorization': `Bearer ${token}` };

                const [requestsRes, logsRes, profileRes] = await Promise.all([
                    fetch('/api/care-requests', { headers }),
                    fetch('/api/care-logs', { headers }),
                    fetch('/api/user/profile', { headers })
                ]);

                if (profileRes.ok) {
                    const profile = await profileRes.json();
                    setUserName(profile.firstName || "Family");
                }

                if (requestsRes.ok) {
                    const data = await requestsRes.json();
                    if (data.length > 0) {
                        const request = data[0];
                        setActiveRequest(request);

                        if (request.status === 'matching') {
                            const matchesRes = await fetch(`/api/care-requests/${request.id}/matches`, { headers });
                            if (matchesRes.ok) {
                                setMatches(await matchesRes.json());
                            }
                        }

                        if (request.status === 'active' && request.carerMatch) {
                            setActiveCarer(request.carerMatch);
                        }
                    }
                }

                if (logsRes.ok) {
                    setCareLogs(await logsRes.json());
                }

            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleHire = async (matchId: string) => {
        if (!confirm("Are you sure you want to hire this carer?")) return;

        setHiringId(matchId);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`/api/matches/${matchId}/hire`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                alert("Carer hired successfully!");
                window.location.reload();
            } else {
                alert("Failed to hire carer.");
            }
        } catch (error) {
            console.error("Hire error", error);
            alert("An error occurred.");
        } finally {
            setHiringId(null);
        }
    };

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
                            <p className="text-sm text-slate-500 font-urbanist mt-0.5">Manage your care and connect with carers</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="relative p-2 hover:bg-slate-50 rounded-full transition-colors">
                                <Bell className="w-6 h-6 text-slate-400 hover:text-purple-600 transition-colors" />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>
                            <div className="h-8 w-px bg-slate-200"></div>
                            <Link href="/dashboard/family/profile" className="flex items-center gap-3 hover:bg-slate-50 pl-2 pr-4 py-1.5 rounded-full transition-all border border-transparent hover:border-slate-100">
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
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Active Care</span>
                            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Activity className="w-5 h-5 text-purple-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-fraunces text-slate-900">{activeCarer ? '1' : '0'}</p>
                        <p className="text-sm text-slate-500 mt-1 font-urbanist">Current placements</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Care Hours</span>
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Clock className="w-5 h-5 text-blue-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-fraunces text-slate-900">168</p>
                        <p className="text-sm text-slate-500 mt-1 font-urbanist">This week</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Messages</span>
                            <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <MessageSquare className="w-5 h-5 text-pink-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-fraunces text-slate-900">3</p>
                        <p className="text-sm text-slate-500 mt-1 font-urbanist">Unread conversations</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Satisfaction</span>
                            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Star className="w-5 h-5 text-amber-500" />
                            </div>
                        </div>
                        <p className="text-3xl font-fraunces text-slate-900">4.9</p>
                        <p className="text-sm text-slate-500 mt-1 font-urbanist">Average rating</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Active Carer Card */}
                        {activeCarer && (
                            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                                <div className="p-8 border-b border-slate-50">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-fraunces text-slate-900">Your Current Carer</h2>
                                        <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                            Active
                                        </span>
                                    </div>

                                    <div className="flex items-start gap-6">
                                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-lg ring-4 ring-white">
                                            <Image
                                                src={activeCarer.avatar || `https://i.pravatar.cc/150?u=${activeCarer.name}`}
                                                alt={activeCarer.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-fraunces text-slate-900 mb-2">{activeCarer.name}</h3>
                                            <div className="flex flex-wrap gap-4 text-sm text-slate-500 font-medium mb-4">
                                                <span className="flex items-center gap-1.5">
                                                    <MapPin className="w-4 h-4 text-purple-500" />
                                                    {activeCarer.location}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Clock className="w-4 h-4 text-purple-500" />
                                                    {activeCarer.experience} years exp
                                                </span>
                                                <span className="flex items-center gap-1.5 text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                                                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                                                    5.0 (24 reviews)
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-slate-50/50 flex gap-4">
                                    <button className="flex-1 btn-primary py-3 px-4 shadow-lg shadow-purple-200 flex items-center justify-center gap-2">
                                        <MessageSquare className="w-4 h-4" />
                                        Message
                                    </button>
                                    <button className="flex-1 py-3 px-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        Call
                                    </button>
                                    <button className="w-12 h-12 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center">
                                        <Video className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Carer Matches */}
                        {matches.length > 0 && (
                            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-xl font-fraunces text-slate-900">Your Matched Carers</h2>
                                    <Link href="/families/matches" className="text-sm font-bold text-purple-600 hover:text-purple-700">
                                        View All Matches
                                    </Link>
                                </div>
                                <div className="space-y-4">
                                    {matches.map((match) => (
                                        <div key={match.id} className="p-6 border border-slate-100 rounded-2xl hover:border-purple-200 hover:shadow-md transition-all group bg-slate-50/30">
                                            <div className="flex items-start gap-5">
                                                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                                    <Image
                                                        src={`https://i.pravatar.cc/150?u=${match.carer.name}`}
                                                        alt={match.carer.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="font-fraunces text-lg text-slate-900 group-hover:text-purple-700 transition-colors">{match.carer.name}</h3>
                                                            <p className="text-sm text-slate-500 line-clamp-1 mb-2">{match.carer.bio}</p>
                                                        </div>
                                                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg">
                                                            98% Match
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-4 text-xs text-slate-500 font-medium mb-4">
                                                        <span className="flex items-center gap-1">
                                                            <MapPin className="w-3 h-3" />
                                                            {match.carer.location}
                                                        </span>
                                                        <span>•</span>
                                                        <span>{match.carer.experience} years exp</span>
                                                    </div>

                                                    <button
                                                        onClick={() => handleHire(match.id)}
                                                        disabled={hiringId === match.id}
                                                        className="w-full sm:w-auto px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-purple-600 transition-colors shadow-lg shadow-slate-200 hover:shadow-purple-200"
                                                    >
                                                        {hiringId === match.id ? 'Processing...' : 'Interview & Hire'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* No Active Care CTA */}
                        {!activeCarer && matches.length === 0 && (
                            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-12 text-center relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"></div>
                                <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                                    <Sparkles className="w-10 h-10 text-purple-600" />
                                </div>
                                <h3 className="text-2xl font-fraunces text-slate-900 mb-4">Find your perfect carer today</h3>
                                <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto font-urbanist">
                                    Start your journey by requesting care for your loved one. We'll match you with the perfect carer within 24 hours.
                                </p>
                                <Link href="/get-care" className="btn-primary inline-flex items-center gap-2 px-8 py-4 shadow-xl shadow-purple-200 hover:scale-105 transform duration-200">
                                    Start Care Assessment <ChevronRight className="w-5 h-5" />
                                </Link>
                            </div>
                        )}

                        {/* Recent Activity */}
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                            <h2 className="text-xl font-fraunces text-slate-900 mb-6">Recent Activity</h2>
                            <div className="space-y-6">
                                {careLogs.length > 0 ? (
                                    careLogs.slice(0, 5).map((log, i) => (
                                        <div key={i} className="flex items-start gap-4 pb-6 border-b border-slate-50 last:border-0 last:pb-0">
                                            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0 border border-purple-100">
                                                <CheckCircle2 className="w-5 h-5 text-purple-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-base font-bold text-slate-900">{log.activity}</p>
                                                <p className="text-xs text-slate-500 mt-1 font-medium uppercase tracking-wide">{new Date(log.timestamp).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Clock className="w-6 h-6 text-slate-300" />
                                        </div>
                                        <p className="text-slate-500 font-medium">No recent activity to show</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Quick Actions</h3>
                            <div className="space-y-2">
                                <Link href="/dashboard/family/care-plan" className="flex items-center justify-between p-4 hover:bg-purple-50 rounded-2xl transition-colors group border border-transparent hover:border-purple-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-white transition-colors">
                                            <FileText className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <span className="font-bold text-slate-700 group-hover:text-purple-700">View Care Plan</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-purple-400" />
                                </Link>
                                <Link href="/dashboard/family/messages" className="flex items-center justify-between p-4 hover:bg-purple-50 rounded-2xl transition-colors group border border-transparent hover:border-purple-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center group-hover:bg-white transition-colors">
                                            <MessageSquare className="w-4 h-4 text-pink-600" />
                                        </div>
                                        <span className="font-bold text-slate-700 group-hover:text-purple-700">Messages</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-purple-400" />
                                </Link>
                                <Link href="/dashboard/family/schedule" className="flex items-center justify-between p-4 hover:bg-purple-50 rounded-2xl transition-colors group border border-transparent hover:border-purple-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center group-hover:bg-white transition-colors">
                                            <Calendar className="w-4 h-4 text-amber-600" />
                                        </div>
                                        <span className="font-bold text-slate-700 group-hover:text-purple-700">Schedule</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-purple-400" />
                                </Link>
                            </div>
                        </div>

                        {/* Support */}
                        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-purple-200">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                            <div className="relative z-10">
                                <h3 className="text-lg font-fraunces mb-3">Need Help?</h3>
                                <p className="text-purple-100 text-sm mb-6 leading-relaxed">
                                    Our care advisors are available 24/7 to support you with any questions.
                                </p>
                                <a href="tel:01189899970" className="w-full py-3 bg-white text-purple-700 font-bold rounded-xl hover:bg-purple-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
                                    <Phone className="w-4 h-4" />
                                    Call Support
                                </a>
                            </div>
                        </div>

                        {/* Tips */}
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Care Tips</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-sm font-bold text-purple-700 mb-1">
                                        Daily Communication
                                    </p>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                        Regular check-ins help build trust and ensure quality care for your loved one.
                                    </p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-sm font-bold text-purple-700 mb-1">
                                        Care Plan Updates
                                    </p>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                        Keep your care plan current as needs change to ensure the best support.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}