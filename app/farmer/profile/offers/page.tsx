"use client";

import React from "react";
import { Check, X, ArrowRight } from "lucide-react";

export default function OffersPage() {
    // Dummy Data
    const offers = [
        { id: 1, buyer: "Fresh Mart Retail", crop: "Tomato", quantity: "200 kg", price: "₹2,000", total: "₹4,00,000" },
        { id: 2, buyer: "Star Wholesale", crop: "Onion", quantity: "500 kg", price: "₹20,000", total: "₹10,000" }, // Price seems off in prompt example/logic, adjusting to realistic per kg or total. Assuming Total offer here. Let's fix realistic.
        // Fixing to realistic: Offer price per kg * qty
        { id: 3, buyer: "Green Grocers", crop: "Basmati Rice", quantity: "100 kg", price: "₹9,000", total: "₹9,000" },
    ];

    // Better Dummy Data
    const realisticOffers = [
        { id: 1, buyer: "Fresh Mart Retail", crop: "Tomato", quantity: "200 kg", price: "₹28 / kg", total: "₹5,600" },
        { id: 2, buyer: "Star Wholesale", crop: "Onion", quantity: "500 kg", price: "₹16 / kg", total: "₹8,000" },
        { id: 3, buyer: "Suresh Mandi Traders", crop: "Wheat", quantity: "1000 kg", price: "₹30 / kg", total: "₹30,000" },
        { id: 4, buyer: "Organic Foods Co.", crop: "Soybean", quantity: "100 kg", price: "₹50 / kg", total: "₹5,000" },
    ];

    return (
        <div className="min-h-screen bg-[#e8f5e9] font-sans text-[#1a4d2e] p-4 lg:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#1a4d2e]">Offers Received</h1>
                    <p className="text-gray-600 mt-1">Review and manage purchase offers from buyers.</p>
                </div>

                <div className="space-y-4">
                    {realisticOffers.map((offer) => (
                        <div key={offer.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-bold text-gray-900 text-lg">{offer.buyer}</h3>
                                    <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-md font-medium">New Offer</span>
                                </div>
                                <p className="text-gray-500 text-sm">
                                    Wants to buy <span className="font-semibold text-gray-800">{offer.quantity}</span> of <span className="font-semibold text-gray-800">{offer.crop}</span>
                                </p>
                            </div>

                            <div className="text-left md:text-right">
                                <p className="text-xs text-gray-500 uppercase font-semibold">Offered Price</p>
                                <p className="text-2xl font-bold text-[#1a4d2e]">{offer.price}</p>
                                <p className="text-sm text-gray-400">Total: {offer.total}</p>
                            </div>

                            <div className="flex gap-3 w-full md:w-auto">
                                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700 transition-colors font-semibold shadow-sm">
                                    <Check className="w-4 h-4" />
                                    Accept
                                </button>
                                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white text-red-600 border border-red-100 px-5 py-3 rounded-xl hover:bg-red-50 transition-colors font-semibold">
                                    <X className="w-4 h-4" />
                                    Reject
                                </button>
                                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-50 text-gray-700 px-5 py-3 rounded-xl hover:bg-gray-100 transition-colors font-semibold">
                                    Negotiate
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
