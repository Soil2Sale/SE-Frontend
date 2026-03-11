"use client";

import React from "react";
import {
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Sparkles,
  X,
} from "lucide-react";
import AnimatedList from "@/components/ui/AnimatedList";
import { getAIInsights } from "@/services/ai/aiInsightsApi";
import { useFarmerLang } from "@/app/contexts/FarmerLanguageContext";

interface AIInsight {
  id: string;
  title: string;
  description: string;
  category:
    | "weather"
    | "market"
    | "crop_health"
    | "optimization"
    | "recommendation";
  priority: "high" | "medium" | "low";
  confidence: number;
  created_at: string;
  action_required: boolean;
  potential_impact?: string;
}

export default function AIInsightsPage() {
  const { t } = useFarmerLang();
  const [insights, setInsights] = React.useState<AIInsight[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [selectedInsight, setSelectedInsight] =
    React.useState<AIInsight | null>(null);

  const categories = [
    { value: "all", label: "All Insights" },
    { value: "weather", label: "Weather" },
    { value: "market", label: "Market" },
    { value: "crop_health", label: "Crop Health" },
    { value: "optimization", label: "Optimization" },
    { value: "recommendation", label: "Recommendations" },
  ];

  const fetchInsights = async () => {
    try {
      const response = await getAIInsights({
        category: selectedCategory as any,
      });
      setInsights(response.data || []);
    } catch (error) {
      console.error("Failed to fetch AI insights", error);
      setInsights([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchInsights();
  }, [selectedCategory]);

  const filteredInsights = insights.filter((insight) => {
    return selectedCategory === "all" || insight.category === selectedCategory;
  });

  const handleItemSelect = (_item: string, index: number) => {
    setSelectedInsight(filteredInsights[index]);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "low":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "weather":
        return <AlertTriangle className="w-5 h-5" />;
      case "market":
        return <TrendingUp className="w-5 h-5" />;
      case "crop_health":
        return <CheckCircle className="w-5 h-5" />;
      case "optimization":
        return <Sparkles className="w-5 h-5" />;
      default:
        return <Lightbulb className="w-5 h-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#1a4d2e] to-[#15401f] rounded-3xl p-8 shadow-lg text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <Sparkles className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-1">{t.insights_title}</h1>
            <p className="text-green-100">{t.insights_subtitle}</p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                selectedCategory === category.value
                  ? "bg-[#1a4d2e] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Lightbulb className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">
            Total Insights
          </h3>
          <p className="text-3xl font-bold text-[#1a4d2e]">{insights.length}</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-red-100 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">
            High Priority
          </h3>
          <p className="text-3xl font-bold text-red-600">
            {insights.filter((i) => i.priority === "high").length}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-amber-100 rounded-xl">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">
            Action Required
          </h3>
          <p className="text-3xl font-bold text-amber-600">
            {insights.filter((i) => i.action_required).length}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-green-100 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">
            Avg. Confidence
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {insights.length > 0
              ? Math.round(
                  insights.reduce((sum, i) => sum + i.confidence, 0) /
                    insights.length,
                )
              : 0}
            %
          </p>
        </div>
      </div>

      {/* Insights List */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#1a4d2e]">
            {t.insights_recommendations}
          </h2>
          <button className="text-[#1a4d2e] font-semibold hover:underline">
            View History
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">
            {t.insights_loading}
          </div>
        ) : filteredInsights.length === 0 ? (
          <div className="text-center py-12">
            <Lightbulb className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">{t.insights_empty}</p>
            <p className="text-sm text-gray-400 mt-2">
              Check back soon for AI-powered recommendations
            </p>
          </div>
        ) : (
          <div className="flex justify-center">
            <AnimatedList
              items={filteredInsights.map((i) => i.id)}
              onItemSelect={handleItemSelect}
              showGradients={false}
              displayScrollbar={true}
              className="w-full max-w-4xl"
              renderItem={(_, index) => {
                const insight = filteredInsights[index];
                return (
                  <div
                    className={`px-3 py-1.5 rounded-lg border hover:shadow-md transition-all cursor-pointer ${
                      insight.action_required
                        ? "bg-amber-50 border-amber-200 hover:border-amber-400"
                        : "bg-gray-50 border-gray-100 hover:border-[#1a4d2e]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-[#1a4d2e] truncate flex-1">
                        {insight.title}
                      </h3>
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${getPriorityColor(insight.priority)}`}
                      >
                        {insight.priority.toUpperCase()}
                      </span>
                      {insight.action_required && (
                        <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-semibold shrink-0">
                          Action
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <div className="flex items-center gap-2 text-[11px] text-gray-500">
                        <span className="capitalize">
                          {insight.category.replace("_", " ")}
                        </span>
                        <span>•</span>
                        <span>{insight.confidence}% conf.</span>
                      </div>
                      <span className="text-[10px] text-gray-400 shrink-0">
                        {formatDate(insight.created_at)}
                      </span>
                    </div>
                  </div>
                );
              }}
            />
          </div>
        )}
      </div>
      {/* Insight Detail Popup */}
      {selectedInsight && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedInsight(null)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#1a4d2e] px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 pr-4">
                <div className="p-2 bg-white/20 rounded-lg text-white">
                  {getCategoryIcon(selectedInsight.category)}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white leading-tight">
                    {selectedInsight.title}
                  </h2>
                  <p className="text-green-200 text-xs capitalize mt-0.5">
                    {selectedInsight.category.replace("_", " ")}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedInsight(null)}
                className="text-white/70 hover:text-white p-1 rounded-full shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold border ${getPriorityColor(selectedInsight.priority)}`}
                >
                  {selectedInsight.priority.toUpperCase()} PRIORITY
                </span>
                {selectedInsight.action_required && (
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold">
                    {t.insights_actionRequired}
                  </span>
                )}
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">
                {selectedInsight.description}
              </p>
              {selectedInsight.potential_impact && (
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-sm text-blue-900 font-medium">
                    {t.insights_impact}
                  </p>
                  <p className="text-sm text-blue-700 mt-0.5">
                    {selectedInsight.potential_impact}
                  </p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-0.5">
                    {t.insights_confidence}
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    {selectedInsight.confidence}%
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-0.5">Date</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {formatDate(selectedInsight.created_at)}
                  </p>
                </div>
              </div>
              {selectedInsight.action_required && (
                <button className="w-full bg-[#1a4d2e] text-white py-3 rounded-xl font-semibold hover:bg-[#15401f] transition-colors">
                  Take Action
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
