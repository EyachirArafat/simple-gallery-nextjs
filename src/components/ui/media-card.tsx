"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Eye, Heart, Play, Share2, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface MediaCardProps {
  id: string;
  src: string;
  title: string;
  description?: string;
  type: "photo" | "video";
  likes: number;
  shares: number;
  views: number;
  isFavorite?: boolean;
  category?: string;
  onLike?: (id: string) => void;
  onFavorite?: (id: string) => void;
}

export default function MediaCard({
  id,
  src,
  title,
  description,
  type,
  likes,
  shares,
  views,
  isFavorite = false,
  category,
  onLike,
  onFavorite,
}: MediaCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [favorite, setFavorite] = useState(isFavorite);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    onLike?.(id);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorite(!favorite);
    onFavorite?.(id);
  };

  const isVideo = type === "video";
  const isYouTube = src.includes("youtube.com") || src.includes("youtu.be");

  return (
    <>
      {/* Card */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="group relative overflow-hidden rounded-2xl bg-gray-800/50 border border-gray-700/50 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsLightboxOpen(true)}
      >
        {/* Media Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {isVideo && isYouTube ? (
            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
              <Image
                src={`https://img.youtube.com/vi/${
                  src.split("/embed/")[1]?.split("?")[0]
                }/maxresdefault.jpg`}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
              </div>
            </div>
          ) : isVideo ? (
            <video
              src={src}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              muted
              loop
              onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
              onMouseLeave={(e) => (e.target as HTMLVideoElement).pause()}
            />
          ) : (
            <Image
              src={src}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Type Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-gray-900/70 backdrop-blur-sm text-gray-200 border border-gray-700/50">
              {isVideo ? "Video" : "Photo"}
            </span>
            {category && (
              <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-purple-500/20 backdrop-blur-sm text-purple-300 border border-purple-500/30">
                {category}
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <button
            onClick={handleFavorite}
            className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-sm transition-all duration-200 ${
              favorite
                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                : "bg-gray-900/70 text-gray-400 border border-gray-700/50 hover:text-red-400"
            }`}
          >
            <Heart className={`w-4 h-4 ${favorite ? "fill-current" : ""}`} />
          </button>

          {/* Bottom Info - Shows on Hover */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="font-semibold text-white text-lg mb-1 line-clamp-1">
              {title}
            </h3>
            {description && (
              <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                {description}
              </p>
            )}
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 hover:text-purple-400 transition-colors ${
                  liked ? "text-purple-400" : ""
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
                <span>{likes + (liked ? 1 : 0)}</span>
              </button>
              <span className="flex items-center gap-1.5">
                <Share2 className="w-4 h-4" />
                {shares}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                {views}
              </span>
            </div>
          </div>
        </div>
      </motion.article>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 p-3 rounded-xl bg-gray-800/50 text-white hover:bg-gray-700/50 transition-colors"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Media */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-[85vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {isVideo && isYouTube ? (
                <iframe
                  src={src}
                  className="w-full h-full rounded-2xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : isVideo ? (
                <video
                  src={src}
                  className="w-full h-full object-contain rounded-2xl"
                  controls
                  autoPlay
                />
              ) : (
                <Image
                  src={src}
                  alt={title}
                  fill
                  className="object-contain rounded-2xl"
                  sizes="100vw"
                />
              )}
            </motion.div>

            {/* Info Panel */}
            <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:bottom-4 bg-gray-900/80 backdrop-blur-xl rounded-2xl p-4 md:w-80 border border-gray-700/50">
              <h3 className="font-semibold text-white text-lg mb-2">{title}</h3>
              {description && (
                <p className="text-gray-400 text-sm mb-4">{description}</p>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4" />
                  {likes}
                </span>
                <span className="flex items-center gap-1.5">
                  <Share2 className="w-4 h-4" />
                  {shares}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  {views}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
