"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Search, MapPin, Clock, PoundSterling, Filter, ArrowRight, Briefcase } from "lucide-react";

// Mock Job Data
const jobs = [
    {
        id: 1,
        title: "Live-in Carer for Elderly Couple",
        location: "Surrey, UK",
        type: "Live-in",
        salary: "£950 - £1,100 / week",
        posted: "2 days ago",
        tags: ["Dementia Care", "Driving License", "Cooking"],
        description: "Seeking a compassionate carer for a lovely couple in Surrey. Main duties include companionship, meal preparation, and light housekeeping."
    },
    {
        id: 2,
        title: "Weekend Respite Carer",
        location: "Manchester, UK",
        type: "Part-time",
        salary: "£18 - £22 / hour",
        posted: "5 hours ago",
        tags: ["Respite", "Mobility Support"],
        description: "Experienced carer needed for weekend respite support. Must be comfortable with mobility aids and personal care."
    },
    {
        id: 3,
        title: "Dementia Specialist - Full Time",
        location: "London, UK",
        type: "Live-in",
        salary: "£1,000 - £1,200 / week",
        posted: "1 day ago",
        tags: ["Advanced Dementia", "Nursing Background"],
        description: "Full-time live-in position for a gentleman with advanced dementia. Nursing background preferred but not essential."
    },
    {
        id: 4,
        title: "Night Carer",
        location: "Bristol, UK",
        type: "Night Shift",
        salary: "£150 - £180 / night",
        posted: "3 days ago",
        tags: ["Waking Nights", "Palliative Care"],
        description: "Waking night carer required for 3 nights a week. Experience with palliative care is essential."
    }
];

export default function JobsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("All");

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Header />

            <main>
                {/* Header Section */}
                <section className="bg-purple-900 pt-32 pb-20 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
                    <div className="relative z-10 max-w-4xl mx-auto px-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                            <Briefcase className="w-4 h-4 text-purple-300" />
                            <span className="text-sm font-bold text-purple-100">Care Jobs Board</span>
                        </div>
                        <h1 className="font-fraunces text-5xl md:text-7xl text-white mb-6">
                            Find your next <span className="text-purple-300 italic">care placement.</span>
                        </h1>
                        <p className="text-xl text-purple-100 font-urbanist max-w-2xl mx-auto mb-10">
                            Browse hundreds of live-in and visiting care jobs across the UK. Direct contracts, better pay.
                        </p>

                        {/* Search Bar */}
                        <div className="bg-white p-2 rounded-full max-w-2xl mx-auto flex flex-col sm:flex-row shadow-xl">
                            <div className="flex-grow flex items-center px-6 py-3 border-b sm:border-b-0 sm:border-r border-slate-100">
                                <Search className="w-5 h-5 text-slate-400 mr-3" />
                                <input
                                    type="text"
                                    placeholder="Job title, keywords, or location..."
                                    className="w-full outline-none text-slate-700 placeholder-slate-400"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <button className="btn-primary m-1 shadow-none hover:shadow-lg">
                                Search Jobs
                            </button>
                        </div>
                    </div>
                </section>

                {/* Jobs List Section */}
                <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Sidebar Filters */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-32">
                                <div className="flex items-center gap-2 mb-6">
                                    <Filter className="w-5 h-5 text-purple-600" />
                                    <h3 className="font-bold text-slate-900">Filters</h3>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900 mb-3">Job Type</h4>
                                        <div className="space-y-2">
                                            {["All", "Live-in", "Part-time", "Night Shift"].map((type) => (
                                                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                                    <input
                                                        type="radio"
                                                        name="jobType"
                                                        className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-slate-300"
                                                        checked={filterType === type}
                                                        onChange={() => setFilterType(type)}
                                                    />
                                                    <span className="text-slate-600 group-hover:text-purple-600 transition-colors">{type}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900 mb-3">Location</h4>
                                        <select className="w-full p-3 rounded-xl border border-slate-200 text-slate-600 focus:outline-none focus:border-purple-500">
                                            <option>All Locations</option>
                                            <option>London</option>
                                            <option>South East</option>
                                            <option>North West</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Job Cards */}
                        <div className="lg:col-span-3 space-y-6">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-slate-500">Showing <span className="font-bold text-slate-900">{jobs.length}</span> jobs</p>
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    Sort by: <span className="font-bold text-slate-900 cursor-pointer">Newest</span>
                                </div>
                            </div>

                            {jobs.map((job) => (
                                <div key={job.id} className="card-elevated group border border-slate-100">
                                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-6">
                                        <div>
                                            <h3 className="font-fraunces text-2xl text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                                                {job.title}
                                            </h3>
                                            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                                                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {job.type}</span>
                                                <span className="flex items-center gap-1 text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full"><PoundSterling className="w-3 h-3" /> {job.salary}</span>
                                            </div>
                                        </div>
                                        <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full self-start">
                                            {job.posted}
                                        </span>
                                    </div>

                                    <p className="text-slate-600 mb-6 leading-relaxed">
                                        {job.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {job.tags.map((tag, i) => (
                                            <span key={i} className="px-3 py-1 bg-slate-50 text-slate-600 text-sm rounded-full border border-slate-100">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-end pt-4 border-t border-slate-50">
                                        <Link
                                            href={`/jobs/${job.id}`}
                                            className="inline-flex items-center gap-2 text-purple-600 font-bold hover:text-purple-700 transition-colors"
                                        >
                                            View Details <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            ))}

                            {/* Pagination (Mock) */}
                            <div className="flex justify-center pt-8">
                                <button className="px-6 py-2 bg-white border border-slate-200 rounded-full text-slate-600 hover:bg-slate-50 transition-colors">
                                    Load More Jobs
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
