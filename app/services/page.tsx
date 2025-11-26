import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import {
    Heart,
    Clock,
    Home,
    Brain,
    Activity,
    Phone,
    CheckCircle,
    ArrowRight,
    ShieldCheck,
    Star
} from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { ScaleIn } from '@/components/animations/ScaleIn';

export const metadata = {
    title: 'Our Care Services | MeddyCare',
    description: 'Comprehensive live-in care services including dementia care, respite care, and emergency support. Find the perfect carer for your loved one.',
};

export default function ServicesPage() {
    const services = [
        {
            title: "Live-in Care",
            description: "24/7 support in the comfort of your own home. A dedicated carer lives with you to provide continuous care and companionship.",
            icon: <Home className="w-8 h-8 text-[var(--brand-purple)]" />,
            price: "From £950/week",
            features: ["One-to-one attention", "Stay in your own home", "Couples can stay together"],
            link: "/services/live-in-care"
        },
        {
            title: "Respite Care",
            description: "Temporary care to give family carers a well-deserved break. Flexible duration from a few days to several weeks.",
            icon: <Clock className="w-8 h-8 text-[var(--brand-purple)]" />,
            price: "Flexible rates",
            features: ["Cover for holidays", "Emergency cover", "Trial periods"],
            link: "/services/respite-care"
        },
        {
            title: "Dementia Care",
            description: "Specialized support for those living with dementia. Our carers are trained to manage symptoms and provide a safe environment.",
            icon: <Brain className="w-8 h-8 text-[var(--brand-purple)]" />,
            price: "Specialized rates",
            features: ["Memory support", "Routine maintenance", "Safe environment"],
            link: "/services/dementia-care"
        },
        {
            title: "Visiting Care",
            description: "Flexible hourly support for those who need a helping hand but don't require full-time live-in care.",
            icon: <Activity className="w-8 h-8 text-[var(--brand-purple)]" />,
            price: "Hourly rates",
            features: ["Personal care", "Medication prompts", "Companionship"],
            link: "/services/visiting-care"
        },
        {
            title: "Post-Hospital Care",
            description: "Reablement support to help you recover safely at home after a hospital stay or surgery.",
            icon: <ShieldCheck className="w-8 h-8 text-[var(--brand-purple)]" />,
            price: "Short-term plans",
            features: ["Rehabilitation support", "Medication management", "Coordination with GPs"],
            link: "/services/post-hospital-care"
        },
        {
            title: "Palliative Care",
            description: "Compassionate end-of-life care focused on comfort, dignity, and quality of life for you and your family.",
            icon: <Heart className="w-8 h-8 text-[var(--brand-purple)]" />,
            price: "Compassionate rates",
            features: ["Pain management", "Emotional support", "Family guidance"],
            link: "/services/palliative-care"
        }
    ];

    return (
        <>
            <Header />

            <main className="bg-white">
                {/* Hero Section */}
                <section className="bg-[var(--bg-purple-light)] py-20 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center max-w-3xl mx-auto space-y-6">
                            <FadeIn>
                                <span className="badge-primary mb-4 inline-block">
                                    Comprehensive Care Solutions
                                </span>
                                <h1 className="heading-hero text-[var(--text-primary)]">
                                    Care tailored to <span className="text-[var(--brand-purple)]">your unique needs</span>
                                </h1>
                                <p className="body-xl text-[var(--text-secondary)]">
                                    From companionship to complex medical support, we match you with vetted professionals who treat your loved ones like family.
                                </p>
                            </FadeIn>
                        </div>
                    </div>

                    {/* Decorative background elements */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--brand-purple)]/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
                </section>

                {/* Emergency Care Banner - "Contact Us" CTA */}
                <section className="py-12 bg-white border-b border-[var(--border-light)]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-red-50 rounded-3xl p-8 md:p-12 border border-red-100 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-8 h-8 text-red-600" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="heading-md text-red-900">Need Urgent Care?</h2>
                                    <p className="body-md text-red-700 max-w-xl">
                                        We understand that care needs can change suddenly. Our team is available to help arrange emergency support when you need it most.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="tel:01189899970" className="px-8 py-4 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-colors shadow-lg flex items-center gap-2">
                                    <Phone className="w-5 h-5" />
                                    Call 0118 989 9970
                                </a>
                                <Link href="/contact" className="px-8 py-4 bg-white text-red-600 border-2 border-red-200 rounded-full font-bold hover:bg-red-50 transition-colors">
                                    Contact Support
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <ScaleIn key={index} delay={index * 0.1} className="group">
                                    <div className="h-full bg-white rounded-3xl p-8 shadow-sm border border-[var(--border-light)] hover:shadow-xl hover:border-[var(--brand-purple-light)] transition-all duration-300 flex flex-col">
                                        <div className="w-16 h-16 rounded-2xl bg-[var(--bg-purple-light)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            {service.icon}
                                        </div>

                                        <h3 className="heading-md mb-3 text-[var(--text-primary)] group-hover:text-[var(--brand-purple)] transition-colors">
                                            {service.title}
                                        </h3>

                                        <p className="body-md text-[var(--text-secondary)] mb-6 flex-grow">
                                            {service.description}
                                        </p>

                                        <div className="space-y-4 mb-8">
                                            <div className="text-sm font-semibold text-[var(--brand-purple)] bg-[var(--bg-purple-light)] px-4 py-2 rounded-full inline-block">
                                                {service.price}
                                            </div>
                                            <ul className="space-y-2">
                                                {service.features.map((feature, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                                                        <CheckCircle className="w-4 h-4 text-[var(--accent-success)]" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <Link href={service.link} className="inline-flex items-center text-[var(--brand-purple)] font-semibold hover:gap-2 transition-all group-hover:translate-x-1">
                                            Learn more <ArrowRight className="w-4 h-4 ml-1" />
                                        </Link>
                                    </div>
                                </ScaleIn>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Comparison Section */}
                <section className="py-20 bg-[var(--bg-gray)]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="heading-xl mb-4">
                                Why Choose <span className="text-[var(--brand-purple)]">Live-in Care?</span>
                            </h2>
                            <p className="body-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                                Compare the benefits of staying in your own home versus moving to a residential care facility.
                            </p>
                        </div>

                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[var(--border-light)] max-w-5xl mx-auto">
                            <div className="grid grid-cols-3 bg-[var(--brand-purple)] text-white p-6">
                                <div className="font-urbanist font-bold text-lg">Feature</div>
                                <div className="text-center font-urbanist font-bold text-lg">MeddyCare</div>
                                <div className="text-center font-urbanist font-bold text-lg opacity-80">Care Home</div>
                            </div>
                            <div className="divide-y divide-[var(--border-light)]">
                                {[
                                    { feature: "One-to-one care ratio", meddycare: "✓", careHome: "✗ (1:15+)" },
                                    { feature: "Stay in familiar surroundings", meddycare: "✓", careHome: "✗" },
                                    { feature: "Keep beloved pets", meddycare: "✓", careHome: "Rarely" },
                                    { feature: "Couples stay together", meddycare: "✓", careHome: "Depends on availability" },
                                    { feature: "Flexible daily routine", meddycare: "✓", careHome: "Fixed schedules" },
                                    { feature: "Reduced infection risk", meddycare: "✓", careHome: "Higher risk" },
                                    { feature: "Cost effective", meddycare: "From £950/wk", careHome: "£1,200+/wk" }
                                ].map((row, i) => (
                                    <div key={i} className="grid grid-cols-3 p-6 hover:bg-[var(--bg-gray)] transition-colors">
                                        <div className="font-urbanist font-semibold text-[var(--text-primary)]">{row.feature}</div>
                                        <div className="text-center">
                                            {row.meddycare === "✓" ? (
                                                <CheckCircle className="w-6 h-6 text-[var(--accent-success)] mx-auto" />
                                            ) : (
                                                <span className="font-urbanist font-bold text-[var(--brand-purple)]">{row.meddycare}</span>
                                            )}
                                        </div>
                                        <div className="text-center text-[var(--text-muted)] font-urbanist">{row.careHome}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="heading-xl mb-6">
                            Ready to find the <span className="text-[var(--brand-purple)]">perfect carer?</span>
                        </h2>
                        <p className="body-lg text-[var(--text-secondary)] mb-10">
                            Our care advisors are here to help you understand your options and find the right support for your family.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/families/questionnaire" className="btn-primary">
                                Get a Free Quote
                            </Link>
                            <a href="tel:01189899970" className="btn-secondary flex items-center justify-center gap-2">
                                <Phone className="w-5 h-5" />
                                Speak to an Advisor
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
