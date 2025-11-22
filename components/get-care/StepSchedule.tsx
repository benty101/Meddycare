"use client";

import { CARE_TYPES } from "./constants";
import InfoBox from "./InfoBox";

interface StepScheduleProps {
    data: any;
    updateData: (data: any) => void;
}

export default function StepSchedule({ data, updateData }: StepScheduleProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 font-heading mb-6">Type of Care</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {CARE_TYPES.map((type) => (
                            <label
                                key={type.id}
                                className={`relative flex items-start p-6 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-md ${data.careType === type.id
                                        ? "border-brand-purple bg-purple-50/30"
                                        : "border-gray-100 hover:border-brand-purple/30"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="careType"
                                    value={type.id}
                                    checked={data.careType === type.id}
                                    onChange={(e) => updateData({ ...data, careType: e.target.value })}
                                    className="sr-only"
                                />
                                <div className={`p-3 rounded-xl mr-4 ${data.careType === type.id ? "bg-brand-purple text-white" : "bg-gray-100 text-gray-500"
                                    }`}>
                                    <type.icon size={24} />
                                </div>
                                <div className="flex-1">
                                    <h3 className={`text-lg font-bold mb-1 ${data.careType === type.id ? "text-brand-purple" : "text-gray-900"
                                        }`}>
                                        {type.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {type.description}
                                    </p>
                                </div>
                                {data.careType === type.id && (
                                    <div className="absolute top-6 right-6 w-6 h-6 bg-brand-purple rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                )}
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">When should care start?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {["Immediately", "Within 2 weeks", "Just planning"].map((option) => (
                            <label key={option} className="cursor-pointer">
                                <input
                                    type="radio"
                                    name="startDate"
                                    value={option}
                                    checked={data.startDate === option}
                                    onChange={(e) => updateData({ ...data, startDate: e.target.value })}
                                    className="peer sr-only"
                                />
                                <div className="px-4 py-3 rounded-xl border border-gray-200 peer-checked:border-brand-purple peer-checked:bg-purple-50 peer-checked:text-brand-purple text-center text-sm font-medium transition-all hover:border-gray-300">
                                    {option}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1">
                <InfoBox
                    title="Live-in vs Hourly"
                    content="Live-in care is often more cost-effective than a care home and allows your loved one to keep their pets, garden, and daily routines."
                    link={{ text: "Compare Costs", href: "/resources/cost-comparison" }}
                />
            </div>
        </div>
    );
}
