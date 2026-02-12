"use client";

import React from "react";
import { Plus, Tag } from "lucide-react";

export default function MyListingsPage() {
    // Dummy Data
    const listings = [
        { id: 1, name: "Fresh Tomatoes (Hybrid)", price: "₹25 / kg", quantity: "200 kg", status: "Active" },
        { id: 2, name: "Organic Onions", price: "₹18 / kg", quantity: "500 kg", status: "Active" },
        { id: 3, name: "Premium Basmati Rice", price: "₹85 / kg", quantity: "1000 kg", status: "Active" },
        { id: 4, name: "Wheat (Lokwan)", price: "₹32 / kg", quantity: "0 kg", status: "Sold Out" },
        { id: 5, name: "Soybean", price: "₹45 / kg", quantity: "150 kg", status: "Active" },
    ];

    return (
        <div className="min-h-screen bg-[#e8f5e9] font-sans text-[#1a4d2e] p-4 lg:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-[#1a4d2e]">My Listings</h1>
                        <p className="text-gray-600 mt-1">Manage crops listed for sale in the marketplace.</p>
                    </div>
                    <button className="bg-[#1a4d2e] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-800 transition-colors shadow-sm flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Create Listing
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {listings.map((item) => (
                        <div key={item.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
                            {item.status === "Sold Out" && (
                                <div className="absolute top-0 right-0 bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-bl-xl z-10">
                                    SOLD OUT
                                </div>
                            )}
                            {item.status === "Active" && (
                                <div className="absolute top-0 right-0 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-bl-xl z-10">
                                    ACTIVE
                                </div>
                            )}

                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500">
                                    <Tag className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg leading-tight">{item.name}</h3>
                                    <p className="text-green-600 font-bold mt-1">{item.price}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm py-3 border-t border-gray-50">
                                <span className="text-gray-500">Quantity Left</span>
                                <span className="font-semibold text-gray-800">{item.quantity}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-2">
                                <button className="w-full py-2 rounded-xl text-sm font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors">
                                    Edit
                                </button>
                                <button className="w-full py-2 rounded-xl text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors">
                                    Deactivate
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
