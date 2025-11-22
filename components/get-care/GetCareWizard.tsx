"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import { STEPS } from "./constants";
import StepRecipient from "./StepRecipient";
import StepNeeds from "./StepNeeds";
import StepSchedule from "./StepSchedule";
import StepEnvironment from "./StepEnvironment";
import Link from "next/link";
import { WizardLayout } from "@/components/ui/wizard-layout";

export default function GetCareWizard() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        relationship: "",
        gender: "",
        conditions: [],
        mobility: "",
        careType: "live-in",
        startDate: "",
        bedroom: "",
        pets: "",
        notes: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
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
            // Map careType to scheduleType
            let scheduleType = 'full_time';
            if (formData.careType === 'hourly') scheduleType = 'part_time';
            if (formData.careType === 'respite') scheduleType = 'temporary';

            // Map startDate string to Date object
            let startDate = null;
            const now = new Date();
            if (formData.startDate === 'Immediately') {
                startDate = now;
            } else if (formData.startDate === 'Within 2 weeks') {
                startDate = new Date(now.setDate(now.getDate() + 14));
            }

            const response = await fetch('/api/care-requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
                },
                body: JSON.stringify({
                    recipientData: {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        gender: formData.gender,
                        mobility: formData.mobility,
                        conditions: formData.conditions,
                        notes: formData.notes
                    },
                    careType: formData.careType,
                    scheduleType,
                    startDate,
                    budgetMin: 0,
                    budgetMax: 0
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Request failed');
            }

            setIsComplete(true);
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const isNextDisabled = () => {
        if (currentStep === 0) {
            return !formData.firstName || !formData.lastName;
        }
        if (currentStep === 1) {
            return !formData.mobility;
        }
        if (currentStep === 2) {
            return !formData.careType || !formData.startDate;
        }
        return false;
    };

    if (isComplete) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center py-16 px-4">
                <div className="max-w-2xl w-full">
                    <div className="bg-white rounded-3xl shadow-2xl p-12 text-center space-y-6 border border-purple-100">
                        <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                            <Check className="w-12 h-12 text-white" strokeWidth={3} />
                        </div>
                        <h2 className="heading-lg text-gray-900">Request Submitted!</h2>
                        <p className="body-lg text-gray-600 max-w-md mx-auto">
                            Thank you for your care request. We'll review your needs and match you with suitable carers within 24 hours.
                        </p>
                        <div className="pt-6 space-y-4">
                            <Link href="/dashboard/family" className="btn-primary">
                                Go to Dashboard
                            </Link>
                            <p className="text-sm text-gray-500">
                                Check your email for confirmation details
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
                totalSteps={STEPS.length}
                onBack={handleBack}
                onNext={handleNext}
                nextLabel={currentStep === STEPS.length - 1 ? 'Submit Request' : 'Continue'}
                isNextDisabled={isNextDisabled()}
                isLoading={isSubmitting}
                title={STEPS[currentStep].title}
                subtitle={STEPS[currentStep].description}
            >
                {currentStep === 0 && <StepRecipient data={formData} updateData={setFormData} />}
                {currentStep === 1 && <StepNeeds data={formData} updateData={setFormData} />}
                {currentStep === 2 && <StepSchedule data={formData} updateData={setFormData} />}
                {currentStep === 3 && <StepEnvironment data={formData} updateData={setFormData} />}
            </WizardLayout>
        </div>
    );
}