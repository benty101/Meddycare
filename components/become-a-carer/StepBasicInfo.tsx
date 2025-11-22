"use client";

import InfoBox from "@/components/get-care/InfoBox";
import { PremiumInput } from "@/components/ui/premium-input";
import { Mail, Lock, Phone, MapPin } from "lucide-react";

interface StepBasicInfoProps {
    data: any;
    updateData: (data: any) => void;
}

export default function StepBasicInfo({ data, updateData }: StepBasicInfoProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <PremiumInput
                        label="First Name"
                        type="text"
                        value={data.firstName || ""}
                        onChange={(e) => updateData({ ...data, firstName: e.target.value })}
                        placeholder="e.g. Sarah"
                    />
                    <PremiumInput
                        label="Last Name"
                        type="text"
                        value={data.lastName || ""}
                        onChange={(e) => updateData({ ...data, lastName: e.target.value })}
                        placeholder="e.g. Mitchell"
                    />
                </div>

                <PremiumInput
                    label="Email Address"
                    type="email"
                    value={data.email || ""}
                    onChange={(e) => updateData({ ...data, email: e.target.value })}
                    placeholder="e.g. sarah@example.com"
                    icon={<Mail className="w-5 h-5" />}
                />

                <PremiumInput
                    label="Create Password"
                    type="password"
                    value={data.password || ""}
                    onChange={(e) => updateData({ ...data, password: e.target.value })}
                    placeholder="Min. 8 characters"
                    icon={<Lock className="w-5 h-5" />}
                    helperText="Must contain at least 8 characters"
                />

                <PremiumInput
                    label="Phone Number"
                    type="tel"
                    value={data.phone || ""}
                    onChange={(e) => updateData({ ...data, phone: e.target.value })}
                    placeholder="e.g. 07700 900000"
                    icon={<Phone className="w-5 h-5" />}
                />

                <PremiumInput
                    label="Postcode"
                    type="text"
                    value={data.postcode || ""}
                    onChange={(e) => updateData({ ...data, postcode: e.target.value })}
                    placeholder="e.g. SW1A 1AA"
                    icon={<MapPin className="w-5 h-5" />}
                />
            </div>

            <div className="lg:col-span-1">
                <InfoBox
                    title="Join Our Community"
                    content="Join over 6,000 professional carers who have found meaningful work through MeddyCare. We support you every step of the way with training, resources, and 24/7 support."
                />
            </div>
        </div>
    );
}