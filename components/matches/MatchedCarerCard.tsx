"use client";

import Image from 'next/image';
import { Star, MapPin, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface Carer {
    id: string;
    name: string;
    image: string;
    role: string;
    location: string;
    rating: number;
    reviews: number;
    matchScore: number;
    experience: string;
    tags: string[];
}

export function MatchedCarerCard({ carer }: { carer: Carer }) {
    return (
        <div className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-purple-100 transition-all duration-300 overflow-hidden flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="relative w-full md:w-72 h-64 md:h-auto flex-shrink-0 overflow-hidden">
                <Image
                    src={carer.image}
                    alt={carer.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-xs font-bold text-slate-700">Available Now</span>
                </div>
                <div className="absolute bottom-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    {carer.matchScore}% Match
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-2xl font-fraunces text-slate-900 mb-1">{carer.name}</h3>
                            <p className="text-slate-500 font-medium">{carer.role}</p>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">
                                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                <span className="font-bold text-amber-900">{carer.rating}</span>
                                <span className="text-amber-700 text-sm">({carer.reviews})</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-6 text-sm text-slate-600">
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-purple-500" />
                            {carer.location}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-purple-500" />
                            {carer.experience} Experience
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {carer.tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1 bg-slate-50 text-slate-600 text-sm font-medium rounded-full border border-slate-100">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto">
                    <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                        <CheckCircle2 className="w-4 h-4" />
                        Background Checked
                    </div>
                    <Link
                        href={`/carers/${carer.id}`}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-full font-bold hover:bg-purple-600 transition-colors shadow-lg shadow-slate-200 hover:shadow-purple-200"
                    >
                        View Profile <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
