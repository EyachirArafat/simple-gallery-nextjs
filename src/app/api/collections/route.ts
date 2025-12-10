import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Fetch all collections
export async function GET() {
    try {
        const collections = await prisma.collection.findMany({
            include: {
                _count: {
                    select: { media: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        // Transform to include mediaCount
        const transformedCollections = collections.map((c: typeof collections[number]) => ({
            ...c,
            mediaCount: c._count.media,
            _count: undefined,
        }));

        return NextResponse.json(transformedCollections);
    } catch (error) {
        console.error("Error fetching collections:", error);
        return NextResponse.json(
            { error: "Failed to fetch collections" },
            { status: 500 }
        );
    }
}

// POST - Create new collection
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const collection = await prisma.collection.create({
            data: {
                name: body.name,
                description: body.description,
                coverImage: body.coverImage,
            },
        });

        return NextResponse.json(collection, { status: 201 });
    } catch (error) {
        console.error("Error creating collection:", error);
        return NextResponse.json(
            { error: "Failed to create collection" },
            { status: 500 }
        );
    }
}
