import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PremiumSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const PremiumSelect = React.forwardRef<HTMLSelectElement, PremiumSelectProps>(
  ({ className, label, error, options, placeholder, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const hasValue = props.value !== "" && props.value !== undefined;

    return (
      <div className="w-full">
        <div className="relative">
          {/* Floating Label */}
          {label && (
            <label
              className={cn(
                "absolute left-4 transition-all duration-200 pointer-events-none font-urbanist z-10",
                isFocused || hasValue
                  ? "top-2 text-xs font-semibold text-(--brand-purple)"
                  : "top-1/2 -translate-y-1/2 text-base text-gray-500"
              )}
            >
              {label}
            </label>
          )}

          {/* Select */}
          <select
            className={cn(
              "w-full rounded-2xl border-2 bg-white transition-all duration-200 appearance-none",
              "focus:outline-none focus:ring-0",
              label ? "pt-6 pb-2" : "py-4",
              "px-4 pr-12",
              error
                ? "border-red-300 focus:border-red-500"
                : "border-gray-200 focus:border-(--brand-purple)",
              "text-gray-900 font-inter text-base",
              className
            )}
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Chevron Icon */}
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>

        {/* Error */}
        {error && (
          <p className="mt-2 text-sm font-inter ml-4 text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

PremiumSelect.displayName = "PremiumSelect";

export { PremiumSelect };