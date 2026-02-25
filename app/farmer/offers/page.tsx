"use client";

import React from "react";
import {
  Package, TrendingUp, CheckCircle, XCircle, X, Sparkles,
  Loader2, MessageSquare, ChevronDown, ChevronUp, HandshakeIcon
} from "lucide-react";
import StatusChip from "@/components/ui/StatusChip";
import apiClient from "@/services/apiClient";
import axios from "axios";

interface Offer {
  id: string;
  crop_listing_id: string;
  offered_price: number;
  status: string;
  created_at: string;
  buyer_user_id?: string;
  crop_listing?: {
    crop_name?: string;
    quality_grade?: string;
    quantity?: number;
    expected_price?: number;
  };
}

interface NegotiationLog {
  id: string;
  proposed_price: number;
  message?: string;
  created_at: string;
  proposed_by?: string;
}

export default function FarmerOffersPage() {
  const [offers, setOffers] = React.useState<Offer[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [negotiationLogs, setNegotiationLogs] = React.useState<Record<string, NegotiationLog[]>>({});
  const [expandedLogs, setExpandedLogs] = React.useState<Record<string, boolean>>({});
  const [logsLoading, setLogsLoading] = React.useState<Record<string, boolean>>({});
  const [actionLoading, setActionLoading] = React.useState<string | null>(null);

  const [negotiateTarget, setNegotiateTarget] = React.useState<Offer | null>(null);
  const [proposedPrice, setProposedPrice] = React.useState("");
  const [negotiateMessage, setNegotiateMessage] = React.useState("");
  const [predictedPrice, setPredictedPrice] = React.useState<number | null>(null);
  const [predicting, setPredicting] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const fetchOffers = async () => {
    try {
      const res = await apiClient.get("/offers/seller");
      setOffers(res.data?.data || res.data || []);
    } catch {
      setOffers([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchOffers();
  }, []);

  const fetchNegotiationLog = async (offerId: string) => {
    if (negotiationLogs[offerId]) {
      setExpandedLogs((prev) => ({ ...prev, [offerId]: !prev[offerId] }));
      return;
    }
    setLogsLoading((prev) => ({ ...prev, [offerId]: true }));
    setExpandedLogs((prev) => ({ ...prev, [offerId]: true }));
    try {
      const res = await apiClient.get(`/negotiations/offer/${offerId}`);
      setNegotiationLogs((prev) => ({ ...prev, [offerId]: res.data?.data || res.data || [] }));
    } catch {
      setNegotiationLogs((prev) => ({ ...prev, [offerId]: [] }));
    } finally {
      setLogsLoading((prev) => ({ ...prev, [offerId]: false }));
    }
  };

  const handleStatusChange = async (offerId: string, status: "ACCEPTED" | "REJECTED") => {
    setActionLoading(offerId + "_" + status);
    try {
      await apiClient.patch(`/offers/${offerId}/status`, { status });
      fetchOffers();
    } catch {
    } finally {
      setActionLoading(null);
    }
  };

  const openNegotiateModal = async (offer: Offer) => {
    setNegotiateTarget(offer);
    setProposedPrice(String(offer.offered_price));
    setNegotiateMessage("");
    setPredictedPrice(null);
    setSubmitError(null);
    const cropName = offer.crop_listing?.crop_name;
    const grade = offer.crop_listing?.quality_grade;
    if (cropName && grade) {
      setPredicting(true);
      try {
        const res = await axios.post(`http://127.0.0.1:8000/predict/${cropName}`, {
          crop_name: cropName, quality_grade: grade,
          month: 2, dayofweek: 3, lag_1: 2400, lag_3: 2700,
          lag_7: 3800, rolling_mean_3: 2600, rolling_mean_7: 3100,
        });
        setPredictedPrice(res.data?.data?.predicted_price ?? res.data?.predicted_price ?? null);
      } catch {
        setPredictedPrice(null);
      } finally {
        setPredicting(false);
      }
    }
  };

  const closeModal = () => {
    setNegotiateTarget(null);
    setPredictedPrice(null);
    setSubmitError(null);
  };

  const handleNegotiateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!negotiateTarget) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      await apiClient.post("/negotiations", {
        offer_id: negotiateTarget.id,
        proposed_price: Number(proposedPrice),
        message: negotiateMessage,
      });
      closeModal();
      fetchOffers();
    } catch (err: unknown) {
      setSubmitError((err as { message?: string })?.message || "Failed to send negotiation.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  const formatTime = (d: string) =>
    new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  const pending = offers.filter((o) => o.status === "PENDING").length;
  const accepted = offers.filter((o) => o.status === "ACCEPTED").length;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-[#1a4d2e] mb-2">Incoming Offers</h1>
        <p className="text-gray-600">Review buyer offers on your crop listings and negotiate</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <Package className="w-6 h-6 text-[#1a4d2e]" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Total Offers</h3>
          <p className="text-3xl font-bold text-[#1a4d2e]">{offers.length}</p>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-100 rounded-xl">
              <HandshakeIcon className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Awaiting Review</h3>
          <p className="text-3xl font-bold text-[#1a4d2e]">{pending}</p>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Accepted</h3>
          <p className="text-3xl font-bold text-[#1a4d2e]">{accepted}</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-[#1a4d2e] mb-6">Offers on Your Listings</h2>
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading offers...</div>
        ) : offers.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No offers received yet</p>
          </div>
        ) : (
          <div className="space-y-4 max-w-4xl mx-auto">
            {offers.map((offer) => (
              <div key={offer.id} className="bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#1a4d2e] transition-all">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#1a4d2e] mb-1">
                        {offer.crop_listing?.crop_name ?? "Crop Listing"}
                      </h3>
                      <p className="text-sm text-gray-500">Received on {formatDate(offer.created_at)}</p>
                    </div>
                    <StatusChip status={offer.status} />
                  </div>

                  <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Buyer's Offer</p>
                      <p className="text-lg font-bold text-[#1a4d2e]">
                        {(offer.offered_price)}<span className="text-xs text-gray-400 font-normal">/kg</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Your Price</p>
                      <p className="text-lg font-bold text-gray-900">
                        {offer.crop_listing?.expected_price ? (offer.crop_listing.expected_price) : "—"}
                        <span className="text-xs text-gray-400 font-normal">/kg</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Quality</p>
                      <p className="text-lg font-bold text-gray-900">{offer.crop_listing?.quality_grade ?? "—"}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => fetchNegotiationLog(offer.id)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-100 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Negotiation Log
                      {expandedLogs[offer.id] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                    <div className="flex-1" />
                    <button
                      onClick={() => handleStatusChange(offer.id, "REJECTED")}
                      disabled={actionLoading === offer.id + "_REJECTED"}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors disabled:opacity-60"
                    >
                      {actionLoading === offer.id + "_REJECTED" ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
                      Reject
                    </button>
                    <button
                      onClick={() => openNegotiateModal(offer)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#1a4d2e] text-[#1a4d2e] text-sm font-semibold hover:bg-green-50 transition-colors"
                    >
                      <HandshakeIcon className="w-4 h-4" />
                      Negotiate
                    </button>
                    <button
                      onClick={() => handleStatusChange(offer.id, "ACCEPTED")}
                      disabled={actionLoading === offer.id + "_ACCEPTED"}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1a4d2e] text-white text-sm font-semibold hover:bg-[#15401f] transition-colors disabled:opacity-60"
                    >
                      {actionLoading === offer.id + "_ACCEPTED" ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                      Accept
                    </button>
                  </div>
                </div>

                {expandedLogs[offer.id] && (
                  <div className="border-t border-gray-200 px-6 py-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Negotiation History</h4>
                    {logsLoading[offer.id] ? (
                      <div className="flex items-center gap-2 text-sm text-gray-500 py-2">
                        <Loader2 className="w-4 h-4 animate-spin" /> Loading...
                      </div>
                    ) : !negotiationLogs[offer.id] || negotiationLogs[offer.id].length === 0 ? (
                      <p className="text-sm text-gray-400 py-2">No negotiation activity yet.</p>
                    ) : (
                      <div className="max-h-52 overflow-y-auto space-y-2 pr-1">
                        {negotiationLogs[offer.id].map((log) => (
                          <div key={log.id} className="flex gap-3 p-3 bg-white rounded-xl border border-gray-100">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-0.5">
                                <span className="text-xs font-semibold text-gray-600">{log.proposed_by ?? "Party"}</span>
                                <span className="text-xs text-gray-400">{formatDate(log.created_at)} · {formatTime(log.created_at)}</span>
                              </div>
                              <p className="text-sm font-bold text-[#1a4d2e]">{(log.proposed_price)}/kg</p>
                              {log.message && <p className="text-xs text-gray-500 mt-0.5">{log.message}</p>}
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
        )}
      </div>

      {negotiateTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-[#1a4d2e] px-8 py-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Negotiate</h2>
                <p className="text-green-200 text-sm mt-0.5">
                  {negotiateTarget.crop_listing?.crop_name ?? "Crop"} · {negotiateTarget.crop_listing?.quality_grade ?? ""}
                </p>
              </div>
              <button onClick={closeModal} className="text-white/70 hover:text-white transition-colors rounded-full p-1">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mx-8 mt-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Buyer's Offer</p>
                  <p className="font-bold text-[#1a4d2e] text-sm">{(negotiateTarget.offered_price)}/kg</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Your Asking Price</p>
                  <p className="font-bold text-gray-900 text-sm">
                    {negotiateTarget.crop_listing?.expected_price ? (negotiateTarget.crop_listing.expected_price) : "—"}/kg
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleNegotiateSubmit} className="px-8 py-6 space-y-5 text-black">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Proposed Price (₹/kg)</label>
                <input
                  type="number"
                  required
                  min={0}
                  step="0.01"
                  value={proposedPrice}
                  onChange={(e) => setProposedPrice(e.target.value)}
                  placeholder="e.g. 28.00"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e] focus:border-transparent text-sm"
                />
                {predicting && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin" /> Fetching AI price suggestion...
                  </div>
                )}
                {!predicting && predictedPrice !== null && (
                  <button
                    type="button"
                    onClick={() => setProposedPrice(String(predictedPrice))}
                    className="mt-2 w-full flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-[#1a4d2e] shrink-0" />
                    <span className="text-sm text-[#1a4d2e]">
                      AI Suggested Price:{" "}
                      <span className="font-bold">
                        ₹{Number(predictedPrice).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <span className="text-gray-500 font-normal ml-1 text-xs">— tap to apply</span>
                    </span>
                  </button>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message</label>
                <textarea
                  required
                  rows={3}
                  value={negotiateMessage}
                  onChange={(e) => setNegotiateMessage(e.target.value)}
                  placeholder="Explain your counter-offer..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e] focus:border-transparent text-sm resize-none"
                />
              </div>

              {submitError && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2.5 rounded-xl">{submitError}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-gray-600 font-semibold hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-3 bg-[#1a4d2e] text-white rounded-xl font-semibold hover:bg-[#15401f] transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
                >
                  {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : "Send Negotiation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
