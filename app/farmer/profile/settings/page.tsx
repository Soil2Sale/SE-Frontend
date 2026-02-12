"use client";

import React from "react";
import { Save, User, Bell, Lock, Shield } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-[#e8f5e9] font-sans text-[#1a4d2e] p-4 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#1a4d2e]">Settings</h1>
                    <p className="text-gray-600 mt-1">Manage your account preferences and security.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar Nav */}
                    <div className="md:col-span-1 space-y-2">
                        <button className="w-full text-left px-4 py-2 rounded-xl text-green-700 bg-green-100 font-semibold flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Account
                        </button>
                        <button className="w-full text-left px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 font-medium flex items-center gap-2">
                            <Bell className="w-4 h-4" />
                            Notifications
                        </button>
                        <button className="w-full text-left px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 font-medium flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            Security
                        </button>
                        <button className="w-full text-left px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 font-medium flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            Privacy
                        </button>
                    </div>

                    {/* Main Content Area */}
                    <div className="md:col-span-3 space-y-6">
                        {/* Profile Section */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2">Profile Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                    <input type="text" defaultValue="Rajesh Kumar" className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all text-gray-800" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                    <input type="email" defaultValue="rajesh.kumar@example.com" className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all text-gray-800" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                    <input type="tel" defaultValue="+91 98765 43210" className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all text-gray-800" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                                    <input type="text" defaultValue="Nagpur, Maharashtra" className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all text-gray-800" />
                                </div>
                            </div>
                        </div>

                        {/* Password Section */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2">Change Password</h2>
                            <div className="space-y-4 max-w-md">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all" />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button className="bg-[#1a4d2e] text-white px-8 py-3 rounded-xl font-bold hover:bg-green-800 transition-colors shadow-lg shadow-green-900/10 flex items-center gap-2">
                                <Save className="w-5 h-5" />
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
