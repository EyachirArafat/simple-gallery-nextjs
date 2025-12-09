import Link from "next/link";
import { ArrowRight, Image, Video, Folder, Upload, TrendingUp, Users, Eye, Star } from "lucide-react";
import { mediaData } from "@/data/db";
import MediaCard from "@/components/ui/MediaCard";

const stats = [
  { label: "Total Views", value: "12.5M+", icon: Eye, color: "from-purple-500 to-blue-500" },
  { label: "Active Users", value: "50K+", icon: Users, color: "from-blue-500 to-cyan-500" },
  { label: "Media Uploads", value: "100K+", icon: TrendingUp, color: "from-cyan-500 to-green-500" },
  { label: "5-Star Reviews", value: "4.9", icon: Star, color: "from-yellow-500 to-orange-500" },
];

const features = [
  {
    icon: Image,
    title: "Photo Gallery",
    description: "Browse stunning high-quality photos from creators worldwide.",
    href: "/gallery",
    color: "from-purple-500/20 to-purple-600/20",
    borderColor: "border-purple-500/30",
    iconColor: "text-purple-400",
  },
  {
    icon: Video,
    title: "Video Collection",
    description: "Watch amazing videos in HD quality with smooth playback.",
    href: "/videos",
    color: "from-blue-500/20 to-blue-600/20",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-400",
  },
  {
    icon: Folder,
    title: "Collections",
    description: "Organize your media into beautiful curated collections.",
    href: "/collections",
    color: "from-green-500/20 to-green-600/20",
    borderColor: "border-green-500/30",
    iconColor: "text-green-400",
  },
  {
    icon: Upload,
    title: "Easy Upload",
    description: "Drag and drop to upload your photos and videos instantly.",
    href: "/upload",
    color: "from-orange-500/20 to-orange-600/20",
    borderColor: "border-orange-500/30",
    iconColor: "text-orange-400",
  },
];

export default function HomePage() {
  const recentMedia = mediaData.slice(0, 6).map((item, index) => ({
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 overflow-hidden">
        {/* Hero Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/30 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-6 animate-fadeIn">
            <Star className="w-4 h-4 fill-purple-400 text-purple-400" />
            <span>Welcome to MediaHub</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fadeInUp">
            Your Ultimate
            <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Media Platform
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
            Discover, upload, and share stunning photos and videos. Join thousands of creators showcasing their amazing work.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:-translate-y-1"
            >
              Explore Gallery
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1"
            >
              <Upload className="w-5 h-5" />
              Start Uploading
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="relative group p-6 rounded-2xl bg-gray-800/30 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gray-700/50 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
                      <Icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Powerful features to help you manage, organize, and share your media content.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className={`group relative p-6 rounded-2xl bg-gradient-to-br ${feature.color} border ${feature.borderColor} hover:border-opacity-100 transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gray-900/50 flex items-center justify-center mb-4 ${feature.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-white text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">{feature.description}</p>
                  <span className="inline-flex items-center text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Uploads Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Recent Uploads
              </h2>
              <p className="text-gray-400">
                Check out the latest photos and videos from our community.
              </p>
            </div>
            <Link
              href="/gallery"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 text-white text-sm font-medium rounded-xl transition-all"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentMedia.map((item) => (
              <MediaCard key={item.id} {...item} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 text-white font-medium rounded-xl transition-all"
            >
              View All Media
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/30 rounded-full blur-[100px]" />

            <div className="relative text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Creating?
              </h2>
              <p className="text-gray-300 max-w-xl mx-auto mb-8">
                Join our community of creators and start sharing your amazing photos and videos today.
              </p>
              <Link
                href="/upload"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <Upload className="w-5 h-5" />
                Upload Your First Media
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
