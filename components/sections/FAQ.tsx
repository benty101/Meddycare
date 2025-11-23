'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export function FAQ() {
    const faqs = [
        {
            question: "How quickly can you arrange care?",
            answer: "We can often arrange care within 24-48 hours. Once you complete your assessment, we'll immediately start matching you with suitable carers."
        },
        {
            question: "Are your carers vetted?",
            answer: "Absolutely. Every carer on MeddyCare undergoes a rigorous vetting process, including DBS checks, reference verification, and interview screening. Only the top 5% of applicants make it onto our platform."
        },
        {
            question: "What if we don't get along with the carer?",
            answer: "Chemistry is important. If you feel it's not the right fit, we'll help you find a replacement immediately. We offer a trial period to ensure everyone is happy."
        },
        {
            question: "How much does live-in care cost?",
            answer: "Our prices start from £950 per week for a single person. The exact cost depends on the level of care required. This is often comparable to or cheaper than a care home, especially for couples."
        },
        {
            question: "Do carers provide dementia care?",
            answer: "Yes, many of our carers specialize in dementia care. You can filter for specific skills and experience when viewing carer profiles."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="font-fraunces text-4xl md:text-5xl text-slate-900 mb-4">
                        Frequently Asked <span className="text-purple-600 italic">Questions</span>
                    </h2>
                    <p className="text-xl text-slate-600">
                        Everything you need to know about finding care with MeddyCare.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl overflow-hidden border border-slate-200 transition-all duration-300 hover:shadow-md"
                        >
                            <button
                                className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="font-fraunces text-xl text-slate-900">{faq.question}</span>
                                {openIndex === index ? (
                                    <Minus className="w-6 h-6 text-purple-600 flex-shrink-0" />
                                ) : (
                                    <Plus className="w-6 h-6 text-slate-400 flex-shrink-0" />
                                )}
                            </button>
                            <div
                                className={`px-8 transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-48 pb-8 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <p className="text-slate-600 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
