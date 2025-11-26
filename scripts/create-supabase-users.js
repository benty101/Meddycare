// Create test user in Supabase Auth using Service Role key
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ujoxiztgsszwtcwclgbr.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqb3hpenRnc3N6d3Rjd2NsZ2JyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzgxMTk5NSwiZXhwIjoyMDc5Mzg3OTk1fQ.Xzyhw1T65FhmegfV12PCLEMH_qZRFdHyT6guwOC36PE';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

async function createTestUsers() {
    console.log('🔧 Creating test users in Supabase Auth...\n');

    const users = [
        {
            email: 'family@test.com',
            password: 'password123',
            email_confirm: true,
            user_metadata: {
                firstName: 'Test',
                lastName: 'Family',
                role: 'family'
            }
        },
        {
            email: 'carer@test.com',
            password: 'password123',
            email_confirm: true,
            user_metadata: {
                firstName: 'Test',
                lastName: 'Carer',
                role: 'carer'
            }
        }
    ];

    for (const userData of users) {
        try {
            const { data, error } = await supabase.auth.admin.createUser({
                email: userData.email,
                password: userData.password,
                email_confirm: userData.email_confirm,
                user_metadata: userData.user_metadata
            });

            if (error) {
                console.error(`❌ Failed to create ${userData.email}:`, error.message);
            } else {
                console.log(`✅ Created ${userData.email} - ID: ${data.user.id}`);
            }
        } catch (err) {
            console.error(`❌ Error creating ${userData.email}:`, err.message);
        }
    }

    console.log('\n✨ Done! You can now login with:');
    console.log('   Email: family@test.com OR carer@test.com');
    console.log('   Password: password123');
}

createTestUsers();
