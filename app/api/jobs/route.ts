import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/auth';

/**
 * GET /api/jobs
 * Get available care requests for carers
 * Prioritizes jobs matched to the carer
 */
export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');
        const userData = await getUserFromToken(token);

        if (!userData || userData.role !== 'carer') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get carer profile to find matches
        const carer = await prisma.carer.findUnique({
            where: { userId: userData.userId },
        });

        if (!carer) {
            return NextResponse.json({ error: 'Carer profile not found' }, { status: 404 });
        }

        // 1. Get specific matches for this carer
        const matches = await prisma.match.findMany({
            where: {
                carerId: carer.id,
                status: { in: ['suggested', 'family_interested'] },
                careRequest: {
                    status: 'matching'
                }
            },
            include: {
                careRequest: {
                    include: {
                        recipient: {
                            select: {
                                firstName: true,
                                gender: true,
                                mobilityLevel: true,
                                medicalConditions: true,
                            }
                        },
                        family: {
                            select: {
                                postcode: true,
                            }
                        }
                    }
                }
            },
            orderBy: {
                matchScore: 'desc'
            }
        });

        // Extract care requests from matches
        const matchedJobs = matches.map((m: any) => ({
            ...m.careRequest,
            matchScore: m.matchScore,
            isMatch: true
        }));

        // 2. Get other open jobs (excluding ones already matched)
        const matchedIds = matchedJobs.map((j: any) => j.id);

        const openJobs = await prisma.careRequest.findMany({
            where: {
                status: 'matching',
                id: { notIn: matchedIds }
            },
            include: {
                recipient: {
                    select: {
                        firstName: true,
                        gender: true,
                        mobilityLevel: true,
                        medicalConditions: true,
                    }
                },
                family: {
                    select: {
                        postcode: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 10 - matchedJobs.length, // Fill remaining slots up to 10
        });

        // Combine matches and open jobs
        const jobs = [...matchedJobs, ...openJobs];

        return NextResponse.json(jobs);

    } catch (error) {
        console.error('Get jobs error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
