"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, PoundSterling, Calendar, CheckCircle2 } from "lucide-react";

export default function JobDetailPage({ params }: { params: { id: string } }) {
    // Mock Data - In reality fetch based on ID
    const job = {
        id: params.id,
        title: "Live-in Carer for Elderly Couple",
        location: "Surrey, UK",
        type: "Live-in",
        salary: "£950 - £1,100 / week",
        posted: "2 days ago",
        description: `
            <p class="mb-4">We are seeking a compassionate and experienced live-in carer to support a lovely elderly couple in their home in Surrey. The husband has early-stage dementia, and the wife has mobility issues.</p>
            <p class="mb-4">You will be required to assist with personal care, medication management, meal preparation, and light housekeeping. A driver's license is essential as the couple enjoys short trips out.</p>
            <p>This is a long-term placement with a 2-weeks-on, 2-weeks-off rotation.</p>
        `,
        requirements: [
            "Minimum 1 year of live-in care experience",
            "Experience with dementia care",
            "Clean driving license",
            "Enhanced DBS check (we can assist with this)",
            "Compassionate and patient nature"
        ],
        benefits: [
            "Competitive weekly pay",
            "Free room and board while on placement",
            "Paid travel expenses",
            "24/7 clinical support",
            "Ongoing training and development"
        ]
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Header />

            <main className="pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/jobs" className="inline-flex items-center gap-2 text-slate-500 hover:text-purple-600 mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Jobs
                    </Link>

                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                        {/* Job Header */}
                        <div className="p-8 md:p-12 border-b border-slate-100 bg-slate-50/50">
                            <div className="flex flex-col md:flex-row justify-between md:items-start gap-6">
                                <div>
                                    <h1 className="font-fraunces text-3xl md:text-4xl text-slate-900 mb-4">
                                        {job.title}
                                    </h1>
                                    <div className="flex flex-wrap gap-6 text-slate-600">
                                        <span className="flex items-center gap-2"><MapPin className="w-5 h-5 text-purple-500" /> {job.location}</span>
                                        <span className="flex items-center gap-2"><Clock className="w-5 h-5 text-purple-500" /> {job.type}</span>
                                        <span className="flex items-center gap-2"><PoundSterling className="w-5 h-5 text-green-600" /> <span className="font-bold text-green-700">{job.salary}</span></span>
                                    </div>
                                </div>
                                <button className="px-8 py-3 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200">
                                    Apply Now
                                </button>
                            </div>
                        </div>

                        {/* Job Content */}
                        <div className="p-8 md:p-12 grid md:grid-cols-3 gap-12">
                            <div className="md:col-span-2 space-y-8">
                                <div>
                                    <h2 className="font-fraunces text-2xl text-slate-900 mb-4">About the role</h2>
                                    <div className="text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: job.description }} />
                                </div>

                                <div>
                                    <h2 className="font-fraunces text-2xl text-slate-900 mb-4">Requirements</h2>
                                    <ul className="space-y-3">
                                        {job.requirements.map((req, i) => (
                                            <li key={i} className="flex items-start gap-3 text-slate-600">
                                                <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                                                {req}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="font-fraunces text-2xl text-slate-900 mb-4">Benefits</h2>
                                    <ul className="space-y-3">
                                        {job.benefits.map((ben, i) => (
                                            <li key={i} className="flex items-start gap-3 text-slate-600">
                                                <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                                                {ben}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                    <h3 className="font-bold text-slate-900 mb-4">Job Overview</h3>
                                    <div className="space-y-4 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Posted</span>
                                            <span className="font-medium text-slate-900">{job.posted}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Job ID</span>
                                            <span className="font-medium text-slate-900">#{job.id}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Location</span>
                                            <span className="font-medium text-slate-900">{job.location}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                                    <h3 className="font-bold text-purple-900 mb-2">Need help?</h3>
                                    <p className="text-purple-700 text-sm mb-4">
                                        Contact our recruitment team if you have questions about this role.
                                    </p>
                                    <a href="mailto:jobs@meddycare.co.uk" className="text-purple-600 font-bold text-sm hover:underline">
                                        jobs@meddycare.co.uk
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
