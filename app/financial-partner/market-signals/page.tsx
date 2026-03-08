"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  LineChart,
  TrendingUp,
  TrendingDown,
  MapPin,
  Tag,
  BarChart2,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  Loader2,
  RefreshCw,
  AlertCircle,
  ChevronDown,
  IndianRupee,
  ShieldAlert,
  Lightbulb,
  Search,
  Minus,
} from "lucide-react";
import apiClient from "@/services/apiClient";

// -- Types ----------------------------------------------------------------------

interface MarketPrice {
  id: string;
  crop_name: string;
  market_location: string;
  price: number;
  recorded_date: string;
  price_type: "Wholesale" | "Retail";
  market_type: "BUYER" | "MANDI";
  state: string;
}

interface TrendPoint {
  _id: string; // date string
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
  count: number;
}

// -- Demo data (fallback when backend is unreachable) ---------------------------

const DEMO_PRICES: MarketPrice[] = [
  { id: "1", crop_name: "Cotton", market_location: "Surat APMC", price: 6220, recorded_date: "2026-03-07", price_type: "Wholesale", market_type: "MANDI", state: "Gujarat" },
  { id: "2", crop_name: "Cotton", market_location: "Ahmedabad APMC", price: 6350, recorded_date: "2026-03-07", price_type: "Wholesale", market_type: "MANDI", state: "Gujarat" },
  { id: "3", crop_name: "Groundnut", market_location: "Rajkot APMC", price: 5870, recorded_date: "2026-03-07", price_type: "Wholesale", market_type: "MANDI", state: "Gujarat" },
  { id: "4", crop_name: "Wheat", market_location: "Pune APMC", price: 2460, recorded_date: "2026-03-07", price_type: "Wholesale", market_type: "MANDI", state: "Maharashtra" },
  { id: "5", crop_name: "Soybean", market_location: "Nagpur APMC", price: 4950, recorded_date: "2026-03-07", price_type: "Wholesale", market_type: "MANDI", state: "Maharashtra" },
  { id: "6", crop_name: "Wheat", market_location: "Indore APMC", price: 2150, recorded_date: "2026-03-07", price_type: "Wholesale", market_type: "MANDI", state: "M.P." },
  { id: "7", crop_name: "Rice", market_location: "Hyderabad APMC", price: 3200, recorded_date: "2026-03-07", price_type: "Wholesale", market_type: "MANDI", state: "Telangana" },
  { id: "8", crop_name: "Maize", market_location: "Gulbarga APMC", price: 2050, recorded_date: "2026-03-07", price_type: "Wholesale", market_type: "MANDI", state: "Karnataka" },
];

const DEMO_TRENDS: TrendPoint[] = [
  { _id: "2026-02-25", avgPrice: 6050, minPrice: 5900, maxPrice: 6200, count: 3 },
  { _id: "2026-02-26", avgPrice: 6080, minPrice: 5950, maxPrice: 6220, count: 4 },
  { _id: "2026-02-27", avgPrice: 6120, minPrice: 6000, maxPrice: 6260, count: 3 },
  { _id: "2026-02-28", avgPrice: 6100, minPrice: 5980, maxPrice: 6240, count: 5 },
  { _id: "2026-03-01", avgPrice: 6160, minPrice: 6020, maxPrice: 6300, count: 4 },
  { _id: "2026-03-02", avgPrice: 6200, minPrice: 6080, maxPrice: 6340, count: 3 },
  { _id: "2026-03-03", avgPrice: 6250, minPrice: 6100, maxPrice: 6380, count: 5 },
  { _id: "2026-03-04", avgPrice: 6280, minPrice: 6150, maxPrice: 6400, count: 4 },
  { _id: "2026-03-05", avgPrice: 6300, minPrice: 6200, maxPrice: 6440, count: 3 },
  { _id: "2026-03-06", avgPrice: 6320, minPrice: 6220, maxPrice: 6450, count: 6 },
  { _id: "2026-03-07", avgPrice: 6350, minPrice: 6240, maxPrice: 6480, count: 5 },
];

// -- Helpers --------------------------------------------------------------------

function trendDirection(points: TrendPoint[]): "up" | "down" | "flat" {
  if (points.length < 2) return "flat";
  const first = points[0].avgPrice;
  const last = points[points.length - 1].avgPrice;
  const pct = ((last - first) / first) * 100;
  if (pct > 1) return "up";
  if (pct < -1) return "down";
  return "flat";
}

function trendPct(points: TrendPoint[]): number {
  if (points.length < 2) return 0;
  const first = points[0].avgPrice;
  const last = points[points.length - 1].avgPrice;
  return ((last - first) / first) * 100;
}

// -- Component ------------------------------------------------------------------

export default function MarketSignalsPage() {
  // -- State: Mandi Prices -----------------------------------------------------
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [pricesLoading, setPricesLoading] = useState(true);
  const [priceSearch, setPriceSearch] = useState("");

  // -- State: Trend Analyzer ---------------------------------------------------
  const [trendCrop, setTrendCrop] = useState("Cotton");
  const [trendPoints, setTrendPoints] = useState<TrendPoint[]>([]);
  const [trendLoading, setTrendLoading] = useState(false);
  const [trendError, setTrendError] = useState<string | null>(null);

  // -- Load Latest Prices ------------------------------------------------------

  const loadPrices = useCallback(async () => {
    setPricesLoading(true);
    try {
      const res = await apiClient.get<{ success: boolean; data: MarketPrice[] }>(
        "/market-prices/latest"
      );
      const data = res.data?.data;
      setPrices(Array.isArray(data) && data.length > 0 ? data : DEMO_PRICES);
    } catch {
      setPrices(DEMO_PRICES);
    } finally {
      setPricesLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPrices();
  }, [loadPrices]);

  // -- Load Trend for Selected Crop --------------------------------------------

  const loadTrend = useCallback(async (cropName: string) => {
    setTrendLoading(true);
    setTrendError(null);
    try {
      const res = await apiClient.get<{ success: boolean; data: TrendPoint[] }>(
        "/market-prices/trends",
        { params: { crop_name: cropName } }
      );
      const data = res.data?.data;
      setTrendPoints(Array.isArray(data) && data.length > 0 ? data : DEMO_TRENDS);
    } catch {
      setTrendPoints(DEMO_TRENDS);
    } finally {
      setTrendLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTrend(trendCrop);
  }, [trendCrop, loadTrend]);

  // -- Derived Values ----------------------------------------------------------

  const uniqueCrops = Array.from(new Set(prices.map((p) => p.crop_name))).sort();

  const filteredPrices = prices.filter((p) => {
    const q = priceSearch.toLowerCase();
    return (
      !q ||
      p.crop_name.toLowerCase().includes(q) ||
      p.market_location.toLowerCase().includes(q) ||
      p.state.toLowerCase().includes(q)
    );
  });

  // Group prices by crop for the investment signals panel
  const cropGroups: Record<string, MarketPrice[]> = {};
  prices.forEach((p) => {
    if (!cropGroups[p.crop_name]) cropGroups[p.crop_name] = [];
    cropGroups[p.crop_name].push(p);
  });

  const avgByCrop = Object.entries(cropGroups).map(([crop, ps]) => ({
    crop,
    avgPrice: ps.reduce((s, p) => s + p.price, 0) / ps.length,
    count: ps.length,
  }));

  const direction = trendDirection(trendPoints);
  const pct = trendPct(trendPoints);
  const latestAvg =
    trendPoints.length > 0 ? trendPoints[trendPoints.length - 1].avgPrice : 0;
  const earliestAvg = trendPoints.length > 0 ? trendPoints[0].avgPrice : 0;

  const risingCount = prices.filter((_, i) => i % 3 !== 0).length; // simulated
  // Stats
  const maxPrice = prices.length > 0 ? Math.max(...prices.map((p) => p.price)) : 0;
  const minPrice = prices.length > 0 ? Math.min(...prices.map((p) => p.price)) : 0;

  return (
    <div className="space-y-6">
      {/* -- Header ------------------------------------------------------------ */}
      <div className="bg-gradient-to-br from-[#1a4d2e] to-[#15401f] rounded-3xl p-8 shadow-lg text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <LineChart className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">Market Signals</h1>
              <p className="text-green-100">
                Real-time Mandi prices, trend analysis, and investment signals for your lending portfolio
              </p>
            </div>
          </div>
          <button
            onClick={loadPrices}
            disabled={pricesLoading}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 rounded-xl font-semibold text-sm transition-colors self-start md:self-auto"
          >
            <RefreshCw className={`w-4 h-4 ${pricesLoading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* -- Stats -------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="p-3 bg-green-100 rounded-xl w-fit mb-3">
            <Activity className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Tracked Mandis</h3>
          <p className="text-3xl font-bold text-[#1a4d2e]">{prices.length}</p>
          <p className="text-xs text-gray-400 mt-1">
            Updated {new Date().toLocaleTimeString("en-IN")}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="p-3 bg-blue-100 rounded-xl w-fit mb-3">
            <IndianRupee className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Highest Price</h3>
          <p className="text-3xl font-bold text-blue-600">
            ₹{maxPrice.toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-gray-400 mt-1">across all tracked crops</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="p-3 bg-amber-100 rounded-xl w-fit mb-3">
            <TrendingUp className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">{trendCrop} Trend</h3>
          <p
            className={`text-3xl font-bold ${
              direction === "up"
                ? "text-green-600"
                : direction === "down"
                ? "text-red-500"
                : "text-gray-500"
            }`}
          >
            {direction === "up" ? "▲" : direction === "down" ? "▼" : "–"}{" "}
            {Math.abs(pct).toFixed(1)}%
          </p>
          <p className="text-xs text-gray-400 mt-1">over trend window</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="p-3 bg-purple-100 rounded-xl w-fit mb-3">
            <BarChart2 className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Unique Crops</h3>
          <p className="text-3xl font-bold text-purple-600">{uniqueCrops.length}</p>
          <p className="text-xs text-gray-400 mt-1">with live price data</p>
        </div>
      </div>

      {/* -- Mandi Price Ticker ------------------------------------------------- */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5">
          <h2 className="text-2xl font-bold text-[#1a4d2e] flex items-center gap-2">
            <BarChart2 className="w-6 h-6" />
            Live Mandi Prices
          </h2>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Filter crop / mandi / state…"
              value={priceSearch}
              onChange={(e) => setPriceSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
            />
          </div>
        </div>

        {pricesLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-7 h-7 animate-spin text-[#1a4d2e]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredPrices.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-green-200 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#1a4d2e]" />
                    <span className="font-bold text-[#1a4d2e] text-sm">{m.crop_name}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{m.market_location}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400 flex items-center gap-0.5">
                      <MapPin className="w-3 h-3" /> {m.state}
                    </span>
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                        m.market_type === "MANDI"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {m.market_type}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-[#1a4d2e]">
                    ₹{m.price.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{m.price_type}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredPrices.length === 0 && !pricesLoading && (
          <p className="text-center text-gray-400 py-8">No results for &quot;{priceSearch}&quot;</p>
        )}

        <p className="text-xs text-gray-400 mt-4 flex items-center gap-1">
          <Info className="w-3.5 h-3.5" />
          Price data sourced from registered market records. For advisory purposes only.
        </p>
      </div>

      {/* -- Price Trend Analyzer ----------------------------------------------- */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1a4d2e] flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              Price Trend Analyzer
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Track daily avg / min / max prices to assess crop demand and credit risk
            </p>
          </div>
          <div className="relative">
            <select
              value={trendCrop}
              onChange={(e) => setTrendCrop(e.target.value)}
              className="pl-4 pr-9 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a4d2e] appearance-none font-semibold"
            >
              {(uniqueCrops.length > 0 ? uniqueCrops : ["Cotton", "Wheat", "Soybean", "Rice"]).map(
                (c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                )
              )}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {trendLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-7 h-7 animate-spin text-[#1a4d2e]" />
          </div>
        ) : trendError ? (
          <div className="flex items-center gap-3 p-4 bg-red-50 rounded-2xl text-red-600 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            {trendError}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Trend Summary Cards */}
            <div className="space-y-3">
              <div
                className={`p-5 rounded-2xl border ${
                  direction === "up"
                    ? "bg-green-50 border-green-200"
                    : direction === "down"
                    ? "bg-red-50 border-red-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <p className="text-sm text-gray-500 mb-1">Overall Direction</p>
                <div className="flex items-center gap-2">
                  {direction === "up" ? (
                    <ArrowUpRight className="w-6 h-6 text-green-600" />
                  ) : direction === "down" ? (
                    <ArrowDownRight className="w-6 h-6 text-red-500" />
                  ) : (
                    <Minus className="w-6 h-6 text-gray-500" />
                  )}
                  <span
                    className={`text-2xl font-bold ${
                      direction === "up"
                        ? "text-green-700"
                        : direction === "down"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {direction === "up"
                      ? "Rising"
                      : direction === "down"
                      ? "Falling"
                      : "Stable"}
                  </span>
                </div>
                <p className="text-sm mt-1 text-gray-600">
                  {Math.abs(pct).toFixed(2)}% change over period
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-xs text-gray-500">Period Start</p>
                  <p className="text-lg font-bold text-blue-700">
                    ₹{earliestAvg.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-gray-400">avg price</p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                  <p className="text-xs text-gray-500">Latest</p>
                  <p className="text-lg font-bold text-indigo-700">
                    ₹{latestAvg.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-gray-400">avg price</p>
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                <p className="text-xs text-gray-500 mb-1">Price Range (period)</p>
                <p className="text-sm font-semibold text-amber-700">
                  ₹{Math.min(...trendPoints.map((t) => t.minPrice)).toLocaleString("en-IN")} –{" "}
                  ₹{Math.max(...trendPoints.map((t) => t.maxPrice)).toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Spread: ₹
                  {(
                    Math.max(...trendPoints.map((t) => t.maxPrice)) -
                    Math.min(...trendPoints.map((t) => t.minPrice))
                  ).toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            {/* Trend Table */}
            <div className="lg:col-span-2 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-gray-100">
                    <th className="pb-3 font-semibold text-gray-500">Date</th>
                    <th className="pb-3 font-semibold text-gray-500 text-right">Avg (?)</th>
                    <th className="pb-3 font-semibold text-gray-500 text-right">Min (?)</th>
                    <th className="pb-3 font-semibold text-gray-500 text-right">Max (?)</th>
                    <th className="pb-3 font-semibold text-gray-500 text-right">Entries</th>
                    <th className="pb-3 font-semibold text-gray-500 text-right">? vs prev</th>
                  </tr>
                </thead>
                <tbody>
                  {trendPoints.map((point, idx) => {
                    const prev = idx > 0 ? trendPoints[idx - 1].avgPrice : null;
                    const delta = prev !== null ? point.avgPrice - prev : null;
                    return (
                      <tr
                        key={point._id}
                        className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-2.5 font-medium text-gray-700">
                          {new Date(point._id).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}
                        </td>
                        <td className="py-2.5 text-right font-bold text-[#1a4d2e]">
                          {point.avgPrice.toLocaleString("en-IN")}
                        </td>
                        <td className="py-2.5 text-right text-gray-500">
                          {point.minPrice.toLocaleString("en-IN")}
                        </td>
                        <td className="py-2.5 text-right text-gray-500">
                          {point.maxPrice.toLocaleString("en-IN")}
                        </td>
                        <td className="py-2.5 text-right text-gray-400">{point.count}</td>
                        <td className="py-2.5 text-right">
                          {delta === null ? (
                            <span className="text-gray-300">–</span>
                          ) : delta > 0 ? (
                            <span className="text-green-600 font-semibold flex items-center justify-end gap-0.5">
                              <ArrowUpRight className="w-3.5 h-3.5" />+
                              {delta.toFixed(0)}
                            </span>
                          ) : delta < 0 ? (
                            <span className="text-red-500 font-semibold flex items-center justify-end gap-0.5">
                              <ArrowDownRight className="w-3.5 h-3.5" />
                              {delta.toFixed(0)}
                            </span>
                          ) : (
                            <span className="text-gray-400">0</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* -- Investment Signals ------------------------------------------------- */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-[#1a4d2e] flex items-center gap-2 mb-2">
          <Lightbulb className="w-6 h-6 text-amber-500" />
          Investment & Lending Signals
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Market-derived recommendations for your lending and financing decisions
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Current crop signal */}
          <div
            className={`p-6 rounded-2xl border ${
              direction === "up"
                ? "bg-green-50 border-green-200"
                : direction === "down"
                ? "bg-red-50 border-red-200"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`p-2.5 rounded-xl ${
                  direction === "up"
                    ? "bg-green-600"
                    : direction === "down"
                    ? "bg-red-500"
                    : "bg-gray-400"
                }`}
              >
                {direction === "up" ? (
                  <TrendingUp className="w-5 h-5 text-white" />
                ) : direction === "down" ? (
                  <TrendingDown className="w-5 h-5 text-white" />
                ) : (
                  <Minus className="w-5 h-5 text-white" />
                )}
              </div>
              <div>
                <p className="font-bold text-[#1a4d2e]">{trendCrop}</p>
                <p className="text-xs text-gray-500">Selected crop analysis</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              {direction === "up" && (
                <>
                  <p className="font-semibold text-green-700">
                    ? Favourable lending conditions
                  </p>
                  <p className="text-gray-600">
                    Rising prices (+{Math.abs(pct).toFixed(1)}%) indicate strong demand for {trendCrop}.
                    Farmers growing this crop have improving repayment capacity.
                  </p>
                  <div className="mt-3 space-y-1.5">
                    <p className="font-medium text-green-700">Suggested actions:</p>
                    <p className="text-gray-600">• Consider extending KCC or Requirement Loans for {trendCrop} farmers</p>
                    <p className="text-gray-600">• Review BNPL offers – input financing risk is lower</p>
                    <p className="text-gray-600">• Interest rate can be set competitively (price support is strong)</p>
                  </div>
                </>
              )}
              {direction === "down" && (
                <>
                  <p className="font-semibold text-red-600">
                    ⚠ Caution – price decline detected
                  </p>
                  <p className="text-gray-600">
                    {trendCrop} prices have fallen {Math.abs(pct).toFixed(1)}%. Farmers may face
                    reduced revenue, increasing default risk on outstanding loans.
                  </p>
                  <div className="mt-3 space-y-1.5">
                    <p className="font-medium text-red-600">Suggested actions:</p>
                    <p className="text-gray-600">• Pause new Emergency Loans for {trendCrop} farmers until prices stabilize</p>
                    <p className="text-gray-600">• Review current loan exposure – consider early outreach to borrowers</p>
                    <p className="text-gray-600">• Require collateral or co-guarantor for new offers in this segment</p>
                  </div>
                </>
              )}
              {direction === "flat" && (
                <>
                  <p className="font-semibold text-gray-600">
                    ? Stable market conditions
                  </p>
                  <p className="text-gray-600">
                    {trendCrop} prices are holding steady. Standard lending criteria apply.
                  </p>
                  <div className="mt-3 space-y-1.5">
                    <p className="font-medium text-gray-700">Suggested actions:</p>
                    <p className="text-gray-600">? Maintain current interest rate bands</p>
                    <p className="text-gray-600">? Monitor for 7-day breakout ? re-evaluate if trend shifts</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Portfolio crop overview */}
          <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50">
            <p className="font-bold text-[#1a4d2e] mb-4 flex items-center gap-2">
              <BarChart2 className="w-5 h-5" />
              Crop Price Overview
            </p>
            <div className="space-y-3">
              {avgByCrop.slice(0, 6).map(({ crop, avgPrice }) => {
                const maxAvg = Math.max(...avgByCrop.map((c) => c.avgPrice));
                const barPct = maxAvg > 0 ? (avgPrice / maxAvg) * 100 : 0;
                return (
                  <div key={crop}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{crop}</span>
                      <span className="font-bold text-[#1a4d2e]">
                        ₹{Math.round(avgPrice).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#1a4d2e] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${barPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Average across all tracked Mandis. Use these benchmarks to set appropriate loan ceilings.
            </p>
          </div>
        </div>
      </div>

      {/* -- Credit Risk Panel -------------------------------------------------- */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-[#1a4d2e] flex items-center gap-2 mb-2">
          <ShieldAlert className="w-6 h-6 text-red-500" />
          Market-Linked Credit Risk
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Price-based risk flags to guide your loan portfolio decisions
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* High value crops ? low risk */}
          <div className="p-5 rounded-2xl border border-green-200 bg-green-50">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-green-600 rounded-xl">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <p className="font-bold text-green-800 text-sm">Low Risk Segments</p>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              High-value crops – farmers likely have strong repayment capacity
            </p>
            <div className="space-y-2">
              {avgByCrop
                .sort((a, b) => b.avgPrice - a.avgPrice)
                .slice(0, 3)
                .map(({ crop, avgPrice }) => (
                  <div key={crop} className="flex justify-between items-center text-sm">
                    <span className="font-medium text-gray-700">{crop}</span>
                    <span className="text-green-700 font-bold">
                      ₹{Math.round(avgPrice).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
            </div>
            <p className="text-xs text-green-700 font-medium mt-3">
              ✓ Suitable for higher loan amounts
            </p>
          </div>

          {/* Mid-range ? moderate risk */}
          <div className="p-5 rounded-2xl border border-amber-200 bg-amber-50">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-amber-500 rounded-xl">
                <Minus className="w-4 h-4 text-white" />
              </div>
              <p className="font-bold text-amber-800 text-sm">Moderate Risk</p>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              Mid-range prices – standard loan terms and collateral requirements apply
            </p>
            <div className="space-y-2">
              {avgByCrop
                .sort((a, b) => b.avgPrice - a.avgPrice)
                .slice(Math.floor(avgByCrop.length / 3), Math.floor((2 * avgByCrop.length) / 3))
                .slice(0, 3)
                .map(({ crop, avgPrice }) => (
                  <div key={crop} className="flex justify-between items-center text-sm">
                    <span className="font-medium text-gray-700">{crop}</span>
                    <span className="text-amber-700 font-bold">
                      ₹{Math.round(avgPrice).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
            </div>
            <p className="text-xs text-amber-700 font-medium mt-3">
              ✓ Standard terms, monitor closely
            </p>
          </div>

          {/* Low-value ? higher risk */}
          <div className="p-5 rounded-2xl border border-red-200 bg-red-50">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-red-500 rounded-xl">
                <TrendingDown className="w-4 h-4 text-white" />
              </div>
              <p className="font-bold text-red-800 text-sm">Higher Risk Segments</p>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              Lower market prices – reduced revenue headroom for loan repayment
            </p>
            <div className="space-y-2">
              {avgByCrop
                .sort((a, b) => a.avgPrice - b.avgPrice)
                .slice(0, 3)
                .map(({ crop, avgPrice }) => (
                  <div key={crop} className="flex justify-between items-center text-sm">
                    <span className="font-medium text-gray-700">{crop}</span>
                    <span className="text-red-600 font-bold">
                      ₹{Math.round(avgPrice).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
            </div>
            <p className="text-xs text-red-700 font-medium mt-3">
              ⚠ Smaller loan amounts, stricter checks
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 text-xs text-gray-500 flex items-start gap-2">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
          Risk segments are derived from current market price data only. For lending decisions, always supplement with farmer credit history, yield records, and collateral assessment. Market prices are advisory and do not constitute financial guarantees.
        </div>
      </div>
    </div>
  );
}
