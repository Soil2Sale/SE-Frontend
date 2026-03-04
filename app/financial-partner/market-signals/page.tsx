"use client";

import React, { useState } from "react";
import {
  LineChart,
  Calculator,
  Bell,
  Droplets,
  TrendingUp,
  TrendingDown,
  MapPin,
  Tag,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Fuel,
  Users,
  Clock,
  Star,
  Info,
  Leaf,
  BarChart2,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

// ── Mock Data ──────────────────────────────────────────────────────────────────

const MANDI_PRICES = [
  { mandi: "Surat APMC", crop: "Cotton", price: 6220, change: +120, state: "Gujarat", distance: 45 },
  { mandi: "Ahmedabad APMC", crop: "Cotton", price: 6350, change: +85, state: "Gujarat", distance: 112 },
  { mandi: "Rajkot APMC", crop: "Groundnut", price: 5870, change: -40, state: "Gujarat", distance: 188 },
  { mandi: "Pune APMC", crop: "Cotton", price: 6180, change: +210, state: "Maharashtra", distance: 542 },
  { mandi: "Nagpur APMC", crop: "Soybean", price: 4950, change: +65, state: "Maharashtra", distance: 680 },
  { mandi: "Indore APMC", crop: "Wheat", price: 2150, change: -30, state: "M.P.", distance: 520 },
];

const SUBSIDIES = [
  {
    id: "S1",
    name: "PM Drip Irrigation Subsidy",
    benefit: "55% subsidy on drip/sprinkler irrigation",
    deadline: "2026-05-31",
    state: "Gujarat",
    category: "Irrigation",
    urgency: "high",
    steps: ["Visit e-krishi portal", "Upload land records", "Submit bank details"],
  },
  {
    id: "S2",
    name: "Tractor Purchase Subsidy (SC/ST)",
    benefit: "₹1,00,000 subsidy on new tractor",
    deadline: "2026-06-15",
    state: "Gujarat",
    category: "Machinery",
    urgency: "medium",
    steps: ["Apply through district agriculture office", "Attach caste certificate", "Await inspection"],
  },
  {
    id: "S3",
    name: "Pradhan Mantri Fasal Bima Yojana",
    benefit: "Crop insurance at 1.5-2% premium",
    deadline: "2026-04-30",
    state: "All States",
    category: "Insurance",
    urgency: "medium",
    steps: ["Register on PMFBY portal", "Select crop and season", "Pay subsidised premium"],
  },
  {
    id: "S4",
    name: "Soil Health Card Scheme",
    benefit: "Free soil testing + fertilizer advisory",
    deadline: "Ongoing",
    state: "All States",
    category: "Advisory",
    urgency: "low",
    steps: ["Contact nearest KVK", "Submit soil sample", "Receive health card in 30 days"],
  },
];

const QUALITY_STANDARDS = [
  { crop: "Cotton", unit: "%", optimalMin: 0, optimalMax: 8, label: "Moisture %", bonusRate: 120, deductRate: 180 },
  { crop: "Wheat", unit: "%", optimalMin: 0, optimalMax: 12, label: "Moisture %", bonusRate: 80, deductRate: 100 },
  { crop: "Soybean", unit: "%", optimalMin: 0, optimalMax: 13, label: "Moisture %", bonusRate: 60, deductRate: 90 },
];

// ── Component ──────────────────────────────────────────────────────────────────

export default function MarketSignalsPage() {
  // Profitability Calculator state
  const [calcCrop, setCalcCrop] = useState("Cotton");
  const [calcMandiIdx, setCalcMandiIdx] = useState(0);
  const [calcQty, setCalcQty] = useState(100);
  const [calcFuel, setCalcFuel] = useState(2500);
  const [calcLabor, setCalcLabor] = useState(1500);
  const [calcOther, setCalcOther] = useState(500);

  // Subsidy state
  const [expandedSubsidy, setExpandedSubsidy] = useState<string | null>(null);

  // Quality Adjustment state
  const [qaCrop, setQaCrop] = useState(0);
  const [qaMoisture, setQaMoisture] = useState(10);
  const [qaBasePrice, setQaBasePrice] = useState(6200);
  const [qaQty, setQaQty] = useState(50);

  // Profitability Calculation
  const filteredMandis = MANDI_PRICES.filter((m) => m.crop === calcCrop);
  const selectedMandi = filteredMandis[calcMandiIdx] || filteredMandis[0];
  const grossRevenue = selectedMandi ? selectedMandi.price * calcQty : 0;
  const platformFee = grossRevenue * 0.02;
  const mandiTax = grossRevenue * 0.01;
  const distanceFuel = calcFuel + (selectedMandi ? selectedMandi.distance * 5 : 0);
  const totalCost = distanceFuel + calcLabor + calcOther + platformFee + mandiTax;
  const netProfit = grossRevenue - totalCost;
  const breakEven = calcQty > 0 ? totalCost / calcQty : 0;
  const isGoDecision = netProfit > 0 && netProfit / grossRevenue > 0.1;

  // Quality Adjustment Calculation
  const selectedQA = QUALITY_STANDARDS[qaCrop];
  const isOptimalMoisture = qaMoisture <= selectedQA.optimalMax;
  const moistureDiff = Math.abs(qaMoisture - selectedQA.optimalMax);
  const adjustment = isOptimalMoisture
    ? moistureDiff === 0
      ? 0
      : selectedQA.bonusRate * moistureDiff
    : -selectedQA.deductRate * moistureDiff;
  const adjustedPrice = qaBasePrice + adjustment;
  const totalAdjustedRevenue = adjustedPrice * qaQty;

  const uniqueCrops = Array.from(new Set(MANDI_PRICES.map((m) => m.crop)));

  return (
    <div className="space-y-6">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-[#1a4d2e] to-[#15401f] rounded-3xl p-8 shadow-lg text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <LineChart className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-1">Market Signals</h1>
            <p className="text-green-100">
              Profitability calculator, real-time Mandi prices, subsidies, and quality-based adjustments
            </p>
          </div>
        </div>

      </div>

      {/* ── Stats ────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="p-3 bg-green-100 rounded-xl w-fit mb-3">
            <Activity className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Live Mandis</h3>
          <p className="text-3xl font-bold text-[#1a4d2e]">{MANDI_PRICES.length}</p>
          <p className="text-xs text-gray-400 mt-1">Updated {new Date().toLocaleTimeString("en-IN")}</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="p-3 bg-blue-100 rounded-xl w-fit mb-3">
            <Bell className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Eligible Subsidies</h3>
          <p className="text-3xl font-bold text-blue-600">{SUBSIDIES.length}</p>
          <p className="text-xs text-gray-400 mt-1">{SUBSIDIES.filter((s) => s.urgency === "high").length} ending soon</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="p-3 bg-amber-100 rounded-xl w-fit mb-3">
            <TrendingUp className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Avg Price Trend</h3>
          <p className="text-3xl font-bold text-amber-600">+₹82</p>
          <p className="text-xs text-green-500 mt-1">↑ vs last week</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="p-3 bg-purple-100 rounded-xl w-fit mb-3">
            <Calculator className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Net Profit (Calc)</h3>
          <p className={`text-3xl font-bold ${netProfit >= 0 ? "text-green-600" : "text-red-500"}`}>
            {netProfit >= 0 ? "+" : ""}₹{Math.round(netProfit).toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-gray-400 mt-1">from current inputs</p>
        </div>
      </div>

      {/* ── Mandi Price Ticker ───────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-[#1a4d2e] mb-4 flex items-center gap-2">
          <BarChart2 className="w-6 h-6" />
          Live Mandi Prices
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {MANDI_PRICES.map((m, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-green-200 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#1a4d2e]" />
                  <span className="font-bold text-[#1a4d2e] text-sm">{m.crop}</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{m.mandi}, {m.state}</p>
                <p className="text-xs text-gray-400">
                  <MapPin className="w-3 h-3 inline" /> {m.distance} km away
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-[#1a4d2e]">₹{m.price.toLocaleString("en-IN")}</p>
                <div className={`flex items-center gap-1 justify-end text-xs font-semibold ${m.change >= 0 ? "text-green-600" : "text-red-500"}`}>
                  {m.change >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  ₹{Math.abs(m.change)} today
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4 flex items-center gap-1">
          <Info className="w-3.5 h-3.5" />
          Offline cached prices available as fallback. Data is for advisory purposes only — no financial guarantees.
        </p>
      </div>

      {/* ── Profitability Calculator ─────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-[#1a4d2e] mb-2 flex items-center gap-2">
          <Calculator className="w-6 h-6" />
          Mandi Profitability Calculator
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Enter your costs to find out if selling at a distant Mandi is profitable
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Crop</label>
                <select
                  value={calcCrop}
                  onChange={(e) => { setCalcCrop(e.target.value); setCalcMandiIdx(0); }}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                >
                  {uniqueCrops.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Mandi</label>
                <select
                  value={calcMandiIdx}
                  onChange={(e) => setCalcMandiIdx(Number(e.target.value))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                >
                  {filteredMandis.map((m, i) => (
                    <option key={i} value={i}>{m.mandi} ({m.distance} km)</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity (quintals): <strong>{calcQty}</strong>
              </label>
              <input
                type="range"
                min={10}
                max={500}
                step={10}
                value={calcQty}
                onChange={(e) => setCalcQty(Number(e.target.value))}
                className="w-full accent-[#1a4d2e]"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1"><span>10 qtl</span><span>500 qtl</span></div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Fuel Cost (₹)", icon: Fuel, value: calcFuel, setter: setCalcFuel },
                { label: "Labor Cost (₹)", icon: Users, value: calcLabor, setter: setCalcLabor },
                { label: "Other Costs (₹)", icon: Tag, value: calcOther, setter: setCalcOther },
              ].map(({ label, icon: Icon, value, setter }) => (
                <div key={label}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                  <div className="relative">
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => setter(Number(e.target.value))}
                      className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Result Panel */}
          <div className={`rounded-2xl p-6 border ${isGoDecision ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-xl ${isGoDecision ? "bg-green-600" : "bg-red-500"}`}>
                {isGoDecision ? (
                  <CheckCircle className="w-6 h-6 text-white" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <p className="text-sm text-gray-600">Decision</p>
                <p className={`text-2xl font-bold ${isGoDecision ? "text-green-700" : "text-red-600"}`}>
                  {isGoDecision ? "✓ GO — Profitable" : "✗ NO-GO — Loss Risk"}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {[
                { label: "Gross Revenue", value: `₹${Math.round(grossRevenue).toLocaleString("en-IN")}`, color: "text-[#1a4d2e]" },
                { label: "Platform Fee (2%)", value: `-₹${Math.round(platformFee).toLocaleString("en-IN")}`, color: "text-gray-600" },
                { label: "Mandi Tax (1%)", value: `-₹${Math.round(mandiTax).toLocaleString("en-IN")}`, color: "text-gray-600" },
                { label: "Transport (fuel+distance)", value: `-₹${Math.round(distanceFuel).toLocaleString("en-IN")}`, color: "text-gray-600" },
                { label: "Labor & Other", value: `-₹${(calcLabor + calcOther).toLocaleString("en-IN")}`, color: "text-gray-600" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between text-sm">
                  <span className="text-gray-500">{row.label}</span>
                  <span className={`font-semibold ${row.color}`}>{row.value}</span>
                </div>
              ))}
              <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between">
                <span className="font-bold text-[#1a4d2e]">Net Profit</span>
                <span className={`font-bold text-xl ${netProfit >= 0 ? "text-green-600" : "text-red-500"}`}>
                  {netProfit >= 0 ? "+" : ""}₹{Math.round(netProfit).toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Break-even price</span>
                <span className="font-semibold text-amber-600">₹{Math.round(breakEven).toLocaleString("en-IN")}/qtl</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Mandi price</span>
                <span className="font-semibold text-[#1a4d2e]">₹{selectedMandi?.price.toLocaleString("en-IN")}/qtl</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              Advisory tool only. All cost inputs are editable for your specific scenario.
            </p>
          </div>
        </div>
      </div>

      {/* ── Subsidy Notifications ────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1a4d2e] flex items-center gap-2">
              <Bell className="w-6 h-6 text-blue-500" />
              Eligible Subsidies for You
            </h2>
            <p className="text-gray-500 text-sm">
              Based on your land size and location — step-by-step application guide
            </p>
          </div>
          <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-xl text-sm font-semibold">
            {SUBSIDIES.length} matched
          </span>
        </div>

        <div className="space-y-3">
          {SUBSIDIES.map((sub) => (
            <div
              key={sub.id}
              className={`rounded-2xl border transition-all ${
                sub.urgency === "high"
                  ? "border-red-200 bg-red-50"
                  : sub.urgency === "medium"
                  ? "border-amber-200 bg-amber-50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <button
                className="w-full px-5 py-4 flex items-center justify-between text-left"
                onClick={() => setExpandedSubsidy(expandedSubsidy === sub.id ? null : sub.id)}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg mt-0.5 ${
                      sub.urgency === "high" ? "bg-red-100" : sub.urgency === "medium" ? "bg-amber-100" : "bg-gray-100"
                    }`}
                  >
                    <Leaf
                      className={`w-4 h-4 ${
                        sub.urgency === "high" ? "text-red-500" : sub.urgency === "medium" ? "text-amber-500" : "text-gray-500"
                      }`}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-[#1a4d2e]">{sub.name}</h3>
                      {sub.urgency === "high" && (
                        <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-semibold">
                          Ending Soon
                        </span>
                      )}
                      <span className="px-2 py-0.5 bg-white border text-xs rounded-full text-gray-600">
                        {sub.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-0.5">{sub.benefit}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      Deadline: {sub.deadline} · {sub.state}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    expandedSubsidy === sub.id ? "rotate-90" : ""
                  }`}
                />
              </button>

              {expandedSubsidy === sub.id && (
                <div className="px-5 pb-5">
                  <h4 className="font-semibold text-[#1a4d2e] mb-2 text-sm">Application Steps:</h4>
                  <ol className="space-y-2">
                    {sub.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#1a4d2e] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-sm text-gray-600">{step}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="flex gap-3 mt-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1a4d2e] text-white rounded-xl text-sm font-semibold hover:bg-[#15401f] transition-colors">
                      <Star className="w-4 h-4" />
                      Apply Now
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
                      <Bell className="w-4 h-4" />
                      Set Reminder
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-3">
                    Information is purely advisory. Approval depends on government data sources. Available in Hindi, Gujarati, Marathi, and Telugu.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Quality-Based Price Adjustment ──────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-[#1a4d2e] mb-2 flex items-center gap-2">
          <Droplets className="w-6 h-6 text-blue-500" />
          Quality-Based Price Adjustment Simulator
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          See how moisture readings affect your final price before delivery
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Crop</label>
                <select
                  value={qaCrop}
                  onChange={(e) => setQaCrop(Number(e.target.value))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                >
                  {QUALITY_STANDARDS.map((s, i) => <option key={i} value={i}>{s.crop}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (₹/qtl)</label>
                <input
                  type="number"
                  value={qaBasePrice}
                  onChange={(e) => setQaBasePrice(Number(e.target.value))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Moisture Reading: <strong className={qaMoisture > selectedQA.optimalMax ? "text-red-500" : "text-green-600"}>{qaMoisture}%</strong>
              </label>
              <input
                type="range"
                min={0}
                max={25}
                step={0.5}
                value={qaMoisture}
                onChange={(e) => setQaMoisture(Number(e.target.value))}
                className="w-full accent-[#1a4d2e]"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0%</span>
                <span className="text-green-600">Optimal ≤{selectedQA.optimalMax}%</span>
                <span>25%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity (quintals): <strong>{qaQty}</strong>
              </label>
              <input
                type="range"
                min={10}
                max={200}
                step={5}
                value={qaQty}
                onChange={(e) => setQaQty(Number(e.target.value))}
                className="w-full accent-[#1a4d2e]"
              />
            </div>

            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 text-sm">
              <p className="font-semibold text-blue-700 mb-1">
                Standard for {selectedQA.crop}: moisture ≤{selectedQA.optimalMax}%
              </p>
              <p className="text-blue-600">
                Bonus: +₹{selectedQA.bonusRate}/qtl per % below threshold |{" "}
                Deduction: -₹{selectedQA.deductRate}/qtl per % above threshold
              </p>
            </div>
          </div>

          {/* Adjustment Result */}
          <div className={`rounded-2xl p-6 border ${adjustment >= 0 ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
            <h3 className="font-bold text-[#1a4d2e] mb-4">Price Adjustment Result</h3>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Base price</span>
                <span className="font-semibold">₹{qaBasePrice.toLocaleString("en-IN")}/qtl</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Moisture reading</span>
                <span className={`font-semibold ${qaMoisture > selectedQA.optimalMax ? "text-red-500" : "text-green-600"}`}>
                  {qaMoisture}% ({qaMoisture > selectedQA.optimalMax ? "above" : "within"} standard)
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Price adjustment</span>
                <span className={`font-bold text-lg ${adjustment >= 0 ? "text-green-600" : "text-red-500"}`}>
                  {adjustment >= 0 ? "+" : ""}₹{Math.round(adjustment).toLocaleString("en-IN")}/qtl
                </span>
              </div>
              <div className="border-t border-gray-300 pt-2 flex justify-between">
                <span className="font-bold text-[#1a4d2e]">Adjusted Price</span>
                <span className="font-bold text-xl text-[#1a4d2e]">₹{Math.round(adjustedPrice).toLocaleString("en-IN")}/qtl</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-bold text-gray-700">Total Revenue ({qaQty} qtl)</span>
                <span className={`font-bold text-lg ${totalAdjustedRevenue >= qaBasePrice * qaQty ? "text-green-600" : "text-red-500"}`}>
                  ₹{Math.round(totalAdjustedRevenue).toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className={`mt-4 p-3 rounded-xl text-sm font-medium ${adjustment >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {adjustment >= 0
                ? "✓ Your crop is within quality standards — bonus applied"
                : `⚠ Moisture is ${(qaMoisture - selectedQA.optimalMax).toFixed(1)}% above standard — price deducted. Consider drying before delivery.`}
            </div>

            <p className="text-xs text-gray-400 mt-3">
              All quality logs are immutable after entry. Only timestamped uploads accepted. Dispute escalation available if contested.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


