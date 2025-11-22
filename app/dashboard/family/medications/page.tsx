"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Pill,
    Plus,
    Trash2,
    Save,
    Clock,
    FileText
} from "lucide-react";

export default function FamilyMedicationsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [medications, setMedications] = useState<any[]>([]);
    const [carePlanId, setCarePlanId] = useState<string | null>(null);
    const [placementId, setPlacementId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    // New Medication State
    const [newMed, setNewMed] = useState({ name: '', dosage: '', frequency: '', notes: '' });
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                const headers = { 'Authorization': `Bearer ${token}` };

                // Get Active Request/Placement to find Care Plan
                const reqsRes = await fetch('/api/care-requests', { headers });
                if (reqsRes.ok) {
                    const reqs = await reqsRes.json();
                    // Find confirmed/active request
                    const activeReq = reqs.find((r: any) => r.status === 'matched' || r.status === 'completed');

                    if (activeReq && activeReq.matches && activeReq.matches.length > 0) {
                        // Find confirmed match
                        const match = activeReq.matches.find((m: any) => m.status === 'confirmed');
                        if (match && match.placement) {
                            setPlacementId(match.placement.id);

                            // Fetch Care Plan
                            const planRes = await fetch(`/api/care-plans?placementId=${match.placement.id}`, { headers });
                            if (planRes.ok) {
                                const plan = await planRes.json();
                                setCarePlanId(plan.id);
                                setMedications(Array.isArray(plan.medications) ? plan.medications : []);
                            }
                        }
                    }
                }
            } catch (error) {
                console.error("Failed to fetch medications", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddMedication = () => {
        if (!newMed.name || !newMed.dosage) return;
        setMedications([...medications, { ...newMed, id: crypto.randomUUID() }]);
        setNewMed({ name: '', dosage: '', frequency: '', notes: '' });
        setShowAddForm(false);
    };

    const handleRemoveMedication = (id: string) => {
        setMedications(medications.filter(m => m.id !== id));
    };

    const handleSave = async () => {
        if (!placementId) return;
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/care-plans', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    placementId,
                    medications
                })
            });

            if (res.ok) {
                alert("Medications updated successfully!");
            } else {
                alert("Failed to update medications.");
            }
        } catch (error) {
            console.error("Save error", error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (!placementId) return <div className="p-8 text-center">No active care plan found. Please hire a carer first.</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 font-heading">Medication Schedule</h1>
                        <p className="text-gray-500">Manage medications for your loved one</p>
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-3 bg-brand-purple text-white font-bold rounded-xl hover:bg-brand-purple-light transition-colors shadow-lg shadow-purple-200 flex items-center gap-2 disabled:opacity-50"
                >
                    <Save size={20} />
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Current Medications</h2>
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="px-4 py-2 bg-purple-50 text-brand-purple font-bold rounded-xl hover:bg-purple-100 transition-colors flex items-center gap-2 text-sm"
                    >
                        <Plus size={16} />
                        Add Medication
                    </button>
                </div>

                {showAddForm && (
                    <div className="bg-gray-50 p-6 rounded-2xl mb-6 border border-gray-200 animate-in fade-in slide-in-from-top-4">
                        <h3 className="font-bold text-gray-900 mb-4">Add New Medication</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Medication Name</label>
                                <input
                                    type="text"
                                    value={newMed.name}
                                    onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-brand-purple outline-none"
                                    placeholder="e.g. Aspirin"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Dosage</label>
                                <input
                                    type="text"
                                    value={newMed.dosage}
                                    onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-brand-purple outline-none"
                                    placeholder="e.g. 100mg"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Frequency</label>
                                <input
                                    type="text"
                                    value={newMed.frequency}
                                    onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-brand-purple outline-none"
                                    placeholder="e.g. Once daily, Morning"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Notes (Optional)</label>
                                <input
                                    type="text"
                                    value={newMed.notes}
                                    onChange={(e) => setNewMed({ ...newMed, notes: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-brand-purple outline-none"
                                    placeholder="e.g. Take with food"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowAddForm(false)}
                                className="px-4 py-2 text-gray-500 font-bold hover:bg-gray-200 rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddMedication}
                                className="px-6 py-2 bg-brand-purple text-white font-bold rounded-xl hover:bg-brand-purple-light transition-colors"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                )}

                <div className="space-y-3">
                    {medications.length > 0 ? (
                        medications.map((med: any, index: number) => (
                            <div key={med.id || index} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:shadow-md transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                        <Pill size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">{med.name} <span className="text-gray-400 text-sm font-normal">({med.dosage})</span></h3>
                                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                            <span className="flex items-center gap-1"><Clock size={14} /> {med.frequency}</span>
                                            {med.notes && <span className="flex items-center gap-1"><FileText size={14} /> {med.notes}</span>}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleRemoveMedication(med.id)}
                                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-100 rounded-3xl">
                            <Pill size={48} className="mx-auto text-gray-300 mb-4" />
                            <p className="font-bold text-gray-900">No medications listed</p>
                            <p className="text-sm">Add medications to create a schedule for the carer.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
