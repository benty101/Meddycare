import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import CheckCircleIcon from '@/src/components/icons/CheckCircleIcon';
import TrendingUpIcon from '@/src/components/icons/TrendingUpIcon';
import ClipboardIcon from '@/src/components/icons/ClipboardIcon';
import HandsHeartIcon from '@/src/components/icons/HandsHeartIcon';
import RefreshIcon from '@/src/components/icons/RefreshIcon';
import UserCheckIcon from '@/src/components/icons/UserCheckIcon';
import InstagramIcon from '@/src/components/icons/InstagramIcon';
import XIcon from '@/src/components/icons/XIcon';
import YouTubeIcon from '@/src/components/icons/YouTubeIcon';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Star, Sparkles, Phone } from 'lucide-react';
import { TestimonialCard } from '@/components/ui/testimonial-card';

export default function Home() {
  const testimonials = [
    {
      quote: "Sarah has been absolutely wonderful with my mother. Her patience and genuine care shine through every day. We couldn't ask for a better carer.",
      author: "Margaret Thompson",
      role: "Daughter",
      location: "Manchester",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=margaret"
    },
    {
      quote: "The matching process was seamless and we found the perfect carer for my father. He's so much happier staying in his own home with professional support.",
      author: "David Chen",
      role: "Son",
      location: "London",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=david"
    },
    {
      quote: "MeddyCare connected us with an experienced dementia carer who truly understands my husband's needs. It's given our family peace of mind.",
      author: "Emily Roberts",
      role: "Wife",
      location: "Birmingham",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=emily"
    }
  ];

  const faqItems = [
    {
      question: "What services does MeddyCare provide?",
      answer: "MeddyCare offers complete elder care services including personal care assistance, help with daily hygiene, nutritious meal preparation, medication reminders, mobility support, and emotional companionship. We also provide specialized medical monitoring and ensure a safe, nurturing environment for seniors."
    },
    {
      question: "How do you ensure the safety of seniors?",
      answer: "We ensure safety through comprehensive background checks, DBS verification, and ongoing monitoring of all our carers. Every carer goes through a rigorous vetting process before being approved to work with families."
    },
    {
      question: "Can the care plan be customized?",
      answer: "Yes, all care plans are fully customizable to meet the specific needs and preferences of each individual. We work closely with families to create tailored care solutions."
    },
    {
      question: "Do you provide medical support as well?",
      answer: "Yes, we provide specialized medical monitoring and support as part of our comprehensive care services. Our carers are trained to assist with medication management and health tracking."
    },
    {
      question: "How can I get started with MeddyCare?",
      answer: "Simply fill out our contact form or call us directly to schedule a free consultation with one of our care advisors. We'll guide you through the entire process."
    }
  ];

  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-(--bg-purple-light) py-20 lg:py-28 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8 animate-fade-in">
                <div className="inline-block">
                  <span className="badge-primary">
                    Caring for Every Golden Year
                  </span>
                </div>

                <h1 className="heading-hero text-(--text-primary)">
                  Search <span className="text-(--brand-purple)">and connect</span> with trusted live-in carers
                </h1>

                <p className="body-xl text-(--text-secondary) max-w-xl">
                  We have connected over 5,000 families with professional, self-employed carers across the UK. 
                  Share your needs, explore your options, and choose the right carer for your loved one.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/families/questionnaire" className="btn-primary text-center">
                    Find a Carer Today
                  </Link>
                  <a href="tel:01189899970" className="btn-secondary text-center inline-flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5" />
                    Call 0118 989 9970
                  </a>
                </div>

                {/* Trust Badge */}
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="body-sm font-urbanist font-semibold text-(--text-secondary)">
                      Excellent 4.9/5 from 778 reviews
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Image Collage */}
              <div className="relative h-[600px]">
                {/* Decorative arrows */}
                <svg className="absolute top-8 right-32 w-32 h-32 text-(--accent-pink) opacity-60" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20,80 Q50,20 80,60" />
                  <path d="M75,55 L80,60 L75,65" />
                </svg>
                <svg className="absolute bottom-12 right-8 w-24 h-24 text-(--accent-pink) opacity-60" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M80,20 Q50,80 20,40" />
                  <path d="M25,35 L20,40 L25,45" />
                </svg>

                {/* Main large circle - top right */}
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full overflow-hidden border-4 border-(--brand-purple-light) shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1763257470686-0fa348ebe11a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw4fHxlbGRlcmx5JTIwd29tYW4lMjBjYXJlZ2l2ZXIlMjBzbWlsaW5nJTIwb3V0ZG9vcnxlbnwwfDJ8fHwxNzYzNTQ2MTg4fDA&ixlib=rb-4.1.0&q=85"
                    alt="Elderly woman and younger caregiver smiling together outdoors - Quan Jing on Unsplash"
                    fill
                    className="object-cover"
                    style={{ backgroundColor: '#262626' }}
                  />
                </div>

                {/* Small circle - bottom left */}
                <div className="absolute bottom-32 left-0 w-48 h-48 rounded-full overflow-hidden border-4 border-(--brand-purple-subtle) shadow-lg">
                  <Image
                    src="https://images.pexels.com/photos/5638700/pexels-photo-5638700.jpeg"
                    alt="Multi-generational family gathering outdoors - Askar Abayev on Pexels"
                    fill
                    className="object-cover"
                    style={{ backgroundColor: '#564B37' }}
                  />
                </div>

                {/* Medium circle - middle bottom */}
                <div className="absolute bottom-0 left-32 w-64 h-64 rounded-full overflow-hidden border-4 border-(--brand-purple-subtle) shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1763257470686-0fa348ebe11a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwd2hlZWxjaGFpciUyMGNhcmVnaXZlciUyMG91dGRvb3J8ZW58MHwyfHx8MTc2MzU0NjE4OHww&ixlib=rb-4.1.0&q=85"
                    alt="Elderly person in wheelchair with caregiver - Quan Jing on Unsplash"
                    fill
                    className="object-cover"
                    style={{ backgroundColor: '#262626' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 bg-white border-y border-(--border-light)">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-12">
              <div className="flex items-center gap-2">
                <CheckCircleIcon width={24} height={24} color="var(--accent-success)" />
                <span className="label-lg text-(--text-secondary)">DBS Checked</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon width={24} height={24} color="var(--accent-success)" />
                <span className="label-lg text-(--text-secondary)">Fully Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                <span className="label-lg text-(--text-secondary)">Trustpilot 4.9/5</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon width={24} height={24} color="var(--accent-success)" />
                <span className="label-lg text-(--text-secondary)">24/7 Support</span>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-(--bg-gray)">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="heading-xl mb-4">
                Why Choose <span className="text-(--brand-purple)">MeddyCare</span>
              </h2>
              <p className="body-lg text-(--text-secondary) max-w-2xl mx-auto">
                Trusted by families, recognized by experts. We provide the highest standard of care.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="card-elevated space-y-6 bg-gradient-to-br from-white to-(--bg-purple-light)">
                <div className="w-14 h-14 rounded-2xl bg-(--brand-purple) flex items-center justify-center">
                  <CheckCircleIcon width={32} height={32} color="white" />
                </div>
                <h3 className="heading-md text-(--text-primary)">Vetted & DBS Checked Carers</h3>
                <p className="body-md text-(--text-secondary)">
                  All our carers are thoroughly vetted and DBS checked, ensuring safety and peace of mind for you
                  and your loved ones.
                </p>
              </div>

              {/* Card 2 */}
              <div className="card-elevated space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-(--accent-success) flex items-center justify-center">
                  <CheckCircleIcon width={32} height={32} color="white" />
                </div>
                <h3 className="heading-md text-(--text-primary)">Verified Carers</h3>
                <p className="body-md text-(--text-secondary)">
                  We carefully verify every carer before connecting them with you. This ensures you get reliable,
                  safe, and professional support.
                </p>
              </div>

              {/* Card 3 */}
              <div className="card-elevated space-y-6 bg-gradient-to-br from-white to-(--bg-purple-light)">
                <div className="w-14 h-14 rounded-2xl bg-(--brand-purple) flex items-center justify-center">
                  <TrendingUpIcon width={32} height={32} color="white" />
                </div>
                <h3 className="heading-md text-(--text-primary)">Carer-Set Rates</h3>
                <p className="body-md text-(--text-secondary)">
                  Each carer sets their own rates, giving you the freedom to find the right match for your care
                  needs and budget.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Simple Steps */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Image */}
              <div className="rounded-3xl overflow-hidden shadow-xl border-2 border-(--brand-purple-light)">
                <Image
                  src="/steps-image.jpg"
                  alt="Elderly woman with caregiver"
                  width={623}
                  height={650}
                  className="w-full h-auto"
                />
              </div>

              {/* Right Content */}
              <div className="space-y-12">
                <div className="space-y-6">
                  <h2 className="heading-xl">
                    <span className="text-(--brand-purple)">3 Simple Steps</span> to Start Care
                  </h2>
                  <p className="body-lg text-(--text-secondary)">
                    Care made simple — share your needs, meet carers, and start with confidence.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Step 1 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-(--brand-purple) flex items-center justify-center">
                      <span className="heading-sm text-white">1</span>
                    </div>
                    <div className="space-y-2 flex-1">
                      <h3 className="heading-sm text-(--text-primary)">Request Care Easily</h3>
                      <p className="body-md text-(--text-secondary)">
                        Fill out a quick form to share what kind of support you're looking for,
                        so we can understand your exact needs.
                      </p>
                      <div className="h-px bg-(--border-light) mt-4"></div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-(--brand-purple) flex items-center justify-center">
                      <span className="heading-sm text-white">2</span>
                    </div>
                    <div className="space-y-2 flex-1">
                      <h3 className="heading-sm text-(--text-primary)">Get Matched Quickly</h3>
                      <p className="body-md text-(--text-secondary)">
                        Within 24 hours, you'll receive tailored carer profiles. Chat with them or
                        set up a call to find the right fit.
                      </p>
                      <div className="h-px bg-(--border-light) mt-4"></div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-(--brand-purple) flex items-center justify-center">
                      <span className="heading-sm text-white">3</span>
                    </div>
                    <div className="space-y-2 flex-1">
                      <h3 className="heading-sm text-(--text-primary)">Start Care Smoothly</h3>
                      <p className="body-md text-(--text-secondary)">
                        Use MyElder to stay in touch, manage your care plan, and make payments safely and securely.
                      </p>
                    </div>
                  </div>
                </div>

                <Link href="/families/questionnaire" className="btn-primary">
                  Find a Carer Today
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section - Replaces Carer Carousel */}
        <section className="py-20 bg-(--bg-gray)">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="heading-xl mb-4">
                Trusted by <span className="text-(--brand-purple)">Families Like Yours</span>
              </h2>
              <p className="body-lg text-(--text-secondary) max-w-2xl mx-auto">
                Hear from families who have found peace of mind with our trusted carers.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, i) => (
                <TestimonialCard key={i} {...testimonial} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/families/questionnaire" className="btn-primary">
                Find Your Perfect Carer
              </Link>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="heading-xl mb-4">
                Why Choose <span className="text-(--brand-purple)">MeddyCare</span>
              </h2>
              <p className="body-lg text-(--text-secondary) max-w-2xl mx-auto">
                Compare MeddyCare with traditional care homes.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-(--border-light)">
              <div className="grid grid-cols-3 gradient-purple text-white p-6">
                <div className="font-urbanist font-bold text-lg">Feature</div>
                <div className="text-center font-urbanist font-bold text-lg">MeddyCare</div>
                <div className="text-center font-urbanist font-bold text-lg opacity-80">Care Home</div>
              </div>
              <div className="divide-y divide-(--border-light)">
                {[
                  { feature: "Carer Ratio", meddycare: "1 to 1", careHome: "1 to 15+" },
                  { feature: "Stay at Home", meddycare: "✓", careHome: "✗" },
                  { feature: "Keep Pets", meddycare: "✓", careHome: "✗" },
                  { feature: "Couples Stay Together", meddycare: "✓", careHome: "Rarely" },
                  { feature: "Flexible Routines", meddycare: "✓", careHome: "Limited" },
                  { feature: "Average Cost/Week", meddycare: "From £950", careHome: "£1,200+" }
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-3 p-6 hover:bg-(--bg-gray) transition-colors">
                    <div className="font-urbanist font-semibold text-(--text-primary)">{row.feature}</div>
                    <div className="text-center">
                      {row.meddycare === "✓" ? (
                        <CheckCircleIcon width={24} height={24} color="var(--accent-success)" className="mx-auto" />
                      ) : (
                        <span className="font-urbanist font-bold text-(--brand-purple)">{row.meddycare}</span>
                      )}
                    </div>
                    <div className="text-center text-(--text-muted) font-urbanist">{row.careHome}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/families/questionnaire" className="btn-primary">
                Get Your Free Quote
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing Banner */}
        <section className="py-16 gradient-purple relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-white font-urbanist font-semibold text-sm">
                  Limited Time Offer
                </span>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-sora font-bold text-white">
                  Quality Care from £950/week
                </h2>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                  Get <span className="font-bold text-yellow-300">15% off your first month</span> when you book through MeddyCare
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-6 pt-4">
                {[
                  "No Hidden Fees",
                  "Cancel Anytime",
                  "24/7 Support",
                  "Vetted Carers"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-white">
                    <CheckCircleIcon width={20} height={20} color="#86efac" />
                    <span className="font-urbanist font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Link
                  href="/families/questionnaire"
                  className="inline-block px-10 py-4 bg-white text-(--brand-purple) rounded-full font-urbanist font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
                >
                  Get Your Free Quote
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="heading-xl">
                  Comprehensive Wellness <span className="text-(--brand-purple)">Support for Seniors</span>
                </h2>
              </div>
              <div className="flex items-center">
                <p className="body-lg text-(--text-secondary)">
                  From everyday assistance to holistic well-being, our services are designed to give families
                  peace of mind while empowering seniors to live life fully at home.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {/* Service Card 1 */}
              <div className="space-y-6 group">
                <div className="rounded-3xl overflow-hidden border-2 border-(--border-purple) group-hover:border-(--brand-purple) transition-all shadow-md group-hover:shadow-xl">
                  <Image
                    src="/service-appointment.jpg"
                    alt="Simplified Appointment Scheduling"
                    width={400}
                    height={400}
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-3">
                  <h3 className="heading-md text-(--brand-purple)">
                    Simplified Appointment Scheduling
                  </h3>
                  <p className="body-md text-(--text-secondary)">
                    Never miss an important consultation again. Our easy booking system ensures seniors and
                    families can plan care effortlessly.
                  </p>
                  <div className="pt-1">
                    <button className="label-lg text-(--text-primary) hover:text-(--brand-purple) transition-colors">
                      Learn More
                    </button>
                    <div className="w-20 h-0.5 bg-(--text-primary) mt-1"></div>
                  </div>
                </div>
              </div>

              {/* Service Card 2 */}
              <div className="space-y-6 group">
                <div className="rounded-3xl overflow-hidden border-2 border-(--border-purple) group-hover:border-(--brand-purple) transition-all shadow-md group-hover:shadow-xl">
                  <Image
                    src="/service-wellness.jpg"
                    alt="Health & Wellness Tracking"
                    width={400}
                    height={400}
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-3">
                  <h3 className="heading-md text-(--brand-purple)">
                    Health & Wellness Tracking
                  </h3>
                  <p className="body-md text-(--text-secondary)">
                    Stay updated with daily mood logs, activity records, and personalized wellness reports
                    helping you stay proactive about well-being.
                  </p>
                  <div className="pt-1">
                    <button className="label-lg text-(--text-primary) hover:text-(--brand-purple) transition-colors">
                      Learn More
                    </button>
                    <div className="w-20 h-0.5 bg-(--text-primary) mt-1"></div>
                  </div>
                </div>
              </div>

              {/* Service Card 3 */}
              <div className="space-y-6 group">
                <div className="rounded-3xl overflow-hidden border-2 border-(--border-purple) group-hover:border-(--brand-purple) transition-all shadow-md group-hover:shadow-xl">
                  <Image
                    src="/service-care-plans.png"
                    alt="Tailored Care Plans"
                    width={400}
                    height={400}
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-3">
                  <h3 className="heading-md text-(--brand-purple)">
                    Tailored Care Plans
                  </h3>
                  <p className="body-md text-(--text-secondary)">
                    Every person is unique. Our professionals design care programs that balance health needs
                    with lifestyle preferences.
                  </p>
                  <div className="pt-1">
                    <button className="label-lg text-(--text-primary) hover:text-(--brand-purple) transition-colors">
                      Learn More
                    </button>
                    <div className="w-20 h-0.5 bg-(--text-primary) mt-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-(--bg-gray)">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="heading-xl text-center mb-16">
              How It Works – <span className="text-(--brand-purple)">With Care & Comfort</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Card 1 */}
              <div className="relative card-elevated space-y-6">
                <div className="absolute top-8 right-8 text-[109px] font-sora font-bold text-(--brand-purple-subtle) leading-none">
                  01
                </div>
                <ClipboardIcon width={50} height={64} color="var(--brand-purple)" />
                <h3 className="heading-md text-(--text-primary) relative z-10">
                  Tailored support
                </h3>
                <p className="body-md text-(--text-secondary) relative z-10">
                  Your loved one receives dedicated, one-to-one care shaped around their personal needs
                  and lifestyle, every day of the week.
                </p>
              </div>

              {/* Card 2 */}
              <div className="relative card-elevated space-y-6">
                <div className="absolute top-8 right-8 text-[109px] font-sora font-bold text-(--brand-purple-subtle) leading-none">
                  02
                </div>
                <HandsHeartIcon width={53} height={51} color="var(--brand-purple)" />
                <h3 className="heading-md text-(--text-primary) relative z-10">
                  Enhanced wellbeing
                </h3>
                <p className="body-md text-(--text-secondary) relative z-10">
                  Staying at home helps maintain independence, familiar routines, and bonds. Nearly all families
                  notice a clear improvement in quality of life.
                </p>
              </div>

              {/* Card 3 */}
              <div className="relative card-elevated space-y-6">
                <div className="absolute top-8 right-8 text-[109px] font-sora font-bold text-(--brand-purple-subtle) leading-none">
                  03
                </div>
                <RefreshIcon width={48} height={48} color="var(--brand-purple)" />
                <h3 className="heading-md text-(--text-primary) relative z-10">
                  Safer environment
                </h3>
                <p className="body-md text-(--text-secondary) relative z-10">
                  A move to a care facility can bring stress and higher risks. Remaining in a familiar home
                  setting cuts the chance of serious falls by half.
                </p>
              </div>

              {/* Card 4 */}
              <div className="relative card-elevated space-y-6">
                <div className="absolute top-8 right-8 text-[109px] font-sora font-bold text-(--brand-purple-subtle) leading-none">
                  04
                </div>
                <UserCheckIcon width={45} height={59} color="var(--brand-purple)" />
                <h3 className="heading-md text-(--text-primary) relative z-10">
                  Perfect Carer Match
                </h3>
                <p className="body-md text-(--text-secondary) relative z-10">
                  We carefully match your loved one with the carer who best fits their personality and preferences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="heading-xl text-center mb-16">
              Frequently <span className="text-(--brand-purple)">Asked Questions</span>
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-(--bg-gray) rounded-3xl px-6 border border-(--border-light)"
                >
                  <AccordionTrigger className="heading-sm text-(--brand-purple) hover:no-underline py-6">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="body-md text-(--text-secondary) pb-6">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/cta-banner-bg.jpg"
              alt="Care background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-(--brand-purple-dark)/80 via-(--brand-purple)/90 to-(--brand-purple-dark)"></div>
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <h2 className="text-5xl font-sora font-semibold leading-tight text-white">
              Caring is a promise of dignity. <span className="font-bold">Our local carers are here to help.</span>
            </h2>
            <p className="text-xl font-inter text-white/90">
              Our local carers know the community and are ready to help.
            </p>
            <Link href="/families/questionnaire" className="inline-block px-8 py-4 bg-white text-(--brand-purple) rounded-full text-base font-sora font-bold hover:bg-gray-100 transition-colors shadow-xl">
              Start Care Now
            </Link>

            {/* Social Icons */}
            <div className="flex justify-center gap-6 pt-8">
              <a href="#" className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors border border-white/20">
                <InstagramIcon width={20} height={20} color="#ffffff" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors border border-white/20">
                <XIcon width={17} height={18} color="#ffffff" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors border border-white/20">
                <YouTubeIcon width={21} height={17} color="#ffffff" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}