import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Heart, Shield, Clock, ArrowRight } from "lucide-react";
import { EmbeddedFamilyQuestionnaire } from "@/components/questionnaire/EmbeddedFamilyQuestionnaire";
import { CarerProfileCarousel } from "@/components/sections/CarerProfileCarousel";

export default function GetCarePage() {
    return (
        <div className="min-h-screen bg-white font-sans">
            <Header />

            <main>
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#3c0e5e]">
                    <div className="absolute inset-0 z-0 opacity-30">
                        <Image
                            src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?q=80&w=2070&auto=format&fit=crop"
                            alt="Elderly care background"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
                                <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                <span className="text-white font-semibold tracking-wide text-sm">Trusted by 5,000+ Families • From £950/week</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-white font-heading mb-8 leading-tight">
                                Care that feels like <br />
                                <span className="text-purple-200">family.</span>
                            </h1>
                            <p className="text-xl text-purple-100 max-w-2xl mb-10 leading-relaxed">
                                Find trusted, vetted live-in carers who help your loved ones maintain their independence at home.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/families/questionnaire"
                                    className="bg-white text-brand-purple font-bold text-lg px-10 py-4 rounded-full hover:bg-purple-50 transition-all transform hover:scale-105 shadow-xl text-center"
                                >
                                    Get a Free Care Assessment
                                </Link>
                                <a
                                    href="tel:01189899970"
                                    className="bg-transparent border-2 border-white text-white font-bold text-lg px-10 py-4 rounded-full hover:bg-white/10 transition-all text-center flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    Call 0118 989 9970
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Carer Profile Carousel */}
                <CarerProfileCarousel />

                {/* Embedded Questionnaire */}
                <EmbeddedFamilyQuestionnaire />

                {/* Trust Indicators */}
                <section className="py-12 bg-purple-50 border-b border-purple-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Placeholders for trust logos (CQC, etc) */}
                            <div className="text-xl font-bold text-gray-400">CQC Regulated</div>
                            <div className="text-xl font-bold text-gray-400">NHS Partner</div>
                            <div className="text-xl font-bold text-gray-400">Trustpilot 4.9/5</div>
                            <div className="text-xl font-bold text-gray-400">DBS Checked</div>
                        </div>
                    </div>
                </section>

                {/* Educational Content - What is Live-in Care? */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1516307365426-bea591f05011?q=80&w=2060&auto=format&fit=crop"
                                    alt="Carer and senior reading"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900 font-heading mb-6">What is Live-in Care?</h2>
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    Live-in care is a dedicated service where a professional carer lives with your loved one in their own home. It's a direct alternative to a care home, allowing seniors to keep their independence, pets, and familiar routines.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                            <Heart className="text-brand-purple w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">One-to-One Attention</h3>
                                            <p className="text-gray-600">Dedicated support that focuses entirely on your loved one's needs.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                            <Shield className="text-brand-purple w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Safety & Peace of Mind</h3>
                                            <p className="text-gray-600">24/7 presence ensures safety and quick response to any emergencies.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                            <Clock className="text-brand-purple w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible Routines</h3>
                                            <p className="text-gray-600">No rigid schedules. Wake up, eat, and sleep when it suits them.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Comparison Table (Simplified) */}
                <section className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 font-heading mb-4">Why choose Live-in Care?</h2>
                            <p className="text-gray-600 text-lg">Compare MeddyCare with traditional care homes.</p>
                        </div>

                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                            <div className="grid grid-cols-3 bg-brand-purple text-white p-6 text-lg font-bold">
                                <div>Feature</div>
                                <div className="text-center">MeddyCare</div>
                                <div className="text-center opacity-70">Care Home</div>
                            </div>
                            <div className="divide-y divide-gray-100">
                                <div className="grid grid-cols-3 p-6 hover:bg-gray-50 transition-colors">
                                    <div className="font-medium text-gray-900">Carer Ratio</div>
                                    <div className="text-center text-brand-purple font-bold">1 to 1</div>
                                    <div className="text-center text-gray-500">1 to 15+</div>
                                </div>
                                <div className="grid grid-cols-3 p-6 hover:bg-gray-50 transition-colors">
                                    <div className="font-medium text-gray-900">Stay at Home</div>
                                    <div className="text-center text-green-500 font-bold"><CheckCircle className="inline w-6 h-6" /></div>
                                    <div className="text-center text-gray-300">-</div>
                                </div>
                                <div className="grid grid-cols-3 p-6 hover:bg-gray-50 transition-colors">
                                    <div className="font-medium text-gray-900">Keep Pets</div>
                                    <div className="text-center text-green-500 font-bold"><CheckCircle className="inline w-6 h-6" /></div>
                                    <div className="text-center text-gray-300">-</div>
                                </div>
                                <div className="grid grid-cols-3 p-6 hover:bg-gray-50 transition-colors">
                                    <div className="font-medium text-gray-900">Couples Stay Together</div>
                                    <div className="text-center text-green-500 font-bold"><CheckCircle className="inline w-6 h-6" /></div>
                                    <div className="text-center text-gray-300">Rarely</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 bg-white text-center">
                    <div className="max-w-4xl mx-auto px-4">
                        <h2 className="text-4xl font-bold text-gray-900 font-heading mb-6">Find the perfect match today</h2>
                        <p className="text-xl text-gray-600 mb-10">
                            Answer a few simple questions to get a personalized care plan and quote.
                        </p>
                        <Link
                            href="/families/questionnaire"
                            className="inline-flex items-center gap-2 bg-brand-purple text-white font-bold text-lg px-12 py-5 rounded-full hover:bg-brand-purple-dark transition-all transform hover:scale-105 shadow-xl"
                        >
                            Start Care Assessment
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
