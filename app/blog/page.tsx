import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Care Insights & Advice - MeddyCare Blog",
    description: "Expert advice, guides, and stories about live-in care, dementia support, and elderly health.",
};

export default function BlogPage() {
    const posts = [
        {
            id: 1,
            title: "Understanding the Stages of Dementia",
            excerpt: "A comprehensive guide to recognizing the early signs of dementia and how care needs evolve over time.",
            category: "Dementia Care",
            author: "Dr. Sarah Miller",
            date: "Nov 20, 2024",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
            readTime: "8 min read"
        },
        {
            id: 2,
            title: "Live-in Care vs. Care Homes: Making the Right Choice",
            excerpt: "Comparing the costs, benefits, and lifestyle differences to help you make an informed decision for your loved one.",
            category: "Care Guides",
            author: "James Wilson",
            date: "Nov 18, 2024",
            image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?q=80&w=2070&auto=format&fit=crop",
            readTime: "6 min read"
        },
        {
            id: 3,
            title: "5 Tips for Preventing Falls at Home",
            excerpt: "Practical modifications and daily habits that can significantly reduce the risk of falls for seniors living independently.",
            category: "Safety",
            author: "Emma Thompson",
            date: "Nov 15, 2024",
            image: "https://images.unsplash.com/photo-1516307365426-bea591f05011?q=80&w=2060&auto=format&fit=crop",
            readTime: "5 min read"
        },
        {
            id: 4,
            title: "Nutrition Guide for Seniors",
            excerpt: "How to maintain a healthy, balanced diet that supports immunity and energy levels in later life.",
            category: "Health & Wellness",
            author: "Dr. Sarah Miller",
            date: "Nov 12, 2024",
            image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop",
            readTime: "7 min read"
        },
        {
            id: 5,
            title: "The Benefits of Companionship Care",
            excerpt: "Why social interaction is crucial for mental health and how a companion carer can brighten daily life.",
            category: "Mental Health",
            author: "James Wilson",
            date: "Nov 10, 2024",
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop",
            readTime: "4 min read"
        },
        {
            id: 6,
            title: "Navigating Care Funding in the UK",
            excerpt: "A breakdown of available financial support, including Attendance Allowance and NHS Continuing Healthcare.",
            category: "Finance",
            author: "Emma Thompson",
            date: "Nov 05, 2024",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2626&auto=format&fit=crop",
            readTime: "10 min read"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Header />

            <main>
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 bg-purple-900 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-purple-200 font-bold text-sm tracking-wide mb-6">
                            MeddyCare Knowledge Hub
                        </span>
                        <h1 className="font-fraunces text-5xl md:text-7xl text-white mb-6">
                            Insights & <span className="text-purple-300 italic">Advice</span>
                        </h1>
                        <p className="text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed font-urbanist">
                            Expert guides, latest news, and practical tips to help you navigate the journey of caregiving with confidence.
                        </p>
                    </div>
                </section>

                {/* Blog Grid */}
                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Featured Post (First one) */}
                        <div className="mb-16">
                            <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-purple-900/5 border border-slate-100 flex flex-col lg:flex-row group hover:shadow-2xl hover:shadow-purple-900/10 transition-all duration-300">
                                <div className="lg:w-1/2 relative h-64 lg:h-auto overflow-hidden">
                                    <Image
                                        src={posts[0].image}
                                        alt={posts[0].title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute top-6 left-6">
                                        <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-purple-700 font-bold text-sm rounded-full shadow-sm">
                                            Featured
                                        </span>
                                    </div>
                                </div>
                                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4 font-medium">
                                        <span className="text-purple-600 font-bold flex items-center gap-1">
                                            <Tag size={14} />
                                            {posts[0].category}
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            {posts[0].date}
                                        </span>
                                    </div>
                                    <h2 className="font-fraunces text-3xl md:text-4xl text-slate-900 mb-4 group-hover:text-purple-700 transition-colors">
                                        {posts[0].title}
                                    </h2>
                                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                        {posts[0].excerpt}
                                    </p>
                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold">
                                                {posts[0].author.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">{posts[0].author}</p>
                                                <p className="text-xs text-slate-500">{posts[0].readTime}</p>
                                            </div>
                                        </div>
                                        <Link href={`/blog/${posts[0].id}`} className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all">
                                            <ArrowRight size={20} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Posts Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.slice(1).map((post) => (
                                <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-purple-900/10 hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                                    <div className="relative h-56 overflow-hidden">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-purple-700 font-bold text-xs rounded-full shadow-sm">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3 font-medium">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={12} />
                                                {post.date}
                                            </span>
                                            <span>•</span>
                                            <span>{post.readTime}</span>
                                        </div>
                                        <h3 className="font-fraunces text-xl text-slate-900 mb-3 group-hover:text-purple-700 transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-1">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 text-xs font-bold">
                                                    {post.author.charAt(0)}
                                                </div>
                                                <span className="text-xs font-bold text-slate-700">{post.author}</span>
                                            </div>
                                            <Link href={`/blog/${post.id}`} className="text-sm font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1">
                                                Read Article <ArrowRight size={14} />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Newsletter CTA */}
                <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-600 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>

                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <h2 className="font-fraunces text-4xl mb-6">Stay informed</h2>
                        <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
                            Join 10,000+ families receiving our weekly newsletter with care tips, health advice, and MeddyCare updates.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm"
                            />
                            <button className="btn-primary px-8 py-4 whitespace-nowrap">
                                Subscribe
                            </button>
                        </form>
                        <p className="text-xs text-slate-500 mt-4">
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
