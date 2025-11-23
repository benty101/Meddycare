'use client';

import * as React from "react";
import { Star, Shield, Clock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TrustBarProps {
  className?: string;
  variant?: "floating" | "sticky";
}

const TrustBar = React.forwardRef<HTMLDivElement, TrustBarProps>(
  ({ className, variant = "floating" }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true);

    React.useEffect(() => {
      if (variant === "sticky") {
        const handleScroll = () => {
          const scrolled = window.scrollY;
          setIsVisible(scrolled > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }
    }, [variant]);

    const trustItems = [
      {
        icon: Star,
        label: "Trustpilot 4.9/5",
        color: "text-yellow-500",
      },
      {
        icon: Shield,
        label: "CQC Registered",
        color: "text-(--brand-purple-500)",
      },
      {
        icon: CheckCircle,
        label: "Fully Insured",
        color: "text-(--accent-success)",
      },
      {
        icon: Clock,
        label: "24/7 Support",
        color: "text-(--brand-purple-500)",
      },
    ];

    return (
      <div
        ref={ref}
        className={cn(
          "glass border border-white/20 rounded-full px-6 py-3 shadow-lg transition-all duration-500",
          variant === "sticky" && "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
          variant === "sticky" && !isVisible && "translate-y-32 opacity-0",
          variant === "floating" && "animate-slide-in-bottom",
          className
        )}
      >
        <div className="flex items-center gap-8">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <item.icon className={cn("w-5 h-5", item.color)} />
              <span className="label-md text-(--text-primary) whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

TrustBar.displayName = "TrustBar";

export { TrustBar };