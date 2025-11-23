import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { ShieldCheck, Heart, Users, Award, Star, CheckCircle2, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { FadeIn } from '@/components/animations/FadeIn';
import { ScaleIn } from '@/components/animations/ScaleIn';
import { SlideIn } from '@/components/animations/SlideIn';

export const metadata: Metadata = {
  title: "About Us - MeddyCare",
  description: "Reinventing care for the ones you love. We combine human compassion with smart technology to keep families together.",
};

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="bg-slate-50 overflow-hidden">
        {/* 1. Immersive Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Background with Gradient Mesh */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-orange-50 opacity-80" />
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 pt-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-purple-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium text-slate-600">Trusted by 5,000+ UK Families</span>
            </div>

            {/* Headline */}
            <FadeIn delay={0.1}>
              <h1 className="max-w-4xl mx-auto font-fraunces text-5xl md:text-7xl font-semibold text-slate-900 leading-[1.1] tracking-tight">
                Reinventing care for the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 italic pr-2">
                  ones you love.
                </span>
              </h1>
            </FadeIn>

            {/* Subheadline */}
            <FadeIn delay={0.2}>
              <p className="max-w-2xl mx-auto text-xl text-slate-600 font-urbanist leading-relaxed">
                We combine human compassion with smart technology to keep families together,
                ensuring your loved ones age with dignity in the comfort of their own home.
              </p>
            </FadeIn>

            {/* Trust Bar */}
            <FadeIn delay={0.3} className="pt-8 flex flex-wrap justify-center gap-6 md:gap-12">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center border-2 border-white">
                      <Star className="w-4 h-4 text-white fill-white" />
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900">Excellent</p>
                  <p className="text-xs text-slate-500">4.9 on Trustpilot</p>
                </div>
              </div>
              <div className="h-10 w-px bg-slate-200 hidden md:block" />
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-purple-600" />
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900">Fully Vetted</p>
                  <p className="text-xs text-slate-500">DBS Checked Carers</p>
                </div>
              </div>
              <div className="h-10 w-px bg-slate-200 hidden md:block" />
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-teal-600" />
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900">CQC Standards</p>
                  <p className="text-xs text-slate-500">Quality Assured</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 2. Asymmetrical Mission Section */}
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Image Side (Left - 7 cols) */}
              <div className="lg:col-span-7 relative">
                <ScaleIn className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/3] group">
                  <Image
                    src="https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg"
                    alt="Granddaughter hugging grandmother"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* Floating Quote Card */}
                  <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20 transform transition-transform hover:-translate-y-1 duration-300">
                    <p className="font-fraunces text-lg text-slate-800 italic">
                      "Finding a carer who actually understood my mum's needs felt impossible until we found MeddyCare. It wasn't just a match; it was a connection."
                    </p>
                    <p className="mt-4 text-sm font-bold text-purple-600">— Sarah J., London</p>
                  </div>
                </ScaleIn>
              </div>

              {/* Text Side (Right - 5 cols) */}
              <div className="lg:col-span-5 space-y-8">
                <h2 className="font-fraunces text-4xl md:text-5xl text-slate-900">
                  Care that feels like <span className="text-purple-600 italic">family.</span>
                </h2>
                <div className="space-y-6 text-lg text-slate-600 font-urbanist leading-relaxed">
                  <p>
                    <span className="text-5xl float-left mr-3 mt-[-10px] font-fraunces text-purple-200">W</span>
                    e believe that traditional care models are broken. Agencies are opaque, carers are underpaid, and families are left in the dark.
                  </p>
                  <p>
                    MeddyCare was built to change that. By cutting out the middleman, we empower families to choose their own carers and ensure that more funding goes directly to the people doing the incredible work of caring.
                  </p>
                  <p>
                    It’s not just about filling a shift. It’s about finding someone who knows how your dad takes his tea, or who can share a laugh over old photos.
                  </p>
                </div>
                <div className="pt-4">
                  <Link href="/how-it-works" className="group inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors">
                    See how we match you
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. The MeddyCare Difference (Bento Grid) */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-fraunces text-4xl text-slate-900 mb-4">Why families choose us</h2>
              <p className="text-lg text-slate-600">We've reimagined every step of the care journey to put you in control.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
              {/* Card 1: Large - Vetted */}
              <ScaleIn delay={0.1} className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500" />
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 text-purple-600">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-fraunces text-2xl text-slate-900 mb-3">Rigorously Vetted Professionals</h3>
                  <p className="text-slate-600 max-w-md">
                    We accept less than 5% of applicants. Every carer undergoes enhanced DBS checks,
                    reference verification, and a rigorous interview process to ensure they meet our high standards.
                  </p>
                </div>
              </ScaleIn>

              {/* Card 2: Tall - Matching */}
              <ScaleIn delay={0.2} className="md:row-span-2 bg-teal-900 rounded-3xl p-8 shadow-sm text-white relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm">
                    <Users className="w-6 h-6 text-teal-300" />
                  </div>
                  <h3 className="font-fraunces text-2xl mb-3">AI-Powered Matching</h3>
                  <p className="text-teal-100 mb-8 flex-grow">
                    Our smart algorithm doesn't just match skills—it matches personalities.
                    We consider hobbies, interests, and communication styles to foster genuine friendships.
                  </p>
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-teal-200" />
                      <div className="h-1 w-12 bg-teal-200/50 rounded-full" />
                    </div>
                    <div className="h-2 w-full bg-teal-200/30 rounded-full mb-2" />
                    <div className="h-2 w-2/3 bg-teal-200/30 rounded-full" />
                  </div>
                </div>
              </ScaleIn>

              {/* Card 3: Standard - Transparency */}
              <ScaleIn delay={0.3} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6 text-orange-600">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-fraunces text-2xl text-slate-900 mb-3">Total Transparency</h3>
                <p className="text-slate-600">
                  Real-time care logs, GPS check-ins, and direct messaging. You're never left wondering about your loved one's care.
                </p>
              </ScaleIn>

              {/* Card 4: Standard - Support */}
              <ScaleIn delay={0.4} className="bg-purple-600 rounded-3xl p-8 shadow-sm text-white hover:bg-purple-700 transition-colors group">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-fraunces text-2xl mb-3">24/7 Support</h3>
                <p className="text-purple-100">
                  Our clinical support team is always just a phone call away, ready to assist with any concerns or emergencies.
                </p>
              </ScaleIn>
            </div>
          </div>
        </section>

        {/* 4. Leadership Team (Horizontal Scroll) */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <h2 className="font-fraunces text-4xl text-slate-900 mb-2">Meet the Leadership</h2>
                <p className="text-lg text-slate-600">The team dedicated to changing care for good.</p>
              </div>
              <Link href="/contact" className="text-purple-600 font-semibold hover:text-purple-700 flex items-center gap-2">
                Join our team <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { name: "Dr. Sarah Chen", role: "Chief Medical Officer", img: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg" },
                { name: "James Wilson", role: "Head of Care", img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" },
                { name: "Elena Rodriguez", role: "Community Lead", img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" },
                { name: "Michael Chang", role: "Technology Director", img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg" }
              ].map((member, i) => (
                <SlideIn key={i} delay={i * 0.1} direction="up" className="group cursor-pointer">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-slate-100">
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <p className="text-white text-sm font-medium">"I care because every senior deserves to feel safe."</p>
                    </div>
                  </div>
                  <h3 className="font-fraunces text-xl text-slate-900">{member.name}</h3>
                  <p className="text-purple-600 font-medium text-sm">{member.role}</p>
                </SlideIn>
              ))}
            </div>
          </div>
        </section>

        {/* 5. High Impact CTA */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#311645]">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-[100px]" />
          </div>

          <ScaleIn className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
            <h2 className="font-fraunces text-5xl md:text-6xl text-white leading-tight">
              Ready to find the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-200 italic">
                perfect carer?
              </span>
            </h2>
            <p className="text-xl text-purple-100 font-urbanist max-w-2xl mx-auto">
              Join thousands of families who have found peace of mind with MeddyCare.
              Get matched with a vetted professional in as little as 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/get-care" className="btn-primary text-lg px-8 py-4 shadow-lg shadow-purple-900/20">
                Get Care Now
              </Link>
              <Link href="/become-a-carer" className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm flex items-center justify-center">
                Become a Carer
              </Link>
            </div>
            <p className="text-sm text-purple-300 pt-4">
              No long-term contracts. Cancel anytime.
            </p>
          </ScaleIn>
        </section>
      </main>

      <Footer />
    </>
  );
}