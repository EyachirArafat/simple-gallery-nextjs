import { LoadingGrid } from "@/components/ui/loading-spinner";
import prisma from "@/lib/prisma";
import { Suspense } from "react";
import GalleryClient from "./gallery-client";

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) {
  const params = await searchParams;
  const searchQuery = params.search || "";
  const categoryFilter = params.category || "";

  // Build where clause
  const where: any = {
    type: "photo",
  };

  if (searchQuery) {
    where.OR = [
      { title: { contains: searchQuery } },
      { description: { contains: searchQuery } },
    ];
  }

  if (categoryFilter) {
    where.category = categoryFilter;
  }

  // Fetch photos from database
  const photos = await prisma.media.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  // Fetch categories for filter
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <Suspense
      fallback={
        <div className="p-8">
          <LoadingGrid count={6} />
        </div>
      }
    >
      <GalleryClient
        initialPhotos={photos}
        categories={categories}
        searchQuery={searchQuery}
      />
    </Suspense>
  );
}
