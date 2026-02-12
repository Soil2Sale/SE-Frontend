"use client";

import React from "react";
import {
  Book,
  Video,
  FileText,
  ChevronRight,
  Search,
  Bookmark,
} from "lucide-react";
import AnimatedList from "@/components/ui/AnimatedList";
import { getGuidanceArticles } from "@/services/guidance/guidanceApi";

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
  const [articles, setArticles] = React.useState<GuidanceArticle[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [selectedType, setSelectedType] = React.useState<string>("all");

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

  const handleItemSelect = (item: string, index: number) => {
    console.log("Selected article:", filteredArticles[index]);
    // Navigate to detail view
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
              Farming Guidance
            </h1>
            <p className="text-gray-600">
              Expert advice and resources for better farming
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Bookmark className="w-4 h-4" />
              Bookmarks
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
            placeholder="Search for topics, tips, or techniques..."
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
              {category === "all" ? "All Topics" : category}
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
            Articles
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
            Documents
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
            Loading guidance...
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No guidance found</p>
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
                  <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#1a4d2e] hover:shadow-md transition-all">
                    <div className="flex gap-4">
                      {/* Icon/Thumbnail */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-[#1a4d2e] rounded-xl flex items-center justify-center text-white">
                          {getTypeIcon(article.type)}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-[#1a4d2e] mb-1">
                              {article.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {article.description}
                            </p>
                          </div>
                          <button className="ml-4 text-gray-400 hover:text-[#1a4d2e]">
                            <Bookmark
                              className={`w-5 h-5 ${article.bookmarked ? "fill-current text-[#1a4d2e]" : ""}`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                            {article.category}
                          </span>
                          {article.duration && <span>{article.duration}</span>}
                          <span>{article.views} views</span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="flex-shrink-0 flex items-center">
                        <ChevronRight className="w-6 h-6 text-gray-400" />
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
