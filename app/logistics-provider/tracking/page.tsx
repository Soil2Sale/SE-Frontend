"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import StatusChip from "@/components/ui/StatusChip";
import { Shipment, ShipmentStatus } from "@/types/shipment.types";
import { getProfile } from "@/services/user/userApi";
import {
  getShipments,
  updateShipmentStatus,
  confirmDelivery,
} from "@/services/shipment/shipmentApi";
import apiClient from "@/services/apiClient";
import {
  getSocket,
  buildConversationId,
  joinChat,
  sendChatMessage,
  ChatMessage,
} from "@/services/socket";
import {
  Package,
  Truck,
  MapPin,
  Search,
  X,
  CheckCircle,
  MessageSquare,
  Send,
  Loader2,
  Bell,
  Clock,
  DollarSign,
} from "lucide-react";

function getOrderPartner(shipment: Shipment): { id: string; name: string } {
  const order = shipment.order as any;
  if (!order) return { id: "", name: "Order Party" };
  const id = order.buyer_user_id || order.sender_user_id || "";
  const name = order.buyer_name || order.sender_name || "Order Party";
  return { id, name };
}

const STATUS_STEPS = [
  { key: ShipmentStatus.CREATED, label: "Created" },
  { key: ShipmentStatus.DISPATCHED, label: "Dispatched" },
  { key: ShipmentStatus.IN_TRANSIT, label: "In Transit" },
  { key: ShipmentStatus.DELIVERED, label: "Delivered" },
];

function getStepIndex(status: ShipmentStatus) {
  const order = [
    ShipmentStatus.CREATED,
    ShipmentStatus.DISPATCHED,
    ShipmentStatus.IN_TRANSIT,
    ShipmentStatus.DELIVERED,
  ];
  return order.indexOf(status);
}

export default function TrackingPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<string[]>([]);

  // Chat
  const [chatShipment, setChatShipment] = useState<Shipment | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [msgInput, setMsgInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ─── Socket ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const socket = getSocket();

    socket.on("chat:message", (msg: ChatMessage) => {
      setMessages((prev) =>
        prev.find((m) => m.id === msg.id) ? prev : [...prev, msg],
      );
    });

    socket.on("notification:new", (n: { message: string }) => {
      setNotifications((prev) => [n.message, ...prev.slice(0, 4)]);
    });

    return () => {
      socket.off("chat:message");
      socket.off("notification:new");
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ─── Fetch shipments ─────────────────────────────────────────────────────────
  const fetchShipments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getShipments({ limit: 100 });
      const active = (res.data || []).filter(
        (s: Shipment) =>
          s.status !== ShipmentStatus.CANCELLED &&
          s.status !== ShipmentStatus.CREATED,
      );
      if (active.length > 0) setShipments(active);
    } catch {
      // keep mock data
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShipments();
  }, [fetchShipments]);

  // ─── Status update ───────────────────────────────────────────────────────────
  const handleStatusUpdate = async (id: string, status: ShipmentStatus) => {
    setUpdating(id);
    try {
      await updateShipmentStatus(id, { status });
    } catch {
      // ok in mock mode
    } finally {
      setShipments((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status } : s)),
      );
      setUpdating(null);
    }
  };

  const handleConfirmDelivery = async (id: string) => {
    setUpdating(id + "_deliver");
    try {
      await confirmDelivery(id);
    } catch {
      // ok
    } finally {
      setShipments((prev) =>
        prev.map((s) =>
          s.id === id
            ? {
                ...s,
                status: ShipmentStatus.DELIVERED,
                delivered_at: new Date().toISOString(),
              }
            : s,
        ),
      );
      setUpdating(null);
    }
  };

  // ─── Chat ────────────────────────────────────────────────────────────────────
  const openChat = async (shipment: Shipment) => {
    setChatShipment(shipment);
    setMessages([]);
    setChatLoading(true);

    const partner = getOrderPartner(shipment);
    if (partner.id && currentUserId) {
      const convId = buildConversationId(currentUserId, partner.id);
      joinChat(convId);
    }

    try {
      if (partner.id) {
        const res = await apiClient.get(
          `/chats/messages/${partner.id}?page=1&limit=50`,
        );
        const history: ChatMessage[] = res.data?.data || res.data || [];
        setMessages(history);
      }
    } catch {
      // live socket will deliver new
    } finally {
      setChatLoading(false);
    }
  };

  const sendMessage = () => {
    if (!msgInput.trim() || !chatShipment) return;
    const partner = getOrderPartner(chatShipment);
    if (partner.id) sendChatMessage(partner.id, msgInput.trim());
    setMsgInput("");
  };

  const filtered = shipments.filter(
    (s) =>
      !searchTerm ||
      s.tracking_code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a4d2e]">Tracking</h1>
          <p className="text-gray-500 text-sm">
            Monitor your accepted shipments in real time
          </p>
        </div>
        {notifications.length > 0 && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-1.5 rounded-xl text-xs text-[#1a4d2e] font-medium">
            <Bell className="w-3.5 h-3.5" />
            {notifications[0]}
          </div>
        )}
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "In Transit",
            count: shipments.filter(
              (s) => s.status === ShipmentStatus.IN_TRANSIT,
            ).length,
            color: "bg-blue-50 text-blue-700",
          },
          {
            label: "Dispatched",
            count: shipments.filter(
              (s) => s.status === ShipmentStatus.DISPATCHED,
            ).length,
            color: "bg-amber-50 text-amber-700",
          },
          {
            label: "Delivered",
            count: shipments.filter(
              (s) => s.status === ShipmentStatus.DELIVERED,
            ).length,
            color: "bg-green-50 text-green-700",
          },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.color} rounded-xl p-3`}>
            <p className="text-xs font-medium opacity-70">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.count}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search tracking code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main layout */}
      <div className="flex gap-4">
        {/* Shipment list */}
        <div
          className={`transition-all duration-300 ${chatShipment ? "w-[55%]" : "w-full"}`}
        >
          {loading ? (
            <div className="flex justify-center py-12 bg-white rounded-2xl">
              <Loader2 className="w-6 h-6 animate-spin text-[#1a4d2e]" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl">
              <Package className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">No active shipments</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((shipment) => {
                const stepIdx = getStepIndex(shipment.status);
                return (
                  <div
                    key={shipment.id}
                    className={`bg-white rounded-xl border transition-all ${
                      chatShipment?.id === shipment.id
                        ? "border-[#1a4d2e] shadow-md"
                        : "border-gray-200 hover:border-[#1a4d2e] hover:shadow-sm"
                    }`}
                  >
                    <div className="p-3">
                      {/* Top row */}
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Truck className="w-4 h-4 text-[#1a4d2e]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-sm text-[#1a4d2e] truncate">
                              {shipment.tracking_code}
                            </span>
                            <StatusChip status={shipment.status} />
                          </div>
                          <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {shipment.origin_latitude.toFixed(2)},{" "}
                              {shipment.origin_longitude.toFixed(2)} →{" "}
                              {shipment.destination_latitude.toFixed(2)},{" "}
                              {shipment.destination_longitude.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Progress bar timeline */}
                      <div className="relative flex items-center mb-3">
                        <div className="absolute inset-x-0 top-[9px] h-0.5 bg-gray-200 z-0" />
                        <div
                          className="absolute top-[9px] h-0.5 bg-[#1a4d2e] z-0 transition-all duration-500"
                          style={{
                            width: `${(stepIdx / (STATUS_STEPS.length - 1)) * 100}%`,
                          }}
                        />
                        {STATUS_STEPS.map((step, idx) => (
                          <div
                            key={step.key}
                            className="relative z-10 flex flex-col items-center flex-1"
                          >
                            <div
                              className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center ${
                                idx <= stepIdx
                                  ? "bg-[#1a4d2e] border-[#1a4d2e]"
                                  : "bg-white border-gray-300"
                              }`}
                            >
                              {idx < stepIdx && (
                                <CheckCircle className="w-3 h-3 text-white" />
                              )}
                            </div>
                            <span
                              className={`text-[9px] mt-1 font-medium ${idx <= stepIdx ? "text-[#1a4d2e]" : "text-gray-400"}`}
                            >
                              {step.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Cost + dates */}
                      <div className="flex items-center gap-3 mb-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />₹
                          {shipment.estimated_cost.toLocaleString()} est.
                        </span>
                        {shipment.dispatched_at && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Dispatched{" "}
                            {new Date(
                              shipment.dispatched_at,
                            ).toLocaleDateString()}
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                        {shipment.status !== ShipmentStatus.DELIVERED &&
                          shipment.status !== ShipmentStatus.CANCELLED && (
                            <select
                              value={shipment.status}
                              onChange={(e) =>
                                handleStatusUpdate(
                                  shipment.id,
                                  e.target.value as ShipmentStatus,
                                )
                              }
                              disabled={updating === shipment.id}
                              className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-[#1a4d2e] disabled:opacity-50"
                            >
                              <option value={ShipmentStatus.DISPATCHED}>
                                Dispatched
                              </option>
                              <option value={ShipmentStatus.IN_TRANSIT}>
                                In Transit
                              </option>
                              <option value={ShipmentStatus.DELIVERED}>
                                Delivered
                              </option>
                            </select>
                          )}
                        {shipment.status === ShipmentStatus.IN_TRANSIT && (
                          <button
                            onClick={() => handleConfirmDelivery(shipment.id)}
                            disabled={updating === shipment.id + "_deliver"}
                            className="flex items-center gap-1 px-2.5 py-1 bg-[#1a4d2e] text-white rounded-lg text-xs font-semibold hover:bg-[#15401f] disabled:opacity-50 transition-colors"
                          >
                            {updating === shipment.id + "_deliver" ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <CheckCircle className="w-3 h-3" />
                            )}
                            Confirm Delivery
                          </button>
                        )}
                        <button
                          onClick={() => openChat(shipment)}
                          className="ml-auto flex items-center gap-1 px-2.5 py-1 rounded-lg border border-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-50 transition-colors"
                        >
                          <MessageSquare className="w-3 h-3" />
                          Chat
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Chat panel */}
        <AnimatePresence>
          {chatShipment && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.25 }}
              className="w-[45%] flex-shrink-0"
            >
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col h-[calc(100vh-260px)] sticky top-4">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <div>
                    <p className="font-semibold text-sm text-[#1a4d2e]">
                      {getOrderPartner(chatShipment).name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {chatShipment.tracking_code}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setChatShipment(null);
                      setMessages([]);
                    }}
                    className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
                  {chatLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="text-center py-10">
                      <MessageSquare className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-xs text-gray-400">
                        No messages yet. Start the conversation!
                      </p>
                    </div>
                  ) : (
                    messages.map((msg) => {
                      const isMe = msg.sender_id === currentUserId;
                      return (
                        <div
                          key={msg.id}
                          className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[75%] rounded-xl px-3 py-2 text-xs ${
                              isMe
                                ? "bg-[#1a4d2e] text-white rounded-br-sm"
                                : "bg-gray-100 text-gray-800 rounded-bl-sm"
                            }`}
                          >
                            <p>{msg.content}</p>
                            <p
                              className={`text-[10px] mt-0.5 ${isMe ? "text-green-200" : "text-gray-400"}`}
                            >
                              {new Date(msg.created_at).toLocaleTimeString(
                                "en-IN",
                                { hour: "2-digit", minute: "2-digit" },
                              )}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="px-3 py-3 border-t border-gray-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={msgInput}
                      onChange={(e) => setMsgInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!msgInput.trim()}
                      className="p-2 bg-[#1a4d2e] text-white rounded-xl hover:bg-[#15401f] disabled:opacity-40 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
