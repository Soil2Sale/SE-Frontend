"use client";

import React from "react";
import { Plus, Package, TrendingUp, Calendar } from "lucide-react";
import AnimatedList from "@/components/ui/AnimatedList";
import StatusChip from "@/components/ui/StatusChip";
import { getAllCropListings } from "@/services/crop-listing/cropApi";

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

export default function SellCropsPage() {
  const [listings, setListings] = React.useState<CropListing[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showCreateModal, setShowCreateModal] = React.useState(false);

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

  const handleItemSelect = (item: string, index: number) => {
    // Navigate to detail view or edit
    console.log("Selected listing:", listings[index]);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#1a4d2e] mb-2">
              Sell Your Crops
            </h1>
            <p className="text-gray-600">
              Create listings and manage your crop sales
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-[#1a4d2e] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#15401f] transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Listing
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <Package className="w-6 h-6 text-[#1a4d2e]" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">
            Active Listings
          </h3>
          <p className="text-3xl font-bold text-[#1a4d2e]">
            {listings.filter((l) => l.status === "ACTIVE").length}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">
            Total Value
          </h3>
          <p className="text-3xl font-bold text-[#1a4d2e]">
            {formatCurrency(
              listings
                .filter((l) => l.status === "ACTIVE")
                .reduce((sum, l) => sum + l.quantity * l.expected_price, 0),
            )}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-100 rounded-xl">
              <Calendar className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">
            Sold This Month
          </h3>
          <p className="text-3xl font-bold text-[#1a4d2e]">
            {
              listings.filter(
                (l) =>
                  l.status === "SOLD" &&
                  new Date(l.created_at).getMonth() === new Date().getMonth(),
              ).length
            }
          </p>
        </div>
      </div>

      {/* Listings Section */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-[#1a4d2e] mb-6">
          Your Crop Listings
        </h2>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : listings.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No listings yet</p>
            <button
              onClick={() => setShowCreateModal(true)}
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
                        <h3 className="text-xl font-bold text-[#1a4d2e] mb-1">
                          {listing.crop_name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Listed on {formatDate(listing.created_at)}
                        </p>
                      </div>
                      <StatusChip status={listing.status} />
                    </div>

                    <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Quantity</p>
                        <p className="text-lg font-bold text-gray-900">
                          {listing.quantity} kg
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Price/kg</p>
                        <p className="text-lg font-bold text-gray-900">
                          {formatCurrency(listing.expected_price)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Quality</p>
                        <p className="text-lg font-bold text-gray-900">
                          {listing.quality_grade}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-600">
                        Total Value:{" "}
                        <span className="font-bold text-[#1a4d2e]">
                          {formatCurrency(
                            listing.quantity * listing.expected_price,
                          )}
                        </span>
                      </div>
                      <button className="text-[#1a4d2e] font-semibold hover:underline">
                        View Details →
                      </button>
                    </div>
                  </div>
                );
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
