const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const projectRef = 'ujoxiztgsszwtcwclgbr';
const password = '6CieaYAPbvYHfs8Q';
const dbUrl = `postgresql://postgres:${password}@db.${projectRef}.supabase.co:5432/postgres`;
// Supabase Transaction Pooler (usually port 6543) is recommended for serverless envs like Vercel, 
// but for local dev and migrations, Session mode (port 5432) is often used. 
// We will set DATABASE_URL to 5432 for now to ensure migrations work.
// If DIRECT_URL is needed for Prisma, we can set it too.

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
            newLines.push(`DATABASE_URL="${dbUrl}"`);
            dbUrlFound = true;
        } else if (line.startsWith('DIRECT_URL=')) {
            newLines.push(`DIRECT_URL="${dbUrl}"`);
            directUrlFound = true;
        } else {
            newLines.push(line);
        }
    }

    if (!dbUrlFound) {
        newLines.push(`DATABASE_URL="${dbUrl}"`);
    }
    if (!directUrlFound) {
        newLines.push(`DIRECT_URL="${dbUrl}"`);
    }

    fs.writeFileSync(envPath, newLines.join('\n'));
    console.log('✅ DATABASE_URL updated successfully in .env');

} catch (err) {
    console.error('❌ Error updating .env:', err);
}
