"use client";

import React from "react";
import Link from "next/link";
import { PROFILE_LINKS } from "@/app/constants/nav-links";
import { User, Truck, Package, Warehouse, Settings, ShieldCheck, Mail, Phone, MapPin, Calendar, LogOut, Route } from "lucide-react";

export default function LogisticsProfilePage() {
    const logisticsLinks = PROFILE_LINKS["Logistics Provider"] || [];

    // Mock data for Logistics Provider
    const logisticsProfile = {
        name: "FastTrack Logistics",
        type: "Logistics Service Provider",
        email: "operations@fasttrack.com",
        phone: "+1 (555) 555-0199",
        location: "Chicago, USA",
        joined: "Aug 2023",
        status: "Active",
        verified: true,
        fleetSize: 15,
        activeShipments: 12,
        storageCapacity: "50,000 sq ft",
    };

    return (
        <div className="min-h-screen bg-gray-50/50 pb-12">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center border-2 border-white shadow-sm">
                                <Truck className="h-10 w-10 text-slate-700" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{logisticsProfile.name}</h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-sm font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                                        {logisticsProfile.type}
                                    </span>
                                    {logisticsProfile.verified && (
                                        <span className="flex items-center gap-1 text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                                            <ShieldCheck className="w-3 h-3" />
                                            Verified Partner
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
                            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 rounded-lg text-sm font-medium text-white hover:bg-slate-900 transition-colors shadow-sm">
                                <Route className="w-4 h-4" />
                                Track Fleet
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                {/* Profile Stats / Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Company Info */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:col-span-2">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Company Details</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Mail className="w-4 h-4" /> Dispatch Email
                                </div>
                                <div className="text-gray-900 font-medium">{logisticsProfile.email}</div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Phone className="w-4 h-4" /> Logistics Hotline
                                </div>
                                <div className="text-gray-900 font-medium">{logisticsProfile.phone}</div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <MapPin className="w-4 h-4" /> Hub Location
                                </div>
                                <div className="text-gray-900 font-medium">{logisticsProfile.location}</div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Calendar className="w-4 h-4" /> Partner Since
                                </div>
                                <div className="text-gray-900 font-medium">{logisticsProfile.joined}</div>
                            </div>
                        </div>
                    </div>

                    {/* Operational Stats */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Operations</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-gray-600 text-sm">Active Fleet</span>
                                <div className="flex items-center gap-2">
                                    <Truck className="w-4 h-4 text-slate-500" />
                                    <span className="text-sm font-bold text-gray-900">{logisticsProfile.fleetSize} Vehicles</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-gray-600 text-sm">In Transit</span>
                                <div className="flex items-center gap-2">
                                    <Package className="w-4 h-4 text-blue-500" />
                                    <span className="text-sm font-bold text-gray-900">{logisticsProfile.activeShipments} Shipments</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-600 text-sm">Storage</span>
                                <div className="flex items-center gap-2">
                                    <Warehouse className="w-4 h-4 text-orange-500" />
                                    <span className="text-sm font-bold text-gray-900">{logisticsProfile.storageCapacity}</span>
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
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Logistics Management</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {logisticsLinks.map((link, index) => {
                            const Icon = link.icon as React.ReactElement;
                            return (
                                <Link
                                    key={index}
                                    href={link.href}
                                    className="group relative flex flex-col items-start p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200"
                                >
                                    <div className="mb-3 p-2.5 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-slate-700 group-hover:text-white transition-colors duration-200">
                                        {React.cloneElement(Icon, { className: "w-6 h-6" })}
                                    </div>
                                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-slate-800 transition-colors">
                                        {link.label}
                                    </h3>
                                    <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                                        Manage {link.label.toLowerCase()} & logistics.
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
