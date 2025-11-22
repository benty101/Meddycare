import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');
        const userData = await getUserFromToken(token);

        if (!userData) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const recipientId = searchParams.get('recipientId');

        // If no recipientId provided, try to find one associated with the user
        let targetRecipientId = recipientId;

        if (!targetRecipientId) {
            if (userData.role === 'family') {
                const family = await prisma.family.findUnique({
                    where: { userId: userData.userId },
                    include: { recipients: true }
                });
                if (family && family.recipients.length > 0) {
                    targetRecipientId = family.recipients[0].id;
                }
            } else if (userData.role === 'carer') {
                const carer = await prisma.carer.findUnique({
                    where: { userId: userData.userId }
                });
                if (carer) {
                    const placement = await prisma.carePlacement.findFirst({
                        where: { carerId: carer.id, status: 'active' }
                    });
                    if (placement) {
                        targetRecipientId = placement.recipientId;
                    }
                }
            }
        }

        if (!targetRecipientId) {
            return NextResponse.json({ error: 'Recipient ID required' }, { status: 400 });
        }

        // Fetch records for last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const records = await prisma.healthRecord.findMany({
            where: {
                recipientId: targetRecipientId,
                recordedAt: {
                    gte: thirtyDaysAgo
                }
            },
            orderBy: {
                recordedAt: 'asc'
            }
        });

        // Process Data
        const moodMap: any = { 'excellent': 5, 'good': 4, 'neutral': 3, 'poor': 2, 'concerning': 1 };
        const moodScores: number[] = [];
        const weightTrend: { date: string, weight: number }[] = [];
        const incidents: any[] = [];
        let systolicSum = 0, diastolicSum = 0, bpCount = 0;

        records.forEach(record => {
            const data: any = record.data;
            if (record.recordType === 'wellness') {
                const mood = data.mood;
                if (mood && moodMap[mood]) moodScores.push(moodMap[mood]);
            } else if (record.recordType === 'weight') {
                weightTrend.push({ date: record.recordedAt.toISOString(), weight: data.weight });
            } else if (record.recordType === 'incident') {
                incidents.push({ ...record, date: record.recordedAt });
            } else if (record.recordType === 'vital_signs') {
                if (data.systolic && data.diastolic) {
                    systolicSum += Number(data.systolic);
                    diastolicSum += Number(data.diastolic);
                    bpCount++;
                }
            }
        });

        const avgMood = moodScores.length > 0 ? moodScores.reduce((a, b) => a + b, 0) / moodScores.length : 0;
        const avgSystolic = bpCount > 0 ? Math.round(systolicSum / bpCount) : null;
        const avgDiastolic = bpCount > 0 ? Math.round(diastolicSum / bpCount) : null;

        // Weekly Mood Trend (Last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const weeklyMoods = records
            .filter(r => new Date(r.recordedAt) >= sevenDaysAgo && r.recordType === 'wellness')
            .map(r => {
                const m = (r.data as any).mood;
                return { date: r.recordedAt, score: moodMap[m] || 3 };
            });

        return NextResponse.json({
            avgMood,
            avgBP: avgSystolic ? `${avgSystolic}/${avgDiastolic}` : 'N/A',
            incidentCount: incidents.length,
            weightTrend,
            weeklyMoods,
            recentIncidents: incidents.slice(-3).reverse()
        });

    } catch (error) {
        console.error('Wellness report error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
