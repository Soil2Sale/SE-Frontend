'use client';
import React from 'react';
import { Award, CheckCircle } from 'lucide-react';
import { calculateCreditRating } from './partnership-services';

export default function CreditRating() {
  const rating = calculateCreditRating();

  const ratingColors: Record<string, string> = {
    AAA: 'bg-green-600 text-white',
    AA: 'bg-green-500 text-white',
    A: 'bg-blue-600 text-white',
    BBB: 'bg-blue-400 text-white',
    BB: 'bg-yellow-500 text-white',
    B: 'bg-red-500 text-white',
  };

  return (
    <div className="bg-white border-4 border-[#4CAF50] p-3 rounded-2xl h-full flex flex-col justify-between shadow-md">
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-[#1B5E20] mb-1.5">Credit Rating</p>
        <div className={`w-14 h-14 rounded-full ${ratingColors[rating.rating]} flex items-center justify-center mb-2`}>
          <span className="text-xl font-black">{rating.rating}</span>
        </div>
        <p className="text-xs text-[#558B2F] mb-2">Recovery: <span className="font-bold text-[#2E7D32]">{rating.score}%</span></p>
      </div>
      <div className="space-y-0.5 text-xs">
        {rating.factors.map((factor, i) => (
          <div key={i} className="flex items-center gap-1.5 text-[#558B2F]">
            <CheckCircle size={10} className="text-[#4CAF50]" />
            <span className="text-xs">{factor}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
