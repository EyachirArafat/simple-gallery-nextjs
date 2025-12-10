"use client";

import EmptyState from "@/components/ui/empty-state";
import { LoadingGrid } from "@/components/ui/loading-spinner";
import MediaCard from "@/components/ui/media-card";
import { Heart, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Media {
  id: string;
  title: string;
  description: string | null;
  src: string;
  type: string;
  category: string | null;
  likes: number;
  shares: number;
  views: number;
  isFavorite: boolean;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const res = await fetch("/api/media?favorites=true");
        const data = await res.json();
        setFavorites(data.data || []);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (id: string) => {
    try {
      await fetch(`/api/media/${id}/favorite`, { method: "POST" });
      setFavorites((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const handleClearAll = async () => {
    if (confirm("Are you sure you want to remove all favorites?")) {
      try {
        await Promise.all(
          favorites.map((item) =>
            fetch(`/api/media/${item.id}/favorite`, { method: "POST" })
          )
        );
        setFavorites([]);
      } catch (error) {
        console.error("Error clearing favorites:", error);
      }
    }
  };

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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Favorites
              </h1>
            </div>
            <p className="text-gray-400">
              Your collection of favorited photos and videos
            </p>
          </div>
          {favorites.length > 0 && (
            <button
              onClick={handleClearAll}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-800/50 hover:bg-red-500/20 border border-gray-700 hover:border-red-500/30 text-gray-300 hover:text-red-400 font-medium rounded-xl transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        {/* Favorites Count */}
        {favorites.length > 0 && (
          <div className="mb-6">
            <p className="text-sm text-gray-400">
              <span className="text-white font-medium">{favorites.length}</span>{" "}
              items in your favorites
            </p>
          </div>
        )}

        {/* Favorites Grid */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((item) => (
              <MediaCard
                key={item.id}
                id={item.id}
                src={item.src}
                title={item.title}
                description={item.description || undefined}
                type={item.type as "photo" | "video"}
                likes={item.likes}
                shares={item.shares}
                views={item.views}
                isFavorite={true}
                category={item.category || undefined}
                onFavorite={handleRemoveFavorite}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            type="favorites"
            title="No favorites yet"
            description="Start adding photos and videos to your favorites by clicking the heart icon."
            actionLabel="Browse Gallery"
            actionHref="/gallery"
          />
        )}
      </div>
    </div>
  );
}
