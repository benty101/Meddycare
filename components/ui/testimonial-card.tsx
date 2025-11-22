import * as React from "react";
import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  location?: string;
  avatar?: string;
  rating?: number;
  className?: string;
}

const TestimonialCard = React.forwardRef<HTMLDivElement, TestimonialCardProps>(
  ({ quote, author, role, location, avatar, rating = 5, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "card-elevated relative overflow-hidden group",
          className
        )}
      >
        {/* Quote Icon Background */}
        <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
          <Quote className="w-16 h-16 text-(--brand-purple)" />
        </div>

        {/* Rating */}
        {rating > 0 && (
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-5 h-5",
                  i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                )}
              />
            ))}
          </div>
        )}

        {/* Quote */}
        <p className="body-md text-(--text-secondary) mb-6 leading-relaxed italic relative z-10">
          "{quote}"
        </p>

        {/* Author */}
        <div className="flex items-center gap-4 pt-4 border-t border-(--border-light)">
          {avatar ? (
            <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-(--brand-purple-subtle)">
              <Image
                src={avatar}
                alt={author}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-(--brand-purple-light) to-(--brand-purple) flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-urbanist font-bold text-white">
                {author.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <p className="heading-xs text-(--text-primary)">{author}</p>
            <p className="body-sm text-(--text-muted)">
              {role && location ? `${role} • ${location}` : role || location}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

TestimonialCard.displayName = "TestimonialCard";

export { TestimonialCard };