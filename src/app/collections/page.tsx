"use client";

import { useState } from "react";
import Link from "next/link";
import { Folder, Plus, Image, MoreVertical, Pencil, Trash2 } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";

// Sample collections data
const sampleCollections = [
    {
        id: "1",
        name: "Nature Photography",
        description: "Beautiful landscapes and nature shots",
        coverImage: "https://img.freepik.com/premium-photo/silhouette-person-mountains-man-taking-photo-with-camera-world-photography-day_1115207-4177.jpg",
        mediaCount: 24,
    },
    {
        id: "2",
        name: "Urban Exploration",
        description: "City life and architecture",
        coverImage: "https://img.freepik.com/free-photo/nature-landscape-with-hand-holding-frame_23-2149389976.jpg",
        mediaCount: 18,
    },
    {
        id: "3",
        name: "Wildlife Moments",
        description: "Animal photography collection",
        coverImage: "https://img.freepik.com/free-photo/professional-photographer-takes-photos-with-camera-tripod-rocky-peak-sunset_335224-433.jpg",
        mediaCount: 32,
    },
];

export default function CollectionsPage() {
    const [collections, setCollections] = useState(sampleCollections);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newCollectionName, setNewCollectionName] = useState("");

    const handleCreateCollection = () => {
        if (!newCollectionName.trim()) return;

        const newCollection = {
            id: Date.now().toString(),
            name: newCollectionName,
            description: "",
            coverImage: "",
            mediaCount: 0,
        };

        setCollections([newCollection, ...collections]);
        setNewCollectionName("");
        setShowCreateModal(false);
    };

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="container max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                                <Folder className="w-5 h-5 text-white" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white">
                                Collections
                            </h1>
                        </div>
                        <p className="text-gray-400">
                            Organize your media into beautiful collections
                        </p>
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-medium rounded-xl shadow-lg shadow-green-500/25 transition-all duration-200"
                    >
                        <Plus className="w-4 h-4" />
                        New Collection
                    </button>
                </div>

                {/* Collections Grid */}
                {collections.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {collections.map((collection) => (
                            <Link
                                key={collection.id}
                                href={`/collections/${collection.id}`}
                                className="group relative overflow-hidden rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-green-500/30 transition-all duration-300"
                            >
                                {/* Cover Image */}
                                <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
                                    {collection.coverImage ? (
                                        <img
                                            src={collection.coverImage}
                                            alt={collection.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Folder className="w-16 h-16 text-gray-700" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />

                                    {/* Media Count Badge */}
                                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-gray-900/70 backdrop-blur-sm text-xs font-medium text-gray-200 flex items-center gap-1.5">
                                        <Image className="w-3.5 h-3.5" />
                                        {collection.mediaCount}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="font-semibold text-white text-lg mb-1 group-hover:text-green-400 transition-colors">
                                        {collection.name}
                                    </h3>
                                    {collection.description && (
                                        <p className="text-sm text-gray-400 line-clamp-2">
                                            {collection.description}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        type="collections"
                        title="No collections yet"
                        description="Create your first collection to organize your media."
                        actionLabel="Create Collection"
                        onAction={() => setShowCreateModal(true)}
                    />
                )}

                {/* Create Collection Modal */}
                {showCreateModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <div
                            className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md animate-scaleIn"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-xl font-bold text-white mb-4">Create New Collection</h2>
                            <input
                                type="text"
                                value={newCollectionName}
                                onChange={(e) => setNewCollectionName(e.target.value)}
                                placeholder="Collection name"
                                className="w-full px-4 py-3 mb-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
                                autoFocus
                            />
                            <div className="flex gap-3 justify-end">
                                <button
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-5 py-2.5 text-gray-300 hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateCollection}
                                    disabled={!newCollectionName.trim()}
                                    className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
