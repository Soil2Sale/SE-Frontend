"use client";

import React from "react";
import { Plus } from "lucide-react";

export default function MyCropsPage() {
    // Dummy Data
    const crops = [
        { id: 1, name: "Tomato", quantity: "500 kg", expectedYield: "2000 kg", season: "Rabi", status: "Growing" },
        { id: 2, name: "Onion", quantity: "1200 kg", expectedYield: "5000 kg", season: "Kharif", status: "Harvest Ready" },
        { id: 3, name: "Rice (Basmati)", quantity: "3000 kg", expectedYield: "8000 kg", season: "Kharif", status: "Sowing" },
        { id: 4, name: "Wheat", quantity: "2500 kg", expectedYield: "7500 kg", season: "Rabi", status: "Growing" },
        { id: 5, name: "Cotton", quantity: "1000 kg", expectedYield: "4000 kg", season: "Kharif", status: "Harvested" },
    ];

    return (
        <div className="min-h-screen bg-[#e8f5e9] font-sans text-[#1a4d2e] p-4 lg:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-[#1a4d2e]">My Crops</h1>
                        <p className="text-gray-600 mt-1">Manage your crop inventory and status.</p>
                    </div>
                    <button className="bg-[#1a4d2e] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-800 transition-colors shadow-sm flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add Crop
                    </button>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="p-5 font-semibold text-gray-600 text-sm">Crop Name</th>
                                    <th className="p-5 font-semibold text-gray-600 text-sm">Current Quantity</th>
                                    <th className="p-5 font-semibold text-gray-600 text-sm">Expected Yield</th>
                                    <th className="p-5 font-semibold text-gray-600 text-sm">Season</th>
                                    <th className="p-5 font-semibold text-gray-600 text-sm">Status</th>
                                    <th className="p-5 font-semibold text-gray-600 text-sm">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {crops.map((crop) => (
                                    <tr key={crop.id} className="border-b border-gray-50 hover:bg-green-50/30 transition-colors">
                                        <td className="p-5 font-medium text-gray-900">{crop.name}</td>
                                        <td className="p-5 text-gray-600">{crop.quantity}</td>
                                        <td className="p-5 text-gray-600">{crop.expectedYield}</td>
                                        <td className="p-5">
                                            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium border border-blue-100">
                                                {crop.season}
                                            </span>
                                        </td>
                                        <td className="p-5">
                                            <span className={`px-2 py-1 text-xs rounded-md font-medium border ${crop.status === "Growing" ? "bg-green-50 text-green-700 border-green-100" :
                                                    crop.status === "Harvest Ready" ? "bg-amber-50 text-amber-700 border-amber-100" :
                                                        crop.status === "Sowing" ? "bg-purple-50 text-purple-700 border-purple-100" :
                                                            "bg-gray-50 text-gray-700 border-gray-200"
                                                }`}>
                                                {crop.status}
                                            </span>
                                        </td>
                                        <td className="p-5">
                                            <button className="text-sm text-green-700 font-semibold hover:underline">Edit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
