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
    <div className="bg-white border-4 border-gray-300 p-8 rounded-3xl h-full flex flex-col justify-between">
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Credit Rating</p>
        <div className={`w-20 h-20 rounded-full ${ratingColors[rating.rating]} flex items-center justify-center mb-4`}>
          <span className="text-3xl font-black">{rating.rating}</span>
        </div>
        <p className="text-sm opacity-70 mb-4">Recovery Score: <span className="font-bold">{rating.score}%</span></p>
      </div>
      <div className="space-y-2 text-xs">
        {rating.factors.map((factor, i) => (
          <div key={i} className="flex items-center gap-2 text-gray-600">
            <CheckCircle size={14} className="text-green-500" />
            <span>{factor}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
