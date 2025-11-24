'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function FamilyLoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    role: 'family'
                })
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMessage = data.error || 'Login failed';
                setError(typeof errorMessage === 'string' ? errorMessage : 'Invalid email or password');
                setIsLoading(false);
                return;
            }

            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user));
            }

            if (formData.remember) {
                localStorage.setItem('rememberedEmail', formData.email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }

            window.location.href = '/dashboard/family';

        } catch (error: any) {
            console.error('Login error:', error);
            setError('Network error. Please check your connection and try again.');
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    return (
        <>
            <Header />
            <main className="py-20 bg-purple-50 min-h-screen flex items-center relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-200 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
                </div>

                <div className="max-w-md mx-auto px-4 w-full relative z-10">
                    <Link href="/login" className="inline-flex items-center text-slate-500 hover:text-purple-600 mb-8 transition-colors">
                        <ArrowLeft size={20} className="mr-2" />
                        Back to selection
                    </Link>

                    <div className="text-center mb-8">
                        <h1 className="font-fraunces text-4xl text-slate-900 mb-3">
                            Family <span className="text-purple-600 italic">Portal</span>
                        </h1>
                        <p className="text-slate-600">
                            Sign in to manage care, view updates, and communicate with carers.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-xl shadow-purple-900/5 border border-slate-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}
                            {/* Email Field */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="font-bold text-slate-700 text-sm">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail size={20} className="text-slate-400" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        className="w-full pl-12 pr-4 py-4 border-2 border-slate-100 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="font-bold text-slate-700 text-sm">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock size={20} className="text-slate-400" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-12 py-4 border-2 border-slate-100 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={20} className="text-slate-400" />
                                        ) : (
                                            <Eye size={20} className="text-slate-400" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember"
                                        name="remember"
                                        type="checkbox"
                                        checked={formData.remember}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember" className="ml-2 text-sm text-slate-600">
                                        Remember me
                                    </label>
                                </div>

                                <Link href="/forgot-password" className="text-sm text-purple-600 hover:text-purple-700 font-bold transition-colors">
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full btn-primary py-4 text-lg shadow-lg shadow-purple-200 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </button>

                            {/* Divider */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-slate-500">Or continue with</span>
                                </div>
                            </div>

                            {/* Social Login */}
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-slate-100 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors font-bold text-sm"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Google
                                </button>
                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-slate-100 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors font-bold text-sm"
                                >
                                    <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                                    </svg>
                                    Facebook
                                </button>
                            </div>
                        </form>

                        {/* Sign Up Link */}
                        <div className="mt-8 text-center">
                            <p className="text-slate-600">
                                Don't have an account?{' '}
                                <Link href="/get-care" className="text-purple-600 hover:text-purple-700 font-bold transition-colors">
                                    Get Started
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
