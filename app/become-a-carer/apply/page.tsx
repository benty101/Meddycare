import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarerApplicationWizard from "@/components/become-a-carer/CarerApplicationWizard";

export default function CarerApplyPage() {
    return (
        <div className="min-h-screen bg-brand-light font-sans">
            <Header />

            <main className="pt-12 pb-20">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-purple font-heading mb-4">
                        Complete Your Profile
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto px-4">
                        Tell us about your experience and qualifications to get verified.
                    </p>
                </div>

                <CarerApplicationWizard />
            </main>

            <Footer />
        </div>
    );
}
