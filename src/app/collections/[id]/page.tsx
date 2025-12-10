"use client";

import EmptyState from "@/components/ui/empty-state";
import MediaCard from "@/components/ui/media-card";
import { mediaData } from "@/data/db";
import { ArrowLeft, Edit2, Folder, Image, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

// Sample collection data
const collectionsData = {
  "1": {
    id: "1",
    name: "Nature Photography",
    description:
      "Beautiful landscapes and nature shots from around the world. This collection features stunning sunsets, mountains, forests, and wildlife.",
    coverImage:
      "https://img.freepik.com/premium-photo/silhouette-person-mountains-man-taking-photo-with-camera-world-photography-day_1115207-4177.jpg",
    createdAt: "2024-01-15",
  },
  "2": {
    id: "2",
    name: "Urban Exploration",
    description: "City life and architecture from various metropolitan areas.",
    coverImage:
      "https://img.freepik.com/free-photo/nature-landscape-with-hand-holding-frame_23-2149389976.jpg",
    createdAt: "2024-02-20",
  },
  "3": {
    id: "3",
    name: "Wildlife Moments",
    description:
      "Amazing animal photography collection from safaris and nature reserves.",
    coverImage:
      "https://img.freepik.com/free-photo/professional-photographer-takes-photos-with-camera-tripod-rocky-peak-sunset_335224-433.jpg",
    createdAt: "2024-03-10",
  },
};

export default function CollectionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const collectionId = params.id as string;

  const collection =
    collectionsData[collectionId as keyof typeof collectionsData];
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(collection?.name || "");
  const [editDescription, setEditDescription] = useState(
    collection?.description || ""
  );

  // Get some media for this collection
  const collectionMedia = mediaData.map((item) => ({
    id: item.id,
    src: item.src,
    title: item.title,
    description: item.des,
    type: item.types as "photo" | "video",
    likes: item.like,
    shares: item.share,
    views: Math.floor(Math.random() * 10000) + 1000,
    isFavorite: false,
  }));

  if (!collection) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container max-w-7xl mx-auto">
          <EmptyState
            type="collections"
            title="Collection not found"
            description="This collection doesn't exist or has been deleted."
            actionLabel="Back to Collections"
            actionHref="/collections"
          />
        </div>
      </div>
    );
  }

  const handleSaveEdit = () => {
    // In real app, this would save to database
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this collection?")) {
      router.push("/collections");
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Collections
        </Link>

        {/* Collection Header */}
        <div className="relative rounded-3xl overflow-hidden mb-8">
          {/* Cover Image */}
          <div className="h-48 md:h-64 bg-gray-800">
            {collection.coverImage && (
              <img
                src={collection.coverImage}
                alt={collection.name}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg flex-shrink-0">
                  <Folder className="w-7 h-7 text-white" />
                </div>
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="text-2xl md:text-3xl font-bold bg-transparent border-b-2 border-green-500 text-white outline-none"
                    />
                  ) : (
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {collection.name}
                    </h1>
                  )}
                  {isEditing ? (
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full mt-2 bg-gray-800/50 border border-gray-600 rounded-lg p-2 text-gray-300 text-sm outline-none focus:border-green-500"
                      rows={2}
                    />
                  ) : (
                    <p className="text-gray-400 max-w-2xl">
                      {collection.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-2.5 rounded-lg bg-gray-800/70 backdrop-blur-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleDelete}
                      className="p-2.5 rounded-lg bg-gray-800/70 backdrop-blur-sm text-gray-300 hover:text-red-400 hover:bg-red-500/20 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 mb-8 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Image className="w-4 h-4" />
            <span>{collectionMedia.length} items</span>
          </div>
          <span>
            Created {new Date(collection.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Add Media Button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            Media in this collection
          </h2>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 text-gray-300 text-sm font-medium rounded-xl transition-all">
            <Plus className="w-4 h-4" />
            Add Media
          </button>
        </div>

        {/* Collection Media Grid */}
        {collectionMedia.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collectionMedia.map((item) => (
              <MediaCard key={item.id} {...item} />
            ))}
          </div>
        ) : (
          <EmptyState
            type="default"
            title="No media in this collection"
            description="Start adding photos and videos to this collection."
            actionLabel="Browse Gallery"
            actionHref="/gallery"
          />
        )}
      </div>
    </div>
  );
}
