"use client";

import React from "react";
import {
  Landmark,
  Calendar,
  MapPin,
  ExternalLink,
  Search,
  Filter,
  CheckCircle,
  X,
} from "lucide-react";
import AnimatedList from "@/components/ui/AnimatedList";
import { useFarmerLang } from "@/app/contexts/FarmerLanguageContext";

// TODO: Import from API service when created (already exists)
import { getGovernmentSchemes } from "@/services/government-schemes/governmentSchemesApi";
import { Scheme } from "@/types/dashboard.types";

export default function SchemesPage() {
  const { t } = useFarmerLang();
  const [schemes, setSchemes] = React.useState<Scheme[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedState, setSelectedState] = React.useState("all");
  const [selectedScheme, setSelectedScheme] = React.useState<Scheme | null>(
    null,
  );

  const fetchSchemes = async () => {
    try {
      const response = await getGovernmentSchemes();
      setSchemes(response.data);
    } catch (error) {
      console.error("Failed to fetch schemes", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSchemes();
  }, []);

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch =
      searchTerm === "" ||
      scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState =
      selectedState === "all" || scheme.state === selectedState;
    return matchesSearch && matchesState;
  });

  const handleItemSelect = (_item: string, index: number) => {
    setSelectedScheme(filteredSchemes[index]);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const uniqueStates = Array.from(new Set(schemes.map((s) => s.state)));

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#1a4d2e] to-[#15401f] rounded-3xl p-8 shadow-lg text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <Landmark className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-1">{t.schemes_title}</h1>
            <p className="text-green-100">{t.schemes_subtitle}</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t.schemes_searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e] focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="pl-12 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e] focus:border-transparent appearance-none bg-white min-w-[200px]"
            >
              <option value="all">{t.schemes_allStates}</option>
              {uniqueStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-green-100 rounded-xl">
              <Landmark className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">
            {t.schemes_available}
          </h3>
          <p className="text-3xl font-bold text-[#1a4d2e]">
            {filteredSchemes.length}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-blue-100 rounded-xl">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">
            {t.schemes_statesCovered}
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            {uniqueStates.length}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-amber-100 rounded-xl">
              <Calendar className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">
            {t.schemes_endingSoon}
          </h3>
          <p className="text-3xl font-bold text-amber-600">
            {
              schemes.filter((s) => {
                const deadline = new Date(s.deadline);
                const daysUntil = Math.ceil(
                  (deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
                );
                return daysUntil <= 30 && daysUntil > 0;
              }).length
            }
          </p>
        </div>
      </div>

      {/* Schemes List */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#1a4d2e]">
            {t.schemes_eligible}
          </h2>
          <button className="text-[#1a4d2e] font-semibold hover:underline flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            {t.schemes_applied}
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">
            {t.schemes_loading}
          </div>
        ) : filteredSchemes.length === 0 ? (
          <div className="text-center py-12">
            <Landmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">{t.schemes_empty}</p>
            <p className="text-sm text-gray-400 mt-2">
              {t.schemes_adjustFilters}
            </p>
          </div>
        ) : (
          <div className="flex justify-center">
            <AnimatedList
              items={filteredSchemes.map((s) => s.id)}
              onItemSelect={handleItemSelect}
              showGradients={false}
              displayScrollbar={true}
              className="w-full max-w-4xl"
              renderItem={(_, index) => {
                const scheme = filteredSchemes[index];
                const deadline = new Date(scheme.deadline);
                const daysUntil = Math.ceil(
                  (deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
                );
                const isUrgent = daysUntil <= 30 && daysUntil > 0;

                return (
                  <div
                    className={`px-3 py-1.5 rounded-lg border hover:shadow-md transition-all cursor-pointer ${
                      isUrgent
                        ? "bg-amber-50 border-amber-200 hover:border-amber-400"
                        : "bg-gray-50 border-gray-100 hover:border-[#1a4d2e]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-[#1a4d2e] truncate flex-1">
                        {scheme.name}
                      </h3>
                      <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-semibold shrink-0">
                        <MapPin className="w-2.5 h-2.5" />
                        {scheme.state}
                      </span>
                      {scheme.crop && (
                        <span className="px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-semibold shrink-0">
                          {scheme.crop}
                        </span>
                      )}
                      {isUrgent && (
                        <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold shrink-0">
                          {daysUntil}d left
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <div className="flex items-center gap-1 text-[11px] text-gray-500">
                        <Landmark className="w-2.5 h-2.5 shrink-0" />
                        <span className="truncate line-clamp-1">
                          {scheme.description.slice(0, 60)}
                          {scheme.description.length > 60 ? "…" : ""}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-gray-400 shrink-0 ml-2">
                        <Calendar className="w-2.5 h-2.5" />
                        <span>{formatDate(scheme.deadline)}</span>
                      </div>
                    </div>
                  </div>
                );
              }}
            />
          </div>
        )}
      </div>
      {/* Scheme Detail Popup */}
      {selectedScheme &&
        (() => {
          const deadline = new Date(selectedScheme.deadline);
          const daysUntil = Math.ceil(
            (deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
          );
          const isUrgent = daysUntil <= 30 && daysUntil > 0;
          return (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedScheme(null)}
            >
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
              <div
                className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-[#1a4d2e] px-6 py-5 flex items-center justify-between">
                  <div className="flex-1 pr-4">
                    <h2 className="text-lg font-bold text-white leading-tight">
                      {selectedScheme.name}
                    </h2>
                    {isUrgent && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-amber-500 text-white rounded-full text-xs font-bold">
                        {daysUntil} days left
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedScheme(null)}
                    className="text-white/70 hover:text-white p-1 rounded-full shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                      <MapPin className="w-3.5 h-3.5" />
                      {selectedScheme.state}
                    </span>
                    {selectedScheme.crop && (
                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                        {selectedScheme.crop}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {selectedScheme.description}
                  </p>
                  {(selectedScheme.land_size_min ||
                    selectedScheme.land_size_max) && (
                    <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                      <p className="text-sm text-blue-900 font-medium">
                        Land Size Criteria
                      </p>
                      <p className="text-sm text-blue-700 mt-0.5">
                        {selectedScheme.land_size_min &&
                          `Min: ${selectedScheme.land_size_min} acres`}
                        {selectedScheme.land_size_min &&
                          selectedScheme.land_size_max &&
                          " — "}
                        {selectedScheme.land_size_max &&
                          `Max: ${selectedScheme.land_size_max} acres`}
                      </p>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {t.schemes_deadline}:{" "}
                        <strong>{formatDate(selectedScheme.deadline)}</strong>
                      </span>
                    </div>
                    <a
                      href="https://subhadra.odisha.gov.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#1a4d2e] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#15401f] transition-colors flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Details <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
    </div>
  );
}
