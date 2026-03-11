"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useFarmerLang } from "../../contexts/FarmerLanguageContext";
import { getDisputes, createDispute } from "@/services/dispute/disputeApi";
import { getOrders } from "@/services/shipment/shipmentApi";
import { Dispute } from "@/types/dispute.types";
import { Order } from "@/types/shipment.types";
import StatusChip from "@/components/ui/StatusChip";
import { AlertCircle, Search, X, Loader2, Plus, Calendar, Package } from "lucide-react";

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function DisputesPage() {
  const { t } = useFarmerLang();

  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [disputesRes, ordersRes] = await Promise.all([
        getDisputes({ limit: 100 }),
        getOrders({ role: "farmer", limit: 100 }),
      ]);
      setDisputes(disputesRes.data || []);
      setOrders(ordersRes.data || []);
    } catch (err: any) {
      console.error("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreateDispute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderId || !description) return;
    setSubmitting(true);
    setError(null);
    try {
      await createDispute({
        order_id: selectedOrderId,
        description,
      });
      setIsModalOpen(false);
      setSelectedOrderId("");
      setDescription("");
      await fetchData();
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || "Failed to create dispute");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredDisputes = disputes.filter(
    (d) =>
      !searchTerm ||
      d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (d.order?.crop_name || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a4d2e]">Disputes</h1>
          <p className="text-gray-500 text-sm">Manage cases regarding orders and shipments</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#1a4d2e] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#15401f] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Raise Dispute
        </button>
      </div>

      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by ID, order, or description..."
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
      ) : filteredDisputes.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl">
          <AlertCircle className="w-10 h-10 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-400 text-sm">No disputes found.</p>
        </div>
      ) : (
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredDisputes.map((dispute) => (
            <a
              href={`/farmer/disputes/${dispute.id}`}
              key={dispute.id}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:border-[#1a4d2e] hover:shadow-md transition-all block"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-800 line-clamp-1">
                      {dispute.order?.crop_name || "Order Dispute"}
                    </p>
                    <p className="text-xs text-gray-400 font-mono">
                      #{dispute?.id ? String(dispute.id).slice(0, 8) : "N/A"}
                    </p>
                  </div>
                </div>
                <StatusChip status={dispute.status} />
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {dispute.description}
              </p>
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Package className="w-3.5 h-3.5" />
                  <span>Ord: {dispute?.order_id ? String(dispute.order_id).slice(0, 8) : "N/A"}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{fmt(dispute.created_at)}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => !submitting && setIsModalOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-[#1a4d2e] px-6 py-4 flex items-center justify-between shrink-0">
              <h2 className="text-xl font-bold text-white">Raise a New Dispute</h2>
              <button
                onClick={() => !submitting && setIsModalOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
                disabled={submitting}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDispute} className="p-6 overflow-y-auto">
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-200">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Select Order
                  </label>
                  <select
                    value={selectedOrderId}
                    onChange={(e) => setSelectedOrderId(e.target.value)}
                    required
                    disabled={submitting}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                  >
                    <option value="" disabled>
                      -- Select an Order --
                    </option>
                    {orders.map((order) => (
                      <option key={order.id} value={order.id}>
                        {order.crop_name || "Order"} (ID: {order?.id ? String(order.id).slice(0, 8) : "N/A"}) - {fmt(order.created_at)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Describe the Issue
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    disabled={submitting}
                    placeholder="Provide detailed information about the cause of the dispute..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || !selectedOrderId || !description}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#1a4d2e] text-white hover:bg-[#15401f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Submit Dispute
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
