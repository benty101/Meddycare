import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Search, BookOpen, Heart, PoundSterling, Brain, Clock } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Care Advice & Guides - MeddyCare",
    description: "Expert advice for your care journey. Guides on funding, dementia, wellbeing, and understanding live-in care options.",
};

export default function AdvicePage() {
    const categories = [
        { name: "Understanding Care", slug: "understanding-care", icon: BookOpen, color: "bg-purple-100 text-purple-600" },
        { name: "Paying for Care", slug: "paying-for-care", icon: PoundSterling, color: "bg-teal-100 text-teal-600" },
        { name: "Dementia Advice", slug: "dementia", icon: Brain, color: "bg-orange-100 text-orange-600" },
        { name: "Carer Wellbeing", slug: "wellbeing", icon: Heart, color: "bg-pink-100 text-pink-600" }
    ];

    const featuredArticle = {
        title: "The Complete Guide to Live-in Care Funding in 2025",
        excerpt: "Navigating the complexities of care funding can be overwhelming. Our comprehensive guide breaks down local authority support, CHC funding, and self-funding options.",
        category: "Paying for Care",
        author: "Dr. Sarah Chen",
        date: "Nov 15, 2025",
        readTime: "8 min read",
        image: "https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg",
        slug: "live-in-care-funding-guide"
    };

    const recentArticles = [
        {
            title: "Spotting the Early Signs of Dementia",
            excerpt: "Learn to recognize the subtle behavioral changes that might indicate early-stage dementia in your loved ones.",
            category: "Dementia Advice",
            readTime: "5 min read",
            image: "https://images.pexels.com/photos/339620/pexels-photo-339620.jpeg",
            slug: "early-signs-dementia"
        },
        {
            title: "How to Talk to Your Parents About Care",
            excerpt: "Approaching the subject of care can be difficult. Here are 5 compassionate ways to start the conversation.",
            category: "Understanding Care",
            readTime: "6 min read",
            image: "https://images.pexels.com/photos/16364308/pexels-photo-16364308.jpeg",
            slug: "talking-about-care"
        },
        {
            title: "Respite Care: Taking a Break Without Guilt",
            excerpt: "Why taking time for yourself is essential for being a good primary caregiver, and how to arrange temporary support.",
            category: "Carer Wellbeing",
            readTime: "4 min read",
            image: "https://images.pexels.com/photos/7688173/pexels-photo-7688173.jpeg",
            slug: "respite-care-guide"
        }
    ];

    return (
        <>
            <Header />

            <main className="bg-slate-50 min-h-screen">
                {/* Hero Section */}
                <section className="bg-white pt-32 pb-16 border-b border-slate-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="inline-block px-4 py-1 rounded-full bg-purple-50 text-purple-600 text-sm font-bold mb-6 tracking-wide uppercase">
                            MeddyCare Insights
                        </span>
                        <h1 className="font-fraunces text-5xl md:text-6xl text-slate-900 mb-6">
                            Expert advice for your <br />
                            <span className="italic text-purple-600">care journey.</span>
                        </h1>
                        <p className="text-xl text-slate-600 font-urbanist max-w-2xl mx-auto mb-10">
                            Trusted guides, practical tips, and empathetic support to help you navigate the complexities of elderly care.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto relative">
                            <input
                                type="text"
                                placeholder="Search for topics (e.g., 'Funding', 'Dementia')..."
                                className="w-full pl-12 pr-4 py-4 rounded-full border border-slate-200 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-lg"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        </div>
                    </div>
                </section>

                {/* Categories */}
                <section className="py-12 border-b border-slate-200 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap justify-center gap-4">
                            {categories.map((cat) => (
                                <Link
                                    key={cat.slug}
                                    href={`/advice/${cat.slug}`}
                                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all group"
                                >
                                    <div className={`w-8 h-8 rounded-full ${cat.color} flex items-center justify-center`}>
                                        <cat.icon className="w-4 h-4" />
                                    </div>
                                    <span className="font-medium text-slate-700 group-hover:text-purple-700">{cat.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Article */}
                <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group cursor-pointer">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                            <Image
                                src={featuredArticle.image}
                                alt={featuredArticle.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-sm">
                                <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-700 font-bold">{featuredArticle.category}</span>
                                <span className="text-slate-500 flex items-center gap-1"><Clock className="w-4 h-4" /> {featuredArticle.readTime}</span>
                            </div>
                            <h2 className="font-fraunces text-3xl md:text-4xl text-slate-900 leading-tight group-hover:text-purple-700 transition-colors">
                                {featuredArticle.title}
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                {featuredArticle.excerpt}
                            </p>
                            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                                <div className="w-10 h-10 rounded-full bg-slate-200" />
                                <div>
                                    <p className="text-sm font-bold text-slate-900">{featuredArticle.author}</p>
                                    <p className="text-xs text-slate-500">{featuredArticle.date}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Recent Articles Grid */}
                <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <h2 className="font-fraunces text-3xl text-slate-900">Latest Articles</h2>
                        <Link href="/advice/all" className="text-purple-600 font-bold hover:text-purple-700 flex items-center gap-2">
                            View all <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {recentArticles.map((article, index) => (
                            <article key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all group cursor-pointer flex flex-col h-full">
                                <div className="relative aspect-video overflow-hidden">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-slate-800 shadow-sm">
                                            {article.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                                        <Clock className="w-3 h-3" />
                                        {article.readTime}
                                    </div>
                                    <h3 className="font-fraunces text-xl text-slate-900 mb-3 group-hover:text-purple-700 transition-colors">
                                        {article.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                                        {article.excerpt}
                                    </p>
                                    <div className="text-purple-600 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                                        Read article <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Newsletter CTA */}
                <section className="py-24 bg-slate-900 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
                    <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8">
                        <h2 className="font-fraunces text-4xl text-white">
                            Get care advice delivered to your inbox.
                        </h2>
                        <p className="text-slate-300 text-lg">
                            Join 10,000+ families receiving our weekly newsletter with tips, guides, and support.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-grow px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <button className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-purple-50 transition-colors">
                                Subscribe
                            </button>
                        </form>
                        <p className="text-xs text-slate-500">
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
