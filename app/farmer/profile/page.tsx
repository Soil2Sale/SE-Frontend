"use client";

import React, { useState, useRef } from "react";
import {
  User,
  MapPin,
  Sprout,
  TrendingUp,
  Wallet,
  CreditCard,
  Star,
  FileText,
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  Mail,
  Calendar,
  Award,
  BarChart3,
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

// Mock data - replace with actual API call
const mockFarmerProfile = {
  personal_info: {
    id: "USR001",
    name: "Kanha",
    mobile_number: "+91 98765 43210",
    recovery_email: "rajesh.kumar@example.com",
    role: "Farmer",
    aadhaar_verified: true,
    business_verified: false,
    telegram_chat_id: "123456789",
    is_telegram_linked: true,
    created_at: "2023-01-15T10:30:00Z",
  },
  farm_details: {
    id: "FP001",
    land_size: 5.5,
    location_latitude: 19.075984,
    location_longitude: 72.877656,
    manual_location_correction: false,
  },
  crops: [
    { id: "FC001", crop_name: "Cotton", seasonality: "Kharif (June-Oct)" },
    { id: "FC002", crop_name: "Wheat", seasonality: "Rabi (Nov-Mar)" },
    { id: "FC003", crop_name: "Rice", seasonality: "Kharif (June-Oct)" },
    { id: "FC004", crop_name: "Pulses", seasonality: "Rabi (Nov-Mar)" },
    { id: "FC005", crop_name: "Sugarcane", seasonality: "Year-round" },
  ],
  yield_history: [
    {
      id: "YH001",
      crop_name: "Cotton",
      year: 2024,
      yield_quantity: 120,
      consent_sharing: true,
    },
    {
      id: "YH002",
      crop_name: "Wheat",
      year: 2024,
      yield_quantity: 150,
      consent_sharing: true,
    },
    {
      id: "YH003",
      crop_name: "Cotton",
      year: 2025,
      yield_quantity: 135,
      consent_sharing: true,
    },
    {
      id: "YH004",
      crop_name: "Rice",
      year: 2025,
      yield_quantity: 180,
      consent_sharing: false,
    },
  ],
  wallet: {
    id: "W001",
    balance: 45000,
    total_credits: 125000,
    total_debits: 80000,
  },
  bnpl_loans: [
    { id: "BL001", amount: 50000, status: "Active", due_date: "2024-12-31" },
    { id: "BL002", amount: 30000, status: "Paid", due_date: "2024-06-30" },
  ],
  ratings: {
    average_rating: 4.5,
    total_reviews: 28,
    recent_reviews: [
      {
        id: "R001",
        rating: 5,
        comment: "Excellent quality produce!",
        reviewer_name: "Amit Patel",
        created_at: "2024-01-20",
      },
      {
        id: "R002",
        rating: 4,
        comment: "Good service",
        reviewer_name: "Priya Sharma",
        created_at: "2024-01-18",
      },
    ],
  },
  assets: [
    {
      id: "A001",
      asset_type: "Tractor",
      description: "John Deere 5050D",
      purchase_date: "2022-03-15",
    },
    {
      id: "A002",
      asset_type: "Irrigation Pump",
      description: "5HP Submersible",
      purchase_date: "2023-06-20",
    },
  ],
  transaction_summary: {
    total_sales: 385000,
    total_deductions: 42500,
    net_earnings: 342500,
    successful_transactions: 28,
  },
};

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
  const profile = mockFarmerProfile;
  const sectionRefs = {
    personal: useRef<HTMLDivElement>(null),
    farm: useRef<HTMLDivElement>(null),
    crops: useRef<HTMLDivElement>(null),
    financial: useRef<HTMLDivElement>(null),
    ratings: useRef<HTMLDivElement>(null),
    documents: useRef<HTMLDivElement>(null),
    settings: useRef<HTMLDivElement>(null),
  };

  // Calculate member duration
  const memberSince = new Date(profile.personal_info.created_at);
  const memberDuration = Math.floor(
    (new Date().getTime() - memberSince.getTime()) /
      (1000 * 60 * 60 * 24 * 365),
  );

  // Crop Timeline Data (Gantt)
  const cropsTimelineData: Record<
    number,
    Array<{ crop: string; season: string; months: number[] }>
  > = {
    2024: [
      { crop: "Cotton", season: "Kharif", months: [6, 7, 8, 9, 10] },
      { crop: "Wheat", season: "Rabi", months: [11, 12, 1, 2, 3] },
      {
        crop: "Sugarcane",
        season: "Year-round",
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      },
    ],
    2025: [
      { crop: "Cotton", season: "Kharif", months: [6, 7, 8, 9, 10] },
      { crop: "Rice", season: "Kharif", months: [6, 7, 8, 9, 10] },
      { crop: "Wheat", season: "Rabi", months: [11, 12, 1, 2, 3] },
      { crop: "Pulses", season: "Rabi", months: [11, 12, 1, 2, 3] },
    ],
    2026: [
      { crop: "Cotton", season: "Kharif", months: [6, 7, 8, 9, 10] },
      { crop: "Rice", season: "Kharif", months: [6, 7, 8, 9, 10] },
      { crop: "Wheat", season: "Rabi", months: [11, 12, 1, 2, 3] },
      { crop: "Pulses", season: "Rabi", months: [11, 12, 1, 2, 3] },
      {
        crop: "Sugarcane",
        season: "Year-round",
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      },
    ],
  };

  // Master crop list (all crops ever grown)
  const allCrops = ["Cotton", "Rice", "Wheat", "Pulses", "Sugarcane"];
  const activeCrops = cropsTimelineData[selectedYear].map((c) => c.crop);

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

  // Yield History Data (Grouped Bar Chart)
  const yieldHistoryData = [
    {
      year: "2024",
      Cotton: 120,
      Wheat: 150,
      Sugarcane: 500,
      Rice: 0,
      Pulses: 0,
    },
    {
      year: "2025",
      Cotton: 135,
      Wheat: 160,
      Sugarcane: 0,
      Rice: 180,
      Pulses: 90,
    },
    {
      year: "2026",
      Cotton: 145,
      Wheat: 170,
      Sugarcane: 520,
      Rice: 190,
      Pulses: 95,
    },
  ];

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Scroll to section
  const scrollToSection = (sectionId: SectionId) => {
    setActiveSection(sectionId);
    sectionRefs[sectionId].current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Track active section on scroll using IntersectionObserver
  React.useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id as SectionId;
          setActiveSection(sectionId);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    // Observe all sections
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  // Mock Data for Reviews and Documents
  const recentReviews = [
    {
      id: 1,
      name: "Amit Sharma",
      date: "15 Jan 2024",
      rating: 5,
      text: "Excellent quality produce! Very reliable farmer.",
    },
    {
      id: 2,
      name: "Priya Desai",
      date: "20 Jan 2024",
      rating: 4,
      text: "Good quality cotton. Delivery was on time.",
    },
    {
      id: 3,
      name: "Vikram Singh",
      date: "10 Dec 2023",
      rating: 5,
      text: "Best wheat supplier in the region!",
    },
    {
      id: 4,
      name: "Sunita Reddy",
      date: "25 Nov 2023",
      rating: 4,
      text: "Consistent quality and fair pricing.",
    },
  ];

  const uploadedDocuments = [
    {
      id: 1,
      title: "Aadhaar Card",
      subtitle: "Government-issued identity proof",
      date: "15 Mar 2023",
      icon: FileText,
    },
    {
      id: 2,
      title: "Land Record",
      subtitle: "7/12 extract showing land ownership",
      date: "16 Mar 2023",
      icon: FileText,
    },
    {
      id: 3,
      title: "Bank Statement",
      subtitle: "Last 6 months bank statement",
      date: "1 Apr 2023",
      icon: FileText,
    },
    {
      id: 4,
      title: "Soil Health Card",
      subtitle: "Soil testing report from agriculture department",
      date: "10 May 2023",
      icon: FileText,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6">
          {/* Sidebar - Fixed */}
          <div className="w-80 flex-shrink-0">
            <div className="fixed w-80 bg-white rounded-3xl p-6 shadow-sm">
              {/* Profile Header */}
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-[#1a4d2e] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl text-white font-semibold">
                    {profile.personal_info.name.charAt(0)}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[#1a4d2e] mb-1">
                  {profile.personal_info.name}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  {profile.personal_info.role}
                </p>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="p-4 bg-gray-50 rounded-2xl text-center">
                  <span className="text-xs font-medium text-gray-500 block mb-1">
                    Crops
                  </span>
                  <p className="text-lg font-semibold text-[#1a4d2e]">
                    {profile.crops.length}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl text-center">
                  <span className="text-xs font-medium text-gray-500 block mb-1">
                    Area
                  </span>
                  <p className="text-lg font-semibold text-[#1a4d2e]">
                    {profile.farm_details.land_size}{" "}
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
                    {profile.ratings.average_rating}{" "}
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                {[
                  {
                    id: "personal" as SectionId,
                    label: "Personal Info",
                    icon: User,
                  },
                  {
                    id: "farm" as SectionId,
                    label: "Farm Details",
                    icon: MapPin,
                  },
                  {
                    id: "crops" as SectionId,
                    label: "Crops & Yield",
                    icon: Sprout,
                  },
                  {
                    id: "financial" as SectionId,
                    label: "Financial",
                    icon: Wallet,
                  },
                  { id: "ratings" as SectionId, label: "Ratings", icon: Star },
                  {
                    id: "documents" as SectionId,
                    label: "Documents",
                    icon: FileText,
                  },
                  {
                    id: "settings" as SectionId,
                    label: "Settings",
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
                  Personal Information
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
                    {profile.personal_info.id}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                    Full Name
                  </label>
                  <p className="text-sm font-semibold text-gray-900">
                    {profile.personal_info.name}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                    Mobile Number
                  </label>
                  <p className="text-sm font-medium text-gray-900">
                    {profile.personal_info.mobile_number}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                    Recovery Email
                  </label>
                  <p className="text-sm font-medium text-gray-900">
                    {profile.personal_info.recovery_email}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                    Account Created
                  </label>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(
                      profile.personal_info.created_at,
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                    Role
                  </label>
                  <p className="text-sm font-semibold text-[#1a4d2e]">
                    {profile.personal_info.role}
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
                  Farm Details
                </h3>
                <p className="text-sm text-gray-500">
                  Land and location information
                </p>
              </div>

              {/* Green Banner */}
              <div className="bg-[#1a4d2e] rounded-2xl p-6 mb-8 relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-[#4ade80] text-sm font-medium mb-1">
                    Total Land Size
                  </p>
                  <h2 className="text-4xl font-bold text-white max-w-xs">
                    {profile.farm_details.land_size}{" "}
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
                    {profile.farm_details.id}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                    Land Size
                  </label>
                  <p className="text-sm font-semibold text-gray-900">
                    {profile.farm_details.land_size} acres
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
                        {profile.farm_details.location_latitude}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block">
                        Longitude
                      </span>
                      <p className="text-sm font-semibold text-gray-900">
                        {profile.farm_details.location_longitude}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
                    Manual Correction
                  </label>
                  <p className="text-sm font-semibold text-gray-900">
                    {profile.farm_details.manual_location_correction
                      ? "Yes"
                      : "No"}
                  </p>
                </div>
              </div>

              <div className="mt-6 p-8 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">
                  Map visualization will be displayed here
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Location: {profile.farm_details.location_latitude},{" "}
                  {profile.farm_details.location_longitude}
                </p>
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
                  <div className="min-w-[800px]">
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
                    {allCrops.map((cropName) => {
                      const isActive = activeCrops.includes(cropName);
                      const cropData = cropsTimelineData[selectedYear].find(
                        (c) => c.crop === cropName,
                      );

                      return (
                        <div
                          key={cropName}
                          className={`grid grid-cols-[150px_repeat(12,1fr)] gap-1 mb-2 ${!isActive ? "opacity-30" : ""}`}
                        >
                          {/* Crop Name */}
                          <div className="font-semibold text-sm text-[#1a4d2e] p-2 bg-gray-50 rounded flex items-center">
                            {cropName}
                          </div>

                          {/* Month Cells */}
                          {monthNumbers.map((monthNum, idx) => {
                            const isActiveMonth =
                              cropData?.months.includes(monthNum);
                            const seasonColor = cropData
                              ? seasonColors[cropData.season]
                              : "#e5e7eb";

                            return (
                              <div
                                key={idx}
                                className="h-10 rounded flex items-center justify-center"
                                style={{
                                  backgroundColor: isActiveMonth
                                    ? seasonColor
                                    : "transparent",
                                  border: isActiveMonth
                                    ? `2px solid ${seasonColor}`
                                    : "1px solid #e5e7eb",
                                }}
                              >
                                {isActiveMonth && (
                                  <span className="text-white text-xs font-bold">
                                    ●
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
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
                      style={{ backgroundColor: seasonColors["Year-round"] }}
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
                  <div className="min-w-[600px] h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={yieldHistoryData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
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
                        <Tooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100">
                                  <p className="font-bold text-[#1a4d2e] mb-2">
                                    Year {label}
                                  </p>
                                  {payload.map(
                                    (entry: any, index: number) =>
                                      entry.value > 0 && (
                                        <div
                                          key={index}
                                          className="flex items-center gap-2 text-sm mb-1"
                                        >
                                          <div
                                            className="w-2 h-2 rounded-full"
                                            style={{
                                              backgroundColor: entry.stroke,
                                            }}
                                          ></div>
                                          <span className="text-gray-500">
                                            {entry.name}:
                                          </span>
                                          <span
                                            className="font-bold"
                                            style={{ color: entry.stroke }}
                                          >
                                            {entry.value} quintals
                                          </span>
                                        </div>
                                      ),
                                  )}
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Legend
                          wrapperStyle={{ paddingTop: "20px" }}
                          formatter={(value) => (
                            <span className="text-sm text-gray-700">
                              {value}
                            </span>
                          )}
                        />
                        {/* Lines for each crop */}
                        <Line
                          type="monotone"
                          dataKey="Cotton"
                          stroke="#1a4d2e"
                          strokeWidth={3}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="Rice"
                          stroke="#4ade80"
                          strokeWidth={3}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="Wheat"
                          stroke="#fbbf24"
                          strokeWidth={3}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="Pulses"
                          stroke="#166534"
                          strokeWidth={3}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="Sugarcane"
                          stroke="#84cc16"
                          strokeWidth={3}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
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
                  <div className="p-6 bg-gradient-to-br from-green-400 to-green-500 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-green-50 font-medium">
                        Wallet Balance
                      </p>
                      <Wallet className="w-5 h-5 text-white/80" />
                    </div>
                    <p className="text-3xl font-bold text-white">
                      {formatCurrency(profile.wallet.balance)}
                    </p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-[#1a4d2e] to-[#166534] rounded-xl shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-green-100 font-medium">
                        Total Sales
                      </p>
                      <TrendingUp className="w-5 h-5 text-white/80" />
                    </div>
                    <p className="text-3xl font-bold text-white">
                      {formatCurrency(profile.transaction_summary.total_sales)}
                    </p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-yellow-50 font-medium">
                        Net Earnings
                      </p>
                      <Award className="w-5 h-5 text-white/80" />
                    </div>
                    <p className="text-3xl font-bold text-white">
                      {formatCurrency(profile.transaction_summary.net_earnings)}
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

              {/* Ratings Summary Banner */}
              <div className="bg-[#fbbf24] rounded-2xl p-6 mb-8 flex items-center justify-between relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-white/90 text-sm font-medium mb-1">
                    Average Rating
                  </p>
                  <div className="flex items-end gap-2">
                    <h2 className="text-5xl font-bold text-white">
                      {profile.ratings.average_rating}
                    </h2>
                    <div className="mb-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(profile.ratings.average_rating) ? "fill-white text-white" : "text-white/40"}`}
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

              {/* Reviews List */}
              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <div
                    key={review.id}
                    className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-[#1a4d2e]">
                          {review.name}
                        </h4>
                        <p className="text-xs text-gray-500">{review.date}</p>
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
                    <p className="text-sm text-gray-600">"{review.text}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* DOCUMENTS */}
            <div
              ref={sectionRefs.documents}
              id="documents"
              className="bg-white rounded-3xl p-6 shadow-sm scroll-mt-4"
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#1a4d2e]">
                  Documents & Assets
                </h3>
                <p className="text-sm text-gray-500">
                  {uploadedDocuments.length} document(s) uploaded
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {uploadedDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="border border-gray-200 rounded-xl p-4 flex items-start gap-4 hover:border-[#4ade80] hover:shadow-sm transition-all group"
                  >
                    <div className="p-2 bg-[#1a4d2e] rounded-lg group-hover:bg-[#1a4d2e] transition-colors">
                      <doc.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-[#1a4d2e] text-sm">
                        {doc.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {doc.subtitle}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-2">
                        Uploaded: {doc.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
                    {profile.personal_info.is_telegram_linked
                      ? "Enabled"
                      : "Not connected"}
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
