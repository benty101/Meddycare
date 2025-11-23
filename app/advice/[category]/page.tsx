import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Search } from 'lucide-react';
import { notFound } from 'next/navigation';

// Mock Data (In a real app, this would come from a CMS or database)
const categories = {
    "understanding-care": { name: "Understanding Care", color: "bg-purple-100 text-purple-600" },
    "paying-for-care": { name: "Paying for Care", color: "bg-teal-100 text-teal-600" },
    "dementia": { name: "Dementia Advice", color: "bg-orange-100 text-orange-600" },
    "wellbeing": { name: "Carer Wellbeing", color: "bg-pink-100 text-pink-600" }
};

const articles = [
    {
        title: "Spotting the Early Signs of Dementia",
        excerpt: "Learn to recognize the subtle behavioral changes that might indicate early-stage dementia in your loved ones.",
        category: "dementia",
        readTime: "5 min read",
        image: "https://images.pexels.com/photos/339620/pexels-photo-339620.jpeg",
        slug: "early-signs-dementia"
    },
    {
        title: "How to Talk to Your Parents About Care",
        excerpt: "Approaching the subject of care can be difficult. Here are 5 compassionate ways to start the conversation.",
        category: "understanding-care",
        readTime: "6 min read",
        image: "https://images.pexels.com/photos/16364308/pexels-photo-16364308.jpeg",
        slug: "talking-about-care"
    },
    {
        title: "Respite Care: Taking a Break Without Guilt",
        excerpt: "Why taking time for yourself is essential for being a good primary caregiver, and how to arrange temporary support.",
        category: "wellbeing",
        readTime: "4 min read",
        image: "https://images.pexels.com/photos/7688173/pexels-photo-7688173.jpeg",
        slug: "respite-care-guide"
    },
    {
        title: "Funding Live-in Care: A Complete Guide",
        excerpt: "Understanding the costs and funding options available for live-in care in the UK.",
        category: "paying-for-care",
        readTime: "8 min read",
        image: "https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg",
        slug: "funding-live-in-care"
    }
];

export default function CategoryPage({ params }: { params: { category: string } }) {
    const category = categories[params.category as keyof typeof categories];

    if (!category) {
        notFound();
    }

    const categoryArticles = articles.filter(a => a.category === params.category);

    return (
        <>
            <Header />
            <main className="bg-slate-50 min-h-screen">
                {/* Header */}
                <section className="bg-white pt-32 pb-12 border-b border-slate-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link href="/advice" className="inline-flex items-center gap-2 text-slate-500 hover:text-purple-600 mb-8 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Advice Hub
                        </Link>
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center`}>
                                <span className="font-bold text-xl">#</span>
                            </div>
                            <h1 className="font-fraunces text-4xl md:text-5xl text-slate-900">{category.name}</h1>
                        </div>
                        <p className="text-xl text-slate-600 font-urbanist max-w-2xl">
                            Expert guides and articles about {category.name.toLowerCase()}.
                        </p>
                    </div>
                </section>

                {/* Article Grid */}
                <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {categoryArticles.map((article, index) => (
                            <Link key={index} href={`/advice/${params.category}/${article.slug}`}>
                                <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all group cursor-pointer h-full flex flex-col">
                                    <div className="relative aspect-video overflow-hidden">
                                        <Image
                                            src={article.image}
                                            alt={article.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                                            <Clock className="w-3 h-3" />
                                            {article.readTime}
                                        </div>
                                        <h3 className="font-fraunces text-xl text-slate-900 mb-3 group-hover:text-purple-700 transition-colors">
                                            {article.title}
                                        </h3>
                                        <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">
                                            {article.excerpt}
                                        </p>
                                        <span className="text-purple-600 font-bold text-sm">Read more</span>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>

                    {categoryArticles.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-slate-500 text-lg">No articles found in this category yet.</p>
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </>
    );
}
