import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, Heart, Brain, Clock, ShieldCheck, Star } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Dementia Care at Home - MeddyCare",
    description: "Specialized live-in dementia care. Our trained carers provide stability, routine, and compassionate support for Alzheimer's and dementia.",
};

export default function DementiaCarePage() {
    return (
        <>
            <Header />
            <main className="bg-slate-50 min-h-screen">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 overflow-hidden bg-purple-900">
                    <div className="absolute inset-0">
                        <Image
                            src="https://images.pexels.com/photos/339620/pexels-photo-339620.jpeg"
                            alt="Dementia care support"
                            fill
                            className="object-cover opacity-20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-purple-900/90 to-transparent" />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-2xl text-white space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                                <Brain className="w-5 h-5 text-purple-300" />
                                <span className="text-sm font-bold text-purple-100">Specialized Dementia Support</span>
                            </div>

                            <h1 className="font-fraunces text-5xl md:text-7xl leading-tight">
                                Care that understands <br />
                                <span className="text-purple-300 italic">the person, not just the condition.</span>
                            </h1>

                            <p className="text-xl text-purple-100 font-urbanist leading-relaxed">
                                Our dementia-trained carers provide the stability, routine, and compassionate support your loved one needs to live safely at home.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Link href="/get-care" className="px-8 py-4 bg-white text-purple-900 rounded-full font-bold text-lg hover:bg-purple-50 transition-colors">
                                    Find a Dementia Carer
                                </Link>
                                <Link href="/advice/dementia" className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
                                    Read Our Advice Guide
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Understanding Dementia */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="relative">
                                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative z-10">
                                    <Image
                                        src="https://images.pexels.com/photos/16364308/pexels-photo-16364308.jpeg"
                                        alt="Carer helping with puzzle"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-purple-100 rounded-full blur-3xl -z-0" />
                                <div className="absolute -top-10 -left-10 w-64 h-64 bg-teal-100 rounded-full blur-3xl -z-0" />
                            </div>

                            <div className="space-y-8">
                                <h2 className="font-fraunces text-4xl text-slate-900">
                                    Why live-in care works best for dementia.
                                </h2>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-900 mb-2">Continuity & Routine</h3>
                                            <p className="text-slate-600">Staying in familiar surroundings with a consistent carer reduces anxiety and confusion.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                                            <ShieldCheck className="w-6 h-6 text-teal-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-900 mb-2">Safety & Supervision</h3>
                                            <p className="text-slate-600">24/7 support ensures safety risks like wandering or leaving the stove on are managed.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                                            <Heart className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-900 mb-2">Emotional Connection</h3>
                                            <p className="text-slate-600">Our carers build genuine bonds, using reminiscence therapy and patience to connect.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Carer Profiles */}
                <section className="py-24 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="font-fraunces text-4xl text-slate-900 mb-4">Meet our dementia specialists</h2>
                            <p className="text-slate-600 max-w-2xl mx-auto">
                                Every MeddyCare dementia carer has specific training and experience in supporting various stages of the condition.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { name: "Maria S.", exp: "8 years experience", spec: "Early-stage & Alzheimer's", img: "https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg" },
                                { name: "David K.", exp: "12 years experience", spec: "Advanced Dementia", img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" },
                                { name: "Sarah J.", exp: "5 years experience", spec: "Lewy Body Dementia", img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" }
                            ].map((carer, i) => (
                                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 rounded-full overflow-hidden relative">
                                            <Image src={carer.img} alt={carer.name} fill className="object-cover" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-900">{carer.name}</h3>
                                            <div className="flex items-center gap-1 text-yellow-500">
                                                <Star className="w-4 h-4 fill-current" />
                                                <span className="text-sm font-bold text-slate-700">5.0</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                                            {carer.exp}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Brain className="w-4 h-4 text-purple-500" />
                                            {carer.spec}
                                        </div>
                                    </div>
                                    <Link href="/get-care" className="block w-full py-3 text-center border border-purple-200 text-purple-600 rounded-xl font-bold hover:bg-purple-50 transition-colors">
                                        View Profile
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-24 bg-white">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="font-fraunces text-3xl text-slate-900 mb-8 text-center">Common Questions</h2>
                        <Accordion type="single" collapsible className="space-y-4">
                            {[
                                { q: "Do your carers have specific dementia training?", a: "Yes. We verify that all carers listed as dementia specialists have undergone specific training or have significant documented experience in dementia care." },
                                { q: "Can they help with medication?", a: "Yes, our carers are trained to prompt and assist with medication management to ensure your loved one stays healthy." },
                                { q: "What if my loved one wanders?", a: "Safety is our priority. We match you with carers experienced in managing wandering behaviors and ensuring a secure environment." }
                            ].map((item, i) => (
                                <AccordionItem key={i} value={`item-${i}`} className="border border-slate-200 rounded-2xl px-6">
                                    <AccordionTrigger className="font-fraunces text-lg text-slate-900 hover:no-underline hover:text-purple-600 py-6">
                                        {item.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-slate-600 pb-6">
                                        {item.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
