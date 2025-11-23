"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import SimpleSignupModal from "@/components/auth/SimpleSignupModal";
import { CheckCircle2, PoundSterling, Calendar, Heart, Star, ArrowRight, ShieldCheck, Users, Clock } from "lucide-react";
import { EmbeddedCarerQuestionnaire } from "@/components/questionnaire/EmbeddedCarerQuestionnaire";
import { LocationCards } from "@/components/sections/LocationCards";

export default function BecomeACarerPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Header />
            <SimpleSignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <main>
                {/* 1. Immersive Hero Section */}
                <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg"
                            alt="Carer smiling with senior"
                            fill
                            className="object-cover opacity-40"
                            sizes="100vw"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-bold text-white tracking-wide uppercase">Join the UK's #1 Carer Community</span>
                        </div>

                        <h1 className="font-fraunces text-5xl md:text-7xl font-bold text-white mb-8 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                            Do the work you love, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 italic">
                                on your own terms.
                            </span>
                        </h1>

                        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12 font-urbanist leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                            Earn up to <span className="text-white font-bold">£900/week</span> with live-in care.
                            We handle the paperwork, insurance, and finding clients—you focus on what matters most.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                            <Link
                                href="/carers/questionnaire"
                                className="btn-primary text-lg px-10 py-4 shadow-lg shadow-purple-900/50"
                            >
                                Start Application
                            </Link>
                            <Link
                                href="/jobs"
                                className="px-10 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold text-lg rounded-full hover:bg-white/20 transition-all"
                            >
                                Browse Jobs
                            </Link>
                        </div>

                        {/* Trust Signals */}
                        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 opacity-80 animate-in fade-in duration-1000 delay-500">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="w-6 h-6 text-teal-400" />
                                <span className="text-white font-medium">Fully Insured</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <PoundSterling className="w-6 h-6 text-yellow-400" />
                                <span className="text-white font-medium">Weekly Pay</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Users className="w-6 h-6 text-pink-400" />
                                <span className="text-white font-medium">24/7 Support</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Benefits Grid (Bento Style) */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="font-fraunces text-4xl text-slate-900 mb-4">Why carers choose MeddyCare</h2>
                            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                                We're building a platform that puts you first, with better pay, more flexibility, and real support.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Card 1: Earnings */}
                            <div className="md:col-span-2 bg-slate-50 rounded-3xl p-10 border border-slate-100 hover:shadow-lg transition-shadow relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-green-100 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500" />
                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6 text-green-600">
                                        <PoundSterling className="w-7 h-7" />
                                    </div>
                                    <h3 className="font-fraunces text-3xl text-slate-900 mb-4">Earn more, keep more.</h3>
                                    <p className="text-slate-600 text-lg max-w-md leading-relaxed">
                                        Set your own rates and keep 85% of your earnings. Our carers earn an average of
                                        <span className="font-bold text-slate-900"> 30% more</span> than with traditional agencies.
                                    </p>
                                </div>
                            </div>

                            {/* Card 2: Flexibility */}
                            <div className="bg-purple-600 rounded-3xl p-10 text-white hover:bg-purple-700 transition-colors relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                                        <Calendar className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="font-fraunces text-2xl mb-4">Total Freedom</h3>
                                    <p className="text-purple-100 leading-relaxed">
                                        Work when you want, where you want. No minimum hours, no forced shifts. You're in control.
                                    </p>
                                </div>
                            </div>

                            {/* Card 3: Support */}
                            <div className="bg-white rounded-3xl p-10 border border-slate-200 hover:border-purple-200 transition-colors group">
                                <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mb-6 text-pink-600">
                                    <Heart className="w-7 h-7" />
                                </div>
                                <h3 className="font-fraunces text-2xl text-slate-900 mb-4">Clinical Support</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Access to our clinical lead nurse for advice on complex care needs. We've got your back, 24/7.
                                </p>
                            </div>

                            {/* Card 4: Career Growth */}
                            <div className="md:col-span-2 bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden group">
                                <div className="absolute inset-0">
                                    <Image
                                        src="https://images.pexels.com/photos/3184352/pexels-photo-3184352.jpeg"
                                        alt="Training"
                                        fill
                                        className="object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                                        sizes="(max-width: 768px) 100vw, 66vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
                                </div>
                                <div className="relative z-10 max-w-lg">
                                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                                        <Star className="w-7 h-7 text-yellow-400" />
                                    </div>
                                    <h3 className="font-fraunces text-3xl mb-4">Grow your career</h3>
                                    <p className="text-slate-300 text-lg leading-relaxed">
                                        Free access to CPD-accredited training courses. Upskill in dementia care, palliative care, and more to increase your earning potential.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Life as a Carer (Editorial) */}
                <section className="py-24 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="relative">
                                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative z-10">
                                    <Image
                                        src="https://images.pexels.com/photos/7688173/pexels-photo-7688173.jpeg"
                                        alt="Carer life"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl -z-0" />
                                <div className="absolute top-10 -right-10 w-40 h-40 bg-teal-200 rounded-full blur-3xl -z-0" />

                                <div className="absolute bottom-8 right-8 bg-white p-6 rounded-2xl shadow-lg max-w-xs z-20">
                                    <div className="flex gap-1 text-yellow-400 mb-2">
                                        <Star className="w-4 h-4 fill-current" />
                                        <Star className="w-4 h-4 fill-current" />
                                        <Star className="w-4 h-4 fill-current" />
                                        <Star className="w-4 h-4 fill-current" />
                                        <Star className="w-4 h-4 fill-current" />
                                    </div>
                                    <p className="text-slate-700 text-sm italic">
                                        "I've never felt more supported. The app makes everything so easy."
                                    </p>
                                    <p className="text-slate-900 font-bold text-sm mt-2">— Sarah, London</p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <h2 className="font-fraunces text-4xl md:text-5xl text-slate-900 leading-tight">
                                    More than just a job. <br />
                                    <span className="text-purple-600 italic">It's a calling.</span>
                                </h2>
                                <div className="space-y-6 text-lg text-slate-600 font-urbanist leading-relaxed">
                                    <p>
                                        Being a live-in carer is a unique opportunity to make a profound difference in someone's life. You become a companion, a supporter, and a friend.
                                    </p>
                                    <p>
                                        With MeddyCare, you're not just an employee number. You're a valued professional. We provide the platform, the safety net, and the community—so you can focus on delivering exceptional care.
                                    </p>
                                </div>
                                <div className="pt-4">
                                    <Link href="/carers/questionnaire" className="inline-flex items-center gap-2 text-purple-600 font-bold hover:text-purple-700 transition-colors text-lg">
                                        Read carer stories <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. How It Works (Steps) */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <h2 className="font-fraunces text-4xl text-slate-900 mb-4">Start your journey</h2>
                            <p className="text-slate-600">From application to your first placement in 3 steps.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-12 relative">
                            {/* Connecting Line */}
                            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-slate-100 -z-10" />

                            {[
                                { title: "Create Profile", desc: "Sign up and tell us about your experience, skills, and preferences.", icon: Users },
                                { title: "Get Verified", desc: "Complete our online vetting process, including DBS and reference checks.", icon: ShieldCheck },
                                { title: "Start Caring", desc: "Browse matched placements, chat with families, and accept jobs.", icon: Heart }
                            ].map((step, i) => (
                                <div key={i} className="relative text-center bg-white pt-4">
                                    <div className="w-24 h-24 mx-auto bg-white border-4 border-purple-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                                        <step.icon className="w-10 h-10 text-purple-600" />
                                    </div>
                                    <h3 className="font-fraunces text-2xl text-slate-900 mb-3">{step.title}</h3>
                                    <p className="text-slate-600 px-4">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. CTA Banner */}
                <section className="py-24 bg-purple-900 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
                    <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8">
                        <h2 className="font-fraunces text-4xl md:text-5xl text-white">
                            Ready to join the team?
                        </h2>
                        <p className="text-xl text-purple-200 font-urbanist">
                            Thousands of families are looking for a carer just like you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                            <Link
                                href="/carers/questionnaire"
                                className="btn-primary bg-white text-purple-900 hover:bg-purple-50 shadow-xl text-lg px-12 py-5"
                                style={{ background: 'white', color: '#311645' }}
                            >
                                Apply Now
                            </Link>
                            <Link
                                href="/jobs"
                                className="px-12 py-5 bg-transparent border-2 border-white/30 text-white font-bold text-lg rounded-full hover:bg-white/10 transition-all"
                            >
                                View Open Jobs
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
