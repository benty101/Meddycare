import * as React from "react";
import Image from "next/image";
import { MapPin, Clock, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarerProfileCardProps {
  name: string;
  location: string;
  experience: string;
  rating?: number;
  reviewSnippet: string;
  avatar?: string;
  specialties?: string[];
  className?: string;
}

const CarerProfileCard = React.forwardRef<HTMLDivElement, CarerProfileCardProps>(
  ({ name, location, experience, rating = 5, reviewSnippet, avatar, specialties, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white rounded-2xl p-6 shadow-sm border border-gray-100",
          "hover:shadow-xl hover:border-(--brand-purple) transition-all duration-300",
          "group cursor-pointer",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar */}
          {avatar ? (
            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-purple-100 group-hover:ring-(--brand-purple) transition-all">
              <Image
                src={avatar}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center flex-shrink-0 ring-2 ring-purple-100 group-hover:ring-(--brand-purple) transition-all">
              <span className="text-2xl font-urbanist font-bold text-white">
                {name.charAt(0)}
              </span>
            </div>
          )}

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="heading-xs text-gray-900 mb-1 group-hover:text-(--brand-purple) transition-colors">
              {name}
            </h3>
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {experience}
              </span>
            </div>
            {/* Rating */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-4 h-4",
                    i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Review Snippet */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3 italic">
          "{reviewSnippet}"
        </p>

        {/* Specialties */}
        {specialties && specialties.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-purple-50 text-(--brand-purple) rounded-full text-xs font-urbanist font-medium"
              >
                {specialty}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }
);

CarerProfileCard.displayName = "CarerProfileCard";

export { CarerProfileCard };