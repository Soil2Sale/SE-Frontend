"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Smartphone, ShieldCheck, ArrowRight } from "lucide-react";
import LanguageSelector from "@/components/ui/LanguageSelector";
import { translations, Language } from "@/app/constants/translations";

export default function LoginPage() {
  const [lang, setLang] = useState<Language>("en");
  const t = translations[lang];

  return (
    <div className="flex min-h-screen w-full bg-[#FAFAFA] dark:bg-[#0a0a0a] text-[#263238] dark:text-[#E8F5E9] overflow-hidden">
      {/* Language Selector - Floating Top Right */}
      <div className="absolute top-8 right-8 z-50 animate-fade-in duration-700 delay-300">
        <LanguageSelector currentLang={lang} onLanguageChange={setLang} />
      </div>

      {/* Left Side - Hero Image/Brand - SLIDE FROM LEFT */}
      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center bg-[#1B5E20] dark:bg-[#052b14] p-12 relative overflow-hidden animate-slide-in-left duration-1000">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2813&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="max-w-lg text-center space-y-6 relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#A5D6A7] mb-6 shadow-xl shadow-[#A5D6A7]/20 animate-fade-in animate-zoom-in duration-700 delay-500">
            <span className="text-4xl font-bold text-[#1B5E20]">S</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-white animate-slide-in-bottom duration-700 delay-700">
            {t.welcome}
          </h1>
          <p className="text-xl text-[#E8F5E9]/90 animate-slide-in-bottom duration-700 delay-900">
            {t.welcomeSubtitle}
          </p>
        </div>
      </div>

      {/* Right Side - Login Form - SLIDE FROM RIGHT */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 sm:p-12 relative animate-slide-in-right duration-1000">
        <Link
          href="/"
          className="absolute top-8 left-8 p-2 rounded-full hover:bg-[#1B5E0]/5 transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-[#1B5E20]" />
        </Link>

        <div className="w-full max-w-[420px] space-y-8">
          <div className="text-center lg:text-left space-y-3">
            <h2 className="text-4xl font-bold tracking-tight text-[#1B5E20] dark:text-[#A5D6A7]">
              {t.signIn}
            </h2>
            <p className="text-[#263238]/70 dark:text-[#E8F5E9]/70">
              {t.signInSubtitle}
            </p>
          </div>

          <div className="space-y-6 bg-[#E8F5E9] dark:bg-[#111] p-8 rounded-3xl shadow-xl shadow-[#1B5E20]/5 border border-[#A5D6A7]/30 dark:border-[#333]">
            {/* Identity Input */}
            <div className="space-y-2">
              <label
                htmlFor="identity"
                className="text-sm font-bold leading-none text-[#1B5E20] dark:text-[#E8F5E9] ml-1"
              >
                {t.emailLabel}
              </label>
              <input
                id="identity"
                name="identity"
                type="text"
                className="flex h-12 w-full rounded-2xl border border-[#A5D6A7] dark:border-[#333] bg-[#FAFAFA] dark:bg-[#1a1a1a] px-4 py-3 text-sm placeholder:text-[#263238]/40 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] dark:focus:ring-[#A5D6A7] focus:border-transparent transition-all duration-300 hover:border-[#1B5E20]"
                placeholder={t.emailPlaceholder}
              />
            </div>

            {/* OTP Section */}
            <div className="space-y-5 pt-2">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-[#E0E0E0] dark:border-[#333]" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#E8F5E9] dark:bg-[#111] px-3 text-[#263238]/60 font-bold tracking-wider">
                    {t.secureLogin}
                  </span>
                </div>
              </div>

              {/* Get OTP Button */}
              <a
                href="https://t.me/YourTelegramBot"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0088cc] px-5 py-3 text-sm font-bold text-white shadow-md shadow-[#0088cc]/20 hover:shadow-lg hover:shadow-[#0088cc]/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <Smartphone className="h-4 w-4" />
                {t.getOtp}
                <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </a>
              <p className="text-[11px] text-center text-[#263238]/60 dark:text-[#E8F5E9]/60">
                {t.otpRedirect}
              </p>
            </div>

            {/* OTP Input Field */}
            <div className="space-y-2">
              <label
                htmlFor="otp"
                className="text-sm font-bold leading-none text-[#1B5E20] dark:text-[#E8F5E9] ml-1"
              >
                {t.enterOtp}
              </label>
              <div className="relative group">
                <ShieldCheck className="absolute left-4 top-3.5 h-5 w-5 text-[#263238]/40 group-focus-within:text-[#1B5E20] transition-colors duration-300" />
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  maxLength={6}
                  placeholder={t.otpPlaceholder}
                  className="flex h-12 w-full rounded-2xl border border-[#A5D6A7] dark:border-[#333] bg-[#FAFAFA] dark:bg-[#1a1a1a] pl-11 pr-4 py-3 text-sm text-center tracking-[0.8em] placeholder:tracking-normal placeholder:text-[#263238]/40 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] dark:focus:ring-[#A5D6A7] focus:border-transparent transition-all duration-300 font-mono hover:border-[#1B5E20]"
                />
              </div>
            </div>

            {/* Sign In Button */}
            <button className="w-full rounded-2xl bg-[#1B5E20] dark:bg-[#2E7D32] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#1B5E20]/20 hover:shadow-xl hover:shadow-[#1B5E20]/30 hover:bg-[#2E7D32] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
              {t.submitBtn}
            </button>
          </div>

          <div className="text-center">
            <Link
              href="/auth/register"
              className="text-sm font-semibold text-[#1B5E20] hover:underline hover:text-[#2E7D32] transition-colors"
            >
              {t.noAccount} <span className="font-bold">{t.registerLink}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
