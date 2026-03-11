"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import StatusChip from "@/components/ui/StatusChip";
import {
  Shipment,
  ShipmentStatus,
  ShipmentRequest,
  ShipmentRequestStatus,
  ShipmentRequestNegLog,
  Vehicle,
} from "@/types/shipment.types";
import { getProfile } from "@/services/user/userApi";
import {
  getShipments,
  updateShipmentStatus,
  confirmDelivery,
  getShipmentRequests,
  respondToShipmentRequest,
  getShipmentRequestNegotiations,
  getVehicles,
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
  Search,
  X,
  CheckCircle,
  XCircle,
  MessageSquare,
  Send,
  ChevronRight,
  Clock,
  DollarSign,
  Calendar,
  Loader2,
  Bell,
  ChevronDown,
  ChevronUp,
  RefreshCcw,
} from "lucide-react";

type TabType = "requests" | "active";

function getOrderPartner(shipment: Shipment): { id: string; name: string } {
  const order = shipment.order as any;
  if (!order) return { id: "", name: "Order Party" };
  const id = order.buyer_user_id || order.sender_user_id || "";
  const name = order.buyer_name || order.sender_name || "Order Party";
  return { id, name };
}

function getRequestFarmer(req: ShipmentRequest): { id: string; name: string } {
  return {
    id: req.farmer_user_id,
    name: (req.order as any)?.farmer_name || "Farmer",
  };
}

export default function ShipmentsPage() {
  const [tab, setTab] = useState<TabType>("requests");
  const [currentUserId, setCurrentUserId] = useState("");
  const [shipmentRequests, setShipmentRequests] = useState<ShipmentRequest[]>(
    [],
  );
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  const [negotiationLogs, setNegotiationLogs] = useState<
    Record<string, ShipmentRequestNegLog[]>
  >({});
  const [expandedLogs, setExpandedLogs] = useState<Record<string, boolean>>({});
  const [logsLoading, setLogsLoading] = useState<Record<string, boolean>>({});

  const [counterTarget, setCounterTarget] = useState<ShipmentRequest | null>(
    null,
  );
  const [counterCost, setCounterCost] = useState("");
  const [counterDays, setCounterDays] = useState("");
  const [counterMsg, setCounterMsg] = useState("");
  const [counterSubmitting, setCounterSubmitting] = useState(false);

  const [acceptTarget, setAcceptTarget] = useState<ShipmentRequest | null>(
    null,
  );
  const [ownVehicles, setOwnVehicles] = useState<Vehicle[]>([]);
  const [acceptVehicleId, setAcceptVehicleId] = useState("");
  const [acceptSubmitting, setAcceptSubmitting] = useState(false);

  const [chatShipment, setChatShipment] = useState<Shipment | null>(null);
  const [chatRequest, setChatRequest] = useState<ShipmentRequest | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [msgInput, setMsgInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ─── Socket setup ───────────────────────────────────────────────────────────
  useEffect(() => {
    const socket = getSocket();

    socket.on("chat:message", (msg: ChatMessage) => {
      setMessages((prev) => {
        if (prev.find((m) => m.id === msg.id)) return prev;
        return [...prev, msg];
      });
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

  // ─── Fetch current user + all shipments ────────────────────────────────────
  useEffect(() => {
    getProfile()
      .then((res) => {
        if (res?.data?.id) setCurrentUserId(res.data.id);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    getVehicles()
      .then((res) => {
        setOwnVehicles(res.data || []);
      })
      .catch(() => {});
  }, []);

  const fetchShipments = useCallback(async () => {
    try {
      setLoading(true);
      const [reqRes, shipRes] = await Promise.all([
        getShipmentRequests({ limit: 100 }),
        getShipments({ limit: 100 }),
      ]);
      const allReqs: ShipmentRequest[] = reqRes.data || [];
      const allShips: Shipment[] = shipRes.data || [];
      setShipmentRequests(
        allReqs.filter(
          (r) =>
            r.status === ShipmentRequestStatus.PENDING ||
            r.status === ShipmentRequestStatus.NEGOTIATING,
        ),
      );
      setShipments(
        allShips.filter(
          (s) =>
            s.status !== ShipmentStatus.CREATED &&
            s.status !== ShipmentStatus.CANCELLED,
        ),
      );
    } catch {
      setShipmentRequests([]);
      setShipments([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShipments();
  }, [fetchShipments]);

  // ─── Accept / Reject ────────────────────────────────────────────────────────
  const openAccept = (req: ShipmentRequest) => {
    setAcceptTarget(req);
    setAcceptVehicleId(
      req.vehicle_id ||
        ownVehicles.find((v) => v.available)?.id ||
        ownVehicles[0]?.id ||
        "",
    );
    setAcceptSubmitting(false);
  };

  const handleAcceptRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTarget) return;
    setAcceptSubmitting(true);
    setUpdating(acceptTarget.id + "_accept");
    try {
      await respondToShipmentRequest(acceptTarget.id, {
        action: "accept",
        proposed_cost: acceptTarget.proposed_cost,
        proposed_duration_days: acceptTarget.proposed_duration_days,
        vehicle_id: acceptVehicleId,
      });
      setShipmentRequests((prev) =>
        prev.filter((r) => r.id !== acceptTarget.id),
      );
      setAcceptTarget(null);
    } finally {
      setAcceptSubmitting(false);
      setUpdating(null);
    }
  };

  const handleRejectRequest = async (id: string) => {
    setUpdating(id + "_reject");
    try {
      await respondToShipmentRequest(id, { action: "reject" });
      setShipmentRequests((prev) => prev.filter((r) => r.id !== id));
    } finally {
      setUpdating(null);
    }
  };

  const openCounter = (req: ShipmentRequest) => {
    setCounterTarget(req);
    setCounterCost(String(req.proposed_cost));
    setCounterDays(String(req.proposed_duration_days));
    setCounterMsg("");
  };

  const submitCounter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!counterTarget) return;
    setCounterSubmitting(true);
    try {
      await respondToShipmentRequest(counterTarget.id, {
        action: "counter",
        proposed_cost: Number(counterCost),
        proposed_duration_days: Number(counterDays),
        message: counterMsg,
      });
      setCounterTarget(null);
      setNegotiationLogs((prev) => {
        const next = { ...prev };
        delete next[counterTarget.id];
        return next;
      });
      setShipmentRequests((prev) =>
        prev.map((r) =>
          r.id === counterTarget.id
            ? { ...r, status: ShipmentRequestStatus.NEGOTIATING }
            : r,
        ),
      );
    } finally {
      setCounterSubmitting(false);
    }
  };

  const toggleLog = async (reqId: string) => {
    if (negotiationLogs[reqId] !== undefined) {
      setExpandedLogs((prev) => ({ ...prev, [reqId]: !prev[reqId] }));
      return;
    }
    setLogsLoading((prev) => ({ ...prev, [reqId]: true }));
    setExpandedLogs((prev) => ({ ...prev, [reqId]: true }));
    try {
      const res = await getShipmentRequestNegotiations(reqId);
      setNegotiationLogs((prev) => ({ ...prev, [reqId]: res.data || [] }));
    } catch {
      setNegotiationLogs((prev) => ({ ...prev, [reqId]: [] }));
    } finally {
      setLogsLoading((prev) => ({ ...prev, [reqId]: false }));
    }
  };

  const handleStatusUpdate = async (id: string, status: ShipmentStatus) => {
    setUpdating(id);
    try {
      await updateShipmentStatus(id, { status });
      setShipments((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status } : s)),
      );
    } finally {
      setUpdating(null);
    }
  };

  const handleConfirmDelivery = async (id: string) => {
    setUpdating(id + "_deliver");
    try {
      await confirmDelivery(id);
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
    } finally {
      setUpdating(null);
    }
  };

  // ─── Chat handlers ──────────────────────────────────────────────────────────
  const openChatForShipment = async (shipment: Shipment) => {
    setChatRequest(null);
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
    } finally {
      setChatLoading(false);
    }
  };

  const openChatForRequest = async (req: ShipmentRequest) => {
    setChatShipment(null);
    setChatRequest(req);
    setMessages([]);
    setChatLoading(true);

    const farmer = getRequestFarmer(req);
    if (farmer.id && currentUserId) {
      const convId = buildConversationId(currentUserId, farmer.id);
      joinChat(convId);
    }

    try {
      if (farmer.id) {
        const res = await apiClient.get(
          `/chats/messages/${farmer.id}?page=1&limit=50`,
        );
        const history: ChatMessage[] = res.data?.data || res.data || [];
        setMessages(history);
      }
    } catch {
    } finally {
      setChatLoading(false);
    }
  };

  const sendMessage = () => {
    if (!msgInput.trim()) return;
    let partnerId = "";
    if (chatShipment) partnerId = getOrderPartner(chatShipment).id;
    if (chatRequest) partnerId = getRequestFarmer(chatRequest).id;
    if (!partnerId) return;
    sendChatMessage(partnerId, msgInput.trim());
    setMsgInput("");
  };

  const activeChatPartnerName = chatShipment
    ? getOrderPartner(chatShipment).name
    : chatRequest
      ? getRequestFarmer(chatRequest).name
      : "";

  const activeChatSubtitle = chatShipment
    ? chatShipment.tracking_code
    : chatRequest
      ? chatRequest.id
      : "";

  const filteredRequests = shipmentRequests.filter(
    (r) =>
      !searchTerm ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.order as any)?.crop_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );
  const filteredShipments = shipments.filter(
    (s) =>
      !searchTerm ||
      s.tracking_code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const isChatOpen = !!(chatShipment || chatRequest);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a4d2e]">Shipments</h1>
          <p className="text-gray-500 text-sm">
            Manage requests and track your active shipments
          </p>
        </div>
        {notifications.length > 0 && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-1.5 rounded-xl text-xs text-[#1a4d2e] font-medium">
            <Bell className="w-3.5 h-3.5" />
            {notifications[0]}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        {(["requests", "active"] as TabType[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              tab === t
                ? "bg-[#1a4d2e] text-white shadow-sm"
                : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            {t === "requests" ? (
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Pending Requests
                {shipmentRequests.length > 0 && (
                  <span className="bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {shipmentRequests.length}
                  </span>
                )}
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                My Shipments ({shipments.length})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        <div
          className={`transition-all duration-300 ${isChatOpen ? "w-[55%]" : "w-full"}`}
        >
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={
                tab === "requests"
                  ? "Search requests..."
                  : "Search tracking code..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12 bg-white rounded-2xl">
              <Loader2 className="w-6 h-6 animate-spin text-[#1a4d2e]" />
            </div>
          ) : tab === "requests" ? (
            filteredRequests.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl">
                <Package className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">No pending requests</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredRequests.map((req) => (
                  <div
                    key={req.id}
                    className={`bg-white rounded-xl border transition-all ${
                      chatRequest?.id === req.id
                        ? "border-[#1a4d2e] shadow-md"
                        : "border-gray-200 hover:border-[#1a4d2e] hover:shadow-sm"
                    }`}
                  >
                    <div className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                          <Truck className="w-4 h-4 text-[#1a4d2e]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-sm text-[#1a4d2e] truncate">
                              {(req.order as any)?.crop_name ?? "Order"}
                            </span>
                            <StatusChip status={req.status} />
                          </div>
                          <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />₹
                              {req.proposed_cost.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {req.proposed_duration_days} days
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(req.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-gray-100">
                        <button
                          onClick={() => toggleLog(req.id)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-100 transition-colors"
                        >
                          <MessageSquare className="w-3 h-3" />
                          Negotiation Log
                          {expandedLogs[req.id] ? (
                            <ChevronUp className="w-3 h-3" />
                          ) : (
                            <ChevronDown className="w-3 h-3" />
                          )}
                        </button>
                        <div className="flex-1" />
                        <button
                          onClick={() => handleRejectRequest(req.id)}
                          disabled={!!updating}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-50 disabled:opacity-50 transition-colors"
                        >
                          {updating === req.id + "_reject" ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          Reject
                        </button>
                        <button
                          onClick={() => openCounter(req)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#1a4d2e] text-[#1a4d2e] text-xs font-semibold hover:bg-green-50 transition-colors"
                        >
                          <RefreshCcw className="w-3 h-3" />
                          Counter
                        </button>
                        <button
                          onClick={() => openAccept(req)}
                          disabled={!!updating}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1a4d2e] text-white text-xs font-semibold hover:bg-[#15401f] disabled:opacity-50 transition-colors"
                        >
                          {updating === req.id + "_accept" ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <CheckCircle className="w-3 h-3" />
                          )}
                          Accept
                        </button>
                        <button
                          onClick={() => openChatForRequest(req)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-50 transition-colors"
                        >
                          <MessageSquare className="w-3 h-3" />
                          Chat
                        </button>
                      </div>
                    </div>

                    {expandedLogs[req.id] && (
                      <div className="border-t border-gray-100 px-4 py-3">
                        <h4 className="text-xs font-semibold text-gray-600 mb-2">
                          Negotiation History
                        </h4>
                        {logsLoading[req.id] ? (
                          <div className="flex items-center gap-2 text-xs text-gray-400 py-2">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />{" "}
                            Loading...
                          </div>
                        ) : !negotiationLogs[req.id] ||
                          negotiationLogs[req.id].length === 0 ? (
                          <p className="text-xs text-gray-400 py-1">
                            No negotiation activity yet.
                          </p>
                        ) : (
                          <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                            {negotiationLogs[req.id].map((log) => (
                              <div
                                key={log.id}
                                className="flex gap-3 p-2.5 bg-gray-50 rounded-lg border border-gray-100"
                              >
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-0.5">
                                    <span className="text-[11px] font-semibold text-gray-600 capitalize">
                                      {log.proposed_by_role?.replace(
                                        "_",
                                        " ",
                                      ) ?? "Party"}
                                    </span>
                                    <span className="text-[10px] text-gray-400">
                                      {new Date(
                                        log.created_at,
                                      ).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <p className="text-xs font-bold text-[#1a4d2e]">
                                    ₹{log.proposed_cost.toLocaleString()} ·{" "}
                                    {log.proposed_duration_days} days
                                  </p>
                                  {log.message && (
                                    <p className="text-[11px] text-gray-500 mt-0.5">
                                      {log.message}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )
          ) : filteredShipments.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl">
              <Package className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">No active shipments</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredShipments.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-xl border transition-all cursor-pointer ${
                    chatShipment?.id === item.id
                      ? "border-[#1a4d2e] shadow-md"
                      : "border-gray-200 hover:border-[#1a4d2e] hover:shadow-sm"
                  }`}
                >
                  <div className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                        <Truck className="w-4 h-4 text-[#1a4d2e]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-sm text-[#1a4d2e] truncate">
                            {item.tracking_code}
                          </span>
                          <StatusChip status={item.status} />
                        </div>
                        <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />₹
                            {item.estimated_cost.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(item.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100">
                      {item.status !== ShipmentStatus.DELIVERED &&
                        item.status !== ShipmentStatus.CANCELLED && (
                          <select
                            value={item.status}
                            onChange={(e) =>
                              handleStatusUpdate(
                                item.id,
                                e.target.value as ShipmentStatus,
                              )
                            }
                            disabled={updating === item.id}
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
                            <option value={ShipmentStatus.CANCELLED}>
                              Cancelled
                            </option>
                          </select>
                        )}
                      {item.status === ShipmentStatus.IN_TRANSIT && (
                        <button
                          onClick={() => handleConfirmDelivery(item.id)}
                          disabled={updating === item.id + "_deliver"}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1a4d2e] text-white text-xs font-semibold hover:bg-[#15401f] disabled:opacity-50 transition-colors"
                        >
                          {updating === item.id + "_deliver" ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <CheckCircle className="w-3 h-3" />
                          )}
                          Confirm Delivery
                        </button>
                      )}
                      <button
                        onClick={() => openChatForShipment(item)}
                        className="ml-auto flex items-center gap-1 px-2.5 py-1 rounded-lg border border-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-50 transition-colors"
                      >
                        <MessageSquare className="w-3 h-3" />
                        Chat
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.25 }}
              className="w-[45%] shrink-0"
            >
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col h-[calc(100vh-220px)] sticky top-4">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <div>
                    <p className="font-semibold text-sm text-[#1a4d2e]">
                      {activeChatPartnerName}
                    </p>
                    <p className="text-xs text-gray-400">
                      {activeChatSubtitle}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setChatShipment(null);
                      setChatRequest(null);
                      setMessages([]);
                    }}
                    className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

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
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

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

      {acceptTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setAcceptTarget(null)}
          />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-[#1a4d2e] px-8 py-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Accept Request
                </h2>
                <p className="text-green-200 text-sm mt-0.5">
                  {(acceptTarget.order as any)?.crop_name ?? "Order"}
                </p>
              </div>
              <button
                onClick={() => setAcceptTarget(null)}
                className="text-white/70 hover:text-white transition-colors rounded-full p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mx-8 mt-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-xs text-gray-500 text-center mb-1">
                Farmer's Proposal
              </p>
              <p className="font-bold text-[#1a4d2e] text-sm text-center">
                ₹{acceptTarget.proposed_cost.toLocaleString()} ·{" "}
                {acceptTarget.proposed_duration_days} days
              </p>
            </div>

            <form
              onSubmit={handleAcceptRequest}
              className="px-8 py-6 space-y-5 text-black"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Assign Vehicle
                </label>
                {ownVehicles.length === 0 ? (
                  <p className="text-sm text-red-500">
                    No vehicles found on your profile.
                  </p>
                ) : (
                  <select
                    required
                    value={acceptVehicleId}
                    onChange={(e) => setAcceptVehicleId(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e] text-sm"
                  >
                    <option value="">Select a vehicle</option>
                    {ownVehicles.map((v) => (
                      <option key={v.id} value={v.id} disabled={!v.available}>
                        {v.vehicle_type} — {v.capacity}kg capacity
                        {v.available ? "" : " (unavailable)"}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setAcceptTarget(null)}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-gray-600 font-semibold hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={acceptSubmitting || !acceptVehicleId}
                  className="flex-1 px-4 py-3 bg-[#1a4d2e] text-white rounded-xl font-semibold hover:bg-[#15401f] transition-colors disabled:opacity-60 text-sm flex items-center justify-center gap-2"
                >
                  {acceptSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Accepting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" /> Confirm & Accept
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {counterTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setCounterTarget(null)}
          />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-[#1a4d2e] px-8 py-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Counter-Propose
                </h2>
                <p className="text-green-200 text-sm mt-0.5">
                  {(counterTarget.order as any)?.crop_name ?? "Order"}
                </p>
              </div>
              <button
                onClick={() => setCounterTarget(null)}
                className="text-white/70 hover:text-white transition-colors rounded-full p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mx-8 mt-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-xs text-gray-500 mb-0.5 text-center">
                Farmer's Proposal
              </p>
              <p className="font-bold text-[#1a4d2e] text-sm text-center">
                ₹{counterTarget.proposed_cost.toLocaleString()} ·{" "}
                {counterTarget.proposed_duration_days} days
              </p>
            </div>

            <form
              onSubmit={submitCounter}
              className="px-8 py-6 space-y-5 text-black"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Proposed Cost (₹)
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    step="0.01"
                    value={counterCost}
                    onChange={(e) => setCounterCost(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Duration (days)
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={counterDays}
                    onChange={(e) => setCounterDays(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Message (optional)
                </label>
                <textarea
                  rows={3}
                  value={counterMsg}
                  onChange={(e) => setCounterMsg(e.target.value)}
                  placeholder="Explain your counter-proposal..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e] text-sm resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCounterTarget(null)}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-gray-600 font-semibold hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={counterSubmitting}
                  className="flex-1 px-4 py-3 bg-[#1a4d2e] text-white rounded-xl font-semibold hover:bg-[#15401f] transition-colors disabled:opacity-60 text-sm flex items-center justify-center gap-2"
                >
                  {counterSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    "Send Counter"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
