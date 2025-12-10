"use client";

import EmptyState from "@/components/ui/empty-state";
import MediaCard from "@/components/ui/media-card";
import { categoriesData, mediaData } from "@/data/static-data";
import { Grid3X3, LayoutGrid, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

const sortOptions = [
  { label: "Most Recent", value: "recent" },
  { label: "Most Liked", value: "likes" },
  { label: "Most Viewed", value: "views" },
  { label: "Most Shared", value: "shares" },
];

export default function GalleryPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "";

  const [selectedCategory, setSelectedCategory] = useState(
    categoryParam || "All"
  );
  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");

  const photos = useMemo(() => {
    let filtered = mediaData.filter((item) => item.type === "photo");

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case "likes":
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case "views":
        filtered.sort((a, b) => b.views - a.views);
        break;
      case "shares":
        filtered.sort((a, b) => b.shares - a.shares);
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  const allCategories = ["All", ...categoriesData.map((c) => c.name)];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Photo Gallery
          </h1>
          <p className="text-gray-400">
            {searchQuery
              ? `Showing results for "${searchQuery}"`
              : "Explore our collection of stunning photographs"}
          </p>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 rounded-2xl bg-gray-800/30 border border-gray-700/50">
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
                      : "bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-4 py-2 pr-10 bg-gray-700/50 border border-gray-600 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="flex items-center p-1 bg-gray-700/50 rounded-xl">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-gray-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("compact")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "compact"
                    ? "bg-gray-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-400">
            Showing{" "}
            <span className="text-white font-medium">{photos.length}</span>{" "}
            photos
          </p>
        </div>

        {/* Gallery Grid */}
        {photos.length > 0 ? (
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
            }`}
          >
            {photos.map((photo) => (
              <MediaCard
                key={photo.id}
                id={photo.id}
                src={photo.src}
                title={photo.title}
                description={photo.description}
                type="photo"
                likes={photo.likes}
                shares={photo.shares}
                views={photo.views}
                isFavorite={photo.isFavorite}
                category={photo.category}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            type={searchQuery ? "search" : "photos"}
            title={searchQuery ? "No photos found" : "No photos yet"}
            description={
              searchQuery
                ? `No photos match "${searchQuery}". Try a different search term.`
                : "Start uploading photos to see them here."
            }
          />
        )}
      </div>
    </div>
  );
}
