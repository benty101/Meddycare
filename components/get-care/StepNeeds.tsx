"use client";

import { MEDICAL_CONDITIONS } from "./constants";
import InfoBox from "./InfoBox";

interface StepNeedsProps {
    data: any;
    updateData: (data: any) => void;
}

export default function StepNeeds({ data, updateData }: StepNeedsProps) {
    const toggleCondition = (condition: string) => {
        const current = data.conditions || [];
        const updated = current.includes(condition)
            ? current.filter((c: string) => c !== condition)
            : [...current, condition];
        updateData({ ...data, conditions: updated });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 font-heading mb-2">Care Requirements</h2>
                    <p className="text-gray-600 mb-6">Select all conditions that apply to help us find the perfect match.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {MEDICAL_CONDITIONS.map((condition) => (
                            <label key={condition} className="cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={(data.conditions || []).includes(condition)}
                                    onChange={() => toggleCondition(condition)}
                                    className="peer sr-only"
                                />
                                <div className="flex items-center p-4 rounded-xl border border-gray-200 peer-checked:border-brand-purple peer-checked:bg-purple-50 transition-all hover:border-brand-purple/50">
                                    <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center transition-colors ${(data.conditions || []).includes(condition)
                                            ? "bg-brand-purple border-brand-purple"
                                            : "border-gray-300"
                                        }`}>
                                        {(data.conditions || []).includes(condition) && (
                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                    <span className={`text-sm font-medium ${(data.conditions || []).includes(condition) ? "text-brand-purple" : "text-gray-700"}`}>
                                        {condition}
                                    </span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Mobility Level</label>
                    <div className="space-y-3">
                        {[
                            { value: "independent", label: "Independent", desc: "Can walk without assistance" },
                            { value: "some_support", label: "Needs some support", desc: "Uses a cane or walker" },
                            { value: "dependent", label: "Dependent", desc: "Needs help transferring or is bedbound" }
                        ].map((option) => (
                            <label key={option.value} className="flex items-center p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition-all has-[:checked]:border-brand-purple has-[:checked]:bg-purple-50">
                                <input
                                    type="radio"
                                    name="mobility"
                                    value={option.value}
                                    checked={data.mobility === option.value}
                                    onChange={(e) => updateData({ ...data, mobility: e.target.value })}
                                    className="w-4 h-4 text-brand-purple border-gray-300 focus:ring-brand-purple"
                                />
                                <div className="ml-3">
                                    <span className="block text-sm font-bold text-gray-900">{option.label}</span>
                                    <span className="block text-xs text-gray-500">{option.desc}</span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
                <InfoBox
                    title="Dementia Care"
                    content="Over 60% of our carers have specialized dementia training. Live-in care is often recommended for dementia patients as it provides stability and familiarity."
                    link={{ text: "Read our Dementia Guide", href: "/resources/dementia-care" }}
                />
                <InfoBox
                    title="Complex Care"
                    content="For conditions like Parkinson's or stroke recovery, we match you with carers who have specific experience and verified training certificates."
                />
            </div>
        </div>
    );
}
