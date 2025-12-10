import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Fetch all media with optional filters
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get("type"); // "photo" or "video"
        const category = searchParams.get("category");
        const search = searchParams.get("search");
        const favorites = searchParams.get("favorites");
        const sort = searchParams.get("sort") || "recent";
        const limit = parseInt(searchParams.get("limit") || "50");
        const offset = parseInt(searchParams.get("offset") || "0");

        // Build where clause
        const where: any = {};

        if (type) {
            where.type = type;
        }

        if (category) {
            where.category = category;
        }

        if (favorites === "true") {
            where.isFavorite = true;
        }

        if (search) {
            where.OR = [
                { title: { contains: search } },
                { description: { contains: search } },
            ];
        }

        // Build orderBy
        let orderBy: any = { createdAt: "desc" };
        switch (sort) {
            case "likes":
                orderBy = { likes: "desc" };
                break;
            case "views":
                orderBy = { views: "desc" };
                break;
            case "shares":
                orderBy = { shares: "desc" };
                break;
            case "oldest":
                orderBy = { createdAt: "asc" };
                break;
        }

        const [media, total] = await Promise.all([
            prisma.media.findMany({
                where,
                orderBy,
                take: limit,
                skip: offset,
            }),
            prisma.media.count({ where }),
        ]);

        return NextResponse.json({
            data: media,
            total,
            limit,
            offset,
        });
    } catch (error) {
        console.error("Error fetching media:", error);
        return NextResponse.json(
            { error: "Failed to fetch media" },
            { status: 500 }
        );
    }
}

// POST - Create new media
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const media = await prisma.media.create({
            data: {
                title: body.title,
                description: body.description,
                src: body.src,
                type: body.type || "photo",
                category: body.category,
                collectionId: body.collectionId,
            },
        });

        return NextResponse.json(media, { status: 201 });
    } catch (error) {
        console.error("Error creating media:", error);
        return NextResponse.json(
            { error: "Failed to create media" },
            { status: 500 }
        );
    }
}
