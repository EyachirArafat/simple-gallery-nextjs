import {
  Check,
  Code,
  Database,
  Folder,
  Heart,
  Image as ImageIcon,
  Info,
  Palette,
  Shield,
  Upload,
  Video,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: ImageIcon,
    title: "Photo Gallery",
    description: "Browse stunning high-quality photos with advanced filtering",
  },
  {
    icon: Video,
    title: "Video Collection",
    description: "Watch and manage your video content with smooth playback",
  },
  {
    icon: Folder,
    title: "Collections",
    description: "Organize media into beautiful curated collections",
  },
  {
    icon: Upload,
    title: "Easy Upload",
    description: "Drag and drop to upload with instant previews",
  },
  {
    icon: Heart,
    title: "Favorites",
    description: "Save your favorite media for quick access",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data is secure and private",
  },
];

const techStack = [
  {
    icon: Code,
    name: "Next.js 16",
    description: "React framework for production",
  },
  {
    icon: Palette,
    name: "Tailwind CSS",
    description: "Utility-first CSS framework",
  },
  { icon: Database, name: "Prisma", description: "Modern database ORM" },
  {
    icon: Zap,
    name: "Framer Motion",
    description: "Production-ready animations",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 mb-6 shadow-lg shadow-purple-500/30">
            <Info className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About MediaHub
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Your ultimate destination for stunning photos and videos. Discover,
            upload, and share amazing media content with the world.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16 p-8 rounded-3xl bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/20">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Our Mission</h2>
          </div>
          <p className="text-gray-300 leading-relaxed">
            We believe that everyone should have a beautiful, fast, and
            easy-to-use platform for showcasing their creativity. MediaHub was
            built to provide creators with the tools they need to organize,
            share, and discover amazing visual content. Whether you're a
            professional photographer, a casual video creator, or just someone
            who loves beautiful imagery, MediaHub is designed for you.
          </p>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Key Features
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-2xl bg-gray-800/30 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Built With
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {techStack.map((tech) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.name}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/30 border border-gray-700/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{tech.name}</h3>
                    <p className="text-sm text-gray-500">{tech.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Why Choose MediaHub?
          </h2>
          <div className="space-y-4">
            {[
              "Lightning-fast performance with optimized image loading",
              "Beautiful, modern UI with dark and light themes",
              "Fully responsive design for all devices",
              "Smooth animations and interactions",
              "Easy-to-use upload and organization tools",
              "Privacy-focused with your data security in mind",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-gray-800/20 border border-gray-800"
              >
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-green-400" />
                </div>
                <p className="text-gray-300">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Version Info */}
        <div className="text-center p-6 rounded-2xl bg-gray-800/20 border border-gray-800">
          <p className="text-gray-400">
            MediaHub v1.0.0 • © 2024 MediaHub. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
