import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST - Like a media
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const media = await prisma.media.update({
            where: { id },
            data: { likes: { increment: 1 } },
        });

        return NextResponse.json({ likes: media.likes });
    } catch (error) {
        console.error("Error liking media:", error);
        return NextResponse.json(
            { error: "Failed to like media" },
            { status: 500 }
        );
    }
}

// DELETE - Unlike a media
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const media = await prisma.media.update({
            where: { id },
            data: { likes: { decrement: 1 } },
        });

        return NextResponse.json({ likes: Math.max(0, media.likes) });
    } catch (error) {
        console.error("Error unliking media:", error);
        return NextResponse.json(
            { error: "Failed to unlike media" },
            { status: 500 }
        );
    }
}
