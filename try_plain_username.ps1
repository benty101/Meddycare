$envPath = ".env"
$content = Get-Content $envPath

$newContent = $content | ForEach-Object {
    $line = $_
    
    # Try using plain "postgres" username instead of "postgres.projectRef"
    if ($line -match "^DATABASE_URL=") {
        'DATABASE_URL="postgresql://postgres:6CieaYAPbvYHfs8Q@aws-0-eu-west-1.pooler.supabase.com:5432/postgres"'
    }
    elseif ($line -match "^DIRECT_URL=") {
        'DIRECT_URL="postgresql://postgres:6CieaYAPbvYHfs8Q@aws-0-eu-west-1.pooler.supabase.com:5432/postgres"'
    }
    else {
        $line
    }
}

$newContent | Set-Content $envPath
Write-Host "✅ Updated to use 'postgres' username (without project ref)" -ForegroundColor Green
