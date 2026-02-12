"use client";

import React from "react";
import Link from "next/link";
import { PROFILE_LINKS } from "@/app/constants/nav-links";
import { User, Mail, Phone, MapPin, Calendar, Edit, Settings, LogOut, ShieldCheck } from "lucide-react";
import { StatusChip } from "@/components/ui/StatusChip"; // Assuming this exists, if not I'll remove or create a simple one. 
// Actually I checked and StatusChip exists.

export default function BuyerProfilePage() {
    const buyerLinks = PROFILE_LINKS["Buyer"] || [];

    // Mock user data - in a real app this would come from a context or API
    // BUT strict instructions: NO BACKEND. Static or derived data only.
    const userProfile = {
        name: "Alex Buyer",
        role: "Buyer",
        email: "alex.buyer@example.com",
        phone: "+1 (555) 123-4567",
        location: "New York, USA",
        joined: "Jan 2024",
        status: "Active",
        verified: true,
    };

    return (
        <div className="min-h-screen bg-gray-50/50 pb-12">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center border-2 border-white shadow-sm">
                                <User className="h-10 w-10 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{userProfile.name}</h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                                        {userProfile.role}
                                    </span>
                                    {userProfile.verified && (
                                        <span className="flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                                            <ShieldCheck className="w-3 h-3" />
                                            Verified
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                            <button className="flex-1 md:flex-none items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                                <Settings className="w-4 h-4" />
                                Settings
                            </button>
                            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
                                <Edit className="w-4 h-4" />
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                {/* Profile Stats / Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Personal Info */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:col-span-2">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Profile Details</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Mail className="w-4 h-4" /> Email Address
                                </div>
                                <div className="text-gray-900 font-medium">{userProfile.email}</div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Phone className="w-4 h-4" /> Phone Number
                                </div>
                                <div className="text-gray-900 font-medium">{userProfile.phone}</div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <MapPin className="w-4 h-4" /> Location
                                </div>
                                <div className="text-gray-900 font-medium">{userProfile.location}</div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Calendar className="w-4 h-4" /> Member Since
                                </div>
                                <div className="text-gray-900 font-medium">{userProfile.joined}</div>
                            </div>
                        </div>
                    </div>

                    {/* Account Status / Summary */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Account Status</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-gray-600 text-sm">Status</span>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    {userProfile.status}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-gray-600 text-sm">Verification</span>
                                <span className="text-sm font-medium text-gray-900">Level 2 (Business)</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-600 text-sm">Reputation</span>
                                <div className="flex items-center gap-1">
                                    <span className="text-yellow-500">★</span>
                                    <span className="text-sm font-medium text-gray-900">4.8/5.0</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-4">
                                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Grid */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Access & Management</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {buyerLinks.map((link, index) => {
                            // Skip the generic "Profile" link if it points to the current page to avoid redundancy, 
                            // but key requirement is ALL links from nav-links. 
                            // However, typically "Profile" in the profile page is redundant. 
                            // I will keep it but maybe highlight it or just render all as cards.
                            const Icon = link.icon as React.ReactElement; // Cast for TS

                            return (
                                <Link
                                    key={index}
                                    href={link.href}
                                    className="group relative flex flex-col items-start p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200"
                                >
                                    <div className="mb-3 p-2.5 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                                        {/* Clone icon to potentially adjust size if needed, though nav-links has rigid sizing */}
                                        {React.cloneElement(Icon as React.ReactElement, { className: "w-6 h-6" })}
                                    </div>
                                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                                        {link.label}
                                    </h3>
                                    <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                                        Manage your {link.label.toLowerCase()} settings and view details.
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
