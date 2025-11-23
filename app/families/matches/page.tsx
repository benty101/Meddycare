"use client";

import { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MatchingLoader } from "@/components/matches/MatchingLoader";
import { MatchedCarerCard } from "@/components/matches/MatchedCarerCard";
import { Sparkles, SlidersHorizontal } from 'lucide-react';

// Mock Data - In reality this would come from the API based on questionnaire results
const MOCK_MATCHES = [
    {
        id: "c1",
        name: "Sarah Jenkins",
        image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800",
        role: "Specialist Dementia Carer",
        location: "Surrey (Within 5 miles)",
        rating: 4.9,
        reviews: 24,
        matchScore: 98,
        experience: "7 Years",
        tags: ["Dementia Care", "Palliative Care", "Driver"]
    },
    {
        id: "c2",
        name: "James Wilson",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800",
        role: "Live-in Care Professional",
        location: "London (Willing to travel)",
        rating: 5.0,
        reviews: 18,
        matchScore: 95,
        experience: "5 Years",
        tags: ["Mobility Support", "Cooking", "Pet Friendly"]
    },
    {
        id: "c3",
        name: "Maria Rodriguez",
        image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800",
        role: "Senior Care Assistant",
        location: "Kent (Within 10 miles)",
        rating: 4.8,
        reviews: 42,
        matchScore: 92,
        experience: "12 Years",
        tags: ["Nursing Background", "Stroke Recovery", "Night Care"]
    }
];

export default function MatchesPage() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Header />

            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                {isLoading ? (
                    <MatchingLoader onComplete={() => setIsLoading(false)} />
                ) : (
                    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
                                <Sparkles className="w-4 h-4 text-purple-600" />
                                <span className="text-purple-700 font-bold text-sm uppercase tracking-wide">
                                    Great News
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-fraunces text-slate-900 mb-6">
                                We found <span className="text-purple-600">{MOCK_MATCHES.length} perfect matches</span> for you.
                            </h1>
                            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-urbanist">
                                Based on your needs, these carers have the right skills, experience, and availability to support your family.
                            </p>
                        </div>

                        {/* Filters Bar */}
                        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="text-slate-500 font-medium">
                                Sorted by: <span className="text-slate-900 font-bold">Best Match</span>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors font-bold">
                                <SlidersHorizontal className="w-4 h-4" />
                                Filter Results
                            </button>
                        </div>

                        {/* Results Grid */}
                        <div className="space-y-6">
                            {MOCK_MATCHES.map((carer) => (
                                <MatchedCarerCard key={carer.id} carer={carer} />
                            ))}
                        </div>

                        {/* Bottom CTA */}
                        <div className="mt-16 text-center bg-purple-900 rounded-3xl p-12 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                            <div className="relative z-10">
                                <h2 className="text-3xl font-fraunces text-white mb-4">Not sure who to choose?</h2>
                                <p className="text-purple-200 mb-8 max-w-xl mx-auto text-lg">
                                    Our care advisors can help you interview and select the perfect carer for your specific situation.
                                </p>
                                <button className="px-8 py-4 bg-white text-purple-900 font-bold rounded-full hover:bg-purple-50 transition-colors shadow-xl">
                                    Speak to an Advisor
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
