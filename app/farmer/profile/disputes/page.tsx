"use client";

import React from "react";
import { AlertTriangle, Eye } from "lucide-react";

export default function DisputesPage() {
    // Dummy Data
    const disputes = [
        { id: "DSP-001", orderId: "ORD-9821", buyer: "Fresh Markets", reason: "Payment Delay", status: "Open" },
        { id: "DSP-002", orderId: "ORD-9810", buyer: "Big Basket Hub", reason: "Quality Mismatch Claim", status: "Under Review" },
        { id: "DSP-003", orderId: "ORD-9755", buyer: "Local Mandi", reason: "Transport Damage", status: "Resolved" },
    ];

    return (
        <div className="min-h-screen bg-[#e8f5e9] font-sans text-[#1a4d2e] p-4 lg:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#1a4d2e]">Disputes</h1>
                    <p className="text-gray-600 mt-1">Manage and resolve transaction issues.</p>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="p-4 font-semibold text-gray-600 text-sm">Dispute ID</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">Order ID</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">Buyer</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">Reason</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">Status</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {disputes.map((item) => (
                                <tr key={item.id} className="border-b border-gray-50">
                                    <td className="p-4 font-medium text-gray-900">{item.id}</td>
                                    <td className="p-4 text-gray-600">{item.orderId}</td>
                                    <td className="p-4 text-gray-600">{item.buyer}</td>
                                    <td className="p-4 text-gray-800">{item.reason}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-md text-xs font-bold border ${item.status === "Open" ? "bg-red-50 text-red-700 border-red-100" :
                                                item.status === "Resolved" ? "bg-green-50 text-green-700 border-green-100" :
                                                    "bg-amber-50 text-amber-700 border-amber-100"
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <button className="flex items-center gap-1 text-sm text-[#1a4d2e] font-semibold hover:underline">
                                            <Eye className="w-4 h-4" />
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
