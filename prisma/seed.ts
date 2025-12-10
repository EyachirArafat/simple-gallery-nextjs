import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const mediaData = [
    // Nature Photos
    {
        type: "photo",
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
        title: "Mountain Sunrise",
        description: "Breathtaking sunrise over the Himalayan mountain peaks with golden light illuminating the snow-capped summits.",
        likes: 1245,
        shares: 342,
        views: 15678,
        category: "Nature",
    },
    {
        type: "photo",
        src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
        title: "Forest Serenity",
        description: "Peaceful morning in a misty forest with sunlight streaming through the trees creating a magical atmosphere.",
        likes: 987,
        shares: 256,
        views: 12345,
        category: "Nature",
    },
    {
        type: "photo",
        src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80",
        title: "Ocean Waves",
        description: "Stunning aerial view of turquoise ocean waves crashing against the golden sandy beach.",
        likes: 2341,
        shares: 567,
        views: 23456,
        category: "Nature",
    },
    {
        type: "photo",
        src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
        title: "Green Valley",
        description: "Lush green valley surrounded by majestic mountains with a winding river flowing through.",
        likes: 1567,
        shares: 423,
        views: 18765,
        category: "Nature",
    },
    // Urban Photos
    {
        type: "photo",
        src: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
        title: "City Skyline",
        description: "Spectacular night view of New York City skyline with illuminated skyscrapers reflecting on the water.",
        likes: 3456,
        shares: 789,
        views: 34567,
        category: "Urban",
    },
    {
        type: "photo",
        src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
        title: "Street Photography",
        description: "Vibrant city street at dusk with neon lights and busy pedestrians creating an urban symphony.",
        likes: 2134,
        shares: 534,
        views: 21345,
        category: "Urban",
    },
    {
        type: "photo",
        src: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80",
        title: "Modern Architecture",
        description: "Geometric patterns of a modern glass building reflecting the sunset sky in stunning detail.",
        likes: 1876,
        shares: 412,
        views: 16543,
        category: "Urban",
    },
    // Wildlife Photos
    {
        type: "photo",
        src: "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=800&q=80",
        title: "Majestic Lion",
        description: "A powerful lion resting in the African savanna during golden hour, showcasing nature's king.",
        likes: 4567,
        shares: 1234,
        views: 45678,
        category: "Wildlife",
    },
    {
        type: "photo",
        src: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800&q=80",
        title: "Sea Turtle",
        description: "Graceful sea turtle swimming through crystal clear tropical waters surrounded by colorful fish.",
        likes: 2345,
        shares: 567,
        views: 23456,
        category: "Wildlife",
    },
    {
        type: "photo",
        src: "https://images.unsplash.com/photo-1551085254-e96b210db58a?w=800&q=80",
        title: "Colorful Parrot",
        description: "Vibrant macaw parrot with stunning red, blue and yellow feathers in the Amazon rainforest.",
        likes: 1890,
        shares: 445,
        views: 17890,
        category: "Wildlife",
    },
    // Portrait Photos
    {
        type: "photo",
        src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
        title: "Studio Portrait",
        description: "Elegant studio portrait with dramatic lighting highlighting the subject's features beautifully.",
        likes: 3234,
        shares: 678,
        views: 32345,
        category: "Portrait",
    },
    {
        type: "photo",
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        title: "Natural Light Portrait",
        description: "Beautiful outdoor portrait captured during golden hour with soft, warm natural lighting.",
        likes: 2567,
        shares: 534,
        views: 25678,
        category: "Portrait",
    },
    // Abstract Photos
    {
        type: "photo",
        src: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80",
        title: "Fluid Art",
        description: "Mesmerizing abstract fluid art with swirling colors creating a dreamlike visual experience.",
        likes: 1456,
        shares: 345,
        views: 14567,
        category: "Abstract",
    },
    {
        type: "photo",
        src: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=800&q=80",
        title: "Light Trails",
        description: "Long exposure photography capturing colorful light trails in a mesmerizing abstract pattern.",
        likes: 1789,
        shares: 423,
        views: 17890,
        category: "Abstract",
    },
    // Videos
    {
        type: "video",
        src: "https://www.youtube.com/embed/LXb3EKWsInQ",
        title: "Costa Rica 4K Nature",
        description: "Experience the stunning beauty of Costa Rica's wildlife and landscapes in breathtaking 4K resolution.",
        likes: 5678,
        shares: 1234,
        views: 56789,
        category: "Nature",
    },
    {
        type: "video",
        src: "https://www.youtube.com/embed/BHACKCNDMW8",
        title: "Iceland Drone Footage",
        description: "Spectacular aerial drone footage of Iceland's otherworldly landscapes, waterfalls, and glaciers.",
        likes: 4532,
        shares: 987,
        views: 45321,
        category: "Nature",
    },
    {
        type: "video",
        src: "https://www.youtube.com/embed/1La4QzGeaaQ",
        title: "Time Lapse Earth",
        description: "Beautiful time lapse compilation showing the Earth from space captured by astronauts.",
        likes: 7890,
        shares: 2345,
        views: 78901,
        category: "Nature",
    },
    {
        type: "video",
        src: "https://www.youtube.com/embed/wTblbYqQQag",
        title: "African Safari",
        description: "Amazing wildlife safari experience featuring lions, elephants, and other incredible African animals.",
        likes: 6789,
        shares: 1567,
        views: 67890,
        category: "Wildlife",
    },
    {
        type: "video",
        src: "https://www.youtube.com/embed/2OEL4P1Rz04",
        title: "Northern Lights",
        description: "Stunning time-lapse of the Aurora Borealis dancing across the Norwegian night sky.",
        likes: 8901,
        shares: 2678,
        views: 89012,
        category: "Nature",
    },
    // More Photos
    {
        type: "photo",
        src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80",
        title: "Desert Dunes",
        description: "Golden sand dunes stretching to the horizon with beautiful shadows created by the setting sun.",
        likes: 1567,
        shares: 378,
        views: 15678,
        category: "Nature",
    },
    {
        type: "photo",
        src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80",
        title: "Waterfall Paradise",
        description: "Majestic waterfall cascading down rocky cliffs surrounded by lush green tropical vegetation.",
        likes: 2890,
        shares: 634,
        views: 28901,
        category: "Nature",
    },
    {
        type: "photo",
        src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&q=80",
        title: "Cherry Blossoms",
        description: "Beautiful pink cherry blossoms in full bloom creating a dreamy spring atmosphere.",
        likes: 3421,
        shares: 812,
        views: 34210,
        category: "Nature",
    },
    {
        type: "photo",
        src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
        title: "Manhattan Bridge",
        description: "Iconic view of Manhattan Bridge and NYC skyline at twilight with city lights beginning to glow.",
        likes: 4123,
        shares: 934,
        views: 41234,
        category: "Urban",
    },
];

const categoriesData = [
    { name: "Nature", slug: "nature", icon: "🏔️", color: "#22c55e" },
    { name: "Wildlife", slug: "wildlife", icon: "🦁", color: "#f59e0b" },
    { name: "Urban", slug: "urban", icon: "🏙️", color: "#3b82f6" },
    { name: "Portrait", slug: "portrait", icon: "👤", color: "#a855f7" },
    { name: "Abstract", slug: "abstract", icon: "🎨", color: "#ec4899" },
];

const collectionsData = [
    {
        name: "Nature Photography",
        description: "Beautiful landscapes and nature shots from around the world.",
        coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    },
    {
        name: "Urban Exploration",
        description: "City life and architecture from various metropolitan areas.",
        coverImage: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
    },
    {
        name: "Wildlife Moments",
        description: "Amazing animal photography collection from safaris and nature reserves.",
        coverImage: "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=800&q=80",
    },
];

async function main() {
    console.log("🌱 Starting database seeding...");

    // Clear existing data
    await prisma.media.deleteMany();
    await prisma.collection.deleteMany();
    await prisma.category.deleteMany();

    console.log("✅ Cleared existing data");

    // Seed categories
    for (const category of categoriesData) {
        await prisma.category.create({
            data: category,
        });
    }
    console.log(`✅ Created ${categoriesData.length} categories`);

    // Seed collections
    for (const collection of collectionsData) {
        await prisma.collection.create({
            data: collection,
        });
    }
    console.log(`✅ Created ${collectionsData.length} collections`);

    // Seed media
    for (const media of mediaData) {
        await prisma.media.create({
            data: media,
        });
    }
    console.log(`✅ Created ${mediaData.length} media items`);

    console.log("🎉 Database seeding completed!");
}

main()
    .catch((e) => {
        console.error("❌ Error seeding database:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
