import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/supabase-auth';
import { findMatches } from '@/lib/matching';

/**
 * POST /api/care-requests
 * Create a new care request and find matches
 */
export async function POST(req: NextRequest) {
    try {
        // Auth check
        const authHeader = req.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const supabaseUser = await getUserFromToken(token);

        if (!supabaseUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get user from database
        const user = await prisma.user.findUnique({
            where: { supabaseAuthId: supabaseUser.id },
        });

        if (!user || user.role !== 'family') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get family
        const family = await prisma.family.findUnique({
            where: { userId: user.id },
        });

        if (!family) {
            return NextResponse.json({ error: 'Family profile not found' }, { status: 404 });
        }

        // Parse request body
        const body = await req.json();
        const {
            recipientId,
            recipientData, // New: Allow creating recipient inline
            careType,
            scheduleType,
            startDate,
            budgetMin,
            budgetMax,
        } = body;

        // Validate
        if ((!recipientId && !recipientData) || !careType || !scheduleType) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Use transaction to ensure data integrity
        const result = await prisma.$transaction(async (tx: any) => {
            let finalRecipientId = recipientId;

            // Create recipient if data provided
            if (!recipientId && recipientData) {
                const newRecipient = await tx.careRecipient.create({
                    data: {
                        familyId: family.id,
                        firstName: recipientData.firstName,
                        lastName: recipientData.lastName,
                        age: 80, // Default or add to form
                        gender: recipientData.gender.toLowerCase(),
                        recipientType: 'elderly', // Default
                        mobilityLevel: recipientData.mobility === 'independent' ? 'independent' :
                            recipientData.mobility === 'some_support' ? 'some_assistance' : 'full_support',
                        medicalConditions: recipientData.conditions.join(', '),
                        specialRequirements: recipientData.notes,
                    }
                });
                finalRecipientId = newRecipient.id;
            }

            // Create care request
            const careRequest = await tx.careRequest.create({
                data: {
                    familyId: family.id,
                    recipientId: finalRecipientId,
                    careType,
                    scheduleType,
                    startDate: startDate ? new Date(startDate) : null,
                    budgetMin: parseFloat(budgetMin || '0'),
                    budgetMax: parseFloat(budgetMax || '0'),
                    status: 'matching',
                },
            });

            return careRequest;
        });

        // Find matches (outside transaction)
        const matches = await findMatches(result.id);

        return NextResponse.json({
            success: true,
            careRequest: result,
            matches,
        });

    } catch (error) {
        console.error('Create care request error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

/**
 * GET /api/care-requests
 * Get all care requests for the logged-in family
 */
export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const supabaseUser = await getUserFromToken(token);

        if (!supabaseUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get user from database
        const user = await prisma.user.findUnique({
            where: { supabaseAuthId: supabaseUser.id },
        });

        if (!user || user.role !== 'family') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const family = await prisma.family.findUnique({
            where: { userId: user.id },
        });

        if (!family) {
            return NextResponse.json({ error: 'Family profile not found' }, { status: 404 });
        }

        const careRequests = await prisma.careRequest.findMany({
            where: { familyId: family.id },
            include: {
                recipient: true,
                matches: {
                    where: { status: 'confirmed' },
                    include: {
                        carer: true
                    },
                    take: 1
                },
                _count: {
                    select: { matches: true, applications: true }
                }
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(careRequests);

    } catch (error) {
        console.error('Get care requests error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
