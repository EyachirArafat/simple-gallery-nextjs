import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Fetch single media by ID
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const media = await prisma.media.findUnique({
            where: { id },
            include: {
                collection: true,
            },
        });

        if (!media) {
            return NextResponse.json(
                { error: "Media not found" },
                { status: 404 }
            );
        }

        // Increment view count
        await prisma.media.update({
            where: { id },
            data: { views: { increment: 1 } },
        });

        return NextResponse.json(media);
    } catch (error) {
        console.error("Error fetching media:", error);
        return NextResponse.json(
            { error: "Failed to fetch media" },
            { status: 500 }
        );
    }
}

// PUT - Update media
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const media = await prisma.media.update({
            where: { id },
            data: {
                title: body.title,
                description: body.description,
                category: body.category,
                isFavorite: body.isFavorite,
                collectionId: body.collectionId,
            },
        });

        return NextResponse.json(media);
    } catch (error) {
        console.error("Error updating media:", error);
        return NextResponse.json(
            { error: "Failed to update media" },
            { status: 500 }
        );
    }
}

// DELETE - Delete media
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        await prisma.media.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Media deleted successfully" });
    } catch (error) {
        console.error("Error deleting media:", error);
        return NextResponse.json(
            { error: "Failed to delete media" },
            { status: 500 }
        );
    }
}
