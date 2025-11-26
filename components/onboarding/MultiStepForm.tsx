'use client';

import { useState, ReactNode } from 'react';
import { Check } from 'lucide-react';

export interface Step {
  id: string;
  title: string;
  description?: string;
  component: ReactNode;
}

interface MultiStepFormProps {
  steps: Step[];
  onComplete: (data: any) => void | Promise<void>;
  className?: string;
}

export function MultiStepForm({ steps, onComplete, className = '' }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const updateFormData = (stepData: Record<string, any>) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      await onComplete(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-fraunces">
              {steps[currentStep].title}
            </h2>
            {steps[currentStep].description && (
              <p className="text-slate-600 mt-1">{steps[currentStep].description}</p>
            )}
          </div>
          <div className="text-sm text-slate-500 font-medium">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step indicators */}
        <div className="flex justify-between mt-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  index < currentStep
                    ? 'bg-purple-600 text-white'
                    : index === currentStep
                    ? 'bg-purple-600 text-white ring-4 ring-purple-100'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                {index < currentStep ? (
                  <Check size={16} />
                ) : (
                  <span className="text-sm font-bold">{index + 1}</span>
                )}
              </div>
              <span
                className={`text-xs mt-2 text-center hidden sm:block ${
                  index <= currentStep ? 'text-slate-900 font-medium' : 'text-slate-400'
                }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 p-8 border border-slate-100">
        {steps[currentStep].component}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={goToPreviousStep}
            disabled={currentStep === 0}
            className="px-6 py-3 rounded-xl font-bold text-slate-700 hover:bg-slate-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={goToNextStep}
              className="btn-primary px-8 py-3 shadow-lg shadow-purple-200"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={handleComplete}
              disabled={isSubmitting}
              className="btn-primary px-8 py-3 shadow-lg shadow-purple-200 disabled:opacity-70"
            >
              {isSubmitting ? 'Submitting...' : 'Complete'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export { type Step };
