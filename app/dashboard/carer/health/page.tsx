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
    Thermometer,
    Plus,
    Save,
    X
} from "lucide-react";

export default function CarerHealthPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [recipientId, setRecipientId] = useState<string | null>(null);
    const [records, setRecords] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState('log'); // log or history
    const [logType, setLogType] = useState('vital_signs'); // vital_signs, weight, mood, incident

    // Form States
    const [vitals, setVitals] = useState({ systolic: '', diastolic: '', heartRate: '', temperature: '' });
    const [weight, setWeight] = useState('');
    const [mood, setMood] = useState('good');
    const [incident, setIncident] = useState({ description: '', severity: 'low' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                const headers = { 'Authorization': `Bearer ${token}` };

                const profileRes = await fetch('/api/user/profile', { headers });
                if (profileRes.ok) {
                    const profile = await profileRes.json();
                    if (profile.stats?.activeRecipientId) {
                        setRecipientId(profile.stats.activeRecipientId);

                        const recordsRes = await fetch(`/api/health-records?recipientId=${profile.stats.activeRecipientId}`, { headers });
                        if (recordsRes.ok) {
                            setRecords(await recordsRes.json());
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

    const handleSubmit = async () => {
        if (!recipientId) return;
        setSubmitting(true);

        let data: any = {};
        if (logType === 'vital_signs') data = vitals;
        else if (logType === 'weight') data = { weight: parseFloat(weight) };
        else if (logType === 'mood') data = { mood }; // Note: API expects 'wellness' or generic type, let's use 'wellness' for mood
        else if (logType === 'incident') data = incident;

        // Map 'mood' logType to 'wellness' recordType if needed, or just use 'wellness'
        // My API supports: vital_signs, weight, medication, incident, wellness
        const recordType = logType === 'mood' ? 'wellness' : logType;

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/health-records', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    recipientId,
                    recordType,
                    data,
                    recordedAt: new Date()
                })
            });

            if (res.ok) {
                alert("Record saved successfully!");
                // Refresh records
                const recordsRes = await fetch(`/api/health-records?recipientId=${recipientId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (recordsRes.ok) {
                    setRecords(await recordsRes.json());
                }
                setActiveTab('history');
                // Reset forms
                setVitals({ systolic: '', diastolic: '', heartRate: '', temperature: '' });
                setWeight('');
                setMood('good');
                setIncident({ description: '', severity: 'low' });
            } else {
                alert("Failed to save record.");
            }
        } catch (error) {
            console.error("Save error", error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (!recipientId) return <div className="p-8 text-center">No active placement found. You must have an active placement to log health data.</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 font-heading">Health Logging</h1>
                    <p className="text-gray-500">Record vitals and wellness updates</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit">
                <button
                    onClick={() => setActiveTab('log')}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'log' ? 'bg-white text-brand-purple shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Log New Entry
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'history' ? 'bg-white text-brand-purple shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    History
                </button>
            </div>

            {activeTab === 'log' ? (
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    {/* Log Type Selection */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                        <button
                            onClick={() => setLogType('vital_signs')}
                            className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${logType === 'vital_signs' ? 'border-brand-purple bg-purple-50 text-brand-purple' : 'border-gray-100 hover:border-gray-200 text-gray-600'}`}
                        >
                            <Heart size={24} />
                            <span className="font-bold text-sm">Vitals</span>
                        </button>
                        <button
                            onClick={() => setLogType('weight')}
                            className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${logType === 'weight' ? 'border-brand-purple bg-purple-50 text-brand-purple' : 'border-gray-100 hover:border-gray-200 text-gray-600'}`}
                        >
                            <Scale size={24} />
                            <span className="font-bold text-sm">Weight</span>
                        </button>
                        <button
                            onClick={() => setLogType('mood')}
                            className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${logType === 'mood' ? 'border-brand-purple bg-purple-50 text-brand-purple' : 'border-gray-100 hover:border-gray-200 text-gray-600'}`}
                        >
                            <Smile size={24} />
                            <span className="font-bold text-sm">Mood</span>
                        </button>
                        <button
                            onClick={() => setLogType('incident')}
                            className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${logType === 'incident' ? 'border-brand-purple bg-purple-50 text-brand-purple' : 'border-gray-100 hover:border-gray-200 text-gray-600'}`}
                        >
                            <AlertTriangle size={24} />
                            <span className="font-bold text-sm">Incident</span>
                        </button>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-6">
                        {logType === 'vital_signs' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Blood Pressure (Systolic)</label>
                                    <input
                                        type="number"
                                        value={vitals.systolic}
                                        onChange={(e) => setVitals({ ...vitals, systolic: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none"
                                        placeholder="e.g. 120"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Blood Pressure (Diastolic)</label>
                                    <input
                                        type="number"
                                        value={vitals.diastolic}
                                        onChange={(e) => setVitals({ ...vitals, diastolic: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none"
                                        placeholder="e.g. 80"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Heart Rate (bpm)</label>
                                    <input
                                        type="number"
                                        value={vitals.heartRate}
                                        onChange={(e) => setVitals({ ...vitals, heartRate: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none"
                                        placeholder="e.g. 72"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Temperature (°C)</label>
                                    <input
                                        type="number"
                                        value={vitals.temperature}
                                        onChange={(e) => setVitals({ ...vitals, temperature: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none"
                                        placeholder="e.g. 36.6"
                                    />
                                </div>
                            </div>
                        )}

                        {logType === 'weight' && (
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Weight (kg)</label>
                                <input
                                    type="number"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none"
                                    placeholder="e.g. 70.5"
                                />
                            </div>
                        )}

                        {logType === 'mood' && (
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">How is the recipient feeling?</label>
                                <div className="flex gap-4">
                                    {['excellent', 'good', 'neutral', 'poor'].map((m) => (
                                        <button
                                            key={m}
                                            onClick={() => setMood(m)}
                                            className={`flex-1 py-3 rounded-xl border-2 font-bold capitalize transition-all ${mood === m ? 'border-brand-purple bg-purple-50 text-brand-purple' : 'border-gray-100 text-gray-600'}`}
                                        >
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {logType === 'incident' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                    <textarea
                                        value={incident.description}
                                        onChange={(e) => setIncident({ ...incident, description: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none h-32 resize-none"
                                        placeholder="Describe what happened..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Severity</label>
                                    <div className="flex gap-4">
                                        {['low', 'medium', 'high'].map((s) => (
                                            <button
                                                key={s}
                                                onClick={() => setIncident({ ...incident, severity: s })}
                                                className={`flex-1 py-3 rounded-xl border-2 font-bold capitalize transition-all ${incident.severity === s ? 'border-brand-purple bg-purple-50 text-brand-purple' : 'border-gray-100 text-gray-600'}`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="w-full py-4 bg-brand-purple text-white font-bold rounded-xl hover:bg-brand-purple-light transition-colors shadow-lg shadow-purple-200 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {submitting ? 'Saving...' : <><Save size={20} /> Save Record</>}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {records.map((record) => (
                        <div key={record.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${record.recordType === 'vital_signs' ? 'bg-red-100 text-red-600' :
                                        record.recordType === 'weight' ? 'bg-blue-100 text-blue-600' :
                                            record.recordType === 'incident' ? 'bg-orange-100 text-orange-600' :
                                                'bg-gray-100 text-gray-600'
                                    }`}>
                                    {record.recordType === 'vital_signs' ? <Heart size={24} /> :
                                        record.recordType === 'weight' ? <Scale size={24} /> :
                                            record.recordType === 'incident' ? <AlertTriangle size={24} /> :
                                                <Activity size={24} />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 capitalize">{record.recordType.replace('_', ' ')}</h3>
                                    <p className="text-sm text-gray-500">{new Date(record.recordedAt).toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                {record.recordType === 'vital_signs' && (
                                    <p className="font-bold text-gray-900">
                                        BP: {record.data.systolic}/{record.data.diastolic}
                                    </p>
                                )}
                                {record.recordType === 'weight' && (
                                    <p className="font-bold text-gray-900">{record.data.weight} kg</p>
                                )}
                                {record.recordType === 'incident' && (
                                    <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full uppercase">
                                        {record.data.severity} Severity
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                    {records.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            No records found. Start logging!
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
