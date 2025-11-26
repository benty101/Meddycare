"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Check, AlertCircle } from "lucide-react";
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
    const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    // Load saved progress from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('care-request-draft');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setFormData(parsed.formData || formData);
                setCurrentStep(parsed.currentStep || 0);
            } catch (e) {
                console.error('Failed to load saved progress');
            }
        }
    }, []);

    // Save progress to localStorage
    useEffect(() => {
        if (!isComplete) {
            localStorage.setItem('care-request-draft', JSON.stringify({
                formData,
                currentStep,
                lastSaved: new Date().toISOString()
            }));
        } else {
            localStorage.removeItem('care-request-draft');
        }
    }, [formData, currentStep, isComplete]);

    const validateCurrentStep = (): boolean => {
        const errors: Record<string, string> = {};

        if (currentStep === 0) {
            if (!formData.firstName.trim()) errors.firstName = "First name is required";
            if (!formData.lastName.trim()) errors.lastName = "Last name is required";
            if (!formData.gender) errors.gender = "Please select a gender";
        }
        if (currentStep === 1) {
            if (!formData.mobility) errors.mobility = "Please select a mobility level";
        }
        if (currentStep === 2) {
            if (!formData.careType) errors.careType = "Please select a care type";
            if (!formData.startDate) errors.startDate = "Please select when you need care";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleNext = () => {
        // Clear previous errors
        setError(null);

        // Validate current step
        if (!validateCurrentStep()) {
            return;
        }

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
        setError(null);

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
            } else if (formData.startDate === 'Within a month') {
                startDate = new Date(now.setDate(now.getDate() + 30));
            }

            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Please log in to submit a care request');
            }

            const response = await fetch('/api/care-requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Your session has expired. Please log in again.');
                }
                throw new Error(data.error || 'Failed to submit care request');
            }

            setIsComplete(true);
        } catch (error) {
            console.error('Care request submission error:', error);
            const message = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
            setError(message);
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
                <div className="max-w-3xl w-full">
                    <div className="bg-white rounded-3xl shadow-2xl p-12 text-center space-y-8 border border-purple-100">
                        <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                            <Check className="w-12 h-12 text-white" strokeWidth={3} />
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-heading">
                                Request Submitted Successfully!
                            </h2>
                            <p className="text-xl text-gray-600 max-w-xl mx-auto">
                                Thank you for trusting MeddyCare with {formData.firstName}'s care needs.
                            </p>
                        </div>

                        <div className="bg-purple-50 rounded-2xl p-6 text-left space-y-4 max-w-xl mx-auto">
                            <h3 className="font-semibold text-lg text-gray-900 mb-3">What happens next?</h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</div>
                                    <div>
                                        <p className="font-medium text-gray-900">Matching in Progress</p>
                                        <p className="text-sm text-gray-600">Our algorithm is finding the best carers for your needs</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</div>
                                    <div>
                                        <p className="font-medium text-gray-900">Review Matches (within 24 hours)</p>
                                        <p className="text-sm text-gray-600">You'll receive curated carer profiles via email and dashboard</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</div>
                                    <div>
                                        <p className="font-medium text-gray-900">Schedule Interviews</p>
                                        <p className="text-sm text-gray-600">Chat with carers and arrange video or in-person meetings</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 space-y-4">
                            <Link
                                href="/dashboard/family"
                                className="inline-block px-10 py-4 bg-[var(--brand-purple)] text-white rounded-full font-semibold text-lg hover:bg-[var(--brand-purple-light)] transition-all duration-200 transform hover:scale-105 shadow-lg"
                            >
                                View Your Dashboard
                            </Link>
                            <p className="text-sm text-gray-500">
                                📧 Confirmation email sent to your inbox
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
                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-semibold text-red-900 mb-1">Error</p>
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                )}

                {/* Validation Errors */}
                {Object.keys(validationErrors).length > 0 && (
                    <div className="mb-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-2xl">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-semibold text-amber-900 mb-2">Please complete required fields:</p>
                                <ul className="text-sm text-amber-700 space-y-1">
                                    {Object.values(validationErrors).map((error, i) => (
                                        <li key={i}>• {error}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 0 && <StepRecipient data={formData} updateData={setFormData} />}
                {currentStep === 1 && <StepNeeds data={formData} updateData={setFormData} />}
                {currentStep === 2 && <StepSchedule data={formData} updateData={setFormData} />}
                {currentStep === 3 && <StepEnvironment data={formData} updateData={setFormData} />}
            </WizardLayout>
        </div>
    );
}