'use client';

import { ClipboardCheck, Users, Video, HeartHandshake } from 'lucide-react';

export function HowItWorks() {
    const steps = [
        {
            icon: ClipboardCheck,
            title: "Tell us your needs",
            description: "Complete our quick online assessment to help us understand your care requirements and preferences."
        },
        {
            icon: Users,
            title: "Get matched",
            description: "Our smart algorithm matches you with vetted carers who have the right skills and personality."
        },
        {
            icon: Video,
            title: "Interview & Choose",
            description: "View detailed profiles, watch video introductions, and interview your favorites to find the perfect fit."
        },
        {
            icon: HeartHandshake,
            title: "Care begins",
            description: "Once you're happy, care starts. We handle contracts, payments, and ongoing support."
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="font-fraunces text-4xl md:text-5xl text-slate-900 mb-4">
                        How it <span className="text-purple-600 italic">works</span>
                    </h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Finding the perfect carer is easier than you think. We guide you every step of the way.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-purple-100 -z-10 transform -translate-y-1/2"></div>

                    {steps.map((step, index) => (
                        <div key={index} className="relative flex flex-col items-center text-center group">
                            <div className="w-24 h-24 bg-white border-4 border-purple-50 rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:border-purple-200 group-hover:scale-110 transition-all duration-300">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                                    <step.icon className="w-8 h-8 text-purple-600" />
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center transform translate-x-1/2 -translate-y-1/2 border-2 border-white">
                                {index + 1}
                            </div>
                            <h3 className="font-fraunces text-xl text-slate-900 mb-3">{step.title}</h3>
                            <p className="text-slate-600 leading-relaxed text-sm px-4">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
