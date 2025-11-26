$envPath = ".env"
$content = Get-Content $envPath

# Password: MeddyCareDB001@
# URL-encoded: MeddyCareDB001%40 (@ becomes %40)

$newContent = $content | ForEach-Object {
    $line = $_
    
    if ($line -match "^DATABASE_URL=") {
        'DATABASE_URL="postgresql://postgres.ujoxiztgsszwtcwclgbr:MeddyCareDB001%40@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"'
    }
    elseif ($line -match "^DIRECT_URL=") {
        'DIRECT_URL="postgresql://postgres.ujoxiztgsszwtcwclgbr:MeddyCareDB001%40@aws-1-eu-west-1.pooler.supabase.com:5432/postgres"'
    }
    else {
        $line
    }
}

$newContent | Set-Content $envPath
Write-Host "✅ Updated with correct database password (URL-encoded)" -ForegroundColor Green
