"use client";

import React from "react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

export default function TransactionsPage() {
    // Dummy Data
    const transactions = [
        { id: "TXN-88123", date: "12 Feb 2024", type: "Credit", amount: "₹14,000", description: "Payment from Fresh Markets" },
        { id: "TXN-88122", date: "10 Feb 2024", type: "Debit", amount: "₹2,000", description: "Logistics Fee (Order #9821)" },
        { id: "TXN-88121", date: "08 Feb 2024", type: "Credit", amount: "₹32,000", description: "Payment from Local Mandi" },
        { id: "TXN-88120", date: "05 Feb 2024", type: "Debit", amount: "₹500", description: "Platform Commission" },
        { id: "TXN-88119", date: "01 Feb 2024", type: "Credit", amount: "₹8,000", description: "Advance for Order #9822" },
    ];

    return (
        <div className="min-h-screen bg-[#e8f5e9] font-sans text-[#1a4d2e] p-4 lg:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#1a4d2e]">Transactions</h1>
                    <p className="text-gray-600 mt-1">Financial history of your sales and expenses.</p>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="p-5 font-semibold text-gray-600 text-sm">Transaction ID</th>
                                    <th className="p-5 font-semibold text-gray-600 text-sm">Date</th>
                                    <th className="p-5 font-semibold text-gray-600 text-sm">Description</th>
                                    <th className="p-5 font-semibold text-gray-600 text-sm">Type</th>
                                    <th className="p-5 font-semibold text-gray-600 text-sm text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((txn) => (
                                    <tr key={txn.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                                        <td className="p-5 font-medium text-gray-500 text-sm">{txn.id}</td>
                                        <td className="p-5 text-gray-800">{txn.date}</td>
                                        <td className="p-5 text-gray-800">{txn.description}</td>
                                        <td className="p-5">
                                            <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md w-fit ${txn.type === "Credit" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                                                }`}>
                                                {txn.type === "Credit" ? <ArrowDownLeft className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                                                {txn.type}
                                            </span>
                                        </td>
                                        <td className={`p-5 font-bold text-right ${txn.type === "Credit" ? "text-green-700" : "text-gray-900"}`}>
                                            {txn.type === "Credit" ? "+" : "-"} {txn.amount}
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
