"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "@/services/shipment/shipmentApi";
import { Notification, NotificationType } from "@/types/shipment.types";
import {
  HelpCircle,
  Bell,
  Package,
  Truck,
  AlertCircle,
  Check,
  Trash2,
  ExternalLink,
  FileText,
  MessageCircle,
  Shield,
} from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "How do I update shipment status?",
    answer:
      "Navigate to the Shipments page, select a shipment, and use the status dropdown to update. You can mark shipments as Dispatched, In Transit, or Delivered.",
  },
  {
    question: "How do I add a new vehicle?",
    answer:
      "Go to Fleet & Storage, select the Vehicles tab, and click 'Add Vehicle'. Fill in the vehicle type, capacity, and availability status.",
  },
  {
    question: "What is the tracking code?",
    answer:
      "The tracking code is a unique identifier assigned to each shipment. Share it with customers so they can track their orders on the Tracking page.",
  },
  {
    question: "How do I manage storage facilities?",
    answer:
      "In Fleet & Storage, switch to the Storage tab. You can add new facilities with location, capacity, and pricing details.",
  },
  {
    question: "What should I do if there's a dispute?",
    answer:
      "Visit your Profile > Disputes page to view and manage any disputes. You can provide evidence and communicate with the admin team.",
  },
];

export default function SupportPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<NotificationType | "ALL">("ALL");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, [filterType, showUnreadOnly]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const params: any = { limit: 50 };
      if (filterType !== "ALL") params.notification_type = filterType;
      if (showUnreadOnly) params.unread_only = true;

      const response = await getNotifications(params);
      setNotifications(response.data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await markNotificationAsRead(id);
      await fetchNotifications();
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      await fetchNotifications();
    } catch (err) {
      console.error("Error marking all as read:", err);
    }
  };

  const handleDeleteNotification = async (id: string) => {
    if (!confirm("Are you sure you want to delete this notification?")) return;
    try {
      await deleteNotification(id);
      await fetchNotifications();
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.ORDER:
        return <Package className="w-5 h-5" />;
      case NotificationType.SHIPMENT:
        return <Truck className="w-5 h-5" />;
      case NotificationType.SYSTEM:
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type: NotificationType) => {
    switch (type) {
      case NotificationType.ORDER:
        return "from-blue-500 to-blue-600";
      case NotificationType.SHIPMENT:
        return "from-green-500 to-green-600";
      case NotificationType.SYSTEM:
        return "from-red-500 to-red-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const unreadCount = notifications.filter((n) => !n.read_at).length;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-3 light-theme-font">
            Support Center
          </h1>
          <p className="text-gray-400 text-lg">
            Get help and stay updated with notifications
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Help & FAQ */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-[#1a4d2e] to-[#0d2818] rounded-2xl p-6 border border-[#4ade80]/30 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-[#4ade80]" />
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/logistics-provider/profile/disputes">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
                    <div className="flex items-center justify-between mb-2">
                      <AlertCircle className="w-8 h-8 text-[#4ade80]" />
                      <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-white font-bold text-lg">
                      View Disputes
                    </h3>
                    <p className="text-gray-300 text-sm mt-1">
                      Manage and resolve disputes
                    </p>
                  </div>
                </Link>

                <Link href="/logistics-provider/shipments">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
                    <div className="flex items-center justify-between mb-2">
                      <Package className="w-8 h-8 text-[#4ade80]" />
                      <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-white font-bold text-lg">
                      My Shipments
                    </h3>
                    <p className="text-gray-300 text-sm mt-1">
                      View all active shipments
                    </p>
                  </div>
                </Link>

                <Link href="/logistics-provider/fleet-storage">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
                    <div className="flex items-center justify-between mb-2">
                      <Truck className="w-8 h-8 text-[#4ade80]" />
                      <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-white font-bold text-lg">
                      Fleet & Storage
                    </h3>
                    <p className="text-gray-300 text-sm mt-1">
                      Manage vehicles and facilities
                    </p>
                  </div>
                </Link>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-2">
                    <MessageCircle className="w-8 h-8 text-[#4ade80]" />
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-white font-bold text-lg">
                    Contact Admin
                  </h3>
                  <p className="text-gray-300 text-sm mt-1">
                    Get help from support team
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-[#1a4d2e] mb-4 flex items-center gap-2">
                <HelpCircle className="w-6 h-6" />
                Frequently Asked Questions
              </h2>

              <div className="space-y-3">
                {FAQ_ITEMS.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setExpandedFaq(expandedFaq === index ? null : index)
                      }
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-left text-[#1a4d2e]">
                        {item.question}
                      </span>
                      <motion.div
                        animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FileText className="w-5 h-5 text-[#4ade80]" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {expandedFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 pt-0 text-gray-600 text-sm leading-relaxed">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Notifications */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#dcfce7] to-[#bbf7d0] rounded-2xl p-6 shadow-lg border border-[#4ade80]/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold light-theme-font flex items-center gap-2">
                  <Bell className="w-6 h-6 text-[#4ade80]" />
                  Notifications
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </h2>
              </div>

              <div className="space-y-3 mb-4">
                <select
                  value={filterType}
                  onChange={(e) =>
                    setFilterType(e.target.value as NotificationType | "ALL")
                  }
                  className="w-full bg-white/40 backdrop-blur-md border border-[#2a2a3e] rounded-lg px-4 py-2 text-[#1a4d2e] focus:outline-none focus:border-[#4ade80]"
                >
                  <option value="ALL">All Types</option>
                  <option value={NotificationType.ORDER}>Order Updates</option>
                  <option value={NotificationType.SHIPMENT}>
                    Shipment Updates
                  </option>
                  <option value={NotificationType.SYSTEM}>System Alerts</option>
                </select>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showUnreadOnly}
                    onChange={(e) => setShowUnreadOnly(e.target.checked)}
                    className="w-4 h-4 text-[#4ade80] border-gray-300 rounded focus:ring-[#4ade80]"
                  />
                  <span className="text-sm font-semibold text-[#1a4d2e]">
                    Show unread only
                  </span>
                </label>

                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="w-full bg-white/40 backdrop-blur-md border border-[#2a2a3e] rounded-lg px-4 py-2 text-[#1a4d2e] font-semibold hover:bg-white/60 transition-colors text-sm"
                  >
                    Mark All as Read
                  </button>
                )}
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#4ade80] mx-auto"></div>
                </div>
              ) : notifications.length > 0 ? (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`rounded-xl p-4 border transition-all ${
                        notification.read_at
                          ? "bg-white/40 border-gray-200"
                          : "bg-white/80 border-[#4ade80] shadow-sm"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getNotificationColor(notification.notification_type)} flex items-center justify-center text-white flex-shrink-0`}
                        >
                          {getNotificationIcon(notification.notification_type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#1a4d2e] leading-snug mb-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(notification.sent_at).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex gap-1 flex-shrink-0">
                          {!notification.read_at && (
                            <button
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                              title="Mark as read"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() =>
                              handleDeleteNotification(notification.id)
                            }
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">
                    No notifications found
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
