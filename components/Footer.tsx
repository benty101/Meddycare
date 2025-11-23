import Link from 'next/link';
import Image from 'next/image';
import ClockIcon from '@/src/components/icons/ClockIcon';
import LocationIcon from '@/src/components/icons/LocationIcon';
import PhoneIcon from '@/src/components/icons/PhoneIcon';
import EmailIcon from '@/src/components/icons/EmailIcon';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-(--border-light)">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="MeddyCare Logo"
                width={54}
                height={70}
                className="object-contain"
              />
              <span className="text-[35.83px] font-manrope font-bold text-black">
                MeddyCare
              </span>
            </Link>

            <div className="space-y-4">
              <h3 className="text-lg font-urbanist font-bold text-black">Legal</h3>
              <p className="body-md text-gray-600">
                MeddyCare is an introductory agency connecting families with self-employed carers.
                We are not CQC regulated as we do not provide care directly.
              </p>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-urbanist font-bold text-black">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="label-lg text-(--text-muted) hover:text-(--brand-purple) transition-colors">About Us</Link></li>
              <li><Link href="/get-care" className="label-lg text-(--text-muted) hover:text-(--brand-purple) transition-colors">For Families</Link></li>
              <li><Link href="/become-a-carer" className="label-lg text-(--text-muted) hover:text-(--brand-purple) transition-colors">Carer</Link></li>
              <li><Link href="/contact" className="label-lg text-(--text-muted) hover:text-(--brand-purple) transition-colors">Contact Us</Link></li>
              <li><Link href="/blog" className="label-lg text-(--text-muted) hover:text-(--brand-purple) transition-colors">Insights & Advice</Link></li>
            </ul>
          </div>

          {/* Our Office */}
          <div className="space-y-4">
            <h3 className="text-lg font-urbanist font-bold text-black">Our Office</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ClockIcon width={13} height={13} color="var(--text-secondary)" />
                <span className="label-md text-gray-600">Monday to Sunday (Open 24/7)</span>
              </div>
              <div className="flex items-center gap-2">
                <LocationIcon width={11} height={14} color="var(--text-secondary)" />
                <span className="label-md text-gray-600">5917 Rowsgate Ln Wilmington, NC 28411,</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon width={12} height={12} color="var(--text-secondary)" />
                <span className="label-md text-gray-600">0118 989 9970</span>
              </div>
              <div className="flex items-center gap-2">
                <EmailIcon width={13} height={10} color="var(--text-secondary)" />
                <span className="label-md text-gray-600">hello@meddycare.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-urbanist font-bold text-black">Get Our Daily Newsletter</h3>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-(--border-light) rounded-full label-md text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-(--brand-purple) focus:border-transparent transition-all"
              />
              <button className="label-md gradient-purple text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>

            {/* Awards */}
            <div className="mt-6">
              <h4 className="text-lg font-urbanist font-bold text-black mb-3">Our awards</h4>
              <Image
                src="/awards.svg"
                alt="Awards and certifications"
                width={353}
                height={83}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex gap-6">
              <Link href="/terms" className="label-lg text-(--brand-purple) hover:underline">
                Terms And Condition
              </Link>
              <Link href="/privacy" className="label-lg text-(--brand-purple) hover:underline">
                Customer Privacy Policy
              </Link>
            </div>
            <p className="text-base font-sora text-black">© Copyright meddycare 2025</p>
          </div>
        </div>
      </div>
    </footer>
  );
}