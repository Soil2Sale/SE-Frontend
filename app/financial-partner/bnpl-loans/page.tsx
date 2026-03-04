"use client";

import React, { useState } from "react";
import {
  PiggyBank,
  ShoppingCart,
  Users,
  CreditCard,
  Wrench,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronRight,
  Plus,
  Minus,
  Leaf,
  Tractor,
  BarChart3,
  Wallet,
  CalendarClock,
  ArrowDownLeft,
  Info,
} from "lucide-react";

// ── Mock Data ──────────────────────────────────────────────────────────────────

const BNPL_CONTRACTS = [
  {
    id: "BNPL-001",
    item: "Hybrid Cotton Seeds (50 kg)",
    supplier: "AgroSupply Co.",
    amount: 12500,
    paid: 5000,
    dueDate: "2026-10-15",
    linkedCrop: "Cotton",
    status: "active",
  },
  {
    id: "BNPL-002",
    item: "NPK Fertilizer (200 kg)",
    supplier: "FarmChem Ltd.",
    amount: 8200,
    paid: 8200,
    dueDate: "2026-09-01",
    linkedCrop: "Wheat",
    status: "settled",
  },
  {
    id: "BNPL-003",
    item: "Pesticide Kit (Premium)",
    supplier: "KisanStore",
    amount: 4700,
    paid: 0,
    dueDate: "2026-11-20",
    linkedCrop: "Rice",
    status: "active",
  },
];

const BUYING_POOLS = [
  {
    id: "POOL-001",
    item: "DAP Fertilizer 50 kg bags",
    organizer: "Ravi Patel",
    location: "Surat, Gujarat",
    target: 100,
    current: 72,
    pricePerBag: 1350,
    wholesalePrice: 1150,
    deadline: "2026-03-15",
    members: 12,
    myQty: 0,
  },
  {
    id: "POOL-002",
    item: "Urea (50 kg bags)",
    organizer: "Mukesh Shah",
    location: "Anand, Gujarat",
    target: 200,
    current: 200,
    pricePerBag: 280,
    wholesalePrice: 240,
    deadline: "2026-03-10",
    members: 18,
    myQty: 10,
  },
];

const KCC_DATA = {
  outstanding: 85000,
  originalLoan: 150000,
  monthlyRouted: 3200,
  nextDeduction: "2026-03-20",
  recentPayments: [
    { date: "2026-02-15", amount: 3200, sale: "Cotton 200 kg" },
    { date: "2026-01-20", amount: 2875, sale: "Wheat 500 kg" },
    { date: "2025-12-18", amount: 4100, sale: "Cotton 350 kg" },
  ],
};

const EQUIPMENT = [
  {
    id: "EQ-001",
    name: "Mahindra 575 DI Tractor",
    maintenanceFund: 14500,
    monthlyIncome: 8500,
    routed: 15,
    lastRented: "2026-03-01",
    totalRentals: 22,
  },
  {
    id: "EQ-002",
    name: "Rotavator Attachment",
    maintenanceFund: 3200,
    monthlyIncome: 1800,
    routed: 15,
    lastRented: "2026-02-22",
    totalRentals: 9,
  },
];

// ── Component ──────────────────────────────────────────────────────────────────

export default function BNPLLoansPage() {
  const [poolQty, setPoolQty] = useState<Record<string, number>>({ "POOL-001": 0, "POOL-002": 0 });
  const [joinedPools, setJoinedPools] = useState<Set<string>>(new Set(["POOL-002"]));
  const [activeTab, setActiveTab] = useState<"bnpl" | "pool" | "kcc" | "equipment">("bnpl");

  const totalBNPL = BNPL_CONTRACTS.reduce((s, c) => s + c.amount, 0);
  const totalPaid = BNPL_CONTRACTS.reduce((s, c) => s + c.paid, 0);
  const outstanding = totalBNPL - totalPaid;
  const kccProgress = ((KCC_DATA.originalLoan - KCC_DATA.outstanding) / KCC_DATA.originalLoan) * 100;

  const handleJoinPool = (poolId: string) => {
    if (joinedPools.has(poolId)) return;
    if (poolQty[poolId] === 0) return;
    setJoinedPools((prev) => new Set([...prev, poolId]));
  };

  return (
    <div className="space-y-6">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-[#1a4d2e] to-[#15401f] rounded-3xl p-8 shadow-lg text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <PiggyBank className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-1">BNPL & Loans</h1>
            <p className="text-green-100">
              Buy inputs now, repay from harvest sales — manage pools, KCC, and equipment funds
            </p>
          </div>
        </div>

      </div>

      {/* ── Stats ────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="p-3 bg-green-100 rounded-xl w-fit mb-3">
            <ShoppingCart className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Available BNPL Credit</h3>
          <p className="text-3xl font-bold text-[#1a4d2e]">₹50,000</p>
          <p className="text-xs text-gray-400 mt-1">₹{outstanding.toLocaleString("en-IN")} used</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="p-3 bg-blue-100 rounded-xl w-fit mb-3">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Active Pool(s)</h3>
          <p className="text-3xl font-bold text-blue-600">{joinedPools.size}</p>
          <p className="text-xs text-gray-400 mt-1">{BUYING_POOLS.length} pools open nearby</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="p-3 bg-amber-100 rounded-xl w-fit mb-3">
            <CreditCard className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">KCC Outstanding</h3>
          <p className="text-3xl font-bold text-amber-600">₹{(KCC_DATA.outstanding / 1000).toFixed(0)}K</p>
          <p className="text-xs text-gray-400 mt-1">{kccProgress.toFixed(0)}% repaid</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="p-3 bg-purple-100 rounded-xl w-fit mb-3">
            <Wrench className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Maintenance Fund</h3>
          <p className="text-3xl font-bold text-purple-600">
            ₹{EQUIPMENT.reduce((s, e) => s + e.maintenanceFund, 0).toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-gray-400 mt-1">{EQUIPMENT.length} equipment listed</p>
        </div>
      </div>

      {/* ── Tab Navigation ───────────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-2 shadow-sm flex gap-1">
        {(
          [
            { key: "bnpl", label: "BNPL Contracts", icon: ShoppingCart },
            { key: "pool", label: "Buying Pools", icon: Users },
            { key: "kcc", label: "KCC Routing", icon: CreditCard },
            { key: "equipment", label: "Equipment Fund", icon: Tractor },
          ] as const
        ).map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-semibold text-sm transition-all ${
              activeTab === key
                ? "bg-[#1a4d2e] text-white shadow"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden md:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* ── BNPL Contracts Tab ───────────────────────────────────────────────── */}
      {activeTab === "bnpl" && (
        <div className="bg-white rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-[#1a4d2e]">Active BNPL Contracts</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#1a4d2e] text-white rounded-xl text-sm font-semibold hover:bg-[#15401f] transition-colors">
              <Plus className="w-4 h-4" />
              New Purchase
            </button>
          </div>

          {BNPL_CONTRACTS.map((c) => {
            const pct = (c.paid / c.amount) * 100;
            return (
              <div
                key={c.id}
                className={`rounded-2xl p-5 border ${
                  c.status === "settled"
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex flex-col md:flex-row justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl ${c.status === "settled" ? "bg-green-100" : "bg-blue-100"}`}>
                      <Leaf className={`w-5 h-5 ${c.status === "settled" ? "text-green-600" : "text-blue-600"}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1a4d2e]">{c.item}</h3>
                      <p className="text-sm text-gray-500">
                        {c.supplier} · Linked to <span className="text-[#1a4d2e] font-medium">{c.linkedCrop}</span> harvest
                      </p>
                      <p className="text-xs text-gray-400">ID: {c.id} · Due: {new Date(c.dueDate).toLocaleDateString("en-IN")}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-[#1a4d2e]">₹{c.amount.toLocaleString("en-IN")}</p>
                    <p className="text-sm text-gray-500">
                      Paid: ₹{c.paid.toLocaleString("en-IN")} · Due: ₹{(c.amount - c.paid).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Repayment Progress</span>
                    <span>{pct.toFixed(0)}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        c.status === "settled" ? "bg-green-500" : "bg-blue-500"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                {c.status === "settled" ? (
                  <span className="flex items-center gap-1 text-xs text-green-600 font-semibold">
                    <CheckCircle className="w-4 h-4" /> Auto-settled from harvest sale
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                    <Clock className="w-4 h-4" /> Pending — auto-deducted at next sale settlement
                  </span>
                )}
              </div>
            );
          })}

          <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700">
              BNPL repayment is automatically deducted at sale settlement. The total BNPL amount is explicitly linked to your crop sale value. Outstanding balance is always visible here. Services blocked if risk threshold is exceeded.
            </p>
          </div>
        </div>
      )}

      {/* ── Buying Pools Tab ─────────────────────────────────────────────────── */}
      {activeTab === "pool" && (
        <div className="bg-white rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="text-2xl font-bold text-[#1a4d2e]">Nearby Buying Pools</h2>
              <p className="text-gray-500 text-sm">
                Join neighbours to hit MOQ and get wholesale prices — bill split is automatic
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#1a4d2e] text-white rounded-xl text-sm font-semibold hover:bg-[#15401f] transition-colors">
              <Plus className="w-4 h-4" />
              Create Pool
            </button>
          </div>

          {BUYING_POOLS.map((pool) => {
            const progress = (pool.current / pool.target) * 100;
            const isJoined = joinedPools.has(pool.id);
            const myQuantity = poolQty[pool.id] ?? 0;
            const savings = (pool.pricePerBag - pool.wholesalePrice) * (myQuantity || pool.myQty);

            return (
              <div
                key={pool.id}
                className={`rounded-2xl p-5 border ${
                  isJoined ? "border-green-200 bg-green-50" : "border-gray-200"
                }`}
              >
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-[#1a4d2e]">{pool.item}</h3>
                      {isJoined && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-green-600 text-white text-xs rounded-full font-semibold">
                          <CheckCircle className="w-3 h-3" /> Joined
                        </span>
                      )}
                      {progress >= 100 && (
                        <span className="px-2 py-0.5 bg-amber-500 text-white text-xs rounded-full font-semibold">
                          MOQ Met — Processing
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      Organized by <span className="font-medium">{pool.organizer}</span> ·{" "}
                      <MapPin className="w-3.5 h-3.5 inline" /> {pool.location}
                    </p>
                    <p className="text-xs text-gray-400">
                      {pool.members} members · Closes {new Date(pool.deadline).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm line-through text-gray-400">₹{pool.pricePerBag}/bag</p>
                    <p className="text-2xl font-bold text-green-600">₹{pool.wholesalePrice}/bag</p>
                    <p className="text-xs text-green-500">
                      Save ₹{pool.pricePerBag - pool.wholesalePrice}/bag at wholesale
                    </p>
                  </div>
                </div>

                {/* Pool Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Pool Progress: {pool.current} / {pool.target} bags</span>
                    <span>{progress.toFixed(0)}% of MOQ</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        progress >= 100 ? "bg-amber-500" : "bg-[#1a4d2e]"
                      }`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>

                {!isJoined && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() =>
                          setPoolQty((prev) => ({ ...prev, [pool.id]: Math.max(0, (prev[pool.id] ?? 0) - 1) }))
                        }
                        className="px-3 py-2 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 font-bold text-[#1a4d2e]">{myQuantity} bags</span>
                      <button
                        onClick={() =>
                          setPoolQty((prev) => ({ ...prev, [pool.id]: (prev[pool.id] ?? 0) + 1 }))
                        }
                        className="px-3 py-2 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    {myQuantity > 0 && (
                      <p className="text-sm text-green-600 font-medium">
                        You'd save ₹{((pool.pricePerBag - pool.wholesalePrice) * myQuantity).toLocaleString("en-IN")}
                      </p>
                    )}
                    <button
                      onClick={() => handleJoinPool(pool.id)}
                      disabled={myQuantity === 0}
                      className={`flex items-center gap-2 px-5 py-2 rounded-xl font-semibold text-sm transition-colors ${
                        myQuantity > 0
                          ? "bg-[#1a4d2e] text-white hover:bg-[#15401f]"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <Users className="w-4 h-4" />
                      One-Click Join
                    </button>
                  </div>
                )}

                {isJoined && savings > 0 && (
                  <p className="text-sm text-green-600 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    You're saving ₹{savings.toLocaleString("en-IN")} in this pool — bill split is automatic at checkout
                  </p>
                )}
              </div>
            );
          })}

          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700">
              Pool closes and orders the moment MOQ is met. A full refund is automatically triggered if the pool doesn't meet its target. Participation restricted to a 50 km radius.
            </p>
          </div>
        </div>
      )}

      {/* ── KCC Routing Tab ──────────────────────────────────────────────────── */}
      {activeTab === "kcc" && (
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#1a4d2e]">KCC Auto-Repayment Routing</h2>
            <p className="text-gray-500 text-sm">
              20% of every sale is auto-routed to your Kisan Credit Card — no missed payments
            </p>
          </div>

          {/* KCC Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
              <h3 className="text-sm text-gray-500 mb-1">Original Loan</h3>
              <p className="text-2xl font-bold text-[#1a4d2e]">
                ₹{KCC_DATA.originalLoan.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="bg-green-50 rounded-2xl p-5 border border-green-200">
              <h3 className="text-sm text-gray-500 mb-1">Total Repaid</h3>
              <p className="text-2xl font-bold text-green-600">
                ₹{(KCC_DATA.originalLoan - KCC_DATA.outstanding).toLocaleString("en-IN")}
              </p>
            </div>
            <div className="bg-red-50 rounded-2xl p-5 border border-red-200">
              <h3 className="text-sm text-gray-500 mb-1">Outstanding</h3>
              <p className="text-2xl font-bold text-red-500">
                ₹{KCC_DATA.outstanding.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          {/* Progress Visualization */}
          <div className="mb-6 p-5 bg-gray-50 rounded-2xl border border-gray-200">
            <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
              <span>Loan Repayment Progress</span>
              <span>{kccProgress.toFixed(1)}% Complete</span>
            </div>
            <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden mb-2">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#1a4d2e] to-[#4ade80] transition-all"
                style={{ width: `${kccProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>₹0</span>
              <span>₹{KCC_DATA.originalLoan.toLocaleString("en-IN")}</span>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 border border-gray-200">
                <CalendarClock className="w-4 h-4 text-amber-500" />
                <span className="text-sm text-gray-600">
                  Next deduction: <strong>{new Date(KCC_DATA.nextDeduction).toLocaleDateString("en-IN")}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 border border-gray-200">
                <BarChart3 className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-600">
                  Auto-routes <strong>20%</strong> of every sale
                </span>
              </div>
            </div>
          </div>

          {/* Recent Payments */}
          <h3 className="font-bold text-[#1a4d2e] mb-3">Recent KCC Payments</h3>
          <div className="space-y-3">
            {KCC_DATA.recentPayments.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <ArrowDownLeft className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1a4d2e]">
                      Auto-deducted from {p.sale}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(p.date).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">₹{p.amount.toLocaleString("en-IN")}</p>
                  <p className="text-xs text-gray-400">sent to KCC</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 bg-blue-50 rounded-2xl p-4 border border-blue-200 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700">
              Opting out of automatic repayment requires explicit bank approval. A maximum deduction cap is enforced to ensure you retain sufficient liquidity. Compliant with RBI regulations.
            </p>
          </div>
        </div>
      )}

      {/* ── Equipment Maintenance Fund Tab ───────────────────────────────────── */}
      {activeTab === "equipment" && (
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#1a4d2e]">Equipment Leasing & Maintenance Fund</h2>
            <p className="text-gray-500 text-sm">
              Rental income auto-routed to your Maintenance Fund — withdraw only for repairs
            </p>
          </div>

          <div className="space-y-4">
            {EQUIPMENT.map((eq) => (
              <div key={eq.id} className="rounded-2xl p-5 border border-gray-200 bg-gray-50">
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-purple-100 rounded-xl">
                      <Tractor className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1a4d2e]">{eq.name}</h3>
                      <p className="text-sm text-gray-500">
                        {eq.totalRentals} total rentals · Last rented{" "}
                        {new Date(eq.lastRented).toLocaleDateString("en-IN")}
                      </p>
                      <p className="text-xs text-gray-400">{eq.routed}% of rental income → Maintenance Fund</p>
                    </div>
                  </div>
                  <div className="flex gap-4 text-center">
                    <div className="bg-white rounded-xl p-3 border border-gray-200 min-w-[100px]">
                      <p className="text-xs text-gray-500">Monthly Income</p>
                      <p className="text-lg font-bold text-[#1a4d2e]">₹{eq.monthlyIncome.toLocaleString("en-IN")}</p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-3 border border-purple-200 min-w-[120px]">
                      <p className="text-xs text-gray-500">Maintenance Fund</p>
                      <p className="text-lg font-bold text-purple-600">₹{eq.maintenanceFund.toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#1a4d2e] text-white rounded-xl text-sm font-semibold hover:bg-[#15401f] transition-colors">
                    <TrendingUp className="w-4 h-4" />
                    View Rental History
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-purple-300 text-purple-600 rounded-xl text-sm font-semibold hover:bg-purple-50 transition-colors">
                    <Wallet className="w-4 h-4" />
                    Withdraw for Repair
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 bg-purple-50 rounded-2xl p-5 border border-purple-200">
            <h3 className="font-bold text-[#1a4d2e] mb-3 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-purple-600" />
              Maintenance Fund Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Total Fund Balance", value: `₹${EQUIPMENT.reduce((s, e) => s + e.maintenanceFund, 0).toLocaleString("en-IN")}`, color: "text-purple-600" },
                { label: "This Month's Income", value: `₹${EQUIPMENT.reduce((s, e) => s + e.monthlyIncome, 0).toLocaleString("en-IN")}`, color: "text-green-600" },
                { label: "Routing Rate", value: "15%", color: "text-blue-600" },
                { label: "Total Equipment", value: EQUIPMENT.length.toString(), color: "text-[#1a4d2e]" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl p-3 text-center border border-purple-100">
                  <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                  <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// lucide MapPin used inline
function MapPin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
