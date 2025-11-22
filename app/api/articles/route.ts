import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/auth';

/**
 * GET /api/articles
 * Get published articles with optional filters
 */
export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const category = url.searchParams.get('category');
        const audience = url.searchParams.get('audience');
        const limit = parseInt(url.searchParams.get('limit') || '10');

        const where: any = {
            publishedAt: { lte: new Date() },
        };

        if (category && category !== 'all') {
            where.category = category;
        }

        if (audience) {
            where.targetAudience = { has: audience };
        }

        const articles = await prisma.article.findMany({
            where,
            orderBy: { publishedAt: 'desc' },
            take: limit,
            select: {
                id: true,
                title: true,
                slug: true,
                excerpt: true,
                featuredImage: true,
                category: true,
                publishedAt: true,
                author: true,
                tags: true,
            },
        });

        return NextResponse.json(articles);

    } catch (error) {
        console.error('Get articles error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
