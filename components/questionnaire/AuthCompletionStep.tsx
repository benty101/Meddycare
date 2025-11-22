"use client";

import { useState } from 'react';
import { Loader2, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AuthCompletionStepProps {
  onGoogleSignIn: () => void;
  onEmailSignup: (email: string, password: string) => void;
  onRequestCallback: () => void;
  isLoading?: boolean;
}

export function AuthCompletionStep({ 
  onGoogleSignIn, 
  onEmailSignup, 
  onRequestCallback,
  isLoading = false 
}: AuthCompletionStepProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEmailSignup(email, password);
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-sora font-bold text-gray-900 mb-2">
          Create your account to continue
        </h3>
        <p className="text-gray-600 font-inter">
          We'll use this to match you with the perfect carer
        </p>
      </div>

      {/* Google Sign-In */}
      <button
        type="button"
        onClick={onGoogleSignIn}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-gray-300 rounded-2xl hover:border-gray-400 hover:shadow-md transition-all font-urbanist font-semibold text-gray-700 disabled:opacity-50"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Sign in with Google
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500 font-urbanist">or</span>
        </div>
      </div>

      {/* Email/Password Form */}
      {!showEmailForm ? (
        <button
          type="button"
          onClick={() => setShowEmailForm(true)}
          className="w-full px-6 py-4 bg-brand-purple text-white rounded-2xl hover:bg-brand-purple-dark transition-all font-urbanist font-semibold shadow-lg"
        >
          Sign up with Email
        </button>
      ) : (
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-brand-purple focus:ring-4 focus:ring-purple-100 outline-none transition-all font-urbanist"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
              required
              minLength={8}
              className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-brand-purple focus:ring-4 focus:ring-purple-100 outline-none transition-all font-urbanist"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-4 bg-brand-purple text-white rounded-2xl hover:bg-brand-purple-dark transition-all font-urbanist font-semibold shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>
      )}

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500 font-urbanist">or</span>
        </div>
      </div>

      {/* Request Callback */}
      <button
        type="button"
        onClick={onRequestCallback}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-brand-purple text-brand-purple rounded-2xl hover:bg-purple-50 transition-all font-urbanist font-semibold disabled:opacity-50"
      >
        <Phone className="w-5 h-5" />
        Request a Callback
      </button>

      <p className="text-center text-xs text-gray-500 font-inter">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
}