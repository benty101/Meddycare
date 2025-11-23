import { Check, X, HelpCircle } from 'lucide-react';

export function ComparisonTable() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="font-fraunces text-4xl md:text-5xl text-slate-900 mb-4">
                        Why choose <span className="text-purple-600 italic">MeddyCare?</span>
                    </h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        See how we compare to traditional care homes and other agencies.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <div className="min-w-[800px] bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                        {/* Header */}
                        <div className="grid grid-cols-4 bg-slate-50 border-b border-slate-200">
                            <div className="p-6 font-bold text-slate-500 uppercase tracking-wider text-sm flex items-center">
                                Features
                            </div>
                            <div className="p-6 bg-purple-600 text-white text-center relative">
                                <div className="absolute top-0 left-0 w-full h-1 bg-purple-400"></div>
                                <div className="font-fraunces text-2xl mb-1">MeddyCare</div>
                                <div className="text-purple-100 text-sm">Live-in Care Platform</div>
                            </div>
                            <div className="p-6 text-center text-slate-700 bg-slate-50">
                                <div className="font-bold text-xl mb-1">Care Homes</div>
                                <div className="text-slate-500 text-sm">Residential Facility</div>
                            </div>
                            <div className="p-6 text-center text-slate-700 bg-slate-50">
                                <div className="font-bold text-xl mb-1">Agencies</div>
                                <div className="text-slate-500 text-sm">Traditional Agency</div>
                            </div>
                        </div>

                        {/* Rows */}
                        <div className="divide-y divide-slate-100">
                            {[
                                {
                                    feature: "1-to-1 Care Ratio",
                                    meddy: true,
                                    home: false,
                                    agency: true,
                                    note: "Dedicated attention vs shared staff"
                                },
                                {
                                    feature: "Stay in Own Home",
                                    meddy: true,
                                    home: false,
                                    agency: true,
                                    note: "Keep familiar surroundings & routines"
                                },
                                {
                                    feature: "Choose Your Carer",
                                    meddy: true,
                                    home: false,
                                    agency: false,
                                    note: "View profiles & interview beforehand"
                                },
                                {
                                    feature: "Direct Communication",
                                    meddy: true,
                                    home: false,
                                    agency: false,
                                    note: "Chat directly with your carer"
                                },
                                {
                                    feature: "Cost Effective",
                                    meddy: true,
                                    home: false,
                                    agency: false,
                                    note: "Often 30% cheaper than agencies"
                                },
                                {
                                    feature: "Keep Pets",
                                    meddy: true,
                                    home: false,
                                    agency: true,
                                    note: "Don't leave furry friends behind"
                                },
                                {
                                    feature: "Couples Stay Together",
                                    meddy: true,
                                    home: "Rarely",
                                    agency: true,
                                    note: "No need to be separated"
                                }
                            ].map((row, index) => (
                                <div key={index} className="grid grid-cols-4 hover:bg-slate-50 transition-colors group">
                                    <div className="p-6 flex flex-col justify-center border-r border-slate-100">
                                        <span className="font-bold text-slate-900 text-lg">{row.feature}</span>
                                        <span className="text-slate-500 text-sm mt-1">{row.note}</span>
                                    </div>

                                    {/* MeddyCare Column */}
                                    <div className="p-6 flex items-center justify-center bg-purple-50/30 border-r border-slate-100 relative">
                                        {/* Highlight border for MeddyCare column */}
                                        <div className="absolute inset-y-0 left-0 w-[1px] bg-purple-100"></div>
                                        <div className="absolute inset-y-0 right-0 w-[1px] bg-purple-100"></div>

                                        {row.meddy === true ? (
                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                <Check className="w-6 h-6 text-green-600" />
                                            </div>
                                        ) : (
                                            <span className="font-bold text-slate-900">{row.meddy}</span>
                                        )}
                                    </div>

                                    {/* Care Home Column */}
                                    <div className="p-6 flex items-center justify-center border-r border-slate-100">
                                        {row.home === true ? (
                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                <Check className="w-6 h-6 text-green-600" />
                                            </div>
                                        ) : row.home === false ? (
                                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                                <X className="w-6 h-6 text-red-600" />
                                            </div>
                                        ) : (
                                            <span className="font-bold text-slate-500">{row.home}</span>
                                        )}
                                    </div>

                                    {/* Agency Column */}
                                    <div className="p-6 flex items-center justify-center">
                                        {row.agency === true ? (
                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                <Check className="w-6 h-6 text-green-600" />
                                            </div>
                                        ) : row.agency === false ? (
                                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                                <X className="w-6 h-6 text-red-600" />
                                            </div>
                                        ) : (
                                            <span className="font-bold text-slate-500">{row.agency}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
