"use client";

import { useState } from "react";

interface GifCardProps {
  title?: string;
}

export function GifCard({ title = "Quick Overview" }: GifCardProps) {
  return (
    <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl shadow-md p-6 flex items-center justify-center text-white hover:shadow-lg transition-shadow relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
      
      <div className="text-center relative z-10">
        <div className="text-5xl mb-3">🚚</div>
        <p className="text-sm font-semibold mb-2">Logistics Network</p>
        <p className="text-xs opacity-90">Real-time Shipment Tracking</p>
      </div>
    </div>
  );
}
