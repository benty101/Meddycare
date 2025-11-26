$envPath = ".env"
$content = Get-Content $envPath

# CORRECT POOLER HOSTNAME: aws-1-eu-west-1.pooler.supabase.com (NOT aws-0!)

$newContent = $content | ForEach-Object {
    $line = $_
    
    # For Prisma with connection pooling:
    # DATABASE_URL: Transaction mode (port 6543 + pgbouncer=true)
    # DIRECT_URL: Session mode (port 5432)
    
    if ($line -match "^DATABASE_URL=") {
        'DATABASE_URL="postgresql://postgres.ujoxiztgsszwtcwclgbr:6CieaYAPbvYHfs8Q@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"'
    }
    elseif ($line -match "^DIRECT_URL=") {
        'DIRECT_URL="postgresql://postgres.ujoxiztgsszwtcwclgbr:6CieaYAPbvYHfs8Q@aws-1-eu-west-1.pooler.supabase.com:5432/postgres"'
    }
    else {
        $line
    }
}

$newContent | Set-Content $envPath
Write-Host "✅ FIXED: Updated pooler hostname from aws-0 to aws-1" -ForegroundColor Green
Write-Host "✅ DATABASE_URL: Transaction mode (port 6543)" -ForegroundColor Green
Write-Host "✅ DIRECT_URL: Session mode (port 5432)" -ForegroundColor Green
