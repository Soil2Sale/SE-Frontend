"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Leaf, Sprout, Truck, AlertTriangle, Bell } from "lucide-react";

export default function CooperativeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [userProfile] = useState<any>({
    name: "Demo Cooperative",
    email: "coop@soil2sale.local",
  });

  useEffect(() => {
    setNotifications([]);
    setIsLoading(false);
  }, []);

  const navbarNotifications = notifications.map((n) => ({
    id: n.id,
    type: String(n.notification_type || ""),
    message: n.message,
    time: n.sent_at || "",
    read: !!n.read_at,
  }));

  const getNotificationIcon = (type: string) => {
    if (
      type.toLowerCase().includes("ai") ||
      type.toLowerCase().includes("insight")
    ) {
      return (
        <div className="p-2 bg-blue-100 rounded-full text-blue-600">
          <Leaf className="w-4 h-4" />
        </div>
      );
    } else if (type.toLowerCase().includes("scheme")) {
      return (
        <div className="p-2 bg-green-100 rounded-full text-green-600">
          <Sprout className="w-4 h-4" />
        </div>
      );
    } else if (type.toLowerCase().includes("order")) {
      return (
        <div className="p-2 bg-orange-100 rounded-full text-orange-600">
          <Truck className="w-4 h-4" />
        </div>
      );
    } else if (type.toLowerCase().includes("system")) {
      return (
        <div className="p-2 bg-red-100 rounded-full text-red-600">
          <AlertTriangle className="w-4 h-4" />
        </div>
      );
    }
    return (
      <div className="p-2 bg-gray-100 rounded-full text-gray-600">
        <Bell className="w-4 h-4" />
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#060010] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#e8f5e9]">
      <Sidebar />
      <main className="flex-1 overflow-auto p-4 lg:p-8">
        <Navbar
          title="Dashboard"
          userName={userProfile?.name || ""}
          userLocation={userProfile?.email || ""}
          notifications={navbarNotifications}
          onNotificationClick={() => setShowNotifications(!showNotifications)}
          showNotifications={showNotifications}
          notificationIcon={
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-[#f8faf9]">
                <h3 className="font-bold text-[#1a4d2e]">Notifications</h3>
                <button className="text-xs text-blue-600 hover:underline">
                  Mark all read
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer flex gap-3 ${!n.read_at ? "bg-blue-50/30" : ""}`}
                  >
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(String(n.notification_type || ""))}
                    </div>
                    <div>
                      <p
                        className={`text-sm text-gray-800 leading-snug ${!n.read_at ? "font-semibold" : ""}`}
                      >
                        {n.message}
                      </p>
                      <span className="text-xs text-gray-400 mt-1 block">
                        {n.sent_at || ""}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center border-t border-gray-100 bg-gray-50">
                <button className="text-sm font-bold text-[#1a4d2e] hover:text-green-700">
                  View all notifications
                </button>
              </div>
            </div>
          }
        />
        {children}
      </main>
    </div>
  );
}
