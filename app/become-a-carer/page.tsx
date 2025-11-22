"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import SimpleSignupModal from "@/components/auth/SimpleSignupModal";
import { CheckCircle, PoundSterling, Calendar, Heart, Star, ArrowRight } from "lucide-react";
import { EmbeddedCarerQuestionnaire } from "@/components/questionnaire/EmbeddedCarerQuestionnaire";
import { LocationCards } from "@/components/sections/LocationCards";

export default function BecomeACarerPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white font-sans">
            <Header />
            <SimpleSignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <main>
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-brand-purple">
                    <div className="absolute inset-0 z-0 opacity-20">
                        <Image
                            src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=2068&auto=format&fit=crop"
                            alt="Carer background"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <div className="inline-block px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <span className="text-white font-semibold tracking-wide text-sm uppercase">Join the UK's #1 Carer Community</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white font-heading mb-8 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                            Do the work you love,<br />
                            <span className="text-purple-200">on your own terms.</span>
                        </h1>
                        <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                            Earn up to £900/week with live-in care. We handle the paperwork, you focus on caring.
                        </p>
                        <Link
                            href="/carers/questionnaire"
                            className="inline-block bg-white text-brand-purple font-bold text-lg px-10 py-4 rounded-full hover:bg-purple-50 transition-all transform hover:scale-105 shadow-xl animate-in fade-in zoom-in duration-500 delay-300"
                        >
                            Start Application
                        </Link>
                    </div>
                </section>

                {/* Embedded Questionnaire */}
                <EmbeddedCarerQuestionnaire />

                {/* Location Cards */}
                <LocationCards />

                {/* Benefits Grid */}
                <section className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-3 gap-12">
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                                    <PoundSterling className="text-green-600 w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">Great Earnings</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Set your own rates and earn up to £900 per week. We take a low commission so you keep more of what you earn.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                                    <Calendar className="text-blue-600 w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">Total Flexibility</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    You decide when and where you work. Choose placements that fit your schedule and lifestyle.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                                    <Heart className="text-brand-purple w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">24/7 Support</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Our clinical team is always just a phone call away. You're never alone when you're on a placement.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 font-heading mb-4">How it works</h2>
                            <p className="text-gray-600 text-lg">Get started in 3 simple steps</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 relative">
                            {/* Connecting Line (Desktop) */}
                            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-100 -z-10"></div>

                            <div className="relative pt-8 text-center">
                                <div className="w-24 h-24 bg-white border-4 border-brand-purple rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-brand-purple z-10">1</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Create Profile</h3>
                                <p className="text-gray-600 px-4">Sign up and tell us about your experience and qualifications.</p>
                            </div>
                            <div className="relative pt-8 text-center">
                                <div className="w-24 h-24 bg-white border-4 border-brand-purple rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-brand-purple z-10">2</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Get Verified</h3>
                                <p className="text-gray-600 px-4">Complete our vetting process and background checks.</p>
                            </div>
                            <div className="relative pt-8 text-center">
                                <div className="w-24 h-24 bg-white border-4 border-brand-purple rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-brand-purple z-10">3</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Start Caring</h3>
                                <p className="text-gray-600 px-4">Browse matched placements and start working.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-24 bg-brand-light">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl font-bold text-center text-gray-900 font-heading mb-16">Hear from our carers</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white p-10 rounded-3xl shadow-sm">
                                <div className="flex gap-1 text-yellow-400 mb-6">
                                    <Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" />
                                </div>
                                <p className="text-xl text-gray-700 italic mb-8">
                                    "MeddyCare has given me the freedom to work when I want. The support team is amazing and I feel truly valued as a professional."
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden relative">
                                        <Image src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop" alt="Sarah" fill className="object-cover" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">Sarah J.</div>
                                        <div className="text-sm text-gray-500">Live-in Carer, London</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-10 rounded-3xl shadow-sm">
                                <div className="flex gap-1 text-yellow-400 mb-6">
                                    <Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" />
                                </div>
                                <p className="text-xl text-gray-700 italic mb-8">
                                    "The app makes it so easy to manage my schedule and payments. I can focus on my clients without worrying about admin."
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden relative">
                                        <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" alt="David" fill className="object-cover" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">David M.</div>
                                        <div className="text-sm text-gray-500">Specialist Carer, Manchester</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Banner */}
                <section className="py-24 bg-brand-purple text-white text-center">
                    <div className="max-w-4xl mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold font-heading mb-8">Ready to start your journey?</h2>
                        <p className="text-xl text-purple-100 mb-12">Join thousands of carers making a difference every day.</p>
                        <Link
                            href="/carers/questionnaire"
                            className="inline-block bg-white text-brand-purple font-bold text-lg px-12 py-5 rounded-full hover:bg-purple-50 transition-all transform hover:scale-105 shadow-xl"
                        >
                            Apply Now
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
