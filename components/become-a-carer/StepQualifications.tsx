"use client";

import { CERTIFICATIONS } from "./constants";
import InfoBox from "@/components/get-care/InfoBox";

interface StepQualificationsProps {
    data: any;
    updateData: (data: any) => void;
}

export default function StepQualifications({ data, updateData }: StepQualificationsProps) {
    const toggleCert = (cert: string) => {
        const current = data.certifications || [];
        const updated = current.includes(cert)
            ? current.filter((c: string) => c !== cert)
            : [...current, cert];
        updateData({ ...data, certifications: updated });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 font-heading mb-6">Qualifications & Skills</h2>

                    <label className="block text-sm font-bold text-gray-700 mb-4">Which certifications do you hold?</label>
                    <div className="grid grid-cols-1 gap-3">
                        {CERTIFICATIONS.map((cert) => (
                            <label key={cert} className="cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={(data.certifications || []).includes(cert)}
                                    onChange={() => toggleCert(cert)}
                                    className="peer sr-only"
                                />
                                <div className="flex items-center p-4 rounded-xl border border-gray-200 peer-checked:border-brand-purple peer-checked:bg-purple-50 transition-all hover:border-brand-purple/50">
                                    <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center transition-colors ${(data.certifications || []).includes(cert)
                                            ? "bg-brand-purple border-brand-purple"
                                            : "border-gray-300"
                                        }`}>
                                        {(data.certifications || []).includes(cert) && (
                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                    <span className={`text-sm font-medium ${(data.certifications || []).includes(cert) ? "text-brand-purple" : "text-gray-700"}`}>
                                        {cert}
                                    </span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-4">Do you have a valid driving license?</label>
                    <div className="flex gap-4">
                        {["Yes, Manual", "Yes, Automatic", "No"].map((option) => (
                            <label key={option} className="flex-1 cursor-pointer">
                                <input
                                    type="radio"
                                    name="driving"
                                    value={option}
                                    checked={data.driving === option}
                                    onChange={(e) => updateData({ ...data, driving: e.target.value })}
                                    className="peer sr-only"
                                />
                                <div className="h-full px-4 py-3 rounded-xl border border-gray-200 peer-checked:border-brand-purple peer-checked:bg-purple-50 peer-checked:text-brand-purple text-center text-sm font-medium transition-all hover:border-gray-300">
                                    {option}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1">
                <InfoBox
                    title="Verification"
                    content="We will ask you to upload copies of your certificates later in the process. Please ensure they are up to date."
                />
            </div>
        </div>
    );
}
