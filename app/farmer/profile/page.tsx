"use client";

import React, { useState, useRef, useEffect } from "react";
import { getProfile } from "@/services/user/userApi";
import { getFarmerAggregateByUserId } from "../../../services/farmer/farmerProfileApi";
import { FarmerAggregate } from "../../../types/farmerProfile.types";
import {
  Phone,
  Mail,
  Calendar,
  Award,
  User,
  MapPin,
  Sprout,
  Wallet,
  TrendingUp,
  Star,
  FileText,
  Settings,
} from "lucide-react";
import {
  LineChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useFarmerLang } from "@/app/contexts/FarmerLanguageContext";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/ui/MapPicker"), {
  ssr: false,
  loading: () => (
    <div className="h-56 rounded-2xl bg-gray-100 flex items-center justify-center">
      <p className="text-gray-400 text-sm">Loading map...</p>
    </div>
  ),
});

type SectionId =
  | "personal"
  | "farm"
  | "crops"
  | "financial"
  | "ratings"
  | "documents"
  | "settings";

export default function FarmerProfilePage() {
  const [activeSection, setActiveSection] = useState<SectionId>("personal");
  const [selectedYear, setSelectedYear] = useState(2026);
  const [profile, setProfile] = useState<FarmerAggregate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRefs = {
    personal: useRef<HTMLDivElement>(null),
    farm: useRef<HTMLDivElement>(null),
    crops: useRef<HTMLDivElement>(null),
    financial: useRef<HTMLDivElement>(null),
    ratings: useRef<HTMLDivElement>(null),
    documents: useRef<HTMLDivElement>(null),
    settings: useRef<HTMLDivElement>(null),
  };

  const { t } = useFarmerLang();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        // Get user profile to extract userId
        const profileResp = await getProfile();
        const user = profileResp?.data || null;
        let userId = user?.id;
        if (!userId) {
          setError("User not found.");
          setProfile(null);
          setLoading(false);
          return;
        }
        // Fetch aggregate profile
        const aggResp = await getFarmerAggregateByUserId(userId);
        if (!aggResp) {
          setError("No profile data found.");
          setProfile(null);
        } else {
          setProfile(aggResp);
        }
      } catch (err) {
        setError("Failed to fetch profile data.");
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Loading and error states
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        {t.profile_loading}
      </div>
    );
  }
  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        {error || "No profile data found."}
      </div>
    );
  }

  // Defensive null checks for all possibly-null attributes (must be inside render, after profile is available)
  const personal =
    profile && profile.personal_info
      ? profile.personal_info
      : {
          id: "-",
          name: "-",
          mobile_number: "-",
          recovery_email: "-",
          role: "-",
          aadhaar_verified: false,
          business_verified: false,
          telegram_chat_id: "-",
          is_telegram_linked: false,
          created_at: "-",
        };
  const farm =
    profile && profile.farm_details
      ? profile.farm_details
      : {
          id: "-",
          land_size: 0,
          location_latitude: 0,
          location_longitude: 0,
          manual_location_correction: false,
        };
  const crops = profile && profile.crops ? profile.crops : [];
  const yieldHistory =
    profile && profile.yield_history ? profile.yield_history : [];
  const wallet =
    profile && profile.wallet
      ? profile.wallet
      : { id: "-", balance: 0, total_credits: 0, total_debits: 0 };
  const bnplLoans = profile && profile.bnpl_loans ? profile.bnpl_loans : [];
  const ratings =
    profile && profile.ratings
      ? profile.ratings
      : { average_rating: 0, total_reviews: 0, recent_reviews: [] };
  const assets = profile && profile.assets ? profile.assets : [];
  const transactionSummary =
    profile && profile.transaction_summary
      ? profile.transaction_summary
      : {
          total_sales: 0,
          total_deductions: 0,
          net_earnings: 0,
          successful_transactions: 0,
        };

  // Calculate member duration
  let memberDuration = 0;
  if (personal.created_at && personal.created_at !== "-") {
    const memberSince = new Date(personal.created_at);
    memberDuration = Math.floor(
      (new Date().getTime() - memberSince.getTime()) /
        (1000 * 60 * 60 * 24 * 365),
    );
  }

  // Season → active month numbers mapping
  // Normalise key: lowercase + collapse spaces/underscores/hyphens to a single id
  const normaliseSeason = (s: string) =>
    s.toLowerCase().replace(/[\s_-]+/g, "");

  const seasonToMonths: Record<string, number[]> = {
    kharif: [6, 7, 8, 9, 10],
    rabi: [11, 12, 1, 2, 3],
    yearround: [6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5],
    zaid: [3, 4, 5, 6],
  };

  // Build a lookup indexed by BOTH uuid `id` and mongo `_id` so either format works
  const cropById: Record<string, { crop_name: string; seasonality: string }> =
    {};
  crops.forEach((c: any) => {
    const entry = { crop_name: c.crop_name, seasonality: c.seasonality || "" };
    if (c.id) cropById[c.id] = entry;
    if (c._id) cropById[c._id] = entry;
  });

  // Resolve a yield_history item to its crop info.
  // Priority: crop_name on the item itself → crop_id lookup → _id lookup
  const resolveCrop = (y: any): { crop_name: string; seasonality: string } => {
    if (y.crop_name && cropById[y.crop_name]) return cropById[y.crop_name];
    if (y.crop_name)
      return {
        crop_name: y.crop_name,
        seasonality:
          cropById[
            Object.keys(cropById).find(
              (k) => cropById[k].crop_name === y.crop_name,
            ) || ""
          ]?.seasonality || "",
      };
    if (y.crop_id && cropById[y.crop_id]) return cropById[y.crop_id];
    if (y._id && cropById[y._id]) return cropById[y._id];
    return { crop_name: "Unknown", seasonality: "" };
  };

  // Crops grown in the selected year
  const cropsInSelectedYear = yieldHistory
    .filter((y) => y.year === selectedYear)
    .map((y) => {
      const info = resolveCrop(y);
      return {
        crop_name: info.crop_name,
        yield_quantity: y.yield_quantity,
        seasonality: info.seasonality,
      };
    });

  // Transform raw yield_history → pivot format for Recharts LineChart
  const yieldHistoryPivot = (() => {
    const byYear: Record<number, Record<string, number | string>> = {};
    yieldHistory.forEach((y) => {
      const { year, yield_quantity } = y;
      if (!byYear[year]) byYear[year] = { year };
      const cropName = resolveCrop(y).crop_name;
      byYear[year][cropName] = yield_quantity;
    });
    return Object.values(byYear).sort((a: any, b: any) => a.year - b.year);
  })();

  // Months (Jun-May agricultural year)
  const months = [
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
  ];
  const monthNumbers = [6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5];

  // Season colors
  const seasonColors: Record<string, string> = {
    Kharif: "#1a4d2e",
    Rabi: "#4ade80",
    "Year-round": "#fbbf24",
  };

  const yieldHistoryData = yieldHistoryPivot;

  // Scroll to section
  const scrollToSection = (sectionId: SectionId) => {
    setActiveSection(sectionId);
    sectionRefs[sectionId].current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Defensive fallback for reviews and documents
  const recentReviews = ratings.recent_reviews ?? [];
  const uploadedDocuments: Array<{
    id: string;
    title: string;
    subtitle: string;
    date: string;
    icon: any;
  }> = [];

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f0fdf4] to-[#dcfce7] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6">
          {/* Sidebar - Fixed */}
          <div className="w-80 shrink-0">
            <div className="fixed w-80 bg-white rounded-3xl p-6 shadow-sm">
              {/* Profile Header */}
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-[#1a4d2e] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl text-white font-semibold">
                    {personal.name.charAt(0)}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[#1a4d2e] mb-1">
                  {personal.name}
                </h2>
                <p className="text-sm text-gray-500 mb-4">{personal.role}</p>
              </div>

              {/* Quick Stats Grid */}
              {/* <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="p-4 bg-gray-50 rounded-2xl text-center">
                  <span className="text-xs font-medium text-gray-500 block mb-1">
                    Crops
                  </span>
                  <p className="text-lg font-semibold text-[#1a4d2e]">
                    {crops.length}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl text-center">
                  <span className="text-xs font-medium text-gray-500 block mb-1">
                    Area
                  </span>
                  <p className="text-lg font-semibold text-[#1a4d2e]">
                    {farm.land_size}{" "}
                    <span className="text-xs font-normal">ac</span>
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl text-center">
                  <span className="text-xs font-medium text-gray-500 block mb-1">
                    Joined
                  </span>
                  <p className="text-lg font-semibold text-[#1a4d2e]">
                    {memberDuration}+{" "}
                    <span className="text-xs font-normal">yrs</span>
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl text-center">
                  <span className="text-xs font-medium text-gray-500 block mb-1">
                    Rating
                  </span>
                  <p className="text-lg font-semibold text-[#1a4d2e] flex items-center justify-center gap-1">
                    {ratings.average_rating}{" "}
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  </p>
                </div>
              </div> */}

              {/* Navigation */}
              <nav className="space-y-1">
                {[
                  {
                    id: "personal" as SectionId,
                    label: t.profile_personal,
                    icon: User,
                  },
                  {
                    id: "farm" as SectionId,
                    label: t.profile_farm,
                    icon: MapPin,
                  },
                  {
                    id: "crops" as SectionId,
                    label: t.profile_crops,
                    icon: Sprout,
                  },
                  {
                    id: "financial" as SectionId,
                    label: t.profile_financial,
                    icon: Wallet,
                  },
                  {
                    id: "ratings" as SectionId,
                    label: t.profile_ratings,
                    icon: Star,
                  },
                  // {
                  //   id: "documents" as SectionId,
                  //   label: "Documents",
                  //   icon: FileText,
                  // },
                  {
                    id: "settings" as SectionId,
                    label: t.profile_settings,
                    icon: Settings,
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${
                      activeSection === item.id
                        ? "bg-[#1a4d2e] text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* PERSONAL INFO */}
            <div
              ref={sectionRefs.personal}
              id="personal"
              className="bg-white rounded-3xl p-6 shadow-sm scroll-mt-4"
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#1a4d2e]">
                  {t.profile_personalInfo}
                </h3>
                <p className="text-sm text-gray-500">
                  Account and contact details
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8 border-b border-gray-100 pb-8">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                    User ID
                  </label>
                  <p className="text-sm font-medium text-gray-900">
                    {personal.id}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                    Full Name
                  </label>
                  <p className="text-sm font-semibold text-gray-900">
                    {personal.name}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                    Mobile Number
                  </label>
                  <p className="text-sm font-medium text-gray-900">
                    {personal.mobile_number}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                    Recovery Email
                  </label>
                  <p className="text-sm font-medium text-gray-900">
                    {personal.recovery_email}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                    Account Created
                  </label>
                  <p className="text-sm font-medium text-gray-900">
                    {personal.created_at !== "-"
                      ? new Date(personal.created_at).toLocaleDateString()
                      : "-"}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                    Role
                  </label>
                  <p className="text-sm font-semibold text-[#1a4d2e]">
                    {personal.role}
                  </p>
                </div>
              </div>
            </div>

            {/* FARM DETAILS */}
            <div
              ref={sectionRefs.farm}
              id="farm"
              className="bg-white rounded-3xl p-6 shadow-sm scroll-mt-4"
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#1a4d2e]">
                  {t.profile_farmDetails}
                </h3>
                <p className="text-sm text-gray-500">
                  Land and location information
                </p>
              </div>
              <div className="bg-[#1a4d2e] rounded-2xl p-6 mb-8 relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-[#4ade80] text-sm font-medium mb-1">
                    Total Land Size
                  </p>
                  <h2 className="text-4xl font-bold text-white max-w-xs">
                    {farm.land_size}{" "}
                    <span className="text-xl font-normal text-gray-300">
                      acres
                    </span>
                  </h2>
                </div>
                <Sprout className="absolute -bottom-4 -right-4 w-32 h-32 text-[#ffffff10]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                    Farm ID
                  </label>
                  <p className="text-sm font-semibold text-gray-900">
                    {farm.id}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                    Land Size
                  </label>
                  <p className="text-sm font-semibold text-gray-900">
                    {farm.land_size} acres
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                    Location
                  </label>
                  <div className="flex gap-4">
                    <div>
                      <span className="text-[10px] text-gray-400 block">
                        Latitude
                      </span>
                      <p className="text-sm font-semibold text-gray-900">
                        {farm.location_latitude}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block">
                        Longitude
                      </span>
                      <p className="text-sm font-semibold text-gray-900">
                        {farm.location_longitude}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                    Manual Correction
                  </label>
                  <p className="text-sm font-semibold text-gray-900">
                    {farm.manual_location_correction ? "Yes" : "No"}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <MapView
                  lat={farm.location_latitude || 21.1702}
                  lng={farm.location_longitude || 72.8311}
                  onChange={() => {}}
                />
              </div>
            </div>

            {/* CROPS & YIELD */}
            <div
              ref={sectionRefs.crops}
              id="crops"
              className="space-y-6 scroll-mt-4"
            >
              {/* Crops Section - Gantt Timeline */}
              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-[#1a4d2e]">
                      Crops Grown
                    </h3>
                    <p className="text-sm text-gray-500">
                      Timeline view across agricultural year
                    </p>
                  </div>
                  {/* Year Selector */}
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="px-4 py-2 border-2 border-[#1a4d2e] rounded-lg font-semibold text-[#1a4d2e] bg-white hover:bg-[#1a4d2e]/5 transition-colors cursor-pointer"
                  >
                    <option value={2024}>2024</option>
                    <option value={2025}>2025</option>
                    <option value={2026}>2026</option>
                  </select>
                </div>
                {/* Gantt Timeline */}
                <div className="overflow-x-auto">
                  <div className="min-w-200">
                    {/* Header Row - Months */}
                    <div className="grid grid-cols-[150px_repeat(12,1fr)] gap-1 mb-2">
                      <div className="font-bold text-sm text-gray-700 p-2">
                        Crop
                      </div>
                      {months.map((month, idx) => (
                        <div
                          key={idx}
                          className="text-center text-xs font-semibold text-gray-600 p-2 bg-gray-50 rounded"
                        >
                          {month}
                        </div>
                      ))}
                    </div>
                    {/* Crop Rows */}
                    {cropsInSelectedYear.length === 0 ? (
                      <div className="text-center text-gray-400 py-8">
                        No crops recorded for {selectedYear}.
                      </div>
                    ) : (
                      cropsInSelectedYear.map((crop, i) => {
                        const normKey = normaliseSeason(crop.seasonality);
                        const activeMonths =
                          seasonToMonths[normKey] || seasonToMonths["kharif"];
                        // Map normalised key back to a display colour
                        let color = "#1a4d2e";
                        if (normKey === "rabi") color = "#4ade80";
                        else if (normKey === "yearround") color = "#fbbf24";
                        else if (normKey === "zaid") color = "#fb923c";
                        return (
                          <div
                            key={`${crop.crop_name}-${i}`}
                            className="grid grid-cols-[150px_repeat(12,1fr)] gap-1 mb-2"
                          >
                            <div className="font-semibold text-sm text-[#1a4d2e] p-2 bg-gray-50 rounded flex flex-col justify-center">
                              <span>{crop.crop_name}</span>
                              {crop.yield_quantity > 0 && (
                                <span className="text-[10px] text-gray-400 font-normal">
                                  {crop.yield_quantity} qtl
                                </span>
                              )}
                            </div>
                            {monthNumbers.map((month, idx) => (
                              <div
                                key={idx}
                                className="h-10 rounded"
                                style={
                                  activeMonths.includes(month)
                                    ? { backgroundColor: color }
                                    : { border: "1px solid #e5e7eb" }
                                }
                              />
                            ))}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
                {/* Legend */}
                <div className="flex gap-6 mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: seasonColors["Kharif"] }}
                    ></div>
                    <span className="text-sm text-gray-600">
                      Kharif (Jun-Oct)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: seasonColors["Rabi"] }}
                    ></div>
                    <span className="text-sm text-gray-600">
                      Rabi (Nov-Mar)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: seasonColors["Year round"] }}
                    ></div>
                    <span className="text-sm text-gray-600">Year-round</span>
                  </div>
                </div>
              </div>

              {/* Yield History Section - Line Chart */}
              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-[#1a4d2e]">
                    Yield History
                  </h3>
                  <p className="text-sm text-gray-500">
                    Yield trends per crop over time
                  </p>
                </div>
                {/* Line Chart */}
                <div className="overflow-x-auto">
                  <div className="min-w-150 h-80 w-full">
                    {yieldHistoryData.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        No yield history data available.
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={yieldHistoryData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f0f0f0"
                          />
                          <XAxis
                            dataKey="year"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                              fill: "#000000",
                              fontSize: 12,
                              fontWeight: 500,
                            }}
                            dy={10}
                          />
                          <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{
                              fill: "#000000",
                              fontSize: 12,
                              fontWeight: 500,
                            }}
                            label={{
                              value: "Quintals",
                              angle: -90,
                              position: "insideLeft",
                              style: { fill: "#666", fontSize: 12 },
                            }}
                          />
                          <Tooltip />
                          <Legend
                            wrapperStyle={{ paddingTop: "20px" }}
                            formatter={(value) => (
                              <span className="text-sm text-gray-700">
                                {value}
                              </span>
                            )}
                          />
                          {/* Dynamically render lines for each crop in yieldHistory */}
                          {Array.from(
                            new Set(
                              yieldHistoryData.flatMap((y: any) =>
                                Object.keys(y).filter((k) => k !== "year"),
                              ),
                            ),
                          ).map((crop, idx) => (
                            <Line
                              key={crop}
                              type="monotone"
                              dataKey={crop}
                              stroke={
                                Object.values(seasonColors)[
                                  idx % Object.values(seasonColors).length
                                ]
                              }
                              strokeWidth={3}
                              dot={{ r: 4 }}
                              activeDot={{ r: 6 }}
                            />
                          ))}
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* FINANCIAL OVERVIEW */}
            <div
              ref={sectionRefs.financial}
              id="financial"
              className="space-y-6 scroll-mt-4"
            >
              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-[#1a4d2e]">
                    Financial Overview
                  </h3>
                  <p className="text-sm text-gray-500">
                    Wallet and transaction summary
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-6 bg-linear-to-br from-green-400 to-green-500 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-green-50 font-medium">
                        Wallet Balance
                      </p>
                      <Wallet className="w-5 h-5 text-white/80" />
                    </div>
                    <p className="text-3xl font-bold text-white">
                      {wallet.balance}
                    </p>
                  </div>
                  <div className="p-6 bg-linear-to-br from-[#1a4d2e] to-[#166534] rounded-xl shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-green-100 font-medium">
                        Total Sales
                      </p>
                      <TrendingUp className="w-5 h-5 text-white/80" />
                    </div>
                    <p className="text-3xl font-bold text-white">
                      {transactionSummary.total_sales}
                    </p>
                  </div>
                  <div className="p-6 bg-linear-to-br from-yellow-400 to-yellow-500 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-yellow-50 font-medium">
                        Net Earnings
                      </p>
                      <Award className="w-5 h-5 text-white/80" />
                    </div>
                    <p className="text-3xl font-bold text-white">
                      {transactionSummary.net_earnings}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RATINGS */}
            <div
              ref={sectionRefs.ratings}
              id="ratings"
              className="bg-white rounded-3xl p-6 shadow-sm scroll-mt-4"
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#1a4d2e]">
                  Ratings & Reviews
                </h3>
                <p className="text-sm text-gray-500">
                  {recentReviews.length} reviews received
                </p>
              </div>
              <div className="bg-[#fbbf24] rounded-2xl p-6 mb-8 flex items-center justify-between relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-white/90 text-sm font-medium mb-1">
                    Average Rating
                  </p>
                  <div className="flex items-end gap-2">
                    <h2 className="text-5xl font-bold text-white">
                      {ratings.average_rating}
                    </h2>
                    <div className="mb-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(ratings.average_rating) ? "fill-white text-white" : "text-white/40"}`}
                          />
                        ))}
                      </div>
                      <p className="text-white/80 text-xs mt-1">
                        out of {recentReviews.length} reviews
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative z-10 p-4 bg-white/20 rounded-full">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 transform translate-x-8"></div>
              </div>
              <div className="space-y-4">
                {recentReviews.length === 0 ? (
                  <div className="text-gray-400">No reviews available.</div>
                ) : (
                  recentReviews.map((review, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-[#1a4d2e]">
                            {review.reviewer_name || "-"}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {review.created_at
                              ? new Date(review.created_at).toLocaleDateString()
                              : "-"}
                          </p>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < review.rating ? "fill-[#fbbf24] text-[#fbbf24]" : "text-gray-200"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        "{review.comment || "-"}"
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* DOCUMENTS */}
            {/* You can implement documents/assets section here if needed, using uploadedDocuments or assets */}

            {/* SETTINGS */}
            <div
              ref={sectionRefs.settings}
              id="settings"
              className="bg-white rounded-3xl p-6 shadow-sm scroll-mt-4"
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#1a4d2e]">
                  Settings
                </h3>
                <p className="text-sm text-gray-500">Account preferences</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-700">Telegram Notifications</span>
                  <p className="text-sm text-gray-600">
                    {personal.is_telegram_linked ? "Enabled" : "Not connected"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
