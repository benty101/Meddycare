"use client";

import { EXPERIENCE_LEVELS, SPECIALIZATIONS } from "./constants";
import InfoBox from "@/components/get-care/InfoBox";

interface StepExperienceProps {
    data: any;
    updateData: (data: any) => void;
}

export default function StepExperience({ data, updateData }: StepExperienceProps) {
    const toggleSpecialization = (spec: string) => {
        const current = data.specializations || [];
        const updated = current.includes(spec)
            ? current.filter((s: string) => s !== spec)
            : [...current, spec];
        updateData({ ...data, specializations: updated });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 font-heading mb-6">Professional Experience</h2>

                    <label className="block text-sm font-bold text-gray-700 mb-4">How many years of care experience do you have?</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {EXPERIENCE_LEVELS.map((level) => (
                            <label key={level} className="cursor-pointer">
                                <input
                                    type="radio"
                                    name="experience"
                                    value={level}
                                    checked={data.experience === level}
                                    onChange={(e) => updateData({ ...data, experience: e.target.value })}
                                    className="peer sr-only"
                                />
                                <div className="px-4 py-3 rounded-xl border border-gray-200 peer-checked:border-brand-purple peer-checked:bg-purple-50 peer-checked:text-brand-purple font-medium transition-all hover:border-gray-300">
                                    {level}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-4">Do you have experience with any of the following?</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {SPECIALIZATIONS.map((spec) => (
                            <label key={spec} className="cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={(data.specializations || []).includes(spec)}
                                    onChange={() => toggleSpecialization(spec)}
                                    className="peer sr-only"
                                />
                                <div className="flex items-center p-3 rounded-xl border border-gray-200 peer-checked:border-brand-purple peer-checked:bg-purple-50 transition-all hover:border-brand-purple/50">
                                    <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center transition-colors ${(data.specializations || []).includes(spec)
                                            ? "bg-brand-purple border-brand-purple"
                                            : "border-gray-300"
                                        }`}>
                                        {(data.specializations || []).includes(spec) && (
                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                    <span className={`text-sm font-medium ${(data.specializations || []).includes(spec) ? "text-brand-purple" : "text-gray-700"}`}>
                                        {spec}
                                    </span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1">
                <InfoBox
                    title="Higher Earnings"
                    content="Carers with specialized experience (like Dementia or Parkinson's care) typically earn 20-30% more per week."
                />
            </div>
        </div>
    );
}
