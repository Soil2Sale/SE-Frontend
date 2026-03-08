"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  BadgeDollarSign,
  Building2,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  Search,
  X,
  User,
  Calendar,
  Percent,
  IndianRupee,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  Loader2,
  BarChart3,
  Filter,
  TrendingUp,
} from "lucide-react";
import apiClient from "@/services/apiClient";

// -- Types ----------------------------------------------------------------------

type LoanType =
  | "KCC"
  | "BNPL"
  | "REQUIREMENT_LOAN"
  | "EQUIPMENT_LOAN"
  | "EMERGENCY_LOAN"
  | "INSURANCE_PREMIUM";

interface FarmerRef {
  id?: string;
  _id?: string;
  name?: string;
  email?: string;
}

interface CreditOffer {
  id: string;
  financial_partner_id: string;
  farmer_user_id: FarmerRef | string;
  loan_type: LoanType;
  interest_rate: number;
  max_amount: number;
  created_at: string;
}

interface OfferFormData {
  farmer_user_id: string;
  loan_type: LoanType;
  interest_rate: string;
  max_amount: string;
}

// -- Constants ------------------------------------------------------------------

const LOAN_TYPE_LABELS: Record<LoanType, string> = {
  KCC: "Kisan Credit Card",
  BNPL: "Buy Now Pay Later",
  REQUIREMENT_LOAN: "Requirement Loan",
  EQUIPMENT_LOAN: "Equipment Loan",
  EMERGENCY_LOAN: "Emergency Loan",
  INSURANCE_PREMIUM: "Insurance Premium",
};

const LOAN_TYPE_COLORS: Record<LoanType, string> = {
  KCC: "bg-green-100 text-green-700",
  BNPL: "bg-blue-100 text-blue-700",
  REQUIREMENT_LOAN: "bg-amber-100 text-amber-700",
  EQUIPMENT_LOAN: "bg-orange-100 text-orange-700",
  EMERGENCY_LOAN: "bg-red-100 text-red-700",
  INSURANCE_PREMIUM: "bg-purple-100 text-purple-700",
};

const ALL_LOAN_TYPES: LoanType[] = [
  "KCC",
  "BNPL",
  "REQUIREMENT_LOAN",
  "EQUIPMENT_LOAN",
  "EMERGENCY_LOAN",
  "INSURANCE_PREMIUM",
];

const DEMO_OFFERS: CreditOffer[] = [
  {
    id: "co-001",
    financial_partner_id: "fp-001",
    farmer_user_id: { name: "Ravi Sharma", email: "ravi.sharma@example.com" },
    loan_type: "KCC",
    interest_rate: 7.5,
    max_amount: 300000,
    created_at: "2026-01-15T10:00:00Z",
  },
  {
    id: "co-002",
    financial_partner_id: "fp-001",
    farmer_user_id: { name: "Priya Patel", email: "priya.patel@example.com" },
    loan_type: "EQUIPMENT_LOAN",
    interest_rate: 9.2,
    max_amount: 150000,
    created_at: "2026-02-03T08:30:00Z",
  },
  {
    id: "co-003",
    financial_partner_id: "fp-001",
    farmer_user_id: { name: "Mohan Reddy", email: "mohan.reddy@example.com" },
    loan_type: "EMERGENCY_LOAN",
    interest_rate: 11.0,
    max_amount: 75000,
    created_at: "2026-02-20T14:00:00Z",
  },
  {
    id: "co-004",
    financial_partner_id: "fp-001",
    farmer_user_id: { name: "Sunita Devi", email: "sunita.devi@example.com" },
    loan_type: "BNPL",
    interest_rate: 8.5,
    max_amount: 50000,
    created_at: "2026-03-01T09:00:00Z",
  },
];

// -- Helpers --------------------------------------------------------------------

function farmerName(ref: CreditOffer["farmer_user_id"]): string {
  if (!ref) return "—";
  if (typeof ref === "string") return ref;
  return ref.name || ref.id || ref._id || "Unknown";
}

function farmerEmail(ref: CreditOffer["farmer_user_id"]): string {
  if (!ref || typeof ref === "string") return "";
  return ref.email || "";
}

// -- Component ------------------------------------------------------------------

const EMPTY_FORM: OfferFormData = {
  farmer_user_id: "",
  loan_type: "KCC",
  interest_rate: "",
  max_amount: "",
};

export default function CreditOffersPage() {
  const [offers, setOffers] = useState<CreditOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<LoanType | "ALL">("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<CreditOffer | null>(null);
  const [form, setForm] = useState<OfferFormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // -- Data Loading ------------------------------------------------------------

  const loadOffers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.get<{ success: boolean; data: CreditOffer[] }>(
        "/credit-offers/partner"
      );
      const data = res.data?.data;
      setOffers(Array.isArray(data) && data.length > 0 ? data : DEMO_OFFERS);
    } catch {
      setOffers(DEMO_OFFERS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOffers();
  }, [loadOffers]);

  // -- Derived Stats -----------------------------------------------------------

  const totalExposure = offers.reduce((s, o) => s + o.max_amount, 0);
  const avgRate =
    offers.length > 0
      ? (offers.reduce((s, o) => s + o.interest_rate, 0) / offers.length).toFixed(1)
      : "—";

  const typeCounts = ALL_LOAN_TYPES.reduce(
    (acc, t) => ({ ...acc, [t]: offers.filter((o) => o.loan_type === t).length }),
    {} as Record<LoanType, number>
  );

  const topType =
    ALL_LOAN_TYPES.reduce(
      (best, t) => (typeCounts[t] > (typeCounts[best] || 0) ? t : best),
      "KCC" as LoanType
    );

  // -- Filtered List -----------------------------------------------------------

  const filteredOffers = offers.filter((o) => {
    const q = search.toLowerCase();
    const nameMatch = farmerName(o.farmer_user_id).toLowerCase().includes(q);
    const emailMatch = farmerEmail(o.farmer_user_id).toLowerCase().includes(q);
    const typeMatch = filterType === "ALL" || o.loan_type === filterType;
    return (nameMatch || emailMatch || !q) && typeMatch;
  });

  // -- Modal Helpers -----------------------------------------------------------

  function openCreate() {
    setEditingOffer(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setModalOpen(true);
  }

  function openEdit(offer: CreditOffer) {
    setEditingOffer(offer);
    setForm({
      farmer_user_id:
        typeof offer.farmer_user_id === "string"
          ? offer.farmer_user_id
          : offer.farmer_user_id?.id || offer.farmer_user_id?._id || "",
      loan_type: offer.loan_type,
      interest_rate: String(offer.interest_rate),
      max_amount: String(offer.max_amount),
    });
    setFormError(null);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingOffer(null);
    setForm(EMPTY_FORM);
    setFormError(null);
  }

  // -- Save (Create / Update) --------------------------------------------------

  async function handleSave() {
    if (!form.farmer_user_id.trim()) {
      setFormError("Farmer User ID is required.");
      return;
    }
    const rate = parseFloat(form.interest_rate);
    const amount = parseFloat(form.max_amount);
    if (isNaN(rate) || rate < 0) {
      setFormError("Interest rate must be a non-negative number.");
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      setFormError("Max amount must be a positive number.");
      return;
    }

    setSaving(true);
    setFormError(null);

    try {
      const payload = {
        farmer_user_id: form.farmer_user_id.trim(),
        loan_type: form.loan_type,
        interest_rate: rate,
        max_amount: amount,
      };

      if (editingOffer) {
        await apiClient.put(`/credit-offers/${editingOffer.id}`, payload);
        setOffers((prev) =>
          prev.map((o) =>
            o.id === editingOffer.id
              ? { ...o, loan_type: form.loan_type, interest_rate: rate, max_amount: amount }
              : o
          )
        );
      } else {
        const res = await apiClient.post<{ success: boolean; data: CreditOffer }>(
          "/credit-offers/",
          payload
        );
        const created = res.data?.data;
        if (created) setOffers((prev) => [created, ...prev]);
      }
      closeModal();
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Failed to save. Please try again.";
      setFormError(msg);
    } finally {
      setSaving(false);
    }
  }

  // -- Delete ------------------------------------------------------------------

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await apiClient.delete(`/credit-offers/${deleteId}`);
      setOffers((prev) => prev.filter((o) => o.id !== deleteId));
    } catch {
      // silently keep list intact
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  }

  // -- Render ------------------------------------------------------------------

  return (
    <div className="space-y-6">
      {/* -- Header ------------------------------------------------------------ */}
      <div className="bg-gradient-to-br from-[#1a4d2e] to-[#15401f] rounded-3xl p-8 shadow-lg text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <BadgeDollarSign className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">Credit Offers</h1>
              <p className="text-green-100">
                Manage the loan offers you have extended to farmers – create, update, and track them
              </p>
            </div>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-6 py-3 bg-white text-[#1a4d2e] rounded-2xl font-bold text-sm hover:bg-green-50 transition-colors shadow-sm self-start md:self-auto"
          >
            <Plus className="w-5 h-5" />
            New Credit Offer
          </button>
        </div>
      </div>

      {/* -- Stats -------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="p-3 bg-green-100 rounded-xl w-fit mb-3">
            <Building2 className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Total Offers Issued</h3>
          <p className="text-3xl font-bold text-[#1a4d2e]">{offers.length}</p>
          <p className="text-xs text-gray-400 mt-1">across all loan types</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="p-3 bg-blue-100 rounded-xl w-fit mb-3">
            <IndianRupee className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Total Credit Extended</h3>
          <p className="text-3xl font-bold text-blue-600">
            ₹{(totalExposure / 100000).toFixed(1)}L
          </p>
          <p className="text-xs text-gray-400 mt-1">max amount across offers</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="p-3 bg-amber-100 rounded-xl w-fit mb-3">
            <Percent className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Avg Interest Rate</h3>
          <p className="text-3xl font-bold text-amber-600">{avgRate}%</p>
          <p className="text-xs text-gray-400 mt-1">weighted across all offers</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="p-3 bg-purple-100 rounded-xl w-fit mb-3">
            <BarChart3 className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Top Loan Type</h3>
          <p className="text-xl font-bold text-purple-600 mt-1">
            {LOAN_TYPE_LABELS[topType]}
          </p>
          <p className="text-xs text-gray-400 mt-1">{typeCounts[topType]} offers issued</p>
        </div>
      </div>

      {/* -- Loan Type Breakdown ------------------------------------------------ */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-[#1a4d2e] mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Offers by Loan Type
        </h2>
        <div className="flex flex-wrap gap-3">
          {ALL_LOAN_TYPES.map((t) => (
            <div
              key={t}
              className={`px-4 py-2.5 rounded-xl border text-sm font-medium flex items-center gap-2 ${LOAN_TYPE_COLORS[t]} border-transparent`}
            >
              <span>{LOAN_TYPE_LABELS[t]}</span>
              <span className="font-bold">{typeCounts[t]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* -- Offers Table ------------------------------------------------------- */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-[#1a4d2e]">My Credit Offers</h2>
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search farmer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4d2e] w-full md:w-56"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            {/* Filter by type */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as LoanType | "ALL")}
                className="pl-9 pr-8 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a4d2e] appearance-none"
              >
                <option value="ALL">All Types</option>
                {ALL_LOAN_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {LOAN_TYPE_LABELS[t]}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            {/* Refresh */}
            <button
              onClick={loadOffers}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-[#1a4d2e]" />
          </div>
        ) : error ? (
          <div className="flex items-center gap-3 p-4 bg-red-50 rounded-2xl text-red-600">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        ) : filteredOffers.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <BadgeDollarSign className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-semibold">No offers found</p>
            <p className="text-sm mt-1">Try adjusting your filters or create a new offer</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredOffers.map((offer) => (
              <div
                key={offer.id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl border border-gray-100 hover:border-green-200 hover:bg-green-50/30 transition-all"
              >
                {/* Farmer Info */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2.5 bg-green-100 rounded-xl flex-shrink-0">
                    <User className="w-5 h-5 text-[#1a4d2e]" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-[#1a4d2e] truncate">
                      {farmerName(offer.farmer_user_id)}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {farmerEmail(offer.farmer_user_id) || offer.id}
                    </p>
                  </div>
                </div>

                {/* Loan Type */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${LOAN_TYPE_COLORS[offer.loan_type]}`}
                >
                  {LOAN_TYPE_LABELS[offer.loan_type]}
                </span>

                {/* Rate & Amount */}
                <div className="flex gap-6">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Interest Rate</p>
                    <p className="font-bold text-[#1a4d2e]">{offer.interest_rate}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Max Amount</p>
                    <p className="font-bold text-[#1a4d2e]">
                      ₹{offer.max_amount.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center gap-1.5 text-xs text-gray-400 flex-shrink-0">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(offer.created_at).toLocaleDateString("en-IN")}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => openEdit(offer)}
                    className="p-2 rounded-xl text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    title="Edit offer"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteId(offer.id)}
                    className="p-2 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                    title="Delete offer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredOffers.length > 0 && (
          <p className="text-xs text-gray-400 mt-4">
            Showing {filteredOffers.length} of {offers.length} offers
          </p>
        )}
      </div>

      {/* -- Create / Edit Modal ------------------------------------------------ */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#1a4d2e]">
                {editingOffer ? "Edit Credit Offer" : "New Credit Offer"}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Farmer User ID */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Farmer User ID <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={form.farmer_user_id}
                    onChange={(e) => setForm({ ...form, farmer_user_id: e.target.value })}
                    placeholder="Enter farmer's user ID"
                    className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                    disabled={!!editingOffer}
                  />
                </div>
                {editingOffer && (
                  <p className="text-xs text-gray-400 mt-1">Farmer cannot be changed on an existing offer.</p>
                )}
              </div>

              {/* Loan Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Loan Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={form.loan_type}
                    onChange={(e) => setForm({ ...form, loan_type: e.target.value as LoanType })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a4d2e] appearance-none"
                  >
                    {ALL_LOAN_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {LOAN_TYPE_LABELS[t]}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Interest Rate & Max Amount */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Interest Rate (%) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      min={0}
                      step={0.1}
                      value={form.interest_rate}
                      onChange={(e) => setForm({ ...form, interest_rate: e.target.value })}
                      placeholder="e.g. 8.5"
                      className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Max Amount (₹) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      min={0}
                      step={1000}
                      value={form.max_amount}
                      onChange={(e) => setForm({ ...form, max_amount: e.target.value })}
                      placeholder="e.g. 200000"
                      className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                    />
                  </div>
                </div>
              </div>

              {/* Preview badge */}
              {form.loan_type && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${LOAN_TYPE_COLORS[form.loan_type]}`}>
                    {LOAN_TYPE_LABELS[form.loan_type]}
                  </span>
                  {form.interest_rate && (
                    <span className="text-sm text-gray-600">
                      {form.interest_rate}% p.a.
                    </span>
                  )}
                  {form.max_amount && !isNaN(parseFloat(form.max_amount)) && (
                    <span className="text-sm font-semibold text-[#1a4d2e]">
                      up to ₹{parseFloat(form.max_amount).toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              )}

              {/* Error */}
              {formError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 rounded-xl text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {formError}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 pt-0">
              <button
                onClick={closeModal}
                className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-3 bg-[#1a4d2e] text-white rounded-xl font-semibold text-sm hover:bg-[#15401f] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving…
                  </>
                ) : editingOffer ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Create Offer
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -- Delete Confirmation ------------------------------------------------ */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center">
            <div className="p-4 bg-red-100 rounded-2xl w-fit mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Offer?</h3>
            <p className="text-gray-500 text-sm mb-6">
              This credit offer will be permanently removed. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-semibold text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-3 bg-red-600 text-white rounded-xl font-semibold text-sm hover:bg-red-700 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting…
                  </>
                ) : (
                  "Yes, Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
