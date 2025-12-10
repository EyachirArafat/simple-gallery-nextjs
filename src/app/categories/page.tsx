"use client";

import { LoadingGrid } from "@/components/ui/loading-spinner";
import {
  Building,
  Camera,
  Grid3X3,
  Image,
  Leaf,
  Mountain,
  Sparkles,
  User,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  color: string | null;
  mediaCount: number;
}

const iconMap: Record<string, React.ElementType> = {
  Nature: Mountain,
  Wildlife: Leaf,
  Urban: Building,
  Portrait: User,
  Abstract: Sparkles,
  Photography: Camera,
};

const colorMap: Record<
  string,
  { color: string; bgColor: string; borderColor: string }
> = {
  Nature: {
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
  },
  Wildlife: {
    color: "from-amber-500 to-orange-500",
    bgColor: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
  },
  Urban: {
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
  },
  Portrait: {
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
  },
  Abstract: {
    color: "from-pink-500 to-rose-500",
    bgColor: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/30",
  },
};

const defaultColors = {
  color: "from-gray-500 to-slate-500",
  bgColor: "from-gray-500/20 to-slate-500/20",
  borderColor: "border-gray-500/30",
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container max-w-7xl mx-auto">
          <LoadingGrid count={6} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <Grid3X3 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Categories
            </h1>
          </div>
          <p className="text-gray-400">
            Browse media by category to find exactly what you're looking for
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = iconMap[category.name] || Camera;
            const colors = colorMap[category.name] || defaultColors;

            return (
              <Link
                key={category.id}
                href={`/gallery?category=${category.slug}`}
                className={`group relative p-6 rounded-2xl bg-gradient-to-br ${colors.bgColor} border ${colors.borderColor} hover:border-opacity-100 transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
              >
                {/* Background Glow */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br ${colors.color} opacity-20 blur-2xl group-hover:opacity-30 transition-opacity`}
                />

                <div className="relative">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.color} flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {category.mediaCount} items
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Image className="w-4 h-4" />
                      Photos
                    </span>
                    <span className="flex items-center gap-1">
                      <Video className="w-4 h-4" />
                      Videos
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Browse All Section */}
        <div className="mt-12 p-8 rounded-2xl bg-gray-800/30 border border-gray-700/50 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Can't find what you're looking for?
          </h2>
          <p className="text-gray-400 mb-6">
            Browse our complete gallery to discover all available media.
          </p>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-200"
          >
            Browse All Media
          </Link>
        </div>
      </div>
    </div>
  );
}
