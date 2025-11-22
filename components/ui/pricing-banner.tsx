import * as React from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PricingBannerProps {
  className?: string;
}

const PricingBanner = React.forwardRef<HTMLDivElement, PricingBannerProps>(
  ({ className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "py-16 relative overflow-hidden",
          className
        )}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-white font-urbanist font-semibold text-sm">
                Limited Time Offer
              </span>
            </div>

            {/* Main Content */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-sora font-bold text-white">
                Quality Care from £950/week
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Get <span className="font-bold text-yellow-300">15% off your first month</span> when you book through MeddyCare
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              {[
                "No Hidden Fees",
                "Cancel Anytime",
                "24/7 Support",
                "Vetted Carers"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-white">
                  <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-urbanist font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-6">
              <a
                href="/get-care"
                className="inline-block px-10 py-4 bg-white text-(--brand-purple) rounded-full font-urbanist font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
              >
                Get Your Free Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PricingBanner.displayName = "PricingBanner";

export { PricingBanner };