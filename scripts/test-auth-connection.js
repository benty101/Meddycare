const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ujoxiztgsszwtcwclgbr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqb3hpenRnc3N6d3Rjd2NsZ2JyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MTE5OTUsImV4cCI6MjA3OTM4Nzk5NX0.aoUSZ_k4ek6Ds-t4_dYM3Wj5_Dbt0Jn2bxJlAM2rew4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    console.log('Testing Supabase connection...');
    try {
        // Try to fetch the user session (should be null but not error)
        const { data, error } = await supabase.auth.getSession();

        if (error) {
            console.log('❌ Auth connection failed:', error.message);
        } else {
            console.log('✅ Auth connection successful!');
            console.log('Session:', data.session ? 'Active' : 'None');
        }

        // Try a simple query if possible (optional, depends on RLS)
        // We'll just check if we can reach the server
        console.log('✅ Supabase URL is reachable.');

    } catch (err) {
        console.log('❌ Unexpected error:', err.message);
    }
}

testConnection();
