"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, ChevronRight } from 'lucide-react';
import { familyQuestions } from './questions/familyQuestions';
import type { QuestionnaireData, ContactInfo } from './types';

export function EmbeddedFamilyQuestionnaire() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<QuestionnaireData>({});
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: '',
    email: '',
    phone: ''
  });
  const currentQuestion = familyQuestions[currentStep];
  const progress = ((currentStep + 1) / familyQuestions.length) * 100;

  const handleAnswer = (questionId: string, value: string | string[]) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
    
    // Auto-advance for single choice questions
    if (currentQuestion.type === 'single-choice') {
      setTimeout(() => {
        if (currentStep < familyQuestions.length - 1) {
          setCurrentStep(prev => prev + 1);
        } else {
          // Redirect to full questionnaire for auth step
          router.push('/families/questionnaire');
        }
      }, 300);
    }
  };

  const handleNext = () => {
    if (currentStep < familyQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      router.push('/families/questionnaire');
    }
  };

  const isSelected = (optionId: string) => {
    const currentResponse = responses[currentQuestion?.id];
    if (Array.isArray(currentResponse)) {
      return currentResponse.includes(optionId);
    }
    return currentResponse === optionId;
  };

  const canProceed = () => {
    const currentResponse = responses[currentQuestion?.id];
    if (currentQuestion?.type === 'multiple-choice') {
      return Array.isArray(currentResponse) && currentResponse.length > 0;
    }
    return !!currentResponse;
  };

  return (
    <section className="py-20 bg-(--brand-purple-50)">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-sora font-bold text-gray-900 mb-4">
            To help us find you the right carer,
          </h2>
          <p className="text-xl text-gray-600 font-urbanist">
            we just need to ask a few questions
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-urbanist font-semibold text-gray-600">
              Question {currentStep + 1} of {familyQuestions.length}
            </span>
            <span className="text-sm font-urbanist font-semibold text-gray-600">
              {Math.round(progress)}% complete
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-purple rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 mb-6">
          <h3 className="text-2xl md:text-3xl font-urbanist font-bold text-gray-900 mb-8">
            {currentQuestion?.question}
          </h3>

          {currentQuestion?.type === 'text' ? (
            <div className="space-y-4">
              <input
                type="text"
                value={typeof responses[currentQuestion.id] === 'string' ? responses[currentQuestion.id] as string : ''}
                onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                placeholder={currentQuestion.placeholder}
                className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-brand-purple focus:ring-4 focus:ring-purple-100 outline-none transition-all font-urbanist"
              />
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="w-full md:w-auto px-8 py-4 bg-brand-purple text-white rounded-full hover:bg-brand-purple-dark transition-all font-urbanist font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          ) : currentQuestion?.type === 'contact' ? (
            <div className="space-y-4 max-w-2xl">
              <div>
                <input
                  type="text"
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                  placeholder="Full Name"
                  className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-brand-purple focus:ring-4 focus:ring-purple-100 outline-none transition-all font-urbanist"
                />
              </div>
              <div>
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                  placeholder="Email Address"
                  className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-brand-purple focus:ring-4 focus:ring-purple-100 outline-none transition-all font-urbanist"
                />
              </div>
              <div>
                <input
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                  placeholder="Phone Number"
                  className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-brand-purple focus:ring-4 focus:ring-purple-100 outline-none transition-all font-urbanist"
                />
              </div>
              <button
                onClick={handleNext}
                disabled={!contactInfo.name || !contactInfo.email || !contactInfo.phone}
                className="w-full md:w-auto px-8 py-4 bg-brand-purple text-white rounded-full hover:bg-brand-purple-dark transition-all font-urbanist font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Sign Up
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {currentQuestion?.options?.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleAnswer(currentQuestion.id, 
                    currentQuestion.type === 'single-choice' ? option.id : 
                    (Array.isArray(responses[currentQuestion.id]) 
                      ? (responses[currentQuestion.id] as string[]).includes(option.id)
                        ? (responses[currentQuestion.id] as string[]).filter(v => v !== option.id)
                        : [...(responses[currentQuestion.id] as string[]), option.id]
                      : [option.id])
                  )}
                  className={`
                    relative p-6 rounded-2xl border-2 text-left transition-all duration-200
                    hover:scale-[1.02] active:scale-[0.98]
                    ${isSelected(option.id)
                      ? 'border-brand-purple bg-brand-purple-subtle shadow-lg'
                      : 'border-gray-200 bg-white hover:border-brand-purple-light hover:shadow-md'
                    }
                  `}
                >
                  {isSelected(option.id) && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-brand-purple rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                  )}
                  <div className="pr-8">
                    <div className={`text-lg font-urbanist font-bold mb-1 ${
                      isSelected(option.id) ? 'text-brand-purple' : 'text-gray-900'
                    }`}>
                      {option.label}
                    </div>
                    {option.description && (
                      <div className="text-sm text-gray-600 font-inter">
                        {option.description}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {currentQuestion?.type === 'multiple-choice' && (
            <div className="mt-6">
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="w-full md:w-auto px-8 py-4 bg-brand-purple text-white rounded-full hover:bg-brand-purple-dark transition-all font-urbanist font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 font-inter">
          Your information is secure and will only be used to match you with suitable carers
        </p>
      </div>
    </section>
  );
}