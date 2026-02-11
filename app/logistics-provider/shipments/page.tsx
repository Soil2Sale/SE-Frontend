"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import AnimatedList from "@/components/ui/AnimatedList";
import StatusChip from "@/components/ui/StatusChip";
import { Shipment, ShipmentStatus } from "@/types/shipment.types";
import {
  getShipments,
  updateShipmentStatus,
  confirmDelivery,
} from "@/services/shipment/shipmentApi";
import {
  Package,
  Truck,
  MapPin,
  DollarSign,
  Search,
  Filter,
  X,
  Calendar,
  CheckCircle,
} from "lucide-react";

type SortOption = "date_asc" | "date_desc" | "cost_asc" | "cost_desc" | "none";

export default function ShipmentsPage() {
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(
    null,
  );
  const [showDetails, setShowDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<ShipmentStatus | "ALL">(
    "ALL",
  );
  const [sortOption, setSortOption] = useState<SortOption>("date_desc");

  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      setLoading(true);
      const response = await getShipments({ limit: 100 });
      setShipments(response.data);
    } catch (err) {
      setError("Failed to load shipments. Please try again later.");
      console.error("Error fetching shipments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: ShipmentStatus) => {
    try {
      setUpdating(true);
      await updateShipmentStatus(id, { status: newStatus });
      await fetchShipments();
      if (selectedShipment?.id === id) {
        const updated = shipments.find((s) => s.id === id);
        if (updated) setSelectedShipment(updated);
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  const handleConfirmDelivery = async (id: string) => {
    try {
      setUpdating(true);
      await confirmDelivery(id);
      await fetchShipments();
      if (selectedShipment?.id === id) {
        const updated = shipments.find((s) => s.id === id);
        if (updated) setSelectedShipment(updated);
      }
    } catch (err) {
      console.error("Error confirming delivery:", err);
      alert("Failed to confirm delivery");
    } finally {
      setUpdating(false);
    }
  };

  const filteredAndSortedShipments = useMemo(() => {
    let filtered = shipments.filter((shipment) => {
      const matchesSearch =
        shipment.tracking_code
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        shipment.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "ALL" || shipment.status === filterStatus;

      return matchesSearch && matchesStatus;
    });

    if (sortOption !== "none") {
      filtered = [...filtered].sort((a, b) => {
        switch (sortOption) {
          case "date_asc":
            return (
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
            );
          case "date_desc":
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          case "cost_asc":
            return a.estimated_cost - b.estimated_cost;
          case "cost_desc":
            return b.estimated_cost - a.estimated_cost;
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [shipments, searchTerm, filterStatus, sortOption]);

  const handleShipmentSelect = (shipmentId: string) => {
    const shipment = filteredAndSortedShipments.find(
      (s) => s.id === shipmentId,
    );
    if (shipment) {
      if (selectedShipment?.id === shipmentId) {
        setShowDetails(false);
        setTimeout(() => setSelectedShipment(null), 300);
      } else {
        setSelectedShipment(shipment);
        setShowDetails(true);
      }
    }
  };

  const shipmentItems = filteredAndSortedShipments.map(
    (shipment) => shipment.id,
  );

  const renderShipmentItem = (shipmentId: string) => {
    const shipment = filteredAndSortedShipments.find(
      (s) => s.id === shipmentId,
    );
    if (!shipment) return null;

    const isSelected = selectedShipment?.id === shipmentId;

    return (
      <div
        className={`flex items-center gap-4 p-5 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] rounded-xl border transition-all duration-300 ${
          isSelected
            ? "border-[#4ade80] shadow-lg shadow-[#4ade80]/20"
            : "border-[#2a2a3e] hover:border-[#4ade80]"
        }`}
      >
        <div className="w-16 h-16 bg-gradient-to-br from-[#4ade80] to-[#22c55e] rounded-lg flex items-center justify-center flex-shrink-0">
          <Truck className="w-8 h-8 text-[#0d2818]" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-white mb-1">
            {shipment.tracking_code}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <StatusChip status={shipment.status} />
            <span className="text-gray-400 text-sm">•</span>
            <span className="text-gray-300 text-sm font-medium">
              {new Date(shipment.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="text-right flex-shrink-0">
          <div className="text-2xl font-bold text-[#4ade80]">
            ₹{shipment.estimated_cost.toLocaleString()}
          </div>
          <div className="text-xs text-gray-400">estimated</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-3 light-theme-font">
            Shipments
          </h1>
          <p className="text-gray-400 text-lg">
            Manage and track all your shipments
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#4ade80] mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading shipments...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-400">{error}</p>
          </div>
        ) : (
          <div className="flex gap-8">
            <div
              className={`transition-all duration-500 ease-in-out ${
                showDetails ? "w-[60%]" : "w-full"
              }`}
            >
              <div className="bg-gradient-to-br from-[#dcfce7] to-[#bbf7d0] rounded-2xl p-6 shadow-lg border border-[#4ade80]/50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold light-theme-font flex items-center gap-2">
                    <Package className="w-6 h-6 text-[#4ade80]" />
                    All Shipments
                  </h2>
                  <div className="text-sm text-gray-400">
                    {filteredAndSortedShipments.length}{" "}
                    {filteredAndSortedShipments.length === 1
                      ? "shipment"
                      : "shipments"}
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#639376]" />
                    <input
                      type="text"
                      placeholder="Search by tracking code or ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-white/40 backdrop-blur-md border border-[#2a2a3e] rounded-lg pl-10 pr-10 py-3 text-[#1a4d2e] placeholder-gray-500 focus:outline-none focus:border-[#4ade80] transition-colors"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={filterStatus}
                      onChange={(e) =>
                        setFilterStatus(
                          e.target.value as ShipmentStatus | "ALL",
                        )
                      }
                      className="bg-white/40 backdrop-blur-md border border-[#2a2a3e] rounded-lg px-4 py-3 text-[#1a4d2e] focus:outline-none focus:border-[#4ade80] transition-colors"
                    >
                      <option value="ALL">All Status</option>
                      <option value={ShipmentStatus.CREATED}>Created</option>
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

                    <select
                      value={sortOption}
                      onChange={(e) =>
                        setSortOption(e.target.value as SortOption)
                      }
                      className="bg-white/40 backdrop-blur-md border border-[#2a2a3e] rounded-lg px-4 py-3 text-[#1a4d2e] focus:outline-none focus:border-[#4ade80] transition-colors"
                    >
                      <option value="date_desc">Date: Newest First</option>
                      <option value="date_asc">Date: Oldest First</option>
                      <option value="cost_asc">Cost: Low to High</option>
                      <option value="cost_desc">Cost: High to Low</option>
                    </select>
                  </div>
                </div>

                {filteredAndSortedShipments.length > 0 ? (
                  <AnimatedList
                    items={shipmentItems}
                    onItemSelect={handleShipmentSelect}
                    showGradients={true}
                    enableArrowNavigation={true}
                    displayScrollbar={true}
                    className="w-full"
                    itemClassName="!p-0 !bg-transparent"
                    renderItem={renderShipmentItem}
                  />
                ) : (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No shipments found</p>
                  </div>
                )}
              </div>
            </div>

            <AnimatePresence>
              {showDetails && selectedShipment && (
                <motion.div
                  initial={{ opacity: 0, x: 50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-[40%] flex-shrink-0"
                >
                  <div className="bg-gradient-to-br from-[#1a4d2e] to-[#0d2818] rounded-2xl p-6 border border-[#4ade80]/30 sticky top-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-white">
                        Shipment Details
                      </h2>
                      <button
                        onClick={() => {
                          setShowDetails(false);
                          setTimeout(() => setSelectedShipment(null), 300);
                        }}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-[#0a0a0f]/50 rounded-xl p-4 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#4ade80] to-[#22c55e] rounded-lg flex items-center justify-center">
                            <Truck className="w-6 h-6 text-[#0d2818]" />
                          </div>
                          <h3 className="text-xl font-bold text-white">
                            {selectedShipment.tracking_code}
                          </h3>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-3 text-gray-300">
                            <Package className="w-5 h-5 text-[#4ade80]" />
                            <div>
                              <div className="text-xs text-gray-400">
                                Status
                              </div>
                              <StatusChip status={selectedShipment.status} />
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-gray-300">
                            <Calendar className="w-5 h-5 text-[#4ade80]" />
                            <div>
                              <div className="text-xs text-gray-400">
                                Created
                              </div>
                              <div className="font-semibold">
                                {new Date(
                                  selectedShipment.created_at,
                                ).toLocaleString()}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-gray-300">
                            <MapPin className="w-5 h-5 text-[#4ade80]" />
                            <div>
                              <div className="text-xs text-gray-400">Route</div>
                              <div className="font-semibold text-sm">
                                ({selectedShipment.origin_latitude.toFixed(4)},{" "}
                                {selectedShipment.origin_longitude.toFixed(4)})
                                <br />→ (
                                {selectedShipment.destination_latitude.toFixed(
                                  4,
                                )}
                                ,{" "}
                                {selectedShipment.destination_longitude.toFixed(
                                  4,
                                )}
                                )
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-gray-300">
                            <DollarSign className="w-5 h-5 text-[#4ade80]" />
                            <div>
                              <div className="text-xs text-gray-400">Cost</div>
                              <div className="font-semibold text-[#4ade80] text-xl">
                                ₹
                                {selectedShipment.estimated_cost.toLocaleString()}
                                {selectedShipment.actual_cost && (
                                  <span className="text-sm text-gray-400 ml-2">
                                    (Actual: ₹
                                    {selectedShipment.actual_cost.toLocaleString()}
                                    )
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {selectedShipment.dispatched_at && (
                            <div className="flex items-center gap-3 text-gray-300">
                              <Calendar className="w-5 h-5 text-[#4ade80]" />
                              <div>
                                <div className="text-xs text-gray-400">
                                  Dispatched
                                </div>
                                <div className="font-semibold">
                                  {new Date(
                                    selectedShipment.dispatched_at,
                                  ).toLocaleString()}
                                </div>
                              </div>
                            </div>
                          )}

                          {selectedShipment.delivered_at && (
                            <div className="flex items-center gap-3 text-gray-300">
                              <CheckCircle className="w-5 h-5 text-[#4ade80]" />
                              <div>
                                <div className="text-xs text-gray-400">
                                  Delivered
                                </div>
                                <div className="font-semibold">
                                  {new Date(
                                    selectedShipment.delivered_at,
                                  ).toLocaleString()}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {selectedShipment.status !== ShipmentStatus.DELIVERED &&
                        selectedShipment.status !==
                          ShipmentStatus.CANCELLED && (
                          <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-300">
                              Update Status
                            </label>
                            <select
                              value={selectedShipment.status}
                              onChange={(e) =>
                                handleStatusUpdate(
                                  selectedShipment.id,
                                  e.target.value as ShipmentStatus,
                                )
                              }
                              disabled={updating}
                              className="w-full bg-[#0a0a0f]/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4ade80] transition-colors disabled:opacity-50"
                            >
                              <option value={ShipmentStatus.CREATED}>
                                Created
                              </option>
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

                            {selectedShipment.status ===
                              ShipmentStatus.IN_TRANSIT && (
                              <button
                                onClick={() =>
                                  handleConfirmDelivery(selectedShipment.id)
                                }
                                disabled={updating}
                                className="w-full bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-[#0d2818] font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-[#4ade80]/50 transition-all duration-300 disabled:opacity-50"
                              >
                                {updating
                                  ? "Processing..."
                                  : "Confirm Delivery"}
                              </button>
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
