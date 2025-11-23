import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepCardProps {
  number: number;
  icon?: LucideIcon;
  title: string;
  description: string;
  isLast?: boolean;
  orientation?: "vertical" | "horizontal";
  className?: string;
}

const StepCard = React.forwardRef<HTMLDivElement, StepCardProps>(
  ({ number, icon: Icon, title, description, isLast = false, orientation = "vertical", className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative",
          orientation === "horizontal" ? "flex items-start gap-6" : "flex flex-col",
          className
        )}
      >
        {/* Step Number & Icon */}
        <div className="flex-shrink-0 relative z-10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-(--brand-purple-500) to-(--brand-purple-700) flex items-center justify-center shadow-lg group-hover:shadow-glow transition-shadow duration-300">
            {Icon ? (
              <Icon className="w-8 h-8 text-white" />
            ) : (
              <span className="heading-sm text-white font-bold">{number}</span>
            )}
          </div>

          {/* Connecting Line */}
          {!isLast && orientation === "vertical" && (
            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-(--brand-purple-300) to-transparent" />
          )}
          
          {!isLast && orientation === "horizontal" && (
            <div className="absolute top-8 left-16 w-full h-0.5 bg-gradient-to-r from-(--brand-purple-300) to-transparent" />
          )}
        </div>

        {/* Content */}
        <div className={cn(
          "flex-1",
          orientation === "vertical" ? "mt-6 mb-12" : "pt-2"
        )}>
          <h3 className="heading-sm text-(--text-primary) mb-3">
            {title}
          </h3>
          <p className="body-md text-(--text-secondary) leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    );
  }
);

StepCard.displayName = "StepCard";

export { StepCard };