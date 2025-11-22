"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    Activity,
    Heart,
    Scale,
    AlertTriangle,
    Smile,
    Thermometer,
    FileText
} from "lucide-react";

export default function FamilyHealthPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [recipient, setRecipient] = useState<any>(null);
    const [records, setRecords] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                const headers = { 'Authorization': `Bearer ${token}` };

                // 1. Get Active Recipient
                const reqsRes = await fetch('/api/care-requests', { headers });
                if (reqsRes.ok) {
                    const reqs = await reqsRes.json();
                    const activeReq = reqs.find((r: any) => r.status === 'matched' || r.status === 'completed');

                    if (activeReq) {
                        setRecipient(activeReq.recipient);

                        // 2. Fetch Health Records
                        const recordsRes = await fetch(`/api/health-records?recipientId=${activeReq.recipient.id}`, { headers });
                        if (recordsRes.ok) {
                            const data = await recordsRes.json();
                            setRecords(data);
                        }
                    }
                }
            } catch (error) {
                console.error("Failed to fetch health data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (!recipient) return <div className="p-8 text-center">No active care recipient found.</div>;

    // Filter records by type
    const vitals = records.filter(r => r.recordType === 'vital_signs');
    const weights = records.filter(r => r.recordType === 'weight');
    const moods = records.filter(r => r.recordType === 'wellness' || (r.data && r.data.mood));

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 font-heading">Health & Wellness</h1>
                        <p className="text-gray-500">Tracking health trends for {recipient.firstName}</p>
                    </div>
                </div>
                <Link href="/dashboard/family/reports" className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
                    <FileText size={20} />
                    View Wellness Report
                </Link>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                            <Heart size={20} />
                        </div>
                        <h3 className="font-bold text-gray-900">Latest Vitals</h3>
                    </div>
                    {vitals.length > 0 ? (
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{vitals[0].data.systolic}/{vitals[0].data.diastolic}</p>
                            <p className="text-xs text-gray-500">BP • {new Date(vitals[0].recordedAt).toLocaleDateString()}</p>
                            <div className="mt-2 flex gap-3 text-sm">
                                <span className="flex items-center gap-1 text-gray-600"><Activity size={14} /> {vitals[0].data.heartRate} bpm</span>
                                <span className="flex items-center gap-1 text-gray-600"><Thermometer size={14} /> {vitals[0].data.temperature}°C</span>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">No vitals recorded yet.</p>
                    )}
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <Scale size={20} />
                        </div>
                        <h3 className="font-bold text-gray-900">Weight Tracking</h3>
                    </div>
                    {weights.length > 0 ? (
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{weights[0].data.weight} kg</p>
                            <p className="text-xs text-gray-500">Recorded {new Date(weights[0].recordedAt).toLocaleDateString()}</p>
                            {weights.length > 1 && (
                                <p className={`text-xs font-bold mt-1 ${weights[0].data.weight > weights[1].data.weight ? 'text-red-500' : 'text-green-500'}`}>
                                    {weights[0].data.weight > weights[1].data.weight ? '↑' : '↓'} {Math.abs(weights[0].data.weight - weights[1].data.weight).toFixed(1)} kg since last
                                </p>
                            )}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">No weight records yet.</p>
                    )}
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
                            <Smile size={20} />
                        </div>
                        <h3 className="font-bold text-gray-900">Recent Mood</h3>
                    </div>
                    {moods.length > 0 ? (
                        <div>
                            <p className="text-2xl font-bold text-gray-900 capitalize">{moods[0].data.mood}</p>
                            <p className="text-xs text-gray-500">Recorded {new Date(moods[0].recordedAt).toLocaleDateString()}</p>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">No mood records yet.</p>
                    )}
                </div>
            </div>

            {/* Recent History List */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6 font-heading">Recent Health History</h3>
                <div className="space-y-4">
                    {records.map((record) => (
                        <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${record.recordType === 'vital_signs' ? 'bg-red-100 text-red-600' :
                                    record.recordType === 'weight' ? 'bg-blue-100 text-blue-600' :
                                        record.recordType === 'incident' ? 'bg-orange-100 text-orange-600' :
                                            'bg-gray-100 text-gray-600'
                                    }`}>
                                    {record.recordType === 'vital_signs' ? <Heart size={20} /> :
                                        record.recordType === 'weight' ? <Scale size={20} /> :
                                            record.recordType === 'incident' ? <AlertTriangle size={20} /> :
                                                <Activity size={20} />}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 capitalize">{record.recordType.replace('_', ' ')}</p>
                                    <p className="text-xs text-gray-500">Recorded by {record.recordedBy} • {new Date(record.recordedAt).toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                {record.recordType === 'vital_signs' && (
                                    <p className="text-sm font-bold text-gray-900">
                                        BP: {record.data.systolic}/{record.data.diastolic} | HR: {record.data.heartRate}
                                    </p>
                                )}
                                {record.recordType === 'weight' && (
                                    <p className="text-sm font-bold text-gray-900">{record.data.weight} kg</p>
                                )}
                                {record.recordType === 'incident' && (
                                    <p className="text-sm font-bold text-orange-600">{record.data.description}</p>
                                )}
                            </div>
                        </div>
                    ))}
                    {records.length === 0 && (
                        <p className="text-center text-gray-500 py-8">No health records found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
