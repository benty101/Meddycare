import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Clock, Tag, ArrowLeft, ArrowRight } from 'lucide-react';
import { getPostBySlug, getRelatedPosts, getAllPosts } from '@/lib/blog-data';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
    params: {
        slug: string;
    };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const post = getPostBySlug(params.slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.title} | MeddyCare Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [post.image],
            type: 'article',
            publishedTime: post.date,
            authors: [post.author.name],
            tags: post.tags,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [post.image],
        },
        keywords: post.tags.join(', '),
    };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
    const post = getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = getRelatedPosts(post, 3);

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />

            <main>
                {/* Hero Section */}
                <section className="relative pt-32 pb-12 bg-purple-900 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover opacity-20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-purple-900/80 to-purple-900/60"></div>
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link href="/blog" className="inline-flex items-center text-purple-200 hover:text-white mb-6 transition-colors">
                            <ArrowLeft size={20} className="mr-2" />
                            Back to Blog
                        </Link>

                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-4 py-2 bg-purple-500/30 backdrop-blur-sm border border-purple-300/30 rounded-full text-purple-100 font-bold text-sm">
                                {post.category}
                            </span>
                        </div>

                        <h1 className="font-fraunces text-4xl md:text-6xl text-white mb-6">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-purple-100">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center text-purple-900 font-bold text-lg">
                                    {post.author.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-white">{post.author.name}</p>
                                    {post.author.role && <p className="text-sm text-purple-200">{post.author.role}</p>}
                                </div>
                            </div>
                            <span className="flex items-center gap-2">
                                <Calendar size={16} />
                                {post.date}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock size={16} />
                                {post.readTime}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Article Content */}
                <article className="py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-purple-900/5 border border-slate-100">
                            {/* Content - Markdown rendered as HTML */}
                            <div className="prose prose-lg max-w-none
                                            prose-headings:font-fraunces prose-headings:text-slate-900
                                            prose-p:text-slate-700 prose-p:leading-relaxed
                                            prose-a:text-purple-600 prose-a:no-underline hover:prose-a:text-purple-700
                                            prose-strong:text-slate-900 prose-strong:font-bold
                                            prose-ul:text-slate-700 prose-ol:text-slate-700
                                            prose-li:marker:text-purple-500
                                            prose-code:text-purple-700 prose-code:bg-purple-50 prose-code:px-2 prose-code:py-1 prose-code:rounded
                                            prose-pre:bg-slate-800 prose-pre:text-slate-100">
                                {/* For now, rendering content as text. In production, use a markdown parser like react-markdown */}
                                <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
                            </div>

                            {/* Tags */}
                            <div className="mt-12 pt-8 border-t border-slate-100">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <Tag size={20} className="text-slate-400" />
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-purple-50 hover:text-purple-700 transition-colors cursor-pointer"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Author Bio */}
                            {post.author.bio && (
                                <div className="mt-12 p-6 bg-purple-50 rounded-2xl border border-purple-100">
                                    <div className="flex items-start gap-4">
                                        <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center text-purple-900 font-bold text-2xl flex-shrink-0">
                                            {post.author.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 mb-1">About {post.author.name}</h3>
                                            {post.author.role && <p className="text-sm text-purple-700 font-medium mb-2">{post.author.role}</p>}
                                            <p className="text-sm text-slate-600 leading-relaxed">{post.author.bio}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </article>

                {/* Related Posts - "Read Next" */}
                {relatedPosts.length > 0 && (
                    <section className="py-16 bg-slate-100">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="font-fraunces text-3xl text-slate-900 mb-8">Read Next</h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                {relatedPosts.map((relatedPost) => (
                                    <Link
                                        key={relatedPost.id}
                                        href={`/blog/${relatedPost.slug}`}
                                        className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-purple-900/10 hover:-translate-y-1 transition-all duration-300 group flex flex-col"
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <Image
                                                src={relatedPost.image}
                                                alt={relatedPost.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <span className="text-xs font-bold text-purple-600 mb-2">{relatedPost.category}</span>
                                            <h3 className="font-fraunces text-lg text-slate-900 mb-3 group-hover:text-purple-700 transition-colors">
                                                {relatedPost.title}
                                            </h3>
                                            <p className="text-sm text-slate-600 mb-4 line-clamp-2 flex-1">
                                                {relatedPost.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between text-xs text-slate-500">
                                                <span>{relatedPost.readTime}</span>
                                                <ArrowRight size={16} className="text-purple-600 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA Section */}
                <section className="py-20 bg-purple-900 text-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="font-fraunces text-4xl mb-6">Need care advice?</h2>
                        <p className="text-lg text-purple-100 mb-10 max-w-2xl mx-auto">
                            Our care experts are here to help you find the perfect care solution for your loved one.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/get-care" className="btn-primary">
                                Get Started
                            </Link>
                            <Link href="/contact" className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-bold hover:bg-white/20 transition-colors">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
