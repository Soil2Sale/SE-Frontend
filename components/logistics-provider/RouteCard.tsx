"use client";

import { MapPin, Edit2, Check } from "lucide-react";
import { useState } from "react";
import { RouteData } from "./types";

interface RouteCardProps {
  data: RouteData;
}

const RISK_COLORS = {
  low: "bg-green-100 text-green-900 border-green-200",
  medium: "bg-yellow-100 text-yellow-900 border-yellow-200",
  high: "bg-red-100 text-red-900 border-red-200",
};

const RISK_BADGE_COLORS = {
  low: "bg-green-500",
  medium: "bg-yellow-500",
  high: "bg-red-500",
};

const STATUS_COLORS = {
  "on-time": "bg-green-50 border-green-200",
  delayed: "bg-red-50 border-red-200",
  early: "bg-blue-50 border-blue-200",
};

export function RouteCard({ data }: RouteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [route, setRoute] = useState(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRoute({
      ...route,
      [name]: isNaN(Number(value)) ? value : Number(value),
    });
  };

  return (
    <div className="col-span-3 bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow flex flex-col justify-between">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Best Route with Risk Radar</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isEditing ? (
            <Check className="w-6 h-6 text-green-500" />
          ) : (
            <Edit2 className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Distance (km)</label>
              <input
                type="number"
                name="distance"
                value={route.distance}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">ETA</label>
              <input
                type="text"
                name="eta"
                value={route.eta}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Risk Level</label>
              <select
                name="riskLevel"
                value={route.riskLevel}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Active Shipments</label>
              <input
                type="number"
                name="activeShipments"
                value={route.activeShipments}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
              />
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-sm mb-6">Optimized route with real-time shipment tracking</p>
      )}

      {/* Mock Map/Visualization Area */}
      <div className="grid grid-cols-2 gap-4 h-32 mb-4">
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center p-4">
          <div className="text-center">
            <p className="text-sm font-semibold text-blue-900">Route Distance</p>
            <p className="text-2xl font-bold text-blue-900">{route.distance} km</p>
          </div>
        </div>
        <div
          className={`${RISK_BADGE_COLORS[route.riskLevel]} rounded-lg flex items-center justify-center p-4`}
        >
          <div className="text-center text-white">
            <p className="text-sm font-semibold">Risk Level</p>
            <p className="text-2xl font-bold capitalize">{route.riskLevel}</p>
          </div>
        </div>
      </div>

      {/* Tracking Status */}
      <div className="flex gap-4 text-sm">
        <div className={`flex-1 p-3 rounded-lg border ${STATUS_COLORS[route.status]}`}>
          <p className="text-gray-900 font-semibold">
            {route.status === "on-time" && "✓ On Time"}
            {route.status === "delayed" && "⚠ Delayed"}
            {route.status === "early" && "⚡ Early"}
          </p>
          <p className="text-gray-600 text-xs">ETA: {route.eta}</p>
        </div>
        <div className="flex-1 bg-blue-50 p-3 rounded-lg border border-blue-200">
          <p className="text-blue-800 font-semibold">Tracking Active</p>
          <p className="text-blue-600 text-xs">{route.activeShipments} Shipments</p>
        </div>
      </div>
    </div>
  );
}
