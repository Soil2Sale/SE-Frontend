"use client";

import React, { useState } from "react";
import {
  BadgeDollarSign,
  Building2,
  TrendingDown,
  Shield,
  Leaf,
  Upload,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star,
  ChevronRight,
  Phone,
  FileText,
  Eye,
  EyeOff,
  Zap,
  Award,
  BarChart3,
  Camera,
} from "lucide-react";

// ── Mock Data ──────────────────────────────────────────────────────────────────

const LENDERS = [
  {
    id: "1",
    name: "NABARD Rural Credit",
    type: "NABARD-Linked Bank",
    apr: 7.2,
    emi: 2180,
    tenure: "12–60 months",
    maxAmount: 500000,
    minCibil: 650,
    rating: 4.7,
    eligible: true,
    badge: "Lowest APR",
    badgeColor: "bg-green-100 text-green-700",
    color: "from-green-50 to-emerald-50",
    border: "border-green-200",
  },
  {
    id: "2",
    name: "Grameen MFI Finance",
    type: "Micro-Finance Institution",
    apr: 9.5,
    emi: 2540,
    tenure: "6–36 months",
    maxAmount: 200000,
    minCibil: 600,
    rating: 4.3,
    eligible: true,
    badge: "No Collateral",
    badgeColor: "bg-blue-100 text-blue-700",
    color: "from-blue-50 to-sky-50",
    border: "border-blue-200",
  },
  {
    id: "3",
    name: "Kisan Credit Union",
    type: "NABARD-Linked Bank",
    apr: 8.1,
    emi: 2320,
    tenure: "12–48 months",
    maxAmount: 350000,
    minCibil: 620,
    rating: 4.5,
    eligible: true,
    badge: "Fast Disbursal",
    badgeColor: "bg-amber-100 text-amber-700",
    color: "from-amber-50 to-yellow-50",
    border: "border-amber-200",
  },
  {
    id: "4",
    name: "AgriBank MFI",
    type: "Micro-Finance Institution",
    apr: 11.2,
    emi: 2780,
    tenure: "3–24 months",
    maxAmount: 100000,
    minCibil: 580,
    rating: 3.9,
    eligible: false,
    badge: "Low CIBIL OK",
    badgeColor: "bg-purple-100 text-purple-700",
    color: "from-purple-50 to-violet-50",
    border: "border-purple-200",
  },
];

const GOLD_PROVIDERS = [
  { name: "Muthoot Agri Gold", rating: 4.8, maxLTV: 75, pincodesAvailable: true },
  { name: "IIFL Rural Gold", rating: 4.6, maxLTV: 70, pincodesAvailable: true },
  { name: "Manappuram Rural", rating: 4.4, maxLTV: 65, pincodesAvailable: false },
];

const CATTLE_INSURERS = [
  { name: "National Insurance (Cattle)", premium: "2.5%/yr", coverage: "Market Value", settlement: "72 hrs" },
  { name: "New India Assurance", premium: "2.8%/yr", coverage: "Purchase Value", settlement: "48 hrs" },
  { name: "Oriental Insurance", premium: "3.1%/yr", coverage: "Insured Value", settlement: "96 hrs" },
];

// ── Component ──────────────────────────────────────────────────────────────────

export default function CreditOffersPage() {
  const [yieldShareEnabled, setYieldShareEnabled] = useState(false);
  const [goldRequestOpen, setGoldRequestOpen] = useState(false);
  const [insuranceUploadOpen, setInsuranceUploadOpen] = useState(false);
  const [selectedInsurer, setSelectedInsurer] = useState<number | null>(null);
  const [goldForm, setGoldForm] = useState({ weight: "", pincode: "", phone: "" });
  const [sortBy, setSortBy] = useState<"apr" | "emi" | "amount">("apr");
  const [showEligibleOnly, setShowEligibleOnly] = useState(false);

  const sortedLenders = [...LENDERS]
    .filter((l) => !showEligibleOnly || l.eligible)
    .sort((a, b) => {
      if (sortBy === "apr") return a.apr - b.apr;
      if (sortBy === "emi") return a.emi - b.emi;
      return b.maxAmount - a.maxAmount;
    });

  const eligibleCount = LENDERS.filter((l) => l.eligible).length;
  const avgAPR = (LENDERS.reduce((s, l) => s + l.apr, 0) / LENDERS.length).toFixed(1);

  return (
    <div className="space-y-6">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-[#1a4d2e] to-[#15401f] rounded-3xl p-8 shadow-lg text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <BadgeDollarSign className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-1">Credit Offers</h1>
            <p className="text-green-100">
              Compare NABARD banks, MFIs, gold loans and livestock insurance in one place
            </p>
          </div>
        </div>

      </div>

      {/* ── Stats ────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="p-3 bg-green-100 rounded-xl w-fit mb-3">
            <Building2 className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Active Lenders</h3>
          <p className="text-3xl font-bold text-[#1a4d2e]">{LENDERS.length}</p>
          <p className="text-xs text-gray-400 mt-1">{eligibleCount} you're eligible for</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="p-3 bg-blue-100 rounded-xl w-fit mb-3">
            <TrendingDown className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Average APR</h3>
          <p className="text-3xl font-bold text-blue-600">{avgAPR}%</p>
          <p className="text-xs text-gray-400 mt-1">Lowest: 7.2% (NABARD)</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="p-3 bg-amber-100 rounded-xl w-fit mb-3">
            <Zap className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Gold Loan Partners</h3>
          <p className="text-3xl font-bold text-amber-600">{GOLD_PROVIDERS.length}</p>
          <p className="text-xs text-gray-400 mt-1">2 available in your area</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="p-3 bg-purple-100 rounded-xl w-fit mb-3">
            <Shield className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Insurance Quotes</h3>
          <p className="text-3xl font-bold text-purple-600">{CATTLE_INSURERS.length}</p>
          <p className="text-xs text-gray-400 mt-1">Livestock coverage options</p>
        </div>
      </div>

      {/* ── Yield History Sharing Banner ─────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[#dcfce7] to-[#bbf7d0] rounded-3xl p-6 border border-green-200 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#1a4d2e] rounded-xl">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-[#1a4d2e] text-lg">Share 3-Year Yield History</h2>
              <p className="text-[#2d6a4f] text-sm">
                Let lenders see your productivity track record — unlock lower interest rates
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-sm font-semibold ${yieldShareEnabled ? "text-green-700" : "text-gray-500"}`}>
              {yieldShareEnabled ? "Sharing Enabled" : "Not Sharing"}
            </span>
            <button
              onClick={() => setYieldShareEnabled(!yieldShareEnabled)}
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                yieldShareEnabled ? "bg-[#1a4d2e]" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${
                  yieldShareEnabled ? "translate-x-8" : "translate-x-1"
                }`}
              />
            </button>
            {yieldShareEnabled ? (
              <Eye className="w-5 h-5 text-green-600" />
            ) : (
              <EyeOff className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>
        {yieldShareEnabled && (
          <div className="mt-4 flex flex-wrap gap-2">
            {["FY 2023-24: 4.2 MT/acre", "FY 2022-23: 3.8 MT/acre", "FY 2021-22: 4.0 MT/acre"].map((yr) => (
              <span key={yr} className="px-3 py-1.5 bg-white/70 rounded-xl text-sm font-medium text-[#1a4d2e] border border-green-300">
                <CheckCircle className="w-3.5 h-3.5 inline mr-1 text-green-600" />
                {yr}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── Lender Comparison ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1a4d2e]">Credit Comparison</h2>
            <p className="text-gray-500 text-sm">Compare APR, EMI, and eligibility across NABARD banks & MFIs</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={showEligibleOnly}
                onChange={(e) => setShowEligibleOnly(e.target.checked)}
                className="accent-[#1a4d2e]"
              />
              Eligible only
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "apr" | "emi" | "amount")}
              className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
            >
              <option value="apr">Sort: Lowest APR</option>
              <option value="emi">Sort: Lowest EMI</option>
              <option value="amount">Sort: Max Amount</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {sortedLenders.map((lender, i) => (
            <div
              key={lender.id}
              className={`rounded-2xl p-5 border bg-gradient-to-r ${lender.color} ${lender.border} ${
                !lender.eligible ? "opacity-60" : ""
              }`}
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-white rounded-xl shadow-sm">
                    <Building2 className="w-5 h-5 text-[#1a4d2e]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-[#1a4d2e]">{lender.name}</h3>
                      {i === 0 && sortBy === "apr" && (
                        <span className="px-2 py-0.5 bg-green-600 text-white text-xs rounded-full font-semibold">
                          Best Rate
                        </span>
                      )}
                      <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${lender.badgeColor}`}>
                        {lender.badge}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{lender.type}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-medium text-gray-600">{lender.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-center">
                  <div className="min-w-[80px]">
                    <p className="text-xs text-gray-500 mb-1">APR</p>
                    <p className="text-2xl font-bold text-[#1a4d2e]">{lender.apr}%</p>
                  </div>
                  <div className="min-w-[80px]">
                    <p className="text-xs text-gray-500 mb-1">EMI / ₹1L</p>
                    <p className="text-xl font-bold text-gray-700">₹{lender.emi.toLocaleString("en-IN")}</p>
                  </div>
                  <div className="min-w-[80px]">
                    <p className="text-xs text-gray-500 mb-1">Max Amount</p>
                    <p className="text-xl font-bold text-gray-700">
                      ₹{(lender.maxAmount / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div className="min-w-[80px]">
                    <p className="text-xs text-gray-500 mb-1">Tenure</p>
                    <p className="text-sm font-semibold text-gray-700">{lender.tenure}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {lender.eligible ? (
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-[#1a4d2e] text-white rounded-xl font-semibold text-sm hover:bg-[#15401f] transition-colors">
                      Apply Now
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 px-5 py-2.5 bg-gray-200 text-gray-500 rounded-xl font-semibold text-sm cursor-not-allowed">
                      <AlertTriangle className="w-4 h-4" />
                      Ineligible
                    </div>
                  )}
                </div>
              </div>
              {!lender.eligible && (
                <p className="text-xs text-red-500 mt-2">
                  ⚠ Mismatch: Your CIBIL score is below the required {lender.minCibil} threshold.
                </p>
              )}
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-4">
          * All rates are provided directly by lenders. Last refreshed: {new Date().toLocaleDateString("en-IN")}. Rates refreshed every 24 hours.
        </p>
      </div>

      {/* ── Emergency Gold Loan ───────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1a4d2e] flex items-center gap-2">
              <Zap className="w-6 h-6 text-amber-500" />
              Emergency Gold Loan Appraisal
            </h2>
            <p className="text-gray-500 text-sm">
              Request a doorstep appraisal — confirmation within 24 hours
            </p>
          </div>
          <button
            onClick={() => setGoldRequestOpen(!goldRequestOpen)}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-colors"
          >
            <Zap className="w-4 h-4" />
            Request Doorstep Appraisal
          </button>
        </div>

        {/* Gold Provider Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {GOLD_PROVIDERS.map((gp) => (
            <div
              key={gp.name}
              className={`rounded-2xl p-5 border ${
                gp.pincodesAvailable ? "border-amber-200 bg-amber-50" : "border-gray-200 bg-gray-50 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Award className="w-5 h-5 text-amber-600" />
                </div>
                {gp.pincodesAvailable ? (
                  <span className="flex items-center gap-1 text-xs text-green-600 font-semibold">
                    <MapPin className="w-3.5 h-3.5" /> Available
                  </span>
                ) : (
                  <span className="text-xs text-gray-400">Not in area</span>
                )}
              </div>
              <h3 className="font-bold text-[#1a4d2e] text-sm mb-1">{gp.name}</h3>
              <p className="text-xs text-gray-500">Max LTV: {gp.maxLTV}% of gold value</p>
              <div className="flex items-center gap-1 mt-2">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-xs text-gray-600">{gp.rating}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Gold Request Form */}
        {goldRequestOpen && (
          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
            <h3 className="font-bold text-[#1a4d2e] mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Schedule Doorstep Appraisal
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Gold Weight (grams)</label>
                <input
                  type="number"
                  value={goldForm.weight}
                  onChange={(e) => setGoldForm({ ...goldForm, weight: e.target.value })}
                  placeholder="e.g. 50"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                <input
                  type="text"
                  value={goldForm.pincode}
                  onChange={(e) => setGoldForm({ ...goldForm, pincode: e.target.value })}
                  placeholder="e.g. 395001"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  value={goldForm.phone}
                  onChange={(e) => setGoldForm({ ...goldForm, phone: e.target.value })}
                  placeholder="+91 XXXXXXXXXX"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                />
              </div>
            </div>
            {goldForm.weight && (
              <div className="mt-4 p-4 bg-white rounded-xl border border-amber-300">
                <p className="text-sm font-semibold text-[#1a4d2e]">
                  Estimated Loan Value (pre-appraisal):{" "}
                  <span className="text-amber-600 text-lg">
                    ₹{(parseFloat(goldForm.weight || "0") * 5800 * 0.7).toLocaleString("en-IN")}
                  </span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Based on ₹5,800/gram at 70% LTV. Actual value confirmed during physical visit.
                </p>
              </div>
            )}
            <div className="flex gap-3 mt-4">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-[#1a4d2e] text-white rounded-xl font-semibold text-sm hover:bg-[#15401f] transition-colors">
                <Clock className="w-4 h-4" />
                Confirm Appointment
              </button>
              <button
                onClick={() => setGoldRequestOpen(false)}
                className="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-3 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" />
              Aadhaar masking applied to all documents. Service available in listed pincodes only.
            </p>
          </div>
        )}
      </div>

      {/* ── Livestock Insurance ───────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1a4d2e] flex items-center gap-2">
              <Shield className="w-6 h-6 text-purple-500" />
              Livestock Insurance
            </h2>
            <p className="text-gray-500 text-sm">
              Upload ear-tag photos for instant coverage quotes
            </p>
          </div>
          <button
            onClick={() => setInsuranceUploadOpen(!insuranceUploadOpen)}
            className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
          >
            <Camera className="w-4 h-4" />
            Upload Cattle Data
          </button>
        </div>

        {/* Insurance Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {CATTLE_INSURERS.map((ins, i) => (
            <div
              key={ins.name}
              onClick={() => setSelectedInsurer(i === selectedInsurer ? null : i)}
              className={`rounded-2xl p-5 border cursor-pointer transition-all ${
                selectedInsurer === i
                  ? "border-purple-400 bg-purple-50 shadow-md"
                  : "border-gray-200 hover:border-purple-200"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Leaf className="w-5 h-5 text-purple-600" />
                </div>
                {selectedInsurer === i && (
                  <CheckCircle className="w-5 h-5 text-purple-600 fill-purple-100" />
                )}
              </div>
              <h3 className="font-bold text-[#1a4d2e] text-sm mb-2">{ins.name}</h3>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Premium</span>
                  <span className="font-semibold text-purple-600">{ins.premium}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Coverage</span>
                  <span className="font-medium text-gray-700">{ins.coverage}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Settlement</span>
                  <span className="font-medium text-gray-700">{ins.settlement}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upload Panel */}
        {insuranceUploadOpen && (
          <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
            <h3 className="font-bold text-[#1a4d2e] mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Cattle Identification Data
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-purple-300 rounded-xl p-8 text-center cursor-pointer hover:bg-purple-100 transition-colors">
                <Camera className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                <p className="text-sm font-semibold text-[#1a4d2e]">Upload Cattle Photos</p>
                <p className="text-xs text-gray-400 mt-1">JPG/PNG, max 5MB per photo</p>
              </div>
              <div className="border-2 border-dashed border-purple-300 rounded-xl p-8 text-center cursor-pointer hover:bg-purple-100 transition-colors">
                <FileText className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                <p className="text-sm font-semibold text-[#1a4d2e]">Upload Ear-Tag Data</p>
                <p className="text-xs text-gray-400 mt-1">CSV or manual entry</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Cattle</label>
                <input
                  type="number"
                  placeholder="e.g. 5"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Breed Type</label>
                <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]">
                  <option>Holstein Friesian</option>
                  <option>Gir</option>
                  <option>Murrah Buffalo</option>
                  <option>Sahiwal</option>
                </select>
              </div>
            </div>
            <button className="mt-4 flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-xl font-semibold text-sm hover:bg-purple-700 transition-colors">
              <Zap className="w-4 h-4" />
              Get Instant Quote
            </button>
          </div>
        )}

        {selectedInsurer !== null && (
          <div className="mt-4 p-4 bg-white border border-purple-200 rounded-2xl flex items-center justify-between">
            <div>
              <p className="font-semibold text-[#1a4d2e]">
                Selected: {CATTLE_INSURERS[selectedInsurer].name}
              </p>
              <p className="text-sm text-gray-500">
                Premium: {CATTLE_INSURERS[selectedInsurer].premium} · Settlement: {CATTLE_INSURERS[selectedInsurer].settlement}
              </p>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#1a4d2e] text-white rounded-xl font-semibold text-sm hover:bg-[#15401f] transition-colors">
              <Phone className="w-4 h-4" />
              Apply for Coverage
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
