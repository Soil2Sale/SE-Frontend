"use client";

import React from "react";
import { TrendingUp, Calendar } from "lucide-react";

export default function YieldHistoryPage() {
    // Dummy Data
    const history = [
        { id: 1, crop: "Wheat", year: "2024", yield: "7,500 kg", profit: "₹2,40,000" },
        { id: 2, crop: "Cotton", year: "2024", yield: "3,800 kg", profit: "₹1,90,000" },
        { id: 3, crop: "Soybean", year: "2023", yield: "2,200 kg", profit: "₹1,10,000" },
        { id: 4, crop: "Tomato", year: "2023", yield: "12,000 kg", profit: "₹3,00,000" },
        { id: 5, crop: "Rice", year: "2022", yield: "8,000 kg", profit: "₹2,80,000" },
    ];

    return (
        <div className="min-h-screen bg-[#e8f5e9] font-sans text-[#1a4d2e] p-4 lg:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#1a4d2e]">Yield History</h1>
                    <p className="text-gray-600 mt-1">Track your past production and profitability.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {history.map((item) => (
                        <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{item.crop}</h3>
                                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                        <Calendar className="w-3 h-3" />
                                        <span>{item.year}</span>
                                    </div>
                                </div>
                                <div className="p-2 bg-green-50 rounded-full text-green-600">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-100">
                                    <span className="text-sm text-gray-500">Total Yield</span>
                                    <span className="font-semibold text-gray-900">{item.yield}</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-sm text-gray-500">Net Profit</span>
                                    <span className="font-bold text-[#1a4d2e] text-lg">{item.profit}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
