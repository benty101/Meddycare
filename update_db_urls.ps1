$envPath = ".env"
$content = Get-Content $envPath

$newContent = $content | ForEach-Object {
    $line = $_
    
    # Update DATABASE_URL to use session mode pooling (port 5432, not 6543)
    if ($line -match "^DATABASE_URL=") {
        'DATABASE_URL="postgresql://postgres.ujoxiztgsszwtcwclgbr:6CieaYAPbvYHfs8Q@aws-0-eu-west-1.pooler.supabase.com:5432/postgres"'
    }
    # DIRECT_URL stays the same
    elseif ($line -match "^DIRECT_URL=") {
        'DIRECT_URL="postgresql://postgres.ujoxiztgsszwtcwclgbr:6CieaYAPbvYHfs8Q@aws-0-eu-west-1.pooler.supabase.com:5432/postgres"'
    }
    else {
        $line
    }
}

$newContent | Set-Content $envPath
Write-Host "✅ Updated DATABASE_URL to use session mode pooling (port 5432)" -ForegroundColor Green
Write-Host "✅ Removed pgbouncer=true parameter for better Prisma compatibility" -ForegroundColor Green
