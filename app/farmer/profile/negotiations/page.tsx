"use client";

import React from "react";
import { MessageSquare, Clock } from "lucide-react";

export default function NegotiationsPage() {
    // Dummy Data
    const negotiations = [
        { id: 1, buyer: "Fresh Mart", crop: "Tomato", initialOffer: "₹25/kg", counterOffer: "₹28/kg", status: "Pending Buyer Response", lastUpdate: "2 hrs ago" },
        { id: 2, buyer: "Global Exporters", crop: "Wheat", initialOffer: "₹30/kg", counterOffer: "₹32/kg", status: "Countered by You", lastUpdate: "1 day ago" },
        { id: 3, buyer: "City Vegetables", crop: "Onion", initialOffer: "₹15/kg", counterOffer: "₹18/kg", status: "Buyer Accepted", lastUpdate: "3 hrs ago" },
    ];

    return (
        <div className="min-h-screen bg-[#e8f5e9] font-sans text-[#1a4d2e] p-4 lg:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#1a4d2e]">Negotiations</h1>
                    <p className="text-gray-600 mt-1">Manage ongoing price discussions with buyers.</p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {negotiations.map((item) => (
                        <div key={item.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:border-green-200 transition-all cursor-pointer group">
                            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                                        <MessageSquare className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{item.buyer}</h3>
                                        <p className="text-sm text-gray-500">Negotiating for <span className="font-semibold text-gray-800">{item.crop}</span></p>

                                        <div className="flex gap-4 mt-2">
                                            <div className="text-xs">
                                                <span className="text-gray-400">Initial:</span> <span className="font-medium text-gray-700">{item.initialOffer}</span>
                                            </div>
                                            <div className="text-xs">
                                                <span className="text-gray-400">Latest:</span> <span className="font-bold text-[#1a4d2e]">{item.counterOffer}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-start md:items-end gap-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.status.includes("Accepted") ? "bg-green-100 text-green-700" :
                                            item.status.includes("Countered") ? "bg-amber-100 text-amber-700" :
                                                "bg-blue-100 text-blue-700"
                                        }`}>
                                        {item.status}
                                    </span>
                                    <div className="flex items-center gap-1 text-xs text-gray-400">
                                        <Clock className="w-3 h-3" />
                                        {item.lastUpdate}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
