"use client";

import { Camera, Upload } from "lucide-react";
import InfoBox from "@/components/get-care/InfoBox";

interface StepProfileProps {
    data: any;
    updateData: (data: any) => void;
}

export default function StepProfile({ data, updateData }: StepProfileProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 font-heading">Create Your Profile</h2>

                {/* Photo Upload Placeholder */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-4">Profile Photo</label>
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                            <Camera size={32} />
                        </div>
                        <button className="px-6 py-3 border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                            <Upload size={18} />
                            Upload Photo
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Please upload a clear, professional photo of yourself. Smile! 😊
                    </p>
                </div>

                {/* Bio */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Professional Bio</label>
                    <p className="text-sm text-gray-500 mb-3">
                        Introduce yourself to families. Mention your experience, why you love caring, and your hobbies.
                    </p>
                    <textarea
                        value={data.bio || ""}
                        onChange={(e) => updateData({ ...data, bio: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none transition-all min-h-[150px]"
                        placeholder="Hi, I'm Sarah. I have 5 years of experience in..."
                    />
                    <div className="flex justify-end mt-2">
                        <span className="text-xs text-gray-400">Min. 50 characters</span>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1">
                <InfoBox
                    title="Profile Tips"
                    content="Families love to see personality! Mentioning hobbies like cooking, gardening, or reading can help you find a like-minded match."
                />
            </div>
        </div>
    );
}
