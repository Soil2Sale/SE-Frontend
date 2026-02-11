"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import AnimatedList from "@/components/ui/AnimatedList";
import StatusChip from "@/components/ui/StatusChip";
import { Vehicle, StorageFacility, VehicleType } from "@/types/shipment.types";
import {
  getVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getStorageFacilities,
  createStorageFacility,
  updateStorageFacility,
  deleteStorageFacility,
} from "@/services/shipment/shipmentApi";
import { Truck, Warehouse, Plus, Edit, Trash2, X, Package } from "lucide-react";

type TabType = "vehicles" | "storage";

export default function FleetStoragePage() {
  const [activeTab, setActiveTab] = useState<TabType>("vehicles");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [facilities, setFacilities] = useState<StorageFacility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showFacilityModal, setShowFacilityModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [editingFacility, setEditingFacility] =
    useState<StorageFacility | null>(null);

  const [vehicleForm, setVehicleForm] = useState({
    vehicle_type: VehicleType.TRUCK,
    capacity: 0,
    available: true,
  });

  const [facilityForm, setFacilityForm] = useState({
    name: "",
    location_latitude: 0,
    location_longitude: 0,
    capacity: 0,
    pricing_per_unit: 0,
    availability: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [vehiclesRes, facilitiesRes] = await Promise.all([
        getVehicles(),
        getStorageFacilities(),
      ]);
      setVehicles(vehiclesRes.data);
      setFacilities(facilitiesRes.data);
    } catch (err) {
      setError("Failed to load data. Please try again later.");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateVehicle = async () => {
    try {
      await createVehicle(vehicleForm);
      await fetchData();
      setShowVehicleModal(false);
      resetVehicleForm();
    } catch (err) {
      console.error("Error creating vehicle:", err);
      alert("Failed to create vehicle");
    }
  };

  const handleUpdateVehicle = async () => {
    if (!editingVehicle) return;
    try {
      await updateVehicle(editingVehicle.id, vehicleForm);
      await fetchData();
      setShowVehicleModal(false);
      setEditingVehicle(null);
      resetVehicleForm();
    } catch (err) {
      console.error("Error updating vehicle:", err);
      alert("Failed to update vehicle");
    }
  };

  const handleDeleteVehicle = async (id: string) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;
    try {
      await deleteVehicle(id);
      await fetchData();
    } catch (err) {
      console.error("Error deleting vehicle:", err);
      alert("Failed to delete vehicle");
    }
  };

  const handleCreateFacility = async () => {
    try {
      await createStorageFacility(facilityForm);
      await fetchData();
      setShowFacilityModal(false);
      resetFacilityForm();
    } catch (err) {
      console.error("Error creating facility:", err);
      alert("Failed to create storage facility");
    }
  };

  const handleUpdateFacility = async () => {
    if (!editingFacility) return;
    try {
      await updateStorageFacility(editingFacility.id, facilityForm);
      await fetchData();
      setShowFacilityModal(false);
      setEditingFacility(null);
      resetFacilityForm();
    } catch (err) {
      console.error("Error updating facility:", err);
      alert("Failed to update storage facility");
    }
  };

  const handleDeleteFacility = async (id: string) => {
    if (!confirm("Are you sure you want to delete this storage facility?"))
      return;
    try {
      await deleteStorageFacility(id);
      await fetchData();
    } catch (err) {
      console.error("Error deleting facility:", err);
      alert("Failed to delete storage facility");
    }
  };

  const resetVehicleForm = () => {
    setVehicleForm({
      vehicle_type: VehicleType.TRUCK,
      capacity: 0,
      available: true,
    });
  };

  const resetFacilityForm = () => {
    setFacilityForm({
      name: "",
      location_latitude: 0,
      location_longitude: 0,
      capacity: 0,
      pricing_per_unit: 0,
      availability: true,
    });
  };

  const openVehicleModal = (vehicle?: Vehicle) => {
    if (vehicle) {
      setEditingVehicle(vehicle);
      setVehicleForm({
        vehicle_type: vehicle.vehicle_type,
        capacity: vehicle.capacity,
        available: vehicle.available,
      });
    } else {
      setEditingVehicle(null);
      resetVehicleForm();
    }
    setShowVehicleModal(true);
  };

  const openFacilityModal = (facility?: StorageFacility) => {
    if (facility) {
      setEditingFacility(facility);
      setFacilityForm({
        name: facility.name,
        location_latitude: facility.location_latitude,
        location_longitude: facility.location_longitude,
        capacity: facility.capacity,
        pricing_per_unit: facility.pricing_per_unit,
        availability: facility.availability,
      });
    } else {
      setEditingFacility(null);
      resetFacilityForm();
    }
    setShowFacilityModal(true);
  };

  const renderVehicleItem = (vehicleId: string) => {
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    if (!vehicle) return null;

    return (
      <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] rounded-xl border border-[#2a2a3e] hover:border-[#4ade80] transition-all duration-300">
        <div className="w-16 h-16 bg-gradient-to-br from-[#4ade80] to-[#22c55e] rounded-lg flex items-center justify-center flex-shrink-0">
          <Truck className="w-8 h-8 text-[#0d2818]" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-white mb-1">
            {vehicle.vehicle_type}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <StatusChip
              status={vehicle.available ? "Available" : "Unavailable"}
            />
            <span className="text-gray-400 text-sm">•</span>
            <span className="text-gray-300 text-sm font-medium">
              Capacity: {vehicle.capacity} kg
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => openVehicleModal(vehicle)}
            className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleDeleteVehicle(vehicle.id)}
            className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  const renderFacilityItem = (facilityId: string) => {
    const facility = facilities.find((f) => f.id === facilityId);
    if (!facility) return null;

    return (
      <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] rounded-xl border border-[#2a2a3e] hover:border-[#4ade80] transition-all duration-300">
        <div className="w-16 h-16 bg-gradient-to-br from-[#4ade80] to-[#22c55e] rounded-lg flex items-center justify-center flex-shrink-0">
          <Warehouse className="w-8 h-8 text-[#0d2818]" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-white mb-1">{facility.name}</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <StatusChip
              status={facility.availability ? "Available" : "Unavailable"}
            />
            <span className="text-gray-400 text-sm">•</span>
            <span className="text-gray-300 text-sm font-medium">
              {facility.capacity} units
            </span>
          </div>
          <div className="text-gray-400 text-xs mt-1">
            {facility.location_latitude.toFixed(4)},{" "}
            {facility.location_longitude.toFixed(4)}
          </div>
        </div>

        <div className="text-right flex-shrink-0 mr-4">
          <div className="text-xl font-bold text-[#4ade80]">
            ₹{facility.pricing_per_unit}
          </div>
          <div className="text-xs text-gray-400">per unit</div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => openFacilityModal(facility)}
            className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleDeleteFacility(facility.id)}
            className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-3 light-theme-font">
            Fleet & Storage
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your vehicles and storage facilities
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#4ade80] mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading data...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-400">{error}</p>
          </div>
        ) : (
          <>
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setActiveTab("vehicles")}
                className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all duration-300 ${
                  activeTab === "vehicles"
                    ? "bg-gradient-to-r from-[#1a4d2e] to-[#0d2818] text-white shadow-lg"
                    : "bg-white/10 text-gray-400 hover:bg-white/20"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Truck className="w-5 h-5" />
                  <span>Vehicles ({vehicles.length})</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab("storage")}
                className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all duration-300 ${
                  activeTab === "storage"
                    ? "bg-gradient-to-r from-[#1a4d2e] to-[#0d2818] text-white shadow-lg"
                    : "bg-white/10 text-gray-400 hover:bg-white/20"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Warehouse className="w-5 h-5" />
                  <span>Storage ({facilities.length})</span>
                </div>
              </button>
            </div>

            <div className="bg-gradient-to-br from-[#dcfce7] to-[#bbf7d0] rounded-2xl p-6 shadow-lg border border-[#4ade80]/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold light-theme-font flex items-center gap-2">
                  <Package className="w-6 h-6 text-[#4ade80]" />
                  {activeTab === "vehicles"
                    ? "My Vehicles"
                    : "My Storage Facilities"}
                </h2>
                <button
                  onClick={() =>
                    activeTab === "vehicles"
                      ? openVehicleModal()
                      : openFacilityModal()
                  }
                  className="flex items-center gap-2 bg-gradient-to-r from-[#1a4d2e] to-[#0d2818] text-white px-4 py-2 rounded-lg font-bold hover:shadow-lg transition-all duration-300"
                >
                  <Plus className="w-5 h-5" />
                  <span>
                    Add {activeTab === "vehicles" ? "Vehicle" : "Facility"}
                  </span>
                </button>
              </div>

              {activeTab === "vehicles" ? (
                vehicles.length > 0 ? (
                  <AnimatedList
                    items={vehicles.map((v) => v.id)}
                    onItemSelect={() => {}}
                    showGradients={true}
                    enableArrowNavigation={false}
                    displayScrollbar={true}
                    className="w-full"
                    itemClassName="!p-0 !bg-transparent"
                    renderItem={renderVehicleItem}
                  />
                ) : (
                  <div className="text-center py-12">
                    <Truck className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No vehicles found</p>
                  </div>
                )
              ) : facilities.length > 0 ? (
                <AnimatedList
                  items={facilities.map((f) => f.id)}
                  onItemSelect={() => {}}
                  showGradients={true}
                  enableArrowNavigation={false}
                  displayScrollbar={true}
                  className="w-full"
                  itemClassName="!p-0 !bg-transparent"
                  renderItem={renderFacilityItem}
                />
              ) : (
                <div className="text-center py-12">
                  <Warehouse className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No storage facilities found</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Vehicle Modal */}
      <AnimatePresence>
        {showVehicleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowVehicleModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#1a4d2e]">
                  {editingVehicle ? "Edit Vehicle" : "Add Vehicle"}
                </h3>
                <button
                  onClick={() => setShowVehicleModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Vehicle Type
                  </label>
                  <select
                    value={vehicleForm.vehicle_type}
                    onChange={(e) =>
                      setVehicleForm({
                        ...vehicleForm,
                        vehicle_type: e.target.value as VehicleType,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#4ade80]"
                  >
                    <option value={VehicleType.TRUCK}>Truck</option>
                    <option value={VehicleType.VAN}>Van</option>
                    <option value={VehicleType.BIKE}>Bike</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Capacity (kg)
                  </label>
                  <input
                    type="number"
                    value={vehicleForm.capacity}
                    onChange={(e) =>
                      setVehicleForm({
                        ...vehicleForm,
                        capacity: parseFloat(e.target.value),
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#4ade80]"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={vehicleForm.available}
                      onChange={(e) =>
                        setVehicleForm({
                          ...vehicleForm,
                          available: e.target.checked,
                        })
                      }
                      className="w-5 h-5 text-[#4ade80] border-gray-300 rounded focus:ring-[#4ade80]"
                    />
                    <span className="text-sm font-semibold text-gray-700">
                      Available
                    </span>
                  </label>
                </div>

                <button
                  onClick={
                    editingVehicle ? handleUpdateVehicle : handleCreateVehicle
                  }
                  className="w-full bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-[#0d2818] font-bold py-3 rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  {editingVehicle ? "Update Vehicle" : "Add Vehicle"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Facility Modal */}
      <AnimatePresence>
        {showFacilityModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowFacilityModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#1a4d2e]">
                  {editingFacility
                    ? "Edit Storage Facility"
                    : "Add Storage Facility"}
                </h3>
                <button
                  onClick={() => setShowFacilityModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Facility Name
                  </label>
                  <input
                    type="text"
                    value={facilityForm.name}
                    onChange={(e) =>
                      setFacilityForm({ ...facilityForm, name: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#4ade80]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={facilityForm.location_latitude}
                    onChange={(e) =>
                      setFacilityForm({
                        ...facilityForm,
                        location_latitude: parseFloat(e.target.value),
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#4ade80]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={facilityForm.location_longitude}
                    onChange={(e) =>
                      setFacilityForm({
                        ...facilityForm,
                        location_longitude: parseFloat(e.target.value),
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#4ade80]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Capacity (units)
                  </label>
                  <input
                    type="number"
                    value={facilityForm.capacity}
                    onChange={(e) =>
                      setFacilityForm({
                        ...facilityForm,
                        capacity: parseFloat(e.target.value),
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#4ade80]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pricing per Unit (₹)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={facilityForm.pricing_per_unit}
                    onChange={(e) =>
                      setFacilityForm({
                        ...facilityForm,
                        pricing_per_unit: parseFloat(e.target.value),
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#4ade80]"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={facilityForm.availability}
                      onChange={(e) =>
                        setFacilityForm({
                          ...facilityForm,
                          availability: e.target.checked,
                        })
                      }
                      className="w-5 h-5 text-[#4ade80] border-gray-300 rounded focus:ring-[#4ade80]"
                    />
                    <span className="text-sm font-semibold text-gray-700">
                      Available
                    </span>
                  </label>
                </div>

                <button
                  onClick={
                    editingFacility
                      ? handleUpdateFacility
                      : handleCreateFacility
                  }
                  className="w-full bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-[#0d2818] font-bold py-3 rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  {editingFacility ? "Update Facility" : "Add Facility"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
