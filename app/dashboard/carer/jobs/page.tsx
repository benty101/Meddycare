"use client";

import { useState } from "react";
import {
    Search,
    MapPin,
    Clock,
    Filter,
    ChevronDown,
    Heart,
    Briefcase,
    PoundSterling
} from "lucide-react";

// Mock Jobs Data
const JOBS = [
    {
        id: 1,
        title: "Live-in Care for Elderly Couple",
        location: "Manchester, UK",
        distance: "15 miles away",
        rate: "£1,100",
        rateType: "per week",
        type: "Live-in",
        startDate: "ASAP",
        tags: ["Dementia Care", "Cooking", "Driver Required"],
        description: "Seeking a compassionate live-in carer for an elderly couple. The husband has early-stage dementia and requires support with daily routines. The wife has mobility issues. Driver's license is essential for appointments and shopping.",
        postedAt: "2 hours ago",
        matchScore: 95
    },
    {
        id: 2,
        title: "Weekend Respite Care",
        location: "Liverpool, UK",
        distance: "22 miles away",
        rate: "£18",
        rateType: "per hour",
        type: "Hourly",
        startDate: "Sep 15",
        tags: ["Personal Care", "Companionship"],
        description: "Looking for weekend support (Sat-Sun, 9am-5pm) for a 78-year-old lady recovering from hip surgery. Assistance with mobility, meal prep, and light housekeeping required.",
        postedAt: "5 hours ago",
        matchScore: 88
    },
    {
        id: 3,
        title: "Full-time Live-in Support",
        location: "Chester, UK",
        distance: "30 miles away",
        rate: "£1,250",
        rateType: "per week",
        type: "Live-in",
        startDate: "Oct 01",
        tags: ["Complex Care", "PEG Feeding", "Night Support"],
        description: "Experienced carer needed for a gentleman with complex care needs including PEG feeding. Training provided but prior experience preferred. 2 weeks on / 2 weeks off rotation.",
        postedAt: "1 day ago",
        matchScore: 82
    },
    {
        id: 4,
        title: "Evening Companionship",
        location: "Manchester, UK",
        distance: "8 miles away",
        rate: "£16",
        rateType: "per hour",
        type: "Hourly",
        startDate: "Flexible",
        tags: ["Companionship", "Medication Prompts"],
        description: "Friendly carer wanted for evening companionship and medication reminders for an independent gentleman. 6pm - 9pm, Mon-Fri.",
        postedAt: "2 days ago",
        matchScore: 75
    }
];

export default function JobBoard() {
    const [activeFilter, setActiveFilter] = useState("All");

    return (
        <div className="space-y-8">
            {/* Header & Search */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 font-heading">Find Care Jobs</h1>
                        <p className="text-gray-600">Browse opportunities that match your skills and preferences.</p>
                    </div>
                    <button className="btn-primary flex items-center gap-2">
                        <Filter size={18} />
                        Saved Filters
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by keyword, location, or job ID..."
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none transition-all"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                        <button className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center gap-2 text-gray-700 font-medium whitespace-nowrap hover:border-brand-purple hover:text-brand-purple transition-colors">
                            <MapPin size={18} />
                            Location
                            <ChevronDown size={16} />
                        </button>
                        <button className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center gap-2 text-gray-700 font-medium whitespace-nowrap hover:border-brand-purple hover:text-brand-purple transition-colors">
                            <Briefcase size={18} />
                            Job Type
                            <ChevronDown size={16} />
                        </button>
                        <button className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center gap-2 text-gray-700 font-medium whitespace-nowrap hover:border-brand-purple hover:text-brand-purple transition-colors">
                            <PoundSterling size={18} />
                            Rate
                            <ChevronDown size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Job List */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Filters Sidebar (Desktop) */}
                <div className="hidden lg:block lg:col-span-3 space-y-6">
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4">Care Type</h3>
                        <div className="space-y-3">
                            {["All Types", "Live-in Care", "Hourly Care", "Respite Care", "Overnight"].map((type) => (
                                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${activeFilter === type ? "bg-brand-purple border-brand-purple" : "border-gray-300 group-hover:border-brand-purple"
                                        }`}>
                                        {activeFilter === type && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                                    </div>
                                    <span className={`text-sm ${activeFilter === type ? "font-bold text-brand-purple" : "text-gray-600"}`}>
                                        {type}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="bg-brand-purple rounded-2xl p-6 text-white">
                        <h3 className="font-bold text-lg mb-2">Need Help?</h3>
                        <p className="text-sm text-white/80 mb-4">
                            Our carer support team is here to assist you with your application.
                        </p>
                        <button className="w-full py-2 bg-white text-brand-purple font-bold rounded-xl text-sm hover:bg-gray-50 transition-colors">
                            Contact Support
                        </button>
                    </div>
                </div>

                {/* Results */}
                <div className="lg:col-span-9 space-y-4">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-gray-600 font-medium">Showing <span className="text-gray-900 font-bold">4</span> jobs</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            Sort by:
                            <button className="font-bold text-gray-900 flex items-center gap-1">
                                Recommended <ChevronDown size={14} />
                            </button>
                        </div>
                    </div>

                    {JOBS.map((job) => (
                        <div key={job.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group relative">
                            <button className="absolute top-6 right-6 text-gray-300 hover:text-brand-pink transition-colors">
                                <Heart size={24} />
                            </button>

                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${job.type === 'Live-in' ? 'bg-purple-100 text-brand-purple' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {job.type}
                                        </span>
                                        <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                            {job.matchScore}% Match
                                        </span>
                                    </div>

                                    <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-purple transition-colors">
                                        {job.title}
                                    </h2>

                                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin size={16} />
                                            {job.location} <span className="text-gray-400">({job.distance})</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock size={16} />
                                            Start: {job.startDate}
                                        </div>
                                    </div>

                                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                        {job.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {job.tags.map((tag) => (
                                            <span key={tag} className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-lg text-xs font-medium text-gray-600">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between items-end min-w-[140px] border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 mt-4 md:mt-0">
                                    <div className="text-right mb-4 md:mb-0 w-full md:w-auto flex justify-between md:block items-center">
                                        <div className="md:hidden text-sm text-gray-500">Rate</div>
                                        <div>
                                            <div className="text-2xl font-bold text-gray-900">{job.rate}</div>
                                            <div className="text-xs text-gray-500">{job.rateType}</div>
                                        </div>
                                    </div>

                                    <div className="w-full space-y-2">
                                        <button className="w-full py-2.5 bg-brand-purple text-white font-bold rounded-xl text-sm hover:bg-brand-purple-light transition-colors shadow-sm">
                                            View Details
                                        </button>
                                        <div className="text-center text-xs text-gray-400">
                                            Posted {job.postedAt}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
