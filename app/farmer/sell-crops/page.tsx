"use client";

import React from "react";
import { Plus, Package, TrendingUp, Calendar, X, Sparkles, Loader2 } from "lucide-react";
import AnimatedList from "@/components/ui/AnimatedList";
import StatusChip from "@/components/ui/StatusChip";
import { getAllCropListings } from "@/services/crop-listing/cropApi";
import apiClient from "@/services/apiClient";
import axios from "axios";

interface CropListing {
  id: string;
  crop_name: string;
  quantity: number;
  expected_price: number;
  quality_grade: string;
  status: string;
  created_at: string;
  harvest_date?: string;
}

interface FormState {
  farmer_profile_id: string;
  crop_name: string;
  quality_grade: string;
  quantity: string;
  expected_price: string;
}

export default function SellCropsPage() {
  const [listings, setListings] = React.useState<CropListing[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showCreateModal, setShowCreateModal] = React.useState(false);

  const [form, setForm] = React.useState<FormState>({
    farmer_profile_id: "",
    crop_name: "",
    quality_grade: "",
    quantity: "",
    expected_price: "",
  });
  const [profileLoading, setProfileLoading] = React.useState(false);
  const [predictedPrice, setPredictedPrice] = React.useState<number | null>(null);
  const [predicting, setPredicting] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const fetchListings = async () => {
    try {
      const response = await getAllCropListings();
      setListings(response.data || []);
    } catch (error) {
      console.error("Failed to fetch listings", error);
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchListings();
  }, []);

  const openModal = async () => {
    setShowCreateModal(true);
    setForm({ farmer_profile_id: "", crop_name: "", quality_grade: "", quantity: "", expected_price: "" });
    setPredictedPrice(null);
    setSubmitError(null);
    setProfileLoading(true);
    try {
      const res = await apiClient.get("/farmer-profiles/user");
      const userId = res.data?.data?.id ?? res.data?.id ?? "";
      setForm((prev) => ({ ...prev, farmer_profile_id: String(userId) }));
    } catch {
      setForm((prev) => ({ ...prev, farmer_profile_id: "" }));
    } finally {
      setProfileLoading(false);
    }
  };

  const closeModal = () => {
    setShowCreateModal(false);
    setPredictedPrice(null);
    setSubmitError(null);
  };

  const fetchPrediction = async (crop_name: string, quality_grade: string) => {
    if (!crop_name || !quality_grade) return;
    setPredicting(true);
    try {
      const res = await axios.post(`http://127.0.0.1:8000/predict/${crop_name}`, { crop_name, quality_grade,
  "month": 2,
  "dayofweek": 3,
  "lag_1": 2400,
  "lag_3": 2700,
  "lag_7": 3800,
  "rolling_mean_3": 2600,
  "rolling_mean_7": 3100
       });
      const price = res.data?.data?.predicted_price ?? res.data?.predicted_price ?? null;
      setPredictedPrice(price);
    } catch {
      setPredictedPrice(null);
    } finally {
      setPredicting(false);
    }
  };

  const handleFieldChange = (field: keyof FormState, value: string) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "crop_name" || field === "quality_grade") {
        const crop = field === "crop_name" ? value : prev.crop_name;
        const grade = field === "quality_grade" ? value : prev.quality_grade;
        if (crop && grade) fetchPrediction(crop, grade);
        else setPredictedPrice(null);
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      await apiClient.post("/crop-listings", {
        farmer_profile_id: form.farmer_profile_id,
        crop_name: form.crop_name,
        quality_grade: form.quality_grade,
        quantity: Number(form.quantity),
        expected_price: Number(form.expected_price),
      });
      closeModal();
      fetchListings();
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || "Failed to create listing.";
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleItemSelect = (_item: string, index: number) => {
    console.log("Selected listing:", listings[index]);
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#1a4d2e] mb-2">Sell Your Crops</h1>
            <p className="text-gray-600">Create listings and manage your crop sales</p>
          </div>
          <button
            onClick={openModal}
            className="bg-[#1a4d2e] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#15401f] transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Listing
          </button>
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
          <h3 className="text-gray-600 text-sm font-medium mb-1">Active Listings</h3>
          <p className="text-3xl font-bold text-[#1a4d2e]">{listings.filter((l) => l.status === "ACTIVE").length}</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Total Value</h3>
          <p className="text-3xl font-bold text-[#1a4d2e]">
            {(listings.filter((l) => l.status === "ACTIVE").reduce((sum, l) => sum + l.quantity * l.expected_price, 0))}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-100 rounded-xl">
              <Calendar className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Sold This Month</h3>
          <p className="text-3xl font-bold text-[#1a4d2e]">
            {listings.filter((l) => l.status === "SOLD" && new Date(l.created_at).getMonth() === new Date().getMonth()).length}
          </p>
        </div>
      </div>

      {/* Listings */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-[#1a4d2e] mb-6">Your Crop Listings</h2>
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : listings.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No listings yet</p>
            <button
              onClick={openModal}
              className="bg-[#1a4d2e] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#15401f] transition-colors"
            >
              Create Your First Listing
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <AnimatedList
              items={listings.map((l) => l.id)}
              onItemSelect={handleItemSelect}
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
                      <StatusChip status={listing.status} />
                    </div>
                    <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Quantity</p>
                        <p className="text-lg font-bold text-gray-900">{listing.quantity} kg</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Price/kg</p>
                        <p className="text-lg font-bold text-gray-900">{(listing.expected_price)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Quality</p>
                        <p className="text-lg font-bold text-gray-900">{listing.quality_grade}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-600">
                        Total Value:{" "}
                        <span className="font-bold text-[#1a4d2e]">{(listing.quantity * listing.expected_price)}</span>
                      </div>
                      <button className="text-[#1a4d2e] font-semibold hover:underline">View Details →</button>
                    </div>
                  </div>
                );
              }}
            />
          </div>
        )}
      </div>

      {/* Create Listing Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
            {/* Modal Header */}
            <div className="bg-[#1a4d2e] px-8 py-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">New Crop Listing</h2>
                <p className="text-green-200 text-sm mt-0.5">Fill in the details to list your crop</p>
              </div>
              <button onClick={closeModal} className="text-white/70 hover:text-white transition-colors rounded-full p-1">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5 text-black">
              {/* Farmer Profile ID */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Farmer Profile ID</label>
                <div className="relative">
                  <input
                    type="text"
                    value={profileLoading ? "" : form.farmer_profile_id}
                    readOnly
                    placeholder={profileLoading ? "Fetching profile..." : "Auto-filled"}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 text-sm cursor-not-allowed"
                  />
                  {profileLoading && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" />
                  )}
                </div>
              </div>

              {/* Crop Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Crop Name</label>
                <input
                  type="text"
                  required
                  value={form.crop_name}
                  onChange={(e) => handleFieldChange("crop_name", e.target.value)}
                  placeholder="e.g. Onion, Tomato, Wheat"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e] focus:border-transparent text-sm"
                />
              </div>

              {/* Quality Grade */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Quality Grade</label>
                <select
                  required
                  value={form.quality_grade}
                  onChange={(e) => handleFieldChange("quality_grade", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e] focus:border-transparent text-sm bg-white appearance-none"
                >
                  <option value="">Select grade</option>
                  <option value="PREMIUM">Grade A — Premium</option>
                  <option value="STANDARD">Grade B — Standard</option>
                  <option value="ECONOMY">Grade C — Economy</option>
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Quantity (kg)</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={form.quantity}
                  onChange={(e) => handleFieldChange("quantity", e.target.value)}
                  placeholder="e.g. 500"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e] focus:border-transparent text-sm"
                />
              </div>

              {/* Expected Price + Prediction */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Expected Price (₹/kg)</label>
                <input
                  type="number"
                  required
                  min={0}
                  step="0.01"
                  value={form.expected_price}
                  onChange={(e) => handleFieldChange("expected_price", e.target.value)}
                  placeholder="e.g. 25.00"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e] focus:border-transparent text-sm"
                />

                {/* Prediction Suggestion */}
                {predicting && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Fetching AI price suggestion...
                  </div>
                )}
                {!predicting && predictedPrice !== null && (
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, expected_price: String(predictedPrice) }))}
                    className="mt-2 w-full flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group"
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

              {/* Error */}
              {submitError && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2.5 rounded-xl">{submitError}</p>
              )}

              {/* Actions */}
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
                  disabled={submitting || profileLoading}
                  className="flex-1 px-4 py-3 bg-[#1a4d2e] text-white rounded-xl font-semibold hover:bg-[#15401f] transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
                >
                  {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : "Create Listing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
