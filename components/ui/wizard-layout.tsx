import * as React from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProgressIndicator } from "./progress-indicator";

export interface WizardLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  backLabel?: string;
  isNextDisabled?: boolean;
  isLoading?: boolean;
  showProgress?: boolean;
  title?: string;
  subtitle?: string;
  className?: string;
}

const WizardLayout = React.forwardRef<HTMLDivElement, WizardLayoutProps>(
  (
    {
      children,
      currentStep,
      totalSteps,
      onBack,
      onNext,
      nextLabel = "Continue",
      backLabel = "Back",
      isNextDisabled = false,
      isLoading = false,
      showProgress = true,
      title,
      subtitle,
      className,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("w-full max-w-4xl mx-auto px-4 py-8", className)}
      >
        {/* Progress Indicator */}
        {showProgress && (
          <div className="mb-8">
            <ProgressIndicator
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
          </div>
        )}

        {/* Content Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
          {/* Header */}
          {(title || subtitle) && (
            <div className="mb-8 text-center">
              {title && (
                <h2 className="text-3xl md:text-4xl font-urbanist font-bold text-gray-900 mb-3">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-lg font-inter text-gray-600">{subtitle}</p>
              )}
            </div>
          )}

          {/* Main Content */}
          <div className="mb-8">{children}</div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4">
            {/* Back Button */}
            {onBack && currentStep > 0 ? (
              <button
                type="button"
                onClick={onBack}
                disabled={isLoading}
                className={cn(
                  "inline-flex items-center gap-2 px-8 py-3 rounded-full",
                  "border-2 border-gray-300 bg-white text-gray-700",
                  "font-urbanist font-semibold text-base",
                  "hover:border-gray-400 hover:bg-gray-50",
                  "transition-all duration-200",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                <ChevronLeft className="w-5 h-5" />
                {backLabel}
              </button>
            ) : (
              <div />
            )}

            {/* Next Button */}
            {onNext && (
              <button
                type="button"
                onClick={onNext}
                disabled={isNextDisabled || isLoading}
                className={cn(
                  "inline-flex items-center gap-2 px-8 py-3 rounded-full",
                  "bg-(--brand-purple) text-white",
                  "font-urbanist font-semibold text-base",
                  "hover:bg-(--brand-purple-light)",
                  "transition-all duration-200 transform hover:scale-105",
                  "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
                  "shadow-lg"
                )}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </>
                ) : (
                  nextLabel
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

WizardLayout.displayName = "WizardLayout";

export { WizardLayout };