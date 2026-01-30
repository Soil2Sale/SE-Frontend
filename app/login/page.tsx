"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import type { LoginRequest } from "../../types/auth.types";

// ===== HARVEST Login Page =====
// Modern farming-themed login with opening animation
// Uses existing AuthContext for API integration

export default function LoginPage() {
    const [mounted, setMounted] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<LoginRequest>({
        email: "",
        password: "",
    });

    const { login, isAuthenticated } = useAuth();
    const router = useRouter();

    // Opening animation sequence
    useEffect(() => {
        if (isAuthenticated) {
            router.push("/dashboard");
            return;
        }
        // Trigger mount animation
        setMounted(true);
        // Reveal form after initial animation
        const timer = setTimeout(() => setShowForm(true), 600);
        return () => clearTimeout(timer);
    }, [isAuthenticated, router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError(null);
    };

    // Login handler - uses AuthContext wrapper (no direct API calls)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const result = await login(formData);

        if (result.success) {
            router.push("/dashboard");
        } else {
            setError(result.message || "Login failed. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex overflow-hidden bg-gradient-to-br from-[#f0f4e8] via-[#e8f0dc] to-[#f5f7f0]">
            {/* Left Panel - Branding */}
            <div
                className={`hidden lg:flex lg:w-1/2 xl:w-2/5 bg-gradient-to-b from-[#1a3a1a] via-[#234d23] to-[#1a3a1a] flex-col justify-between p-8 transition-all duration-700 ease-out ${mounted ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
                    }`}
            >
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#7cb342] flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2v4M12 6c0 0-4 2-4 6s4 6 4 10M12 6c0 0 4 2 4 6s-4 6-4 10" strokeLinecap="round" />
                            <path d="M8 10c-2-1-4 0-4 2M16 10c2-1 4 0 4 2" strokeLinecap="round" />
                        </svg>
                    </div>
                    <span className="text-[#a8e063] text-xl font-bold tracking-wider">HARVEST</span>
                </div>

                {/* Centered Content */}
                <div className="flex-1 flex flex-col justify-center">
                    <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
                        Welcome to<br />Smart Farming
                    </h1>
                    <p className="text-white/70 text-lg max-w-md">
                        Monitor your crops, track growth analytics, and maximize your harvest with our intelligent farming platform.
                    </p>

                    {/* Feature Pills */}
                    <div className="flex flex-wrap gap-3 mt-8">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                            <span className="text-lg">📊</span>
                            <span className="text-white/90 text-sm">Analytics</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                            <span className="text-lg">🌱</span>
                            <span className="text-white/90 text-sm">Crop Monitoring</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                            <span className="text-lg">☀️</span>
                            <span className="text-white/90 text-sm">Weather</span>
                        </div>
                    </div>
                </div>

                {/* Illustration Area */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <div className="flex items-end justify-center gap-4 h-32">
                        {/* Animated Crops */}
                        {[40, 55, 45, 60, 50, 35, 65, 48].map((h, i) => (
                            <div
                                key={i}
                                className="w-4 rounded-t-full bg-gradient-to-t from-[#7cb342] to-[#a8e063] animate-pulse"
                                style={{
                                    height: `${h}%`,
                                    animationDelay: `${i * 0.15}s`,
                                    animationDuration: "2s",
                                }}
                            />
                        ))}
                    </div>
                    <div className="h-2 bg-[#8b6914]/30 rounded-full mt-2" />
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div
                className={`flex-1 flex items-center justify-center p-6 lg:p-12 transition-all duration-700 ease-out delay-200 ${mounted ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
                    }`}
            >
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="flex lg:hidden items-center justify-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-[#1a3a1a] flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#a8e063]" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2v4M12 6c0 0-4 2-4 6s4 6 4 10M12 6c0 0 4 2 4 6s-4 6-4 10" strokeLinecap="round" />
                            </svg>
                        </div>
                        <span className="text-[#1a3a1a] text-2xl font-bold tracking-wider">HARVEST</span>
                    </div>

                    {/* Form Card */}
                    <div
                        className={`bg-white rounded-3xl shadow-xl shadow-[#1a3a1a]/10 p-8 lg:p-10 transition-all duration-500 ${showForm ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
                            }`}
                    >
                        <div className="mb-8">
                            <h2 className="text-2xl lg:text-3xl font-bold text-[#1a3a1a]">Sign In</h2>
                            <p className="text-[#6b7b6b] mt-2">Welcome back! Enter your credentials.</p>
                        </div>

                        {/* Error Alert */}
                        {error && (
                            <div className="flex items-center gap-3 p-4 mb-6 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm animate-shake">
                                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
                                </svg>
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-[#1a3a1a] mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]">
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <rect x="2" y="4" width="20" height="16" rx="3" />
                                            <path d="M2 7l10 6 10-6" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter your email"
                                        required
                                        autoComplete="email"
                                        className="w-full pl-12 pr-4 py-3.5 bg-[#f9fafb] border-2 border-[#e5e7eb] rounded-xl text-[#1a3a1a] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#2d5a27] focus:bg-white focus:ring-4 focus:ring-[#2d5a27]/10 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold text-[#1a3a1a] mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]">
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <rect x="3" y="11" width="18" height="11" rx="2" />
                                            <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" />
                                            <circle cx="12" cy="16" r="1.5" fill="currentColor" />
                                        </svg>
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Enter your password"
                                        required
                                        autoComplete="current-password"
                                        className="w-full pl-12 pr-12 py-3.5 bg-[#f9fafb] border-2 border-[#e5e7eb] rounded-xl text-[#1a3a1a] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#2d5a27] focus:bg-white focus:ring-4 focus:ring-[#2d5a27]/10 transition-all"
                                    />
                                    {/* Show/Hide Password Toggle */}
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#1a3a1a] transition-colors"
                                    >
                                        {showPassword ? (
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-10-7-10-7a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 10 7 10 7a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                                                <line x1="1" y1="1" x2="23" y2="23" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-5 h-5 border-2 border-[#d1d5db] rounded peer-checked:bg-[#2d5a27] peer-checked:border-[#2d5a27] transition-all flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>
                                    <span className="text-sm text-[#6b7b6b] group-hover:text-[#1a3a1a] transition-colors">Remember me</span>
                                </label>
                                <a href="/forgot-password" className="text-sm font-medium text-[#2d5a27] hover:text-[#1e4620] hover:underline transition-colors">
                                    Forgot password?
                                </a>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-gradient-to-r from-[#2d5a27] to-[#4a8c3f] text-white font-semibold rounded-xl shadow-lg shadow-[#2d5a27]/30 hover:shadow-xl hover:shadow-[#2d5a27]/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all duration-200 flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    "Sign In"
                                )}
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="mt-8 pt-6 border-t border-[#e5e7eb] text-center">
                            <p className="text-[#6b7b6b]">
                                Don&apos;t have an account?{" "}
                                <a href="/register" className="font-semibold text-[#2d5a27] hover:text-[#1e4620] hover:underline transition-colors">
                                    Sign up
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Copyright */}
                    <p className="text-center text-sm text-[#9ca3af] mt-6">
                        © 2026 Harvest. All rights reserved.
                    </p>
                </div>
            </div>

            {/* Custom Animation Styles */}
            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20%, 60% { transform: translateX(-5px); }
                    40%, 80% { transform: translateX(5px); }
                }
                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
            `}</style>
        </div>
    );
}
