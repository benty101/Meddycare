"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Activity,
    Heart,
    Scale,
    AlertTriangle,
    Smile,
    TrendingUp,
    Calendar,
    CheckCircle2
} from "lucide-react";

export default function WellnessReportsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                const headers = { 'Authorization': `Bearer ${token}` };

                const res = await fetch('/api/reports/wellness', { headers });
                if (res.ok) {
                    setData(await res.json());
                }
            } catch (error) {
                console.error("Failed to fetch report data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="p-8 text-center">Loading report...</div>;
    if (!data) return <div className="p-8 text-center">No data available.</div>;

    // Helper for Mood Chart
    const getMoodHeight = (score: number) => {
        return `${(score / 5) * 100}%`;
    };

    const getMoodColor = (score: number) => {
        if (score >= 4) return 'bg-green-400';
        if (score === 3) return 'bg-yellow-400';
        return 'bg-red-400';
    };

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8">
            <div className="flex items-center gap-4">
                <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 font-heading">Wellness Report</h1>
                    <p className="text-gray-500">Health summary for the last 30 days</p>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-pink-50 text-brand-pink rounded-lg">
                            <Smile size={20} />
                        </div>
                        <span className="text-sm font-bold text-gray-500">Avg Mood</span>
                    </div>
                    <div className="flex items-end gap-2">
                        <h3 className="text-3xl font-bold text-gray-900">{data.avgMood.toFixed(1)}</h3>
                        <span className="text-sm text-gray-400 mb-1">/ 5.0</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-red-50 text-red-500 rounded-lg">
                            <Heart size={20} />
                        </div>
                        <span className="text-sm font-bold text-gray-500">Avg BP</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">{data.avgBP}</h3>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-50 text-blue-500 rounded-lg">
                            <Scale size={20} />
                        </div>
                        <span className="text-sm font-bold text-gray-500">Weight Change</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-3xl font-bold text-gray-900">
                            {data.weightTrend.length > 1
                                ? (data.weightTrend[data.weightTrend.length - 1].weight - data.weightTrend[0].weight).toFixed(1)
                                : '0'}
                        </h3>
                        <span className="text-sm text-gray-500">kg</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-orange-50 text-orange-500 rounded-lg">
                            <AlertTriangle size={20} />
                        </div>
                        <span className="text-sm font-bold text-gray-500">Incidents</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">{data.incidentCount}</h3>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Mood Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Mood Trends (Last 7 Days)</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="w-3 h-3 rounded-full bg-green-400"></span> Good
                            <span className="w-3 h-3 rounded-full bg-yellow-400"></span> Neutral
                            <span className="w-3 h-3 rounded-full bg-red-400"></span> Poor
                        </div>
                    </div>

                    <div className="h-64 flex items-end justify-between gap-2 px-4 border-b border-gray-100 pb-2">
                        {data.weeklyMoods.length > 0 ? (
                            data.weeklyMoods.map((item: any, i: number) => (
                                <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                                    <div
                                        className={`w-full max-w-[40px] rounded-t-lg transition-all hover:opacity-80 ${getMoodColor(item.score)}`}
                                        style={{ height: getMoodHeight(item.score) }}
                                    >
                                        <div className="opacity-0 group-hover:opacity-100 absolute -mt-8 bg-black text-white text-xs px-2 py-1 rounded pointer-events-none transition-opacity">
                                            {item.score}/5
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-400 font-medium">
                                        {new Date(item.date).toLocaleDateString('en-GB', { weekday: 'short' })}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                No mood data for the last 7 days
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Incidents */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Incidents</h3>
                    <div className="space-y-4">
                        {data.recentIncidents.length > 0 ? (
                            data.recentIncidents.map((incident: any, i: number) => (
                                <div key={i} className="flex gap-3 items-start p-3 bg-red-50 rounded-xl border border-red-100">
                                    <AlertTriangle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-bold text-gray-900 capitalize">{incident.data.severity} Severity</p>
                                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{incident.data.description}</p>
                                        <p className="text-xs text-gray-400 mt-2">{new Date(incident.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-400">
                                <CheckCircle2 size={32} className="mx-auto mb-2 text-green-500" /> // CheckCircle2 not imported
                                <p>No recent incidents reported.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
