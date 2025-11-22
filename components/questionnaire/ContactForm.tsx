"use client";

import type { ContactInfo } from './types';

interface ContactFormProps {
  value: ContactInfo;
  onChange: (value: ContactInfo) => void;
}

export function ContactForm({ value, onChange }: ContactFormProps) {
  const handleChange = (field: keyof ContactInfo, fieldValue: string) => {
    onChange({ ...value, [field]: fieldValue });
  };

  return (
    <div className="space-y-4 max-w-2xl">
      <div>
        <label className="block text-sm font-urbanist font-semibold text-gray-700 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          value={value.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="John Smith"
          className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-brand-purple focus:ring-4 focus:ring-purple-100 outline-none transition-all font-urbanist"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-urbanist font-semibold text-gray-700 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          value={value.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="john@example.com"
          className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-brand-purple focus:ring-4 focus:ring-purple-100 outline-none transition-all font-urbanist"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-urbanist font-semibold text-gray-700 mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          value={value.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="07XXX XXXXXX"
          className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-brand-purple focus:ring-4 focus:ring-purple-100 outline-none transition-all font-urbanist"
          required
        />
      </div>
    </div>
  );
}