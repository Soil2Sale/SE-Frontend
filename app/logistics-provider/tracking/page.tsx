"use client";

import { useState } from "react";
import StatusChip from "@/components/ui/StatusChip";
import { Shipment } from "@/types/shipment.types";
import { trackShipment } from "@/services/shipment/shipmentApi";
import {
  Search,
  Package,
  MapPin,
  Calendar,
  Truck,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function TrackingPage() {
  const [trackingCode, setTrackingCode] = useState("");
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async () => {
    if (!trackingCode.trim()) {
      setError("Please enter a tracking code");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await trackShipment(trackingCode.trim());
      setShipment(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Shipment not found with this tracking code",
      );
      setShipment(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTrack();
    }
  };

  const getStatusSteps = () => {
    if (!shipment) return [];

    const steps = [
      {
        label: "Created",
        completed: true,
        date: shipment.created_at,
        icon: <Package className="w-5 h-5" />,
      },
      {
        label: "Dispatched",
        completed: shipment.dispatched_at !== null,
        date: shipment.dispatched_at,
        icon: <Truck className="w-5 h-5" />,
      },
      {
        label: "In Transit",
        completed:
          shipment.status === "IN_TRANSIT" || shipment.status === "DELIVERED",
        date: null,
        icon: <MapPin className="w-5 h-5" />,
      },
      {
        label: "Delivered",
        completed: shipment.delivered_at !== null,
        date: shipment.delivered_at,
        icon: <CheckCircle className="w-5 h-5" />,
      },
    ];

    return steps;
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-3 light-theme-font">
            Track Shipment
          </h1>
          <p className="text-gray-400 text-lg">
            Enter tracking code to view shipment status
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#dcfce7] to-[#bbf7d0] rounded-2xl p-8 shadow-lg border border-[#4ade80]/50 mb-8">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#639376]" />
              <input
                type="text"
                placeholder="Enter tracking code..."
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full bg-white/40 backdrop-blur-md border border-[#2a2a3e] rounded-lg pl-12 pr-4 py-4 text-[#1a4d2e] placeholder-gray-500 focus:outline-none focus:border-[#4ade80] transition-colors text-lg"
              />
            </div>
            <button
              onClick={handleTrack}
              disabled={loading}
              className="bg-gradient-to-r from-[#1a4d2e] to-[#0d2818] text-white px-8 py-4 rounded-lg font-bold hover:shadow-lg hover:shadow-[#4ade80]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Tracking..." : "Track"}
            </button>
          </div>

          {error && (
            <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
        </div>

        {shipment && (
          <div className="space-y-6">
            {/* Shipment Info Card */}
            <div className="bg-gradient-to-br from-[#1a4d2e] to-[#0d2818] rounded-2xl p-6 border border-[#4ade80]/30 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {shipment.tracking_code}
                  </h2>
                  <StatusChip status={shipment.status} className="text-sm" />
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-[#4ade80] to-[#22c55e] rounded-xl flex items-center justify-center">
                  <Package className="w-8 h-8 text-[#0d2818]" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0a0a0f]/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>Origin</span>
                  </div>
                  <div className="text-white font-medium">
                    {shipment.origin_latitude.toFixed(4)},{" "}
                    {shipment.origin_longitude.toFixed(4)}
                  </div>
                </div>

                <div className="bg-[#0a0a0f]/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>Destination</span>
                  </div>
                  <div className="text-white font-medium">
                    {shipment.destination_latitude.toFixed(4)},{" "}
                    {shipment.destination_longitude.toFixed(4)}
                  </div>
                </div>

                <div className="bg-[#0a0a0f]/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>Created</span>
                  </div>
                  <div className="text-white font-medium">
                    {new Date(shipment.created_at).toLocaleString()}
                  </div>
                </div>

                <div className="bg-[#0a0a0f]/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                    <Package className="w-4 h-4" />
                    <span>Estimated Cost</span>
                  </div>
                  <div className="text-[#4ade80] font-bold text-xl">
                    ₹{shipment.estimated_cost.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-[#1a4d2e] mb-8">
                Shipment Timeline
              </h3>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                {/* Timeline steps */}
                <div className="space-y-8">
                  {getStatusSteps().map((step, index) => (
                    <div
                      key={index}
                      className="relative flex items-start gap-4"
                    >
                      {/* Icon */}
                      <div
                        className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-4 border-white ${
                          step.completed
                            ? "bg-[#4ade80] text-white"
                            : "bg-gray-200 text-gray-400"
                        }`}
                      >
                        {step.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-2">
                        <h4
                          className={`font-bold text-lg mb-1 ${
                            step.completed ? "text-[#1a4d2e]" : "text-gray-400"
                          }`}
                        >
                          {step.label}
                        </h4>
                        {step.date && (
                          <p className="text-sm text-gray-500">
                            {new Date(step.date).toLocaleString()}
                          </p>
                        )}
                        {!step.completed && step.label !== "Delivered" && (
                          <p className="text-sm text-gray-400 italic">
                            Pending
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {shipment.delivered_at && (
                <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <div>
                      <h4 className="font-bold text-green-800 text-lg">
                        Delivered Successfully
                      </h4>
                      <p className="text-green-600 text-sm">
                        {new Date(shipment.delivered_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {!shipment && !error && !loading && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-[#dcfce7] to-[#bbf7d0] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-[#1a4d2e]" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              Enter a Tracking Code
            </h3>
            <p className="text-gray-500">
              Type the tracking code in the search box above to view shipment
              details
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
