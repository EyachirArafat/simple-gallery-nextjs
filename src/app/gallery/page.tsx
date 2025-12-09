"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, Grid3X3, LayoutGrid, SlidersHorizontal } from "lucide-react";
import { mediaData } from "@/data/db";
import MediaCard from "@/components/ui/MediaCard";
import EmptyState from "@/components/ui/EmptyState";

const categories = ["All", "Nature", "Wildlife", "Urban", "Portrait", "Abstract"];
const sortOptions = [
    { label: "Most Recent", value: "recent" },
    { label: "Most Liked", value: "likes" },
    { label: "Most Viewed", value: "views" },
    { label: "Most Shared", value: "shares" },
];

export default function GalleryPage() {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search") || "";

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("recent");
    const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");

    // Transform and filter data
    const photos = useMemo(() => {
        let filtered = mediaData
            .filter((item) => item.types === "photo")
            .map((item, index) => ({
                id: item.id,
                src: item.src,
                title: item.title,
                description: item.des,
                type: "photo" as const,
                likes: item.like,
                shares: item.share,
                views: Math.floor(Math.random() * 10000) + 500,
                isFavorite: false,
                category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
            }));

        // Filter by search
        if (searchQuery) {
            filtered = filtered.filter(
                (item) =>
                    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.description?.toLowerCase().includes(searchQuery.toLowerCase())
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
                // Keep original order for "recent"
                break;
        }

        return filtered;
    }, [searchQuery, selectedCategory, sortBy]);

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
                            : "Explore our collection of stunning photographs"
                        }
                    </p>
                </div>

                {/* Filters Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 rounded-2xl bg-gray-800/30 border border-gray-700/50">
                    {/* Categories */}
                    <div className="flex-1">
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${selectedCategory === category
                                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
                                            : "bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-3">
                        {/* Sort Dropdown */}
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

                        {/* View Mode Toggle */}
                        <div className="flex items-center p-1 bg-gray-700/50 rounded-xl">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2 rounded-lg transition-colors ${viewMode === "grid"
                                        ? "bg-gray-600 text-white"
                                        : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode("compact")}
                                className={`p-2 rounded-lg transition-colors ${viewMode === "compact"
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
                        Showing <span className="text-white font-medium">{photos.length}</span> photos
                    </p>
                </div>

                {/* Gallery Grid */}
                {photos.length > 0 ? (
                    <div
                        className={`grid gap-6 ${viewMode === "grid"
                                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                                : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                            }`}
                    >
                        {photos.map((photo) => (
                            <MediaCard key={photo.id} {...photo} />
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
