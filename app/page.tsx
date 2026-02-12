"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Leaf, ShoppingBasket, Users } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F3F6F3] dark:bg-[#0a0a0a] text-[#11231D] dark:text-[#E8F5E9] flex flex-col">
      {/* Navigation Bar */}
      <nav className="w-full px-6 py-4 flex justify-between items-center bg-transparent  sticky top-0 z-50 ">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-[#11231D] flex items-center justify-center text-[#D6F364] font-bold text-xl shadow-lg shadow-[#11231D]/20">
            S
          </div>
          <span className="text-xl font-bold tracking-tight text-[#11231D] dark:text-[#D6F364]">
            Soil2Sale
          </span>
        </div>

        <div className="flex gap-4">
          <Link
            href="/auth/login"
            className="px-4 py-2 text-sm font-semibold text-[#11231D] dark:text-[#E8F5E9] hover:bg-[#11231D]/5 rounded-xl transition-all"
          >
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-1/4 -left-10 w-64 h-64 bg-[#D6F364]/30 rounded-full blur-[100px] animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-10 w-80 h-80 bg-[#11231D]/10 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        <div className="max-w-4xl space-y-8 relative z-10 animate-fade-in animate-slide-in-bottom duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#11231D]/5 border border-[#11231D]/10 text-sm font-medium text-[#11231D] dark:text-[#D6F364] mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D6F364] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#11231D] dark:bg-[#D6F364]"></span>
            </span>
            Direct from earth to your table
          </div>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-[#11231D] dark:text-[#E8F5E9] leading-tight">
            Fresh Produce, <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#11231D] to-[#4F6F52] dark:from-[#D6F364] dark:to-[#22c55e]">
              Fair Prices.
            </span>
          </h1>

          <p className="text-xl text-[#4F6F52] dark:text-[#86efac] max-w-2xl mx-auto leading-relaxed">
            Connect directly with local farmers. Buy and sell fresh, organic
            produce without middlemen. Empowering growers and nourishing
            communities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              href="/auth/register"
              className="px-8 py-4 text-base font-bold text-[#11231D] bg-[#D6F364] dark:bg-[#D6F364] dark:text-[#11231D] rounded-2xl shadow-xl shadow-[#D6F364]/30 hover:shadow-2xl hover:shadow-[#D6F364]/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
            >
              Get Started
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-24 animate-fade-in animate-slide-in-bottom duration-1000 delay-300">
          {[
            {
              icon: Leaf,
              title: "100% Organic",
              desc: "Certified organic produce directly from verified local farms.",
            },
            {
              icon: Users,
              title: "Direct Connection",
              desc: "Chat with farmers, know where your food comes from.",
            },
            {
              icon: ShoppingBasket,
              title: "Fair Trade",
              desc: "Farmers set their prices. You get the best deal, transparency guaranteed.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#111] p-8 rounded-3xl border border-[#11231D]/5 dark:border-[#333] hover:border-[#11231D]/20 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#D6F364]/20 text-[#11231D] dark:text-[#D6F364] flex items-center justify-center mb-4 mx-auto">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#11231D] dark:text-[#E8F5E9] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#4F6F52] dark:text-[#86efac]/80 text-sm">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-[#4F6F52]/60 dark:text-[#86efac]/40 border-t border-[#11231D]/5 dark:border-[#333]">
        <p>© 2026 Soil2Sale Inc. All formatting rights reserved.</p>
      </footer>
    </div>
  );
}
