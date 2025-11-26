$envPath = ".env"
$content = Get-Content $envPath

# Based on Supabase docs:
# - Transaction mode pooler: port 6543 with pgbouncer=true
# - Session mode pooler: port 5432 
# - For Prisma: use session mode for DATABASE_URL and transaction mode for connection pooling

$newContent = $content | ForEach-Object {
    $line = $_
    
    # DATABASE_URL with transaction mode pooler (port 6543 + pgbouncer=true)
    if ($line -match "^DATABASE_URL=") {
        'DATABASE_URL="postgresql://postgres.ujoxiztgsszwtcwclgbr:6CieaYAPbvYHfs8Q@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"'
    }
    # DIRECT_URL with session mode (port 5432, no pgbouncer)
    elseif ($line -match "^DIRECT_URL=") {
        'DIRECT_URL="postgresql://postgres.ujoxiztgsszwtcwclgbr:6CieaYAPbvYHfs8Q@aws-0-eu-west-1.pooler.supabase.com:5432/postgres"'
    }
    else {
        $line
    }
}

$newContent | Set-Content $envPath
Write-Host "✅ DATABASE_URL: Transaction mode pooler (port 6543 + pgbouncer=true)" -ForegroundColor Green
Write-Host "✅ DIRECT_URL: Session mode pooler (port 5432)" -ForegroundColor Green
