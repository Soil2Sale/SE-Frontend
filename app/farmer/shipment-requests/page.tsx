"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import StatusChip from "@/components/ui/StatusChip";
import {
  ShipmentRequest,
  ShipmentRequestStatus,
  ShipmentRequestNegLog,
  LogisticsProviderSummary,
  Order,
  Vehicle,
} from "@/types/shipment.types";
import { getProfile } from "@/services/user/userApi";
import {
  getOrders,
  getShipmentRequests,
  createShipmentRequest,
  counterShipmentRequest,
  getShipmentRequestNegotiations,
  getAvailableLogisticsProviders,
  respondToShipmentRequest,
} from "@/services/shipment/shipmentApi";
import apiClient from "@/services/apiClient";
import { useFarmerLang } from "@/app/contexts/FarmerLanguageContext";
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
  MapPin,
  ArrowRight,
  Users,
  RefreshCcw,
} from "lucide-react";

type TabType = "orders" | "requests";

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function FarmerShipmentRequestsPage() {
  const { t } = useFarmerLang();
  const [tab, setTab] = useState<TabType>("orders");
  const [currentUserId, setCurrentUserId] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [requests, setRequests] = useState<ShipmentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

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

  const [arrangeOrder, setArrangeOrder] = useState<Order | null>(null);
  const [arrangeStep, setArrangeStep] = useState<1 | 2 | 3>(1);
  const [providers, setProviders] = useState<LogisticsProviderSummary[]>([]);
  const [providersLoading, setProvidersLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] =
    useState<LogisticsProviderSummary | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [proposedCost, setProposedCost] = useState("");
  const [proposedDays, setProposedDays] = useState("");
  const [originLat, setOriginLat] = useState("");
  const [originLng, setOriginLng] = useState("");
  const [destLat, setDestLat] = useState("");
  const [destLng, setDestLng] = useState("");
  const [arrangeSubmitting, setArrangeSubmitting] = useState(false);
  const [arrangeError, setArrangeError] = useState<string | null>(null);

  const [chatRequest, setChatRequest] = useState<ShipmentRequest | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [msgInput, setMsgInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    getProfile()
      .then((res) => {
        if (res?.data?.id) setCurrentUserId(res.data.id);
      })
      .catch(() => {});
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [ordRes, reqRes] = await Promise.all([
        getOrders({ role: "farmer", limit: 100 }),
        getShipmentRequests({ limit: 100 }),
      ]);
      const allOrders: Order[] = ordRes.data || [];
      const allReqs: ShipmentRequest[] = reqRes.data || [];
      const requestedOrderIds = new Set(allReqs.map((r) => r.order_id));
      setOrders(allOrders.filter((o) => !requestedOrderIds.has(o.id)));
      setRequests(allReqs);
    } catch {
      setOrders([]);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleLog = async (reqId: string) => {
    if (negotiationLogs[reqId] !== undefined) {
      setExpandedLogs((prev) => ({ ...prev, [reqId]: !prev[reqId] }));
      return;
    }
    setLogsLoading((prev) => ({ ...prev, [reqId]: true }));
    setExpandedLogs((prev) => ({ ...prev, [reqId]: true }));
    try {
      const res = await getShipmentRequestNegotiations(reqId);
      setNegotiationLogs((prev) => ({
        ...prev,
        [reqId]: res.data || [],
      }));
    } catch {
      setNegotiationLogs((prev) => ({ ...prev, [reqId]: [] }));
    } finally {
      setLogsLoading((prev) => ({ ...prev, [reqId]: false }));
    }
  };

  const handleAcceptTerms = async (req: ShipmentRequest) => {
    setActionLoading(req.id + "_accept");
    try {
      await respondToShipmentRequest(req.id, { action: "accept" });
      await fetchData();
    } finally {
      setActionLoading(null);
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
      await counterShipmentRequest(counterTarget.id, {
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
      await fetchData();
    } finally {
      setCounterSubmitting(false);
    }
  };

  const openArrange = async (order: Order) => {
    setArrangeOrder(order);
    setArrangeStep(1);
    setSelectedProvider(null);
    setSelectedVehicle(null);
    setProposedCost("");
    setProposedDays("");
    setOriginLat("");
    setOriginLng("");
    setDestLat("");
    setDestLng("");
    setArrangeError(null);
    setProvidersLoading(true);
    try {
      const res = await getAvailableLogisticsProviders();
      setProviders(res.data || []);
    } catch {
      setProviders([]);
    } finally {
      setProvidersLoading(false);
    }
  };

  const submitArrange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!arrangeOrder || !selectedProvider || !selectedVehicle) return;
    setArrangeSubmitting(true);
    setArrangeError(null);
    try {
      await createShipmentRequest({
        order_id: arrangeOrder.id,
        logistics_provider_id: selectedProvider.id,
        vehicle_id: selectedVehicle.id,
        origin_latitude: Number(originLat),
        origin_longitude: Number(originLng),
        destination_latitude: Number(destLat),
        destination_longitude: Number(destLng),
        proposed_cost: Number(proposedCost),
        proposed_duration_days: Number(proposedDays),
      });
      setArrangeOrder(null);
      await fetchData();
      setTab("requests");
    } catch (err: unknown) {
      setArrangeError(
        (err as { message?: string })?.message || "Failed to send request.",
      );
    } finally {
      setArrangeSubmitting(false);
    }
  };

  const openChat = async (req: ShipmentRequest) => {
    setChatRequest(req);
    setMessages([]);
    setChatLoading(true);
    const partnerId = req.logistics_provider_user_id;
    if (partnerId && currentUserId) {
      const convId = buildConversationId(currentUserId, partnerId);
      joinChat(convId);
    }
    try {
      if (partnerId) {
        const res = await apiClient.get(
          `/chats/messages/${partnerId}?page=1&limit=50`,
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
    if (!msgInput.trim() || !chatRequest) return;
    const partnerId = chatRequest.logistics_provider_user_id;
    if (partnerId) sendChatMessage(partnerId, msgInput.trim());
    setMsgInput("");
  };

  const getLastMover = (req: ShipmentRequest): string => {
    const logs = negotiationLogs[req.id];
    if (!logs || logs.length === 0) return "";
    return logs[logs.length - 1].proposed_by_role || "";
  };

  const filteredOrders = orders.filter(
    (o) =>
      !searchTerm ||
      (o.crop_name ?? "").toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const filteredRequests = requests.filter(
    (r) =>
      !searchTerm ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.provider?.company_name ?? "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  const currentList = tab === "orders" ? filteredOrders : filteredRequests;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a4d2e]">{t.ship_title}</h1>
          <p className="text-gray-500 text-sm">{t.ship_subtitle}</p>
        </div>
        {notifications.length > 0 && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-1.5 rounded-xl text-xs text-[#1a4d2e] font-medium">
            <Bell className="w-3.5 h-3.5" />
            {notifications[0]}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        {(["orders", "requests"] as TabType[]).map((tabKey) => (
          <button
            key={tabKey}
            onClick={() => setTab(tabKey)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              tab === tabKey
                ? "bg-[#1a4d2e] text-white shadow-sm"
                : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            {tabKey === "orders" ? (
              <span className="flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5" />
                {t.ship_ordersTab}
                {orders.length > 0 && (
                  <span className="bg-amber-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {orders.length}
                  </span>
                )}
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                {t.ship_requestsTab} ({requests.length})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        <div
          className={`transition-all duration-300 ${chatRequest ? "w-[55%]" : "w-full"}`}
        >
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={
                tab === "orders" ? t.ship_searchOrders : t.ship_searchProviders
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
          ) : currentList.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl">
              <Package className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">
                {tab === "orders" ? t.ship_noOrders : t.ship_noRequests}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {tab === "orders"
                ? filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white rounded-xl border border-gray-200 hover:border-[#1a4d2e] transition-all"
                    >
                      <div className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                            <Package className="w-4 h-4 text-amber-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-semibold text-sm text-[#1a4d2e] truncate">
                                {order.crop_name ?? "Order"}
                              </span>
                              <StatusChip status={order.status} />
                            </div>
                            <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-3 h-3" />₹
                                {order.final_price?.toLocaleString() ?? "—"}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {fmt(order.created_at)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100">
                          <button
                            onClick={() => openArrange(order)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a4d2e] text-white text-xs font-semibold hover:bg-[#15401f] transition-colors"
                          >
                            <Truck className="w-3 h-3" />
                            {t.ship_arrangeLogistics}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                : filteredRequests.map((req) => {
                    const isLastLogByProvider =
                      req.status === ShipmentRequestStatus.NEGOTIATING &&
                      (() => {
                        const logs = negotiationLogs[req.id];
                        if (!logs || logs.length === 0) return false;
                        const last = logs[logs.length - 1];
                        return (
                          last.proposed_by_role === "logistics_provider" ||
                          last.proposed_by_role === "LOGISTICS_PROVIDER"
                        );
                      })();

                    return (
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
                                  {req.provider?.company_name ?? "Provider"}
                                </span>
                                <StatusChip status={req.status} />
                              </div>
                              <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <DollarSign className="w-3 h-3" />₹
                                  {(
                                    req.agreed_cost ?? req.proposed_cost
                                  ).toLocaleString()}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {req.agreed_duration_days ??
                                    req.proposed_duration_days}{" "}
                                  days
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {fmt(req.created_at)}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-gray-100">
                            <button
                              onClick={() => toggleLog(req.id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-100 transition-colors"
                            >
                              <MessageSquare className="w-3 h-3" />
                              {t.ship_negLog}
                              {expandedLogs[req.id] ? (
                                <ChevronUp className="w-3 h-3" />
                              ) : (
                                <ChevronDown className="w-3 h-3" />
                              )}
                            </button>

                            {req.status === ShipmentRequestStatus.PENDING && (
                              <span className="ml-auto text-xs text-gray-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Waiting for provider...
                              </span>
                            )}

                            {req.status ===
                              ShipmentRequestStatus.NEGOTIATING && (
                              <>
                                {isLastLogByProvider ? (
                                  <>
                                    <div className="flex-1" />
                                    <button
                                      onClick={() => handleAcceptTerms(req)}
                                      disabled={
                                        actionLoading === req.id + "_accept"
                                      }
                                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#1a4d2e] text-white text-xs font-semibold hover:bg-[#15401f] disabled:opacity-50 transition-colors"
                                    >
                                      {actionLoading === req.id + "_accept" ? (
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                      ) : (
                                        <CheckCircle className="w-3 h-3" />
                                      )}
                                      {t.ship_acceptTerms}
                                    </button>
                                    <button
                                      onClick={() => openCounter(req)}
                                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#1a4d2e] text-[#1a4d2e] text-xs font-semibold hover:bg-green-50 transition-colors"
                                    >
                                      <RefreshCcw className="w-3 h-3" />
                                      {t.ship_counterOffer}
                                    </button>
                                  </>
                                ) : (
                                  <span className="ml-auto text-xs text-gray-400 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    Waiting for provider response...
                                  </span>
                                )}
                              </>
                            )}

                            {req.status === ShipmentRequestStatus.AGREED && (
                              <span className="ml-auto text-xs text-amber-600 font-semibold flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg">
                                <Clock className="w-3 h-3" />
                                Awaiting buyer confirmation
                              </span>
                            )}

                            {req.status ===
                              ShipmentRequestStatus.BUYER_CONFIRMED && (
                              <a
                                href={`/farmer/tracking`}
                                className="ml-auto flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                              >
                                View Shipment
                                <ChevronRight className="w-3 h-3" />
                              </a>
                            )}

                            {req.status === ShipmentRequestStatus.REJECTED && (
                              <button
                                onClick={() =>
                                  openArrange(
                                    orders.find(
                                      (o) => o.id === req.order_id,
                                    ) ?? {
                                      id: req.order_id,
                                      crop_name: "Order",
                                      farmer_user_id: "",
                                      buyer_user_id: "",
                                      status: "",
                                      offer_id: "",
                                      created_at: "",
                                      updated_at: "",
                                    },
                                  )
                                }
                                className="ml-auto flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-300 text-gray-600 text-xs font-semibold hover:bg-gray-50 transition-colors"
                              >
                                <RefreshCcw className="w-3 h-3" />
                                Try Another Provider
                              </button>
                            )}

                            <button
                              onClick={() => openChat(req)}
                              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-50 transition-colors"
                            >
                              <MessageSquare className="w-3 h-3" />
                              {t.ship_chat}
                            </button>
                          </div>
                        </div>

                        {expandedLogs[req.id] && (
                          <div className="border-t border-gray-100 px-4 py-3">
                            <h4 className="text-xs font-semibold text-gray-600 mb-2">
                              {t.ship_negLog}
                            </h4>
                            {logsLoading[req.id] ? (
                              <div className="flex items-center gap-2 text-xs text-gray-400 py-2">
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />{" "}
                                {t.loading}
                              </div>
                            ) : !negotiationLogs[req.id] ||
                              negotiationLogs[req.id].length === 0 ? (
                              <p className="text-xs text-gray-400 py-1">
                                {t.offers_noNeg}
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
                                          {fmt(log.created_at)}
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
                    );
                  })}
            </div>
          )}
        </div>

        <AnimatePresence>
          {chatRequest && (
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
                      {chatRequest.provider?.company_name ??
                        "Logistics Provider"}
                    </p>
                    <p className="text-xs text-gray-400">{chatRequest.id}</p>
                  </div>
                  <button
                    onClick={() => {
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
                  {t.ship_counterOffer}
                </h2>
                <p className="text-green-200 text-sm mt-0.5">
                  {counterTarget.provider?.company_name ?? "Provider"}
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
              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">
                    Provider's Proposal
                  </p>
                  <p className="font-bold text-[#1a4d2e] text-sm">
                    ₹{counterTarget.proposed_cost.toLocaleString()} ·{" "}
                    {counterTarget.proposed_duration_days} days
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={submitCounter}
              className="px-8 py-6 space-y-5 text-black"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {t.ship_proposedCost}
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
                    {t.ship_duration}
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
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  disabled={counterSubmitting}
                  className="flex-1 px-4 py-3 bg-[#1a4d2e] text-white rounded-xl font-semibold hover:bg-[#15401f] transition-colors disabled:opacity-60 text-sm flex items-center justify-center gap-2"
                >
                  {counterSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />{" "}
                      {t.ship_sendingCounter}
                    </>
                  ) : (
                    t.ship_submitCounter
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {arrangeOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setArrangeOrder(null)}
          />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="bg-[#1a4d2e] px-8 py-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Arrange Logistics
                </h2>
                <p className="text-green-200 text-sm mt-0.5">
                  {arrangeOrder.crop_name ?? "Order"} · Step {arrangeStep} of 3
                </p>
              </div>
              <button
                onClick={() => setArrangeOrder(null)}
                className="text-white/70 hover:text-white transition-colors rounded-full p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex gap-2 px-8 pt-5 pb-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`flex-1 h-1 rounded-full transition-colors ${
                    arrangeStep >= s ? "bg-[#1a4d2e]" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>

            {arrangeStep === 1 && (
              <div className="px-8 py-6 space-y-3">
                <p className="text-sm font-semibold text-gray-700">
                  Select a logistics provider
                </p>
                {providersLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-[#1a4d2e]" />
                  </div>
                ) : providers.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-6">
                    No available providers found.
                  </p>
                ) : (
                  <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                    {providers.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setSelectedProvider(p);
                          setSelectedVehicle(null);
                          setArrangeStep(2);
                        }}
                        className={`w-full text-left p-3 rounded-xl border transition-all ${
                          selectedProvider?.id === p.id
                            ? "border-[#1a4d2e] bg-green-50"
                            : "border-gray-200 hover:border-[#1a4d2e]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm text-[#1a4d2e]">
                            {p.company_name}
                          </span>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Truck className="w-3 h-3" />{" "}
                            {p.vehicles?.length ?? 0} vehicles
                          </span>
                        </div>
                        <div className="flex gap-2 mt-1 flex-wrap">
                          {p.vehicles?.slice(0, 3).map((v) => (
                            <span
                              key={v.id}
                              className="text-[10px] bg-gray-100 text-gray-500 rounded-md px-1.5 py-0.5"
                            >
                              {v.vehicle_type}
                            </span>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {arrangeStep === 2 && selectedProvider && (
              <div className="px-8 py-6 space-y-3">
                <p className="text-sm font-semibold text-gray-700">
                  Select a vehicle from{" "}
                  <span className="text-[#1a4d2e]">
                    {selectedProvider.company_name}
                  </span>
                </p>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedProvider.vehicles
                    ?.filter((v) => v.available)
                    .map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVehicle(v)}
                        className={`w-full text-left p-3 rounded-xl border transition-all ${
                          selectedVehicle?.id === v.id
                            ? "border-[#1a4d2e] bg-green-50"
                            : "border-gray-200 hover:border-[#1a4d2e]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm text-[#1a4d2e]">
                            {v.vehicle_type}
                          </span>
                          <span className="text-xs text-gray-500">
                            Capacity: {v.capacity}
                          </span>
                        </div>
                      </button>
                    ))}
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setArrangeStep(1)}
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 text-sm font-semibold hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setArrangeStep(3)}
                    disabled={!selectedVehicle}
                    className="flex-1 px-4 py-2.5 bg-[#1a4d2e] text-white rounded-xl text-sm font-semibold hover:bg-[#15401f] disabled:opacity-50 flex items-center justify-center gap-1"
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {arrangeStep === 3 && (
              <form
                onSubmit={submitArrange}
                className="px-8 py-6 space-y-4 text-black"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Origin Latitude
                    </label>
                    <input
                      type="number"
                      required
                      step="any"
                      value={originLat}
                      onChange={(e) => setOriginLat(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Origin Longitude
                    </label>
                    <input
                      type="number"
                      required
                      step="any"
                      value={originLng}
                      onChange={(e) => setOriginLng(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Destination Latitude
                    </label>
                    <input
                      type="number"
                      required
                      step="any"
                      value={destLat}
                      onChange={(e) => setDestLat(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Destination Longitude
                    </label>
                    <input
                      type="number"
                      required
                      step="any"
                      value={destLng}
                      onChange={(e) => setDestLng(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Proposed Cost (₹)
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      step="0.01"
                      value={proposedCost}
                      onChange={(e) => setProposedCost(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Duration (days)
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={proposedDays}
                      onChange={(e) => setProposedDays(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                    />
                  </div>
                </div>

                {arrangeError && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2.5 rounded-xl">
                    {arrangeError}
                  </p>
                )}

                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setArrangeStep(2)}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-gray-600 font-semibold hover:bg-gray-50 text-sm"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={arrangeSubmitting}
                    className="flex-1 px-4 py-3 bg-[#1a4d2e] text-white rounded-xl font-semibold hover:bg-[#15401f] disabled:opacity-60 text-sm flex items-center justify-center gap-2"
                  >
                    {arrangeSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />{" "}
                        {t.ship_sendingCounter}
                      </>
                    ) : (
                      t.ship_sendRequest
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
