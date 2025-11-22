import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { ShieldCheck, Heart, Users, Award } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Compassion First',
      description: 'Every interaction is guided by empathy and genuine care for the wellbeing of seniors and their families.',
      bgColor: 'bg-(--bg-peach)'
    },
    {
      icon: ShieldCheck,
      title: 'Trust & Safety',
      description: 'All carers undergo rigorous DBS checks and verification to ensure the highest standards of safety.',
      bgColor: 'bg-white border-2 border-(--bg-peach)'
    },
    {
      icon: Users,
      title: 'Perfect Matching',
      description: 'We carefully pair families with carers based on personality, preferences, and specific care needs.',
      bgColor: 'bg-(--bg-teal)'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We are committed to delivering exceptional care services that exceed expectations every day.',
      bgColor: 'bg-(--bg-light-purple)'
    }
  ];

  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-(--bg-light-purple) py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="inline-block">
                  <span className="px-6 py-2 border-2 border-(--brand-purple) rounded-full label-md text-(--brand-purple)">
                    Our Story
                  </span>
                </div>

                <h1 className="heading-xl text-(--text-primary)">
                  Dedicated to{' '}
                  <span className="text-(--brand-purple)">Compassionate Care</span>
                </h1>

                <p className="body-lg text-(--text-secondary)">
                  MeddyCare was founded on a simple belief: every senior deserves to age with dignity, 
                  comfort, and joy in the place they call home. We connect families with trusted, 
                  professional carers who provide personalized support that goes beyond basic care.
                </p>

                <Link href="/get-care" className="btn-primary">
                  Start Your Journey
                </Link>
              </div>

              {/* Right Image Collage */}
              <div className="relative h-[600px]">
                {/* Decorative arrows */}
                <svg className="absolute top-8 right-32 w-32 h-32 text-pink-500" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20,80 Q50,20 80,60" />
                  <path d="M75,55 L80,60 L75,65" />
                </svg>

                {/* Main large circle */}
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full overflow-hidden border-8 border-purple-300">
                  <Image
                    src="https://images.pexels.com/photos/7688173/pexels-photo-7688173.jpeg"
                    alt="Professional healthcare team diverse group smiling warm lighting modern office - Kindel Media on Pexels"
                    fill
                    className="object-cover"
                    style={{ backgroundColor: '#9B9489' }}
                  />
                </div>

                {/* Small circle - bottom left */}
                <div className="absolute bottom-32 left-0 w-48 h-48 rounded-full overflow-hidden border-4 border-purple-200">
                  <Image
                    src="https://images.pexels.com/photos/339620/pexels-photo-339620.jpeg"
                    alt="Elderly person receives support from caregiver holding hands - Matthias Zomer on Pexels"
                    fill
                    className="object-cover"
                    style={{ backgroundColor: '#8D7A67' }}
                  />
                </div>

                {/* Medium circle - middle bottom */}
                <div className="absolute bottom-0 left-32 w-64 h-64 rounded-full overflow-hidden border-6 border-purple-200">
                  <Image
                    src="https://images.pexels.com/photos/3184352/pexels-photo-3184352.jpeg"
                    alt="Diverse group of professionals collaborating in office - fauxels on Pexels"
                    fill
                    className="object-cover"
                    style={{ backgroundColor: '#A59B99' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Image */}
              <div className="rounded-3xl overflow-hidden border border-(--brand-purple)">
                <Image
                  src="https://images.pexels.com/photos/16364308/pexels-photo-16364308.jpeg"
                  alt="Caregiver holding hands with elderly woman in wheelchair - Jsme MILA on Pexels"
                  width={623}
                  height={650}
                  className="w-full h-auto"
                  style={{ backgroundColor: '#4D4D4D' }}
                />
              </div>

              {/* Right Content */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="heading-lg">
                    Our <span className="text-(--brand-purple)">Mission & Vision</span>
                  </h2>
                  <p className="body-lg text-(--text-secondary)">
                    Our mission is to revolutionize elder care by creating meaningful connections between 
                    families and professional carers. We envision a world where every senior can live 
                    independently at home with the support they need.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <Heart size={24} color="var(--brand-purple)" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="heading-xs text-(--text-primary)">Compassionate Care</h3>
                      <p className="body-sm text-(--text-secondary)">
                        We believe in treating every senior with the dignity, respect, and warmth they deserve.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <ShieldCheck size={24} color="var(--brand-purple)" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="heading-xs text-(--text-primary)">Trusted Network</h3>
                      <p className="body-sm text-(--text-secondary)">
                        Every carer in our network is thoroughly vetted, DBS checked, and committed to excellence.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <Users size={24} color="var(--brand-purple)" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="heading-xs text-(--text-primary)">Family Partnership</h3>
                      <p className="body-sm text-(--text-secondary)">
                        We work closely with families to ensure the care provided meets their unique needs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-(--bg-light-purple)">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="heading-lg text-center mb-16">
              Our Core <span className="text-(--brand-purple)">Values</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className={`${value.bgColor} rounded-3xl p-8 space-y-6`}>
                  <value.icon size={56} color="var(--brand-purple)" />
                  <h3 className="heading-sm text-(--text-primary)">{value.title}</h3>
                  <p className="body-md text-(--text-muted)">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="heading-lg text-center mb-16">
              Why Choose <span className="text-(--brand-purple)">MeddyCare</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                  <ShieldCheck size={32} color="var(--brand-purple)" />
                </div>
                <h3 className="heading-sm text-(--text-primary)">Fully Vetted Carers</h3>
                <p className="body-md text-(--text-secondary)">
                  Every carer undergoes comprehensive background checks, DBS verification, and reference validation.
                </p>
              </div>

              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                  <Users size={32} color="var(--brand-purple)" />
                </div>
                <h3 className="heading-sm text-(--text-primary)">Personalized Matching</h3>
                <p className="body-md text-(--text-secondary)">
                  We match carers based on personality, experience, and specific care requirements for the best fit.
                </p>
              </div>

              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                  <Award size={32} color="var(--brand-purple)" />
                </div>
                <h3 className="heading-sm text-(--text-primary)">Award-Winning Service</h3>
                <p className="body-md text-(--text-secondary)">
                  Recognized for excellence in care delivery and customer satisfaction across the UK.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-[#311645] to-[#3c0e5e]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <h2 className="text-5xl font-sora font-semibold leading-tight text-white">
              Ready to find the <span className="font-bold">perfect carer</span> for your loved one?
            </h2>
            <p className="text-xl font-inter text-white">
              Join hundreds of families who trust MeddyCare for compassionate, professional care.
            </p>
            <Link href="/get-care" className="inline-block px-8 py-4 bg-white text-[#3c0e5e] rounded-full text-base font-sora font-bold hover:bg-gray-100 transition-colors">
              Get Started Today
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}