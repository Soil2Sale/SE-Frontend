"use client";

import { BarChart3, Edit2, Check } from "lucide-react";
import { useState } from "react";
import { FinancialData } from "./types";

interface CostProfitCardProps {
  data: FinancialData;
}

export function CostProfitCard({ data }: CostProfitCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [financial, setFinancial] = useState(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFinancial({
      ...financial,
      [name]: parseInt(value),
    });
  };

  const calculateMargin = () => {
    const total = financial.profit + financial.cost;
    return total === 0 ? 0 : Math.round((financial.profit / total) * 100);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow flex flex-col justify-between">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Cost vs Profit</h2>
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
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Profit (₹)</label>
            <input
              type="number"
              name="profit"
              value={financial.profit}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Cost (₹)</label>
            <input
              type="number"
              name="cost"
              value={financial.cost}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
            />
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-sm mb-4">Current Period</p>
      )}

      {/* Simple Chart Visualization */}
      <div className="space-y-4 mb-6">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-700 font-semibold">Profit</span>
            <span className="text-green-600 font-bold">₹{financial.profit.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-300"
              style={{
                width: `${
                  financial.profit + financial.cost === 0
                    ? 0
                    : (financial.profit / (financial.profit + financial.cost)) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-700 font-semibold">Cost</span>
            <span className="text-red-600 font-bold">₹{financial.cost.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-red-500 h-3 rounded-full transition-all duration-300"
              style={{
                width: `${
                  financial.profit + financial.cost === 0
                    ? 0
                    : (financial.cost / (financial.profit + financial.cost)) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Margin */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-blue-800 text-sm font-semibold">Margin</p>
        <p className="text-blue-900 text-2xl font-bold mt-2">{calculateMargin()}%</p>
      </div>
    </div>
  );
}
