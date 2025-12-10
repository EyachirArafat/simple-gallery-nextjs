import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST - Toggle favorite status
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Get current favorite status
        const currentMedia = await prisma.media.findUnique({
            where: { id },
            select: { isFavorite: true },
        });

        if (!currentMedia) {
            return NextResponse.json(
                { error: "Media not found" },
                { status: 404 }
            );
        }

        // Toggle favorite
        const media = await prisma.media.update({
            where: { id },
            data: { isFavorite: !currentMedia.isFavorite },
        });

        return NextResponse.json({ isFavorite: media.isFavorite });
    } catch (error) {
        console.error("Error toggling favorite:", error);
        return NextResponse.json(
            { error: "Failed to toggle favorite" },
            { status: 500 }
        );
    }
}
