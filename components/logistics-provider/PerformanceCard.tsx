"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";

interface PerformanceCardProps {
  percentage: number;
  trend: "up" | "down";
  period: string;
}

export function PerformanceCard({
  percentage: initialPercentage,
  trend: initialTrend,
  period,
}: PerformanceCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [percentage, setPercentage] = useState(initialPercentage);
  const [trend, setTrend] = useState<"up" | "down">(initialTrend);

  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;
  const trendColor = trend === "up" ? "text-green-500" : "text-red-500";

  return (
    <div
      className="bg-white rounded-xl shadow-md p-6 flex items-center justify-center hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => setIsEditing(!isEditing)}
    >
      <div className="text-center w-full">
        <TrendIcon className={`w-8 h-8 ${trendColor} mx-auto mb-2`} />
        <p className="text-gray-600 text-sm">Performance</p>

        {isEditing ? (
          <div className="mt-3 space-y-2">
            <input
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(parseInt(e.target.value))}
              placeholder="Percentage"
              className="w-full px-2 py-1 border border-gray-300 rounded text-gray-900 text-center text-sm"
            />
            <select
              value={trend}
              onChange={(e) => setTrend(e.target.value as "up" | "down")}
              className="w-full px-2 py-1 border border-gray-300 rounded text-gray-900 text-sm"
            >
              <option value="up">Up</option>
              <option value="down">Down</option>
            </select>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(false);
              }}
              className="w-full bg-blue-500 text-white py-1 rounded text-xs font-semibold hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        ) : (
          <>
            <p className={`text-2xl font-bold ${trendColor} mt-2`}>
              {trend === "up" ? "+" : "-"}{percentage}%
            </p>
            <p className="text-xs text-gray-500 mt-2">{period}</p>
          </>
        )}
      </div>
    </div>
  );
}
