"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Check, Sparkles, ArrowRight, Quote } from 'lucide-react';
import Image from 'next/image';
import { ProgressBar } from './ProgressBar';
import { QuestionCard } from './QuestionCard';
import { ContactForm } from './ContactForm';
import { AuthCompletionStep } from './AuthCompletionStep';
import { familyQuestions } from './questions/familyQuestions';
import type { QuestionnaireData, ContactInfo } from './types';

export function FamilyQuestionnaire() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<QuestionnaireData>({});
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: '',
    email: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = familyQuestions[currentStep];
  const isLastQuestion = currentStep === familyQuestions.length - 1;
  const isContactStep = currentQuestion?.type === 'contact';

  const handleNext = () => {
    if (currentStep < familyQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleResponseChange = (questionId: string, value: string | string[]) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await saveQuestionnaireData('google');
      router.push('/dashboard/family');
    } catch (error) {
      console.error('Google sign-in failed', error);
      alert('Sign-in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignup = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: 'family',
          email,
          password,
          firstName: contactInfo.name.split(' ')[0],
          lastName: contactInfo.name.split(' ').slice(1).join(' '),
          phone: contactInfo.phone
        })
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      await saveQuestionnaireData('email');
      router.push('/dashboard/family');
    } catch (error) {
      console.error('Email signup failed', error);
      alert('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestCallback = async () => {
    setIsLoading(true);
    try {
      await saveQuestionnaireData('callback');
      setIsComplete(true);
    } catch (error) {
      console.error('Callback request failed', error);
      alert('Request failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const saveQuestionnaireData = async (authMethod: 'google' | 'email' | 'callback') => {
    const response = await fetch('/api/questionnaire', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'family',
        responses,
        contactInfo,
        authMethod,
        status: 'pending'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to save questionnaire data');
    }
  };

  const isNextDisabled = () => {
    if (isContactStep) {
      return !contactInfo.name || !contactInfo.email || !contactInfo.phone;
    }
    const currentResponse = responses[currentQuestion?.id];
    if (Array.isArray(currentResponse)) {
      return currentResponse.length === 0;
    }
    return !currentResponse;
  };

  if (isComplete) {
    // Redirect to matches page instead of showing success screen
    router.push('/families/matches');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Left Panel - Editorial Image (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-12">
        <Image
          src="https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg"
          alt="Care background"
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

        <div className="relative z-10 max-w-lg text-white space-y-8">
          <Quote className="w-12 h-12 text-purple-400 opacity-80" />
          <p className="text-3xl font-fraunces leading-tight">
            "Finding a carer who truly understood my mother's needs was life-changing. MeddyCare made it simple."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm overflow-hidden relative">
              <Image src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" alt="Sarah" fill className="object-cover" />
            </div>
            <div>
              <p className="font-bold">Sarah Jenkins</p>
              <p className="text-sm text-slate-300">Daughter & Primary Caregiver</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Questionnaire */}
      <div className="flex-1 flex flex-col justify-center p-6 md:p-12 lg:p-20 bg-slate-50 overflow-y-auto h-screen">
        <div className="max-w-xl mx-auto w-full space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button onClick={() => router.push('/')} className="text-slate-400 hover:text-purple-600 transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
              <ChevronLeft className="w-4 h-4" /> Exit
            </button>
            <div className="text-slate-400 text-sm font-bold">
              Step {currentStep + 1} of {familyQuestions.length}
            </div>
          </div>

          {/* Progress Bar */}
          <ProgressBar currentStep={currentStep} totalSteps={familyQuestions.length} />

          {/* Question Content */}
          <div className="space-y-8 min-h-[400px]">
            <h1 className="text-3xl md:text-4xl font-fraunces text-slate-900 leading-tight">
              {currentQuestion?.question}
            </h1>

            {isContactStep ? (
              <ContactForm value={contactInfo} onChange={setContactInfo} />
            ) : isLastQuestion ? (
              <AuthCompletionStep
                onGoogleSignIn={handleGoogleSignIn}
                onEmailSignup={handleEmailSignup}
                onRequestCallback={handleRequestCallback}
                isLoading={isLoading}
              />
            ) : (
              <QuestionCard
                question={currentQuestion}
                value={responses[currentQuestion?.id] || (currentQuestion?.type === 'multiple-choice' ? [] : '')}
                onChange={(value) => handleResponseChange(currentQuestion?.id, value)}
              />
            )}
          </div>

          {/* Navigation Buttons */}
          {!isLastQuestion && (
            <div className="flex items-center justify-between pt-8 border-t border-slate-200">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`text-slate-500 font-bold hover:text-slate-800 transition-colors ${currentStep === 0 ? 'opacity-0 cursor-default' : ''}`}
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={isNextDisabled()}
                className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all font-bold shadow-lg shadow-purple-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                Continue <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}