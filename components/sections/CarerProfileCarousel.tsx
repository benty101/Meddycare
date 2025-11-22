import Image from 'next/image';
import { MapPin, Star } from 'lucide-react';

const featuredCarers = [
  {
    name: "Anna",
    location: "Manchester",
    experience: "24 years",
    rating: 5,
    testimonial: "Anna came at short notice when our previous carer had a family emergency. She wa...",
    avatar: "https://i.pravatar.cc/150?u=anna"
  },
  {
    name: "David",
    location: "London",
    experience: "15 years",
    rating: 5,
    testimonial: "David has been wonderful with my father. His patience and genuine care shine through...",
    avatar: "https://i.pravatar.cc/150?u=david"
  },
  {
    name: "Sarah",
    location: "Birmingham",
    experience: "18 years",
    rating: 5,
    testimonial: "Sarah is absolutely brilliant. My mother looks forward to her visits every day...",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    name: "Michael",
    location: "Leeds",
    experience: "12 years",
    rating: 5,
    testimonial: "Michael's experience with dementia care has been invaluable. He's patient and kind...",
    avatar: "https://i.pravatar.cc/150?u=michael"
  },
  {
    name: "Emma",
    location: "Bristol",
    experience: "20 years",
    rating: 5,
    testimonial: "Emma has made such a difference to my grandmother's quality of life. Highly recommend...",
    avatar: "https://i.pravatar.cc/150?u=emma"
  },
  {
    name: "James",
    location: "Edinburgh",
    experience: "16 years",
    rating: 5,
    testimonial: "James is professional, caring and always goes the extra mile. We couldn't ask for better...",
    avatar: "https://i.pravatar.cc/150?u=james"
  }
];

export function CarerProfileCarousel() {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {featuredCarers.map((carer, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-72 bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow snap-start"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={carer.avatar}
                    alt={carer.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-urbanist font-bold text-lg text-gray-900 truncate">
                    {carer.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{carer.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(carer.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 font-inter line-clamp-3">
                  {carer.testimonial}
                </p>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm font-urbanist font-semibold text-brand-purple">
                  {carer.experience} experience
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}