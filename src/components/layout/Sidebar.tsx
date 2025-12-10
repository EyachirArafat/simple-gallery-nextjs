"use client";

import { useSidebar } from "@/context/sidebar-context";
import {
  ChevronLeft,
  ChevronRight,
  Folder,
  Grid3X3,
  Heart,
  Home,
  Image,
  Info,
  Mail,
  Menu,
  Settings,
  Upload,
  Video,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { id: 1, label: "Home", href: "/", icon: Home },
  { id: 2, label: "Gallery", href: "/gallery", icon: Image },
  { id: 3, label: "Videos", href: "/videos", icon: Video },
  { id: 4, label: "Upload", href: "/upload", icon: Upload },
  { id: 5, label: "Collections", href: "/collections", icon: Folder },
  { id: 6, label: "Favorites", href: "/favorites", icon: Heart },
  { id: 7, label: "Categories", href: "/categories", icon: Grid3X3 },
];

const bottomItems = [
  { id: 8, label: "Settings", href: "/settings", icon: Settings },
  { id: 9, label: "About", href: "/about", icon: Info },
  { id: 10, label: "Contact", href: "/contact", icon: Mail },
];

export const Sidebar = () => {
  const { isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen } =
    useSidebar();
  const pathname = usePathname();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  const NavLink = ({ item }: { item: (typeof navItems)[0] }) => {
    const isActive = pathname === item.href;
    const Icon = item.icon;

    return (
      <Link
        href={item.href}
        onClick={() => setIsMobileOpen(false)}
        className={`
          group flex items-center gap-3 px-2.5 py-2.5 rounded-xl transition-all duration-200
          ${
            isActive
              ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-400 border border-purple-500/30"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }
        `}
      >
        <Icon
          className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${
            isActive ? "text-purple-400" : ""
          }`}
        />
        <span
          className={`font-medium whitespace-nowrap overflow-hidden transition-all duration-200 ${
            isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          }`}
        >
          {item.label}
        </span>
        {isActive && (
          <div className="absolute left-0 w-1 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-r-full" />
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMobile}
        className="fixed top-4 left-4 z-[60] p-2 rounded-xl bg-gray-900/90 border border-gray-700 text-gray-300 md:hidden hover:text-white transition-colors"
      >
        {isMobileOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50 
          bg-gray-900/95 backdrop-blur-xl border-r border-gray-800
          transition-all duration-300 ease-out
          ${isCollapsed ? "w-[72px]" : "w-64"}
          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8 px-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Image className="w-5 h-5 text-white" />
              </div>
              <span
                className={`font-bold text-xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent whitespace-nowrap overflow-hidden transition-all duration-200 ${
                  isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                }`}
              >
                MediaHub
              </span>
            </Link>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 space-y-1.5">
            {navItems.map((item) => (
              <NavLink key={item.id} item={item} />
            ))}
          </nav>

          {/* Divider */}
          <div className="h-px bg-gray-800 my-4" />

          {/* Bottom Navigation */}
          <nav className="space-y-1.5">
            {bottomItems.map((item) => (
              <NavLink key={item.id} item={item} />
            ))}
          </nav>

          {/* Toggle Button (Desktop only) */}
          <button
            onClick={toggleSidebar}
            className="hidden md:flex items-center justify-center w-8 h-8 mt-4 ml-auto rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
