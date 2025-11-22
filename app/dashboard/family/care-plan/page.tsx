"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Save,
    Plus,
    Trash2,
    ArrowLeft,
    Heart,
    Clock,
    Pill,
    Phone,
    Utensils
} from "lucide-react";

export default function CarePlanPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [placementId, setPlacementId] = useState<string | null>(null);

    const [carePlan, setCarePlan] = useState({
        careGoals: [] as string[],
        dailyRoutines: [] as { time: string; activity: string }[],
        medications: [] as { name: string; dosage: string; time: string }[],
        dietaryRequirements: "",
        emergencyContacts: [] as { name: string; phone: string; relation: string }[]
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                const headers = { 'Authorization': `Bearer ${token}` };

                // 1. Get Active Placement
                const reqsRes = await fetch('/api/care-requests', { headers });
                if (reqsRes.ok) {
                    const reqs = await reqsRes.json();
                    // Find confirmed match/placement
                    // Note: This logic assumes the API returns placement info or we can infer it.
                    // For now, let's assume we fetch the first 'matched' request and get its placement.
                    // Ideally, we should have a dedicated /api/placements endpoint.

                    // Simplified: Fetching from a new endpoint or filtering
                    // Let's assume we can get it. For now, I'll mock the placement ID fetching 
                    // by checking if there is a confirmed match in the requests.

                    const activeReq = reqs.find((r: any) => r.status === 'matched');
                    if (activeReq) {
                        // We need the placement ID. The current /api/care-requests might not return it directly
                        // unless we updated it. Let's assume we need to fetch it.
                        // A better approach: GET /api/care-plans without ID and let backend find active placement?
                        // Or just fetch the plan and if 404, we know we need to create one.

                        // Let's try to fetch the plan directly using a query param if we had the ID.
                        // Since we don't have the ID easily, let's assume the backend can handle "current active"
                        // But my API expects placementId.

                        // Workaround: Fetch matches for the active request to find the confirmed one
                        if (activeReq.matches) {
                            const confirmedMatch = activeReq.matches.find((m: any) => m.status === 'confirmed');
                            if (confirmedMatch && confirmedMatch.placement) {
                                setPlacementId(confirmedMatch.placement.id);

                                // Fetch existing plan
                                const planRes = await fetch(`/api/care-plans?placementId=${confirmedMatch.placement.id}`, { headers });
                                if (planRes.ok) {
                                    const plan = await planRes.json();
                                    if (plan) {
                                        setCarePlan({
                                            careGoals: plan.careGoals || [],
                                            dailyRoutines: plan.dailyRoutines || [],
                                            medications: plan.medications || [],
                                            dietaryRequirements: plan.dietaryRequirements || "",
                                            emergencyContacts: plan.emergencyContacts || []
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            } catch (error) {
                console.error("Failed to fetch care plan", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSave = async () => {
        if (!placementId) return;
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/care-plans', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    placementId,
                    ...carePlan
                })
            });

            if (res.ok) {
                alert("Care Plan saved successfully!");
            }
        } catch (error) {
            console.error("Failed to save care plan", error);
        } finally {
            setSaving(false);
        }
    };

    // Helper to update arrays
    const addItem = (field: keyof typeof carePlan, item: any) => {
        setCarePlan(prev => ({
            ...prev,
            [field]: [...(prev[field] as any[]), item]
        }));
    };

    const removeItem = (field: keyof typeof carePlan, index: number) => {
        setCarePlan(prev => ({
            ...prev,
            [field]: (prev[field] as any[]).filter((_, i) => i !== index)
        }));
    };

    const updateItem = (field: keyof typeof carePlan, index: number, key: string, value: string) => {
        setCarePlan(prev => ({
            ...prev,
            [field]: (prev[field] as any[]).map((item, i) => i === index ? { ...item, [key]: value } : item)
        }));
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (!placementId) return <div className="p-8 text-center">No active care placement found.</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 font-heading">Digital Care Plan</h1>
                        <p className="text-gray-500">Manage care details, routines, and medical needs.</p>
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 bg-brand-purple text-white font-bold rounded-xl hover:bg-brand-purple-light transition-colors disabled:opacity-50"
                >
                    <Save size={20} />
                    {saving ? "Saving..." : "Save Plan"}
                </button>
            </div>

            {/* Care Goals */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-brand-pink">
                        <Heart size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Care Goals</h2>
                </div>
                <div className="space-y-4">
                    {carePlan.careGoals.map((goal, i) => (
                        <div key={i} className="flex gap-3">
                            <input
                                type="text"
                                value={goal}
                                onChange={(e) => {
                                    const newGoals = [...carePlan.careGoals];
                                    newGoals[i] = e.target.value;
                                    setCarePlan(prev => ({ ...prev, careGoals: newGoals }));
                                }}
                                className="flex-1 p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-brand-purple"
                                placeholder="e.g., Improve mobility, Maintain social engagement"
                            />
                            <button onClick={() => removeItem('careGoals', i)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={() => addItem('careGoals', "")}
                        className="flex items-center gap-2 text-brand-purple font-bold text-sm hover:bg-purple-50 px-4 py-2 rounded-lg transition-colors"
                    >
                        <Plus size={16} /> Add Goal
                    </button>
                </div>
            </div>

            {/* Daily Routines */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                        <Clock size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Daily Routine</h2>
                </div>
                <div className="space-y-4">
                    {carePlan.dailyRoutines.map((routine, i) => (
                        <div key={i} className="flex gap-3">
                            <input
                                type="time"
                                value={routine.time}
                                onChange={(e) => updateItem('dailyRoutines', i, 'time', e.target.value)}
                                className="w-32 p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-brand-purple"
                            />
                            <input
                                type="text"
                                value={routine.activity}
                                onChange={(e) => updateItem('dailyRoutines', i, 'activity', e.target.value)}
                                className="flex-1 p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-brand-purple"
                                placeholder="Activity description"
                            />
                            <button onClick={() => removeItem('dailyRoutines', i)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={() => addItem('dailyRoutines', { time: "09:00", activity: "" })}
                        className="flex items-center gap-2 text-brand-purple font-bold text-sm hover:bg-purple-50 px-4 py-2 rounded-lg transition-colors"
                    >
                        <Plus size={16} /> Add Routine
                    </button>
                </div>
            </div>

            {/* Medications */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                        <Pill size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Medications</h2>
                </div>
                <div className="space-y-4">
                    {carePlan.medications.map((med, i) => (
                        <div key={i} className="flex gap-3 flex-wrap md:flex-nowrap">
                            <input
                                type="text"
                                value={med.name}
                                onChange={(e) => updateItem('medications', i, 'name', e.target.value)}
                                className="flex-1 p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-brand-purple"
                                placeholder="Medication Name"
                            />
                            <input
                                type="text"
                                value={med.dosage}
                                onChange={(e) => updateItem('medications', i, 'dosage', e.target.value)}
                                className="w-32 p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-brand-purple"
                                placeholder="Dosage"
                            />
                            <input
                                type="time"
                                value={med.time}
                                onChange={(e) => updateItem('medications', i, 'time', e.target.value)}
                                className="w-32 p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-brand-purple"
                            />
                            <button onClick={() => removeItem('medications', i)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={() => addItem('medications', { name: "", dosage: "", time: "08:00" })}
                        className="flex items-center gap-2 text-brand-purple font-bold text-sm hover:bg-purple-50 px-4 py-2 rounded-lg transition-colors"
                    >
                        <Plus size={16} /> Add Medication
                    </button>
                </div>
            </div>

            {/* Dietary Requirements */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
                        <Utensils size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Dietary Requirements</h2>
                </div>
                <textarea
                    value={carePlan.dietaryRequirements}
                    onChange={(e) => setCarePlan(prev => ({ ...prev, dietaryRequirements: e.target.value }))}
                    className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-brand-purple min-h-[100px]"
                    placeholder="e.g., Diabetic diet, No nuts, Low sodium..."
                />
            </div>

            {/* Emergency Contacts */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                        <Phone size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Emergency Contacts</h2>
                </div>
                <div className="space-y-4">
                    {carePlan.emergencyContacts.map((contact, i) => (
                        <div key={i} className="flex gap-3 flex-wrap md:flex-nowrap">
                            <input
                                type="text"
                                value={contact.name}
                                onChange={(e) => updateItem('emergencyContacts', i, 'name', e.target.value)}
                                className="flex-1 p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-brand-purple"
                                placeholder="Name"
                            />
                            <input
                                type="text"
                                value={contact.relation}
                                onChange={(e) => updateItem('emergencyContacts', i, 'relation', e.target.value)}
                                className="w-40 p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-brand-purple"
                                placeholder="Relation"
                            />
                            <input
                                type="tel"
                                value={contact.phone}
                                onChange={(e) => updateItem('emergencyContacts', i, 'phone', e.target.value)}
                                className="w-40 p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-brand-purple"
                                placeholder="Phone"
                            />
                            <button onClick={() => removeItem('emergencyContacts', i)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={() => addItem('emergencyContacts', { name: "", relation: "", phone: "" })}
                        className="flex items-center gap-2 text-brand-purple font-bold text-sm hover:bg-purple-50 px-4 py-2 rounded-lg transition-colors"
                    >
                        <Plus size={16} /> Add Contact
                    </button>
                </div>
            </div>
        </div>
    );
}
