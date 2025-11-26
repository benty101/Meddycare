const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const projectRef = 'ujoxiztgsszwtcwclgbr';
const password = '6CieaYAPbvYHfs8Q';

// For Next.js serverless functions, use Transaction mode (port 6543) with pgbouncer
const dbUrlTransaction = `postgresql://postgres.${projectRef}:${password}@aws-0-eu-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true`;
// For migrations and local dev, use Session mode (direct connection port 5432)
const dbUrlDirect = `postgresql://postgres.${projectRef}:${password}@aws-0-eu-west-2.pooler.supabase.com:5432/postgres`;

try {
    let envContent = '';
    if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8');
    }

    const lines = envContent.split('\n');
    const newLines = [];
    let dbUrlFound = false;
    let directUrlFound = false;

    for (const line of lines) {
        if (line.startsWith('DATABASE_URL=')) {
            newLines.push(`DATABASE_URL="${dbUrlTransaction}"`);
            dbUrlFound = true;
        } else if (line.startsWith('DIRECT_URL=')) {
            newLines.push(`DIRECT_URL="${dbUrlDirect}"`);
            directUrlFound = true;
        } else {
            newLines.push(line);
        }
    }

    if (!dbUrlFound) {
        newLines.push(`DATABASE_URL="${dbUrlTransaction}"`);
    }
    if (!directUrlFound) {
        newLines.push(`DIRECT_URL="${dbUrlDirect}"`);
    }

    fs.writeFileSync(envPath, newLines.join('\n'));
    console.log('✅ DATABASE_URL updated with pooler connection');
    console.log('   Transaction (port 6543): For API routes');
    console.log('   Direct (port 5432): For migrations');

} catch (err) {
    console.error('❌ Error updating .env:', err);
}
