import * as React from "react";
import { cn } from "@/lib/utils";

export interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  variant?: "default" | "purple" | "peach" | "teal";
  className?: string;
}

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ icon, title, description, variant = "default", className }, ref) => {
    const variantStyles = {
      default: "bg-white border-2 border-[var(--bg-peach)]",
      purple: "bg-[var(--bg-light-purple)]",
      peach: "bg-[var(--bg-peach)]",
      teal: "bg-[var(--bg-teal)]",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-3xl p-8 space-y-6 transition-all duration-300",
          "hover:shadow-lg hover:-translate-y-1",
          variantStyles[variant],
          className
        )}
      >
        {/* Icon */}
        {icon && (
          <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
            <div className="text-[var(--brand-purple)]">{icon}</div>
          </div>
        )}

        {/* Title */}
        <h3 className="heading-sm text-[var(--text-primary)]">{title}</h3>

        {/* Description */}
        <p className="body-md text-[var(--text-muted)]">{description}</p>
      </div>
    );
  }
);

FeatureCard.displayName = "FeatureCard";

export { FeatureCard };