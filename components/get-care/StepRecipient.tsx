"use client";

import { User } from "lucide-react";
import InfoBox from "./InfoBox";
import { PremiumInput } from "@/components/ui/premium-input";
import { PremiumSelect } from "@/components/ui/premium-select";

interface StepRecipientProps {
    data: any;
    updateData: (data: any) => void;
}

export default function StepRecipient({ data, updateData }: StepRecipientProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <PremiumInput
                        label="First Name"
                        type="text"
                        value={data.firstName || ""}
                        onChange={(e) => updateData({ ...data, firstName: e.target.value })}
                        placeholder="e.g. Mary"
                    />
                    <PremiumInput
                        label="Last Name"
                        type="text"
                        value={data.lastName || ""}
                        onChange={(e) => updateData({ ...data, lastName: e.target.value })}
                        placeholder="e.g. Smith"
                    />
                </div>

                <PremiumSelect
                    label="Relationship to you"
                    value={data.relationship || ""}
                    onChange={(e) => updateData({ ...data, relationship: e.target.value })}
                    options={[
                        { value: "parent", label: "Parent (Mother/Father)" },
                        { value: "spouse", label: "Spouse / Partner" },
                        { value: "grandparent", label: "Grandparent" },
                        { value: "other", label: "Other Family Member" },
                        { value: "friend", label: "Friend" },
                        { value: "myself", label: "Myself" }
                    ]}
                    placeholder="Select relationship"
                />

                <div className="space-y-3">
                    <label className="block text-sm font-urbanist font-semibold text-gray-700">
                        Gender
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {["Female", "Male", "Prefer not to say"].map((gender) => (
                            <button
                                key={gender}
                                type="button"
                                onClick={() => updateData({ ...data, gender })}
                                className={`px-6 py-4 rounded-2xl border-2 font-urbanist font-semibold text-sm transition-all ${
                                    data.gender === gender
                                        ? "border-(--brand-purple) bg-purple-50 text-(--brand-purple)"
                                        : "border-gray-200 text-gray-700 hover:border-gray-300"
                                }`}
                            >
                                {gender}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1">
                <InfoBox
                    title="Why do we ask?"
                    content="Knowing who the care is for helps us match you with carers who have the right experience and personality fit. For example, some carers specialize in supporting couples."
                />
            </div>
        </div>
    );
}