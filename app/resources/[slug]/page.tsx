"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock Data for the specific article from design
const ARTICLE = {
    title: "What Is Live-in Care and How Does It Work?",
    author: {
        name: "Andrew Jonson",
        avatar: "/images/avatars/andrew.jpg",
        role: "Care Expert"
    },
    date: "27th January 2022",
    image: "/images/blog/article-hero.jpg",
    content: [
        {
            heading: "Understanding Live-in Care",
            text: "Live-in care is a type of support where a trained caregiver moves into the home and provides round-the-clock assistance. It allows older adults and those with health conditions to stay in the comfort of their own homes while receiving the care they need. Unlike hourly visits, live-in care ensures that someone is always available to offer help, companionship, and reassurance wherever required."
        },
        {
            heading: "What Does a Live-in Carer Do?",
            text: "A live-in carer becomes part of the household and adapts to the individual's daily routines. Their role often includes helping with personal care such as bathing, dressing, and mealtimes; managing medication; offering mobility support; and providing companionship to ease feelings of loneliness. Many carers also assist with light household tasks, ensuring the home environment remains safe and comfortable. Because the support is one-to-one, it is highly flexible and shaped around the person's unique needs."
        },
        {
            heading: "Benefits of Live-in Care",
            text: "One of the main advantages of live-in care is that it allows people to remain in familiar surroundings rather than moving to a residential care home. The home environment provides comfort, independence, and a sense of stability, which can be especially important for those living with conditions like dementia. Families also find peace of mind knowing that their loved one is receiving dedicated attention and consistent support from a trusted caregiver."
        }
    ]
};

const RELATED_POSTS = [
    {
        id: 1,
        title: "The Benefits of Live-in Care for Families",
        excerpt: "Discover how live-in care provides peace of mind, continuous support, and comfort for both individuals and their loved ones.",
        author: "John Doe",
        date: "Aug 23, 2021",
        image: "/images/blog/related-1.jpg",
        slug: "benefits-live-in-care"
    },
    {
        id: 2,
        title: "Comparing Live-in Care vs. Residential Homes",
        excerpt: "Learn the key differences between staying at home with a dedicated carer and moving into a care facility.",
        author: "John Doe",
        date: "Aug 23, 2021",
        image: "/images/blog/related-2.jpg",
        slug: "comparing-care-options"
    },
    {
        id: 3,
        title: "How to Choose the Right Live-in Carer",
        excerpt: "Finding the right caregiver is about more than just skills. Explore what to look for to ensure both professional...",
        author: "John Doe",
        date: "Aug 23, 2021",
        image: "/images/blog/related-3.jpg",
        slug: "choosing-right-carer"
    }
];

export default function ArticlePage({ params }: { params: { slug: string } }) {
    return (
        <div className="min-h-screen bg-white font-sans">
            <Header />

            <main className="pt-12 pb-20">
                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Article Header */}
                    <header className="mb-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                                {/* Placeholder for avatar */}
                            </div>
                            <div>
                                <h3 className="text-brand-purple font-bold text-lg">{ARTICLE.author.name}</h3>
                                <p className="text-gray-500 text-sm">Posted on {ARTICLE.date}</p>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-brand-purple font-heading leading-tight mb-8">
                            {ARTICLE.title}
                        </h1>

                        {/* Hero Image */}
                        <div className="w-full h-[400px] md:h-[500px] bg-gray-200 rounded-3xl overflow-hidden relative mb-12">
                            {/* Placeholder for hero image */}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                Article Hero Image
                            </div>
                        </div>
                    </header>

                    {/* Article Content */}
                    <div className="prose prose-lg max-w-none prose-headings:text-brand-purple prose-headings:font-heading prose-p:text-gray-600 prose-p:leading-relaxed">
                        {ARTICLE.content.map((section, index) => (
                            <div key={index} className="mb-10">
                                <h2 className="text-3xl font-bold mb-4">{section.heading}</h2>
                                <p className="text-lg">{section.text}</p>
                                {index === 2 && (
                                    <p className="text-lg mt-4">
                                        Arranging live-in care usually begins with an assessment, where care providers learn about health conditions, lifestyle, and personal preferences. From there, a suitable caregiver is matched to ensure compatibility not only in terms of skills but also personality. Live-in care can be tailored to short-term needs, such as recovery after a hospital stay, or provided on a long-term basis for ongoing conditions. It is a flexible option designed to promote independence, safety, and overall well-being at home.
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                </article>

                {/* Related Posts */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-12 border-t border-gray-100">
                    <h2 className="text-3xl font-bold text-black mb-10 font-heading">What to read next</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {RELATED_POSTS.map((post) => (
                            <Link href={`/resources/${post.slug}`} key={post.id} className="group block">
                                <div className="h-64 bg-gray-200 rounded-2xl overflow-hidden mb-6">
                                    {/* Placeholder image */}
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-xs text-brand-purple font-medium">
                                        <span>By {post.author}</span>
                                        <span>|</span>
                                        <span>{post.date}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-black group-hover:text-brand-purple transition-colors font-heading leading-snug">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 line-clamp-3 text-sm">
                                        {post.excerpt}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>

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
