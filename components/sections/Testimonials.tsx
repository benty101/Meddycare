import Image from 'next/image';
import { Star } from 'lucide-react';

export function Testimonials() {
    const testimonials = [
        {
            content: "We were worried about finding someone who could handle Dad's dementia, but Sarah has been a godsend. She's patient, kind, and Dad absolutely loves her.",
            author: "James Thompson",
            role: "Son of care recipient",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
            rating: 5
        },
        {
            content: "The platform made it so easy to find a carer quickly. We needed urgent care after Mum's fall, and MeddyCare sorted it out within 24 hours.",
            author: "Emily Chen",
            role: "Daughter of care recipient",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop",
            rating: 5
        },
        {
            content: "Having a live-in carer has allowed my wife to stay in the home she loves. The peace of mind knowing she's safe is priceless.",
            author: "Robert Wilson",
            role: "Husband of care recipient",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
            rating: 5
        }
    ];

    return (
        <section className="py-24 bg-purple-900 text-white overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-400 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-400 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-fraunces text-4xl md:text-5xl mb-4">
                        Families <span className="text-purple-300 italic">love</span> MeddyCare
                    </h2>
                    <p className="text-xl text-purple-100 max-w-2xl mx-auto">
                        Don't just take our word for it. Here's what families across the UK are saying.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <div key={index} className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:bg-white/20 transition-all duration-300">
                            <div className="flex gap-1 mb-6">
                                {[...Array(item.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <p className="text-lg text-purple-50 mb-8 italic">"{item.content}"</p>
                            <div className="flex items-center gap-4">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-purple-300">
                                    <Image
                                        src={item.image}
                                        alt={item.author}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="font-bold text-white">{item.author}</div>
                                    <div className="text-sm text-purple-200">{item.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
