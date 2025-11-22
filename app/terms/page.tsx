import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function TermsPage() {
    const sections = [
        {
            title: '1. Introduction',
            content: 'Welcome to MeddyCare. By using our website and services, you agree to comply with and be bound by the following terms and conditions. These terms govern your use of the MeddyCare platform, which connects families with independent live-in carers.'
        },
        {
            title: '2. Services',
            content: 'MeddyCare acts as an introductory agency as defined by the CQC. We facilitate connections but do not directly employ carers. MeddyCare operates as an introductory agency connecting families with independent, self-employed carers. We do not directly employ carers but facilitate connections between care seekers and care providers.'
        },
        {
            title: '3. User Obligations',
            content: 'Users must provide accurate information and treat all parties with respect. Users must provide accurate information, maintain the confidentiality of their account credentials, and use our services in compliance with all applicable laws and regulations.'
        },
        {
            title: '4. Carer Verification',
            content: 'While we conduct thorough DBS checks and verification processes, families are encouraged to conduct their own due diligence when selecting a carer. MeddyCare acts as an intermediary and does not assume responsibility for the actions of independent carers.'
        },
        {
            title: '5. Payment Terms',
            content: 'Payment arrangements are made directly between families and carers. MeddyCare may charge a service fee for facilitating connections, which will be clearly communicated before any transaction.'
        },
        {
            title: '6. Privacy and Data Protection',
            content: 'We are committed to protecting your privacy. Please refer to our Privacy Policy for detailed information on how we collect, use, and protect your personal data in compliance with GDPR and UK data protection laws.'
        },
        {
            title: '7. Limitation of Liability',
            content: 'MeddyCare provides a platform for connecting care seekers with carers. We are not liable for any disputes, injuries, or damages arising from care arrangements made through our platform.'
        },
        {
            title: '8. Termination',
            content: 'We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent, abusive, or illegal activities.'
        },
        {
            title: '9. Changes to Terms',
            content: 'We may update these Terms and Conditions from time to time. Continued use of our services after changes constitutes acceptance of the updated terms.'
        },
        {
            title: '10. Contact Information',
            content: 'For questions about these Terms and Conditions, please contact us at hello@meddycare.com or call (215) 424-7763.'
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
                                Terms and <span className="text-(--brand-purple)">Conditions</span>
                            </h1>
                            <p className="body-lg text-(--text-secondary) max-w-3xl mx-auto">
                                Please read these terms carefully before using MeddyCare's services
                            </p>
                            <p className="label-sm text-(--text-muted) mt-4">
                                Last updated: January 2025
                            </p>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Legal Notice */}
                        <div className="bg-(--bg-light-purple) rounded-3xl p-8 mb-12">
                            <h2 className="heading-sm text-(--text-primary) mb-4">Legal Classification</h2>
                            <p className="body-md text-(--text-secondary)">
                                According to the Care Quality Commission (CQC), under the Health & Social Care Act 2008, 
                                companies like MeddyCare are classified as introductory agencies. We connect families 
                                with independent, self-employed carers who are fully vetted and trusted.
                            </p>
                        </div>

                        {/* Terms Content */}
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
                                Have Questions?
                            </h3>
                            <p className="body-md text-(--text-secondary) mb-6">
                                If you need clarification on any of these terms, our team is here to help.
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
