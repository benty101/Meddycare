const fetch = require('node-fetch');

async function createTestUser() {
    const baseUrl = 'http://localhost:3000';

    console.log('🏃 Creating test family user...');

    try {
        // Create family test user via signup API
        const signupResponse = await fetch(`${baseUrl}/api/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'family@test.com',
                password: 'password123',
                firstName: 'Test',
                lastName: 'Family',
                role: 'family',
                phone: '07123456789',
                postcode: 'SW1A 1AA'
            })
        });

        const signupData = await signupResponse.json();

        if (!signupResponse.ok) {
            console.error('❌ Signup failed:', signupData);
            return;
        }

        console.log('✅ User created:', signupData);
        console.log('\n📝 Now try logging in with:');
        console.log('   Email: family@test.com');
        console.log('   Password: password123');

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

createTestUser();
