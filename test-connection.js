const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ycjqzxdpfbvfxwbdwfxr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljanF6eGRwZmJ2Znh3YmR3ZnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyOTI5NzAsImV4cCI6MjA0Nzg2ODk3MH0.VQqJxLzQxKxL5K3Y8Z9X7W6V5U4T3S2R1Q0P9O8N7M6';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    try {
        const { data, error } = await supabase.from('_prisma_migrations').select('*').limit(1);
        if (error) {
            console.log('Connection test result:', error.message);
        } else {
            console.log('✅ Supabase connection successful!');
            console.log('Data:', data);
        }
    } catch (err) {
        console.log('❌ Connection failed:', err.message);
    }
}

testConnection();
