"use client";

import React from "react";
import { Bell } from "lucide-react";

interface NavbarProps {
    title: string;
    userName: string;
    userLocation: string;
    notifications?: Array<{
        id: string;
        type: string;
        message: string;
        time: string;
        read: boolean;
    }>;
    onNotificationClick?: () => void;
    showNotifications?: boolean;
    notificationIcon?: React.ReactNode;
}

export default function Navbar({
    title,
    userName,
    userLocation,
    notifications = [],
    onNotificationClick,
    showNotifications = false,
    notificationIcon,
}: NavbarProps) {
    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="relative w-full md:w-96">
                <h1 className="text-2xl font-bold text-[#1a4d2e]">{title}</h1>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative">
                    <button
                        className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-500 relative"
                        onClick={onNotificationClick}
                    >
                        <Bell className="w-5 h-5" />
                        {unreadCount > 0 && (
                            <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                        )}
                    </button>

                    {showNotifications && notificationIcon}
                </div>

                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm">
                    <div className="h-10 w-10 rounded-full bg-[#1a4d2e] flex items-center justify-center text-white font-bold">
                        {userName.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#1a4d2e]">{userName}</span>
                        <span className="text-xs text-gray-500">{userLocation}</span>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-green-500 ml-2"></div>
                </div>
            </div>
        </header>
    );
}
