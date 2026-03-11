"use client";

import React from "react";
import { MapPin, Search, Filter, Tag, ShoppingCart, X } from "lucide-react";
import AnimatedList from "@/components/ui/AnimatedList";
import { getMarketPrices, MarketPrice } from "@/services/market/marketApi";
import { useFarmerLang } from "@/app/contexts/FarmerLanguageContext";

export default function MarketPricesPage() {
  const { t } = useFarmerLang();
  const [prices, setPrices] = React.useState<MarketPrice[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedState, setSelectedState] = React.useState("all");
  const [selectedPrice, setSelectedPrice] = React.useState<MarketPrice | null>(
    null,
  );

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

  const handleItemSelect = (_item: string, index: number) => {
    setSelectedPrice(filteredPrices[index]);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1a4d2e] mb-2">
              {t.market_title}
            </h1>
            <p className="text-gray-600">{t.market_subtitle}</p>
          </div>
          <div className="text-sm text-gray-500">
            {t.market_lastUpdated} {new Date().toLocaleTimeString("en-IN")}
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
              placeholder={t.market_searchPlaceholder}
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
              <option value="all">{t.market_allStates}</option>
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
          {t.market_liveRates}
        </h2>

        {loading ? (
          <div className="text-center py-12 text-gray-500">
            {t.market_loading}
          </div>
        ) : filteredPrices.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">{t.market_empty}</p>
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
                  <div
                    className="px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100 hover:border-[#1a4d2e] hover:shadow-md transition-all cursor-pointer"
                    style={{ minHeight: 0 }}
                  >
                    {/* Row 1: name + price + badges */}
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-[#1a4d2e] truncate flex-1">
                        {price.crop_name}
                      </h3>
                      <span className="text-sm font-bold text-[#1a4d2e] shrink-0">
                        {price.price}
                        <span className="text-[10px] text-gray-500 ml-0.5 font-normal">
                          {price.price_type === "Wholesale" ? "/q" : "/kg"}
                        </span>
                      </span>
                      <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-semibold shrink-0">
                        <Tag className="w-2.5 h-2.5" />
                        {price.price_type}
                      </span>
                      <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-semibold shrink-0">
                        <ShoppingCart className="w-2.5 h-2.5" />
                        {price.market_type}
                      </span>
                    </div>
                    {/* Row 2: location + dates */}
                    <div className="flex items-center justify-between mt-0.5">
                      <div className="flex items-center gap-1 text-[11px] text-gray-500">
                        <MapPin className="w-2.5 h-2.5 shrink-0" />
                        <span className="truncate">
                          {price.market_location}, {price.state}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-gray-400 shrink-0 ml-2">
                        <span>Rec: {formatDate(price.recorded_date)}</span>
                        <span>Add: {formatDate(price.created_at)}</span>
                      </div>
                    </div>
                  </div>
                );
              }}
            />
          </div>
        )}
      </div>
      {/* Detail Popup */}
      {selectedPrice && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPrice(null)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#1a4d2e] px-6 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {selectedPrice.crop_name}
                </h2>
                <div className="flex items-center gap-1 text-green-200 text-sm mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>
                    {selectedPrice.market_location}, {selectedPrice.state}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedPrice(null)}
                className="text-white/70 hover:text-white p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                  <Tag className="w-3.5 h-3.5" />
                  {selectedPrice.price_type}
                </span>
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold">
                  <ShoppingCart className="w-3.5 h-3.5" />
                  {selectedPrice.market_type}
                </span>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-xs text-gray-500 mb-1">Price</p>
                <p className="text-3xl font-bold text-[#1a4d2e]">
                  {selectedPrice.price}
                  <span className="text-sm text-gray-500 ml-1 font-normal">
                    {selectedPrice.price_type === "Wholesale"
                      ? "/ quintal"
                      : "/ kg"}
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-0.5">Recorded Date</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {formatDate(selectedPrice.recorded_date)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-0.5">Added Date</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {formatDate(selectedPrice.created_at)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
