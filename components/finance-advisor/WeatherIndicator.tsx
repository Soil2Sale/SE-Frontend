'use client';
import React from 'react';
import { getPortfolioWeatherIndicator } from './partnership-services';

export default function WeatherIndicator() {
  const indicator = getPortfolioWeatherIndicator();

  // Use colors aligned with financial analysis (subtle gradients)
  const statusColors = {
    Excellent: 'bg-gradient-to-br from-green-50 to-blue-50 border-green-200 text-green-800',
    Stable: 'bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200 text-sky-800',
    Risky: 'bg-gradient-to-br from-yellow-50 to-amber-50 border-amber-200 text-amber-800',
    Critical: 'bg-gradient-to-br from-rose-50 to-red-50 border-rose-200 text-red-800',
  } as Record<string,string>;

  return (
    <div className={`p-8 rounded-3xl border-4 flex flex-col justify-between h-full ${statusColors[indicator.status]}`}>
      <div>
        <p className="text-xs font-black uppercase tracking-widest opacity-70 mb-2">Portfolio Weather</p>
        <h4 className="text-4xl font-black italic">{indicator.status}</h4>
      </div>

      <div>
        <div className="flex items-end justify-between mt-6">
          <div>
            <p className="text-sm opacity-70 leading-relaxed">{indicator.description}</p>
            <p className="text-2xl font-black mt-3">{indicator.score}%</p>
          </div>
          <div className="opacity-50" />
        </div>
      </div>
    </div>
  );
}