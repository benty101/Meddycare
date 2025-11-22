"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface SimpleSignupModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SimpleSignupModal({ isOpen, onClose }: SimpleSignupModalProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call or actual registration
        try {
            // In a real app, you'd hit your API here.
            // For now, we'll simulate a success and redirect.
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Store basic info in local storage to pre-fill the wizard if needed
            localStorage.setItem("carer_signup_temp", JSON.stringify(formData));

            router.push("/become-a-carer/apply");
        } catch (error) {
            console.error("Signup failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-brand-purple font-heading mb-2">
                            Start Your Journey
                        </h2>
                        <p className="text-gray-600 text-sm">
                            Create an account to begin your application.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">First Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                                    placeholder="Jane"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Last Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                                    placeholder="Doe"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Email Address</label>
                            <input
                                required
                                type="email"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                                placeholder="jane@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Password</label>
                            <input
                                required
                                type="password"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-brand-purple text-white font-bold py-4 rounded-xl hover:bg-brand-purple-dark transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-200 flex items-center justify-center gap-2 mt-6"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Creating Account...
                                </>
                            ) : (
                                "Create Account & Continue"
                            )}
                        </button>
                    </form>

                    <p className="text-center text-xs text-gray-500 mt-6">
                        By joining, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            </div>
        </div>
    );
}
