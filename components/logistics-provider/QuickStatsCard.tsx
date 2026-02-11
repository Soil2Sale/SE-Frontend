"use client";

import { AlertCircle } from "lucide-react";
import { useState } from "react";

interface QuickStatsCardProps {
  shipments: number;
}

export function QuickStatsCard({ shipments: initialShipments }: QuickStatsCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [shipments, setShipments] = useState(initialShipments);

  return (
    <div
      className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl shadow-md p-6 flex items-center justify-center text-white hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => setIsEditing(!isEditing)}
    >
      <div className="text-center w-full">
        <p className="text-sm font-semibold mb-2">Quick Stats</p>

        {isEditing ? (
          <div className="space-y-2">
            <input
              type="number"
              value={shipments}
              onChange={(e) => setShipments(parseInt(e.target.value))}
              placeholder="Shipments"
              className="w-full px-2 py-1 border border-green-300 rounded text-gray-900 text-center"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(false);
              }}
              className="w-full bg-white text-green-600 py-1 rounded text-xs font-semibold hover:bg-gray-100"
            >
              Save
            </button>
          </div>
        ) : (
          <>
            <p className="text-3xl font-bold">{shipments}</p>
            <p className="text-xs mt-2 opacity-90">Active Shipments</p>
          </>
        )}
      </div>
    </div>
  );
}
