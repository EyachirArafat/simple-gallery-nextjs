"use client";

import EmptyState from "@/components/ui/empty-state";
import MediaCard from "@/components/ui/media-card";
import { mediaData } from "@/data/static-data";
import { Play, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

const categories = [
  "All",
  "Nature",
  "Wildlife",
  "Urban",
  "Portrait",
  "Abstract",
];
const sortOptions = [
  { label: "Most Recent", value: "recent" },
  { label: "Most Liked", value: "likes" },
  { label: "Most Viewed", value: "views" },
];

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("recent");

  const videos = useMemo(() => {
    let filtered = mediaData.filter((item) => item.type === "video");

    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    switch (sortBy) {
      case "likes":
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case "views":
        filtered.sort((a, b) => b.views - a.views);
        break;
      default:
        break;
    }

    return filtered;
  }, [selectedCategory, sortBy]);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Video Collection
            </h1>
          </div>
          <p className="text-gray-400">
            Watch amazing videos from creators around the world
          </p>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 rounded-2xl bg-gray-800/30 border border-gray-700/50">
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25"
                      : "bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none px-4 py-2 pr-10 bg-gray-700/50 border border-gray-600 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-400">
            Showing{" "}
            <span className="text-white font-medium">{videos.length}</span>{" "}
            videos
          </p>
        </div>

        {/* Videos Grid */}
        {videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <MediaCard
                key={video.id}
                id={video.id}
                src={video.src}
                title={video.title}
                description={video.description}
                type="video"
                likes={video.likes}
                shares={video.shares}
                views={video.views}
                isFavorite={video.isFavorite}
                category={video.category}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            type="videos"
            title="No videos found"
            description="No videos match your current filters. Try a different category."
          />
        )}
      </div>
    </div>
  );
}
