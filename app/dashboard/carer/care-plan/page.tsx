"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Heart,
    Clock,
    Pill,
    Phone,
    Utensils,
    Calendar
} from "lucide-react";

export default function CarerCarePlanPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [carePlan, setCarePlan] = useState<any>(null);
    const [recipientName, setRecipientName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                const headers = { 'Authorization': `Bearer ${token}` };

                // 1. Get Active Placement for Carer
                // We can use /api/jobs to find active placements or a dedicated endpoint.
                // Currently /api/jobs returns available jobs.
                // We need an endpoint to get "My Placements".
                // Let's assume we can use /api/user/profile which returns stats, but not placement ID.

                // Let's try to fetch profile and see if we can get active placement ID from there or 
                // we might need to update /api/user/profile to return active placement ID.
                // OR we can fetch /api/care-plans without ID and let backend find it (if we updated backend).

                // For now, let's try to find it via /api/jobs (maybe it returns active ones too? No, it returns matching).
                // We need a way to get the active placement.

                // Let's assume the carer has one active placement.
                // I'll use a new endpoint or logic?
                // Actually, I can use the `stats` logic in /api/user/profile to return the placement ID.

                // Let's update /api/user/profile to return activePlacementId if exists.
                // But first, let's try to fetch care plan directly. If I call GET /api/care-plans without ID, 
                // the backend currently requires placementId.

                // I'll update the frontend to fetch profile, and if I update profile to return activePlacementId.
                // Let's update /api/user/profile first.

                // Wait, I can just fetch all placements for the carer?
                // I don't have an endpoint for that yet.

                // Let's update /api/user/profile to return `activePlacementId`.
                const profileRes = await fetch('/api/user/profile', { headers });
                if (profileRes.ok) {
                    const profile = await profileRes.json();
                    if (profile.stats && profile.stats.activePlacementId) {
                        const planRes = await fetch(`/api/care-plans?placementId=${profile.stats.activePlacementId}`, { headers });
                        if (planRes.ok) {
                            const plan = await planRes.json();
                            setCarePlan(plan);
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

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (!carePlan) return (
        <div className="max-w-4xl mx-auto p-6 text-center">
            <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-purple">
                    <Calendar size={32} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">No Active Care Plan</h2>
                <p className="text-gray-600 mb-6">There is no active care plan available at the moment.</p>
                <button onClick={() => router.back()} className="text-brand-purple font-bold hover:underline">
                    Go Back
                </button>
            </div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="flex items-center gap-4">
                <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 font-heading">Care Plan</h1>
                    <p className="text-gray-500">View care details, routines, and medical needs.</p>
                </div>
            </div>

            {/* Care Goals */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-brand-pink">
                        <Heart size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Care Goals</h2>
                </div>
                <ul className="space-y-3">
                    {carePlan.careGoals?.map((goal: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 p-3 bg-pink-50/50 rounded-xl text-gray-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-pink mt-2 flex-shrink-0"></span>
                            {goal}
                        </li>
                    ))}
                    {(!carePlan.careGoals || carePlan.careGoals.length === 0) && (
                        <p className="text-gray-500 italic">No care goals specified.</p>
                    )}
                </ul>
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
                    {carePlan.dailyRoutines?.map((routine: any, i: number) => (
                        <div key={i} className="flex gap-4 items-center p-3 bg-gray-50 rounded-xl">
                            <div className="px-3 py-1 bg-white rounded-lg text-sm font-bold text-brand-purple shadow-sm">
                                {routine.time}
                            </div>
                            <p className="text-gray-700 font-medium">{routine.activity}</p>
                        </div>
                    ))}
                    {(!carePlan.dailyRoutines || carePlan.dailyRoutines.length === 0) && (
                        <p className="text-gray-500 italic">No routines specified.</p>
                    )}
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
                    {carePlan.medications?.map((med: any, i: number) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-green-50/50 rounded-xl border border-green-100">
                            <div>
                                <h4 className="font-bold text-gray-900">{med.name}</h4>
                                <p className="text-sm text-gray-600">{med.dosage}</p>
                            </div>
                            <div className="px-3 py-1 bg-white rounded-lg text-sm font-bold text-green-600 shadow-sm">
                                {med.time}
                            </div>
                        </div>
                    ))}
                    {(!carePlan.medications || carePlan.medications.length === 0) && (
                        <p className="text-gray-500 italic">No medications specified.</p>
                    )}
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
                <div className="p-4 bg-yellow-50/50 rounded-xl text-gray-700 leading-relaxed">
                    {carePlan.dietaryRequirements || "No specific dietary requirements."}
                </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                        <Phone size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Emergency Contacts</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {carePlan.emergencyContacts?.map((contact: any, i: number) => (
                        <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <h4 className="font-bold text-gray-900">{contact.name}</h4>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">{contact.relation}</p>
                            <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-brand-purple font-bold text-sm hover:underline">
                                <Phone size={14} />
                                {contact.phone}
                            </a>
                        </div>
                    ))}
                    {(!carePlan.emergencyContacts || carePlan.emergencyContacts.length === 0) && (
                        <p className="text-gray-500 italic col-span-2">No emergency contacts specified.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
