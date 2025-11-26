const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const password = '6CieaYAPbvYHfs8Q';
const projectRef = 'ujoxiztgsszwtcwclgbr';

// Correct format for Supabase pooler: postgres:PASSWORD@pooler-hostname
const dbUrlTransaction = `postgresql://postgres:${password}@aws-0-eu-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1`;
const dbUrlDirect = `postgresql://postgres:${password}@db.${projectRef}.supabase.co:5432/postgres`;

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
        if (line.startsWith('DATABASE_URL')) {
            newLines.push(`DATABASE_URL="${dbUrlTransaction}"`);
            dbUrlFound = true;
        } else if (line.startsWith('DIRECT_URL')) {
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
    console.log('✅ DATABASE_URL fixed with correct pooler format');
    console.log(`   ${dbUrlTransaction}`);

} catch (err) {
    console.error('❌ Error updating .env:', err);
}
