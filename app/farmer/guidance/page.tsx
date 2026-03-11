"use client";

import React from "react";
import {
  Book,
  Video,
  FileText,
  ChevronRight,
  Search,
  Bookmark,
  X,
} from "lucide-react";
import AnimatedList from "@/components/ui/AnimatedList";
import { getGuidanceArticles } from "@/services/guidance/guidanceApi";
import { useFarmerLang } from "@/app/contexts/FarmerLanguageContext";

interface GuidanceArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  type: "article" | "video" | "document";
  duration?: string;
  views: number;
  bookmarked: boolean;
  created_at: string;
  thumbnail_url?: string;
}

export default function GuidancePage() {
  const { t } = useFarmerLang();
  const [articles, setArticles] = React.useState<GuidanceArticle[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [selectedType, setSelectedType] = React.useState<string>("all");
  const [selectedArticle, setSelectedArticle] =
    React.useState<GuidanceArticle | null>(null);

  const categories = [
    "all",
    "Crop Management",
    "Pest Control",
    "Irrigation",
    "Fertilizers",
    "Weather",
    "Marketing",
  ];

  const fetchGuidance = async () => {
    try {
      const response = await getGuidanceArticles({
        category: selectedCategory,
        type: selectedType as any,
      });
      setArticles(response.data || []);
    } catch (error) {
      console.error("Failed to fetch guidance", error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    // fetchGuidance();
  }, [selectedCategory, selectedType]);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      searchTerm === "" ||
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory;
    const matchesType = selectedType === "all" || article.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleItemSelect = (_item: string, index: number) => {
    setSelectedArticle(filteredArticles[index]);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-5 h-5" />;
      case "document":
        return <FileText className="w-5 h-5" />;
      default:
        return <Book className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1a4d2e] mb-2">
              {t.guidance_title}
            </h1>
            <p className="text-gray-600">{t.guidance_subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Bookmark className="w-4 h-4" />
              {t.guidance_bookmark}
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-3xl p-6 shadow-sm space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={t.guidance_searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a4d2e] focus:border-transparent"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-[#1a4d2e] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category === "all" ? t.guidance_all : category}
            </button>
          ))}
        </div>

        {/* Type Filter */}
        <div className="flex gap-3">
          <button
            onClick={() => setSelectedType("all")}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
              selectedType === "all"
                ? "bg-[#1a4d2e] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Types
          </button>
          <button
            onClick={() => setSelectedType("article")}
            className={`px-4 py-2 rounded-xl font-medium transition-colors flex items-center gap-2 ${
              selectedType === "article"
                ? "bg-[#1a4d2e] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Book className="w-4 h-4" />
            {t.guidance_article}
          </button>
          <button
            onClick={() => setSelectedType("video")}
            className={`px-4 py-2 rounded-xl font-medium transition-colors flex items-center gap-2 ${
              selectedType === "video"
                ? "bg-[#1a4d2e] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Video className="w-4 h-4" />
            Videos
          </button>
          <button
            onClick={() => setSelectedType("document")}
            className={`px-4 py-2 rounded-xl font-medium transition-colors flex items-center gap-2 ${
              selectedType === "document"
                ? "bg-[#1a4d2e] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FileText className="w-4 h-4" />
            {t.guidance_document}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-6 shadow-sm text-white">
          <Book className="w-10 h-10 mb-3 opacity-80" />
          <h3 className="text-sm font-medium mb-1 opacity-90">
            Total Resources
          </h3>
          <p className="text-4xl font-bold">{articles.length}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 shadow-sm text-white">
          <Video className="w-10 h-10 mb-3 opacity-80" />
          <h3 className="text-sm font-medium mb-1 opacity-90">
            Video Tutorials
          </h3>
          <p className="text-4xl font-bold">
            {articles.filter((a) => a.type === "video").length}
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-6 shadow-sm text-white">
          <Bookmark className="w-10 h-10 mb-3 opacity-80" />
          <h3 className="text-sm font-medium mb-1 opacity-90">Bookmarked</h3>
          <p className="text-4xl font-bold">
            {articles.filter((a) => a.bookmarked).length}
          </p>
        </div>
      </div>

      {/* Content List */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-[#1a4d2e] mb-6">
          Recommended for You
        </h2>

        {loading ? (
          <div className="text-center py-12 text-gray-500">
            {t.guidance_loading}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">{t.guidance_empty}</p>
          </div>
        ) : (
          <div className="flex justify-center">
            <AnimatedList
              items={filteredArticles.map((a) => a.id)}
              onItemSelect={handleItemSelect}
              showGradients={false}
              displayScrollbar={true}
              className="w-full max-w-4xl"
              renderItem={(_, index) => {
                const article = filteredArticles[index];
                return (
                  <div className="px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100 hover:border-[#1a4d2e] hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="shrink-0 text-[#1a4d2e]">
                        {getTypeIcon(article.type)}
                      </div>
                      <h3 className="text-sm font-semibold text-[#1a4d2e] truncate flex-1">
                        {article.title}
                      </h3>
                      <span className="px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-semibold shrink-0">
                        {article.category}
                      </span>
                      <Bookmark
                        className={`w-3.5 h-3.5 shrink-0 ${article.bookmarked ? "fill-current text-[#1a4d2e]" : "text-gray-300"}`}
                      />
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 text-[11px] text-gray-400">
                      {article.duration && <span>{article.duration}</span>}
                      {article.duration && <span>•</span>}
                      <span>{article.views} views</span>
                    </div>
                  </div>
                );
              }}
            />
          </div>
        )}
      </div>
      {/* Article Detail Popup */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedArticle(null)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#1a4d2e] px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 pr-4">
                <div className="p-2 bg-white/20 rounded-lg text-white">
                  {getTypeIcon(selectedArticle.type)}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white leading-tight">
                    {selectedArticle.title}
                  </h2>
                  <p className="text-green-200 text-xs mt-0.5 capitalize">
                    {selectedArticle.type}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-white/70 hover:text-white p-1 rounded-full shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                  {selectedArticle.category}
                </span>
                {selectedArticle.bookmarked && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1a4d2e]/10 text-[#1a4d2e] text-sm">
                    <Bookmark className="w-3.5 h-3.5 fill-current" /> Bookmarked
                  </span>
                )}
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">
                {selectedArticle.description}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {selectedArticle.duration && (
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500 mb-0.5">Duration</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {selectedArticle.duration}
                    </p>
                  </div>
                )}
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-0.5">Views</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {selectedArticle.views.toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-full flex items-center justify-center gap-2 bg-[#1a4d2e] text-white py-3 rounded-xl font-semibold hover:bg-[#15401f] transition-colors"
              >
                Open Article <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
