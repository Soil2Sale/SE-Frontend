"use client";

import React from "react";
import { Package, Truck, CheckCircle } from "lucide-react";

export default function OrdersSoldPage() {
    // Dummy Data
    const orders = [
        { id: "#ORD-9821", buyer: "Fresh Markets", product: "Tomato (500kg)", amount: "₹14,000", status: "Delivered", date: "10 Feb 2024" },
        { id: "#ORD-9822", buyer: "Big Basket Hub", product: "Onion (200kg)", amount: "₹6,400", status: "Processing", date: "12 Feb 2024" },
        { id: "#ORD-9823", buyer: "Local Mandi", product: "Wheat (1000kg)", amount: "₹32,000", status: "Shipped", date: "08 Feb 2024" },
        { id: "#ORD-9824", buyer: "Organic Store", product: "Soybean (100kg)", amount: "₹5,000", status: "Cancelled", date: "05 Feb 2024" },
    ];

    return (
        <div className="min-h-screen bg-[#e8f5e9] font-sans text-[#1a4d2e] p-4 lg:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#1a4d2e]">Orders Sold</h1>
                    <p className="text-gray-600 mt-1">Track the status of your sold produce.</p>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="p-5 font-semibold text-gray-600 text-sm">Order ID</th>
                                <th className="p-5 font-semibold text-gray-600 text-sm">Buyer</th>
                                <th className="p-5 font-semibold text-gray-600 text-sm">Product</th>
                                <th className="p-5 font-semibold text-gray-600 text-sm">Amount</th>
                                <th className="p-5 font-semibold text-gray-600 text-sm">Date</th>
                                <th className="p-5 font-semibold text-gray-600 text-sm">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                                    <td className="p-5 font-medium text-gray-900">{order.id}</td>
                                    <td className="p-5 text-gray-600">{order.buyer}</td>
                                    <td className="p-5 text-gray-600">{order.product}</td>
                                    <td className="p-5 font-semibold text-[#1a4d2e]">{order.amount}</td>
                                    <td className="p-5 text-gray-500 text-sm">{order.date}</td>
                                    <td className="p-5">
                                        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold w-fit ${order.status === "Delivered" ? "bg-green-100 text-green-700" :
                                                order.status === "Processing" ? "bg-blue-100 text-blue-700" :
                                                    order.status === "Shipped" ? "bg-purple-100 text-purple-700" :
                                                        "bg-red-100 text-red-700"
                                            }`}>
                                            {order.status === "Delivered" ? <CheckCircle className="w-3 h-3" /> :
                                                order.status === "Shipped" ? <Truck className="w-3 h-3" /> :
                                                    <Package className="w-3 h-3" />}
                                            {order.status}
                                        </span>
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
