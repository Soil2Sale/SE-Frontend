"use client";

import React from "react";
import { User, MapPin, Phone, Mail, Wheat, Ruler, Edit2 } from "lucide-react";
import { PROFILE_LINKS } from "@/app/constants/nav-links";

export default function FarmerProfilePage() {
    return (
        <div className="min-h-screen bg-[#e8f5e9] font-sans text-[#1a4d2e] p-6 lg:p-10">
            <div className="max-w-4xl mx-auto">
                {/* Header Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                    <div className="h-32 bg-gradient-to-r from-green-600 to-green-500"></div>
                    <div className="px-8 pb-8">
                        <div className="relative flex justify-between items-end -mt-12 mb-6">
                            <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-md">
                                <div className="w-full h-full rounded-xl bg-gray-200 flex items-center justify-center text-gray-400">
                                    <User className="w-10 h-10" />
                                </div>
                            </div>
                            <button className="flex items-center gap-2 bg-[#1a4d2e] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-800 transition-colors shadow-sm">
                                <Edit2 className="w-4 h-4" />
                                Edit Profile
                            </button>
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-1">Rajesh Kumar</h1>
                            <p className="text-green-600 font-medium flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                Nagpur, Maharashtra
                            </p>
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Info */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Contact Information</h2>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 font-semibold uppercase">Email</label>
                                    <p className="text-gray-900 font-medium">rajesh.kumar@example.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 font-semibold uppercase">Phone</label>
                                    <p className="text-gray-900 font-medium">+91 98765 43210</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Farm Details */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Farm Details</h2>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                    <Ruler className="w-5 h-5" />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 font-semibold uppercase">Farm Size</label>
                                    <p className="text-gray-900 font-medium">12.5 Acres</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                    <Wheat className="w-5 h-5" />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 font-semibold uppercase">Primary Crops</label>
                                    <div className="flex gap-2 mt-1">
                                        <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-md font-medium">Cotton</span>
                                        <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-md font-medium">Soybean</span>
                                        <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-md font-medium">Wheat</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Grid (Quick Access) */}
                <div className="mt-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Dashboard Features</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {PROFILE_LINKS["Farmer"].map((item) => (
                            <a href={item.href} key={item.label} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer hover:border-green-200">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>
                                    {item.icon}
                                </div>
                                <span className="font-semibold text-gray-700 text-sm">{item.label}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
