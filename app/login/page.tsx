'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Users, Heart } from 'lucide-react';

export default function LoginSelectionPage() {
  return (
    <>
      <Header />
      <main className="py-20 bg-slate-50 min-h-screen flex items-center relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-200 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-200 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 w-full relative z-10">
          <div className="text-center mb-12">
            <h1 className="font-fraunces text-4xl md:text-5xl text-slate-900 mb-4">
              Welcome <span className="text-purple-600 italic">Back</span>
            </h1>
            <p className="text-xl text-slate-600">
              Please select your portal to continue
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Family Portal Card */}
            <Link
              href="/login/family"
              className="group bg-white rounded-3xl p-8 shadow-xl shadow-purple-900/5 border border-slate-100 hover:border-purple-200 hover:shadow-2xl hover:shadow-purple-900/10 transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-100 transition-colors">
                <Users className="w-10 h-10 text-purple-600" />
              </div>
              <h2 className="font-fraunces text-2xl text-slate-900 mb-3">Families</h2>
              <p className="text-slate-600 mb-8">
                Access your care plan, view carer profiles, and manage your account.
              </p>
              <span className="btn-primary w-full">
                Family Login
              </span>
            </Link>

            {/* Carer Portal Card */}
            <Link
              href="/login/carer"
              className="group bg-white rounded-3xl p-8 shadow-xl shadow-teal-900/5 border border-slate-100 hover:border-teal-200 hover:shadow-2xl hover:shadow-teal-900/10 transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-teal-100 transition-colors">
                <Heart className="w-10 h-10 text-teal-600" />
              </div>
              <h2 className="font-fraunces text-2xl text-slate-900 mb-3">Carers</h2>
              <p className="text-slate-600 mb-8">
                Manage your schedule, view placements, and update your professional profile.
              </p>
              <span className="w-full py-4 text-lg font-bold text-white bg-teal-600 rounded-full group-hover:bg-teal-700 transition-all shadow-lg shadow-teal-200">
                Carer Login
              </span>
            </Link>
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600">
              New to MeddyCare?{' '}
              <Link href="/get-care" className="text-purple-600 hover:text-purple-700 font-bold transition-colors">
                Get Started
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}