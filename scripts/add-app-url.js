const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');

try {
    let envContent = '';
    if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8');
    }

    const lines = envContent.split('\n');
    let found = false;

    for (const line of lines) {
        if (line.startsWith('NEXT_PUBLIC_APP_URL=')) {
            found = true;
            break;
        }
    }

    if (!found) {
        lines.push('NEXT_PUBLIC_APP_URL="http://localhost:3000"');
        fs.writeFileSync(envPath, lines.join('\n'));
        console.log('✅ Added NEXT_PUBLIC_APP_URL to .env');
    } else {
        console.log('✅ NEXT_PUBLIC_APP_URL already exists');
    }

} catch (err) {
    console.error('❌ Error updating .env:', err);
}
