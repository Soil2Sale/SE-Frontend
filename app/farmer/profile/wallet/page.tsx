"use client";

import React from "react";
import { Wallet, ArrowUpRight, History, CreditCard } from "lucide-react";

export default function WalletPage() {
    return (
        <div className="min-h-screen bg-[#e8f5e9] font-sans text-[#1a4d2e] p-4 lg:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#1a4d2e]">My Wallet</h1>
                    <p className="text-gray-600 mt-1">Manage your funds and payouts.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Balance Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-gradient-to-br from-[#1a4d2e] to-green-700 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Wallet className="w-32 h-32" />
                            </div>

                            <p className="text-green-100 font-medium mb-1">Available Balance</p>
                            <h2 className="text-4xl font-bold mb-8">₹ 52,400.00</h2>

                            <button className="w-full bg-white text-[#1a4d2e] py-3 rounded-xl font-bold hover:bg-green-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
                                <ArrowUpRight className="w-5 h-5" />
                                Withdraw Funds
                            </button>

                            <p className="text-xs text-green-200 mt-4 text-center">
                                Next auto-payout scheduled for 15 Feb
                            </p>
                        </div>

                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mt-6">
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-gray-400" />
                                Linked Accounts
                            </h3>
                            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center mb-2">
                                <div>
                                    <p className="font-semibold text-sm text-gray-900">HDFC Bank</p>
                                    <p className="text-xs text-gray-500">**** 8821</p>
                                </div>
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">Primary</span>
                            </div>
                            <button className="text-sm text-[#1a4d2e] font-semibold hover:underline mt-2">
                                + Add Bank Account
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Recent Activity */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-full">
                            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <History className="w-5 h-5 text-gray-400" />
                                Recent Wallet Activity
                            </h3>

                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center font-bold text-lg">
                                                ₹
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">Payout to Bank Account</p>
                                                <p className="text-xs text-gray-500">10 Feb 2024, 2:30 PM</p>
                                            </div>
                                        </div>
                                        <span className="font-bold text-gray-900">- ₹10,000</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
