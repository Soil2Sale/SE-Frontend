"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import AnimatedList from "@/components/ui/AnimatedList";
import { CropListing, QualityGrade } from "@/types/crop.types";
import { User } from "@/types/user.types";
import { getAllCropListings } from "@/services/crop-listing/cropApi";
import { getUserByRole } from "@/services/user/userApi";
import {
  Sprout,
  Scale,
  Package,
  DollarSign,
  User as UserIcon,
  Search,
  Filter,
  X,
  ChevronDown,
} from "lucide-react";

// const MOCK_CROPS: Crop[] = [
//   {
//     id: "1",
//     crop_name: "Organic Tomatoes",
//     quality_grade: QualityGrade.PREMIUM,
//     quantity_available: 500,
//     expected_price: 45.5,
//     farmer_profile: { name: "Kanha" },
//   },
//   {
//     id: "2",
//     crop_name: "Basmati Rice",
//     quality_grade: QualityGrade.GRADE_A,
//     quantity_available: 1200,
//     expected_price: 85.0,
//     farmer_profile: { name: "Priya Sharma" },
//   },
//   {
//     id: "3",
//     crop_name: "Red Onions",
//     quality_grade: QualityGrade.GRADE_B,
//     quantity_available: 800,
//     expected_price: 32.0,
//     farmer_profile: { name: "Amit Patel" },
//   },
//   {
//     id: "4",
//     crop_name: "Green Chilies",
//     quality_grade: QualityGrade.PREMIUM,
//     quantity_available: 250,
//     expected_price: 120.0,
//     farmer_profile: { name: "Lakshmi Reddy" },
//   },
//   {
//     id: "5",
//     crop_name: "Sweet Corn",
//     quality_grade: QualityGrade.GRADE_A,
//     quantity_available: 600,
//     expected_price: 55.0,
//     farmer_profile: { name: "Suresh Nair" },
//   },
//   {
//     id: "6",
//     crop_name: "Fresh Spinach",
//     quality_grade: QualityGrade.STANDARD,
//     quantity_available: 300,
//     expected_price: 28.0,
//     farmer_profile: { name: "Meena Joshi" },
//   },
//   {
//     id: "7",
//     crop_name: "Carrots",
//     quality_grade: QualityGrade.GRADE_A,
//     quantity_available: 450,
//     expected_price: 38.0,
//     farmer_profile: { name: "Vikas Singh" },
//   },
//   {
//     id: "8",
//     crop_name: "Cauliflower",
//     quality_grade: QualityGrade.PREMIUM,
//     quantity_available: 350,
//     expected_price: 65.0,
//     farmer_profile: { name: "Anita Desai" },
//   },
//   {
//     id: "9",
//     crop_name: "Potatoes",
//     quality_grade: QualityGrade.STANDARD,
//     quantity_available: 2000,
//     expected_price: 25.0,
//     farmer_profile: { name: "Ramesh Gupta" },
//   },
//   {
//     id: "10",
//     crop_name: "Bell Peppers",
//     quality_grade: QualityGrade.GRADE_A,
//     quantity_available: 400,
//     expected_price: 95.0,
//     farmer_profile: { name: "Sneha Iyer" },
//   },
// ];

type SortOption =
  | "price_asc"
  | "price_desc"
  | "weight_asc"
  | "weight_desc"
  | "none";

const getGradeColor = (grade: QualityGrade) => {
  switch (grade) {
    case QualityGrade.PREMIUM:
      return "bg-purple-500/20 text-purple-300 border-purple-500/50";
    case QualityGrade.GRADE_A:
      return "bg-green-500/20 text-green-300 border-green-500/50";
    case QualityGrade.GRADE_B:
      return "bg-blue-500/20 text-blue-300 border-blue-500/50";
    case QualityGrade.STANDARD:
      return "bg-gray-500/20 text-gray-300 border-gray-500/50";
  }
};

export default function CropListingPage() {
  const [selectedCrop, setSelectedCrop] = useState<CropListing | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGrade, setFilterGrade] = useState<QualityGrade | "ALL">("ALL");
  const [sortOption, setSortOption] = useState<SortOption>("none");
  const [minWeight, setMinWeight] = useState<string>("");
  const [maxWeight, setMaxWeight] = useState<string>("");

  const [crops, setCrops] = useState<CropListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [cropsResponse] = await Promise.all([
          getAllCropListings({ limit: 100 }),
        ]);
        setCrops(cropsResponse.data);
      } catch (err) {
        setError("Failed to load data. Please try again later.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredAndSortedCrops = useMemo(() => {
    let filtered = crops.filter((crop) => {
      const matchesSearch = crop.crop_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesGrade =
        filterGrade === "ALL" || crop.quality_grade === filterGrade;

      const matchesWeight =
        (!minWeight || crop.quantity >= parseFloat(minWeight)) &&
        (!maxWeight || crop.quantity <= parseFloat(maxWeight));

      return matchesSearch && matchesGrade && matchesWeight;
    });

    // Apply sorting
    if (sortOption !== "none") {
      filtered = [...filtered].sort((a, b) => {
        switch (sortOption) {
          case "price_asc":
            return a.expected_price - b.expected_price;
          case "price_desc":
            return b.expected_price - a.expected_price;
          case "weight_asc":
            return a.quantity - b.quantity;
          case "weight_desc":
            return b.quantity - a.quantity;
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [crops, searchTerm, filterGrade, sortOption, minWeight, maxWeight]);

  const handleCropSelect = (cropId: string, index: number) => {
    const crop = filteredAndSortedCrops.find((c) => c.id === cropId);
    if (crop) {
      if (selectedCrop?.id === cropId) {
        setShowDetails(false);
        setTimeout(() => setSelectedCrop(null), 300);
      } else {
        setSelectedCrop(crop);
        setShowDetails(true);
      }
    }
  };

  const cropItems = filteredAndSortedCrops.map((crop) => crop.id);

  const getFarmerName = (crop: CropListing): string => {
    if (typeof crop.farmer_profile_id === "object") {
      return crop.farmer_profile_id.name;
    }
    return "Unknown Farmer";
  };

  const renderCropItem = (cropId: string, index: number) => {
    const crop = filteredAndSortedCrops.find((c) => c.id === cropId);
    if (!crop) return null;

    const isSelected = selectedCrop?.id === cropId;

    return (
      <div
        className={`flex items-center gap-4 p-5 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] rounded-xl border transition-all duration-300 ${
          isSelected
            ? "border-[#4ade80] shadow-lg shadow-[#4ade80]/20"
            : "border-[#2a2a3e] hover:border-[#4ade80]"
        }`}
      >
        <div className="w-16 h-16 bg-gradient-to-br from-[#4ade80] to-[#22c55e] rounded-lg flex items-center justify-center flex-shrink-0">
          <Sprout className="w-8 h-8 text-[#0d2818]" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-white mb-1">
            {crop.crop_name}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${getGradeColor(crop.quality_grade)}`}
            >
              {crop.quality_grade}
            </span>
            <span className="text-gray-400 text-sm">•</span>
            <span className="text-gray-300 text-sm font-medium">
              {crop.quantity} kg
            </span>
          </div>
        </div>

        <div className="text-right flex-shrink-0">
          <div className="text-2xl font-bold text-[#4ade80]">
            ₹{crop.expected_price}
          </div>
          <div className="text-xs text-gray-400">per kg</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-3 light-theme-font">
            Crop Listing
          </h1>
          <p className="text-gray-400 text-lg">
            Discover fresh produce from local farmers
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#4ade80] mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading crops...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-400">{error}</p>
          </div>
        ) : (
          <div className="flex gap-8">
            <div
              className={`transition-all duration-500 ease-in-out ${
                showDetails ? "w-[60%]" : "w-full"
              }`}
            >
              <div className="bg-gradient-to-br from-[#dcfce7] to-[#bbf7d0] rounded-2xl p-6 shadow-lg border border-[#4ade80]/50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold light-theme-font flex items-center gap-2">
                    <Package className="w-6 h-6 text-[#4ade80]" />
                    Available Crops
                  </h2>
                  <div className="text-sm text-gray-400">
                    {filteredAndSortedCrops.length}{" "}
                    {filteredAndSortedCrops.length === 1 ? "crop" : "crops"}
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#639376]" />
                    <input
                      type="text"
                      placeholder="Search crops..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-white/40 backdrop-blur-md border border-[#2a2a3e] rounded-lg pl-10 pr-10 py-3 text-[#1a4d2e] placeholder-gray-500 focus:outline-none focus:border-[#4ade80] transition-colors"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={filterGrade}
                      onChange={(e) =>
                        setFilterGrade(e.target.value as QualityGrade | "ALL")
                      }
                      className="bg-white/40 backdrop-blur-md border border-[#2a2a3e] rounded-lg px-4 py-3 text-[#1a4d2e] focus:outline-none focus:border-[#4ade80] transition-colors"
                    >
                      <option value="ALL">All Grades</option>
                      <option value={QualityGrade.PREMIUM}>Premium</option>
                      <option value={QualityGrade.GRADE_A}>Grade A</option>
                      <option value={QualityGrade.GRADE_B}>Grade B</option>
                      <option value={QualityGrade.STANDARD}>Standard</option>
                    </select>

                    <select
                      value={sortOption}
                      onChange={(e) =>
                        setSortOption(e.target.value as SortOption)
                      }
                      className="bg-white/40 backdrop-blur-md border border-[#2a2a3e] rounded-lg px-4 py-3 text-[#1a4d2e] focus:outline-none focus:border-[#4ade80] transition-colors"
                    >
                      <option value="none">Sort By</option>
                      <option value="price_asc">Price: Low to High</option>
                      <option value="price_desc">Price: High to Low</option>
                      <option value="weight_asc">Weight: Low to High</option>
                      <option value="weight_desc">Weight: High to Low</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3">
                    <Filter className="w-5 h-5 text-[#4ade80]" />
                    <span className="text-[#1a4d2e] font-semibold">
                      Weight Range (kg):
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      placeholder="Min weight"
                      value={minWeight}
                      onChange={(e) => setMinWeight(e.target.value)}
                      className="bg-white/40 backdrop-blur-md  border border-[#2a2a3e] rounded-lg px-4 py-3 text-[#1a4d2e] placeholder-gray-500 focus:outline-none focus:border-[#4ade80] transition-colors"
                    />
                    <input
                      type="number"
                      placeholder="Max weight"
                      value={maxWeight}
                      onChange={(e) => setMaxWeight(e.target.value)}
                      className="bg-white/40 backdrop-blur-md  border border-[#2a2a3e] rounded-lg px-4 py-3 text-[#1a4d2e] placeholder-gray-500 focus:outline-none focus:border-[#4ade80] transition-colors"
                    />
                  </div>
                </div>

                {filteredAndSortedCrops.length > 0 ? (
                  <AnimatedList
                    items={cropItems}
                    onItemSelect={handleCropSelect}
                    showGradients={true}
                    enableArrowNavigation={true}
                    displayScrollbar={true}
                    className="w-full"
                    itemClassName="!p-0 !bg-transparent"
                    renderItem={renderCropItem}
                  />
                ) : (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No crops found</p>
                  </div>
                )}
              </div>
            </div>

            <AnimatePresence>
              {showDetails && selectedCrop && (
                <motion.div
                  initial={{ opacity: 0, x: 50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-[40%] flex-shrink-0"
                >
                  <div className="bg-gradient-to-br from-[#1a4d2e] to-[#0d2818] rounded-2xl p-6 border border-[#4ade80]/30 sticky top-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-white">
                        Crop Details
                      </h2>
                      <button
                        onClick={() => {
                          setShowDetails(false);
                          setTimeout(() => setSelectedCrop(null), 300);
                        }}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-[#0a0a0f]/50 rounded-xl p-4 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#4ade80] to-[#22c55e] rounded-lg flex items-center justify-center">
                            <Sprout className="w-6 h-6 text-[#0d2818]" />
                          </div>
                          <h3 className="text-xl font-bold text-white">
                            {selectedCrop.crop_name}
                          </h3>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-3 text-gray-300">
                            <Scale className="w-5 h-5 text-[#4ade80]" />
                            <div>
                              <div className="text-xs text-gray-400">
                                Quality Grade
                              </div>
                              <div className="font-semibold">
                                {selectedCrop.quality_grade}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-gray-300">
                            <Package className="w-5 h-5 text-[#4ade80]" />
                            <div>
                              <div className="text-xs text-gray-400">
                                Available Quantity
                              </div>
                              <div className="font-semibold">
                                {selectedCrop.quantity} kg
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-gray-300">
                            <DollarSign className="w-5 h-5 text-[#4ade80]" />
                            <div>
                              <div className="text-xs text-gray-400">
                                Expected Price
                              </div>
                              <div className="font-semibold text-[#4ade80] text-xl">
                                ₹{selectedCrop.expected_price}/kg
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-gray-300">
                            <UserIcon className="w-5 h-5 text-[#4ade80]" />
                            <div>
                              <div className="text-xs text-gray-400">
                                Farmer
                              </div>
                              <div className="font-semibold">
                                {getFarmerName(selectedCrop)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button className="w-full bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-[#0d2818] font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-[#4ade80]/50 transition-all duration-300">
                        Contact Farmer
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
