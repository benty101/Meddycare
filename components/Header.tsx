import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <>
      {/* Announcement Banner */}
      <div className="gradient-purple py-2.5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="overflow-hidden relative">
          <div className="flex animate-marquee whitespace-nowrap">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="label-md text-white mx-24 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></span>
                Limited Offer: Get 15% off your first month • Quality care from £950/week
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="MeddyCare Logo"
                width={35}
                height={45}
                className="object-contain"
              />
              <span className="text-2xl font-manrope font-bold text-black">
                MeddyCare
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/about" className="label-lg text-(--text-primary) hover:text-(--brand-purple) transition-colors">
                About us
              </Link>
              <Link href="/get-care" className="label-lg text-(--text-primary) hover:text-(--brand-purple) transition-colors">
                For Families
              </Link>
              <Link href="/become-a-carer" className="label-lg text-(--text-primary) hover:text-(--brand-purple) transition-colors">
                Carer
              </Link>
              <Link href="/blog" className="label-lg text-(--text-primary) hover:text-(--brand-purple) transition-colors font-bold">
                Insights & Advice
              </Link>
            </nav>

            {/* Right side buttons */}
            <div className="flex items-center gap-4">
              <a
                href="tel:01189899970"
                className="hidden lg:flex items-center gap-2 text-sm font-urbanist font-semibold text-(--brand-purple) hover:text-(--brand-purple-light) transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs text-gray-500">Call us</div>
                  <div className="font-bold">0118 989 9970</div>
                </div>
              </a>
              <Link
                href="/login"
                className="hidden md:inline-block label-lg text-(--text-primary) hover:text-(--brand-purple) transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/get-care"
                className="btn-primary"
              >
                Find a Carer
              </Link>

              {/* Mobile menu button */}
              <button className="md:hidden p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}