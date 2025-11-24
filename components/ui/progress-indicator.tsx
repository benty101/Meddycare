import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps?: { label: string; description?: string }[];
  className?: string;
}

const ProgressIndicator = React.forwardRef<
  HTMLDivElement,
  ProgressIndicatorProps
>(({ currentStep, totalSteps, steps, className }, ref) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div ref={ref} className={cn("w-full", className)}>
      {/* Progress Bar */}
      <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-[var(--brand-purple)] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step Labels (Optional) */}
      {steps && (
        <div className="mt-4 flex justify-between">
          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                "flex-1 text-center transition-colors",
                index === currentStep
                  ? "text-[var(--brand-purple)]"
                  : index < currentStep
                    ? "text-gray-600"
                    : "text-gray-400"
              )}
            >
              <div className="text-sm font-urbanist font-semibold">
                {step.label}
              </div>
              {step.description && (
                <div className="text-xs font-inter mt-1">
                  {step.description}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Simple Step Counter */}
      {!steps && (
        <div className="mt-3 text-center">
          <span className="text-sm font-urbanist font-semibold text-[var(--brand-purple)]">
            Step {currentStep + 1} of {totalSteps}
          </span>
        </div>
      )}
    </div>
  );
});

ProgressIndicator.displayName = "ProgressIndicator";

export { ProgressIndicator };