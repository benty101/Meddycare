'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Announcement Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-2.5 relative overflow-hidden z-50">
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center text-sm font-medium">
          <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse mr-3"></span>
          <span className="hidden sm:inline">Limited Offer: Get 15% off your first month • </span>
          <span className="ml-1">Quality care from £950/week</span>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled || isMobileMenuOpen
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100'
            : 'bg-white border-b border-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="MeddyCare Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-2xl font-manrope font-bold text-slate-900 tracking-tight">
                Meddy<span className="text-purple-600">Care</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {[
                { name: 'About us', href: '/about' },
                { name: 'For Families', href: '/get-care' },
                { name: 'Carer', href: '/become-a-carer' },
                { name: 'Insights & Advice', href: '/blog' },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold text-slate-600 hover:text-purple-600 transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Right side buttons */}
            <div className="hidden md:flex items-center gap-6">
              <a
                href="tel:01189899970"
                className="hidden lg:flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                  <Phone size={18} />
                </div>
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Call us 24/7</div>
                  <div className="font-bold text-slate-900 group-hover:text-purple-600 transition-colors">0118 989 9970</div>
                </div>
              </a>

              <div className="h-8 w-px bg-slate-200 mx-2 hidden lg:block"></div>

              <Link
                href="/login"
                className="text-sm font-bold text-slate-700 hover:text-purple-600 transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/get-care"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg shadow-purple-200 hover:shadow-purple-300 transform hover:-translate-y-0.5"
              >
                Find a Carer
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-slate-600 hover:text-purple-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[110px] z-30 bg-white md:hidden overflow-y-auto"
          >
            <div className="p-4 space-y-6 pb-20">
              <nav className="space-y-2">
                {[
                  { name: 'About us', href: '/about' },
                  { name: 'For Families', href: '/get-care' },
                  { name: 'Carer', href: '/become-a-carer' },
                  { name: 'Insights & Advice', href: '/blog' },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-purple-50 text-slate-700 hover:text-purple-700 font-semibold transition-colors"
                  >
                    {item.name}
                    <ChevronRight size={16} className="text-slate-400" />
                  </Link>
                ))}
              </nav>

              <div className="border-t border-slate-100 pt-6 space-y-4">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full p-4 rounded-xl border-2 border-slate-100 text-slate-700 font-bold hover:border-purple-100 hover:bg-purple-50 transition-all"
                >
                  Sign in
                </Link>
                <Link
                  href="/get-care"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full p-4 rounded-xl bg-purple-600 text-white font-bold shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all"
                >
                  Find a Carer
                </Link>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 mt-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-purple-600 shadow-sm">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Call us 24/7</div>
                    <a href="tel:01189899970" className="text-lg font-bold text-slate-900">0118 989 9970</a>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mt-2">
                  Our care experts are ready to help you find the perfect care solution.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}