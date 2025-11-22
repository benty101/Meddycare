import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GetCareWizard from "@/components/get-care/GetCareWizard";

export default function GetCareAssessmentPage() {
    return (
        <div className="min-h-screen bg-brand-light font-sans">
            <Header />

            <main className="pt-12 pb-20">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-purple font-heading mb-4">
                        Care Assessment
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto px-4">
                        Help us understand your needs so we can find the perfect match.
                    </p>
                </div>

                <GetCareWizard />
            </main>

            <Footer />
        </div>
    );
}
