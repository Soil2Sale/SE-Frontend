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
} from "lucide-react";
import AnimatedList from "@/components/ui/AnimatedList";

// TODO: Import from API service when created (already exists)
import { getGovernmentSchemes } from "@/services/government-schemes/governmentSchemesApi";
import { Scheme } from "@/types/dashboard.types";

export default function SchemesPage() {
  const [schemes, setSchemes] = React.useState<Scheme[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedState, setSelectedState] = React.useState("all");

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

  const handleItemSelect = (item: string, index: number) => {
    console.log("Selected scheme:", filteredSchemes[index]);
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
            <h1 className="text-3xl font-bold mb-1">Government Schemes</h1>
            <p className="text-green-100">
              Explore benefits and subsidies available to you
            </p>
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
              placeholder="Search schemes by name or description..."
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
              <option value="all">All States</option>
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
            Available Schemes
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
            States Covered
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
            Ending Soon
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
            Eligible Schemes
          </h2>
          <button className="text-[#1a4d2e] font-semibold hover:underline flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Applied Schemes
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">
            Loading schemes...
          </div>
        ) : filteredSchemes.length === 0 ? (
          <div className="text-center py-12">
            <Landmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No schemes found</p>
            <p className="text-sm text-gray-400 mt-2">
              Try adjusting your search or filters
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
                    className={`p-6 rounded-2xl border-2 hover:shadow-lg transition-all ${
                      isUrgent
                        ? "bg-amber-50 border-amber-200"
                        : "bg-gray-50 border-gray-100 hover:border-[#1a4d2e]"
                    }`}
                  >
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-[#1a4d2e] rounded-xl flex items-center justify-center text-white">
                          <Landmark className="w-6 h-6" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold text-[#1a4d2e] pr-4">
                            {scheme.name}
                          </h3>
                          {isUrgent && (
                            <span className="px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-bold whitespace-nowrap">
                              {daysUntil} days left
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 mb-3 text-sm">
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {scheme.state}
                          </span>
                          {scheme.crop && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                              {scheme.crop}
                            </span>
                          )}
                        </div>

                        <p className="text-gray-700 mb-4 leading-relaxed">
                          {scheme.description}
                        </p>

                        {(scheme.land_size_min || scheme.land_size_max) && (
                          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <p className="text-sm text-blue-900">
                              <strong>Land Size Criteria:</strong>{" "}
                              {scheme.land_size_min &&
                                `Min: ${scheme.land_size_min} acres`}
                              {scheme.land_size_min &&
                                scheme.land_size_max &&
                                " | "}
                              {scheme.land_size_max &&
                                `Max: ${scheme.land_size_max} acres`}
                            </p>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>
                              Deadline:{" "}
                              <strong>{formatDate(scheme.deadline)}</strong>
                            </span>
                          </div>

                          <button className="bg-[#1a4d2e] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#15401f] transition-colors flex items-center gap-2">
                            View Details
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
