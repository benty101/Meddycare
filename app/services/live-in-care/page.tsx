import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, Home, Clock, Heart, PoundSterling, Calendar } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Live-in Care Services - MeddyCare",
    description: "A better alternative to care homes. Keep your home, pets, and independence with 24/7 live-in support.",
};

export default function LiveInCarePage() {
    return (
        <>
            <Header />
            <main className="bg-slate-50 min-h-screen">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 overflow-hidden bg-teal-900">
                    <div className="absolute inset-0">
                        <Image
                            src="https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg"
                            alt="Live-in care support"
                            fill
                            className="object-cover opacity-20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-900 via-teal-900/90 to-transparent" />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-2xl text-white space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                                <Home className="w-5 h-5 text-teal-300" />
                                <span className="text-sm font-bold text-teal-100">Live-in Care Services</span>
                            </div>

                            <h1 className="font-fraunces text-5xl md:text-7xl leading-tight">
                                A better alternative to <br />
                                <span className="text-teal-300 italic">care homes.</span>
                            </h1>

                            <p className="text-xl text-teal-100 font-urbanist leading-relaxed">
                                Keep your home, your pets, and your independence. Our live-in carers provide 24/7 support tailored to your lifestyle.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Link href="/get-care" className="px-8 py-4 bg-white text-teal-900 rounded-full font-bold text-lg hover:bg-teal-50 transition-colors">
                                    Find a Carer
                                </Link>
                                <Link href="/how-it-works" className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
                                    How It Works
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Grid */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="font-fraunces text-4xl text-slate-900 mb-4">Why choose live-in care?</h2>
                            <p className="text-slate-600 max-w-2xl mx-auto">
                                Live-in care offers one-to-one support that residential homes simply can't match.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                                    <Home className="w-6 h-6 text-teal-600" />
                                </div>
                                <h3 className="font-fraunces text-2xl text-slate-900 mb-3">Stay in your own home</h3>
                                <p className="text-slate-600">
                                    No traumatic moves. Keep your garden, your neighbors, and your memories.
                                </p>
                            </div>
                            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                                    <Heart className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="font-fraunces text-2xl text-slate-900 mb-3">One-to-one attention</h3>
                                <p className="text-slate-600">
                                    A dedicated carer focused solely on you, not 20 other residents.
                                </p>
                            </div>
                            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                                    <PoundSterling className="w-6 h-6 text-orange-600" />
                                </div>
                                <h3 className="font-fraunces text-2xl text-slate-900 mb-3">Comparable cost</h3>
                                <p className="text-slate-600">
                                    Often cheaper than a care home for couples, with better outcomes.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What's Included */}
                <section className="py-24 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <h2 className="font-fraunces text-4xl text-slate-900">
                                    What does a live-in carer do?
                                </h2>
                                <p className="text-lg text-slate-600">
                                    Your carer lives with you to provide support whenever you need it, while respecting your privacy and space.
                                </p>

                                <ul className="space-y-4">
                                    {[
                                        "Personal care (washing, dressing)",
                                        "Medication prompts and management",
                                        "Cooking nutritious meals",
                                        "Light housekeeping and laundry",
                                        "Companionship and emotional support",
                                        "Pet care and dog walking",
                                        "Mobility assistance"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-700">
                                            <CheckCircle2 className="w-5 h-5 text-teal-500" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="relative">
                                <div className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
                                    <Image
                                        src="https://images.pexels.com/photos/7688173/pexels-photo-7688173.jpeg"
                                        alt="Carer cooking with senior"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing CTA */}
                <section className="py-24 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="font-fraunces text-4xl text-slate-900 mb-6">Transparent Pricing</h2>
                        <p className="text-xl text-slate-600 mb-12">
                            Live-in care starts from <span className="font-bold text-teal-600">£950/week</span>.
                            No hidden agency fees, just a simple platform fee.
                        </p>
                        <Link href="/get-care" className="inline-block px-10 py-4 bg-teal-600 text-white rounded-full font-bold text-lg hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200">
                            Get a Quote
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
