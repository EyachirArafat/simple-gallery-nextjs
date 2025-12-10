"use client";

import { useSidebar } from "@/context/sidebar-context";

export function MainContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <div
      className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
        isCollapsed ? "md:ml-[72px]" : "md:ml-64"
      }`}
    >
      {children}
    </div>
  );
}
