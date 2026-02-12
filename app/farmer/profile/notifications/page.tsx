"use client";

import React from "react";

export default function NotificationsPage() {
    // Dummy Data
    const notifications = [
        { id: 1, message: "New offer received for your Tomato listing from Fresh Markets.", time: "10 mins ago", read: false },
        { id: 2, message: "Your withdrawal of ₹10,000 has been processed successfully.", time: "2 hours ago", read: false },
        { id: 3, message: "Order #ORD-9821 status updated to Delivered.", time: "1 day ago", read: true },
        { id: 4, message: "Buyer 'City Greens' sent a counter-offer for Wheat.", time: "2 days ago", read: true },
        { id: 5, message: "Welcome to Solar Schemes! Check eligibility now.", time: "3 days ago", read: true },
        { id: 6, message: "System Maintenance scheduled for tonight at 2 AM.", time: "5 days ago", read: true },
    ];

    return (
        <div className="min-h-screen bg-[#e8f5e9] font-sans text-[#1a4d2e] p-4 lg:p-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-[#1a4d2e]">Notifications</h1>
                        <p className="text-gray-600 mt-1">Stay updated with alerts and messages.</p>
                    </div>
                    <button className="text-sm font-semibold text-[#1a4d2e] hover:underline">Mark all as read</button>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="divide-y divide-gray-50">
                        {notifications.map((notif) => (
                            <div key={notif.id} className={`p-5 flex gap-4 hover:bg-gray-50 transition-colors ${!notif.read ? "bg-blue-50/30" : ""}`}>
                                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${!notif.read ? "bg-blue-500" : "bg-transparent"}`}></div>
                                <div className="flex-1">
                                    <p className={`text-sm text-gray-800 mb-1 ${!notif.read ? "font-semibold" : ""}`}>
                                        {notif.message}
                                    </p>
                                    <p className="text-xs text-gray-400">{notif.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
