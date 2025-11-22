import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';

export default function BlogIndex() {
    const recentPosts = [
        { 
            title: '£600 million budget boost to social care', 
            date: '12 August 2024',
            image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop'
        },
        { 
            title: 'Arranging care after a hospital discharge', 
            date: '10 August 2024',
            image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop'
        },
        { 
            title: 'Spotting the symptoms of loneliness in old age', 
            date: '8 August 2024',
            image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=400&h=300&fit=crop'
        },
        { 
            title: 'Understanding dementia care at home', 
            date: '5 August 2024',
            image: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?w=400&h=300&fit=crop'
        },
    ];

    const tags = [
        'Live-in Care', 'Dementia', 'Elderly Care', 'Health', 'Family Support',
        'Nutrition', 'Mental Health', 'Mobility', 'Medication', 'Safety',
        'Financial Planning', 'Legal Advice', 'Respite Care', 'End of Life'
    ];

    const featuredPost = {
        title: 'What Is Live-in Care and How Does It Work?',
        excerpt: 'Discover how live-in care works, its benefits, and what to expect when choosing home-based support for your loved ones. Learn about costs, finding the right carer, and making the transition smooth.',
        category: 'Understanding Live-in Care',
        readTime: '8 min read',
        date: '15 Aug, 2024',
        author: 'Dr. Sarah Mitchell',
        authorRole: 'Senior Care Advisor',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop'
    };

    const blogPosts = [
        {
            title: 'The Benefits of Staying at Home vs. Moving into a Care Home',
            excerpt: 'Staying at home gives you independence and control over your daily life. Explore the emotional, financial, and health benefits of choosing live-in care.',
            category: 'Care Options',
            readTime: '7 min read',
            date: '14 Aug, 2024',
            author: 'Emily Roberts',
            image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=600&h=400&fit=crop'
        },
        {
            title: 'How to Choose the Right Live-in Carer for Your Loved One',
            excerpt: 'Finding the right caregiver is about more than qualifications. Learn what questions to ask and how to ensure personality compatibility.',
            category: 'Carer Selection',
            readTime: '6 min read',
            date: '12 Aug, 2024',
            author: 'James Thompson',
            image: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?w=600&h=400&fit=crop'
        },
        {
            title: 'Understanding the Costs of Live-in Care in 2024',
            excerpt: 'A comprehensive breakdown of live-in care costs, funding options, and how to budget for quality care at home.',
            category: 'Financial Planning',
            readTime: '10 min read',
            date: '10 Aug, 2024',
            author: 'Dr. Sarah Mitchell',
            image: 'https://images.unsplash.com/photo-1554224311-beee415c201f?w=600&h=400&fit=crop'
        },
        {
            title: 'Dementia Care: Creating a Safe and Supportive Home Environment',
            excerpt: 'Practical tips for adapting your home for someone with dementia, from lighting to layout and daily routines.',
            category: 'Dementia Care',
            readTime: '9 min read',
            date: '8 Aug, 2024',
            author: 'Emily Roberts',
            image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop'
        },
        {
            title: 'Nutrition and Meal Planning for Elderly Care',
            excerpt: 'Discover nutritious meal ideas and dietary considerations for seniors, including tips for managing special dietary needs.',
            category: 'Health & Wellness',
            readTime: '5 min read',
            date: '6 Aug, 2024',
            author: 'James Thompson',
            image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop'
        },
        {
            title: 'Managing Medications: A Guide for Family Caregivers',
            excerpt: 'Essential tips for organizing medications, preventing errors, and ensuring your loved one takes prescriptions correctly.',
            category: 'Medical Care',
            readTime: '7 min read',
            date: '4 Aug, 2024',
            author: 'Dr. Sarah Mitchell',
            image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=400&fit=crop'
        },
    ];

    return (
        <>
            <Header />

            <main className="bg-white min-h-screen">
                {/* Hero Section */}
                <section className="gradient-purple py-20 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                    </div>
                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="text-center space-y-6 max-w-3xl mx-auto">
                            <div className="inline-block">
                                <span className="badge-primary bg-white/20 text-white border-white/30">
                                    Expert Care Advice
                                </span>
                            </div>
                            <h1 className="heading-hero text-white">
                                MeddyCare <span className="text-yellow-300">Insights</span>
                            </h1>
                            <p className="body-xl text-white/90">
                                Your trusted resource for understanding care options, financial planning, and support for families.
                            </p>
                            
                            {/* Search Bar */}
                            <div className="max-w-2xl mx-auto pt-4">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-(--text-muted)" />
                                    <input
                                        type="text"
                                        placeholder="Search articles..."
                                        className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:border-white/50 transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Category Pills */}
                <section className="bg-white py-6 border-b border-(--border-light) sticky top-0 z-10 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap gap-3">
                            <button className="px-6 py-3 rounded-full gradient-purple text-white font-urbanist font-semibold text-sm hover:opacity-90 transition-all shadow-md">
                                All Articles
                            </button>
                            <button className="px-6 py-3 rounded-full bg-(--brand-purple-50) text-(--brand-purple) font-urbanist font-semibold text-sm hover:bg-(--brand-purple-subtle) transition-colors">
                                Live-in Care
                            </button>
                            <button className="px-6 py-3 rounded-full bg-(--brand-purple-50) text-(--brand-purple) font-urbanist font-semibold text-sm hover:bg-(--brand-purple-subtle) transition-colors">
                                Dementia Care
                            </button>
                            <button className="px-6 py-3 rounded-full bg-(--brand-purple-50) text-(--brand-purple) font-urbanist font-semibold text-sm hover:bg-(--brand-purple-subtle) transition-colors">
                                Financial Planning
                            </button>
                        </div>
                    </div>
                </section>

                {/* Main Content with Sidebar */}
                <section className="py-16 bg-(--bg-gray)">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-4 gap-12">
                            {/* Main Content */}
                            <div className="lg:col-span-3 space-y-12">
                                {/* Featured Post */}
                                <Link href="/blog/sample-post" className="group block">
                                    <div className="card-elevated overflow-hidden p-0">
                                        <div className="relative h-80">
                                            <Image
                                                src={featuredPost.image}
                                                alt={featuredPost.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                                <span className="badge-primary bg-white/20 text-white border-white/30 mb-4">
                                                    {featuredPost.category}
                                                </span>
                                                <h2 className="heading-lg text-white mb-3 group-hover:text-yellow-300 transition-colors">
                                                    {featuredPost.title}
                                                </h2>
                                                <p className="body-md text-white/90 mb-4">
                                                    {featuredPost.excerpt}
                                                </p>
                                                <div className="flex items-center gap-4 text-sm text-white/80">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {featuredPost.date}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4" />
                                                        {featuredPost.readTime}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                {/* Blog Grid */}
                                <div className="grid md:grid-cols-2 gap-8">
                                    {blogPosts.map((post, i) => (
                                        <Link href="/blog/sample-post" key={i} className="group">
                                            <div className="card-flat overflow-hidden p-0 h-full flex flex-col">
                                                <div className="relative h-56 overflow-hidden">
                                                    <Image
                                                        src={post.image}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                </div>
                                                <div className="p-6 flex-1 flex flex-col">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <span className="label-sm text-(--brand-purple) bg-(--brand-purple-50) px-3 py-1 rounded-full">
                                                            {post.category}
                                                        </span>
                                                        <span className="body-sm text-(--text-muted) flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {post.readTime}
                                                        </span>
                                                    </div>
                                                    <h3 className="heading-sm text-(--text-primary) mb-3 group-hover:text-(--brand-purple) transition-colors line-clamp-2">
                                                        {post.title}
                                                    </h3>
                                                    <p className="body-sm text-(--text-secondary) mb-4 line-clamp-3 flex-1">
                                                        {post.excerpt}
                                                    </p>
                                                    <div className="flex items-center justify-between pt-4 border-t border-(--border-light)">
                                                        <span className="body-sm text-(--text-muted)">
                                                            {post.author}
                                                        </span>
                                                        <ArrowRight className="w-5 h-5 text-(--brand-purple) group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Sidebar */}
                            <aside className="lg:col-span-1 space-y-8">
                                {/* Recent Posts */}
                                <div className="card-flat">
                                    <h3 className="heading-sm text-(--text-primary) mb-6">
                                        Recent Posts
                                    </h3>
                                    <div className="space-y-6">
                                        {recentPosts.map((post, i) => (
                                            <Link href="/blog/sample-post" key={i} className="group block">
                                                <div className="flex gap-4">
                                                    <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                                                        <Image
                                                            src={post.image}
                                                            alt={post.title}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="body-sm font-urbanist font-bold text-(--text-primary) line-clamp-2 group-hover:text-(--brand-purple) transition-colors mb-1">
                                                            {post.title}
                                                        </h4>
                                                        <p className="text-xs text-(--text-muted) flex items-center gap-1">
                                                            <Calendar className="w-3 h-3" />
                                                            {post.date}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="card-flat">
                                    <h3 className="heading-sm text-(--text-primary) mb-6">
                                        Popular Topics
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {tags.map((tag, i) => (
                                            <button
                                                key={i}
                                                className="px-3 py-2 bg-(--brand-purple-50) text-(--brand-purple) rounded-full text-xs font-urbanist font-medium hover:bg-(--brand-purple) hover:text-white transition-colors"
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Newsletter CTA */}
                                <div className="gradient-purple rounded-3xl p-6 text-white">
                                    <h3 className="heading-sm text-white mb-3">
                                        Stay Updated
                                    </h3>
                                    <p className="body-sm text-white/90 mb-4">
                                        Get the latest care insights delivered to your inbox.
                                    </p>
                                    <input
                                        type="email"
                                        placeholder="Your email"
                                        className="w-full px-4 py-3 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:border-white/50 transition-all mb-3"
                                    />
                                    <button className="w-full px-6 py-3 bg-white text-(--brand-purple) rounded-full font-urbanist font-bold hover:bg-gray-100 transition-colors">
                                        Subscribe
                                    </button>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}