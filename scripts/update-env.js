const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');

const newConfig = {
    NEXT_PUBLIC_SUPABASE_URL: 'https://ujoxiztgsszwtcwclgbr.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqb3hpenRnc3N6d3Rjd2NsZ2JyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MTE5OTUsImV4cCI6MjA3OTM4Nzk5NX0.aoUSZ_k4ek6Ds-t4_dYM3Wj5_Dbt0Jn2bxJlAM2rew4',
    SUPABASE_SERVICE_ROLE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqb3hpenRnc3N6d3Rjd2NsZ2JyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzgxMTk5NSwiZXhwIjoyMDc5Mzg3OTk1fQ.Xzyhw1T65FhmegfV12PCLEMH_qZRFdHyT6guwOC36PE'
};

try {
    let envContent = '';
    if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8');
    }

    const lines = envContent.split('\n');
    const newLines = [];
    const foundKeys = new Set();

    for (const line of lines) {
        const match = line.match(/^([^=]+)=/);
        if (match) {
            const key = match[1];
            if (newConfig[key]) {
                newLines.push(`${key}="${newConfig[key]}"`);
                foundKeys.add(key);
            } else {
                newLines.push(line);
            }
        } else {
            newLines.push(line);
        }
    }

    // Add missing keys
    for (const [key, value] of Object.entries(newConfig)) {
        if (!foundKeys.has(key)) {
            newLines.push(`${key}="${value}"`);
        }
    }

    fs.writeFileSync(envPath, newLines.join('\n'));
    console.log('✅ .env updated successfully');

} catch (err) {
    console.error('❌ Error updating .env:', err);
}
