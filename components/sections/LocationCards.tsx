import { MapPin, Users, Briefcase } from 'lucide-react';

const locations = [
  { city: "London", activeCarers: "500+", opportunities: "Live-in, Visiting" },
  { city: "Manchester", activeCarers: "200+", opportunities: "Live-in, Visiting" },
  { city: "Birmingham", activeCarers: "180+", opportunities: "Live-in, Visiting" },
  { city: "Leeds", activeCarers: "120+", opportunities: "Live-in, Visiting" },
  { city: "Bristol", activeCarers: "150+", opportunities: "Live-in, Visiting" },
  { city: "Edinburgh", activeCarers: "100+", opportunities: "Live-in, Visiting" },
  { city: "Liverpool", activeCarers: "110+", opportunities: "Live-in, Visiting" },
  { city: "Glasgow", activeCarers: "90+", opportunities: "Live-in, Visiting" },
  { city: "Newcastle", activeCarers: "80+", opportunities: "Live-in, Visiting" }
];

export function LocationCards() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-sora font-bold text-gray-900 mb-4">
            Are you in one of the following locations?
          </h2>
          <p className="text-lg text-gray-600 font-urbanist">
            Join our growing community of carers across Great Britain
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-brand-purple hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-brand-purple-subtle rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-brand-purple" />
                </div>
                <h3 className="text-xl font-urbanist font-bold text-gray-900">
                  {location.city}
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-5 h-5 text-brand-purple" />
                  <span className="text-sm font-urbanist">
                    <span className="font-bold text-brand-purple">{location.activeCarers}</span> active carers
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase className="w-5 h-5 text-brand-purple" />
                  <span className="text-sm font-urbanist">{location.opportunities}</span>
                </div>
              </div>
              
              <button className="mt-4 w-full px-4 py-2 bg-brand-purple-subtle text-brand-purple rounded-full font-urbanist font-semibold hover:bg-brand-purple hover:text-white transition-all">
                View Opportunities
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}