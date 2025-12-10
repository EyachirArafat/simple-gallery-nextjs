# MediaHub - Modern Media Platform

A beautiful, modern media platform built with Next.js 16, featuring stunning UI, dark/light themes, and a full-featured gallery system.

![MediaHub](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80)

## ✨ Features

- 🖼️ **Photo Gallery** - Browse stunning photos with filters and search
- 🎬 **Video Collection** - Watch videos with smooth playback
- 📁 **Collections** - Organize media into beautiful albums
- ❤️ **Favorites** - Save your favorite media
- 🏷️ **Categories** - Browse by Nature, Wildlife, Urban, Portrait, Abstract
- ⬆️ **Upload** - Drag & drop upload with preview
- 🌙 **Dark/Light Theme** - Toggle between themes
- 📱 **Responsive** - Works on all devices
- 🔍 **Search** - Find media instantly

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: SQLite with Prisma ORM
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **TypeScript**: Full type safety

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/EyachirArafat/simple-gallery-nextjs.git
   cd simple-gallery
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=file:./dev.db
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Seed the database** (optional - adds sample data)
   ```bash
   npm run db:seed
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   
   Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── media/         # Media CRUD endpoints
│   │   ├── collections/   # Collections endpoints
│   │   └── categories/    # Categories endpoint
│   ├── gallery/           # Photo gallery page
│   ├── videos/            # Videos page
│   ├── collections/       # Collections pages
│   ├── favorites/         # Favorites page
│   ├── categories/        # Categories page
│   ├── upload/            # Upload page
│   ├── settings/          # Settings page
│   ├── about/             # About page
│   └── contact/           # Contact page
├── components/
│   ├── layout/            # Sidebar, Navbar, Footer
│   └── ui/                # MediaCard, EmptyState, LoadingSpinner
├── context/               # React Context (SidebarContext)
├── lib/                   # Prisma client
└── prisma/
    ├── schema.prisma      # Database schema
    └── seed.ts            # Database seeder
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:reset` | Reset and reseed database |

## 🗄️ Database Schema

### Media
- `id`, `title`, `description`, `src`, `type` (photo/video)
- `category`, `likes`, `shares`, `views`, `isFavorite`

### Collection
- `id`, `name`, `description`, `coverImage`
- Has many Media items

### Category
- `id`, `name`, `slug`, `icon`, `color`

## 🎨 UI Components

- **MediaCard** - Displays media with hover effects, lightbox, like/favorite
- **EmptyState** - Friendly empty states for different sections
- **LoadingSpinner** - Loading states and skeleton loaders
- **Sidebar** - Collapsible navigation sidebar
- **Navbar** - Search, theme toggle, user actions

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

Made with ❤️ using Next.js
