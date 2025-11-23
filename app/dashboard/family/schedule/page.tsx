"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, User, Loader2 } from "lucide-react";

export default function FamilySchedulePage() {
    const [loading, setLoading] = useState(true);
    const [logs, setLogs] = useState<any[]>([]);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('/api/care-logs', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    setLogs(await res.json());
                }
            } catch (error) {
                console.error("Failed to load schedule", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    const groupLogsByDate = (logs: any[]) => {
        const grouped: { [key: string]: any[] } = {};
        logs.forEach(log => {
            const date = new Date(log.logDate).toLocaleDateString();
            if (!grouped[date]) grouped[date] = [];
            grouped[date].push(log);
        });
        return grouped;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
        );
    }

    const groupedLogs = groupLogsByDate(logs);

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-fraunces text-slate-900 mb-2">Care Schedule & History</h1>
                    <p className="text-slate-600">View daily care activities and schedules</p>
                </div>

                {logs.length > 0 ? (
                    <div className="space-y-6">
                        {Object.entries(groupedLogs).map(([date, dateLogs]) => (
                            <div key={date} className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
                                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <h2 className="text-xl font-fraunces text-slate-900">{date}</h2>
                                </div>

                                {dateLogs.map((log: any, idx: number) => (
                                    <div key={idx} className="space-y-4">
                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                            <User className="w-4 h-4" />
                                            <span className="font-medium">Carer on duty</span>
                                        </div>

                                        {log.activities && (
                                            <div>
                                                <h4 className="font-bold text-slate-700 mb-2">Activities</h4>
                                                {Object.entries(log.activities).map(([time, acts]: [string, any]) => (
                                                    <div key={time} className="ml-4 mb-2">
                                                        <p className="text-sm font-medium text-purple-600 capitalize">{time}</p>
                                                        <ul className="list-disc list-inside text-sm text-slate-600">
                                                            {acts.map((activity: string, i: number) => (
                                                                <li key={i}>{activity}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {log.mood && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-slate-700">Mood:</span>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${log.mood === 'excellent' ? 'bg-green-100 text-green-700' :
                                                        log.mood === 'good' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-slate-100 text-slate-700'
                                                    }`}>
                                                    {log.mood}
                                                </span>
                                            </div>
                                        )}

                                        {log.notes && (
                                            <div className="bg-slate-50 rounded-xl p-4">
                                                <p className="text-sm text-slate-700">{log.notes}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-12 text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-fraunces text-slate-900 mb-2">No Schedule Yet</h3>
                        <p className="text-slate-500">Care logs and schedules will appear here once care begins.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
