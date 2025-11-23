import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CareGuideCardProps {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  href: string;
  featured?: boolean;
  className?: string;
}

const CareGuideCard = React.forwardRef<HTMLDivElement, CareGuideCardProps>(
  ({ title, excerpt, category, readTime, date, author, image, href, featured = false, className }, ref) => {
    return (
      <Link href={href}>
        <div
          ref={ref}
          className={cn(
            "group overflow-hidden bg-white rounded-3xl border border-(--border-light) transition-all duration-500 hover-lift",
            featured ? "h-full" : "h-full",
            className
          )}
        >
          {/* Image Container */}
          <div className={cn(
            "relative overflow-hidden",
            featured ? "h-96" : "h-64"
          )}>
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Category Badge */}
            <div className="absolute top-6 left-6">
              <span className="badge-primary backdrop-blur-sm">
                {category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className={cn("p-8", featured && "p-10")}>
            {/* Meta Info */}
            <div className="flex items-center gap-4 mb-4 text-(--text-muted)">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span className="body-sm">{date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span className="body-sm">{readTime}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className={cn(
              "font-playfair font-bold text-(--text-primary) mb-4 group-hover:text-(--brand-purple-600) transition-colors",
              featured ? "text-4xl leading-tight" : "heading-md"
            )}>
              {title}
            </h3>

            {/* Excerpt */}
            <p className="body-md text-(--text-secondary) mb-6 line-clamp-3">
              {excerpt}
            </p>

            {/* Author & CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-(--border-light)">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-(--text-muted)" />
                <span className="label-md text-(--text-secondary)">{author}</span>
              </div>
              
              <div className="flex items-center gap-2 text-(--brand-purple-600) group-hover:gap-3 transition-all">
                <span className="label-lg">Read More</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
);

CareGuideCard.displayName = "CareGuideCard";

export { CareGuideCard };