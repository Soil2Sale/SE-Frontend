"use client";

import React from "react";
import { Star } from "lucide-react";

export default function RatingsReviewsPage() {
    // Dummy Data
    const reviews = [
        { id: 1, buyer: "Fresh Markets", rating: 5, comment: "Excellent quality tomatoes. Very fresh and well packed.", date: "10 Feb 2024" },
        { id: 2, buyer: "Big Basket Hub", rating: 4, comment: "Good onions, but delivery was slighty delayed.", date: "05 Feb 2024" },
        { id: 3, buyer: "Suresh Traders", rating: 5, comment: "Trustworthy farmer. Best wheat grain quality in the region.", date: "01 Feb 2024" },
        { id: 4, buyer: "City Greens", rating: 3, comment: "Average quality this time. Expecting better next batch.", date: "20 Jan 2024" },
    ];

    return (
        <div className="min-h-screen bg-[#e8f5e9] font-sans text-[#1a4d2e] p-4 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 flex items-end gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-[#1a4d2e]">Ratings & Reviews</h1>
                        <p className="text-gray-600 mt-1">Feedback from your buyers.</p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-green-100 flex items-center gap-2 mb-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <span className="font-bold text-lg text-gray-900">4.5</span>
                        <span className="text-sm text-gray-400">(24 Reviews)</span>
                    </div>
                </div>

                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-gray-900">{review.buyer}</h3>
                                <span className="text-xs text-gray-400">{review.date}</span>
                            </div>
                            <div className="flex items-center gap-1 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`}
                                    />
                                ))}
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">"{review.comment}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
