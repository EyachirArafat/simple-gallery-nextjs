import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Fetch single collection with media
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const collection = await prisma.collection.findUnique({
            where: { id },
            include: {
                media: {
                    orderBy: { createdAt: "desc" },
                },
            },
        });

        if (!collection) {
            return NextResponse.json(
                { error: "Collection not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(collection);
    } catch (error) {
        console.error("Error fetching collection:", error);
        return NextResponse.json(
            { error: "Failed to fetch collection" },
            { status: 500 }
        );
    }
}

// PUT - Update collection
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const collection = await prisma.collection.update({
            where: { id },
            data: {
                name: body.name,
                description: body.description,
                coverImage: body.coverImage,
            },
        });

        return NextResponse.json(collection);
    } catch (error) {
        console.error("Error updating collection:", error);
        return NextResponse.json(
            { error: "Failed to update collection" },
            { status: 500 }
        );
    }
}

// DELETE - Delete collection
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // First, remove collection reference from all media
        await prisma.media.updateMany({
            where: { collectionId: id },
            data: { collectionId: null },
        });

        // Then delete the collection
        await prisma.collection.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Collection deleted successfully" });
    } catch (error) {
        console.error("Error deleting collection:", error);
        return NextResponse.json(
            { error: "Failed to delete collection" },
            { status: 500 }
        );
    }
}
