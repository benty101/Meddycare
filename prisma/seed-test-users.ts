import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding test users...');

    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Family User
    const familyUser = await prisma.user.upsert({
        where: { email: 'family@test.com' },
        update: {},
        create: {
            email: 'family@test.com',
            passwordHash: hashedPassword,
            role: 'family',
            emailVerified: true,
        },
    });

    console.log('✅ Created Family User:', familyUser.email);

    // Create Family Profile
    const family = await prisma.family.upsert({
        where: { userId: familyUser.id },
        update: {},
        create: {
            userId: familyUser.id,
            firstName: 'Sarah',
            lastName: 'Johnson',
            phone: '07700 900123',
            postcode: 'SW1A 1AA',
            address: '123 Care Street, London',
        },
    });

    console.log('✅ Created Family Profile for:', family.firstName);

    // Create Care Recipient
    const recipient = await prisma.careRecipient.create({
        data: {
            familyId: family.id,
            firstName: 'Margaret',
            lastName: 'Johnson',
            age: 82,
            gender: 'female',
            recipientType: 'elderly',
            mobilityLevel: 'some_assistance',
            medicalConditions: 'Dementia, Arthritis',
            specialRequirements: 'Requires medication reminders, prefers female carers',
        },
    });

    console.log('✅ Created Care Recipient:', recipient.firstName);

    // Create Carer User
    const carerUser = await prisma.user.upsert({
        where: { email: 'carer@test.com' },
        update: {},
        create: {
            email: 'carer@test.com',
            passwordHash: hashedPassword,
            role: 'carer',
            emailVerified: true,
        },
    });

    console.log('✅ Created Carer User:', carerUser.email);

    // Create Carer Profile
    const carer = await prisma.carer.upsert({
        where: { userId: carerUser.id },
        update: {},
        create: {
            userId: carerUser.id,
            firstName: 'Emily',
            lastName: 'Williams',
            phone: '07700 900456',
            postcode: 'SW1A 2AA',
            address: '456 Carer Avenue, London',
            bio: 'Experienced carer with 8 years specializing in elderly care and dementia support.',
            yearsExperience: 8,
            dbsVerified: true,
            dbsVerifiedAt: new Date(),
            referencesVerified: true,
            status: 'approved',
        },
    });

    console.log('✅ Created Carer Profile for:', carer.firstName);

    // Add Carer Specialization
    await prisma.carerSpecialization.create({
        data: {
            carerId: carer.id,
            specialization: 'elderly_care',
        },
    });

    await prisma.carerSpecialization.create({
        data: {
            carerId: carer.id,
            specialization: 'dementia',
        },
    });

    console.log('✅ Added Carer Specializations');

    // Add Carer Rate
    await prisma.carerRate.upsert({
        where: {
            carerId_careType: {
                carerId: carer.id,
                careType: 'live_in',
            },
        },
        update: {},
        create: {
            carerId: carer.id,
            careType: 'live_in',
            weeklyRate: 650,
            hourlyRate: 18.50,
            availableFrom: new Date(),
        },
    });

    console.log('✅ Added Carer Rates');

    // Create Care Request
    const careRequest = await prisma.careRequest.create({
        data: {
            familyId: family.id,
            recipientId: recipient.id,
            careType: 'live_in',
            scheduleType: 'full_time',
            startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Start in 7 days
            budgetMin: 600,
            budgetMax: 700,
            status: 'matched',
        },
    });

    console.log('✅ Created Care Request');

    // Create Match
    const match = await prisma.match.create({
        data: {
            careRequestId: careRequest.id,
            carerId: carer.id,
            matchScore: 95,
            status: 'confirmed',
            familyViewedAt: new Date(),
            carerRespondedAt: new Date(),
        },
    });

    console.log('✅ Created Match');

    // Create Care Placement
    const placement = await prisma.carePlacement.create({
        data: {
            matchId: match.id,
            familyId: family.id,
            carerId: carer.id,
            recipientId: recipient.id,
            startDate: new Date(),
            weeklyRate: 650,
            status: 'active',
        },
    });

    console.log('✅ Created Active Care Placement');

    // Create Sample Care Logs
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    await prisma.careLog.create({
        data: {
            placementId: placement.id,
            carerId: carer.id,
            logDate: yesterday,
            activities: {
                morning: ['Personal care', 'Breakfast'],
                afternoon: ['Light walk in garden', 'Lunch'],
                evening: ['Dinner', 'Medication'],
            },
            meals: {
                breakfast: 'Porridge and tea',
                lunch: 'Chicken soup and bread',
                dinner: 'Fish and vegetables',
            },
            medicationsGiven: ['Blood pressure medication', 'Pain relief'],
            mood: 'good',
            notes: 'Margaret was in good spirits today. Enjoyed the walk in the garden.',
        },
    });

    await prisma.careLog.create({
        data: {
            placementId: placement.id,
            carerId: carer.id,
            logDate: today,
            activities: {
                morning: ['Personal care', 'Breakfast', 'Light exercises'],
                afternoon: ['Reading together', 'Lunch'],
            },
            meals: {
                breakfast: 'Toast and eggs',
                lunch: 'Pasta with sauce',
            },
            medicationsGiven: ['Blood pressure medication'],
            mood: 'excellent',
            notes: 'Great day! Margaret was very chatty and engaged during our reading session.',
        },
    });

    console.log('✅ Created Sample Care Logs');

    console.log('\n🎉 Test data seeding complete!');
    console.log('\n📝 Test Account Credentials:');
    console.log('   Family: family@test.com / password123');
    console.log('   Carer:  carer@test.com / password123');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
