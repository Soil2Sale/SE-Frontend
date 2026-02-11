"use client";

import { Star } from "lucide-react";
import { useState } from "react";

interface RatingCardProps {
  rating: number;
  maxRating: number;
  reviews: number;
}

export function RatingCard({ rating: initialRating, maxRating, reviews }: RatingCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(initialRating);
  const [reviewCount, setReviewCount] = useState(reviews);

  return (
    <div
      className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-center items-center hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => setIsEditing(!isEditing)}
    >
      <Star className="w-12 h-12 text-yellow-500 mb-3" />
      <p className="text-gray-600 text-sm">Rating</p>

      {isEditing ? (
        <div className="mt-3 w-full space-y-2 text-sm">
          <input
            type="number"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(parseFloat(e.target.value))}
            placeholder="Rating"
            className="w-full px-2 py-1 border border-gray-300 rounded text-gray-900"
          />
          <input
            type="number"
            value={reviewCount}
            onChange={(e) => setReviewCount(parseInt(e.target.value))}
            placeholder="Reviews"
            className="w-full px-2 py-1 border border-gray-300 rounded text-gray-900"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(false);
            }}
            className="w-full bg-yellow-500 text-white py-1 rounded text-xs font-semibold hover:bg-yellow-600"
          >
            Save
          </button>
        </div>
      ) : (
        <>
          <p className="text-2xl font-bold text-gray-900 mt-2">{rating.toFixed(1)}</p>
          <p className="text-xs text-gray-500 mt-1">Out of {maxRating.toFixed(1)}</p>
          <p className="text-xs text-gray-500 mt-1">{reviewCount} Reviews</p>
        </>
      )}
    </div>
  );
}
