"use client";

import React, { useState } from "react";
import {
  AlertCircle,
  HelpCircle,
  Bell,
  MessageCircle,
  Phone,
  Mail,
  FileText,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  BadgeDollarSign,
  PiggyBank,
  LineChart,
  ExternalLink,
  Shield,
  Clock,
  Info,
  Send,
} from "lucide-react";

// ── Mock Data ──────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    question: "How does Buy Now Pay Later (BNPL) repayment work?",
    answer:
      "BNPL repayment is automatically deducted from your crop sale settlement. When a sale is processed, the outstanding BNPL amount is deducted before the net payout reaches your wallet. You can view your repayment schedule and balance at any time on the BNPL Loans page. The system will block new BNPL services if your risk threshold is exceeded.",
  },
  {
    question: "How do I compare interest rates from NABARD banks and MFIs?",
    answer:
      "Go to the Credit Offers page to see a live comparison of all available lenders. Rates are provided directly by lending partners and refreshed every 24 hours. You can sort by APR, EMI, or maximum loan amount, and filter to show only lenders you are eligible for. Selecting a lender will redirect you to their specific application workflow.",
  },
  {
    question: "How does the KCC (Kisan Credit Card) auto-routing work?",
    answer:
      "Once your KCC account is linked to the platform (with your bank's consent), 20% of every incoming sale is automatically routed to your KCC outstanding balance before the final payout. You will receive a notification after each repayment. Opting out requires explicit bank approval. A deduction cap is enforced to ensure you retain sufficient liquidity.",
  },
  {
    question: "What is a Buying Pool and how do I join one?",
    answer:
      "A Buying Pool lets you and nearby farmers aggregate orders to meet Minimum Order Quantities (MOQ) for wholesale input prices. Go to BNPL Loans > Buying Pools to see open pools in your area (within 50 km). Select your quantity and click 'One-Click Join'. The pool closes and places the order when MOQ is met. If the pool fails to meet its target, a full refund is automatically triggered.",
  },
  {
    question: "How is my Yield History shared with banks?",
    answer:
      "On the Credit Offers page, you'll find a 'Share 3-Year Yield History' toggle. When enabled, lenders on the platform can view a tamper-proof, standardised summary of your last 3 years of yield data. You can revoke access at any time. Every instance of data access is logged. All handling complies with the DPDP Act.",
  },
  {
    question: "How does the gold loan doorstep appraisal work?",
    answer:
      "On the Credit Offers page, click 'Request Doorstep Appraisal' under the Emergency Gold Loan section. Enter your estimated gold weight, pincode, and mobile number to get a preliminary loan estimate. The platform will confirm your appointment within 24 hours via SMS. Service is available only in participating pincodes. The platform never takes physical custody of your gold.",
  },
  {
    question: "Can I export a year-end financial statement?",
    answer:
      "Yes. From your Dashboard, navigate to the Financial Statements section to export a year-end report in PDF or Excel format. The report separates agricultural (tax-exempt) income from other taxable income such as machinery rental. Totals are reconciled with your digital ledger records.",
  },
];

const NOTIFICATIONS = [
  {
    id: "N1",
    type: "subsidy",
    message: "PM Drip Irrigation Subsidy deadline is in 87 days. You are eligible. Apply before May 31.",
    time: "2 hours ago",
    read: false,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "N2",
    type: "bnpl",
    message: "BNPL repayment of ₹3,200 was successfully auto-deducted from your Cotton sale settlement.",
    time: "Yesterday",
    read: true,
    color: "from-green-500 to-green-600",
  },
  {
    id: "N3",
    type: "kcc",
    message: "KCC auto-routing: ₹2,875 (20% of Wheat harvest sale) has been forwarded to your loan account.",
    time: "3 days ago",
    read: true,
    color: "from-amber-500 to-amber-600",
  },
  {
    id: "N4",
    type: "pool",
    message: "Buying Pool POOL-001 for DAP Fertilizer has reached 72% of MOQ. 28 bags more needed to trigger wholesale pricing.",
    time: "4 days ago",
    read: false,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "N5",
    type: "system",
    message: "Interest rates updated: NABARD Rural Credit now offers 7.2% APR — 0.5% lower than last month.",
    time: "1 week ago",
    read: true,
    color: "from-gray-500 to-gray-600",
  },
];

const QUICK_ACTIONS = [
  {
    label: "Credit & Loans",
    desc: "Compare NABARD & MFI rates",
    href: "/financial-partner/credit-offers",
    icon: BadgeDollarSign,
    color: "bg-green-50 border-green-200 hover:bg-green-100",
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
  },
  {
    label: "BNPL & Pools",
    desc: "Manage input credit & buying pools",
    href: "/financial-partner/bnpl-loans",
    icon: PiggyBank,
    color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    label: "Market Signals",
    desc: "Profitability calculator & subsidies",
    href: "/financial-partner/market-signals",
    icon: LineChart,
    color: "bg-amber-50 border-amber-200 hover:bg-amber-100",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-100",
  },
];

// ── Component ──────────────────────────────────────────────────────────────────

export default function FinancialPartnerSupportPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [contactForm, setContactForm] = useState({ subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setContactForm({ subject: "", message: "" });
  };

  return (
    <div className="space-y-6">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-[#1a4d2e] to-[#15401f] rounded-3xl p-8 shadow-lg text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-1">Support Center</h1>
            <p className="text-green-100">
              Get help with BNPL, credit offers, KCC routing, and all financial services
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-2">
          {[
            { label: `${unreadCount} Unread Alerts`, icon: Bell },
            { label: `${FAQ_ITEMS.length} FAQs`, icon: HelpCircle },
            { label: "24/7 Support", icon: Shield },
          ].map(({ label, icon: Icon }) => (
            <span key={label} className="flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
              <Icon className="w-3.5 h-3.5" />
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Stats ────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="p-3 bg-green-100 rounded-xl w-fit mb-3">
            <HelpCircle className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">FAQ Articles</h3>
          <p className="text-3xl font-bold text-[#1a4d2e]">{FAQ_ITEMS.length}</p>
          <p className="text-xs text-gray-400 mt-1">Finance & credit topics</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="p-3 bg-blue-100 rounded-xl w-fit mb-3">
            <Bell className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Unread Notifications</h3>
          <p className="text-3xl font-bold text-blue-600">{unreadCount}</p>
          <p className="text-xs text-gray-400 mt-1">{notifications.length} total this month</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="p-3 bg-amber-100 rounded-xl w-fit mb-3">
            <Clock className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Avg Response Time</h3>
          <p className="text-3xl font-bold text-amber-600">&lt; 4 hrs</p>
          <p className="text-xs text-gray-400 mt-1">During business hours</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Left: FAQ + Contact ─────────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Navigation */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#1a4d2e] mb-4 flex items-center gap-2">
              <ExternalLink className="w-5 h-5" />
              Quick Navigation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {QUICK_ACTIONS.map((action) => (
                <a
                  key={action.href}
                  href={action.href}
                  className={`block rounded-2xl p-4 border transition-colors cursor-pointer group ${action.color}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${action.iconBg}`}>
                      <action.icon className={`w-5 h-5 ${action.iconColor}`} />
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                  <h3 className="font-bold text-[#1a4d2e] text-sm">{action.label}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{action.desc}</p>
                </a>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1a4d2e] mb-4 flex items-center gap-2">
              <HelpCircle className="w-6 h-6" />
              Frequently Asked Questions
            </h2>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
                  >
                    <span className="font-semibold text-[#1a4d2e] pr-4">{item.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support Form */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1a4d2e] mb-2 flex items-center gap-2">
              <MessageCircle className="w-6 h-6" />
              Contact Support
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Can't find what you need? Send us a message — we'll respond within 4 business hours.
            </p>

            {submitted ? (
              <div className="flex items-center gap-3 p-5 bg-green-50 rounded-2xl border border-green-200">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-bold text-[#1a4d2e]">Message sent successfully!</p>
                  <p className="text-sm text-gray-600">Our support team will reach out to you shortly.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]"
                    required
                  >
                    <option value="">Select a topic...</option>
                    <option>BNPL repayment issue</option>
                    <option>Credit offer not loading</option>
                    <option>KCC account linking</option>
                    <option>Buying Pool problem</option>
                    <option>Gold loan appraisal request</option>
                    <option>Livestock insurance query</option>
                    <option>Yield History sharing</option>
                    <option>Other financial query</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Describe your issue in detail..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e] resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-[#1a4d2e] text-white rounded-xl font-semibold hover:bg-[#15401f] transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}

            {/* Contact Channels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Phone className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1a4d2e]">Helpline</p>
                  <p className="text-xs text-gray-500">1800-XXX-XXXX (Toll Free)</p>
                  <p className="text-xs text-gray-400">Mon–Sat, 9 AM–6 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1a4d2e]">Email Support</p>
                  <p className="text-xs text-gray-500">finance@soil2sale.in</p>
                  <p className="text-xs text-gray-400">Response within 4 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Notifications ────────────────────────────────────────────── */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#dcfce7] to-[#bbf7d0] rounded-3xl p-6 shadow-sm border border-green-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#1a4d2e] flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </h2>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs font-semibold text-[#1a4d2e] hover:underline"
                >
                  Mark all read
                </button>
              )}
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  className={`rounded-xl p-4 border cursor-pointer transition-all ${
                    n.read
                      ? "bg-white/40 border-gray-200"
                      : "bg-white/90 border-green-400 shadow-sm"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg bg-gradient-to-br ${n.color} flex items-center justify-center text-white flex-shrink-0`}
                    >
                      {n.type === "subsidy" ? (
                        <FileText className="w-4 h-4" />
                      ) : n.type === "bnpl" ? (
                        <PiggyBank className="w-4 h-4" />
                      ) : n.type === "kcc" ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : n.type === "pool" ? (
                        <Info className="w-4 h-4" />
                      ) : (
                        <Bell className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#1a4d2e] leading-snug">{n.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                    </div>
                    {!n.read && (
                      <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0 mt-1" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance & Info Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-[#1a4d2e] mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              Compliance & Policies
            </h3>
            <div className="space-y-3">
              {[
                { label: "RBI Digital Lending Guidelines", status: "Compliant" },
                { label: "DPDP Act (Data Privacy)", status: "Compliant" },
                { label: "RBI Escrow Norms", status: "Compliant" },
                { label: "KYC Requirements", status: "Active" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
