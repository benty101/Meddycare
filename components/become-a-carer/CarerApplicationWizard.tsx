"use client";

import { useState, useEffect } from "react";
import { Check, AlertCircle } from "lucide-react";
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
        address: "",
        experience: "",
        specializations: [],
        certifications: [],
        driving: "",
        bio: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    // Load saved progress from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('carer-application-draft');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Don't restore password for security
                if (parsed.formData) {
                    const { password, ...restData } = parsed.formData;
                    setFormData({ ...formData, ...restData });
                }
                setCurrentStep(parsed.currentStep || 0);
            } catch (e) {
                console.error('Failed to load saved progress');
            }
        }
    }, []);

    // Save progress to localStorage (excluding password)
    useEffect(() => {
        if (!isComplete) {
            const { password, ...dataToSave } = formData;
            localStorage.setItem('carer-application-draft', JSON.stringify({
                formData: dataToSave,
                currentStep,
                lastSaved: new Date().toISOString()
            }));
        } else {
            localStorage.removeItem('carer-application-draft');
        }
    }, [formData, currentStep, isComplete]);

    const validateCurrentStep = (): boolean => {
        const errors: Record<string, string> = {};

        switch (currentStep) {
            case 0: // Basic Info
                if (!formData.firstName.trim()) errors.firstName = "First name is required";
                if (!formData.lastName.trim()) errors.lastName = "Last name is required";
                if (!formData.email.trim()) errors.email = "Email is required";
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                    errors.email = "Please enter a valid email";
                }
                if (!formData.password) errors.password = "Password is required";
                else if (formData.password.length < 8) {
                    errors.password = "Password must be at least 8 characters";
                }
                if (!formData.phone.trim()) errors.phone = "Phone number is required";
                if (!formData.postcode.trim()) errors.postcode = "Postcode is required";
                if (!formData.address.trim()) errors.address = "Address is required";
                break;
            case 1: // Experience
                if (!formData.experience) errors.experience = "Please select your experience level";
                if (formData.specializations.length === 0) {
                    errors.specializations = "Please select at least one specialization";
                }
                break;
            case 2: // Qualifications
                if (formData.certifications.length === 0) {
                    errors.certifications = "Please select at least one certification";
                }
                if (!formData.driving) errors.driving = "Please indicate if you have a driving license";
                break;
            case 3: // Profile
                if (!formData.bio.trim()) errors.bio = "Bio is required";
                else if (formData.bio.length < 50) {
                    errors.bio = `Bio must be at least 50 characters (currently ${formData.bio.length})`;
                }
                break;
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleNext = () => {
        // Clear previous errors
        setError(null);

        // Validate current step
        if (!validateCurrentStep()) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        if (currentStep < CARER_STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        // Clear errors when going back
        setError(null);
        setValidationErrors({});

        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError(null);

        try {
            const payload = {
                role: 'carer',
                email: formData.email,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone,
                postcode: formData.postcode,
                address: formData.address,
                experience: formData.experience,
                specializations: formData.specializations,
                certifications: formData.certifications,
                bio: formData.bio
            };

            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle error response with detailed messaging
                let errorMessage = 'Registration failed';

                if (Array.isArray(data.error)) {
                    // Zod validation errors
                    const errorList = data.error.map((err: any) =>
                        `${err.path?.join(' → ') || 'Field'}: ${err.message}`
                    );
                    errorMessage = errorList.join(', ');
                } else if (typeof data.error === 'string') {
                    errorMessage = data.error;
                } else if (data.message) {
                    errorMessage = data.message;
                }

                // Special handling for common errors
                if (response.status === 409 || errorMessage.toLowerCase().includes('already exists')) {
                    errorMessage = 'An account with this email already exists. Please try logging in instead.';
                }

                throw new Error(errorMessage);
            }

            // Success! Store token if provided
            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            // Show success state
            setIsComplete(true);

            // Redirect after short delay
            setTimeout(() => {
                window.location.href = '/dashboard/carer';
            }, 3000);

        } catch (error: any) {
            console.error('Carer registration error:', error);
            const message = error instanceof Error
                ? error.message
                : 'Unable to submit application. Please check your connection and try again.';
            setError(message);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isComplete) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center py-16 px-4">
                <div className="max-w-3xl w-full">
                    <div className="bg-white rounded-3xl shadow-2xl p-12 text-center space-y-8 border border-purple-100">
                        <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
                            <Check className="w-12 h-12 text-white" strokeWidth={3} />
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-heading">
                                Welcome to MeddyCare, {formData.firstName}!
                            </h2>
                            <p className="text-xl text-gray-600 max-w-xl mx-auto">
                                Your application has been received successfully.
                            </p>
                        </div>

                        <div className="bg-purple-50 rounded-2xl p-6 text-left space-y-4 max-w-xl mx-auto">
                            <h3 className="font-semibold text-lg text-gray-900 mb-3">What happens next?</h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</div>
                                    <div>
                                        <p className="font-medium text-gray-900">Profile Review (24-48 hours)</p>
                                        <p className="text-sm text-gray-600">Our team will verify your qualifications and experience</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</div>
                                    <div>
                                        <p className="font-medium text-gray-900">Background Checks</p>
                                        <p className="text-sm text-gray-600">DBS check and reference verification process begins</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</div>
                                    <div>
                                        <p className="font-medium text-gray-900">Start Receiving Job Matches</p>
                                        <p className="text-sm text-gray-600">Once approved, you'll see care opportunities in your dashboard</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 max-w-xl mx-auto">
                            <p className="text-sm text-blue-900 font-medium">
                                💼 <strong>Tip:</strong> Complete your profile and add references while you wait to speed up approval
                            </p>
                        </div>

                        <div className="pt-4 space-y-4">
                            <Link
                                href="/dashboard/carer"
                                className="inline-block px-10 py-4 bg-[var(--brand-purple)] text-white rounded-full font-semibold text-lg hover:bg-[var(--brand-purple-light)] transition-all duration-200 transform hover:scale-105 shadow-lg"
                            >
                                Complete Your Profile
                            </Link>
                            <p className="text-sm text-gray-500">
                                📧 Confirmation email sent to {formData.email}
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
                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-semibold text-red-900 mb-1">Registration Error</p>
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

                {currentStep === 0 && <StepBasicInfo data={formData} updateData={setFormData} />}
                {currentStep === 1 && <StepExperience data={formData} updateData={setFormData} />}
                {currentStep === 2 && <StepQualifications data={formData} updateData={setFormData} />}
                {currentStep === 3 && <StepProfile data={formData} updateData={setFormData} />}
            </WizardLayout>
        </div>
    );
}
