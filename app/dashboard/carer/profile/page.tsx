"use client";

import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Save, Loader2, Briefcase, Award } from "lucide-react";

export default function CarerProfilePage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        postcode: "",
        bio: "",
        yearsExperience: 0,
        hourlyRate: ""
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('/api/user/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setProfile({
                        firstName: data.firstName || "",
                        lastName: data.lastName || "",
                        email: data.email || "",
                        phone: data.phone || "",
                        address: data.address || "",
                        postcode: data.postcode || "",
                        bio: data.bio || "",
                        yearsExperience: data.yearsExperience || 0,
                        hourlyRate: data.hourlyRate || ""
                    });
                }
            } catch (error) {
                console.error("Failed to load profile", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profile)
            });
            if (res.ok) {
                alert("Profile updated successfully!");
            } else {
                alert("Failed to update profile");
            }
        } catch (error) {
            console.error("Save error", error);
            alert("An error occurred");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-12">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                                <User className="w-10 h-10 text-purple-600" />
                            </div>
                            <div className="text-white">
                                <h1 className="text-3xl font-fraunces mb-1">Carer Profile</h1>
                                <p className="text-purple-100">Update your professional information</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="label-md text-slate-700">First Name</label>
                                <input
                                    type="text"
                                    value={profile.firstName}
                                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="label-md text-slate-700">Last Name</label>
                                <input
                                    type="text"
                                    value={profile.lastName}
                                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="label-md text-slate-700 flex items-center gap-2">
                                <Mail className="w-4 h-4" /> Email
                            </label>
                            <input
                                type="email"
                                value={profile.email}
                                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-50 cursor-not-allowed"
                                disabled
                            />
                            <p className="text-xs text-slate-500">Email cannot be changed</p>
                        </div>

                        <div className="space-y-2">
                            <label className="label-md text-slate-700 flex items-center gap-2">
                                <Phone className="w-4 h-4" /> Phone Number
                            </label>
                            <input
                                type="tel"
                                value={profile.phone}
                                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="label-md text-slate-700 flex items-center gap-2">
                                <MapPin className="w-4 h-4" /> Address
                            </label>
                            <input
                                type="text"
                                value={profile.address}
                                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="label-md text-slate-700">Postcode</label>
                            <input
                                type="text"
                                value={profile.postcode}
                                onChange={(e) => setProfile({ ...profile, postcode: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="label-md text-slate-700">Bio</label>
                            <textarea
                                value={profile.bio}
                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                placeholder="Tell families about your experience and approach to care..."
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="label-md text-slate-700 flex items-center gap-2">
                                    <Award className="w-4 h-4" /> Years of Experience
                                </label>
                                <input
                                    type="number"
                                    value={profile.yearsExperience}
                                    onChange={(e) => setProfile({ ...profile, yearsExperience: parseInt(e.target.value) })}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    min="0"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="label-md text-slate-700 flex items-center gap-2">
                                    <Briefcase className="w-4 h-4" /> Hourly Rate (£)
                                </label>
                                <input
                                    type="number"
                                    value={profile.hourlyRate}
                                    onChange={(e) => setProfile({ ...profile, hourlyRate: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    min="0"
                                    step="0.5"
                                />
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100">
                            <button
                                type="submit"
                                disabled={saving}
                                className="btn-primary w-full sm:w-auto px-8 py-3 flex items-center justify-center gap-2"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
