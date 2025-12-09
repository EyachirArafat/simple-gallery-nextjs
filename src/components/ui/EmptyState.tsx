import { Image as ImageIcon, FolderOpen, Search, Heart, Video, RefreshCw } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
    type?: "default" | "photos" | "videos" | "search" | "favorites" | "collections";
    title?: string;
    description?: string;
    actionLabel?: string;
    actionHref?: string;
    onAction?: () => void;
}

const emptyStateConfig = {
    default: {
        icon: ImageIcon,
        title: "No content yet",
        description: "Start by uploading your first photo or video to get started.",
        actionLabel: "Upload Media",
        actionHref: "/upload",
    },
    photos: {
        icon: ImageIcon,
        title: "No photos found",
        description: "Your photo gallery is empty. Upload some amazing shots!",
        actionLabel: "Upload Photos",
        actionHref: "/upload",
    },
    videos: {
        icon: Video,
        title: "No videos found",
        description: "Your video collection is empty. Add some awesome videos!",
        actionLabel: "Upload Videos",
        actionHref: "/upload",
    },
    search: {
        icon: Search,
        title: "No results found",
        description: "We couldn't find anything matching your search. Try different keywords.",
        actionLabel: "Clear Search",
        actionHref: "/gallery",
    },
    favorites: {
        icon: Heart,
        title: "No favorites yet",
        description: "Start adding photos and videos to your favorites collection.",
        actionLabel: "Browse Gallery",
        actionHref: "/gallery",
    },
    collections: {
        icon: FolderOpen,
        title: "No collections yet",
        description: "Create your first collection to organize your media.",
        actionLabel: "Create Collection",
        actionHref: "/collections",
    },
};

export default function EmptyState({
    type = "default",
    title,
    description,
    actionLabel,
    actionHref,
    onAction,
}: EmptyStateProps) {
    const config = emptyStateConfig[type];
    const Icon = config.icon;

    const displayTitle = title || config.title;
    const displayDescription = description || config.description;
    const displayActionLabel = actionLabel || config.actionLabel;
    const displayActionHref = actionHref || config.actionHref;

    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            {/* Animated Icon Container */}
            <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-2xl animate-pulse" />
                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 flex items-center justify-center">
                    <Icon className="w-10 h-10 text-gray-500" />
                </div>
            </div>

            {/* Text Content */}
            <h3 className="text-xl font-semibold text-white mb-2">
                {displayTitle}
            </h3>
            <p className="text-gray-400 text-sm max-w-sm mb-6">
                {displayDescription}
            </p>

            {/* Action Button */}
            {onAction ? (
                <button
                    onClick={onAction}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-sm font-medium rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-200 hover:-translate-y-0.5"
                >
                    {displayActionLabel}
                </button>
            ) : (
                <Link
                    href={displayActionHref}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-sm font-medium rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-200 hover:-translate-y-0.5"
                >
                    {displayActionLabel}
                </Link>
            )}
        </div>
    );
}
