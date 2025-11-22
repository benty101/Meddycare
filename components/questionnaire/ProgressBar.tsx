"use client";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-urbanist font-semibold text-white/90">
          Question {currentStep + 1} of {totalSteps}
        </span>
        <span className="text-sm font-urbanist font-semibold text-white/90">
          {Math.round(progress)}% complete
        </span>
      </div>
      <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
        <div
          className="h-full bg-white rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}