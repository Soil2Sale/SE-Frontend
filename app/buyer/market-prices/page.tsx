"use client";

import React from "react";
import { MapPin, Search, Filter, Tag, ShoppingCart } from "lucide-react";
import AnimatedList from "@/components/ui/AnimatedList";
import { getMarketPrices, MarketPrice } from "@/services/market/marketApi";



export default function MarketPricesPage() {
  const [prices, setPrices] = React.useState<MarketPrice[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedState, setSelectedState] = React.useState("all");

  const fetchPrices = async () => {
    try {
      const response = await getMarketPrices({
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const filteredPrices = prices.filter((price) => {
    const matchesSearch =
      searchTerm === "" ||
      price.crop_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      price.market_location.toLowerCase().includes(searchTerm.toLowerCase());
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
              placeholder="Search crops or markets..."
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
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Punjab">Punjab</option>
              <option value="Haryana">Haryana</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
            </select>
          </div>
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
              items={filteredPrices.map((p) => p.id || p._id)}
              onItemSelect={handleItemSelect}
              showGradients={false}
              displayScrollbar={true}
              className="w-full max-w-4xl"
              renderItem={(_, index) => {
                const price = filteredPrices[index];
                return (
                  <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#1a4d2e] hover:shadow-md transition-all">
                    {/* Crop name + price type badge */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#1a4d2e] mb-1">
                          {price.crop_name}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span>{price.market_location}, {price.state}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {/* Price Type badge */}
                        <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                          <Tag className="w-3 h-3" />
                          {price.price_type}
                        </span>
                        {/* Market Type badge */}
                        <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                          <ShoppingCart className="w-3 h-3" />
                          {price.market_type}
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="py-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Price</p>
                      <p className="text-3xl font-bold text-[#1a4d2e]">
                        {(price.price)}
                        {(price.price_type === "Wholesale") ? <span className="text-sm text-gray-500 ml-1 font-normal">/ quintal</span> : <span className="text-sm text-gray-500 ml-1 font-normal">/ kg</span>}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-400">
                        Recorded: {formatDate(price.recorded_date)}
                      </p>
                      <p className="text-xs text-gray-400">
                        Added: {formatDate(price.created_at)}
                      </p>
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
