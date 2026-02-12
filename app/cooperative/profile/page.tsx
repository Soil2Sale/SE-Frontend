"use client";

import React from "react";
import Link from "next/link";
import { PROFILE_LINKS } from "@/app/constants/nav-links";
import { User, Users, Store, BarChart3, Settings, ShieldCheck, Mail, Phone, MapPin, Calendar, LogOut } from "lucide-react";

export default function CooperativeProfilePage() {
    const cooperativeLinks = PROFILE_LINKS["Cooperative"] || [];

    // Mock data for Cooperative
    const cooperativeProfile = {
        name: "Green Valley Coop",
        type: "Agricultural Cooperative",
        email: "contact@greenvalley.coop",
        phone: "+1 (555) 987-6543",
        location: "California, USA",
        joined: "Mar 2023",
        status: "Active",
        verified: true,
        members: 1250,
        listings: 45,
    };

    return (
        <div className="min-h-screen bg-gray-50/50 pb-12">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center border-2 border-white shadow-sm">
                                <Users className="h-10 w-10 text-green-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{cooperativeProfile.name}</h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                        {cooperativeProfile.type}
                                    </span>
                                    {cooperativeProfile.verified && (
                                        <span className="flex items-center gap-1 text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                                            <ShieldCheck className="w-3 h-3" />
                                            Verified Entity
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
                            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-green-600 rounded-lg text-sm font-medium text-white hover:bg-green-700 transition-colors shadow-sm">
                                <Store className="w-4 h-4" />
                                Manage Store
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                {/* Profile Stats / Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Organization Info */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:col-span-2">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Cooperative Details</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Mail className="w-4 h-4" /> Official Email
                                </div>
                                <div className="text-gray-900 font-medium">{cooperativeProfile.email}</div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Phone className="w-4 h-4" /> Contact Number
                                </div>
                                <div className="text-gray-900 font-medium">{cooperativeProfile.phone}</div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <MapPin className="w-4 h-4" /> Headquarters
                                </div>
                                <div className="text-gray-900 font-medium">{cooperativeProfile.location}</div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Calendar className="w-4 h-4" /> Established
                                </div>
                                <div className="text-gray-900 font-medium">{cooperativeProfile.joined}</div>
                            </div>
                        </div>
                    </div>

                    {/* Operational Stats */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Overview</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-gray-600 text-sm">Active Members</span>
                                <span className="text-sm font-bold text-gray-900">{cooperativeProfile.members}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-gray-600 text-sm">Active Listings</span>
                                <span className="text-sm font-bold text-gray-900">{cooperativeProfile.listings}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-600 text-sm">Performance</span>
                                <div className="flex items-center gap-1">
                                    <BarChart3 className="w-4 h-4 text-green-500" />
                                    <span className="text-sm font-medium text-gray-900">+12% YoY</span>
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
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Management Dashboard</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {cooperativeLinks.map((link, index) => {
                            const Icon = link.icon as React.ReactElement;
                            return (
                                <Link
                                    key={index}
                                    href={link.href}
                                    className="group relative flex flex-col items-start p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-green-200 transition-all duration-200"
                                >
                                    <div className="mb-3 p-2.5 rounded-lg bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-200">
                                        {React.cloneElement(Icon, { className: "w-6 h-6" })}
                                    </div>
                                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                                        {link.label}
                                    </h3>
                                    <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                                        Access {link.label.toLowerCase()} tools and reports.
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
