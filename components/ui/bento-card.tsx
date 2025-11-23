import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BentoCardProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  size?: "small" | "medium" | "large";
  gradient?: boolean;
  pattern?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const BentoCard = React.forwardRef<HTMLDivElement, BentoCardProps>(
  ({ icon: Icon, title, description, size = "medium", gradient = false, pattern = false, className, children }, ref) => {
    const sizeClasses = {
      small: "col-span-1 row-span-1",
      medium: "col-span-1 md:col-span-2 row-span-1",
      large: "col-span-1 md:col-span-2 row-span-2",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "card-bento group",
          sizeClasses[size],
          gradient && "bg-gradient-to-br from-(--brand-purple-50) to-white",
          pattern && "noise-texture",
          className
        )}
      >
        {/* Icon */}
        {Icon && (
          <div className="mb-6 inline-flex">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-(--brand-purple-500) to-(--brand-purple-700) flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Icon className="w-7 h-7 text-white" />
            </div>
          </div>
        )}

        {/* Title */}
        <h3 className="heading-md text-(--text-primary) mb-4 group-hover:text-(--brand-purple-600) transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="body-md text-(--text-secondary) leading-relaxed">
          {description}
        </p>

        {/* Optional Children */}
        {children && (
          <div className="mt-6">
            {children}
          </div>
        )}

        {/* Hover Effect Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-(--brand-purple-500) to-(--accent-pink) transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-3xl" />
      </div>
    );
  }
);

BentoCard.displayName = "BentoCard";

export { BentoCard };