import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function BlogPost() {
    return (
        <>
            <Header />

            <main className="bg-white">
                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    {/* Author Card */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-purple-200 rounded-full flex-shrink-0"></div>
                        <div>
                            <h3 className="font-heading font-bold text-gray-900">Andrew Jenson</h3>
                            <p className="text-sm text-gray-500">Care Expert • 5 min read</p>
                        </div>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-5xl font-heading font-bold text-gray-900 mb-8 leading-tight">
                        What is Live-in Care and How Does it Work?
                    </h1>

                    {/* Featured Image */}
                    <div className="w-full aspect-video bg-gray-200 rounded-lg mb-12"></div>

                    {/* Article Content */}
                    <div className="prose prose-lg max-w-none">
                        <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                            Understanding Live-in Care
                        </h2>

                        <p className="text-gray-700 leading-relaxed mb-6">
                            Live-in care works by matching a specialist carer with someone who requires hands-on assistance
                            within the care receiver's own home. Whether they're moving in to provide care, help with daily
                            living activities or just to provide companionship – a live-in carer's primary job is to ensure
                            the care receiver can maintain independence in the familiarity and comfort of their own home.
                        </p>

                        <p className="text-gray-700 leading-relaxed mb-6">
                            This model of care has grown in popularity as more families seek alternatives to residential care
                            homes. The personalized, one-on-one attention that live-in care provides means care receivers get
                            the support they need while maintaining their daily routines, staying close to family and friends,
                            and remaining in familiar surroundings.
                        </p>

                        <h2 className="text-3xl font-heading font-bold text-purple-900 mb-6 mt-12">
                            What Does a Live-in Carer Do?
                        </h2>

                        <p className="text-gray-700 leading-relaxed mb-6">
                            A live-in carer provides comprehensive support tailored to the individual's needs. This can include:
                        </p>

                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>Personal care (washing, dressing, mobility assistance)</li>
                            <li>Medication management and health monitoring</li>
                            <li>Meal preparation and nutritional support</li>
                            <li>Companionship and emotional support</li>
                            <li>Light housekeeping and laundry</li>
                            <li>Assistance with appointments and social activities</li>
                        </ul>

                        <p className="text-gray-700 leading-relaxed mb-6">
                            The beauty of live-in care is its flexibility – the carer's role adapts to meet changing needs,
                            whether that's providing more assistance during recovery from illness or stepping back as
                            independence improves.
                        </p>

                        <h2 className="text-3xl font-heading font-bold text-purple-900 mb-6 mt-12">
                            Benefits of Live-in Care
                        </h2>

                        <p className="text-gray-700 leading-relaxed mb-6">
                            One of the main advantages of opting for live-in care over other forms of elderly care is peace
                            of mind. You know your loved one won't be alone, at risk or feeling isolated. Rather, they'll be
                            well-looked after in a safe home environment.
                        </p>

                        <div className="bg-brand-purple-50 border-l-4 border-brand-purple p-6 my-8">
                            <p className="text-gray-900 font-medium italic">
                                "Live-in care allows individuals to maintain their independence and dignity while receiving
                                the support they need in the comfort of their own home."
                            </p>
                        </div>

                        <p className="text-gray-700 leading-relaxed mb-6">
                            Families also note improved quality of life for their loved ones – better sleep patterns, improved
                            appetite, maintained social connections, and the comfort of familiar surroundings all contribute
                            to overall wellbeing.
                        </p>
                    </div>

                    {/* Share Buttons */}
                    <div className="border-t border-gray-200 pt-8 mt-12">
                        <p className="text-sm text-gray-600 mb-4">Share this article:</p>
                        <div className="flex gap-3">
                            <button className="p-3 rounded-full bg-gray-100 hover:bg-purple-100 transition-colors">
                                <span className="text-xl">🔗</span>
                            </button>
                            <button className="p-3 rounded-full bg-gray-100 hover:bg-purple-100 transition-colors">
                                <span className="text-xl">📧</span>
                            </button>
                            <button className="p-3 rounded-full bg-gray-100 hover:bg-purple-100 transition-colors">
                                <span className="text-xl">💬</span>
                            </button>
                        </div>
                    </div>
                </article>

                {/* What to read next */}
                <section className="bg-gray-50 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-heading font-bold text-purple-900 mb-8">
                            What to read next
                        </h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: 'The Benefits of Live-in Care for Families',
                                    category: 'Understanding Live-in Care',
                                    readTime: '4 min read'
                                },
                                {
                                    title: 'Comparing Live-in Care vs. Residential Homes',
                                    category: 'Paying for Care',
                                    readTime: '6 min read'
                                },
                                {
                                    title: 'How to Choose the Right Live-in Carer',
                                    category: 'Dementia Care Advice',
                                    readTime: '5 min read'
                                },
                            ].map((post, i) => (
                                <article key={i} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                                    <div className="w-full aspect-video bg-gray-200"></div>
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-medium text-brand-purple">
                                                {post.category}
                                            </span>
                                            <span className="text-xs text-gray-500">{post.readTime}</span>
                                        </div>
                                        <h3 className="text-xl font-heading font-bold text-gray-900 group-hover:text-brand-purple transition-colors">
                                            {post.title}
                                        </h3>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
