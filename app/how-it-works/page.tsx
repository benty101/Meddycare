'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import {
  ClipboardList,
  Users,
  Video,
  Home,
  ShieldCheck,
  FileCheck,
  UserCircle,
  Heart,
  Star,
  CheckCircle2,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState<'families' | 'carers'>('families');

  const familySteps = [
    {
      icon: ClipboardList,
      title: "Tell us your needs",
      desc: "Fill out our quick questionnaire about your loved one's condition, preferences, and schedule.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Users,
      title: "Get matched",
      desc: "Our algorithm finds the top 3 carers who match your medical needs and personality.",
      color: "bg-teal-100 text-teal-600"
    },
    {
      icon: Video,
      title: "Interview favorites",
      desc: "Chat with your top choices via video call to ensure the chemistry is right before committing.",
      color: "bg-orange-100 text-orange-600"
    },
    {
      icon: Home,
      title: "Hire & relax",
      desc: "Secure your booking. We handle contracts, payments, and insurance so you can focus on family.",
      color: "bg-pink-100 text-pink-600"
    }
  ];

  const carerSteps = [
    {
      icon: FileCheck,
      title: "Apply online",
      desc: "Create your professional profile highlighting your experience, qualifications, and skills.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: ShieldCheck,
      title: "Get verified",
      desc: "Complete our rigorous vetting process, including enhanced DBS checks and reference verification.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: UserCircle,
      title: "Build your profile",
      desc: "Showcase your personality with a video intro and set your own rates and availability.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Heart,
      title: "Start caring",
      desc: "Receive job offers that match your skills and preferences. Accept the ones that work for you.",
      color: "bg-red-100 text-red-600"
    }
  ];

  const steps = activeTab === 'families' ? familySteps : carerSteps;

  return (
    <>
      <Header />

      <main className="bg-slate-50 overflow-hidden">
        {/* 1. Hero Section */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-purple-50 to-transparent rounded-full blur-3xl opacity-60" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
            <h1 className="font-fraunces text-5xl md:text-7xl font-semibold text-slate-900 leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000">
              Simple, transparent, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 italic">
                and fast.
              </span>
            </h1>

            <p className="text-xl text-slate-600 font-urbanist max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
              From finding a match to your first day of care in as little as 48 hours.
              We've stripped away the complexity so you can focus on what matters.
            </p>

            {/* Toggle Switch */}
            <div className="relative inline-flex p-1 bg-white rounded-full border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              <div
                className={`absolute top-1 left-1 h-[calc(100%-8px)] w-1/2 rounded-full transition-all duration-300 ${activeTab === 'families' ? 'translate-x-0 bg-purple-600' : 'translate-x-full bg-teal-600'
                  }`}
              />
              {(['families', 'carers'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 text-center font-bold text-lg transition-all relative z-10 ${activeTab === tab
                    ? 'text-white'
                    : 'text-slate-500 hover:text-purple-600'
                    }`}
                >
                  {tab === 'families' ? 'For Families' : 'For Carers'}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 2. The Process (Connected Steps) */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-slate-200 z-0" />

              <div className="grid md:grid-cols-4 gap-12 relative z-10">
                {steps.map((step, index) => (
                  <div key={index} className="group relative">
                    {/* Step Number Badge */}
                    <div className={`w-24 h-24 mx-auto ${step.color} rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300 relative bg-white border-2 border-current`}>
                      <step.icon className="w-10 h-10" />
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm border-4 border-slate-50">
                        {index + 1}
                      </div>
                    </div>

                    <div className="text-center space-y-3">
                      <h3 className="font-fraunces text-2xl text-slate-900">{step.title}</h3>
                      <p className="text-slate-600 leading-relaxed text-sm">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 text-center">
              <Link
                href={activeTab === 'families' ? '/get-care' : '/become-a-carer'}
                className={`btn-primary text-lg px-8 py-4 shadow-lg ${activeTab === 'families' ? 'shadow-purple-200' : 'bg-teal-600 hover:bg-teal-700 shadow-teal-200'}`}
                style={activeTab === 'carers' ? { background: '#0d9488' } : {}}
              >
                {activeTab === 'families' ? 'Find Your Carer' : 'Apply as a Carer'}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* 3. FAQ Section */}
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-fraunces text-4xl text-slate-900 mb-4">Common Questions</h2>
              <p className="text-slate-600">Everything you need to know about getting started.</p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {[
                { q: "How quickly can care start?", a: "We can often arrange care within 48 hours. Once you select a carer, we handle the contract and payment setup instantly." },
                { q: "Are all carers vetted?", a: "Yes. Every carer on MeddyCare has passed an enhanced DBS check, identity verification, and a rigorous interview process." },
                { q: "How do payments work?", a: "You pay securely through our platform. We hold the funds and release them to the carer only after the care has been delivered." },
                { q: "What if we don't get along?", a: "It happens! We offer a replacement guarantee. If the chemistry isn't right in the first week, we'll help you find a new match at no extra cost." },
                { q: "Is there a minimum contract?", a: "No. You can book care for as little as one week. We believe in flexibility for modern families." }
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-slate-200 rounded-2xl px-6 data-[state=open]:bg-slate-50 data-[state=open]:border-purple-200 transition-colors">
                  <AccordionTrigger className="py-6 font-fraunces text-lg text-slate-900 hover:no-underline hover:text-purple-600">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 pb-6 leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* 4. Trust Signals */}
        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by leading organizations</p>
            <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Mock Logos - Replace with real SVGs */}
              <div className="h-8 w-32 bg-slate-300 rounded" />
              <div className="h-8 w-32 bg-slate-300 rounded" />
              <div className="h-8 w-32 bg-slate-300 rounded" />
              <div className="h-8 w-32 bg-slate-300 rounded" />
              <div className="h-8 w-32 bg-slate-300 rounded" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}