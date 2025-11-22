"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Check, Sparkles } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
import { QuestionCard } from './QuestionCard';
import { ContactForm } from './ContactForm';
import { AuthCompletionStep } from './AuthCompletionStep';
import { carerQuestions } from './questions/carerQuestions';
import type { QuestionnaireData, ContactInfo } from './types';

export function CarerQuestionnaire() {
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

  const currentQuestion = carerQuestions[currentStep];
  const isLastQuestion = currentStep === carerQuestions.length - 1;
  const isContactStep = currentQuestion?.type === 'contact';

  const handleNext = () => {
    if (currentStep < carerQuestions.length - 1) {
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
      // TODO: Implement Google OAuth
      await saveQuestionnaireData('google');
      router.push('/dashboard/carer');
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
          role: 'carer',
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
      router.push('/dashboard/carer');
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
        type: 'carer',
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
    return (
      <div className="min-h-screen flex items-center justify-center py-16 px-4" style={{ background: 'linear-gradient(to bottom, #3d4db5, #5B7FED, #3d4db5)' }}>
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center space-y-6">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <Check className="w-12 h-12 text-white" strokeWidth={3} />
            </div>
            <h2 className="text-3xl font-sora font-bold text-gray-900">
              We'll be in touch soon!
            </h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto font-inter">
              Thank you for your interest in joining MeddyCare. Our recruitment team will call you within 24 hours to discuss opportunities.
            </p>
            <div className="pt-6">
              <a href="/" className="inline-block px-8 py-4 bg-brand-purple text-white rounded-full font-urbanist font-semibold hover:bg-brand-purple-dark transition-all">
                Return to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: 'linear-gradient(to bottom, #3d4db5, #5B7FED, #3d4db5)' }}>
      <div className="max-w-4xl mx-auto">
        {/* New Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-pink rounded-full">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-white font-urbanist font-bold text-sm uppercase tracking-wide">
              New
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-sora font-bold text-white mb-3">
            To match you with the right families,
          </h1>
          <p className="text-xl text-purple-200 font-urbanist font-semibold">
            we'll ask a few short questions.
          </p>
        </div>

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} totalSteps={carerQuestions.length} />

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8">
          <h2 className="text-2xl md:text-3xl font-urbanist font-bold text-gray-900 mb-8 text-center">
            {currentQuestion?.question}
          </h2>

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

        {/* Navigation */}
        {!isLastQuestion && (
          <div className="flex items-center justify-between">
            {currentStep > 0 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all font-urbanist font-semibold border border-white/20"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={isNextDisabled()}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-purple rounded-full hover:bg-gray-100 transition-all font-urbanist font-bold shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}