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
    AlertCircle,
    User,
    Activity,
    Pill,
    Heart,
    Phone,
    Video,
    FileText,
    TrendingUp,
    CheckCircle2,
    Bell
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
            <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-(--brand-purple) border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 font-urbanist">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="heading-md text-gray-900">
                                Welcome back, <span className="text-(--brand-purple)">{userName}</span>
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">Manage your care and connect with carers</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <Bell className="w-6 h-6 text-gray-600" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <Link href="/dashboard/family/profile" className="btn-ghost">
                                Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="card-elevated">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-urbanist font-semibold text-gray-600">Active Care</span>
                            <Activity className="w-5 h-5 text-(--brand-purple)" />
                        </div>
                        <p className="text-3xl font-sora font-bold text-gray-900">{activeCarer ? '1' : '0'}</p>
                        <p className="text-xs text-gray-500 mt-1">Current placements</p>
                    </div>

                    <div className="card-elevated">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-urbanist font-semibold text-gray-600">Care Hours</span>
                            <Clock className="w-5 h-5 text-(--brand-purple)" />
                        </div>
                        <p className="text-3xl font-sora font-bold text-gray-900">168</p>
                        <p className="text-xs text-gray-500 mt-1">This week</p>
                    </div>

                    <div className="card-elevated">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-urbanist font-semibold text-gray-600">Messages</span>
                            <MessageSquare className="w-5 h-5 text-(--brand-purple)" />
                        </div>
                        <p className="text-3xl font-sora font-bold text-gray-900">3</p>
                        <p className="text-xs text-gray-500 mt-1">Unread</p>
                    </div>

                    <div className="card-elevated">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-urbanist font-semibold text-gray-600">Satisfaction</span>
                            <Star className="w-5 h-5 text-(--brand-purple)" />
                        </div>
                        <p className="text-3xl font-sora font-bold text-gray-900">4.9</p>
                        <p className="text-xs text-gray-500 mt-1">Average rating</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Active Carer Card */}
                        {activeCarer && (
                            <div className="card-elevated">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="heading-sm text-gray-900">Your Current Carer</h2>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-urbanist font-semibold">
                                        Active
                                    </span>
                                </div>

                                <div className="flex items-start gap-4 mb-6">
                                    <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-purple-100">
                                        <Image
                                            src={activeCarer.avatar || `https://i.pravatar.cc/150?u=${activeCarer.name}`}
                                            alt={activeCarer.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="heading-xs text-gray-900 mb-1">{activeCarer.name}</h3>
                                        <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                {activeCarer.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {activeCarer.experience} years
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                            <span className="text-sm text-gray-600 ml-2">5.0 (24 reviews)</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button className="flex-1 btn-primary flex items-center justify-center gap-2">
                                        <MessageSquare className="w-4 h-4" />
                                        Message
                                    </button>
                                    <button className="flex-1 btn-secondary flex items-center justify-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        Call
                                    </button>
                                    <button className="btn-ghost flex items-center justify-center">
                                        <Video className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Carer Matches */}
                        {matches.length > 0 && (
                            <div className="card-elevated">
                                <h2 className="heading-sm text-gray-900 mb-6">Your Matched Carers</h2>
                                <div className="space-y-4">
                                    {matches.map((match) => (
                                        <div key={match.id} className="p-4 border-2 border-gray-100 rounded-2xl hover:border-(--brand-purple) transition-all">
                                            <div className="flex items-start gap-4">
                                                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                                                    <Image
                                                        src={`https://i.pravatar.cc/150?u=${match.carer.name}`}
                                                        alt={match.carer.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-urbanist font-bold text-gray-900 mb-1">{match.carer.name}</h3>
                                                    <p className="text-sm text-gray-600 mb-2">{match.carer.bio}</p>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                                        <span className="flex items-center gap-1">
                                                            <MapPin className="w-3 h-3" />
                                                            {match.carer.location}
                                                        </span>
                                                        <span>•</span>
                                                        <span>{match.carer.experience} years exp</span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleHire(match.id)}
                                                    disabled={hiringId === match.id}
                                                    className="btn-primary"
                                                >
                                                    {hiringId === match.id ? 'Hiring...' : 'Hire'}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* No Active Care CTA */}
                        {!activeCarer && matches.length === 0 && (
                            <div className="card-elevated text-center py-12">
                                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Heart className="w-10 h-10 text-(--brand-purple)" />
                                </div>
                                <h3 className="heading-sm text-gray-900 mb-3">No Active Care Yet</h3>
                                <p className="body-md text-gray-600 mb-6 max-w-md mx-auto">
                                    Start your journey by requesting care for your loved one. We'll match you with the perfect carer within 24 hours.
                                </p>
                                <Link href="/get-care" className="btn-primary inline-block">
                                    Request Care Now
                                </Link>
                            </div>
                        )}

                        {/* Recent Activity */}
                        <div className="card-elevated">
                            <h2 className="heading-sm text-gray-900 mb-6">Recent Activity</h2>
                            <div className="space-y-4">
                                {careLogs.length > 0 ? (
                                    careLogs.slice(0, 5).map((log, i) => (
                                        <div key={i} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                                <CheckCircle2 className="w-5 h-5 text-(--brand-purple)" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-urbanist font-semibold text-gray-900">{log.activity}</p>
                                                <p className="text-xs text-gray-500 mt-1">{new Date(log.timestamp).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500 py-8">No recent activity</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="card-flat">
                            <h3 className="heading-xs text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <Link href="/dashboard/family/care-plan" className="flex items-center justify-between p-3 hover:bg-purple-50 rounded-xl transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-5 h-5 text-(--brand-purple)" />
                                        <span className="font-urbanist font-medium text-gray-700 group-hover:text-(--brand-purple)">View Care Plan</span>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-(--brand-purple)" />
                                </Link>
                                <Link href="/dashboard/family/messages" className="flex items-center justify-between p-3 hover:bg-purple-50 rounded-xl transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <MessageSquare className="w-5 h-5 text-(--brand-purple)" />
                                        <span className="font-urbanist font-medium text-gray-700 group-hover:text-(--brand-purple)">Messages</span>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-(--brand-purple)" />
                                </Link>
                                <Link href="/dashboard/family/schedule" className="flex items-center justify-between p-3 hover:bg-purple-50 rounded-xl transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-5 h-5 text-(--brand-purple)" />
                                        <span className="font-urbanist font-medium text-gray-700 group-hover:text-(--brand-purple)">Schedule</span>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-(--brand-purple)" />
                                </Link>
                            </div>
                        </div>

                        {/* Support */}
                        <div className="card-flat bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                            <h3 className="heading-xs text-gray-900 mb-3">Need Help?</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Our care advisors are available 24/7 to support you.
                            </p>
                            <a href="tel:01189899970" className="btn-primary w-full text-center flex items-center justify-center gap-2">
                                <Phone className="w-4 h-4" />
                                Call 0118 989 9970
                            </a>
                        </div>

                        {/* Tips */}
                        <div className="card-flat">
                            <h3 className="heading-xs text-gray-900 mb-4">Care Tips</h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-purple-50 rounded-xl">
                                    <p className="text-sm font-urbanist font-semibold text-(--brand-purple) mb-1">
                                        Daily Communication
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        Regular check-ins help build trust and ensure quality care.
                                    </p>
                                </div>
                                <div className="p-3 bg-purple-50 rounded-xl">
                                    <p className="text-sm font-urbanist font-semibold text-(--brand-purple) mb-1">
                                        Care Plan Updates
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        Keep your care plan current as needs change.
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