"use client";

import React from "react";
import { Package, TrendingUp, ShoppingBag, X, Sparkles, Loader2, Tag, HandshakeIcon } from "lucide-react";
import AnimatedList from "@/components/ui/AnimatedList";
import StatusChip from "@/components/ui/StatusChip";
import { getAllCropListings } from "@/services/crop-listing/cropApi";
import apiClient from "@/services/apiClient";
import axios from "axios";

interface FarmerProfile {
  id: string;
  name?: string;
  user_id?: string;
}

interface CropListing {
  id: string;
  crop_name: string;
  quantity: number;
  expected_price: number;
  quality_grade: string;
  status: string;
  created_at: string;
  farmer_profile_id: string | FarmerProfile;
}

export default function MarketplacePage() {
  const [listings, setListings] = React.useState<CropListing[]>([]);
  const [loading, setLoading] = React.useState(true);

  const [selectedListing, setSelectedListing] = React.useState<CropListing | null>(null);
  const [offeredPrice, setOfferedPrice] = React.useState("");
  const [predictedPrice, setPredictedPrice] = React.useState<number | null>(null);
  const [predicting, setPredicting] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const fetchListings = async () => {
    try {
      const response = await getAllCropListings();
      setListings((response.data || []) as CropListing[]);
    } catch {
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchListings();
  }, []);

  const openOfferModal = async (listing: CropListing) => {
    setSelectedListing(listing);
    setOfferedPrice("");
    setPredictedPrice(null);
    setSubmitError(null);
    setPredicting(true);
    try {
      const res = await axios.post(`http://127.0.0.1:8000/predict/${listing.crop_name}`, {
        crop_name: listing.crop_name,
        quality_grade: listing.quality_grade,
        month: 2,
        dayofweek: 3,
        lag_1: 2400,
        lag_3: 2700,
        lag_7: 3800,
        rolling_mean_3: 2600,
        rolling_mean_7: 3100,
      });
      const price = res.data?.data?.predicted_price ?? res.data?.predicted_price ?? null;
      setPredictedPrice(price);
    } catch {
      setPredictedPrice(null);
    } finally {
      setPredicting(false);
    }
  };

  const closeModal = () => {
    setSelectedListing(null);
    setPredictedPrice(null);
    setSubmitError(null);
  };

  const getFarmerUserId = (listing: CropListing): string => {
    const fp = listing.farmer_profile_id;
    if (typeof fp === "object" && fp !== null) {
      return fp.user_id ?? fp.id ?? "";
    }
    return fp ?? "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedListing) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      await apiClient.post("/offers", {
        crop_listing_id: selectedListing.id,
        offered_price: Number(offeredPrice),
        farmer_user_id: getFarmerUserId(selectedListing),
      });
      closeModal();
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || "Failed to submit offer.";
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  const activeListings = listings.filter((l) => l.status === "ACTIVE");
  const avgPrice =
    activeListings.length > 0
      ? activeListings.reduce((sum, l) => sum + l.expected_price, 0) / activeListings.length
      : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-[#1a4d2e] mb-2">Marketplace</h1>
          <p className="text-gray-600">Browse available crop listings and make offers directly to farmers</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <Package className="w-6 h-6 text-[#1a4d2e]" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Available Listings</h3>
          <p className="text-3xl font-bold text-[#1a4d2e]">{activeListings.length}</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Avg. Price / kg</h3>
          <p className="text-3xl font-bold text-[#1a4d2e]">{(avgPrice)}</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-100 rounded-xl">
              <ShoppingBag className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Total Quantity (kg)</h3>
          <p className="text-3xl font-bold text-[#1a4d2e]">
            {activeListings.reduce((sum, l) => sum + l.quantity, 0).toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {/* Listings */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-[#1a4d2e] mb-6">Available Crops</h2>
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading marketplace...</div>
        ) : listings.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No crop listings available right now</p>
          </div>
        ) : (
          <div className="flex justify-center">
            <AnimatedList
              items={listings.map((l) => l.id)}
              onItemSelect={() => {}}
              showGradients={false}
              displayScrollbar={true}
              className="w-full max-w-4xl"
              renderItem={(_, index) => {
                const listing = listings[index];
                return (
                  <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#1a4d2e] hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#1a4d2e] mb-1">{listing.crop_name}</h3>
                        <p className="text-sm text-gray-500">Listed on {formatDate(listing.created_at)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                          <Tag className="w-3 h-3" />
                          {listing.quality_grade}
                        </span>
                        <StatusChip status={listing.status} />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Quantity</p>
                        <p className="text-lg font-bold text-gray-900">{listing.quantity} kg</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Price / kg</p>
                        <p className="text-lg font-bold text-gray-900">{(listing.expected_price)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Total Value</p>
                        <p className="text-lg font-bold text-[#1a4d2e]">{(listing.quantity * listing.expected_price)}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200 flex justify-end">
                      <button
                        onClick={() => openOfferModal(listing)}
                        className="flex items-center gap-2 bg-[#1a4d2e] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#15401f] transition-colors text-sm"
                      >
                        <HandshakeIcon className="w-4 h-4" />
                        Make an Offer
                      </button>
                    </div>
                  </div>
                );
              }}
            />
          </div>
        )}
      </div>

      {/* Offer Modal */}
      {selectedListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Modal Header */}
            <div className="bg-[#1a4d2e] px-8 py-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Make an Offer</h2>
                <p className="text-green-200 text-sm mt-0.5">{selectedListing.crop_name} · {selectedListing.quality_grade}</p>
              </div>
              <button onClick={closeModal} className="text-white/70 hover:text-white transition-colors rounded-full p-1">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Listing Summary */}
            <div className="mx-8 mt-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Quantity</p>
                  <p className="font-bold text-gray-900 text-sm">{selectedListing.quantity} kg</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Asking Price</p>
                  <p className="font-bold text-[#1a4d2e] text-sm">{(selectedListing.expected_price)}<span className="text-gray-400 font-normal">/kg</span></p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Total Value</p>
                  <p className="font-bold text-gray-900 text-sm">{(selectedListing.quantity * selectedListing.expected_price)}</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5 text-black">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Offered Price (₹/kg)</label>
                <input
                  type="number"
                  required
                  min={0}
                  step="0.01"
                  value={offeredPrice}
                  onChange={(e) => setOfferedPrice(e.target.value)}
                  placeholder="e.g. 22.00"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e] focus:border-transparent text-sm"
                />

                {predicting && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Fetching AI price suggestion...
                  </div>
                )}
                {!predicting && predictedPrice !== null && (
                  <button
                    type="button"
                    onClick={() => setOfferedPrice(String(predictedPrice))}
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
                  {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : "Submit Offer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
