"use client";

import { MapPin, Navigation, AlertCircle, Edit2, Check, Send } from "lucide-react";
import { useState } from "react";

interface IndiaRoute {
  id: string;
  origin: string;
  destination: string;
  distance: number;
  riskLevel: "low" | "medium" | "high";
  eta: string;
  driverMessage: string;
}

const MAJOR_CITIES_INDIA = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
];

const DISTANCE_MAP: { [key: string]: number } = {
  "Mumbai-Delhi": 1400,
  "Delhi-Bangalore": 2150,
  "Bangalore-Hyderabad": 570,
  "Mumbai-Bangalore": 980,
  "Chennai-Hyderabad": 630,
  "Pune-Mumbai": 150,
  "Kolkata-Delhi": 1500,
  "Ahmedabad-Mumbai": 530,
  "Jaipur-Delhi": 268,
  "Lucknow-Delhi": 510,
};

const getRiskLevel = (distance: number): "low" | "medium" | "high" => {
  if (distance < 500) return "low";
  if (distance < 1500) return "medium";
  return "high";
};

const getETA = (distance: number): string => {
  const hours = Math.ceil(distance / 80);
  const now = new Date();
  now.setHours(now.getHours() + hours);
  return now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
};

const getDriverMessage = (origin: string, destination: string, riskLevel: string) => {
  const baseMessages = {
    low: `Safe route from ${origin} to ${destination}. Maintain steady pace. No major hazards reported. Drive safely!`,
    medium: `Route from ${origin} to ${destination} has moderate traffic. Stay alert on highways. Check weather updates frequently.`,
    high: `Challenging route from ${origin} to ${destination}. High traffic expected. Plan rest stops. Priority: Safety over speed.`,
  };
  return baseMessages[riskLevel as keyof typeof baseMessages];
};

export function IndiaRouteCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [origin, setOrigin] = useState("Mumbai");
  const [destination, setDestination] = useState("Delhi");
  const [routes, setRoutes] = useState<IndiaRoute[]>([
    {
      id: "1",
      origin: "Mumbai",
      destination: "Delhi",
      distance: 1400,
      riskLevel: "medium",
      eta: "10:30 PM",
      driverMessage: "Route from Mumbai to Delhi has moderate traffic. Stay alert on highways. Check weather updates frequently.",
    },
  ]);

  const handleAddRoute = () => {
    const key = `${origin}-${destination}`;
    const reverseKey = `${destination}-${origin}`;
    let distance =
      DISTANCE_MAP[key] || DISTANCE_MAP[reverseKey] || Math.random() * 2000 + 500;

    const newRoute: IndiaRoute = {
      id: Date.now().toString(),
      origin,
      destination,
      distance,
      riskLevel: getRiskLevel(distance),
      eta: getETA(distance),
      driverMessage: getDriverMessage(origin, destination, getRiskLevel(distance)),
    };

    setRoutes([...routes, newRoute]);
  };

  const deleteRoute = (id: string) => {
    setRoutes(routes.filter((r) => r.id !== id));
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-green-600 bg-green-50 border-green-200";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "high":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "";
    }
  };

  return (
    <div className="col-span-3 bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Best Route Across India with Risk Radar
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Optimized routes with real-time risk assessment and driver guidance
          </p>
        </div>
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

      {/* Location Input Section */}
      {isEditing && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-4">Add New Route</p>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">
                Origin
              </label>
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-sm"
              >
                {MAJOR_CITIES_INDIA.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">
                Destination
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-sm"
              >
                {MAJOR_CITIES_INDIA.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleAddRoute}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
              >
                <Send className="w-4 h-4 inline mr-2" />
                Add Route
              </button>
            </div>
          </div>
        </div>
      )}

      {/* India Map Visualization */}
      <div className="mb-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-dashed border-blue-200 relative overflow-hidden">
        <div className="absolute top-4 right-4 text-4xl opacity-20">🇮🇳</div>

        <div className="text-center mb-6">
          <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-sm font-semibold text-gray-700">
            Routes Across India Network
          </p>
          <p className="text-xs text-gray-500">
            {routes.length} active route{routes.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Route List */}
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {routes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">No routes added yet. Create your first route above.</p>
            </div>
          ) : (
            routes.map((route) => (
              <div
                key={route.id}
                className={`p-4 rounded-lg border-2 ${getRiskColor(route.riskLevel)}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-5 h-5" />
                    <p className="font-semibold text-sm">
                      {route.origin} → {route.destination}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase`}>
                      {route.riskLevel} Risk
                    </span>
                    <button
                      onClick={() => deleteRoute(route.id)}
                      className="text-red-600 hover:text-red-800 font-semibold text-xs"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-600 opacity-75">Distance</p>
                    <p className="font-bold text-sm">{route.distance} km</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 opacity-75">ETA</p>
                    <p className="font-bold text-sm">{route.eta}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 opacity-75">Status</p>
                    <p className="font-bold text-sm text-green-600">✓ Ready</p>
                  </div>
                </div>

                {/* Driver Message */}
                <div className="p-3 bg-white/70 rounded border-l-4 border-gray-400">
                  <p className="text-xs font-semibold text-gray-700 mb-1">📍 Driver Message:</p>
                  <p className="text-xs text-gray-700 leading-relaxed">{route.driverMessage}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-xs text-gray-600 mb-1">Total Routes</p>
          <p className="text-2xl font-bold text-blue-600">{routes.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="text-xs text-gray-600 mb-1">Low Risk</p>
          <p className="text-2xl font-bold text-green-600">
            {routes.filter((r) => r.riskLevel === "low").length}
          </p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <p className="text-xs text-gray-600 mb-1">Medium Risk</p>
          <p className="text-2xl font-bold text-yellow-600">
            {routes.filter((r) => r.riskLevel === "medium").length}
          </p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <p className="text-xs text-gray-600 mb-1">High Risk</p>
          <p className="text-2xl font-bold text-red-600">
            {routes.filter((r) => r.riskLevel === "high").length}
          </p>
        </div>
      </div>
    </div>
  );
}
