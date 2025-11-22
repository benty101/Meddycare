"use client";

import InfoBox from "./InfoBox";

interface StepEnvironmentProps {
    data: any;
    updateData: (data: any) => void;
}

export default function StepEnvironment({ data, updateData }: StepEnvironmentProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 font-heading mb-6">Home & Living</h2>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-4">Does the home have a spare bedroom?</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {["Yes, furnished", "Yes, unfurnished", "No spare room"].map((option) => (
                            <label key={option} className="cursor-pointer">
                                <input
                                    type="radio"
                                    name="bedroom"
                                    value={option}
                                    checked={data.bedroom === option}
                                    onChange={(e) => updateData({ ...data, bedroom: e.target.value })}
                                    className="peer sr-only"
                                />
                                <div className="px-4 py-3 rounded-xl border border-gray-200 peer-checked:border-brand-purple peer-checked:bg-purple-50 peer-checked:text-brand-purple text-center text-sm font-medium transition-all hover:border-gray-300">
                                    {option}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-4">Are there any pets?</label>
                    <div className="flex gap-4">
                        {["Yes", "No"].map((option) => (
                            <label key={option} className="flex-1 cursor-pointer">
                                <input
                                    type="radio"
                                    name="pets"
                                    value={option}
                                    checked={data.pets === option}
                                    onChange={(e) => updateData({ ...data, pets: e.target.value })}
                                    className="peer sr-only"
                                />
                                <div className="h-full px-4 py-3 rounded-xl border border-gray-200 peer-checked:border-brand-purple peer-checked:bg-purple-50 peer-checked:text-brand-purple text-center text-sm font-medium transition-all hover:border-gray-300">
                                    {option}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Additional Notes</label>
                    <textarea
                        value={data.notes || ""}
                        onChange={(e) => updateData({ ...data, notes: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none transition-all min-h-[120px]"
                        placeholder="Tell us anything else we should know about the home environment or specific requirements..."
                    />
                </div>
            </div>

            <div className="lg:col-span-1">
                <InfoBox
                    title="Carer Accommodation"
                    content="For live-in care, the carer requires their own private bedroom. This ensures they have a space to rest and recharge."
                />
            </div>
        </div>
    );
}
