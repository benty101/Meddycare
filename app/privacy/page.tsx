import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPage() {
    const sections = [
        {
            title: '1. Information We Collect',
            content: 'We collect information you provide directly to us, such as when you create an account, request care, or contact us. This includes personal details such as name, contact information, care requirements, and payment information. We also collect information automatically through cookies and similar technologies when you use our website.'
        },
        {
            title: '2. How We Use Your Information',
            content: 'We use your information to provide and improve our services, match you with carers, and communicate with you. We use your data to facilitate care arrangements, process payments, communicate with you about our services, and ensure the safety and quality of care provided through our platform.'
        },
        {
            title: '3. Data Security',
            content: 'We implement appropriate security measures to protect your personal data. We comply with GDPR and UK data protection laws to keep your information secure. We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.'
        },
        {
            title: '4. Sharing Your Information',
            content: 'We share your information only with verified carers for the purpose of arranging care services. We may also share data with service providers who assist us in operating our platform, subject to strict confidentiality agreements.'
        },
        {
            title: '5. Your Rights',
            content: 'Under GDPR, you have the right to access, correct, delete, or restrict the processing of your personal data. You also have the right to data portability and to object to certain types of processing. To exercise these rights, please contact us at hello@meddycare.com.'
        },
        {
            title: '6. Cookies and Tracking',
            content: 'We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings.'
        },
        {
            title: '7. Data Retention',
            content: 'We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy or as required by law. When data is no longer needed, we securely delete or anonymize it.'
        },
        {
            title: '8. Children\'s Privacy',
            content: 'Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children.'
        },
        {
            title: '9. Changes to This Policy',
            content: 'We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on our website and updating the "Last Updated" date.'
        },
        {
            title: '10. Contact Us',
            content: 'If you have questions about this Privacy Policy or how we handle your data, please contact us at hello@meddycare.com or call (215) 424-7763.'
        }
    ];

    const highlights = [
        {
            icon: Shield,
            title: 'GDPR Compliant',
            description: 'Full compliance with UK and EU data protection regulations'
        },
        {
            icon: Lock,
            title: 'Secure Storage',
            description: 'Industry-standard encryption and security measures'
        },
        {
            icon: Eye,
            title: 'Transparent',
            description: 'Clear information about how we use your data'
        },
        {
            icon: FileText,
            title: 'Your Rights',
            description: 'Easy access to your data and control over its use'
        }
    ];

    return (
        <>
            <Header />

            <main>
                {/* Hero Section */}
                <section className="bg-(--bg-light-purple) py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="heading-xl text-(--text-primary) mb-4">
                                Privacy <span className="text-(--brand-purple)">Policy</span>
                            </h1>
                            <p className="body-lg text-(--text-secondary) max-w-3xl mx-auto">
                                At MeddyCare, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information.
                            </p>
                            <p className="label-sm text-(--text-muted) mt-4">
                                Last updated: January 2025
                            </p>
                        </div>
                    </div>
                </section>

                {/* Highlights */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {highlights.map((item, index) => (
                                <div key={index} className="bg-(--bg-light-purple) rounded-3xl p-6 text-center space-y-4">
                                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto">
                                        <item.icon size={32} color="var(--brand-purple)" />
                                    </div>
                                    <h3 className="heading-xs text-(--text-primary)">{item.title}</h3>
                                    <p className="label-sm text-(--text-secondary)">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20 bg-white border-t border-gray-100">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Privacy Content */}
                        <div className="space-y-12">
                            {sections.map((section, index) => (
                                <div key={index} className="space-y-4">
                                    <h2 className="heading-sm text-(--text-primary)">{section.title}</h2>
                                    <p className="body-md text-(--text-secondary) leading-relaxed">
                                        {section.content}
                                    </p>
                                    {index < sections.length - 1 && (
                                        <div className="h-px bg-(--border-light) mt-8"></div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="mt-16 text-center bg-(--bg-peach) rounded-3xl p-12">
                            <h3 className="heading-md text-(--text-primary) mb-4">
                                Questions About Your Privacy?
                            </h3>
                            <p className="body-md text-(--text-secondary) mb-6">
                                Our team is here to address any concerns about how we handle your data.
                            </p>
                            <Link href="/contact" className="btn-primary">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
