'use client';

import * as React from "react";
import { cn } from "@/lib/utils";

export interface PremiumInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  helperText?: string;
}

const PremiumInput = React.forwardRef<HTMLInputElement, PremiumInputProps>(
  ({ className, type, label, error, icon, helperText, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const hasValue = props.value !== "" && props.value !== undefined;

    return (
      <div className="w-full">
        <div className="relative">
          {/* Floating Label */}
          {label && (
            <label
              className={cn(
                "absolute left-4 transition-all duration-200 pointer-events-none font-urbanist",
                isFocused || hasValue
                  ? "top-2 text-xs font-semibold text-(--brand-purple)"
                  : "top-1/2 -translate-y-1/2 text-base text-gray-500"
              )}
            >
              {label}
            </label>
          )}

          {/* Icon */}
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}

          {/* Input */}
          <input
            type={type}
            className={cn(
              "w-full rounded-2xl border-2 bg-white transition-all duration-200",
              "focus:outline-none focus:ring-0",
              label ? "pt-6 pb-2" : "py-4",
              icon ? "pl-12 pr-4" : "px-4",
              error
                ? "border-red-300 focus:border-red-500"
                : "border-gray-200 focus:border-(--brand-purple)",
              "text-gray-900 font-inter text-base",
              "placeholder:text-gray-400",
              className
            )}
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
        </div>

        {/* Helper Text or Error */}
        {(helperText || error) && (
          <p
            className={cn(
              "mt-2 text-sm font-inter ml-4",
              error ? "text-red-500" : "text-gray-500"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

PremiumInput.displayName = "PremiumInput";

export { PremiumInput };