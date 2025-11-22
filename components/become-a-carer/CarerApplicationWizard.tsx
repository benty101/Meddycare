"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { CARER_STEPS } from "./constants";
import StepBasicInfo from "./StepBasicInfo";
import StepExperience from "./StepExperience";
import StepQualifications from "./StepQualifications";
import StepProfile from "./StepProfile";
import Link from "next/link";
import { WizardLayout } from "@/components/ui/wizard-layout";

export default function CarerApplicationWizard() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        postcode: "",
        experience: "",
        specializations: [],
        certifications: [],
        driving: "",
        bio: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const handleNext = () => {
        if (currentStep < CARER_STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    role: 'carer',
                    email: formData.email,
                    password: formData.password,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    phone: formData.phone,
                    postcode: formData.postcode,
                    experience: formData.experience,
                    specializations: formData.specializations,
                    certifications: formData.certifications,
                    bio: formData.bio
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Registration failed');
            }

            const data = await response.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            setIsComplete(true);
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isComplete) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center py-16 px-4">
                <div className="max-w-2xl w-full">
                    <div className="bg-white rounded-3xl shadow-2xl p-12 text-center space-y-6 border border-purple-100">
                        <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                            <Check className="w-12 h-12 text-white" strokeWidth={3} />
                        </div>
                        <h2 className="heading-lg text-gray-900">Application Received!</h2>
                        <p className="body-lg text-gray-600 max-w-md mx-auto">
                            Thanks for applying, {formData.firstName}. Our recruitment team will review your profile and get back to you within 48 hours.
                        </p>
                        <div className="pt-6 space-y-4">
                            <Link href="/dashboard/carer" className="btn-primary">
                                Go to Dashboard
                            </Link>
                            <p className="text-sm text-gray-500">
                                Check your email for next steps
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
            <WizardLayout
                currentStep={currentStep}
                totalSteps={CARER_STEPS.length}
                onBack={handleBack}
                onNext={handleNext}
                nextLabel={currentStep === CARER_STEPS.length - 1 ? 'Submit Application' : 'Continue'}
                isNextDisabled={false}
                isLoading={isSubmitting}
                title={CARER_STEPS[currentStep].title}
                subtitle={CARER_STEPS[currentStep].description}
            >
                {currentStep === 0 && <StepBasicInfo data={formData} updateData={setFormData} />}
                {currentStep === 1 && <StepExperience data={formData} updateData={setFormData} />}
                {currentStep === 2 && <StepQualifications data={formData} updateData={setFormData} />}
                {currentStep === 3 && <StepProfile data={formData} updateData={setFormData} />}
            </WizardLayout>
        </div>
    );
}
