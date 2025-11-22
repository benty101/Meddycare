"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock Data matching the design
const CATEGORIES = [
    "Understanding Live-in Care",
    "Paying For Care",
    "Dementia Care Advice",
];

const RECENT_POSTS = [
    {
        id: 1,
        title: "£600 million budget boost to social care",
        date: "12 August 2024",
        image: "/images/blog/recent-1.jpg",
        slug: "budget-boost-social-care",
    },
    {
        id: 2,
        title: "Arranging care after a hospital discharge",
        date: "12 August 2024",
        image: "/images/blog/recent-2.jpg",
        slug: "care-after-hospital",
    },
    {
        id: 3,
        title: "Spotting the symptoms of loneliness in old age",
        date: "12 August 2024",
        image: "/images/blog/recent-3.jpg",
        slug: "loneliness-symptoms",
    },
    {
        id: 4,
        title: "£600 million budget boost to social care",
        date: "12 August 2024",
        image: "/images/blog/recent-1.jpg",
        slug: "budget-boost-social-care-2",
    },
];

const TAGS = [
    "Senior", "Care giving", "Healthy", "Golden Years", "Aging", "Life",
    "Family", "Senior Health", "Articles", "Family support", "Aging",
    "Live-in care", "Visiting care", "Interviews", "Legal"
];

const FEATURED_POST = {
    id: 1,
    title: "What Is Live-in Care and How Does It Work?",
    excerpt: "Discover how live-in care works, its benefits, and what to expect when choosing home-based support for your loved ones.",
    date: "12 Aug, 2024",
    image: "/images/blog/featured-1.jpg",
    slug: "what-is-live-in-care",
    category: "Understanding Live-in Care",
};

const ARTICLES = [
    {
        id: 2,
        title: "The Benefits of Staying at Home vs. Moving into a Care Home",
        excerpt: "Discover how live-in care works, its benefits, and what to expect when choosing home-based support for your loved ones.",
        date: "15 Aug, 2024",
        image: "/images/blog/article-2.jpg",
        slug: "staying-at-home-benefits",
        category: "Care Options",
    },
    {
        id: 3,
        title: "What Is Live-in Care and How Does It Work?",
        excerpt: "Discover how live-in care works, its benefits, and what to expect when choosing home-based support for your loved ones.",
        date: "12 Aug, 2024",
        image: "/images/blog/featured-1.jpg", // Reusing image for demo
        slug: "what-is-live-in-care-2",
        category: "Understanding Live-in Care",
    },
];

export default function ResourcesPage() {
    const [activeCategory, setActiveCategory] = useState("Understanding Live-in Care");

    return (
        <div className="min-h-screen bg-brand-light font-sans">
            <Header />

            {/* Hero Section */}
            <section className="relative bg-brand-light pt-12 pb-16 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="md:w-1/2 space-y-6 z-10">
                            <h1 className="text-5xl md:text-6xl font-bold text-brand-purple font-heading leading-tight">
                                MeddyCare <span className="text-black">Insights</span>
                            </h1>
                            <p className="text-lg text-gray-600 max-w-xl">
                                Welcome to MeddyCare Insights, your trusted resource for understanding care options, financial planning, and support for families.
                            </p>
                        </div>

                        {/* Hero Image with Blob/Shape */}
                        <div className="md:w-1/2 relative">
                            <div className="relative z-10 rounded-3xl overflow-hidden shadow-xl">
                                {/* Placeholder for hero image */}
                                <div className="bg-gray-200 w-full h-[300px] md:h-[400px] flex items-center justify-center text-gray-400">
                                    Hero Image (Senior & Carer)
                                </div>
                            </div>
                            {/* Decorative elements would go here */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="py-8 bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 ${activeCategory === category
                                        ? "bg-brand-purple text-white shadow-md"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content Grid */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Sidebar */}
                    <aside className="lg:col-span-3 space-y-12">
                        {/* Recent Posts */}
                        <div className="bg-brand-light rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-black mb-6 font-heading">Recent Post</h3>
                            <div className="space-y-6">
                                {RECENT_POSTS.map((post) => (
                                    <Link href={`/resources/${post.slug}`} key={post.id} className="flex gap-4 group">
                                        <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                                            {/* Placeholder image */}
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-xs text-gray-500">{post.date}</span>
                                            <h4 className="text-sm font-bold text-gray-900 group-hover:text-brand-purple transition-colors line-clamp-3">
                                                {post.title}
                                            </h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="bg-brand-light rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-black mb-6 font-heading">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {TAGS.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-white border border-brand-pink/30 text-gray-600 text-xs rounded-full hover:border-brand-pink hover:text-brand-pink cursor-pointer transition-colors"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Right Content Area */}
                    <div className="lg:col-span-9 space-y-12">

                        {/* Featured Article */}
                        <article className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                            <div className="relative h-[400px] bg-gray-200 w-full">
                                {/* Placeholder for featured image */}
                                <div className="absolute bottom-6 right-6">
                                    <span className="bg-brand-purple text-white px-4 py-2 rounded-full text-sm font-medium">
                                        {FEATURED_POST.date}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8 md:p-10 space-y-4">
                                <h2 className="text-3xl font-bold text-brand-purple font-heading">
                                    {FEATURED_POST.title}
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {FEATURED_POST.excerpt}
                                </p>
                                <Link
                                    href={`/resources/${FEATURED_POST.slug}`}
                                    className="inline-block text-brand-purple font-bold underline decoration-2 underline-offset-4 hover:text-brand-pink transition-colors"
                                >
                                    Read more
                                </Link>
                            </div>
                        </article>

                        {/* Article List */}
                        <div className="space-y-12">
                            {ARTICLES.map((article) => (
                                <article key={article.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                                    <div className="relative h-[300px] bg-gray-200 w-full">
                                        {/* Placeholder image */}
                                        <div className="absolute bottom-6 right-6">
                                            <span className="bg-brand-purple text-white px-4 py-2 rounded-full text-sm font-medium">
                                                {article.date}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-8 md:p-10 space-y-4">
                                        <h2 className="text-2xl font-bold text-brand-purple font-heading">
                                            {article.title}
                                        </h2>
                                        <p className="text-gray-600 text-lg leading-relaxed">
                                            {article.excerpt}
                                        </p>
                                        <Link
                                            href={`/resources/${article.slug}`}
                                            className="inline-block text-brand-purple font-bold underline decoration-2 underline-offset-4 hover:text-brand-pink transition-colors"
                                        >
                                            Read more
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-brand-purple py-20 relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-heading">
                        Have Questions?
                        <br />
                        Speak To A Care Advisor Today
                    </h2>
                    <button className="bg-brand-pink hover:bg-pink-600 text-white font-bold py-4 px-10 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg">
                        Request To Free Care Consultation
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
}
