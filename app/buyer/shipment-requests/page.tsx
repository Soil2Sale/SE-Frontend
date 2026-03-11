"use client";

import { useState, useEffect, useCallback } from "react";
import StatusChip from "@/components/ui/StatusChip";
import { ShipmentRequest, ShipmentRequestStatus } from "@/types/shipment.types";
import {
  getShipmentRequests,
  buyerConfirmShipmentRequest,
  buyerRejectShipmentRequest,
} from "@/services/shipment/shipmentApi";
import {
  Package,
  Truck,
  Search,
  X,
  CheckCircle,
  XCircle,
  ChevronRight,
  Clock,
  DollarSign,
  Calendar,
  Loader2,
} from "lucide-react";

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BuyerShipmentRequestsPage() {
  const [requests, setRequests] = useState<ShipmentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getShipmentRequests({ limit: 100 });
      setRequests(res.data || []);
    } catch {
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleConfirm = async (id: string) => {
    setActionLoading(id + "_confirm");
    try {
      await buyerConfirmShipmentRequest(id);
      await fetchRequests();
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id: string) => {
    setActionLoading(id + "_reject");
    try {
      await buyerRejectShipmentRequest(id);
      await fetchRequests();
    } finally {
      setActionLoading(null);
    }
  };

  const agreed = requests.filter(
    (r) => r.status === ShipmentRequestStatus.AGREED,
  );
  const others = requests.filter(
    (r) => r.status !== ShipmentRequestStatus.AGREED,
  );

  const filteredAgreed = agreed.filter(
    (r) =>
      !searchTerm ||
      (r.provider?.company_name ?? "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );
  const filteredOthers = others.filter(
    (r) =>
      !searchTerm ||
      (r.provider?.company_name ?? "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <h1 className="text-2xl font-bold text-[#1a4d2e]">Shipment Requests</h1>
        <p className="text-gray-500 text-sm">
          Review and confirm logistics arrangements for your orders
        </p>
      </div>

      {agreed.length > 0 && (
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-xl text-sm text-amber-700 font-medium">
          <Clock className="w-4 h-4 shrink-0" />
          {agreed.length} logistics arrangement
          {agreed.length > 1 ? "s" : ""} awaiting your confirmation
        </div>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by provider name..."
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
      ) : requests.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl">
          <Package className="w-10 h-10 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-400 text-sm">No shipment requests yet</p>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredAgreed.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wide px-1">
                Awaiting Your Confirmation
              </h2>
              {filteredAgreed.map((req) => (
                <div
                  key={req.id}
                  className="bg-white rounded-xl border-2 border-amber-300 shadow-sm"
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                        <Truck className="w-5 h-5 text-amber-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-bold text-sm text-[#1a4d2e]">
                            {req.provider?.company_name ?? "Logistics Provider"}
                          </span>
                          <StatusChip status={req.status} />
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <DollarSign className="w-3 h-3 text-gray-400" />
                            <span className="font-semibold text-[#1a4d2e]">
                              ₹
                              {(
                                req.agreed_cost ?? req.proposed_cost
                              ).toLocaleString()}
                            </span>
                            <span className="text-gray-400">agreed cost</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span className="font-semibold text-[#1a4d2e]">
                              {req.agreed_duration_days ??
                                req.proposed_duration_days}{" "}
                              days
                            </span>
                            <span className="text-gray-400">duration</span>
                          </div>
                          {req.provider?.vehicles?.[0] && (
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Truck className="w-3 h-3 text-gray-400" />
                              {req.provider.vehicles[0].vehicle_type}
                            </div>
                          )}
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            {fmt(req.created_at)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4 pt-3 border-t border-amber-100">
                      <button
                        onClick={() => handleReject(req.id)}
                        disabled={!!actionLoading}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 disabled:opacity-50 transition-colors"
                      >
                        {actionLoading === req.id + "_reject" ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <XCircle className="w-4 h-4" />
                        )}
                        Request Changes
                      </button>
                      <button
                        onClick={() => handleConfirm(req.id)}
                        disabled={!!actionLoading}
                        className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#1a4d2e] text-white text-sm font-semibold hover:bg-[#15401f] disabled:opacity-50 transition-colors"
                      >
                        {actionLoading === req.id + "_confirm" ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )}
                        Confirm Logistics
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredOthers.length > 0 && (
            <div className="space-y-2">
              {filteredAgreed.length > 0 && (
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide px-1">
                  Other Requests
                </h2>
              )}
              {filteredOthers.map((req) => (
                <div
                  key={req.id}
                  className="bg-white rounded-xl border border-gray-200 hover:border-[#1a4d2e] transition-all"
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

                    {req.status === ShipmentRequestStatus.BUYER_CONFIRMED && (
                      <div className="mt-2 pt-2 border-t border-gray-100 flex justify-end">
                        <a
                          href={`/buyer/tracking`}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                        >
                          View Shipment
                          <ChevronRight className="w-3 h-3" />
                        </a>
                      </div>
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
}
