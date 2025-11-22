import { PrismaClient, Role, CarerStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
    const passwordHash = await bcrypt.hash('Password123!', 10);

    // 1. Admin User
    const adminEmail = 'admin@meddycare.com';
    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            email: adminEmail,
            passwordHash,
            role: Role.admin,
            emailVerified: true,
        },
    });
    console.log({ admin });

    // 2. Carer User
    const carerEmail = 'carer@meddycare.com';
    const carerUser = await prisma.user.upsert({
        where: { email: carerEmail },
        update: {},
        create: {
            email: carerEmail,
            passwordHash,
            role: Role.carer,
            emailVerified: true,
            carer: {
                create: {
                    firstName: 'Sarah',
                    lastName: 'Jenkins',
                    phone: '07700900000',
                    postcode: 'SW1A 1AA',
                    yearsExperience: 5,
                    bio: 'Experienced live-in carer with a passion for dementia care.',
                    status: CarerStatus.approved,
                    dbsVerified: true,
                    referencesVerified: true,
                }
            }
        },
    });
    console.log({ carerUser });

    // 3. Family (Client) User
    const familyEmail = 'client@meddycare.com';
    const familyUser = await prisma.user.upsert({
        where: { email: familyEmail },
        update: {},
        create: {
            email: familyEmail,
            passwordHash,
            role: Role.family,
            emailVerified: true,
            family: {
                create: {
                    firstName: 'James',
                    lastName: 'Thompson',
                    phone: '07700900001',
                    postcode: 'W1A 1AA',
                }
            }
        },
    });
    console.log({ familyUser });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
