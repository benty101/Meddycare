'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import ClockIcon from '@/src/components/icons/ClockIcon';
import LocationIcon from '@/src/components/icons/LocationIcon';
import PhoneIcon from '@/src/components/icons/PhoneIcon';
import EmailIcon from '@/src/components/icons/EmailIcon';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-[var(--bg-light-purple)] py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-block mb-6">
              <span className="px-6 py-2 border-2 border-[var(--brand-purple)] rounded-full label-md text-[var(--brand-purple)]">
                Get In Touch
              </span>
            </div>
            <h1 className="heading-xl text-[var(--text-primary)] mb-6">
              We're Here to <span className="text-[var(--brand-purple)]">Help You</span>
            </h1>
            <p className="body-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
              Have questions about our services? Want to discuss your care needs?
              Our team is ready to assist you every step of the way.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {/* Phone */}
              <div className="bg-[var(--bg-light-purple)] rounded-3xl p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto">
                  <Phone size={32} color="var(--brand-purple)" />
                </div>
                <h3 className="heading-xs text-[var(--text-primary)]">Call Us</h3>
                <p className="body-sm text-[var(--text-secondary)]">(215) 424-7763</p>
                <p className="label-sm text-[var(--text-muted)]">Mon-Sun, 24/7</p>
              </div>

              {/* Email */}
              <div className="bg-[var(--bg-peach)] rounded-3xl p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto">
                  <Mail size={32} color="var(--brand-purple)" />
                </div>
                <h3 className="heading-xs text-[var(--text-primary)]">Email Us</h3>
                <p className="body-sm text-[var(--text-secondary)]">hello@meddycare.com</p>
                <p className="label-sm text-[var(--text-muted)]">24h response time</p>
              </div>

              {/* Location */}
              <div className="bg-[var(--bg-teal)] rounded-3xl p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto">
                  <MapPin size={32} color="var(--brand-purple)" />
                </div>
                <h3 className="heading-xs text-[var(--text-primary)]">Visit Us</h3>
                <p className="body-sm text-[var(--text-secondary)]">5917 Rowsgate Ln</p>
                <p className="label-sm text-[var(--text-muted)]">Wilmington, NC 28411</p>
              </div>

              {/* Hours */}
              <div className="bg-purple-50 rounded-3xl p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto">
                  <Clock size={32} color="var(--brand-purple)" />
                </div>
                <h3 className="heading-xs text-[var(--text-primary)]">Open Hours</h3>
                <p className="body-sm text-[var(--text-secondary)]">24/7 Available</p>
                <p className="label-sm text-[var(--text-muted)]">Every day of the year</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 bg-[var(--bg-light-purple)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {submitted ? (
              <div className="bg-white rounded-3xl p-16 text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-4xl">✓</span>
                </div>
                <h2 className="heading-lg text-green-600">Message Sent Successfully!</h2>
                <p className="body-lg text-[var(--text-secondary)] max-w-md mx-auto">
                  Thank you for contacting us. Our team will review your message and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-primary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 space-y-8">
                <div className="text-center space-y-4">
                  <h2 className="heading-lg text-[var(--text-primary)]">
                    Send Us a <span className="text-[var(--brand-purple)]">Message</span>
                  </h2>
                  <p className="body-md text-[var(--text-secondary)]">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="label-md text-[var(--text-primary)]">Full Name *</label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl label-md text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-purple)] focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="label-md text-[var(--text-primary)]">Email Address *</label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl label-md text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-purple)] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="label-md text-[var(--text-primary)]">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(215) 424-7763"
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl label-md text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-purple)] focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="label-md text-[var(--text-primary)]">Subject *</label>
                      <select
                        required
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl label-md text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-purple)] focus:border-transparent transition-all"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="care">Care Services</option>
                        <option value="become-carer">Become a Carer</option>
                        <option value="support">Support</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="label-md text-[var(--text-primary)]">Message *</label>
                    <textarea
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Tell us how we can help you..."
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl label-md text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-purple)] focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <button type="submit" className="w-full btn-primary text-center justify-center">
                    Send Message
                  </button>
                </form>
              </div>
            )}
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">
                Find Us on the <span className="text-[var(--brand-purple)]">Map</span>
              </h2>
              <p className="body-md text-[var(--text-secondary)]">
                Visit our office or schedule a consultation at our location
              </p>
            </div>

            <div className="rounded-3xl overflow-hidden border-2 border-[var(--border-purple)]">
              <iframe
                src="https://maps.google.com/maps?width=100%25&height=500&hl=en&q=34.1954,-77.8864&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                width="100%"
                height="500"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}