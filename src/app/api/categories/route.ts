import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Fetch all categories with media count
export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: "asc" },
        });

        // Get media count for each category
        const categoriesWithCount = await Promise.all(
            categories.map(async (cat: typeof categories[number]) => {
                const count = await prisma.media.count({
                    where: { category: cat.name },
                });
                return {
                    ...cat,
                    mediaCount: count,
                };
            })
        );

        return NextResponse.json(categoriesWithCount);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json(
            { error: "Failed to fetch categories" },
            { status: 500 }
        );
    }
}
