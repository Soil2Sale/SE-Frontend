"use client";

import React from "react";
import { TrendingUp, TrendingDown, Search, Filter } from "lucide-react";
import AnimatedList from "@/components/ui/AnimatedList";
import { getMarketPrices } from "@/services/market/marketApi";

interface MarketPrice {
  id: string;
  crop_name: string;
  current_price: number;
  previous_price: number;
  market_name: string;
  state: string;
  updated_at: string;
  unit: string;
}

export default function MarketPricesPage() {
  const [prices, setPrices] = React.useState<MarketPrice[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedState, setSelectedState] = React.useState("all");

  const fetchPrices = async () => {
    try {
      const response = await getMarketPrices({
        state: selectedState,
        search: searchTerm,
      });
      setPrices(response.data || []);
    } catch (error) {
      console.error("Failed to fetch market prices", error);
      setPrices([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchPrices();
  }, [selectedState, searchTerm]);

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
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(change).toFixed(2),
      isPositive: change > 0,
      isNeutral: change === 0,
    };
  };

  const filteredPrices = prices.filter((price) => {
    const matchesSearch =
      searchTerm === "" ||
      price.crop_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState =
      selectedState === "all" || price.state === selectedState;
    return matchesSearch && matchesState;
  });

  const handleItemSelect = (item: string, index: number) => {
    console.log("Selected price:", filteredPrices[index]);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1a4d2e] mb-2">
              Market Prices
            </h1>
            <p className="text-gray-600">
              Real-time crop prices from markets across India
            </p>
          </div>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleTimeString("en-IN")}
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search crops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e] focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="pl-12 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e] focus:border-transparent appearance-none bg-white min-w-[200px]"
            >
              <option value="all">All States</option>
              <option value="Punjab">Punjab</option>
              <option value="Haryana">Haryana</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
            </select>
          </div>
        </div>
      </div>

      {/* Price Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-6 shadow-sm text-white">
          <h3 className="text-sm font-medium mb-1 opacity-90">
            Markets Tracked
          </h3>
          <p className="text-4xl font-bold">{prices.length}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 shadow-sm text-white">
          <h3 className="text-sm font-medium mb-1 opacity-90">
            Avg. Price Change
          </h3>
          <p className="text-4xl font-bold">+2.5%</p>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-6 shadow-sm text-white">
          <h3 className="text-sm font-medium mb-1 opacity-90">Top Gainers</h3>
          <p className="text-4xl font-bold">
            {prices.filter((p) => p.current_price > p.previous_price).length}
          </p>
        </div>
      </div>

      {/* Prices List */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-[#1a4d2e] mb-6">
          Live Market Rates
        </h2>

        {loading ? (
          <div className="text-center py-12 text-gray-500">
            Loading market prices...
          </div>
        ) : filteredPrices.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No prices found</p>
          </div>
        ) : (
          <div className="flex justify-center">
            <AnimatedList
              items={filteredPrices.map((p) => p.id)}
              onItemSelect={handleItemSelect}
              showGradients={false}
              displayScrollbar={true}
              className="w-full max-w-4xl"
              renderItem={(_, index) => {
                const price = filteredPrices[index];
                const change = calculateChange(
                  price.current_price,
                  price.previous_price,
                );
                return (
                  <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#1a4d2e] hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#1a4d2e] mb-1">
                          {price.crop_name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {price.market_name}, {price.state}
                        </p>
                      </div>
                      <div
                        className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                          change.isPositive
                            ? "bg-green-100 text-green-700"
                            : change.isNeutral
                              ? "bg-gray-100 text-gray-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {!change.isNeutral &&
                          (change.isPositive ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          ))}
                        <span className="font-bold text-sm">
                          {change.isPositive ? "+" : ""}
                          {change.value}%
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 py-4 border-t border-gray-200">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          Current Price
                        </p>
                        <p className="text-2xl font-bold text-[#1a4d2e]">
                          {formatCurrency(price.current_price)}
                          <span className="text-sm text-gray-500 ml-1">
                            /{price.unit}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          Previous Price
                        </p>
                        <p className="text-2xl font-bold text-gray-600">
                          {formatCurrency(price.previous_price)}
                          <span className="text-sm text-gray-500 ml-1">
                            /{price.unit}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-400">
                        Updated {formatDate(price.updated_at)}
                      </p>
                      <button className="text-[#1a4d2e] font-semibold text-sm hover:underline">
                        View Trend →
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
