import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface OptionCardProps {
  label: string;
  description?: string;
  icon?: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

const OptionCard = React.forwardRef<HTMLButtonElement, OptionCardProps>(
  ({ label, description, icon, selected, onClick, className }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        className={cn(
          "relative w-full p-6 rounded-2xl border-2 transition-all duration-200",
          "text-left hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
          selected
            ? "border-[var(--brand-purple)] bg-purple-50"
            : "border-gray-200 bg-white hover:border-[var(--brand-purple-light)]",
          className
        )}
      >
        {/* Selected Indicator */}
        {selected && (
          <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[var(--brand-purple)] flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
        )}

        <div className="flex items-start gap-4">
          {/* Icon */}
          {icon && (
            <div
              className={cn(
                "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                selected ? "bg-[var(--brand-purple)]" : "bg-purple-100"
              )}
            >
              <div className={selected ? "text-white" : "text-[var(--brand-purple)]"}>
                {icon}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3
              className={cn(
                "text-lg font-urbanist font-bold mb-1 transition-colors",
                selected ? "text-[var(--brand-purple)]" : "text-gray-900"
              )}
            >
              {label}
            </h3>
            {description && (
              <p className="text-sm font-inter text-gray-600 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
      </button>
    );
  }
);

OptionCard.displayName = "OptionCard";

export { OptionCard };