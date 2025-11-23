import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function ArticlePage({ params }: { params: { category: string, slug: string } }) {
    // Mock Data - In reality fetch based on slug
    const article = {
        title: "Spotting the Early Signs of Dementia",
        subtitle: "Learn to recognize the subtle behavioral changes that might indicate early-stage dementia in your loved ones.",
        author: "Dr. Sarah Chen",
        role: "Chief Medical Officer",
        date: "November 15, 2025",
        readTime: "5 min read",
        image: "https://images.pexels.com/photos/339620/pexels-photo-339620.jpeg",
        content: `
      <p>Dementia is not a specific disease but is rather a general term for the impaired ability to remember, think, or make decisions that interferes with doing everyday activities. Alzheimer's disease is the most common type of dementia. Though dementia mostly affects older adults, it is not a part of normal aging.</p>
      
      <h3>Memory Loss That Disrupts Daily Life</h3>
      <p>One of the most common signs of Alzheimer's disease, especially in the early stage, is forgetting recently learned information. Others include forgetting important dates or events, asking the same questions over and over, and increasingly needing to rely on memory aids (e.g., reminder notes or electronic devices) or family members for things they used to handle on their own.</p>
      
      <h3>Challenges in Planning or Solving Problems</h3>
      <p>Some people living with dementia may experience changes in their ability to develop and follow a plan or work with numbers. They may have trouble following a familiar recipe or keeping track of monthly bills. They may have difficulty concentrating and take much longer to do things than they did before.</p>
      
      <h3>Difficulty Completing Familiar Tasks</h3>
      <p>People with Alzheimer's often find it hard to complete daily tasks. Sometimes, people may have trouble driving to a familiar location, organizing a grocery list, or remembering the rules of a favorite game.</p>
    `
    };

    return (
        <>
            <Header />
            <main className="bg-white min-h-screen">
                {/* Progress Bar (Optional - could be added later) */}

                <article>
                    {/* Header */}
                    <header className="relative pt-32 pb-12 bg-slate-50 border-b border-slate-100">
                        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                            <Link href={`/advice/${params.category}`} className="inline-flex items-center gap-2 text-slate-500 hover:text-purple-600 mb-8 transition-colors">
                                <ArrowLeft className="w-4 h-4" /> Back to {params.category.replace('-', ' ')}
                            </Link>

                            <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-bold capitalize">{params.category.replace('-', ' ')}</span>
                                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {article.readTime}</span>
                                <span>{article.date}</span>
                            </div>

                            <h1 className="font-fraunces text-4xl md:text-5xl text-slate-900 leading-tight mb-6">
                                {article.title}
                            </h1>
                            <p className="text-xl text-slate-600 font-urbanist leading-relaxed">
                                {article.subtitle}
                            </p>

                            <div className="flex items-center gap-4 mt-8 pt-8 border-t border-slate-200">
                                <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden relative">
                                    <Image src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg" alt={article.author} fill className="object-cover" />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">{article.author}</p>
                                    <p className="text-sm text-slate-500">{article.role}</p>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12 relative z-10">
                        <div className="aspect-[21/9] rounded-3xl overflow-hidden shadow-xl relative">
                            <Image src={article.image} alt={article.title} fill className="object-cover" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                        <div className="grid grid-cols-12 gap-8">
                            {/* Share Sidebar */}
                            <div className="hidden md:block col-span-2">
                                <div className="sticky top-32 space-y-4">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Share</p>
                                    <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                                        <Twitter className="w-5 h-5" />
                                    </button>
                                    <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-800 hover:text-white transition-colors">
                                        <Facebook className="w-5 h-5" />
                                    </button>
                                    <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-700 hover:text-white transition-colors">
                                        <Linkedin className="w-5 h-5" />
                                    </button>
                                    <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-purple-100 hover:text-purple-600 transition-colors">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Main Text */}
                            <div className="col-span-12 md:col-span-10 prose prose-lg prose-slate prose-headings:font-fraunces prose-headings:text-slate-900 prose-p:font-urbanist prose-p:text-slate-600 prose-a:text-purple-600 hover:prose-a:text-purple-700">
                                <div dangerouslySetInnerHTML={{ __html: article.content }} />
                            </div>
                        </div>
                    </div>
                </article>

                {/* Related Articles */}
                <section className="bg-slate-50 py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="font-fraunces text-3xl text-slate-900 mb-12">Read Next</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Mock Related Articles */}
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                                    <div className="h-48 bg-slate-200 rounded-xl mb-4 relative overflow-hidden">
                                        <Image src={`https://images.pexels.com/photos/${3768130 + i}/pexels-photo-${3768130 + i}.jpeg`} alt="Related" fill className="object-cover" />
                                    </div>
                                    <h3 className="font-fraunces text-xl mb-2">Understanding Care Funding Options</h3>
                                    <p className="text-slate-500 text-sm">A comprehensive guide to financing your care journey...</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
