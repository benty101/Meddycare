import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.png"
                  alt="MeddyCare Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-manrope font-bold text-slate-900">
                Meddy<span className="text-purple-600">Care</span>
              </span>
            </Link>

            <p className="text-slate-500 leading-relaxed text-sm">
              MeddyCare is an introductory agency connecting families with self-employed carers.
              We are not CQC regulated as we do not provide care directly.
            </p>

            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-purple-600 hover:text-white transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Company</h3>
            <ul className="space-y-4">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'For Families', href: '/get-care' },
                { name: 'Become a Carer', href: '/become-a-carer' },
                { name: 'Insights & Advice', href: '/blog' },
                { name: 'Contact Us', href: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-500 hover:text-purple-600 transition-colors text-sm font-medium flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-200 group-hover:bg-purple-600 transition-colors"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-purple-600 mt-0.5 shrink-0" />
                <span className="text-slate-500 text-sm">Monday to Sunday (Open 24/7)</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-purple-600 mt-0.5 shrink-0" />
                <span className="text-slate-500 text-sm">5917 Rowsgate Ln Wilmington, NC 28411</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-purple-600 shrink-0" />
                <span className="text-slate-500 text-sm">0118 989 9970</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-purple-600 shrink-0" />
                <span className="text-slate-500 text-sm">hello@meddycare.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Newsletter</h3>
            <p className="text-slate-500 text-sm">Subscribe to get the latest news and updates.</p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
              />
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-purple-200 hover:shadow-purple-300">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">© 2025 MeddyCare. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="text-slate-400 hover:text-purple-600 text-sm transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="text-slate-400 hover:text-purple-600 text-sm transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}