"use client";

import React from "react";
import { Leaf, Sprout, Truck, AlertTriangle, Bell } from "lucide-react";
import Navbar from "@/components/Navbar";
import WeatherWidget from "@/components/WeatherWidget";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { getActiveCropListings } from "@/services/crop-listing/cropApi";
import { getTransactionsByUser } from "@/services/transaction/transactionApi";
import { getNotificationsByUser } from "@/services/notification/notificationApi";
import { getFarmerProfileByUserId } from "@/services/farmer/farmerProfileApi";
import { getProfile } from "@/services/user/userApi";

import {
  Transaction,
  Notification,
  NotificationType,
  WeatherData,
  Scheme,
  FarmerProfile,
  DashboardUser,
  TransactionType,
  TransactionStatus,
} from "@/types/dashboard.types";

import { CropListingStatus } from "@/types/crop.types";

import type {
  CropListing as CropListingCT,
  QualityGrade as QualityGradeCT,
} from "@/types/crop.types";

// Types (moved to `types/dashboard.types.ts`)

// Crop listing related types are in `types/dashboard.types.ts`

// Transaction types are defined in `types/dashboard.types.ts`

// Scheme type moved to `types/dashboard.types.ts`

// Notification types moved to `types/dashboard.types.ts`

// 8. Advisories

// --- Mock Data Values ---

const mockUser: DashboardUser = {
  name: "Raghav",
  role: "Farmer",
  location: "Green House / Surat",
};

const mockWeather: WeatherData = {
  temp: 29,
  condition: "Mostly sunny",
  humidity: 62,
  wind_speed: 12,
  pressure: 1013,
  advisory: "Ideal conditions for cotton harvesting today.",
  uv_index: 8,
  max_temp: 34,
  min_temp: 24,
  next_rain: "Tue, 4 PM",
};

// HELPER: Generate date X days ago
const daysAgo = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
};

/*
const mockCropListings: MockCropListing[] = [
  // Fresh (0-7 days) - 3 crops
  { id: "1", crop_name: "Cotton", quantity: 100, expected_price: 600, quality_grade: QualityGrade.PREMIUM, status: CropStatus.ACTIVE, created_at: daysAgo(2) },
  { id: "2", crop_name: "Wheat", quantity: 200, expected_price: 300, quality_grade: QualityGrade.PREMIUM, status: CropStatus.ACTIVE, created_at: daysAgo(5) },
  { id: "3", crop_name: "Rice", quantity: 150, expected_price: 400, quality_grade: QualityGrade.STANDARD, status: CropStatus.ACTIVE, created_at: daysAgo(3) },

  // Waiting (8-21 days) - 2 crops
  { id: "4", crop_name: "Maize", quantity: 300, expected_price: 250, quality_grade: QualityGrade.STANDARD, status: CropStatus.ACTIVE, created_at: daysAgo(12) },
  { id: "5", crop_name: "Sugarcane", quantity: 500, expected_price: 150, quality_grade: QualityGrade.STANDARD, status: CropStatus.ACTIVE, created_at: daysAgo(18) },

  // Stuck (21+ days) - 2 crops
  { id: "6", crop_name: "Pulses", quantity: 80, expected_price: 800, quality_grade: QualityGrade.PREMIUM, status: CropStatus.ACTIVE, created_at: daysAgo(25) },
  { id: "7", crop_name: "Soybean", quantity: 120, expected_price: 450, quality_grade: QualityGrade.ECONOMY, status: CropStatus.ACTIVE, created_at: daysAgo(30) },

  // Others (Not included in metric)
  { id: "8", crop_name: "Tomatoes", quantity: 50, expected_price: 40, quality_grade: QualityGrade.STANDARD, status: CropStatus.SOLD, created_at: daysAgo(40) },
];
*/

// Generate Realistic Transactions for last 6 months
/*
const generateMockTransactions = () => {
  const transactions: MockTransaction[] = [];
  const months = 4;

  for (let i = 0; i < months; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - (months - 1 - i));

    // 1. Generate Random Sales (2-5 per month)
    const salesCount = Math.floor(Math.random() * 4) + 2;
    for (let j = 0; j < salesCount; j++) {
      transactions.push({
        id: `TXN-SALE-${i}-${j}`,
        amount: Math.floor(Math.random() * 50000) + 10000,
        type: TransactionType.CROP_SALE,
        status: TransactionStatus.SUCCESS,
        completed_at: date.toISOString()
      });
    }

    // 2. Generate Random Deductions (Logistics, BNPL)
    const deductionCount = Math.floor(Math.random() * 5) + 3;
    for (let k = 0; k < deductionCount; k++) {
      const type = Math.random() > 0.5 ? TransactionType.LOGISTICS_FEE : TransactionType.BNPL_DEDUCTION;
      transactions.push({
        id: `TXN-DED-${i}-${k}`,
        amount: Math.floor(Math.random() * 5000) + 500,
        type: type,
        status: TransactionStatus.SUCCESS,
        completed_at: date.toISOString()
      });
    }
  }
  return transactions;
};

*/

// Process Transactions for Chart
const processTransactions = (transactions: Transaction[]) => {
  const groupedData: Record<
    string,
    {
      month: string;
      sales: number;
      deductions: number;
      profit: number;
      dateObj: Date;
    }
  > = {};
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  transactions.forEach((txn) => {
    if (txn.status !== TransactionStatus.SUCCESS) return;

    const date = new Date(txn.completed_at);
    const monthKey = `${months[date.getMonth()]}`;

    if (!groupedData[monthKey]) {
      groupedData[monthKey] = {
        month: monthKey,
        sales: 0,
        deductions: 0,
        profit: 0,
        dateObj: date,
      };
    }

    if (txn.type === TransactionType.CROP_SALE) {
      groupedData[monthKey].sales += txn.amount;
    } else if (
      [
        TransactionType.LOGISTICS_FEE,
        TransactionType.BNPL_DEDUCTION,
        TransactionType.ADJUSTMENT,
      ].includes(txn.type)
    ) {
      groupedData[monthKey].deductions += txn.amount;
    }
  });

  // Calculate Profit (Net Earnings)
  Object.values(groupedData).forEach((group) => {
    group.profit = group.sales - group.deductions;
  });

  return Object.values(groupedData).sort(
    (a, b) => a.dateObj.getTime() - b.dateObj.getTime(),
  );
};

/*
const mockSchemes: MockScheme[] = [ ... ];
*/

/*
const mockNotifications: MockNotification[] = [ ... ];
*/

// --- Components ---

function CropsOnSaleOverview({ listings }: { listings: CropListingCT[] }) {
  // 1. Filter for ACTIVE Status (backend uses CropListingStatus)
  const activeListings = listings.filter(
    (l) => l.status === (CropListingStatus.ACTIVE as unknown as string),
  );

  // 2. Calculate Total Expected Value
  // Sum of (quantity * expected_price)
  const totalExpectedValue = activeListings.reduce(
    (sum, item) => sum + item.quantity * item.expected_price,
    0,
  );

  // 3. Logic: Fresh / Waiting / Stuck
  const now = new Date();
  let freshCount = 0;
  let waitingCount = 0;
  let stuckCount = 0;

  activeListings.forEach((item) => {
    const created = new Date(item.created_at);
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 7) freshCount++;
    else if (diffDays <= 21) waitingCount++;
    else stuckCount++;
  });

  // 4. Quality Mix for Donut Chart: count by returned quality_grade string
  const qualityCounts: Record<string, number> = {};
  activeListings.forEach((item) => {
    const q = String(item.quality_grade);
    qualityCounts[q] = (qualityCounts[q] || 0) + 1;
  });

  const qualityData = Object.entries(qualityCounts)
    .map(([k, v]) => {
      const name = k;
      const key = k.toLowerCase();
      const color = key.includes("premium")
        ? "#1a4d2e"
        : key.includes("standard")
          ? "#4ade80"
          : "#fbbf24";
      return { name, value: v, color };
    })
    .filter((d) => d.value > 0);

  // Format currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-8">
      {/* LEFT: Primary Metric & Market Movement */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Top Section */}
        <div>
          <h3 className="text-gray-500 text-sm font-semibold mb-1">
            Money Expected From Crops on Sale
          </h3>
          <div className="text-5xl font-bold text-[#1a4d2e] mb-2">
            {formatCurrency(totalExpectedValue)}
          </div>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <span className="font-bold text-[#1a4d2e]">
              {activeListings.length} active crops
            </span>
          </p>
        </div>

        {/* Middle Section: Market Movement */}
        <div className="mt-8">
          <div className="flex justify-between items-end mb-2">
            <label className="text-xl font-bold text-[#1a4d2e]">
              Market Movement
            </label>
            <span className="text-xs text-gray-400">
              Based on listing duration
            </span>
          </div>

          {/* Visual Bar */}
          <div className="h-4 w-full flex rounded-full overflow-hidden mb-3">
            <div
              style={{ flex: freshCount }}
              className="bg-[#1a4d2e] h-full"
              title="Fresh"
            ></div>
            <div
              style={{ flex: waitingCount }}
              className="bg-[#4ade80] h-full"
              title="Waiting"
            ></div>
            <div
              style={{ flex: stuckCount }}
              className="bg-[#fbbf24] h-full"
              title="Stuck"
            ></div>
          </div>

          {/* Legend / Counts */}
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#1a4d2e]"></div>
              <span className="text-gray-600">
                Fresh: <b>{freshCount}</b>{" "}
                <span className="text-xs text-gray-400">(0-7d)</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#4ade80]"></div>
              <span className="text-gray-600">
                Waiting: <b>{waitingCount}</b>{" "}
                <span className="text-xs text-gray-400">(8-21d)</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#fbbf24]"></div>
              <span className="text-gray-600">
                Stuck: <b>{stuckCount}</b>{" "}
                <span className="text-xs text-gray-400">(21d+)</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Quality Mix Donut */}
      <div className="w-full md:w-64 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-6">
        <h4 className="text-xl font-bold text-gray-700 mb-4 self-start md:self-center">
          Crop Quality Mix
        </h4>
        <div className="w-40 h-40 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={qualityData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {qualityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value} Crops`, name]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  padding: "8px 12px",
                }}
                position={{ x: 0, y: 160 }} // Force tooltip to bottom
                cursor={{ fill: "transparent" }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-[#1a4d2e]">
              {activeListings.length}
            </span>
          </div>
        </div>
        {/* Legend - Centered & Flexible */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 text-xs">
          {qualityData.map((d) => (
            <div key={d.name} className="flex items-center gap-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: d.color }}
              ></div>
              <span className="text-gray-500">
                {d.name} ({d.value})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FarmerDashboard() {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [cropListings, setCropListings] = React.useState<CropListingCT[]>([]);
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const [schemes, setSchemes] = React.useState<Scheme[]>([]);
  const [farmerProfile, setFarmerProfile] = React.useState<any>(null);
  const [userProfile, setUserProfile] = React.useState<any>(null);
  const [loadingData, setLoadingData] = React.useState(true);

  const fetchData = async () => {
    try {
      const profileResp = await getProfile();
      const user = profileResp?.data || null;
      if (user) setUserProfile(user);

      const [farmerResp, cropsResp, txResp, notifsResp] = await Promise.all([
        user?.id
          ? getFarmerProfileByUserId(user.id).catch(() => ({ data: null }))
          : Promise.resolve({ data: null }),
        getActiveCropListings().catch(() => ({ data: [] })),
        getTransactionsByUser().catch(() => ({ data: [] })),
        getNotificationsByUser().catch(() => ({ data: [] })),
      ]);

      setFarmerProfile(farmerResp?.data || null);
      setCropListings(cropsResp?.data || []);
      setTransactions(txResp?.data || []);
      setNotifications(notifsResp?.data || []);
    } catch (e) {
      // no-op
    } finally {
      setLoadingData(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  // Map backend Notification shape to Navbar's expected shape
  const navbarNotifications = notifications.map((n) => ({
    id: n.id,
    type: String(n.notification_type || ""),
    message: n.message,
    time: n.sent_at || "",
    read: !!n.read_at,
  }));

  // Helper to get icon for notification
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.AI_INSIGHT:
        return (
          <div className="p-2 bg-blue-100 rounded-full text-blue-600">
            <Leaf className="w-4 h-4" />
          </div>
        );
      case NotificationType.SCHEME_ALERT:
        return (
          <div className="p-2 bg-green-100 rounded-full text-green-600">
            <Sprout className="w-4 h-4" />
          </div>
        );
      case NotificationType.ORDER_UPDATE:
        return (
          <div className="p-2 bg-orange-100 rounded-full text-orange-600">
            <Truck className="w-4 h-4" />
          </div>
        );
      case NotificationType.SYSTEM_ALERT:
        return (
          <div className="p-2 bg-red-100 rounded-full text-red-600">
            <AlertTriangle className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="p-2 bg-gray-100 rounded-full text-gray-600">
            <Bell className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#e8f5e9] p-4 lg:p-8 font-sans text-[#1a4d2e]">
      {/* Header Section */}
      <Navbar
        title="Dashboard"
        userName={userProfile?.name || ""}
        userLocation={
          farmerProfile
            ? `${farmerProfile.location_latitude}, ${farmerProfile.location_longitude}`
            : ""
        }
        notifications={navbarNotifications}
        onNotificationClick={() => setShowNotifications(!showNotifications)}
        showNotifications={showNotifications}
        notificationIcon={
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-[#f8faf9]">
              <h3 className="font-bold text-[#1a4d2e]">Notifications</h3>
              <button className="text-xs text-blue-600 hover:underline">
                Mark all read
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer flex gap-3 ${!n.read_at ? "bg-blue-50/30" : ""}`}
                >
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(
                      n.notification_type as NotificationType,
                    )}
                  </div>
                  <div>
                    <p
                      className={`text-sm text-gray-800 leading-snug ${!n.read_at ? "font-semibold" : ""}`}
                    >
                      {n.message}
                    </p>
                    <span className="text-xs text-gray-400 mt-1 block">
                      {n.sent_at || ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 text-center border-t border-gray-100 bg-gray-50">
              <button className="text-sm font-bold text-[#1a4d2e] hover:text-green-700">
                View all notifications
              </button>
            </div>
          </div>
        }
      />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* --- TOP ROW --- */}

        {/* 1. Weather Widget (Left) - Production Ready API Integration */}
        <WeatherWidget
          location={userProfile?.name || ""}
          weather={mockWeather}
        />

        {/* 2. Crops on Sale Overview (Spans 2 columns) */}
        <div className="lg:col-span-2">
          <CropsOnSaleOverview listings={cropListings} />
        </div>

        {/* --- BOTTOM SECTION (Split Columns) --- */}

        {/* Left Side (Financials + Shipments) - 2 Cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* 3. Sales & Deductions Overview (Replaces Summary of Production) */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-[#1a4d2e] font-bold text-2xl">
                  Net Earnings
                </h3>
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#4ade80]"></div>
                    <span className="text-sm text-black">Sales</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#fbbf24]"></div>
                    <span className="text-sm text-black">Deductions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#166534]"></div>
                    <span className="text-sm text-black">Net Profit</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={processTransactions(transactions)} barGap={4}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f0f0f0"
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#000000", fontSize: 12, fontWeight: 500 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#000000", fontSize: 12, fontWeight: 500 }}
                  />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100">
                            <p className="font-bold text-[#1a4d2e] mb-2">
                              {label}
                            </p>
                            {payload.map((entry: any, index: number) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 text-sm mb-1"
                              >
                                <div
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: entry.color }}
                                ></div>
                                <span className="text-gray-500 capitalize">
                                  {entry.name}:
                                </span>
                                <span
                                  className="font-bold"
                                  style={{ color: entry.color }}
                                >
                                  ₹
                                  {new Intl.NumberFormat("en-IN", {
                                    notation: "compact",
                                  }).format(entry.value)}
                                </span>
                              </div>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="sales"
                    name="Sales"
                    fill="#4ade80"
                    radius={[4, 4, 4, 4]}
                    barSize={24}
                  />
                  <Bar
                    dataKey="deductions"
                    name="Deductions"
                    fill="#fbbf24"
                    radius={[4, 4, 4, 4]}
                    barSize={24}
                  />
                  <Bar
                    dataKey="profit"
                    name="Net Profit"
                    fill="#166534"
                    radius={[4, 4, 4, 4]}
                    barSize={24}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Side (Advisories + Schemes) - 1 Col */}
        <div className="space-y-6">
          {/* 6. Government Schemes - Matches Sales Chart Card Height */}
          <div className="bg-[#1a4d2e] rounded-3xl p-6 shadow-sm text-white relative overflow-hidden h-96 flex flex-col">
            <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
              <Sprout className="w-40 h-40" />
            </div>
            <div className="absolute bottom-0 left-0 p-4 opacity-20 pointer-events-none">
              <Sprout className="w-32 h-32 transform -scale-x-100" />
            </div>

            <div className="mb-4 relative z-10">
              <h3 className="text-2xl font-bold mb-1">Govt Schemes</h3>
              <p className="text-green-200 text-sm">
                Eligible benefits matching your profile
              </p>
            </div>

            <div className="space-y-4 overflow-y-auto pr-2 relative z-10 flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              {schemes.map((scheme) => (
                <div
                  key={scheme.id}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-lg text-amber-200 transition-colors">
                        {scheme.name}
                      </h4>
                      <p className="text-xs text-[#4ade80] uppercase tracking-wider font-semibold mt-1">
                        {scheme.state}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-200 leading-snug mb-3">
                    {scheme.description}
                  </p>

                  <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-1">
                    <span className="text-xs text-green-200 font-medium">
                      Deadline: {scheme.deadline}
                    </span>
                    <button className="bg-[#4ade80] text-[#1a4d2e] px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#4ade80]/90 transition-colors flex items-center gap-1 shadow-sm">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
