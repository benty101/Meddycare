"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Pill,
    Check,
    Clock,
    AlertCircle,
    FileText
} from "lucide-react";

export default function CarerMedicationsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [medications, setMedications] = useState<any[]>([]);
    const [logs, setLogs] = useState<any[]>([]); // Today's logs
    const [carePlanId, setCarePlanId] = useState<string | null>(null);
    const [recipientName, setRecipientName] = useState("Recipient");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                const headers = { 'Authorization': `Bearer ${token}` };

                // 1. Get Profile to find active placement
                const profileRes = await fetch('/api/user/profile', { headers });
                if (profileRes.ok) {
                    const profile = await profileRes.json();
                    if (profile.stats?.activePlacementId) {
                        // 2. Get Care Plan
                        const planRes = await fetch(`/api/care-plans?placementId=${profile.stats.activePlacementId}`, { headers });
                        if (planRes.ok) {
                            const plan = await planRes.json();
                            setCarePlanId(plan.id);
                            setMedications(Array.isArray(plan.medications) ? plan.medications : []);
                        }

                        // 3. Get Today's Log
                        const logRes = await fetch('/api/care-logs/today', { headers });
                        if (logRes.ok) {
                            const log = await logRes.json();
                            if (log && Array.isArray(log.medicationsGiven)) {
                                setLogs(log.medicationsGiven);
                            }
                        }
                    }
                }
            } catch (error) {
                console.error("Failed to fetch medication data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleLogMedication = async (med: any) => {
        if (!confirm(`Confirm you have administered ${med.name}?`)) return;

        const newLogEntry = {
            medicationId: med.id, // Assuming med has ID, or use name as key if ID missing
            name: med.name,
            dosage: med.dosage,
            time: new Date().toISOString(),
            status: 'taken',
            takenBy: 'Carer' // Should be dynamic but API handles auth
        };

        const updatedLogs = [...logs, newLogEntry];
        setLogs(updatedLogs); // Optimistic update

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/care-logs/today', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    medicationsGiven: updatedLogs
                })
            });

            if (!res.ok) {
                alert("Failed to log medication.");
                // Revert optimistic update?
            }
        } catch (error) {
            console.error("Log error", error);
        }
    };

    const isTakenToday = (medId: string) => {
        // Simple check if ANY log exists for this med ID today.
        // Ideally we check frequency vs logs count, but for MVP just check if logged at least once today.
        return logs.some((l: any) => l.medicationId === medId || l.name === medId); // Fallback to name matching if needed
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (!carePlanId) return <div className="p-8 text-center">No active care plan found.</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="flex items-center gap-4">
                <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 font-heading">Medication Schedule</h1>
                    <p className="text-gray-500">Daily medications for today</p>
                </div>
            </div>

            <div className="space-y-4">
                {medications.length > 0 ? (
                    medications.map((med: any, index: number) => {
                        const taken = isTakenToday(med.id || med.name);
                        return (
                            <div key={med.id || index} className={`flex flex-col md:flex-row md:items-center justify-between p-6 rounded-3xl border transition-all ${taken ? 'bg-green-50 border-green-100' : 'bg-white border-gray-100 hover:shadow-md'}`}>
                                <div className="flex items-start gap-4 mb-4 md:mb-0">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${taken ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                                        <Pill size={28} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-xl">{med.name}</h3>
                                        <p className="text-brand-purple font-bold">{med.dosage}</p>
                                        <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-2">
                                            <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg"><Clock size={14} /> {med.frequency}</span>
                                            {med.notes && <span className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded-lg"><AlertCircle size={14} /> {med.notes}</span>}
                                        </div>
                                    </div>
                                </div>

                                {taken ? (
                                    <div className="flex items-center gap-2 text-green-600 font-bold bg-white px-4 py-2 rounded-xl shadow-sm">
                                        <Check size={20} />
                                        <span>Administered</span>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleLogMedication(med)}
                                        className="px-6 py-3 bg-brand-purple text-white font-bold rounded-xl hover:bg-brand-purple-light transition-colors shadow-lg shadow-purple-200 flex items-center justify-center gap-2"
                                    >
                                        <Check size={20} />
                                        Mark as Taken
                                    </button>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-100 rounded-3xl">
                        <Pill size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="font-bold text-gray-900">No medications scheduled</p>
                    </div>
                )}
            </div>
        </div>
    );
}
